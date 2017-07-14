import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumbotronComponent } from './jumbotron.component';
import { MdCardModule } from '@angular/material';

describe('JumbotronComponent', () => {
  let component: JumbotronComponent;
  let fixture: ComponentFixture<JumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        JumbotronComponent
      ],
      imports: [
        MdCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });
});
