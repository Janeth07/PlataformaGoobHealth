import { Routes } from '@angular/router';
import {  PacientesComponent} from '../../pacientes/pacientes.component';
import { EstadisticasComponent } from 'app/estadisticas/estadisticas.component';
import { CasosComponent } from 'app/casos/casos.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'estadisticas',      component: EstadisticasComponent },
    { path: 'casos',   component: CasosComponent },
    { path: 'pacientes',     component:  PacientesComponent},
]