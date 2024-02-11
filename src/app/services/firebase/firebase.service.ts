import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private baseUrl = 'https://us-central1-prj400-c5407.cloudfunctions.net'

  constructor(private http: HttpClient) { }

  getHelloWorld(): Observable<string>{
    return this.http.get<string>(`${this.baseUrl}/helloWorld`)
  }
}
