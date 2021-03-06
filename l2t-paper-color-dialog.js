/**
l2t-paper-color-dialog uses `paper-dialog` to show l2t-paper-color-picker and l2t-paper-color-advanced

### Example:

    <l2t-paper-color-dialog></l2t-paper-color-dialog>

### Styling
The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--l2t-paper-color-dialog-background` | Background color of the dialog box | `--light-theme-background-color`
`--l2t-paper-color-dialog-max-width` | Max width of dialog | `422px`
`--l2t-paper-color-dialog-max-height` | Max height of dialog | `422px`
`--l2t-paper-color-dialog-min-width` | Min width of dialog | `211px`
`--l2t-paper-color-dialog-min-height` | Min height of dialog | `211px`

@group l2t Paper Elements
@element l2t-paper-color-dialog
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '../@polymer/polymer/polymer-element.js';

import '../@polymer/paper-button/paper-button.js';
import '../@polymer/paper-dialog/paper-dialog.js';
import './l2t-paper-color-picker.js';
import './l2t-paper-color-advanced.js';
import { html } from '../@polymer/polymer/lib/utils/html-tag.js';
class L2tPaperColorDialog extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        --l2t-paper-color-advanced-prev-width: 211px;
        --l2t-paper-color-advanced-prev-height: 211px;
      }
      paper-dialog {
        padding: 0 12px;
        background-color: var(--l2t-paper-color-dialog-background, var(--light-theme-background-color));
      }
      .container {
        max-width: var(--l2t-paper-color-dialog-max-width, 422px);
        min-width: var(--l2t-paper-color-dialog-min-width, 211px);
        max-height: var(--l2t-paper-color-dialog-max-height, 422px);
        min-height: var(--l2t-paper-color-dialog-min-height, 211px);
        padding: 0;
        margin: 0;
      }
      .container .section-wrapper {
        display: flex;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        width: 100%;
        padding-top: 12px;
      }
      .container section{
        opacity: 0;
        pointer-events: none;
        will-change: opacity;
        transition: opacity 0.3s cubic-bezier(.25,.8,.25,1);
      }
      .container section[active] {
        pointer-events: auto;
        opacity: 1;
        transition-delay: 0.15s;
      }
      .container section.picker {
        position: absolute;
      }
      .button-tray {
        display: flex;
      }
      .button-tray .spacer {
        flex-grow: 1;
      }
    </style>
    <paper-dialog modal="">
      <div class="container">
        <div class="section-wrapper">
          <section active="" class="picker">
            <l2t-paper-color-picker color="{{color::color-changed}}" colors="{{colors}}"></l2t-paper-color-picker>
          </section>
          <section class="advanced">
            <l2t-paper-color-advanced color="{{color::color-changed}}"></l2t-paper-color-advanced>
          </section>
        </div>
        <div class="button-tray">
          <paper-button data-push="false" dialog-dismiss="" on-tap="_dialogClosed" class="dismiss-button">Cancel</paper-button>
          <div class="spacer"></div>
          <paper-button class="advance-toggle" hidden\$="[[hideAdvanced]]" on-tap="_toggleSection">Advanced</paper-button>
          <paper-button data-push="true" dialog-confirm="" on-tap="_dialogClosed" class="confirm-button">OK</paper-button>
        </div>
      </div>
    </paper-dialog>
`;
  }

  /**
  * Fired when the dialog box is closed.
  *
  * @event paper-color-dialog-closed
  */
  static get is() { return 'l2t-paper-color-dialog'; }
  static get properties() {
    return {
      /**
      * color: string to store hex color value
      */
      color: {
        type: String
      },
      /**
      * colors: array to store list of colors
      */
      colors: {
        type: Array,
        notify: true
      },
      /**
      * hideAdvanced: boolean to hide advance button
      */
      hideAdvanced: {
        type: Boolean,
        value: false
      }
    };
  }
  /**
  * _hideSections: hide all sections
  */
  _hideSections() {
    var sections = this.shadowRoot.querySelectorAll('section');
    var toggleButton = this.shadowRoot.querySelector('.advance-toggle');

    for(let i = 0; i < sections.length; i++){
      sections[i].removeAttribute('active');
    }
    toggleButton.innerHTML = "";
  }
  /**
  * _toggleSection: changes between advanced and basic state
  */
  _toggleSection() {
    var sections = this.shadowRoot.querySelectorAll('section');
    var toggleButton = this.shadowRoot.querySelector('.advance-toggle');

    for(let i = 0; i < sections.length; i++){
      if(sections[i].getAttribute('active') != null) {
        sections[i].removeAttribute('active');
      } else {
        sections[i].setAttribute('active','');
      }
    }
    if(toggleButton.innerHTML == "Advanced") {
      toggleButton.innerHTML = "Basic";
    } else {
      toggleButton.innerHTML = "Advanced";
    }
  }
  /**
  * _setSelection: method to choose between basic and advanced sections on open
  */
  _setSelection() {
    if(this.colors.includes(this.color) || this.hideAdvanced){
      this.setBasic();
    } else {
      this.setAdvanced();
    }
  }
  /**
  * _dialogClosed: fires an event on dialog close, detail is true or false depending on whether the close was a confirm or not
  */
  _dialogClosed(e) {
    this.dispatchEvent(new CustomEvent('paper-color-dialog-closed', { bubbles: true, composed: true, 'detail': (e.target.dataset.push === 'true') }));
  }
  /**
  * open: method to open the dialog
  */
  open() {
    this._setSelection();
    this.shadowRoot.querySelector('paper-dialog').open();
  }
  /**
  * setBasic: method to set basic section as active
  */
  setBasic() {
    this._hideSections();
    var section = this.shadowRoot.querySelector('section.picker');
    var toggleButton = this.shadowRoot.querySelector('.advance-toggle');
    section.setAttribute('active',"");
    toggleButton.innerHTML = "Advanced";
  }
  /**
  * setAdvanced: method to set advanced section as active
  */
  setAdvanced() {
    this._hideSections();
    var section = this.shadowRoot.querySelector('section.advanced');
    var toggleButton = this.shadowRoot.querySelector('.advance-toggle');
    section.setAttribute('active',"");
    toggleButton.innerHTML = "Basic";
  }
}

window.customElements.define(L2tPaperColorDialog.is, L2tPaperColorDialog);
