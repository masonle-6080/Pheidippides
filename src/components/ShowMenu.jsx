

function ShowMenu({ lng, lat, x, y, CloseMenu }) {
    if ( lng === null || lat === null) {
        return null;  // Don't render if not visible
    }

    return (
        <div style={{
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
        }} className="bg-white border border-gray-300 rounded shadow-md p-2 z-[1000] min-w-[200px]">
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100" onClick={() => { CloseMenu(); console.log(lng, lat) }}>Option 1</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100" onClick={() => { CloseMenu(); }}>Option 2</button>
            <button className="block w-full text-left px-2 py-1 hover:bg-gray-100" onClick={() => { CloseMenu(); }}>Option 3</button>
        </div>
    )
}

export default ShowMenu