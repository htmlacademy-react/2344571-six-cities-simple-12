import { AuthorizationStatus } from '../../constants/constants';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { UserProcess } from './types';
import { setUserData, userProcessSlice } from './user-process';

const fakeUserData = makeFakeUserData();

describe('Reducer: userData', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(userProcessSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('Action: checkAuthAction', () => {
    it('should update the status to "Auth" and return "UserData" if checkAuthAction fulfilled', () =>
      expect(
        userProcessSlice.reducer(state, { type: checkAuthAction.fulfilled.type }))
        .toEqual({ authorizationStatus: AuthorizationStatus.Auth, userData: null }));

    expect(userProcessSlice.reducer(state, {
      type: setUserData,
      payload: fakeUserData
    })).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: fakeUserData,
    });

    it('should update the status to "NoAuth" if checkAction rejected', () => {
      expect(
        userProcessSlice.reducer(state, { type: checkAuthAction.rejected.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });

    describe('Action: loginAction', () => {
      it('should update the status to "Auth" and return "UserData" if loginAction.fulfilled', () => {
        expect(
          userProcessSlice.reducer(state, {
            type: loginAction.fulfilled.type,
            payload: fakeUserData,
          })
        ).toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
        });
      });
    });

    it('should update the status to "NoAuth" if loginAction rejected', () => {
      expect(
        userProcessSlice.reducer(state, { type: loginAction.rejected.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });


    describe('Action: logoutAction', () => {
      it('should update the status to "NoAuth" if logoutAction.fulfilled', () => {
        expect(
          userProcessSlice.reducer(state, { type: logoutAction.fulfilled.type })
        ).toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        });
      });
    });
  });
});
