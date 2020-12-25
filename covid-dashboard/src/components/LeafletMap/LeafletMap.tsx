import { GeoJsonObject, Feature, Geometry } from 'geojson';
import L, { LatLngTuple } from 'leaflet';
import React from 'react';
import {
  MapContainer, TileLayer, GeoJSON, LayersControl,
} from 'react-leaflet';

import geojson from '@/assets/data/geojson.json';
import styles from '@/components/LeafletMap/LeafletMap.scss';
import { MapColor, Parameter, Screen } from '@/constants/constants';
import { CountryDataInterface, ShownCountryInterface } from '@/types/entities';
import getShownCountriesData from '@/utils/countries-data';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom = 2;
const mapStyle = {
  weight: 1,
  color: 'gray',
  fillOpacity: 1,
};

interface LeafletMapProps {
  screen: Screen;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  onCountryClick(country: string): void;
}

const LeafletMap: React.FC<LeafletMapProps> = (props: LeafletMapProps) => {
  const { screen, parameter, countriesData } = props;
  const shownCountriesData = getShownCountriesData(countriesData, parameter);

  const getMaxCount = (data: Array<ShownCountryInterface>): ShownCountryInterface => data.reduce((previous, current) => (current.count > previous.count ? current : previous));

  const getCountryColor = (data: number): string => {
    const maxCount = getMaxCount(shownCountriesData);
    const currentCountPercent: number = (data * 100) / maxCount.count;

    let color: string;
    if (currentCountPercent > 50) {
      color = MapColor.DARKEST;
    } else if (currentCountPercent > 10) {
      color = MapColor.MUCH_DARKER;
    } else if (currentCountPercent > 1) {
      color = MapColor.DARKER;
    } else if (currentCountPercent > 0.5) {
      color = MapColor.DARK;
    } else if (currentCountPercent > 0.4) {
      color = MapColor.MAIN;
    } else if (currentCountPercent > 0.3) {
      color = MapColor.LIGHT;
    } else if (currentCountPercent > 0.2) {
      color = MapColor.LIGHTER;
    } else if (currentCountPercent > 0.1) {
      color = MapColor.MUCH_LIGHTER;
    } else {
      color = MapColor.LIGHTEST;
    }
    return color;
  };

  const getCountryCount = (data: Array<ShownCountryInterface>, iso3: string): number => {
    const countryData = data.find(({ countryInfo }) => countryInfo.iso3 === iso3);
    return countryData ? countryData.count : 0;
  };

  const getCountryNameByISO = (data: Array<ShownCountryInterface>, iso3: string): string => {
    const countryData = data.find(({ countryInfo }) => countryInfo.iso3 === iso3);
    return countryData ? countryData.country : '';
  };

  const onEachCountry = (
    area: Feature<Geometry, { [name: string]: string }>,
    layer: L.Path
  ): void => {
    const countryID: string = area.properties.ISO_A3;
    const countryName = getCountryNameByISO(shownCountriesData, countryID);
    const count = getCountryCount(shownCountriesData, countryID);

    layer.setStyle({ fillColor: getCountryColor(count) });
    layer.bindTooltip(`${countryName} ${count.toLocaleString() || 'no value'}`, { sticky: true });
    layer.on('click', () => props.onCountryClick(countryName));
  };

  return (
    <MapContainer key={screen} className={styles['leaflet-map']} center={defaultLatLng} zoom={zoom}>
      <LayersControl.BaseLayer name="Black And White">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="'https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png"
          noWrap
        />
      </LayersControl.BaseLayer>
      <GeoJSON
        key={parameter}
        data={geojson as GeoJsonObject}
        style={mapStyle}
        onEachFeature={onEachCountry}
      />
    </MapContainer>
  );
};

export default LeafletMap;
