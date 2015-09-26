  'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: 'dist'
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app/assets',
            dest: 'dist',
            src: [
              'favicon.ico'
            ]
          },
          {
            expand: true,
            dot: true,
            cwd: 'node_modules/animate.css',
            dest: 'dist/assets/css',
            src: [
              'animate.min.css'
            ]
          }
        ]
      }
    },

    haml: {
      dist: {
        files: {
          'dist/index.html': 'app/index.haml'
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
              browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'dist/assets/css/batman.css'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'app/assets/scss',
          cssDir: 'dist/assets/css',
          environment: 'development',
          outputStyle: 'expanded'
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      haml: {
        files: ['app/index.haml'],
        tasks: ['haml:dist'],
        options: {
          livereload: true
        }
      },
      scss: {
        files: ['app/assets/scss/batman.scss'],
        tasks: ['compass','postcss:dist'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'dist/index.html',
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 1337,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: {
            path: 'dist',
            options: {
              index: 'index.html'
            }
          }
        }
      }
    },
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'clean:dist',
      'copy:dist',
      'haml:dist',
      'compass',
      'postcss:dist',
      'connect:livereload',
      'watch'
    ]);
  });
};