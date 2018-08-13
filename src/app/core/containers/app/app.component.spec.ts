import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { AppUpdateService } from '../../services/app-update.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-footer' }),
        MockComponent({ selector: 'app-header' }),
        MockComponent({ selector: 'app-sidenav' }),
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: AppUpdateService, useValue: null },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));
});
