import { Component, signal } from '@angular/core';
import { AppLayout } from './layout/header/app-layout.component';

@Component({
  selector: 'app-root',
  imports: [AppLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('qc-app');
}
