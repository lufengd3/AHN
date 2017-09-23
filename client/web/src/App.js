import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import {isWeex} from 'universal-env';

import Tabbar from './mods/tabbar';
import NewsList from './pages/news-list';
import HN from './pages/news-list/hn-api';
import utils from './utils/page';

const TIME_ICON_SELECTED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABUUExURUxpcRGV2hCV2hKV2xCX2xGW2hKW2hCP3xCX3xGW2xKV3BGW2xGV2xKX2xCV2hGW2xCW3BCV2hGV2xCW2xKW2xCW2xGW2hCW3BKV2hGW2xGV2xKW22sUt94AAAAbdFJOUwDPMIBA0KAQIMCQr+9/YL9Qb7A/j3DfX5/w4B515lMAAAEDSURBVDjLrZPZooMgDEShrAJX1O6d///PCwoIhcfmRUmOMxICIb8M/bSeUm+feljmHiU878rqFfKC8RBMhFer2vqFArIoKwnQS1N3+LQJAVclFIVIkjrJKAF6ukh88gIghbBFDyhyBYjZvJcNkvRA0PVJDNAjQAOH8QxBRgARmPenARsDLFlPCeyABVMCeA38xVijOwcdAUfcdyAr3E9gm47QlYWBGc9H/sk5WXWRt9k0qh6w3KjQUzsCJLYT7UcsHlYRNnCdiXLVEcbp+CKqGdqXb7jGhTu8m0+CBmzJ6DDi4lvShP4+buv1ut4e4dWoftvyvDhyfLfUwuIxsEX99Eb/A+NkElgU5iptAAAAAElFTkSuQmCC';
const TIME_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABUUExURUxpcYqKioqKiomJiYuLi4mJiYmJiY+Pj4eHh4qKioqKiomJiYqKiouLi4qKioqKiomJiYqKioqKioqKiomJiYmJiYmJiYmJiYqKiomJiYqKioqKilacqmEAAAAbdFJOUwDPMIBA0KAQIMCQr+9/YL9Qb7A/j3DfX5/w4B515lMAAAEDSURBVDjLrZPZooMgDEShrAJX1O6d///PCwoIhcfmRUmOMxICIb8M/bSeUm+feljmHiU878rqFfKC8RBMhFer2vqFArIoKwnQS1N3+LQJAVclFIVIkjrJKAF6ukh88gIghbBFDyhyBYjZvJcNkvRA0PVJDNAjQAOH8QxBRgARmPenARsDLFlPCeyABVMCeA38xVijOwcdAUfcdyAr3E9gm47QlYWBGc9H/sk5WXWRt9k0qh6w3KjQUzsCJLYT7UcsHlYRNnCdiXLVEcbp+CKqGdqXb7jGhTu8m0+CBmzJ6DDi4lvShP4+buv1ut4e4dWoftvyvDhyfLfUwuIxsEX99Eb/A+NkElgU5iptAAAAAElFTkSuQmCC';
const GALLERY_ICON_SELECTED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcRCV2hGV2hGW2hGW2xKX2xCV2hCX2xKV2xCP3xCW3BGW2xKV3BGW2hCW2xCW3BGV2xKW2xGV2xCX3xGV2xCV2hKW2hGW2xKV2hGW2xKW25O1D5UAAAAadFJOUwBgz9C/fzBAgBBQ8JDfcF/vj+AgsG+gwJ+vStBiMQAAAMpJREFUOMvNk9kaxBAMRoOWhu7rjPd/0Cm6GE1nbvtf+JBDIgmAZ4nlmxok7cIe4hShbCT9Dyhii+wyJx4Dld96SQ8Ye6v2cnUqFQAstvWsldKluQBd8C+GEBQuKRAkzsePJDCAzCeXTw1oCGAGuY5vFw6DmgA0lPtdi2dTQJ2eewASYDtQkgCD3ceI0akTyNy8t9as5BHO1zPdAoVxBRrIPLTOhB7jJGDbZuuMik61a4NuanKeVFP+KrfvmP7eLkJ16+JGNT7jP34AXOQwDsasy3EAAAAASUVORK5CYII=';
const GALLERY_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcYqKioqKiomJiYqKiouLi4qKiouLi4mJiY+Pj4mJiYmJiYqKiomJiYmJiYmJiYqKiomJiYqKioeHh4qKioqKiomJiYqKioqKiomJiYqKigtvJ2EAAAAadFJOUwBgz9C/fzBAgBBQ8JDfcF/vj+AgsG+gwJ+vStBiMQAAAMpJREFUOMvNk9kaxBAMRoOWhu7rjPd/0Cm6GE1nbvtf+JBDIgmAZ4nlmxok7cIe4hShbCT9Dyhii+wyJx4Dld96SQ8Ye6v2cnUqFQAstvWsldKluQBd8C+GEBQuKRAkzsePJDCAzCeXTw1oCGAGuY5vFw6DmgA0lPtdi2dTQJ2eewASYDtQkgCD3ceI0akTyNy8t9as5BHO1zPdAoVxBRrIPLTOhB7jJGDbZuuMik61a4NuanKeVFP+KrfvmP7eLkJ16+JGNT7jP34AXOQwDsasy3EAAAAASUVORK5CYII=';
const GRAY = '#8a8a8a';
const BLUE = '#1296db';

class App extends Component {
  state = {
    selectedTab: 'tab1',
    notifCount: 10,
    presses: 0,
  };

  componentWillMount() {
    utils.setTitle('Hacker News');
  }

  render() {
    // icon={{uri: GALLERY_ICON}}
    // selectedIcon={{uri: GALLERY_ICON_SELECTED}}
    // iconStyle={style.icon}

    return (
      <Tabbar position="bottom" tintColor={'#1296db'} style={style.tabbar}>
        <Tabbar.Item
          title="Best"
          selected={this.state.selectedTab === 'tab1'}
          style={{color: GRAY}}
          selectedStyle={{color: BLUE}}
          onPress={() => {
            this.setState({
              selectedTab: 'tab1',
            });
          }}>
          <NewsList type={HN.BEST} />
        </Tabbar.Item>
        <Tabbar.Item
          title="New"
          selected={this.state.selectedTab === 'tab2'}
          style={{color: GRAY}}
          selectedStyle={{color: BLUE}}
          onPress={() => {
            this.setState({
              selectedTab: 'tab2',
            });
          }}>
          <NewsList type={HN.NEW} />
        </Tabbar.Item>
      </Tabbar>
    );
  }
}

const style = {
  tabbar: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    borderTopStyle: 'solid',
    height: 90,
  },
  icon: {
    width: 36,
    height: 36
  }
}

export default App;