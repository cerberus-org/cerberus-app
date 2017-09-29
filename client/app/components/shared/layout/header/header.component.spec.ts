import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MdToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { HeaderComponent } from './header.component';
import { organizationReducer } from '../../../../reducers/organizations.reducer';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MdToolbarModule,
        StoreModule.provideStore({ organizations: organizationReducer })
      ],
      declarations: [
        HeaderComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
