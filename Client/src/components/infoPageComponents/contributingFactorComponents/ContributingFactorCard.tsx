import "./css/contributingFactorCard.scss";

// prop interface for ContributingFactorCard
export interface ContributingFactorCardProps {
  name: string;
  img: string;
  opacity?: number;
}

/**
 * ContributingFactorCard renders only when it is not passed an opacity value. 
 * opacity is an optional prop that can be passed to ContributingFactorCard.
 * if opacity prop is null, meaning it was NOT passed down by parent component, 
 * the card will render with opacity of 1.
 * if opacity prop is not null, meaning it was passed down by parent component, 
 * the card will render with opacity of 0 and appear as not be visible. 
 */
export const ContributingFactorCard = (props: ContributingFactorCardProps) => {
  return (
    <div className="contributing-factor-card-container"
      style={{ opacity: props.opacity == 0 ? props.opacity : 1 }}>
      <img src={props.img} />
      <p>{props.name}</p>
    </div>
  );
};