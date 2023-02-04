export const numberToPx = (num: number) => `${num}px`;

export const numberToDeg = (num: number) => `${num}deg`;

export const stringToNumber = (str: string) => parseFloat(str);

export const arrayToChunks =(arr: unknown[], chunkSize: number): unknown[] =>  {
  if (!arr.length) {
    return arr;
  }
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }

  return res;
}
