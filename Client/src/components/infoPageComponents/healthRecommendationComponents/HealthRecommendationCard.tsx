// css styles
import "./css/healthRecommendationCard.scss";

// props interface
interface HealthRecommendationCardLogic {
  name: string;
  description: string;
  png: string;
  opacity?: number;
}

export const HealthRecommendationCard = (props: HealthRecommendationCardLogic) => {
  return (
    <div className="health-recommendation-card-container"
      style={{ opacity: props.opacity == 0 ? props.opacity : 1 }}>
      <img src={props.png}></img>
      <div className="health-recommendation-card-right-side">
        <p className="health-recommendation-card-right-side-title"><b>{props.name}</b></p>
        <p className="health-recommendation-card-right-side-p">{props.description}</p>
      </div>
    </div>
  );
};