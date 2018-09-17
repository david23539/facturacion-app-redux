
import { Action } from '@ngrx/store';

export const SET_USER = '[AUTH] Set User';

export class SetUserAction implements Action {
    readonly type = SET_USER;
}
