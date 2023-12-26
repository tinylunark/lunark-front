import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteActionComponent } from './favorite-action.component';

describe('FavoriteActionComponent', () => {
  let component: FavoriteActionComponent;
  let fixture: ComponentFixture<FavoriteActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
