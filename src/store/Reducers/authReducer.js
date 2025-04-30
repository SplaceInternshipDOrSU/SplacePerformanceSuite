import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { jwt, jwtDecode } from "jwt-decode";
import { baseURL } from "../../utils/config";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Clear any old tokens
      localStorage.removeItem("accessToken");

      const { data } = await axios.post(`${baseURL}/api/admin-login`, info);

      localStorage.setItem("accessToken", data.token);  // Store the new token
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);






export const change_password = createAsyncThunk(
  "auth/change_password",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {

      // Send the request to change the password
      const { data } = await axios.put(
        `${baseURL}/api/admin-change-password`,info,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Attach the token
          },
        }
      );

      // Return the success message or any relevant data
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password change failed");
    }
  }
);
export const change_password_seller = createAsyncThunk(
  "auth/change_password_seller",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {

      // Send the request to change the password
      const { data } = await axios.put(
        `${baseURL}/api/seller-change-password`,info,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Attach the token
          },
        }
      );

      console.log(data)
      // Return the success message or any relevant data
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password change failed");
    }
  }
);

export const admin_changePassword = createAsyncThunk(
  "auth/trader_changePassword",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/trader/change-password", info);
      // Clearing the token after password change to force a re-login
      localStorage.removeItem("traderToken");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/seller-login`, info);
      // const { data } = await axios.post("/seller-login", info);
      console.log("data");
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async ({navigate,role}, { rejectWithValue, fulfillWithValue, getState }) => {
//     const {token} = getState().auth
//     const config = {
//       headers : {
//         Authorization: `Bearer ${token}`
//       }
//     }
//     try {
//       const { data } = await axios.get(`${baseURL}/api/logout`, config);
//       console.log(data)
//       // const { data } = await axios.get("/logout", config);
//       localStorage.removeItem("accessToken");
//       if(role === 'admin'){
//         navigate('/admin/login')
//       }else{
//         navigate('/login')
//       }
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   "auth/logout",
//   async ({ navigate, role }, { rejectWithValue, fulfillWithValue, getState }) => {
//     const { token } = getState().auth;

//     if (!token) {
//       return rejectWithValue({ message: "Token is missing" });
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       // Wait for the API response
//       const { data } = await axios.post(`${baseURL}/api/logout`, config);
//       console.log("Logout success:", data);

//       // Remove token after the API call succeeds
//       localStorage.removeItem("accessToken");

//       // Perform navigation based on the role
//       if (role === "admin") {
//         navigate("/admin/login");
//       } else {
//         navigate("/login");
//       }

//       // Fulfill the thunk with the API response
//       return fulfillWithValue(data);
//     } catch (error) {
//       console.error("Logout error:", error.response || error.message);
//       return rejectWithValue(error.response?.data || { message: "Logout failed" });
//     }
//   }
// );


// export const logout = createAsyncThunk(
//   "auth/logout",
//   async ({ navigate, role }, { rejectWithValue, fulfillWithValue, getState }) => {
//     const { token } = getState().auth;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       const { data } = await axios.get(`${baseURL}/api/logout`, config);
//       console.log(data);
//       localStorage.removeItem("accessToken");

//       // Wait for API response and then add a delay before navigation
//       await new Promise((resolve) => setTimeout(resolve, 3000)); // 1-second delay

//       if (role === "admin") {
//         navigate("/admin/login");
//       } else {
//         navigate("/login");
//       }

//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate, category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseURL}/api/logout`, config);
      console.log(data);
      localStorage.removeItem("accessToken");

      // Refresh the page
      window.location.reload();

      // Continue navigation after a short delay
      setTimeout(() => {
        if (category === "admin") {
          navigate("/admin/login");
        } else {
          navigate("/login");
        }
      }, 1000); // 1-second delay

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// USER ROUTES

export const user_register = createAsyncThunk(
  "auth/user_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await axios.post(`${baseURL}/api/user-register`, info,
        {
          withCredentials: true,
        }
      );
      // const { data } = await axios.post("/seller-register", info);
      // localStorage.setItem("accessToken", data.token);\
      console.log("_--------------------------------- >")
      console.log(data)
      console.log("_--------------------------------- >")
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_login = createAsyncThunk(
  "auth/user_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/user-login`, info);
      // const { data } = await axios.post("/seller-login", info);
      console.log("data");
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);






// TO BE REMOVED
export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await axios.post(`${baseURL}/api/user-register`, info,
        {
          withCredentials: true,
        }
      );
      // const { data } = await axios.post("/seller-register", info);
      // localStorage.setItem("accessToken", data.token);\
      console.log("_--------------------------------- >")
      console.log(data)
      console.log("_--------------------------------- >")
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);






export const trader_register = createAsyncThunk(
  "auth/trader_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info)
    console.log("Trader Register -------------------------- >")
    try {
      console.log(info);
      const { data } = await axios.post(`${baseURL}/api/trader-register`, info,
        {
          withCredentials: true,
        }
      );
      // const { data } = await axios.post("/trader-register", info);
      // localStorage.setItem("accessToken", data.token);
      console.log("----------------------------------- >")
      console.log(data)
      console.log("----------------------------------- >")
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





// export const seller_register = createAsyncThunk(
//   "auth/seller_register",
//   async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       console.log(info);
//       const { data } = await api.post("/seller-register", info, {
        // withCredentials: true,
//       });
//       localStorage.setItem("accessToken", data.token);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async (image, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    try {
      const { data } = await axios.post(`${baseURL}/api/profile-image-upload `, image, config);
      // const { data } = await axios.post("/profile-image-upload", image, config);
      console.log("API response:", data);  // Log the API response
      return fulfillWithValue(data);  // Return the data if successful
    } catch (error) {
      console.error("API error:", error.response?.data || "Unknown error");  // Log the error
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
export const business_image_upload = createAsyncThunk(
  "auth/business_image_upload",
  async (associationImage, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    console.log("ASdasdasd TAE")

    try {
      const { data } = await axios.post(`${baseURL}/api/business-image-upload`, associationImage, config);
      // const { data } = await axios.post("/profile-image-upload", image, config);
      console.log("API response:", data);  // Log the API response
      return fulfillWithValue(data);  // Return the data if successful
    } catch (error) {
      console.error("API error:", error.response?.data || "Unknown error");  // Log the error
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
export const association_image_upload = createAsyncThunk(
  "auth/association_image_upload",
  async (image, { rejectWithValue, fulfillWithValue,getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    try {
      const { data } = await axios.post(`${baseURL}/api/association-image-upload`, image,config);
      // const { data } = await axios.post("/association-image-upload", image,config);
      console.log("API response:", data);  // Log the API response
      return fulfillWithValue(data);  // Return the data if successful
    } catch (error) {
      console.error("API error:", error.response?.data || "Unknown error");  // Log the error
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);


export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue,getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        authorization: `Bearer ${token}`
      }
    }


console.log(config)
console.log("config")
    // const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }
    try {
      const { data } = await axios.get(`${baseURL}/api/get-user`, config);
      console.log("GET USER DATA")
      console.log(data)
      // const { data } = await axios.get("/get-user", config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);


const returnCategory = (token) => {
  console.log("RETURN CATEGORY");

  if (!token) {
    console.log("NO TOKEN PROVIDED");
    return ""; // No token, return an empty role
  }

  try {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);

    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return ""; // Token expired, clear the role
    } else {
      // Normalize: lowercase + remove spaces
      const rawCategory = decodeToken.category || "";
      const normalizedCategory = rawCategory.toLowerCase().replace(/\s+/g, "");
      return normalizedCategory;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return ""; // If decoding fails, return an empty role
  }
};


export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    loader1: false,
    userInfo: "",
    requestMessage: "",
    requestMessageError: "",
    category: returnCategory(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    requestMessageClear: (state) => {
      state.requestMessage = "";
      state.requestMessageError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(admin_login.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload;
    });
    builder.addCase(admin_login.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload;
      state.token = payload.payload.token;
      state.category = returnCategory(payload.payload.token);
    });

    builder.addCase(seller_login.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(seller_login.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload;
    });
    builder.addCase(seller_login.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload;
      state.token = payload.payload.token;
      state.category = returnCategory(payload.payload.token);
    });




    builder.addCase(change_password.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(change_password.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(change_password.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      // state.token = payload.payload.token;
      // state.category = returnCategory(payload.payload.token);
    });
    builder.addCase(change_password_seller.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(change_password_seller.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(change_password_seller.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      // state.token = payload.payload.token;
      // state.category = returnCategory(payload.payload.token);
    });

    builder.addCase(seller_register.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(seller_register.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
      state.requestMessageError = payload.payload.requestMessage;
    });
    builder.addCase(seller_register.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.requestMessage = payload.payload.requestMessage;
     
    });




    
    // SPLACE_INTERNSHIP
    builder.addCase(user_register.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(user_register.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
      state.requestMessageError = payload.payload.requestMessage;
    });
    builder.addCase(user_register.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.requestMessage = payload.payload.requestMessage;
     
    });







    builder.addCase(get_user_info.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_user_info.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload || "Failed to fetch user info";
    })
    builder.addCase(get_user_info.fulfilled, (state, payload) => {
      state.loader = false;
      state.userInfo = payload.payload.userInfo;
      state.category = payload.payload.userInfo.category;
      // state.userInfo = payload.userInfo;
    });



// Profile image upload
    builder.addCase(profile_image_upload.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(profile_image_upload.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload; // Add error handling here
    });
    builder.addCase(profile_image_upload.fulfilled, (state, payload) => {
      state.loader = false;
      state.userInfo = payload.payload.userInfo;
      state.successMessage = payload.payload.message; // Confirm success
        });
    builder.addCase(business_image_upload.pending, (state) => {
      state.loader1 = true;
    });
    builder.addCase(business_image_upload.rejected, (state, payload) => {
      state.loader1 = false;
      state.errorMessage = payload.payload; // Add error handling here
    });
    builder.addCase(business_image_upload.fulfilled, (state, payload) => {
      state.loader1 = false;
      state.userInfo = payload.payload.userInfo;
      state.successMessage = payload.payload.message; // Confirm success
        });




        builder.addCase(trader_register.pending, (state) => {
          state.loader = true;
        });
        builder.addCase(trader_register.rejected, (state, payload) => {
          state.loader = false;
          state.errorMessage = payload.payload.error;
          state.requestMessageError = payload.payload.requestMessage;
        });
        builder.addCase(trader_register.fulfilled, (state, payload) => {
          state.loader = false;
          state.successMessage = payload.payload.message;
          state.requestMessage = payload.payload.requestMessage;

        });

        builder.addCase(logout.pending, (state) => {
          state.loader = true;
        });
        builder.addCase(logout.rejected, (state, payload) => {
          state.loader = false;
          state.errorMessage = payload.payload.error;
          state.requestMessageError = payload.payload.requestMessage;
        });
        builder.addCase(logout.fulfilled, (state, payload) => {
          state.loader = false;
          state.successMessage = payload.payload.message;
          state.requestMessage = payload.payload.requestMessage;
          state.userInfo = "";

        });

        // USER
        builder.addCase(user_login.pending, (state) => {
          state.loader = true;
        });
        builder.addCase(user_login.rejected, (state, payload) => {
          state.loader = false;
          state.errorMessage = payload.payload;
        });
        builder.addCase(user_login.fulfilled, (state, payload) => {
          state.loader = false;
          state.successMessage = payload.payload;
          state.token = payload.payload.token;
          state.category = returnCategory(payload.payload.token);
        });
  },




  // USER
  

  // builder.addCase(seller_register.rejected, (state, payload) => {
  //   state.loader = false;
  //   state.errorMessage = payload.payload.error;
  //   state.requestMessageError = payload.payload.requestMessage;
  // });
  // builder.addCase(seller_register.fulfilled, (state, payload) => {
  //   state.loader = false;
  //   state.successMessage = payload.payload.message;
  //   state.requestMessage = payload.payload.requestMessage;

  // });
});

export const { messageClear,requestMessageClear } = authReducer.actions;
export default authReducer.reducer;
