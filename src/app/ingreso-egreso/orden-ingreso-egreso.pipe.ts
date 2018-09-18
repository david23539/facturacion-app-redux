import { Pipe, PipeTransform } from '@angular/core';
import { IngrsoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngrsoEgreso[]): IngrsoEgreso[] {
    return items.sort( (a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    } );
  }

}
