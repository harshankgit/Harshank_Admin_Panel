import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalProducts: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    stock: 50,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health monitoring features',
    price: 399.99,
    stock: 30,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Premium coffee maker with multiple brewing options',
    price: 199.99,
    stock: 25,
    category: 'Appliances',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'active',
    createdAt: '2024-01-05'
  },
];

const initialState: ProductsState = {
  products: mockProducts,
  loading: false,
  error: null,
  totalProducts: mockProducts.length,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockProducts;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProductStatus: (state, action: PayloadAction<{id: string; status: 'active' | 'inactive'}>) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.status = action.payload.status;
      }
    },
    updateStock: (state, action: PayloadAction<{id: string; stock: number}>) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.stock = action.payload.stock;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalProducts = action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { updateProductStatus, updateStock } = productsSlice.actions;
export default productsSlice.reducer;