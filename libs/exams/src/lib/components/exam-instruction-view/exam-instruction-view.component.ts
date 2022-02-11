import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Record } from '@batstateu/videojs-record';
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
@Component({
  selector: 'batstateu-exam-instruction-view',
  templateUrl: './exam-instruction-view.component.html',
  styleUrls: ['./exam-instruction-view.component.less'],
})
export class ExamInstructionViewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() instruction?: string;
  @Input() isStartExam = false;
  @Output() startRecord = new EventEmitter();

  height = 0;

  // index to create unique ID for component
  idx = 'clip1';

  private config: any;
  private player: any;
  private plugin: any;
  isVisible = false
  onBack() {
    this.location.back();
  }
  onStartRecord() {
    this.player.record().getDevice();
    this.startRecord.emit();
  }
  constructor(private location: Location) {
    this.player = false;
    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 320,
      height: 240,
      bigPlayButton: false,
      controlBar: {
        volumePanel: false,
      },
      plugins: {
        // configure videojs-record plugin
        record: {
          audio: false,
          screen: true,
          maxLenght: 10,
          debug: true,
        },
      },
    };
  }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // ID with which to access the template's video element
    let el = 'video_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(
      document.getElementById(el) as HTMLVideoElement,
      this.config,
      () => {
        console.log('player ready! id:', el);

        // print version information at startup
        const msg =
          'Using video.js ' +
          videojs.VERSION +
          ' with videojs-record ' +
          videojs.getPluginVersion('record') +
          ' and recordrtc ' +
          RecordRTC.version;
        videojs.log(msg);
      }
    );

    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
      this.player.record().start();
      this.isVisible = true;
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);
      this.isVisible = true;
    });

    // error handling
    this.player.on('error', (element: any, error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }
}
