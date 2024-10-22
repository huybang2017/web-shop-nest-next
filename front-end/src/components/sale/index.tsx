'use client'

import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import Card from '../card'
import { useRef } from 'react'

export default function Sale() {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - 300, // Cuộn sang trái
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + 300, // Cuộn sang phải
        behavior: 'smooth',
      })
    }
  }
  return (
    <div className="py-4">
      <div className="flex items-center">
        <div className="w-4 h-8 bg-red-600 mr-2 rounded-sm"></div>
        <h1 className="text-xl font-bold text-red-600">Today's</h1>
      </div>
      <div className="flex justify-between items-center my-5">
        <div className="flex justify-betweeen items-center gap-20">
          <span className="font-bold text-2xl inline-block w-full">
            Flash Sales
          </span>
          <div className="flex items-center justify-center w-full gap-6">
            <div>
              <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
                Days
              </p>
              <h3 className="days font-manrope font-semibold text-2xl text-black tracking-[15.36px] max-w-[44px] text-center relative z-20">
                30
              </h3>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
                Hours
              </p>
              <h3 className="days font-manrope font-semibold text-2xl text-black tracking-[15.36px] max-w-[44px] text-center relative z-20">
                30
              </h3>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
                Minutes
              </p>
              <h3 className="days font-manrope font-semibold text-2xl text-black tracking-[15.36px] max-w-[44px] text-center relative z-20">
                30
              </h3>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-900 mt-1 text-center w-full">
                Seconds
              </p>
              <h3 className="days font-manrope font-semibold text-2xl text-black tracking-[15.36px] max-w-[44px] text-center relative z-20">
                30
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={scrollLeft}
            className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={scrollRight}
            className="flex justify-center items-center  w-10 h-10 rounded-full bg-gray-300"
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div
          className="flex gap-10"
          ref={scrollRef}
          style={{ whiteSpace: 'nowrap' }}
        >
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div key={index} style={{ display: 'inline-block' }}>
                <Card />
              </div>
            ))}
        </div>
      </div>{' '}
    </div>
  )
}
