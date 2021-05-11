import React from "react";
import back from './404.jpg'
function notfount() {
  return (
    <div class="theme-layout">
      <div class="container-fluid pdng0">
        <div class="row">
          <div class="col-lg-12">
            <div class="error-page">
              <div
                class="bg-image"
                style={{ backgroundImage:`url(${back})`}}
              ></div>
              <div class="error-meta">
                <h1>whoops!</h1>
                <span>we couldn't find that page </span>
                <a href="/" title="" data-ripple="">
                  Go Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default notfount;
