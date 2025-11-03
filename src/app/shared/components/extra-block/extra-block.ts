import { DragDrop } from '../drag-drop/drag-drop';
import { Component, input, ViewChild } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { DefinitionEdit } from '../definition-edit/definition-edit';
import { TitleCasePipe } from '@angular/common';
import { WordBuilderService } from '../../../services/word-builder-service/word-builder-service';
import { Word } from '../../../utils/classes/word';
import { SextraEdit } from '../../../services/extra-edit/SextraEdit';
import { extraDisplayType } from '../../../utils/constants/factory-types';

@Component({
  selector: 'app-extra-block',
  imports: [
    DefinitionEdit,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    DragDrop,
    TitleCasePipe,
  ],
  templateUrl: './extra-block.html',
  styleUrl: './extra-block.scss',
})
export class ExtraBlock {
  public newDefs = input.required<Word>();
  public type = input.required<extraDisplayType>();
  protected empty = new Word('', '', '');

  @ViewChild('expansionPanel')
  public expansionPanel?: MatExpansionPanel;

  constructor(
    protected sfactory: SextraEdit,
    protected builder: WordBuilderService
  ) {}

  public shut(): void {
    this.expansionPanel?.close();
  }

  public closePanelManually(): void {
    if (this.expansionPanel) {
      this.expansionPanel.close();
    }
  }
}
