import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ value }) => {
  let fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5;

  if (halfStar) {
    fullStars += 1;
  }

  const emptyStars = 5 - fullStars;

  return (
    <>
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FaStar key={i} className="star-icon" />
        ))}
      {halfStar && <BsStarHalf className="star-icon" />}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FaRegStar key={i} className="star-icon" />
        ))}
    </>
  );
};

export default Rating;
