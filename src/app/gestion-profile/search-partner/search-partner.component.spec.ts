import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPartenerComponent } from './search-partner.component';

describe('SearchPartenerComponent', () => {
  let component: SearchPartenerComponent;
  let fixture: ComponentFixture<SearchPartenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPartenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPartenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
