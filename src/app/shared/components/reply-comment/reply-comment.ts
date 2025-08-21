import {
  Component,
  input,
  OnInit,
  inject,
  computed,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../../utils/classes/attempt';
import { CommentService } from '../../../services/comment-service/comment.service';
import { inputSafetyStorage } from '../../../utils/signals';
@Component({
  selector: 'app-reply-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './reply-comment.html',
  styleUrl: './reply-comment.scss',
})
export class ReplyComment implements OnInit, AfterViewChecked {
  private auth = inject(AuthService);
  private commentService = inject(CommentService);
  protected logged = computed(() => this.auth.isAuthenticated());
  protected model!: Attempt;

  public parentId = input<any>();

  constructor() {
    this.model = Attempt.withParentId('', '');
  }
  ngAfterViewChecked(): void {
    inputSafetyStorage.set(this.model.entry);
  }

  ngOnInit(): void {
    this.model = Attempt.withParentId(inputSafetyStorage(), this.parentId());
    // this.model = Attempt.withParentId('', this.parentId());
  }

  submitCommentToService(form: NgForm) {
    inputSafetyStorage.set('');
    this.commentService.submitCommentToService({
      user: this.auth.getUserId(),
      parentId: this.model.parentId,
      text: this.model.entry,
    });
    form.reset();
  }
}
