import { Component, OnInit } from '@angular/core';
import {CobradoresService} from '../services/cobradores.service';
import {EstadisticasService} from '../services/estadisticas.service';
import {ReportesService} from '../services/reportes.service';
import {Cobradores} from '../interfaces/cobradores.interface';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
public loading: boolean;

  constructor(public cobradoresService: CobradoresService, public estadisticasService: EstadisticasService,
    public reportesService: ReportesService) {
   }
   public dengues = [] ;
   public dengue = '';
   total:number;
   total2:number;
   public influenzas= [] ;
   public influenza = '';

  ngOnInit() {
    this.estadisticasService.getDengues().subscribe(dengues => {
      console.log('DENGUES', dengues);
      this.dengues = dengues;
      this.loading = false;
     })
     this.reportesService.getInfluenzas().subscribe(influenzas => {
      console.log('Influenza', influenzas);
      this.influenzas = influenzas;
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

  Suma(){
    this.reportesService.getInfluenzas().subscribe(influenza => {
      //console.log('CLIENTES', clientes);
      this.influenzas = influenza;
      this.loading = false;
      //Calculamos el TOTAL 
     this.total = this.influenzas.reduce((
      acc,
      obj, 
    ) => acc + (obj.cantidad),
    0);
    //console.log("Total: ", this.total);
     })
  }

  Suma2(){
    this.estadisticasService.getDengues().subscribe(dengue => {
      //console.log('CLIENTES', clientes);
      this.dengues = dengue;
      this.loading = false;
      //Calculamos el TOTAL 
     this.total2 = this.dengues.reduce((
      acc,
      obj, 
    ) => acc + (obj.cantidad),
    0);
    //console.log("Total: ", this.total);
     })
  }
}

