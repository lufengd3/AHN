import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import RecyclerView from 'rax-recyclerview';
import {isWeex} from 'universal-env';

import NewsPlaceholder from './news-placeholder';
import LoadingBox from '../../mods/loading-box';

const INIT_NEWS = Array(10).join(' ').split(' ');

export default () => {
  return [
    <RecyclerView>
      {INIT_NEWS.map(() => {
        return (
          <RecyclerView.Cell>
            <NewsPlaceholder />
          </RecyclerView.Cell>
        )
      })}
    </RecyclerView>,
    <LoadingBox />
  ];
}