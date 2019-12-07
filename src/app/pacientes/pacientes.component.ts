import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { Clientes } from '../interfaces/clientes.interface';
import { getLocaleTimeFormat } from '@angular/common';
import { element } from '@angular/core/src/render3';
import { AuthService } from 'app/auth.service';
import { CasosService } from '../services/casos.service';
import {ReportesService} from '../services/reportes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
public loading: boolean;
buscar:string;

  constructor(public casosService:CasosService,
   public reportesService: ReportesService,
     ) { 
    this.loading = true;
  }
  public dengues = [];
  public denguesFiltered = [];
  public dengue= '';
  public buscando:boolean = false;
  total: number;
  public influenzas = [];
  public influenza= '';

  ngOnInit() { 
    this.casosService.getDengues().subscribe(dengues => {
      console.log('DENGUES',dengues);
      this.dengues = dengues;  
      this.loading = false;
     });
     this.reportesService.getInfluenzas().subscribe(influenzas => {
      console.log('Influenzas',influenzas);
      this.influenzas = influenzas;  
      this.loading = false;
     });
     
 }
 todos(){
  this.casosService.getDengues().subscribe(dengues => {
    console.log('DENGUE', dengues);
    this.dengues = dengues;
    this.loading = false;
   })
 }

 

 Pagado(){
  this.casosService.getDengues().subscribe(dengue => {
    //console.log('CLIENTES', clientes);
    this.dengues = dengue;
    this.loading = false;
    //Calculamos el TOTAL 
   this.total = this.dengues.reduce((
    acc,
    obj, 
  ) => acc + (obj.cantidad),
  0);
  //console.log("Total: ", this.total);
   })
 }



}
