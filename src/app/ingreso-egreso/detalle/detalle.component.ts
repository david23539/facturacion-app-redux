import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { IngrsoEgreso } from './../ingreso-egreso.model';
import { AppState } from './../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from './../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  items: IngrsoEgreso[];
  constructor(private store: Store<AppState>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
    .subscribe(ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  borrarItem(item: IngrsoEgreso) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then(() => {
      Swal('Eliminado', item.description, 'success');
    });
  }

}
