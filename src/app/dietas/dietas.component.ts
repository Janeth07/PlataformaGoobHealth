import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import {DietasService} from '../services/dietas.service';
import {Dietas} from '../interfaces/dietas.interface';
import {NgForm, FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import { CorralesService } from 'app/services/corrales.service';
import { Ingredientes } from 'app/interfaces/ingredientes.interface';

@Component({
  selector: 'app-dietas',
  templateUrl: './dietas.component.html',
  styleUrls: ['./dietas.component.css']
})
export class DietasComponent implements OnInit {
  public loading: boolean;
  corralesID: string[];
  checks: string[] = [];
  fg: FormGroup;
  constructor(public dietasService: DietasService, public cs: CorralesService) {
   this.loading = true;
  }

  @ViewChild ('btnClose') btnClose : ElementRef;
  public dietas = [];
  public dieta = '';
  public corrales = [];
  public detalle: string = "";
  ingrediente: string = "";
  cantidad: number = 0;
  presentacion: string = "";
  public ingredientes: Ingredientes[] = [];
  ngOnInit() {
    this.dietasService.getDietas().subscribe(dietas => {
      console.log('DIETAS', dietas);
      this.dietas = dietas;
      this.loading = false;
     })
     this.cs.getCorrales().subscribe(corrales => {
       // tslint:disable-next-line: no-unused-expression
      this.corralesID = corrales.map(val  => val.id);
      this.corrales = corrales;
      console.log('CORRALES', corrales);
      console.log('CORRALES IDs', this.corralesID);
    });
   }
   addIngerdiente() {
     var ing: Ingredientes = {cantidad: this.cantidad,
                              ingrediente: this.ingrediente,
                              presentacion: this.presentacion};
     console.log(ing);
     this.ingredientes.push(ing);
     this.ingrediente = "";
     this.cantidad = 0;
     this.presentacion = "";
     console.log(this.ingredientes);
   }
   setDetalle(event: any) {
     console.log(event.target.value);
     this.detalle = event.target.value;
   }
   addCheck(check) {
    let index = this.checks.indexOf(check)
    if (index == -1) {
      this.checks.push(check);
    } else {
       this.checks.splice(index);
    }
    console.log(this.checks);
   }
   resetChecks(dietaForm: NgForm) {
    dietaForm.reset();
  }
   saveDietas(dietaForm: NgForm): void {
     if (dietaForm.value.id == null) {
       this.dietasService.addDieta(dietaForm.value, this.ingredientes);
     } else {
       this.dietasService.updateDietas(dietaForm.value, this.checks);
     }
     dietaForm.resetForm();
     alert('Dieta registrada con exito');
   }
 asignarDietas(dietaForm: NgForm) {
   console.log("VAL: ", dietaForm.value);
  this.dietasService.updateDietas(dietaForm.value, this.checks);
  dietaForm.resetForm();
 }
   onDeleteDieta(id: string) {
     console.log('DELETE DIETA', id);
     const confirmacion = confirm ('¿Deseas eliminar el registro?');
     if (confirmacion) {
       this.dietasService.deleteDieta(id);
     }
   }
   onPreUpdateDieta(dieta: Dietas) {
     this.corralesID = dieta.corrales;
     this.dietasService.selectDieta = Object.assign({}, dieta);
   }
}
