import { Component } from '@angular/core';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { SessionService } from './services/session.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages;

  constructor(public sessionService: SessionService, private platform: Platform) {
    // this.initialiseApp();
    this.updateMainMenu();
  }

  initialiseApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.updateMainMenu();
  }

  updateMainMenu() {
    if (this.sessionService.getIsLogin()) { //put all the after new pages here thx
      this.appPages = [
        {
          title: 'Home',
          url: '/index',
          icon: 'home'
        },
        {
          title: 'Logout',
          url: '/login',
          icon: 'log-out'
        },
        {
          title: 'My Profile',
          url: '/profile-management',
          icon: 'book'
        }
      ];
    } else {
      this.appPages = [
        {
          title: 'Home',
          url: '/index',
          icon: 'home'
        },

        {
          title: 'Login/Register',
          url: '/login',
          icon: 'log-in'
        }
      ];
    }
  }
}
