import { useState, useEffect } from 'react';

/**
 * Calculates elapsed time from 19th March to the current moment ("countless").
 * Formats the primary display as Month / Day.
 * 
 * @param {Date|string} startDateInput - Default: March 19, 2026 00:00:00
 * @param {Date} now - Current date
 */
export function calculateElapsedFromMarch19(
  startDateInput = new Date(2026, 2, 19, 0, 0, 0),
  now = new Date()
) {
  const start = typeof startDateInput === 'string' ? new Date(startDateInput) : startDateInput;
  const end = new Date(now);

  // If clock is before start date, fallback gracefully
  if (end < start) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      formattedMonthDay: '0 Months / 0 Days',
      startDateFormatted: '19th March'
    };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth() + years * 12;
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month
    const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  const diffMs = end.getTime() - start.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const seconds = end.getSeconds();

  const monthLabel = months === 1 ? '1 Month' : `${months} Months`;
  const dayLabel = days === 1 ? '1 Day' : `${days} Days`;
  const formattedMonthDay = `${monthLabel} / ${dayLabel}`;

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    formattedMonthDay,
    startDateFormatted: '19th March'
  };
}

/**
 * React hook that provides a live day timer counting from 19th March to countless.
 * Updates every second for a live breathing experience.
 */
export function useDayTimer(startDateInput = new Date(2026, 2, 19, 0, 0, 0)) {
  const [timerData, setTimerData] = useState(() => calculateElapsedFromMarch19(startDateInput));

  useEffect(() => {
    // Initial sync
    setTimerData(calculateElapsedFromMarch19(startDateInput));

    const intervalId = setInterval(() => {
      setTimerData(calculateElapsedFromMarch19(startDateInput));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startDateInput]);

  return timerData;
}

export default useDayTimer;
