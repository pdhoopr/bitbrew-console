export default function flatMap(array, func) {
  return array.reduce((flatArray, item) => [...flatArray, ...func(item)], []);
}
