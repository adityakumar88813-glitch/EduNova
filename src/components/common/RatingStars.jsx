import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({
  Review_Count = 0,
  Star_Size = 20,
  editable = false,
  onRatingChange,
}) {
  const [rating, setRating] = useState(Number(Review_Count) || 0)

  useEffect(() => {
    setRating(Number(Review_Count) || 0)
  }, [Review_Count])

  const handleClick = (value) => {
    if (!editable) return

    setRating(value)

    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div
      className="
        flex
        h-[20px]
        shrink-0
        items-center
        gap-0
        overflow-hidden
        leading-none
      "
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const StarIcon =
          rating >= star
            ? TiStarFullOutline
            : TiStarOutline

        if (editable) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              className="
                m-0
                flex
                h-[20px]
                w-[20px]
                shrink-0
                items-center
                justify-center
                border-0
                bg-transparent
                p-0
                leading-none
                cursor-pointer
              "
            >
              <StarIcon
                size={Star_Size}
                className="text-yellow-50"
              />
            </button>
          )
        }

        return (
          <span
            key={star}
            className="
              m-0
              flex
              h-[20px]
              w-[20px]
              shrink-0
              items-center
              justify-center
              leading-none
            "
          >
            <StarIcon
              size={Star_Size}
              className="text-yellow-50"
            />
          </span>
        )
      })}
    </div>
  )
}

export default RatingStars