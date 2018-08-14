/**
l2t-paper-color-picker uses `dom-repeat` and `paper-radio-group` to display an arroy of color options

### Example:

    <l2t-paper-color-picker></l2t-paper-color-picker>

### Styling
The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--l2t-paper-color-picker-padding` | padding between each radio button | `6px`

@group l2t Paper Elements
@element l2t-paper-color-picker
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '../@polymer/polymer/polymer-element.js';

import '../@polymer/paper-radio-group/paper-radio-group.js';
import '../@polymer/paper-button/paper-button.js';
import './l2t-paper-color-radio.js';
import { html } from '../@polymer/polymer/lib/utils/html-tag.js';
class L2tPaperColorPicker extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        --paper-radio-group-item-padding: var(--l2t-paper-color-picker-padding, 6px);
      }
      .grid {
        display: inline-flex;
        flex-wrap: wrap;
        margin: 0 auto;
      }
    </style>

    <paper-radio-group selected="{{color}}" attr-for-selected="color" selectable="l2t-paper-color-radio" class="grid">
      <template is="dom-repeat" items="[[colors]]">
        <l2t-paper-color-radio color="[[item]]"></l2t-paper-color-radio>
      </template>
    </paper-radio-group>
`;
  }

  static get is() { return 'l2t-paper-color-picker'; }
  static get properties() {
    return {
      /**
      * colors: array to store color values
      */
      colors: {
        type: Array,
        notify: true,
        value: ['#db4437','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#607d8b']
      },
      /**
      * color: string to store selected color value
      */
      color: {
        type: String,
        notify: true
      },
    };
  }
  /**
  * _setDefaultColor: method to set the first item as checked is no default is present
  */
  _setDefaultColor() {
    if(!this.colors.includes(this.color)){
      this.color = this.colors[0];
    }
  }
  /**
  * ready: call _setDefaultColor when ready
  */
  ready() {
    super.ready()
    var this$ = this;
    setTimeout(function(){
      this$._setDefaultColor() ;
    },0)
  }
}

window.customElements.define(L2tPaperColorPicker.is, L2tPaperColorPicker);
