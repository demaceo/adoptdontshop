import "./Card.css"
import { AnimalCard } from '../../utils/Types'

export default function Card({id, name, description}: AnimalCard) {
  return (
    <div key={id} className="card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}
