import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // email: string;
  // password: string;

  constructor(private authService: FirebaseAuthService) {}

  async login(email: string, password: string){
    try{
      const user = await this.authService.login(email, password);
      console.log('Logged in user:', user);
    } catch(err){
      console.error('Login Unsuccessful:', err)
    }
  }
}
