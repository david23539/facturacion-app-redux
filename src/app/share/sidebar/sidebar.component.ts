import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from './../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  subscription: Subscription = new Subscription();
  nombre: string;

  constructor(private authService: AuthService, public ingresoEgresoService: IngresoEgresoService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe( data => {
        console.log(data);
        this.nombre = data.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
