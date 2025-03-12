
type SortDirection = "asc" | "desc";

interface SortConfig<T extends string> {
  key: T;
  direction: SortDirection;
}

export function useTableSort<T extends string>(defaultKey: T) {
  const [sortConfig, setSortConfig] = React.useState<SortConfig<T>>({
    key: defaultKey,
    direction: "desc",
  });
  
  const requestSort = (key: T) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { sortConfig, requestSort };
}
