import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { TranslateModalDisplay } from '../translate-modal-display/translate-modal-display';
import { TranslateDialogData } from '../../../utils/interfaces/TranslateDialogData';
import { tap } from 'rxjs';
import { DisplayBoxService } from '../../../services/delivery-services/display-box-service/display-box-service';

@Component({
  selector: 'app-translate-modal-g',
  imports: [MatIcon],
  templateUrl: './translate-modal-g.html',
  styleUrl: './translate-modal-g.scss',
})
export class TranslateModalG {
  protected dialog = inject(MatDialog);

  protected translationUpToSave = output<TranslateDialogData>();
  public inputForTranslate = input.required<TranslateDialogData>();

  constructor(private displayBox: DisplayBoxService) {}

  protected submitToGoogle() {
    this.openDialog(this.inputForTranslate().definition);
  }

  protected openDialog(input: string) {
    const dialogRef = this.dialog.open(TranslateModalDisplay, {
      data: {
        definition: input,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((def) => {
          const toDefEdit: TranslateDialogData = {
            definition: def,
            index: this.inputForTranslate().index,
            type: this.inputForTranslate().type,
          };
          if (toDefEdit.definition?.length)
            this.displayBox.updateDefinitionString(toDefEdit);
        })
      )
      .subscribe();
  }
  public translationUp(sendUp: TranslateDialogData) {
    this.translationUpToSave.emit(sendUp);
  }
}
