import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentProcess, } from './types';
import { Comment } from '../../types/comments';
import { Review } from '../../types/review';
import { fetchCommentsAction, sendCommentAction } from './api-actionts';
import { NameSpace, Status } from '../../constants/enum';

const initialState: CommentProcess = {
  loadComments: [],
  nextReview: null,
  sendCommentStatus: Status.Idle,
  reviewsLoading: false,
};

export const commentProcessSlice = createSlice({
  name: NameSpace.Comment,
  initialState,
  reducers: {
    setLoadComments: (state, action: PayloadAction<Comment[]>) => {
      state.loadComments = action.payload;
    },
    setNextReview: (state, action: PayloadAction<Review | null>) => {
      state.nextReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendCommentAction.pending, (state) => {
      state.sendCommentStatus = Status.Loading;
    });

    builder.addCase(sendCommentAction.fulfilled, (state, action) => {
      state.sendCommentStatus = Status.Success;
    });

    builder.addCase(sendCommentAction.rejected, (state) => {
      state.sendCommentStatus = Status.Error;
    });
    builder.addCase(fetchCommentsAction.pending, (state) => {
      state.reviewsLoading = true;
    });
    builder.addCase(fetchCommentsAction.fulfilled, (state) => {
      state.reviewsLoading = false;
    });
  }
});

export const { setLoadComments, setNextReview } = commentProcessSlice.actions;
