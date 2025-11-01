import { Component, ViewChild } from '@angular/core';
import { Word, WordCase } from '../../../utils/classes/word';
import { CaseFactory } from '../../../services/case-factory/case-factory';
import { CaseEdit } from '../../../utils/interfaces/CaseEdit';
import { WordBuilderService } from '../../../services/word-builder-service/word-builder-service';
import { Observable, tap } from 'rxjs';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { EditImperfect } from '../edit-imperfect/edit-imperfect';
import { CaseDelivery } from '../../../services/delivery-services/case-delivery/case-delivery';
import { Closeable } from '../../../utils/interfaces/Closeable';
import { SHUT } from '../../../utils/tokens/closeable';
import { AsyncPipe } from '@angular/common';
import { lngToken } from '../../../utils/tokens/language-token';

@Component({
  selector: 'app-case-component',
  imports: [
    AsyncPipe,
    EditImperfect,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion,
  ],
  templateUrl: './case-component.html',
  styleUrl: './case-component.scss',
  providers: [
    {
      provide: SHUT,
      useExisting: CaseComponent,
    },
  ],
})
export class CaseComponent implements Closeable {
  @ViewChild('expansionPanel')
  public expansionPanel?: MatExpansionPanel;
  protected partOfSpeech: string = '';
  protected tag: lngToken = 'uk';
  protected receivedCase: WordCase = {};
  protected caseService!: CaseEdit;
  protected output$: Observable<Word>;

  constructor(
    private builder: WordBuilderService,
    private caseFactory: CaseFactory,
    private caseDelivery: CaseDelivery
  ) {
    this.output$ = this.builder.wordBuilderObserve$.pipe(tap((word) => word));

    this.caseService = caseFactory.fromCode(
      this.tag,
      this.partOfSpeech,
      this.receivedCase
    );
  }
  public shut(): void {
    this.expansionPanel?.close();
  }

  protected onSendUp($event: WordCase): void {
    const send = this.caseService.prepareForSend($event);
    this.caseDelivery.updateCaseDelivery(send);
  }

  public closePanelManually(): void {
    if (this.expansionPanel) {
      this.caseService.isCaseHidden = true;
      this.expansionPanel.close();
    }
  }
}
