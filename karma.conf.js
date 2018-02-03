// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage',
      'karma-coverage-istanbul-reporter',
      '@angular/cli/plugins/karma',
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    preprocessors: {
      'src/app/**/*.js': ['coverage']
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    files: [
      // Include a Material theme in the test suite.
      {
        pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
        included: true,
        watched: true
      },
    ],
  });
};
