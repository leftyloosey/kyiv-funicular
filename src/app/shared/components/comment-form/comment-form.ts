import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../../utils/classes/attempt';
import { AuthService } from '../../../services/auth-service/auth.service';
// import { commentSignal } from '../../../utils/signals';
import { CommentService } from '../../../services/comment-service/comment.service';
@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.scss'],
})
export class CommentFormComponent {
  auth = inject(AuthService);
  commentService = inject(CommentService);
  smallReplyBox = input<boolean>();
  // commentSignal = input;
  // logged = !this.auth.isAuthenticated();
  logged = computed(() => this.auth.isAuthenticated());
  canClickReply: boolean = true;

  model: Attempt;

  constructor() {
    this.model = Attempt.noParentId('');
    this.commentService.castValue.subscribe(
      (value) => (this.canClickReply = value)
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.model);
    // commentSignal.set(form.value);
  }
}
