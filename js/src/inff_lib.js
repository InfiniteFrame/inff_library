/* DO NOT REMOVE THIS COMMENT | Created By: InfiniteFrame | Created Date: 2006-10-10 | Modified By: InfiniteFrame | Modified Date: 2019-03-06 | Version 2.12 | Details and License here: https://www.infiniteframe.com/git/ */
/*
* Un-commented source file for initial submit
* TODO replace will full commented version
* 
*/

(function(window, document) {

    "use strict";

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, fromIndex) {
            var i;
            if (fromIndex == null) {
                fromIndex = 0;
            } else if (fromIndex < 0) {
                fromIndex = Math.max(0, this.length + fromIndex);
            }
            for (i = fromIndex; i < this.length; i = (i + 1)) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            var str = this,
                ws = /\s/,
                i = str.length;
            str = str.replace(/^\s\s*/, "");
            while (ws.test(str.charAt(--i))) {};
            return str.slice(0, i + 1);
        };
    }
    if (!String.prototype.ucfirst) {
        String.prototype.ucfirst = function() {
            return this.charAt(0).toUpperCase() + this.substr(1);
        };
    }
    if (!String.prototype.left_pad) {
        String.prototype.left_pad = function(padString, length) {
            var str = this;
            while (str.length < length) {
                str = padString + str;
            }
            return str;
        };
    }
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                FunctionObject = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof FunctionObject && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            FunctionObject.prototype = this.prototype;
            fBound.prototype = new FunctionObject();
            return fBound;
        };
    }
    window.createElem = function(tag, prop) {
        var el = document.createElement(tag || "div"),
            n;
        if (prop !== null) {
            for (n in prop) {
                if (prop.hasOwnProperty(n)) {
                    el[n] = prop[n];
                    delete prop[n];
                }
            }
        }
        n = null;
        return el;
    };
    window.applyCss = function(el, prop) {
        var n;
        if (prop !== null) {
            for (n in prop) {
                if (prop.hasOwnProperty(n)) {
                    if (typeof el.style !== "undefined") {
                        el.style[n] = prop[n];
                        delete prop[n];
                    }
                }
            }
        }
        n = null;
        return el;
    };
    window.has_class = function(el, className) {
        if (el.classList) return el.classList.contains(className);
        return !!el.className.match(new RegExp("(\\s|^)'" + className + "(\\s|$)"));
    };
    window.set_class = function(el, class_name) {
        return el.className = class_name;
    };
    window.add_class = function(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!has_class(el, className)) {
            el.className += " " + className;
        }
    };
    window.remove_class = function(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (has_class(el, className)) {
            var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
            el.className = el.className.replace(reg, " ");
        }
    };

    window.var_dump = function(arr, level) {
        var dumped_text = "",
            j, item, value, level_padding = "";
        if (!level) {
            level = 0;
        }
        for (j = 0; j < level + 1; j = (j + 1)) {
            level_padding += "  ";
        }
        if (typeof(arr) === "object") {
            for (item in arr) {
                value = arr[item];
                if (typeof(value) === "object") {
                    dumped_text += level_padding + "'" + item + "' ...\n";
                    dumped_text += var_dump(value, level + 1);
                } else {
                    dumped_text += level_padding + "'" + item + "'=> \"" + value + "\"\n";
                }
            }
        } else {
            dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
        }
        return dumped_text;
    };
    window.Inff_Lib = (function() {
        var prop_obj = {
                "version": "16.12"
            },
            private_return_JSON, 
            private_get_query_object, 
            private_inline_fileload;
        private_return_JSON = function(inV) {
            var jp = null;
            if ((typeof inV !== "undefined") && (inV !== null) && (inV !== "")) {
                try {
                    if ((JSON !== undefined) && (JSON !== null) && (JSON.parse !== null) && (JSON.parse !== undefined)) {
                        var loc = inV.indexOf("{");
                        if (loc > 0) {}
                        var errmsg = inV.substr(0, loc);
                        inV = inV.substr(loc);
                        try {
                            jp = JSON.parse(inV);
                        } catch (ex) {
                            jp = $.parseJSON(inV);
                        }
                    }
                } catch (e) {
                    try {
                        jp = $.parseJSON(inV);
                    } catch (exj) {}
                }
                inV = null;
                if (jp !== null) {
                    return jp;
                }
            }
            return false;
        };
        private_get_query_object = function() {
            var vars = [],
                i, hash, hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (i = 0; i < hashes.length; i = i + 1) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = decodeURIComponent(hash[1]);
            }
            return vars;
        };
        private_inline_fileload = function(inV) {
            function load_next() {
                var element;
                if ((typeof inV.loadque.length !== "undefined") && (inV.loadque.length !== null) && (inV.loadque.length > 0)) {
                    try {
                        var lqi = inV.loadque.shift();
                        if (lqi.type === "css") {
                            element = document.createElement("link");
                            element.rel = 'stylesheet';
                            element.href = lqi.src;
                            if ((typeof element !== 'undefined') && (typeof element.href !== 'undefined') && (element.href.lastIndexOf("undefined") < 1)) {
                                var h = document.getElementsByTagName('head')[0];
                                h.parentNode.insertBefore(element, h);
                            }
                        } else {
                            element = document.createElement("script");
                            element.src = lqi.src;
                            if ((typeof element !== 'undefined') && (typeof element.src !== 'undefined') && (element.src.lastIndexOf("undefined") < 1)) {
                                document.body.appendChild(element);
                            }
                        }
                        if (inV.loadque.length > 0) {
                            setTimeout(load_next, 12);
                        } else {
                            delete inV.loadque;
                        }
                    } catch (e) {}
                } else {
                    delete inV.loadque;
                }
            }
            load_next();
        };
        return {
            return_JSON: function(inV) {
                return private_return_JSON(inV);
            },
            inline_fileload: function(inV) {
                private_inline_fileload(inV);
            }
    })();

}(this, document));

