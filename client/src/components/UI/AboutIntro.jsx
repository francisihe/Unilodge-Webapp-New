import unilodgePoster from '../../assets/images/unilodge-poster.jpg'

const AboutIntro = () => {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 pt-24 sm:pt-32 lg:overflow-visible lg:px-0">

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

            {/* Content */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-orange-600">Transforming Dreams into Reality:</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Unilodge Realty</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-700">
                                Welcome to Unilodge Realty, your trusted partner in real estate and property development.
                                Established five years ago in the heart of the nation Benin City, Unilodge Realty has since expanded its footprint to the vibrant cities of Lagos, Abuja and Port Harcourt.
                                Our journey is rooted in turning dreams into reality, driven by hard work and an unwavering commitment to excellence.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src={unilodgePoster}
                        alt="Unilodge Poster"
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-2">Our Vision</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                At Unilodge Realty, we are more than just a real estate company; we are creators of unique, functional, and sustainable living environments.
                                Our passion for quality fuels our relentless pursuit to exceed expectations, providing our clients with homes that go beyond mere structures.
                                We take pride in contributing to communities and enhancing the overall living experience.
                            </p>

                            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-2">Our Ongoing Projects</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                As part of our commitment to growth and innovation, Unilodge Realty is currently spearheading the development of a series of world-class estates in Benin City.
                                These include:
                                <ul className='py-4 space-y-2'>
                                    <li><b>Unilodge Housing Estate:</b> A symbol of sophistication and modern living.</li>
                                    <li><b>Efosa Community:</b> Fostering a sense of community and well-being.</li>
                                    <li><b>Oasis Garden Estate Iyowa:</b> A serene haven surrounded by nature&#39;s beauty.</li>
                                    <li><b>Achievers Estate:</b> Where dreams of homeownership become a reality.</li>
                                </ul>
                            </p>

                            <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-2">Dedication to Customer Satisfaction</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Our success story is written by our dedicated team of professionals, committed to attending to all your real estate needs. 
                                At Unilodge Realty, customer satisfaction is not just a goal; it&#39;s our identity. 
                                Our proven track record reflects our values and commitment to delivering on our promises.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutIntro