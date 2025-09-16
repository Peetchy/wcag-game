import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game5',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>5) สีและความต่างระดับสี (Use of Color & Contrast)</h2>
    <div class="grid cols-2">
      <div class="card" style="color:#777; background:#fff">
        <strong>การ์ด A</strong>
        <p>ข้อความตัวอย่างสี #777 บนพื้นขาว</p>
      </div>
      <div class="card" style="color:#fff; background:#1A1A1A">
        <strong>การ์ด B</strong>
        <p>ข้อความตัวอย่างสี #FFFFFF บนพื้น #1A1A1A</p>
      </div>
      <div class="card" style="color:#FFD54F; background:#fff">
        <strong>การ์ด C</strong>
        <p>ข้อความสีเหลือง #FFD54F บนพื้นขาว</p>
      </div>
      <div class="card" style="color:#0C63E7; background:#fff">
        <strong>การ์ด D</strong>
        <p>ข้อความและลิงก์ <a href="#" style="color:#0C63E7; text-decoration:underline" (click)="$event.preventDefault()">ลิงก์</a></p>
      </div>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: การ์ดใด “คาดว่า” จะผ่านคอนทราสต์ขั้นต่ำ 4.5:1 สำหรับตัวอักษรปกติ? (เลือกได้หลายตัว)</legend>
      <div class="options" role="group" aria-label="เลือกคำตอบ">
        <label class="option"><input type="checkbox" (change)="toggle('A', $event)"> A</label>
        <label class="option"><input type="checkbox" (change)="toggle('B', $event)"> B</label>
        <label class="option"><input type="checkbox" (change)="toggle('C', $event)"> C</label>
        <label class="option"><input type="checkbox" (change)="toggle('D', $event)"> D</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <button class="btn" (click)="next()">ข้ามไปยังข้อถัดไป</button>
    </div>

    <app-modal *ngIf="show" title="ผลการตรวจ" (close)="show=false">
      <div class="container">
        <p>{{ message }}</p>
        <ul>
          <li>#FFFFFF บน #1A1A1A มีคอนทราสต์สูง (SC 1.4.3)</li>
          <li>ลิงก์สีน้ำเงินบนพื้นขาวที่มีเส้นใต้ช่วยแยกจากเนื้อความ (SC 1.4.1, 1.4.3)</li>
        </ul>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game5Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  selected = new Set<string>();
  show = false; message = '';
  awarded = false;
  toggle(id: string, ev: Event){
    const checked = (ev.target as HTMLInputElement).checked;
    if (checked) this.selected.add(id); else this.selected.delete(id);
  }
  check(){
    const isBD = this.selected.has('B') && this.selected.has('D');
    const hasWrong = ['A','C'].some(k => this.selected.has(k));
    let points = 0;
    if (isBD && !hasWrong) points = 10; else if (!hasWrong && (this.selected.has('B') || this.selected.has('D'))) points = 5; else points = 0;
    if (points>0 && !this.awarded) { this.score.add(points); this.awarded=true; }
    this.message = points===10 ? 'ถูกต้อง (B และ D)'
      : points===5 ? 'ได้บางส่วน: ควรเลือก B และ D เท่านั้น' : 'ไม่ถูกต้อง: ควรเลือก B และ D เท่านั้น';
    this.show = true;
  }
  next(){ this.progress.unlock(6); this.router.navigateByUrl('/game/6'); }
}
