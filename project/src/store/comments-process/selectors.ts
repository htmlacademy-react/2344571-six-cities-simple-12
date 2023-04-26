import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../constants/constants';
import { State } from '../../types/state';

export const selectStatus = (state: State) => state[NameSpace.Comment].sendCommentStatus;

export const selectCommentsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));
