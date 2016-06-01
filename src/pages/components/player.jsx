var React = require("react");
var C = require("../../constants");
var store = require("../../store");
var ReactRedux = require("react-redux");
require('../../yt-player.js');
var scPlayer;
var ytPlayer;
var Player = React.createClass({
  getInitialState: function() {
    return {hidePlayer: true, hideYt: true}
  },
  componentWillReceiveProps: function(track) {

    if(track.tracks.trackData.kind === "sc") {
      this.playSC(track);
      this.hideYT();
    } else if (track.tracks.trackData.kind === "yt") {
      this.playYT(track);
      this.hideSC();
    }

  },
  playYT: function(track) {
    this.state.hidePlayer = false;
    this.state.hideYt = false;
    if(ytPlayer === undefined) {
      (function onYouTubeIframeAPIReady() {
        ytPlayer = new YT.Player('ytPlayer', {
          height: '100',
          width: '160',
          videoId: track.tracks.trackData.id,
          playerVars: {
            'autoplay': 1,
            'controls': 0,
            'rel': 0,
            'showinfo': 0
          },
          frameborder: 0,
          modestbranding: 0,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      })();
    } else {
      ytPlayer.loadVideoById(track.tracks.trackData.id)
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        // something
      }
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }
  },
  playSC: function(track) {
    this.state.hidePlayer = false;
    // if (this.state.playbackInterval) clearInterval(this.state.playbackInterval);
    var widgetIframe = document.getElementById('soundcloud_widget');
    scPlayer = SC.Widget(widgetIframe);
    var trackId = track.tracks.trackData.id;

    scPlayer.bind(SC.Widget.Events.READY, function(){
      scPlayer.load("https://api.soundcloud.com/tracks/"+trackId, {
        auto_play: true
      });
    });

    // player.bind(SC.Widget.Events.FINISH, function() {
    //   clearInterval(that.state.playbackInterval);
    //   that.clickNextTrack();
    // });

    // that.setState({playing: true});
    // this.getCurrentTimeInterval();
  },
  togglePlay: function() {
    var that = this;
    scPlayer.isPaused(function(paused){
      if(paused == true ) {
        that.playTrack();
      } else {
        that.pauseTrack();
      }
    });
  },
  playTrack: function() {
    scPlayer.play();
  },
  pauseTrack: function() {
    scPlayer.pause();
    ytPlayer.pauseVideo();
  },
  hideSC: function() {
    if (!scPlayer) return;
    this.pauseTrack();
  },
  hideYT: function() {
    if (!ytPlayer) return;
    this.pauseTrack();
    this.state.hideYt = true;
  },
  render: function(){
    return (
      <div id="player-containter" className={this.state.hidePlayer ? "hide" : ""}>
        <div id="player">
          <div className="player-image">
            <img src={this.props.tracks.trackData.artwork_url} />
          </div>
          <div className="player-detail">
            <div className="player-interaction">
              <div className="player-controls">
                <button onClick={this.togglePlay}>toggle play</button>
                <button onClick={this.nextTrack}>next track</button>
              </div>
              <div className="player-info">
                <p>{this.props.tracks.trackData.title}</p>
                <p>{this.props.tracks.trackData.artist}</p>
              </div>
            </div>
            <div className="player-progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
        <div id="player-buffer"></div>
        <iframe id="soundcloud_widget" width="100%" height="166" scrolling="no" frameBorder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=true"></iframe>
        <div id="ytPlayer-container" className={this.state.hideYt ? "hide" : ""}><div id="ytPlayer"></div></div>
      </div>
    );
  }
});

module.exports = Player;

var mapStateToProps = function(appState){
	return {
		tracks: appState.tracks
	};
};

module.exports = ReactRedux.connect(mapStateToProps)(Player);
