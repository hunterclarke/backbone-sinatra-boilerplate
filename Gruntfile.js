module.exports = function(grunt) {

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            build: {
                files: {
                    './build/app.js': ['./src/models/*.coffee'
                                        , './src/routers/*.coffee'
                                        , './src/views/*.coffee'
                                        , './src/app.coffee']
                }
            },
            dev: {
                files: {
                    './public/javascripts/app.js': ['./src/models/*.coffee'
                                                    , './src/routers/*.coffee'
                                                    , './src/views/*.coffee'
                                                    , './src/app.coffee']
                }
            }
        },

        handlebars: {
            build: {
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
            },
            dev: {
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
                    './public/javascripts/templates.js': './src/templates/*/*.hbs'
                }
            }
        },

        compass: {
            build: {
                options: {
                    sassDir: './src/style',
                    cssDir: './public/stylesheets',
                    outputStyle: 'compressed'
                }
            },
            dev :{
                options: {
                    sassDir: './src/style',
                    cssDir: './public/stylesheets'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    './public/javascripts/lib.js': ['./src/lib/jquery-1.9.1.min.js'
                                                    , './src/lib/json2.js'
                                                    , './src/lib/underscore-min.js'
                                                    , './src/lib/backbone-min.js'
                                                    , './src/lib/handlebars.js'],
                    './public/javascripts/templates.js': './build/templates.js',
                    './public/javascripts/app.js': './build/app.js'
                }
            },
            dev: {
                './public/javascripts/lib.js': ['./src/lib/jquery-1.9.1.min.js'
                                                , './src/lib/json2.js'
                                                , './src/lib/underscore-min.js'
                                                , './src/lib/backbone-min.js'
                                                , './src/lib/handlebars.js']
            }
        },

        clean: {
            clean: ['./build']
        },

        watch: {
            templates: {
                files: ['./src/templates/*/*.hbs'],
                tasks: ['handlebars:dev']
            },
            coffee: {
                files: ['./src/models/*.coffee'
                        , './src/routers/*.coffee'
                        , './src/views/*.coffee'
                        , './src/app.coffee'],
                tasks: ['coffee:dev']
            },
            sass: {
                files: './src/style/*.scss',
                tasks: ['compass:dev']
            }
        }
    });

    grunt.registerTask('build',['coffee:build', 'handlebars:build', 'uglify:build', 'compass:build', 'clean']);
    grunt.registerTask('dev', ['coffee:dev', 'handlebars:dev', 'uglify:dev', 'compass:dev']);
    grunt.registerTask('style', ['compass']);
    grunt.registerTask('js', ['coffee', 'handlebars'])
};