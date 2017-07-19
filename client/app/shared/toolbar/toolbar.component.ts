import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get showLogout() {
    return this.router.url !== '/login';
  }
}
