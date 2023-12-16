//import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

import { FaMoneyBill, FaUser } from "react-icons/fa"
import { FaHouse, FaNoteSticky } from "react-icons/fa6"


const HowItWorks = () => {
    return (
        <section id='how-it-works'>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-orange-600">How It Works</h2>
                        <p className="mt-2 text-3xl font-bold tracking-normal text-gray-900 sm:text-4xl">
                            How We Help You Own Or Rent Your Desired Property
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            At Unilodge Realty, we&#39;ve streamlined the process of finding, inspecting, and securing your ideal property.
                            In just a few simple steps, you can be on your way to owning or renting your dream property.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">


                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                        <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                            <FaUser className="text-white w-5 h-5 hover:text-blue-500 " />
                                        </a>
                                    </div>
                                    Create an account (Optional)
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Create a verified account easily via Google on our Sign Up page, or
                                    via Email/Password to access a personalized profile dashboard that lets you manage your bookings, profile information and more.</dd>
                            </div>

                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                        <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                            <FaHouse className="text-white w-5 h-5 hover:text-blue-500 " />
                                        </a>
                                    </div>
                                    Search Your Ideal Property
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Utilize our user-friendly search feature to find properties tailored to your specific needs.
                                    Whether you&#39;re looking for a self-contained apartment, a two-bedroom unit, a five-bedroom duplex, or a specific plot in a particular community,
                                    Unilodge Realty has you covered.</dd>
                            </div>

                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                        <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                            <FaNoteSticky className="text-white w-5 h-5 hover:text-blue-500 " />
                                        </a>
                                    </div>
                                    Book An Inspection
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">Schedule a property inspection seamlessly with Unilodge Realty.
                                    We understand the importance of seeing your potential property in person. Specify your preferred date and time, and our experienced staff will be on-site to accompany you to the location</dd>
                            </div>

                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                        <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                            <FaMoneyBill className="text-white w-5 h-5 hover:text-blue-500 " />
                                        </a>
                                    </div>
                                    Payment &amp; Documentation
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">A representative of ours will contact you to confirm your preferred booking date, as well as communicate to you the inpection fee
                                    Payment for houses, hostels and lands are made via our official channels with include the verified Bank Account with our company name or a payment link generated via your profile page</dd>
                            </div>

                        </dl>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks