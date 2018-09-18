import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngrsoEgreso } from './ingreso-egreso.model';
import { AuthService } from './../auth/auth.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egresos.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, public authService: AuthService,
    private store: Store<AppState>) { }


    cancelarSubscriptions() {
      this.ingresoEgresoItemsSubcription.unsubscribe();
      this.ingresoEgresoListenerSubcription.unsubscribe();
    }

  crearIngresoEgreso(ingresoEgreso: IngrsoEgreso) {
    const user = this.authService.getUssuario();
    return this.afDB.doc(`${user.uid}/ingreso-egreso`)
      .collection('item').add({...ingresoEgreso});

  }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubcription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( auth => {
      this.ingresoEgresoItems(auth.user.uid);
    });
  }

  private ingresoEgresoItems (uid: string) {
   this.ingresoEgresoItemsSubcription = this.afDB.collection(`${uid}/ingreso-egreso/item`)
    .snapshotChanges()
    .pipe(
      map( docData => {
        return docData.map(doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      } )
    )
    .subscribe((collection: any[]) => {
      this.store.dispatch(new SetItemsAction(collection));
    });
  }

  borrarIngresoEgreso (uid: string) {
    const user = this.authService.getUssuario();
    return this.afDB.doc(`${user.uid}/ingreso-egreso/item/${uid}`)
      .delete();
  }
}
