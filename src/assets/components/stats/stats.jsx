import './stats.css'
import { Percentage } from './percentage.jsx'
import { useState, useEffect } from 'react';
import seedrandom from 'seedrandom';

function getRandomValue(uniqueKey) {
  const today = new Date();
  const day = today.getDate();
  const rng = seedrandom(day.toString() + uniqueKey);
  const randomFactor = rng();
  
  const newRandomValue = -15 + randomFactor * 47; // Random value between -15 and +32
  return newRandomValue;
}


export function Stats({ title, value  }) {

  const [randomValue, setRandomValue] = useState(null);

  useEffect(() => {
    const initialRandomValue = getRandomValue(value);
    setRandomValue(initialRandomValue);

    const timesToUpdate = ['08:00', '16:00', '00:00'];
    timesToUpdate.forEach((time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const nextUpdate = new Date(now);
      nextUpdate.setHours(hours, minutes, 0, 0);

      if (now > nextUpdate) {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
      }

      const timeoutId = setTimeout(() => {
        const newRandomValue = getRandomValue(value);
        setRandomValue(newRandomValue);
      }, nextUpdate - now);

      return () => {
        clearTimeout(timeoutId);
      };
    });
  }, [value]);


  return <>
    <div className="statsInfo">
      <h2 className="secondText statsTitle">{title}</h2>
      <h1 className="mainText statsValue">{value}</h1>
      <Percentage value={randomValue !== null ?  `${randomValue.toFixed(1)}` : '...'} />
    </div>
  </>
}