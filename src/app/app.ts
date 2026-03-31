import { Component, OnInit, signal } from '@angular/core';
import { AppLayout } from './layout/header/app-layout.component';
import { IndexDB } from './_db/indexdb.service';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AppLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('qc-app');
  constructor(private dbService: IndexDB) { }
  async ngOnInit(): Promise<void> {
    try {
      await this.dbService.init();
    } catch (error) {
      console.log('Failed to connect DB!', error)
    }
  }
}
