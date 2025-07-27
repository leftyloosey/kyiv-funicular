import { Component } from '@angular/core';
import { Actor } from '../classes/actor';
import { FormsModule, NgForm } from '@angular/forms';
// import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form-component.html',
  styleUrl: './actor-form-component.css',

  imports: [FormsModule],
  // imports: [FormsModule, JsonPipe],
})
export class ActorFormComponent {
  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  model = new Actor(18, 'Tom Cruise', this.skills[3], 'CW Productions');
  submitted = false;
  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(form.controls);
    // const formr = event.target as HTMLFormElement;
    this.submitted = true;
  }

  newActor() {
    this.model = new Actor(42, '', '');
  }

  // export class ActorFormComponent {
  //   skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  //   model = new Actor(18, 'Tom Cruise', this.skills[3], 'CW Productions');
  //   submitted = false;
  //   onSubmit() {
  //     this.submitted = true;
  //   }
}
