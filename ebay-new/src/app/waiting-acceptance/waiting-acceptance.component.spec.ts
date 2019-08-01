import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAcceptanceComponent } from './waiting-acceptance.component';

describe('WaitingAcceptanceComponent', () => {
  let component: WaitingAcceptanceComponent;
  let fixture: ComponentFixture<WaitingAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
