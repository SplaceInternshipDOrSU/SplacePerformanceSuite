import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";



// SPLACE_BS

export const get_supervisors = createAsyncThunk(
  'user/get_supervisors',
  async ({ parPage, page, searchValue,role, category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-supervisors?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&role=${role}&&category=${category}`, config)
          console.log("GET ALL SUPERVISORS USERS")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)


export const get_managers = createAsyncThunk(
  'user/get_managers',
  async ({ parPage, page, searchValue,role, category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-managers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&role=${role}&&category=${category}`, config)
          console.log("GET ALL SUPERVISORS USERS")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)
export const get_rankandfile_employees = createAsyncThunk(
  'user/get_rankandfile_employees',
  async ({ parPage, page, searchValue,role, category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-rf-employee?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&role=${role}&&category=${category}`, config)
          console.log("GET ALL SUPERVISORS USERS")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const get_active_ceo = createAsyncThunk(
  'user/get_active_ceo',
  async ({ category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-active-ceo?category=${category}`, config)
          console.log("GET ACTIVE CEO")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)
export const get_active_coo = createAsyncThunk(
  'user/get_active_coo',
  async ({ category }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-active-coo?category=${category}`, config)
          console.log("GET ACTIVE C0O")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)







export const teamAdd = createAsyncThunk(
  "team/team-add",
  async ({ name, ceoId, cooId, manager, supervisor, rf }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("ceoId", ceoId);
      formData.append("cooId", cooId);
      formData.append("supervisorId", supervisor);
      formData.append("managerId", manager);

      // Append each rank-and-file ID one by one
      rf.forEach(id => {
        formData.append("rankandfileIds[]", id); // backend expects an array
      });

      const { data } = await api.post("/team-add", formData, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const teams_get = createAsyncThunk(
  "team/teams_get",
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
      const { data } = await api.get(
        `/teams-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
      console.log("TEAMS GET")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// SPLACE_BS
export const categories_get = createAsyncThunk(
    "categories/categories_get",
    async (
      { parPage, page, searchValue},
      { rejectWithValue, fulfillWithValue, getState }
    ) => {
      const { token } = getState().auth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          parPage: parPage.toString(),
          searchValue,
        });
  
        const { data } = await api.get(`/categories-get?${params.toString()}`, config);
  
        console.log("Categories fetched:", data);
        return fulfillWithValue(data);
      } catch (error) {
        console.error("Error fetching Categories:", error);
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

  export const categoryAdd = createAsyncThunk(
    "category/category-add",
    async ({ name,  description }, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
      const config = {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
  
  
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
  
  
        const { data } = await api.post("/category-add", formData, config);
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const roles_get = createAsyncThunk(
    "roles/role_get",
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
        const { data } = await api.get(
          `/roles-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
          config
        );
        console.log("ROLES GET")
        console.log(data)
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const roleAdd = createAsyncThunk(
    "role/role-add",
    async ({ name,  description }, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
      const config = {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
  
  
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
  
  
        const { data } = await api.post("/role-add", formData, config);
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const get_role_by_id = createAsyncThunk(
    "role/get_role_by_id",
    async (roleId, { rejectWithValue, fulfillWithValue, getState }) => {
      const { token } = getState().auth;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
  
      console.log()
      try {
        const {data} = await api.get(`/role-get-id/${roleId}`,config);
        console.log(data)
        console.log("-------------------------get role by ID")
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  );


  export const roleEdit = createAsyncThunk(
    "role/roleEdit",
    async ({  id, name ,description}, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
      const config = {
        headers : {
          Authorization: `Bearer ${token}`
        }
      }
  
  
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("id", id);
  
  
        const { data } = await api.post("/role-edit", formData, config);
        console.log(data)
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  


// export const categoryAdd = createAsyncThunk(
//   "category/categoryAdd",
//   async ({ name, image }, { rejectWithValue, fulfillWithValue, getState}) => {
//     const {token} = getState().auth
//     const config = {
//       headers : {
//         Authorization: `Bearer ${token}`
//       }
//     }


//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("image", image);


//       const { data } = await api.post("/category-add", formData, config);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


export const categoryEdit = createAsyncThunk(
  "category/categoryEdit",
  async ({  id, name }, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("id", id);


      const { data } = await api.post("/category-edit", formData, config);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const locationEdit = createAsyncThunk(
  "category/locationEdit",
  async ({  id, name,Street,Barangay,CityMunicipality,Province}, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("id", id);
      formData.append("Street", Street);
      formData.append("Barangay", Barangay);
      formData.append("CityMunicipality", CityMunicipality);
      formData.append("Province", Province);


      const { data } = await api.post("/location-edit", formData, config);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const category_image_update = createAsyncThunk(
  "commodity/category_image_update",
  async ({ oldImage, newImage, categoryId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("categoryId", categoryId);


      console.log(newImage)
      

      console.log(formData)
      const { data } = await api.post("/category-image-update", formData, config);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const location_image_update = createAsyncThunk(
  "commodity/location_image_update",
  async ({ oldImage, newImage, locationId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("locationId", locationId);


      console.log(newImage)
      

      console.log(formData)
      const { data } = await api.post("/location-image-update", formData, config);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const locationsAdd = createAsyncThunk(
  "category/locationsAdd",
  async ({ image,name, Street, Barangay, CityMunicipality, Province }, { rejectWithValue, fulfillWithValue, getState}) => {
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
      formData.append("Street", Street);
      formData.append("Barangay", Barangay);
      formData.append("CityMunicipality", CityMunicipality);
      formData.append("Province", Province);


      const { data } = await api.post("/location-add", formData, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const roleDelete = createAsyncThunk(
  "role/roleDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log(id)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make DELETE request to your API endpoint
      const { data } = await api.delete(`/role-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const categoryDelete = createAsyncThunk(
  "category/categoryDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("IDDDDDD ---------------------- >")
    console.log(id)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make DELETE request to your API endpoint
      const { data } = await api.delete(`/category-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const locationDelete = createAsyncThunk(
  "category/locationDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("IDDDDDD ---------------------- >")
    console.log(id)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make DELETE request to your API endpoint
      const { data } = await api.delete(`/location-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const additionalFeaturesAdd = createAsyncThunk(
  "category/additionalFeaturesAdd",
  
  async ({ name, image,description }, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    console.log(name);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      const { data } = await api.post("/additional-features-add", formData,config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const additionalFeatureDelete = createAsyncThunk(
  "category/featureDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("IDDDDDD ---------------------- >")
    console.log(id)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make DELETE request to your API endpoint
      const { data } = await api.delete(`/feature-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// export const get_category = createAsyncThunk(
//   "category/get_category",
//   async (
//     { parPage, page, searchValue },
//     { rejectWithValue, fulfillWithValue, getState }
//   ) => {
//     const {token} = getState().auth
//     const config = {
//       headers : {
//         Authorization: `Bearer ${token}`
//       }
//     }

//     try {
//       const { data } = await api.get(
//         `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
//         config
//       );
//       console.log("CATEGORIEs")
//       console.log(data)
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );


export const get_category_id = createAsyncThunk(
  "category/get_commodity_id",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
    // const { token } = getState().auth;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };


    console.log()
    try {
      const {data} = await api.get(`/category-get-id/${categoryId}`);
      console.log(data)
      console.log("-------------------------by ID")
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const get_locations_id = createAsyncThunk(
  "category/get_locations_id",
  async (locationId, { rejectWithValue, fulfillWithValue}) => {
    // const { token } = getState().auth;
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };


    console.log()
    try {
      const {data} = await api.get(`/locations-get-id/${locationId}`);
      console.log(data)
      console.log("-------------------------by ID")
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const get_locations = createAsyncThunk(
  "category/get_locations",
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


    console.log("Asdasdasd")
    try {
      const { data } = await api.get(
        `/location-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
      console.log("CATEGORIEs")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_locations_list = createAsyncThunk(
  "category/get_locations_list",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    console.log("Fetching locations...");

    try {
      const { data } = await api.get("/locations-get"); 
      console.log("LOCATIONS:", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log("Error fetching locations:", error);
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);


export const get_additionalFeatures = createAsyncThunk(
  "category/additional_feature_get",
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



console.log("")
    try {
      const { data } = await api.get(
        `/additional-features-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,config);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const teamReducer = createSlice({
  name: "team",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    loader_delete: false,
    loader_role: false,
    // categories: [],
    // totalCategory: 0,
    additionalFeatures: [],
    totalAdditionalFeatures: 0,
    locations :{},
    location :{},
    totalLocation :[],
    category : {},
    loader_team: "",



    totalRoles: 0,
    roles : [],
    role : {},
    categories: [],
    totalCategories: 0,
    editError : false,
    editErrorMessage: "",
    totalSupervisors: 0,
    supervisors: {},
    totalManagers: 0,
    managers: {},
    totalRandFs: 0,
    RandFs: {},
    coo: '',
    ceo: '',
    team: {},
    teams : {}
    
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    editErrorClear: (state) => {
      state.editErrorMessage = "";
      state.editError = false;

    },
  },
  extraReducers: (builder) => {


    builder.addCase(categoryEdit.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(categoryEdit.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(categoryEdit.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.categories = [...state.categories, payload.payload.category];
    });



    builder.addCase(locationEdit.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(locationEdit.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(locationEdit.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.locations = [...state.locations, payload.payload.location];
    });






    builder.addCase(locationsAdd.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(locationsAdd.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(locationsAdd.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.locations = [...state.categories, payload.payload.location];
    });


    builder.addCase(get_locations_id.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_locations_id.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(get_locations_id.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.location =  payload.payload.location;
    });


    builder.addCase(categoryDelete.pending, (state) => {
      state.loader_delete = true;
    });
    builder.addCase(categoryDelete.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });

    builder.addCase(categoryDelete.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;
    
      // Only add category if it's not null or undefined
      if (payload.payload.category) {
        state.categories = [...state.categories, payload.payload.category];
      }
    });


    builder.addCase(locationDelete.pending, (state) => {
      state.loader_delete = true;
    });
    builder.addCase(locationDelete.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });

    builder.addCase(locationDelete.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;
    
      // Only add category if it's not null or undefined
      if (payload.payload.category) {
        state.locations = [...state.locations, payload.payload.locations];
      }
    });

    builder.addCase(additionalFeatureDelete.pending, (state) => {
      state.loader_delete = true;
    });
    builder.addCase(additionalFeatureDelete.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });

    builder.addCase(additionalFeatureDelete.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;
    
      // Only add category if it's not null or undefined
      if (payload.payload.category) {
        state.additionalFeatures = [...state.additionalFeatures, payload.payload.additionalFeatures];
      }
    });
    

    // builder.addCase(get_category.fulfilled, (state, payload) => {
    //   // state.category = payload.payload.message;
    //   state.totalCategory = payload.payload.totalCategory;
    //   state.categories = payload.payload.categories;
    // });
    builder.addCase(get_locations.fulfilled, (state, payload) => {
      // state.category = payload.payload.message;
      state.totalLocation = payload.payload.totalLocation;
      state.locations = payload.payload.locations;
    });
    builder.addCase(get_locations_list.pending, (state) => {
      state.loader = true
    });
    builder.addCase(get_locations_list.rejected, (state, payload) => {
      state.loader = false
      state.errorMessage = payload.payload.error

    });
    builder.addCase(get_locations_list.fulfilled, (state, payload) => {
      // state.category = payload.payload.message;
      state.loader = false
      state.totalLocation = payload.payload.totalLocation;
      state.locations = payload.payload.locations;
    });


    builder.addCase(additionalFeaturesAdd.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(additionalFeaturesAdd.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(additionalFeaturesAdd.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.additionalFeatures = [...state.additionalFeatures, payload.payload.additionalFeature];
    });


    builder.addCase(get_additionalFeatures.fulfilled, (state, payload) => {
      // state.category = payload.payload.message;
      state.totalAdditionalFeatures = payload.payload.totalAdditionalFeatures;
      state.additionalFeatures = payload.payload.additionalFeatures;
    });




       builder.addCase(get_category_id.pending, (state) => {
          state.loader_delete = true;
        });
        builder.addCase(get_category_id.rejected, (state, payload) => {
          state.loader_delete = false;
          state.errorMessage = payload.payload.error;
        });
    
        builder.addCase(get_category_id.fulfilled, (state, payload) => {
          state.loader_delete = false;
          state.successMessage = payload.payload.message;
          state.category= payload.payload.category
        });


           builder.addCase(category_image_update.pending, (state) => {
              state.loader = true;
            });
            builder.addCase(category_image_update.rejected, (state, payload) => {
              state.loader = false;
              state.errorMessage = payload.payload.error;
            });
            builder.addCase(category_image_update.fulfilled, (state, payload) => {
              state.loader = false;
              state.successMessage = payload.payload.message;
              state.category = [...state.categories, payload.payload.category];
            });
    
           builder.addCase(location_image_update.pending, (state) => {
              state.loader = true;
            });
            builder.addCase(location_image_update.rejected, (state, payload) => {
              state.loader = false;
              state.errorMessage = payload.payload.error;
            });
            builder.addCase(location_image_update.fulfilled, (state, payload) => {
              state.loader = false;
              state.successMessage = payload.payload.message;
              state.location = [...state.locations, payload.payload.location];
            });
    

            // SPLACE BS

            builder.addCase(roles_get.fulfilled, (state, payload) => {
                state.loader = false;
                // state.category = payload.payload.message;
                state.totalRoles = payload.payload.totalRoles;
                state.totalPages = payload.payload.totalPages;
                state.roles = payload.payload.roles;
              });


              builder.addCase(roleAdd.pending, (state) => {
                state.loader = true;
              });
              builder.addCase(roleAdd.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = payload.payload.error;
              });
              builder.addCase(roleAdd.fulfilled, (state, payload) => {
                state.loader = false;
                state.successMessage = payload.payload.message;
                state.roles = [...state.roles, payload.payload.role];
              });


              // CATEGORIES 
              builder.addCase(categories_get.fulfilled, (state, payload) => {
                state.loader = false;
                // state.category = payload.payload.message;
                state.totalCategories = payload.payload.totalCategories;
                state.totalPages = payload.payload.totalPages;
                state.categories = payload.payload.categories;
              });

              builder.addCase(categoryAdd.pending, (state) => {
                state.loader = true;
              });
              builder.addCase(categoryAdd.rejected, (state, payload) => {
                state.loader = false;
                state.errorMessage = payload.payload.error;
              });
              builder.addCase(categoryAdd.fulfilled, (state, payload) => {
                state.loader = false;
                state.successMessage = payload.payload.message;
                state.categories = [...state.categories, payload.payload.category];
              });

              builder.addCase(roleDelete.pending, (state) => {
                state.loader_delete = true;
              });
              builder.addCase(roleDelete.rejected, (state, payload) => {
                state.loader_delete = false;
                state.errorMessage = payload.payload.error;
              });
          
              builder.addCase(roleDelete.fulfilled, (state, payload) => {
                state.loader_delete = false;
                state.successMessage = payload.payload.message;
              
                // Only add category if it's not null or undefined
                if (payload.payload.roles) {
                  state.roles = [...state.roles, payload.payload.roles];
                }
              });



              builder.addCase(get_role_by_id.pending, (state) => {
                state.loader_role = true;
              });
              builder.addCase(get_role_by_id.rejected, (state, payload) => {
                state.loader_role = false;
                state.errorMessage = payload.payload.error;
              });
          
              builder.addCase(get_role_by_id.fulfilled, (state, payload) => {
                state.loader_role = false;
                state.successMessage = payload.payload.message;
                state.role= payload.payload.role
              });

              builder.addCase(roleEdit.pending, (state) => {
                state.loader123 = true;
              });
              builder.addCase(roleEdit.rejected, (state, payload) => {
                state.loader123 = false;
                state.errorMessage = payload.payload.error;
                state.editErrorMessage = payload.payload.error;
                state.editError = true
              });
              builder.addCase(roleEdit.fulfilled, (state, payload) => {
                state.loader123 = false;
                state.editError = false
                state.successMessage = payload.payload.message;
              
                // Replace the role with the same id
                state.roles = state.roles.map(role =>
                  role._id === payload.payload.role._id ? payload.payload.role : role
                );
              });
              
          


              
            // SPLACE BS
             builder.addCase(get_supervisors.fulfilled, (state, payload) => {
                  state.loader = false;
                  state.supervisors = payload.payload.users
                  state.totalSupervisors = payload.payload.totalUsers
                  state.totalPages  = payload.payload.totalPages
            
                });
             builder.addCase(get_managers.fulfilled, (state, payload) => {
                  state.loader = false;
                  state.managers = payload.payload.users
                  state.totalManagers = payload.payload.totalUsers
                  state.totalPages  = payload.payload.totalPages
            
                });
             builder.addCase(get_rankandfile_employees.fulfilled, (state, payload) => {
                  state.loader = false;
                  state.RandFs = payload.payload.users
                  state.totalRandFs = payload.payload.totalUsers
                  state.totalPages  = payload.payload.totalPages
            
                });
             builder.addCase(get_active_ceo.fulfilled, (state, payload) => {
                  state.loader = false;
                  state.ceo = payload.payload.user._id
                });
             builder.addCase(get_active_coo.fulfilled, (state, payload) => {
                  state.loader = false;
                  state.coo = payload.payload.user._id
                });
             builder.addCase(teamAdd.pending, (state) => {
                  state.loader_team = true;
                });
             builder.addCase(teamAdd.rejected, (state, payload) => {
                  state.loader_team = false;
                  state.editErrorMessage = payload.payload.error;
                });
             builder.addCase(teamAdd.fulfilled, (state, payload) => {
                  state.loader_team = false;
                  state.successMessage = payload.payload.message;
                  state.team = payload.payload.team
                });

                builder.addCase(teams_get.fulfilled, (state, payload) => {
                  state.loader = false;
                  // state.category = payload.payload.message;
                  state.totalTeams = payload.payload.totalTeams;
                  state.totalPages = payload.payload.totalPages;
                  state.teams = payload.payload.teams;
                });
            // SPLACE BS
    
  },
});

export const { messageClear,editErrorClear } = teamReducer.actions;
export default teamReducer.reducer;
