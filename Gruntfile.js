/**
 * Copyright (c) 2013 ICRL
 * See the file license.txt for copying permission.
 *
 * @author Brian Lamb
 * @website http://bleedingedgewebsites.com
 * @description Grunt configuration file
 * @param grunt
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_dir: 'public',
        // @bootstrap files curently not being used *
        //'bootstrap-scrollspy.js',
        //'bootstrap-tab.js',
        //'bootstrap-tooltip.js',
        //'bootstrap-popover.js',
        //'bootstrap-affix.js',
        //'bootstrap-collapse.js',
        //'labels-badges.less',
        //'button-groups.less',
        //'pagination.less',
        //'pager.less',
        //'progress-bars.less',
        //'hero-unit.less',
        //'tooltip.less',
        //'popovers.less',
        //'accordion.less',
        //'wells.less',
        //'utilities.less',
        //'component-animations.less',
        bootstrap: {
            dest: '<%= build_dir %>/tmp/bootstrap',
            js: [
                'bootstrap-transition.js',
                'bootstrap-modal.js',
                'bootstrap-dropdown.js',
                'bootstrap-alert.js',
                'bootstrap-button.js',
                'bootstrap-carousel.js',
                'bootstrap-typeahead.js'
            ],
            css: [
                'reset.less',
                'scaffolding.less',
                'grid.less',
                'layouts.less',
                'type.less',
                'code.less',
                'tables.less',
                'forms.less',
                'buttons.less',
                'sprites.less',
                'navs.less',
                'navbar.less',
                'breadcrumbs.less',
                'thumbnails.less',
                'alerts.less',
                'media.less',
                'modals.less',
                'dropdowns.less',
                'carousel.less',
                'close.less',
                'responsive-utilities.less',
                'responsive-767px-max.less',
                'responsive-768px-979px.less',
                'responsive-1200px-min.less',
                'responsive-navbar.less'
            ]
        },
        less: {
            development: {
                options: {
                    paths: ["src/css"],
                    compress: true,
                    report: 'gzip',
                    cleancss: true,
                    ieCompat: true,
                    strictImports: true
                    //dumpLineNumbers
                },
                files: [{
                    expand: true,
                    cwd: "src/css",
                    src:  ['*.less'],
                    dest: '<%= build_dir %>/css',
                    ext: '.css'
                }]
            }
            /*
            production: {
                options: {
                    paths: ["src/css"],
                    cleancss: true
                },
                files: {
                    //"path/to/result.css": "path/to/source.less",
                    "build/css/main.css": "src/css/main.less"
                }
               
            }*/
        },
        jquery: {
            // the parts you want to exclude from your build
            // possible values ['ajax', 'css', 'deprecated', 'dimensions', 'effects', 'offset']
            exclude: ['deprecated'],
            // the jQuery version (currently only 1.8.3 is supported) - defaults to 1.8.3
            version: '1.8.3',
            // output location (relative to your grunt.js file location)
            dest: '<%= build_dir %>/js/vendor/jquery.custom.js',
            // minify the output (true or false) - defaults to false
            minify: true
        },
        modernizr: {
            // [REQUIRED] Path to the build you're using for development.
            //"devFile" : "lib/modernizr-dev.js",
            //"devFile" : "src/js/vendor/modernizr-2.7.0.js",
            "devFile" : "remote",

            // [REQUIRED] Path to save out the built file.
            //default is build/lib/modernizr-custom.js
            "outputFile" : "<%= build_dir %>/js/vendor/modernizr-custom.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                "mq" : false,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false
            },

            // By default, source is uglified before saving
            "uglify" : true,

            // Define any tests you want to implicitly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            // "files" : [],

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        },
        phpcs: {
            application: {
                dir: 'src'
            },
            options: {
                bin: '/usr/bin/phpcs',
                standard: '../../common/codestandards/PHPCS'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    require: true,
                    define: true,
                    requirejs: true,
                    describe: true,
                    expect: true,
                    it: true
                },
                // https://leanpub.com/grunt/read #see 'module' is not defined
                node: true
            },
            // https://leanpub.com/grunt/read #see 'module' is not defined
            all: [
                'Gruntfile.js',
                'src/js/*.js',
                'src/config.js',
                'tests/*.js'
            ]
        },
        uglify: {
            options: {
                banner: '*//*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> *//*\n'
            },
            build: {
                src: 'src/js/<%= pkg.name %>.js',
                dest: '<%= build_dir %>/js/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                /** NOTE, this task must run after less since the files will be minified out of the build directory
                 * instead of the src directory, after they are compiled by less. also note, make sure bootstrap
                 * is putting its output in lib/ so the bootstrap.css doesnt get double minified.
                 */
                //cwd: 'src/css/',
                cwd: '<%= build_dir %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= build_dir %>/css/',
                ext: '.min.css'
            }
        },
        htmllint: {
            //all: ["src/**/*.html", "<%= build_dir %>/**/*.html"]
        },
        htmlclean: {
            options: {
                protect: /<\!--%fooTemplate\b.*?%-->/g,
                edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
            },
            deploy: {
                expand: true,
                cwd: 'src/',
                src: '**/*.html',
                dest: 'src/cleaned'
            }
        },
        'html-prettyprinter-dir': {
            expansion: {
                src: ['src/**/*.html'],
                dest: '<%= build_dir %>/'
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true, //enable dynamic expansion
                        cwd: 'src/images/',
                        src: ['**/*.{png,gif,jpg}'],
                        dest: '<%= build_dir %>/images',
                        ext: '.png'
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    //{src: ['path/*'], dest: 'dest/', filter: 'isFile'}, // includes files in path
                    {src: ['src/copy/**'], dest: '<%= build_dir %>/'} // includes files in path and its subdirs
                    //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
                    //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
                ]
            },
            skel: {
                expand: true,
                cwd: "src/skel/",
                src: '*',
                dest: '<%= build_dir %>/'
            },
            fonts: {
                expand: true,
                src: ["src/fonts/*"],
                dest: '<%= build_dir %>/fonts'
            },
            bootstrapcopyjs: {
                expand: true,
                cwd: '<%= build_dir %>/tmp/bootstrap/js/',
                src: '*',
                dest: '<%= build_dir %>/js/vendor/'
            },
            bootstrapcopycss: {
                expand: true,
                cwd: '<%= build_dir %>/tmp/bootstrap/css/',
                src: '*',
                dest: '<%= build_dir %>/css/vendor/'
            }
        },
        clean: {
            tmp: {
                src: ["<%= build_dir %>/tmp"]
            }
        },
        // Run jshint any time a file is added
        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'src/*.js',
                    'tests/*.js'
                ],
                tasks: ['jshint'],
                options: {
                    /**
                     * If you need to dynamically modify your config, the spawn option must be disabled to keep the watch
                     * running under the same context.
                     */
                    spawn: false
                }
            },
            css: {
                files: ['src/css/*.less'],
                tasks: ['less']
            }
            /*test: {
             files: '<%= jshint.test.src %>',
             tasks: ['jshint:test', 'qunit']
             }*/
        },
        shell: {
            gitclone: {
                command: 'git clone https://github.com/robrighter/node-boilerplate.git src/'
            }
        }
    });

    // Load task(s)
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bootstrap');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-jquerybuilder');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-htmlclean');
    grunt.loadNpmTasks('grunt-html-prettyprinter');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    //grunt.loadNpmTasks('stacktrace-js');

    /**
     * Register task(s).
     * @workflow
     *  grunt (each time files are updated)
     *  grunt make-bootstrap pull-vendors (once to ship compiled vendor files into the build)
     */

    /**
     * grunt default
     * This is the defalt task
     * you can run this each time you update jade, js, html, or css files
     */
    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'less',
        'cssmin',
        'html-prettyprinter-dir',
        'imagemin'
        ]);
    //'jade',
    //'htmlclean',
    //"htmllint",

    /**
     * grunt dev
     */
    grunt.registerTask('dev', [
            'watch'
    ]);

    /**
     * grunt make-bootstrap
     * use this to complile bootstrap first
     * @todo fix bootstrap so it doesn't kill the process, then i can combine this process with pull-vendors into one.
     */
    grunt.registerTask('make-bootstrap', 'compiles bootstrap, copies files to tmp',
        function(){
            grunt.task.run(['bootstrap']);
        }

    );

    /**
     * grunt pull-vendors
     * Before running grunt pull-vendors be sure to run grunt make-bootstrap to have the files ready first
     */
     grunt.registerTask('pull-vendors', 'compiles, and copies precompiled, vendor files into app',
        function(){
            grunt.task.run(['jquery','modernizr','copy:bootstrapcopyjs','copy:bootstrapcopycss','clean:tmp']);
        }

    );

    /**
     * grunt pull-vendors
     * Before running grunt pull-vendors be sure to run grunt make-bootstrap to have the files ready first
     */
    grunt.registerTask('build', 'compiles, and copies precompiled, vendor files into app',
        function(){
            grunt.task.run(['copy:skel', 'shell']);
        }

    );
};