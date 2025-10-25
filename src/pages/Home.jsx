import { Link } from 'react-router-dom'

function Home(){

    return (
        <>
            {/*Main Container  */}
            <div className='w-full flex flex-col gap-20 '>

                {/*intro */}
                <div className='flex flex-row items-center gap-10 px-55 pt-90 bg-cover bg-center h-[800px] ' style={{ backgroundImage: "url('photos/jacobs photo 2.jpeg')" }} >
                    {/*blurb*/}
                    <div className='flex flex-col gap-6 w-[50%] text-white'>
                        <h1 className='text-5xl font-semibold '>Discover Your <br/> Next Route</h1>
                        <p className='w-[100%]'>Find the perfect path for your next run, from scenic trails to urban loops; select various factors that are must haves on your runs; and document your adventures.</p>
                        {/*buttons*/}
                        <button className='flex flex-col w-[130px] h-[50px] bg-gray-200 rounded-xl items-center justify-center hover:scale-102 shadow-2xl'>
                            <Link className="inline-flex text-accent hover:underline font-medium transition-colors text-black" to="/map">Sign Up →</Link> {/* change where this goes */}
                        </button>
                    </div>

                </div>


            </div>

            {/* features */}
            <div className='w-full flex flex-col gap-10 items-center' style={{ backgroundColor: 'rgba(10, 10, 10, 1)' }}>


                <div className=' rounded-3xl grid grid-cols-2 m-20' style={{ backgroundColor: 'rgba(32, 32, 32, 1)' }}>
                    <h1 className='text-4xl font-semibold ml-10 mt-10 text-white'>Features</h1>
                    <div className='flex items-center justify-center'>
                        <img className='object-cover w-9/10 h-auto  my-10 rounded-2xl' src="/photos/placeholder.jpeg" ></img>

                    </div>
                </div>

            </div>

            {/*sign up*/}
            <div className='w-full flex flex-col items-center'>
                <h1>Sing up</h1>
            </div>

        </>
    )
}

export default Home;