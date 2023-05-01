import { createMemoryHistory } from 'history';
import ErrorScreen from './not-found';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';

describe('Component: NotFound', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ErrorScreen />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
