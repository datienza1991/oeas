import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Record, TsEBMLEngine } from '@batstateu/videojs-record';
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
import { TakeExamService } from '../../services/take-exam/take-exam.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'batstateu-take-exam-recording',
  templateUrl: './take-exam-recording.component.html',
  styleUrls: ['./take-exam-recording.component.less'],
})
export class TakeExamRecordingComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() limit$!: Observable<number>;

  @Output() startExam = new EventEmitter();
  @Output() uploadRecord = new EventEmitter();

  idx = 'clip1';

  private config: any;
  private player: any;
  private plugin: any;
  limit!: number;


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
          audio: true,
          screen: true,
          maxLength: 100,
          convertEngine: 'ts-ebml',
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

  initScreenRecorder() {
    // ID with which to access the template's video element
    const el = 'video_' + this.idx;

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
      this.startExam.emit();
    });

    // user completed recording and stream is available
    this.player.on('finishConvert', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished convert: ', this.player.convertedData);
      const data = this.player.convertedData;
      this.uploadRecord.emit(data);
    });

    // error handling
    this.player.on('error', (element: any, error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      const error = this.player.deviceErrorCode;
      if (error.code > 0) {
        console.error('device error:', this.player.deviceErrorCode);
      }
    });

    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then((permissionObj) => {
        console.log(permissionObj.state);
      })
      .catch((error) => {
        console.log('Got error :', error);
      });

    navigator.permissions
      .query({ name: 'camera' as PermissionName })
      .then((permissionObj) => {
        console.log(permissionObj.state);
      })
      .catch((error) => {
        console.log('Got error :', error);
      });
  }
  ngOnInit(): void {
    this.setLimit();
  }
  setLimit() {
    this.limit$.subscribe((val) => (this.limit = val));
  }

  ngAfterViewInit(): void {
    this.initScreenRecorder();
  }
}
