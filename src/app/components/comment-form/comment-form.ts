import { Component, inject, input } from '@angular/core';
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
  auth = inject(AuthService);
  smallReplyBox = input<boolean>();
  parentId = input<any>();

  logged = !this.auth.isAuthenticated();

  model: Attempt;

  constructor() {
    this.model = Attempt.noParentId('');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.model);
    // commentSignal.set(form.value);
  }
}
