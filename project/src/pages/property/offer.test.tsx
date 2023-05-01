import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import PropertyScreen from './property';
import { AppRoute } from '../../const';

describe('Component: Offer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Room);
    render(
      <PropertyScreen/>
    );

    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/adults/i)).toBeInTheDocument();
  });
});
