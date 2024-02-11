import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-device',
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  @Input() device: any = {}
}
