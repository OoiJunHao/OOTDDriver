import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router,
    public sessionService: SessionService, private driverService: DriverService, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.username = "";
    this.password = "";
  }

  clear() {
    this.username = "";
    this.password = "";
  }

  driverLogin(driverLoginForm: NgForm) {
    if (this.username.length == 0) {
      this.loginFail("Please enter a valid username");
    } else if (this.username.length < 4 || this.username.length > 32) {
      this.loginFail("Please ensure that username is between 4 and 32 characters");
    } else if (this.password.length == 0) {
      this.loginFail("Please enter a valid password");
    } else if (this.password.length < 4 || this.password.length > 32) {
      this.loginFail("Please ensure that password is between 4 and 32 characters");
    } else if (driverLoginForm.valid) {
      this.sessionService.setUsername(this.username);
      this.sessionService.setPassword(this.password);

      this.driverService.driverLogin(this.username, this.password).subscribe(
        response => {
          let driver: Driver = response;
          if (driver != null) {
            this.sessionService.setIsLogin(true);
            this.sessionService.setCurrentDriver(driver);
            this.appComponent.updateMainMenu();
            this.router.navigate(["/index"]);
          } else {
            this.loginFail("Your Username And Password Does Not Match Or Have Not Registered An Account With Us. \n Please Try Again Or Register An Account With Us!");
          }
        },
        error => {
          this.loginFail("Your Username And Password Does Not Match Or Have Not Registered An Account With Us. \n Please Try Again Or Register An Account With Us!");
        }
      );
    } else {
      this.loginFail("An error has occured\nPlease try again");
    }
  }

  driverLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentDriver(null);
    this.appComponent.updateMainMenu();
    this.router.navigate(["/index"]);
  }

  back() {
    this.router.navigate(["/index"]);
  }

  registerDriver() {
    this.router.navigate(["/register"]);
  }

  async loginFail(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.position = "bottom";
    toast.duration = 4000;
    toast.style.textAlign = "center";
    toast.style.color = "#ff6054";

    document.body.appendChild(toast);
    return toast.present();
  }

}
