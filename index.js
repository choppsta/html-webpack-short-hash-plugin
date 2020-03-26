const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlShortHashPlugin {
    constructor(options) {
        this.cnf = {
            length: 6, // the desired length of the hash
            ...options
        };
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlShortHashPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('HtmlShortHashPlugin', (data, cb) => {
                Object.keys(data.assetTags).forEach(key => {
                    data.assetTags[key].forEach(tag => {
                        const attr = tag.attributes && tag.attributes.src ? 'src' : (tag.attributes && tag.attributes.href && 'href');
                        if (!attr || !tag.attributes[attr].includes('?')) return;
                        const [path, hash] = tag.attributes[attr].split('?');
                        tag.attributes[attr] = path+'?'+hash.substr(0, this.cnf.length);
                    });
                });

                cb(null, data);
            });
        });
    }
}

module.exports = HtmlShortHashPlugin
