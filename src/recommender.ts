// src/recommender.ts
type Rating = {
  user: string;
  item: string;
  rating: number;
};

const data: Rating[] = [
  { user: 'A', item: 'Matrix', rating: 5 },
  { user: 'A', item: 'Titanic', rating: 4 },
  { user: 'B', item: 'Matrix', rating: 5 },
  { user: 'B', item: 'Avengers', rating: 2 },
  { user: 'C', item: 'Titanic', rating: 5 },
];

export function getRecommendations(user: string) {
  // Logic for a basic recommendation
  // This could be replaced with more advanced filtering
  const recommended = data.filter(d => d.user !== user && d.rating >= 4);
  return recommended.map(r => r.item);
}
