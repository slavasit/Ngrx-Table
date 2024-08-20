
  
  export interface User {
    id: number;
    name: string;
  }

  export interface Order {
    id: number;
    userId: number;
    total: number;
  }
  
  export interface UserDto {
    id: number;
    name: string;
    orders: OrderDto[];
  }

  export interface OrderDto {
    id: number;
    total: number;
  }