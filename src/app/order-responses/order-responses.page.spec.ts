import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResponsesPage } from './order-responses.page';

describe('OrderResponsesPage', () => {
  let component: OrderResponsesPage;
  let fixture: ComponentFixture<OrderResponsesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderResponsesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResponsesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
