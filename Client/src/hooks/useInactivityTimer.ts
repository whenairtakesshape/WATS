import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useInactivityTimer = (inactivityTime = 120000) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const resetTimer = () => setLastActivity(Date.now());
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > inactivityTime) {
        navigate('/');
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