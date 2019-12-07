import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {  AuthGuard} from './guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CasosComponent } from './casos/casos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes =[
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
   {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
    //{ path: 'dashboard',      component: DashboardComponent,canActivate:[AuthGuard]},
     //{ path: 'user-profile',   component: UserProfileComponent,canActivate:[AuthGuard] },
     //{ path: 'table-list',     component: TableListComponent ,canActivate:[AuthGuard]},
    //{ path: 'maps',           component: MapsComponent,canActivate:[AuthGuard] },
  // { path: 'notifications',  component: NotificationsComponent,canActivate:[AuthGuard] },
   //{ path: 'upgrade',        component: UpgradeComponent },
  // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' },
  // {path:'login', component:LoginComponent}
  /*{ path: 'clientes',        component: ClientesComponent , canActivate: [AuthGuard] },
  { path: 'cobradores',        component: CobradoresComponent , canActivate: [AuthGuard] },
  { path: 'reportes',        component: ReportesComponent , canActivate: [AuthGuard] },*/

];


@NgModule({
  imports: [
  CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
