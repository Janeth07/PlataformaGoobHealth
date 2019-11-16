import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { Clientes } from '../interfaces/clientes.interface';
import { getLocaleTimeFormat } from '@angular/common';
import { element } from '@angular/core/src/render3';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  
buscar:string;

  constructor(public clientesService: ClientesService) { }
  public clientes = [];
  public clientesFiltered = [];
  public cliente = '';
  public buscando:boolean = false;
  

  ngOnInit() {
    this.clientesService.getClientes().subscribe(clientes => {
      console.log('CLIENTES', clientes);
      this.clientes = clientes;
     })
  }
 


  onPreUpdateCliente(cliente: Clientes) {
    this.clientesService.selectCliente = Object.assign({}, cliente);
  }
 
  updateStatus(cliente:Clientes) {
    var estado = cliente.estatus == "pagado" ? "Sin pagar" : "pagado";
    const confirmacion = confirm ('¿Deseas cambair el estatus?');
    if (confirmacion) {
    this.clientesService.updateStatus(cliente,estado);
    
      
    }
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
