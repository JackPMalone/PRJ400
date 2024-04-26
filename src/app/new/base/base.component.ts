import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit{
  newDev!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private fire: FirebaseService, private auth: FirebaseAuthService){}

  ngOnInit(): void {
    this.newDev = this.fb.group({
      devName: ['', [Validators.required]],
      devID: ['', [Validators.required]]
    })
  }

  async AddNewDevice(){
    
    if (this.newDev.valid){
      try{
        this.fire.addNewDevice(this.newDev.get('devID')?.value, this.newDev.get('devName')?.value)
      } catch (err){
        console.error('Adding to database unsuccessful:', err)
      }
      this.router.navigateByUrl('/home')
    }
  }
}
