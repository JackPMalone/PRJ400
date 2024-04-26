import { Component, Input, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-device',
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  @Input() device!: any;

  constructor(private auth: FirebaseAuthService, private fire: FirebaseService, private datePipe: DatePipe, private router: Router) {}

  GetName(): string{
    return this.fire.getDeviceName(this.auth.getCurrentUserID())
  }

  Change(){
    this.router.navigateByUrl('/device')
  }
}
