import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshDearComponent } from './refresh-dear.component';

describe('RefreshDearComponent', () => {
  let component: RefreshDearComponent;
  let fixture: ComponentFixture<RefreshDearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshDearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshDearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
