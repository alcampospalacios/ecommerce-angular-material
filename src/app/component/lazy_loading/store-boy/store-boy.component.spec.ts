import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBoyComponent } from './store-boy.component';

describe('StoreComponent', () => {
  let component: StoreBoyComponent;
  let fixture: ComponentFixture<StoreBoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreBoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
