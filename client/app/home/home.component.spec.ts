import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockComponent } from 'ng2-mock-component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  class MockRouter {
    navigateByUrl = jasmine.createSpy('navigateByUrl');
  }

  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter(),
    TestBed.configureTestingModule({
    declarations: [HomeComponent,
        MockComponent({ selector: 'app-jumbotron' }),
        MockComponent({ selector: 'app-visit-history' }),
        MockComponent({ selector: 'app-volunteer-check-in' })
      ],
      providers: [ { provide: Router, useValue: mockRouter }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('local storage should be cleared', () => {
    component.logout();
    expect(localStorage.token).toBe(undefined);
  });
});
