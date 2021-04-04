import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  submitted: boolean;
  newDriver: Driver;

  firstname: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
  profilePicture: string;

  registrationError: boolean;
  registrationSuccess: boolean;
  message: string;
  errorMessage: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private driverService: DriverService,
    public toastController: ToastController) {
    this.submitted = false;
    this.newDriver = new Driver();
    this.registrationSuccess = false;
    this.registrationError = false;
  }

  ngOnInit() {
  }

  register(registrationForm: NgForm) {
    this.submitted = true;

    if (registrationForm.valid) {
      this.newDriver.active = true;
      this.driverService.createNewDriver(this.newDriver).subscribe(
        response => {
          let newDriverId: number = response.driverId;
          this.registrationSuccess = true;
          this.registrationError = false;
          this.message = "New account created successfully";

          this.newDriver = new Driver();
          this.submitted = false;
          this.registerSuccess();
          registrationForm.reset();
        },
        error => {
          this.registrationError = true;
          this.registrationSuccess = false;
          this.registerFailure();
          this.message = "An error has occurred while creating the new customer: " + error;
        }
      );
    }
    this.registerFailure();
  }

  back(): void {
    this.router.navigate(["/login"]);
  }

  clear(): void {
    this.submitted = false;
    this.newDriver = new Driver();
  }

  async registerSuccess() {
    const toast = document.createElement('ion-toast');
    toast.message = "Registration is Successful";
    toast.position = "top";
    toast.duration = 2000;
    toast.style.textAlign = "center";

    document.body.appendChild(toast);
    return toast.present();
  }

  async registerFailure() {
    const toast = document.createElement('ion-toast');
    toast.message = "Registration is not successful, you have either missing or incorrect fields!";
    toast.position = "top";
    toast.duration = 2000;
    toast.style.textAlign = "center";

    document.body.appendChild(toast);
    return toast.present();
  }

}
