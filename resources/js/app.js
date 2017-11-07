window._ = require('lodash');
window.Vue = require('vue');

const app = new Vue({
    el: '#app',
    components: {
        'text_to_html': require('./components/TextToHTML.vue'),
    }
});
