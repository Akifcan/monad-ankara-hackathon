import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

const customIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

interface Coordinate {
  id: number;
  lat: number;
  long: number;
  lastLocationDescription: string;
}

interface MapProps {
  coords?: Coordinate[];
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 6);
  }, [map, center]);

  return null;
}

export default function Map({ coords = [] }: MapProps){
    const defaultCenter: [number, number] = [39.9334, 32.8597]; // Ankara center
    const mapCenter: [number, number] = coords.length > 0
      ? [coords[coords.length - 1].lat, coords[coords.length - 1].long]
      : defaultCenter;

    return <div className='rounded-lg overflow-hidden shadow-lg'>
        <MapContainer center={mapCenter} style={{width: '100%', height: 400}} zoom={6} scrollWheelZoom={false}>
            <MapUpdater center={mapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            />
            {coords.length > 0 ? (
              <>
                {/* Polyline connecting all coordinates */}
                <Polyline
                  positions={coords.map(coord => [coord.lat, coord.long])}
                  pathOptions={{
                    color: '#836EF9',
                    weight: 4,
                    opacity: 0.8,
                    dashArray: '10, 5'
                  }}
                />

                {/* Markers for each coordinate */}
                {coords.map((coord) => (
                  <Marker
                    key={coord.id}
                    position={[coord.lat, coord.long]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div>
                        <p className="font-semibold">{coord.lastLocationDescription}</p>
                        <p className="text-xs text-neutral-600">
                          ID: {coord.id}<br/>
                          Lat: {coord.lat}, Long: {coord.long}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </>
            ) : (
              <Marker position={defaultCenter} icon={customIcon}>
                <Popup>No data available</Popup>
              </Marker>
            )}
          </MapContainer>
    </div>
}