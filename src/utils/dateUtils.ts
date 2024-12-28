export const isBirthday = (): boolean => {
  const today = new Date();
  return today.getMonth() === 0 && today.getDate() === 19; // January 19
};

export const getTimeUntilBirthday = (): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const birthday = new Date(currentYear, 0, 19); // January 19

  // If birthday has passed this year, look to next year
  if (now > birthday) {
    birthday.setFullYear(currentYear + 1);
  }

  const difference = birthday.getTime() - now.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};