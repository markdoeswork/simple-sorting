/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm.js'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'
import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import _ from 'lodash'
import autofocus from 'vue-autofocus-directive';

Vue.component('v-select', vSelect);
Vue.use(VueResource);
Vue.use(TurbolinksAdapter);
Vue.directive('autofocus', autofocus);

document.addEventListener('turbolinks:load', () => {

    Vue.http.headers.common["X-CSRF-Token"] = document.querySelector('meta[name="csrf-token"]').getAttribute("content")

  var element = document.getElementById("boards")

  if(element != null){

    var products = JSON.parse(element.getAttribute('data-products'));

    var app = new Vue({
        el: element,
        components: {
          Multiselect
        },
        data: function(){
          return { 
            products: products,
            testArray: [],
            yaMother: {},
            scan: null,
            qty: "1",
            scannedItems: []
          }
        },
        methods: {
          //${Object.keys(this.yaMother).length}
          addItem: function(){
            if ( !this.scan ) {
              this.scan = null;
              this.$refs.scan.focus();
            } else {
            this.scannedItems.push({ scan: this.scan });
            if ( !this.yaMother[this.scan] ) {
            _.setWith(this.yaMother, `[${this.scan}]["qty"]`, 1, Object);
            _.setWith(this.yaMother[this.scan], ["spot"], Object.keys(this.yaMother).length, Object);
            this.testArray.push({ 'product': this.scan, 'qty': 1} )
            } else {
            this.yaMother[this.scan].qty += 1;
            this.testArray.find( fruit => fruit.product === `${this.scan}` ).qty += 1;
            }
            this.scan = null;
            this.$refs.scan.focus();
          }
        }
        },
        computed: {
          awesome(){
            if ( !this.scannedItems.slice().reverse()[0] ) {
              return "Press Enter to submit";
            } else {
              var firstScan = this.scannedItems.slice().reverse()[0].scan;
              return `Position: ${this.yaMother[firstScan].spot}`;
            }
          },
          awesometwo(){
            if ( !this.scannedItems.slice().reverse()[0] ) {

            } else {
              return `${this.scannedItems.slice().reverse()[0].scan}`;
            }
          },
          findTest(){
            //const result = inventory.find( fruit => fruit.name === 'cherries' );
            return this.testArray.find( fruit => fruit.product === 'yeet' );
          },
          scanOrder() {
            return this.scanned.slice().reverse();
          }
        }
    });

  }
});

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the using turbolinks, install 'vue-turbolinks':
//
// yarn add 'vue-turbolinks'
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })