import { Component, computed, inject, input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../../utils/classes/attempt';
import { AuthService } from '../../../services/auth-service/auth.service';
import { CommentService } from '../../../services/comment-service/comment.service';
@Component({
  selector: 'app-comment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.html',
  styleUrls: ['./comment-form.scss'],
})
export class CommentFormComponent implements OnDestroy {
  private auth = inject(AuthService);
  private commentService = inject(CommentService);
  public smallReplyBox = input<boolean>();
  protected logged = computed(() => this.auth.isAuthenticated());
  protected canClickReply: boolean = true;

  protected model: Attempt;

  constructor() {
    this.model = Attempt.noParentId('');
  }
  ngOnDestroy(): void {}

  protected submitCommentToService(form: NgForm) {
    this.commentService.submitCommentToService({
      user: this.auth.getUserId(),
      parentId: this.model.parentId,
      text: this.model.entry,
    });
    form.resetForm();
  }
}
