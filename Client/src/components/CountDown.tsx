// css
import "./css/countDown.scss";

// libraries 
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (countDown <= 0) {
      if (timerId.current) {
        clearInterval(timerId.current);
        navigate("/intro");
      }
    }
  }, [countDown]);

  return (
    <div className="countdown-container">
      {countDown} 
    </div>
  );
}