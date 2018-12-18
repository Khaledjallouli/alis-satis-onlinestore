// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class AddProduct extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
        
<div style="margin:10%;margin-top:4%">
    <div class="col-md-12">           
        <h3 style="text-align:center"> Add a Product</h3> <br>  
    </div>

<div  >
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Product Permalink</label>
        <input type="text" class="form-control" id="productPermalink" placeholder="Product Permalink" name="productPermalink" required>
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Product Title</label>
        <input type="text" class="form-control" id="productTitle" placeholder="Product Title" name="productTitle" required >
      </div>
    </div>
    
    <div class="form-row">
        <div class="form-group col-md-5">
            <label for="inputState" >Product Options</label>
            <select id="productOptions" class="form-control" name ="productOptions">
              <option selected>Choose...</option>
              <option value="Green" >Green</option>
              <option value="Blue" >Blue</option>
              <option value="Red" >Red</option>
              <option value="White" >White</option>
            </select>
          </div>

      <div class="form-group col-md-5">
        <label for="inputState" >Product Tags</label>
        <select id="productTags" class="form-control" name ="productTags">
          <option selected>Choose...</option>
          <option value="panel" >Panel</option>
          <option value="cap" >Cap</option>
          <option value="organic" >Organic</option>
          <option value="ranger" >Ranger</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">Price</label>
        <input type="number" class="form-control" id="productPrice" name="productPrice">
      </div>
    </div>
    <div class="form-group">
        <label for="exampleFormControlFile1">Product Image</label>
        <input type="file" class="form-control-file" id="productImage" name="productImage"  accept="image/png, image/jpeg, image/gif, image/jpg">
      </div>
    <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea class="form-control" id="productDescription" rows="3" name="productDescription" placeholder="Describe your product"></textarea>
      </div>
    <div class="form-group">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="productPublished" name="productPublished">
        <label class="form-check-label" for="gridCheck">
            Publish Product
        </label>
      </div>
    </div>
    <button id="login-form" class="btn btn-primary" on-click="_sendData">Sign in</button>
  </div>
</div>


    `;
  }
 /* static get properties() {
    return {
        form: {
            type: FormData,
        },
    }
}
constructor() {
 
  form = new FormData(document.getElementById('login-form'));
  fetch("/clicked", {
    method: "POST",
    body: form
  })

}
*/


_sendData() {
    const produit =  {
        productPermalink: this.$.productPermalink.value ,
          productTitle : this.$.productTitle.value,
          productPrice : this.$.productPrice.value ,
          productDescription : this.$.productDescription.value , 
          productPublished : this.$.productPublished.value , 
          productTags :this.$.productTags.value,
          productOptions : this.$.productOptions.value , 
          productImage : this.$.productImage.value ,
       
    };
    console.log ('product', produit)
    fetch('http://localhost:3000/post-product', 
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
        }, 
        body: JSON.stringify(produit)
      })
    .then(function(response) {
      if(response.ok) {
        console.log('product was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
    /*https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch*/ 


}



}

// Associate the new class with an element name
customElements.define('add-product', AddProduct);