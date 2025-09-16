import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScoreService } from './services/score.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <h1>สรุปคะแนน</h1>
    <p>คุณทำได้ <strong>{{ scoreSvc.score$ | async }}</strong> / 100 คะแนน</p>
    <p>
      <a routerLink="/" class="btn">เล่นใหม่</a>
      <a routerLink="/game/1" class="btn primary">เริ่มด่าน 1 อีกครั้ง</a>
    </p>
  `
})
export class SummaryComponent {
  scoreSvc = inject(ScoreService);
}

