import { Routes } from '@angular/router';

//import { PanelComponent } from '../../panel/panel.component';
import { GanaderosComponent } from '../../ganaderos/ganaderos.component';
import {  ReportesComponent} from '../../reportes/reportes.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { CorralesComponent } from '../../corrales/corralescomponent';
import { CobradoresComponent } from 'app/cobradores/cobradores.component';
//import { AnalisisComponent } from './../../analisis/analisis.component';
//import { ReportesComponent } from './../../reportes/reportes.component';
import { MarketComponent } from './../../market/market.component';
//import { AdministracionComponent } from './../../administracion/administracion.component';

import { ClientesComponent } from 'app/clientes/clientes.component';

import { DietasComponent } from 'app/dietas/dietas.component';


export const AdminLayoutRoutes: Routes = [
    //{ path: 'dashboard',      component: PanelComponent },
    { path: 'cobradores',      component: CobradoresComponent },
    { path: 'ganaderos',   component: GanaderosComponent },
    { path: 'clientes',   component: ClientesComponent },
    //{ path: 'analisis',     component: AnalisisComponent },
    { path: 'reportes',     component:  ReportesComponent},
    //{ path: 'reportes',     component: ReportesComponent },
    { path: 'market',          component: MarketComponent },
    //{ path: 'administracion',           component: AdministracionComponent },//crear
    { path: 'corrales',        component: CorralesComponent },
    { path: 'dietas',  component: DietasComponent },
];
