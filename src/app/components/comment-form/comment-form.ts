// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-comment-form',
//   imports: [],
//   templateUrl: './comment-form.html',
//   styleUrl: './comment-form.scss'
// })
// export class CommentForm {

// }
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.scss'],
})
export class CommentFormComponent {
  @Input() placeholder = 'Write something...';
  @Input() buttonText = 'Create';
  @Output() formSubmitted = new EventEmitter<{
    text: string;
  }>();
  // commentService = inject(CommentService);

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

  // formSubmit(event: SubmitEvent) {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement;
  //   const textAreaElement = form.elements.namedItem(
  //     'commentText'
  //   ) as HTMLTextAreaElement;
  //   const commentText = textAreaElement.value;
  //   form.reset();
  //   console.log({ commentText });
  //   this.commentService.createComment({
  //     text: commentText,

  //     userId: '687a4bd8145a3fcf49d332c6',
  //   });

  //   this.formSubmitted.emit({
  //     text: commentText,
  //   });
  // }
}
