import { Link } from "react-router-dom"
import hostelImage from '../../assets/images/unilodge-hostel-image.png'

const HomeSection2 = () => {
    return (
        <div className="flex flex-col-reverse mb-10 md:my-5 lg:my-12 items-center md:grid md:grid-cols-2 lg:max-w-screen-xl lg:mx-auto lg:max-h-screen overflow-clip">

            <div className='rounded-lg max-h-screen md:pr-4 lg:pr-10'>
                <img src={hostelImage}
                    alt='Unilodge Hostel Image'
                    className='rounded-lg w-fit md:pr-4 object-contain aspect-auto' />
            </div>

            <div className='space-y-4 py-10 md:mb-0 md:pr-4 lg:-mt-10 lg:max-w-xl'>
                <div>
                    <h2 className="text-3xl w-[85%] my-3 leading-tight">Built for Students, Landlords, Tenants and Developers</h2>
                    <p className="text-md w-[90%]">Whether you are in search of a property to rent, looking to lease your apartment or manage your property? Our services can cater to your needs easily.</p>
                </div>

                <div>
                    <div className='py-2'>
                        <Link to='/about'><button className='bg-orange-400 py-2 px-3 rounded-md font-medium mr-4 md:mb-2 shadow-lg hover:scale-110 transition-transform'>Learn More</button></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeSection2