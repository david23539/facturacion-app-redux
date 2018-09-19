

import * as fromUI from './share/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
// import * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    // ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

export const appReduccer: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    // ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};

