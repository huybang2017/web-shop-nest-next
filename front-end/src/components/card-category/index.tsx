'use client'

import { CardCategoryProps } from '@/app/(routes)/(home)/page'
import { CiHeadphones } from 'react-icons/ci'

const CardCategory: React.FC<CardCategoryProps> = ({ category }) => {
  return (
    <div className="cursor-pointer border border-black hover:border-red-700 flex justify-center items-center w-32 h-32 hover:bg-red-700 bg-white text-black hover:text-white">
      <div>
        <div className="flex justify-center items-center text-7xl">
          <CiHeadphones />
        </div>
        <div>
          <p className="font-semibold text-center">{category.category_name}</p>
        </div>
      </div>
    </div>
  )
}

export default CardCategory
