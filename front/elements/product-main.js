import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import './product-list';
import './product-detail';

export class ProductMain extends PolymerElement {

    static get template() {
    return html`
          <style include="granite-bootstrap"></style>

          <app-location route="{{route}}" use-hash-as-path></app-location>

<app-route route="[[route]]" pattern="/products" active="{{productListActive}}"></app-route>
<app-route route="[[route]]" pattern="/product/:productPermalink" data="{{productId}}" active="{{productIdActive}}"></app-route>

     
      <template is="dom-if" if="{{productListActive}}">
        <product-list></product-list>
      </template>
      
      <template is="dom-if" if="{{productIdActive}}">
       
          <product-detail productpermalink={{productId.productPermalink}}></product-detail>

      </template>
    `;
  }


static get properties() {
    return {
      productListActive: {
        type: Boolean,
      },
      productIdActive: {
        type: Boolean,
      },
      route: {
        type: Object,
      },
    };
  }

    connectedCallback() {
    super.connectedCallback();

    if (!this.route.path) {
      this.route = { ... this.route, path: '/products' }
    }
  }
}
customElements.define('product-main', ProductMain);