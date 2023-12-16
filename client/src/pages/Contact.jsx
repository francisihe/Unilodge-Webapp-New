import { useEffect } from "react";
import { FaEnvelope, FaWhatsapp, FaPhone, FaBuilding } from "react-icons/fa";


const Contact = () => {

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

    }, []);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">Contact Us</h2>
                    <p className="mt-2 text-3xl font-bold tracking-normal text-gray-900 sm:text-4xl">
                        Our representatives are always available to help you
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Unilodge Realty is your trusted partner in finding the perfect property for you. Whether you&#39;re a youth looking for a cozy apartment or a professional seeking a modern residence,
                        we have a diverse range of properties to suit your needs. Our commitment to excellence and customer satisfaction is second to none, hence we are always available to help you.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                    <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                        <FaPhone className="text-white w-5 h-5 hover:text-blue-500 " />
                                    </a>
                                </div>
                                Phone Call
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">You can call our direct lines on &nbsp;
                                <a href='tel:+2348159457077'><b>+2348159457077</b></a>, &nbsp;<a href='tel:+2348104563892'> <b>+2348104563892</b></a>
                                &nbsp; or <a href='tel:+2348120895789'><b>+2348120895789</b></a>. A representative will help you with inquiries or complaints</dd>
                        </div>

                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                    <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                        <FaWhatsapp className="text-white w-5 h-5 hover:text-blue-500 " />
                                    </a>
                                </div>
                                WhatsApp
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">Chat with us on WhatsApp to make inquiries, confirm bookings,
                                availability of products, delivery or for inquiries about our storage facilities via <a href='https://wa.me/2348159457077'><b>+2348159457077</b></a></dd>
                        </div>

                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                    <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                        <FaEnvelope className="text-white w-5 h-5 hover:text-blue-500 " />
                                    </a>
                                </div>
                                Email
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                You can send us emails using our email support channels available at <a href='mailto:support@unilodge.com.ng'><b>support@unilodge.com.ng</b></a>.
                                Our support team is always available to respond to your emails and inquiries.
                            </dd>
                        </div>

                        <div className="relative pl-16">
                            <dt className="text-base font-semibold leading-7 text-gray-900">
                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                                    <a href="https://www.facebook.com/p/unilodge-realty-100068289562862" target="_blank" rel="noopener noreferrer">
                                        <FaBuilding className="text-white w-5 h-5 hover:text-blue-500 " />
                                    </a>
                                </div>
                                In-Person Office Visit
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-gray-600">
                                You can visit our office at <b>Office 11b, New Shopping Complex, Opposite Hall 2, University of Benin, Ugbowo Campus, Benin City, Nigeria</b>
                                &nbsp; for physical inquiries, bookings, and more.
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Contact