// styles
import "./css/breathePage.scss";

// assets
import warning_amber from "../assets/warningAmber.svg";
import breathe_gif from "../assets/breathe.gif";
import breathe_image from "../assets/breatheImage.png";
import chevron_left from "../assets/cheveronLeft.svg";

// libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import CountDown from "../components/CountDown";

interface BreathePageProps {
    backButtonLabel: string;
    onBackButtonClick: () => void;
    nextButtonLabel: string;
    onNextButtonClick: () => void;
    cityName?: string | undefined;
    aqi?: number | undefined;
    isCompareCitiesCompleted? : boolean;
}


export const BreathePage = (props: BreathePageProps) => {
    const {
        backButtonLabel, 
        onBackButtonClick, 
        nextButtonLabel, 
        onNextButtonClick, 
        cityName=undefined, 
        aqi=undefined, 
        isCompareCitiesCompleted = false
    } = props;

    const navigate = useNavigate();

    /**
     * makes post request to the server API and sends query to stop the physical installation.
     * alerts for error otherwise.
     */
    const makeApiRequest = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/command?command=s`);
            console.log(res);
            //alert(`request succesful: ` + res.status);
            // app navigates to mapRoute after request to halt the physical installation executes correctly.
            navigate("/intro");
        } catch (error: any) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <div className="breathe-container">
            <button className="breathe-back-button" onClick={onBackButtonClick}>
                <img className="chevron-icon" src={chevron_left}/>
                {backButtonLabel}
            </button>
            <div className="breathe-page-content">
            {!isCompareCitiesCompleted && <CountDown seconds={60} cityName={cityName} onCountDownComplete={onNextButtonClick}/>}
                <img className="breathe-gif-or-image" src={isCompareCitiesCompleted ? breathe_image : breathe_gif} />
                {isCompareCitiesCompleted ? 
                    <div className="breathe-page-title">
                        Now that you know what it’s like to breathe in different cities, let’s look at actions we can take to battle air pollution!
                    </div>
                    : <div className="breathe-page-title">
                        Breathing Now
                        <span> {cityName} </span> 
                    </div>
                }
            </div>
            <button className="breathe-next-button" onClick={onNextButtonClick}>
                {nextButtonLabel}
            </button>
        </div>
    );
};
