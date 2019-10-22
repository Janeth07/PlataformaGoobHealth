import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { RegistrarService } from './../services/registrar.service';
import { Registar } from './../interfaces/registrar.interfaces';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(public registarService: RegistrarService) { }
  public registar = [];
  public registro = '';
  ngOnInit() {
    this.registarService.getRegistar().subscribe(registar => {
      console.log('REGISTRO', registar);
      this.registar = registar;
     })
  }
  saveRegistar(registroForm: NgForm): void {
    if (registroForm.value.id == null) {
      this.registarService.addRegistro(registroForm.value);
    } else {
      this.registarService.updateRegistar(registroForm.value);
    }
    registroForm.resetForm();
    alert(' se a registrado con exito');
  }

  onDeleteRegistro(id: string) {
    console.log('DELETE Registro', id);
    const confirmacion = confirm ('¿Deseas eliminar el registro?');
    if (confirmacion) {
      this.registarService.deleteRegistar(id);
    }
  }

  onPreUpdateRegistro(registro: Registar) {
    this.registarService.selectregistar = Object.assign({}, registro);
  }
  myFunction() {
    var com = prompt("Escribe tu Comentario");
    this.registarService.selectregistar.comentario = com;
    }
}
