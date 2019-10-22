import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {GanaderosService} from '../services/ganaderos.service';
import {NgForm} from '@angular/forms';
import { Ganaderos } from './../interfaces/ganaderos.interface';



@Component({
  selector: 'app-ganaderos',
  templateUrl: './ganaderos.component.html',
  styleUrls: ['./ganaderos.component.css']
})
export class GanaderosComponent implements OnInit {
public loading: boolean;

  constructor(public ganaderosService: GanaderosService) { 
    this.loading = true;
  }
  public ganaderos = [];
  public ganadero = '';
  ngOnInit() {
    this.ganaderosService.getGanaderos().subscribe(ganaderos => {
      console.log('Ganaderos', ganaderos);
      this.ganaderos = ganaderos;
      this.loading = false;
     })
  }
  saveGanadero(ganaderoForm: NgForm): void {
    if (ganaderoForm.value.id == null) {
      this.ganaderosService.addGanaderos(ganaderoForm.value);
    } else {
      this.ganaderosService.updateGanaderos(ganaderoForm.value);
    }
    ganaderoForm.resetForm();
    alert('Ganaderos registrado con exito');
  }

  onDeleteGanaderos(id: string) {
    console.log('DELETE Ganadero', id);
    const confirmacion = confirm ('¿Deseas eliminar el registro?');
    if (confirmacion) {
      this.ganaderosService.deleteGanaderos(id);
    }
  }

  onPreUpdateGanaderos(ganadero: Ganaderos) {
    this.ganaderosService.selectGanadero = Object.assign({}, ganadero);
  }
}
