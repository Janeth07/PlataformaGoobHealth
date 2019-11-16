import { Component, OnInit } from '@angular/core';
import {CobradoresService} from '../services/cobradores.service';
import {Cobradores} from '../interfaces/cobradores.interface';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-cobradores',
  templateUrl: './cobradores.component.html',
  styleUrls: ['./cobradores.component.scss']
})
export class CobradoresComponent implements OnInit {
public loading: boolean;

  constructor(public cobradoresService: CobradoresService) {
   }
   public cobradores = [] ;
   public cobrador = '';

  ngOnInit() {
    this.cobradoresService.getCobradores().subscribe(cobradores => {
      console.log('COBRADORES', cobradores);
      this.cobradores = cobradores;
      this.loading = false;
     })
  }

  saveCobrador(cobradorForm: NgForm): void {
    if (cobradorForm.value.id == null) {
      this.cobradoresService.addCobrador(cobradorForm.value);
    } else {
      this.cobradoresService.updateCobradores(cobradorForm.value);
    }
    cobradorForm.resetForm();
    alert('Cobrador registrado con exito');
  }

  onDeleteCobrador(id: string) {
    console.log('DELETE COBRADOR', id);
    const confirmacion = confirm ('¿Deseas eliminar el registro?');
    if (confirmacion) {
      this.cobradoresService.deleteCobrador(id);
    }
  }

  onPreUpdateCobrador(cobrador: Cobradores) {
    this.cobradoresService.selectCobrador = Object.assign({}, cobrador);
  }

  }

