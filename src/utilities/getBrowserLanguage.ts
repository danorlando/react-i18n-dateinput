export const getBrowserLanguage = (nav = navigator) => {
  return (nav && nav.language) || "en";
};
