export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number; // 1..5, supports .5
  text: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Karim B.',
    date: 'Juin 2025',
    rating: 5,
    text: "Les meilleurs burgers de Torcy, sans exagérer. Pain au four croustillant, viande généreuse, sauce maison au top. Service rapide même quand c'est plein.",
  },
  {
    id: 'r2',
    name: 'Sophie L.',
    date: 'Mai 2025',
    rating: 5,
    text: "On sent les produits frais. Le sandwich Grec est une tuerie. Accueil sympa et propre. Je recommande à 100%.",
  },
  {
    id: 'r3',
    name: 'Mehdi A.',
    date: 'Mai 2025',
    rating: 4,
    text: "Très bonne adresse, ouvert tard c'est top. Le Double est énorme, attention les yeux plus gros que le ventre. Rapport qualité-prix imbattable.",
  },
  {
    id: 'r4',
    name: 'Claire D.',
    date: 'Avril 2025',
    rating: 5,
    text: "Frites maison excellentes, fondant au chocolat à tomber. Une street-food qui fait du bien, on revient. Merci à toute l'équipe.",
  },
  {
    id: 'r5',
    name: 'Thomas R.',
    date: 'Avril 2025',
    rating: 4.5,
    text: "Commandé en ligne, prêt à l'heure, tout était chaud et bon. Le Spicy pique comme il faut. Mon spot burger du quartier.",
  },
  {
    id: 'r6',
    name: 'Nadia M.',
    date: 'Mars 2025',
    rating: 5,
    text: "Enfin un snack qui ne fait pas de raccourcis. Tout est préparé minute, ça se voit et ça se goûte. Bravo O'Snack !",
  },
];
