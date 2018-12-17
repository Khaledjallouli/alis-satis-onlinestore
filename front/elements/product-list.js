import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap';

// We are going to use `beer-list-item`, so we import it
import './product-list-item.js';

export class ProductList extends PolymerElement {

    static get template() {
        return html`
      <style include="granite-bootstrap"></style>
        <div class="products container">
            <div class="field has-addons">
                <div class="control">
                <input style="width:91% !important"
                  type="text" 
                  id="search"  
                  placeholder="Find a product"
                  on-input="_inputChange"
                  class="input">
                </div>
                <div class="control">
                    <a class="button is-info" for="search">
                        Search
                    </a>
                </div>
            </div>
            <div>
                <b>[[currentProducts]]</b> available products
            </div>
        </div> 



        
          <div class="col-md-9">
            <div class="products">
               <template id="productList" is="dom-repeat" items="[[products]]" filter="_productFilter" sort="_beerSorter">
                  <product-list-item 
                      product-permalink="[[item.productPermalink]]"
                      product-title="[[item.productTitle]]" 
                      product-description="[[item.productDescription]]"
                      product-image="[[item.productImage]]"
                      product-price="[[item.productPrice]]">
                  </product-list-item>
                </template>
            </div>
            
          </div>          
        </div>
      </div>

    `;
    }
    static get properties() {
        return {
            products: {
                type: Array,
            },
            currentProducts: {
                type: String,
                computed: '_getCurrentProducts(products, filterText)',
            },
            criterium: {
                type: String,
            },
        }
    }
    constructor() {
        super();

        this.products = [];

        /*this.criteria = [
          { name: "name", label: "Alphabetical"},
          { name: "alcohol", label: "Alcohol content" }
        ];
        this.criterium = this.criteria[0].name;
      */
        this._getData();
    }

    async _getData() {
        try {
            const response = await fetch('http://localhost:3000/products');
            console.log(response);
            this.products = await response.json();
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }

    _inputChange() {
        this.filterText = this.$.search.value;
        this.$.productList.render();
    }
    _productFilter(item) {
        return item.productTitle.match(new RegExp(this.filterText, 'i'));
    }
    _getCurrentProducts() {
        return this.products.filter((item) => this._productFilter(item)).length;
    }

    _beerSorter(a, b) {
        var invert = 1;
        if (this.descendingSort) invert = -1;
        if (a[this.criterium] === b[this.criterium]) return 0;
        if (a[this.criterium] < b[this.criterium]) return -1 * invert;
        if (a[this.criterium] > b[this.criterium]) return 1 * invert;
    }

    /* _sortingChanged() {
    this.criterium = this.$.sort.selectedOptions[0].value;
    this.$.productList.render();
  }

  _descendingChange() {
    this.descendingSort = this.$.descending.checked;
    this.$.productList.render();
  }
  */


}

customElements.define('product-list', ProductList); 