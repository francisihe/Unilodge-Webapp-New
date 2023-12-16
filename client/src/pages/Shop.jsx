import { useEffect } from "react"


const Shop = () => {

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

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
                            <p className="text-base font-semibold leading-7 text-orange-600">Unilodge Shop</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to Our Shop</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-700">
                                Our online shop is a great place to buy all your household items. We have a range of products from kitchenware to bedding and more.
                                We sell brand new products as well as used items that are in good condition. You can also find some great deals on our clearance section!
                                <br /><br />
                                We offer free delivery for certain items over a certain price. If you have any questions about our products or services, please contact us today!
                                Payment can be made via debit card, bank transfer or cash at our office.
                            </p>
                        </div>
                    </div>

                    <button>
                        <a href="https://shop.unilodge.com.ng/" target="_blank" rel="noreferrer">
                            <div className="mt-8 inline-flex items-center justify-center px-10 py-6 border border-transparent 
                            text-base font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700">
                                Start Shopping
                            </div>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Shop