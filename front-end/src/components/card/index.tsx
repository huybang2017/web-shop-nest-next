'use client'
import { FaRegHeart, FaRegEye } from 'react-icons/fa'
import RatingComponent from '../ratting'

const ProductCard = () => {
  return (
    <div className="relative">
      <div className="cursor-pointer w-[270px] h-[250px] flex justify-center items-center bg-gray-100 relative group mb-5">
        <img src="/images/bag1.png" alt="product" />
        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-4 py-2 rounded-md bg-black hover:bg-gray-800 font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
      <div>
        <p className="font-bold text-lg">Gucci duffie bag</p>
        <div className="flex items-center gap-3">
          <span className="text-red-800 font-bold">$120</span>
          <span className="text-gray-600 font-bold">$160</span>
        </div>
        <div>
          <RatingComponent />
        </div>
      </div>
      <div>
        <div className="bg-green-400 rounded-md absolute top-1 left-1 px-2 py-1">
          <span className="text-white">New</span>
        </div>
        <button
          type="button"
          className="flex justify-center items-center p-2 rounded-full absolute top-1 right-28 bg-white"
        >
          <FaRegHeart />
        </button>
        <button
          type="button"
          className="flex justify-center items-center p-2 rounded-full absolute top-10 right-28 bg-white"
        >
          <FaRegEye />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
