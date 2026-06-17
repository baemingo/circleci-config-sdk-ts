import path from 'path';
import webpack from 'webpack';

const cwdNodeModules = path.resolve(__dirname, 'node_modules');

export const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: (modulePath: string): boolean => {
          return modulePath.endsWith('.ts') && !modulePath.endsWith('test.ts');
        },
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: 'tsconfig.webpack.json' },
          },
        ],
        exclude: function (modulePath) {
          // Excludes node_modules strictly inside cwd
          return modulePath.startsWith(cwdNodeModules) && /node_modules/.test(modulePath);
        },
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'CircleCI',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
};

export default config;
