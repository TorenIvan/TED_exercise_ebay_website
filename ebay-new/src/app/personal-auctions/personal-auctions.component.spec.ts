import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAuctionsComponent } from './personal-auctions.component';

describe('PersonalAuctionsComponent', () => {
  let component: PersonalAuctionsComponent;
  let fixture: ComponentFixture<PersonalAuctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalAuctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
