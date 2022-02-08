import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import videojs from 'video.js';
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'batstateu-exam-recording-view',
  templateUrl: './exam-recording-view.component.html',
  styleUrls: ['./exam-recording-view.component.less'],
})
export class ExamRecordingViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
