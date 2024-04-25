import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signUp!: FormGroup;

  constructor(private authService: FirebaseAuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit():void {
    this.signUp = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)]
    })
  }

  onSubmit(){
    this.router.navigateByUrl('/home')
    console.log(this.signUp.value)
    // if (this.signUp.valid){
    //   this.signin()
    //   return;
    // }

    // if (this.signUp.value)

    // alert('Invalid entries\nThere was an invalid input, please try entering in correct values');
  }

  async signin(){

    try{
      const user = await this.authService.signup(this.signUp.get('email')?.value, this.signUp.get('password')?.value);
      console.log('Logged in user:', user);
    } catch (err) {
      console.error('Login unsuccessful:', err);
    }
  }
}
