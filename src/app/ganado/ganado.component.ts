import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {BorregasService} from '../services/borregas.service';
import {Borregas} from '../interfaces/borregas.interface';
import {NgForm} from '@angular/forms';
import {CorralesService} from '../services/corrales.service';

@Component({
  selector: 'app-ganado',
  templateUrl: './ganado.component.html',
  styleUrls: ['./ganado.component.scss']
})
export class GanadoComponent implements OnInit {
  public loading: boolean;

  constructor(public borregasService: BorregasService, public corralesService: CorralesService) {
    this.loading = true;
  }
  public borregas = [] ;
  public borrega = '';
  public corrales = [];

  ngOnInit() {
    this.borregasService.getBorregas().subscribe(borregas => {
      console.log('BORREGAS', borregas);
      this.borregas = borregas;
      this.loading = false;
     })
     this.corralesService.getCorrales().subscribe(corrales => {
      console.log('CORRALES', corrales);
      this.corrales = corrales;
     })
  }

  saveBorrega(borregaForm: NgForm): void {
    if (borregaForm.value.id == null) {
      this.borregasService.addBorrega(borregaForm.value);
    } else {
      this.borregasService.updateBorregas(borregaForm.value);
    }
    borregaForm.resetForm();
    alert('Borrega registrada con exito');
  }

  onDeleteBorrega(id: string) {
    console.log('DELETE BORREGA', id);
    const confirmacion = confirm ('¿Deseas eliminar el registro?');
    if (confirmacion) {
      this.borregasService.deleteBorrega(id);
    }
  }

  onPreUpdateBorrega(borrega: Borregas) {
    this.borregasService.selectBorrega = Object.assign({}, borrega);
  }
}
