import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { addUser, deleteUser, loadUsersSuccess, selectUser, updateUser } from './user.actions';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
}

export const adapter = createEntityAdapter<User>();

export const initialUserState: UserState = adapter.getInitialState({
  selectedUserId: null,
});

export const userReducer = createReducer(
  initialUserState,
  on(loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, state)
  ),
  on(selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),
  on(deleteUser, (state, { userId }) => {
    return adapter.removeOne(userId, state);
  }),
  on(addUser, (state, { user }) => adapter.addOne(user, state)),
  on(updateUser, (state, { user }) => adapter.updateOne({ id: user.id, changes: user }, state))
);

export const { selectAll, selectEntities } = adapter.getSelectors();
