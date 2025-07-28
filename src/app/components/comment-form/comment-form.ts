import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../classes/attempt';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.css'],
})
export class CommentFormComponent {
  @Input() placeholder = 'Write something...';
  @Input() buttonText = 'Create';
  @Output() formSubmitted = new EventEmitter<{
    text: string;
  }>();
  count = model<number>(0);
  auth = inject(AuthService);
  logged = this.auth.checkAuthentication();
  model = new Attempt('');

  constructor() {
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
  formSubmit(form: NgForm) {
    //   event.preventDefault();

    console.log(form.value);
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
