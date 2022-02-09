import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import {Record,adapter} from '@batstateu/videojs-record'
import videojs from 'video.js';
import * as RecordRTC from 'recordrtc';
@Component({
  selector: 'batstateu-exam-recording-view',
  templateUrl: './exam-recording-view.component.html',
  styleUrls: ['./exam-recording-view.component.less'],
})
export class ExamRecordingViewComponent implements OnInit, OnDestroy {

  url = "https://collab-project.github.io/videojs-wavesurfer/demo/media/example.mp4";
  visible = true;
  // index to create unique ID for component
  idx = 'clip1';

  private config: any;
  private player: any; 
  private plugin: any;

  // constructor initializes our declared vars
  constructor() {
    this.player = false;

    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 640,
      height: 560,
      bigPlayButton: true,
      sources: {
        src: this.url,
        type: 'video/mp4'
      },
      controlBar: {
        volumePanel: false
      },
      plugins: {
      }
    };
  }
 
  ngOnInit() {}

  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's video element
    const el = 'video_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el) as HTMLVideoElement, this.config, () => {
      console.log('player ready! id:', el);

      // print version information at startup
      const msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
      videojs.log(msg);
    });

    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      this.visible = false;
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);
      this.visible = true;
    });

    // error handling
    this.player.on('error', (element : any, error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }
}
