import {
  Component,
  effect,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
// export class Counter implements OnChanges {
//   @Input()
//   value = 0;
//   ngOnChanges(changes: SimpleChanges) {
//     const change = changes['value'];

//     if (change) {
//       console.log(`New value: ${change.currentValue}`);
//     }
//   }
// }
export class Counter {
  value = input(0);
  constructor() {
    effect(() => {
      console.log(`New value: ${this.value()}`);
    });
  }
}
