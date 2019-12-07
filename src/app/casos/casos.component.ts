import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CasosService} from '../services/casos.service';
import {ReportesService} from '../services/reportes.service';
import {Clientes} from '../interfaces/clientes.interface';
import {NgForm} from '@angular/forms';
import { Dengues } from 'app/interfaces/dengue.interface';
import { Influenzas } from 'app/interfaces/influenza.interface';

@Component({
  selector: 'app-casos',
  templateUrl: './casos.component.html',
  styleUrls: ['./casos.component.scss']
})
export class CasosComponent implements OnInit {
  public loading: boolean;

  constructor(public casosService: CasosService, public reportesService:ReportesService) { 
    this.loading=true;
  }
  public dengues=[];
  public dengue='';
  public influenzas = [];
  public influenzasFiltered = [];
  public influenza= '';
  public buscando:boolean = false;
  total: number;

  ngOnInit() {
    this.casosService.getDengues().subscribe(dengues => {
      console.log('Dengues', dengues);
      this.dengues=dengues;
      this.loading=false;
     });
     this.reportesService.getInfluenzas().subscribe(influenzas => {
      console.log('Infleunzas', influenzas);
      this.influenzas= influenzas;
      this.loading=false;
     });
  }

  saveInfluenza(influenzaForm:NgForm): void{
    if(influenzaForm.value.id==null){
      this.reportesService.addInfluenza(influenzaForm.value);
    }
    else{
      this.reportesService.updateInfluenzas(influenzaForm.value);
    }
    influenzaForm.resetForm();
    alert('Paciente registrado con exito');
  }

  onDeleteInfluenzas(id:string){
    console.log('DELETE Paciente', id);
    const confirmacion= confirm ('¿Deseas eliminar el registro?');
    if(confirmacion){
      this.reportesService.deleteInfluenzas(id);
    }
  }

  onPreUpdateInfluenzas(influenza:Influenzas){
    this.reportesService.selectInfluenza=Object.assign({},influenza);
  }

  saveDengue(dengueForm:NgForm): void{
    if(dengueForm.value.id==null){
      this.casosService.addDengues(dengueForm.value);
    }
    else{
      this.casosService.updateDengues(dengueForm.value);
    }
    dengueForm.resetForm();
    alert('Paciente registrado con exito');
  }

  onDeleteDengues(id:string){
    console.log('DELETE Paciente', id);
    const confirmacion= confirm ('¿Deseas eliminar el registro?');
    if(confirmacion){
      this.casosService.deleteDengues(id);
    }
  }

  onPreUpdateDengue(dengue:Dengues){
    this.casosService.selectDengue=Object.assign({},dengue);
  }



}

