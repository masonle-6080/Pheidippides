import Navbar from "./Navbar"


function Header(){
    return(
        <>
        
            {/*main container*/}
            <div className ='h-[100px] flex flex-row justify-between p-10 absolute top-0 left-0 right-0'>

                {/*logo*/}
                <div className="flex items-center gap-3 text-2xl font-semibold text-white">
                    <svg className=''width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className='m-0'>Pheidippides</p>
                    
                </div>
                
                {/*Navbar*/}
                <Navbar></Navbar>

            </div>
        </>
    )
    
}

export default Header;