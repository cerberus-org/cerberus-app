import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get showBack() {
    return this.router.url !== '/home' && this.router.url !== '/login';
  }

  get showLogout() {
    return this.router.url !== '/login';
  }
}
