module.exports = function(grunt) {

	var ENVIRONMENT = 'dev';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		settings: grunt.file.readJSON('grunt/settings.json'),

		sass: {
			dev: {
				options: {
					noCache: true,
					lineNumbers: true
				},
				files: {
					'<%= settings.paths.dev_copy_directory %>css/global.css': '<%= settings.paths.app_sass %>compiled.scss'
				}
			},
			prod: {
				options: {
					noCache: true,
					quiet: true,
					lineNumbers: false
				},
				files: {
					'<%= settings.paths.dev_copy_directory %>css/global.css': '<%= settings.paths.app_sass %>compiled.scss'
				}
			}
		},
		complexity: {
			dev: {
				src: ['<%= settings.paths.dev_base %>js/global.js'],
				options: {
					breakOnErrors: false,
					jsLintXML: 'report.xml', // create XML JSLint-like report
					checkstyleXML: 'checkstyle.xml', // create checkstyle report
					errorsOnly: false, // show only maintainability errors
					cyclomatic: [3, 7, 12], // or optionally a single value, like 3
					halstead: [8, 13, 20], // or optionally a single value, like 8
					maintainability: 100,
					hideComplexFunctions: false, // only display maintainability
					broadcast: false // broadcast data over event-bus
				}
			},
			prod: {
				src: ['<%= settings.paths.prod_base %>js/global.min.js'],
				options: {
					breakOnErrors: true,
					jsLintXML: 'report.xml', // create XML JSLint-like report
					checkstyleXML: 'checkstyle.xml', // create checkstyle report
					errorsOnly: false, // show only maintainability errors
					cyclomatic: [3, 7, 12], // or optionally a single value, like 3
					halstead: [8, 13, 20], // or optionally a single value, like 8
					maintainability: 100,
					hideComplexFunctions: false, // only display maintainability
					broadcast: false // broadcast data over event-bus
				}
			}
		},
		uglify: {
			dev: {
				options: {
					banner: '<%= banner %>',
					mangle: false,
					beautify: true,
					preserveComments: "all",
					compress: {}
				},
				files: {
					// Libs
					'<%= settings.paths.dev_copy_directory %>js/libs.js': [
						'<%= settings.paths.app_js %>libs/**/*.js',
						'!<%= settings.paths.app_js %>libs/jquery.js',
						'!<%= settings.paths.app_js %>libs/modernizr.min.js'
					],
					// Jquery
					'<%= settings.paths.dev_copy_directory %>js/jquery.js': [
						'<%= settings.paths.app_js %>libs/jquery.js'
					],
					// Modernizr
					'<%= settings.paths.dev_copy_directory %>js/modernizr.js': [
						'<%= settings.paths.app_js %>libs/modernizr.js'
					],
					// global JS
					'<%= settings.paths.dev_copy_directory %>js/global.js': [
						'<%= settings.paths.app_js %>compiled/**/*.js',
						'<%= settings.paths.app_js %>/compiled.js'
					]
				}
			},

			prod: {
				options: {
					banner: '<%= banner %>',
					mangle: true,
					beautify: false,
					preserveComments: false,
					compress: {}
				},
				files: {
					// Libs
					'<%= settings.paths.dev_copy_directory %>js/libs.min.js': [
						'<%= settings.paths.app_js %>libs/**/*.js',
						'!<%= settings.paths.app_js %>libs/jquery.js',
						'!<%= settings.paths.app_js %>libs/modernizr.js'
					],
					// Jquery
					'<%= settings.paths.dev_copy_directory %>js/jquery.min.js': [
						'<%= settings.paths.app_js %>libs/jquery.js'
					],
					// Modernizr
					'<%= settings.paths.dev_copy_directory %>js/modernizr.min.js': [
						'<%= settings.paths.app_js %>libs/modernizr.js'
					],
					// global JS
					'<%= settings.paths.dev_copy_directory %>js/global.min.js': [
						'<%= settings.paths.app_js %>compiled/**/*.js',
						'<%= settings.paths.app_js %>/compiled.js'
					]
				}
			}
		},
		jshint: {
			dev: {
				options: {
			      curly: true,
			      eqeqeq: true,
			      eqnull: true,
			      browser: true,
			      globals: {
			        jQuery: true,
        			"$": false
			      },
			    },
			    'files': { 
			        'src': [
			            '<%= settings.paths.app_js %>compiled/*.js',
			        ]
			    }

			}
        },
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= settings.paths.dev_copy_directory %>css',
					src: ['global.css', '!global.min.css'],
					dest: '<%= settings.paths.dev_copy_directory %>css',
					ext: '.min.css'
				}]
			}
		},
		watch: {
			options: {
				interrupt: true
			},
			sass: {
				files: [
					'<%= settings.paths.app_sass %>**/*.scss'
				],
				tasks: ['sass:' + ENVIRONMENT]
			},
			js: {
				files: [
					'<%= settings.paths.app_js %>**/*.js'
				],
				tasks: [
					'uglify:' + ENVIRONMENT,
					'jshint:' + ENVIRONMENT
				]
			}
		},
		browserSync: {
            
            bsFiles: {
                src : [
                    '<%= settings.paths.dev_copy_directory %>css/global.css',
                    '<%= settings.paths.dev_copy_directory %>js/global.js',
                    '<%= settings.paths.dev_copy_directory %>*.php'
                ]
            },
            options: {
                watchTask: true
            }
            // proxy: "http://localhost:4444/"
        }
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-complexity');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-jshint');


	// Target is either prod or dev.
	// 
	// grunt server:dev
	// or
	// grunt server:prod

	grunt.registerTask('dev', function(env) {

		ENVIRONMENT = env ? env : 'dev';

		grunt.task.run([
			'sass:' + ENVIRONMENT,
			'uglify:' + ENVIRONMENT,
			'complexity:' + ENVIRONMENT,
			'jshint:' + ENVIRONMENT,
			'browserSync',
			'watch'
		]);

	});

};