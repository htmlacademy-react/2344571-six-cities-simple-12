import dayjs from 'dayjs';

export const humanizeDate = (date: string, format: string) =>
  dayjs(date).format(format);
