module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    //
    // Tasks
    // 

    grunt.registerTask('build', ['clean', 'babel']);
    grunt.registerTask('default', ['clean', 'babel']);

    //
    // Config
    //
    grunt.initConfig({
        clean: ['./lib/**/*'],
        babel: {
            lib: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["**/*.{js,jsx}"],
                    dest: "lib",
                    ext: ".js"
                }]
            }
        },
        watch: {
            files: ['./src/**/*'],
            tasks: ['build']
        }
    });
};  