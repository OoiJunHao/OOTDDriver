import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  driver: Driver;
  isLoggedIn: boolean;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.isLoggedIn = this.sessionService.getIsLogin();
    if (this.isLoggedIn) {
      this.driver = this.sessionService.getCurrentDriver();
    }
  }

}
