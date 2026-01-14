export const formatCount = (count: number): string => {
  if (count < 1000) {
    return `${count}`;
  }

  const units = ["k", "M", "G", "T"];
  let unitIndex = -1;
  let value = count;
  const threshold = 1000;

  do {
    value /= threshold;
    unitIndex++;
  } while (value >= threshold && unitIndex < units.length - 1);

  return `${value.toFixed(1)}${units[unitIndex]}`;
};
