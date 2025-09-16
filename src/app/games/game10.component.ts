import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game10',
  standalone: true,
  imports: [ModalComponent, NgIf, RouterLink],
  template: `
    <h2>10) การให้เวลาอย่างเพียงพอ (Timing Adjustable)</h2>
    <div class="card">
      <div aria-live="polite" class="muted">เวลาที่เหลือ: <strong>{{ timeLeft }}</strong> วินาที</div>
      <form (submit)="$event.preventDefault()" style="margin-top:8px">
        <fieldset [disabled]="formDisabled" style="display:grid; gap:8px; max-width:520px">
          <label>ชื่อ-สกุล <input type="text"></label>
          <label>ที่อยู่ปัจจุบัน <input type="text"></label>
          <label>อาชีพปัจจุบัน <input type="text"></label>
          <label>สถานที่ทำงาน <input type="text"></label>
          <label>เบอร์โทรศัพท์ <input type="tel"></label>
          <button type="submit" class="btn primary">ส่งข้อมูล</button>
        </fieldset>
        <p class="muted" style="margin-top:8px">เมื่อเข้าหน้านี้จะเริ่มนับถอยหลัง 30 วินาที และเมื่อหมดเวลา ฟอร์มจะถูกปิดการใช้งานอัตโนมัติ</p>
      </form>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: รูปแบบนี้ “เข้าถึงได้” หรือ “ไม่เข้าถึงได้” เมื่อไม่มีวิธีขยายเวลา</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="answer='ok'"> เข้าถึงได้</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='not'"> ไม่เข้าถึงได้</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <a class="btn" routerLink="/summary">ข้ามและไปสรุปคะแนน</a>
    </div>

    <app-modal *ngIf="show" title="ผลการตรวจ" (close)="onModalClose()">
      <div class="container">
        <p>{{ message }}</p>
        <ul>
          <li>SC 2.2.1 Timing Adjustable: ต้องมีวิธีปิด/ปรับ/ขยายเวลา เว้นข้อยกเว้นที่กำหนด</li>
          <li>ควรให้ผู้ใช้ขยายเวลาได้อย่างง่าย เช่น ปุ่มชัดเจน หรือกด Space เพื่อเพิ่มเวลา</li>
        </ul>
        <div class="card" tabindex="0" (keydown.space)="extendDemo()" aria-describedby="demoDesc">
          <p id="demoDesc" class="muted">ตัวอย่างที่ถูกต้อง: กด Space เพื่อขยายเวลา +30 วินาที หรือกดปุ่มด้านล่าง</p>
          <div aria-live="polite" class="muted">Demo เวลาที่เหลือ: <strong>{{ demoTimeLeft }}</strong> วินาที</div>
          <div style="display:flex; gap:8px; margin-top:6px">
            <button class="btn" type="button" (click)="extendDemo()">ขยายเวลา +30s</button>
            <button class="btn" type="button" (click)="resetDemo()">รีเซ็ต Demo</button>
          </div>
          <fieldset [disabled]="demoDisabled" style="display:grid; gap:8px; max-width:520px; margin-top:8px">
            <label>ชื่อ-สกุล <input type="text"></label>
            <label>ที่อยู่ปัจจุบัน <input type="text"></label>
            <label>อาชีพปัจจุบัน <input type="text"></label>
            <label>สถานที่ทำงาน <input type="text"></label>
            <label>เบอร์โทรศัพท์ <input type="tel"></label>
          </fieldset>
        </div>
        <a class="btn primary" routerLink="/summary">ไปหน้าสรุปคะแนน</a>
      </div>
    </app-modal>
  `
})
export class Game10Component implements OnInit, OnDestroy {
  router = inject(Router);
  score = inject(ScoreService);
  show=false; message=''; awarded=false;
  answer?: string;

  // main demo (incorrect) — countdown 30s then disable
  timeLeft = 30;
  formDisabled = false;
  private timerId: any;

  ngOnInit(): void {
    this.startTimer();
  }
  ngOnDestroy(): void {
    clearInterval(this.timerId);
    clearInterval(this.demoTimerId);
  }
  private startTimer(){
    clearInterval(this.timerId);
    this.timeLeft = 30;
    this.formDisabled = false;
    this.timerId = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timerId);
        this.formDisabled = true;
        alert('หมดเวลา แบบฟอร์มถูกปิดการใช้งาน');
      }
    }, 1000);
  }

  check(){
    const correct = this.answer === 'not';
    if (correct && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.message = correct ? 'ถูกต้อง: ต้องมีวิธีให้ขยายเวลาหรือปิดการจับเวลา'
      : 'ไม่ถูกต้อง: รูปแบบนี้ไม่เข้าถึงได้เพราะไม่มีวิธีขยายเวลา';
    this.startDemo();
    this.show = true;
  }

  // accessible demo in modal
  demoTimeLeft = 30;
  demoDisabled = false;
  private demoTimerId: any;
  extendDemo(){ this.demoTimeLeft += 30; }
  resetDemo(){ this.startDemo(); }
  private startDemo(){
    clearInterval(this.demoTimerId);
    this.demoTimeLeft = 30;
    this.demoDisabled = false;
    this.demoTimerId = setInterval(() => {
      this.demoTimeLeft--;
      if (this.demoTimeLeft <= 0) {
        clearInterval(this.demoTimerId);
        this.demoDisabled = true;
      }
    }, 1000);
  }
  onModalClose(){
    this.show = false;
    clearInterval(this.demoTimerId);
  }
}
