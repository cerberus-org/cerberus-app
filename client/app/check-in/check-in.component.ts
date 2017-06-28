import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VolunteerService } from '../shared/volunteer.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [VolunteerService]
})
export class CheckInComponent implements OnInit {
  nameCtrl: FormControl;
  filteredNames: any;
  location: any;
  names: any = [
  ]
  
  constructor(private volunteerService: VolunteerService, router: Router) {
    this.location = router.url;
    
    this.volunteerService.getVolunteers()
      .subscribe(
        (res) => {
          for(let i in res) {
            this.names.push(res[i].firstName + " " + res[i].lastName + " " + 
            res[i].petName)
          } 
        }
      )

      this.nameCtrl = new FormControl();
      // Every time nameCtrl changes,
      this.filteredNames = this.nameCtrl.valueChanges
      // handle the returned Observable
      // Start without filtering the list of names
      .startWith(null)
      // For each input, adjust filteredNames
      .map(input => this.filterNames(input));
  } 
  
  ngOnInit() {
  } 
  
  filterNames(input: string) { 
    // If the list of names includes the input return filtered list
    // else return list of all names
    return input ? this.names.filter(s => s.toLowerCase().includes(input.toLowerCase()))
       : this.names;
   }
}
