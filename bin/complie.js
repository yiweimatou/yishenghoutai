import fse from 'fs-extra'
import webpackConfig from '../webpack.config'
import webpackCompiler from './webpack-compiler'
import path from 'path'

console.log('app:bin:compile')

;
(async() => {
    try {
        console.log('compile start...')
        fse.removeSync(path.join(__dirname, '../', 'dist', '/*'))
        console.log('clean up dist folder')
        const stats = await webpackCompiler(webpackConfig)
        if (stats.warnings.length) {
            console.log('Config set to fail on warning, exiting with status code "1".')
            process.exit(1)
        }
        fse.copySync(path.join(__dirname, '../', '/static'), path.join(__dirname, '../', '/dist'))
        console.log('Copy static assets to dist folder.')
    } catch (e) {
        console.log('Compiler encountered an error.', e)
        process.exit(1)
    }
})()