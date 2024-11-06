export function decodebase64(array: any) {
  return (
    array &&
    array?.map((item: any) => {
      return {
        ...item,
        value: atob(item.value),
      };
    })
  );
}
