import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Game1Component } from './games/game1.component';
import { Game2Component } from './games/game2.component';
import { Game3Component } from './games/game3.component';
import { Game4Component } from './games/game4.component';
import { Game5Component } from './games/game5.component';
import { Game6Component } from './games/game6.component';
import { Game7Component } from './games/game7.component';
import { Game8Component } from './games/game8.component';
import { Game9Component } from './games/game9.component';
import { Game10Component } from './games/game10.component';
import { SummaryComponent } from './summary.component';
import { gameGuard } from './guards/game.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'game/1', component: Game1Component, canActivate: [gameGuard(1)] },
  { path: 'game/2', component: Game2Component, canActivate: [gameGuard(2)] },
  { path: 'game/3', component: Game3Component, canActivate: [gameGuard(3)] },
  { path: 'game/4', component: Game4Component, canActivate: [gameGuard(4)] },
  { path: 'game/5', component: Game5Component, canActivate: [gameGuard(5)] },
  { path: 'game/6', component: Game6Component, canActivate: [gameGuard(6)] },
  { path: 'game/7', component: Game7Component, canActivate: [gameGuard(7)] },
  { path: 'game/8', component: Game8Component, canActivate: [gameGuard(8)] },
  { path: 'game/9', component: Game9Component, canActivate: [gameGuard(9)] },
  { path: 'game/10', component: Game10Component, canActivate: [gameGuard(10)] },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: '' }
];
