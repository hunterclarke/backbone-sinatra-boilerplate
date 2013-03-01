module.exports = function(grunt) {

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    './build/application.js': ['./src/models/*.coffee'
                                                        , './src/routers/*.coffee'
                                                        , './src/views/*.coffee']
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    // Put namespace in here
                    namespace: 'Project.Templates',
                    processName: function(path) {
                        var pieces = path.split('/');
                        var idx = pieces.indexOf('templates');
                        var path = '';
                        for (var i=idx+1; i<pieces.length-1; i++)
                            path = path+pieces[i]+'/';
                        path = path + pieces[pieces.length-1].split('.')[0];
                        return path;
                    }
                },
                files: {
                    './build/templates.js': './src/templates/*/*.hbs'
                }
            }
        },
        compass: {
            dev :{
                options: {
                    sassDir: './src/style',
                    cssDir: './public/stylesheets',
                    outputStyle: 'compressed'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    './public/javascripts/application.js': ['./src/lib/jquery-1.9.1.js'
                                                        , './src/lib/json2.js'
                                                        , './src/lib/underscore-min.js'
                                                        , './src/lib/backbone-min.js'
                                                        , './src/lib/handlebars.js'
                                                        , './build/application.js'],
                    './public/javascripts/templates.js': './build/templates.js'
                }
            }
        },
        clean: {
            clean: ['./build']
        }
    });

    // Register the default task
    grunt.registerTask('default',['coffee', 'handlebars', 'uglify', 'clean']);
};