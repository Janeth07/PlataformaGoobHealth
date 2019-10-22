import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CorralesService} from '../services/corrales.service';
import {Corrales} from '../interfaces/corrales.interface';
import {NgForm} from '@angular/forms';
import { CategoriaAnimal } from '../interfaces/corrales.interface';

@Component({
  selector: 'app-corrales',
  templateUrl: './corrales.component.html',
  styleUrls: ['./corrales.component.css']
})
export class CorralesComponent implements OnInit {
public loading: boolean;

  checks: CategoriaAnimal = {destete: false, vientre: false, semental: false, coordero: false};
  constructor(public corralesService: CorralesService) {
    this.loading = true;
   }

@ViewChild ('btnClose') btnClose : ElementRef;
public corrales=[];
public corral='';

  ngOnInit() {
    this.corralesService.getCorrales().subscribe(corrales => {
     console.log('CORRALES', corrales);
     this.corrales = corrales;
     this.loading = false;
    })
  }
  resetChecks(corralForm: NgForm) {
    this.checks = {destete: false, vientre: false, semental: false, coordero: false};
    corralForm.reset();
  }
  saveCorral(corralForm: NgForm): void {
    if (corralForm.value.id == null) {
      this.corralesService.addCorral(corralForm.value, this.checks);
      this.checks = {destete: false, vientre: false, semental: false, coordero: false};
    } else {
      this.corralesService.updateCorrales(corralForm.value, this.checks);
      this.checks = {destete: false, vientre: false, semental: false, coordero: false};
    }
    corralForm.reset();
    alert('Corral registrado con exito');
  }

  onDeleteCorral(id: string) {
    console.log('DELETE CORRAL', id);
    const confirmacion = confirm ('¿Deseas eliminar el registro?');
    if (confirmacion) {
      this.corralesService.deleteCorral(id);
    }
  }

  onPreUpdateCorral(corral: Corrales) {
    this.checks = corral.aloja;
    this.corralesService.selectCorral = Object.assign({}, corral);
  }
}
