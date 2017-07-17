import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VisitService } from '../services/visit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private visitService: VisitService) { }

  ngOnInit() {
    this.visitService.getAllRx();
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
