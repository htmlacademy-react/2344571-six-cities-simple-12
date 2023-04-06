import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker } from 'leaflet';
import { CityType, OffersType } from '../../types/offers';
import { useRef, useEffect } from 'react';
import cn from 'classnames';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

type MapProps = {
	cityInfo: CityType;
	points: OffersType;
	activeOfferID?: number | null;
	screenClass: string;
};

const Map = ({ cityInfo, points, activeOfferID, screenClass }: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityInfo);

  useEffect(() => {
    if (map) {
      points.slice(0, 3).forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            activeOfferID && point.id === activeOfferID
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, activeOfferID]);

  const mapClassName = cn('map', {
    'cities__map': screenClass === 'cities',
    'property__map': screenClass === 'property',
  });

  return (
    <section
      className={mapClassName}
      ref={mapRef}
    />
  );
};

export default Map;
