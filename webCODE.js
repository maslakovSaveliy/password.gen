(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){(function (){
/*!
 * @file passfather.js
 * @version 3.0.3
 * @description Passfather is very fast and powerful utility with zero dependencies to generate strong password
 * @copyright Copyright (c) 2019-present, Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)
 * @license
 * This source code is licensed under the MIT license found in the
 * LICENSE file on https://github.com/vyushin/passfather/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("passfather", [], factory);
	else if(typeof exports === 'object')
		exports["passfather"] = factory();
	else
		root["passfather"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function Alea() {
  return function (args) {
    /*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);

      if (s0 < 0) {
        s0 += 1;
      }

      s1 -= mash(args[i]);

      if (s1 < 0) {
        s1 += 1;
      }

      s2 -= mash(args[i]);

      if (s2 < 0) {
        s2 += 1;
      }
    }

    mash = null;

    var random = function random() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };

    random.uint32 = function () {
      return random() * 0x100000000; // 2^32
    };

    random.fract53 = function () {
      return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'Alea 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = Alea;

/***/ }),

/***/ 825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function KISS07() {
  return function (args) {
    /*! George Marsaglia, 2007-06-23 */

    /*! http://groups.google.com/group/comp.lang.fortran/msg/6edb8ad6ec5421a5 */
    var x = 123456789;
    var y = 362436069;
    var z = 21288629;
    var w = 14921776;
    var c = 0;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();

    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32

      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }

    if (y === 0) {
      y = 1;
    }

    c ^= z >>> 31;
    z &= 0x7fffffff;

    if (z % 7559 === 0) {
      z++;
    }

    w &= 0x7fffffff;

    if (w % 7559 === 0) {
      w++;
    }

    mash = null;

    var uint32 = function uint32() {
      var t;
      x += 545925293;
      x >>>= 0;
      y ^= y << 13;
      y ^= y >>> 17;
      y ^= y << 5;
      t = z + w + c;
      z = w;
      c = t >>> 31;
      w = t & 0x7fffffff;
      return x + y + w >>> 0;
    };

    var random = function random() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };

    random.uint32 = uint32;

    random.fract53 = function () {
      return random() + (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };

    random.args = args;
    random.version = 'KISS07 0.9';
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = KISS07;

/***/ }),

/***/ 139:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function Kybos() {
  return function (args) {
    /*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;
    var s = [];
    var k = 0;
    var mash = Mash();
    var s0 = mash(' ');
    var s1 = mash(' ');
    var s2 = mash(' ');

    for (var j = 0; j < 8; j++) {
      s[j] = mash(' ');
    }

    if (args.length == 0) {
      args = [+new Date()];
    }

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);

      if (s0 < 0) {
        s0 += 1;
      }

      s1 -= mash(args[i]);

      if (s1 < 0) {
        s1 += 1;
      }

      s2 -= mash(args[i]);

      if (s2 < 0) {
        s2 += 1;
      }

      for (var j = 0; j < 8; j++) {
        s[j] -= mash(args[i]);

        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    var random = function random() {
      var a = 2091639;
      k = s[k] * 8 | 0;
      var r = s[k];
      var t = a * s0 + c * 2.3283064365386963e-10; // 2^-32

      s0 = s1;
      s1 = s2;
      s2 = t - (c = t | 0);
      s[k] -= s2;

      if (s[k] < 0) {
        s[k] += 1;
      }

      return r;
    };

    random.uint32 = function () {
      return random() * 0x100000000; // 2^32
    };

    random.fract53 = function () {
      return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };

    random.addNoise = function () {
      for (var i = arguments.length - 1; i >= 0; i--) {
        for (j = 0; j < 8; j++) {
          s[j] -= mash(arguments[i]);

          if (s[j] < 0) {
            s[j] += 1;
          }
        }
      }
    };

    random.version = 'Kybos 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = Kybos;

/***/ }),

/***/ 105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function LFIB4() {
  return function (args) {
    /*! George Marsaglia's LFIB4, */

    /*! http://groups.google.com/group/sci.crypt/msg/eb4ddde782b17051 */
    var k0 = 0,
        k1 = 58,
        k2 = 119,
        k3 = 178;
    var s = [];
    var mash = Mash();

    if (args.length === 0) {
      args = [+new Date()];
    }

    for (var j = 0; j < 256; j++) {
      s[j] = mash(' ');
      s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21

      if (s[j] < 0) {
        s[j] += 1;
      }
    }

    for (var i = 0; i < args.length; i++) {
      for (var j = 0; j < 256; j++) {
        s[j] -= mash(args[i]);
        s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21

        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    mash = null;

    var random = function random() {
      var x;
      k0 = k0 + 1 & 255;
      k1 = k1 + 1 & 255;
      k2 = k2 + 1 & 255;
      k3 = k3 + 1 & 255;
      x = s[k0] - s[k1];

      if (x < 0) {
        x += 1;
      }

      x -= s[k2];

      if (x < 0) {
        x += 1;
      }

      x -= s[k3];

      if (x < 0) {
        x += 1;
      }

      return s[k0] = x;
    };

    random.uint32 = function () {
      return random() * 0x100000000 >>> 0; // 2^32
    };

    random.fract53 = random;
    random.version = 'LFIB4 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = LFIB4;

/***/ }),

/***/ 247:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function LFib() {
  return function (args) {
    /*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
    var k0 = 255,
        k1 = 52,
        k2 = 0;
    var s = [];
    var mash = Mash();

    if (args.length === 0) {
      args = [+new Date()];
    }

    for (var j = 0; j < 256; j++) {
      s[j] = mash(' ');
      s[j] -= mash(' ') * 4.76837158203125e-7; // 2^-21

      if (s[j] < 0) {
        s[j] += 1;
      }
    }

    for (var i = 0; i < args.length; i++) {
      for (var j = 0; j < 256; j++) {
        s[j] -= mash(args[i]);
        s[j] -= mash(args[i]) * 4.76837158203125e-7; // 2^-21

        if (s[j] < 0) {
          s[j] += 1;
        }
      }
    }

    mash = null;

    var random = function random() {
      k0 = k0 + 1 & 255;
      k1 = k1 + 1 & 255;
      k2 = k2 + 1 & 255;
      var x = s[k0] - s[k1];

      if (x < 0.0) {
        x += 1.0;
      }

      x -= s[k2];

      if (x < 0.0) {
        x += 1.0;
      }

      return s[k0] = x;
    };

    random.uint32 = function () {
      return random() * 0x100000000 >>> 0; // 2^32
    };

    random.fract53 = random;
    random.version = 'LFib 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = LFib;

/***/ }),

/***/ 759:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function MRG32k3a() {
  return function (args) {
    /*! Copyright (c) 1998, 2002 Pierre L'Ecuyer, DIRO, Université de Montréal. */

    /*! http://www.iro.umontreal.ca/~lecuyer/ */
    var m1 = 4294967087;
    var m2 = 4294944443;
    var s10 = 12345,
        s11 = 12345,
        s12 = 123,
        s20 = 12345,
        s21 = 12345,
        s22 = 123;

    if (args.length === 0) {
      args = [+new Date()];
    }

    var mash = Mash();

    for (var i = 0; i < args.length; i++) {
      s10 += mash(args[i]) * 0x100000000; // 2 ^ 32

      s11 += mash(args[i]) * 0x100000000;
      s12 += mash(args[i]) * 0x100000000;
      s20 += mash(args[i]) * 0x100000000;
      s21 += mash(args[i]) * 0x100000000;
      s22 += mash(args[i]) * 0x100000000;
    }

    s10 %= m1;
    s11 %= m1;
    s12 %= m1;
    s20 %= m2;
    s21 %= m2;
    s22 %= m2;
    mash = null;

    var uint32 = function uint32() {
      var m1 = 4294967087;
      var m2 = 4294944443;
      var a12 = 1403580;
      var a13n = 810728;
      var a21 = 527612;
      var a23n = 1370589;
      var k, p1, p2;
      /* Component 1 */

      p1 = a12 * s11 - a13n * s10;
      k = p1 / m1 | 0;
      p1 -= k * m1;
      if (p1 < 0) p1 += m1;
      s10 = s11;
      s11 = s12;
      s12 = p1;
      /* Component 2 */

      p2 = a21 * s22 - a23n * s20;
      k = p2 / m2 | 0;
      p2 -= k * m2;
      if (p2 < 0) p2 += m2;
      s20 = s21;
      s21 = s22;
      s22 = p2;
      /* Combination */

      if (p1 <= p2) return p1 - p2 + m1;else return p1 - p2;
    };

    var random = function random() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };

    random.uint32 = uint32;

    random.fract53 = function () {
      return random() + (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'MRG32k3a 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = MRG32k3a;

/***/ }),

/***/ 165:
/***/ ((module) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */

/*! Johannes Baagøe <baagoe@baagoe.com>, 2010 */
function Mash() {
  var n = 0xefc8249d;

  var mash = function mash(data) {
    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  mash.version = 'Mash 0.9';
  return mash;
}

module.exports = Mash;

/***/ }),

/***/ 779:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*! From http://baagoe.com/en/RandomMusings/javascript/ */
var Mash = __webpack_require__(165);

function Xorshift03() {
  return function (args) {
    /*! George Marsaglia, 13 May 2003 */

    /*! http://groups.google.com/group/comp.lang.c/msg/e3c4ea1169e463ae */
    var x = 123456789,
        y = 362436069,
        z = 521288629,
        w = 88675123,
        v = 886756453;

    if (args.length == 0) {
      args = [+new Date()];
    }

    var mash = Mash();

    for (var i = 0; i < args.length; i++) {
      x ^= mash(args[i]) * 0x100000000; // 2^32

      y ^= mash(args[i]) * 0x100000000;
      z ^= mash(args[i]) * 0x100000000;
      v ^= mash(args[i]) * 0x100000000;
      w ^= mash(args[i]) * 0x100000000;
    }

    mash = null;

    var uint32 = function uint32() {
      var t = (x ^ x >>> 7) >>> 0;
      x = y;
      y = z;
      z = w;
      w = v;
      v = v ^ v << 6 ^ (t ^ t << 13) >>> 0;
      return (y + y + 1) * v >>> 0;
    };

    var random = function random() {
      return uint32() * 2.3283064365386963e-10; // 2^-32
    };

    random.uint32 = uint32;

    random.fract53 = function () {
      return random() + (uint32() & 0x1fffff) * 1.1102230246251565e-16; // 2^-53
    };

    random.version = 'Xorshift03 0.9';
    random.args = args;
    return random;
  }(Array.prototype.slice.call(arguments));
}

;
module.exports = Xorshift03;

/***/ }),

/***/ 664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Alea = __webpack_require__(544);

var KISS07 = __webpack_require__(825);

var Kybos = __webpack_require__(139);

var LFib = __webpack_require__(247);

var LFIB4 = __webpack_require__(105);

var MRG32k3a = __webpack_require__(759);

var Xorshift03 = __webpack_require__(779);

module.exports = {
  Alea,
  KISS07,
  Kybos,
  LFib,
  LFIB4,
  MRG32k3a,
  Xorshift03
};

/***/ }),

/***/ 670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(344),
    passfather = _require.passfather;

module.exports = passfather;

/***/ }),

/***/ 344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = __webpack_require__(599),
    compact = _require.compact,
    assign = _require.assign,
    timesMap = _require.timesMap,
    hasWindow = _require.hasWindow,
    utils = _objectWithoutProperties(_require, ["compact", "assign", "timesMap", "hasWindow"]);

var _require2 = __webpack_require__(852),
    OPTION_VALIDATORS = _require2.OPTION_VALIDATORS,
    ERROR_MESSAGES = _require2.ERROR_MESSAGES,
    DEFAULT_OPTIONS = _require2.DEFAULT_OPTIONS;

var _require3 = __webpack_require__(680),
    DEFAULT_BROWSER_SEED = _require3.DEFAULT_BROWSER_SEED,
    DEFAULT_NODE_SEED = _require3.DEFAULT_NODE_SEED;

var _random = utils.random;
var _randomItem = utils.randomItem;
var _shuffle = utils.shuffle;
/**
 * UTF-8 char diapasons
 * @const
 */

var CHAR_RANGES = [[[48, 57]], // Numbers
[[65, 90]], // Uppercase
[[97, 122]], // Lowercase
[[33, 46], [58, 64], [94, 96], [123, 126]] // Symbols
];
/**
 * Returns char ranges by options
 * @param {Object} options
 * @return {Array} Char diapasons
 */

function getCharRanges(options) {
  return compact([].concat(options.numbers && [CHAR_RANGES[0]], options.uppercase && [CHAR_RANGES[1]], options.lowercase && [CHAR_RANGES[2]], options.symbols && [CHAR_RANGES[3]], options.ranges && options.ranges));
}

function getEnvironmentSeed(_ref) {
  var seed = _ref.seed;
  var hasSeed = Boolean(seed);

  if (hasWindow()) {
    return hasSeed ? seed : DEFAULT_BROWSER_SEED;
  }

  return hasSeed ? seed : DEFAULT_NODE_SEED;
}
/**
 * Generate password
 * @param {Object} options
 * @return {String} Password
 */


function passfather(options) {
  var errorCode = OPTION_VALIDATORS.completely(options);

  if (errorCode > 0) {
    throw ERROR_MESSAGES[errorCode];
  }

  var opts = assign({}, DEFAULT_OPTIONS, options, passfather.prototype._dev.options);

  var shuffle = function shuffle(arr) {
    var seed = _shuffle(getEnvironmentSeed(opts));

    return _shuffle(arr, opts.prng, seed);
  };

  var random = function random(diapason) {
    var seed = _shuffle(getEnvironmentSeed(opts));

    return _random(diapason, opts.prng, _shuffle(seed));
  };

  var randomItem = function randomItem(arr) {
    var seed = _shuffle(getEnvironmentSeed(opts));

    return _randomItem(arr, opts.prng, _shuffle(seed));
  };

  var charRanges = getCharRanges(opts);
  var requiredChars = timesMap(charRanges.length, function (item, index) {
    return String.fromCharCode(random(randomItem(charRanges[index])));
  });

  if (requiredChars.length >= opts.length) {
    return shuffle(requiredChars).slice(0, opts.length).join('');
  }

  return shuffle(timesMap(opts.length - requiredChars.length, function () {
    return String.fromCharCode(random(randomItem(randomItem(charRanges))));
  }).concat(requiredChars)).join('');
}

passfather.prototype._dev = {
  options: {}
};
module.exports = {
  passfather,
  DEFAULT_OPTIONS,
  CHAR_RANGES,
  ERROR_MESSAGES
};

/***/ }),

/***/ 680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(599),
    compact = _require.compact,
    hasWindow = _require.hasWindow;

var os = hasWindow() ? {} : eval(`require('os')`);
/**
 * Default seed for prng
 * @const
 */

var DEFAULT_NODE_SEED = !hasWindow() ? compact([].concat(Date.now(), process.memoryUsage ? [process.memoryUsage().heapTotal, process.memoryUsage().heapUsed] : null, process.env ? [process.arch, process.platform, os.cpus().length, os.totalmem()] : null)) : null;
/**
 * Default seed for prng
 * @const
 */

var DEFAULT_BROWSER_SEED = hasWindow() ? compact([].concat(Date.now(), performance && performance.memory ? [performance.memory.totalJSHeapSize, performance.memory.usedJSHeapSize] : null, navigator ? [navigator.userAgent, navigator.appVersion, navigator.hardwareConcurrency, navigator.deviceMemory] : null)) : null;
module.exports = {
  DEFAULT_NODE_SEED,
  DEFAULT_BROWSER_SEED
};

/***/ }),

/***/ 599:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var PRNGs = __webpack_require__(664);

var PRNGKeys = new Set(Object.keys(PRNGs));
/**
 * Returns true if the code runs in Window
 * @return {Boolaen}
 */

function hasWindow() {
  return typeof window !== 'undefined' && window.hasOwnProperty('Window') && window instanceof window.Window;
}
/**
 * Returns crypto module for this environment
 */


function getCrypto() {
  return hasWindow() ? window.crypto : eval(`require('crypto')`);
}
/**
 * Returns 32bit random integer
 * @param { String } prng Password random number generator
 * @param { Array } seed Seed
 * @return {Number}
 */


function getRandomUint32(prng, seed) {
  var hasPRNG = PRNGKeys.has(prng);
  prng && prng !== 'default' && !hasPRNG && console.warn(`PRNG ${prng} is not supported`);

  if (prng && prng !== 'default' && PRNGKeys.has(prng)) {
    var prngFn = seed ? new PRNGs[prng](seed) : new PRNGs[prng]();
    return prngFn.uint32();
  }

  var crypto = getCrypto();
  return hasWindow() ? crypto.getRandomValues(new Uint32Array(1))[0] : parseInt(crypto.randomBytes(4).toString('hex'), 16);
}
/**
 * Returns random number
 * @param {[Number, Number]} diapason [min, max]
 * @param { String } prng Password random number generator
 * @param { Array } seed Seed
 * @return {Number} Random number
 */


function random(diapason, prng, seed) {
  var randomInt = getRandomUint32(prng, seed);
  var range = diapason[1] - diapason[0] + 1;
  return randomInt >= Math.floor(4294967295 / range) * range ? random(diapason) : diapason[0] + randomInt % range;
}
/**
 * Returns random item from array
 * @param {Array} arr
 * @param {Function} prng Password random number generator
 * @param { Array } seed Seed
 * @return {*} Random item
 */


function randomItem(arr, prng, seed) {
  return arr[random([0, arr.length - 1], prng, seed)];
}
/**
 * Returns array without values
 * @param {Array} arr to filter
 * @param {Array} values Values Discarded values
 * @return {Array}
 */


function without(arr, values) {
  return arr.filter(function (item) {
    return values.includes(item) === false;
  });
}
/**
 * Search values in array
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean} Returns true if arr has one of values
 */


function includes(arr, values) {
  return arr.some(function (item) {
    return values.includes(item);
  });
}
/**
 * Returns true if arr includes all of the values
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean}
 */


function includesAll(arr, values) {
  return values.some(function (item) {
    return arr.includes(item) === false;
  }) === false;
}
/**
 * Returns true if the arr haven't values
 * @param {Array} arr Array to search
 * @param {Array} values Values to search
 * @return {Boolean}
 */


function excludes(arr, values) {
  return arr.some(function (item) {
    return values.includes(item);
  }) === false;
}
/**
 * Returns array last index
 * @param {Array} arr
 * @return {Number}
 */


function lastIndex(arr) {
  return arr.length - 1;
}
/**
 * Remove false, null, 0, "", undefined, NaN
 * @param {Array} arr
 * @return {Array}
 */


function compact(arr) {
  return arr.filter(Boolean);
}
/**
 * Returns true is value is boolean
 * @param {*} value
 * @return {Boolean}
 */


function isBoolean(value) {
  return value === true || value === false;
}
/**
 * Returns true if the value is array
 * @param {*} value
 * @return {Boolean}
 */


function isArray(value) {
  return value instanceof Array;
}
/**
 * Returns object keys as an array
 * @param {Object} obj
 * @return {Array}
 */


function keys(obj) {
  return Object.keys(obj);
}
/**
 * Returns true ig the value is integer
 * @param {*} value
 * @return {Boolean}
 */


function isInteger(value) {
  return Number.isInteger(value);
}
/**
 * Returns true ig the value is number
 * @param {*} value
 * @return {Boolean}
 */


function isNumber(value) {
  return typeof value === 'number' && isNaN(value) === false;
}
/**
 * Returns true ig the value is string
 * @param {*} value
 * @return {Boolean}
 */


function isString(value) {
  return typeof value === 'string';
}
/**
 * Returns true is value is Object
 * @param {*} value
 * @return {Boolean}
 */


function isPlainObject(value) {
  try {
    return /^\{.*\}$/.test(JSON.stringify(value)) === true && value instanceof Map === false;
  } catch (e) {
    return false;
  }
}
/**
 * Object assign
 * @return {Object}
 */


function assign() {
  return Object.assign.apply(Object, arguments);
}
/**
 * Make empty array by length and map it
 * @param {Number} times
 * @param {Function} iteratee The function invoked per iteration
 * @return {Array}timesMap
 */


function timesMap(times, iteratee) {
  return Array(times).fill().map(iteratee);
}
/**
 * Make number sequence
 * @param {Number} from
 * @param {Number} to
 * @param {Boolean} inclusive If true then result array will contain "to" number in last
 * @return {Array} number[]
 */


function numSequence(from, to, inclusive) {
  return function (result) {
    return inclusive ? result.push(to) && result : result;
  }(timesMap(to - from, function (item, key) {
    return from + key;
  }));
}
/**
 * Shuffle array
 * @param {Array} arr
 * @return {Array}
 */


function shuffle(arr, prng, seed) {
  if (arr.length <= 1) return arr;
  timesMap(arr.length, function (item, index) {
    var randomIndex = random([0, arr.length - 1], prng, seed);
    var _ref = [arr[randomIndex], arr[index]];
    arr[index] = _ref[0];
    arr[randomIndex] = _ref[1];
  });
  return arr;
}
/**
 * Returns UTF-8 chars by diapason
 * @param {Array} diapason [from, to]
 * @return {String} All chars in one string
 */


function getCharsByDiapason(diapason) {
  return String.fromCodePoint.apply(String, numSequence(diapason[0], diapason[1], true));
}
/**
 * Returns true is value is UTF-8 char code
 * @param {*} value
 * @return {Boolean}
 */


function isCharCode(value) {
  return String.fromCharCode(value) !== String.fromCharCode(false);
}
/**
 * Escape regexp operators
 * @link https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param {*} value
 * @return {String}
 */


function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
/**
 * Pick values from array
 * @param {Array} arr
 * @param {Array} values
 * @return {Array}
 */


function pick(arr, values) {
  return arr.filter(function (item) {
    return values.includes(item);
  });
}

module.exports = {
  hasWindow,
  getRandomUint32,
  random,
  randomItem,
  without,
  includes,
  includesAll,
  excludes,
  lastIndex,
  compact,
  keys,
  isInteger,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isPlainObject,
  assign,
  timesMap,
  numSequence,
  shuffle,
  getCharsByDiapason,
  isCharCode,
  escapeRegExp
};

/***/ }),

/***/ 852:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(599),
    keys = _require.keys,
    isInteger = _require.isInteger,
    includesAll = _require.includesAll,
    isBoolean = _require.isBoolean,
    isArray = _require.isArray,
    isPlainObject = _require.isPlainObject,
    assign = _require.assign,
    without = _require.without,
    isCharCode = _require.isCharCode,
    isString = _require.isString,
    isNumber = _require.isNumber;

var PRNGs = __webpack_require__(664);

var _require2 = __webpack_require__(876),
    name = _require2.name;
/**
 * Module name
 * @const
 */


var MODULE_NAME = name;
/**
 * Default passfather options
 * @const
 */

var DEFAULT_OPTIONS = {
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
  length: 12,
  ranges: null,
  prng: 'default',
  seed: null
};
/**
 * Functions to validate options
 * Methods must return true is validation successfully passed
 */

var OPTION_VALIDATORS = {
  numbers: function numbers(value) {
    return isBoolean(value);
  },
  uppercase: function uppercase(value) {
    return isBoolean(value);
  },
  lowercase: function lowercase(value) {
    return isBoolean(value);
  },
  symbols: function symbols(value) {
    return isBoolean(value);
  },
  length: function length(value) {
    return isInteger(value) && value > 0;
  },
  ranges: function ranges(value) {
    var isArrayOfRanges = function isArrayOfRanges(some) {
      return isArray(some) && some.length > 0 && some.every(function (item) {
        return isArray(item) && isCharCode(item[0]) && isCharCode(item[1]);
      });
    };

    return isArray(value) && value.length > 0 && value.every(function (item) {
      return isArrayOfRanges(item);
    });
  },
  prng: function prng(value) {
    return ['default'].concat(keys(PRNGs)).includes(value);
  },
  seed: function seed(value) {
    return isArray(value) && value.length > 0 && value.some(function (item) {
      return isString(item) ? false : !isNumber(item);
    }) === false;
  },

  /**
   * Completely option validate
   * @param {Object} options
   * @return {Number} Error code or 0 if validation passed
   */
  completely(options) {
    var _this = this;

    var cases = [// [IMPORTANT] Order is important, because index of case matches with error code
    function () {
      return (options === undefined || isPlainObject(options) && keys(options).length === 0) === false;
    }, function () {
      return isPlainObject(options);
    }, function () {
      return includesAll(keys(DEFAULT_OPTIONS), keys(options));
    }, function () {
      return options.hasOwnProperty('ranges') === false || _this.ranges(options.ranges);
    }, function () {
      return options.hasOwnProperty('numbers') === false || _this.numbers(options.numbers);
    }, function () {
      return options.hasOwnProperty('uppercase') === false || _this.uppercase(options.uppercase);
    }, function () {
      return options.hasOwnProperty('lowercase') === false || _this.lowercase(options.lowercase);
    }, function () {
      return options.hasOwnProperty('symbols') === false || _this.symbols(options.symbols);
    }, function () {
      return options.hasOwnProperty('length') === false || _this.length(options.length);
    }, function () {
      return options.hasOwnProperty('prng') === false || _this.prng(options.prng);
    }, function () {
      return options.hasOwnProperty('seed') === false || _this.seed(options.seed);
    }, function () {
      var opts = assign({}, DEFAULT_OPTIONS, options);
      return without(keys(opts), ['length']).some(function (key) {
        return key === 'ranges' ? isArray(opts[key]) : opts[key] === true;
      });
    }, function () {
      var opts = assign({}, DEFAULT_OPTIONS, options);
      return (options.hasOwnProperty('seed') && opts.prng === 'default') === false;
    }];
    var result = cases.findIndex(function (item) {
      return item() === false;
    });
    return result;
  }

};
/**
 * Error messages by error code.
 * [IMPORTANT] Order is important, because index of error message matches with validation case.
 */

var ERROR_MESSAGES = [];
ERROR_MESSAGES[0] = 'No errors';
ERROR_MESSAGES[1] = `[${MODULE_NAME}]: Option must be an object`;
ERROR_MESSAGES[2] = `[${MODULE_NAME}]: Options must contains only one (or several) of [${keys(DEFAULT_OPTIONS).join(', ')}]`;
ERROR_MESSAGES[3] = `[${MODULE_NAME}]: Option "ranges" must be array with array of UTF-8 char code range. For example: [ [[48, 57 ]], [[33, 46], [58, 64], [94, 96], [123, 126]] ] `;
ERROR_MESSAGES[4] = `[${MODULE_NAME}]: Option "numbers" must be boolean`;
ERROR_MESSAGES[5] = `[${MODULE_NAME}]: Option "uppercase" must be boolean`;
ERROR_MESSAGES[6] = `[${MODULE_NAME}]: Option "lowercase" must be boolean`;
ERROR_MESSAGES[7] = `[${MODULE_NAME}]: Option "symbols" must be boolean`;
ERROR_MESSAGES[8] = `[${MODULE_NAME}]: Option "length" must be integer greater than 0`;
ERROR_MESSAGES[9] = `[${MODULE_NAME}]: Option "prng" must be one of [${['default'].concat(keys(PRNGs)).join(', ')}]`;
ERROR_MESSAGES[10] = `[${MODULE_NAME}]: Option "seed" must be array of strings or numbers`;
ERROR_MESSAGES[11] = `[${MODULE_NAME}]: At less one of options [${without(keys(DEFAULT_OPTIONS), ['length', 'prng', 'seed']).join(', ')}] mustn't be false`;
ERROR_MESSAGES[12] = `[${MODULE_NAME}]: Option "seed" cannot be used when "prng" option is default. Set "prng" option to one  of [${keys(PRNGs).join(', ')}]`;
module.exports = {
  OPTION_VALIDATORS,
  ERROR_MESSAGES,
  MODULE_NAME,
  DEFAULT_OPTIONS
};

/***/ }),

/***/ 876:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"passfather","version":"3.0.3","description":"Passfather is very fast and powerful utility with zero dependencies to generate strong password","author":"Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)","contributors":["Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)"],"maintainers":["Evgeny Vyushin <e@vyushin.ru> (https://github.com/vyushin)"],"repository":{"type":"git","url":"https://github.com/vyushin/passfather"},"scripts":{"install-all":"cd ./build && npm install && cd ../test && npm install","build:cdn":"cd ./build && npm run build:cdn","build:umd":"cd ./build && npm run build:umd","build":"cd ./build && npm run build","pretest":"npm run build","test":"cd ./test && npm test","prepublish":"npm test"},"bugs":{"url":"https://github.com/vyushin/passfather/issues"},"homepage":"https://github.com/vyushin/passfather","main":"./dist/passfather.js","module":"./dist/passfather.esm.js","types":"./dist/passfather.d.ts","license":"MIT","keywords":["password","generator","passgen"],"directories":{"doc":"./README.md"},"devDependencies":{}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(670);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
}).call(this)}).call(this,require('_process'))

},{"_process":1}],3:[function(require,module,exports){
const passPlace = document.querySelector(".pass");
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  var passfather = require("passfather");
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let password = passfather({
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: false, // Disable symbols
    length: Math.ceil(getRandomArbitrary(7, 12)),
  });
  passPlace.innerHTML = "";
  passPlace.innerHTML = password;
});

// код написан при помощи библиотек passfather и browserify

},{"passfather":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXNzZmF0aGVyL2Rpc3QvcGFzc2ZhdGhlci5qcyIsInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2MUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyohXG4gKiBAZmlsZSBwYXNzZmF0aGVyLmpzXG4gKiBAdmVyc2lvbiAzLjAuM1xuICogQGRlc2NyaXB0aW9uIFBhc3NmYXRoZXIgaXMgdmVyeSBmYXN0IGFuZCBwb3dlcmZ1bCB1dGlsaXR5IHdpdGggemVybyBkZXBlbmRlbmNpZXMgdG8gZ2VuZXJhdGUgc3Ryb25nIHBhc3N3b3JkXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAoYykgMjAxOS1wcmVzZW50LCBFdmdlbnkgVnl1c2hpbiA8ZUB2eXVzaGluLnJ1PiAoaHR0cHM6Ly9naXRodWIuY29tL3Z5dXNoaW4pXG4gKiBAbGljZW5zZVxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgb24gaHR0cHM6Ly9naXRodWIuY29tL3Z5dXNoaW4vcGFzc2ZhdGhlci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwicGFzc2ZhdGhlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJwYXNzZmF0aGVyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInBhc3NmYXRoZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoKCkgPT4geyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlc19fID0gKHtcblxuLyoqKi8gNTQ0OlxuLyoqKi8gKChtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiEgRnJvbSBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2phdmFzY3JpcHQvICovXG52YXIgTWFzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTY1KTtcblxuZnVuY3Rpb24gQWxlYSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgLyohIEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2UuY29tPiwgMjAxMCAqL1xuICAgIHZhciBzMCA9IDA7XG4gICAgdmFyIHMxID0gMDtcbiAgICB2YXIgczIgPSAwO1xuICAgIHZhciBjID0gMTtcblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBhcmdzID0gWytuZXcgRGF0ZSgpXTtcbiAgICB9XG5cbiAgICB2YXIgbWFzaCA9IE1hc2goKTtcbiAgICBzMCA9IG1hc2goJyAnKTtcbiAgICBzMSA9IG1hc2goJyAnKTtcbiAgICBzMiA9IG1hc2goJyAnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgczAgLT0gbWFzaChhcmdzW2ldKTtcblxuICAgICAgaWYgKHMwIDwgMCkge1xuICAgICAgICBzMCArPSAxO1xuICAgICAgfVxuXG4gICAgICBzMSAtPSBtYXNoKGFyZ3NbaV0pO1xuXG4gICAgICBpZiAoczEgPCAwKSB7XG4gICAgICAgIHMxICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHMyIC09IG1hc2goYXJnc1tpXSk7XG5cbiAgICAgIGlmIChzMiA8IDApIHtcbiAgICAgICAgczIgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtYXNoID0gbnVsbDtcblxuICAgIHZhciByYW5kb20gPSBmdW5jdGlvbiByYW5kb20oKSB7XG4gICAgICB2YXIgdCA9IDIwOTE2MzkgKiBzMCArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXG4gICAgICBzMCA9IHMxO1xuICAgICAgczEgPSBzMjtcbiAgICAgIHJldHVybiBzMiA9IHQgLSAoYyA9IHQgfCAwKTtcbiAgICB9O1xuXG4gICAgcmFuZG9tLnVpbnQzMiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByYW5kb20oKSAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG4gICAgfTtcblxuICAgIHJhbmRvbS5mcmFjdDUzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJhbmRvbSgpICsgKHJhbmRvbSgpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTY7IC8vIDJeLTUzXG4gICAgfTtcblxuICAgIHJhbmRvbS52ZXJzaW9uID0gJ0FsZWEgMC45JztcbiAgICByYW5kb20uYXJncyA9IGFyZ3M7XG4gICAgcmV0dXJuIHJhbmRvbTtcbiAgfShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBBbGVhO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gODI1OlxuLyoqKi8gKChtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiEgRnJvbSBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2phdmFzY3JpcHQvICovXG52YXIgTWFzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTY1KTtcblxuZnVuY3Rpb24gS0lTUzA3KCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAvKiEgR2VvcmdlIE1hcnNhZ2xpYSwgMjAwNy0wNi0yMyAqL1xuXG4gICAgLyohIGh0dHA6Ly9ncm91cHMuZ29vZ2xlLmNvbS9ncm91cC9jb21wLmxhbmcuZm9ydHJhbi9tc2cvNmVkYjhhZDZlYzU0MjFhNSAqL1xuICAgIHZhciB4ID0gMTIzNDU2Nzg5O1xuICAgIHZhciB5ID0gMzYyNDM2MDY5O1xuICAgIHZhciB6ID0gMjEyODg2Mjk7XG4gICAgdmFyIHcgPSAxNDkyMTc3NjtcbiAgICB2YXIgYyA9IDA7XG5cbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgYXJncyA9IFsrbmV3IERhdGUoKV07XG4gICAgfVxuXG4gICAgdmFyIG1hc2ggPSBNYXNoKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHggXj0gbWFzaChhcmdzW2ldKSAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG5cbiAgICAgIHkgXj0gbWFzaChhcmdzW2ldKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgeiBePSBtYXNoKGFyZ3NbaV0pICogMHgxMDAwMDAwMDA7XG4gICAgICB3IF49IG1hc2goYXJnc1tpXSkgKiAweDEwMDAwMDAwMDtcbiAgICB9XG5cbiAgICBpZiAoeSA9PT0gMCkge1xuICAgICAgeSA9IDE7XG4gICAgfVxuXG4gICAgYyBePSB6ID4+PiAzMTtcbiAgICB6ICY9IDB4N2ZmZmZmZmY7XG5cbiAgICBpZiAoeiAlIDc1NTkgPT09IDApIHtcbiAgICAgIHorKztcbiAgICB9XG5cbiAgICB3ICY9IDB4N2ZmZmZmZmY7XG5cbiAgICBpZiAodyAlIDc1NTkgPT09IDApIHtcbiAgICAgIHcrKztcbiAgICB9XG5cbiAgICBtYXNoID0gbnVsbDtcblxuICAgIHZhciB1aW50MzIgPSBmdW5jdGlvbiB1aW50MzIoKSB7XG4gICAgICB2YXIgdDtcbiAgICAgIHggKz0gNTQ1OTI1MjkzO1xuICAgICAgeCA+Pj49IDA7XG4gICAgICB5IF49IHkgPDwgMTM7XG4gICAgICB5IF49IHkgPj4+IDE3O1xuICAgICAgeSBePSB5IDw8IDU7XG4gICAgICB0ID0geiArIHcgKyBjO1xuICAgICAgeiA9IHc7XG4gICAgICBjID0gdCA+Pj4gMzE7XG4gICAgICB3ID0gdCAmIDB4N2ZmZmZmZmY7XG4gICAgICByZXR1cm4geCArIHkgKyB3ID4+PiAwO1xuICAgIH07XG5cbiAgICB2YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKCkge1xuICAgICAgcmV0dXJuIHVpbnQzMigpICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICB9O1xuXG4gICAgcmFuZG9tLnVpbnQzMiA9IHVpbnQzMjtcblxuICAgIHJhbmRvbS5mcmFjdDUzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJhbmRvbSgpICsgKHVpbnQzMigpICYgMHgxZmZmZmYpICogMS4xMTAyMjMwMjQ2MjUxNTY1ZS0xNjsgLy8gMl4tNTNcbiAgICB9O1xuXG4gICAgcmFuZG9tLmFyZ3MgPSBhcmdzO1xuICAgIHJhbmRvbS52ZXJzaW9uID0gJ0tJU1MwNyAwLjknO1xuICAgIHJldHVybiByYW5kb207XG4gIH0oQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gS0lTUzA3O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gMTM5OlxuLyoqKi8gKChtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiEgRnJvbSBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2phdmFzY3JpcHQvICovXG52YXIgTWFzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTY1KTtcblxuZnVuY3Rpb24gS3lib3MoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuICAgIC8qISBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTAgKi9cbiAgICB2YXIgczAgPSAwO1xuICAgIHZhciBzMSA9IDA7XG4gICAgdmFyIHMyID0gMDtcbiAgICB2YXIgYyA9IDE7XG4gICAgdmFyIHMgPSBbXTtcbiAgICB2YXIgayA9IDA7XG4gICAgdmFyIG1hc2ggPSBNYXNoKCk7XG4gICAgdmFyIHMwID0gbWFzaCgnICcpO1xuICAgIHZhciBzMSA9IG1hc2goJyAnKTtcbiAgICB2YXIgczIgPSBtYXNoKCcgJyk7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgc1tqXSA9IG1hc2goJyAnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgYXJncyA9IFsrbmV3IERhdGUoKV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzMCAtPSBtYXNoKGFyZ3NbaV0pO1xuXG4gICAgICBpZiAoczAgPCAwKSB7XG4gICAgICAgIHMwICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHMxIC09IG1hc2goYXJnc1tpXSk7XG5cbiAgICAgIGlmIChzMSA8IDApIHtcbiAgICAgICAgczEgKz0gMTtcbiAgICAgIH1cblxuICAgICAgczIgLT0gbWFzaChhcmdzW2ldKTtcblxuICAgICAgaWYgKHMyIDwgMCkge1xuICAgICAgICBzMiArPSAxO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICBzW2pdIC09IG1hc2goYXJnc1tpXSk7XG5cbiAgICAgICAgaWYgKHNbal0gPCAwKSB7XG4gICAgICAgICAgc1tqXSArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJhbmRvbSA9IGZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICAgIHZhciBhID0gMjA5MTYzOTtcbiAgICAgIGsgPSBzW2tdICogOCB8IDA7XG4gICAgICB2YXIgciA9IHNba107XG4gICAgICB2YXIgdCA9IGEgKiBzMCArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuXG4gICAgICBzMCA9IHMxO1xuICAgICAgczEgPSBzMjtcbiAgICAgIHMyID0gdCAtIChjID0gdCB8IDApO1xuICAgICAgc1trXSAtPSBzMjtcblxuICAgICAgaWYgKHNba10gPCAwKSB7XG4gICAgICAgIHNba10gKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIHJhbmRvbS51aW50MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmFuZG9tKCkgKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuICAgIH07XG5cbiAgICByYW5kb20uZnJhY3Q1MyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByYW5kb20oKSArIChyYW5kb20oKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2OyAvLyAyXi01M1xuICAgIH07XG5cbiAgICByYW5kb20uYWRkTm9pc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICBzW2pdIC09IG1hc2goYXJndW1lbnRzW2ldKTtcblxuICAgICAgICAgIGlmIChzW2pdIDwgMCkge1xuICAgICAgICAgICAgc1tqXSArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByYW5kb20udmVyc2lvbiA9ICdLeWJvcyAwLjknO1xuICAgIHJhbmRvbS5hcmdzID0gYXJncztcbiAgICByZXR1cm4gcmFuZG9tO1xuICB9KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IEt5Ym9zO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gMTA1OlxuLyoqKi8gKChtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiEgRnJvbSBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2phdmFzY3JpcHQvICovXG52YXIgTWFzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTY1KTtcblxuZnVuY3Rpb24gTEZJQjQoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuICAgIC8qISBHZW9yZ2UgTWFyc2FnbGlhJ3MgTEZJQjQsICovXG5cbiAgICAvKiEgaHR0cDovL2dyb3Vwcy5nb29nbGUuY29tL2dyb3VwL3NjaS5jcnlwdC9tc2cvZWI0ZGRkZTc4MmIxNzA1MSAqL1xuICAgIHZhciBrMCA9IDAsXG4gICAgICAgIGsxID0gNTgsXG4gICAgICAgIGsyID0gMTE5LFxuICAgICAgICBrMyA9IDE3ODtcbiAgICB2YXIgcyA9IFtdO1xuICAgIHZhciBtYXNoID0gTWFzaCgpO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICBhcmdzID0gWytuZXcgRGF0ZSgpXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI1NjsgaisrKSB7XG4gICAgICBzW2pdID0gbWFzaCgnICcpO1xuICAgICAgc1tqXSAtPSBtYXNoKCcgJykgKiA0Ljc2ODM3MTU4MjAzMTI1ZS03OyAvLyAyXi0yMVxuXG4gICAgICBpZiAoc1tqXSA8IDApIHtcbiAgICAgICAgc1tqXSArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNTY7IGorKykge1xuICAgICAgICBzW2pdIC09IG1hc2goYXJnc1tpXSk7XG4gICAgICAgIHNbal0gLT0gbWFzaChhcmdzW2ldKSAqIDQuNzY4MzcxNTgyMDMxMjVlLTc7IC8vIDJeLTIxXG5cbiAgICAgICAgaWYgKHNbal0gPCAwKSB7XG4gICAgICAgICAgc1tqXSArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFzaCA9IG51bGw7XG5cbiAgICB2YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKCkge1xuICAgICAgdmFyIHg7XG4gICAgICBrMCA9IGswICsgMSAmIDI1NTtcbiAgICAgIGsxID0gazEgKyAxICYgMjU1O1xuICAgICAgazIgPSBrMiArIDEgJiAyNTU7XG4gICAgICBrMyA9IGszICsgMSAmIDI1NTtcbiAgICAgIHggPSBzW2swXSAtIHNbazFdO1xuXG4gICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgeCArPSAxO1xuICAgICAgfVxuXG4gICAgICB4IC09IHNbazJdO1xuXG4gICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgeCArPSAxO1xuICAgICAgfVxuXG4gICAgICB4IC09IHNbazNdO1xuXG4gICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgeCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc1trMF0gPSB4O1xuICAgIH07XG5cbiAgICByYW5kb20udWludDMyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJhbmRvbSgpICogMHgxMDAwMDAwMDAgPj4+IDA7IC8vIDJeMzJcbiAgICB9O1xuXG4gICAgcmFuZG9tLmZyYWN0NTMgPSByYW5kb207XG4gICAgcmFuZG9tLnZlcnNpb24gPSAnTEZJQjQgMC45JztcbiAgICByYW5kb20uYXJncyA9IGFyZ3M7XG4gICAgcmV0dXJuIHJhbmRvbTtcbiAgfShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbn1cblxuO1xubW9kdWxlLmV4cG9ydHMgPSBMRklCNDtcblxuLyoqKi8gfSksXG5cbi8qKiovIDI0Nzpcbi8qKiovICgobW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyohIEZyb20gaHR0cDovL2JhYWdvZS5jb20vZW4vUmFuZG9tTXVzaW5ncy9qYXZhc2NyaXB0LyAqL1xudmFyIE1hc2ggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2NSk7XG5cbmZ1bmN0aW9uIExGaWIoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuICAgIC8qISBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTAgKi9cbiAgICB2YXIgazAgPSAyNTUsXG4gICAgICAgIGsxID0gNTIsXG4gICAgICAgIGsyID0gMDtcbiAgICB2YXIgcyA9IFtdO1xuICAgIHZhciBtYXNoID0gTWFzaCgpO1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICBhcmdzID0gWytuZXcgRGF0ZSgpXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI1NjsgaisrKSB7XG4gICAgICBzW2pdID0gbWFzaCgnICcpO1xuICAgICAgc1tqXSAtPSBtYXNoKCcgJykgKiA0Ljc2ODM3MTU4MjAzMTI1ZS03OyAvLyAyXi0yMVxuXG4gICAgICBpZiAoc1tqXSA8IDApIHtcbiAgICAgICAgc1tqXSArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAyNTY7IGorKykge1xuICAgICAgICBzW2pdIC09IG1hc2goYXJnc1tpXSk7XG4gICAgICAgIHNbal0gLT0gbWFzaChhcmdzW2ldKSAqIDQuNzY4MzcxNTgyMDMxMjVlLTc7IC8vIDJeLTIxXG5cbiAgICAgICAgaWYgKHNbal0gPCAwKSB7XG4gICAgICAgICAgc1tqXSArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFzaCA9IG51bGw7XG5cbiAgICB2YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKCkge1xuICAgICAgazAgPSBrMCArIDEgJiAyNTU7XG4gICAgICBrMSA9IGsxICsgMSAmIDI1NTtcbiAgICAgIGsyID0gazIgKyAxICYgMjU1O1xuICAgICAgdmFyIHggPSBzW2swXSAtIHNbazFdO1xuXG4gICAgICBpZiAoeCA8IDAuMCkge1xuICAgICAgICB4ICs9IDEuMDtcbiAgICAgIH1cblxuICAgICAgeCAtPSBzW2syXTtcblxuICAgICAgaWYgKHggPCAwLjApIHtcbiAgICAgICAgeCArPSAxLjA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzW2swXSA9IHg7XG4gICAgfTtcblxuICAgIHJhbmRvbS51aW50MzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmFuZG9tKCkgKiAweDEwMDAwMDAwMCA+Pj4gMDsgLy8gMl4zMlxuICAgIH07XG5cbiAgICByYW5kb20uZnJhY3Q1MyA9IHJhbmRvbTtcbiAgICByYW5kb20udmVyc2lvbiA9ICdMRmliIDAuOSc7XG4gICAgcmFuZG9tLmFyZ3MgPSBhcmdzO1xuICAgIHJldHVybiByYW5kb207XG4gIH0oQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG59XG5cbjtcbm1vZHVsZS5leHBvcnRzID0gTEZpYjtcblxuLyoqKi8gfSksXG5cbi8qKiovIDc1OTpcbi8qKiovICgobW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuLyohIEZyb20gaHR0cDovL2JhYWdvZS5jb20vZW4vUmFuZG9tTXVzaW5ncy9qYXZhc2NyaXB0LyAqL1xudmFyIE1hc2ggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2NSk7XG5cbmZ1bmN0aW9uIE1SRzMyazNhKCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAvKiEgQ29weXJpZ2h0IChjKSAxOTk4LCAyMDAyIFBpZXJyZSBMJ0VjdXllciwgRElSTywgVW5pdmVyc2l0w6kgZGUgTW9udHLDqWFsLiAqL1xuXG4gICAgLyohIGh0dHA6Ly93d3cuaXJvLnVtb250cmVhbC5jYS9+bGVjdXllci8gKi9cbiAgICB2YXIgbTEgPSA0Mjk0OTY3MDg3O1xuICAgIHZhciBtMiA9IDQyOTQ5NDQ0NDM7XG4gICAgdmFyIHMxMCA9IDEyMzQ1LFxuICAgICAgICBzMTEgPSAxMjM0NSxcbiAgICAgICAgczEyID0gMTIzLFxuICAgICAgICBzMjAgPSAxMjM0NSxcbiAgICAgICAgczIxID0gMTIzNDUsXG4gICAgICAgIHMyMiA9IDEyMztcblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYXJncyA9IFsrbmV3IERhdGUoKV07XG4gICAgfVxuXG4gICAgdmFyIG1hc2ggPSBNYXNoKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHMxMCArPSBtYXNoKGFyZ3NbaV0pICogMHgxMDAwMDAwMDA7IC8vIDIgXiAzMlxuXG4gICAgICBzMTEgKz0gbWFzaChhcmdzW2ldKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgczEyICs9IG1hc2goYXJnc1tpXSkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHMyMCArPSBtYXNoKGFyZ3NbaV0pICogMHgxMDAwMDAwMDA7XG4gICAgICBzMjEgKz0gbWFzaChhcmdzW2ldKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgczIyICs9IG1hc2goYXJnc1tpXSkgKiAweDEwMDAwMDAwMDtcbiAgICB9XG5cbiAgICBzMTAgJT0gbTE7XG4gICAgczExICU9IG0xO1xuICAgIHMxMiAlPSBtMTtcbiAgICBzMjAgJT0gbTI7XG4gICAgczIxICU9IG0yO1xuICAgIHMyMiAlPSBtMjtcbiAgICBtYXNoID0gbnVsbDtcblxuICAgIHZhciB1aW50MzIgPSBmdW5jdGlvbiB1aW50MzIoKSB7XG4gICAgICB2YXIgbTEgPSA0Mjk0OTY3MDg3O1xuICAgICAgdmFyIG0yID0gNDI5NDk0NDQ0MztcbiAgICAgIHZhciBhMTIgPSAxNDAzNTgwO1xuICAgICAgdmFyIGExM24gPSA4MTA3Mjg7XG4gICAgICB2YXIgYTIxID0gNTI3NjEyO1xuICAgICAgdmFyIGEyM24gPSAxMzcwNTg5O1xuICAgICAgdmFyIGssIHAxLCBwMjtcbiAgICAgIC8qIENvbXBvbmVudCAxICovXG5cbiAgICAgIHAxID0gYTEyICogczExIC0gYTEzbiAqIHMxMDtcbiAgICAgIGsgPSBwMSAvIG0xIHwgMDtcbiAgICAgIHAxIC09IGsgKiBtMTtcbiAgICAgIGlmIChwMSA8IDApIHAxICs9IG0xO1xuICAgICAgczEwID0gczExO1xuICAgICAgczExID0gczEyO1xuICAgICAgczEyID0gcDE7XG4gICAgICAvKiBDb21wb25lbnQgMiAqL1xuXG4gICAgICBwMiA9IGEyMSAqIHMyMiAtIGEyM24gKiBzMjA7XG4gICAgICBrID0gcDIgLyBtMiB8IDA7XG4gICAgICBwMiAtPSBrICogbTI7XG4gICAgICBpZiAocDIgPCAwKSBwMiArPSBtMjtcbiAgICAgIHMyMCA9IHMyMTtcbiAgICAgIHMyMSA9IHMyMjtcbiAgICAgIHMyMiA9IHAyO1xuICAgICAgLyogQ29tYmluYXRpb24gKi9cblxuICAgICAgaWYgKHAxIDw9IHAyKSByZXR1cm4gcDEgLSBwMiArIG0xO2Vsc2UgcmV0dXJuIHAxIC0gcDI7XG4gICAgfTtcblxuICAgIHZhciByYW5kb20gPSBmdW5jdGlvbiByYW5kb20oKSB7XG4gICAgICByZXR1cm4gdWludDMyKCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgIH07XG5cbiAgICByYW5kb20udWludDMyID0gdWludDMyO1xuXG4gICAgcmFuZG9tLmZyYWN0NTMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmFuZG9tKCkgKyAodWludDMyKCkgJiAweDFmZmZmZikgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2OyAvLyAyXi01M1xuICAgIH07XG5cbiAgICByYW5kb20udmVyc2lvbiA9ICdNUkczMmszYSAwLjknO1xuICAgIHJhbmRvbS5hcmdzID0gYXJncztcbiAgICByZXR1cm4gcmFuZG9tO1xuICB9KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IE1SRzMyazNhO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gMTY1OlxuLyoqKi8gKChtb2R1bGUpID0+IHtcblxuLyohIEZyb20gaHR0cDovL2JhYWdvZS5jb20vZW4vUmFuZG9tTXVzaW5ncy9qYXZhc2NyaXB0LyAqL1xuXG4vKiEgSm9oYW5uZXMgQmFhZ8O4ZSA8YmFhZ29lQGJhYWdvZS5jb20+LCAyMDEwICovXG5mdW5jdGlvbiBNYXNoKCkge1xuICB2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cbiAgdmFyIG1hc2ggPSBmdW5jdGlvbiBtYXNoKGRhdGEpIHtcbiAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgIHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG4gICAgICBuID0gaCA+Pj4gMDtcbiAgICAgIGggLT0gbjtcbiAgICAgIGggKj0gbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgbiArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcbiAgICB9XG5cbiAgICByZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgfTtcblxuICBtYXNoLnZlcnNpb24gPSAnTWFzaCAwLjknO1xuICByZXR1cm4gbWFzaDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXNoO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gNzc5OlxuLyoqKi8gKChtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG4vKiEgRnJvbSBodHRwOi8vYmFhZ29lLmNvbS9lbi9SYW5kb21NdXNpbmdzL2phdmFzY3JpcHQvICovXG52YXIgTWFzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTY1KTtcblxuZnVuY3Rpb24gWG9yc2hpZnQwMygpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgLyohIEdlb3JnZSBNYXJzYWdsaWEsIDEzIE1heSAyMDAzICovXG5cbiAgICAvKiEgaHR0cDovL2dyb3Vwcy5nb29nbGUuY29tL2dyb3VwL2NvbXAubGFuZy5jL21zZy9lM2M0ZWExMTY5ZTQ2M2FlICovXG4gICAgdmFyIHggPSAxMjM0NTY3ODksXG4gICAgICAgIHkgPSAzNjI0MzYwNjksXG4gICAgICAgIHogPSA1MjEyODg2MjksXG4gICAgICAgIHcgPSA4ODY3NTEyMyxcbiAgICAgICAgdiA9IDg4Njc1NjQ1MztcblxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBhcmdzID0gWytuZXcgRGF0ZSgpXTtcbiAgICB9XG5cbiAgICB2YXIgbWFzaCA9IE1hc2goKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgeCBePSBtYXNoKGFyZ3NbaV0pICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcblxuICAgICAgeSBePSBtYXNoKGFyZ3NbaV0pICogMHgxMDAwMDAwMDA7XG4gICAgICB6IF49IG1hc2goYXJnc1tpXSkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHYgXj0gbWFzaChhcmdzW2ldKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgdyBePSBtYXNoKGFyZ3NbaV0pICogMHgxMDAwMDAwMDA7XG4gICAgfVxuXG4gICAgbWFzaCA9IG51bGw7XG5cbiAgICB2YXIgdWludDMyID0gZnVuY3Rpb24gdWludDMyKCkge1xuICAgICAgdmFyIHQgPSAoeCBeIHggPj4+IDcpID4+PiAwO1xuICAgICAgeCA9IHk7XG4gICAgICB5ID0gejtcbiAgICAgIHogPSB3O1xuICAgICAgdyA9IHY7XG4gICAgICB2ID0gdiBeIHYgPDwgNiBeICh0IF4gdCA8PCAxMykgPj4+IDA7XG4gICAgICByZXR1cm4gKHkgKyB5ICsgMSkgKiB2ID4+PiAwO1xuICAgIH07XG5cbiAgICB2YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKCkge1xuICAgICAgcmV0dXJuIHVpbnQzMigpICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICB9O1xuXG4gICAgcmFuZG9tLnVpbnQzMiA9IHVpbnQzMjtcblxuICAgIHJhbmRvbS5mcmFjdDUzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJhbmRvbSgpICsgKHVpbnQzMigpICYgMHgxZmZmZmYpICogMS4xMTAyMjMwMjQ2MjUxNTY1ZS0xNjsgLy8gMl4tNTNcbiAgICB9O1xuXG4gICAgcmFuZG9tLnZlcnNpb24gPSAnWG9yc2hpZnQwMyAwLjknO1xuICAgIHJhbmRvbS5hcmdzID0gYXJncztcbiAgICByZXR1cm4gcmFuZG9tO1xuICB9KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xufVxuXG47XG5tb2R1bGUuZXhwb3J0cyA9IFhvcnNoaWZ0MDM7XG5cbi8qKiovIH0pLFxuXG4vKioqLyA2NjQ6XG4vKioqLyAoKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbnZhciBBbGVhID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NDQpO1xuXG52YXIgS0lTUzA3ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MjUpO1xuXG52YXIgS3lib3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzOSk7XG5cbnZhciBMRmliID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNDcpO1xuXG52YXIgTEZJQjQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwNSk7XG5cbnZhciBNUkczMmszYSA9IF9fd2VicGFja19yZXF1aXJlX18oNzU5KTtcblxudmFyIFhvcnNoaWZ0MDMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc3OSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBBbGVhLFxuICBLSVNTMDcsXG4gIEt5Ym9zLFxuICBMRmliLFxuICBMRklCNCxcbiAgTVJHMzJrM2EsXG4gIFhvcnNoaWZ0MDNcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyA2NzA6XG4vKioqLyAoKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzQ0KSxcbiAgICBwYXNzZmF0aGVyID0gX3JlcXVpcmUucGFzc2ZhdGhlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXNzZmF0aGVyO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gMzQ0OlxuLyoqKi8gKChtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkgeyBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTsgdmFyIHRhcmdldCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpOyB2YXIga2V5LCBpOyBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykgeyB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTsgZm9yIChpID0gMDsgaSA8IHNvdXJjZVN5bWJvbEtleXMubGVuZ3RoOyBpKyspIHsga2V5ID0gc291cmNlU3ltYm9sS2V5c1tpXTsgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkgeyBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTsgdmFyIHRhcmdldCA9IHt9OyB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IHZhciBrZXksIGk7IGZvciAoaSA9IDA7IGkgPCBzb3VyY2VLZXlzLmxlbmd0aDsgaSsrKSB7IGtleSA9IHNvdXJjZUtleXNbaV07IGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU5OSksXG4gICAgY29tcGFjdCA9IF9yZXF1aXJlLmNvbXBhY3QsXG4gICAgYXNzaWduID0gX3JlcXVpcmUuYXNzaWduLFxuICAgIHRpbWVzTWFwID0gX3JlcXVpcmUudGltZXNNYXAsXG4gICAgaGFzV2luZG93ID0gX3JlcXVpcmUuaGFzV2luZG93LFxuICAgIHV0aWxzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZXF1aXJlLCBbXCJjb21wYWN0XCIsIFwiYXNzaWduXCIsIFwidGltZXNNYXBcIiwgXCJoYXNXaW5kb3dcIl0pO1xuXG52YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NTIpLFxuICAgIE9QVElPTl9WQUxJREFUT1JTID0gX3JlcXVpcmUyLk9QVElPTl9WQUxJREFUT1JTLFxuICAgIEVSUk9SX01FU1NBR0VTID0gX3JlcXVpcmUyLkVSUk9SX01FU1NBR0VTLFxuICAgIERFRkFVTFRfT1BUSU9OUyA9IF9yZXF1aXJlMi5ERUZBVUxUX09QVElPTlM7XG5cbnZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY4MCksXG4gICAgREVGQVVMVF9CUk9XU0VSX1NFRUQgPSBfcmVxdWlyZTMuREVGQVVMVF9CUk9XU0VSX1NFRUQsXG4gICAgREVGQVVMVF9OT0RFX1NFRUQgPSBfcmVxdWlyZTMuREVGQVVMVF9OT0RFX1NFRUQ7XG5cbnZhciBfcmFuZG9tID0gdXRpbHMucmFuZG9tO1xudmFyIF9yYW5kb21JdGVtID0gdXRpbHMucmFuZG9tSXRlbTtcbnZhciBfc2h1ZmZsZSA9IHV0aWxzLnNodWZmbGU7XG4vKipcbiAqIFVURi04IGNoYXIgZGlhcGFzb25zXG4gKiBAY29uc3RcbiAqL1xuXG52YXIgQ0hBUl9SQU5HRVMgPSBbW1s0OCwgNTddXSwgLy8gTnVtYmVyc1xuW1s2NSwgOTBdXSwgLy8gVXBwZXJjYXNlXG5bWzk3LCAxMjJdXSwgLy8gTG93ZXJjYXNlXG5bWzMzLCA0Nl0sIFs1OCwgNjRdLCBbOTQsIDk2XSwgWzEyMywgMTI2XV0gLy8gU3ltYm9sc1xuXTtcbi8qKlxuICogUmV0dXJucyBjaGFyIHJhbmdlcyBieSBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7QXJyYXl9IENoYXIgZGlhcGFzb25zXG4gKi9cblxuZnVuY3Rpb24gZ2V0Q2hhclJhbmdlcyhvcHRpb25zKSB7XG4gIHJldHVybiBjb21wYWN0KFtdLmNvbmNhdChvcHRpb25zLm51bWJlcnMgJiYgW0NIQVJfUkFOR0VTWzBdXSwgb3B0aW9ucy51cHBlcmNhc2UgJiYgW0NIQVJfUkFOR0VTWzFdXSwgb3B0aW9ucy5sb3dlcmNhc2UgJiYgW0NIQVJfUkFOR0VTWzJdXSwgb3B0aW9ucy5zeW1ib2xzICYmIFtDSEFSX1JBTkdFU1szXV0sIG9wdGlvbnMucmFuZ2VzICYmIG9wdGlvbnMucmFuZ2VzKSk7XG59XG5cbmZ1bmN0aW9uIGdldEVudmlyb25tZW50U2VlZChfcmVmKSB7XG4gIHZhciBzZWVkID0gX3JlZi5zZWVkO1xuICB2YXIgaGFzU2VlZCA9IEJvb2xlYW4oc2VlZCk7XG5cbiAgaWYgKGhhc1dpbmRvdygpKSB7XG4gICAgcmV0dXJuIGhhc1NlZWQgPyBzZWVkIDogREVGQVVMVF9CUk9XU0VSX1NFRUQ7XG4gIH1cblxuICByZXR1cm4gaGFzU2VlZCA/IHNlZWQgOiBERUZBVUxUX05PREVfU0VFRDtcbn1cbi8qKlxuICogR2VuZXJhdGUgcGFzc3dvcmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFBhc3N3b3JkXG4gKi9cblxuXG5mdW5jdGlvbiBwYXNzZmF0aGVyKG9wdGlvbnMpIHtcbiAgdmFyIGVycm9yQ29kZSA9IE9QVElPTl9WQUxJREFUT1JTLmNvbXBsZXRlbHkob3B0aW9ucyk7XG5cbiAgaWYgKGVycm9yQ29kZSA+IDApIHtcbiAgICB0aHJvdyBFUlJPUl9NRVNTQUdFU1tlcnJvckNvZGVdO1xuICB9XG5cbiAgdmFyIG9wdHMgPSBhc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucywgcGFzc2ZhdGhlci5wcm90b3R5cGUuX2Rldi5vcHRpb25zKTtcblxuICB2YXIgc2h1ZmZsZSA9IGZ1bmN0aW9uIHNodWZmbGUoYXJyKSB7XG4gICAgdmFyIHNlZWQgPSBfc2h1ZmZsZShnZXRFbnZpcm9ubWVudFNlZWQob3B0cykpO1xuXG4gICAgcmV0dXJuIF9zaHVmZmxlKGFyciwgb3B0cy5wcm5nLCBzZWVkKTtcbiAgfTtcblxuICB2YXIgcmFuZG9tID0gZnVuY3Rpb24gcmFuZG9tKGRpYXBhc29uKSB7XG4gICAgdmFyIHNlZWQgPSBfc2h1ZmZsZShnZXRFbnZpcm9ubWVudFNlZWQob3B0cykpO1xuXG4gICAgcmV0dXJuIF9yYW5kb20oZGlhcGFzb24sIG9wdHMucHJuZywgX3NodWZmbGUoc2VlZCkpO1xuICB9O1xuXG4gIHZhciByYW5kb21JdGVtID0gZnVuY3Rpb24gcmFuZG9tSXRlbShhcnIpIHtcbiAgICB2YXIgc2VlZCA9IF9zaHVmZmxlKGdldEVudmlyb25tZW50U2VlZChvcHRzKSk7XG5cbiAgICByZXR1cm4gX3JhbmRvbUl0ZW0oYXJyLCBvcHRzLnBybmcsIF9zaHVmZmxlKHNlZWQpKTtcbiAgfTtcblxuICB2YXIgY2hhclJhbmdlcyA9IGdldENoYXJSYW5nZXMob3B0cyk7XG4gIHZhciByZXF1aXJlZENoYXJzID0gdGltZXNNYXAoY2hhclJhbmdlcy5sZW5ndGgsIGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHJhbmRvbShyYW5kb21JdGVtKGNoYXJSYW5nZXNbaW5kZXhdKSkpO1xuICB9KTtcblxuICBpZiAocmVxdWlyZWRDaGFycy5sZW5ndGggPj0gb3B0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gc2h1ZmZsZShyZXF1aXJlZENoYXJzKS5zbGljZSgwLCBvcHRzLmxlbmd0aCkuam9pbignJyk7XG4gIH1cblxuICByZXR1cm4gc2h1ZmZsZSh0aW1lc01hcChvcHRzLmxlbmd0aCAtIHJlcXVpcmVkQ2hhcnMubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocmFuZG9tKHJhbmRvbUl0ZW0ocmFuZG9tSXRlbShjaGFyUmFuZ2VzKSkpKTtcbiAgfSkuY29uY2F0KHJlcXVpcmVkQ2hhcnMpKS5qb2luKCcnKTtcbn1cblxucGFzc2ZhdGhlci5wcm90b3R5cGUuX2RldiA9IHtcbiAgb3B0aW9uczoge31cbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFzc2ZhdGhlcixcbiAgREVGQVVMVF9PUFRJT05TLFxuICBDSEFSX1JBTkdFUyxcbiAgRVJST1JfTUVTU0FHRVNcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyA2ODA6XG4vKioqLyAoKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTk5KSxcbiAgICBjb21wYWN0ID0gX3JlcXVpcmUuY29tcGFjdCxcbiAgICBoYXNXaW5kb3cgPSBfcmVxdWlyZS5oYXNXaW5kb3c7XG5cbnZhciBvcyA9IGhhc1dpbmRvdygpID8ge30gOiBldmFsKGByZXF1aXJlKCdvcycpYCk7XG4vKipcbiAqIERlZmF1bHQgc2VlZCBmb3IgcHJuZ1xuICogQGNvbnN0XG4gKi9cblxudmFyIERFRkFVTFRfTk9ERV9TRUVEID0gIWhhc1dpbmRvdygpID8gY29tcGFjdChbXS5jb25jYXQoRGF0ZS5ub3coKSwgcHJvY2Vzcy5tZW1vcnlVc2FnZSA/IFtwcm9jZXNzLm1lbW9yeVVzYWdlKCkuaGVhcFRvdGFsLCBwcm9jZXNzLm1lbW9yeVVzYWdlKCkuaGVhcFVzZWRdIDogbnVsbCwgcHJvY2Vzcy5lbnYgPyBbcHJvY2Vzcy5hcmNoLCBwcm9jZXNzLnBsYXRmb3JtLCBvcy5jcHVzKCkubGVuZ3RoLCBvcy50b3RhbG1lbSgpXSA6IG51bGwpKSA6IG51bGw7XG4vKipcbiAqIERlZmF1bHQgc2VlZCBmb3IgcHJuZ1xuICogQGNvbnN0XG4gKi9cblxudmFyIERFRkFVTFRfQlJPV1NFUl9TRUVEID0gaGFzV2luZG93KCkgPyBjb21wYWN0KFtdLmNvbmNhdChEYXRlLm5vdygpLCBwZXJmb3JtYW5jZSAmJiBwZXJmb3JtYW5jZS5tZW1vcnkgPyBbcGVyZm9ybWFuY2UubWVtb3J5LnRvdGFsSlNIZWFwU2l6ZSwgcGVyZm9ybWFuY2UubWVtb3J5LnVzZWRKU0hlYXBTaXplXSA6IG51bGwsIG5hdmlnYXRvciA/IFtuYXZpZ2F0b3IudXNlckFnZW50LCBuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3ksIG5hdmlnYXRvci5kZXZpY2VNZW1vcnldIDogbnVsbCkpIDogbnVsbDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBERUZBVUxUX05PREVfU0VFRCxcbiAgREVGQVVMVF9CUk9XU0VSX1NFRURcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyA1OTk6XG4vKioqLyAoKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbnZhciBQUk5HcyA9IF9fd2VicGFja19yZXF1aXJlX18oNjY0KTtcblxudmFyIFBSTkdLZXlzID0gbmV3IFNldChPYmplY3Qua2V5cyhQUk5HcykpO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNvZGUgcnVucyBpbiBXaW5kb3dcbiAqIEByZXR1cm4ge0Jvb2xhZW59XG4gKi9cblxuZnVuY3Rpb24gaGFzV2luZG93KCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lmhhc093blByb3BlcnR5KCdXaW5kb3cnKSAmJiB3aW5kb3cgaW5zdGFuY2VvZiB3aW5kb3cuV2luZG93O1xufVxuLyoqXG4gKiBSZXR1cm5zIGNyeXB0byBtb2R1bGUgZm9yIHRoaXMgZW52aXJvbm1lbnRcbiAqL1xuXG5cbmZ1bmN0aW9uIGdldENyeXB0bygpIHtcbiAgcmV0dXJuIGhhc1dpbmRvdygpID8gd2luZG93LmNyeXB0byA6IGV2YWwoYHJlcXVpcmUoJ2NyeXB0bycpYCk7XG59XG4vKipcbiAqIFJldHVybnMgMzJiaXQgcmFuZG9tIGludGVnZXJcbiAqIEBwYXJhbSB7IFN0cmluZyB9IHBybmcgUGFzc3dvcmQgcmFuZG9tIG51bWJlciBnZW5lcmF0b3JcbiAqIEBwYXJhbSB7IEFycmF5IH0gc2VlZCBTZWVkXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cblxuXG5mdW5jdGlvbiBnZXRSYW5kb21VaW50MzIocHJuZywgc2VlZCkge1xuICB2YXIgaGFzUFJORyA9IFBSTkdLZXlzLmhhcyhwcm5nKTtcbiAgcHJuZyAmJiBwcm5nICE9PSAnZGVmYXVsdCcgJiYgIWhhc1BSTkcgJiYgY29uc29sZS53YXJuKGBQUk5HICR7cHJuZ30gaXMgbm90IHN1cHBvcnRlZGApO1xuXG4gIGlmIChwcm5nICYmIHBybmcgIT09ICdkZWZhdWx0JyAmJiBQUk5HS2V5cy5oYXMocHJuZykpIHtcbiAgICB2YXIgcHJuZ0ZuID0gc2VlZCA/IG5ldyBQUk5Hc1twcm5nXShzZWVkKSA6IG5ldyBQUk5Hc1twcm5nXSgpO1xuICAgIHJldHVybiBwcm5nRm4udWludDMyKCk7XG4gIH1cblxuICB2YXIgY3J5cHRvID0gZ2V0Q3J5cHRvKCk7XG4gIHJldHVybiBoYXNXaW5kb3coKSA/IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDEpKVswXSA6IHBhcnNlSW50KGNyeXB0by5yYW5kb21CeXRlcyg0KS50b1N0cmluZygnaGV4JyksIDE2KTtcbn1cbi8qKlxuICogUmV0dXJucyByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge1tOdW1iZXIsIE51bWJlcl19IGRpYXBhc29uIFttaW4sIG1heF1cbiAqIEBwYXJhbSB7IFN0cmluZyB9IHBybmcgUGFzc3dvcmQgcmFuZG9tIG51bWJlciBnZW5lcmF0b3JcbiAqIEBwYXJhbSB7IEFycmF5IH0gc2VlZCBTZWVkXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFJhbmRvbSBudW1iZXJcbiAqL1xuXG5cbmZ1bmN0aW9uIHJhbmRvbShkaWFwYXNvbiwgcHJuZywgc2VlZCkge1xuICB2YXIgcmFuZG9tSW50ID0gZ2V0UmFuZG9tVWludDMyKHBybmcsIHNlZWQpO1xuICB2YXIgcmFuZ2UgPSBkaWFwYXNvblsxXSAtIGRpYXBhc29uWzBdICsgMTtcbiAgcmV0dXJuIHJhbmRvbUludCA+PSBNYXRoLmZsb29yKDQyOTQ5NjcyOTUgLyByYW5nZSkgKiByYW5nZSA/IHJhbmRvbShkaWFwYXNvbikgOiBkaWFwYXNvblswXSArIHJhbmRvbUludCAlIHJhbmdlO1xufVxuLyoqXG4gKiBSZXR1cm5zIHJhbmRvbSBpdGVtIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJuZyBQYXNzd29yZCByYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuICogQHBhcmFtIHsgQXJyYXkgfSBzZWVkIFNlZWRcbiAqIEByZXR1cm4geyp9IFJhbmRvbSBpdGVtXG4gKi9cblxuXG5mdW5jdGlvbiByYW5kb21JdGVtKGFyciwgcHJuZywgc2VlZCkge1xuICByZXR1cm4gYXJyW3JhbmRvbShbMCwgYXJyLmxlbmd0aCAtIDFdLCBwcm5nLCBzZWVkKV07XG59XG4vKipcbiAqIFJldHVybnMgYXJyYXkgd2l0aG91dCB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciB0byBmaWx0ZXJcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBWYWx1ZXMgRGlzY2FyZGVkIHZhbHVlc1xuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuXG5mdW5jdGlvbiB3aXRob3V0KGFyciwgdmFsdWVzKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5pbmNsdWRlcyhpdGVtKSA9PT0gZmFsc2U7XG4gIH0pO1xufVxuLyoqXG4gKiBTZWFyY2ggdmFsdWVzIGluIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgQXJyYXkgdG8gc2VhcmNoXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVmFsdWVzIHRvIHNlYXJjaFxuICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFyciBoYXMgb25lIG9mIHZhbHVlc1xuICovXG5cblxuZnVuY3Rpb24gaW5jbHVkZXMoYXJyLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5pbmNsdWRlcyhpdGVtKTtcbiAgfSk7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcnIgaW5jbHVkZXMgYWxsIG9mIHRoZSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBBcnJheSB0byBzZWFyY2hcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBWYWx1ZXMgdG8gc2VhcmNoXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gaW5jbHVkZXNBbGwoYXJyLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIHZhbHVlcy5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGFyci5pbmNsdWRlcyhpdGVtKSA9PT0gZmFsc2U7XG4gIH0pID09PSBmYWxzZTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBhcnIgaGF2ZW4ndCB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBBcnJheSB0byBzZWFyY2hcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBWYWx1ZXMgdG8gc2VhcmNoXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gZXhjbHVkZXMoYXJyLCB2YWx1ZXMpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5pbmNsdWRlcyhpdGVtKTtcbiAgfSkgPT09IGZhbHNlO1xufVxuLyoqXG4gKiBSZXR1cm5zIGFycmF5IGxhc3QgaW5kZXhcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5cblxuZnVuY3Rpb24gbGFzdEluZGV4KGFycikge1xuICByZXR1cm4gYXJyLmxlbmd0aCAtIDE7XG59XG4vKipcbiAqIFJlbW92ZSBmYWxzZSwgbnVsbCwgMCwgXCJcIiwgdW5kZWZpbmVkLCBOYU5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuXG5mdW5jdGlvbiBjb21wYWN0KGFycikge1xuICByZXR1cm4gYXJyLmZpbHRlcihCb29sZWFuKTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlzIHZhbHVlIGlzIGJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBhcnJheVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG59XG4vKipcbiAqIFJldHVybnMgb2JqZWN0IGtleXMgYXMgYW4gYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cblxuZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZyB0aGUgdmFsdWUgaXMgaW50ZWdlclxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZSkge1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZyB0aGUgdmFsdWUgaXMgbnVtYmVyXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpID09PSBmYWxzZTtcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlnIHRoZSB2YWx1ZSBpcyBzdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlzIHZhbHVlIGlzIE9iamVjdFxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gL15cXHsuKlxcfSQvLnRlc3QoSlNPTi5zdHJpbmdpZnkodmFsdWUpKSA9PT0gdHJ1ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIE1hcCA9PT0gZmFsc2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbi8qKlxuICogT2JqZWN0IGFzc2lnblxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cblxuZnVuY3Rpb24gYXNzaWduKCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbi5hcHBseShPYmplY3QsIGFyZ3VtZW50cyk7XG59XG4vKipcbiAqIE1ha2UgZW1wdHkgYXJyYXkgYnkgbGVuZ3RoIGFuZCBtYXAgaXRcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvblxuICogQHJldHVybiB7QXJyYXl9dGltZXNNYXBcbiAqL1xuXG5cbmZ1bmN0aW9uIHRpbWVzTWFwKHRpbWVzLCBpdGVyYXRlZSkge1xuICByZXR1cm4gQXJyYXkodGltZXMpLmZpbGwoKS5tYXAoaXRlcmF0ZWUpO1xufVxuLyoqXG4gKiBNYWtlIG51bWJlciBzZXF1ZW5jZVxuICogQHBhcmFtIHtOdW1iZXJ9IGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b1xuICogQHBhcmFtIHtCb29sZWFufSBpbmNsdXNpdmUgSWYgdHJ1ZSB0aGVuIHJlc3VsdCBhcnJheSB3aWxsIGNvbnRhaW4gXCJ0b1wiIG51bWJlciBpbiBsYXN0XG4gKiBAcmV0dXJuIHtBcnJheX0gbnVtYmVyW11cbiAqL1xuXG5cbmZ1bmN0aW9uIG51bVNlcXVlbmNlKGZyb20sIHRvLCBpbmNsdXNpdmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gaW5jbHVzaXZlID8gcmVzdWx0LnB1c2godG8pICYmIHJlc3VsdCA6IHJlc3VsdDtcbiAgfSh0aW1lc01hcCh0byAtIGZyb20sIGZ1bmN0aW9uIChpdGVtLCBrZXkpIHtcbiAgICByZXR1cm4gZnJvbSArIGtleTtcbiAgfSkpO1xufVxuLyoqXG4gKiBTaHVmZmxlIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cblxuZnVuY3Rpb24gc2h1ZmZsZShhcnIsIHBybmcsIHNlZWQpIHtcbiAgaWYgKGFyci5sZW5ndGggPD0gMSkgcmV0dXJuIGFycjtcbiAgdGltZXNNYXAoYXJyLmxlbmd0aCwgZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgdmFyIHJhbmRvbUluZGV4ID0gcmFuZG9tKFswLCBhcnIubGVuZ3RoIC0gMV0sIHBybmcsIHNlZWQpO1xuICAgIHZhciBfcmVmID0gW2FycltyYW5kb21JbmRleF0sIGFycltpbmRleF1dO1xuICAgIGFycltpbmRleF0gPSBfcmVmWzBdO1xuICAgIGFycltyYW5kb21JbmRleF0gPSBfcmVmWzFdO1xuICB9KTtcbiAgcmV0dXJuIGFycjtcbn1cbi8qKlxuICogUmV0dXJucyBVVEYtOCBjaGFycyBieSBkaWFwYXNvblxuICogQHBhcmFtIHtBcnJheX0gZGlhcGFzb24gW2Zyb20sIHRvXVxuICogQHJldHVybiB7U3RyaW5nfSBBbGwgY2hhcnMgaW4gb25lIHN0cmluZ1xuICovXG5cblxuZnVuY3Rpb24gZ2V0Q2hhcnNCeURpYXBhc29uKGRpYXBhc29uKSB7XG4gIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludC5hcHBseShTdHJpbmcsIG51bVNlcXVlbmNlKGRpYXBhc29uWzBdLCBkaWFwYXNvblsxXSwgdHJ1ZSkpO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaXMgdmFsdWUgaXMgVVRGLTggY2hhciBjb2RlXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gaXNDaGFyQ29kZSh2YWx1ZSkge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh2YWx1ZSkgIT09IFN0cmluZy5mcm9tQ2hhckNvZGUoZmFsc2UpO1xufVxuLyoqXG4gKiBFc2NhcGUgcmVnZXhwIG9wZXJhdG9yc1xuICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJyk7IC8vICQmIG1lYW5zIHRoZSB3aG9sZSBtYXRjaGVkIHN0cmluZ1xufVxuLyoqXG4gKiBQaWNrIHZhbHVlcyBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlc1xuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuXG5mdW5jdGlvbiBwaWNrKGFyciwgdmFsdWVzKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5pbmNsdWRlcyhpdGVtKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYXNXaW5kb3csXG4gIGdldFJhbmRvbVVpbnQzMixcbiAgcmFuZG9tLFxuICByYW5kb21JdGVtLFxuICB3aXRob3V0LFxuICBpbmNsdWRlcyxcbiAgaW5jbHVkZXNBbGwsXG4gIGV4Y2x1ZGVzLFxuICBsYXN0SW5kZXgsXG4gIGNvbXBhY3QsXG4gIGtleXMsXG4gIGlzSW50ZWdlcixcbiAgaXNOdW1iZXIsXG4gIGlzU3RyaW5nLFxuICBpc0Jvb2xlYW4sXG4gIGlzQXJyYXksXG4gIGlzUGxhaW5PYmplY3QsXG4gIGFzc2lnbixcbiAgdGltZXNNYXAsXG4gIG51bVNlcXVlbmNlLFxuICBzaHVmZmxlLFxuICBnZXRDaGFyc0J5RGlhcGFzb24sXG4gIGlzQ2hhckNvZGUsXG4gIGVzY2FwZVJlZ0V4cFxufTtcblxuLyoqKi8gfSksXG5cbi8qKiovIDg1Mjpcbi8qKiovICgobW9kdWxlLCBfX3VudXNlZF93ZWJwYWNrX2V4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OTkpLFxuICAgIGtleXMgPSBfcmVxdWlyZS5rZXlzLFxuICAgIGlzSW50ZWdlciA9IF9yZXF1aXJlLmlzSW50ZWdlcixcbiAgICBpbmNsdWRlc0FsbCA9IF9yZXF1aXJlLmluY2x1ZGVzQWxsLFxuICAgIGlzQm9vbGVhbiA9IF9yZXF1aXJlLmlzQm9vbGVhbixcbiAgICBpc0FycmF5ID0gX3JlcXVpcmUuaXNBcnJheSxcbiAgICBpc1BsYWluT2JqZWN0ID0gX3JlcXVpcmUuaXNQbGFpbk9iamVjdCxcbiAgICBhc3NpZ24gPSBfcmVxdWlyZS5hc3NpZ24sXG4gICAgd2l0aG91dCA9IF9yZXF1aXJlLndpdGhvdXQsXG4gICAgaXNDaGFyQ29kZSA9IF9yZXF1aXJlLmlzQ2hhckNvZGUsXG4gICAgaXNTdHJpbmcgPSBfcmVxdWlyZS5pc1N0cmluZyxcbiAgICBpc051bWJlciA9IF9yZXF1aXJlLmlzTnVtYmVyO1xuXG52YXIgUFJOR3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY2NCk7XG5cbnZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg3NiksXG4gICAgbmFtZSA9IF9yZXF1aXJlMi5uYW1lO1xuLyoqXG4gKiBNb2R1bGUgbmFtZVxuICogQGNvbnN0XG4gKi9cblxuXG52YXIgTU9EVUxFX05BTUUgPSBuYW1lO1xuLyoqXG4gKiBEZWZhdWx0IHBhc3NmYXRoZXIgb3B0aW9uc1xuICogQGNvbnN0XG4gKi9cblxudmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgbnVtYmVyczogdHJ1ZSxcbiAgdXBwZXJjYXNlOiB0cnVlLFxuICBsb3dlcmNhc2U6IHRydWUsXG4gIHN5bWJvbHM6IHRydWUsXG4gIGxlbmd0aDogMTIsXG4gIHJhbmdlczogbnVsbCxcbiAgcHJuZzogJ2RlZmF1bHQnLFxuICBzZWVkOiBudWxsXG59O1xuLyoqXG4gKiBGdW5jdGlvbnMgdG8gdmFsaWRhdGUgb3B0aW9uc1xuICogTWV0aG9kcyBtdXN0IHJldHVybiB0cnVlIGlzIHZhbGlkYXRpb24gc3VjY2Vzc2Z1bGx5IHBhc3NlZFxuICovXG5cbnZhciBPUFRJT05fVkFMSURBVE9SUyA9IHtcbiAgbnVtYmVyczogZnVuY3Rpb24gbnVtYmVycyh2YWx1ZSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpO1xuICB9LFxuICB1cHBlcmNhc2U6IGZ1bmN0aW9uIHVwcGVyY2FzZSh2YWx1ZSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpO1xuICB9LFxuICBsb3dlcmNhc2U6IGZ1bmN0aW9uIGxvd2VyY2FzZSh2YWx1ZSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW4odmFsdWUpO1xuICB9LFxuICBzeW1ib2xzOiBmdW5jdGlvbiBzeW1ib2xzKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQm9vbGVhbih2YWx1ZSk7XG4gIH0sXG4gIGxlbmd0aDogZnVuY3Rpb24gbGVuZ3RoKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzSW50ZWdlcih2YWx1ZSkgJiYgdmFsdWUgPiAwO1xuICB9LFxuICByYW5nZXM6IGZ1bmN0aW9uIHJhbmdlcyh2YWx1ZSkge1xuICAgIHZhciBpc0FycmF5T2ZSYW5nZXMgPSBmdW5jdGlvbiBpc0FycmF5T2ZSYW5nZXMoc29tZSkge1xuICAgICAgcmV0dXJuIGlzQXJyYXkoc29tZSkgJiYgc29tZS5sZW5ndGggPiAwICYmIHNvbWUuZXZlcnkoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkoaXRlbSkgJiYgaXNDaGFyQ29kZShpdGVtWzBdKSAmJiBpc0NoYXJDb2RlKGl0ZW1bMV0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwICYmIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXNBcnJheU9mUmFuZ2VzKGl0ZW0pO1xuICAgIH0pO1xuICB9LFxuICBwcm5nOiBmdW5jdGlvbiBwcm5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIFsnZGVmYXVsdCddLmNvbmNhdChrZXlzKFBSTkdzKSkuaW5jbHVkZXModmFsdWUpO1xuICB9LFxuICBzZWVkOiBmdW5jdGlvbiBzZWVkKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA+IDAgJiYgdmFsdWUuc29tZShmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGlzU3RyaW5nKGl0ZW0pID8gZmFsc2UgOiAhaXNOdW1iZXIoaXRlbSk7XG4gICAgfSkgPT09IGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZWx5IG9wdGlvbiB2YWxpZGF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEVycm9yIGNvZGUgb3IgMCBpZiB2YWxpZGF0aW9uIHBhc3NlZFxuICAgKi9cbiAgY29tcGxldGVseShvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBjYXNlcyA9IFsvLyBbSU1QT1JUQU5UXSBPcmRlciBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaW5kZXggb2YgY2FzZSBtYXRjaGVzIHdpdGggZXJyb3IgY29kZVxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAob3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8IGlzUGxhaW5PYmplY3Qob3B0aW9ucykgJiYga2V5cyhvcHRpb25zKS5sZW5ndGggPT09IDApID09PSBmYWxzZTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXNQbGFpbk9iamVjdChvcHRpb25zKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaW5jbHVkZXNBbGwoa2V5cyhERUZBVUxUX09QVElPTlMpLCBrZXlzKG9wdGlvbnMpKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncmFuZ2VzJykgPT09IGZhbHNlIHx8IF90aGlzLnJhbmdlcyhvcHRpb25zLnJhbmdlcyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ251bWJlcnMnKSA9PT0gZmFsc2UgfHwgX3RoaXMubnVtYmVycyhvcHRpb25zLm51bWJlcnMpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmhhc093blByb3BlcnR5KCd1cHBlcmNhc2UnKSA9PT0gZmFsc2UgfHwgX3RoaXMudXBwZXJjYXNlKG9wdGlvbnMudXBwZXJjYXNlKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbG93ZXJjYXNlJykgPT09IGZhbHNlIHx8IF90aGlzLmxvd2VyY2FzZShvcHRpb25zLmxvd2VyY2FzZSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3N5bWJvbHMnKSA9PT0gZmFsc2UgfHwgX3RoaXMuc3ltYm9scyhvcHRpb25zLnN5bWJvbHMpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSA9PT0gZmFsc2UgfHwgX3RoaXMubGVuZ3RoKG9wdGlvbnMubGVuZ3RoKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgncHJuZycpID09PSBmYWxzZSB8fCBfdGhpcy5wcm5nKG9wdGlvbnMucHJuZyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NlZWQnKSA9PT0gZmFsc2UgfHwgX3RoaXMuc2VlZChvcHRpb25zLnNlZWQpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBvcHRzID0gYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHdpdGhvdXQoa2V5cyhvcHRzKSwgWydsZW5ndGgnXSkuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT09ICdyYW5nZXMnID8gaXNBcnJheShvcHRzW2tleV0pIDogb3B0c1trZXldID09PSB0cnVlO1xuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9wdHMgPSBhc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NlZWQnKSAmJiBvcHRzLnBybmcgPT09ICdkZWZhdWx0JykgPT09IGZhbHNlO1xuICAgIH1dO1xuICAgIHZhciByZXN1bHQgPSBjYXNlcy5maW5kSW5kZXgoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtKCkgPT09IGZhbHNlO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxufTtcbi8qKlxuICogRXJyb3IgbWVzc2FnZXMgYnkgZXJyb3IgY29kZS5cbiAqIFtJTVBPUlRBTlRdIE9yZGVyIGlzIGltcG9ydGFudCwgYmVjYXVzZSBpbmRleCBvZiBlcnJvciBtZXNzYWdlIG1hdGNoZXMgd2l0aCB2YWxpZGF0aW9uIGNhc2UuXG4gKi9cblxudmFyIEVSUk9SX01FU1NBR0VTID0gW107XG5FUlJPUl9NRVNTQUdFU1swXSA9ICdObyBlcnJvcnMnO1xuRVJST1JfTUVTU0FHRVNbMV0gPSBgWyR7TU9EVUxFX05BTUV9XTogT3B0aW9uIG11c3QgYmUgYW4gb2JqZWN0YDtcbkVSUk9SX01FU1NBR0VTWzJdID0gYFske01PRFVMRV9OQU1FfV06IE9wdGlvbnMgbXVzdCBjb250YWlucyBvbmx5IG9uZSAob3Igc2V2ZXJhbCkgb2YgWyR7a2V5cyhERUZBVUxUX09QVElPTlMpLmpvaW4oJywgJyl9XWA7XG5FUlJPUl9NRVNTQUdFU1szXSA9IGBbJHtNT0RVTEVfTkFNRX1dOiBPcHRpb24gXCJyYW5nZXNcIiBtdXN0IGJlIGFycmF5IHdpdGggYXJyYXkgb2YgVVRGLTggY2hhciBjb2RlIHJhbmdlLiBGb3IgZXhhbXBsZTogWyBbWzQ4LCA1NyBdXSwgW1szMywgNDZdLCBbNTgsIDY0XSwgWzk0LCA5Nl0sIFsxMjMsIDEyNl1dIF0gYDtcbkVSUk9SX01FU1NBR0VTWzRdID0gYFske01PRFVMRV9OQU1FfV06IE9wdGlvbiBcIm51bWJlcnNcIiBtdXN0IGJlIGJvb2xlYW5gO1xuRVJST1JfTUVTU0FHRVNbNV0gPSBgWyR7TU9EVUxFX05BTUV9XTogT3B0aW9uIFwidXBwZXJjYXNlXCIgbXVzdCBiZSBib29sZWFuYDtcbkVSUk9SX01FU1NBR0VTWzZdID0gYFske01PRFVMRV9OQU1FfV06IE9wdGlvbiBcImxvd2VyY2FzZVwiIG11c3QgYmUgYm9vbGVhbmA7XG5FUlJPUl9NRVNTQUdFU1s3XSA9IGBbJHtNT0RVTEVfTkFNRX1dOiBPcHRpb24gXCJzeW1ib2xzXCIgbXVzdCBiZSBib29sZWFuYDtcbkVSUk9SX01FU1NBR0VTWzhdID0gYFske01PRFVMRV9OQU1FfV06IE9wdGlvbiBcImxlbmd0aFwiIG11c3QgYmUgaW50ZWdlciBncmVhdGVyIHRoYW4gMGA7XG5FUlJPUl9NRVNTQUdFU1s5XSA9IGBbJHtNT0RVTEVfTkFNRX1dOiBPcHRpb24gXCJwcm5nXCIgbXVzdCBiZSBvbmUgb2YgWyR7WydkZWZhdWx0J10uY29uY2F0KGtleXMoUFJOR3MpKS5qb2luKCcsICcpfV1gO1xuRVJST1JfTUVTU0FHRVNbMTBdID0gYFske01PRFVMRV9OQU1FfV06IE9wdGlvbiBcInNlZWRcIiBtdXN0IGJlIGFycmF5IG9mIHN0cmluZ3Mgb3IgbnVtYmVyc2A7XG5FUlJPUl9NRVNTQUdFU1sxMV0gPSBgWyR7TU9EVUxFX05BTUV9XTogQXQgbGVzcyBvbmUgb2Ygb3B0aW9ucyBbJHt3aXRob3V0KGtleXMoREVGQVVMVF9PUFRJT05TKSwgWydsZW5ndGgnLCAncHJuZycsICdzZWVkJ10pLmpvaW4oJywgJyl9XSBtdXN0bid0IGJlIGZhbHNlYDtcbkVSUk9SX01FU1NBR0VTWzEyXSA9IGBbJHtNT0RVTEVfTkFNRX1dOiBPcHRpb24gXCJzZWVkXCIgY2Fubm90IGJlIHVzZWQgd2hlbiBcInBybmdcIiBvcHRpb24gaXMgZGVmYXVsdC4gU2V0IFwicHJuZ1wiIG9wdGlvbiB0byBvbmUgIG9mIFske2tleXMoUFJOR3MpLmpvaW4oJywgJyl9XWA7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgT1BUSU9OX1ZBTElEQVRPUlMsXG4gIEVSUk9SX01FU1NBR0VTLFxuICBNT0RVTEVfTkFNRSxcbiAgREVGQVVMVF9PUFRJT05TXG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gODc2OlxuLyoqKi8gKChtb2R1bGUpID0+IHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5tb2R1bGUuZXhwb3J0cyA9IEpTT04ucGFyc2UoJ3tcIm5hbWVcIjpcInBhc3NmYXRoZXJcIixcInZlcnNpb25cIjpcIjMuMC4zXCIsXCJkZXNjcmlwdGlvblwiOlwiUGFzc2ZhdGhlciBpcyB2ZXJ5IGZhc3QgYW5kIHBvd2VyZnVsIHV0aWxpdHkgd2l0aCB6ZXJvIGRlcGVuZGVuY2llcyB0byBnZW5lcmF0ZSBzdHJvbmcgcGFzc3dvcmRcIixcImF1dGhvclwiOlwiRXZnZW55IFZ5dXNoaW4gPGVAdnl1c2hpbi5ydT4gKGh0dHBzOi8vZ2l0aHViLmNvbS92eXVzaGluKVwiLFwiY29udHJpYnV0b3JzXCI6W1wiRXZnZW55IFZ5dXNoaW4gPGVAdnl1c2hpbi5ydT4gKGh0dHBzOi8vZ2l0aHViLmNvbS92eXVzaGluKVwiXSxcIm1haW50YWluZXJzXCI6W1wiRXZnZW55IFZ5dXNoaW4gPGVAdnl1c2hpbi5ydT4gKGh0dHBzOi8vZ2l0aHViLmNvbS92eXVzaGluKVwiXSxcInJlcG9zaXRvcnlcIjp7XCJ0eXBlXCI6XCJnaXRcIixcInVybFwiOlwiaHR0cHM6Ly9naXRodWIuY29tL3Z5dXNoaW4vcGFzc2ZhdGhlclwifSxcInNjcmlwdHNcIjp7XCJpbnN0YWxsLWFsbFwiOlwiY2QgLi9idWlsZCAmJiBucG0gaW5zdGFsbCAmJiBjZCAuLi90ZXN0ICYmIG5wbSBpbnN0YWxsXCIsXCJidWlsZDpjZG5cIjpcImNkIC4vYnVpbGQgJiYgbnBtIHJ1biBidWlsZDpjZG5cIixcImJ1aWxkOnVtZFwiOlwiY2QgLi9idWlsZCAmJiBucG0gcnVuIGJ1aWxkOnVtZFwiLFwiYnVpbGRcIjpcImNkIC4vYnVpbGQgJiYgbnBtIHJ1biBidWlsZFwiLFwicHJldGVzdFwiOlwibnBtIHJ1biBidWlsZFwiLFwidGVzdFwiOlwiY2QgLi90ZXN0ICYmIG5wbSB0ZXN0XCIsXCJwcmVwdWJsaXNoXCI6XCJucG0gdGVzdFwifSxcImJ1Z3NcIjp7XCJ1cmxcIjpcImh0dHBzOi8vZ2l0aHViLmNvbS92eXVzaGluL3Bhc3NmYXRoZXIvaXNzdWVzXCJ9LFwiaG9tZXBhZ2VcIjpcImh0dHBzOi8vZ2l0aHViLmNvbS92eXVzaGluL3Bhc3NmYXRoZXJcIixcIm1haW5cIjpcIi4vZGlzdC9wYXNzZmF0aGVyLmpzXCIsXCJtb2R1bGVcIjpcIi4vZGlzdC9wYXNzZmF0aGVyLmVzbS5qc1wiLFwidHlwZXNcIjpcIi4vZGlzdC9wYXNzZmF0aGVyLmQudHNcIixcImxpY2Vuc2VcIjpcIk1JVFwiLFwia2V5d29yZHNcIjpbXCJwYXNzd29yZFwiLFwiZ2VuZXJhdG9yXCIsXCJwYXNzZ2VuXCJdLFwiZGlyZWN0b3JpZXNcIjp7XCJkb2NcIjpcIi4vUkVBRE1FLm1kXCJ9LFwiZGV2RGVwZW5kZW5jaWVzXCI6e319Jyk7XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBzdGFydHVwXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHQvLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjcwKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfZXhwb3J0c19fO1xuLyoqKioqKi8gfSkoKVxuO1xufSk7IiwiY29uc3QgcGFzc1BsYWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXNzXCIpO1xyXG5jb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xyXG5idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICB2YXIgcGFzc2ZhdGhlciA9IHJlcXVpcmUoXCJwYXNzZmF0aGVyXCIpO1xyXG4gIGZ1bmN0aW9uIGdldFJhbmRvbUFyYml0cmFyeShtaW4sIG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICB9XHJcbiAgbGV0IHBhc3N3b3JkID0gcGFzc2ZhdGhlcih7XHJcbiAgICBudW1iZXJzOiB0cnVlLFxyXG4gICAgdXBwZXJjYXNlOiB0cnVlLFxyXG4gICAgbG93ZXJjYXNlOiB0cnVlLFxyXG4gICAgc3ltYm9sczogZmFsc2UsIC8vIERpc2FibGUgc3ltYm9sc1xyXG4gICAgbGVuZ3RoOiBNYXRoLmNlaWwoZ2V0UmFuZG9tQXJiaXRyYXJ5KDcsIDEyKSksXHJcbiAgfSk7XHJcbiAgcGFzc1BsYWNlLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgcGFzc1BsYWNlLmlubmVySFRNTCA9IHBhc3N3b3JkO1xyXG59KTtcclxuXHJcbi8vINC60L7QtCDQvdCw0L/QuNGB0LDQvSDQv9GA0Lgg0L/QvtC80L7RidC4INCx0LjQsdC70LjQvtGC0LXQuiBwYXNzZmF0aGVyINC4IGJyb3dzZXJpZnlcclxuIl19
