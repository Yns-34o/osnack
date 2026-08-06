const ITEMS = [
  'Sandwichs au four',
  'Burgers gourmands',
  'Produits frais',
  'Cuisson minute',
  'Depuis Torcy',
];

export function Marquee() {
  // Duplicated track for a seamless -50% loop.
  const sequence = (
    <span>
      {ITEMS.map((item, i) => (
        <span key={i}>
          {item}
          <span className="sep"></span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee">
      <div className="marquee-track">
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
