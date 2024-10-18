'use client'

export default function Banner() {
  return (
    <div className="w-full h-2/4 bg-green-800 text-white p-4">
      <div className="grid grid-cols-2 px-2">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-5">
              Welcome to the Jungle
            </h1>
            <p className="text-lg text-gray-400 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              sollicitudin, urna eget ultricies vehicula, urna ligula ultricies
              purus, sit amet luctus odio justo nec odio. Integer varius, odio
              nec scelerisque lacinia
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button className="w-36 h-12 rounded-full bg-green-500 hover:bg-green-600 transition duration-200 ease-in-out dark:bg-green-600 dark:hover:bg-green-700">
                Shop Now
              </button>
              <button className="border border-white rounded-full w-36 h-12 transition duration-200 ease-in-out hover:bg-white hover:text-black dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                Explore
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-auto h-auto object-center"
            src="/images/banner.png"
            alt="banners"
          />
        </div>
      </div>
    </div>
  )
}
