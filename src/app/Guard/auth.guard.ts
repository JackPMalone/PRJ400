import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{
  constructor(private router: Router, private fbAuth: FirebaseAuthService) {}

  canActivate(): boolean{
    if (this.fbAuth.IsLoggedIn() == 'hello'){
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
  
// };
