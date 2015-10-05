/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  //Connect to Firebase
  var firebaseRef = new Firebase('https://shining-torch-6028.firebaseio.com/wae/data');
  //Getting elements reference
  app.elementsRef = firebaseRef.child('elements');

  //Callback when elements is changed, app binded
  //app.elements updated via polymer .push('arrayName', value), makes the template render
  app.renderElements = function(snapshot){
    console.log('renderElements');
    app.elements = [];
    snapshot.forEach(function(childSnapshot){
      var item = childSnapshot.val();
      app.push('elements', item);
    });
    var sendValue = function(id){
      for (var i=0, iLen=app.elements.length; i<iLen; i++) {
        if (app.elements[i].created_at == id) return document.querySelector('element-display').item = app.elements[i];
      };
      document.querySelector('element-summary').info = document.querySelector('element-display').item;
    }
    sendValue(app.elements[0].created_at);
    console.log(app.elements);
  };

  app.dbReadingError = function(erroObject){
    console.log("The read failed: " + errorObject.code);
  };

  //listener and callback for elements changed
  app.elementsRef.on('value', app.renderElements.bind(app), app.dbReadingError);

})(document);
