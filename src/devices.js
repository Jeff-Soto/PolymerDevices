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

class Devices extends PolymerElement {

  static get properties() {
    return {
      devices: {
        type: Array,
        value: []
      }
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
              <vaadin-button>View Device</vaadin-button>
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
}

window.customElements.define('my-devices', Devices);
