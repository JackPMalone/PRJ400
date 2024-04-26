import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items!: Observable<any[]>;
  docId!: string;
  documentExists!: boolean;
  
  constructor(private firestore: AngularFirestore, private auth: FirebaseAuthService) { }

  // getItems(docId: string): Observable<any[]>{
  getItems(userId: string): any{
    console.log('User id:', userId)
    this.firestore.collection('users').doc(userId).valueChanges().subscribe((data: any) =>{
      this.docId = data.id
    })

    console.log('document id:', this.docId)

    this.firestore.collection('devices').doc(this.docId).valueChanges().subscribe((data: any) =>{
      this.items = data;
    })
    console.log("items",this.items)
    return this.items;
  }

  addNewDevice(docId: string, docName: string){
    this.firestore.collection('users').doc(this.auth.getCurrentUserID()).set({id: docId, name: docName})
  }

  deviceName!: string;

  getDeviceName(userId:string):string{
    this.firestore.collection('users').doc(userId).valueChanges().subscribe((data: any) =>{
      this.deviceName = data.name
    })

    return this.deviceName
  }
}
