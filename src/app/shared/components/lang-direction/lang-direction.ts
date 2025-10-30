import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { lngToken } from '../../../utils/tokens/language-token';

@Component({
  selector: 'app-lang-direction',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  templateUrl: './lang-direction.html',
  styleUrl: './lang-direction.scss',
})
export class LangDirection {
  public fromLanguage = output<lngToken>();
  public toLanguage = output<lngToken>();

  protected langDirectForm = new FormGroup({
    fromLanguage: new FormControl('uk', Validators.required),
    toLanguage: new FormControl('en', Validators.required),
  });

  // get original() {
  //   return this.langDirectForm.get('original');
  // }

  langFromChanged(e: MatSelectChange) {
    this.fromLanguage.emit(e.value);
  }
  langToChanged(e: MatSelectChange) {
    this.toLanguage.emit(e.value);
  }
}
