import { Link } from 'react-router-dom'
import onlineShoppingImage from '../../assets/images/online-shopping-image.png'

const ShopSection = () => {
    return (
        <div className="flex flex-col-reverse lg:my-12 items-center md:grid md:grid-cols-2 lg:max-w-screen-xl lg:mx-auto lg:max-h-screen overflow-clip">

            <div className='rounded-lg max-h-screen md:pr-4 lg:pr-10'>
                <img src={onlineShoppingImage}
                    alt='Unilodge Shopping Image'
                    className='rounded-lg w-fit md:pr-4 object-contain aspect-auto' />
            </div>

            <div className='space-y-4 py-10 md:mb-0 md:pr-4 lg:-mt-10 lg:max-w-xl'>
                <div>
                    <h2 className="text-3xl w-[100%] my-3 leading-tight">Buy New or Used Items for Your New Apartment From Our Online Store</h2>
                    <p className="text-md w-[95%]">We have a range of products from mattresses to bedsheets, electronics, kitchen utensils and a range of other items. We deliver to your doorstep.</p>
                </div>

                <div>
                    <div className='py-2'>
                        <Link to='/shop'><button className='bg-orange-400 py-2 px-3 rounded-md font-medium mr-4 md:mb-2 shadow-lg hover:scale-110 transition-transform'>Visit Online Store</button></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShopSection