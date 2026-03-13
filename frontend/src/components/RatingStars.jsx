function RatingStars({ rating = 0, count = 0 }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-1 text-xs text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        const isFull = starValue <= rounded;
        const isHalf = !isFull && starValue - 0.5 === rounded;
        return (
          <span key={starValue}>
            {isFull ? '★' : isHalf ? '☆' : '✩'}
          </span>
        );
      })}
      {count > 0 && <span className="text-gray-600">({count})</span>}
    </div>
  );
}

export default RatingStars;
