let colors = [
    "light",
    "dark",
    "primary",
    "accent"
];

export const colorVariables = colors.map((item) => {
    return {
        name: item,
        value: getComputedStyle(document.documentElement)
          .getPropertyValue(`--${item}`)
          .trim()
    };
});

export const variablesContainer = document.querySelector("#variables");
