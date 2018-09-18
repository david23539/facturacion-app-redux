
import { Action } from '@ngrx/store';
import { IngrsoEgreso } from './ingreso-egreso.model';

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEM = '[Ingreso Egreso] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor ( public items: IngrsoEgreso[]) {}
}

export class UnSetItemsAction implements Action {
    readonly type = UNSET_ITEM;
}

export type acciones = SetItemsAction | UnSetItemsAction;
