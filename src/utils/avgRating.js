export default function GetAvgRating(ratingArr) {
  // Make sure ratingArr is actually an array
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
    return 0;
  }

  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    return acc + Number(curr?.rating || 0);
  }, 0);

  const averageRating = totalReviewCount / ratingArr.length;

  return Math.round(averageRating * 10) / 10;
}