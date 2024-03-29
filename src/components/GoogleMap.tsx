import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import React, { useState, useMemo } from 'react';
import { useLoadScript, GoogleMap, MarkerF, CircleF } from '@react-google-maps/api';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';

const GoogleMapComponent= () => {
  const [choosenAddress, setChoosenAddress] = useState<string>('')

  const [lat, setLat] = useState<number>(39.886027)
  const [lng, setLng] = useState<number>(32.855524)
  const [zoom, setZoom] = useState<number>(15)

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
    <>
      <main 
      className={styles.main}
      >
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <Image 
              src="data:image/png;base64,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"
              alt='dath-vader'
              width={80}
              height={80}
            />
              <p className={styles.headerText}>map project</p>
              <div style={{paddingTop: '20px', height: '50vh'}}>
                <PlacesAutocomplete
                  onAddressSelect={(address) => {
                    setChoosenAddress(address)
                    getGeocode({ address: address }).then((result) => {
                      const { lat, lng } = getLatLng(result[0]);
                      setLat(lat);
                      setLng(lng);
                    });
                  }}
                />
                <div className={styles.choosenAddress}>
                  {choosenAddress}
                </div>
              </div>
            <div>
              <button onClick={() => setZoom(zoom-1)} className={styles.zoombutton}>-</button>
              <button onClick={() => setZoom(zoom+1)}  className={styles.zoombutton}>+</button>
            </div>
        </div>
          <div className={styles.rightColumn}>
            <GoogleMap 
              options={mapOptions}
              zoom={zoom}
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
        </div>


      </main>
    </>
  )
}

export default GoogleMapComponent;