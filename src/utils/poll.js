import wait from "./wait";

export default async function poll(
  checkCondition,
  { interval = 1000, timeout = 10000 } = {},
) {
  let isComplete = false;
  const endAt = Date.now() + timeout;
  while (!isComplete && Date.now() < endAt) {
    // eslint-disable-next-line no-await-in-loop
    await wait(interval);
    // eslint-disable-next-line no-await-in-loop
    isComplete = await checkCondition();
  }
  if (!isComplete) {
    const error = new Error("Request failed with status code 408");
    error.response = {
      status: 408,
    };
    throw error;
  }
}
