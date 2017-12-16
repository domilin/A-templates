const proxy = require('http-proxy-middleware')

module.exports = {
    port: '8040',
    publicPath: '../',
    proxy: [
        proxy('/community/login/createtoken.do', {
            target: 'http://play.linekong.com',
            changeOrigin: true
        }),
        proxy('/otherServer', {
            target: 'http://IP:Port',
            changeOrigin: true
        })
    ]
}

// 不添加hash图片放在 src/js-not-hash
// 不打包js放在 src/js-not-hash
// ESLint忽略文件 .eslintignore
// Stylelint忽略文件 .stylelintrc-ignoreFiles
