import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, PristineChangeEvent } from '@angular/forms';
import { Attempt } from '../../classes/attempt';
import { AuthService } from '../../services/auth.service';
import { globalSignal } from '../../signals';
@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.css'],
})
export class CommentFormComponent {
  // @Input() placeholder = 'Write something...';
  @Input() buttonText = 'Create';
  @Output() formSubmitted = new EventEmitter<{
    text: string;
  }>();
  count = model<number>(0);
  auth = inject(AuthService);
  logged = this.auth.checkAuthentication();
  formVal = model<string>('');
  // formVal = model<string>('');
  model = new Attempt('');
  constructor() {
    effect(() => {
      console.log('constructor hit');
      console.log(`initial lower value: ${this.formVal()}`);
    });
    console.log('auth', this.logged);
  }
  // formSubmit(event: SubmitEvent) {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement;
  //   const textAreaElement = form.elements.namedItem(
  //     'commentText'
  //   ) as HTMLTextAreaElement;
  //   const commentText = textAreaElement.value;
  //   form.reset();
  //   console.log({ commentText });
  //   this.formSubmitted.emit({
  //     text: commentText,
  //   });
  // }
  toggleValue() {
    globalSignal.set(!globalSignal());
  }
  updateField(event: KeyboardEvent): void {
    // console.log(`The user pressed: ${event.key}`);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    // this.formVal.set(form.value.entry);
    this.formVal.update((oldValue) => (oldValue = form.value.entry));
    console.log('lowerVal', this.formVal());
  }

  // updateCount(amount: number): void {
  //   this.count.update((currentCount) => currentCount + amount);
  // }
  // formFunction(e: Event) {
  //   e.preventDefault();
  //   console.log('hey');
  //   this.updateCount(5);
  //   // this.count.set(56);
  // }
}
