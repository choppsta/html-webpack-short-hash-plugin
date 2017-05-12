class HtmlShortHashPlugin {
    constructor(options) {
        this.data = Object.assign({
            length: 6 // the desired length of the hash
        }, options);
    }

    apply(compiler) {
        var self = this;
        compiler.plugin('compilation', function(compilation) {
            // html-webpack-plugin-alter-asset-tags
            // html-webpack-plugin-after-html-processing
            compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
                ['css', 'js'].forEach(function(key) {
                    if (!htmlPluginData.assets[key]) return;
                    htmlPluginData.assets[key].forEach(function(url, index) {
                        if (url.indexOf('?') === -1) return;
                        var [path, hash] = url.split('?');
                        htmlPluginData.assets[key][index] = path+'?'+hash.substr(0, self.data.length);
                    }.bind(this));
                });
                callback(null, htmlPluginData);
            });
        });
    }
}

module.exports = HtmlShortHashPlugin;
