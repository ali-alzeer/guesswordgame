import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesettingsComponent } from './gamesettings.component';

describe('GamesettingsComponent', () => {
  let component: GamesettingsComponent;
  let fixture: ComponentFixture<GamesettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
