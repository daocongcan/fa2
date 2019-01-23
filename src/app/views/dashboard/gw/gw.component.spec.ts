import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwComponent } from './gw.component';

describe('GwComponent', () => {
  let component: GwComponent;
  let fixture: ComponentFixture<GwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
