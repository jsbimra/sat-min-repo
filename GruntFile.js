module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate:{
            options:{
                singleQuotes: true
            },
            app1:{
                files: [{
                    expand: true,
                    src: ['app-script/all-app.js'],
                    ext: '.annotated.js', //Dest filepaths will have this extension.
                    extDot: 'last',     //Ext in filenames begin after the last dot
                    //dest: 'app-script/annotate'
                }]
            }
        },
        uglify: {
            options: {
                mangle: true,
                separator: ';'
            },
            build: {
                src: 'app-script/all-app.annotated.js',
                dest: 'build/app.min.js'
            }
        },
        concat: {
        	dist: {
                options: {
                    separator: '\n ;'
                }, 
        		src: ['app-script/app.js', 'app-script/app.constants.js', 'app-script/route-config.js', 'app-script/dataservice.js', 'app-script/app.factory.js', 'app-script/result.chart.factory.js', 'app-script/parent.controller.js', 'app-script/main.controller.js', 'app-script/navbar.controller.js', 'app-script/questionnaire.directive.js', 'app-script/loader.directive.js', 'landing/*.js', 'instruction/*.js', 'lawAndRegulations/*.js', 'organization/*.js','culture/*.js', 'techniek/*.js', 'result/*.js', 'best-practises/*.js'],
        		dest: 'app-script/all-app.js'
        	},
        	css: {
        		options: {
	        		separator: '\n'
	        	},
        		src: ['outdatedbrowser/outdatedbrowser.css', 'css/bootstrap.min.css', 'css/angular-chart.css', 'css/style.css', 'css/prettyCheckable.css'],
        		dest: 'css/appcompiled.css'
        	}
        },
        cssmin: {
        	target: {
        		files:[{
        			expand: true,
        			cwd: 'css',
        			src: ['appcompiled.css'],
        			dest: 'css',
        			ext: '.min.css'
        		}]
        	}
        },
        watch:{
	    	files: ['GruntFile.js', 'lawAndRegulations/*.js', 'app-script/*.js', 'css/*.css'],
	    	tasks: ['ngAnnotate', 'concat', 'uglify', 'cssmin'], 
	    	options:{
	    		atBegin: true	
	    	}
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};
