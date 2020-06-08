import Vue from 'vue';
import TextToHTML from './components/TextToHTML.vue';

const app = new Vue({
    el: '#app',
    components: {
        'text-to-html': TextToHTML
    }
});
