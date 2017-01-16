/*!
 * modernizr v3.1.0
 * Build http://modernizr.com/download?-borderradius-cssgradients-cssreflections-csstransforms-csstransforms3d-fontface-rgba-domprefixes-prefixes-shiv-testallprops-testprop-teststyles-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */
/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/
!function(window, document, undefined) {
    /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */
    function is(obj, type) {
        return typeof obj === type;
    }
    /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */
    function testRunner() {
        var featureNames, feature, aliasIdx, result, nameIdx, featureName, featureNameSplit;
        for (var featureIdx in tests) if (tests.hasOwnProperty(featureIdx)) {
            // run the test, throw the return value into the Modernizr,
            // then based on that boolean, define an appropriate className
            // and push it into an array of classes we'll join later.
            //
            // If there is no name, it's an 'async' test that is run,
            // but not directly added to the object. That should
            // be done with a post-run addTest call.
            if (featureNames = [], feature = tests[featureIdx], feature.name && (featureNames.push(feature.name.toLowerCase()), 
            feature.options && feature.options.aliases && feature.options.aliases.length)) // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            // Set each of the names on the Modernizr object
            for (// Run the test, or use the raw value if it's not a function
            result = is(feature.fn, "function") ? feature.fn() : feature.fn, nameIdx = 0; nameIdx < featureNames.length; nameIdx++) featureName = featureNames[nameIdx], 
            // Support dot properties as sub tests. We don't do checking to make sure
            // that the implied parent tests have been added. You must call them in
            // order (either in the test, or make the parent test a dependency).
            //
            // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
            // hashtag famous last words
            featureNameSplit = featureName.split("."), 1 === featureNameSplit.length ? Modernizr[featureNameSplit[0]] = result : (// cast to a Boolean, if not one already
            /* jshint -W053 */
            !Modernizr[featureNameSplit[0]] || Modernizr[featureNameSplit[0]] instanceof Boolean || (Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]])), 
            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result), classes.push((result ? "" : "no-") + featureNameSplit.join("-"));
        }
    }
    /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */
    // Pass in an and array of class names, e.g.:
    //  ['no-webp', 'borderradius', ...]
    function setClasses(classes) {
        var className = docElement.className, classPrefix = Modernizr._config.classPrefix || "";
        // Change `no-js` to `js` (independently of the `enableClasses` option)
        // Handle classPrefix on this too
        if (isSVG && (className = className.baseVal), Modernizr._config.enableJSClass) {
            var reJS = new RegExp("(^|\\s)" + classPrefix + "no-js(\\s|$)");
            className = className.replace(reJS, "$1" + classPrefix + "js$2");
        }
        Modernizr._config.enableClasses && (// Add the new classes
        className += " " + classPrefix + classes.join(" " + classPrefix), isSVG ? docElement.className.baseVal = className : docElement.className = className);
    }
    /**
   * createElement is a convenience wrapper around document.createElement. Since we
   * use createElement all over the place, this allows for (slightly) smaller code
   * as well as abstracting away issues with creating elements in contexts other than
   * HTML documents (e.g. SVG documents).
   *
   * @access private
   * @function createElement
   * @returns {HTMLElement|SVGElement} An HTML or SVG element
   */
    function createElement() {
        return "function" != typeof document.createElement ? document.createElement(arguments[0]) : isSVG ? document.createElementNS.call(document, "http://www.w3.org/2000/svg", arguments[0]) : document.createElement.apply(document, arguments);
    }
    /**
   * getBody returns the body of a document, or an element that can stand in for
   * the body if a real body does not exist
   *
   * @access private
   * @function getBody
   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
   * artificially created element that stands in for the body
   */
    function getBody() {
        // After page load injecting a fake body doesn't work so check if body exists
        var body = document.body;
        // Can't use the real body create a fake one.
        return body || (body = createElement(isSVG ? "svg" : "body"), body.fake = !0), body;
    }
    /**
   * injectElementWithStyles injects an element with style element and some CSS rules
   *
   * @access private
   * @function injectElementWithStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   */
    function injectElementWithStyles(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, mod = "modernizr", div = createElement("div"), body = getBody();
        if (parseInt(nodes, 10)) // In order not to give false positives we create a node for each test
        // This also allows the method to scale for unspecified uses
        for (;nodes--; ) node = createElement("div"), node.id = testnames ? testnames[nodes] : mod + (nodes + 1), 
        div.appendChild(node);
        // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
        // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
        //avoid crashing IE8, if background image is used
        //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
        // If this is done after page load we don't want to remove the body so check if body exists
        // Trigger layout so kinetic scrolling isn't disabled in iOS6+
        return style = createElement("style"), style.type = "text/css", style.id = "s" + mod, 
        (body.fake ? body : div).appendChild(style), body.appendChild(div), style.styleSheet ? style.styleSheet.cssText = rule : style.appendChild(document.createTextNode(rule)), 
        div.id = mod, body.fake && (body.style.background = "", body.style.overflow = "hidden", 
        docOverflow = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(body)), 
        ret = callback(div, rule), body.fake ? (body.parentNode.removeChild(body), docElement.style.overflow = docOverflow, 
        docElement.offsetHeight) : div.parentNode.removeChild(div), !!ret;
    }
    /**
   * contains checks to see if a string contains another string
   *
   * @access private
   * @function contains
   * @param {string} str - The string we want to check for substrings
   * @param {string} substr - The substring we want to search the first string for
   * @returns {boolean}
   */
    function contains(str, substr) {
        return !!~("" + str).indexOf(substr);
    }
    /**
   * cssToDOM takes a kebab-case string and converts it to camelCase
   * e.g. box-sizing -> boxSizing
   *
   * @access private
   * @function cssToDOM
   * @param {string} name - String name of kebab-case prop we want to convert
   * @returns {string} The camelCase version of the supplied name
   */
    function cssToDOM(name) {
        return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
            return m1 + m2.toUpperCase();
        }).replace(/^-/, "");
    }
    /**
   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
   *
   * @access private
   * @function fnBind
   * @param {function} fn - a function you want to change `this` reference to
   * @param {object} that - the `this` you want to call the function with
   * @returns {function} The wrapped version of the supplied function
   */
    function fnBind(fn, that) {
        return function() {
            return fn.apply(that, arguments);
        };
    }
    /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   */
    function testDOMProps(props, obj, elem) {
        var item;
        for (var i in props) if (props[i] in obj) // return the property name as a string
        // return the property name as a string
        // let's bind a function
        return elem === !1 ? props[i] : (item = obj[props[i]], is(item, "function") ? fnBind(item, elem || obj) : item);
        return !1;
    }
    /**
   * domToCSS takes a camelCase string and converts it to kebab-case
   * e.g. boxSizing -> box-sizing
   *
   * @access private
   * @function domToCSS
   * @param {string} name - String name of camelCase prop we want to convert
   * @returns {string} The kebab-case version of the supplied name
   */
    function domToCSS(name) {
        return name.replace(/([A-Z])/g, function(str, m1) {
            return "-" + m1.toLowerCase();
        }).replace(/^ms-/, "-ms-");
    }
    /**
   * nativeTestProps allows for us to use native feature detection functionality if available.
   * some prefixed form, or false, in the case of an unsupported rule
   *
   * @access private
   * @function nativeTestProps
   * @param {array} props - An array of property names
   * @param {string} value - A string representing the value we want to check via @supports
   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
   */
    // Accepts a list of property names and a single value
    // Returns `undefined` if native detection not available
    function nativeTestProps(props, value) {
        var i = props.length;
        // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
        if ("CSS" in window && "supports" in window.CSS) {
            // Try every prefixed variant of the property
            for (;i--; ) if (window.CSS.supports(domToCSS(props[i]), value)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in window) {
            for (// Build a condition string for every prefixed variant
            var conditionText = []; i--; ) conditionText.push("(" + domToCSS(props[i]) + ":" + value + ")");
            return conditionText = conditionText.join(" or "), injectElementWithStyles("@supports (" + conditionText + ") { #modernizr { position: absolute; } }", function(node) {
                return "absolute" == getComputedStyle(node, null).position;
            });
        }
        return undefined;
    }
    // testProps is a generic CSS / DOM property test.
    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.
    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.
    // Property names can be provided in either camelCase or kebab-case.
    function testProps(props, prefixed, value, skipValueTest) {
        // Delete the objects if we created them.
        function cleanElems() {
            afterInit && (delete mStyle.style, delete mStyle.modElem);
        }
        // Try native detect first
        if (skipValueTest = is(skipValueTest, "undefined") ? !1 : skipValueTest, !is(value, "undefined")) {
            var result = nativeTestProps(props, value);
            if (!is(result, "undefined")) return result;
        }
        for (// Otherwise do it properly
        var afterInit, i, propsLength, prop, before, elems = [ "modernizr", "tspan" ]; !mStyle.style; ) afterInit = !0, 
        mStyle.modElem = createElement(elems.shift()), mStyle.style = mStyle.modElem.style;
        for (propsLength = props.length, i = 0; propsLength > i; i++) if (prop = props[i], 
        before = mStyle.style[prop], contains(prop, "-") && (prop = cssToDOM(prop)), mStyle.style[prop] !== undefined) {
            // If value to test has been passed in, do a set-and-check test.
            // 0 (integer) is a valid property value, so check that `value` isn't
            // undefined, rather than just checking it's truthy.
            if (skipValueTest || is(value, "undefined")) return cleanElems(), "pfx" == prefixed ? prop : !0;
            // Needs a try catch block because of old IE. This is slow, but will
            // be avoided in most cases because `skipValueTest` will be used.
            try {
                mStyle.style[prop] = value;
            } catch (e) {}
            // If the property value has changed, we assume the value used is
            // supported. If `value` is empty string, it'll fail here (because
            // it hasn't changed), which matches how browsers have implemented
            // CSS.supports()
            if (mStyle.style[prop] != before) return cleanElems(), "pfx" == prefixed ? prop : !0;
        }
        return cleanElems(), !1;
    }
    /**
   * testPropsAll tests a list of DOM properties we want to check against.
   * We specify literally ALL possible (known and/or likely) properties on
   * the element including the non-vendor prefixed one, for forward-
   * compatibility.
   */
    function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
        // did they call .prefixed('boxSizing') or are we just testing a prop?
        // did they call .prefixed('boxSizing') or are we just testing a prop?
        return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed, value, skipValueTest) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), 
        testDOMProps(props, prefixed, elem));
    }
    /**
   * testAllProps determines whether a given CSS property is supported in the browser
   *
   * @memberof Modernizr
   * @name Modernizr.testAllProps
   * @optionName Modernizr.testAllProps()
   * @optionProp testAllProps
   * @access public
   * @function testAllProps
   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
   * @param {string} [value] - String of the value to test
   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
   * @example
   *
   * testAllProps determines whether a given CSS property, in some prefixed form,
   * is supported by the browser.
   *
   * ```js
   * testAllProps('boxSizing')  // true
   * ```
   *
   * It can optionally be given a CSS value in string form to test if a property
   * value is valid
   *
   * ```js
   * testAllProps('display', 'block') // true
   * testAllProps('display', 'penguin') // false
   * ```
   *
   * A boolean can be passed as a third parameter to skip the value check when
   * native detection (@supports) isn't available.
   *
   * ```js
   * testAllProps('shapeOutside', 'content-box', true);
   * ```
   */
    function testAllProps(prop, value, skipValueTest) {
        return testPropsAll(prop, undefined, undefined, value, skipValueTest);
    }
    var classes = [], tests = [], ModernizrProto = {
        // The current version, dummy
        _version: "3.1.0",
        // Any settings that don't work as separate modules
        // can go in here as configuration.
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        // Queue of tests
        _q: [],
        // Stub these for people who are listening
        on: function(test, cb) {
            // I don't really think people should do this, but we can
            // safe guard it a bit.
            // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
            // This is in case people listen to synchronous tests. I would leave it out,
            // but the code to *disallow* sync tests in the real version of this
            // function is actually larger than this.
            var self = this;
            setTimeout(function() {
                cb(self[test]);
            }, 0);
        },
        addTest: function(name, fn, options) {
            tests.push({
                name: name,
                fn: fn,
                options: options
            });
        },
        addAsyncTest: function(fn) {
            tests.push({
                name: null,
                fn: fn
            });
        }
    }, Modernizr = function() {};
    Modernizr.prototype = ModernizrProto, // Leak modernizr globally when you `require` it rather than force it here.
    // Overwrite name so constructor name is nicer :D
    Modernizr = new Modernizr();
    /**
   * List of property values to set for css tests. See ticket #21
   * http://git.io/vUGl4
   *
   * @memberof Modernizr
   * @name Modernizr._prefixes
   * @optionName Modernizr._prefixes
   * @optionProp prefixes
   * @access public
   * @example
   *
   * Modernizr._prefixes is the internal list of prefixes that we test against
   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
   * an array of kebab-case vendor prefixes you can use within your code.
   *
   * Some common use cases include
   *
   * Generating all possible prefixed version of a CSS property
   * ```js
   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
   *
   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
   * ```
   *
   * Generating all possible prefixed version of a CSS value
   * ```js
   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
   *
   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
   * ```
   */
    var prefixes = ModernizrProto._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];
    // expose these for the plugin API. Look in the source for how to join() them against your input
    ModernizrProto._prefixes = prefixes;
    /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */
    var docElement = document.documentElement, omPrefixes = "Moz O ms Webkit", domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(" ") : [];
    ModernizrProto._domPrefixes = domPrefixes;
    /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */
    var isSVG = "svg" === docElement.nodeName.toLowerCase();
    isSVG || !function(window, document) {
        /*--------------------------------------------------------------------------*/
        /**
       * Creates a style sheet with the given CSS text and adds it to the document.
       * @private
       * @param {Document} ownerDocument The document.
       * @param {String} cssText The CSS text.
       * @returns {StyleSheet} The style element.
       */
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement("p"), parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
            return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild);
        }
        /**
       * Returns the value of `html5.elements` as an array.
       * @private
       * @returns {Array} An array of shived element node names.
       */
        function getElements() {
            var elements = html5.elements;
            return "string" == typeof elements ? elements.split(" ") : elements;
        }
        /**
       * Extends the built-in list of html5 elements
       * @memberOf html5
       * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
       * @param {Document} ownerDocument The context document.
       */
        function addElements(newElements, ownerDocument) {
            var elements = html5.elements;
            "string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), 
            html5.elements = elements + " " + newElements, shivDocument(ownerDocument);
        }
        /**
       * Returns the data associated to the given document
       * @private
       * @param {Document} ownerDocument The document.
       * @returns {Object} An object of data.
       */
        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), 
            data;
        }
        /**
       * returns a shived element for the given nodeName and document
       * @memberOf html5
       * @param {String} nodeName name of the element
       * @param {Document|DocumentFragment} ownerDocument The context document.
       * @returns {Object} The shived element.
       */
        function createElement(nodeName, ownerDocument, data) {
            if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
            data || (data = getExpandoData(ownerDocument));
            var node;
            // Avoid adding some elements to fragments in IE < 9 because
            // * Attributes like `name` or `type` cannot be set/changed once an element
            //   is inserted into a document/fragment
            // * Link elements with `src` attributes that are inaccessible, as with
            //   a 403 response, will cause the tab/window to crash
            // * Script elements appended to fragments will execute when their `src`
            //   or `text` property is set
            return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), 
            !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node);
        }
        /**
       * returns a shived DocumentFragment for the given document
       * @memberOf html5
       * @param {Document} ownerDocument The context document.
       * @returns {Object} The shived DocumentFragment.
       */
        function createDocumentFragment(ownerDocument, data) {
            if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
            data = data || getExpandoData(ownerDocument);
            for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; l > i; i++) clone.createElement(elems[i]);
            return clone;
        }
        /**
       * Shivs the `createElement` and `createDocumentFragment` methods of the document.
       * @private
       * @param {Document|DocumentFragment} ownerDocument The document.
       * @param {Object} data of the document.
       */
        function shivMethods(ownerDocument, data) {
            data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, 
            data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                //abort shiv
                //abort shiv
                return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName);
            }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + // unroll the `createElement` calls
            getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
                return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")';
            }) + ");return n}")(html5, data.frag);
        }
        /*--------------------------------------------------------------------------*/
        /**
       * Shivs the given document.
       * @memberOf html5
       * @param {Document} ownerDocument The document to shiv.
       * @returns {Document} The shived document.
       */
        function shivDocument(ownerDocument) {
            ownerDocument || (ownerDocument = document);
            var data = getExpandoData(ownerDocument);
            // corrects block display not defined in IE6/7/8/9
            return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
            supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument;
        }
        /*jshint evil:true */
        /** version */
        var supportsHtml5Styles, supportsUnknownElements, version = "3.7.3", options = window.html5 || {}, reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, expando = "_html5shiv", expanID = 0, expandoData = {};
        !function() {
            try {
                var a = document.createElement("a");
                a.innerHTML = "<xyz></xyz>", //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
                supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                    // assign a false positive if unable to shiv
                    document.createElement("a");
                    var frag = document.createDocumentFragment();
                    return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement;
                }();
            } catch (e) {
                // assign a false positive if detection fails => unable to shiv
                supportsHtml5Styles = !0, supportsUnknownElements = !0;
            }
        }();
        /*--------------------------------------------------------------------------*/
        /**
       * The `html5` object is exposed so that more elements can be shived and
       * existing shiving can be detected on iframes.
       * @type Object
       * @example
       *
       * // options can be changed before the script is included
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
       */
        var html5 = {
            /**
         * An array or space separated string of node names of the elements to shiv.
         * @memberOf html5
         * @type Array|String
         */
            elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
            /**
         * current version of html5shiv
         */
            version: version,
            /**
         * A flag to indicate that the HTML5 style sheet should be inserted.
         * @memberOf html5
         * @type Boolean
         */
            shivCSS: options.shivCSS !== !1,
            /**
         * Is equal to true if a browser supports creating unknown/HTML5 elements
         * @memberOf html5
         * @type boolean
         */
            supportsUnknownElements: supportsUnknownElements,
            /**
         * A flag to indicate that the document's `createElement` and `createDocumentFragment`
         * methods should be overwritten.
         * @memberOf html5
         * @type Boolean
         */
            shivMethods: options.shivMethods !== !1,
            /**
         * A string to describe the type of `html5` object ("default" or "default print").
         * @memberOf html5
         * @type String
         */
            type: "default",
            // shivs the document according to the specified `html5` object options
            shivDocument: shivDocument,
            //creates a shived element
            createElement: createElement,
            //creates a shived documentFragment
            createDocumentFragment: createDocumentFragment,
            //extends list of elements
            addElements: addElements
        };
        /*--------------------------------------------------------------------------*/
        // expose html5
        window.html5 = html5, // shiv the document
        shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5);
    }("undefined" != typeof window ? window : this, document), /*!
{
  "name": "CSS Gradients",
  "caniuse": "css-gradients",
  "property": "cssgradients",
  "tags": ["css"],
  "knownBugs": ["False-positives on webOS (https://github.com/Modernizr/Modernizr/issues/202)"],
  "notes": [{
    "name": "Webkit Gradient Syntax",
    "href": "http://webkit.org/blog/175/introducing-css-gradients/"
  },{
    "name": "Mozilla Linear Gradient Syntax",
    "href": "http://developer.mozilla.org/en/CSS/-moz-linear-gradient"
  },{
    "name": "Mozilla Radial Gradient Syntax",
    "href": "http://developer.mozilla.org/en/CSS/-moz-radial-gradient"
  },{
    "name": "W3C Gradient Spec",
    "href": "dev.w3.org/csswg/css3-images/#gradients-"
  }]
}
!*/
    Modernizr.addTest("cssgradients", function() {
        var str1 = "background-image:", str2 = "gradient(linear,left top,right bottom,from(#9f9),to(white));", str3 = "linear-gradient(left top,#9f9, white);", css = str1 + prefixes.join(str3 + str1).slice(0, -str1.length);
        Modernizr._config.usePrefixes && (// legacy webkit syntax (FIXME: remove when syntax not in use anymore)
        css += str1 + "-webkit-" + str2);
        var elem = createElement("a"), style = elem.style;
        // IE6 returns undefined so cast to string
        return style.cssText = css, ("" + style.backgroundImage).indexOf("gradient") > -1;
    }), /*!
{
  "name": "CSS rgba",
  "caniuse": "css3-colors",
  "property": "rgba",
  "tags": ["css"],
  "notes": [{
    "name": "CSSTricks Tutorial",
    "href": "http://css-tricks.com/rgba-browser-support/"
  }]
}
!*/
    Modernizr.addTest("rgba", function() {
        var style = createElement("a").style;
        return style.cssText = "background-color:rgba(150,255,150,.5)", ("" + style.backgroundColor).indexOf("rgba") > -1;
    });
    /*!
{
  "name": "CSS Supports",
  "property": "supports",
  "caniuse": "css-featurequeries",
  "tags": ["css"],
  "builderAliases": ["css_supports"],
  "notes": [{
    "name": "W3 Spec",
    "href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
  },{
    "name": "Related Github Issue",
    "href": "github.com/Modernizr/Modernizr/issues/648"
  },{
    "name": "W3 Info",
    "href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
  }]
}
!*/
    var newSyntax = "CSS" in window && "supports" in window.CSS, oldSyntax = "supportsCSS" in window;
    Modernizr.addTest("supports", newSyntax || oldSyntax);
    var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(" ") : [];
    ModernizrProto._cssomPrefixes = cssomPrefixes;
    /**
   * testStyles injects an element with style element and some CSS rules
   *
   * @memberof Modernizr
   * @name Modernizr.testStyles
   * @optionName Modernizr.testStyles()
   * @optionProp testStyles
   * @access public
   * @function testStyles
   * @param {string} rule - String representing a css rule
   * @param {function} callback - A function that is used to test the injected element
   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
   * @returns {boolean}
   * @example
   *
   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
   * along with (possibly multiple) DOM elements. This lets you check for features
   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
   *
   * ```js
   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
   *   // elem is the first DOM node in the page (by default #modernizr)
   *   // rule is the first argument you supplied - the CSS rule in string form
   *
   *   addTest('widthworks', elem.style.width === '9px')
   * });
   * ```
   *
   * If your test requires multiple nodes, you can include a third argument
   * indicating how many additional div elements to include on the page. The
   * additional nodes are injected as children of the `elem` that is returned as
   * the first argument to the callback.
   *
   * ```js
   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
   *   document.getElementById('modernizr').style.width === '1px'; // true
   *   document.getElementById('modernizr2').style.width === '2px'; // true
   *   elem.firstChild === document.getElementById('modernizr2'); // true
   * }, 1);
   * ```
   *
   * By default, all of the additional elements have an ID of `modernizr[n]`, where
   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
   * the second additional is `#modernizr3`, etc.).
   * If you want to have more meaningful IDs for your function, you can provide
   * them as the fourth argument, as an array of strings
   *
   * ```js
   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
   *   elem.firstChild === document.getElementById('foo'); // true
   *   elem.lastChild === document.getElementById('bar'); // true
   * }, 2, ['foo', 'bar']);
   * ```
   *
   */
    var testStyles = ModernizrProto.testStyles = injectElementWithStyles, blacklist = function() {
        var ua = navigator.userAgent, wkvers = ua.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1), webos = ua.match(/w(eb)?osbrowser/gi), wppre8 = ua.match(/windows phone/gi) && ua.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9, oldandroid = 533 > wkvers && ua.match(/android/gi);
        return webos || oldandroid || wppre8;
    }();
    blacklist ? Modernizr.addTest("fontface", !1) : testStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
        var style = document.getElementById("smodernizr"), sheet = style.sheet || style.styleSheet, cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || "" : "", bool = /src/i.test(cssText) && 0 === cssText.indexOf(rule.split(" ")[0]);
        Modernizr.addTest("fontface", bool);
    });
    /**
   * Create our "modernizr" element that we do most feature tests on.
   *
   * @access private
   */
    var modElem = {
        elem: createElement("modernizr")
    };
    // Clean up this element
    Modernizr._q.push(function() {
        delete modElem.elem;
    });
    var mStyle = {
        style: modElem.elem.style
    };
    // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
    // the front of the queue.
    Modernizr._q.unshift(function() {
        delete mStyle.style;
    });
    /**
   * testProp() investigates whether a given style property is recognized
   * Property names can be provided in either camelCase or kebab-case.
   *
   * @memberof Modernizr
   * @name Modernizr.testProp
   * @access public
   * @optionName Modernizr.testProp()
   * @optionProp testProp
   * @function testProp
   * @param {string} prop - Name of the CSS property to check
   * @param {string} [value] - Name of the CSS value to check
   * @param {boolean} [useValue] - Whether or not to check the value if @supports isn't supported
   * @returns {boolean}
   * @example
   *
   * Just like [testAllProps](#modernizr-testallprops), only it does not check any vendor prefixed
   * version of the string.
   *
   * Note that the property name must be provided in camelCase (e.g. boxSizing not box-sizing)
   *
   * ```js
   * Modernizr.testProp('pointerEvents')  // true
   * ```
   *
   * You can also provide a value as an optional second argument to check if a
   * specific value is supported
   *
   * ```js
   * Modernizr.testProp('pointerEvents', 'none') // true
   * Modernizr.testProp('pointerEvents', 'penguin') // false
   * ```
   */
    ModernizrProto.testProp = function(prop, value, useValue) {
        return testProps([ prop ], undefined, value, useValue);
    };
    // Modernizr.testAllProps() investigates whether a given style property,
    // or any of its vendor-prefixed variants, is recognized
    //
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    ModernizrProto.testAllProps = testPropsAll, ModernizrProto.testAllProps = testAllProps, 
    /*!
{
  "name": "Border Radius",
  "property": "borderradius",
  "caniuse": "border-radius",
  "polyfills": ["css3pie"],
  "tags": ["css"],
  "notes": [{
    "name": "Comprehensive Compat Chart",
    "href": "http://muddledramblings.com/table-of-css3-border-radius-compliance"
  }]
}
!*/
    Modernizr.addTest("borderradius", testAllProps("borderRadius", "0px", !0)), /*!
{
  "name": "CSS Reflections",
  "caniuse": "css-reflections",
  "property": "cssreflections",
  "tags": ["css"]
}
!*/
    Modernizr.addTest("cssreflections", testAllProps("boxReflect", "above", !0)), /*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/
    Modernizr.addTest("csstransforms", function() {
        // Android < 3.0 is buggy, so we sniff and blacklist
        // http://git.io/hHzL7w
        return -1 === navigator.userAgent.indexOf("Android 2.") && testAllProps("transform", "scale(1)", !0);
    }), /*!
{
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
}
!*/
    Modernizr.addTest("csstransforms3d", function() {
        var ret = !!testAllProps("perspective", "1px", !0), usePrefix = Modernizr._config.usePrefixes;
        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if (ret && (!usePrefix || "webkitPerspective" in docElement.style)) {
            var mq;
            // Use CSS Conditional Rules if available
            Modernizr.supports ? mq = "@supports (perspective: 1px)" : (// Otherwise, Webkit allows this media query to succeed only if the feature is enabled.
            // `@media (transform-3d),(-webkit-transform-3d){ ... }`
            mq = "@media (transform-3d)", usePrefix && (mq += ",(-webkit-transform-3d)")), // If loaded inside the body tag and the test element inherits any padding, margin or borders it will fail #740
            mq += "{#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}", 
            testStyles(mq, function(elem) {
                ret = 9 === elem.offsetLeft && 5 === elem.offsetHeight;
            });
        }
        return ret;
    }), // Run each test
    testRunner(), // Remove the "no-js" class if it exists
    setClasses(classes), delete ModernizrProto.addTest, delete ModernizrProto.addAsyncTest;
    // Run the things that are supposed to run after the tests
    for (var i = 0; i < Modernizr._q.length; i++) Modernizr._q[i]();
    // Leak Modernizr namespace
    window.Modernizr = Modernizr;
}(window, document);