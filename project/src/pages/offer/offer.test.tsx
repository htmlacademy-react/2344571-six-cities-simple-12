import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import {OfferComponent} from './offer';
import { AppRoute } from '../../router/RoutePath';
import { AuthorizationStatus } from '../../constants/constants';
import { makeFakeOffer } from '../../utils/mocks';

describe('Component: Offer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Offer);
    const offer = makeFakeOffer();
    render(
      <OfferComponent
        room={offer}
        authorizationStatus={AuthorizationStatus.Unknown}
        comments={[]}
        nearOtherOffers={[]}
        offerId={1}
      />
    );

    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/adults/i)).toBeInTheDocument();
  });
});
