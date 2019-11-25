import { IPeriod } from '../interfaces/helpers.interface';
import { ArraySearchQuery, IBetweenQuery } from '../interfaces/mongo-queries.interface';

const getBetweenQuery = <T>(period: IPeriod<T>): IBetweenQuery<T> => {
  const { start: $gte, end: $lt } = period;

  const query: IBetweenQuery<T> = { $gte };
  if ($lt) {
    query.$lt = $lt;
  }

  return query;
};

const getFindArrayQuery = <T>(isStrict: boolean, arr: T[]): ArraySearchQuery<T> => {
  let query: ArraySearchQuery<T> = { $in: arr };

  if (isStrict) {
    query = { $size: arr.length, $all: arr };
  }

  return query;
};

export { getBetweenQuery, getFindArrayQuery };
