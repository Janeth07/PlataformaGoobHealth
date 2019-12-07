import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Influenzas} from '../interfaces/influenza.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private afs:AngularFirestore) { 
    this.influenzasCollection=afs.collection<Influenzas>('influenzas');
    this.influenzas=this.influenzasCollection.valueChanges();
  }
  private influenzasCollection: AngularFirestoreCollection<Influenzas>;
   private influenzas:Observable<Influenzas[]>;
   public selectInfluenza:Influenzas={
     id:null
};
private influenzasDoc:AngularFirestoreDocument<Influenzas>;
private Influenzas:Observable<Influenzas>;

   getInfluenzas(){
     return this.influenzas=this.influenzasCollection.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action=>{
         const data=action.payload.doc.data() as Influenzas;
         data.id=action.payload.doc.id;
         return data;
       });
     }));
   }

   updateInfluenzas(influenzas:Influenzas): void{
     let id=influenzas.id;
     this.influenzasDoc=this.afs.doc<Influenzas>(`influenzas/${id}`);
    this.influenzasDoc.update(influenzas);
   }

   deleteInfluenzas(id:string): void{
     this.influenzasDoc=this.afs.doc<Influenzas>(`influenzas/${id}`);
     this.influenzasDoc.delete();

   }

   addInfluenza(influenzas:any){
return this.influenzasCollection.add(influenzas);
   }
}
