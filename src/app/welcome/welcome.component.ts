import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  users!: any[];
  newUser: any = { name: '', email: '' };

  constructor(
    private apiService: ApiService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe(users => (this.users = users));
  }

  addUser(): void {
    this.apiService.addUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = { name: '', email: '' };
    });
  }

  redirectToRegistro() {
    this.router.navigate(['/principal']); // Redirecciona a la ruta del componente de registro
  }

}
