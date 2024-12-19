import {src,dest,watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'


const sass=gulpSass(dartSass)

export function css(done){
    src('src/main/resources/static/styles/scss/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(dest('src/main/resources/static/styles/css'))
    done();
}

export function dev(){
    watch('./src/main/resources/static/styles/scss/**/*.scss',css);
}

