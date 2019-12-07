import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Dengues } from 'app/interfaces/dengue.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasosService {

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

   updateDengues(dengues:Dengues): void{
     let id=dengues.id;
     this.dengueDoc=this.afs.doc<Dengues>(`dengues/${id}`);
    this.dengueDoc.update(dengues);
   }

   deleteDengues(id:string): void{
     this.dengueDoc=this.afs.doc<Dengues>(`dengues/${id}`);
     this.dengueDoc.delete();

   }

   addDengues(dengues:any){
return this.denguesCollection.add(dengues);
   }
}

