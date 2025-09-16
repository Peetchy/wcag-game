import { Injectable } from '@angular/core';

const KEY = 'a11y_game_progress_max_unlocked';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private maxUnlocked = 1;
  constructor(){
    const raw = localStorage.getItem(KEY);
    const n = raw ? parseInt(raw, 10) : 1;
    this.maxUnlocked = isNaN(n) ? 1 : Math.max(1, n);
  }
  canAccess(n: number){
    return n <= this.maxUnlocked;
  }
  unlock(n: number){
    if (n > this.maxUnlocked) {
      this.maxUnlocked = n;
      localStorage.setItem(KEY, String(this.maxUnlocked));
    }
  }
  reset(){
    this.maxUnlocked = 1;
    localStorage.setItem(KEY, '1');
  }
}

