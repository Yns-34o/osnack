'use client';

interface StarRatingProps {
  rating: number;
  /** pixel size of each star */
  size?: number;
  className?: string;
}

const STAR_PATH =
  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

// Couleurs des étoiles « avis Google » (or sur fond blanc).
const STAR_FULL = '#F5A623';
const STAR_HALF = 'url(#half-fill-gold)';
const STAR_EMPTY = 'rgba(0,0,0,0.14)';

/**
 * Renders 5 stars, supporting a half-filled last star (filled with the
 * #half-fill-gold gradient defined in the SVG defs).
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
        <path d={STAR_PATH} fill={isHalf ? STAR_HALF : isFull ? STAR_FULL : STAR_EMPTY} />
      </svg>,
    );
  }
  return <div className={`review-stars ${className}`.trim()}>{stars}</div>;
}
