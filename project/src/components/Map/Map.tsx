import 'leaflet/dist/leaflet.css';
import classnames from 'classnames';
import { Icon, Marker } from 'leaflet';
import { Offers, City } from '../../types/offers';
import useMap from '../../hooks/use-map';
import { useEffect, useRef } from 'react';
import { DEFAULT_COORDINATE, ICON_ANCHOR, ICON_SIZE, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './constants';
import { useMapMarkers } from '../../hooks/use-map/use-map';

type MapProps = {
  className: string;
  city: City;
  offers: Offers[];
  selectedOfferId?: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
});

const Map = ({ className, city, offers, selectedOfferId }: MapProps) => {
  const mapRef = useRef(null);

  const { map, mapMarkers } = useMap(mapRef, city);
  const { addMarker, clearMarkers } = useMapMarkers({ map, mapMarkers });
  const cityLocation = offers[0]?.city?.location ?? DEFAULT_COORDINATE;

  useEffect(() => {
    if (map) {
      const { latitude, longitude, zoom } = cityLocation;
      map.flyTo([latitude, longitude], zoom);
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map && mapMarkers) {
      clearMarkers();
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          );
        mapMarkers.addLayer(marker);
        addMarker(marker);
      });
    }
  }, [map, offers, selectedOfferId]);


  return (
    <section
      className={classnames('map', className)}
      style={{ height: '562px' }}
      ref={mapRef}
    >
    </section>
  );
};

export default Map;
