import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <nav className = 'flex flex-row gap-6 text-l font-semibold justify-between text-white'>
            <Link to= "/">Home</Link>
            <Link to = "/map">Map</Link>
            <Link to = "/about">About</Link>

        </nav>
    )
}
export default Navbar;