import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjangoRestLoginComponent } from './django-rest-login.component';

describe('DjangoRestLoginComponent', () => {
  let component: DjangoRestLoginComponent;
  let fixture: ComponentFixture<DjangoRestLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjangoRestLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjangoRestLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
