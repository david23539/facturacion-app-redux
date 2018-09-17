import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( private readonly authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data) {
    console.log(data);
    this.authService.crearUsusario(data.nombre, data.email, data.password);
  }
}
