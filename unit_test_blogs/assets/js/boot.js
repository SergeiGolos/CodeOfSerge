(function() {

  window.jasmine = jasmineRequire.core(jasmineRequire);
  jasmineRequire.html(jasmine);
  
  var env = jasmine.getEnv();
  var jasmineInterface = jasmineRequire.interface(jasmine, env);

  extend(window, jasmineInterface);
function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }
  /**
   * ## Runner Parameters
   *
   * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
   */  

  var queryString = new jasmine.QueryString({
    getWindowLocation: function() { return window.location; }
  });

  var catchingExceptions = queryString.getParam("catch");
  env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

  var throwingExpectationFailures = queryString.getParam("throwFailures");
  env.throwOnExpectationFailure(throwingExpectationFailures);

  var random = queryString.getParam("random");
  env.randomizeTests(random);

  var seed = queryString.getParam("seed");
  if (seed) {
    env.seed(seed);
  }
  
  if (!jasmine) {
  throw new Exception("jasmine library does not exist in global namespace!");
  }

  function elapsed(startTime, endTime) {
    return (endTime - startTime) / 1000;
  }

  function ISODateString(d) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':'
        + pad(d.getSeconds());
  }

  function trim(str) {
    return str.replace(/^\s+/, "").replace(/\s+$/, "");
  }

  function escapeInvalidXmlChars(str) {
    return str.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
  }

  /**
   * based on
   * https://raw.github.com/larrymyers/jasmine-reporters/master/src/jasmine.junit_reporter.js
   */
  var BlanketReporter = function(savePath, consolidate, useDotNotation) {

    blanket.setupCoverage();
  };

  /* 
  from http://stackoverflow.com/questions/21420291/blanketjs-jasmine-2-0-not-working
  */
  BlanketReporter.finished_at = null; // will be updated after all files have
  // been written

  BlanketReporter.prototype = {
    specStarted : function(spec) {
      blanket.onTestStart();
    },

    specDone : function(result) {
      var passed = result.status === "passed" ? 1 : 0;
      blanket.onTestDone(1, passed);
    },

    jasmineDone : function() {
      blanket.onTestsDone();
    },

    log : function(str) {
      var console = jasmine.getGlobal().console;

      if (console && console.log) {
      console.log(str);
      }
    }
  };

  /**
   * ## Reporters
   * The `HtmlReporter` builds all of the HTML UI for the runner page. This reporter paints the dots, stars, and x's for specs, as well as all spec names and all failures (if any).
   */
  var htmlReporter = new jasmine.HtmlReporter({
    env: env,
    onRaiseExceptionsClick: function() { queryString.navigateWithNewParam("catch", !env.catchingExceptions()); },
    onThrowExpectationsClick: function() { queryString.navigateWithNewParam("throwFailures", !env.throwingExpectationFailures()); },
    onRandomClick: function() { queryString.navigateWithNewParam("random", !env.randomTests()); },
    addToExistingQueryString: function(key, value) { return queryString.fullStringWithNewParam(key, value); },
    getContainer: function() { return document.body; },
    createElement: function() { return document.createElement.apply(document, arguments); },
    createTextNode: function() { return document.createTextNode.apply(document, arguments); },
    timer: new jasmine.Timer()
  });

  /**
   * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
   */
  env.addReporter(jasmineInterface.jsApiReporter);
  env.addReporter(new jasmine.BlanketReporter());
  env.addReporter(htmlReporter);
  
  /**
   * Filter which specs will be run by matching the start of the full name against the `spec` query param.
   */
  var specFilter = new jasmine.HtmlSpecFilter({
    filterString: function() { return queryString.getParam("spec"); }
  });

  env.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  /**
   * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
   */
  window.setTimeout = window.setTimeout;
  window.setInterval = window.setInterval;
  window.clearTimeout = window.clearTimeout;
  window.clearInterval = window.clearInterval;
    

  /**
   * ## Execution
   *
   * Replace the browser window's `onload`, ensure it's called, and then run all of the loaded specs. This includes initializing the `HtmlReporter` instance and then executing the loaded Jasmine environment. All of this will happen after all of the specs are loaded.
   */
  var currentWindowOnload = window.onload;

  window.blogUnitStart = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    htmlReporter.initialize();
    env.execute();    
    var body = document.body;
    var html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    window.parent.postMessage({ id: window.runnerName, state : "complete", message : height }, "*");
    html.style.overflow="hidden";
  };

  /**
   * Helper function for readability above.
   */
  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

}());