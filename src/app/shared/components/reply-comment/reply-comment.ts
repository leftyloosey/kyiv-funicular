import {
  Component,
  input,
  OnInit,
  inject,
  computed,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../../utils/classes/attempt';
import { CommentService } from '../../../services/comment-service/comment.service';

import { nestedSignal } from '../../../utils/signals';
@Component({
  selector: 'app-reply-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './reply-comment.html',
  styleUrl: './reply-comment.scss',
})
export class ReplyComment implements OnInit {
  private auth = inject(AuthService);
  private commentService = inject(CommentService);
  // logged = !this.auth.isAuthenticated();
  protected logged = computed(() => this.auth.isAuthenticated());
  // dataEmitted = output<>();

  parentId = input<any>();
  model!: Attempt;

  constructor() {
    this.model = Attempt.withParentId('', '');
  }

  ngOnInit(): void {
    this.model = Attempt.withParentId('', this.parentId());
  }
  submitCommentToService(form: NgForm) {
    this.commentService.nextComment({
      user: this.auth.getUserId(),
      parentId: this.model.parentId,
      text: this.model.entry,
    });
    nestedSignal.set(false);
  }
}
