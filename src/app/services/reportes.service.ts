import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Clientes} from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private afs:AngularFirestore) { 
    this.clientesCollection=afs.collection<Clientes>('clientes',ref=>{
      return ref.where('estatus','==','Pagado')
    });
    this.clientes=this.clientesCollection.valueChanges();
  }
  private clientesCollection: AngularFirestoreCollection<Clientes>;
   private clientes:Observable<Clientes[]>;
   public selectCliente:Clientes={
     id:null
   };
   private clienteDoc:AngularFirestoreDocument<Clientes>;
   private cliente:Observable<Clientes>;

   getClientes(){
     return this.clientes=this.clientesCollection.snapshotChanges()
     .pipe(map(changes => {
       return changes.map(action=>{
         const data=action.payload.doc.data() as Clientes;
         data.id=action.payload.doc.id;
         return data;
       });
     }));
   }

   updateClientes(cliente:Clientes): void{
     let id=cliente.id;
     this.clienteDoc=this.afs.doc<Clientes>(`clientes/${id}`);
    this.clienteDoc.update(cliente);
   }
   
   updateStatus(cliente:Clientes,newStatus:string): void{
    let id=cliente.id;
    cliente.estatus=newStatus
    this.clienteDoc=this.afs.doc<Clientes>(`clientes/${id}`);
    this.clienteDoc.update(cliente);
  }

   deleteCliente(id:string): void{
     this.clienteDoc=this.afs.doc<Clientes>(`clientes/${id}`);
     this.clienteDoc.delete();

   }
}
