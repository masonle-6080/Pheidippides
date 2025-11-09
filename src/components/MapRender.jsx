import { useRef, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import ShowMenu from './ShowMenu'
import ShowMarkerMenu from './ShowMarkerMenu'

import {optimizedRoute} from '../services/mapboxService'


function MapRender() {
    const mapRef = useRef() // empty reference object (where the HTML element is stored)
    const mapContainer = useRef()
    const [ menuLoc, setMenuLoc] = useState({lng:null, lat:null, x:null, y:null});
    const [ coords, setCoords ] = useState([]);
    const [ markers, setMarkers ] = useState([]);
    const [ markerUi, setMarkerUi ] = useState({lng:null, lat:null, x:null, y:null});
    const markerClickedRef = useRef(false); // need to use a ref because UseState happens asychronasouly so the after the marker click the map click happens before use state can update

    const AppendCoords = (lng, lat) => {
        setCoords((prev) => [...prev, [lng,lat]]);
    }

    const DeleteCoords = () => {
        setCoords([]);
    }

    const DeleteMarker = (lng, lat) => {
        console.log('deletemarker activated');
        const indexToDelete = markers.findIndex((marker) => {
            const markerCoords = marker.getLngLat();
            return markerCoords.lng === lng && markerCoords.lat === lat;
        });
    
        if(indexToDelete !== -1) {
            // Remove from DOM first
            markers[indexToDelete].remove();
            
            // Update state - this triggers the useEffect
            setMarkers((prev) => prev.filter((_, idx) => idx !== indexToDelete));
            setCoords((prev) => prev.filter((_, idx) => idx !== indexToDelete));
            setMarkerUi({lng:null, lat:null, x:null, y:null});
        }
    }

    useEffect(() => {
        console.log('coord update: ', coords);

        
        //create marker for the new coords
        if(mapRef.current && coords.length !== 0) {
            const marker = new mapboxgl.Marker({ color: 'black'})
                .setLngLat(coords[coords.length-1])
                .addTo(mapRef.current);
            console.log('adding marker');

            const markerElement = marker.getElement()
            const markerCoords = marker.getLngLat();
            const pixels = mapRef.current.project(markerCoords);
            const { lng, lat } = markerCoords;

            console.log('coords:', coords[coords.length-1]);
            console.log('markerCoords:', markerCoords)
            
            markerElement.addEventListener('click', (e) => {
                console.log('marker clicked');
                setMarkerUi({lng: lng, lat: lat, x:pixels.x, y:pixels.y})
                markerClickedRef.current = true;

            })

            setMarkers((prev) => [...prev, marker]);
        }

        if(coords.length === 0){
            if(mapRef.current && mapRef.current.getSource('route')){
                mapRef.current.removeLayer('route');
                mapRef.current.removeSource('route');
            }
        }

        if(coords.length < 2){
            if(mapRef.current && mapRef.current.getSource('route')){
                mapRef.current.removeLayer('route');
                mapRef.current.removeSource('route');
            }

            return;
        }
        const data_json =  optimizedRoute(coords)
            .then((data_json) => {
                const data = data_json.routes[0];
                const route = data.geometry;
        
                const geojson = {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': route
                };
        
        
                if(mapRef.current.getSource('route')){
                    mapRef.current.getSource('route').setData(geojson);
                } else {
                    mapRef.current.addLayer({
                        id: 'route',
                        type:'line',
                        source: { 
                            type: 'geojson',
                            data: geojson
                        },
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': 5,
                            'line-opacity': 0.75
                        }
                    })
                }
            })
            .catch(error => console.log('error:', error))


            
    

    }, [coords])


    const CloseMenu = () => {
        setMenuLoc({x:null, y:null});
    }

    const CloseMarkerMenu = () => {
        setMarkerUi({x:null, y:null});
    }

    const CreateMap = (longitude, latitude) => {
        if(mapRef.current){
            return;
        }

        //access the api
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
        //creates the map
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [longitude, latitude],
            zoom: 15.6,

        });

        //current location marker
        mapRef.current.on('load', () => {
            new mapboxgl.Marker({ color: '#FF0000'})
                .setLngLat([longitude, latitude])
                .addTo(mapRef.current);
        });


        //on right click store data and update options
        mapRef.current.on('contextmenu', (e) => {
            e.preventDefault();

            const { lng, lat } = e.lngLat;
            console.log('rightclick');

            setMenuLoc({lng:lng, lat:lat, x:e.point.x, y:e.point.y});
        });

        mapRef.current.on('click', ()=>{    
            setMenuLoc({lng:null, lat:null, x:null, y:null});
            if(!markerClickedRef.current){
                setMarkerUi({x:null, y:null});
            }
            markerClickedRef.current = false;
        })

    }

    
    //runs after componenet is loaded
    useEffect(() => {

        //get user loc (built in browserAPI)
        navigator.geolocation.getCurrentPosition((position) =>
        {
            const {latitude, longitude} = position.coords;
            CreateMap(longitude, latitude);
        },
        (error) => {
            console.log('Location error: ', error);
            CreateMap(-118.2437, 34.0522);
        }
        )

           
        

        return () => {
            if(mapRef.current) {
                mapRef.current.remove()
            }
        }
    },[]);

    
    

    return (
        <>
            <div className='h-full w-full bg-gray-200' ref={mapContainer}></div>
            <ShowMenu lng={menuLoc.lng} lat={menuLoc.lat} x={menuLoc.x} y={menuLoc.y} CloseMenu={CloseMenu} AppendCoords={AppendCoords} DeleteCoords={DeleteCoords}></ShowMenu>
            <ShowMarkerMenu lng={markerUi.lng} lat={markerUi.lat} x={markerUi.x} y={markerUi.y} CloseMarkerMenu={CloseMarkerMenu} DeleteMarker={DeleteMarker}></ShowMarkerMenu>

        </>
    )
}

export default MapRender;