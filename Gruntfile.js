/**
 * Created by sjohn2 on 1/5/14.
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Add all the reusable parameters here
         * */

        meta: {
            banner:
                '/**\n' +
                    ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    ' * <%= pkg.homepage %>\n' +
                    ' *\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                    ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                    ' */\n',
            build: 'build',
            source: 'src'
        },

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
        clean: [
            '<%= build_dir %>'
        ],

        concat: {
            options: {
                //define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                //Source of the files to concatenate
                src: ['<%= meta.src %>/assets/js/*.js'],
                //Destination of the concatenated output
                dest: '<%= meta.build %>/assets/js/<%= pkg.name%>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'build/assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');
    grunt.registerTask('default', ['concat', 'uglify']);
    //grunt.registerTask('clean', ['clean']);

};

