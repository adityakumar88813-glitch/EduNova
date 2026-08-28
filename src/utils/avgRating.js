export default function GetAvgRating(ratingArr) {

  console.log("RATING ARR:", ratingArr);
  console.log("IS ARRAY:", Array.isArray(ratingArr));

  if (!Array.isArray(ratingArr)) {
    console.log("NOT AN ARRAY");
    return 0;
  }

  if (ratingArr.length === 0) {
    return 0;
  }

  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    return acc + Number(curr?.rating || 0);
  }, 0);

  const averageRating = totalReviewCount / ratingArr.length;

  return Math.round(averageRating * 10) / 10;
}