import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Dengues} from '../interfaces/dengue.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private afs:AngularFirestore) {
    this.denguesCollection=afs.collection<Dengues>('dengues');
    this.dengues=this.denguesCollection.valueChanges();
  }
   

   private denguesCollection: AngularFirestoreCollection<Dengues>;
   private dengues:Observable<Dengues[]>;
   public selectDengue:Dengues={
     id:null
   };
   private dengueDoc:AngularFirestoreDocument<Dengues>;
   private dengue:Observable<Dengues>;

   getDengues(){
     return this.dengues=this.denguesCollection.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action=>{
         const data=action.payload.doc.data() as Dengues;
         data.id=action.payload.doc.id;
         return data;
       });
     }));
   }

   updateClientes(dengue:Dengues): void{
     let id=dengue.id;
     this.dengueDoc=this.afs.doc<Dengues>(`dengues/${id}`);
    this.dengueDoc.update(dengue);
   }
   

}
