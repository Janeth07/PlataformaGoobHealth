import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ClientesService} from '../services/clientes.service';
import {Clientes} from '../interfaces/clientes.interface';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public loading: boolean;

  constructor(public clientesService: ClientesService) {
    this.loading = true;
   
  }
  public clientes = [] ;
  public cliente = '';


  ngOnInit() {
    this.clientesService.getClientes().subscribe(clientes => {
      console.log('CLIENTES', clientes);
      this.clientes = clientes;
      this.loading = false;
     })
  }

  

  saveCliente(clienteForm: NgForm): void {
    if (clienteForm.value.id == null) {
      this.clientesService.addCliente(clienteForm.value);
    } else {
      this.clientesService.updateClientes(clienteForm.value);
    }
    clienteForm.resetForm();
    alert('Cliente registrado con exito');
  }

  onDeleteCliente(id: string) {
    console.log('DELETE CLIENTE', id);
    const confirmacion = confirm ('¿Deseas eliminar el registro?');
    if (confirmacion) {
      this.clientesService.deleteCliente(id);
    }
  }

  onPreUpdateCliente(cliente: Clientes) {
    this.clientesService.selectCliente = Object.assign({}, cliente);
  }
}
