import { Component, input } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { DisplayBoxService } from '../../../services/delivery-services/display-box-service/display-box-service';
import { wordDefinitions } from '../../../utils/interfaces/WordDefinitions';
@Component({
  selector: 'app-drag-drop',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './drag-drop.html',
  styleUrl: './drag-drop.scss',
})
export class DragDrop {
  public items = input<string[]>();
  public type = input.required<string>();

  constructor(
    protected wiktion: WiktionService,
    private displayBox: DisplayBoxService
  ) {}

  protected drop(event: CdkDragDrop<string[]>): void {
    const workArray = this.items() as string[];

    moveItemInArray(workArray, event.previousIndex, event.currentIndex);

    const draggedArray: wordDefinitions = { [this.type()]: workArray };
    this.displayBox.updateDefinitionBox(draggedArray);
  }
}
