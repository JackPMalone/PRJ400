import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { Chart } from 'chart.js';
import { Data } from '@angular/router';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit{
  info!: any;
  constructor(private fire: FirebaseService, private auth: FirebaseAuthService){}
  ngOnInit(): void {
    this.info = this.fire.getItems(this.auth.getCurrentUserID())
    this.CreateChart();
  }

  chart: any;

  CreateChart(){
    const limitedData = this.info.data.slice(0, 20);

    const labels = limitedData.map((entry: DataEntry) => entry.date) //Object.values(this.info.data.date).map(entry => entry)
    const depthdata =  limitedData.map((entry: DataEntry)=>entry.depth);//Object.values(this.info.data.depth).map(entry => entry)

    this.chart = new Chart("MyChart", {
      type: 'line',

      data:{
        labels: labels,
        datasets:[
          {
            label: "Depth",
            data: depthdata,
            backgroundColor: 'blue'
          }
        ]
      },
      options:{
        aspectRatio: 2.5
      }
    })
  }
}

export interface DataEntry {
  date: string;
  depth: string;
}