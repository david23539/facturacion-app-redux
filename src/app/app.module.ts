import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';


//NGRX
import { StoreModule } from '@ngrx/store';
import { appReduccer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// fireBase
  import { AngularFireModule } from '@angular/fire';
  import { AngularFirestoreModule } from '@angular/fire/firestore';
  import { AngularFireAuthModule } from '@angular/fire/auth';
  import { environment } from '../environments/environment';

  // Graficas
  import { ChartsModule } from 'ng2-charts';
// Componentes
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './share/footer/footer.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { SidebarComponent } from './share/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// Pipe
import { OrdenIngresoEgresoPipe } from './ingreso-egreso/orden-ingreso-egreso.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrdenIngresoEgresoPipe

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReduccer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
