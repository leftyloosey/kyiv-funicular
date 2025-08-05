import { Component, input, OnInit } from '@angular/core';
import { Attempt } from '../../classes/attempt';

@Component({
  selector: 'app-reply-comment',
  imports: [],
  templateUrl: './reply-comment.html',
  styleUrl: './reply-comment.css',
})
export class ReplyComment implements OnInit {
  // parentId = input.required<string>();
  model: Attempt | undefined;

  parentId = input<any>();
  constructor() {}
  ngOnInit(): void {
    this.model = Attempt.withParentId('', this.parentId());
    console.log(this.model);
  }
}
