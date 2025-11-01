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
import { DE, EN, UK } from '../../../utils/constants/lang-types';

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
  protected DE: lngToken = DE;
  protected UK: lngToken = UK;
  protected EN: lngToken = EN;

  public fromLanguage = output<lngToken>();
  public toLanguage = output<lngToken>();

  protected langDirectForm = new FormGroup({
    fromLanguage: new FormControl(this.UK, Validators.required),
    toLanguage: new FormControl(this.EN, Validators.required),
  });

  langFromChanged(e: MatSelectChange): void {
    this.fromLanguage.emit(e.value);
  }
  langToChanged(e: MatSelectChange): void {
    this.toLanguage.emit(e.value);
  }
}
