import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  async signup(email: string, password: string) {
    try {
      const credential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      const user = credential.user;
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async login(email: string, password: string){
    try{
      const credential = await this.fireAuth.signInWithEmailAndPassword(email, password);
      const user = credential.user;
      return user;
    } catch (err){
      console.error(err);
      throw err;
    }
  }

  logout(){
    return this.fireAuth.signOut();
  }

  getCurrentUser(){
    return this.fireAuth.authState;
  }
}
