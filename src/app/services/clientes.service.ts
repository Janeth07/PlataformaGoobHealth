import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Clientes} from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private afs:AngularFirestore) {
    this.clientesCollection=afs.collection<Clientes>('clientes');
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

   deleteCliente(id:string): void{
     this.clienteDoc=this.afs.doc<Clientes>(`clientes/${id}`);
     this.clienteDoc.delete();

   }

   addCliente(cliente:any){
     cliente.fecha_baja = new Date(cliente.fecha_baja).getTime();
     cliente.fecha_alta = new Date(cliente.fecha_alta).getTime();
     cliente.fecha_nac = new Date(cliente.fecha_nac).getTime();
     
     

return this.clientesCollection.add(cliente);
   }
}
