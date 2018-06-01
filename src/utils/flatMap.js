export default function flatMap(list, mapItemToArray) {
  return list.reduce((arr, item) => [...arr, ...mapItemToArray(item)], []);
}
