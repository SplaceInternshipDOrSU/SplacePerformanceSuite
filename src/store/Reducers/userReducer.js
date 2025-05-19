import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// SPLACE BS
export const get_users_request = createAsyncThunk(
  "seller/get_users_request",
  async (
    { parPage, page, searchValue,role, category },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const {token} = getState().auth
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
    try {
      const { data } = await api.get(`/request-users-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&role=${role}&&category=${category}`, config)
      console.log("fetch data")
      console.log(data)
      return fulfillWithValue(data)
 
     
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user = createAsyncThunk(
  'user/get_user',
  async (userId, { rejectWithValue, fulfillWithValue,getState }) => {
    const {token} = getState().auth
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }

      try {
          const { data } = await api.get(`/get-user/${userId}`,config)
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const user_status_update = createAsyncThunk(
  'user/user_status_update',
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
      try {
          const { data } = await api.post(`/user-status-update`, info, config)
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)


export const get_active_users = createAsyncThunk(
  'user/get_active_users',
  async ({ parPage, page, searchValue,role, category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-users?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&role=${role}&&category=${category}`, config)
          console.log("GET ALL ACTIVE USERS")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

// SPLACE BS



export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue,getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const { data } = await api.post("/category-add", formData,config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_request = createAsyncThunk(
    "seller/get_seller_request",
    async (
      { parPage, page, searchValue },
      { rejectWithValue, fulfillWithValue, getState }
    ) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
        const { data } = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
        console.log(data)
        return fulfillWithValue(data)
   
       
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const get_trader_request = createAsyncThunk(
    "seller/get_trader_request",
    async (
      { parPage, page, searchValue },
      { rejectWithValue, fulfillWithValue,getState }
    ) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

      try {
        const { data } = await api.get(`/request-trader-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
        console.log(data)
        return fulfillWithValue(data)
   
       
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId, { rejectWithValue, fulfillWithValue,getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

        try {
            const { data } = await api.get(`/get-seller/${sellerId}`,config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
  export const get_trader = createAsyncThunk(
    'seller/get_trader',
    async (sellerId, { rejectWithValue, fulfillWithValue, getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.get(`/get-trader/${sellerId}`, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async (info, { rejectWithValue, fulfillWithValue, getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.post(`/seller-status-update`, info, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const trader_status_update = createAsyncThunk(
    'seller/trader_status_update',
    async (info, { rejectWithValue, fulfillWithValue,getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.post(`/trader-status-update`, info, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_active_sellers = createAsyncThunk(
  'seller/get_active_sellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const get_deactive_sellers = createAsyncThunk(
  'seller/get_deactive_sellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)



export const userReducer = createSlice({
  name: "user",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: {},
    trader: {},
    traders: [],


    user: [],
    users: [],
    totalUsers: [],

  
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(categoryAdd.pending, (state, _) => {
    //   state.loader = true;
    // });
    // builder.addCase(categoryAdd.rejected, (state, payload) => {
    //   state.loader = false;
    //   state.errorMessage = payload.payload.error;
    // });
    builder.addCase(get_seller_request.fulfilled, (state, payload) => {
      state.loader = false;
      state.totalSeller = payload.payload.totalSeller;
      state.sellers = payload.payload.sellers;
      
    });
    builder.addCase(get_seller.fulfilled, (state, payload) => {
      state.loader = false;
      state.seller = payload.payload.seller;
    
    });
    builder.addCase(get_trader.fulfilled, (state, payload) => {
      state.loader = false;
      state.trader = payload.payload.trader;
    
    });
    builder.addCase(seller_status_update.pending, (state) => {
      state.loader = true;
     
    
    });
    builder.addCase(seller_status_update.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
     
    
    });
    builder.addCase(seller_status_update.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.seller = payload.payload.seller;
      // });
     
    
    });
    builder.addCase(get_active_sellers.fulfilled, (state, payload) => {
      state.loader = false;
      state.sellers = payload.payload.sellers
      state.totalSeller = payload.payload.totalSeller
    });
    builder.addCase(get_deactive_sellers.fulfilled, (state, payload) => {
      state.loader = false;
      state.sellers = payload.payload.sellers
      state.totalSeller = payload.payload.totalSeller
    });

    // builder.addCase(get_category.fulfilled, (state, payload) => {
    //   // state.category = payload.payload.message;
    //   state.totalCategory = payload.payload.totalCategory;
    //   state.categories = payload.payload.categories;
    // });

    builder.addCase(get_trader_request.fulfilled, (state, payload) => {
      state.loader = false;
      state.traders = payload.payload.traders
      state.totalTraders = payload.payload.totalTraders
    });

    builder.addCase(trader_status_update.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.trader = payload.payload.trader;
      // });
     
    
    });



    // SPLACE BS
    builder.addCase(get_users_request.fulfilled, (state, payload) => {
      state.loader = false;
      state.totalUsers = payload.payload.totalUsers;
      state.totalPages = payload.payload.totalPages;
      state.users = payload.payload.users;
      
    });

    builder.addCase(get_user.fulfilled, (state, payload) => {
      state.loader = false;
      state.user = payload.payload.user;
    
    });


    builder.addCase(get_active_users.fulfilled, (state, payload) => {
      state.loader = false;
      state.users = payload.payload.users
      state.totalUsers = payload.payload.totalUsers
      state.totalPages  = payload.payload.totalPages

    });

    builder.addCase(user_status_update.pending, (state) => {
      state.loader = true;
     
    
    });
    builder.addCase(user_status_update.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
     
    
    });
    builder.addCase(user_status_update.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.seller = payload.payload.seller;

      if (payload.payload.user) {
        state.users = [...state.users, payload.payload.user];
      }   
    });
    
  },
});

export const { messageClear } = userReducer.actions;
export default userReducer.reducer;
