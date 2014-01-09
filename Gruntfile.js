/**
 * Created by sjohn2 on 1/5/14.
 */
module.exports = function(grunt){

    /*
     *  Add all the global/reusable/repeatable params here
     */
    var globalConfig = {
        src: 'src',
        build: 'build',
        banner:
            '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
    };

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        globalConfig: globalConfig,

        /**
         *  bump the version number @package.json.
         */
        bump: {
            options: {
                files: [
                    "package.json"
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    "package.json"
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin'
            }
        },

        /*
         * Clean the @meta.build folder.
         */
        clean: {
            //tasks: [ 'clean_js', 'clean_css', 'clean_img' ]
            clean_js: [
                '<%= globalConfig.build %>/assets/js/*.*'
            ],

            clean_css: [
                '<%= globalConfig.build %>/assets/css/*.*'
            ],

            clean_img: [
                '<%= globalConfig.build %>/assets/img/*.*'
            ],

            clean_app: [
                '<%= globalConfig.build %>/app/*.*'
            ]
        },

        /*
         * Concat the js files.
         */
        concat: {
            options: {
                //define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                //Source of the files to concatenate
                src: ['<%= globalConfig.src %>/assets/js/*.js'],
                //Destination of the concatenated output
                dest: '<%= globalConfig.build %>/assets/js/<%= pkg.name%>.js'
            }
        },

        /*
         * Minify the js files.
         */
        uglify: {
            options: {
                banner: '<%= globalConfig.banner %>'
            },
            dist: {
                files: {
                    'build/assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        /*
         * Copy all the static items to build dir
         */
         copy: {
             dist:{
                 src: '<%=gloablConfig.src%>/'
             }
         }


    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);
    //grunt.registerTask('clean', ['clean_js', 'clean_css', 'clean_img', 'clean_app']);

};

