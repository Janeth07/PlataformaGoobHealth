import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { Clientes } from '../interfaces/clientes.interface';
import { getLocaleTimeFormat } from '@angular/common';
import { element } from '@angular/core/src/render3';
import { AuthService } from 'app/auth.service';
import { ReportesService } from '../services/reportes.service';
//import { RegistrosService } from 'app/services/registros.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
public loading: boolean;
buscar:string;

  constructor(public clientesService: ClientesService,
   // public regService: RegistrosService,
     public reportesService:ReportesService) { 
    this.loading = true;
  }
  public clientes = [];
  public clientesFiltered = [];
  public cliente = '';
  public buscando:boolean = false;
  total: number;

  ngOnInit() { 
    this.clientesService.getClientes().subscribe(clientes => {
      console.log('CLIENTES', clientes);
      this.clientes = clientes;  
      this.loading = false;
     });
     
 }
 todos(){
  this.clientesService.getClientes().subscribe(clientes => {
    console.log('CLIENTES', clientes);
    this.clientes = clientes;
    this.loading = false;
   })
 }

 updateStatusTodos(): void{
  this.clientesService.updateStatusTodos();
 }

 Pagado(){
  this.reportesService.getClientes().subscribe(clientes => {
    //console.log('CLIENTES', clientes);
    this.clientes = clientes;
    this.loading = false;
    //Calculamos el TOTAL 
   this.total = this.clientes.reduce((
    acc,
    obj, 
  ) => acc + (obj.cantidad),
  0);
  //console.log("Total: ", this.total);
   })
 }
  onPreUpdateCliente(cliente: Clientes) {
    this.clientesService.selectCliente = Object.assign({}, cliente);
  }
 
  updateStatus(cliente:Clientes) {
    var estado = cliente.estatus == "Pagado" ? "Sin pagar" : "Pagado";
    const confirmacion = confirm ('¿Deseas cambiar el estatus?');
    if (confirmacion) {
    this.clientesService.updateStatus(cliente,estado);    
    }
    }

   cambiarEstatus(){
    
   }
    consultar(){
       if(this.buscar == ""){
         this.buscando=false;
       }else{
         this.buscando=true;
       this.clientesFiltered = this.clientes.filter(data =>{
         return (data.nombre.toString() == this.buscar || data.ruta.toString() == this.buscar);
       });
       console.log(this.clientesFiltered);
       }
    }
}
