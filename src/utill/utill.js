export const getLocalItem = (id) => {
  const localList = localStorage.getItem('list');
  const list = localList ? JSON.parse(localList) : [];
  const lsitItem = list.find((item) => String(item.id) === id);
  return lsitItem;
};
