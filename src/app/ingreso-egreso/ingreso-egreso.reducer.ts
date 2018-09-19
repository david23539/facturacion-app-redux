

import * as fromIngresoEgreso from './ingreso-egresos.actions';
import { IngrsoEgreso } from './ingreso-egreso.model';
import { AppState } from './../app.reducer';

export interface IngresoEgresoState {
    items: IngrsoEgreso[];
}

export interface AppState extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer (state = estadoInicial, action: fromIngresoEgreso.acciones): IngresoEgresoState {
    switch ( action.type) {

        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [...action.items.map(item => {
                   return {
                       ...item
                   };
                })]
            };

        case fromIngresoEgreso.UNSET_ITEM:
            return {
                items: []
            };

        default:
         return state;
    }
}
