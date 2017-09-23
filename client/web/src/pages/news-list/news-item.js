import {createElement, Component, render} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Link from 'rax-link';
import {isWeex} from 'universal-env';
import moment from 'moment';

import style from './news-item.css';

if (isWeex) {
  style.newsItem.width = 750;
  style.newsItem.height = 220;
}

export default ({title, url, time, score}) => {
  time = moment(time * 1000).format('YYYY-MM-DD hh:mm');

  return (
    <Link href={url} style={style.newsItem}>
      <Text style={style.newsTitle} numberOfLines={2}>{title}</Text>

      <View style={style.footer}>
        <Text style={style.score}>{score} vote</Text>
        <Text style={style.time}>{time}</Text>
      </View>
    </Link>
  );
}