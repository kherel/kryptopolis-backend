import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import fs from 'fs';
import insert from 'gulp-insert';
import replace from 'gulp-replace';

const $ = gulpLoadPlugins();

gulp.task('default', () => {

});
