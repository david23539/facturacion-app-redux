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
  import { environment } from '../environments/environment';

  // Modulos importados
  import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReduccer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
