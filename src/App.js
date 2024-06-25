import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import {useEffect, useState} from "react";

/*import geoJsonDataImport from './../public/company_after1990.geojson';*/
import geoJsonDataImport from './company_after1990.geojson';

// create custom icon
const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true)
    });
};

// markers
const markers = [
    {
        geocode: [48.86, 2.3522],
        popUp: "Hello, I am pop up 1"
    },
    {
        geocode: [48.85, 2.3522],
        popUp: "Hello, I am pop up 2"
    },
    {
        geocode: [48.855, 2.34],
        popUp: "Hello, I am pop up 3"
    }
];

export default function App() {

    const [geoJsonData, setGeoJsonData] = useState(null);



    useEffect(() => {
        setGeoJsonData(geoJsonDataImport);
        console.log(geoJsonData);
    }, [geoJsonData]);


    return (
        <MapContainer center={[48.8566, 2.3522]} zoom={13}>
            {/* OPEN STREEN MAPS TILES */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* WATERCOLOR CUSTOM TILES */}
            {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}
            {/* GOOGLE MAPS TILES */}
            {/* <TileLayer
        attribution="Google Maps"
        // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      /> */}

            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
            >
                {/* Mapping through the markers */}
                {markers.map((marker, id) => (
                    <Marker position={marker.geocode} icon={customIcon} key={id}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}

                {/* Hard coded markers */}
                {/* <Marker position={[51.505, -0.09]} icon={customIcon}>
          <Popup>This is popup 1</Popup>
        </Marker>
        <Marker position={[51.504, -0.1]} icon={customIcon}>
          <Popup>This is popup 2</Popup>
        </Marker>
        <Marker position={[51.5, -0.09]} icon={customIcon}>
          <Popup>This is popup 3</Popup>
        </Marker>
       */}
            </MarkerClusterGroup>
        </MapContainer>
    );
}
