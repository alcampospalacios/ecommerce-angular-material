import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGirlComponent } from './store-girl.component';

describe('StoreComponent', () => {
  let component: StoreGirlComponent;
  let fixture: ComponentFixture<StoreGirlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreGirlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGirlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
