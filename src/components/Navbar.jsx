import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <nav className = 'flex flex-row gap-6 text-l font-semibold justify-between text-white'>
            <Link to= "/">Home</Link>
            <a href="/map" target="_blank" rel="noopener noreferrer">Map</a>
            <Link to = "/about">About</Link>

        </nav>
    )
}
export default Navbar;