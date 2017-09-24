import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import RecyclerView from 'rax-recyclerview';
import RefreshControl from 'rax-refreshcontrol';

import HN from './hn-api';
import NewsItem from './news-item';
import Placeholder from './placeholder';
import style from './index.css';
import Storage from '../../utils/storage';

const PAGE_SIZE = 10;
const FETCH_OPTION = {
  mode: 'cors',
  dataType: 'json',
  method: 'GET'
};

class NewsList extends Component {

  constructor(props) {
    super(props);

    this.type = props.type;

    this.firstScreen = true;

    this.state = {
      newsList: [],
      loading: true,
      error: null,
      pageNum: 0,
      refreshing: false
    }

    this.idList = [];
  }

  compnentWillMount() {
    // TODO: use storage in beststories
  }

  componentDidMount() {
    this.fetchIDList();
  }

  fetchIDList = () => {
    fetch(this.type, FETCH_OPTION)
    .then(res => res.json())
    .then((data) => {
      this.idList = data;
      this.fetchNewsByPage();
    })
    .catch(error => {
      console.error(error);
      this.setState({
        error,
        loading: false,
        refreshing: false,
      });
    });
  }

  fetchNewsByPage = (pageNum = 0) => {
    let start = PAGE_SIZE * pageNum;
    let end = start + PAGE_SIZE;
    let idList = this.idList.slice(start, end);
    let fetchPromise = [];

    if (!idList.length) {
      this.setState({
        error: 'No more...',
        loading: false,
        refreshing: false
      });

      return;
    }

    idList.map((id) => {
      fetchPromise.push(this.fetchNewsById(id));
    });

    Promise.all(fetchPromise)
    .then(data => {
      this.firstScreen = false;
      this.setState(prevState => ({
        loading: false,
        newsList: prevState.refreshing ? data : prevState.newsList.concat(data),
        pageNum: prevState.pageNum + 1,
        refreshing: false,
      }));
    })
    .catch(error => {
      console.error(error);
      this.setState({
        error,
        loading: false,
        refreshing: false
      });
    });
  }

  fetchNewsById = (id) => {
    return fetch(HN.ITEM(id), FETCH_OPTION)
      .then(res => res.json())
  }

  loadMore = () => {
    let nextPage = ++this.state.pageNum;

    this.setState({
      loading: true
    });

    this.fetchNewsByPage(nextPage);
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      idList: [],
    });

    this.fetchIDList();
  }

  render() {
    let {loading, error, newsList} = this.state;

    if (this.firstScreen) {
      return <Placeholder />;
    }

    return (
      <RecyclerView onEndReached={this.loadMore} showVerticalScrollIndicator={false} showScrollbar={false}>
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        >
          <Text style={style.tips}>Refreshing...</Text>
        </RefreshControl>

        {
          newsList.map((news, index) => {
            return (
              <RecyclerView.Cell>
                <NewsItem {...news} />
              </RecyclerView.Cell>
            );
          })
        }

        <RecyclerView.Cell>
          {loading ? <Text style={style.tips}>Loading...</Text> : null}
        </RecyclerView.Cell>

        <RecyclerView.Cell>
          {error ? <Text style={style.tips}>{error}</Text> : null}
        </RecyclerView.Cell>

      </RecyclerView>
    );
  }

}

export default NewsList;