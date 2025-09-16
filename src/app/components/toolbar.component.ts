import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, ModalComponent],
  template: `
    <div class="toolbar" role="region" aria-label="Toolbar">
      <a routerLink="/" class="btn" aria-label="หน้าแรก">หน้าแรก</a>
      <div class="score" aria-live="polite">คะแนน: {{ scoreSvc.score$ | async }} / 100</div>
      <div style="display:flex; gap:8px; align-items:center">
        <button class="btn" (click)="openHelp()">ความช่วยเหลือ</button>
        <a class="btn primary" routerLink="/summary">จบเกมส์</a>
      </div>
    </div>
    <app-modal *ngIf="showHelp" title="ความช่วยเหลือ" (close)="showHelp=false">
      <div class="container">
        <p>ตอบคำถามในแต่ละด่านเพื่อสะสมคะแนนให้ครบ 100 คะแนน</p>
        <ul>
          <li>ปุ่ม “ตรวจสอบคำตอบ” จะให้เหตุผลและเฉลย</li>
          <li>ปุ่ม “ข้ามไปยังข้อถัดไป” จะไปด่านถัดไปโดยไม่เพิ่มคะแนน</li>
        </ul>
      </div>
    </app-modal>
  `
})
export class ToolbarComponent {
  scoreSvc = inject(ScoreService);
  router = inject(Router);
  showHelp = false;
  openHelp(){ this.showHelp = true; }
}

