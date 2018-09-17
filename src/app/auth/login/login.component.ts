import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public cargando: boolean;
  subscription: Subscription;

  constructor(private readonly authService: AuthService,
    private readonly store: Store<AppState>) { }

  ngOnInit() {

    this.subscription = this.store.select('ui').subscribe(
      ui => {
        this.cargando = ui.isLoading;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data) {
      this.authService.login(data.email, data.password);
  }
}
