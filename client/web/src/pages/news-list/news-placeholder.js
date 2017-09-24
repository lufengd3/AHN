import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import {isWeex} from 'universal-env';

import style from './news-placeholder.css';

export default () => {
  return (
    <View style={style.newsItem}>
      <View style={style.newsTitle} />

      <View style={style.footer}>
        <View style={style.score} />
        <View style={style.time} />
      </View>
    </View>
  );
}