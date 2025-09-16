import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game9',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>9) การใช้ลักษณะทางประสาทสัมผัส (Sensory Characteristics)</h2>
    <div class="card">
      <p>หากท่านยืนยันการชำระเงินให้กดที่ปุ่มสีเขียว และหากต้องการยกเลิกให้กดที่ปุ่มสีแดง</p>
      <div style="display:flex; gap:8px; margin-top:8px">
        <button type="button" class="btn" (click)="onGreen()" style="background:#1e9e46; border-color:#1e9e46; color:#fff"></button>
        <button type="button" class="btn" (click)="onRed()" style="background:#cc3535; border-color:#cc3535; color:#fff"></button>
      </div>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: ข้อความแนะนำข้างต้น “เข้าถึงได้” หรือ “เข้าถึงไม่ได้”</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="q1='ok'"> เข้าถึงได้</label>
        <label class="option"><input type="radio" name="q1" (change)="q1='not'"> เข้าถึงไม่ได้</label>
      </div>
    </fieldset>

    <fieldset style="margin-top:8px">
      <legend>Q2: แนวทางใด “เหมาะสมที่สุด” ในการปรับปรุง</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q2" (change)="q2='A'"> A) ใช้สีที่เข้มขึ้นเพื่อให้เห็นชัด</label>
        <label class="option"><input type="radio" name="q2" (change)="q2='B'"> B) เพิ่มข้อความเชิงความหมายบนปุ่ม เช่น “ยืนยันการชำระเงิน”/“ยกเลิก” และคงสีเป็นตัวช่วยเสริม</label>
        <label class="option"><input type="radio" name="q2" (change)="q2='C'"> C) ใช้เฉดสีมากขึ้นและเอาข้อความออก</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <button class="btn" (click)="next()">ข้ามไปยังข้อถัดไป</button>
    </div>

    <app-modal *ngIf="show" title="ผลการตรวจ" (close)="show=false">
      <div class="container">
        <p>Q1: {{ r1 }}</p>
        <p>Q2: {{ r2 }}</p>
        <ul>
          <li>SC 1.3.3 Sensory Characteristics: หลีกเลี่ยงการสื่อสารด้วย “สี/ตำแหน่ง/รูปทรง” เพียงอย่างเดียว</li>
          <li>SC 1.4.1 Use of Color: สีอย่างเดียวไม่พอ ต้องมีข้อความเชิงความหมาย/ไอคอน/เลเบลประกอบ</li>
        </ul>
        <div class="card">
          <div class="muted">ตัวอย่างที่เหมาะสม</div>
          <div style="display:flex; gap:8px; margin-top:6px; flex-wrap:wrap">
            <button type="button" class="btn" aria-label="ยืนยันการชำระเงิน" style="background:#1e9e46; border-color:#1e9e46; color:#fff">ยืนยันการชำระเงิน</button>
            <button type="button" class="btn" aria-label="ยกเลิก" style="background:#cc3535; border-color:#cc3535; color:#fff">ยกเลิก</button>
          </div>
        </div>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game9Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  q1?: string; q2?: string; show=false; r1=''; r2=''; awarded=false;
  onRed(){ alert('คุณคลิกปุ่มสีแดง'); }
  onGreen(){ alert('คุณคลิกที่ปุ่มสีเขียว'); }
  check(){
    const c1 = this.q1 === 'not';
    const c2 = this.q2 === 'B';
    const points = (c1?5:0) + (c2?5:0);
    if (points>0 && !this.awarded) { this.score.add(points); this.awarded=true; }
    this.r1 = c1 ? 'ถูกต้อง' : 'ไม่ถูกต้อง (ควรตอบ: เข้าถึงไม่ได้)';
    this.r2 = c2 ? 'ถูกต้อง' : 'ไม่ถูกต้อง (ควรเลือกข้อ B)';
    this.show = true;
  }
  next(){ this.progress.unlock(10); this.router.navigateByUrl('/game/10'); }
}
