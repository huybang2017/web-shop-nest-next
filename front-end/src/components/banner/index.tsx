'use client'

export default function Banner() {
  return (
    <div className="w-full h-full bg-black text-white p-4 rounded-md">
      <div className="grid grid-cols-2 px-2">
        <div className="flex justify-center">
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
              <button className="w-36 h-12 rounded-full bg-black hover:bg-gray-800 transition duration-200 ease-in-out text-white">
                Shop Now
              </button>
              <button className="border border-white rounded-full w-36 h-12 transition duration-200 ease-in-out hover:bg-white hover:text-black">
                Explore
              </button>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-[300px]">
          <img
            className="w-full h-full object-center"
            src="/images/banner.png"
            alt="banners"
          />
        </div>
      </div>
    </div>
  )
}
