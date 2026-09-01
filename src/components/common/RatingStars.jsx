import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({
  Review_Count = 0,
  Star_Size = 20,
  editable = false,
  onRatingChange,
}) {
  const [rating, setRating] = useState(Review_Count || 0)

  useEffect(() => {
    setRating(Review_Count || 0)
  }, [Review_Count])

  const handleClick = (value) => {
    if (!editable) return

    setRating(value)

    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            disabled={!editable}
            className={editable ? "cursor-pointer" : "cursor-default"}
          >
            {rating >= star ? (
              <TiStarFullOutline
                size={Star_Size}
                className="text-yellow-50"
              />
            ) : (
              <TiStarOutline
                size={Star_Size}
                className="text-yellow-50"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default RatingStars