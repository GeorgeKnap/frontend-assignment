import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@todos/shared';
import { TaskCardComponent } from './task-card.component';


describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, BrowserAnimationsModule],
      declarations: [ TaskCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.task = {
      id:1,
      completed: false,
      description: 'mock description',
      title: 'mock title',
      expanded: false,
      priority: 1,
      project: null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expansion panel should exist', async () => {
    const expansionPanel = await loader.getHarness(MatExpansionPanelHarness);
    expect(expansionPanel).toBeTruthy();
  });

  it('expansion panel title should be correct', async () => {
    const expansionPanel = await loader.getHarness(MatExpansionPanelHarness);
    const title = await expansionPanel.getTitle();
    expect(title).toEqual('mock title');
  });

  it('expansion panel description should be correct', async () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const body = nativeElement.querySelector('.mat-expansion-panel-body')!;
    expect(body.textContent?.trim()).toEqual('mock description');
  });

});
