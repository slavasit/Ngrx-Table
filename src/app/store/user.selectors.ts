import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState, selectAll, selectEntities } from './user.reducer';
import { AppState } from './app.state';
import { Order } from '../models/user.model';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, selectAll);

export const selectOrderState = createFeatureSelector<{ entities: { [id: number]: Order } }>('orders');

export const selectUserEntities = createSelector(selectUserState, selectEntities);

export const selectCurrentUserId = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUserId
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userId !== null ? userEntities[userId] : undefined
);
export const selectAllUsersWithOrders = createSelector(
  selectUserState,
  selectOrderState,
  (userState, orderState) => {
    return Object.keys(userState.entities).map(userId => {
      const user = userState.entities[+userId];
      if (!user) {
        return null; 
      }
      const orders = Object.values(orderState.entities).filter(order => order.userId === user.id);
      const totalOrder = orders.reduce((total, order) => total + order.total, 0);
      return {
        ...user,
        totalOrder
      };
    }).filter(user => user !== null); 
  }
);
