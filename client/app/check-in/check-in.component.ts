import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VolunteerService } from '../shared/volunteer.service'

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [VolunteerService]
})
export class CheckInComponent implements OnInit {
  nameCtrl: FormControl;
  filteredNames: any;
  
  names: any = [
  ]
  
  constructor(private volunteerService: VolunteerService) {
    this.volunteerService.getVolunteers()
      .subscribe(
        // once complete 
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
      // Start without filtering any input 
      .startWith(null)
      // For each input, adjust filteredNames
      .map(input => this.filterNames(input));
  } 

  ngOnInit() {
  } 
  
  filterNames(val: string) { 
    // condition ? true : false
    return val ? this.names.filter(s => s.toLowerCase().includes(val.toLowerCase()))
       : this.names;
   }
}
