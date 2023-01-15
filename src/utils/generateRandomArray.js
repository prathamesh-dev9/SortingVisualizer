export const getRandomNumberArray = () => {
  let randomNumberArray = [],
    min = 5,
    max = 80,
    size = 50;
  while (randomNumberArray.length < size) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (randomNumberArray.indexOf(randomNumber) === -1) {
      randomNumberArray.push(randomNumber);
    }
  }
  return randomNumberArray;
};
