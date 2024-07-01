// css styles import
import "./css/thankYouPageRoute.scss";

// assets
import attaLogo from "../assets/attaLogo.png";
import qrCode from "../assets/qrCode.png";

import { useNavigate } from "react-router-dom";

export function ThankYouPage() {
    const navigate = useNavigate();

    return (
        <div className="introduction-container-box">
            <br />
          <div className="">
            <p>Thank you for your participation!</p>
            <img src={attaLogo} alt='ATTA' />
          </div>
    
          <div className="">
            <div className="">
              <p>
                If you want to learn more about ATTA and stay tuned for future projects and events,
                check out our website at attasociety.org or scan the QR code below!
              </p>
            </div>
            <div className="">
                <img src={qrCode} alt='qrCode' />
            </div>   
            <div className="">
              <button onClick={() => navigate("/")}>Return to Home Page</button>
            </div>
          </div>
        </div>
      );
}