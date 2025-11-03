import { Component, inject, OnDestroy, output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateDialogData } from '../../../utils/interfaces/TranslateDialogData';
import { LangDirection } from '../lang-direction/lang-direction';
import { TranslateSubmit } from '../../../utils/interfaces/TranslateSubmit';
import { lngToken } from '../../../utils/tokens/language-token';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GTranslateService } from '../../../services/g-translate-service/g-translate-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-translate-modal-display',
  imports: [
    LangDirection,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
  ],
  templateUrl: './translate-modal-display.html',
  styleUrl: './translate-modal-display.scss',
})
export class TranslateModalDisplay {
  protected translationUpToSave = output<TranslateDialogData>();
  protected translateForm = new FormGroup({
    translate: new FormControl('', Validators.required),
  });

  private toSubmit: TranslateSubmit = {
    text: '',
    tag: 'uk',
    target: 'en',
  };
  get translate() {
    return this.translateForm.get('translate');
  }

  protected data: TranslateDialogData = inject(MAT_DIALOG_DATA);

  constructor(
    private gtranslate: GTranslateService,
    public dialogRef: MatDialogRef<TranslateModalDisplay>
  ) {
    this.translate?.setValue(this.data.definition);
  }

  protected fromLanguage(e: lngToken): void {
    this.toSubmit.tag = e;
  }
  protected toLanguage(e: lngToken): void {
    this.toSubmit.target = e;
  }
  protected submitToGoogle() {
    if (this.translate?.value) this.toSubmit.text = this.translate?.value;
    this.gtranslate
      .getOneGT(this.toSubmit)
      .subscribe((reply) => this.translate?.setValue(reply.translation));
  }
  protected keepAndClose(e: Event) {
    e.preventDefault();
    this.dialogRef.close(this.translate?.value);
  }
}
