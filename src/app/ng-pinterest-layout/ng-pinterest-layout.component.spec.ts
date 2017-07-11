import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPinterestLayout } from './ng-pinterest-layout.component';

describe('NgPinterestLayout', () => {
  let component: NgPinterestLayout;
  let fixture: ComponentFixture<NgPinterestLayout>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgPinterestLayout ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPinterestLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
