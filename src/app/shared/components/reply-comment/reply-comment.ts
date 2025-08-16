import { Component, input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Attempt } from '../../../utils/classes/attempt';
import { commentSignal } from '../../../utils/signals';

@Component({
  selector: 'app-reply-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './reply-comment.html',
  styleUrl: './reply-comment.scss',
})
export class ReplyComment implements OnInit {
  auth = inject(AuthService);
  logged = !this.auth.isAuthenticated();
  parentId = input<any>();
  model!: Attempt;

  constructor() {
    this.model = Attempt.withParentId('', '');
  }

  ngOnInit(): void {
    this.model = Attempt.withParentId('', this.parentId());
    console.log(this.model);
  }
  onSubmit(form: NgForm) {
    console.log('reply form submit model', this.model);
    commentSignal.set(this.model);
  }
}
