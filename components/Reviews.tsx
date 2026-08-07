'use client';

import { REVIEWS } from '@/lib/reviews';
import { StarRating } from './StarRating';
import { Reveal } from './Reveal';
import { GoogleGLogo } from './BrandLogos';

export function Reviews() {
  return (
    <section className="reviews section-pad" id="reviews">
      <div className="container">
        <Reveal className="section-label" as="div">Espace Avis</Reveal>

        <div className="reviews-header">
          <div>
            <h2 className="section-title">
              Ils en
              <br />
              parlent mieux
              <br />
              que nous.
            </h2>
          </div>
          <div className="reviews-score">
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span className="big">4.5</span>
                <span className="of">/ 5</span>
              </div>
              <div className="stars">
                <svg viewBox="0 0 24 24" width={18} height={18}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
                </svg>
                <svg viewBox="0 0 24 24" width={18} height={18}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
                </svg>
                <svg viewBox="0 0 24 24" width={18} height={18}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
                </svg>
                <svg viewBox="0 0 24 24" width={18} height={18}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
                </svg>
                <svg viewBox="0 0 24 24" width={18} height={18}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#half-fill)" />
                </svg>
              </div>
            </div>
            <div className="reviews-meta">
              Basé sur <strong>+250 avis</strong> vérifiés
              <br />
              <span className="reviews-meta-google">
                <GoogleGLogo className="reviews-google-logo" />
                Note Google · TheFork · Uber Eats
              </span>
              <br />
              Dernière mise à jour : <strong>ce mois-ci</strong>
            </div>
          </div>
        </div>

        <div className="reviews-grid" id="reviewsGrid">
          {REVIEWS.map((review) => (
            <Reveal className="" key={review.id} as="div">
              <article className="review-card">
                <div className="review-top">
                  <StarRating rating={review.rating} />
                  <GoogleGLogo className="review-google-logo" />
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-author">
                  <div className="review-avatar">{review.name.charAt(0)}</div>
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-date">Avis Google · {review.date}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
