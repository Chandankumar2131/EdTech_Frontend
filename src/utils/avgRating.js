export default function GetAvgRating(ratingArr = []) {

  // If no array or empty → return 0
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) {
    return 0
  }

  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    return acc + curr.rating
  }, 0)

  const avg =
    Math.round((totalReviewCount / ratingArr.length) * 10) / 10

  return avg
}
