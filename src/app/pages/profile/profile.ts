import { Component, inject, computed, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Comment } from '../../interfaces/comment';
import { CommentComponent } from '../../components/comment/comment';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, CommentComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  route = inject(ActivatedRoute);
  data = toSignal(this.route.data);

  display = signal<Comment[]>([]);
  comments = computed(() => this.data() as Comment);

  constructor() {
    effect(() => {
      this.route.data.subscribe((comment) => {
        const { user } = comment;
        this.display.set(user);
      });
    });
    // this.route.data.subscribe((comment) => {
    //   const { user } = comment;
    //   this.display.set(user);
    // });
  }

  // settings = computed(() => this.data().settings as Settings);
}
