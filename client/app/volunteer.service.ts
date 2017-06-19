import { Injectable } from '@angular/core';

@Injectable()
export class VolunteerService {

  constructor() { }
  
  postVolunteer(volunteer) {
    console.log(volunteer);
  }
}
