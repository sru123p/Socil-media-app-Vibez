import React from 'react'
import Createpost from './createpost'
import Navbar from '../../Navbar'
import Navt from '../profile/navshow'
import Shortcut from '../shortcut'
function FinalProfile() {
    return (
    <div>
      <Navbar/>
      <Navt/>
          <div class="gap gray-bg">
			        <div class="container-fluid">
				          <div class="row">
					            <div class="col-lg-12">
						            <div class="row" id="page-contents">
                                        <Shortcut/>
                            <Createpost/>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
    )
}

export default FinalProfile