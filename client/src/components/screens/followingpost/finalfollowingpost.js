import React from 'react'
import Followingpost from './SubscribesUserPosts'
import Navbar from '../../Navbar'
import Shortcut from '../shortcut'
function Homefinal() {
    return (
    <div>
      <Navbar/>
          <div class="gap gray-bg">
			        <div class="container-fluid">
				          <div class="row">
					            <div class="col-lg-12">
						            <div class="row" id="page-contents">
                                        <Shortcut/>
                            <Followingpost/>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
      <div class="side-panel">
        <h4 class="panel-title">Account Setting</h4>
        <form method="post">
          <div class="setting-row">
            <span><a href="edit-profile-basic.html" title="">My Profile</a></span>	
          </div>
          <div class="setting-row">
            <span><a href="edit-password.html" title="">Edit Password</a></span>
            
          </div>
        </form>
	    </div>
    </div>
    )
}

export default Homefinal