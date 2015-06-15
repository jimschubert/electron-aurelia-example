/* global aurelia */
/* eslint no-unused-vars: [1,"after-used"] */
import {bootstrap} from 'aurelia-bootstrapper';

bootstrap(aurelia => {
  aurelia.use
    //.defaultBindingLanguage()
    //.defaultResources()
    .standardConfiguration()
    .developmentLogging()
    //.eventAggregator()
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
});

