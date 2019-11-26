import { IPeriod } from '../interfaces/helpers.interface';
import { ArraySearchQuery, IBetweenQuery } from '../interfaces/mongo-queries.interface';

/**
 * Creates a valid query to mongodb that check if the document property is between the
 * values provide by the "period" argument
 *
 * @param period
 */
const getBetweenQuery = <T>(period: IPeriod<T>): IBetweenQuery<T> => {
  const { start: $gte, end: $lt } = period;

  const query: IBetweenQuery<T> = { $gte };
  if ($lt) {
    query.$lt = $lt;
  }

  return query;
};

/**
 * Creates a valid query to search over mongo properties of type Array
 *
 * Types:
 *  - If the array array of the search is empty return the same value this because the query find all the
 *    docs with and empty array
 *  - If the search is Strict Mode mongodb needs and special query this is validate the size of the array and check that the
 *    documents includes all values of the search array
 *  - If the search is not strict only check if the values of the documents contains at least one element of the search array
 *
 * @param isStrict
 * @param arr
 */
const getFindArrayQuery = <T>(isStrict: boolean, arr: T[]): ArraySearchQuery<T> => {
  if (!arr.length) {
    return arr;
  }

  if (!isStrict) {
    return { $size: arr.length, $all: arr };
  }

  return { $in: arr };
};

export { getBetweenQuery, getFindArrayQuery };
