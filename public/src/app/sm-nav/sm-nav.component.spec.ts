import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmNavComponent } from './sm-nav.component';

describe('SmNavComponent', () => {
  let component: SmNavComponent;
  let fixture: ComponentFixture<SmNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
