module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    // Start express server
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },

    // Open the web browser
    open: {
      server: {
          path: 'http://localhost:3000/'
      }
    },

    // Compile sass files
    sass: {
			dist: {
				files: {
					'client/_common/style.css' : 'client/_common/style.scss'
				}
			}
		},

    watch: {
      // Compile and reload sass changes
			css: {
				files: '**/*.scss',
				tasks: ['sass'],
        options: {
          livereload: true
        }
			},

      // Reload html changes
      html: {
        files: '**/*.html',
        options: {
          livereload: true
        }
      },

      // Relaoad javascript changes
      javascript: {
        files: '**/*.js',
        options: {
          livereload: true
        }
      }

    }
  });


  grunt.registerTask('default', ['express:dev', 'open', 'sass', 'watch']);
  grunt.registerTask('teste', ['open']);

};
