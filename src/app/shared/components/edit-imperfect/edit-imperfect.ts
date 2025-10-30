import { Component, input, OnInit, output } from '@angular/core';
import { Word, WordCase } from '../../../utils/classes/word';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CaseEdit } from '../../../utils/interfaces/CaseEdit';
import { CaseFactory } from '../../../services/case-factory/case-factory';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-imperfect',
  imports: [ReactiveFormsModule, MatFormField, MatInputModule],
  templateUrl: './edit-imperfect.html',
  styleUrl: './edit-imperfect.scss',
})
export class EditImperfect implements OnInit {
  public sendUp = output<WordCase>();
  public sendDown = input.required<WordCase>();
  public word = input.required<Word>();
  protected imperfectForm!: FormGroup;
  protected keysForForm: string[] = [];
  private caseService!: CaseEdit;
  private fb!: FormBuilder;

  constructor(private prac: CaseFactory) {}

  public ngOnInit(): void {
    this.caseService = this.prac.fromCode(
      this.word().tag,
      this.word().partOfSpeech,
      this.sendDown()
    );
    this.fb = this.caseService.getFb();
    this.imperfectForm = this.fb.group({
      formArray: this.fb.array([]),
    });
    this.addAllGroups();
    this.keysForForm = this.caseService.valsForForm(this.formArray);
  }

  get formArray() {
    return this.imperfectForm.get('formArray') as FormArray;
  }

  private addAllGroups(): void {
    if (Object.keys(this.sendDown()).length === 0) {
      this.caseService.populateGroup(this.caseService.bigType, this.formArray);
    } else {
      this.caseService.populateGroup(this.sendDown(), this.formArray);
    }
  }

  protected sendToCaseComponent(): void {
    this.assembleWord();
    this.sendUp.emit(this.caseService.buildingWord);
  }

  private assembleWord(): void {
    this.caseService.loopFormToWord(this.imperfectForm);
  }
}
