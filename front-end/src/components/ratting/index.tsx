'use client'
import React, { useState } from 'react'
import { Tooltip } from '@nextui-org/react'

const RatingComponent = () => {
  const [rating, setRating] = useState(0)

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  return (
    <div className="flex items-center">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <Tooltip key={value} content={`${value} sao`} placement="top">
            <span
              onClick={() => handleRatingChange(value)}
              className={`cursor-pointer text-xl ${
                value <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              ★
            </span>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default RatingComponent
