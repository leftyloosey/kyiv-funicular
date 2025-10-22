import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAhead } from './search-ahead';

describe('SearchAhead', () => {
  let component: SearchAhead;
  let fixture: ComponentFixture<SearchAhead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAhead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAhead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
