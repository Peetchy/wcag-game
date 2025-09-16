import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h1>เรียนรู้ Web Accessibility ตามมาตรฐาน WCAG 2.2</h1>
      <p class="muted">วัตถุประสงค์ของเกมส์</p>
      <ul>
        <li>ทำความเข้าใจแนวคิดสำคัญของ WCAG 2.2 ผ่านสถานการณ์จำลอง</li>
        <li>ฝึกระบุปัญหาและเสนอวิธีแก้ที่ถูกต้อง</li>
        <li>เห็นตัวอย่างโค้ดที่ถูก/ผิด และลองแก้ไขทันที</li>
      </ul>
      <p>
        <a routerLink="/game/1" class="btn primary" aria-label="เริ่มเกมส์">เริ่มเกมส์</a>
      </p>
      <p class="muted">แต่ละเกมส์ให้ 10 คะแนน (รวม 100 คะแนน)</p>
    </section>
  `
})
export class HomeComponent {}

