import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game8',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>8) ปุ่ม vs ลิงก์ และ ARIA (Buttons vs Links & ARIA)</h2>
    <div class="card">
      <p class="muted">ตัวอย่าง UI</p>
      <div class="grid cols-2">
        <div>
          <div class="muted">ตัวอย่างปุ่ม "Save"</div>
          <div role="presentation" style="display:inline-block; padding:8px 12px; border:1px solid #ccc; border-radius:6px; cursor:pointer; background:#f8f8f8" (click)="showAlert()">Save</div>
          <pre class="code" ngNonBindable style="margin-top:6px">&lt;div onclick="save()"&gt;Save&lt;/div&gt;</pre>
        </div>
      </div>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: วิธีปรับปรุงที่ดีที่สุดคือข้อใด?</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="answer='A'"> A) เพิ่ม role="button" อย่างเดียว</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='B'"> B) เปลี่ยนเป็น &lt;button&gt; แล้วผูก (click) + รองรับ keydown</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='C'"> C) ใช้ &lt;a&gt; แล้วจับคลิกด้วย JS</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <button class="btn" (click)="next()">ข้ามไปยังข้อถัดไป</button>
    </div>

    <app-modal *ngIf="show" title="ผลการตรวจ" (close)="show=false">
      <div class="container">
        <p>{{ message }}</p>
        <pre class="code" ngNonBindable>&lt;button type="button" (click)="save()"&gt;Save&lt;/button&gt;</pre>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game8Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  answer?: string; show=false; message=''; awarded=false;
  check(){
    const correct = this.answer === 'B';
    if (correct && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.message = correct ? 'ถูกต้อง: ใช้ปุ่มเนทีฟ' : 'ควรเลือกข้อ B';
    this.show = true;
  }
  next(){ this.progress.unlock(9); this.router.navigateByUrl('/game/9'); }

  showAlert(){ alert('Clicked!'); }
}
