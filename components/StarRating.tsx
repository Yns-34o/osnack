'use client';

interface StarRatingProps {
  rating: number;
  /** pixel size of each star */
  size?: number;
  className?: string;
}

const STAR_PATH =
  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

/**
 * Renders 5 stars, supporting a half-filled last star (filled with the
 * #half-fill gradient defined in the SVG defs).
 */
export function StarRating({ rating, size = 16, className = '' }: StarRatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isHalf = rating >= i - 0.5 && rating < i;
    const isFull = rating >= i;
    stars.push(
      <svg
        key={i}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ width: size, height: size }}
      >
        <path d={STAR_PATH} fill={isHalf ? 'url(#half-fill)' : isFull ? '#fff' : 'rgba(255,255,255,0.2)'} />
      </svg>,
    );
  }
  return <div className={`review-stars ${className}`.trim()}>{stars}</div>;
}
