import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//Dependencias firebase
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

//import { PanelComponent } from './panel/panel.component';
import {GanaderosComponent} from './ganaderos/ganaderos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';

import { CorralesComponent } from './corrales/corralescomponent';

import {AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RestauracionComponent } from './restauracion/restauracion.component';


@NgModule({
  imports: [
 
BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RestauracionComponent

  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
