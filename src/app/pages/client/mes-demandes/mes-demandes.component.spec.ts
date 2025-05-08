import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesComponent } from './mes-demandes.component';

describe('MesDemandesComponent', () => {
  let component: MesDemandesComponent;
  let fixture: ComponentFixture<MesDemandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesDemandesComponent]
    });
    fixture = TestBed.createComponent(MesDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
