import styles from '@/styles/Home.module.css'
import React, { useMemo } from 'react';

import { useLoadScript, GoogleMap, MarkerF, CircleF } from '@react-google-maps/api';

const GoogleMapComponent = ({lat,lng}) => {
    const libraries = useMemo(() => ['places'], []);
    const mapCenter = useMemo(() => ({lat: lat, lng: lng}), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
    }), []);
  
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any
    });

    if (!isLoaded) {
        return <p>loading..</p>
    }
    return (
        <div className={styles.rightColumn}>
            <GoogleMap 
              options={mapOptions}
              zoom={15}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '800px', height: '600px' }}
              onLoad={() => console.log('Map Component Loaded...')}
            >
              {[500, 900].map((radius, idx) => {
                return (
                  <CircleF
                    key={idx}
                    center={mapCenter}
                    radius={radius}
                    onLoad={() => console.log('Circle Load..')}
                    options={{
                      fillColor: radius > 600 ? '#cce2cb' : '#a9cc51',
                      strokeColor: radius > 600 ? '#cce2cb' : '#a9cc51',
                      strokeOpacity: 0.8,
                    }}
                  />
                )
              })
                }
              <MarkerF
                position={mapCenter}
                onLoad={() => console.log('Marker Loaded')}
                icon="/downward-arrow32.png"
              />
            </GoogleMap>
          </div>
    )    
}

export default GoogleMapComponent;