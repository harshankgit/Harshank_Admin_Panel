import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalUsers: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'moderator',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-05'
  },
];

const initialState: UsersState = {
  users: mockUsers,
  loading: false,
  error: null,
  totalUsers: mockUsers.length,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockUsers;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserStatus: (state, action: PayloadAction<{id: string; status: 'active' | 'inactive'}>) => {
      const user = state.users.find(u => u.id === action.payload.id);
      if (user) {
        user.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.totalUsers = action.payload.length;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { updateUserStatus } = usersSlice.actions;
export default usersSlice.reducer;