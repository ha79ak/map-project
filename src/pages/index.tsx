import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import React, { useState, useMemo } from 'react';
import { useLoadScript, GoogleMap, MarkerF, CircleF } from '@react-google-maps/api';
import type { NextPage } from 'next';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import GoogleMapComponent from '@/components/GoogleMap';
// import GoogleMapComponent from '../components/GoogleMap';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Map Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/downward-arrow16.png" />
      </Head>
        <GoogleMapComponent />
    </>
  )
}
