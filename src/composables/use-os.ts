export const useOS = () => {
  const isMac = navigator.platform.toLowerCase().includes('mac');

  return { isMac };
};
