import unilodgeLogoFooter from '../../assets/unilodge-logo-2.png'

const Footer = () => {
    return (
        <footer className="flex mx-auto px-6 md:px-10 py-10 mt-12 md:mt-0 bg-cyan-950 w-full">
            <div className='grid md:flex w-screen gap-10 lg:max-w-7xl lg:mx-auto'>
                <div className="mx-auto md:mx-0 md:w-1/4 text-center space-y-4">
                    <div>
                        <img src={unilodgeLogoFooter}
                            alt='Unilodge Logo'
                            className='w-80' />
                    </div>

                    <p className='text-white'>Unilodge Realty and Property Developers Limited</p>
                </div>

                <div className='grid grid-cols-2 text-center text-white md:grid-cols-4 md:text-left md:mx-auto md:items-center md:space-x-8'>
                    <div className='mb-10 md:ml-8 space-y-1'>
                        <h4 className='pb-2 text-lg'>Starter</h4>
                        <p>Home</p>
                        <p>About Us</p>
                        <p>How It Works</p>
                    </div>

                    <div className='mb-10 space-y-1'>
                        <h4 className='pb-2 text-lg'>Quick Links</h4>
                        <p>Create Account</p>
                        <p>Sign In / Out</p>
                        <p>Shop Online</p>
                    </div>

                    <div className='mb-10 space-y-1'>
                        <h4 className='pb-2 text-lg'>Stay Updated</h4>
                        <p>Our Blog</p>
                        <p>Our Newsletter</p>
                        <p>Contact Us</p>
                    </div>

                    <div className='mb-10 space-y-1'>
                        <h4 className='pb-2 text-lg'>Connect</h4>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>Linkedin</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer