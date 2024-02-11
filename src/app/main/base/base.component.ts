import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-main-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit{
  constructor(private datePipe: DatePipe){}

  ngOnInit(): void {
    this.GenerateData()
    this.CreateChart()
  }

  testDevices = [
    {name: 'Midfield', battery : 59, level: 49},
    {name: 'Meelick', battery : 100, level: 78},
    {name: 'Clooninsin', battery : 22, level: 33},
    {name: 'Clooninsin', battery : 22, level: 33},
    {name: 'Clooninsin', battery : 22, level: 33},
    {name: 'Clooninsin', battery : 22, level: 33}
  ]

  chart: any;

  check: Boolean = true;
  temp: {[key: string]: {Date:string, Depth: number, Temperature: number}} = {};
  heat: number = 11;
  depth: number = 73;
  currentDate: Date = new Date()

  CreateChart():void{
    const labels = Object.keys(this.temp)
    const depthData = Object.values(this.temp).map(entry => entry.Depth)
    const heatData = Object.values(this.temp).map(entry => entry.Temperature)

    this.chart = new Chart("MyChart",{
      type: 'line',

      data:{
        labels: labels,
        datasets:[
          {
            label: "Depth",
            data: depthData,
            backgroundColor: 'blue'
          },
          {
            label: "Temperature",
            data: heatData,
            backgroundColor: 'green'
          }
        ]
      },
      options:{
        aspectRatio: 2.5
      }
    });
  }

  GenerateData():void{
    for (let i = 0; i < 100; i++){
      const formattedDate = this.FormatDate(this.currentDate)
      const dataEntry = {
        "Date": formattedDate,
        "Depth": this.GenerateDepth(this.depth),
        "Temperature": this.GenerateTemp(this.heat)
      };
      this.temp[formattedDate] = dataEntry;
      this.heat = dataEntry.Temperature;
      this.depth = dataEntry.Depth;
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }

    console.table(this.temp)
  }

  FormatDate(date: Date): string{
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return new Intl.DateTimeFormat('en-IE', dateOptions).format(date);
  }

  GenerateDepth(depth: number): number{
    depth -= this.GetRandomInt(0, 6);
    if (depth < 1)
      depth = this.GetRandomInt(90, 100);

    return depth;
  }

  GenerateTemp(temp: number): number{
    temp += this.GetRandomInt(-3, 3);
    if (temp < -1)
      temp += this.GetRandomInt(0, 3);
    if (temp > 33)
      temp += this.GetRandomInt(-3, 0);

    return temp;
  }

  GetRandomInt(min: number, max: number): number{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  UpdateChart(){
    this.temp = {};
    this.chart.destroy();
    this.ngOnInit();
  }
}
