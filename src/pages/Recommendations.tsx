// src/pages/Recommendations.tsx
import { getRecommendations } from '../recommender';

export default function Recommendations() {
  const recommendations = getRecommendations('A');
  return (
    <div>
      <h1>Recommended for You</h1>
      <ul>
        {recommendations.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
