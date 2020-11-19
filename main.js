import {tabs, onTabClick} from "./components/tabs.js";
window.addEventListener('load', onWindowLoad, false);

function onWindowLoad() {
  tabs.forEach(tab => {
    tab.addEventListener('click', onTabClick, false);
    if (tab.id === 'tab-variables') {
      tab.click();
    }
  })
}
