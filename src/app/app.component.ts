import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { selectAllUsers, selectCurrentUser } from './store/user.selectors';
import { deleteUser, loadUsers, selectUser, updateUser, addUser } from './store/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUserId: number | undefined;
  editedUserName: string = '';
  

  newUserId: number | null = null;
  newUserName: string = '';

  constructor(private store: Store<AppState>) {
    this.users$ = store.select(selectAllUsers);
  }
  
  ngOnInit() {
    this.store.dispatch(loadUsers());
  }

  onUpdateUser(userId: number) {
    this.store.dispatch(selectUser({ userId }));
    this.selectedUserId = userId;


    this.users$.subscribe(users => {
      const user = users.find(u => u.id === userId);
      if (user) {
        this.editedUserName = user.name;
      }
    });
  }
  
  onSaveUser(userId: number) {
    if (this.editedUserName.trim() !== '') {
      const updatedUser: User = {
        id: userId,
        name: this.editedUserName,
       
      };
      this.store.dispatch(updateUser({ user: updatedUser }));
    }
    this.selectedUserId = undefined; 
  }

  onDeleteUser(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
  
  onAddUser() {
    if (this.newUserId !== null && this.newUserName.trim() !== '') {
      const newUser: User = {
        id: this.newUserId,
        name: this.newUserName,
      };
      this.store.dispatch(addUser({ user: newUser }));


      this.newUserId = null;
      this.newUserName = '';
    }
  }
}
