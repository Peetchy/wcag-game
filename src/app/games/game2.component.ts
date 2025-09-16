import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game2',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>2) ลำดับชั้นหัวเรื่อง (Headings)</h2>
    <section class="card">
      <h1 style="font-size:20pt">ประวัติของ Steve Jobs</h1>
      <p><strong style="font-size:18pt">ประวัติการศึกษา</strong></p>
      <h3>ช่วงมัธยมศึกษา</h3>
      <p>สนใจอิเล็กทรอนิกส์ตั้งแต่วัยเด็ก บ้านเกิดที่ซิลิคอนแวลลีย์ทำให้มีชุมชนผู้สร้างและอุปกรณ์ให้เรียนรู้มากมาย</p>
      <h3>มหาวิทยาลัย</h3>
      <p>เข้าเรียนที่ Reed College แต่ลาออกเพื่อไปเรียนด้วยตนเองในวิชาที่สนใจ เช่น การออกแบบตัวอักษร ซึ่งส่งผลต่อการออกแบบของ Macintosh ภายหลัง</p>

      <p><strong style="font-size:18pt">ประวัติครอบครัว</strong></p>
      <p>มีครอบครัวและบุตรหลายคน สนใจการใช้ชีวิตแบบเรียบง่ายและการทำงานที่มีความหมาย</p>

      <p><strong style="font-size:18pt">ประวัติการทำงาน</strong></p>
      <ul>
        <li>ร่วมก่อตั้ง Apple</li>
        <li>ทำงานที่ NeXT และ Pixar</li>
        <li>กลับมาปรับโครงสร้าง Apple และเปิดตัว iMac, iPod, iPhone</li>
      </ul>
    </section>

    <fieldset style="margin-top:16px">
      <legend>Q1: การจัดหัวเรื่องในตัวอย่าง “ถูกต้องตามลำดับหรือไม่?”</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="answer='ถูกต้อง'"> ถูกต้อง</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='ไม่ถูกต้อง'"> ไม่ถูกต้อง</label>
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
          <li>โครงสร้างหัวเรื่องควรสะท้อนโครงสร้างเนื้อหา (SC 1.3.1, 2.4.6)</li>
          <li>ไม่ควรข้ามระดับจาก h1 ไป h3 โดยไม่มี h2</li>
          <li>ข้อความตัวหนาไม่ใช่หัวเรื่องเชิงความหมาย ควรใช้ &lt;h2&gt;, &lt;h3&gt;</li>
        </ul>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game2Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  answer?: string;
  show = false;
  result = '';
  awarded=false;
  check(){
    const correct = this.answer === 'ไม่ถูกต้อง';
    if (correct && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.result = correct ? 'ตอบถูกต้อง' : 'คำตอบควรเป็น: ไม่ถูกต้อง';
    this.show = true;
  }
  next(){ this.progress.unlock(3); this.router.navigateByUrl('/game/3'); }
}
