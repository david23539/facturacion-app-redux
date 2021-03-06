import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction } from '../share/ui.accions';
import { DesactivarLoadingAction } from '../share/ui.accions';
import { SetUserAction, UnSetUserAction } from './auth.accions';
import { Subscription} from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubcriptions: Subscription = new Subscription();
  private usuario: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubcriptions = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe(
            (usuarioObj: any) => {
              const newUser = new User(usuarioObj);

              this.store.dispatch(new SetUserAction(newUser));
              this.usuario = newUser;
            }
          );
      } else {
        this.usuario = null;
        this.userSubcriptions.unsubscribe();
      }
    });
  }

  crearUsusario (nombre: string, email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction);

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( resp => {

        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction);
          });


      })
      .catch( error => {
        this.store.dispatch(new DesactivarLoadingAction);
        Swal('Error en el login', error.message, 'error');
      });

  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivarLoadingAction);
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new DesactivarLoadingAction);
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.store.dispatch(new DesactivarLoadingAction);
        Swal('Error en el login', error.message, 'error');
      });

  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnSetUserAction());
  }

  isAuth() {
    return this.afAuth.authState
    .pipe(
      map( fbUser => {

        if ( fbUser == null ) {
          this.router.navigate(['/login']);
        }

        return fbUser != null;
      })
    );
  }

  getUssuario() {
    return {...this.usuario};
  }

}
