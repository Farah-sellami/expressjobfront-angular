import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeSerComponent } from './list-demande-ser.component';

describe('ListDemandeSerComponent', () => {
  let component: ListDemandeSerComponent;
  let fixture: ComponentFixture<ListDemandeSerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeSerComponent]
    });
    fixture = TestBed.createComponent(ListDemandeSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
