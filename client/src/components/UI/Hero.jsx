import { Link } from 'react-router-dom'
import heroImage from '../../assets/images/unilodge-hero-image.png'
import { Link as ScrollLink } from 'react-scroll'
import { FaUserCircle } from "react-icons/fa";


const Hero = () => {
    return (
        <div className="flex flex-col md:my-3 items-center md:grid md:grid-cols-2 lg:max-w-screen-xl lg:mx-auto lg:max-h-screen overflow-clip">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div>

            {/* Main Content */}
            <div className='space-y-10 mb-10 md:mb-0 md:pr-4 lg:-mt-10 lg:max-w-xl'>
                <div>
                    <h1 className="text-5xl w-[90%] my-5 leading-tight">Find Houses, Hostels and Lands for Rent or Sale Easily </h1>
                    <p className="text-md w-[90%]">Unilodge Realty and Property Developers Limited helps you find your preferred houses, hostels and landed property with ease, on one platform!</p>
                </div>

                <div className='flex w-full justify-between pr-6 lg:max-w-lg'>
                    <div className='flex flex-col-reverse border-l-2 border-orange-400 pl-2'>
                        <span className='text-3xl font-extrabold text-orange-500'>2000 <sup>+</sup></span>
                        <span className='text-md font-medium'>Clients Served</span></div>
                    <div className='flex flex-col-reverse border-l-2 border-orange-400 pl-2'>
                        <span className='text-3xl font-extrabold text-orange-500'>700 <sup>+</sup></span>
                        <span className='text-md font-medium'>Properties</span></div>
                    <div className='flex flex-col-reverse border-l-2 border-orange-400 pl-2'>
                        <span className='text-3xl font-extrabold text-orange-500'>4</span>
                        <span className='text-md font-medium'>Locations</span></div>
                </div>

                <div>
                    Get started by creating an account or exploring our properties
                    <div className='py-4 flex flex-wrap -mr-6 items-center gap-2'>
                        <Link to='/signup'><FaUserCircle className='text-gray-400 w-6 h-6' /></Link>
                        <ScrollLink to='featured-properties' smooth={true}>
                            <button className='bg-orange-300 py-2 px-3 rounded-md font-medium mr-0 shadow-md hover:scale-110 transition-transform'>Featured Properties</button>
                        </ScrollLink>
                        <Link to='/properties'><button className='bg-orange-400 py-2 px-3 rounded-md font-medium mr-4 shadow-lg hover:scale-110 transition-transform'>All Properties</button></Link>
                    </div>
                </div>
            </div>

            <div className='max-h-screen'>
                <img src={heroImage}
                    alt='Unilodge Hero Image'
                    className='rounded-lg w-fit object-contain' />
            </div>
        </div>
    )
}

export default Hero