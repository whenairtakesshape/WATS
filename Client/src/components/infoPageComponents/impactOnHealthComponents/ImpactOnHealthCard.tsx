//css styles
import "./css/impactOnHealthCard.scss";

interface ImpactOnHealthCardProps {
  name: string;
  description: Array<string>;
  png: string;
  opacity?: number;
}

export const ImpactOnHealthCard = (props: ImpactOnHealthCardProps) => {
  return (
    <div className="impact-on-health-card-container"
      style={{ opacity: props.opacity == 0 ? props.opacity : 1 }}>
      <img src={props.png}></img>
      <div className="impact-on-health-card-right-side">
        <p className="impact-on-health-card-right-side-title"><b>{props.name}</b></p>
        {props.description.map((description, idx) =>
          <p className="impact-on-health-card-right-side-p" key={idx}>{description}</p>)}
      </div>
    </div>
  );
};