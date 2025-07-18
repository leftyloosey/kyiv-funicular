// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

// }
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // export class Housing {
  url = 'http://localhost:3000/user';

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  // async getHousingLocationById(
  //   id: number
  // ): Promise<HousingLocationInfo | undefined> {
  //   const data = await fetch(`${this.url}?id=${id}`);
  //   const locationJson = await data.json();
  //   return locationJson[0] ?? {};
  // }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
  constructor() {}
}
