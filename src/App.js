import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import {useEffect, useState} from "react";
import Slider from 'react-slider';

const customIcon = new Icon({
    iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
});

const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
    });
};

export default function App() {

    const [geoJsonData, setGeoJsonData] = useState(null);

    const [filteredData, setFilteredData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('1990');

    useEffect(() => {
        fetch('./company_after1990.geojson')
            .then(response => response.json())
            .then(data => {
                setGeoJsonData(data);
                filterDataByYear(data, selectedYear);
            })
            .catch(error => console.error('Error loading GeoJSON data:', error));
    }, [selectedYear]);

    const filterDataByYear = (data, year) => {
        const filtered = data.features.filter(feature => {
            const featureYear = new Date(feature.properties.Time).getFullYear();
            return featureYear === parseInt(year, 10);
        });
        setFilteredData({ ...data, features: filtered });
    };

    if (!geoJsonData) {
        return <div>Loading...</div>;
    }

    const handleChange = (value) => {
        // Find closest mark
        const closest = marks.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
        setSelectedYear(closest);
    }

    const marks = [1990, 1994, 1999, 2004, 2009, 2014, 2019, 2024]

    return (
        <div className="viewContainer">
            <div className="headerContainer">
                <h1 className="headline">Company Headquarters in the USA</h1>
            </div>
            <div className="slider-container">
                <Slider
                    className="year-slider"
                    marks={marks}
                    markClassName="example-mark"
                    min={1990}
                    max={2024}
                    /*step={4}*/ /*bug length of slider changes because its not always 4 steps*/
                    thumbClassName="year-slider-thumb"
                    trackClassName="year-slider-track"
                    value={selectedYear}
                    orientation="horizontal"
                    onChange={handleChange}
                />
                <div className="slider-value">Selected Year: {selectedYear}</div>
            </div>

            <MapContainer center={[37, -95]} zoom={5}>
                {/* OPEN STREEN MAPS TILES */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                >

                    {filteredData && filteredData.features.map((feature, id) => {
                        const [lng, lat] = feature.geometry.coordinates;
                        const {"Company Name": companyName, Headquarters, Time} = feature.properties;
                        return (
                            <Marker position={[lat, lng]} icon={customIcon} key={id}>
                                <Popup>
                                    <strong>{companyName}</strong>
                                    <br/>
                                    Location: {Headquarters}
                                    <br/>
                                    Time: {Time}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
}
