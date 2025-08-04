import {
  Component,
  EventEmitter,
  Output,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../classes/attempt';
import { AuthService } from '../../services/auth.service';
import { commentSignal } from '../../signals';
@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.css'],
})
export class CommentFormComponent {
  auth = inject(AuthService);
  smallReplyBox = input.required<boolean>();
  // attemptFromForm = output<string>();

  logged = !this.auth.isAuthenticated();

  model = new Attempt('');

  updateField(event: KeyboardEvent): void {
    // console.log(`The user pressed: ${event.key}`);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    commentSignal.set(form.value);
    // this.attemptFromForm.emit(form.value);
    // this.formVal.set(form.value.entry);
  }
}
