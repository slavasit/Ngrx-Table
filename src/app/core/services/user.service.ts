import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDto } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAll(): Observable<UserDto[]> {
    const users: UserDto[] = [
      { id: 1, name: 'John Doe', orders: [{ id: 1, total: 100 }] },
      { id: 2, name: 'Jane Smith', orders: [{ id: 2, total: 150 }] },
      { id: 3, name: 'Alice Johnson', orders: [{ id: 3, total: 200 }] },
      { id: 4, name: 'Bob Brown', orders: [{ id: 4, total: 250 }] },
      { id: 5, name: 'Charlie Davis', orders: [{ id: 5, total: 300 }] },
      { id: 6, name: 'Diana Evans', orders: [{ id: 6, total: 350 }] },
      { id: 7, name: 'Ethan Wilson', orders: [{ id: 7, total: 400 }] },
      { id: 8, name: 'Fiona Clark', orders: [{ id: 8, total: 450 }] },
      { id: 9, name: 'George Harris', orders: [{ id: 9, total: 500 }] },
      { id: 10, name: 'Hannah Lewis', orders: [{ id: 10, total: 550 }] },
     
    ];
    return of(users);
  }
}