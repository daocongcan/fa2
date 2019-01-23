import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwNodeComponent } from './gw-node.component';

describe('GwNodeComponent', () => {
  let component: GwNodeComponent;
  let fixture: ComponentFixture<GwNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
