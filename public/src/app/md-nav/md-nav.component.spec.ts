import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdNavComponent } from './md-nav.component';

describe('MdNavComponent', () => {
  let component: MdNavComponent;
  let fixture: ComponentFixture<MdNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
