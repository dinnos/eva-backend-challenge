interface IBetweenQuery<T> { $gte: T; $lt?: T; }

interface IArraySomeQuery<T> { $in: T[]; }
interface IArrayExactQuery<T> { $size: number; $all: T[]; }
type ArraySearchQuery<T> = IArraySomeQuery<T> | IArrayExactQuery<T> | T[];

export { IBetweenQuery, ArraySearchQuery };
