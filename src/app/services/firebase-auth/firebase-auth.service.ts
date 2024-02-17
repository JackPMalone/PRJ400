import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private fbService: FirebaseService) { localStorage.setItem('LoggedUser', 'hello') }



  IsLoggedIn(){
    return localStorage.getItem('LoggedUser');
  }
}
