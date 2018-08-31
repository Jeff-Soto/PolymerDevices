/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import "@polymer/iron-ajax/iron-ajax";
import "@vaadin/vaadin-grid/vaadin-grid.js";
import "@vaadin/vaadin-button/vaadin-button.js";
import "@polymer/app-route/app-route.js";

class Devices extends PolymerElement {

  static get properties() {
    return {
      devices: {
        type: Array,
        value: []
      },
      route: Object,
      routeData: {
        type: Object,
        observer: "_onRouteDataChanged"
      },
      subroute: Object
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
      </style>

      <iron-ajax
        auto
        url="http://localhost:3000/api/devices"
        on-response="handleResponse"
        on-error="handleError" ></iron-ajax>

        <iron-ajax
          id="fetchDeviceAjax"
          on-response="handleSingleDeviceResponse"
          on-error="handleSingleDeviceError" ></iron-ajax>

        <app-route route="{{route}}" pattern="/:deviceId" data="{{routeData}}">
        </app-route>

        <!-- The array is set as the <vaadin-grid>'s "items" property -->
        <vaadin-grid aria-label="Basic Binding Example" items="[[devices]]">

          <vaadin-grid-column width="60px" flex-grow="0">
            <template class="header">ID #</template>
            <template>[[item.id]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column>
            <template class="header">Name</template>
            <template>[[item.name]]</template>
          </vaadin-grid-column>

          <vaadin-grid-column width="8em">
            <template class="header">Action</template>
            <template>
              <vaadin-button on-click="viewDevice">View Device</vaadin-button>
            </template>
          </vaadin-grid-column>

        </vaadin-grid>

    `;
  }

  // Event handler for the all devices GET request
  handleResponse(e) {
    this.devices = e.detail.__data.response;
  }

  // Error handler for all devices GET request, logging for now.
  handleError(e) {
    console.log(e);
  }

  // Event handler for the View Device button click event.
  viewDevice(e) {
    // take data from button event and assign it to our device prop
    this.device = e.model.item;
    // change the url to subroute with device ID
    window.myRouter.navigate('devices/' + this.device.id);
  }

  // Observer for Route Data. Will fire whenever route data is changed.
  _onRouteDataChanged() {
    // create Device ID and set it equal to the routeData's ID
    const deviceID = this.routeData.deviceId;
    // conditionally set URL and fire AJAX for single device
    if (deviceID){
      this.$.fetchDeviceAjax.url = "http://localhost:3000/api/devices/" + deviceID;
      this.$.fetchDeviceAjax.generateRequest();
    }
  }

  // Event handler for single device GET reuest
  handleSingleDeviceResponse(e) {
    // set this components device to equal the response.
    this.device = e.detail.__data.response;
    // conditionally set show dialog box and change url
    if(this.device){
      this.showDialog = true;
      window.myRouter.navigate('devices/' + this.device.id);
    }
  }
}

window.customElements.define('my-devices', Devices);
