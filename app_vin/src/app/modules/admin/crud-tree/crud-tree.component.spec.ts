import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTreeComponent } from './crud-tree.component';

describe('ExampleTreeComponent', () => {
  let component: CrudTreeComponent;
  let fixture: ComponentFixture<CrudTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
