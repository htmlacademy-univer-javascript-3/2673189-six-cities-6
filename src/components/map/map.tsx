import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '@hooks/use-map';
import { City, Offer } from '@types';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '@consts/consts';
import 'leaflet/dist/leaflet.css';

type MapProps = {
    city: City;
    offers: Offer[];
    selectedOffer: Offer | undefined;
    className: string;
  };

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedOffer, className} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        if (offer?.location) {
          const { latitude, longitude } = offer.location;

          const marker = new Marker({
            lat: Number(latitude),
            lng: Number(longitude)
          });

          marker
            .setIcon(
              selectedOffer !== undefined && offer.id === selectedOffer.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <section className={className} style={{height: '500px'}} ref={mapRef}></section>;
}

export default Map;
