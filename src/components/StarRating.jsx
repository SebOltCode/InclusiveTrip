// Read-only star display (value 1-5)
const StarRating = ({ name, value, className = "ml-auto" }) => (
  <div className={`flex space-x-1 rating ${className}`} role="img" aria-label={`${value} / 5`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <input
        key={star}
        type="radio"
        name={name}
        className="mask mask-star"
        checked={star === value}
        aria-hidden="true"
        tabIndex={-1}
        readOnly
        disabled
      />
    ))}
  </div>
);

export default StarRating;
