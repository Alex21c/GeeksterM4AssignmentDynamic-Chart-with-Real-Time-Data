'use strict';

// babel
import 'core-js/stable';
// polyfilling async functions
import "regenerator-runtime/runtime";

// importing
import Model from './Model.js';
import View from './View.js';
import Controller from './Controller.js';


// Rest of the code
  let model = new Model();
  let view = new View(model);
  let contoller = new Controller(view, model);

