import { Injectable } from '@angular/core';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getIsLogin(): boolean {
    if (sessionStorage.isLogin == "true") {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.isLogin = isLogin;
  }

  getCurrentDriver(): Driver {
    return JSON.parse(sessionStorage.currentDriver);
  }

  setCurrentDriver(currentDriver: Driver | null): void {
    sessionStorage.currentDriver = JSON.stringify(currentDriver);
  }

  getUsername(): string {
    return sessionStorage.username;
  }



  setUsername(username: string | undefined): void {
    sessionStorage.username = username;
  }



  getPassword(): string {
    return sessionStorage.password;
  }



  setPassword(password: string | undefined): void {
    sessionStorage.password = password;
  }
}
