import {createColorDomElements} from "./colors/colors.main.js";
import {createImageDomElements} from "./images/images.main.js";

export const tabsContainer = document.querySelector('#tabs-container');
export const tabs = [...tabsContainer.children];


export function onTabClick(event) {
  const panelName = event.target.id.substring(4);
  const panel = document.querySelector(`#${panelName}`);
  const tabContent = [...document.querySelectorAll('.panel')];
  const tabLinks = [...document.querySelectorAll('.tab')];

  tabContent.forEach((tab, idx) => {
    tabContent[idx].style.display = 'none';
    tabContent[idx].classList.remove('active-tab');
    cleanUpDomElements(tabContent[idx].id);
  })

  tabLinks.forEach((link, idx) => {
    tabLinks[idx].classList.remove('active-tab');
  })

  panel.style.display = 'block';
  event.target.classList.add('active-tab');
  switch (panelName) {
    case "variables":
      createColorDomElements();
      break;
    case "images":
      createImageDomElements();
      break;
  }
}

function cleanUpDomElements(containerId) {
  if (containerId) {
    const container = document.querySelector(`#${containerId}`);
    if (container.children.length > 0) {
      [...container.children].forEach(child => {
        if (!child.classList.contains('panel-title')) {
          container.removeChild(child);
        }
      })
    }
  }
}
