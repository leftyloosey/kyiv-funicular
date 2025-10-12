import { Component, input } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
@Component({
  selector: 'app-drag-drop',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './drag-drop.html',
  styleUrl: './drag-drop.scss',
})
export class DragDrop {
  items = input<string[]>();
  type = input<string>();

  constructor(protected wiktion: WiktionService) {}

  drop(event: CdkDragDrop<string[]>) {
    const workArray = this.items() as string[];
    moveItemInArray(workArray, event.previousIndex, event.currentIndex);
    if (this.type() === 'exmp') {
      this.wiktion.updateExampleData(workArray);
    } else {
      this.wiktion.updateDefinitionData(workArray);
    }
  }
}
