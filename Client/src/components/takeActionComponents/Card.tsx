import React from "react";
import styles from "../css/card.module.scss";

const tagColors: { [key: string]: string } = {
  "Reducing Health Risks": "#A8E05F",
  "Reducing Air Pollution": "#FDD64B",
  "Sports & Health": "#FF8F50",
  Individual: "#DFA2FB",
  Community: "#A070B6",
  Transportation: "#03588C",
  Household: "#F086B9",
  Activism: "#FF3131",
  Food: "#C9B25D",
};

interface TakeAction {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

interface CardProps {
  action: TakeAction;
}

const Card: React.FC<CardProps> = ({ action }) => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup} key={action.id}>
        <div className={styles.imageParent}>
          <img
            className={styles.imageIcon}
            alt={action.title}
            src={action.image}
          />
          <div className={styles.wearAMaskWrapper}>
            <div className={styles.wearAMask}>{action.title}</div>
          </div>
          <div className={styles.wearingAFaceMaskIsRecommeWrapper}>
            <div className={styles.wearingAFace}>{action.description}</div>
          </div>
        </div>
        <div className={styles.labelParent}>
          {action.tags.map((tag) => (
            <div className={styles.label} key={tag}>
              <div
                className={styles.labelChild}
                style={{ backgroundColor: tagColors[tag] }}
              />
              <div className={styles.label1}>{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
