import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Record, TsEBMLEngine } from '@batstateu/videojs-record';
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
import { TakeExamService } from '../../services/take-exam/take-exam.service';

@Component({
  selector: 'batstateu-take-exam-recording',
  templateUrl: './take-exam-recording.component.html',
  styleUrls: ['./take-exam-recording.component.less'],
})
export class TakeExamRecordingComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  idx = 'clip1';

  private config: any;
  private player: any;
  private plugin: any;
  isVisible = false;

  onStartRecord() {
    this.player.record().getDevice();
  }

  constructor(private takeExamService: TakeExamService) {
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
          timeSlice:2000,
          maxLength: 10000,
          videoMimeType: 'video/webm;codecs=vp8',
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
      const data = this.player.recordedData;

      this.takeExamService.upload(data).subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log(err),
      });
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
