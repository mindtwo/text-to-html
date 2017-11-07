<template>
    <form>
        <div class="form-group">
            <textarea class="form-control" rows="15" v-model="input_main" placeholder="Paste here..."></textarea>
        </div>
        
        <div class="form-group">
            <h3>Results</h3>
            <textarea class="form-control" id="html_output" rows="15" v-model="html_output"></textarea>
        </div>
        
        <div class="form-group">
            <button class="btn btn-block btn-primary btn-lg" data-clipboard-action="copy" data-clipboard-target="#html_output" @click.self.prevent>
                Copy to clipboard
            </button>
        </div>
    </form>
</template>

<script>
    var Clipboard = require('clipboard');

    export default Vue.extend({
        data() {
            return {
                input_main: '',
            };
        },

        created: function(){
            new Clipboard('.btn', {
                text: this.html_output
            });
        },

        computed: {
            html_output: function () {
                return this.formatText(this.input_main);
            },
        },

        methods: {
            formatText (value) {
                let output = value.split('\n');

                // Remove empty lines
                output = _.reject(output, function(o) { 
                    let empty_values = ['', ' ', '<p></p>', '<p> </p>', false];
                    return (empty_values.indexOf(o) === -1) ? false : true;
                });

                // Remove whitespace
                output = _.map(output, function(o) {
                    o = o.trim();
                    o = o.replace( / {2,}/g, ' ' );
                    return o;
                });

                // Wrap with p tag
                output = _.map(output, function(o) {
                    return "<p>"+o+"</p>";
                });

                return _.join(output, '\n');
            },
        }
    });
</script>
