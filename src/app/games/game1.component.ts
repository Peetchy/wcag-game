import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ScoreService } from '../services/score.service';
import { ProgressService } from '../services/progress.service';
import { ModalComponent } from '../components/modal.component';

@Component({
  selector: 'app-game1',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  template: `
    <h2>1) รูปภาพและข้อความแสดงแทน (ALT)</h2>
    <div class="grid cols-3 img-grid" role="group" aria-label="แกลเลอรีตัวอย่างภาพ (ภาพจากแหล่งเปิดให้ใช้ได้ฟรี)">
      <figure>
        <img src="https://source.unsplash.com/300x200/?dog" alt="หมาเพศผู้หนึ่งตัว" referrerpolicy="no-referrer" loading="lazy">
      </figure>
      <figure>
        <img src="https://source.unsplash.com/300x200/?cat" alt="แมวเพศเมียสองตัว" referrerpolicy="no-referrer" loading="lazy">
      </figure>
      <figure>
        <img src="https://source.unsplash.com/300x200/?elephant" alt="ช้างเพศผู้ 3 ตัว" referrerpolicy="no-referrer" loading="lazy">
      </figure>
      <figure>
        <img src="https://source.unsplash.com/300x200/?buffalo" alt="" referrerpolicy="no-referrer" loading="lazy">
      </figure>
      <figure style="position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden">
        <img src="https://source.unsplash.com/300x200/?dog,puppy" alt="หมาเพศผู้หนึ่งตัว" referrerpolicy="no-referrer" loading="lazy">
      </figure>
      <figure style="position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden">
        <img src="https://source.unsplash.com/300x200/?cat,kitten" referrerpolicy="no-referrer" loading="lazy">
      </figure>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: ในหน้าเว็บดังกล่าวมีภาพทั้งหมดกี่ภาพ?</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="answer=4"> 4</label>
        <label class="option"><input type="radio" name="q1" (change)="answer=5"> 5</label>
        <label class="option"><input type="radio" name="q1" (change)="answer=6"> 6</label>
        <label class="option"><input type="radio" name="q1" (change)="answer=8"> 8</label>
      </div>
    </fieldset>

    <div style="display:flex; gap:8px; margin-top:12px">
      <button class="btn primary" (click)="check()">ตรวจสอบคำตอบ</button>
      <button class="btn" (click)="next()">ข้ามไปยังข้อถัดไป</button>
    </div>

    <app-modal *ngIf="show" [title]="resultTitle" (close)="show=false">
      <div class="container">
        <p>{{ resultMessage }}</p>
        <p class="muted">มี element &lt;img&gt; ทั้งหมด 6 ตัว แม้ภาพที่ 5–6 จะถูกซ่อนนอกเฟรมด้วย CSS ก็ยังนับเป็นภาพใน DOM และภาพที่ alt="" ใช้ได้เมื่อเป็นภาพตกแต่ง (SC 1.1.1)</p>

        <h3>แบบจำลองการแก้ไขโค้ด (Live editor)</h3>
        <div class="card">
          <p>แก้ไขค่า alt ด้านล่างเพื่อดูตัวอย่าง</p>
          <label for="alt-input">alt ของภาพ:</label>
          <input id="alt-input" type="text" [value]="altText" (input)="altText=($any($event.target).value)" style="width:100%; padding:6px; margin:8px 0" />
          <div style="display:flex; gap:12px; align-items:flex-start; flex-wrap:wrap">
            <img src="https://picsum.photos/seed/dogLive/160/120" [attr.alt]="altText" style="border-radius:6px; border:1px solid #eee">
            <div style="flex:1; min-width:260px">
              <div class="muted">โค้ดก่อนแก้ (ผิด)</div>
              <pre class="code" ngNonBindable>&lt;img src="dog.jpg"&gt;</pre>
              <div class="muted">โค้ดหลังแก้ (ถูก)</div>
              <pre class="code" ngNonBindable>&lt;img src="dog.jpg" alt="{{altText || 'หมาเพศผู้หนึ่งตัว'}}"&gt;</pre>
              <p class="muted">หากภาพเป็น purely decorative ใช้ alt="" หรือ role="presentation"</p>
            </div>
          </div>
        </div>
        <p style="margin-top:12px"><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game1Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  answer?: number;
  show = false;
  resultTitle = '';
  resultMessage = '';
  altText = 'หมาเพศผู้หนึ่งตัว';

  awarded = false;
  check(){
    const correct = this.answer === 6;
    if (correct && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.resultTitle = correct ? 'ถูกต้อง' : 'ไม่ถูกต้อง';
    this.resultMessage = 'คำตอบที่ถูกต้องคือ 6';
    this.show = true;
  }
  next(){ this.progress.unlock(2); this.router.navigateByUrl('/game/2'); }
}
