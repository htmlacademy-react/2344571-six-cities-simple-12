import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../constants/enum';

export const selectStatus = (state: State) => state[NameSpace.Comment].sendCommentStatus;

export const selectCommentsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export const getReviewsLoading = (state: State): boolean => state[NameSpace.Comment].reviewsLoading;
