import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

export class ProductDetail extends PolymerElement {

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
      .back {
        width: 50px;
        height: 50px;
      }
      .img {
        float: left;
        border: 1px solid black;
        margin-right: 3em;
        margin-bottom: 2em;
        background-color: white;
        padding: 2em;
        height: 400px;
        width: 400px;
      }
      .price {
        clear:both;
      }

      ul.beer-thumbs {
        margin: 0;
        list-style: none;
      }

      ul.beer-thumbs li {
        border: 1px solid black;
        display: inline-block;
        margin: 1em;
        background-color: white;
      }

      ul.beer-thumbs img {
        height: 100px;
        width: 100px;
        padding: 1em;
      }

      ul.specs {
        clear: both;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      ul.specs > li{
        display: inline-block;
        width: 200px;
        vertical-align: top;
      }

      ul.specs > li > span{
        font-weight: bold;
        font-size: 1.2em;
      }

      ul.specs dt {
        font-weight: bold;
      }

      h1 {
        border-bottom: 1px solid gray;
      }
    </style>
        <div id="[[product.productPermalink]]" class="product clearfix">
        <h1 class="name">[[product.productTitle]]</h1>
        <img class="pull-right img" src="/data/[[product.productImage]]">
        <p class="description">[[product.productDescription]]</p>
        <ul class="specs">
          <li>
            <dl>
              <dt>Product Price</dt>
              <dd>[[product.productPrice]] €</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>product Tags</dt>
              <dd>[[product.productTags]]</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>product Options</dt>
              <dd>[[product.productOptions]]</dd>
            </dl>
          </li>
        </ul>
      </div>
    `;
  }

   static get properties() {
    return {
      productpermalink: {
        type: String,
        observer: '_onIdChange',
      },
      product: {
        type: Object,
      },
    };
  }

  async _onIdChange() {
    console.log(this.productpermalink);
    const url = `http://localhost:3000/product/${this.productpermalink}`;
    try {
      const response = await fetch(url);
      this.product = await response.json();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }
}

customElements.define('product-detail', ProductDetail);