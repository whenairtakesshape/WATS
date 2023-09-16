import "./css/contributingFactorCard.scss";


export interface ContributingFactorCardProps {
  name: string;
  img: string;
  opacity?: number;
}

export const ContributingFactorCard = (props: ContributingFactorCardProps) => {
  return (
    <div className="contributing-factor-card-container"
      style={{ opacity: props.opacity == 0 ? props.opacity : 1 }}>
      <img src={props.img} />
      <p>{props.name}</p>
    </div>
  );
};