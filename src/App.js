import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L, { Icon, point } from "leaflet";
import React, {useEffect, useState} from "react";
import Slider from 'react-slider';
import Select from 'react-select';

const customIcon = new Icon({
    iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
});


const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
    });
};


export default function App() {


    const fortune500Companies = {name: 'Fortune500', path: './fortune500Companies.geojson', yearMin: 1958, yearMax: 2005};
    const sp500Companies = {name: 'SP500', path: './fortune500Companies.geojson', yearMin: 1980, yearMax: 2024};
    const dropdownOptions = [
        { value: fortune500Companies, label: 'Fortune500' },
        { value: sp500Companies, label: 'SP500' },
    ]

    const [geoJsonData, setGeoJsonData] = useState(null);
    const [filteredByYearData, setFilteredByYearData] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2000);
    const [selectedDataset, setSelectedDataset] = useState(fortune500Companies);

    useEffect(() => {
        fetch(selectedDataset.path)
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
                filterDataByYear(data, selectedYear);
            })
            .catch(error => console.error('Error loading GeoJSON data:', error));
    }, [selectedYear]);

    const filterDataByYear = (data, year) => {
        const filtered = data.features.filter(feature => {
            return feature.properties.year === year;
        });
        setFilteredByYearData({ ...data, features: filtered });
    };

    if (!geoJsonData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="viewContainer">
            <div className="uiContainerTop">
                <h1 className="headline">Company Headquarters in the USA</h1>
            </div>
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
            <MapContainer center={[37, -95]} zoom={5} className="mapContainer">
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
                        const {wikiDataName, qid, revenues, profits, year, company} = feature.properties;
                        return (
                            <Marker position={[lat, lng]} icon={customIcon} key={id}>
                                <Popup>
                                    <strong>{wikiDataName!=="" ? wikiDataName : company}</strong>
                                    <br/>
                                    {qid!=="" ? (
                                        <a href={qid} target="_blank">wikidata article</a>) : (<p> No existing Wikidata Entry </p>
                                    )}
                                    <br/>
                                    Year: {year}
                                    <br/>
                                    Revenues: {revenues} ($ millions)
                                    <br/>
                                    Profit: {profits} ($ millions)
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}
