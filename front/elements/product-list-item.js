// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class ProductListItem extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .product {
          margin: 10px;
          padding: 10px;
          border: solid 1px black;
          border-radius: 10px;
          min-height: 150px;
        }
        .el-img {
          max-height: 100px;
        }
        .el-price {
          clear:both;
        }
      </style>
<div class="card" id="[[productPermalink]]" >
  <div class="card-image">
    <figure>
      <img src="/data/[[productImage]]" alt="Placeholder image" width="150px" height="150px">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4"> <a href="#/product/[[productPermalink]]"> [[productTitle]]</a></p>
      </div>
    </div>
    <div class="content">
      [[productPrice]] €
    </div>
  </div>
</div>


    `;
  }

 static get properties() {
    return {
      productPermalink: {
        type: String,
      },
      productTitle: {
        type: String,
      },
      productDescription: {
        type: String,
      },
      productImage: {
        type: String,
      },
      productPrice: {
        type: String,
      },
      productPublished: {
        type: String,
      },
      productTags: {
        type: String,
      },
      productOptions: {
        type: String,
      },
      
    }
  }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
    console.log('my-element created!');
  }

  ready() {
    super.ready();
    console.log('my-element is ready!');
  }
}

// Associate the new class with an element name
customElements.define('product-list-item', ProductListItem);