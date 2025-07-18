import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  totalOrders: number;
}

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    total: 299.99,
    status: 'delivered',
    items: [
      { productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 299.99 }
    ],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    total: 599.98,
    status: 'processing',
    items: [
      { productId: '2', productName: 'Smart Watch', quantity: 1, price: 399.99 },
      { productId: '3', productName: 'Coffee Maker', quantity: 1, price: 199.99 }
    ],
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    total: 199.99,
    status: 'pending',
    items: [
      { productId: '3', productName: 'Coffee Maker', quantity: 1, price: 199.99 }
    ],
    createdAt: '2024-01-13'
  },
];

const initialState: OrdersState = {
  orders: mockOrders,
  loading: false,
  error: null,
  totalOrders: mockOrders.length,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockOrders;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    updateOrderStatus: (state, action: PayloadAction<{id: string; status: Order['status']}>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      });
  },
});

export const { updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;