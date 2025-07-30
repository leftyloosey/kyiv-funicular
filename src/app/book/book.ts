import { Component, computed, effect, input, output } from '@angular/core';
import { Book } from '../interfaces/book';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class BookComponent {
  book = input.required<Book>();
  deleteBook = output<Book>();
  // deleteBook = outputFromObservable<Book>(
  //   of({
  //     title: 'Angular Core Deep Dive',
  //     synopsis: 'A deep dive into the core features of Angular.',
  //   })
  // );

  bookLength = computed(() => this.book().title.length);
  // book = input<Book>({ title: '', synopsis: '' });
  constructor() {
    console.log('delete', this.deleteBook);
    effect(() => {
      console.log(this.book());
    });
  }
  onDelete() {
    this.deleteBook.emit({
      title: 'Angular Deep Dive',
      synopsis: 'A deep dive into Angular core concepts',
    });
  }
}
