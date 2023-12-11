import { Link } from 'react-router-dom'
import storageImage from '../../assets/images/unilodge-storage.png'

const StorageSection = () => {
  return (
    <div className="flex flex-col-reverse lg:my-12 items-center md:grid md:grid-cols-2 lg:max-w-screen-xl lg:mx-auto lg:max-h-screen overflow-clip">

            <div className='rounded-lg max-h-screen md:pr-4 lg:pr-10'>
                <img src={storageImage}
                    alt='Unilodge Storage Image'
                    className='rounded-lg w-fit md:pr-4 object-contain aspect-auto' />
            </div>

            <div className='space-y-4 py-10 md:mb-0 md:pr-4 lg:-mt-10 lg:max-w-xl'>
                <div>
                    <h2 className="text-3xl w-[100%] my-3 leading-tight">Are You a Student and Going On Holiday? Store Your Items In Our Storage</h2>
                    <p className="text-md w-[95%]">Our warehouse is available for students to keep their items safely for a duration of time, when they need to go on holiday. It is safe, secure and bug free.</p>
                </div>

                <div>
                    <div className='py-2'>
                        <Link to='/contact'><button className='bg-orange-400 py-2 px-3 rounded-md font-medium mr-4 md:mb-2 shadow-lg hover:scale-110 transition-transform'>Contact Store Manager</button></Link>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default StorageSection