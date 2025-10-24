import { Link } from 'react-router-dom'

function Home(){
    
    return (
        <>
            {/*Main Container  */}
            <div className='w-full flex flex-col gap-20 '>

                {/*intro */}
                <div className='flex flex-row items-center gap-10 px-55 pt-80 bg-cover bg-center h-[700px] ' style={{ backgroundImage: "url('photos/jacobs photo 2.jpeg')" }} >
                    {/*blurb*/}
                    <div className='flex flex-col gap-6 w-[50%] text-white'>
                        <h1 className='text-5xl font-semibold '>Discover Your <br/> Next Route</h1>
                        <p className='w-[100%]'>Find the perfect path for your next run, from scenic trails to urban loops. Select various factors that are must haves on your runs!</p>
                        {/*buttons*/}
                        <div className='flex flex-row gap-2'>
                        <Link className="inline-flex items-center text-accent hover:underline font-medium transition-colors" to="/map">Explore Routes →</Link>

                         </div>
                    </div>

                </div>

               
            </div>

            {/*sign up*/}
            <div className='w-full flex flex-col'>
                
            </div>

        </>
    )
}

export default Home;