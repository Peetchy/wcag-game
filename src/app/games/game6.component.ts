import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';
import { ModalComponent } from '../components/modal.component';
import { NgIf } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-game6',
  standalone: true,
  imports: [ModalComponent, NgIf],
  template: `
    <h2>6) ภาษาของเนื้อหา (Using lang Attribute)</h2>
    <div class="card">
      <h3 style="margin-top:0">ตัวอย่างเนื้อหาภาษาต่างประเทศ</h3>
      <div class="grid cols-2" style="gap:12px; align-items:start">
        <div>
          <div class="muted">ตัวอย่างที่ผิด (ไม่ระบุ lang เฉพาะช่วง)</div>
          <p>คำทักทายหลายภาษา: <em>สวัสดี</em>, <em>Hello</em>, <em>Bonjour</em>, <em>Hola</em>, <em>Olá</em></p>
          <pre class="code" ngNonBindable>&lt;html lang="th"&gt;
  ...
  &lt;p&gt;คำทักทายหลายภาษา: &lt;em&gt;สวัสดี&lt;/em&gt;, &lt;em&gt;Hello&lt;/em&gt;, &lt;em&gt;Bonjour&lt;/em&gt;, &lt;em&gt;Hola&lt;/em&gt;, &lt;em&gt;Olá&lt;/em&gt;&lt;/p&gt;
&lt;/html&gt;</pre>
        </div>
        <div>
          <div class="muted">ตัวอย่างที่ถูก (ระบุ lang เฉพาะช่วง)</div>
          <p>คำทักทายหลายภาษา: <span lang="th">สวัสดี</span>, <span lang="en">Hello</span>, <span lang="fr">Bonjour</span>, <span lang="es">Hola</span>, <span lang="pt">Olá</span></p>
          <pre class="code" ngNonBindable>&lt;html lang="th"&gt;
  ...
  &lt;p&gt;คำทักทายหลายภาษา: &lt;span lang="th"&gt;สวัสดี&lt;/span&gt;, &lt;span lang="en"&gt;Hello&lt;/span&gt;, &lt;span lang="fr"&gt;Bonjour&lt;/span&gt;, &lt;span lang="es"&gt;Hola&lt;/span&gt;, &lt;span lang="pt"&gt;Olá&lt;/span&gt;&lt;/p&gt;
&lt;/html&gt;</pre>
        </div>
      </div>
    </div>

    <fieldset style="margin-top:16px">
      <legend>Q1: วิธีใด “เหมาะสม” เพื่อให้โปรแกรมอ่านหน้าจอออกเสียงได้ถูกภาษา?</legend>
      <div class="options">
        <label class="option"><input type="radio" name="q1" (change)="answer='A'"> A) ปล่อยไว้ไม่ต้องระบุ lang</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='B'"> B) ระบุ lang ของหน้าไว้ที่ &lt;html&gt; และระบุ lang เฉพาะช่วงสำหรับภาษาต่างประเทศ</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='C'"> C) ใช้ CSS เปลี่ยนฟอนต์แทนการระบุ lang</label>
        <label class="option"><input type="radio" name="q1" (change)="answer='D'"> D) ใส่ title บนข้อความต่างภาษา</label>
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
          <li>SC 3.1.1 Language of Page: ระบุภาษาเอกสารที่ &lt;html lang="th"&gt;</li>
          <li>SC 3.1.2 Language of Parts: ระบุ lang สำหรับช่วงข้อความต่างภาษา เช่น &lt;span lang="en"&gt; / &lt;span lang="fr"&gt; / &lt;span lang="ja"&gt;</li>
          <li>โปรแกรมอ่านหน้าจออาศัย lang เพื่อเลือกเสียงอ่าน/กฎการออกเสียงที่ถูกต้อง</li>
        </ul>
        <p><button class="btn" (click)="show=false">ปิด</button></p>
      </div>
    </app-modal>
  `
})
export class Game6Component {
  router = inject(Router);
  score = inject(ScoreService);
  progress = inject(ProgressService);
  answer?: string; show=false; result='';
  awarded=false;
  check(){
    const correct = this.answer === 'B';
    if (correct && !this.awarded) { this.score.add(10); this.awarded=true; }
    this.result = correct ? 'ตอบถูกต้อง' : 'คำตอบที่เหมาะสมคือข้อ B';
    this.show = true;
  }
  next(){ this.progress.unlock(7); this.router.navigateByUrl('/game/7'); }
}
