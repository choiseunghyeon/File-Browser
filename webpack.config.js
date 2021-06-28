const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    },
    // Webpack의 출력물에서 디버깅을 하기위해 소스 맵을 허용합니다.
    devtool: "source-map",
    devServer: {
        contentBase: './',
        hot: true,
    },
    
    plugins: [  
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
    ],

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            }
        ]
    },
    
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.tsx', '.css'],
    },

    // 경로가 다음 중 하나와 일치하는 모듈을 가져올 때,
    // 해당 전역 변수가 있다고 가정하고 사용합니다.
    // 브라우저가 빌드간에 라이브러리를 캐시 할 수 있도록
    // 모든 의존성을 묶지 않아도 되기 때문에 중요합니다.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};