
function ShowMarkerMenu({lng, lat, x, y, CloseMarkerMenu, DeleteMarker}) {
    if ( x === null || y === null) {
        return null;  // Don't render if not visible
    }

    return (
        <div style={{
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
        }} className="bg-white border border-gray-300 rounded-2xl shadow-md p-2 z-[1000] min-w-[200px]">
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100" onClick={() => { CloseMarkerMenu(); DeleteMarker(lng, lat); }}>Delete</button>
        </div>
    )

}

export default ShowMarkerMenu