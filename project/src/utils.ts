export function getUppercase(data: string):string {
  return data.charAt(0).toUpperCase() + data.slice(1);
}

export function formatDate(date:string) {
  return new Date(date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
}

export function formatDatetoIso(date:string) {
  return new Date(date).toISOString().slice(0,10);
}

const STARS_AMOUNT = 5;
export const calcRating = (rating: number) => `${Math.round(rating) / STARS_AMOUNT * 100}%`;
