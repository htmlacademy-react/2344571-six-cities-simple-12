import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router';
import Login from './login';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AppRoute } from '../../router/RoutePath';
import { AuthorizationStatus, NameSpace } from '../../constants/enum';

const mockStore = configureMockStore();

describe('Component: Login', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }
    };

    render(
      <Provider store={mockStore(initialState)}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });
});
