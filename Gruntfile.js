/**
 * Created by sjohn2 on 1/5/14.
 */
module.exports = function(grunt){

    /*
     *  Add all the global/reusable/repeatable params here
     */
    var globalConfigBanner = {
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
		globalConfig: grunt.file.readJSON('config.json'),
        globalConfigBanner: globalConfigBanner,
		/**
         *  eviornment config
         */
		setEnvironment:
		{
		   options:
		   {
			 env:"<%=globalConfig.env %>"
		   }
		},
		
		/**
         *  private paths
         */
		paths :
		{
		   sourceCss:"css_source"
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
         * Clean the @meta.build/dev folder.
         */
        clean: {
            //tasks: [ 'clean_js', 'clean_css', 'clean_img' ]
            clean_js: [
                '<%= globalConfig.build %>/assets/js/*.*'
            ],

            clean_css: [
                '<%= globalConfig.build %>/assets/css/*.*'
            ],
			
			clean_css_src: [
                '<%= globalConfig.src %>/assets/css/<%= paths.sourceCss %>/*.*'
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
                banner: '<%= globalConfigBanner.banner %>'
            },
            dist: {
                files: {
                    '<%= globalConfig.build %>/assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
		/*
         * config for sass and less execution.
         */
        compileCss:
		{
		   options:
		   {
		     compileCssBy:"<%=globalConfig.compileCssBy %>"
		   }
		},
		
		/*
         * sass compilation.
         */
		 sass: {
			dist: {
			  files: [{
				expand: true,
				cwd: '<%= globalConfig.src %>/assets/sass/',
				src: ['*.scss'],
				dest: '<%= globalConfig.src %>/assets/css/<%= paths.sourceCss %>',
				ext: '.css'
			  }]
			}
		  },
		/*
         * less compilation.
         */
		less: {
				src: {
					expand: true,
					cwd:    "<%= globalConfig.src %>/assets/less/",
					src:    "*.less",
					dest:   '<%= globalConfig.src %>/assets/css/<%= paths.sourceCss %>',
					ext:    ".css"
				}
			},
		/*
         * concatinate all css created by less/sass and .css files(if any css in assets/css)
         */	
		cssmin:{
		    options: {
                banner: '<%= globalConfigBanner.banner %>'
            },
		    dev:{
				files: {
				  '<%= globalConfig.build %>/assets/css/result_min.css': ['<%= globalConfig.src %>/assets/css/**/*.css']
				}
			}
		},
        /*
         * Copy all the static items to build dir
         */
         copy: {
             dist:{
                 src: '<%=gloablConfig.src%>/'
             },
			 dev:{
			    files: [
				  {expand: true, cwd: '<%= globalConfig.src %>/assets/js/', src: ['**'], dest: '<%= globalConfig.build %>/assets/js/'},
				  {expand: true, cwd: '<%= globalConfig.src %>/assets/css/', src: ['*.css'], dest: '<%= globalConfig.build %>/assets/css/', filter: 'isFile'},
				  {expand: true, cwd: '<%= globalConfig.src %>/assets/css/<%= paths.sourceCss %>', src: ['*.css'], dest: '<%= globalConfig.build %>/assets/css/', filter: 'isFile'}
				]
			 }
         }


    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	
    //grunt.registerTask('default', ['clean', 'concat', 'uglify','compileCss']);
	 grunt.registerTask('default', ['setEnvironment']);
	 grunt.registerTask('setEnvironment', 'set my env', function () {
	    var options = this.options();
		grunt.task.run(options.env);
	 });
	

    grunt.registerTask('prod', 'runs my prod build', function () {
        var tasks = [
            'clean',
            'concat',
            'uglify',
            'compileCss'
        ];
        grunt.task.run(tasks);
    });
	
	grunt.registerTask('dev', 'runs my dev build', function () {
        var tasks = [
            'clean',
			'compileCss',
			'clean:clean_css',
			'copy:dev',
            
        ];
        grunt.task.run(tasks);
    });
	
	
	
	grunt.registerTask('compileCss', 'compile css', function(options) {
		var options = this.options();
		grunt.task.run(options.compileCssBy);
		grunt.task.run("cssmin");
	});
    //grunt.registerTask('clean', ['clean_js', 'clean_css', 'clean_img', 'clean_app']);

};

