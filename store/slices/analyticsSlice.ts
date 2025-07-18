import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  revenueData: Array<{
    month: string;
    revenue: number;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}

interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
}

const mockAnalyticsData: AnalyticsData = {
  totalRevenue: 45230.50,
  totalOrders: 156,
  totalUsers: 1234,
  totalProducts: 89,
  revenueData: [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ],
  topProducts: [
    { name: 'Wireless Headphones', sales: 89, revenue: 26691 },
    { name: 'Smart Watch', sales: 67, revenue: 26799.33 },
    { name: 'Coffee Maker', sales: 45, revenue: 8999.55 },
  ],
};

const initialState: AnalyticsState = {
  data: mockAnalyticsData,
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk('analytics/fetchAnalytics', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAnalyticsData;
});

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  },
});

export default analyticsSlice.reducer;