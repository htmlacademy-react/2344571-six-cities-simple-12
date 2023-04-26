import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../services/enum';
import { setLoadComments, setNextReview } from './comment-process';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Comment } from '../../types/comments';
import { OfferId, Review, ReviewComment } from '../../types/review';

export const fetchCommentsAction = createAsyncThunk<void, OfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(setLoadComments(data));
    } catch (err) {
      toast.error('Unfortunately, we can\'t show comments');
      throw err;
    }
  },
);

export const sendCommentAction = createAsyncThunk<void, ReviewComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendComment',
  async ({ hotelId, rating, comment }, { dispatch, extra: api }) => {
    try {
      const { data: review } = await api.post<Review>(`${APIRoute.Comments}/${hotelId}`, { rating, comment });
      dispatch(setNextReview(review));
      dispatch(fetchCommentsAction({ id: hotelId }));
    } catch (err) {
      toast.error('Attempt to send a message failed');
      throw err;
    }
  });
