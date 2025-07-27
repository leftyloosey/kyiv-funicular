import { Component, EventEmitter, Input, Output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  constructor() {}
  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const textAreaElement = form.elements.namedItem(
      'commentText'
    ) as HTMLTextAreaElement;
    const commentText = textAreaElement.value;
    form.reset();
    console.log({ commentText });
    this.formSubmitted.emit({
      text: commentText,
    });
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
