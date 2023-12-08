import { useNavigate } from "react-router-dom";
import unilodgeLogo from "../assets/unilodge-logo-2.png"

const Page404 = () => {
  const navigate = useNavigate();

  window.scroll({
    top: 0,
    behavior: 'smooth'
  });

  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="items-center text-center">


        <img src={unilodgeLogo} alt="UnilodgeNG-logo" className="mx-auto h-20 w-20" />

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn&#39;t find the page you&#39;re looking for.</p>
        <p className="text-base leading-7 text-gray-600">You can <a href='/contact'>contact support</a> to help you out</p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </button>

          <a
            href="/"
            className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go home
          </a>


        </div>
      </div>
    </div>
  )
}

export default Page404