import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor( private readonly authService: AuthService,
    public store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe(
      ui => {
        this.cargando = ui.isLoading;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data) {
    this.authService.crearUsusario(data.nombre, data.email, data.password);
  }
}
