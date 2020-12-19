const convertDate = (dateString: string): number => {
  const from: Date = new Date(dateString);
  const to: Date = new Date();
  const oneDay: number = 24 * 60 * 60 * 1000;
  const diff: number = Math.round(
    Math.abs((to.getMilliseconds() - from.getMilliseconds()) / oneDay)
  );
  return diff;
};

const debounce = (
  callback: (...args: any[]) => void,
  ms: number,
  ...args: any[]
): void => {
  let timerID: number = window.setTimeout(callback, ms, ...args);
  while (--timerID) {
    window.clearTimeout(timerID);
  }
};

export { convertDate, debounce };
