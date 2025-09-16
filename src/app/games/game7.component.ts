import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game7',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>7) ฟอร์ม, ป้ายกำกับ และข้อความผิดพลาด (Forms & Labels & Errors)</h2>
    <div class="card">
      <p class="muted">ตัวอย่างฟอร์ม</p>
      <form (submit)="$event.preventDefault()" aria-describedby="badFormDesc">
        <div id="badFormDesc" class="sr-only">ตัวอย่างที่ไม่ถูกต้องเพื่อการเรียนรู้</div>
        <div style="display:grid; gap:8px; max-width:420px">
          <input type="text" placeholder="ชื่อ">
          <input type="email" placeholder="อีเมล">
          <input type="tel" placeholder="เบอร์โทร">
          <button type="submit" class="btn primary">ส่งแบบฟอร์ม</button>
        </div>
      </form>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: จุดบกพร่องหลักมีอะไรบ้าง? (เลือกได้หลายข้อ)</legend>
      <div class="options" role="group" aria-label="เลือกคำตอบ">
        <label class="option"><input type="checkbox" (change)="toggle('label', $event)"> ไม่มี &lt;label for&gt; เชื่อมกับ input</label>
        <label class="option"><input type="checkbox" (change)="toggle('placeholder', $event)"> ใช้ placeholder แทน label</label>
        <label class="option"><input type="checkbox" (change)="toggle('describedby', $event)"> ข้อความผิดพลาดไม่ผูกกับช่องที่ผิด (ไม่มี aria-describedby)</label>
        <label class="option"><input type="checkbox" (change)="toggle('required', $event)"> ไม่ระบุภาคบังคับอย่างชัดเจน</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <button class="btn" (click)="next()">ข้ามไปยังข้อถัดไป</button>
    </div>

    <app-modal *ngIf="show" title="ผลการตรวจ" (close)="show=false">
      <div class="container">
        <p>{{ message }}</p>
        <div class="grid cols-2" style="gap:12px; align-items:start">
          <div class="card">
            <h3 style="margin-top:0">ตัวอย่างฟอร์มที่ถูกต้อง (Preview)</h3>
            <form (submit)="$event.preventDefault()">
              <div style="display:grid; gap:10px; max-width:420px">
                <label for="name">ชื่อ <span aria-hidden="true">*</span></label>
                <input id="name" name="name" required aria-describedby="nameHint">
                <div id="nameHint" class="muted">ชื่อ-นามสกุล</div>

                <label for="email">อีเมล <span aria-hidden="true">*</span></label>
                <input id="email" name="email" required aria-describedby="emailHint emailError" aria-invalid="false">
                <div id="emailHint" class="muted">เช่น name&#64;example.com</div>
                <div id="emailError" role="alert" class="sr-only">โปรดกรอกอีเมลให้ถูกต้อง</div>

                <label for="tel">เบอร์โทร</label>
                <input id="tel" name="tel" inputmode="tel">

                <button type="submit" class="btn primary">ส่งแบบฟอร์ม</button>
              </div>
            </form>
          </div>
          <div>
            <div class="muted">โค้ดฟอร์มตัวอย่าง (ที่ถูกต้อง)</div>
            <pre class="code" ngNonBindable>&lt;label for="email"&gt;อีเมล &lt;span aria-hidden="true"&gt;*&lt;/span&gt;&lt;/label&gt;
&lt;input id="email" name="email" required aria-describedby="emailHint emailError"&gt;
&lt;div id="emailHint"&gt;เช่น name&#64;example.com&lt;/div&gt;
&lt;div id="emailError" role="alert"&gt;โปรดกรอกอีเมลให้ถูกต้อง&lt;/div&gt;</pre>
          </div>
        </div>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game7Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  selected = new Set<string>();
  show=false; message=''; awarded=false;
  toggle(id: string, ev: Event){
    const checked = (ev.target as HTMLInputElement).checked;
    if (checked) this.selected.add(id); else this.selected.delete(id);
  }
  check(){
    const all = ['label','placeholder','describedby','required'];
    const ok = all.every(k => this.selected.has(k));
    if (ok && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.message = ok ? 'ถูกต้อง: ทั้งหมดเป็นจุดบกพร่อง' : 'ควรเลือกครบทุกข้อ';
    this.show = true;
  }
  next(){ this.progress.unlock(8); this.router.navigateByUrl('/game/8'); }
}
