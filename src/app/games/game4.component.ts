import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game4',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>4) บริบทและวัตถุประสงค์ของลิงก์ (Link Purpose/Context)</h2>
    <div class="grid cols-1" style="gap:16px">
      <article class="card" aria-labelledby="ex1-title">
        <h3 id="ex1-title">รายงานประจำไตรมาส Q2/2025</h3>
        <p>บริษัทเรามีผลประกอบการเติบโตขึ้น 12% เมื่อเทียบกับปีก่อน รายละเอียดเชิงลึกสามารถอ่านได้ในรายงานฉบับเต็ม</p>
        <p>
          <a href="#" (click)="$event.preventDefault()" class="btn link">
            <span aria-hidden="true">📄</span>
            ที่นี่
          </a>
        </p>
      </article>

      <article class="card" aria-labelledby="ex2-title">
        <h3 id="ex2-title">เปิดตัว iPhone Air รุ่นใหม่ น้ำหนักเบาเฉียบ</h3>
        <p>iPhone Air มาพร้อมชิปประมวลผลล่าสุดและจอภาพ ProMotion 120Hz ราคาพิเศษสำหรับผู้สั่งซื้อล่วงหน้า</p>
        <p>
          <a href="#" (click)="$event.preventDefault()" class="btn link">คลิกที่นี่</a>
        </p>
      </article>

      <article class="card" aria-labelledby="ex3-title">
        <h3 id="ex3-title">ข่าว: ขยายสาขาเพิ่ม 5 แห่งทั่วประเทศ</h3>
        <p>เพื่อรองรับการเติบโต เราได้ขยายสาขาเพิ่มเติมและปรับปรุงบริการลูกค้า คุณสามารถอ่านรายละเอียดผลประกอบการและแผนลงทุนได้จากรายงานอย่างเป็นทางการ</p>
        <p>
          <a href="#" (click)="$event.preventDefault()" class="btn link">คลิกที่นี่เพื่อดาวน์โหลด รายงานงบการเงินในรูปแบบ PDF</a>
        </p>
      </article>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: บทความใด “กำหนดวัตถุประสงค์ของลิงก์ไม่ถูกต้อง”</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="q1=1"> 1</label>
        <label class="option"><input type="radio" name="q1" (change)="q1=2"> 2</label>
        <label class="option"><input type="radio" name="q1" (change)="q1=3"> 3</label>
      </div>
    </fieldset>

    <fieldset style="margin-top:8px">
      <legend>Q2: บทความใด “สื่อความหมายของลิงก์ได้เหมาะสมที่สุด”</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q2" (change)="q2=1"> 1</label>
        <label class="option"><input type="radio" name="q2" (change)="q2=2"> 2</label>
        <label class="option"><input type="radio" name="q2" (change)="q2=3"> 3</label>
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
          <li>ลิงก์ “ที่นี่/คลิกที่นี่” ไม่สื่อวัตถุประสงค์เมื่ออ่านแยกบริบท (SC 2.4.4, 2.4.9)</li>
          <li>ตัวอย่างที่ 3 ให้ข้อมูลปลายทางชัดเจน จึงดีที่สุด</li>
        </ul>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game4Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  q1?: number; q2?: number;
  show = false; r1=''; r2='';
  awarded=false;
  check(){
    const c1 = this.q1 === 1; // 5 คะแนน
    const c2 = this.q2 === 3; // 5 คะแนน
    const points = (c1?5:0) + (c2?5:0);
    if (points>0 && !this.awarded) { this.score.add(points); this.awarded=true; }
    this.r1 = c1 ? 'ถูกต้อง' : 'ไม่ถูกต้อง (ควรเป็น 1)';
    this.r2 = c2 ? 'ถูกต้อง' : 'ไม่ถูกต้อง (ควรเป็น 3)';
    this.show = true;
  }
  next(){ this.progress.unlock(5); this.router.navigateByUrl('/game/5'); }
}
