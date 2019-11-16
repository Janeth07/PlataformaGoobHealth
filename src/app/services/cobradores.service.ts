import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cobradores} from '../interfaces/cobradores.interface';

@Injectable({
  providedIn: 'root'
})
export class CobradoresService {

  constructor(private afs:AngularFirestore) { 
    this.cobradoresCollection=afs.collection<Cobradores>('cobradores');
    this.cobradores=this.cobradoresCollection.valueChanges();
  }
  private cobradoresCollection: AngularFirestoreCollection<Cobradores>;
   private cobradores:Observable<Cobradores[]>;
   public selectCobrador:Cobradores={
     id:null
   };
   private cobradorDoc:AngularFirestoreDocument<Cobradores>;
   private cobrador:Observable<Cobradores>;

   getCobradores(){
     return this.cobradores=this.cobradoresCollection.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action=>{
         const data=action.payload.doc.data() as Cobradores;
         data.id=action.payload.doc.id;
         return data;
       });
     }));
   }

   updateCobradores(cobrador:Cobradores): void{
     let id=cobrador.id;
     this.cobradorDoc=this.afs.doc<Cobradores>(`cobradores/${id}`);
    this.cobradorDoc.update(cobrador);
   }

   deleteCobrador(id:string): void{
     this.cobradorDoc=this.afs.doc<Cobradores>(`cobradores/${id}`);
     this.cobradorDoc.delete();

   }

   addCobrador(cobrador:any){
     cobrador.fecha_baja = new Date(cobrador.fecha_baja).getTime();
     cobrador.fecha_alta = new Date(cobrador.fecha_alta).getTime();
     cobrador.fecha_nac = new Date(cobrador.fecha_nac).getTime();
     
     

return this.cobradoresCollection.add(cobrador);
   }
}
