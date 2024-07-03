import "./css/incomeGroupPopUp.scss";

interface IncomeGroupPopUpProps {
  active: boolean;
  onClose: () => void;
}

export const IncomeGroupPopUp = (props: IncomeGroupPopUpProps) => {
  if (props.active) {
    return (
      <div className="income-pop-up-container">
        <div className="income-pop-up-x">
          <button onClick={props.onClose}>x</button>
        </div>
        <div className="income-pop-up-text-content">
            <h2 className="income-pop-up-header">Income Groups</h2>
            <p className="income-pop-up-paragraph">
            The income groups are based on World Bank’s classification for its 189 member countries, 
            and all other economies with populations of more than 30,000. For operational and analytical 
            purposes, economies are divided among income groups according to 2022 gross national income 
            (GNI) per capita, calculated using the World Bank Atlas method. 
            </p>
            <p className="income-pop-up-paragraph">
            The groups are: low income, $1,135 or less; lower middle income, $1,136  to $4,465; upper middle 
            income, $4,466 to $13,845; and high income, $13,846 or more.
            </p>
            <p className="income-pop-up-paragraph">
            Each city’s displayed income level is only based on the country/economy it’s in and might not 
            reflect the city’s situation accurately . Please use this data for approximate reference only.
            </p>
        </div>
    
      </div>
    );
  }
  else return <div></div>;
};