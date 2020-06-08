<template>
    <form>
        <div class="form-group">
            <textarea class="form-control" rows="15" v-model="textInput" style="overflow:hidden;" contenteditable="true" placeholder="Paste here..."></textarea>
        </div>
        
        <div class="form-group">
            <h3>Results</h3>
            <textarea class="form-control" id="html_output" rows="15" v-model="htmlOutput"></textarea>
        </div>
        
        <div class="form-group">
            <button class="btn btn-block btn-primary btn-lg" data-clipboard-action="copy" data-clipboard-target="#html_output" @click.self.prevent>
                Copy to clipboard
            </button>
        </div>
    </form>
</template>

<script>
    import Clipboard from 'clipboard';
    import { reject, map, join } from 'lodash';

    export default {
        data() {
            return {
                textInput: '',
            };
        },

        created: function(){
            new Clipboard('.btn', {
                text: this.htmlOutput
            });
        },

        computed: {
            htmlOutput: function () {
                return this.formatText(this.textInput);
            },
        },

        methods: {
            formatText (value) {
                let output = value.split('\n');

                // Remove empty lines
                output = reject(output, function(o) { 
                    let empty_values = ['', ' ', '<p></p>', '<p> </p>', false];
                    return (empty_values.indexOf(o) === -1) ? false : true;
                });

                // Remove whitespace
                output = map(output, function(o) {
                    o = o.trim();
                    o = o.replace( / {2,}/g, ' ' );
                    return o;
                });

                // Wrap with p tag
                output = map(output, function(o) {
                    return "<p>"+o+"</p>";
                });

                return join(output, '\n');
            },
        }
    }
</script>
