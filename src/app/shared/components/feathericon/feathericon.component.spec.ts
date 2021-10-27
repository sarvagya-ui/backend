import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeathericonComponent } from './feathericon.component';

describe('FeathericonComponent', () => {
  let component: FeathericonComponent;
  let fixture: ComponentFixture<FeathericonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeathericonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeathericonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
