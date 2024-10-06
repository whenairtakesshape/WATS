import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const useInactivityTimer = (inactivityTime = 120000) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();
  const makeApiRequestAndNavigate = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/command?command=s`);
      console.log(res);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > inactivityTime) {
        makeApiRequestAndNavigate();
      }
    }, 10000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(checkInactivity);
    };
  }, [lastActivity, inactivityTime, navigate]);
};

export default useInactivityTimer;