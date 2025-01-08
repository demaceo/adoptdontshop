import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
export default function Results() {
  const location = useLocation();
  const { animals } = location.state || {};

  if (!animals || animals.length === 0) {
    return <h2>No animals found for your search criteria.</h2>;
  }

  return (
    <div>
      <h2>Results</h2>
      <div className="cards-container">
        {animals.map(
          (animal: { id: number; name: string; description: string }) => (
            <Card key={animal.id} {...animal} />
          )
        )}
      </div>
    </div>
  );
}
