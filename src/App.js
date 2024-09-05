import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, {Icon, point} from "leaflet";
import React, {useEffect, useState} from "react";
import Slider from 'react-slider';
import Select from 'react-select';
import financials from './images/icons/financials.png';
import {iconList, SidebarPopUp} from "./components/SidebarPopUp";
import {InformationButton} from "./components/InformationButton";

const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
    });
};

export default function App() {
    const fortune500Companies = {name: 'Fortune500', path: './fortune500Companies.geojson', yearMin: 1958, yearMax: 2005};
    const sp500Companies = {name: 'SP500', path: './company_after1990_new.geojson', yearMin: 1990, yearMax: 2024};
    const dropdownOptions = [
        { value: fortune500Companies, label: 'Fortune500' },
        { value: sp500Companies, label: 'SP500' },
    ]

    const [geoJsonData, setGeoJsonData] = useState(null);
    const [filteredByYearData, setFilteredByYearData] = useState(null);
    const [selectedYear, setSelectedYear] = useState(1999);
    const [selectedDataset, setSelectedDataset] = useState(fortune500Companies);
    const [smoothBorderTop55, setSmoothBorderTop55] = useState(false);

    useEffect(() => {
        fetch(selectedDataset.path)
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
                filterData(data, selectedYear);
            })
            .catch(error => console.error('Error loading GeoJSON data:', error));
    }, [selectedYear, selectedDataset.path, smoothBorderTop55]);

    const changeSmoothBorder = () => (setSmoothBorderTop55(prevState => !prevState));

    const filterData = (data, year) => {
        let filtered = data.features.filter(feature => {
            return feature.properties.year === year;
        });
        if(!smoothBorderTop55) {
            filtered = filtered.filter(feature => {
                return feature.properties.rank < 51;
            });
        }
        setFilteredByYearData({ ...data, features: filtered });
    };


    if (!geoJsonData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="viewContainer">
                <div className="uiContainerTop">
                    <h1 className="headline">Company Headquarters in the USA</h1>
                </div>
                <InformationButton/>
                <SidebarPopUp
                    changeSmoothBorder={changeSmoothBorder}
                />
                <div className="abc">
                    <Select
                        className={"dropdown"}
                        options={dropdownOptions}
                        defaultValue={dropdownOptions[0]}
                        placeholder="Select a dataset"
                        onChange={(selectedOption) => setSelectedDataset(selectedOption?.value)}
                        menuPlacement="top"
                    />
                    <div className="slider-value">Choose Top50 Company Ranking</div>
                </div>
                <div className="uiContainerBottom">
                    <Slider
                        className="year-slider"
                        markClassName="example-mark"
                        min={selectedDataset.yearMin}
                        max={selectedDataset.yearMax}
                        step={1}
                        thumbClassName="year-slider-thumb"
                        trackClassName="year-slider-track"
                        value={selectedYear}
                        orientation="horizontal"
                        onChange={(value) => setSelectedYear(value)}
                    />
                    <div className="slider-value">Selected Year: {selectedYear}</div>
                </div>
                <MapContainer center={[37, -95]} zoom={5} className="mapContainer" minZoom={3} maxZoom={10}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup
                        chunkedLoading
                        iconCreateFunction={createClusterCustomIcon}
                    >
                        {filteredByYearData.features && filteredByYearData.features.map((feature, id) => {
                            const [lng, lat] = feature.geometry.coordinates;
                            const {wikiDataName, qid, revenues, profits, year, company, rank,"Company Name":companyName, Headquarters} = feature.properties;
                            const industrySector = 'financials' // extract it later from the data above

                            const getMarkerIcon = (industrySector) => {
                                const iconItem = iconList.find(item => item.backend === industrySector);
                                return new Icon({
                                    iconUrl: iconItem ? iconItem.icon : financials,
                                    iconSize: [45, 45],
                                });
                            };
                            return (
                                <Marker position={[lat, lng]} icon={getMarkerIcon(industrySector)} key={id}>
                                    <Popup>
                                        {wikiDataName && <strong>{wikiDataName}</strong>}
                                        {!wikiDataName && <strong>{company}</strong>}
                                        {wikiDataName && <br/>}
                                        {qid && (
                                            <a href={qid} target="_blank" rel="noreferrer">wikidata article</a>
                                        )}
                                        {companyName && <div>Company Name: {companyName}</div>}
                                        {Headquarters && <div>Headquarters: {Headquarters}</div>}
                                        {year && <div>Year: {year}</div>}
                                        {rank && <div>Rank: {rank}</div>}
                                        {revenues && <div>Revenues: {revenues} ($ millions)</div>}
                                        {profits && <div>Profit: {profits} ($ millions)</div>}
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </>
    );
}
