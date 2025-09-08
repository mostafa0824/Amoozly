import { createSlice } from "@reduxjs/toolkit";

const getToken=localStorage.getItem("token");
const getUser=localStorage.getItem('user');
const initialState={
  token:getToken,
  user:getUser,
}

const AuthSlice=createSlice({
  name:"AuthSlice",
  initialState,
  reducers:{
   login:(state,action)=>{
    state.token=action.payload
    state.user = action.payload.user;
    localStorage.setItem("token",state.token)
    localStorage.setItem('user',state.user)
   },
   logout:(state)=>{
    state.token=null
    state.user=null
    localStorage.removeItem("token")
    localStorage.removeItem('user')
   }
  }
})

export const{login,logout}=AuthSlice.actions
export default AuthSlice.reducer