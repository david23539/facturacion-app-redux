import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngrsoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egreso: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscriptiton: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[];


  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptiton = this.store.select('ingresoEgreso')
      .subscribe( (ingresoEgreso: any) => {
        this.contarIngresoEgreso ( ingresoEgreso.items);
      });
  }

  contarIngresoEgreso ( items: IngrsoEgreso[]) {
      this.ingresos = 0;
      this.egreso = 0;

      this.cuantosEgresos = 0;
      this.cuantosIngresos = 0;
      items.forEach( item => {
        if (item.tipo === 'ingreso') {
          this.cuantosIngresos++;
          this.ingresos += item.monto;
        } else {
          this.cuantosEgresos ++;
          this.egreso += item.monto;
        }
      });

      this.doughnutChartData = [this.ingresos, this.egreso];
  }

}
