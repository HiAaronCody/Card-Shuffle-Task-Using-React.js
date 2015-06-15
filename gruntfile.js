module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['src/css/*.scss'],
          dest: '/public/stylesheets/',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['gruntfile.js', 'src/js/*.js', 'src/css/*.scss', 'src/css/*.css'],
      tasks: ['jshint', 'concat']
    }
  });


  // Load Our Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Register Default Task
  grunt.registerTask('default', ['jshint', 'concat', 'sass']);
};