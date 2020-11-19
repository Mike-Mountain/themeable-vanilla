import {colorVariables} from "../../data/colors.js";
import {variablesContainer} from "../../data/colors.js";
import {ColorsUtil} from "./colors.util.js";
import {ElementUtil} from "../../utils/element.util.js";

// Loop through the array of variables and create an element for each one
export function createColorDomElements() {
  colorVariables.forEach((variable) => {
    variablesContainer.appendChild(createVariableItem(variable));
  });
}

function createVariableItem(variable) {
  const variableItem = ElementUtil.createElement("div", ["variable-item"]);
  const variableName = ElementUtil.createElement("h4", ["variable-title"]);
  const variableNameText = document.createTextNode(variable.name);
  const colorSelector = createColorPicker(variable, variableItem);

  variableName.appendChild(variableNameText);
  variableItem.appendChild(variableName);
  variableItem.appendChild(colorSelector);

  // Create an alpha value of .5 and append it to the variable value
  const alphaValue = ", 0.5";
  const first = variable.value.substr(0, 3);
  const middle = variable.value.substring(3, variable.value.length - 1);
  const last = variable.value.slice(variable.value.length - 1);

  variable.alpha = first + "a" + middle + alphaValue + last;
  variableItem.setAttribute("style", "background-color:" + variable.alpha);

  return variableItem;
}

function createColorPicker(variable, variableItem) {
  const colorPicker = ElementUtil.createElement("input", ["color-picker"]);
  const colorValue = getColorValueInHex(variable);

  colorPicker.setAttribute("type", "color");
  colorPicker.setAttribute("name", variable.name);
  colorPicker.setAttribute("value", colorValue);
  colorPicker.addEventListener(
    "input",
    function (event) {
      variable.value = ColorsUtil.hexToRgba(event.target.value, "1");
      variable.variableValues = ColorsUtil.getRgbValues(variable.value);
      setVariableValue(variable);
      variableItem.setAttribute(
        "style",
        "background-color:" + ColorsUtil.hexToRgba(event.target.value, "0.5")
      );
    },
    false
  );
  return colorPicker;
}

function getColorValueInHex(variable) {
  const rgbArr = variable.value.split(",");
  rgbArr[0] = rgbArr[0].substr(4);
  rgbArr[2] = rgbArr[2].substr(0, rgbArr[2].length - 1);
  return ColorsUtil.rgbToHex(
    parseInt(rgbArr[0].trim(), 10),
    parseInt(rgbArr[1].trim(), 10),
    parseInt(rgbArr[2].trim(), 10)
  );
}

function setVariableValue(variable) {
  document.documentElement.style.setProperty(
    `--${variable.name}`,
    variable.value
  );
  document.documentElement.style.setProperty(
    `--${variable.name}Values`,
    variable.variableValues
  );
}


