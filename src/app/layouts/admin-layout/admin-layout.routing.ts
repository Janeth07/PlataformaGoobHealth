import { Routes } from '@angular/router';
import {  ReportesComponent} from '../../reportes/reportes.component';
import { CobradoresComponent } from 'app/cobradores/cobradores.component';
import { ClientesComponent } from 'app/clientes/clientes.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'cobradores',      component: CobradoresComponent },
    { path: 'clientes',   component: ClientesComponent },
    { path: 'reportes',     component:  ReportesComponent},
]