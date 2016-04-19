var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var unprefix = require('postcss-unprefix');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var del = require('del');
var Server = require('karma').Server;
var GulpSSH = require('gulp-ssh');
var zip = require('gulp-zip');
var slack = require('gulp-slack')({
    url: 'https://hooks.slack.com/services/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',
    channel: '#frontend-build',
    user: 'gulp build',
    icon_emoji: ':rocket:'
});

var config = {
    host: 'littlefunnyapp.com',
    port: 22,
    username: 'maxbook',
    password: 'Max150409'
}

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

function handleError(err) {
    console.log(err.message);
    this.emit('end');
}

var files = {
    dev: {
        css: 'src/assets/css',
        indexHtml: 'src/index.html',
        js: 'src/app'
    },
    dist: {
        css: 'dist/assets/css',
        js: 'dist/app',
        indexHtml: 'dist/index.html',
        assets: {
            img: 'dist/assets/img'
        }
    },
    less: [
        'src/assets/less/reset.less',
        'src/assets/less/variables_mixins.less',
        'src/assets/less/typography.less',
        'src/assets/less/layout.less',
        'src/assets/less/master.less',
        'src/app/partials/**/*.less',
        'src/app/components/**/*.less',
        'src/app/common/directives/**/*.less'
    ],
    html: [
        'src/*.html',
        'src/app/partials/**/*.html',
        'src/app/components/**/*.html',
        'src/app/common/directives/**/*.html'
    ],
    angularTemplate: [
        'src/app/**/*.html',
        'src/app/**/*.html',
        'src/app/common/**/*.html'
    ],
    js: [
        'src/app/app.module.js',
        'src/app/app.routes.js',
        'src/app/*.js',
        'src/app/components/**/*.js',
        'src/app/common/**/*.js'
    ],
    assets: {
        img: [
            'src/assets/img/**/*'
        ]
    }
}

gulp.task('connect', function() {
    connect.server({
        root: ['src'],
        livereload: true,
        fallback: files.dev.indexHtml
    });
});

gulp.task('test', function(done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('reload', function() {
    gulp.src(files.dev.indexHtml)
        .pipe(connect.reload());
});

gulp.task('less', function() {
    return gulp.src(files.less)
        .pipe(concat('master.css'))
        .pipe(less())
        .on('error', handleError)
        .pipe(postcss([
            unprefix,
            autoprefixer({
                browsers: ['last 3 version']
            })
        ]))
        .pipe(cssnano())
        .pipe(gulp.dest(files.dev.css));
});

gulp.task('assets', () => {
    return gulp.src(files.assets.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(files.dist.assets.img));
});

gulp.task('inject-dependency', function() {
    var sources = files.js;
    sources.push(files.dev.css + '/*.css');
    return gulp.src(files.dev.indexHtml)
        .pipe(inject(gulp.src(sources, {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('build:angular-template-cache', function() {
    return gulp.src(files.angularTemplate)
        .pipe(templateCache({
            filename: 'app.templates.js',
            module: 'app',
            root: 'app/'
        }))
        .pipe(gulp.dest('src/app'));
});

gulp.task('build:inject-dependency', function() {
    return gulp.src(files.dev.indexHtml)
        .pipe(inject(gulp.src([files.dev.css + '/*.css', files.dev.js + '/app.min.js'], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:concat-src', function() {
    return gulp.src(files.dist.indexHtml)
        .pipe(useref({
            searchPath: 'src'
        }))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:script', function() {
    return gulp.src(files.js)
        .pipe(ngAnnotate())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(files.dev.js));
});

gulp.task('build:del-tmp', function() {
    del(['src/app/app.min.js']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('build:del-previous', function() {
    del(['src/app/app.min.js', 'dist']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('deploy', function() {
    return gulp.src('dist/**/*')
        .pipe(gulpSSH.dest('/home/maxbook/production/static/abibao-mvp/dist/'));
});

gulp.task('deploy:slack', function() {
    slack([{
        'fallback': 'Dernière build disponible !',
        'pretext': 'Dernière build disponible !',
        'fields': [{
            'title': 'Url du site',
            'value': 'Voir l\'application <http://abibao.littlefunnyapp.com|ici>'
        },{
            'title': 'Zip de la build',
            'value': 'À télécharger <http://abibao.littlefunnyapp.com/dist.zip|ici>'
        }]
    }]);
});

gulp.task('build:zip', function() {
    return gulp.src('dist/**/*')
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(callback) {
    runSequence(
        // 'test',
        'build:del-previous',
        'build:angular-template-cache',
        'build:script',
        'build:inject-dependency',
        'build:concat-src',
        'build:del-tmp',
        'assets',
        'build:zip',
        'deploy',
        'deploy:slack',
        callback
    );
});

gulp.task('build:dev', function(callback) {
    runSequence(
        'build:del-previous',
        'less',
        'inject-dependency',
        callback
    );
});

gulp.task('development', ['build:dev', 'connect'], function() {
    gulp.watch(files.less, function(callback) {
        runSequence(
            'less',
            'reload'
        );
    });
    gulp.watch(files.html, ['build:angular-template-cache', 'reload']);
    gulp.watch(files.js, function(callback) {
        runSequence(
            'inject-dependency',
            'reload'
            // 'test'
        );
    });
});

gulp.task('default', ['development']);
