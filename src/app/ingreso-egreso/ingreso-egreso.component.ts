import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngrsoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from './../share/ui.accions';
import * as fromingresoEgreso from '../ingreso-egreso/ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit , OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubcription: Subscription = new Subscription();
  cargando: boolean;

  constructor(public ingresoegresoService: IngresoEgresoService, private store: Store<fromingresoEgreso.AppState>) { }

  ngOnInit() {
    this.loadingSubcription = this.store.select('ui').subscribe(
      ui => {
        this.cargando = ui.isLoading;
      }
    );
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubcription.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction);
    const ingresoEgreso = new IngrsoEgreso({... this.forma.value, tipo: this.tipo});
    this.ingresoegresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction);
        Swal('Creado', ingresoEgreso.description, 'success');
        this.forma.reset({
          monto: 0
        });
      })
      .catch();

  }

}
