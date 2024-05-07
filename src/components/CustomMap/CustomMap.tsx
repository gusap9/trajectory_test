import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Loader } from '../Loader/Loader';
import { ICar } from 'src/ts/interfaces/item-interfaces';
import './styles.css';

interface Props {
  items: ICar[];
}

export const CustomMap = ({ items }: Props) => {
  const API_KEY = process.env.REACT_APP_MAPS_API_KEY;
  return (
    <>
      {API_KEY ? (
        <APIProvider apiKey={API_KEY}>
          <Map
            style={{ width: '100vw', height: '100vh', zIndex: '0', overflowY:'hidden'}}
            defaultCenter={{ lat: 58, lng: 33 }}
            defaultZoom={7}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            {items.map((el) => {
              return (
                <Marker
                  key={el.id}
                  position={{ lat: el.latitude, lng: el.longitude }}
                />
              );
            })}
          </Map>
        </APIProvider>
      ) : (
        <Loader />
      )}
    </>
  );
};
