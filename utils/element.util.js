export class ElementUtil {
  static createElement(elementType, classNames) {
    const element = document.createElement(elementType);
    classNames.forEach((className) => element.classList.add(className));
    return element;
  }
}
