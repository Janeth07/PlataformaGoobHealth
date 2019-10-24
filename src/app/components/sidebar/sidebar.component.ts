import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

    { path: '/dashboard', title: 'Panel',  icon: 'pie_chart', class: '' },
    { path: '/ganaderos', title: 'Ganadero',  icon:'person', class: '' },
    { path: '/analisis', title: 'Analisis',  icon:'insert_chart_outlined', class: '' },
    { path: '/reportes', title: 'Reportes',  icon:'assignment', class: '' },
    { path: '/market', title: 'Market',  icon:'shopping_cart', class: '' },
    { path: '/administracion', title: 'Administracion',  icon:'event', class: '' }
];
export const ROUTES_GAN: RouteInfo[] = [

    { path: '/dashboard_ganadero', title: 'Cobradores',  icon: 'person', class: '' },
    { path: '/ganado', title: 'Clientes',  icon: 'person', class: '' },    
    //{ path: '/dietas', title: 'Reportes',  icon:'description', class: '' },
   // { path: '/corrales', title: 'Corrales',  icon:'view_module', class: '' },
    { path: '/registrar', title: 'Reportes',  icon:'description', class: '' },    
    //{ path: '/reportes', title: 'Reportes',  icon:'assignment', class: '' },
    //{ path: '/market', title: 'Market',  icon:'shopping_cart', class: '' },
    //{ path: '/administracion', title: 'Administracion',  icon:'event', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItemsGanadero: any[];
  isAdmon:boolean = false;
  isGan:boolean = true;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItemsGanadero = ROUTES_GAN.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}