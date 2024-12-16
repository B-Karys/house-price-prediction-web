import React, { useEffect, useRef, useState } from 'react';

interface YandexMapProps {
  center: [number, number]; // [latitude, longitude]
  zoom: number;
  width?: string | number; // Width of the map container
  height?: string | number; // Height of the map container
  selectedDistrict?: { lat: number; lon: number; label: string } | null;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap: React.FC<YandexMapProps> = ({ center, zoom, width = '100%', height = '400px', selectedDistrict }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const placemarkRef = useRef<any>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [street, setStreet] = useState<string>('');
  const [houseNumber, setHouseNumber] = useState<string>('');
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const loadYandexMaps = async () => {
        if (!window.ymaps) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=en_US`;
            script.type = 'text/javascript';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Yandex Maps API'));
            document.head.appendChild(script);
          });
        }

        window.ymaps.ready(() => {
          if (mapContainerRef.current && !mapRef.current) {
            if (mapContainerRef.current.childNodes.length > 0) {
              mapContainerRef.current.innerHTML = ''; // Clear existing map instance
            }

            mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
              center,
              zoom,
              controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'rulerControl']
            });

            mapRef.current.controls.remove('trafficControl');
            mapRef.current.controls.remove('geolocationControl');

            mapRef.current.events.add('click', (e: any) => {
              const coords = e.get('coords');
              setCoordinates(coords);

              if (placemarkRef.current) {
                mapRef.current.geoObjects.remove(placemarkRef.current);
              }

              placemarkRef.current = new window.ymaps.Placemark(coords, {
                hintContent: 'You clicked here',
              });

              mapRef.current.geoObjects.add(placemarkRef.current);

              fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=bf4bae39-2187-4f8f-8fa1-48f8818f5dd4&geocode=${coords[1]},${coords[0]}&format=json`)
                .then((response) => response.json())
                .then((data) => {
                  const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
                  const addressDetails = geoObject?.metaDataProperty.GeocoderMetaData.Address.Components;

                  const streetComponent = addressDetails?.find((comp: any) => comp.kind === 'street');
                  const houseNumberComponent = addressDetails?.find((comp: any) => comp.kind === 'house');

                  setStreet(streetComponent?.name || 'N/A');
                  setHouseNumber(houseNumberComponent?.name || 'N/A');
                });
            });
          }
        });
    };

    loadYandexMaps();
  }, [center, zoom]);

  useEffect(() => {
    if (selectedDistrict && mapRef.current) {
      mapRef.current.setCenter([selectedDistrict.lat, selectedDistrict.lon], 12, { duration: 300 });
    }
  }, [selectedDistrict]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ width, height }} />
      {coordinates && (
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <strong>Latitude:</strong> {coordinates[0]} <br />
          <strong>Longitude:</strong> {coordinates[1]} <br />
          <strong>Street:</strong> {street} <br />
          <strong>House Number:</strong> {houseNumber}
        </div>
      )}
    </div>
  );
};

export default YandexMap;
