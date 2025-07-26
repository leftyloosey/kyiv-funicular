import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  effect,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { count } from 'rxjs';
// import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-form',
  imports: [CommonModule],
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

  // commentService = inject(CommentService);
  // constructor() {
  //   effect(() => {
  //     console.log(this.());
  //   });
  // }
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
  updateCount(amount: number): void {
    this.count.update((currentCount) => currentCount + amount);
    // this.count.set(56);
  }
  formFunction(e: Event) {
    e.preventDefault();
    console.log('hey');
    this.updateCount(5);
    // this.count.set(56);
  }
}
