// FULL CONFIG FILE!
module.exports = function(grunt) {

  // Плагины для imagemin
  const imageminMozjpeg = require('imagemin-mozjpeg');
  const imageminOptipng = require('imagemin-optipng');
  const imageminGifsicle = require('imagemin-gifsicle');
  const imageminSvgo = require('imagemin-svgo');

  grunt.initConfig({
    // CLEAN
    clean: {
      files: ['dist','src/inc', 'src/*.html']
    },
    // WATCH
    watch: {
      files: ['src/**/*.*'],
      tasks: ['less', 'pug', 'newer:copy', 'uglify']
    },
    // LESS
    less: {
      options: {
        sourceMap: true,
        compress: true,
        plugins: [
          new(require('less-plugin-autoprefix'))({ browsers: ["last 2 versions", "ie 10", "ie 11"] })
        ]
      },
      dev: {
        files: {
          'dist/css/styles.css': 'src/less/_import.less'
        }
      }
    },
    // PUG
     pug: {
      compile: {
        options: {
            pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: 'src/pug/',
          src: ['**/*.pug', '!**/includes/**', '!**/templates/**'],
          dest: 'dist/',
          ext: ".html"
        }]
      }
    },
    // UGLIFY
    uglify: {
      options: {
        mangle: false
      },
      dev: {
        files: {
          'dist/js/scripts.js': [
            'src/js/jquery.min.js',
            'src/js/pushy.min.js',
            'src/js/jquery.fancybox.min.js',
            'src/js/custom.js'
          ]
        }
      }
    },
    // BROWSERSYNC
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'dist/css/*.css',
            'dist/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: './dist'
        }
      }
    },
    // COPY
    copy: {
      fonts: {
        expand: true,
        cwd: 'src/fonts',
        src: '**',
        dest: 'dist/fonts/',
      },
      images: {
        expand: true,
        cwd: 'src/images',
        src: '**',
        dest: 'dist/images/',
      },
      other: {
        expand: true,
        cwd: 'src',
        src: ['*.ico', '*.txt'],
        dest: 'dist/',
      }
    },
    // IMAGEMIN
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          progressive: true,

          use: [
            imageminMozjpeg(),
            imageminOptipng(),
            imageminGifsicle(),
            imageminSvgo(),
          ]
        },
        files: [{
          expand: true,
          cwd: 'dist/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/images/'
        }]
      }
    }

  });

  // LOAD NPM TASKS
  require('jit-grunt')(grunt);

  // DEFAULT TASK
  grunt.registerTask('default', ['clean', 'pug', 'less', 'copy', 'uglify', 'browserSync', 'watch']);

  // DEFAULT img optimization
  grunt.registerTask('img', ['imagemin']);
};