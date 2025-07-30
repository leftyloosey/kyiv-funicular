import { Component, effect } from '@angular/core';
import { Counter } from '../counter/counter';
import { BookComponent } from '../book/book';
import { Book } from '../interfaces/book';
@Component({
  selector: 'app-about',
  imports: [Counter, BookComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  counter = 0;
  angularBook = {
    title: 'Angular Core Deep Dive',
    synopsis: 'A deep dive into Angular core concepts',
  };
  // angularBook = new Book('', '');
  onIncrement() {
    this.counter++;
  }
  constructor() {
    effect(() => {
      console.log(`about value ${this.counter}`);
    });
  }
  deleteBookEvent(book: Book) {
    console.log(book);
    console.log('and do other stuff as well');
    this.angularBook.title = '';
    this.angularBook.synopsis = '';
  }
}
