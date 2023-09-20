import "./css/scalePopUp.scss";

export interface PopUpProps {
  status: string,
  color: string;
}

export const ScalePopUp = ({ color, status }: PopUpProps) => {
  return (
    <div style={{ background: `var(--AQI, ${color})` }}
      className="popup-container">{status}</div>

  );
};