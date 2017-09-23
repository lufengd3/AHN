import {isWeex} from 'universal-env';

export default {
  setTitle: title => {
    if (isWeex) {
      let nav = require('@weex-module/navigator');

      nav.setNavBarTitle({
        title: 'Hello'
      }, (e) => {
        // console.log(e)
      });
    } else {
      document.title = title;
    }
  }
}