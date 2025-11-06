import { useRef, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import ShowMenu from './ShowMenu'
import {optimizedRoute} from '../services/mapboxService'


function MapRender() {
    const mapRef = useRef() // empty reference object (where the HTML element is stored)
    const mapContainer = useRef()
    const [ menuLoc, setMenuLoc] = useState({lng:null, lat:null, x:null, y:null});
    const [ coords, setCoords ] = useState([])

    const AppendCoords = (lng, lat) => {
        setCoords((prev) => [...prev, [lng,lat]]);
    }

    const DeleteCoords = () => {
        setCoords([]);
    }

    useEffect(() => {
        console.log('coord update: ', coords);

        if(coords.length < 2){
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
            console.log('rightclick')

            setMenuLoc({lng:lng, lat:lat, x:e.point.x, y:e.point.y})
        });

        mapRef.current.on('click', ()=>{    
            setMenuLoc({lng:null, lat:null, x:null, y:null})
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
        </>
    )
}

export default MapRender;