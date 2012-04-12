/*
 *  jQuery Table Loading Animation
 *  Creates a loading animation across a table row
 *  Author: Dan Karney @KarneAsada
 *  Date: 2012-04-11
 *
 *  Usage:
 *    $("tr#id").tableLoadingAnimation( command, options )
 *
 *  Command can be "start" or "stop"
 *  - start is passed upon instantiation by default
 *
 *  Options:
 *    color:    color of cell [#1FF]
 *    interval: milliseconds between frames [100]
 *
 */

;(function ( $, window, document, undefined ) {
    
  // Create the defaults once
  var pluginName  = "tableLoadingAnimation"
    , className   = "tlaCurrRow"
    , options     = {}
    , interval    = null
    , defaults = {
        color:    "#11FFFF"
      , interval: 100
    }
    ;

  // Constructor
  function Plugin( element, options ) {
    this.element = element;
    this.interval = null;
    this.className = className;

    this._defaults = defaults;
    this._name = pluginName;
    
    this.extendOptions( options );
        
    this.init();
    this.executeCommand( "start" );
  }

  // Set CSS3 transition properties
  Plugin.prototype.init = function () {

    var self = this
      , o  = this.options
      , el = $(this.element)
      ;

    // Get original color
    self.originalColor = el.find("td").eq(0).css("background-color");
  
    // Set css transitions
    el.find("td").css("-webkit-transition", "background-color .9s ease-out");  
    el.find("td").css("-moz-transition",    "background-color .9s ease-out");  
    el.find("td").css("-o-transition",      "background-color .9s ease-out");  
    el.find("td").css("-ms-transition",     "background-color .9s ease-out");  
    el.find("td").css("transition",         "background-color .9s ease-out");  
  };
  
  // Add new options to the options object
  Plugin.prototype.extendOptions = function( options ) {
    this.options =  $.extend( {}, this._defaults, this.options, options);
  };
  
  // Run a command passed in
  Plugin.prototype.executeCommand = function( command ) {
    var self = this
      , o = this.options
      ;
      
    switch(command) {
      case "start":
        if (self.interval == null) {
          self.interval = setInterval(self.animateCell, o.interval, self);
        }
        break;
      
      case "stop":
        clearInterval(self.interval);
        self.interval = null;
        self.revertColors();
        break;
    }
  };
  
  // Find the currently animated cell and animate the next one
  Plugin.prototype.animateCell = function(self) {
    var tr = $(self.element)
      , o  = self.options
      ;
        
    if (tr.find("."+self.className).length) {
      var curr = tr.find("."+self.className);
      var dir  = tr.data('dir') ? tr.data('dir') : 1;
        
      if ( ! getSib(curr, dir).length) {
        tr.data('dir', dir * -1);
        dir  = tr.data('dir');
      }
        
      next = getSib(curr, dir);
        
      curr.removeClass(self.className);
      curr.css("background-color", self.originalColor);

    } else {
      next = tr.find("td").eq(0);
    }
    
    next.addClass(self.className);
    next.css("background-color", o.color);
  };
  
  // Revert all animated cells to their original color
  Plugin.prototype.revertColors = function() {
    var self = this;
    $(self.element).find("td").css("background-color", self.originalColor);
  };
  
  // Return the correct sibling, depending upon traversal direction
  function getSib(curr, dir) {
    
      if (dir == -1) {
          return curr.prev();
      } else {
          return curr.next();
      }
  }    
      
  // If the plugin has already been instantiated, add new options and 
  // run the passed command, otherwise initialize the plugin
  $.fn[pluginName] = function ( command, options ) {
    return this.each(function () {
      
      var pluginObj = $.data(this, 'plugin_' + pluginName);
      
      // Check if they passed the optional command
      if (command != undefined && typeof(command) == "object") {
        options = command;
      }
      
      if (pluginObj) {
        if (options) {
          pluginObj.extendOptions( options );
        }
        pluginObj.executeCommand( command );
      } else {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

})(jQuery, window, document);