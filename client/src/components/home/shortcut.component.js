import React, { Component } from "react";

class Shortcut extends Component {
	constructor(props) {
		super(props);
		this.log = this.log.bind(this);
	  }
    
  log() {
   
  }
  render() {
    return (
      <div class="col-lg-3">
        <aside class="sidebar static">
          <div class="widget">
            <h4 class="widget-title">Shortcuts</h4>
            <ul class="naves">
              <li>
                <i class="ti-user"></i>
                <a href="/friend" title="">
                  friends
                </a>
              </li>
              <li>
                <i class="ti-image"></i>
                <a href="/photo" title="">
                  images
                </a>
              </li>
              <li>
                <i class="ti-video-camera"></i>
                <a href="video" title="">
                  videos
                </a>
              </li>
              <li>
                <i class="ti-comments-smiley"></i>
                <a href="/message" title="">
                  Messages
                </a>
              </li>
              <li>
                <i class="ti-bell"></i>
                <a href="/notification" title="">
                  Notifications
                </a>
              </li>
              <li>
                <i class="ti-power-off"></i>
                <a href="" title="" onClick={this.log}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }
}

export default Shortcut;
