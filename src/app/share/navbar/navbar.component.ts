import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  nombre: string;
  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter (auth => auth.user != null)
      )
      .subscribe( data => {
        this.nombre = data.user.nombre;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
