import { Component, OnInit } from '@angular/core';
import { VisitService } from './services/visit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.visitService.getAllRx();
  }
}
