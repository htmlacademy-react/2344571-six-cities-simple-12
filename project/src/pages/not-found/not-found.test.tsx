import { createMemoryHistory } from 'history';
import NotFound from './not-found';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router';

describe('Component: NotFound', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
