module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.initConfig({
    concat: {
      spec: {
        src: [
          '../app/actions/**.js',
          '../app/dom/**.js',
          '../app/api/**.js',
          '../app/spec/**/**.js',
          '../api/spec/**/**.js',
          '../dom/spec/**/**.js',
        ],
        dest: './index.js'
      },
      prod: {
        src: [
          '../app/actions/**.js',
          '../app/dom/**.js',
          '../app/api/**.js',
          '../api/**.js',
          '../dom/**.js',
          '../ui/**.js',
        ],
        dest: '../index.js'
      }
    }
  });
  grunt.registerTask('default', ['concat']);
};
