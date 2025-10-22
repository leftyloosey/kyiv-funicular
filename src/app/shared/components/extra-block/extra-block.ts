import { DragDrop } from '../drag-drop/drag-drop';
import { Component, input, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { Observable, tap } from 'rxjs';
import { DefinitionEdit } from '../definition-edit/definition-edit';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { WordBuilderService } from '../../../services/word-builder-service/word-builder-service';
import { Word } from '../../../utils/classes/word';
import { SextraEdit } from '../../../services/extra-edit/SextraEdit';

@Component({
  selector: 'app-extra-block',
  imports: [
    DefinitionEdit,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    DragDrop,
    AsyncPipe,
    TitleCasePipe,
  ],
  templateUrl: './extra-block.html',
  styleUrl: './extra-block.scss',
})
export class ExtraBlock {
  public newDefs = input.required<Word>();
  public type = input.required<string>();
  protected defToEdit$: Observable<Word>;
  protected empty = new Word('', '', '');

  @ViewChild('expansionPanel')
  public expansionPanel?: MatExpansionPanel;

  constructor(
    protected sfactory: SextraEdit,
    protected builder: WordBuilderService
  ) {
    // this.builder.wordBuilderObserve$.pipe(takeUntilDestroyed()).subscribe();
    this.defToEdit$ = this.builder.wordBuilderObserve$.pipe(
      takeUntilDestroyed(),
      tap((word) => {
        return word;
      })
    );
  }

  public shut(): void {
    this.expansionPanel?.close();
  }

  public closePanelManually() {
    if (this.expansionPanel) {
      this.expansionPanel.close();
    }
  }
}
