import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  private _score = new BehaviorSubject<number>(0);
  readonly score$ = this._score.asObservable();
  get score(): number { return this._score.value; }
  reset() { this._score.next(0); }
  add(points: number) { this._score.next(this._score.value + points); }
}

