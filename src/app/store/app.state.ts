import { Order, User } from '../models/user.model';

export interface AppState {
  users: {
    entities: { [id: number]: User },
    selectedUserId: number | null
  };
  orders: {
    entities: { [id: number]: Order },
  }
}