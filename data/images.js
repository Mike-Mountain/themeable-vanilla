let images = [
  "backgroundImage",
  "logoImage"
];

export const imageVariables = images.map((item) => {
  return {
    name: item,
    value: getComputedStyle(document.documentElement)
      .getPropertyValue(`--${item}`)
      .trim()
  };
});

export const imagesContainer = document.querySelector("#images");
