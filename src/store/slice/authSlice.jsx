import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api/axios';

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password, newsletter }, { rejectWithValue }) => {
    try {
      const requestData = { 
        email,
        password,
        profile: {
          first_name: firstName,
          last_name: lastName
        }
      };
      
      const res = await api({
        method: 'POST',
        url: '/users/registration',
        data: requestData
      });
      
      return res.data;
    } catch (err) {
  
      if (err.response?.data && typeof err.response.data === 'object') {
        const validationErrors = err.response.data;
        let errorMessage = "Validation errors:\n";
        
        Object.keys(validationErrors).forEach(field => {
          if (Array.isArray(validationErrors[field])) {
            errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
          } else {
            errorMessage += `${field}: ${validationErrors[field]}\n`;
          }
        });
        
        return rejectWithValue(errorMessage);
      }
      
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/googleLogin",
  async ({ email, token }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth_google", { email, token });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Google login failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword, repeatNewPassword }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const res = await api.put(
        "/auth/change_password",
        { currentPassword, newPassword, repeatNewPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to change password");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false,
    error: null,
    changePasswordSuccess: false,
    registerSuccess: false,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    clearChangePasswordSuccess(state) {
      state.changePasswordSuccess = false;
    },
    clearRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* --- Register --- */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- Login --- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- Google Login --- */
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* --- Change password --- */
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.changePasswordSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.changePasswordSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to change password";
      });
  },
});


export const { setToken, logout, clearChangePasswordSuccess, clearRegisterSuccess, clearError } = authSlice.actions;

export default authSlice.reducer;
