import { Link } from 'react-router-dom';
import unilodgeLogoFooter from '../../assets/unilodge-logo-2.png'


import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-cyan-950 text-white p-8 px-6 md:px-10 py-10 mt-12 md:mt-0 w-full lg:mx-auto lg:w-screen">
            <div className='mx-auto lg:max-w-screen-xl items-center self-center'>
                {/* Logo and Motto */}
                <div className="flex flex-col items-center mb-8">
                    <img src={unilodgeLogoFooter} alt="Unilodge Logo" className="h-64 w-64" />
                    <p className="text-center mt-2">Unilodge Realty and Property Developers</p>
                    <div className="text-center mt-6">
                        <div className='whitespace-pre-wrap'>
                            <p className='whitespace-nowrap'>Office 11b, New Shopping Complex</p>
                            <span className='whitespace-nowrap'>Opposite Hall 2</span>
                        </div>
                        <p>University of Benin</p>
                        <p>Ugbowo Campus, Benin City</p>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mb-8 py-2">
                    <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-gray-300 w-5 h-5 hover:text-blue-500 " />
                    </a>
                    <a href="https://www.instagram.com/unilodge_realty" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-gray-300 w-5 h-5 hover:text-pink-500" />
                    </a>
                    <a href="https://www.twitter.com/unilodge_realty" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-gray-300 w-5 h-5 hover:text-blue-400" />
                    </a>
                    <a href="mailto:info@unilodge.com.ng">
                        <FaEnvelope className="text-gray-300 w-5 h-5 hover:text-gray-500" />
                    </a>
                    <a href={`https://wa.me/2348159457077?text=Hello I'm from your website. I want to make some inquiries.`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="text-gray-300 w-5 h-5 hover:text-green-500" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCyjn2DteAfigLKcvRytFtRw" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="text-gray-300 w-5 h-5 hover:text-red-500" />
                    </a>
                </div>

                {/* Four Columns */}
                {/*  */}
                <div className="flex justify-evenly md:gap-32 lg:gap-8">
                    <div className='text-end md:text-start md:flex md:gap-40 whitespace-nowrap'>
                        <div className='text-sm lg:text-base'>
                            <h4 className="text-lg font-bold mb-4">Starter</h4>
                            <ul className="list-disc">
                                <Link to='/' className='hover:text-orange-600'><p>Home</p></Link>
                                <Link to='/about' className='hover:text-orange-600'><p>About Us</p></Link>
                                <Link to='/about#how-it-works' className='hover:text-orange-600'><p>How It Works</p></Link>
                            </ul>
                        </div>
                        <div className='text-sm lg:text-base mt-8 md:mt-0 w-full'>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="list-disc">
                                <Link to='/signup' className='hover:text-orange-600'><p>Create Account</p></Link>
                                <Link to='/signin' className='hover:text-orange-600'><p>Sign In / Out</p></Link>
                                <Link to='/shop' className='hover:text-orange-600'><p>Shop Online</p></Link>
                            </ul>
                        </div>
                    </div>

                    <div className='md:flex md:gap-40 whitespace-nowrap'>
                        <div className='text-sm lg:text-base'>
                            <h4 className="text-lg font-bold mb-4">Resources</h4>
                            <ul className="list-disc">
                                <Link to='/blog' className='hover:text-orange-600'><p>Our Blog</p></Link>
                                <Link to='/contact' className='hover:text-orange-600'><p>Contact Us</p></Link>
                                <Link to='/' className='hover:text-orange-600'><p>Our Newsletter</p></Link>
                            </ul>
                        </div>
                        <div className='text-sm lg:text-base mt-8 md:mt-0'>
                            <h4 className="text-lg font-bold mb-4">Connect</h4>
                            <ul className="list-disc">
                                <Link to='https://www.instagram.com/unilodge_realty' target="_blank" rel="noopener noreferrer" className='hover:text-orange-600'><p>Instagram</p></Link>
                                <Link to='https://www.facebook.com/p/unilodge-realty-100068289562862' target="_blank" rel="noopener noreferrer" className='hover:text-orange-600'><p>Facebook</p></Link>
                                <Link to='/' target="_blank" rel="noopener noreferrer" className='hover:text-orange-600'><p>Linkedin</p></Link>
                            </ul>
                        </div>
                    </div>
                </div>


                {/* Footer Credits */}
                <div className="mt-8">
                    <div className="flex justify-center flex-col md:flex-row md:justify-between">
                        <p className="text-center md:text-left mb-2 md:mb-0">© Unilodge Realty Inc.</p>
                        <p className="text-center md:text-right">
                            Developed by <span className='hover:text-orange-600'>
                                <a href='https://twitter.com/francisihej' target='blank' rel='noreferrer'>Francis Ihejirika</a>
                            </span>,
                            <span className='hover:text-orange-600'>
                                <a href='https://frandela.com' target='blank' rel='noreferrer'>&nbsp;Frandela LLC</a>
                            </span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
