export function searchInArray<T extends object>(
  search: string,
  array: T[],
  keys?: (keyof T)[]
) {
  return array.filter((item) =>
    (keys || Object.keys(item)).some((key) => {
      const prop = item[key as keyof T];

      return (
        typeof prop === "string" &&
        prop.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
      );
    })
  );
}