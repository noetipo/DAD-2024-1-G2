import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTreeComponent } from './example-tree.component';

describe('ExampleTreeComponent', () => {
  let component: ExampleTreeComponent;
  let fixture: ComponentFixture<ExampleTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
