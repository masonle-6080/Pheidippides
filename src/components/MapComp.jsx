import {useRef, useEffect, useState} from 'react'
import mapboxgl from 'mapbox-gl'

function MapComp(){

    const mapRef = useRef()
    const mapContainerRef = useRef()

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25sZTYwODAiLCJhIjoiY21oNnUzemc5MG1lODJpcTJueTR3ZDBlZCJ9.-JnrXPaMTibV1gWb50M4AA'
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: [-74.0242, 40.6941],
          zoom: 10.12
        });
    
        return () => {
          mapRef.current.remove()
        }
      }, [])

    return (
        <>
            {/*map*/}
            <div className = 'h-full w-full bg-gray-100 overflow-hidden' ref={mapContainerRef}>
            </div>
        </>
    )   
}

export default MapComp;