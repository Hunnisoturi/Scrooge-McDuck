export const sortByVolumeAndPriceDiff = (a, b) => a.Volume === b.Volume
  ? b.calculatePriceDiff() - a.calculatePriceDiff() : b.Volume - a.Volume;

export const calculatePriceDiff = a => Math.abs(a.High - a.Low).toFixed(2);

export const getPercentageDiff = (open, mean) => ((open - mean) / Math.abs(mean)) * 100;

export const sortByDiff = (a, b) => b.Diff - a.Diff;
