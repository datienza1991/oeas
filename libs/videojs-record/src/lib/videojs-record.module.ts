import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export * as Record from 'videojs-record/dist/videojs.record.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export * as TsEBMLEngine from 'videojs-record/dist/plugins/videojs.record.ts-ebml.js';
@NgModule({
  imports: [CommonModule],
})
export class VideojsRecordModule {}
