
import React, { Component } from 'react';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import VideoDetail from './components/video_detail'
import _ from 'lodash'

const API_KEY = 'AIzaSyBaTnfwdb_QbEPvd6h-om8AMCixehXYedo'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       videos: [],
       selectedVideo : null
      }

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
    this.setState({
      videos: videos,
      selectedVideo: videos[0] 
    });
  });
}



  render() {
    return(
       <div>
          <SearchBar onSearchTermChange={_.debounce(term => {this.videoSearch(term)}, 300)}/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList  
            onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
            videos={this.state.videos} />
       </div>
    );
  };
}
export default App;