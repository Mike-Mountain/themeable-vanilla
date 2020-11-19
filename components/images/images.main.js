import {imagesContainer, imageVariables} from "../../data/images.js";
import {ElementUtil} from "../../utils/element.util.js";

// Loop through the array of variables and create an element for each one
export function createImageDomElements() {
  imageVariables.forEach(image => {
    imagesContainer.appendChild(createImageItem(image))
  })
}

function createImageItem(image) {
  const imageItem = ElementUtil.createElement('div', ['image-item']);
  const imageName = ElementUtil.createElement('h4', ['image-title']);
  const first = image.name.substring(0, image.name.length - 5);
  const last = image.name.substring(image.name.length - 5, image.name.length)
  image.displayName = `${first} ${last}`;
  const imageNameText = document.createTextNode(image.displayName);
  const imageElement = createImageElement(image, imageItem);
  const imageSelector = createImageTextElement(image);
  imageName.appendChild(imageNameText);
  imageItem.appendChild(imageName);
  imageItem.appendChild(imageElement);
  imageItem.appendChild(imageSelector);

  imageSelector.addEventListener('change', function (event) {
    updateImage(event, image, imageElement);
  }, false);
  return imageItem;
}

function createImageElement(image) {
  const imageElement = ElementUtil.createElement('img', ['image-element']);
  if (image.value.includes('url')) {
    image.value = image.value.substring(5, image.value.length - 2);
  }
  imageElement.setAttribute('src', image.value);
  return imageElement;
}

function createImageTextElement(image) {
  const input = ElementUtil.createElement('input', ['image-input']);
  input.setAttribute('type', 'text');
  input.setAttribute('value', image.value);
  return input;
}

function updateImage(event, image, imageElement) {
  image.value = event.target.value;
  image.cssValue = `url("${image.value}")`;
  imageElement.setAttribute('src', image.value);
  document.documentElement.style.setProperty(
    `--${image.name}`,
    image.cssValue
  )
}
