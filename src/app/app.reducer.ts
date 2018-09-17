

import * as fromUI from './share/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
}

export const appReduccer: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer
};

