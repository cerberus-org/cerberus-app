import { TestBed, inject } from '@angular/core/testing';
import { MdSnackBarModule } from '@angular/material';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdSnackBarModule],
      providers: [SnackBarService]
    });
  });

  it('should be created', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
