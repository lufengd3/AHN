import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import {isWeex} from 'universal-env';

import style from './index.css';

const WIDTH = 750;

if (isWeex) {
  style.loading.top = screen.height * WIDTH / screen.width / 2 - style.loading.height - 100;
} else {
  style.loading.top = document.documentElement.clientHeight * WIDTH / document.documentElement.clientWidth / 2 - style.loading.height - 100;
}

export default () => {
  return null;
  return (
    <View style={style.loadingContainer}>
      <View style={style.loading} />
    </View>
  );
}