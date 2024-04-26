import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  logIn!: FormGroup;

  constructor(private authService: FirebaseAuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.logIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    if (this.logIn.valid){
      this.login()
      return;
    }
  }

  async login(){
    try{
      const user = await this.authService.login(this.logIn.get('email')?.value, this.logIn.get('password')?.value)
      console.log('Logged in user:', user)
      this.router.navigateByUrl('/home')
    } catch (err){
      console.error('Login unsuccessful:', err)
    }
  }
}