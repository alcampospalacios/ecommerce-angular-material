import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManComponent } from './store-man.component';

describe('StoreComponent', () => {
  let component: StoreManComponent;
  let fixture: ComponentFixture<StoreManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
