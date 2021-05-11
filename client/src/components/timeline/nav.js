import React, { Component } from "react";
import { createBrowserHistory } from "history";
class Nav extends Component {
	constructor(props) {
		super(props);
		this.log = this.log.bind(this);
		// const auth=this.context;
		// var id=auth.userId;
	  }
	  log() {
	  }
	  render() {
    return (
        <div>
            <div class="theme-layout">
            <div class="feature-photo">
				<figure><img src="template/images/resources/timeline-1.jpg" alt=""/></figure>
				<div class="add-btn">
					<span>1205 followers</span>
					<a href="#" title="" data-ripple="">Add Friend</a>
				</div>
				<form class="edit-phto">
					<i class="fa fa-camera-retro"></i>
					<label class="fileContainer">
						Edit Cover Photo
					<input type="file"/>
					</label>
				</form>
				<div class="container-fluid">
					<div class="row merged">
						<div class="col-lg-2 col-sm-3">
							<div class="user-avatar">
								<figure>
									<img src="template/images/resources/user-avatar.jpg" alt=""/>
									<form class="edit-phto">
										<i class="fa fa-camera-retro"></i>
										<label class="fileContainer">
											Edit Display Photo
											<input type="file"/>
										</label>
									</form>
								</figure>
							</div>
						</div>
						<div class="col-lg-10 col-sm-9">
							<div class="timeline-info">
								<ul>
									<li class="admin-name">
									  <h5>Janice Griffith</h5>
									</li>
									<li>
										<a class="" href="" onClick={this.log} title="" >time line</a>
										<a class="" href="photo" title="" data-ripple="">Photos</a>
										<a class="" href="video" title="" data-ripple="">Videos</a>
										<a class="active" href="friend" title="" data-ripple="">Friends</a>										
										<a class="" href="/about" title="" data-ripple="">about</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
            </div>
        </div>
    )}
}	
export default Nav
