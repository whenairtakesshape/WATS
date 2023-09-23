// css
import "./css/countDown.scss";

// libraries 
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CountDownInterface {
  seconds: number;
}
export default function CountDown(props: CountDownInterface) {

  // count down state
  const [countDown, setCountDown] = useState(props.seconds);
  // timerId ref
  const timerId = useRef<NodeJS.Timeout | null>(null);
  // navigation hook
  const navigate = useNavigate();

  useEffect(() => {

    timerId.current = setInterval(() => {
      setCountDown((prev: any) => prev - 1);
    }, 1000);

    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };

  }, []);

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
    }
    catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (countDown <= 0) {
      if (timerId.current) {
        clearInterval(timerId.current);
        makeApiRequest();
      }
    }
  }, [countDown]);

  return (
    <div className="countdown-container">
      {countDown}
    </div>
  );
}