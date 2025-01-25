export function getFirstLetters(sentence) {
  const words = sentence?.split(" ");
  const firstLetters = words?.map((word) => word.charAt(0));
  return firstLetters?.join("");
}
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
