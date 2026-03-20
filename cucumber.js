module.exports = {
  default: {
    require: [
      'src/step-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress',
      'json:reports/cucumber.json',
      'html:reports/html-report.html'
    ]
  }
};