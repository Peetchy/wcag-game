import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game3',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>3) เหตุการณ์ขององค์ประกอบ (Events)</h2>
    <div class="card">
      <p class="muted">ให้ผู้ใช้กดที่ลิงก์หลักและลิงก์ในเมนูย่อย เพื่อเก็บคะแนนให้ได้ 10 คะแนน</p>
      <div (mouseenter)="hover=true" (mouseleave)="hover=false" style="position:relative; display:inline-block">
        <a href="#" (click)="$event.preventDefault(); addDemo('main')">กดที่นี่เพื่อรับ 5 คะแนน</a>
        <ul *ngIf="hover" role="menu" aria-label="เมนูย่อย" style="position:absolute; left:0; top:100%; margin:4px 0 0; padding:6px 8px; list-style:none; background:#fff; border:1px solid #ddd; border-radius:6px; box-shadow:0 4px 10px rgba(0,0,0,.08)">
          <li role="none"><a role="menuitem" href="#" (click)="$event.preventDefault(); addDemo('sub')">กดที่นี่เพื่อรับเพิ่มอีก 5 คะแนน</a></li>
        </ul>
      </div>
      <p class="muted" style="margin-top:8px">คะแนนเดโม่: <strong>{{ demoPoints }}</strong></p>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: รูปแบบปฏิสัมพันธ์นี้ “เข้าถึงได้สำหรับทุกอุปกรณ์/ผู้ใช้หรือไม่”</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="answer='เข้าถึงได้'"> เข้าถึงได้</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='เข้าถึงไม่ได้'"> เข้าถึงไม่ได้</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <button class="btn" (click)="next()">ข้ามไปยังข้อถัดไป</button>
    </div>

    <app-modal *ngIf="show" title="ผลการตรวจ" (close)="show=false">
      <div class="container">
        <p>{{ result }}</p>
        <ul>
          <li>อย่าพึ่งพา mouseover เพียงอย่างเดียว (SC 2.1.1, 2.5.6)</li>
          <li>รองรับ focus + keydown (Enter/Space) และ pointer</li>
          <li>เมนูย่อยเข้าถึงได้ด้วย Tab และ ARIA (role="menu", aria-expanded, aria-controls)</li>
        </ul>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game3Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  answer?: string;
  show = false;
  result = '';
  hover = false;
  demoPoints = 0;
  private clickedMain = false;
  private clickedSub = false;
  addDemo(which: 'main' | 'sub'){
    if (which === 'main') {
      if (!this.clickedMain) {
        this.clickedMain = true;
        this.demoPoints += 5;
      }
    } else {
      if (!this.clickedSub) {
        this.clickedSub = true;
        this.demoPoints += 5;
      }
    }
  }
  awarded=false;
  check(){
    const correct = this.answer === 'เข้าถึงไม่ได้';
    if (correct && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.result = correct ? 'ตอบถูกต้อง' : 'ควรตอบ: เข้าถึงไม่ได้';
    this.show = true;
  }
  next(){ this.progress.unlock(4); this.router.navigateByUrl('/game/4'); }
}
