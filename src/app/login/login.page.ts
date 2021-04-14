import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  submitted: boolean;
  username: string;
  password: string;
  loginError: boolean;
  errorMessage: string;

  constructor(private router: Router, private toastController: ToastController,
    public sessionService: SessionService, private driverService: DriverService, private appComponent: AppComponent) {
    this.submitted = false;
  }

  ngOnInit() {
  }

  clear() {
    this.username = "";
    this.password = "";
  }

  driverLogin(driverLoginForm: NgForm) {
    this.submitted = true;
    if (driverLoginForm.valid) {
      this.sessionService.setUsername(this.username);
      this.sessionService.setPassword(this.password);

      this.driverService.driverLogin(this.username, this.password).subscribe(
        response => {
          let driver: Driver = response;
          if (driver != null) {
            this.sessionService.setIsLogin(true);
            this.sessionService.setCurrentDriver(driver);
            this.loginError = false;
            this.appComponent.updateMainMenu();
            this.router.navigate(["/index"]);
          } else {
            this.loginFail();
            this.loginError = true;
          }
        },
        error => {
          this.loginFail();
          this.loginError = true;
          this.errorMessage = error;
        }
      );
    } else {

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

  async loginFail() {
    console.log(">>>>> LOGIN FAIL <<<<<<");
    const toast = await this.toastController.create({
      color: 'error',
      duration: 2000,
      message: this.errorMessage,
    });
    await toast.present();
    // const toast = document.createElement('ion-toast');
    // toast.message = "Your Username And Password Does Not Match Or Have Not Registered An Account With Us. \n Please Try Again Or Register An Account With Us!";
    // toast.position = "top";
    // toast.duration = 4000;
    // toast.style.textAlign = "center";

    // document.body.appendChild(toast);
    // return toast.present();
  }

}
