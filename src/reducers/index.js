import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
    searchInput: "",
    blogData: null,
    selectedBlogId: null
  },
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setSelectedBlogId: (state, action) => {
      state.selectedBlogId = action.payload;
    },
  },
});

export const {
  setSignedIn,
  setUserData,
  setInput,
  setBlogData,
  setSelectedBlogId,
} = userSlice.actions;

export const selectSignedIn = (state) => state.user.isSignedIn;
export const selectUserData = (state) => state.user.userData;
export const selectUserInput = (state) => state.user.searchInput;
export const selectBlogData = (state) => state.user.blogData;

export default userSlice.reducer;

/*
import { Fetch_Blogs_Requests, Fetch_Blogs_Success, Fetch_Blogs_Failure } from './types';
const initiateState = {
    posts:[],
    loading:false,
    error:null,

};
const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'Fetch_Blogs_Requests':
            return { ...state,loading:true};
        case 'Fetch_Blogs_Success':
            return {...state,loading:false,posts:action.payload};
        case 'Fetch_Blogs_Failure':
            return {...state,loading:false,error:action.payload};
        case 'Add_Blog':
            return {...state,posts:[...state.posts,action.payload]};
        case 'Edit_Bost':
            return{
                ...state,
                posts:state.posts.map((post) => post.id === action.payload.id ? action.payload:post
                ),

            };
            case 'Delete_Posts':
                return{
                    ...state,
                    posts:state.posts.filter((post) => post.id !== action.payload),
                };
                default:
                    return state;
                    
                
        
    }
};
export default Reducers;*/