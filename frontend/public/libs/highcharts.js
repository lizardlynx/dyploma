/*
 Highcharts JS v11.0.0 (2023-04-26)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (T, M) {
  "object" === typeof module && module.exports
    ? ((M["default"] = M), (module.exports = T.document ? M(T) : M))
    : "function" === typeof define && define.amd
    ? define("highcharts/highcharts", function () {
        return M(T);
      })
    : (T.Highcharts && T.Highcharts.error(16, !0), (T.Highcharts = M(T)));
})("undefined" !== typeof window ? window : this, function (T) {
  function M(a, y, H, K) {
    a.hasOwnProperty(y) ||
      ((a[y] = K.apply(null, H)),
      "function" === typeof CustomEvent &&
        T.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: y, module: a[y] },
          })
        ));
  }
  var a = {};
  M(a, "Core/Globals.js", [], function () {
    var a;
    (function (a) {
      a.SVG_NS = "http://www.w3.org/2000/svg";
      a.product = "Highcharts";
      a.version = "11.0.0";
      a.win = "undefined" !== typeof T ? T : {};
      a.doc = a.win.document;
      a.svg =
        a.doc &&
        a.doc.createElementNS &&
        !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
      a.userAgent = (a.win.navigator && a.win.navigator.userAgent) || "";
      a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
      a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
      a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
      a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
      a.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a.userAgent);
      a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
      a.deg2rad = (2 * Math.PI) / 360;
      a.hasBidiBug =
        a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
      a.hasTouch = !!a.win.TouchEvent;
      a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      a.noop = function () {};
      a.supportsPassiveEvents = (function () {
        let w = !1;
        if (!a.isMS) {
          const y = Object.defineProperty({}, "passive", {
            get: function () {
              w = !0;
            },
          });
          a.win.addEventListener &&
            a.win.removeEventListener &&
            (a.win.addEventListener("testPassive", a.noop, y),
            a.win.removeEventListener("testPassive", a.noop, y));
        }
        return w;
      })();
      a.charts = [];
      a.dateFormats = {};
      a.seriesTypes = {};
      a.symbolSizes = {};
      a.chartCount = 0;
    })(a || (a = {}));
    ("");
    return a;
  });
  M(a, "Core/Utilities.js", [a["Core/Globals.js"]], function (a) {
    function w(b, c, l, e) {
      const p = c ? "Highcharts error" : "Highcharts warning";
      32 === b && (b = `${p}: Deprecated member`);
      const O = v(b);
      let q = O ? `${p} #${b}: www.highcharts.com/errors/${b}/` : b.toString();
      if ("undefined" !== typeof e) {
        let b = "";
        O && (q += "?");
        I(e, function (c, p) {
          b += `\n - ${p}: ${c}`;
          O && (q += encodeURI(p) + "=" + encodeURI(c));
        });
        q += b;
      }
      z(
        a,
        "displayError",
        { chart: l, code: b, message: q, params: e },
        function () {
          if (c) throw Error(q);
          d.console && -1 === w.messages.indexOf(q) && console.warn(q);
        }
      );
      w.messages.push(q);
    }
    function H(b, c) {
      const p = {};
      I(b, function (l, d) {
        if (C(b[d], !0) && !b.nodeType && c[d])
          (l = H(b[d], c[d])), Object.keys(l).length && (p[d] = l);
        else if (C(b[d]) || b[d] !== c[d] || (d in b && !(d in c))) p[d] = b[d];
      });
      return p;
    }
    function K(b, c) {
      return parseInt(b, c || 10);
    }
    function B(b) {
      return "string" === typeof b;
    }
    function E(b) {
      b = Object.prototype.toString.call(b);
      return "[object Array]" === b || "[object Array Iterator]" === b;
    }
    function C(b, c) {
      return !!b && "object" === typeof b && (!c || !E(b));
    }
    function A(b) {
      return C(b) && "number" === typeof b.nodeType;
    }
    function u(b) {
      const c = b && b.constructor;
      return !(!C(b, !0) || A(b) || !c || !c.name || "Object" === c.name);
    }
    function v(b) {
      return (
        "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
      );
    }
    function f(b) {
      return "undefined" !== typeof b && null !== b;
    }
    function h(b, c, l) {
      const p = B(c) && !f(l);
      let d;
      const e = (c, l) => {
        f(c)
          ? b.setAttribute(l, c)
          : p
          ? (d = b.getAttribute(l)) ||
            "class" !== l ||
            (d = b.getAttribute(l + "Name"))
          : b.removeAttribute(l);
      };
      B(c) ? e(l, c) : I(c, e);
      return d;
    }
    function r(b, c) {
      let l;
      b || (b = {});
      for (l in c) b[l] = c[l];
      return b;
    }
    function m() {
      const b = arguments,
        c = b.length;
      for (let l = 0; l < c; l++) {
        const c = b[l];
        if ("undefined" !== typeof c && null !== c) return c;
      }
    }
    function n(b, c) {
      a.isMS &&
        !a.svg &&
        c &&
        f(c.opacity) &&
        (c.filter = `alpha(opacity=${100 * c.opacity})`);
      r(b.style, c);
    }
    function k(b) {
      return Math.pow(10, Math.floor(Math.log(b) / Math.LN10));
    }
    function g(b, c) {
      return 1e14 < b ? b : parseFloat(b.toPrecision(c || 14));
    }
    function I(b, c, l) {
      for (const p in b)
        Object.hasOwnProperty.call(b, p) && c.call(l || b[p], b[p], p, b);
    }
    function F(b, c, l) {
      function p(c, l) {
        const p = b.removeEventListener;
        p && p.call(b, c, l, !1);
      }
      function d(l) {
        let d, e;
        b.nodeName &&
          (c ? ((d = {}), (d[c] = !0)) : (d = l),
          I(d, function (b, c) {
            if (l[c]) for (e = l[c].length; e--; ) p(c, l[c][e].fn);
          }));
      }
      var e = ("function" === typeof b && b.prototype) || b;
      if (Object.hasOwnProperty.call(e, "hcEvents")) {
        const b = e.hcEvents;
        c
          ? ((e = b[c] || []),
            l
              ? ((b[c] = e.filter(function (b) {
                  return l !== b.fn;
                })),
                p(c, l))
              : (d(b), (b[c] = [])))
          : (d(b), delete e.hcEvents);
      }
    }
    function z(b, c, l, d) {
      l = l || {};
      if (t.createEvent && (b.dispatchEvent || (b.fireEvent && b !== a))) {
        var p = t.createEvent("Events");
        p.initEvent(c, !0, !0);
        l = r(p, l);
        b.dispatchEvent ? b.dispatchEvent(l) : b.fireEvent(c, l);
      } else if (b.hcEvents) {
        l.target ||
          r(l, {
            preventDefault: function () {
              l.defaultPrevented = !0;
            },
            target: b,
            type: c,
          });
        p = [];
        let d = b,
          e = !1;
        for (; d.hcEvents; )
          Object.hasOwnProperty.call(d, "hcEvents") &&
            d.hcEvents[c] &&
            (p.length && (e = !0), p.unshift.apply(p, d.hcEvents[c])),
            (d = Object.getPrototypeOf(d));
        e && p.sort((b, c) => b.order - c.order);
        p.forEach((c) => {
          !1 === c.fn.call(b, l) && l.preventDefault();
        });
      }
      d && !l.defaultPrevented && d.call(b, l);
    }
    const { charts: e, doc: t, win: d } = a;
    (w || (w = {})).messages = [];
    Math.easeInOutSine = function (b) {
      return -0.5 * (Math.cos(Math.PI * b) - 1);
    };
    var q = Array.prototype.find
      ? function (b, c) {
          return b.find(c);
        }
      : function (b, c) {
          let l;
          const p = b.length;
          for (l = 0; l < p; l++) if (c(b[l], l)) return b[l];
        };
    I(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (b, c) {
        a[c] = function (l) {
          w(32, !1, void 0, { [`Highcharts.${c}`]: `use Array.${b}` });
          return Array.prototype[b].apply(l, [].slice.call(arguments, 1));
        };
      }
    );
    let x;
    const c = (function () {
      const b = Math.random().toString(36).substring(2, 9) + "-";
      let c = 0;
      return function () {
        return "highcharts-" + (x ? "" : b) + c++;
      };
    })();
    d.jQuery &&
      (d.jQuery.fn.highcharts = function () {
        const b = [].slice.call(arguments);
        if (this[0])
          return b[0]
            ? (new a[B(b[0]) ? b.shift() : "Chart"](this[0], b[0], b[1]), this)
            : e[h(this[0], "data-highcharts-chart")];
      });
    q = {
      addEvent: function (b, c, l, d = {}) {
        var p = ("function" === typeof b && b.prototype) || b;
        Object.hasOwnProperty.call(p, "hcEvents") || (p.hcEvents = {});
        p = p.hcEvents;
        a.Point &&
          b instanceof a.Point &&
          b.series &&
          b.series.chart &&
          (b.series.chart.runTrackerClick = !0);
        const e = b.addEventListener;
        e &&
          e.call(
            b,
            c,
            l,
            a.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === d.passive
                      ? -1 !== c.indexOf("touch")
                      : d.passive,
                  capture: !1,
                }
              : !1
          );
        p[c] || (p[c] = []);
        p[c].push({
          fn: l,
          order: "number" === typeof d.order ? d.order : Infinity,
        });
        p[c].sort((b, c) => b.order - c.order);
        return function () {
          F(b, c, l);
        };
      },
      arrayMax: function (b) {
        let c = b.length,
          l = b[0];
        for (; c--; ) b[c] > l && (l = b[c]);
        return l;
      },
      arrayMin: function (b) {
        let c = b.length,
          l = b[0];
        for (; c--; ) b[c] < l && (l = b[c]);
        return l;
      },
      attr: h,
      clamp: function (b, c, l) {
        return b > c ? (b < l ? b : l) : c;
      },
      cleanRecursively: H,
      clearTimeout: function (b) {
        f(b) && clearTimeout(b);
      },
      correctFloat: g,
      createElement: function (b, c, l, d, e) {
        b = t.createElement(b);
        c && r(b, c);
        e && n(b, { padding: "0", border: "none", margin: "0" });
        l && n(b, l);
        d && d.appendChild(b);
        return b;
      },
      css: n,
      defined: f,
      destroyObjectProperties: function (b, c) {
        I(b, function (l, d) {
          l && l !== c && l.destroy && l.destroy();
          delete b[d];
        });
      },
      discardElement: function (b) {
        b && b.parentElement && b.parentElement.removeChild(b);
      },
      erase: function (b, c) {
        let l = b.length;
        for (; l--; )
          if (b[l] === c) {
            b.splice(l, 1);
            break;
          }
      },
      error: w,
      extend: r,
      extendClass: function (b, c) {
        const l = function () {};
        l.prototype = new b();
        r(l.prototype, c);
        return l;
      },
      find: q,
      fireEvent: z,
      getMagnitude: k,
      getNestedProperty: function (b, c) {
        for (b = b.split("."); b.length && f(c); ) {
          const l = b.shift();
          if ("undefined" === typeof l || "__proto__" === l) return;
          c = c[l];
          if (
            !f(c) ||
            "function" === typeof c ||
            "number" === typeof c.nodeType ||
            c === d
          )
            return;
        }
        return c;
      },
      getStyle: function (b, c, l) {
        const e = a.getStyle;
        let p;
        if ("width" === c)
          return (
            (c = Math.min(b.offsetWidth, b.scrollWidth)),
            (l = b.getBoundingClientRect && b.getBoundingClientRect().width),
            l < c && l >= c - 1 && (c = Math.floor(l)),
            Math.max(
              0,
              c -
                (e(b, "padding-left", !0) || 0) -
                (e(b, "padding-right", !0) || 0)
            )
          );
        if ("height" === c)
          return Math.max(
            0,
            Math.min(b.offsetHeight, b.scrollHeight) -
              (e(b, "padding-top", !0) || 0) -
              (e(b, "padding-bottom", !0) || 0)
          );
        if ((b = d.getComputedStyle(b, void 0)))
          (p = b.getPropertyValue(c)), m(l, "opacity" !== c) && (p = K(p));
        return p;
      },
      inArray: function (b, c, l) {
        w(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
        return c.indexOf(b, l);
      },
      isArray: E,
      isClass: u,
      isDOMElement: A,
      isFunction: function (b) {
        return "function" === typeof b;
      },
      isNumber: v,
      isObject: C,
      isString: B,
      keys: function (b) {
        w(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
        return Object.keys(b);
      },
      merge: function () {
        let b,
          c = arguments,
          l = {};
        const d = function (b, c) {
          "object" !== typeof b && (b = {});
          I(c, function (l, e) {
            "__proto__" !== e &&
              "constructor" !== e &&
              (!C(l, !0) || u(l) || A(l)
                ? (b[e] = c[e])
                : (b[e] = d(b[e] || {}, l)));
          });
          return b;
        };
        !0 === c[0] && ((l = c[1]), (c = Array.prototype.slice.call(c, 2)));
        const e = c.length;
        for (b = 0; b < e; b++) l = d(l, c[b]);
        return l;
      },
      normalizeTickInterval: function (b, c, l, d, e) {
        let p = b;
        l = m(l, k(b));
        const q = b / l;
        c ||
          ((c = e
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === d &&
            (1 === l
              ? (c = c.filter(function (b) {
                  return 0 === b % 1;
                }))
              : 0.1 >= l && (c = [1 / l])));
        for (
          d = 0;
          d < c.length &&
          !((p = c[d]),
          (e && p * l >= b) || (!e && q <= (c[d] + (c[d + 1] || c[d])) / 2));
          d++
        );
        return (p = g(p * l, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: I,
      offset: function (b) {
        const c = t.documentElement;
        b =
          b.parentElement || b.parentNode
            ? b.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: b.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
          left: b.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0),
          width: b.width,
          height: b.height,
        };
      },
      pad: function (b, c, l) {
        return (
          Array((c || 2) + 1 - String(b).replace("-", "").length).join(
            l || "0"
          ) + b
        );
      },
      pick: m,
      pInt: K,
      pushUnique: function (b, c) {
        return 0 > b.indexOf(c) && !!b.push(c);
      },
      relativeLength: function (b, c, l) {
        return /%$/.test(b)
          ? (c * parseFloat(b)) / 100 + (l || 0)
          : parseFloat(b);
      },
      removeEvent: F,
      splat: function (b) {
        return E(b) ? b : [b];
      },
      stableSort: function (b, c) {
        const l = b.length;
        let d, e;
        for (e = 0; e < l; e++) b[e].safeI = e;
        b.sort(function (b, l) {
          d = c(b, l);
          return 0 === d ? b.safeI - l.safeI : d;
        });
        for (e = 0; e < l; e++) delete b[e].safeI;
      },
      syncTimeout: function (b, c, l) {
        if (0 < c) return setTimeout(b, c, l);
        b.call(0, l);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: c,
      useSerialIds: function (b) {
        return (x = m(b, x));
      },
      wrap: function (b, c, l) {
        const d = b[c];
        b[c] = function () {
          const b = arguments,
            c = this;
          return l.apply(
            this,
            [
              function () {
                return d.apply(c, arguments.length ? arguments : b);
              },
            ].concat([].slice.call(arguments))
          );
        };
      },
    };
    ("");
    return q;
  });
  M(a, "Core/Chart/ChartDefaults.js", [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: "x" },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      allowMutatingData: !0,
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: "right", x: -10, y: 10 },
      },
      reflow: !0,
      type: "line",
      zoomBySingleTouch: !1,
      zooming: {
        singleTouch: !1,
        resetButton: {
          theme: { zIndex: 6 },
          position: { align: "right", x: -10, y: 10 },
        },
      },
      width: null,
      height: null,
      borderColor: "#334eff",
      backgroundColor: "#ffffff",
      plotBorderColor: "#cccccc",
    };
  });
  M(
    a,
    "Core/Color/Color.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { isNumber: w, merge: K, pInt: B } = y;
      class E {
        static parse(a) {
          return a ? new E(a) : E.None;
        }
        constructor(w) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = w;
          const A = a.Color;
          if (A && A !== E) return new A(w);
          this.init(w);
        }
        init(a) {
          let A;
          let u;
          if ("object" === typeof a && "undefined" !== typeof a.stops)
            this.stops = a.stops.map((f) => new E(f[1]));
          else if ("string" === typeof a) {
            this.input = a = E.names[a.toLowerCase()] || a;
            if ("#" === a.charAt(0)) {
              var v = a.length;
              var f = parseInt(a.substr(1), 16);
              7 === v
                ? (A = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1])
                : 4 === v &&
                  (A = [
                    ((f & 3840) >> 4) | ((f & 3840) >> 8),
                    ((f & 240) >> 4) | (f & 240),
                    ((f & 15) << 4) | (f & 15),
                    1,
                  ]);
            }
            if (!A)
              for (f = E.parsers.length; f-- && !A; )
                (u = E.parsers[f]), (v = u.regex.exec(a)) && (A = u.parse(v));
          }
          A && (this.rgba = A);
        }
        get(a) {
          const A = this.input,
            u = this.rgba;
          if ("object" === typeof A && "undefined" !== typeof this.stops) {
            const v = K(A);
            v.stops = [].slice.call(v.stops);
            this.stops.forEach((f, h) => {
              v.stops[h] = [v.stops[h][0], f.get(a)];
            });
            return v;
          }
          return u && w(u[0])
            ? "rgb" === a || (!a && 1 === u[3])
              ? "rgb(" + u[0] + "," + u[1] + "," + u[2] + ")"
              : "a" === a
              ? `${u[3]}`
              : "rgba(" + u.join(",") + ")"
            : A;
        }
        brighten(a) {
          const A = this.rgba;
          if (this.stops)
            this.stops.forEach(function (u) {
              u.brighten(a);
            });
          else if (w(a) && 0 !== a)
            for (let u = 0; 3 > u; u++)
              (A[u] += B(255 * a)),
                0 > A[u] && (A[u] = 0),
                255 < A[u] && (A[u] = 255);
          return this;
        }
        setOpacity(a) {
          this.rgba[3] = a;
          return this;
        }
        tweenTo(a, A) {
          const u = this.rgba,
            v = a.rgba;
          if (!w(u[0]) || !w(v[0])) return a.input || "none";
          a = 1 !== v[3] || 1 !== u[3];
          return (
            (a ? "rgba(" : "rgb(") +
            Math.round(v[0] + (u[0] - v[0]) * (1 - A)) +
            "," +
            Math.round(v[1] + (u[1] - v[1]) * (1 - A)) +
            "," +
            Math.round(v[2] + (u[2] - v[2]) * (1 - A)) +
            (a ? "," + (v[3] + (u[3] - v[3]) * (1 - A)) : "") +
            ")"
          );
        }
      }
      E.names = { white: "#ffffff", black: "#000000" };
      E.parsers = [
        {
          regex:
            /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
          parse: function (a) {
            return [B(a[1]), B(a[2]), B(a[3]), parseFloat(a[4], 10)];
          },
        },
        {
          regex:
            /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
          parse: function (a) {
            return [B(a[1]), B(a[2]), B(a[3]), 1];
          },
        },
      ];
      E.None = new E("");
      ("");
      return E;
    }
  );
  M(a, "Core/Color/Palettes.js", [], function () {
    return {
      colors:
        "#2caffe #544fc5 #00e272 #fe6a35 #6b8abc #d568fb #2ee0ca #fa4b42 #feb56a #91e8e1".split(
          " "
        ),
    };
  });
  M(
    a,
    "Core/Time.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { win: w } = a,
        {
          defined: K,
          error: B,
          extend: E,
          isObject: C,
          merge: A,
          objectEach: u,
          pad: v,
          pick: f,
          splat: h,
          timeUnits: r,
        } = y,
        m = a.isSafari && w.Intl && w.Intl.DateTimeFormat.prototype.formatRange,
        n =
          a.isSafari && w.Intl && !w.Intl.DateTimeFormat.prototype.formatRange;
      class k {
        constructor(g) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = w.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(g);
        }
        get(g, m) {
          if (this.variableTimezone || this.timezoneOffset) {
            const k = m.getTime(),
              f = k - this.getTimezoneOffset(m);
            m.setTime(f);
            g = m["getUTC" + g]();
            m.setTime(k);
            return g;
          }
          return this.useUTC ? m["getUTC" + g]() : m["get" + g]();
        }
        set(g, k, f) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === g ||
              "Seconds" === g ||
              ("Minutes" === g && 0 === this.getTimezoneOffset(k) % 36e5)
            )
              return k["setUTC" + g](f);
            var z = this.getTimezoneOffset(k);
            z = k.getTime() - z;
            k.setTime(z);
            k["setUTC" + g](f);
            g = this.getTimezoneOffset(k);
            z = k.getTime() + g;
            return k.setTime(z);
          }
          return this.useUTC || (m && "FullYear" === g)
            ? k["setUTC" + g](f)
            : k["set" + g](f);
        }
        update(g = {}) {
          const k = f(g.useUTC, !0);
          this.options = g = A(!0, this.options, g);
          this.Date = g.Date || w.Date || Date;
          this.timezoneOffset =
            ((this.useUTC = k) && g.timezoneOffset) || void 0;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = k && !(!g.getTimezoneOffset && !g.timezone);
        }
        makeTime(g, k, m, z, e, t) {
          let d, q, x;
          this.useUTC
            ? ((d = this.Date.UTC.apply(0, arguments)),
              (q = this.getTimezoneOffset(d)),
              (d += q),
              (x = this.getTimezoneOffset(d)),
              q !== x
                ? (d += x - q)
                : q - 36e5 !== this.getTimezoneOffset(d - 36e5) ||
                  n ||
                  (d -= 36e5))
            : (d = new this.Date(
                g,
                k,
                f(m, 1),
                f(z, 0),
                f(e, 0),
                f(t, 0)
              ).getTime());
          return d;
        }
        timezoneOffsetFunction() {
          const g = this,
            k = this.options,
            m = k.getTimezoneOffset,
            f = k.moment || w.moment;
          if (!this.useUTC)
            return function (e) {
              return 6e4 * new Date(e.toString()).getTimezoneOffset();
            };
          if (k.timezone) {
            if (f)
              return function (e) {
                return 6e4 * -f.tz(e, k.timezone).utcOffset();
              };
            B(25);
          }
          return this.useUTC && m
            ? function (e) {
                return 6e4 * m(e.valueOf());
              }
            : function () {
                return 6e4 * (g.timezoneOffset || 0);
              };
        }
        dateFormat(g, k, m) {
          if (!K(k) || isNaN(k))
            return (
              (a.defaultOptions.lang && a.defaultOptions.lang.invalidDate) || ""
            );
          g = f(g, "%Y-%m-%d %H:%M:%S");
          const n = this;
          var e = new this.Date(k);
          const t = this.get("Hours", e),
            d = this.get("Day", e),
            q = this.get("Date", e),
            x = this.get("Month", e),
            c = this.get("FullYear", e),
            b = a.defaultOptions.lang,
            p = b && b.weekdays,
            l = b && b.shortWeekdays;
          e = E(
            {
              a: l ? l[d] : p[d].substr(0, 3),
              A: p[d],
              d: v(q),
              e: v(q, 2, " "),
              w: d,
              b: b.shortMonths[x],
              B: b.months[x],
              m: v(x + 1),
              o: x + 1,
              y: c.toString().substr(2, 2),
              Y: c,
              H: v(t),
              k: t,
              I: v(t % 12 || 12),
              l: t % 12 || 12,
              M: v(this.get("Minutes", e)),
              p: 12 > t ? "AM" : "PM",
              P: 12 > t ? "am" : "pm",
              S: v(e.getSeconds()),
              L: v(Math.floor(k % 1e3), 3),
            },
            a.dateFormats
          );
          u(e, function (b, c) {
            for (; -1 !== g.indexOf("%" + c); )
              g = g.replace(
                "%" + c,
                "function" === typeof b ? b.call(n, k) : b
              );
          });
          return m ? g.substr(0, 1).toUpperCase() + g.substr(1) : g;
        }
        resolveDTLFormat(g) {
          return C(g, !0)
            ? g
            : ((g = h(g)), { main: g[0], from: g[1], to: g[2] });
        }
        getTimeTicks(g, k, m, n) {
          const e = this,
            t = [],
            d = {};
          var q = new e.Date(k);
          const x = g.unitRange,
            c = g.count || 1;
          let b;
          n = f(n, 1);
          if (K(k)) {
            e.set(
              "Milliseconds",
              q,
              x >= r.second ? 0 : c * Math.floor(e.get("Milliseconds", q) / c)
            );
            x >= r.second &&
              e.set(
                "Seconds",
                q,
                x >= r.minute ? 0 : c * Math.floor(e.get("Seconds", q) / c)
              );
            x >= r.minute &&
              e.set(
                "Minutes",
                q,
                x >= r.hour ? 0 : c * Math.floor(e.get("Minutes", q) / c)
              );
            x >= r.hour &&
              e.set(
                "Hours",
                q,
                x >= r.day ? 0 : c * Math.floor(e.get("Hours", q) / c)
              );
            x >= r.day &&
              e.set(
                "Date",
                q,
                x >= r.month
                  ? 1
                  : Math.max(1, c * Math.floor(e.get("Date", q) / c))
              );
            if (x >= r.month) {
              e.set(
                "Month",
                q,
                x >= r.year ? 0 : c * Math.floor(e.get("Month", q) / c)
              );
              var p = e.get("FullYear", q);
            }
            x >= r.year && e.set("FullYear", q, p - (p % c));
            x === r.week &&
              ((p = e.get("Day", q)),
              e.set("Date", q, e.get("Date", q) - p + n + (p < n ? -7 : 0)));
            p = e.get("FullYear", q);
            n = e.get("Month", q);
            const l = e.get("Date", q),
              g = e.get("Hours", q);
            k = q.getTime();
            (!e.variableTimezone && e.useUTC) ||
              !K(m) ||
              (b =
                m - k > 4 * r.month ||
                e.getTimezoneOffset(k) !== e.getTimezoneOffset(m));
            k = q.getTime();
            for (q = 1; k < m; )
              t.push(k),
                (k =
                  x === r.year
                    ? e.makeTime(p + q * c, 0)
                    : x === r.month
                    ? e.makeTime(p, n + q * c)
                    : !b || (x !== r.day && x !== r.week)
                    ? b && x === r.hour && 1 < c
                      ? e.makeTime(p, n, l, g + q * c)
                      : k + x * c
                    : e.makeTime(p, n, l + q * c * (x === r.day ? 1 : 7))),
                q++;
            t.push(k);
            x <= r.hour &&
              1e4 > t.length &&
              t.forEach(function (b) {
                0 === b % 18e5 &&
                  "000000000" === e.dateFormat("%H%M%S%L", b) &&
                  (d[b] = "day");
              });
          }
          t.info = E(g, { higherRanks: d, totalRange: x * c });
          return t;
        }
        getDateFormat(g, k, m, f) {
          const e = this.dateFormat("%m-%d %H:%M:%S.%L", k),
            t = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 };
          let d,
            q = "millisecond";
          for (d in r) {
            if (
              g === r.week &&
              +this.dateFormat("%w", k) === m &&
              "00:00:00.000" === e.substr(6)
            ) {
              d = "week";
              break;
            }
            if (r[d] > g) {
              d = q;
              break;
            }
            if (t[d] && e.substr(t[d]) !== "01-01 00:00:00.000".substr(t[d]))
              break;
            "week" !== d && (q = d);
          }
          return this.resolveDTLFormat(f[d]).main;
        }
      }
      ("");
      return k;
    }
  );
  M(
    a,
    "Core/Defaults.js",
    [
      a["Core/Chart/ChartDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Color/Palettes.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E) {
      const { isTouchDevice: w, svg: A } = H,
        { merge: u } = E,
        v = {
          colors: K.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months:
              "January February March April May June July August September October November December".split(
                " "
              ),
            shortMonths:
              "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays:
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              ),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " ",
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: a,
          title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: { text: "", align: "center", widthAdjust: -44 },
          caption: {
            margin: 15,
            text: "",
            align: "left",
            verticalAlign: "bottom",
          },
          plotOptions: {},
          legend: {
            enabled: !0,
            align: "center",
            alignColumns: !0,
            className: "highcharts-no-tooltip",
            layout: "horizontal",
            itemMarginBottom: 2,
            itemMarginTop: 2,
            labelFormatter: function () {
              return this.name;
            },
            borderColor: "#999999",
            borderRadius: 0,
            navigation: {
              style: { fontSize: "0.8em" },
              activeColor: "#0022ff",
              inactiveColor: "#cccccc",
            },
            itemStyle: {
              color: "#333333",
              cursor: "pointer",
              fontSize: "0.8em",
              textDecoration: "none",
              textOverflow: "ellipsis",
            },
            itemHoverStyle: { color: "#000000" },
            itemHiddenStyle: {
              color: "#666666",
              textDecoration: "line-through",
            },
            shadow: !1,
            itemCheckboxStyle: {
              position: "absolute",
              width: "13px",
              height: "13px",
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: { style: { fontSize: "0.8em", fontWeight: "bold" } },
          },
          loading: {
            labelStyle: {
              fontWeight: "bold",
              position: "relative",
              top: "45%",
            },
            style: {
              position: "absolute",
              backgroundColor: "#ffffff",
              opacity: 0.5,
              textAlign: "center",
            },
          },
          tooltip: {
            enabled: !0,
            animation: A,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: "%A, %e %b, %H:%M:%S.%L",
              second: "%A, %e %b, %H:%M:%S",
              minute: "%A, %e %b, %H:%M",
              hour: "%A, %e %b, %H:%M",
              day: "%A, %e %b %Y",
              week: "Week from %A, %e %b %Y",
              month: "%B %Y",
              year: "%Y",
            },
            footerFormat: "",
            headerShape: "callout",
            hideDelay: 500,
            padding: 8,
            shape: "callout",
            shared: !1,
            snap: w ? 25 : 10,
            headerFormat:
              '<span style="font-size: 0.8em">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: "#ffffff",
            borderWidth: void 0,
            shadow: !0,
            stickOnContact: !1,
            style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            href: "https://www.highcharts.com?credits",
            position: {
              align: "right",
              x: -10,
              verticalAlign: "bottom",
              y: -5,
            },
            style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" },
            text: "Highcharts.com",
          },
        };
      v.chart.styledMode = !1;
      ("");
      const f = new B(v.time);
      a = {
        defaultOptions: v,
        defaultTime: f,
        getOptions: function () {
          return v;
        },
        setOptions: function (h) {
          u(!0, v, h);
          if (h.time || h.global)
            H.time
              ? H.time.update(u(v.global, v.time, h.global, h.time))
              : (H.time = f);
          return v;
        },
      };
      ("");
      return a;
    }
  );
  M(
    a,
    "Core/Animation/Fx.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y, H) {
      const { parse: w } = a,
        { win: B } = y,
        { isNumber: E, objectEach: C } = H;
      class A {
        constructor(a, v, f) {
          this.pos = NaN;
          this.options = v;
          this.elem = a;
          this.prop = f;
        }
        dSetter() {
          var a = this.paths;
          const v = a && a[0];
          a = a && a[1];
          const f = this.now || 0;
          let h = [];
          if (1 !== f && v && a)
            if (v.length === a.length && 1 > f)
              for (let r = 0; r < a.length; r++) {
                const m = v[r],
                  n = a[r],
                  k = [];
                for (let g = 0; g < n.length; g++) {
                  const a = m[g],
                    h = n[g];
                  E(a) && E(h) && ("A" !== n[0] || (4 !== g && 5 !== g))
                    ? (k[g] = a + f * (h - a))
                    : (k[g] = h);
                }
                h.push(k);
              }
            else h = a;
          else h = this.toD || [];
          this.elem.attr("d", h, void 0, !0);
        }
        update() {
          const a = this.elem,
            v = this.prop,
            f = this.now,
            h = this.options.step;
          if (this[v + "Setter"]) this[v + "Setter"]();
          else
            a.attr
              ? a.element && a.attr(v, f, null, !0)
              : (a.style[v] = f + this.unit);
          h && h.call(a, f, this);
        }
        run(a, v, f) {
          const h = this,
            r = h.options,
            m = function (g) {
              return m.stopped ? !1 : h.step(g);
            },
            n =
              B.requestAnimationFrame ||
              function (g) {
                setTimeout(g, 13);
              },
            k = function () {
              for (let g = 0; g < A.timers.length; g++)
                A.timers[g]() || A.timers.splice(g--, 1);
              A.timers.length && n(k);
            };
          a !== v || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = a),
              (this.end = v),
              (this.unit = f),
              (this.now = this.start),
              (this.pos = 0),
              (m.elem = this.elem),
              (m.prop = this.prop),
              m() && 1 === A.timers.push(m) && n(k))
            : (delete r.curAnim[this.prop],
              r.complete &&
                0 === Object.keys(r.curAnim).length &&
                r.complete.call(this.elem));
        }
        step(a) {
          const v = +new Date(),
            f = this.options,
            h = this.elem,
            r = f.complete,
            m = f.duration,
            n = f.curAnim;
          let k;
          h.attr && !h.element
            ? (a = !1)
            : a || v >= m + this.startTime
            ? ((this.now = this.end),
              (this.pos = 1),
              this.update(),
              (k = n[this.prop] = !0),
              C(n, function (g) {
                !0 !== g && (k = !1);
              }),
              k && r && r.call(h),
              (a = !1))
            : ((this.pos = f.easing((v - this.startTime) / m)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (a = !0));
          return a;
        }
        initPath(a, v, f) {
          function h(e, t) {
            for (; e.length < F; ) {
              var d = e[0];
              const q = t[F - e.length];
              q &&
                "M" === d[0] &&
                (e[0] =
                  "C" === q[0]
                    ? ["C", d[1], d[2], d[1], d[2], d[1], d[2]]
                    : ["L", d[1], d[2]]);
              e.unshift(d);
              k && ((d = e.pop()), e.push(e[e.length - 1], d));
            }
          }
          function r(e, t) {
            for (; e.length < F; )
              if (
                ((t = e[Math.floor(e.length / g) - 1].slice()),
                "C" === t[0] && ((t[1] = t[5]), (t[2] = t[6])),
                k)
              ) {
                const d = e[Math.floor(e.length / g)].slice();
                e.splice(e.length / 2, 0, t, d);
              } else e.push(t);
          }
          const m = a.startX,
            n = a.endX;
          f = f.slice();
          const k = a.isArea,
            g = k ? 2 : 1;
          let I, F, z;
          v = v && v.slice();
          if (!v) return [f, f];
          if (m && n && n.length) {
            for (a = 0; a < m.length; a++)
              if (m[a] === n[0]) {
                I = a;
                break;
              } else if (m[0] === n[n.length - m.length + a]) {
                I = a;
                z = !0;
                break;
              } else if (m[m.length - 1] === n[n.length - m.length + a]) {
                I = m.length - a;
                break;
              }
            "undefined" === typeof I && (v = []);
          }
          v.length &&
            E(I) &&
            ((F = f.length + I * g),
            z ? (h(v, f), r(f, v)) : (h(f, v), r(v, f)));
          return [v, f];
        }
        fillSetter() {
          A.prototype.strokeSetter.apply(this, arguments);
        }
        strokeSetter() {
          this.elem.attr(
            this.prop,
            w(this.start).tweenTo(w(this.end), this.pos),
            void 0,
            !0
          );
        }
      }
      A.timers = [];
      return A;
    }
  );
  M(
    a,
    "Core/Animation/AnimationUtilities.js",
    [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]],
    function (a, y) {
      function w(a) {
        return u(a)
          ? v({ duration: 500, defer: 0 }, a)
          : { duration: a ? 500 : 0, defer: 0 };
      }
      function K(f, m) {
        let n = a.timers.length;
        for (; n--; )
          a.timers[n].elem !== f ||
            (m && m !== a.timers[n].prop) ||
            (a.timers[n].stopped = !0);
      }
      const {
        defined: B,
        getStyle: E,
        isArray: C,
        isNumber: A,
        isObject: u,
        merge: v,
        objectEach: f,
        pick: h,
      } = y;
      return {
        animate: function (h, m, n) {
          let k,
            g = "",
            r,
            F,
            z;
          u(n) ||
            ((z = arguments),
            (n = { duration: z[2], easing: z[3], complete: z[4] }));
          A(n.duration) || (n.duration = 400);
          n.easing =
            "function" === typeof n.easing
              ? n.easing
              : Math[n.easing] || Math.easeInOutSine;
          n.curAnim = v(m);
          f(m, function (e, t) {
            K(h, t);
            F = new a(h, n, t);
            r = void 0;
            "d" === t && C(m.d)
              ? ((F.paths = F.initPath(h, h.pathArray, m.d)),
                (F.toD = m.d),
                (k = 0),
                (r = 1))
              : h.attr
              ? (k = h.attr(t))
              : ((k = parseFloat(E(h, t)) || 0), "opacity" !== t && (g = "px"));
            r || (r = e);
            "string" === typeof r &&
              r.match("px") &&
              (r = r.replace(/px/g, ""));
            F.run(k, r, g);
          });
        },
        animObject: w,
        getDeferredAnimation: function (a, m, f) {
          const k = w(m);
          let g = 0,
            n = 0;
          (f ? [f] : a.series).forEach((a) => {
            a = w(a.options.animation);
            g = m && B(m.defer) ? k.defer : Math.max(g, a.duration + a.defer);
            n = Math.min(k.duration, a.duration);
          });
          a.renderer.forExport && (g = 0);
          return { defer: Math.max(0, g - n), duration: Math.min(g, n) };
        },
        setAnimation: function (a, m) {
          m.renderer.globalAnimation = h(a, m.options.chart.animation, !0);
        },
        stop: K,
      };
    }
  );
  M(
    a,
    "Core/Renderer/HTML/AST.js",
    [a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { SVG_NS: w, win: K } = a,
        {
          attr: B,
          createElement: E,
          css: C,
          error: A,
          isFunction: u,
          isString: v,
          objectEach: f,
          splat: h,
        } = y;
      ({ trustedTypes: y } = K);
      const r =
        y &&
        u(y.createPolicy) &&
        y.createPolicy("highcharts", { createHTML: (g) => g });
      y = r ? r.createHTML("") : "";
      try {
        var m = !!new DOMParser().parseFromString(y, "text/html");
      } catch (g) {
        m = !1;
      }
      const n = m;
      class k {
        static filterUserAttributes(g) {
          f(g, (a, m) => {
            let f = !0;
            -1 === k.allowedAttributes.indexOf(m) && (f = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(m) &&
              (f = v(a) && k.allowedReferences.some((e) => 0 === a.indexOf(e)));
            f ||
              (A(33, !1, void 0, { "Invalid attribute in config": `${m}` }),
              delete g[m]);
            v(a) && g[m] && (g[m] = a.replace(/</g, "&lt;"));
          });
          return g;
        }
        static parseStyle(g) {
          return g.split(";").reduce((g, k) => {
            k = k.split(":").map((e) => e.trim());
            const a = k.shift();
            a &&
              k.length &&
              (g[a.replace(/-([a-z])/g, (e) => e[1].toUpperCase())] =
                k.join(":"));
            return g;
          }, {});
        }
        static setElementHTML(g, a) {
          g.innerHTML = k.emptyHTML;
          a && new k(a).addToDOM(g);
        }
        constructor(g) {
          this.nodes = "string" === typeof g ? this.parseMarkup(g) : g;
        }
        addToDOM(g) {
          function m(g, n) {
            let e;
            h(g).forEach(function (t) {
              var d = t.tagName;
              const q = t.textContent
                  ? a.doc.createTextNode(t.textContent)
                  : void 0,
                g = k.bypassHTMLFiltering;
              let c;
              if (d)
                if ("#text" === d) c = q;
                else if (-1 !== k.allowedTags.indexOf(d) || g) {
                  d = a.doc.createElementNS(
                    "svg" === d ? w : n.namespaceURI || w,
                    d
                  );
                  const b = t.attributes || {};
                  f(t, function (c, l) {
                    "tagName" !== l &&
                      "attributes" !== l &&
                      "children" !== l &&
                      "style" !== l &&
                      "textContent" !== l &&
                      (b[l] = c);
                  });
                  B(d, g ? b : k.filterUserAttributes(b));
                  t.style && C(d, t.style);
                  q && d.appendChild(q);
                  m(t.children || [], d);
                  c = d;
                } else A(33, !1, void 0, { "Invalid tagName in config": d });
              c && n.appendChild(c);
              e = c;
            });
            return e;
          }
          return m(this.nodes, g);
        }
        parseMarkup(g) {
          const a = [];
          g = g.trim().replace(/ style=(["'])/g, " data-style=$1");
          if (n)
            g = new DOMParser().parseFromString(
              r ? r.createHTML(g) : g,
              "text/html"
            );
          else {
            const k = E("div");
            k.innerHTML = g;
            g = { body: k };
          }
          const m = (g, e) => {
            var t = g.nodeName.toLowerCase();
            const d = { tagName: t };
            "#text" === t && (d.textContent = g.textContent || "");
            if ((t = g.attributes)) {
              const e = {};
              [].forEach.call(t, (q) => {
                "data-style" === q.name
                  ? (d.style = k.parseStyle(q.value))
                  : (e[q.name] = q.value);
              });
              d.attributes = e;
            }
            if (g.childNodes.length) {
              const e = [];
              [].forEach.call(g.childNodes, (d) => {
                m(d, e);
              });
              e.length && (d.children = e);
            }
            e.push(d);
          };
          [].forEach.call(g.body.childNodes, (g) => m(g, a));
          return a;
        }
      }
      k.allowedAttributes =
        "alt aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill flood-color flood-opacity height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(
          " "
        );
      k.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
      k.allowedTags =
        "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feDropShadow feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(
          " "
        );
      k.emptyHTML = y;
      k.bypassHTMLFiltering = !1;
      ("");
      return k;
    }
  );
  M(
    a,
    "Core/FormatUtilities.js",
    [a["Core/Defaults.js"], a["Core/Utilities.js"]],
    function (a, y) {
      function w(a, f, h, r) {
        a = +a || 0;
        f = +f;
        const m = K.lang;
        var n = (a.toString().split(".")[1] || "").split("e")[0].length;
        const k = a.toString().split("e"),
          g = f;
        if (-1 === f) f = Math.min(n, 20);
        else if (!C(f)) f = 2;
        else if (f && k[1] && 0 > k[1]) {
          var v = f + +k[1];
          0 <= v
            ? ((k[0] = (+k[0]).toExponential(v).split("e")[0]), (f = v))
            : ((k[0] = k[0].split(".")[0] || 0),
              (a = 20 > f ? (k[0] * Math.pow(10, k[1])).toFixed(f) : 0),
              (k[1] = 0));
        }
        v = (
          Math.abs(k[1] ? k[0] : a) + Math.pow(10, -Math.max(f, n) - 1)
        ).toFixed(f);
        n = String(u(v));
        const F = 3 < n.length ? n.length % 3 : 0;
        h = A(h, m.decimalPoint);
        r = A(r, m.thousandsSep);
        a = (0 > a ? "-" : "") + (F ? n.substr(0, F) + r : "");
        a =
          0 > +k[1] && !g
            ? "0"
            : a + n.substr(F).replace(/(\d{3})(?=\d)/g, "$1" + r);
        f && (a += h + v.slice(-f));
        k[1] && 0 !== +a && (a += "e" + k[1]);
        return a;
      }
      const { defaultOptions: K, defaultTime: B } = a,
        { getNestedProperty: E, isNumber: C, pick: A, pInt: u } = y;
      return {
        dateFormat: function (a, f, h) {
          return B.dateFormat(a, f, h);
        },
        format: function (a, f, h) {
          var r = "{";
          let m = !1;
          let n;
          const k = /f$/,
            g = /\.([0-9])/,
            v = K.lang,
            F = (h && h.time) || B;
          h = (h && h.numberFormatter) || w;
          const z = [];
          for (; a; ) {
            n = a.indexOf(r);
            if (-1 === n) break;
            var e = a.slice(0, n);
            if (m) {
              e = e.split(":");
              r = E(e.shift() || "", f);
              if (e.length && "number" === typeof r)
                if (((e = e.join(":")), k.test(e))) {
                  const t = parseInt((e.match(g) || ["", "-1"])[1], 10);
                  null !== r &&
                    (r = h(
                      r,
                      t,
                      v.decimalPoint,
                      -1 < e.indexOf(",") ? v.thousandsSep : ""
                    ));
                } else r = F.dateFormat(e, r);
              z.push(r);
            } else z.push(e);
            a = a.slice(n + 1);
            r = (m = !m) ? "}" : "{";
          }
          z.push(a);
          return z.join("");
        },
        numberFormat: w,
      };
    }
  );
  M(
    a,
    "Core/Renderer/RendererUtilities.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { clamp: w, pick: H, stableSort: K } = a;
      var B;
      (function (a) {
        function y(a, u, v) {
          const f = a;
          var h = f.reducedLen || u,
            r = (a, g) => (g.rank || 0) - (a.rank || 0);
          const m = (a, g) => a.target - g.target;
          let n,
            k = !0,
            g = [],
            I = 0;
          for (n = a.length; n--; ) I += a[n].size;
          if (I > h) {
            K(a, r);
            for (I = n = 0; I <= h; ) (I += a[n].size), n++;
            g = a.splice(n - 1, a.length);
          }
          K(a, m);
          for (
            a = a.map((a) => ({
              size: a.size,
              targets: [a.target],
              align: H(a.align, 0.5),
            }));
            k;

          ) {
            for (n = a.length; n--; )
              (h = a[n]),
                (r =
                  (Math.min.apply(0, h.targets) +
                    Math.max.apply(0, h.targets)) /
                  2),
                (h.pos = w(r - h.size * h.align, 0, u - h.size));
            n = a.length;
            for (k = !1; n--; )
              0 < n &&
                a[n - 1].pos + a[n - 1].size > a[n].pos &&
                ((a[n - 1].size += a[n].size),
                (a[n - 1].targets = a[n - 1].targets.concat(a[n].targets)),
                (a[n - 1].align = 0.5),
                a[n - 1].pos + a[n - 1].size > u &&
                  (a[n - 1].pos = u - a[n - 1].size),
                a.splice(n, 1),
                (k = !0));
          }
          f.push.apply(f, g);
          n = 0;
          a.some((a) => {
            let g = 0;
            return (a.targets || []).some(() => {
              f[n].pos = a.pos + g;
              if (
                "undefined" !== typeof v &&
                Math.abs(f[n].pos - f[n].target) > v
              )
                return (
                  f.slice(0, n + 1).forEach((e) => delete e.pos),
                  (f.reducedLen = (f.reducedLen || u) - 0.1 * u),
                  f.reducedLen > 0.1 * u && y(f, u, v),
                  !0
                );
              g += f[n].size;
              n++;
              return !1;
            });
          });
          K(f, m);
          return f;
        }
        a.distribute = y;
      })(B || (B = {}));
      return B;
    }
  );
  M(
    a,
    "Core/Renderer/SVG/SVGElement.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K) {
      const { animate: w, animObject: E, stop: C } = a,
        { deg2rad: A, doc: u, svg: v, SVG_NS: f, win: h } = H,
        {
          addEvent: r,
          attr: m,
          createElement: n,
          css: k,
          defined: g,
          erase: I,
          extend: F,
          fireEvent: z,
          isArray: e,
          isFunction: t,
          isObject: d,
          isString: q,
          merge: x,
          objectEach: c,
          pick: b,
          pInt: p,
          syncTimeout: l,
          uniqueKey: L,
        } = K;
      class N {
        constructor() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = f;
        }
        _defaultGetter(c) {
          c = b(
            this[c + "Value"],
            this[c],
            this.element ? this.element.getAttribute(c) : null,
            0
          );
          /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
          return c;
        }
        _defaultSetter(b, c, l) {
          l.setAttribute(c, b);
        }
        add(b) {
          const c = this.renderer,
            l = this.element;
          let d;
          b && (this.parentGroup = b);
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            c.buildText(this);
          this.added = !0;
          if (!b || b.handleZ || this.zIndex) d = this.zIndexSetter();
          d || (b ? b.element : c.box).appendChild(l);
          if (this.onAdd) this.onAdd();
          return this;
        }
        addClass(b, c) {
          const l = c ? "" : this.attr("class") || "";
          b = (b || "")
            .split(/ /g)
            .reduce(
              function (b, c) {
                -1 === l.indexOf(c) && b.push(c);
                return b;
              },
              l ? [l] : []
            )
            .join(" ");
          b !== l && this.attr("class", b);
          return this;
        }
        afterSetters() {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        }
        align(c, l, d) {
          const e = {};
          var G = this.renderer,
            p = G.alignedObjects,
            a;
          let g, t;
          if (c) {
            if (
              ((this.alignOptions = c), (this.alignByTranslate = l), !d || q(d))
            )
              (this.alignTo = a = d || "renderer"),
                I(p, this),
                p.push(this),
                (d = void 0);
          } else
            (c = this.alignOptions),
              (l = this.alignByTranslate),
              (a = this.alignTo);
          d = b(d, G[a], "scrollablePlotBox" === a ? G.plotBox : void 0, G);
          a = c.align;
          const D = c.verticalAlign;
          G = (d.x || 0) + (c.x || 0);
          p = (d.y || 0) + (c.y || 0);
          "right" === a ? (g = 1) : "center" === a && (g = 2);
          g && (G += (d.width - (c.width || 0)) / g);
          e[l ? "translateX" : "x"] = Math.round(G);
          "bottom" === D ? (t = 1) : "middle" === D && (t = 2);
          t && (p += (d.height - (c.height || 0)) / t);
          e[l ? "translateY" : "y"] = Math.round(p);
          this[this.placed ? "animate" : "attr"](e);
          this.placed = !0;
          this.alignAttr = e;
          return this;
        }
        alignSetter(b) {
          const c = { left: "start", center: "middle", right: "end" };
          c[b] &&
            ((this.alignValue = b),
            this.element.setAttribute("text-anchor", c[b]));
        }
        animate(d, e, p) {
          const q = E(b(e, this.renderer.globalAnimation, !0));
          e = q.defer;
          u.hidden && (q.duration = 0);
          0 !== q.duration
            ? (p && (q.complete = p),
              l(() => {
                this.element && w(this, d, q);
              }, e))
            : (this.attr(d, void 0, p || q.complete),
              c(
                d,
                function (b, c) {
                  q.step &&
                    q.step.call(this, b, { prop: c, pos: 1, elem: this });
                },
                this
              ));
          return this;
        }
        applyTextOutline(b) {
          const c = this.element;
          -1 !== b.indexOf("contrast") &&
            (b = b.replace(
              /contrast/g,
              this.renderer.getContrast(c.style.fill)
            ));
          var d = b.split(" ");
          b = d[d.length - 1];
          if ((d = d[0]) && "none" !== d && H.svg) {
            this.fakeTS = !0;
            d = d.replace(/(^[\d\.]+)(.*?)$/g, function (b, c, d) {
              return 2 * Number(c) + d;
            });
            this.removeTextOutline();
            const l = u.createElementNS(f, "tspan");
            m(l, {
              class: "highcharts-text-outline",
              fill: b,
              stroke: b,
              "stroke-width": d,
              "stroke-linejoin": "round",
            });
            b = c.querySelector("textPath") || c;
            [].forEach.call(b.childNodes, (b) => {
              const c = b.cloneNode(!0);
              c.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach((b) =>
                  c.removeAttribute(b)
                );
              l.appendChild(c);
            });
            let e = 0;
            [].forEach.call(b.querySelectorAll("text tspan"), (b) => {
              e += Number(b.getAttribute("dy"));
            });
            d = u.createElementNS(f, "tspan");
            d.textContent = "\u200b";
            m(d, { x: Number(c.getAttribute("x")), dy: -e });
            l.appendChild(d);
            b.insertBefore(l, b.firstChild);
          }
        }
        attr(b, d, l, e) {
          const G = this.element,
            p = N.symbolCustomAttribs;
          let q,
            a,
            g = this,
            D,
            t;
          "string" === typeof b &&
            "undefined" !== typeof d &&
            ((q = b), (b = {}), (b[q] = d));
          "string" === typeof b
            ? (g = (this[b + "Getter"] || this._defaultGetter).call(this, b, G))
            : (c(
                b,
                function (c, d) {
                  D = !1;
                  e || C(this, d);
                  this.symbolName &&
                    -1 !== p.indexOf(d) &&
                    (a || (this.symbolAttr(b), (a = !0)), (D = !0));
                  !this.rotation ||
                    ("x" !== d && "y" !== d) ||
                    (this.doTransform = !0);
                  D ||
                    ((t = this[d + "Setter"] || this._defaultSetter),
                    t.call(this, c, d, G));
                },
                this
              ),
              this.afterSetters());
          l && l.call(this);
          return g;
        }
        clip(b) {
          return this.attr(
            "clip-path",
            b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none"
          );
        }
        crisp(b, c) {
          c = c || b.strokeWidth || 0;
          const d = (Math.round(c) % 2) / 2;
          b.x = Math.floor(b.x || this.x || 0) + d;
          b.y = Math.floor(b.y || this.y || 0) + d;
          b.width = Math.floor((b.width || this.width || 0) - 2 * d);
          b.height = Math.floor((b.height || this.height || 0) - 2 * d);
          g(b.strokeWidth) && (b.strokeWidth = c);
          return b;
        }
        complexColor(b, d, l) {
          const p = this.renderer;
          let G,
            q,
            a,
            t,
            k,
            D,
            m,
            J,
            O,
            f,
            n = [],
            h;
          z(this.renderer, "complexColor", { args: arguments }, function () {
            b.radialGradient
              ? (q = "radialGradient")
              : b.linearGradient && (q = "linearGradient");
            if (q) {
              a = b[q];
              k = p.gradients;
              D = b.stops;
              O = l.radialReference;
              e(a) &&
                (b[q] = a =
                  {
                    x1: a[0],
                    y1: a[1],
                    x2: a[2],
                    y2: a[3],
                    gradientUnits: "userSpaceOnUse",
                  });
              "radialGradient" === q &&
                O &&
                !g(a.gradientUnits) &&
                ((t = a),
                (a = x(a, p.getRadialAttr(O, t), {
                  gradientUnits: "userSpaceOnUse",
                })));
              c(a, function (b, c) {
                "id" !== c && n.push(c, b);
              });
              c(D, function (b) {
                n.push(b);
              });
              n = n.join(",");
              if (k[n]) f = k[n].attr("id");
              else {
                a.id = f = L();
                const b = (k[n] = p.createElement(q).attr(a).add(p.defs));
                b.radAttr = t;
                b.stops = [];
                D.forEach(function (c) {
                  0 === c[1].indexOf("rgba")
                    ? ((G = y.parse(c[1])),
                      (m = G.get("rgb")),
                      (J = G.get("a")))
                    : ((m = c[1]), (J = 1));
                  c = p
                    .createElement("stop")
                    .attr({ offset: c[0], "stop-color": m, "stop-opacity": J })
                    .add(b);
                  b.stops.push(c);
                });
              }
              h = "url(" + p.url + "#" + f + ")";
              l.setAttribute(d, h);
              l.gradient = n;
              b.toString = function () {
                return h;
              };
            }
          });
        }
        css(b) {
          const d = this.styles,
            l = {},
            e = this.element;
          let G,
            q = !d;
          b.color && (b.fill = b.color);
          d &&
            c(b, function (b, c) {
              d && d[c] !== b && ((l[c] = b), (q = !0));
            });
          if (q) {
            d && (b = F(d, l));
            null === b.width || "auto" === b.width
              ? delete this.textWidth
              : "text" === e.nodeName.toLowerCase() &&
                b.width &&
                (G = this.textWidth = p(b.width));
            this.styles = b;
            G && !v && this.renderer.forExport && delete b.width;
            const c = x(b);
            e.namespaceURI === this.SVG_NS &&
              ["textOutline", "textOverflow", "width"].forEach(
                (b) => c && delete c[b]
              );
            k(e, c);
          }
          this.added &&
            ("text" === this.element.nodeName && this.renderer.buildText(this),
            b.textOutline && this.applyTextOutline(b.textOutline));
          return this;
        }
        dashstyleSetter(c) {
          let d = this["stroke-width"];
          "inherit" === d && (d = 1);
          if ((c = c && c.toLowerCase())) {
            const l = c
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (c = l.length; c--; ) l[c] = "" + p(l[c]) * b(d, NaN);
            c = l.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", c);
          }
        }
        destroy() {
          const b = this;
          var d = b.element || {};
          const l = b.renderer;
          var e = d.ownerSVGElement;
          let G = ("SPAN" === d.nodeName && b.parentGroup) || void 0;
          d.onclick =
            d.onmouseout =
            d.onmouseover =
            d.onmousemove =
            d.point =
              null;
          C(b);
          if (b.clipPath && e) {
            const c = b.clipPath;
            [].forEach.call(
              e.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (b) {
                -1 < b.getAttribute("clip-path").indexOf(c.element.id) &&
                  b.removeAttribute("clip-path");
              }
            );
            b.clipPath = c.destroy();
          }
          if (b.stops) {
            for (e = 0; e < b.stops.length; e++) b.stops[e].destroy();
            b.stops.length = 0;
            b.stops = void 0;
          }
          for (
            b.safeRemoveChild(d);
            G && G.div && 0 === G.div.childNodes.length;

          )
            (d = G.parentGroup),
              b.safeRemoveChild(G.div),
              delete G.div,
              (G = d);
          b.alignTo && I(l.alignedObjects, b);
          c(b, function (c, d) {
            b[d] && b[d].parentGroup === b && b[d].destroy && b[d].destroy();
            delete b[d];
          });
        }
        dSetter(b, c, d) {
          e(b) &&
            ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
            (this.pathArray = b),
            (b = b.reduce(
              (b, c, d) =>
                c && c.join
                  ? (d ? b + " " : "") + c.join(" ")
                  : (c || "").toString(),
              ""
            )));
          /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
          this[c] !== b && (d.setAttribute(c, b), (this[c] = b));
        }
        fadeOut(c) {
          const d = this;
          d.animate(
            { opacity: 0 },
            {
              duration: b(c, 150),
              complete: function () {
                d.hide();
              },
            }
          );
        }
        fillSetter(b, c, d) {
          "string" === typeof b
            ? d.setAttribute(c, b)
            : b && this.complexColor(b, c, d);
        }
        getBBox(c, d) {
          const {
              alignValue: l,
              element: e,
              renderer: G,
              styles: p,
              textStr: q,
            } = this,
            { cache: a, cacheKeys: m } = G;
          var D = e.namespaceURI === this.SVG_NS;
          d = b(d, this.rotation, 0);
          var P = G.styledMode
            ? e && N.prototype.getStyle.call(e, "font-size")
            : p && p.fontSize;
          let J;
          let f;
          g(q) &&
            ((f = q.toString()),
            -1 === f.indexOf("<") && (f = f.replace(/[0-9]/g, "0")),
            (f += [
              "",
              G.rootFontSize,
              P,
              d,
              this.textWidth,
              l,
              p && p.textOverflow,
              p && p.fontWeight,
            ].join()));
          f && !c && (J = a[f]);
          if (!J) {
            if (D || G.forExport) {
              try {
                var x =
                  this.fakeTS &&
                  function (b) {
                    const c = e.querySelector(".highcharts-text-outline");
                    c && k(c, { display: b });
                  };
                t(x) && x("none");
                J = e.getBBox
                  ? F({}, e.getBBox())
                  : {
                      width: e.offsetWidth,
                      height: e.offsetHeight,
                      x: 0,
                      y: 0,
                    };
                t(x) && x("");
              } catch (ia) {
                ("");
              }
              if (!J || 0 > J.width) J = { x: 0, y: 0, width: 0, height: 0 };
            } else J = this.htmlGetBBox();
            x = J.width;
            c = J.height;
            D &&
              (J.height = c =
                { "11px,17": 14, "13px,20": 16 }[
                  `${P || ""},${Math.round(c)}`
                ] || c);
            if (d) {
              D = Number(e.getAttribute("y") || 0) - J.y;
              P = { right: 1, center: 0.5 }[l || 0] || 0;
              var n = d * A,
                h = (d - 90) * A,
                L = x * Math.cos(n);
              d = x * Math.sin(n);
              var O = Math.cos(h);
              n = Math.sin(h);
              x = J.x + P * (x - L) + D * O;
              h = x + L;
              O = h - c * O;
              L = O - L;
              D = J.y + D - P * d + D * n;
              P = D + d;
              c = P - c * n;
              d = c - d;
              J.x = Math.min(x, h, O, L);
              J.y = Math.min(D, P, c, d);
              J.width = Math.max(x, h, O, L) - J.x;
              J.height = Math.max(D, P, c, d) - J.y;
            }
          }
          if (f && ("" === q || 0 < J.height)) {
            for (; 250 < m.length; ) delete a[m.shift()];
            a[f] || m.push(f);
            a[f] = J;
          }
          return J;
        }
        getStyle(b) {
          return h
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(b);
        }
        hasClass(b) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(b);
        }
        hide() {
          return this.attr({ visibility: "hidden" });
        }
        htmlGetBBox() {
          return { height: 0, width: 0, x: 0, y: 0 };
        }
        init(b, c) {
          this.element =
            "span" === c ? n(c) : u.createElementNS(this.SVG_NS, c);
          this.renderer = b;
          z(this, "afterInit");
        }
        on(b, c) {
          const { onEvents: d } = this;
          if (d[b]) d[b]();
          d[b] = r(this.element, b, c);
          return this;
        }
        opacitySetter(b, c, d) {
          this.opacity = b = Number(Number(b).toFixed(3));
          d.setAttribute(c, b);
        }
        removeClass(b) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(q(b) ? new RegExp(`(^| )${b}( |$)`) : b, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        }
        removeTextOutline() {
          const b = this.element.querySelector("tspan.highcharts-text-outline");
          b && this.safeRemoveChild(b);
        }
        safeRemoveChild(b) {
          const c = b.parentNode;
          c && c.removeChild(b);
        }
        setRadialReference(b) {
          const c =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = b;
          c &&
            c.radAttr &&
            c.animate(this.renderer.getRadialAttr(b, c.radAttr));
          return this;
        }
        setTextPath(b, c) {
          c = x(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
            },
            c
          );
          const d = this.renderer.url,
            l = this.text || this,
            e = l.textPath,
            { attributes: p, enabled: q } = c;
          b = b || (e && e.path);
          e && e.undo();
          b && q
            ? ((c = r(l, "afterModifyTree", (c) => {
                if (b && q) {
                  let D = b.attr("id");
                  D || b.attr("id", (D = L()));
                  var e = { x: 0, y: 0 };
                  g(p.dx) && ((e.dx = p.dx), delete p.dx);
                  g(p.dy) && ((e.dy = p.dy), delete p.dy);
                  l.attr(e);
                  this.attr({ transform: "" });
                  this.box && (this.box = this.box.destroy());
                  e = c.nodes.slice(0);
                  c.nodes.length = 0;
                  c.nodes[0] = {
                    tagName: "textPath",
                    attributes: F(p, {
                      "text-anchor": p.textAnchor,
                      href: `${d}#${D}`,
                    }),
                    children: e,
                  };
                }
              })),
              (l.textPath = { path: b, undo: c }))
            : (l.attr({ dx: 0, dy: 0 }), delete l.textPath);
          this.added && ((l.textCache = ""), this.renderer.buildText(l));
          return this;
        }
        shadow(b) {
          var c;
          const { renderer: l } = this,
            e = x(
              90 ===
                (null === (c = this.parentGroup) || void 0 === c
                  ? void 0
                  : c.rotation)
                ? { offsetX: -1, offsetY: -1 }
                : {},
              d(b) ? b : {}
            );
          c = l.shadowDefinition(e);
          return this.attr({ filter: b ? `url(${l.url}#${c})` : "none" });
        }
        show(b = !0) {
          return this.attr({ visibility: b ? "inherit" : "visible" });
        }
        ["stroke-widthSetter"](b, c, d) {
          this[c] = b;
          d.setAttribute(c, b);
        }
        strokeWidth() {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          const b = this.getStyle("stroke-width");
          let c = 0,
            d;
          b.indexOf("px") === b.length - 2
            ? (c = p(b))
            : "" !== b &&
              ((d = u.createElementNS(f, "rect")),
              m(d, { width: b, "stroke-width": 0 }),
              this.element.parentNode.appendChild(d),
              (c = d.getBBox().width),
              d.parentNode.removeChild(d));
          return c;
        }
        symbolAttr(c) {
          const d = this;
          N.symbolCustomAttribs.forEach(function (l) {
            d[l] = b(c[l], d[l]);
          });
          d.attr({
            d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d),
          });
        }
        textSetter(b) {
          b !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = b),
            this.added && this.renderer.buildText(this));
        }
        titleSetter(c) {
          const d = this.element,
            l =
              d.getElementsByTagName("title")[0] ||
              u.createElementNS(this.SVG_NS, "title");
          d.insertBefore ? d.insertBefore(l, d.firstChild) : d.appendChild(l);
          l.textContent = String(b(c, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        }
        toFront() {
          const b = this.element;
          b.parentNode.appendChild(b);
          return this;
        }
        translate(b, c) {
          return this.attr({ translateX: b, translateY: c });
        }
        updateTransform() {
          const {
              element: c,
              matrix: d,
              rotation: l = 0,
              scaleX: e,
              scaleY: p,
              translateX: q = 0,
              translateY: a = 0,
            } = this,
            t = ["translate(" + q + "," + a + ")"];
          g(d) && t.push("matrix(" + d.join(",") + ")");
          l &&
            t.push(
              "rotate(" +
                l +
                " " +
                b(this.rotationOriginX, c.getAttribute("x"), 0) +
                " " +
                b(this.rotationOriginY, c.getAttribute("y") || 0) +
                ")"
            );
          (g(e) || g(p)) && t.push("scale(" + b(e, 1) + " " + b(p, 1) + ")");
          t.length &&
            !(this.text || this).textPath &&
            c.setAttribute("transform", t.join(" "));
        }
        visibilitySetter(b, c, d) {
          "inherit" === b
            ? d.removeAttribute(c)
            : this[c] !== b && d.setAttribute(c, b);
          this[c] = b;
        }
        xGetter(b) {
          "circle" === this.element.nodeName &&
            ("x" === b ? (b = "cx") : "y" === b && (b = "cy"));
          return this._defaultGetter(b);
        }
        zIndexSetter(b, c) {
          var d = this.renderer,
            l = this.parentGroup;
          const e = (l || d).element || d.box,
            q = this.element;
          d = e === d.box;
          let a = !1,
            t;
          var k = this.added;
          let D;
          g(b)
            ? (q.setAttribute("data-z-index", b),
              (b = +b),
              this[c] === b && (k = !1))
            : g(this[c]) && q.removeAttribute("data-z-index");
          this[c] = b;
          if (k) {
            (b = this.zIndex) && l && (l.handleZ = !0);
            c = e.childNodes;
            for (D = c.length - 1; 0 <= D && !a; D--)
              if (
                ((l = c[D]),
                (k = l.getAttribute("data-z-index")),
                (t = !g(k)),
                l !== q)
              )
                if (0 > b && t && !d && !D) e.insertBefore(q, c[D]), (a = !0);
                else if (p(k) <= b || (t && (!g(b) || 0 <= b)))
                  e.insertBefore(q, c[D + 1]), (a = !0);
            a || (e.insertBefore(q, c[d ? 3 : 0]), (a = !0));
          }
          return a;
        }
      }
      N.symbolCustomAttribs =
        "anchorX anchorY clockwise end height innerR r start width x y".split(
          " "
        );
      N.prototype.strokeSetter = N.prototype.fillSetter;
      N.prototype.yGetter = N.prototype.xGetter;
      N.prototype.matrixSetter =
        N.prototype.rotationOriginXSetter =
        N.prototype.rotationOriginYSetter =
        N.prototype.rotationSetter =
        N.prototype.scaleXSetter =
        N.prototype.scaleYSetter =
        N.prototype.translateXSetter =
        N.prototype.translateYSetter =
        N.prototype.verticalAlignSetter =
          function (b, c) {
            this[c] = b;
            this.doTransform = !0;
          };
      ("");
      return N;
    }
  );
  M(
    a,
    "Core/Renderer/RendererRegistry.js",
    [a["Core/Globals.js"]],
    function (a) {
      var w;
      (function (w) {
        w.rendererTypes = {};
        let y;
        w.getRendererType = function (a = y) {
          return w.rendererTypes[a] || w.rendererTypes[y];
        };
        w.registerRendererType = function (B, E, C) {
          w.rendererTypes[B] = E;
          if (!y || C) (y = B), (a.Renderer = E);
        };
      })(w || (w = {}));
      return w;
    }
  );
  M(
    a,
    "Core/Renderer/SVG/SVGLabel.js",
    [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const {
        defined: w,
        extend: K,
        isNumber: B,
        merge: E,
        pick: C,
        removeEvent: A,
      } = y;
      class u extends a {
        constructor(a, f, h, r, m, n, k, g, I, F) {
          super();
          this.paddingRightSetter = this.paddingLeftSetter = this.paddingSetter;
          this.init(a, "g");
          this.textStr = f;
          this.x = h;
          this.y = r;
          this.anchorX = n;
          this.anchorY = k;
          this.baseline = I;
          this.className = F;
          this.addClass(
            "button" === F ? "highcharts-no-tooltip" : "highcharts-label"
          );
          F && this.addClass("highcharts-" + F);
          this.text = a.text(void 0, 0, 0, g).attr({ zIndex: 1 });
          let z;
          "string" === typeof m &&
            ((z = /^url\((.*?)\)$/.test(m)) || this.renderer.symbols[m]) &&
            (this.symbolKey = m);
          this.bBox = u.emptyBBox;
          this.padding = 3;
          this.baselineOffset = 0;
          this.needsBox = a.styledMode || z;
          this.deferredAttr = {};
          this.alignFactor = 0;
        }
        alignSetter(a) {
          a = { left: 0, center: 0.5, right: 1 }[a];
          a !== this.alignFactor &&
            ((this.alignFactor = a),
            this.bBox && B(this.xSetting) && this.attr({ x: this.xSetting }));
        }
        anchorXSetter(a, f) {
          this.anchorX = a;
          this.boxAttr(
            f,
            Math.round(a) - this.getCrispAdjust() - this.xSetting
          );
        }
        anchorYSetter(a, f) {
          this.anchorY = a;
          this.boxAttr(f, a - this.ySetting);
        }
        boxAttr(a, f) {
          this.box ? this.box.attr(a, f) : (this.deferredAttr[a] = f);
        }
        css(v) {
          if (v) {
            const a = {};
            v = E(v);
            u.textProps.forEach((f) => {
              "undefined" !== typeof v[f] && ((a[f] = v[f]), delete v[f]);
            });
            this.text.css(a);
            "fontSize" in a || "fontWeight" in a
              ? this.updateTextPadding()
              : ("width" in a || "textOverflow" in a) && this.updateBoxSize();
          }
          return a.prototype.css.call(this, v);
        }
        destroy() {
          A(this.element, "mouseenter");
          A(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          a.prototype.destroy.call(this);
        }
        fillSetter(a, f) {
          a && (this.needsBox = !0);
          this.fill = a;
          this.boxAttr(f, a);
        }
        getBBox() {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          const a = this.padding,
            f = C(this.paddingLeft, a);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - f,
            y: this.bBox.y - a,
          };
        }
        getCrispAdjust() {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        }
        heightSetter(a) {
          this.heightSetting = a;
        }
        onAdd() {
          this.text.add(this);
          this.attr({
            text: C(this.textStr, ""),
            x: this.x || 0,
            y: this.y || 0,
          });
          this.box &&
            w(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        }
        paddingSetter(a, f) {
          B(a)
            ? a !== this[f] && ((this[f] = a), this.updateTextPadding())
            : (this[f] = void 0);
        }
        rSetter(a, f) {
          this.boxAttr(f, a);
        }
        strokeSetter(a, f) {
          this.stroke = a;
          this.boxAttr(f, a);
        }
        ["stroke-widthSetter"](a, f) {
          a && (this.needsBox = !0);
          this["stroke-width"] = a;
          this.boxAttr(f, a);
        }
        ["text-alignSetter"](a) {
          this.textAlign = a;
        }
        textSetter(a) {
          "undefined" !== typeof a && this.text.attr({ text: a });
          this.updateTextPadding();
        }
        updateBoxSize() {
          var a = this.text;
          const f = {},
            h = this.padding,
            r = (this.bBox =
              (B(this.widthSetting) &&
                B(this.heightSetting) &&
                !this.textAlign) ||
              !w(a.textStr)
                ? u.emptyBBox
                : a.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || r.height || 0) + 2 * h;
          const m = this.renderer.fontMetrics(a);
          this.baselineOffset =
            h +
            Math.min((this.text.firstLineMetrics || m).b, r.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - m.h) / 2);
          this.needsBox &&
            !a.textPath &&
            (this.box ||
              ((a = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              a.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : "")
              ),
              a.add(this)),
            (a = this.getCrispAdjust()),
            (f.x = a),
            (f.y = (this.baseline ? -this.baselineOffset : 0) + a),
            (f.width = Math.round(this.width)),
            (f.height = Math.round(this.height)),
            this.box.attr(K(f, this.deferredAttr)),
            (this.deferredAttr = {}));
        }
        updateTextPadding() {
          const a = this.text;
          if (!a.textPath) {
            this.updateBoxSize();
            const f = this.baseline ? 0 : this.baselineOffset;
            let h = C(this.paddingLeft, this.padding);
            w(this.widthSetting) &&
              this.bBox &&
              ("center" === this.textAlign || "right" === this.textAlign) &&
              (h +=
                { center: 0.5, right: 1 }[this.textAlign] *
                (this.widthSetting - this.bBox.width));
            if (h !== a.x || f !== a.y)
              a.attr("x", h),
                a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)),
                "undefined" !== typeof f && a.attr("y", f);
            a.x = h;
            a.y = f;
          }
        }
        widthSetter(a) {
          this.widthSetting = B(a) ? a : void 0;
        }
        getPaddedWidth() {
          var a = this.padding;
          const f = C(this.paddingLeft, a);
          a = C(this.paddingRight, a);
          return (this.widthSetting || this.bBox.width || 0) + f + a;
        }
        xSetter(a) {
          this.x = a;
          this.alignFactor &&
            ((a -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(a);
          this.attr("translateX", this.xSetting);
        }
        ySetter(a) {
          this.ySetting = this.y = Math.round(a);
          this.attr("translateY", this.ySetting);
        }
      }
      u.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
      u.textProps =
        "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow whiteSpace width".split(
          " "
        );
      return u;
    }
  );
  M(a, "Core/Renderer/SVG/Symbols.js", [a["Core/Utilities.js"]], function (a) {
    function w(a, u, v, f, h) {
      const r = [];
      if (h) {
        const m = h.start || 0,
          n = C(h.r, v);
        v = C(h.r, f || v);
        f = (h.end || 0) - 0.001;
        const k = h.innerR,
          g = C(h.open, 0.001 > Math.abs((h.end || 0) - m - 2 * Math.PI)),
          I = Math.cos(m),
          F = Math.sin(m),
          z = Math.cos(f),
          e = Math.sin(f),
          t = C(h.longArc, 0.001 > f - m - Math.PI ? 0 : 1);
        let d = ["A", n, v, 0, t, C(h.clockwise, 1), a + n * z, u + v * e];
        d.params = { start: m, end: f, cx: a, cy: u };
        r.push(["M", a + n * I, u + v * F], d);
        B(k) &&
          ((d = [
            "A",
            k,
            k,
            0,
            t,
            B(h.clockwise) ? 1 - h.clockwise : 0,
            a + k * I,
            u + k * F,
          ]),
          (d.params = { start: f, end: m, cx: a, cy: u }),
          r.push(
            g ? ["M", a + k * z, u + k * e] : ["L", a + k * z, u + k * e],
            d
          ));
        g || r.push(["Z"]);
      }
      return r;
    }
    function H(a, u, v, f, h) {
      return h && h.r
        ? K(a, u, v, f, h)
        : [
            ["M", a, u],
            ["L", a + v, u],
            ["L", a + v, u + f],
            ["L", a, u + f],
            ["Z"],
          ];
    }
    function K(a, u, v, f, h) {
      h = (null === h || void 0 === h ? void 0 : h.r) || 0;
      return [
        ["M", a + h, u],
        ["L", a + v - h, u],
        ["A", h, h, 0, 0, 1, a + v, u + h],
        ["L", a + v, u + f - h],
        ["A", h, h, 0, 0, 1, a + v - h, u + f],
        ["L", a + h, u + f],
        ["A", h, h, 0, 0, 1, a, u + f - h],
        ["L", a, u + h],
        ["A", h, h, 0, 0, 1, a + h, u],
        ["Z"],
      ];
    }
    const { defined: B, isNumber: E, pick: C } = a;
    return {
      arc: w,
      callout: function (a, u, v, f, h) {
        const r = Math.min((h && h.r) || 0, v, f),
          m = r + 6,
          n = h && h.anchorX;
        h = (h && h.anchorY) || 0;
        const k = K(a, u, v, f, { r });
        if (!E(n)) return k;
        a + n >= v
          ? h > u + m && h < u + f - m
            ? k.splice(
                3,
                1,
                ["L", a + v, h - 6],
                ["L", a + v + 6, h],
                ["L", a + v, h + 6],
                ["L", a + v, u + f - r]
              )
            : k.splice(
                3,
                1,
                ["L", a + v, f / 2],
                ["L", n, h],
                ["L", a + v, f / 2],
                ["L", a + v, u + f - r]
              )
          : 0 >= a + n
          ? h > u + m && h < u + f - m
            ? k.splice(
                7,
                1,
                ["L", a, h + 6],
                ["L", a - 6, h],
                ["L", a, h - 6],
                ["L", a, u + r]
              )
            : k.splice(
                7,
                1,
                ["L", a, f / 2],
                ["L", n, h],
                ["L", a, f / 2],
                ["L", a, u + r]
              )
          : h && h > f && n > a + m && n < a + v - m
          ? k.splice(
              5,
              1,
              ["L", n + 6, u + f],
              ["L", n, u + f + 6],
              ["L", n - 6, u + f],
              ["L", a + r, u + f]
            )
          : h &&
            0 > h &&
            n > a + m &&
            n < a + v - m &&
            k.splice(
              1,
              1,
              ["L", n - 6, u],
              ["L", n, u - 6],
              ["L", n + 6, u],
              ["L", v - r, u]
            );
        return k;
      },
      circle: function (a, u, v, f) {
        return w(a + v / 2, u + f / 2, v / 2, f / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (a, u, v, f) {
        return [
          ["M", a + v / 2, u],
          ["L", a + v, u + f / 2],
          ["L", a + v / 2, u + f],
          ["L", a, u + f / 2],
          ["Z"],
        ];
      },
      rect: H,
      roundedRect: K,
      square: H,
      triangle: function (a, u, v, f) {
        return [
          ["M", a + v / 2, u],
          ["L", a + v, u + f],
          ["L", a, u + f],
          ["Z"],
        ];
      },
      "triangle-down": function (a, u, v, f) {
        return [["M", a, u], ["L", a + v, u], ["L", a + v / 2, u + f], ["Z"]];
      },
    };
  });
  M(
    a,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { doc: w, SVG_NS: B, win: E } = y,
        {
          attr: C,
          extend: A,
          fireEvent: u,
          isString: v,
          objectEach: f,
          pick: h,
        } = H;
      class r {
        constructor(a) {
          const m = a.styles;
          this.renderer = a.renderer;
          this.svgElement = a;
          this.width = a.textWidth;
          this.textLineHeight = m && m.lineHeight;
          this.textOutline = m && m.textOutline;
          this.ellipsis = !(!m || "ellipsis" !== m.textOverflow);
          this.noWrap = !(!m || "nowrap" !== m.whiteSpace);
        }
        buildSVG() {
          const m = this.svgElement,
            f = m.element;
          var k = m.renderer,
            g = h(m.textStr, "").toString();
          const r = -1 !== g.indexOf("<"),
            F = f.childNodes;
          k = !m.added && k.box;
          const z = /<br.*?>/g;
          var e = [
            g,
            this.ellipsis,
            this.noWrap,
            this.textLineHeight,
            this.textOutline,
            m.getStyle("font-size"),
            this.width,
          ].join();
          if (e !== m.textCache) {
            m.textCache = e;
            delete m.actualWidth;
            for (e = F.length; e--; ) f.removeChild(F[e]);
            r ||
            this.ellipsis ||
            this.width ||
            m.textPath ||
            (-1 !== g.indexOf(" ") && (!this.noWrap || z.test(g)))
              ? "" !== g &&
                (k && k.appendChild(f),
                (g = new a(g)),
                this.modifyTree(g.nodes),
                g.addToDOM(f),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (f.textContent || "").indexOf("\u2026") &&
                  m.attr(
                    "title",
                    this.unescapeEntities(m.textStr || "", ["&lt;", "&gt;"])
                  ),
                k && k.removeChild(f))
              : f.appendChild(w.createTextNode(this.unescapeEntities(g)));
            v(this.textOutline) &&
              m.applyTextOutline &&
              m.applyTextOutline(this.textOutline);
          }
        }
        modifyDOM() {
          const a = this.svgElement,
            f = C(a.element, "x");
          a.firstLineMetrics = void 0;
          let k;
          for (; (k = a.element.firstChild); )
            if (/^[\s\u200B]*$/.test(k.textContent || " "))
              a.element.removeChild(k);
            else break;
          [].forEach.call(
            a.element.querySelectorAll("tspan.highcharts-br"),
            (g, e) => {
              g.nextSibling &&
                g.previousSibling &&
                (0 === e &&
                  1 === g.previousSibling.nodeType &&
                  (a.firstLineMetrics = a.renderer.fontMetrics(
                    g.previousSibling
                  )),
                C(g, { dy: this.getLineHeight(g.nextSibling), x: f }));
            }
          );
          const g = this.width || 0;
          if (g) {
            var h = (k, e) => {
                var t = k.textContent || "";
                const d = t.replace(/([^\^])-/g, "$1- ").split(" ");
                var q =
                  !this.noWrap &&
                  (1 < d.length || 1 < a.element.childNodes.length);
                const m = this.getLineHeight(e);
                let c = 0,
                  b = a.actualWidth;
                if (this.ellipsis)
                  t &&
                    this.truncate(
                      k,
                      t,
                      void 0,
                      0,
                      Math.max(0, g - 0.8 * m),
                      (b, c) => b.substring(0, c) + "\u2026"
                    );
                else if (q) {
                  t = [];
                  for (q = []; e.firstChild && e.firstChild !== k; )
                    q.push(e.firstChild), e.removeChild(e.firstChild);
                  for (; d.length; )
                    d.length &&
                      !this.noWrap &&
                      0 < c &&
                      (t.push(k.textContent || ""),
                      (k.textContent = d.join(" ").replace(/- /g, "-"))),
                      this.truncate(
                        k,
                        void 0,
                        d,
                        0 === c ? b || 0 : 0,
                        g,
                        (b, c) => d.slice(0, c).join(" ").replace(/- /g, "-")
                      ),
                      (b = a.actualWidth),
                      c++;
                  q.forEach((b) => {
                    e.insertBefore(b, k);
                  });
                  t.forEach((b) => {
                    e.insertBefore(w.createTextNode(b), k);
                    b = w.createElementNS(B, "tspan");
                    b.textContent = "\u200b";
                    C(b, { dy: m, x: f });
                    e.insertBefore(b, k);
                  });
                }
              },
              r = (g) => {
                [].slice.call(g.childNodes).forEach((e) => {
                  e.nodeType === E.Node.TEXT_NODE
                    ? h(e, g)
                    : (-1 !== e.className.baseVal.indexOf("highcharts-br") &&
                        (a.actualWidth = 0),
                      r(e));
                });
              };
            r(a.element);
          }
        }
        getLineHeight(a) {
          a = a.nodeType === E.Node.TEXT_NODE ? a.parentElement : a;
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(a || this.svgElement.element).h;
        }
        modifyTree(a) {
          const f = (k, g) => {
            const {
                attributes: m = {},
                children: h,
                style: n = {},
                tagName: e,
              } = k,
              t = this.renderer.styledMode;
            if ("b" === e || "strong" === e)
              t ? (m["class"] = "highcharts-strong") : (n.fontWeight = "bold");
            else if ("i" === e || "em" === e)
              t
                ? (m["class"] = "highcharts-emphasized")
                : (n.fontStyle = "italic");
            n && n.color && (n.fill = n.color);
            "br" === e
              ? ((m["class"] = "highcharts-br"),
                (k.textContent = "\u200b"),
                (g = a[g + 1]) &&
                  g.textContent &&
                  (g.textContent = g.textContent.replace(/^ +/gm, "")))
              : "a" === e &&
                h &&
                h.some((d) => "#text" === d.tagName) &&
                (k.children = [{ children: h, tagName: "tspan" }]);
            "#text" !== e && "a" !== e && (k.tagName = "tspan");
            A(k, { attributes: m, style: n });
            h && h.filter((d) => "#text" !== d.tagName).forEach(f);
          };
          a.forEach(f);
          u(this.svgElement, "afterModifyTree", { nodes: a });
        }
        truncate(a, f, k, g, h, r) {
          const m = this.svgElement,
            { rotation: e } = m,
            t = [];
          let d = k ? 1 : 0,
            q = (f || k || "").length,
            x = q,
            c,
            b;
          const p = function (b, c) {
            b = c || b;
            if (
              (c = a.parentNode) &&
              "undefined" === typeof t[b] &&
              c.getSubStringLength
            )
              try {
                t[b] = g + c.getSubStringLength(0, k ? b + 1 : b);
              } catch (N) {
                ("");
              }
            return t[b];
          };
          m.rotation = 0;
          b = p(a.textContent.length);
          if (g + b > h) {
            for (; d <= q; )
              (x = Math.ceil((d + q) / 2)),
                k && (c = r(k, x)),
                (b = p(x, c && c.length - 1)),
                d === q ? (d = q + 1) : b > h ? (q = x - 1) : (d = x);
            0 === q
              ? (a.textContent = "")
              : (f && q === f.length - 1) ||
                (a.textContent = c || r(f || k, x));
          }
          k && k.splice(0, x);
          m.actualWidth = b;
          m.rotation = e;
        }
        unescapeEntities(a, h) {
          f(this.renderer.escapes, function (k, g) {
            (h && -1 !== h.indexOf(k)) ||
              (a = a.toString().replace(new RegExp(k, "g"), g));
          });
          return a;
        }
      }
      return r;
    }
  );
  M(
    a,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGLabel.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Renderer/SVG/TextBuilder.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E, C, A, u) {
      const {
          charts: v,
          deg2rad: f,
          doc: h,
          isFirefox: r,
          isMS: m,
          isWebKit: n,
          noop: k,
          SVG_NS: g,
          symbolSizes: I,
          win: F,
        } = H,
        {
          addEvent: z,
          attr: e,
          createElement: t,
          css: d,
          defined: q,
          destroyObjectProperties: x,
          extend: c,
          isArray: b,
          isNumber: p,
          isObject: l,
          isString: L,
          merge: N,
          pick: O,
          pInt: w,
          uniqueKey: S,
        } = u;
      let U;
      class G {
        constructor(b, c, d, a, l, e, p) {
          this.width =
            this.url =
            this.style =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(b, c, d, a, l, e, p);
        }
        init(b, c, a, l, D, p, G) {
          const q = this.createElement("svg").attr({
              version: "1.1",
              class: "highcharts-root",
            }),
            g = q.element;
          G || q.css(this.getStyle(l));
          b.appendChild(g);
          e(b, "dir", "ltr");
          -1 === b.innerHTML.indexOf("xmlns") && e(g, "xmlns", this.SVG_NS);
          this.box = g;
          this.boxWrapper = q;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              h.createTextNode("Created with Highcharts 11.0.0")
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = p;
          this.forExport = D;
          this.styledMode = G;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.rootFontSize = q.getStyle("font-size");
          this.setSize(c, a, !1);
          let t;
          r &&
            b.getBoundingClientRect &&
            ((c = function () {
              d(b, { left: 0, top: 0 });
              t = b.getBoundingClientRect();
              d(b, {
                left: Math.ceil(t.left) - t.left + "px",
                top: Math.ceil(t.top) - t.top + "px",
              });
            }),
            c(),
            (this.unSubPixelFix = z(F, "resize", c)));
        }
        definition(b) {
          return new a([b]).addToDOM(this.defs.element);
        }
        getReferenceURL() {
          if ((r || n) && h.getElementsByTagName("base").length) {
            if (!q(U)) {
              var b = S();
              b = new a([
                {
                  tagName: "svg",
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: { id: b },
                          children: [
                            {
                              tagName: "rect",
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": `url(#${b})`,
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(h.body);
              d(b, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
              const c = h.elementFromPoint(6, 6);
              U = "hitme" === (c && c.id);
              h.body.removeChild(b);
            }
            if (U)
              return F.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        }
        getStyle(b) {
          return (this.style = c(
            { fontFamily: "Helvetica, Arial, sans-serif", fontSize: "1rem" },
            b
          ));
        }
        setStyle(b) {
          this.boxWrapper.css(this.getStyle(b));
        }
        isHidden() {
          return !this.boxWrapper.getBBox().width;
        }
        destroy() {
          const b = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          x(this.gradients || {});
          this.gradients = null;
          this.defs = b.destroy();
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        }
        createElement(b) {
          const c = new this.Element();
          c.init(this, b);
          return c;
        }
        getRadialAttr(b, c) {
          return {
            cx: b[0] - b[2] / 2 + (c.cx || 0) * b[2],
            cy: b[1] - b[2] / 2 + (c.cy || 0) * b[2],
            r: (c.r || 0) * b[2],
          };
        }
        shadowDefinition(b) {
          const c = ["drop-shadow", ...Object.keys(b).map((c) => b[c])]
              .join("-")
              .replace(/[^a-z0-9\-]/g, ""),
            d = N(
              {
                color: "#000000",
                offsetX: 1,
                offsetY: 1,
                opacity: 0.15,
                width: 5,
              },
              b
            );
          this.defs.element.querySelector(`#${c}`) ||
            this.definition({
              tagName: "filter",
              attributes: { id: c },
              children: [
                {
                  tagName: "feDropShadow",
                  attributes: {
                    dx: d.offsetX,
                    dy: d.offsetY,
                    "flood-color": d.color,
                    "flood-opacity": Math.min(5 * d.opacity, 1),
                    stdDeviation: d.width / 2,
                  },
                },
              ],
            });
          return c;
        }
        buildText(b) {
          new A(b).buildSVG();
        }
        getContrast(b) {
          b = y.parse(b).rgba.map((b) => {
            b /= 255;
            return 0.03928 >= b
              ? b / 12.92
              : Math.pow((b + 0.055) / 1.055, 2.4);
          });
          b = 0.2126 * b[0] + 0.7152 * b[1] + 0.0722 * b[2];
          return 1.05 / (b + 0.05) > (b + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
        }
        button(b, d, e, p, D = {}, G, q, g, t, k) {
          const J = this.label(b, d, e, t, void 0, void 0, k, void 0, "button"),
            f = this.styledMode;
          b = D.states || {};
          let x = 0;
          D = N(D);
          delete D.states;
          const P = N(
            {
              color: "#333333",
              cursor: "pointer",
              fontSize: "0.8em",
              fontWeight: "normal",
            },
            D.style
          );
          delete D.style;
          let h = a.filterUserAttributes(D);
          J.attr(N({ padding: 8, r: 2 }, h));
          let Q, n, L;
          f ||
            ((h = N(
              { fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 },
              h
            )),
            (G = N(
              h,
              { fill: "#e6e6e6" },
              a.filterUserAttributes(G || b.hover || {})
            )),
            (Q = G.style),
            delete G.style,
            (q = N(
              h,
              {
                fill: "#e6e9ff",
                style: { color: "#000000", fontWeight: "bold" },
              },
              a.filterUserAttributes(q || b.select || {})
            )),
            (n = q.style),
            delete q.style,
            (g = N(
              h,
              { style: { color: "#cccccc" } },
              a.filterUserAttributes(g || b.disabled || {})
            )),
            (L = g.style),
            delete g.style);
          z(J.element, m ? "mouseover" : "mouseenter", function () {
            3 !== x && J.setState(1);
          });
          z(J.element, m ? "mouseout" : "mouseleave", function () {
            3 !== x && J.setState(x);
          });
          J.setState = function (b) {
            1 !== b && (J.state = x = b);
            J.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][b || 0]
            );
            f ||
              (J.attr([h, G, q, g][b || 0]),
              (b = [P, Q, n, L][b || 0]),
              l(b) && J.css(b));
          };
          f ||
            (J.attr(h).css(c({ cursor: "default" }, P)),
            k && J.text.css({ pointerEvents: "none" }));
          return J.on("touchstart", (b) => b.stopPropagation()).on(
            "click",
            function (b) {
              3 !== x && p.call(J, b);
            }
          );
        }
        crispLine(b, c, d = "round") {
          const a = b[0],
            l = b[1];
          q(a[1]) &&
            a[1] === l[1] &&
            (a[1] = l[1] = Math[d](a[1]) - (c % 2) / 2);
          q(a[2]) &&
            a[2] === l[2] &&
            (a[2] = l[2] = Math[d](a[2]) + (c % 2) / 2);
          return b;
        }
        path(d) {
          const a = this.styledMode ? {} : { fill: "none" };
          b(d) ? (a.d = d) : l(d) && c(a, d);
          return this.createElement("path").attr(a);
        }
        circle(b, c, d) {
          b = l(b) ? b : "undefined" === typeof b ? {} : { x: b, y: c, r: d };
          c = this.createElement("circle");
          c.xSetter = c.ySetter = function (b, c, d) {
            d.setAttribute("c" + c, b);
          };
          return c.attr(b);
        }
        arc(b, c, d, a, e, p) {
          l(b)
            ? ((a = b), (c = a.y), (d = a.r), (b = a.x))
            : (a = { innerR: a, start: e, end: p });
          b = this.symbol("arc", b, c, d, d, a);
          b.r = d;
          return b;
        }
        rect(b, d, a, p, D, G) {
          b = l(b)
            ? b
            : "undefined" === typeof b
            ? {}
            : {
                x: b,
                y: d,
                r: D,
                width: Math.max(a || 0, 0),
                height: Math.max(p || 0, 0),
              };
          const q = this.createElement("rect");
          this.styledMode ||
            ("undefined" !== typeof G &&
              ((b["stroke-width"] = G), c(b, q.crisp(b))),
            (b.fill = "none"));
          q.rSetter = function (b, c, d) {
            q.r = b;
            e(d, { rx: b, ry: b });
          };
          q.rGetter = function () {
            return q.r || 0;
          };
          return q.attr(b);
        }
        roundedRect(b) {
          return this.symbol("roundedRect").attr(b);
        }
        setSize(b, c, d) {
          this.width = b;
          this.height = c;
          this.boxWrapper.animate(
            { width: b, height: c },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: O(d, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        }
        g(b) {
          const c = this.createElement("g");
          return b ? c.attr({ class: "highcharts-" + b }) : c;
        }
        image(b, c, d, a, l, e) {
          const D = { preserveAspectRatio: "none" },
            q = function (b, c) {
              b.setAttributeNS
                ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", c)
                : b.setAttribute("hc-svg-href", c);
            };
          p(c) && (D.x = c);
          p(d) && (D.y = d);
          p(a) && (D.width = a);
          p(l) && (D.height = l);
          const G = this.createElement("image").attr(D);
          c = function (c) {
            q(G.element, b);
            e.call(G, c);
          };
          e
            ? (q(
                G.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              ),
              (d = new F.Image()),
              z(d, "load", c),
              (d.src = b),
              d.complete && c({}))
            : q(G.element, b);
          return G;
        }
        symbol(b, a, l, p, D, G) {
          const g = this,
            k = /^url\((.*?)\)$/,
            f = k.test(b),
            x = !f && (this.symbols[b] ? b : "circle"),
            m = x && this.symbols[x];
          let P, n, L, r;
          if (m)
            "number" === typeof a &&
              (n = m.call(
                this.symbols,
                Math.round(a || 0),
                Math.round(l || 0),
                p || 0,
                D || 0,
                G
              )),
              (P = this.path(n)),
              g.styledMode || P.attr("fill", "none"),
              c(P, {
                symbolName: x || void 0,
                x: a,
                y: l,
                width: p,
                height: D,
              }),
              G && c(P, G);
          else if (f) {
            L = b.match(k)[1];
            const c = (P = this.image(L));
            c.imgwidth = O(G && G.width, I[L] && I[L].width);
            c.imgheight = O(G && G.height, I[L] && I[L].height);
            r = (b) => b.attr({ width: b.width, height: b.height });
            ["width", "height"].forEach(function (b) {
              c[b + "Setter"] = function (b, c) {
                this[c] = b;
                const {
                  alignByTranslate: d,
                  element: a,
                  width: l,
                  height: D,
                  imgwidth: p,
                  imgheight: g,
                } = this;
                b = this["img" + c];
                if (q(b)) {
                  let q = 1;
                  G && "within" === G.backgroundSize && l && D
                    ? ((q = Math.min(l / p, D / g)),
                      e(a, {
                        width: Math.round(p * q),
                        height: Math.round(g * q),
                      }))
                    : a && a.setAttribute(c, b);
                  d ||
                    this.translate(
                      ((l || 0) - p * q) / 2,
                      ((D || 0) - g * q) / 2
                    );
                }
              };
            });
            q(a) && c.attr({ x: a, y: l });
            c.isImg = !0;
            q(c.imgwidth) && q(c.imgheight)
              ? r(c)
              : (c.attr({ width: 0, height: 0 }),
                t("img", {
                  onload: function () {
                    const b = v[g.chartIndex];
                    0 === this.width &&
                      (d(this, { position: "absolute", top: "-999em" }),
                      h.body.appendChild(this));
                    I[L] = { width: this.width, height: this.height };
                    c.imgwidth = this.width;
                    c.imgheight = this.height;
                    c.element && r(c);
                    this.parentNode && this.parentNode.removeChild(this);
                    g.imgCount--;
                    if (!g.imgCount && b && !b.hasLoaded) b.onload();
                  },
                  src: L,
                }),
                this.imgCount++);
          }
          return P;
        }
        clipRect(b, c, d, a) {
          const l = S() + "-",
            e = this.createElement("clipPath").attr({ id: l }).add(this.defs);
          b = this.rect(b, c, d, a, 0).add(e);
          b.id = l;
          b.clipPath = e;
          b.count = 0;
          return b;
        }
        text(b, c, d, a) {
          const l = {};
          if (a && (this.allowHTML || !this.forExport))
            return this.html(b, c, d);
          l.x = Math.round(c || 0);
          d && (l.y = Math.round(d));
          q(b) && (l.text = b);
          b = this.createElement("text").attr(l);
          if (!a || (this.forExport && !this.allowHTML))
            b.xSetter = function (b, c, d) {
              const a = d.getElementsByTagName("tspan"),
                l = d.getAttribute(c);
              for (let d = 0, e; d < a.length; d++)
                (e = a[d]), e.getAttribute(c) === l && e.setAttribute(c, b);
              d.setAttribute(c, b);
            };
          return b;
        }
        fontMetrics(b) {
          b = w(B.prototype.getStyle.call(b, "font-size") || 0);
          const c = 24 > b ? b + 3 : Math.round(1.2 * b);
          return { h: c, b: Math.round(0.8 * c), f: b };
        }
        rotCorr(b, c, d) {
          let a = b;
          c && d && (a = Math.max(a * Math.cos(c * f), 4));
          return { x: (-b / 3) * Math.sin(c * f), y: a };
        }
        pathToSegments(b) {
          const c = [],
            d = [],
            a = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
          for (let l = 0; l < b.length; l++)
            L(d[0]) &&
              p(b[l]) &&
              d.length === a[d[0].toUpperCase()] &&
              b.splice(l, 0, d[0].replace("M", "L").replace("m", "l")),
              "string" === typeof b[l] &&
                (d.length && c.push(d.slice(0)), (d.length = 0)),
              d.push(b[l]);
          c.push(d.slice(0));
          return c;
        }
        label(b, c, d, a, l, e, G, p, q) {
          return new E(this, b, c, d, a, l, e, G, p, q);
        }
        alignElements() {
          this.alignedObjects.forEach((b) => b.align());
        }
      }
      c(G.prototype, {
        Element: B,
        SVG_NS: g,
        escapes: {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        },
        symbols: C,
        draw: k,
      });
      K.registerRendererType("svg", G, !0);
      ("");
      return G;
    }
  );
  M(
    a,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      a["Core/Globals.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { isFirefox: w, isMS: B, isWebKit: E, win: C } = a,
        { css: A, defined: u, extend: v, pick: f, pInt: h } = H,
        r = [];
      class m extends y {
        static compose(a) {
          if (H.pushUnique(r, a)) {
            const k = m.prototype,
              g = a.prototype;
            g.getSpanCorrection = k.getSpanCorrection;
            g.htmlCss = k.htmlCss;
            g.htmlGetBBox = k.htmlGetBBox;
            g.htmlUpdateTransform = k.htmlUpdateTransform;
            g.setSpanRotation = k.setSpanRotation;
          }
          return a;
        }
        getSpanCorrection(a, k, g) {
          this.xCorr = -a * g;
          this.yCorr = -k;
        }
        htmlCss(a) {
          const k = "SPAN" === this.element.tagName && a && "width" in a,
            g = f(k && a.width, void 0);
          let m;
          k && (delete a.width, (this.textWidth = g), (m = !0));
          a &&
            "ellipsis" === a.textOverflow &&
            ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
          this.styles = v(this.styles, a);
          A(this.element, a);
          m && this.htmlUpdateTransform();
          return this;
        }
        htmlGetBBox() {
          const a = this.element;
          return {
            x: a.offsetLeft,
            y: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        }
        htmlUpdateTransform() {
          if (this.added) {
            var a = this.renderer,
              k = this.element,
              g = this.x || 0,
              f = this.y || 0,
              m = this.textAlign || "left",
              r = { left: 0, center: 0.5, right: 1 }[m],
              e = this.styles,
              t = e && e.whiteSpace;
            A(k, {
              marginLeft: this.translateX || 0,
              marginTop: this.translateY || 0,
            });
            if ("SPAN" === k.tagName) {
              e = this.rotation;
              const q = this.textWidth && h(this.textWidth),
                x = [e, m, k.innerHTML, this.textWidth, this.textAlign].join();
              let c = !1;
              if (q !== this.oldTextWidth) {
                if (this.textPxLength) var d = this.textPxLength;
                else
                  A(k, { width: "", whiteSpace: t || "nowrap" }),
                    (d = k.offsetWidth);
                (q > this.oldTextWidth || d > q) &&
                  (/[ \-]/.test(k.textContent || k.innerText) ||
                    "ellipsis" === k.style.textOverflow) &&
                  (A(k, {
                    width: d > q || e ? q + "px" : "auto",
                    display: "block",
                    whiteSpace: t || "normal",
                  }),
                  (this.oldTextWidth = q),
                  (c = !0));
              }
              this.hasBoxWidthChanged = c;
              x !== this.cTT &&
                ((a = a.fontMetrics(k).b),
                !u(e) ||
                  (e === (this.oldRotation || 0) && m === this.oldAlign) ||
                  this.setSpanRotation(e, r, a),
                this.getSpanCorrection(
                  (!u(e) && this.textPxLength) || k.offsetWidth,
                  a,
                  r,
                  e,
                  m
                ));
              A(k, {
                left: g + (this.xCorr || 0) + "px",
                top: f + (this.yCorr || 0) + "px",
              });
              this.cTT = x;
              this.oldRotation = e;
              this.oldAlign = m;
            }
          } else this.alignOnAdd = !0;
        }
        setSpanRotation(a, k, g) {
          const f = {},
            m =
              B && !/Edge/.test(C.navigator.userAgent)
                ? "-ms-transform"
                : E
                ? "-webkit-transform"
                : w
                ? "MozTransform"
                : C.opera
                ? "-o-transform"
                : void 0;
          m &&
            ((f[m] = f.transform = "rotate(" + a + "deg)"),
            (f[m + (w ? "Origin" : "-origin")] = f.transformOrigin =
              100 * k + "% " + g + "px"),
            A(this.element, f));
        }
      }
      return m;
    }
  );
  M(
    a,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K) {
      const { attr: w, createElement: E, extend: C, pick: A } = K,
        u = [];
      class v extends H {
        static compose(a) {
          K.pushUnique(u, a) && (a.prototype.html = v.prototype.html);
          return a;
        }
        html(f, h, r) {
          const m = this.createElement("span"),
            n = m.element,
            k = m.renderer,
            g = function (a, g) {
              ["opacity", "visibility"].forEach(function (k) {
                a[k + "Setter"] = function (e, t, d) {
                  const q = a.div ? a.div.style : g;
                  y.prototype[k + "Setter"].call(this, e, t, d);
                  q && (q[t] = e);
                };
              });
              a.addedSetters = !0;
            };
          m.textSetter = function (g) {
            g !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              a.setElementHTML(this.element, A(g, "")),
              (this.textStr = g),
              (m.doTransform = !0));
          };
          g(m, m.element.style);
          m.xSetter =
            m.ySetter =
            m.alignSetter =
            m.rotationSetter =
              function (a, g) {
                "align" === g ? (m.alignValue = m.textAlign = a) : (m[g] = a);
                m.doTransform = !0;
              };
          m.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          m.attr({ text: f, x: Math.round(h), y: Math.round(r) }).css({
            position: "absolute",
          });
          k.styledMode ||
            m.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          n.style.whiteSpace = "nowrap";
          m.css = m.htmlCss;
          m.add = function (a) {
            const f = k.box.parentNode,
              h = [];
            let e;
            if ((this.parentGroup = a)) {
              if (((e = a.div), !e)) {
                for (; a; ) h.push(a), (a = a.parentGroup);
                h.reverse().forEach(function (a) {
                  function d(b, d) {
                    a[d] = b;
                    "translateX" === d
                      ? (c.left = b + "px")
                      : (c.top = b + "px");
                    a.doTransform = !0;
                  }
                  const q = w(a.element, "class"),
                    t = a.styles || {};
                  e = a.div =
                    a.div ||
                    E(
                      "div",
                      q ? { className: q } : void 0,
                      {
                        position: "absolute",
                        left: (a.translateX || 0) + "px",
                        top: (a.translateY || 0) + "px",
                        display: a.display,
                        opacity: a.opacity,
                        cursor: t.cursor,
                        pointerEvents: t.pointerEvents,
                        visibility: a.visibility,
                      },
                      e || f
                    );
                  const c = e.style;
                  C(a, {
                    classSetter: (function (b) {
                      return function (c) {
                        this.element.setAttribute("class", c);
                        b.className = c;
                      };
                    })(e),
                    on: function () {
                      h[0].div &&
                        m.on.apply(
                          { element: h[0].div, onEvents: a.onEvents },
                          arguments
                        );
                      return a;
                    },
                    translateXSetter: d,
                    translateYSetter: d,
                  });
                  a.addedSetters || g(a);
                });
              }
            } else e = f;
            e.appendChild(n);
            m.added = !0;
            m.alignOnAdd && m.htmlUpdateTransform();
            return m;
          };
          return m;
        }
      }
      return v;
    }
  );
  M(a, "Core/Axis/AxisDefaults.js", [], function () {
    var a;
    (function (a) {
      a.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: "%H:%M:%S.%L", range: !1 },
          second: { main: "%H:%M:%S", range: !1 },
          minute: { main: "%H:%M", range: !1 },
          hour: { main: "%H:%M", range: !1 },
          day: { main: "%e %b" },
          week: { main: "%e %b" },
          month: { main: "%b '%y" },
          year: { main: "%Y" },
        },
        endOnTick: !1,
        gridLineDashStyle: "Solid",
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: 15,
          enabled: !0,
          indentation: 10,
          overflow: "justify",
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          zIndex: 7,
          style: { color: "#333333", cursor: "default", fontSize: "0.8em" },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: "Solid",
        minorTickLength: 2,
        minorTickPosition: "outside",
        minorTicksPerMajor: 5,
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: "#666666", fontSize: "0.8em" },
        },
        type: "linear",
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#333333",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        gridLineWidth: void 0,
        tickColor: "#333333",
      };
      a.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: void 0 },
        startOnTick: !0,
        title: { rotation: 270, text: "Values" },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: "justify",
          formatter: function () {
            const { numberFormatter: a } = this.axis.chart;
            return a(this.total || 0, -1);
          },
          style: {
            color: "#000000",
            fontSize: "0.7em",
            fontWeight: "bold",
            textOutline: "1px contrast",
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      a.defaultLeftAxisOptions = { title: { rotation: 270 } };
      a.defaultRightAxisOptions = { title: { rotation: 90 } };
      a.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45] },
        margin: 15,
        title: { rotation: 0 },
      };
      a.defaultTopAxisOptions = {
        labels: { autoRotation: [-45] },
        margin: 15,
        title: { rotation: 0 },
      };
    })(a || (a = {}));
    return a;
  });
  M(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: w, isFunction: H, objectEach: K, removeEvent: B } = a;
    var E;
    (function (a) {
      a.registerEventOptions = function (a, u) {
        a.eventOptions = a.eventOptions || {};
        K(u.events, function (v, f) {
          a.eventOptions[f] !== v &&
            (a.eventOptions[f] &&
              (B(a, f, a.eventOptions[f]), delete a.eventOptions[f]),
            H(v) && ((a.eventOptions[f] = v), w(a, f, v, { order: 0 })));
        });
      };
    })(E || (E = {}));
    return E;
  });
  M(
    a,
    "Core/Axis/Tick.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { deg2rad: w } = y,
        {
          clamp: B,
          correctFloat: E,
          defined: C,
          destroyObjectProperties: A,
          extend: u,
          fireEvent: v,
          isNumber: f,
          merge: h,
          objectEach: r,
          pick: m,
        } = H;
      class n {
        constructor(a, g, f, m, h) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = g;
          this.type = f || "";
          this.parameters = h || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          v(this, "init");
          f || m || this.addLabel();
        }
        addLabel() {
          const k = this,
            g = k.axis;
          var h = g.options;
          const n = g.chart;
          var r = g.categories;
          const e = g.logarithmic,
            t = g.names,
            d = k.pos,
            q = m(k.options && k.options.labels, h.labels);
          var x = g.tickPositions;
          const c = d === x[0],
            b = d === x[x.length - 1],
            p = (!q.step || 1 === q.step) && 1 === g.tickInterval;
          x = x.info;
          let l = k.label,
            L,
            N,
            O;
          r = this.parameters.category || (r ? m(r[d], t[d], d) : d);
          e && f(r) && (r = E(e.lin2log(r)));
          g.dateTime &&
            (x
              ? ((N = n.time.resolveDTLFormat(
                  h.dateTimeLabelFormats[
                    (!h.grid && x.higherRanks[d]) || x.unitName
                  ]
                )),
                (L = N.main))
              : f(r) &&
                (L = g.dateTime.getXDateFormat(
                  r,
                  h.dateTimeLabelFormats || {}
                )));
          k.isFirst = c;
          k.isLast = b;
          const w = {
            axis: g,
            chart: n,
            dateTimeLabelFormat: L,
            isFirst: c,
            isLast: b,
            pos: d,
            tick: k,
            tickPositionInfo: x,
            value: r,
          };
          v(this, "labelFormat", w);
          const S = (b) =>
            q.formatter
              ? q.formatter.call(b, b)
              : q.format
              ? ((b.text = g.defaultLabelFormatter.call(b, b)),
                a.format(q.format, b, n))
              : g.defaultLabelFormatter.call(b, b);
          h = S.call(w, w);
          const A = N && N.list;
          k.shortenLabel = A
            ? function () {
                for (O = 0; O < A.length; O++)
                  if (
                    (u(w, { dateTimeLabelFormat: A[O] }),
                    l.attr({ text: S.call(w, w) }),
                    l.getBBox().width < g.getSlotWidth(k) - 2 * q.padding)
                  )
                    return;
                l.attr({ text: "" });
              }
            : void 0;
          p && g._addedPlotLB && k.moveLabel(h, q);
          C(l) || k.movedLabel
            ? l &&
              l.textStr !== h &&
              !p &&
              (!l.textWidth ||
                q.style.width ||
                l.styles.width ||
                l.css({ width: null }),
              l.attr({ text: h }),
              (l.textPxLength = l.getBBox().width))
            : ((k.label = l = k.createLabel({ x: 0, y: 0 }, h, q)),
              (k.rotation = 0));
        }
        createLabel(a, g, f) {
          const k = this.axis,
            m = k.chart;
          if (
            (a =
              C(g) && f.enabled
                ? m.renderer.text(g, a.x, a.y, f.useHTML).add(k.labelGroup)
                : null)
          )
            m.styledMode || a.css(h(f.style)),
              (a.textPxLength = a.getBBox().width);
          return a;
        }
        destroy() {
          A(this, this.axis);
        }
        getPosition(a, g, f, m) {
          const k = this.axis,
            e = k.chart,
            t = (m && e.oldChartHeight) || e.chartHeight;
          a = {
            x: a
              ? E(k.translate(g + f, void 0, void 0, m) + k.transB)
              : k.left +
                k.offset +
                (k.opposite
                  ? ((m && e.oldChartWidth) || e.chartWidth) - k.right - k.left
                  : 0),
            y: a
              ? t - k.bottom + k.offset - (k.opposite ? k.height : 0)
              : E(t - k.translate(g + f, void 0, void 0, m) - k.transB),
          };
          a.y = B(a.y, -1e5, 1e5);
          v(this, "afterGetPosition", { pos: a });
          return a;
        }
        getLabelPosition(a, g, f, h, n, e, t, d) {
          const q = this.axis,
            k = q.transA,
            c =
              q.isLinked && q.linkedParent
                ? q.linkedParent.reversed
                : q.reversed,
            b = q.staggerLines,
            p = q.tickRotCorr || { x: 0, y: 0 },
            l =
              h || q.reserveSpaceDefault
                ? 0
                : -q.labelOffset * ("center" === q.labelAlign ? 0.5 : 1),
            L = n.distance,
            r = {};
          f =
            0 === q.side
              ? f.rotation
                ? -L
                : -f.getBBox().height
              : 2 === q.side
              ? p.y + L
              : Math.cos(f.rotation * w) * (p.y - f.getBBox(!1, 0).height / 2);
          C(n.y) && (f = 0 === q.side && q.horiz ? n.y + f : n.y);
          a =
            a +
            m(n.x, [0, 1, 0, -1][q.side] * L) +
            l +
            p.x -
            (e && h ? e * k * (c ? -1 : 1) : 0);
          g = g + f - (e && !h ? e * k * (c ? 1 : -1) : 0);
          b &&
            ((h = (t / (d || 1)) % b),
            q.opposite && (h = b - h - 1),
            (g += (q.labelOffset / b) * h));
          r.x = a;
          r.y = Math.round(g);
          v(this, "afterGetLabelPosition", {
            pos: r,
            tickmarkOffset: e,
            index: t,
          });
          return r;
        }
        getLabelSize() {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        }
        getMarkPath(a, g, f, m, h, e) {
          return e.crispLine(
            [
              ["M", a, g],
              ["L", a + (h ? 0 : -f), g + (h ? f : 0)],
            ],
            m
          );
        }
        handleOverflow(a) {
          const g = this.axis,
            f = g.options.labels,
            k = a.x;
          var h = g.chart.chartWidth,
            e = g.chart.spacing;
          const t = m(g.labelLeft, Math.min(g.pos, e[3]));
          e = m(
            g.labelRight,
            Math.max(g.isRadial ? 0 : g.pos + g.len, h - e[1])
          );
          const d = this.label,
            q = this.rotation,
            x = { left: 0, center: 0.5, right: 1 }[
              g.labelAlign || d.attr("align")
            ],
            c = d.getBBox().width,
            b = g.getSlotWidth(this),
            p = {};
          let l = b,
            n = 1,
            r;
          if (q || "justify" !== f.overflow)
            0 > q && k - x * c < t
              ? (r = Math.round(k / Math.cos(q * w) - t))
              : 0 < q &&
                k + x * c > e &&
                (r = Math.round((h - k) / Math.cos(q * w)));
          else if (
            ((h = k + (1 - x) * c),
            k - x * c < t
              ? (l = a.x + l * (1 - x) - t)
              : h > e && ((l = e - a.x + l * x), (n = -1)),
            (l = Math.min(b, l)),
            l < b &&
              "center" === g.labelAlign &&
              (a.x += n * (b - l - x * (b - Math.min(c, l)))),
            c > l || (g.autoRotation && (d.styles || {}).width))
          )
            r = l;
          r &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((p.width = Math.floor(r) + "px"),
                (f.style || {}).textOverflow || (p.textOverflow = "ellipsis"),
                d.css(p)));
        }
        moveLabel(a, g) {
          const f = this;
          var k = f.label;
          const m = f.axis;
          let e = !1;
          k && k.textStr === a
            ? ((f.movedLabel = k), (e = !0), delete f.label)
            : r(m.ticks, function (g) {
                e ||
                  g.isNew ||
                  g === f ||
                  !g.label ||
                  g.label.textStr !== a ||
                  ((f.movedLabel = g.label),
                  (e = !0),
                  (g.labelPos = f.movedLabel.xy),
                  delete g.label);
              });
          e ||
            (!f.labelPos && !k) ||
            ((k = f.labelPos || k.xy),
            (f.movedLabel = f.createLabel(k, a, g)),
            f.movedLabel && f.movedLabel.attr({ opacity: 0 }));
        }
        render(a, g, f) {
          var k = this.axis,
            h = k.horiz,
            e = this.pos,
            t = m(this.tickmarkOffset, k.tickmarkOffset);
          e = this.getPosition(h, e, t, g);
          t = e.x;
          const d = e.y;
          k = (h && t === k.pos + k.len) || (!h && d === k.pos) ? -1 : 1;
          h = m(f, this.label && this.label.newOpacity, 1);
          f = m(f, 1);
          this.isActive = !0;
          this.renderGridLine(g, f, k);
          this.renderMark(e, f, k);
          this.renderLabel(e, g, h, a);
          this.isNew = !1;
          v(this, "afterRender");
        }
        renderGridLine(a, g, f) {
          const k = this.axis,
            h = k.options,
            e = {},
            t = this.pos,
            d = this.type,
            q = m(this.tickmarkOffset, k.tickmarkOffset),
            x = k.chart.renderer;
          let c = this.gridLine,
            b = h.gridLineWidth,
            p = h.gridLineColor,
            l = h.gridLineDashStyle;
          "minor" === this.type &&
            ((b = h.minorGridLineWidth),
            (p = h.minorGridLineColor),
            (l = h.minorGridLineDashStyle));
          c ||
            (k.chart.styledMode ||
              ((e.stroke = p), (e["stroke-width"] = b || 0), (e.dashstyle = l)),
            d || (e.zIndex = 1),
            a && (g = 0),
            (this.gridLine = c =
              x
                .path()
                .attr(e)
                .addClass("highcharts-" + (d ? d + "-" : "") + "grid-line")
                .add(k.gridGroup)));
          if (
            c &&
            (f = k.getPlotLinePath({
              value: t + q,
              lineWidth: c.strokeWidth() * f,
              force: "pass",
              old: a,
              acrossPanes: !1,
            }))
          )
            c[a || this.isNew ? "attr" : "animate"]({ d: f, opacity: g });
        }
        renderMark(a, g, f) {
          const k = this.axis;
          var h = k.options;
          const e = k.chart.renderer,
            t = this.type,
            d = k.tickSize(t ? t + "Tick" : "tick"),
            q = a.x;
          a = a.y;
          const x = m(
            h["minor" !== t ? "tickWidth" : "minorTickWidth"],
            !t && k.isXAxis ? 1 : 0
          );
          h = h["minor" !== t ? "tickColor" : "minorTickColor"];
          let c = this.mark;
          const b = !c;
          d &&
            (k.opposite && (d[0] = -d[0]),
            c ||
              ((this.mark = c =
                e
                  .path()
                  .addClass("highcharts-" + (t ? t + "-" : "") + "tick")
                  .add(k.axisGroup)),
              k.chart.styledMode || c.attr({ stroke: h, "stroke-width": x })),
            c[b ? "attr" : "animate"]({
              d: this.getMarkPath(q, a, d[0], c.strokeWidth() * f, k.horiz, e),
              opacity: g,
            }));
        }
        renderLabel(a, g, h, n) {
          var k = this.axis;
          const e = k.horiz,
            t = k.options,
            d = this.label,
            q = t.labels,
            x = q.step;
          k = m(this.tickmarkOffset, k.tickmarkOffset);
          const c = a.x;
          a = a.y;
          let b = !0;
          d &&
            f(c) &&
            ((d.xy = a = this.getLabelPosition(c, a, d, e, q, k, n, x)),
            (this.isFirst && !this.isLast && !t.showFirstLabel) ||
            (this.isLast && !this.isFirst && !t.showLastLabel)
              ? (b = !1)
              : !e ||
                q.step ||
                q.rotation ||
                g ||
                0 === h ||
                this.handleOverflow(a),
            x && n % x && (b = !1),
            b && f(a.y)
              ? ((a.opacity = h),
                d[this.isNewLabel ? "attr" : "animate"](a).show(!0),
                (this.isNewLabel = !1))
              : (d.hide(), (this.isNewLabel = !0)));
        }
        replaceMovedLabel() {
          const a = this.label,
            g = this.axis;
          a &&
            !this.isNew &&
            (a.animate({ opacity: 0 }, void 0, a.destroy), delete this.label);
          g.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        }
      }
      ("");
      return n;
    }
  );
  M(
    a,
    "Core/Axis/Axis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/AxisDefaults.js"],
      a["Core/Color/Color.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E, C, A) {
      const { animObject: u } = a,
        { defaultOptions: v } = K,
        { registerEventOptions: f } = B,
        { deg2rad: h } = E,
        {
          arrayMax: r,
          arrayMin: m,
          clamp: n,
          correctFloat: k,
          defined: g,
          destroyObjectProperties: w,
          erase: F,
          error: z,
          extend: e,
          fireEvent: t,
          isArray: d,
          isNumber: q,
          isString: x,
          merge: c,
          normalizeTickInterval: b,
          objectEach: p,
          pick: l,
          relativeLength: L,
          removeEvent: N,
          splat: O,
          syncTimeout: Z,
        } = A,
        S = (c, a) =>
          b(
            a,
            void 0,
            void 0,
            l(c.options.allowDecimals, 0.5 > a || void 0 !== c.tickAmount),
            !!c.tickAmount
          );
      class U {
        constructor(b, c) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(b, c);
        }
        init(b, c) {
          const a = c.isX;
          this.chart = b;
          this.horiz = b.inverted && !this.isZAxis ? !a : a;
          this.isXAxis = a;
          this.coll = this.coll || (a ? "xAxis" : "yAxis");
          t(this, "init", { userOptions: c });
          this.opposite = l(c.opposite, this.opposite);
          this.side = l(
            c.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
          );
          this.setOptions(c);
          const d = this.options,
            e = d.labels,
            D = d.type;
          this.userOptions = c;
          this.minPixelPadding = 0;
          this.reversed = l(d.reversed, this.reversed);
          this.visible = d.visible;
          this.zoomEnabled = d.zoomEnabled;
          this.hasNames = "category" === D || !0 === d.categories;
          this.categories = d.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = g(d.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = d.minRange || d.maxZoom;
          this.range = d.range;
          this.offset = d.offset || 0;
          this.min = this.max = null;
          c = l(d.crosshair, O(b.options.tooltip.crosshairs)[a ? 0 : 1]);
          this.crosshair = !0 === c ? {} : c;
          -1 === b.axes.indexOf(this) &&
            (a ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
            b[this.coll].push(this));
          this.series = this.series || [];
          b.inverted &&
            !this.isZAxis &&
            a &&
            "undefined" === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = q(e.rotation) ? e.rotation : void 0;
          f(this, d);
          t(this, "afterInit");
        }
        setOptions(b) {
          this.options = c(
            y.defaultXAxisOptions,
            "yAxis" === this.coll && y.defaultYAxisOptions,
            [
              y.defaultTopAxisOptions,
              y.defaultRightAxisOptions,
              y.defaultBottomAxisOptions,
              y.defaultLeftAxisOptions,
            ][this.side],
            c(v[this.coll], b)
          );
          t(this, "afterSetOptions", { userOptions: b });
        }
        defaultLabelFormatter(b) {
          var c = this.axis;
          ({ numberFormatter: b } = this.chart);
          const a = q(this.value) ? this.value : NaN,
            d = c.chart.time,
            l = this.dateTimeLabelFormat;
          var e = v.lang;
          const p = e.numericSymbols;
          e = e.numericSymbolMagnitude || 1e3;
          const G = c.logarithmic ? Math.abs(a) : c.tickInterval;
          let g = p && p.length,
            f;
          if (c.categories) f = `${this.value}`;
          else if (l) f = d.dateFormat(l, a);
          else if (g && 1e3 <= G)
            for (; g-- && "undefined" === typeof f; )
              (c = Math.pow(e, g + 1)),
                G >= c &&
                  0 === (10 * a) % c &&
                  null !== p[g] &&
                  0 !== a &&
                  (f = b(a / c, -1) + p[g]);
          "undefined" === typeof f &&
            (f = 1e4 <= Math.abs(a) ? b(a, -1) : b(a, -1, void 0, ""));
          return f;
        }
        getSeriesExtremes() {
          const b = this,
            c = b.chart;
          let a;
          t(this, "getSeriesExtremes", null, function () {
            b.hasVisibleSeries = !1;
            b.dataMin = b.dataMax = b.threshold = null;
            b.softThreshold = !b.isXAxis;
            b.series.forEach(function (d) {
              if (d.visible || !c.options.chart.ignoreHiddenSeries) {
                var e = d.options;
                let c = e.threshold,
                  p,
                  G;
                b.hasVisibleSeries = !0;
                b.positiveValuesOnly && 0 >= c && (c = null);
                if (b.isXAxis)
                  (e = d.xData) &&
                    e.length &&
                    ((e = b.logarithmic ? e.filter((b) => 0 < b) : e),
                    (a = d.getXExtremes(e)),
                    (p = a.min),
                    (G = a.max),
                    q(p) ||
                      p instanceof Date ||
                      ((e = e.filter(q)),
                      (a = d.getXExtremes(e)),
                      (p = a.min),
                      (G = a.max)),
                    e.length &&
                      ((b.dataMin = Math.min(l(b.dataMin, p), p)),
                      (b.dataMax = Math.max(l(b.dataMax, G), G))));
                else if (
                  ((d = d.applyExtremes()),
                  q(d.dataMin) &&
                    ((p = d.dataMin),
                    (b.dataMin = Math.min(l(b.dataMin, p), p))),
                  q(d.dataMax) &&
                    ((G = d.dataMax),
                    (b.dataMax = Math.max(l(b.dataMax, G), G))),
                  g(c) && (b.threshold = c),
                  !e.softThreshold || b.positiveValuesOnly)
                )
                  b.softThreshold = !1;
              }
            });
          });
          t(this, "afterGetSeriesExtremes");
        }
        translate(b, c, a, d, l, e) {
          const p = this.linkedParent || this,
            D = d && p.old ? p.old.min : p.min;
          if (!q(D)) return NaN;
          const g = p.minPixelPadding;
          l =
            (p.isOrdinal ||
              (p.brokenAxis && p.brokenAxis.hasBreaks) ||
              (p.logarithmic && l)) &&
            p.lin2val;
          let G = 1,
            f = 0;
          d = d && p.old ? p.old.transA : p.transA;
          d || (d = p.transA);
          a && ((G *= -1), (f = p.len));
          p.reversed && ((G *= -1), (f -= G * (p.sector || p.len)));
          c
            ? ((e = (b * G + f - g) / d + D), l && (e = p.lin2val(e)))
            : (l && (b = p.val2lin(b)),
              (b = G * (b - D) * d),
              (e = (p.isRadial ? b : k(b)) + f + G * g + (q(e) ? d * e : 0)));
          return e;
        }
        toPixels(b, c) {
          return (
            this.translate(b, !1, !this.horiz, void 0, !0) + (c ? 0 : this.pos)
          );
        }
        toValue(b, c) {
          return this.translate(
            b - (c ? 0 : this.pos),
            !0,
            !this.horiz,
            void 0,
            !0
          );
        }
        getPlotLinePath(b) {
          function c(b, c, a) {
            "pass" !== r &&
              (b < c || b > a) &&
              (r ? (b = n(b, c, a)) : (ba = !0));
            return b;
          }
          const a = this,
            d = a.chart,
            e = a.left,
            p = a.top,
            g = b.old,
            G = b.value,
            f = b.lineWidth,
            k = (g && d.oldChartHeight) || d.chartHeight,
            h = (g && d.oldChartWidth) || d.chartWidth,
            m = a.transB;
          let x = b.translatedValue,
            r = b.force,
            L,
            N,
            O,
            W,
            ba;
          b = {
            value: G,
            lineWidth: f,
            old: g,
            force: r,
            acrossPanes: b.acrossPanes,
            translatedValue: x,
          };
          t(this, "getPlotLinePath", b, function (b) {
            x = l(x, a.translate(G, void 0, void 0, g));
            x = n(x, -1e5, 1e5);
            L = O = Math.round(x + m);
            N = W = Math.round(k - x - m);
            q(x)
              ? a.horiz
                ? ((N = p), (W = k - a.bottom), (L = O = c(L, e, e + a.width)))
                : ((L = e), (O = h - a.right), (N = W = c(N, p, p + a.height)))
              : ((ba = !0), (r = !1));
            b.path =
              ba && !r
                ? null
                : d.renderer.crispLine(
                    [
                      ["M", L, N],
                      ["L", O, W],
                    ],
                    f || 1
                  );
          });
          return b.path;
        }
        getLinearTickPositions(b, c, a) {
          const d = k(Math.floor(c / b) * b);
          a = k(Math.ceil(a / b) * b);
          const l = [];
          let e, p;
          k(d + b) === d && (p = 20);
          if (this.single) return [c];
          for (c = d; c <= a; ) {
            l.push(c);
            c = k(c + b, p);
            if (c === e) break;
            e = c;
          }
          return l;
        }
        getMinorTickInterval() {
          const b = this.options;
          return !0 === b.minorTicks
            ? l(b.minorTickInterval, "auto")
            : !1 === b.minorTicks
            ? null
            : b.minorTickInterval;
        }
        getMinorTickPositions() {
          var b = this.options;
          const c = this.tickPositions,
            a = this.minorTickInterval;
          var d = this.pointRangePadding || 0;
          const l = this.min - d;
          d = this.max + d;
          const e = d - l;
          let p = [];
          if (e && e / a < this.len / 3) {
            const e = this.logarithmic;
            if (e)
              this.paddedTicks.forEach(function (b, c, d) {
                c &&
                  p.push.apply(p, e.getLogTickPositions(a, d[c - 1], d[c], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              p = p.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(a),
                  l,
                  d,
                  b.startOfWeek
                )
              );
            else
              for (b = l + ((c[0] - l) % a); b <= d && b !== p[0]; b += a)
                p.push(b);
          }
          0 !== p.length && this.trimTicks(p);
          return p;
        }
        adjustForMinRange() {
          const b = this.options,
            c = this.logarithmic;
          let a = this.min;
          var d = this.max;
          let e,
            p = 0,
            q,
            f,
            t,
            k,
            h;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !c &&
            (g(b.min) || g(b.max) || g(b.floor) || g(b.ceiling)
              ? (this.minRange = null)
              : (this.series.forEach(function (b) {
                  t = b.xData;
                  k = b.xIncrement ? 1 : t.length - 1;
                  if (1 < t.length)
                    for (q = k; 0 < q; q--)
                      if (((f = t[q] - t[q - 1]), !p || f < p)) p = f;
                }),
                (this.minRange = Math.min(
                  5 * p,
                  this.dataMax - this.dataMin
                ))));
          if (d - a < this.minRange) {
            e = this.dataMax - this.dataMin >= this.minRange;
            h = this.minRange;
            var x = (h - d + a) / 2;
            x = [a - x, l(b.min, a - x)];
            e &&
              (x[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            a = r(x);
            d = [a + h, l(b.max, a + h)];
            e && (d[2] = c ? c.log2lin(this.dataMax) : this.dataMax);
            d = m(d);
            d - a < h && ((x[0] = d - h), (x[1] = l(b.min, d - h)), (a = r(x)));
          }
          this.min = a;
          this.max = d;
        }
        getClosest() {
          let b;
          this.categories
            ? (b = 1)
            : this.series.forEach(function (c) {
                const a = c.closestPointRange,
                  d = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                !c.noSharedTooltip &&
                  g(a) &&
                  d &&
                  (b = g(b) ? Math.min(b, a) : a);
              });
          return b;
        }
        nameToX(b) {
          const c = d(this.options.categories),
            a = c ? this.categories : this.names;
          let e = b.options.x,
            p;
          b.series.requireSorting = !1;
          g(e) ||
            (e =
              this.options.uniqueNames && a
                ? c
                  ? a.indexOf(b.name)
                  : l(a.keys[b.name], -1)
                : b.series.autoIncrement());
          -1 === e ? !c && a && (p = a.length) : (p = e);
          "undefined" !== typeof p
            ? ((this.names[p] = b.name), (this.names.keys[b.name] = p))
            : b.x && (p = b.x);
          return p;
        }
        updateNames() {
          const b = this,
            c = this.names;
          0 < c.length &&
            (Object.keys(c.keys).forEach(function (b) {
              delete c.keys[b];
            }),
            (c.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (c) {
              c.xIncrement = null;
              if (!c.points || c.isDirtyData)
                (b.max = Math.max(b.max, c.xData.length - 1)),
                  c.processData(),
                  c.generatePoints();
              c.data.forEach(function (a, d) {
                let l;
                a &&
                  a.options &&
                  "undefined" !== typeof a.name &&
                  ((l = b.nameToX(a)),
                  "undefined" !== typeof l &&
                    l !== a.x &&
                    ((a.x = l), (c.xData[d] = l)));
              });
            }));
        }
        setAxisTranslation() {
          const b = this,
            c = b.max - b.min;
          var a = b.linkedParent;
          const d = !!b.categories,
            e = b.isXAxis;
          let p = b.axisPointRange || 0,
            q,
            g = 0,
            f = 0,
            k = b.transA;
          if (e || d || p)
            (q = b.getClosest()),
              a
                ? ((g = a.minPointOffset), (f = a.pointRangePadding))
                : b.series.forEach(function (c) {
                    const a = d
                        ? 1
                        : e
                        ? l(c.options.pointRange, q, 0)
                        : b.axisPointRange || 0,
                      D = c.options.pointPlacement;
                    p = Math.max(p, a);
                    if (!b.single || d)
                      (c = c.is("xrange") ? !e : e),
                        (g = Math.max(g, c && x(D) ? 0 : a / 2)),
                        (f = Math.max(f, c && "on" === D ? 0 : a));
                  }),
              (a = b.ordinal && b.ordinal.slope && q ? b.ordinal.slope / q : 1),
              (b.minPointOffset = g *= a),
              (b.pointRangePadding = f *= a),
              (b.pointRange = Math.min(p, b.single && d ? 1 : c)),
              e && (b.closestPointRange = q);
          b.translationSlope =
            b.transA =
            k =
              b.staticScale || b.len / (c + f || 1);
          b.transB = b.horiz ? b.left : b.bottom;
          b.minPixelPadding = k * g;
          t(this, "afterSetAxisTranslation");
        }
        minFromRange() {
          return this.max - this.range;
        }
        setTickInterval(b) {
          var c = this.chart;
          const a = this.logarithmic,
            d = this.options,
            e = this.isXAxis,
            p = this.isLinked,
            f = d.tickPixelInterval,
            h = this.categories,
            G = this.softThreshold;
          let m = d.maxPadding,
            x = d.minPadding;
          let r =
              q(d.tickInterval) && 0 <= d.tickInterval
                ? d.tickInterval
                : void 0,
            n = q(this.threshold) ? this.threshold : null,
            L,
            N,
            O;
          this.dateTime || h || p || this.getTickAmount();
          N = l(this.userMin, d.min);
          O = l(this.userMax, d.max);
          if (p) {
            this.linkedParent = c[this.coll][d.linkedTo];
            var v = this.linkedParent.getExtremes();
            this.min = l(v.min, v.dataMin);
            this.max = l(v.max, v.dataMax);
            d.type !== this.linkedParent.options.type && z(11, 1, c);
          } else
            G &&
              g(n) &&
              (this.dataMin >= n
                ? ((v = n), (x = 0))
                : this.dataMax <= n && ((L = n), (m = 0))),
              (this.min = l(N, v, this.dataMin)),
              (this.max = l(O, L, this.dataMax));
          a &&
            (this.positiveValuesOnly &&
              !b &&
              0 >= Math.min(this.min, l(this.dataMin, this.min)) &&
              z(10, 1, c),
            (this.min = k(a.log2lin(this.min), 16)),
            (this.max = k(a.log2lin(this.max), 16)));
          this.range &&
            g(this.max) &&
            ((this.userMin =
              this.min =
              N =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = O = this.max),
            (this.range = null));
          t(this, "foundExtremes");
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !(
            h ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            p
          ) &&
            g(this.min) &&
            g(this.max) &&
            (c = this.max - this.min) &&
            (!g(N) && x && (this.min -= c * x),
            !g(O) && m && (this.max += c * m));
          q(this.userMin) ||
            (q(d.softMin) && d.softMin < this.min && (this.min = N = d.softMin),
            q(d.floor) && (this.min = Math.max(this.min, d.floor)));
          q(this.userMax) ||
            (q(d.softMax) && d.softMax > this.max && (this.max = O = d.softMax),
            q(d.ceiling) && (this.max = Math.min(this.max, d.ceiling)));
          G &&
            g(this.dataMin) &&
            ((n = n || 0),
            !g(N) && this.min < n && this.dataMin >= n
              ? (this.min = this.options.minRange
                  ? Math.min(n, this.max - this.minRange)
                  : n)
              : !g(O) &&
                this.max > n &&
                this.dataMax <= n &&
                (this.max = this.options.minRange
                  ? Math.max(n, this.min + this.minRange)
                  : n));
          q(this.min) &&
            q(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (g(this.options.min)
              ? (this.max = this.min)
              : g(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            "undefined" === typeof this.min ||
            "undefined" === typeof this.max
              ? 1
              : p &&
                this.linkedParent &&
                !r &&
                f === this.linkedParent.options.tickPixelInterval
              ? (r = this.linkedParent.tickInterval)
              : l(
                  r,
                  this.tickAmount
                    ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                    : void 0,
                  h ? 1 : ((this.max - this.min) * f) / Math.max(this.len, f)
                );
          if (e && !b) {
            const b =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (c) {
              c.forceCrop = c.forceCropping && c.forceCropping();
              c.processData(b);
            });
            t(this, "postProcessData", { hasExtremesChanged: b });
          }
          this.setAxisTranslation();
          t(this, "initialAxisTranslation");
          this.pointRange &&
            !r &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          b = l(
            d.minTickInterval,
            this.dateTime && !this.series.some((b) => b.noSharedTooltip)
              ? this.closestPointRange
              : 0
          );
          !r && this.tickInterval < b && (this.tickInterval = b);
          this.dateTime ||
            this.logarithmic ||
            r ||
            (this.tickInterval = S(this, this.tickInterval));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        }
        setTickPositions() {
          var b = this.options;
          const c = b.tickPositions,
            a = b.tickPositioner;
          var d = this.getMinorTickInterval(),
            l = this.hasVerticalPanning(),
            e = "colorAxis" === this.coll;
          const p = (e || !l) && b.startOnTick;
          l = (e || !l) && b.endOnTick;
          e = [];
          let f;
          this.tickmarkOffset =
            this.categories &&
            "between" === b.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === d && this.tickInterval
              ? this.tickInterval / b.minorTicksPerMajor
              : d;
          this.single =
            this.min === this.max &&
            g(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
          if (c) e = c.slice();
          else if (q(this.min) && q(this.max)) {
            if (
              (this.ordinal && this.ordinal.positions) ||
              !(
                (this.max - this.min) / this.tickInterval >
                Math.max(2 * this.len, 200)
              )
            )
              if (this.dateTime)
                e = this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(
                    this.tickInterval,
                    b.units
                  ),
                  this.min,
                  this.max,
                  b.startOfWeek,
                  this.ordinal && this.ordinal.positions,
                  this.closestPointRange,
                  !0
                );
              else if (this.logarithmic)
                e = this.logarithmic.getLogTickPositions(
                  this.tickInterval,
                  this.min,
                  this.max
                );
              else
                for (d = b = this.tickInterval; d <= 2 * b; )
                  if (
                    ((e = this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    )),
                    this.tickAmount && e.length > this.tickAmount)
                  )
                    this.tickInterval = S(this, (d *= 1.1));
                  else break;
            else (e = [this.min, this.max]), z(19, !1, this.chart);
            e.length > this.len &&
              ((e = [e[0], e[e.length - 1]]), e[0] === e[1] && (e.length = 1));
            a &&
              ((this.tickPositions = e),
              (f = a.apply(this, [this.min, this.max])) && (e = f));
          }
          this.tickPositions = e;
          this.paddedTicks = e.slice(0);
          this.trimTicks(e, p, l);
          !this.isLinked &&
            q(this.min) &&
            q(this.max) &&
            (this.single &&
              2 > e.length &&
              !this.categories &&
              !this.series.some(
                (b) => b.is("heatmap") && "between" === b.options.pointPlacement
              ) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            c || f || this.adjustTickAmount());
          t(this, "afterSetTickPositions");
        }
        trimTicks(b, c, a) {
          const d = b[0],
            e = b[b.length - 1],
            l = (!this.isOrdinal && this.minPointOffset) || 0;
          t(this, "trimTicks");
          if (!this.isLinked) {
            if (c && -Infinity !== d) this.min = d;
            else for (; this.min - l > b[0]; ) b.shift();
            if (a) this.max = e;
            else for (; this.max + l < b[b.length - 1]; ) b.pop();
            0 === b.length &&
              g(d) &&
              !this.options.tickPositions &&
              b.push((e + d) / 2);
          }
        }
        alignToOthers() {
          const b = this,
            c = [this],
            a = b.options,
            d =
              "yAxis" === this.coll && this.chart.options.chart.alignThresholds,
            e = [];
          let l;
          b.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && a.alignTicks) ||
              d) &&
            !1 !== a.startOnTick &&
            !1 !== a.endOnTick &&
            !b.logarithmic
          ) {
            const a = (b) => {
                const { horiz: c, options: a } = b;
                return [c ? a.left : a.top, a.width, a.height, a.pane].join();
              },
              d = a(this);
            this.chart[this.coll].forEach(function (e) {
              const { series: p } = e;
              p.length &&
                p.some((b) => b.visible) &&
                e !== b &&
                a(e) === d &&
                ((l = !0), c.push(e));
            });
          }
          if (l && d) {
            c.forEach((c) => {
              c = c.getThresholdAlignment(b);
              q(c) && e.push(c);
            });
            const a =
              1 < e.length ? e.reduce((b, c) => b + c, 0) / e.length : void 0;
            c.forEach((b) => {
              b.thresholdAlignment = a;
            });
          }
          return l;
        }
        getThresholdAlignment(b) {
          (!q(this.dataMin) ||
            (this !== b &&
              this.series.some((b) => b.isDirty || b.isDirtyData))) &&
            this.getSeriesExtremes();
          if (q(this.threshold))
            return (
              (b = n(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1
              )),
              this.options.reversed && (b = 1 - b),
              b
            );
        }
        getTickAmount() {
          const b = this.options,
            c = b.tickPixelInterval;
          let a = b.tickAmount;
          !g(b.tickInterval) &&
            !a &&
            this.len < c &&
            !this.isRadial &&
            !this.logarithmic &&
            b.startOnTick &&
            b.endOnTick &&
            (a = 2);
          !a && this.alignToOthers() && (a = Math.ceil(this.len / c) + 1);
          4 > a && ((this.finalTickAmt = a), (a = 5));
          this.tickAmount = a;
        }
        adjustTickAmount() {
          const b = this,
            {
              finalTickAmt: c,
              max: a,
              min: d,
              options: e,
              tickPositions: p,
              tickAmount: f,
              thresholdAlignment: t,
            } = b,
            h = p && p.length;
          var m = l(b.threshold, b.softThreshold ? 0 : null);
          var x = b.tickInterval;
          let n;
          q(t) &&
            ((n = 0.5 > t ? Math.ceil(t * (f - 1)) : Math.floor(t * (f - 1))),
            e.reversed && (n = f - 1 - n));
          if (b.hasData() && q(d) && q(a)) {
            const l = () => {
              b.transA *= (h - 1) / (f - 1);
              b.min = e.startOnTick ? p[0] : Math.min(d, p[0]);
              b.max = e.endOnTick
                ? p[p.length - 1]
                : Math.max(a, p[p.length - 1]);
            };
            if (q(n) && q(b.threshold)) {
              for (
                ;
                p[n] !== m || p.length !== f || p[0] > d || p[p.length - 1] < a;

              ) {
                p.length = 0;
                for (p.push(b.threshold); p.length < f; )
                  void 0 === p[n] || p[n] > b.threshold
                    ? p.unshift(k(p[0] - x))
                    : p.push(k(p[p.length - 1] + x));
                if (x > 8 * b.tickInterval) break;
                x *= 2;
              }
              l();
            } else if (h < f) {
              for (; p.length < f; )
                p.length % 2 || d === m
                  ? p.push(k(p[p.length - 1] + x))
                  : p.unshift(k(p[0] - x));
              l();
            }
            if (g(c)) {
              for (x = m = p.length; x--; )
                ((3 === c && 1 === x % 2) || (2 >= c && 0 < x && x < m - 1)) &&
                  p.splice(x, 1);
              b.finalTickAmt = void 0;
            }
          }
        }
        setScale() {
          let b = !1,
            c = !1;
          this.series.forEach(function (a) {
            b = b || a.isDirtyData || a.isDirty;
            c = c || (a.xAxis && a.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          const a = this.len !== (this.old && this.old.len);
          a ||
          b ||
          c ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking &&
                (this.stacking.resetStacks(), this.stacking.buildStacks()),
              (this.forceRedraw = !1),
              this.userMinRange || (this.minRange = void 0),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  a ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          b && this.panningState && (this.panningState.isDirty = !0);
          t(this, "afterSetScale");
        }
        setExtremes(b, c, a, d, p) {
          const q = this,
            g = q.chart;
          a = l(a, !0);
          q.series.forEach(function (b) {
            delete b.kdTree;
          });
          p = e(p, { min: b, max: c });
          t(q, "setExtremes", p, function () {
            q.userMin = b;
            q.userMax = c;
            q.eventArgs = p;
            a && g.redraw(d);
          });
        }
        zoom(b, c) {
          const a = this,
            d = this.dataMin,
            e = this.dataMax,
            p = this.options,
            q = Math.min(d, l(p.min, d)),
            f = Math.max(e, l(p.max, e));
          b = { newMin: b, newMax: c };
          t(this, "zoom", b, function (b) {
            let c = b.newMin,
              l = b.newMax;
            if (c !== a.min || l !== a.max)
              a.allowZoomOutside ||
                (g(d) && (c < q && (c = q), c > f && (c = f)),
                g(e) && (l < q && (l = q), l > f && (l = f))),
                (a.displayBtn =
                  "undefined" !== typeof c || "undefined" !== typeof l),
                a.setExtremes(c, l, !1, void 0, { trigger: "zoom" });
            b.zoomed = !0;
          });
          return b.zoomed;
        }
        setAxisSize() {
          const b = this.chart;
          var c = this.options;
          const a = c.offsets || [0, 0, 0, 0],
            d = this.horiz,
            e = (this.width = Math.round(
              L(l(c.width, b.plotWidth - a[3] + a[1]), b.plotWidth)
            )),
            p = (this.height = Math.round(
              L(l(c.height, b.plotHeight - a[0] + a[2]), b.plotHeight)
            )),
            q = (this.top = Math.round(
              L(l(c.top, b.plotTop + a[0]), b.plotHeight, b.plotTop)
            ));
          c = this.left = Math.round(
            L(l(c.left, b.plotLeft + a[3]), b.plotWidth, b.plotLeft)
          );
          this.bottom = b.chartHeight - p - q;
          this.right = b.chartWidth - e - c;
          this.len = Math.max(d ? e : p, 0);
          this.pos = d ? c : q;
        }
        getExtremes() {
          const b = this.logarithmic;
          return {
            min: b ? k(b.lin2log(this.min)) : this.min,
            max: b ? k(b.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        }
        getThreshold(b) {
          var c = this.logarithmic;
          const a = c ? c.lin2log(this.min) : this.min;
          c = c ? c.lin2log(this.max) : this.max;
          null === b || -Infinity === b
            ? (b = a)
            : Infinity === b
            ? (b = c)
            : a > b
            ? (b = a)
            : c < b && (b = c);
          return this.translate(b, 0, 1, 0, 1);
        }
        autoLabelAlign(b) {
          const c = (l(b, 0) - 90 * this.side + 720) % 360;
          b = { align: "center" };
          t(this, "autoLabelAlign", b, function (b) {
            15 < c && 165 > c
              ? (b.align = "right")
              : 195 < c && 345 > c && (b.align = "left");
          });
          return b.align;
        }
        tickSize(b) {
          const c = this.options,
            a = l(
              c["tick" === b ? "tickWidth" : "minorTickWidth"],
              "tick" === b && this.isXAxis && !this.categories ? 1 : 0
            );
          let d = c["tick" === b ? "tickLength" : "minorTickLength"],
            e;
          a && d && ("inside" === c[b + "Position"] && (d = -d), (e = [d, a]));
          b = { tickSize: e };
          t(this, "afterTickSize", b);
          return b.tickSize;
        }
        labelMetrics() {
          const b = this.chart.renderer;
          var c = this.ticks;
          c = c[Object.keys(c)[0]] || {};
          return this.chart.renderer.fontMetrics(
            c.label || c.movedLabel || b.box
          );
        }
        unsquish() {
          const b = this.options.labels;
          var c = this.horiz;
          const a = this.tickInterval,
            d =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / a),
            e = b.rotation,
            p = 0.75 * this.labelMetrics().h,
            g = Math.max(this.max - this.min, 0),
            f = function (b) {
              let c = b / (d || 1);
              c = 1 < c ? Math.ceil(c) : 1;
              c * a > g &&
                Infinity !== b &&
                Infinity !== d &&
                g &&
                (c = Math.ceil(g / a));
              return k(c * a);
            };
          let t = a,
            m,
            x = Number.MAX_VALUE,
            n;
          if (c) {
            if (
              (b.staggerLines ||
                (q(e)
                  ? (n = [e])
                  : d < b.autoRotationLimit && (n = b.autoRotation)),
              n)
            ) {
              let b;
              for (const a of n)
                if (a === e || (a && -90 <= a && 90 >= a))
                  (c = f(Math.abs(p / Math.sin(h * a)))),
                    (b = c + Math.abs(a / 360)),
                    b < x && ((x = b), (m = a), (t = c));
            }
          } else t = f(p);
          this.autoRotation = n;
          this.labelRotation = l(m, q(e) ? e : 0);
          return b.step ? a : t;
        }
        getSlotWidth(b) {
          const c = this.chart,
            a = this.horiz,
            d = this.options.labels,
            e = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            l = c.margin[3];
          if (b && q(b.slotWidth)) return b.slotWidth;
          if (a && 2 > d.step)
            return d.rotation ? 0 : ((this.staggerLines || 1) * this.len) / e;
          if (!a) {
            b = d.style.width;
            if (void 0 !== b) return parseInt(String(b), 10);
            if (l) return l - c.spacing[3];
          }
          return 0.33 * c.chartWidth;
        }
        renderUnsquish() {
          const b = this.chart,
            c = b.renderer,
            a = this.tickPositions,
            d = this.ticks,
            e = this.options.labels,
            l = e.style,
            p = this.horiz,
            q = this.getSlotWidth();
          var g = Math.max(1, Math.round(q - 2 * e.padding));
          const f = {},
            t = this.labelMetrics(),
            k = l.textOverflow;
          let h,
            m,
            n = 0;
          x(e.rotation) || (f.rotation = e.rotation || 0);
          a.forEach(function (b) {
            b = d[b];
            b.movedLabel && b.replaceMovedLabel();
            b &&
              b.label &&
              b.label.textPxLength > n &&
              (n = b.label.textPxLength);
          });
          this.maxLabelLength = n;
          if (this.autoRotation)
            n > g && n > t.h
              ? (f.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (q && ((h = g), !k))
            for (m = "clip", g = a.length; !p && g--; ) {
              var r = a[g];
              if ((r = d[r].label))
                r.styles && "ellipsis" === r.styles.textOverflow
                  ? r.css({ textOverflow: "clip" })
                  : r.textPxLength > q && r.css({ width: q + "px" }),
                  r.getBBox().height > this.len / a.length - (t.h - t.f) &&
                    (r.specificTextOverflow = "ellipsis");
            }
          f.rotation &&
            ((h = n > 0.5 * b.chartHeight ? 0.33 * b.chartHeight : n),
            k || (m = "ellipsis"));
          if (
            (this.labelAlign =
              e.align || this.autoLabelAlign(this.labelRotation))
          )
            f.align = this.labelAlign;
          a.forEach(function (b) {
            const c = (b = d[b]) && b.label,
              a = l.width,
              e = {};
            c &&
              (c.attr(f),
              b.shortenLabel
                ? b.shortenLabel()
                : h &&
                  !a &&
                  "nowrap" !== l.whiteSpace &&
                  (h < c.textPxLength || "SPAN" === c.element.tagName)
                ? ((e.width = h + "px"),
                  k || (e.textOverflow = c.specificTextOverflow || m),
                  c.css(e))
                : c.styles &&
                  c.styles.width &&
                  !e.width &&
                  !a &&
                  c.css({ width: null }),
              delete c.specificTextOverflow,
              (b.rotation = f.rotation));
          }, this);
          this.tickRotCorr = c.rotCorr(
            t.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        }
        hasData() {
          return (
            this.series.some(function (b) {
              return b.hasData();
            }) ||
            (this.options.showEmpty && g(this.min) && g(this.max))
          );
        }
        addTitle(b) {
          const a = this.chart.renderer,
            d = this.horiz,
            e = this.opposite,
            l = this.options.title,
            p = this.chart.styledMode;
          let q;
          this.axisTitle ||
            ((q = l.textAlign) ||
              (q = (
                d
                  ? { low: "left", middle: "center", high: "right" }
                  : {
                      low: e ? "right" : "left",
                      middle: "center",
                      high: e ? "left" : "right",
                    }
              )[l.align]),
            (this.axisTitle = a
              .text(l.text || "", 0, 0, l.useHTML)
              .attr({ zIndex: 7, rotation: l.rotation, align: q })
              .addClass("highcharts-axis-title")),
            p || this.axisTitle.css(c(l.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          p ||
            l.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + "px" });
          this.axisTitle[b ? "show" : "hide"](b);
        }
        generateTick(b) {
          const c = this.ticks;
          c[b] ? c[b].addLabel() : (c[b] = new C(this, b));
        }
        getOffset() {
          const b = this,
            {
              chart: c,
              horiz: a,
              options: d,
              side: e,
              ticks: q,
              tickPositions: f,
              coll: k,
              axisParent: h,
            } = b,
            m = c.renderer,
            x = c.inverted && !b.isZAxis ? [1, 0, 3, 2][e] : e;
          var n = b.hasData();
          const r = d.title;
          var L = d.labels,
            N = c.axisOffset;
          const O = c.clipOffset,
            v = [-1, 1, 1, -1][e],
            W = d.className;
          let ba,
            ea = 0,
            u;
          var F = 0;
          let z = 0;
          b.showAxis = ba = n || d.showEmpty;
          b.staggerLines = (b.horiz && L.staggerLines) || void 0;
          if (!b.axisGroup) {
            const c = (b, c, a) =>
              m
                .g(b)
                .attr({ zIndex: a })
                .addClass(
                  `highcharts-${k.toLowerCase()}${c} ` +
                    (this.isRadial ? `highcharts-radial-axis${c} ` : "") +
                    (W || "")
                )
                .add(h);
            b.gridGroup = c("grid", "-grid", d.gridZIndex);
            b.axisGroup = c("axis", "", d.zIndex);
            b.labelGroup = c("axis-labels", "-labels", L.zIndex);
          }
          n || b.isLinked
            ? (f.forEach(function (c) {
                b.generateTick(c);
              }),
              b.renderUnsquish(),
              (b.reserveSpaceDefault =
                0 === e ||
                2 === e ||
                { 1: "left", 3: "right" }[e] === b.labelAlign),
              l(
                L.reserveSpace,
                "center" === b.labelAlign ? !0 : null,
                b.reserveSpaceDefault
              ) &&
                f.forEach(function (b) {
                  z = Math.max(q[b].getLabelSize(), z);
                }),
              b.staggerLines && (z *= b.staggerLines),
              (b.labelOffset = z * (b.opposite ? -1 : 1)))
            : p(q, function (b, c) {
                b.destroy();
                delete q[c];
              });
          r &&
            r.text &&
            !1 !== r.enabled &&
            (b.addTitle(ba),
            ba &&
              !1 !== r.reserveSpace &&
              ((b.titleOffset = ea =
                b.axisTitle.getBBox()[a ? "height" : "width"]),
              (u = r.offset),
              (F = g(u) ? 0 : l(r.margin, a ? 5 : 10))));
          b.renderLine();
          b.offset = v * l(d.offset, N[e] ? N[e] + (d.margin || 0) : 0);
          b.tickRotCorr = b.tickRotCorr || { x: 0, y: 0 };
          n = 0 === e ? -b.labelMetrics().h : 2 === e ? b.tickRotCorr.y : 0;
          F = Math.abs(z) + F;
          z &&
            (F =
              F -
              n +
              v *
                (a
                  ? l(L.y, b.tickRotCorr.y + v * L.distance)
                  : l(L.x, v * L.distance)));
          b.axisTitleMargin = l(u, F);
          b.getMaxLabelDimensions &&
            (b.maxLabelDimensions = b.getMaxLabelDimensions(q, f));
          "colorAxis" !== k &&
            ((L = this.tickSize("tick")),
            (N[e] = Math.max(
              N[e],
              (b.axisTitleMargin || 0) + ea + v * b.offset,
              F,
              f && f.length && L ? L[0] + v * b.offset : 0
            )),
            (N =
              !b.axisLine || d.offset
                ? 0
                : 2 * Math.floor(b.axisLine.strokeWidth() / 2)),
            (O[x] = Math.max(O[x], N)));
          t(this, "afterGetOffset");
        }
        getLinePath(b) {
          const c = this.chart,
            a = this.opposite;
          var d = this.offset;
          const e = this.horiz,
            l = this.left + (a ? this.width : 0) + d;
          d = c.chartHeight - this.bottom - (a ? this.height : 0) + d;
          a && (b *= -1);
          return c.renderer.crispLine(
            [
              ["M", e ? this.left : l, e ? d : this.top],
              [
                "L",
                e ? c.chartWidth - this.right : l,
                e ? d : c.chartHeight - this.bottom,
              ],
            ],
            b
          );
        }
        renderLine() {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        }
        getTitlePosition(b) {
          var c = this.horiz,
            a = this.left;
          const d = this.top;
          var e = this.len;
          const l = this.options.title,
            p = c ? a : d,
            q = this.opposite,
            g = this.offset,
            f = l.x,
            k = l.y,
            h = this.chart.renderer.fontMetrics(b);
          b = b ? Math.max(b.getBBox(!1, 0).height - h.h - 1, 0) : 0;
          e = {
            low: p + (c ? 0 : e),
            middle: p + e / 2,
            high: p + (c ? e : 0),
          }[l.align];
          a =
            (c ? d + this.height : a) +
            (c ? 1 : -1) * (q ? -1 : 1) * (this.axisTitleMargin || 0) +
            [-b, b, h.f, -b][this.side];
          c = {
            x: c ? e + f : a + (q ? this.width : 0) + g + f,
            y: c ? a + k - (q ? this.height : 0) + g : e + k,
          };
          t(this, "afterGetTitlePosition", { titlePosition: c });
          return c;
        }
        renderMinorTick(b, c) {
          const a = this.minorTicks;
          a[b] || (a[b] = new C(this, b, "minor"));
          c && a[b].isNew && a[b].render(null, !0);
          a[b].render(null, !1, 1);
        }
        renderTick(b, c, a) {
          const d = this.ticks;
          if (
            !this.isLinked ||
            (b >= this.min && b <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            d[b] || (d[b] = new C(this, b)),
              a && d[b].isNew && d[b].render(c, !0, -1),
              d[b].render(c);
        }
        render() {
          const b = this,
            c = b.chart,
            a = b.logarithmic,
            d = b.options,
            e = b.isLinked,
            l = b.tickPositions,
            g = b.axisTitle,
            f = b.ticks,
            k = b.minorTicks,
            h = b.alternateBands,
            m = d.stackLabels,
            x = d.alternateGridColor,
            n = b.tickmarkOffset,
            r = b.axisLine,
            L = b.showAxis,
            N = u(c.renderer.globalAnimation);
          let O, W;
          b.labelEdge.length = 0;
          b.overlap = !1;
          [f, k, h].forEach(function (b) {
            p(b, function (b) {
              b.isActive = !1;
            });
          });
          if (b.hasData() || e) {
            const e = b.chart.hasRendered && b.old && q(b.old.min);
            b.minorTickInterval &&
              !b.categories &&
              b.getMinorTickPositions().forEach(function (c) {
                b.renderMinorTick(c, e);
              });
            l.length &&
              (l.forEach(function (c, a) {
                b.renderTick(c, a, e);
              }),
              n &&
                (0 === b.min || b.single) &&
                (f[-1] || (f[-1] = new C(b, -1, null, !0)), f[-1].render(-1)));
            x &&
              l.forEach(function (d, e) {
                W = "undefined" !== typeof l[e + 1] ? l[e + 1] + n : b.max - n;
                0 === e % 2 &&
                  d < b.max &&
                  W <= b.max + (c.polar ? -n : n) &&
                  (h[d] || (h[d] = new E.PlotLineOrBand(b)),
                  (O = d + n),
                  (h[d].options = {
                    from: a ? a.lin2log(O) : O,
                    to: a ? a.lin2log(W) : W,
                    color: x,
                    className: "highcharts-alternate-grid",
                  }),
                  h[d].render(),
                  (h[d].isActive = !0));
              });
            b._addedPlotLB ||
              ((b._addedPlotLB = !0),
              (d.plotLines || [])
                .concat(d.plotBands || [])
                .forEach(function (c) {
                  b.addPlotBandOrLine(c);
                }));
          }
          [f, k, h].forEach(function (b) {
            const a = [],
              d = N.duration;
            p(b, function (b, c) {
              b.isActive || (b.render(c, !1, 0), (b.isActive = !1), a.push(c));
            });
            Z(
              function () {
                let c = a.length;
                for (; c--; )
                  b[a[c]] &&
                    !b[a[c]].isActive &&
                    (b[a[c]].destroy(), delete b[a[c]]);
              },
              b !== h && c.hasRendered && d ? d : 0
            );
          });
          r &&
            (r[r.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(r.strokeWidth()),
            }),
            (r.isPlaced = !0),
            r[L ? "show" : "hide"](L));
          g &&
            L &&
            (g[g.isNew ? "attr" : "animate"](b.getTitlePosition(g)),
            (g.isNew = !1));
          m && m.enabled && b.stacking && b.stacking.renderStackTotals();
          b.old = {
            len: b.len,
            max: b.max,
            min: b.min,
            transA: b.transA,
            userMax: b.userMax,
            userMin: b.userMin,
          };
          b.isDirty = !1;
          t(this, "afterRender");
        }
        redraw() {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (b) {
              b.render();
            }));
          this.series.forEach(function (b) {
            b.isDirty = !0;
          });
        }
        getKeepProps() {
          return this.keepProps || U.keepProps;
        }
        destroy(b) {
          const c = this,
            a = c.plotLinesAndBands,
            d = this.eventOptions;
          t(this, "destroy", { keepEvents: b });
          b || N(c);
          [c.ticks, c.minorTicks, c.alternateBands].forEach(function (b) {
            w(b);
          });
          if (a) for (b = a.length; b--; ) a[b].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (b) {
              c[b] && (c[b] = c[b].destroy());
            });
          for (const b in c.plotLinesAndBandsGroups)
            c.plotLinesAndBandsGroups[b] =
              c.plotLinesAndBandsGroups[b].destroy();
          p(c, function (b, a) {
            -1 === c.getKeepProps().indexOf(a) && delete c[a];
          });
          this.eventOptions = d;
        }
        drawCrosshair(b, c) {
          const a = this.crosshair;
          var d = l(a && a.snap, !0);
          const p = this.chart;
          let q,
            f = this.cross;
          t(this, "drawCrosshair", { e: b, point: c });
          b || (b = this.cross && this.cross.e);
          if (a && !1 !== (g(c) || !d)) {
            d
              ? g(c) &&
                (q = l(
                  "colorAxis" !== this.coll ? c.crosshairPos : null,
                  this.isXAxis ? c.plotX : this.len - c.plotY
                ))
              : (q =
                  b &&
                  (this.horiz
                    ? b.chartX - this.pos
                    : this.len - b.chartY + this.pos));
            if (g(q)) {
              var k = {
                value: c && (this.isXAxis ? c.x : l(c.stackY, c.y)),
                translatedValue: q,
              };
              p.polar &&
                e(k, {
                  isCrosshair: !0,
                  chartX: b && b.chartX,
                  chartY: b && b.chartY,
                  point: c,
                });
              k = this.getPlotLinePath(k) || null;
            }
            if (!g(k)) {
              this.hideCrosshair();
              return;
            }
            d = this.categories && !this.isRadial;
            f ||
              ((this.cross = f =
                p.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (d ? "category " : "thin ") +
                      (a.className || "")
                  )
                  .attr({ zIndex: l(a.zIndex, 2) })
                  .add()),
              p.styledMode ||
                (f
                  .attr({
                    stroke:
                      a.color ||
                      (d
                        ? H.parse("#ccd3ff").setOpacity(0.25).get()
                        : "#cccccc"),
                    "stroke-width": l(a.width, 1),
                  })
                  .css({ "pointer-events": "none" }),
                a.dashStyle && f.attr({ dashstyle: a.dashStyle })));
            f.show().attr({ d: k });
            d && !a.width && f.attr({ "stroke-width": this.transA });
            this.cross.e = b;
          } else this.hideCrosshair();
          t(this, "afterDrawCrosshair", { e: b, point: c });
        }
        hideCrosshair() {
          this.cross && this.cross.hide();
          t(this, "afterHideCrosshair");
        }
        hasVerticalPanning() {
          const b = this.chart.options.chart.panning;
          return !!(b && b.enabled && /y/.test(b.type));
        }
        update(b, a) {
          const d = this.chart;
          b = c(this.userOptions, b);
          this.destroy(!0);
          this.init(d, b);
          d.isDirtyBox = !0;
          l(a, !0) && d.redraw();
        }
        remove(b) {
          const c = this.chart,
            a = this.coll,
            d = this.series;
          let e = d.length;
          for (; e--; ) d[e] && d[e].remove(!1);
          F(c.axes, this);
          F(c[a], this);
          c[a].forEach(function (b, c) {
            b.options.index = b.userOptions.index = c;
          });
          this.destroy();
          c.isDirtyBox = !0;
          l(b, !0) && c.redraw();
        }
        setTitle(b, c) {
          this.update({ title: b }, c);
        }
        setCategories(b, c) {
          this.update({ categories: b }, c);
        }
      }
      U.defaultOptions = y.defaultXAxisOptions;
      U.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
      ("");
      return U;
    }
  );
  M(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function (a) {
    const {
      addEvent: w,
      getMagnitude: H,
      normalizeTickInterval: K,
      timeUnits: B,
    } = a;
    var E;
    (function (C) {
      function A() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function u(a) {
        "datetime" !== a.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new f(this));
      }
      const v = [];
      C.compose = function (f) {
        a.pushUnique(v, f) &&
          (f.keepProps.push("dateTime"),
          (f.prototype.getTimeTicks = A),
          w(f, "init", u));
        return f;
      };
      class f {
        constructor(a) {
          this.axis = a;
        }
        normalizeTimeTickInterval(a, f) {
          const h = f || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null],
          ];
          f = h[h.length - 1];
          let n = B[f[0]],
            k = f[1],
            g;
          for (
            g = 0;
            g < h.length &&
            !((f = h[g]),
            (n = B[f[0]]),
            (k = f[1]),
            h[g + 1] && a <= (n * k[k.length - 1] + B[h[g + 1][0]]) / 2);
            g++
          );
          n === B.year && a < 5 * n && (k = [1, 2, 5]);
          a = K(a / n, k, "year" === f[0] ? Math.max(H(a / n), 1) : 1);
          return { unitRange: n, count: a, unitName: f[0] };
        }
        getXDateFormat(a, f) {
          const { axis: h } = this,
            n = h.chart.time;
          return h.closestPointRange
            ? n.getDateFormat(
                h.closestPointRange,
                a,
                h.options.startOfWeek,
                f
              ) || n.resolveDTLFormat(f.year).main
            : n.resolveDTLFormat(f.day).main;
        }
      }
      C.Additions = f;
    })(E || (E = {}));
    return E;
  });
  M(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function (a) {
    const { addEvent: w, normalizeTickInterval: H, pick: K } = a;
    var B;
    (function (y) {
      function C(a) {
        let f = this.logarithmic;
        "logarithmic" !== a.userOptions.type
          ? (this.logarithmic = void 0)
          : f || (this.logarithmic = new v(this));
      }
      function A() {
        const a = this.logarithmic;
        a &&
          ((this.lin2val = function (f) {
            return a.lin2log(f);
          }),
          (this.val2lin = function (f) {
            return a.log2lin(f);
          }));
      }
      const u = [];
      y.compose = function (f) {
        a.pushUnique(u, f) &&
          (f.keepProps.push("logarithmic"),
          w(f, "init", C),
          w(f, "afterInit", A));
        return f;
      };
      class v {
        constructor(a) {
          this.axis = a;
        }
        getLogTickPositions(a, h, r, m) {
          const f = this.axis;
          var k = f.len,
            g = f.options;
          let v = [];
          m || (this.minorAutoInterval = void 0);
          if (0.5 <= a)
            (a = Math.round(a)), (v = f.getLinearTickPositions(a, h, r));
          else if (0.08 <= a) {
            g = Math.floor(h);
            let f, n, e, t, d;
            for (
              k =
                0.3 < a
                  ? [1, 2, 4]
                  : 0.15 < a
                  ? [1, 2, 4, 6, 8]
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              g < r + 1 && !d;
              g++
            )
              for (n = k.length, f = 0; f < n && !d; f++)
                (e = this.log2lin(this.lin2log(g) * k[f])),
                  e > h &&
                    (!m || t <= r) &&
                    "undefined" !== typeof t &&
                    v.push(t),
                  t > r && (d = !0),
                  (t = e);
          } else
            (h = this.lin2log(h)),
              (r = this.lin2log(r)),
              (a = m ? f.getMinorTickInterval() : g.tickInterval),
              (a = K(
                "auto" === a ? null : a,
                this.minorAutoInterval,
                ((g.tickPixelInterval / (m ? 5 : 1)) * (r - h)) /
                  ((m ? k / f.tickPositions.length : k) || 1)
              )),
              (a = H(a)),
              (v = f.getLinearTickPositions(a, h, r).map(this.log2lin)),
              m || (this.minorAutoInterval = a / 5);
          m || (f.tickInterval = a);
          return v;
        }
        lin2log(a) {
          return Math.pow(10, a);
        }
        log2lin(a) {
          return Math.log(a) / Math.LN10;
        }
      }
      y.Additions = v;
    })(B || (B = {}));
    return B;
  });
  M(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js",
    [a["Core/Utilities.js"]],
    function (a) {
      const { erase: w, extend: H, isNumber: K } = a;
      var B;
      (function (y) {
        function C(a) {
          return this.addPlotBandOrLine(a, "plotBands");
        }
        function A(a, f) {
          const g = this.userOptions;
          let k = new n(this, a);
          this.visible && (k = k.render());
          if (k) {
            this._addedPlotLB ||
              ((this._addedPlotLB = !0),
              (g.plotLines || []).concat(g.plotBands || []).forEach((a) => {
                this.addPlotBandOrLine(a);
              }));
            if (f) {
              const k = g[f] || [];
              k.push(a);
              g[f] = k;
            }
            this.plotLinesAndBands.push(k);
          }
          return k;
        }
        function u(a) {
          return this.addPlotBandOrLine(a, "plotLines");
        }
        function v(a, f, h = this.options) {
          const g = this.getPlotLinePath({
              value: f,
              force: !0,
              acrossPanes: h.acrossPanes,
            }),
            k = [],
            e = this.horiz;
          f =
            !K(this.min) ||
            !K(this.max) ||
            (a < this.min && f < this.min) ||
            (a > this.max && f > this.max);
          a = this.getPlotLinePath({
            value: a,
            force: !0,
            acrossPanes: h.acrossPanes,
          });
          h = 1;
          let t;
          if (a && g)
            for (
              f && ((t = a.toString() === g.toString()), (h = 0)), f = 0;
              f < a.length;
              f += 2
            ) {
              const d = a[f],
                q = a[f + 1],
                x = g[f],
                c = g[f + 1];
              ("M" !== d[0] && "L" !== d[0]) ||
                ("M" !== q[0] && "L" !== q[0]) ||
                ("M" !== x[0] && "L" !== x[0]) ||
                ("M" !== c[0] && "L" !== c[0]) ||
                (e && x[1] === d[1]
                  ? ((x[1] += h), (c[1] += h))
                  : e || x[2] !== d[2] || ((x[2] += h), (c[2] += h)),
                k.push(
                  ["M", d[1], d[2]],
                  ["L", q[1], q[2]],
                  ["L", c[1], c[2]],
                  ["L", x[1], x[2]],
                  ["Z"]
                ));
              k.isFlat = t;
            }
          return k;
        }
        function f(a) {
          this.removePlotBandOrLine(a);
        }
        function h(a) {
          const f = this.plotLinesAndBands,
            k = this.options,
            h = this.userOptions;
          if (f) {
            let g = f.length;
            for (; g--; ) f[g].id === a && f[g].destroy();
            [
              k.plotLines || [],
              h.plotLines || [],
              k.plotBands || [],
              h.plotBands || [],
            ].forEach(function (e) {
              for (g = e.length; g--; ) (e[g] || {}).id === a && w(e, e[g]);
            });
          }
        }
        function r(a) {
          this.removePlotBandOrLine(a);
        }
        const m = [];
        let n;
        y.compose = function (k, g) {
          n || (n = k);
          a.pushUnique(m, g) &&
            H(g.prototype, {
              addPlotBand: C,
              addPlotLine: u,
              addPlotBandOrLine: A,
              getPlotBandPath: v,
              removePlotBand: f,
              removePlotLine: r,
              removePlotBandOrLine: h,
            });
          return g;
        };
      })(B || (B = {}));
      return B;
    }
  );
  M(
    a,
    "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
    [
      a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y) {
      const {
        arrayMax: w,
        arrayMin: K,
        defined: B,
        destroyObjectProperties: E,
        erase: C,
        fireEvent: A,
        merge: u,
        objectEach: v,
        pick: f,
      } = y;
      class h {
        static compose(f) {
          return a.compose(h, f);
        }
        constructor(a, f) {
          this.axis = a;
          f && ((this.options = f), (this.id = f.id));
        }
        render() {
          A(this, "render");
          const a = this,
            h = a.axis,
            n = h.horiz;
          var k = h.logarithmic;
          const g = a.options,
            w = g.color,
            F = f(g.zIndex, 0),
            z = g.events,
            e = {},
            t = h.chart.renderer;
          let d = g.label,
            q = a.label,
            x = g.to,
            c = g.from,
            b = g.value,
            p = a.svgElem;
          var l = [];
          const L = B(c) && B(x);
          l = B(b);
          const N = !p,
            O = {
              class:
                "highcharts-plot-" +
                (L ? "band " : "line ") +
                (g.className || ""),
            };
          let Z = L ? "bands" : "lines";
          k && ((c = k.log2lin(c)), (x = k.log2lin(x)), (b = k.log2lin(b)));
          h.chart.styledMode ||
            (l
              ? ((O.stroke = w || "#999999"),
                (O["stroke-width"] = f(g.width, 1)),
                g.dashStyle && (O.dashstyle = g.dashStyle))
              : L &&
                ((O.fill = w || "#e6e9ff"),
                g.borderWidth &&
                  ((O.stroke = g.borderColor),
                  (O["stroke-width"] = g.borderWidth))));
          e.zIndex = F;
          Z += "-" + F;
          (k = h.plotLinesAndBandsGroups[Z]) ||
            (h.plotLinesAndBandsGroups[Z] = k =
              t
                .g("plot-" + Z)
                .attr(e)
                .add());
          N && (a.svgElem = p = t.path().attr(O).add(k));
          if (l)
            l = h.getPlotLinePath({
              value: b,
              lineWidth: p.strokeWidth(),
              acrossPanes: g.acrossPanes,
            });
          else if (L) l = h.getPlotBandPath(c, x, g);
          else return;
          !a.eventsAdded &&
            z &&
            (v(z, function (b, c) {
              p.on(c, function (b) {
                z[c].apply(a, [b]);
              });
            }),
            (a.eventsAdded = !0));
          (N || !p.d) && l && l.length
            ? p.attr({ d: l })
            : p &&
              (l
                ? (p.show(), p.animate({ d: l }))
                : p.d && (p.hide(), q && (a.label = q = q.destroy())));
          d &&
          (B(d.text) || B(d.formatter)) &&
          l &&
          l.length &&
          0 < h.width &&
          0 < h.height &&
          !l.isFlat
            ? ((d = u(
                {
                  align: n && L && "center",
                  x: n ? !L && 4 : 10,
                  verticalAlign: !n && L && "middle",
                  y: n ? (L ? 16 : 10) : L ? 6 : -4,
                  rotation: n && !L && 90,
                },
                d
              )),
              this.renderLabel(d, l, L, F))
            : q && q.hide();
          return a;
        }
        renderLabel(a, f, h, k) {
          const g = this.axis;
          var m = g.chart.renderer;
          let n = this.label;
          n ||
            ((this.label = n =
              m
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    "highcharts-plot-" +
                    (h ? "band" : "line") +
                    "-label " +
                    (a.className || ""),
                  zIndex: k,
                })
                .add()),
            g.chart.styledMode ||
              n.css(
                u({ fontSize: "0.8em", textOverflow: "ellipsis" }, a.style)
              ));
          k = f.xBounds || [f[0][1], f[1][1], h ? f[2][1] : f[0][1]];
          f = f.yBounds || [f[0][2], f[1][2], h ? f[2][2] : f[0][2]];
          h = K(k);
          m = K(f);
          n.align(a, !1, { x: h, y: m, width: w(k) - h, height: w(f) - m });
          (n.alignValue && "left" !== n.alignValue) ||
            ((a = a.clip ? g.width : g.chart.chartWidth),
            n.css({
              width:
                (90 === n.rotation
                  ? g.height - (n.alignAttr.y - g.top)
                  : a - (n.alignAttr.x - g.left)) + "px",
            }));
          n.show(!0);
        }
        getLabelText(a) {
          return B(a.formatter) ? a.formatter.call(this) : a.text;
        }
        destroy() {
          C(this.axis.plotLinesAndBands, this);
          delete this.axis;
          E(this);
        }
      }
      ("");
      ("");
      return h;
    }
  );
  M(
    a,
    "Core/Tooltip.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B) {
      const { format: w } = a,
        { doc: C } = y,
        { distribute: A } = H,
        {
          addEvent: u,
          clamp: v,
          css: f,
          discardElement: h,
          extend: r,
          fireEvent: m,
          isArray: n,
          isNumber: k,
          isString: g,
          merge: I,
          pick: F,
          splat: z,
          syncTimeout: e,
        } = B;
      class t {
        constructor(a, e) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = a;
          this.init(a, e);
        }
        bodyFormatter(a) {
          return a.map(function (a) {
            const d = a.series.tooltipOptions;
            return (
              d[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter
            ).call(
              a.point,
              d[(a.point.formatPrefix || "point") + "Format"] || ""
            );
          });
        }
        cleanSplit(a) {
          this.chart.series.forEach(function (d) {
            const e = d && d.tt;
            e && (!e.isActive || a ? (d.tt = e.destroy()) : (e.isActive = !1));
          });
        }
        defaultFormatter(a) {
          const d = this.points || z(this);
          let e;
          e = [a.tooltipFooterHeaderFormatter(d[0])];
          e = e.concat(a.bodyFormatter(d));
          e.push(a.tooltipFooterHeaderFormatter(d[0], !0));
          return e;
        }
        destroy() {
          this.label && (this.label = this.label.destroy());
          this.split &&
            (this.cleanSplit(!0), this.tt && (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), h(this.container));
          B.clearTimeout(this.hideTimer);
          B.clearTimeout(this.tooltipTimeout);
        }
        getAnchor(a, e) {
          var d = this.chart;
          const c = d.pointer,
            b = d.inverted,
            p = d.plotTop;
          d = d.plotLeft;
          a = z(a);
          a[0].series &&
            a[0].series.yAxis &&
            !a[0].series.yAxis.options.reversedStacks &&
            (a = a.slice().reverse());
          if (this.followPointer && e)
            "undefined" === typeof e.chartX && (e = c.normalize(e)),
              (a = [e.chartX - d, e.chartY - p]);
          else if (a[0].tooltipPos) a = a[0].tooltipPos;
          else {
            let c = 0,
              f = 0;
            a.forEach(function (b) {
              if ((b = b.pos(!0))) (c += b[0]), (f += b[1]);
            });
            c /= a.length;
            f /= a.length;
            this.shared &&
              1 < a.length &&
              e &&
              (b ? (c = e.chartX) : (f = e.chartY));
            a = [c - d, f - p];
          }
          return a.map(Math.round);
        }
        getClassName(a, e, f) {
          const c = a.series,
            b = c.options;
          return [
            this.options.className,
            "highcharts-label",
            f && "highcharts-tooltip-header",
            e ? "highcharts-tooltip-box" : "highcharts-tooltip",
            !f && "highcharts-color-" + F(a.colorIndex, c.colorIndex),
            b && b.className,
          ]
            .filter(g)
            .join(" ");
        }
        getLabel() {
          const a = this,
            e = this.chart.styledMode,
            g = this.options,
            c = this.split && this.allowShared,
            b =
              g.style.pointerEvents ||
              (this.shouldStickOnContact() ? "auto" : "none");
          let p,
            l = this.chart.renderer;
          if (this.label) {
            var h = !this.label.hasClass("highcharts-label");
            ((!c && h) || (c && !h)) && this.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              h = this.chart.options.chart.style;
              const c = K.getRendererType();
              this.container = p = y.doc.createElement("div");
              p.className = "highcharts-tooltip-container";
              f(p, {
                position: "absolute",
                top: "1px",
                pointerEvents: b,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((h && h.zIndex) || 0) + 3
                ),
              });
              y.doc.body.appendChild(p);
              this.renderer = l = new c(
                p,
                0,
                0,
                h,
                void 0,
                void 0,
                l.styledMode
              );
            }
            c
              ? (this.label = l.g("tooltip"))
              : ((this.label = l
                  .label(
                    "",
                    0,
                    0,
                    g.shape,
                    void 0,
                    void 0,
                    g.useHTML,
                    void 0,
                    "tooltip"
                  )
                  .attr({ padding: g.padding, r: g.borderRadius })),
                e ||
                  this.label
                    .attr({
                      fill: g.backgroundColor,
                      "stroke-width": g.borderWidth || 0,
                    })
                    .css(g.style)
                    .css({ pointerEvents: b }));
            if (a.outside) {
              const b = this.label,
                { xSetter: c, ySetter: d } = b;
              b.xSetter = function (d) {
                c.call(b, a.distance);
                p.style.left = d + "px";
              };
              b.ySetter = function (c) {
                d.call(b, a.distance);
                p.style.top = c + "px";
              };
            }
            this.label.attr({ zIndex: 8 }).shadow(g.shadow).add();
          }
          return this.label;
        }
        getPlayingField() {
          const { body: a, documentElement: e } = C,
            { chart: f, distance: c, outside: b } = this;
          return {
            width: b
              ? Math.max(
                  a.scrollWidth,
                  e.scrollWidth,
                  a.offsetWidth,
                  e.offsetWidth,
                  e.clientWidth
                ) -
                2 * c
              : f.chartWidth,
            height: b
              ? Math.max(
                  a.scrollHeight,
                  e.scrollHeight,
                  a.offsetHeight,
                  e.offsetHeight,
                  e.clientHeight
                )
              : f.chartHeight,
          };
        }
        getPosition(a, e, f) {
          const c = this.chart,
            b = this.distance,
            d = {},
            l = (c.inverted && f.h) || 0,
            q = this.outside;
          var g = this.getPlayingField();
          const h = g.width,
            t = g.height,
            k = c.pointer.getChartPosition();
          g = (d) => {
            const l = "x" === d;
            return [d, l ? h : t, l ? a : e].concat(
              q
                ? [
                    l ? a * k.scaleX : e * k.scaleY,
                    l
                      ? k.left - b + (f.plotX + c.plotLeft) * k.scaleX
                      : k.top - b + (f.plotY + c.plotTop) * k.scaleY,
                    0,
                    l ? h : t,
                  ]
                : [
                    l ? a : e,
                    l ? f.plotX + c.plotLeft : f.plotY + c.plotTop,
                    l ? c.plotLeft : c.plotTop,
                    l ? c.plotLeft + c.plotWidth : c.plotTop + c.plotHeight,
                  ]
            );
          };
          let m = g("y"),
            x = g("x"),
            n;
          g = !!f.negative;
          !c.polar &&
            c.hoverSeries &&
            c.hoverSeries.yAxis &&
            c.hoverSeries.yAxis.reversed &&
            (g = !g);
          const r = !this.followPointer && F(f.ttBelow, !c.inverted === g),
            v = function (c, a, e, p, f, g, h) {
              const t = q ? ("y" === c ? b * k.scaleY : b * k.scaleX) : b,
                m = (e - p) / 2,
                D = p < f - b,
                x = f + b + p < a,
                n = f - t - e + m;
              f = f + t - m;
              if (r && x) d[c] = f;
              else if (!r && D) d[c] = n;
              else if (D) d[c] = Math.min(h - p, 0 > n - l ? n : n - l);
              else if (x) d[c] = Math.max(g, f + l + e > a ? f : f + l);
              else return !1;
            },
            u = function (c, a, e, l, p) {
              let f;
              p < b || p > a - b
                ? (f = !1)
                : (d[c] =
                    p < e / 2 ? 1 : p > a - l / 2 ? a - l - 2 : p - e / 2);
              return f;
            },
            D = function (b) {
              const c = m;
              m = x;
              x = c;
              n = b;
            },
            P = function () {
              !1 !== v.apply(0, m)
                ? !1 !== u.apply(0, x) || n || (D(!0), P())
                : n
                ? (d.x = d.y = 0)
                : (D(!0), P());
            };
          (c.inverted || 1 < this.len) && D();
          P();
          return d;
        }
        hide(a) {
          const d = this;
          B.clearTimeout(this.hideTimer);
          a = F(a, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = e(function () {
              d.getLabel().fadeOut(a ? void 0 : a);
              d.isHidden = !0;
            }, a));
        }
        init(a, e) {
          this.chart = a;
          this.options = e;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = e.split && !a.inverted && !a.polar;
          this.shared = e.shared || this.split;
          this.outside = F(
            e.outside,
            !(!a.scrollablePixelsX && !a.scrollablePixelsY)
          );
        }
        shouldStickOnContact(a) {
          return !(
            this.followPointer ||
            !this.options.stickOnContact ||
            (a && !this.chart.pointer.inClass(a.target, "highcharts-tooltip"))
          );
        }
        move(a, e, f, c) {
          const b = this,
            d = b.now,
            l =
              !1 !== b.options.animation &&
              !b.isHidden &&
              (1 < Math.abs(a - d.x) || 1 < Math.abs(e - d.y)),
            g = b.followPointer || 1 < b.len;
          r(d, {
            x: l ? (2 * d.x + a) / 3 : a,
            y: l ? (d.y + e) / 2 : e,
            anchorX: g ? void 0 : l ? (2 * d.anchorX + f) / 3 : f,
            anchorY: g ? void 0 : l ? (d.anchorY + c) / 2 : c,
          });
          b.getLabel().attr(d);
          b.drawTracker();
          l &&
            (B.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              b && b.move(a, e, f, c);
            }, 32)));
        }
        refresh(a, e) {
          const d = this.chart,
            c = this.options,
            b = d.pointer,
            p = z(a),
            l = p[0],
            f = [];
          var g = c.formatter || this.defaultFormatter,
            q = this.shared;
          const h = d.styledMode;
          let t = {};
          if (c.enabled && l.series) {
            B.clearTimeout(this.hideTimer);
            this.allowShared = !(!n(a) && a.series && a.series.noSharedTooltip);
            this.followPointer =
              !this.split && l.series.tooltipOptions.followPointer;
            a = this.getAnchor(a, e);
            var k = a[0],
              r = a[1];
            q && this.allowShared
              ? (b.applyInactiveState(p),
                p.forEach(function (b) {
                  b.setState("hover");
                  f.push(b.getLabelConfig());
                }),
                (t = { x: l.category, y: l.y }),
                (t.points = f))
              : (t = l.getLabelConfig());
            this.len = f.length;
            g = g.call(t, this);
            q = l.series;
            this.distance = F(q.tooltipOptions.distance, 16);
            if (!1 === g) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(g, p);
              else {
                let f = k,
                  t = r;
                e &&
                  b.isDirectTouch &&
                  ((f = e.chartX - d.plotLeft), (t = e.chartY - d.plotTop));
                if (
                  d.polar ||
                  !1 === q.options.clip ||
                  p.some(
                    (c) => b.isDirectTouch || c.series.shouldShowTooltip(f, t)
                  )
                )
                  (e = this.getLabel()),
                    (c.style.width && !h) ||
                      e.css({
                        width:
                          (this.outside ? this.getPlayingField() : d.spacingBox)
                            .width + "px",
                      }),
                    e.attr({ text: g && g.join ? g.join("") : g }),
                    e.addClass(this.getClassName(l), !0),
                    h ||
                      e.attr({
                        stroke:
                          c.borderColor || l.color || q.color || "#666666",
                      }),
                    this.updatePosition({
                      plotX: k,
                      plotY: r,
                      negative: l.negative,
                      ttBelow: l.ttBelow,
                      h: a[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            m(this, "refresh");
          }
        }
        renderSplit(a, e) {
          function d(b, a, d, e, l = !0) {
            d
              ? ((a = R ? 0 : B),
                (b = v(b - e / 2, P.left, P.right - e - (c.outside ? V : 0))))
              : ((a -= y),
                (b = l ? b - e - w : b + w),
                (b = v(b, l ? b : P.left, P.right)));
            return { x: b, y: a };
          }
          const c = this,
            {
              chart: b,
              chart: {
                chartWidth: p,
                chartHeight: l,
                plotHeight: f,
                plotLeft: q,
                plotTop: h,
                pointer: t,
                scrollablePixelsY: k = 0,
                scrollablePixelsX: m,
                scrollingContainer: { scrollLeft: n, scrollTop: u } = {
                  scrollLeft: 0,
                  scrollTop: 0,
                },
                styledMode: z,
              },
              distance: w,
              options: I,
              options: { positioner: D },
            } = c,
            P =
              c.outside && "number" !== typeof m
                ? C.documentElement.getBoundingClientRect()
                : { left: n, right: n + p, top: u, bottom: u + l },
            J = c.getLabel(),
            X = this.renderer || b.renderer,
            R = !(!b.xAxis[0] || !b.xAxis[0].opposite),
            { left: V, top: ha } = t.getChartPosition();
          let y = h + u,
            ca = 0,
            B = f - k;
          g(a) && (a = [!1, a]);
          a = a.slice(0, e.length + 1).reduce(function (b, a, l) {
            if (!1 !== a && "" !== a) {
              l = e[l - 1] || {
                isHeader: !0,
                plotX: e[0].plotX,
                plotY: f,
                series: {},
              };
              const n = l.isHeader;
              var p = n ? c : l.series,
                g;
              {
                var t = l;
                a = a.toString();
                var k = p.tt;
                const { isHeader: b, series: d } = t;
                k ||
                  ((k = { padding: I.padding, r: I.borderRadius }),
                  z ||
                    ((k.fill = I.backgroundColor),
                    (k["stroke-width"] =
                      null !== (g = I.borderWidth) && void 0 !== g ? g : 1)),
                  (k = X.label(
                    "",
                    0,
                    0,
                    I[b ? "headerShape" : "shape"],
                    void 0,
                    void 0,
                    I.useHTML
                  )
                    .addClass(c.getClassName(t, !0, b))
                    .attr(k)
                    .add(J)));
                k.isActive = !0;
                k.attr({ text: a });
                z ||
                  k
                    .css(I.style)
                    .attr({
                      stroke: I.borderColor || t.color || d.color || "#333333",
                    });
                g = k;
              }
              g = p.tt = g;
              t = g.getBBox();
              p = t.width + g.strokeWidth();
              n && ((ca = t.height), (B += ca), R && (y -= ca));
              {
                const {
                  isHeader: b,
                  plotX: c = 0,
                  plotY: d = 0,
                  series: e,
                } = l;
                if (b) {
                  a = q + c;
                  var m = h + f / 2;
                } else {
                  const { xAxis: b, yAxis: l } = e;
                  a = b.pos + v(c, -w, b.len + w);
                  e.shouldShowTooltip(0, l.pos - h + d, { ignoreX: !0 }) &&
                    (m = l.pos + d);
                }
                a = v(a, P.left - w, P.right + w);
                m = { anchorX: a, anchorY: m };
              }
              const { anchorX: x, anchorY: r } = m;
              "number" === typeof r
                ? ((m = t.height + 1),
                  (t = D ? D.call(c, p, m, l) : d(x, r, n, p)),
                  b.push({
                    align: D ? 0 : void 0,
                    anchorX: x,
                    anchorY: r,
                    boxWidth: p,
                    point: l,
                    rank: F(t.rank, n ? 1 : 0),
                    size: m,
                    target: t.y,
                    tt: g,
                    x: t.x,
                  }))
                : (g.isActive = !1);
            }
            return b;
          }, []);
          !D &&
            a.some((b) => {
              var { outside: a } = c;
              a = (a ? V : 0) + b.anchorX;
              return a < P.left && a + b.boxWidth < P.right
                ? !0
                : a < V - P.left + b.boxWidth && P.right - a > a;
            }) &&
            (a = a.map((b) => {
              const { x: c, y: a } = d(
                b.anchorX,
                b.anchorY,
                b.point.isHeader,
                b.boxWidth,
                !1
              );
              return r(b, { target: a, x: c });
            }));
          c.cleanSplit();
          A(a, B);
          var E = V,
            H = V;
          a.forEach(function (b) {
            const { x: a, boxWidth: d, isHeader: e } = b;
            e ||
              (c.outside && V + a < E && (E = V + a),
              !e && c.outside && E + d > H && (H = V + a));
          });
          a.forEach(function (b) {
            const {
                x: a,
                anchorX: d,
                anchorY: e,
                pos: l,
                point: { isHeader: p },
              } = b,
              f = {
                visibility: "undefined" === typeof l ? "hidden" : "inherit",
                x: a,
                y: (l || 0) + y,
                anchorX: d,
                anchorY: e,
              };
            if (c.outside && a < d) {
              const b = V - E;
              0 < b &&
                (p || ((f.x = a + b), (f.anchorX = d + b)),
                p && ((f.x = (H - E) / 2), (f.anchorX = d + b)));
            }
            b.tt.attr(f);
          });
          const { container: W, outside: ba, renderer: ea } = c;
          if (ba && W && ea) {
            const { width: b, height: c, x: a, y: d } = J.getBBox();
            ea.setSize(b + a, c + d, !1);
            W.style.left = E + "px";
            W.style.top = ha + "px";
          }
        }
        drawTracker() {
          if (this.shouldStickOnContact()) {
            var a = this.chart,
              e = this.label,
              f = this.shared ? a.hoverPoints : a.hoverPoint;
            if (e && f) {
              var c = { x: 0, y: 0, width: 0, height: 0 };
              f = this.getAnchor(f);
              var b = e.getBBox();
              f[0] += a.plotLeft - e.translateX;
              f[1] += a.plotTop - e.translateY;
              c.x = Math.min(0, f[0]);
              c.y = Math.min(0, f[1]);
              c.width =
                0 > f[0]
                  ? Math.max(Math.abs(f[0]), b.width - f[0])
                  : Math.max(Math.abs(f[0]), b.width);
              c.height =
                0 > f[1]
                  ? Math.max(Math.abs(f[1]), b.height - Math.abs(f[1]))
                  : Math.max(Math.abs(f[1]), b.height);
              this.tracker
                ? this.tracker.attr(c)
                : ((this.tracker = e.renderer
                    .rect(c)
                    .addClass("highcharts-tracker")
                    .add(e)),
                  a.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
            }
          } else this.tracker && (this.tracker = this.tracker.destroy());
        }
        styledModeFormat(a) {
          return a
            .replace('style="font-size: 0.8em"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"'
            );
        }
        tooltipFooterHeaderFormatter(a, e) {
          const d = a.series,
            c = d.tooltipOptions;
          var b = d.xAxis;
          const p = b && b.dateTime;
          b = { isFooter: e, labelConfig: a };
          let l = c.xDateFormat,
            f = c[e ? "footerFormat" : "headerFormat"];
          m(this, "headerFormatter", b, function (b) {
            p &&
              !l &&
              k(a.key) &&
              (l = p.getXDateFormat(a.key, c.dateTimeLabelFormats));
            p &&
              l &&
              ((a.point && a.point.tooltipDateKeys) || ["key"]).forEach(
                function (b) {
                  f = f.replace(
                    "{point." + b + "}",
                    "{point." + b + ":" + l + "}"
                  );
                }
              );
            d.chart.styledMode && (f = this.styledModeFormat(f));
            b.text = w(f, { point: a, series: d }, this.chart);
          });
          return b.text;
        }
        update(a) {
          this.destroy();
          I(!0, this.chart.options.tooltip.userOptions, a);
          this.init(this.chart, I(!0, this.options, a));
        }
        updatePosition(a) {
          const { chart: d, distance: e, options: c } = this;
          var b = d.pointer;
          const p = this.getLabel(),
            { left: l, top: g, scaleX: t, scaleY: h } = b.getChartPosition();
          b = (c.positioner || this.getPosition).call(
            this,
            p.width,
            p.height,
            a
          );
          let k = (a.plotX || 0) + d.plotLeft;
          a = (a.plotY || 0) + d.plotTop;
          let m;
          if (this.outside) {
            c.positioner && ((b.x += l - e), (b.y += g - e));
            m = (c.borderWidth || 0) + 2 * e;
            this.renderer.setSize(p.width + m, p.height + m, !1);
            if (1 !== t || 1 !== h)
              f(this.container, { transform: `scale(${t}, ${h})` }),
                (k *= t),
                (a *= h);
            k += l - b.x;
            a += g - b.y;
          }
          this.move(Math.round(b.x), Math.round(b.y || 0), k, a);
        }
      }
      (function (a) {
        const d = [];
        a.compose = function (e) {
          B.pushUnique(d, e) &&
            u(e, "afterInit", function () {
              const c = this.chart;
              c.options.tooltip && (c.tooltip = new a(c, c.options.tooltip));
            });
        };
      })(t || (t = {}));
      ("");
      return t;
    }
  );
  M(
    a,
    "Core/Series/Point.js",
    [
      a["Core/Renderer/HTML/AST.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B) {
      const { animObject: w } = y,
        { defaultOptions: C } = H,
        { format: A } = K,
        {
          addEvent: u,
          defined: v,
          erase: f,
          extend: h,
          fireEvent: r,
          getNestedProperty: m,
          isArray: n,
          isFunction: k,
          isNumber: g,
          isObject: I,
          merge: F,
          objectEach: z,
          pick: e,
          syncTimeout: t,
          removeEvent: d,
          uniqueKey: q,
        } = B;
      class x {
        constructor() {
          this.category = void 0;
          this.destroyed = !1;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.shapeArgs = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        animateBeforeDestroy() {
          const a = this,
            b = { x: a.startXPos, opacity: 0 },
            d = a.getGraphicalProps();
          d.singular.forEach(function (c) {
            a[c] = a[c].animate(
              "dataLabel" === c
                ? { x: a[c].startXPos, y: a[c].startYPos, opacity: 0 }
                : b
            );
          });
          d.plural.forEach(function (b) {
            a[b].forEach(function (b) {
              b.element &&
                b.animate(
                  h(
                    { x: a.startXPos },
                    b.startYPos ? { x: b.startXPos, y: b.startYPos } : {}
                  )
                );
            });
          });
        }
        applyOptions(a, b) {
          const c = this.series,
            d = c.options.pointValKey || c.pointValKey;
          a = x.prototype.optionsToObject.call(this, a);
          h(this, a);
          this.options = this.options ? h(this.options, a) : a;
          a.group && delete this.group;
          a.dataLabels && delete this.dataLabels;
          d && (this.y = x.prototype.getNestedProperty.call(this, d));
          this.formatPrefix = (this.isNull = this.isValid && !this.isValid())
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof b &&
            c.xAxis &&
            c.xAxis.hasNames &&
            (this.x = c.xAxis.nameToX(this));
          "undefined" === typeof this.x && c
            ? (this.x = "undefined" === typeof b ? c.autoIncrement() : b)
            : g(a.x) &&
              c.options.relativeXValue &&
              (this.x = c.autoIncrement(a.x));
          return this;
        }
        destroy() {
          if (!this.destroyed) {
            const b = this;
            var a = b.series;
            const c = a.chart;
            a = a.options.dataSorting;
            const e = c.hoverPoints,
              g = w(b.series.chart.renderer.globalAnimation),
              q = () => {
                if (b.graphic || b.graphics || b.dataLabel || b.dataLabels)
                  d(b), b.destroyElements();
                for (const a in b) delete b[a];
              };
            b.legendItem && c.legend.destroyItem(b);
            e && (b.setState(), f(e, b), e.length || (c.hoverPoints = null));
            if (b === c.hoverPoint) b.onMouseOut();
            a && a.enabled
              ? (this.animateBeforeDestroy(), t(q, g.duration))
              : q();
            c.pointCount--;
          }
          this.destroyed = !0;
        }
        destroyElements(a) {
          const b = this;
          a = b.getGraphicalProps(a);
          a.singular.forEach(function (a) {
            b[a] = b[a].destroy();
          });
          a.plural.forEach(function (a) {
            b[a].forEach(function (b) {
              b && b.element && b.destroy();
            });
            delete b[a];
          });
        }
        firePointEvent(a, b, d) {
          const c = this,
            e = this.series.options;
          (e.point.events[a] ||
            (c.options && c.options.events && c.options.events[a])) &&
            c.importEvents();
          "click" === a &&
            e.allowPointSelect &&
            (d = function (b) {
              c.select && c.select(null, b.ctrlKey || b.metaKey || b.shiftKey);
            });
          r(c, a, b, d);
        }
        getClassName() {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        }
        getGraphicalProps(a) {
          const b = this,
            c = [],
            d = { singular: [], plural: [] };
          let e, f;
          a = a || { graphic: 1, dataLabel: 1 };
          a.graphic && c.push("graphic");
          a.dataLabel &&
            c.push("dataLabel", "dataLabelPath", "dataLabelUpper", "connector");
          for (f = c.length; f--; ) (e = c[f]), b[e] && d.singular.push(e);
          ["graphic", "dataLabel", "connector"].forEach(function (c) {
            const e = c + "s";
            a[c] && b[e] && d.plural.push(e);
          });
          return d;
        }
        getLabelConfig() {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        }
        getNestedProperty(a) {
          if (a)
            return 0 === a.indexOf("custom.") ? m(a, this.options) : this[a];
        }
        getZone() {
          var a = this.series;
          const b = a.zones;
          a = a.zoneAxis || "y";
          let d,
            e = 0;
          for (d = b[e]; this[a] >= d.value; ) d = b[++e];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            d && d.color && !this.options.color ? d.color : this.nonZonedColor;
          return d;
        }
        hasNewShapeType() {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        }
        init(a, b, d) {
          this.series = a;
          this.applyOptions(b, d);
          this.id = v(this.id) ? this.id : q();
          this.resolveColor();
          a.chart.pointCount++;
          r(this, "afterInit");
          return this;
        }
        isValid() {
          return null !== this.x && g(this.y);
        }
        optionsToObject(a) {
          var b = this.series;
          const c = b.options.keys,
            d = c || b.pointArrayMap || ["y"],
            e = d.length;
          let f = {},
            q = 0,
            t = 0;
          if (g(a) || null === a) f[d[0]] = a;
          else if (n(a))
            for (
              !c &&
              a.length > e &&
              ((b = typeof a[0]),
              "string" === b ? (f.name = a[0]) : "number" === b && (f.x = a[0]),
              q++);
              t < e;

            )
              (c && "undefined" === typeof a[q]) ||
                (0 < d[t].indexOf(".")
                  ? x.prototype.setNestedProperty(f, a[q], d[t])
                  : (f[d[t]] = a[q])),
                q++,
                t++;
          else
            "object" === typeof a &&
              ((f = a),
              a.dataLabels && (b._hasPointLabels = !0),
              a.marker && (b._hasPointMarkers = !0));
          return f;
        }
        pos(a, b = this.plotY) {
          if (!this.destroyed) {
            const { plotX: c, series: d } = this,
              { chart: e, xAxis: f, yAxis: q } = d;
            let t = 0,
              h = 0;
            if (g(c) && g(b))
              return (
                a &&
                  ((t = f ? f.pos : e.plotLeft), (h = q ? q.pos : e.plotTop)),
                e.inverted && f && q
                  ? [q.len - b + h, f.len - c + t]
                  : [c + t, b + h]
              );
          }
        }
        resolveColor() {
          const a = this.series;
          var b = a.chart.styledMode;
          let d;
          var l = a.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          a.options.colorByPoint
            ? (b ||
                ((l = a.options.colors || a.chart.options.colors),
                (d = l[a.colorCounter]),
                (l = l.length)),
              (b = a.colorCounter),
              a.colorCounter++,
              a.colorCounter === l && (a.colorCounter = 0))
            : (b || (d = a.color), (b = a.colorIndex));
          this.colorIndex = e(this.options.colorIndex, b);
          this.color = e(this.options.color, d);
        }
        setNestedProperty(a, b, d) {
          d.split(".").reduce(function (a, c, d, e) {
            a[c] = e.length - 1 === d ? b : I(a[c], !0) ? a[c] : {};
            return a[c];
          }, a);
          return a;
        }
        shouldDraw() {
          return !this.isNull;
        }
        tooltipFormatter(a) {
          const b = this.series,
            c = b.tooltipOptions,
            d = e(c.valueDecimals, ""),
            f = c.valuePrefix || "",
            g = c.valueSuffix || "";
          b.chart.styledMode && (a = b.chart.tooltip.styledModeFormat(a));
          (b.pointArrayMap || ["y"]).forEach(function (b) {
            b = "{point." + b;
            if (f || g) a = a.replace(RegExp(b + "}", "g"), f + b + "}" + g);
            a = a.replace(RegExp(b + "}", "g"), b + ":,." + d + "f}");
          });
          return A(a, { point: this, series: this.series }, b.chart);
        }
        update(a, b, d, l) {
          function c() {
            f.applyOptions(a);
            var c = g && f.hasMockGraphic;
            c = null === f.y ? !c : c;
            g && c && ((f.graphic = g.destroy()), delete f.hasMockGraphic);
            I(a, !0) &&
              (g &&
                g.element &&
                a &&
                a.marker &&
                "undefined" !== typeof a.marker.symbol &&
                (f.graphic = g.destroy()),
              a &&
                a.dataLabels &&
                f.dataLabel &&
                (f.dataLabel = f.dataLabel.destroy()),
              f.connector && (f.connector = f.connector.destroy()));
            h = f.index;
            p.updateParallelArrays(f, h);
            t.data[h] =
              I(t.data[h], !0) || I(a, !0) ? f.options : e(a, t.data[h]);
            p.isDirty = p.isDirtyData = !0;
            !p.fixedBox && p.hasCartesianSeries && (q.isDirtyBox = !0);
            "point" === t.legendType && (q.isDirtyLegend = !0);
            b && q.redraw(d);
          }
          const f = this,
            p = f.series,
            g = f.graphic,
            q = p.chart,
            t = p.options;
          let h;
          b = e(b, !0);
          !1 === l ? c() : f.firePointEvent("update", { options: a }, c);
        }
        remove(a, b) {
          this.series.removePoint(this.series.data.indexOf(this), a, b);
        }
        select(a, b) {
          const c = this,
            d = c.series,
            f = d.chart;
          this.selectedStaging = a = e(a, !c.selected);
          c.firePointEvent(
            a ? "select" : "unselect",
            { accumulate: b },
            function () {
              c.selected = c.options.selected = a;
              d.options.data[d.data.indexOf(c)] = c.options;
              c.setState(a && "select");
              b ||
                f.getSelectedPoints().forEach(function (b) {
                  const a = b.series;
                  b.selected &&
                    b !== c &&
                    ((b.selected = b.options.selected = !1),
                    (a.options.data[a.data.indexOf(b)] = b.options),
                    b.setState(
                      f.hoverPoints && a.options.inactiveOtherPoints
                        ? "inactive"
                        : ""
                    ),
                    b.firePointEvent("unselect"));
                });
            }
          );
          delete this.selectedStaging;
        }
        onMouseOver(a) {
          const b = this.series.chart,
            c = b.pointer;
          a = a
            ? c.normalize(a)
            : c.getChartCoordinatesFromPoint(this, b.inverted);
          c.runPointActions(a, this);
        }
        onMouseOut() {
          const a = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (a.hoverPoints || []).forEach(function (b) {
              b.setState();
            });
          a.hoverPoints = a.hoverPoint = null;
        }
        importEvents() {
          if (!this.hasImportedEvents) {
            const a = this,
              b = F(a.series.options.point, a.options).events;
            a.events = b;
            z(b, function (b, c) {
              k(b) && u(a, c, b);
            });
            this.hasImportedEvents = !0;
          }
        }
        setState(c, b) {
          const d = this.series;
          var l = this.state,
            f = d.options.states[c || "normal"] || {},
            q = C.plotOptions[d.type].marker && d.options.marker;
          const t = q && !1 === q.enabled,
            k = (q && q.states && q.states[c || "normal"]) || {},
            m = !1 === k.enabled,
            n = this.marker || {},
            x = d.chart,
            v = q && d.markerAttribs;
          let u = d.halo;
          var z;
          let w;
          var D = d.stateMarkerGraphic;
          c = c || "";
          if (
            !(
              (c === this.state && !b) ||
              (this.selected && "select" !== c) ||
              !1 === f.enabled ||
              (c && (m || (t && !1 === k.enabled))) ||
              (c && n.states && n.states[c] && !1 === n.states[c].enabled)
            )
          ) {
            this.state = c;
            v && (z = d.markerAttribs(this, c));
            if (this.graphic && !this.hasMockGraphic) {
              l && this.graphic.removeClass("highcharts-point-" + l);
              c && this.graphic.addClass("highcharts-point-" + c);
              if (!x.styledMode) {
                l = d.pointAttribs(this, c);
                w = e(x.options.chart.animation, f.animation);
                const b = l.opacity;
                d.options.inactiveOtherPoints &&
                  g(b) &&
                  ((this.dataLabels || []).forEach(function (a) {
                    a &&
                      !a.hasClass("highcharts-data-label-hidden") &&
                      a.animate({ opacity: b }, w);
                  }),
                  this.connector && this.connector.animate({ opacity: b }, w));
                this.graphic.animate(l, w);
              }
              z &&
                this.graphic.animate(
                  z,
                  e(x.options.chart.animation, k.animation, q.animation)
                );
              D && D.hide();
            } else {
              if (c && k) {
                q = n.symbol || d.symbol;
                D && D.currentSymbol !== q && (D = D.destroy());
                if (z)
                  if (D) D[b ? "animate" : "attr"]({ x: z.x, y: z.y });
                  else
                    q &&
                      ((d.stateMarkerGraphic = D =
                        x.renderer
                          .symbol(q, z.x, z.y, z.width, z.height)
                          .add(d.markerGroup)),
                      (D.currentSymbol = q));
                !x.styledMode &&
                  D &&
                  "inactive" !== this.state &&
                  D.attr(d.pointAttribs(this, c));
              }
              D &&
                (D[c && this.isInside ? "show" : "hide"](),
                (D.element.point = this),
                D.addClass(this.getClassName(), !0));
            }
            f = f.halo;
            z = ((D = this.graphic || D) && D.visibility) || "inherit";
            f && f.size && D && "hidden" !== z && !this.isCluster
              ? (u || (d.halo = u = x.renderer.path().add(D.parentGroup)),
                u.show()[b ? "animate" : "attr"]({ d: this.haloPath(f.size) }),
                u.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    e(this.colorIndex, d.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: z,
                  zIndex: -1,
                }),
                (u.point = this),
                x.styledMode ||
                  u.attr(
                    h(
                      {
                        fill: this.color || d.color,
                        "fill-opacity": f.opacity,
                      },
                      a.filterUserAttributes(f.attributes || {})
                    )
                  ))
              : u &&
                u.point &&
                u.point.haloPath &&
                u.animate({ d: u.point.haloPath(0) }, null, u.hide);
            r(this, "afterSetState", { state: c });
          }
        }
        haloPath(a) {
          const b = this.pos();
          return b
            ? this.series.chart.renderer.symbols.circle(
                Math.floor(b[0]) - a,
                b[1] - a,
                2 * a,
                2 * a
              )
            : [];
        }
      }
      ("");
      return x;
    }
  );
  M(
    a,
    "Core/Pointer.js",
    [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
    function (a, y, H) {
      const { parse: w } = a,
        { charts: B, noop: E } = y,
        {
          addEvent: C,
          attr: A,
          css: u,
          defined: v,
          extend: f,
          find: h,
          fireEvent: r,
          isNumber: m,
          isObject: n,
          objectEach: k,
          offset: g,
          pick: I,
          splat: F,
        } = H;
      class z {
        constructor(a, f) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = f;
          this.init(a, f);
        }
        applyInactiveState(a) {
          let e = [],
            d;
          (a || []).forEach(function (a) {
            d = a.series;
            e.push(d);
            d.linkedParent && e.push(d.linkedParent);
            d.linkedSeries && (e = e.concat(d.linkedSeries));
            d.navigatorSeries && e.push(d.navigatorSeries);
          });
          this.chart.series.forEach(function (a) {
            -1 === e.indexOf(a)
              ? a.setState("inactive", !0)
              : a.options.inactiveOtherPoints &&
                a.setAllPointsToState("inactive");
          });
        }
        destroy() {
          const a = this;
          this.eventsToUnbind.forEach((a) => a());
          this.eventsToUnbind = [];
          y.chartCount ||
            (z.unbindDocumentMouseUp &&
              (z.unbindDocumentMouseUp = z.unbindDocumentMouseUp()),
            z.unbindDocumentTouchEnd &&
              (z.unbindDocumentTouchEnd = z.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          k(a, function (e, d) {
            a[d] = void 0;
          });
        }
        getSelectionMarkerAttrs(a, f) {
          const d = {
            args: { chartX: a, chartY: f },
            attrs: {},
            shapeType: "rect",
          };
          r(this, "getSelectionMarkerAttrs", d, (d) => {
            const {
              chart: e,
              mouseDownX: c = 0,
              mouseDownY: b = 0,
              zoomHor: p,
              zoomVert: l,
            } = this;
            d = d.attrs;
            let g;
            d.x = e.plotLeft;
            d.y = e.plotTop;
            d.width = p ? 1 : e.plotWidth;
            d.height = l ? 1 : e.plotHeight;
            p &&
              ((g = a - c),
              (d.width = Math.abs(g)),
              (d.x = (0 < g ? 0 : g) + c));
            l &&
              ((g = f - b),
              (d.height = Math.abs(g)),
              (d.y = (0 < g ? 0 : g) + b));
          });
          return d;
        }
        drag(a) {
          const e = this.chart,
            d = e.options.chart;
          var f = e.plotLeft;
          const g = e.plotTop,
            c = e.plotWidth,
            b = e.plotHeight,
            p = this.mouseDownX || 0,
            l = this.mouseDownY || 0,
            h = n(d.panning) ? d.panning && d.panning.enabled : d.panning,
            k = d.panKey && a[d.panKey + "Key"];
          let m = a.chartX,
            r = a.chartY,
            v = this.selectionMarker;
          if (!v || !v.touch)
            if (
              (m < f ? (m = f) : m > f + c && (m = f + c),
              r < g ? (r = g) : r > g + b && (r = g + b),
              (this.hasDragged = Math.sqrt(
                Math.pow(p - m, 2) + Math.pow(l - r, 2)
              )),
              10 < this.hasDragged)
            ) {
              f = e.isInsidePlot(p - f, l - g, { visiblePlotOnly: !0 });
              const { shapeType: b, attrs: c } = this.getSelectionMarkerAttrs(
                m,
                r
              );
              (!e.hasCartesianSeries && !e.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !f ||
                k ||
                v ||
                ((this.selectionMarker = v = e.renderer[b]()),
                v
                  .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                  .add(),
                e.styledMode ||
                  v.attr({
                    fill:
                      d.selectionMarkerFill ||
                      w("#334eff").setOpacity(0.25).get(),
                  }));
              v && v.attr(c);
              f && !v && h && e.pan(a, d.panning);
            }
        }
        dragStart(a) {
          const e = this.chart;
          e.mouseIsDown = a.type;
          e.cancelClick = !1;
          e.mouseDownX = this.mouseDownX = a.chartX;
          e.mouseDownY = this.mouseDownY = a.chartY;
        }
        getSelectionBox(a) {
          const e = { args: { marker: a }, result: {} };
          r(this, "getSelectionBox", e, (d) => {
            d.result = {
              x: a.attr ? +a.attr("x") : a.x,
              y: a.attr ? +a.attr("y") : a.y,
              width: a.attr ? a.attr("width") : a.width,
              height: a.attr ? a.attr("height") : a.height,
            };
          });
          return e.result;
        }
        drop(a) {
          const e = this,
            d = this.chart,
            g = this.hasPinched;
          if (this.selectionMarker) {
            const {
                x: q,
                y: c,
                width: b,
                height: p,
              } = this.getSelectionBox(this.selectionMarker),
              l = {
                originalEvent: a,
                xAxis: [],
                yAxis: [],
                x: q,
                y: c,
                width: b,
                height: p,
              };
            let h = !!d.mapView;
            if (this.hasDragged || g)
              d.axes.forEach(function (d) {
                if (
                  d.zoomEnabled &&
                  v(d.min) &&
                  (g || e[{ xAxis: "zoomX", yAxis: "zoomY" }[d.coll]]) &&
                  m(q) &&
                  m(c) &&
                  m(b) &&
                  m(p)
                ) {
                  var f = d.horiz;
                  const e = "touchend" === a.type ? d.minPixelPadding : 0,
                    g = d.toValue((f ? q : c) + e);
                  f = d.toValue((f ? q + b : c + p) - e);
                  l[d.coll].push({
                    axis: d,
                    min: Math.min(g, f),
                    max: Math.max(g, f),
                  });
                  h = !0;
                }
              }),
                h &&
                  r(d, "selection", l, function (b) {
                    d.zoom(f(b, g ? { animation: !1 } : null));
                  });
            m(d.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            g && this.scaleGroups();
          }
          d &&
            m(d.index) &&
            (u(d.container, { cursor: d._cursor }),
            (d.cancelClick = 10 < this.hasDragged),
            (d.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        }
        findNearestKDPoint(a, f, d) {
          let e;
          a.forEach(function (a) {
            var c =
              !(a.noSharedTooltip && f) &&
              0 > a.options.findNearestPointBy.indexOf("y");
            a = a.searchPoint(d, c);
            if ((c = n(a, !0) && a.series) && !(c = !n(e, !0))) {
              {
                c = e.distX - a.distX;
                const b = e.dist - a.dist,
                  d =
                    (a.series.group && a.series.group.zIndex) -
                    (e.series.group && e.series.group.zIndex);
                c =
                  0 !== c && f
                    ? c
                    : 0 !== b
                    ? b
                    : 0 !== d
                    ? d
                    : e.series.index > a.series.index
                    ? -1
                    : 1;
              }
              c = 0 < c;
            }
            c && (e = a);
          });
          return e;
        }
        getChartCoordinatesFromPoint(a, f) {
          var d = a.series;
          const e = d.xAxis;
          d = d.yAxis;
          const g = a.shapeArgs;
          if (e && d) {
            let c = I(a.clientX, a.plotX),
              b = a.plotY || 0;
            a.isNode && g && m(g.x) && m(g.y) && ((c = g.x), (b = g.y));
            return f
              ? { chartX: d.len + d.pos - b, chartY: e.len + e.pos - c }
              : { chartX: c + e.pos, chartY: b + d.pos };
          }
          if (g && g.x && g.y) return { chartX: g.x, chartY: g.y };
        }
        getChartPosition() {
          if (this.chartPosition) return this.chartPosition;
          var { container: a } = this.chart;
          const f = g(a);
          this.chartPosition = {
            left: f.left,
            top: f.top,
            scaleX: 1,
            scaleY: 1,
          };
          const d = a.offsetWidth;
          a = a.offsetHeight;
          2 < d &&
            2 < a &&
            ((this.chartPosition.scaleX = f.width / d),
            (this.chartPosition.scaleY = f.height / a));
          return this.chartPosition;
        }
        getCoordinates(a) {
          const e = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (d) {
            e[d.isXAxis ? "xAxis" : "yAxis"].push({
              axis: d,
              value: d.toValue(a[d.horiz ? "chartX" : "chartY"]),
            });
          });
          return e;
        }
        getHoverData(a, f, d, g, k, c) {
          const b = [];
          g = !(!g || !a);
          const e = function (b) {
            return (
              b.visible &&
              !(!k && b.directTouch) &&
              I(b.options.enableMouseTracking, !0)
            );
          };
          let l,
            q = {
              chartX: c ? c.chartX : void 0,
              chartY: c ? c.chartY : void 0,
              shared: k,
            };
          r(this, "beforeGetHoverData", q);
          l =
            f && !f.stickyTracking
              ? [f]
              : d.filter((b) => b.stickyTracking && (q.filter || e)(b));
          const t = g || !c ? a : this.findNearestKDPoint(l, k, c);
          f = t && t.series;
          t &&
            (k && !f.noSharedTooltip
              ? ((l = d.filter(function (b) {
                  return q.filter ? q.filter(b) : e(b) && !b.noSharedTooltip;
                })),
                l.forEach(function (a) {
                  let c = h(a.points, function (b) {
                    return b.x === t.x && !b.isNull;
                  });
                  n(c) &&
                    (a.boosted && a.boost && (c = a.boost.getPoint(c)),
                    b.push(c));
                }))
              : b.push(t));
          q = { hoverPoint: t };
          r(this, "afterGetHoverData", q);
          return { hoverPoint: q.hoverPoint, hoverSeries: f, hoverPoints: b };
        }
        getPointFromEvent(a) {
          a = a.target;
          let e;
          for (; a && !e; ) (e = a.point), (a = a.parentNode);
          return e;
        }
        onTrackerMouseOut(a) {
          a = a.relatedTarget;
          const e = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !e ||
              !a ||
              e.stickyTracking ||
              this.inClass(a, "highcharts-tooltip") ||
              (this.inClass(a, "highcharts-series-" + e.index) &&
                this.inClass(a, "highcharts-tracker"))
            )
          )
            e.onMouseOut();
        }
        inClass(a, f) {
          let d;
          for (; a; ) {
            if ((d = A(a, "class"))) {
              if (-1 !== d.indexOf(f)) return !0;
              if (-1 !== d.indexOf("highcharts-container")) return !1;
            }
            a = a.parentElement;
          }
        }
        init(a, f) {
          this.options = f;
          this.chart = a;
          this.runChartClick = !(!f.chart.events || !f.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          this.setDOMEvents();
          r(this, "afterInit");
        }
        normalize(a, g) {
          var d = a.touches,
            e = d
              ? d.length
                ? d.item(0)
                : I(d.changedTouches, a.changedTouches)[0]
              : a;
          g || (g = this.getChartPosition());
          d = e.pageX - g.left;
          e = e.pageY - g.top;
          d /= g.scaleX;
          e /= g.scaleY;
          return f(a, { chartX: Math.round(d), chartY: Math.round(e) });
        }
        onContainerClick(a) {
          const e = this.chart,
            d = e.hoverPoint;
          a = this.normalize(a);
          const g = e.plotLeft,
            h = e.plotTop;
          e.cancelClick ||
            (d && this.inClass(a.target, "highcharts-tracker")
              ? (r(d.series, "click", f(a, { point: d })),
                e.hoverPoint && d.firePointEvent("click", a))
              : (f(a, this.getCoordinates(a)),
                e.isInsidePlot(a.chartX - g, a.chartY - h, {
                  visiblePlotOnly: !0,
                }) && r(e, "click", a)));
        }
        onContainerMouseDown(a) {
          const e = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (y.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || e)
            this.zoomOption(a),
              e && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        }
        onContainerMouseLeave(a) {
          const e = B[I(z.hoverChartIndex, -1)];
          a = this.normalize(a);
          e &&
            a.relatedTarget &&
            !this.inClass(a.relatedTarget, "highcharts-tooltip") &&
            (e.pointer.reset(), (e.pointer.chartPosition = void 0));
        }
        onContainerMouseEnter(a) {
          delete this.chartPosition;
        }
        onContainerMouseMove(a) {
          const e = this.chart,
            d = e.tooltip;
          a = this.normalize(a);
          this.setHoverChartIndex();
          ("mousedown" === e.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          e.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (d && d.shouldStickOnContact(a)) ||
            (this.inClass(a.target, "highcharts-no-tooltip")
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        }
        onDocumentTouchEnd(a) {
          const e = B[I(z.hoverChartIndex, -1)];
          e && e.pointer.drop(a);
        }
        onContainerTouchMove(a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        }
        onContainerTouchStart(a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        }
        onDocumentMouseMove(a) {
          const e = this.chart,
            d = e.tooltip,
            f = this.chartPosition;
          a = this.normalize(a, f);
          !f ||
            e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            (d && d.shouldStickOnContact(a)) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        }
        onDocumentMouseUp(a) {
          const e = B[I(z.hoverChartIndex, -1)];
          e && e.pointer.drop(a);
        }
        pinch(a) {
          const e = this,
            d = e.chart,
            g = e.pinchDown,
            h = a.touches || [],
            c = h.length,
            b = e.lastValidTouch,
            p = e.hasZoom,
            l = {},
            k =
              1 === c &&
              ((e.inClass(a.target, "highcharts-tracker") &&
                d.runTrackerClick) ||
                e.runChartClick),
            m = {};
          var n = e.chart.tooltip;
          n = 1 === c && I(n && n.options.followTouchMove, !0);
          let v = e.selectionMarker;
          1 < c ? (e.initiated = !0) : n && (e.initiated = !1);
          p && e.initiated && !k && !1 !== a.cancelable && a.preventDefault();
          [].map.call(h, function (b) {
            return e.normalize(b);
          });
          "touchstart" === a.type
            ? ([].forEach.call(h, function (b, a) {
                g[a] = { chartX: b.chartX, chartY: b.chartY };
              }),
              (b.x = [g[0].chartX, g[1] && g[1].chartX]),
              (b.y = [g[0].chartY, g[1] && g[1].chartY]),
              d.axes.forEach(function (b) {
                if (b.zoomEnabled) {
                  const a = d.bounds[b.horiz ? "h" : "v"],
                    c = b.minPixelPadding,
                    e = b.toPixels(
                      Math.min(I(b.options.min, b.dataMin), b.dataMin)
                    ),
                    f = b.toPixels(
                      Math.max(I(b.options.max, b.dataMax), b.dataMax)
                    ),
                    l = Math.max(e, f);
                  a.min = Math.min(b.pos, Math.min(e, f) - c);
                  a.max = Math.max(b.pos + b.len, l + c);
                }
              }),
              (e.res = !0))
            : n
            ? this.runPointActions(e.normalize(a))
            : g.length &&
              (r(d, "touchpan", { originalEvent: a }, () => {
                v ||
                  (e.selectionMarker = v =
                    f({ destroy: E, touch: !0 }, d.plotBox));
                e.pinchTranslate(g, h, l, v, m, b);
                e.hasPinched = p;
                e.scaleGroups(l, m);
              }),
              e.res && ((e.res = !1), this.reset(!1, 0)));
        }
        pinchTranslate(a, f, d, g, h, c) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, f, d, g, h, c);
          this.zoomVert && this.pinchTranslateDirection(!1, a, f, d, g, h, c);
        }
        pinchTranslateDirection(a, f, d, g, h, c, b, p) {
          const e = this.chart,
            k = a ? "x" : "y",
            q = a ? "X" : "Y",
            m = "chart" + q,
            n = a ? "width" : "height",
            t = e["plot" + (a ? "Left" : "Top")],
            r = e.inverted,
            x = e.bounds[a ? "h" : "v"],
            v = 1 === f.length,
            u = f[0][m],
            z = !v && f[1][m];
          f = function () {
            "number" === typeof X &&
              20 < Math.abs(u - z) &&
              (P = p || Math.abs(J - X) / Math.abs(u - z));
            D = (t - J) / P + u;
            w = e["plot" + (a ? "Width" : "Height")] / P;
          };
          let w,
            D,
            P = p || 1,
            J = d[0][m],
            X = !v && d[1][m],
            F;
          f();
          d = D;
          d < x.min
            ? ((d = x.min), (F = !0))
            : d + w > x.max && ((d = x.max - w), (F = !0));
          F
            ? ((J -= 0.8 * (J - b[k][0])),
              "number" === typeof X && (X -= 0.8 * (X - b[k][1])),
              f())
            : (b[k] = [J, X]);
          r || ((c[k] = D - t), (c[n] = w));
          c = r ? 1 / P : P;
          h[n] = w;
          h[k] = d;
          g[r ? (a ? "scaleY" : "scaleX") : "scale" + q] = P;
          g["translate" + q] = c * t + (J - c * u);
        }
        reset(a, f) {
          const d = this.chart,
            e = d.hoverSeries,
            g = d.hoverPoint,
            c = d.hoverPoints,
            b = d.tooltip,
            p = b && b.shared ? c : g;
          a &&
            p &&
            F(p).forEach(function (b) {
              b.series.isCartesian &&
                "undefined" === typeof b.plotX &&
                (a = !1);
            });
          if (a)
            b &&
              p &&
              F(p).length &&
              (b.refresh(p),
              b.shared && c
                ? c.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian &&
                      (b.series.xAxis.crosshair &&
                        b.series.xAxis.drawCrosshair(null, b),
                      b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b));
                  })
                : g &&
                  (g.setState(g.state, !0),
                  d.axes.forEach(function (b) {
                    b.crosshair &&
                      g.series[b.coll] === b &&
                      b.drawCrosshair(null, g);
                  })));
          else {
            if (g) g.onMouseOut();
            c &&
              c.forEach(function (b) {
                b.setState();
              });
            if (e) e.onMouseOut();
            b && b.hide(f);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            d.axes.forEach(function (b) {
              b.hideCrosshair();
            });
            this.hoverX = d.hoverPoints = d.hoverPoint = null;
          }
        }
        runPointActions(a, f, d) {
          const e = this.chart,
            g = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
            c = g ? g.shared : !1;
          let b = f || e.hoverPoint,
            p = (b && b.series) || e.hoverSeries;
          f = this.getHoverData(
            b,
            p,
            e.series,
            (!a || "touchmove" !== a.type) &&
              (!!f || (p && p.directTouch && this.isDirectTouch)),
            c,
            a
          );
          b = f.hoverPoint;
          p = f.hoverSeries;
          const l = f.hoverPoints;
          f = p && p.tooltipOptions.followPointer && !p.tooltipOptions.split;
          const k = c && p && !p.noSharedTooltip;
          if (b && (d || b !== e.hoverPoint || (g && g.isHidden))) {
            (e.hoverPoints || []).forEach(function (b) {
              -1 === l.indexOf(b) && b.setState();
            });
            if (e.hoverSeries !== p) p.onMouseOver();
            this.applyInactiveState(l);
            (l || []).forEach(function (b) {
              b.setState("hover");
            });
            e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
            if (!b.series) return;
            e.hoverPoints = l;
            e.hoverPoint = b;
            b.firePointEvent("mouseOver", void 0, () => {
              g && b && g.refresh(k ? l : b, a);
            });
          } else
            f &&
              g &&
              !g.isHidden &&
              ((d = g.getAnchor([{}], a)),
              e.isInsidePlot(d[0], d[1], { visiblePlotOnly: !0 }) &&
                g.updatePosition({ plotX: d[0], plotY: d[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = C(
              e.container.ownerDocument,
              "mousemove",
              function (b) {
                const a = B[z.hoverChartIndex];
                if (a) a.pointer.onDocumentMouseMove(b);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          e.axes.forEach(function (b) {
            const c = I((b.crosshair || {}).snap, !0);
            let d;
            c &&
              (((d = e.hoverPoint) && d.series[b.coll] === b) ||
                (d = h(l, (a) => a.series && a.series[b.coll] === b)));
            d || !c ? b.drawCrosshair(a, d) : b.hideCrosshair();
          });
        }
        scaleGroups(a, f) {
          const d = this.chart;
          d.series.forEach(function (e) {
            const g = a || e.getPlotBox();
            e.group &&
              ((e.xAxis && e.xAxis.zoomEnabled) || d.mapView) &&
              (e.group.attr(g),
              e.markerGroup &&
                (e.markerGroup.attr(g),
                e.markerGroup.clip(f ? d.clipRect : null)),
              e.dataLabelsGroup && e.dataLabelsGroup.attr(g));
          });
          d.clipRect.attr(f || d.clipBox);
        }
        setDOMEvents() {
          const a = this.chart.container,
            f = a.ownerDocument;
          a.onmousedown = this.onContainerMouseDown.bind(this);
          a.onmousemove = this.onContainerMouseMove.bind(this);
          a.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            C(a, "mouseenter", this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            C(a, "mouseleave", this.onContainerMouseLeave.bind(this))
          );
          z.unbindDocumentMouseUp ||
            (z.unbindDocumentMouseUp = C(
              f,
              "mouseup",
              this.onDocumentMouseUp.bind(this)
            ));
          let d = this.chart.renderTo.parentElement;
          for (; d && "BODY" !== d.tagName; )
            this.eventsToUnbind.push(
              C(d, "scroll", () => {
                delete this.chartPosition;
              })
            ),
              (d = d.parentElement);
          y.hasTouch &&
            (this.eventsToUnbind.push(
              C(a, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              C(a, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            z.unbindDocumentTouchEnd ||
              (z.unbindDocumentTouchEnd = C(
                f,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 }
              )));
        }
        setHoverChartIndex() {
          const a = this.chart,
            f = y.charts[I(z.hoverChartIndex, -1)];
          if (f && f !== a)
            f.pointer.onContainerMouseLeave({ relatedTarget: a.container });
          (f && f.mouseIsDown) || (z.hoverChartIndex = a.index);
        }
        touch(a, f) {
          const d = this.chart;
          let e, g;
          this.setHoverChartIndex();
          1 === a.touches.length
            ? ((a = this.normalize(a)),
              (g = d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, {
                visiblePlotOnly: !0,
              })) && !d.openMenu
                ? (f && this.runPointActions(a),
                  "touchmove" === a.type &&
                    ((f = this.pinchDown),
                    (e = f[0]
                      ? 4 <=
                        Math.sqrt(
                          Math.pow(f[0].chartX - a.chartX, 2) +
                            Math.pow(f[0].chartY - a.chartY, 2)
                        )
                      : !1)),
                  I(e, !0) && this.pinch(a))
                : f && this.reset())
            : 2 === a.touches.length && this.pinch(a);
        }
        touchSelect(a) {
          return !(
            !this.chart.options.chart.zooming.singleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        }
        zoomOption(a) {
          var e = this.chart,
            d = e.options.chart;
          e = e.inverted;
          let f = d.zooming.type || "";
          /touch/.test(a.type) && (f = I(d.zooming.pinchType, f));
          this.zoomX = a = /x/.test(f);
          this.zoomY = d = /y/.test(f);
          this.zoomHor = (a && !e) || (d && e);
          this.zoomVert = (d && !e) || (a && e);
          this.hasZoom = a || d;
        }
      }
      (function (a) {
        const e = [],
          d = [];
        a.compose = function (e) {
          H.pushUnique(d, e) &&
            C(e, "beforeRender", function () {
              this.pointer = new a(this, this.options);
            });
        };
        a.dissolve = function () {
          for (let a = 0, d = e.length; a < d; ++a) e[a]();
          e.length = 0;
        };
      })(z || (z = {}));
      ("");
      return z;
    }
  );
  M(
    a,
    "Core/Legend/Legend.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Series/Point.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E) {
      const { animObject: w, setAnimation: A } = a,
        { format: u } = y,
        { marginNames: v } = H,
        { distribute: f } = B,
        {
          addEvent: h,
          createElement: r,
          css: m,
          defined: n,
          discardElement: k,
          find: g,
          fireEvent: I,
          isNumber: F,
          merge: z,
          pick: e,
          relativeLength: t,
          stableSort: d,
          syncTimeout: q,
        } = E;
      class x {
        constructor(a, b) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = a;
          this.init(a, b);
        }
        init(a, b) {
          this.chart = a;
          this.setOptions(b);
          b.enabled &&
            (this.render(),
            h(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            h(this.chart, "render", () => {
              this.proximate &&
                (this.proximatePositions(), this.positionItems());
            }));
        }
        setOptions(a) {
          const b = e(a.padding, 8);
          this.options = a;
          this.chart.styledMode ||
            ((this.itemStyle = a.itemStyle),
            (this.itemHiddenStyle = z(this.itemStyle, a.itemHiddenStyle)));
          this.itemMarginTop = a.itemMarginTop;
          this.itemMarginBottom = a.itemMarginBottom;
          this.padding = b;
          this.initialItemY = b - 5;
          this.symbolWidth = e(a.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === a.layout && !this.chart.inverted;
          this.baseline = void 0;
        }
        update(a, b) {
          const c = this.chart;
          this.setOptions(z(!0, this.options, a));
          this.destroy();
          c.isDirtyLegend = c.isDirtyBox = !0;
          e(b, !0) && c.redraw();
          I(this, "afterUpdate");
        }
        colorizeItem(a, b) {
          const { group: c, label: d, line: e, symbol: f } = a.legendItem || {};
          if (c)
            c[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
          if (!this.chart.styledMode) {
            var g = this.options;
            const c = this.itemHiddenStyle.color;
            g = b ? g.itemStyle.color : c;
            const l = b ? a.color || c : c,
              p = a.options && a.options.marker;
            let h = { fill: l };
            d && d.css({ fill: g });
            e && e.attr({ stroke: l });
            f &&
              (p &&
                f.isMarker &&
                ((h = a.pointAttribs()), b || (h.stroke = h.fill = c)),
              f.attr(h));
          }
          I(this, "afterColorizeItem", { item: a, visible: b });
        }
        positionItems() {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        }
        positionItem(a) {
          const { group: b, x: c = 0, y: d = 0 } = a.legendItem || {};
          var e = this.options,
            f = e.symbolPadding;
          const g = !e.rtl;
          e = a.checkbox;
          b &&
            b.element &&
            ((f = {
              translateX: g ? c : this.legendWidth - c - 2 * f - 4,
              translateY: d,
            }),
            b[n(b.translateY) ? "animate" : "attr"](f, void 0, () => {
              I(this, "afterPositionItem", { item: a });
            }));
          e && ((e.x = c), (e.y = d));
        }
        destroyItem(a) {
          const b = a.checkbox,
            c = a.legendItem || {};
          for (const b of ["group", "label", "line", "symbol"])
            c[b] && (c[b] = c[b].destroy());
          b && k(b);
          a.legendItem = void 0;
        }
        destroy() {
          for (const a of this.getAllItems()) this.destroyItem(a);
          for (const a of "clipRect up down pager nav box title group".split(
            " "
          ))
            this[a] && (this[a] = this[a].destroy());
          this.display = null;
        }
        positionCheckboxes() {
          const a = this.group && this.group.alignAttr,
            b = this.clipHeight || this.legendHeight,
            d = this.titleHeight;
          let e;
          a &&
            ((e = a.translateY),
            this.allItems.forEach(function (c) {
              const f = c.checkbox;
              let l;
              f &&
                ((l = e + d + f.y + (this.scrollOffset || 0) + 3),
                m(f, {
                  left: a.translateX + c.checkboxOffset + f.x - 20 + "px",
                  top: l + "px",
                  display:
                    this.proximate || (l > e - 6 && l < e + b - 6)
                      ? ""
                      : "none",
                }));
            }, this));
        }
        renderTitle() {
          var a = this.options;
          const b = this.padding,
            d = a.title;
          let e = 0;
          d.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  d.text,
                  b - 3,
                  b - 4,
                  void 0,
                  void 0,
                  void 0,
                  a.useHTML,
                  void 0,
                  "legend-title"
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(d.style),
              this.title.add(this.group)),
            d.width || this.title.css({ width: this.maxLegendWidth + "px" }),
            (a = this.title.getBBox()),
            (e = a.height),
            (this.offsetWidth = a.width),
            this.contentGroup.attr({ translateY: e }));
          this.titleHeight = e;
        }
        setText(a) {
          const b = this.options;
          a.legendItem.label.attr({
            text: b.labelFormat
              ? u(b.labelFormat, a, this.chart)
              : b.labelFormatter.call(a),
          });
        }
        renderItem(a) {
          const b = (a.legendItem = a.legendItem || {});
          var c = this.chart,
            d = c.renderer;
          const f = this.options,
            g = this.symbolWidth,
            h = f.symbolPadding || 0,
            k = this.itemStyle,
            q = this.itemHiddenStyle,
            m = "horizontal" === f.layout ? e(f.itemDistance, 20) : 0,
            n = !f.rtl,
            t = !a.series,
            r = !t && a.series.drawLegendSymbol ? a.series : a;
          var x = r.options;
          const v = this.createCheckboxForItem && x && x.showCheckbox,
            D = f.useHTML,
            P = a.options.className;
          let J = b.label;
          x = g + h + m + (v ? 20 : 0);
          J ||
            ((b.group = d
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  r.type +
                  "-series highcharts-color-" +
                  a.colorIndex +
                  (P ? " " + P : "") +
                  (t ? " highcharts-series-" + a.index : "")
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (b.label = J = d.text("", n ? g + h : -h, this.baseline || 0, D)),
            c.styledMode || J.css(z(a.visible ? k : q)),
            J.attr({ align: n ? "left" : "right", zIndex: 2 }).add(b.group),
            this.baseline ||
              ((this.fontMetrics = d.fontMetrics(J)),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              J.attr("y", this.baseline),
              (this.symbolHeight = e(f.symbolHeight, this.fontMetrics.f)),
              f.squareSymbol &&
                ((this.symbolWidth = e(
                  f.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (x = this.symbolWidth + h + m + (v ? 20 : 0)),
                n && J.attr("x", this.symbolWidth + h))),
            r.drawLegendSymbol(this, a),
            this.setItemEvents && this.setItemEvents(a, J, D));
          v &&
            !a.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(a);
          this.colorizeItem(a, a.visible);
          (!c.styledMode && k.width) ||
            J.css({
              width:
                (f.itemWidth || this.widthOption || c.spacingBox.width) -
                x +
                "px",
            });
          this.setText(a);
          c = J.getBBox();
          d = (this.fontMetrics && this.fontMetrics.h) || 0;
          a.itemWidth = a.checkboxOffset =
            f.itemWidth || b.labelWidth || c.width + x;
          this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
          this.totalItemWidth += a.itemWidth;
          this.itemHeight = a.itemHeight = Math.round(
            b.labelHeight || (c.height > 1.5 * d ? c.height : d)
          );
        }
        layoutItem(a) {
          var b = this.options;
          const c = this.padding,
            d = "horizontal" === b.layout,
            f = a.itemHeight,
            g = this.itemMarginBottom,
            h = this.itemMarginTop,
            k = d ? e(b.itemDistance, 20) : 0,
            q = this.maxLegendWidth;
          b =
            b.alignColumns && this.totalItemWidth > q
              ? this.maxItemWidth
              : a.itemWidth;
          const m = a.legendItem || {};
          d &&
            this.itemX - c + b > q &&
            ((this.itemX = c),
            this.lastLineHeight && (this.itemY += h + this.lastLineHeight + g),
            (this.lastLineHeight = 0));
          this.lastItemY = h + this.itemY + g;
          this.lastLineHeight = Math.max(f, this.lastLineHeight);
          m.x = this.itemX;
          m.y = this.itemY;
          d
            ? (this.itemX += b)
            : ((this.itemY += h + f + g), (this.lastLineHeight = f));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (d ? this.itemX - c - (a.checkbox ? 0 : k) : b) + c,
              this.offsetWidth
            );
        }
        getAllItems() {
          let a = [];
          this.chart.series.forEach(function (b) {
            const c = b && b.options;
            b &&
              e(c.showInLegend, n(c.linkedTo) ? !1 : void 0, !0) &&
              (a = a.concat(
                (b.legendItem || {}).labels ||
                  ("point" === c.legendType ? b.data : b)
              ));
          });
          I(this, "afterGetAllItems", { allItems: a });
          return a;
        }
        getAlignment() {
          const a = this.options;
          return this.proximate
            ? a.align.charAt(0) + "tv"
            : a.floating
            ? ""
            : a.align.charAt(0) +
              a.verticalAlign.charAt(0) +
              a.layout.charAt(0);
        }
        adjustMargins(a, b) {
          const c = this.chart,
            d = this.options,
            f = this.getAlignment();
          f &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (l, g) {
              l.test(f) &&
                !n(a[g]) &&
                (c[v[g]] = Math.max(
                  c[v[g]],
                  c.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] +
                    e(d.margin, 12) +
                    b[g] +
                    (c.titleOffset[g] || 0)
                ));
            });
        }
        proximatePositions() {
          const a = this.chart,
            b = [],
            d = "left" === this.options.align;
          this.allItems.forEach(function (c) {
            var e;
            var f = d;
            let l;
            c.yAxis &&
              (c.xAxis.options.reversed && (f = !f),
              c.points &&
                (e = g(
                  f ? c.points : c.points.slice(0).reverse(),
                  function (b) {
                    return F(b.plotY);
                  }
                )),
              (f =
                this.itemMarginTop +
                c.legendItem.label.getBBox().height +
                this.itemMarginBottom),
              (l = c.yAxis.top - a.plotTop),
              c.visible
                ? ((e = e ? e.plotY : c.yAxis.height), (e += l - 0.3 * f))
                : (e = l + c.yAxis.height),
              b.push({ target: e, size: f, item: c }));
          }, this);
          let e;
          for (const c of f(b, a.plotHeight))
            (e = c.item.legendItem || {}),
              F(c.pos) && (e.y = a.plotTop - a.spacing[0] + c.pos);
        }
        render() {
          const a = this.chart,
            b = a.renderer,
            e = this.options,
            f = this.padding;
          var g = this.getAllItems();
          let h,
            k = this.group,
            q = this.box;
          this.itemX = f;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = t(e.width, a.spacingBox.width - f);
          var m = a.spacingBox.width - 2 * f - e.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (m /= 2);
          this.maxLegendWidth = this.widthOption || m;
          k ||
            ((this.group = k =
              b
                .g("legend")
                .addClass(e.className || "")
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = b.g().attr({ zIndex: 1 }).add(k)),
            (this.scrollGroup = b.g().add(this.contentGroup)));
          this.renderTitle();
          d(
            g,
            (b, a) =>
              ((b.options && b.options.legendIndex) || 0) -
              ((a.options && a.options.legendIndex) || 0)
          );
          e.reversed && g.reverse();
          this.allItems = g;
          this.display = m = !!g.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          g.forEach(this.renderItem, this);
          g.forEach(this.layoutItem, this);
          g = (this.widthOption || this.offsetWidth) + f;
          h = this.lastItemY + this.lastLineHeight + this.titleHeight;
          h = this.handleOverflow(h);
          h += f;
          q ||
            (this.box = q =
              b
                .rect()
                .addClass("highcharts-legend-box")
                .attr({ r: e.borderRadius })
                .add(k));
          a.styledMode ||
            q
              .attr({
                stroke: e.borderColor,
                "stroke-width": e.borderWidth || 0,
                fill: e.backgroundColor || "none",
              })
              .shadow(e.shadow);
          if (0 < g && 0 < h)
            q[q.placed ? "animate" : "attr"](
              q.crisp.call(
                {},
                { x: 0, y: 0, width: g, height: h },
                q.strokeWidth()
              )
            );
          k[m ? "show" : "hide"]();
          a.styledMode && "none" === k.getStyle("display") && (g = h = 0);
          this.legendWidth = g;
          this.legendHeight = h;
          m && this.align();
          this.proximate || this.positionItems();
          I(this, "afterRender");
        }
        align(a = this.chart.spacingBox) {
          const b = this.chart,
            c = this.options;
          let d = a.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0]
            ? (d += b.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < b.titleOffset[2] &&
              (d -= b.titleOffset[2]);
          d !== a.y && (a = z(a, { y: d }));
          b.hasRendered || (this.group.placed = !1);
          this.group.align(
            z(c, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : c.verticalAlign,
            }),
            !0,
            a
          );
        }
        handleOverflow(a) {
          const b = this,
            c = this.chart,
            d = c.renderer,
            f = this.options;
          var g = f.y;
          const h = "top" === f.verticalAlign,
            k = this.padding,
            q = f.maxHeight,
            m = f.navigation,
            n = e(m.animation, !0),
            t = m.arrowSize || 12,
            r = this.pages,
            x = this.allItems,
            v = function (a) {
              "number" === typeof a
                ? w.attr({ height: a })
                : w && ((b.clipRect = w.destroy()), b.contentGroup.clip());
              b.contentGroup.div &&
                (b.contentGroup.div.style.clip = a
                  ? "rect(" + k + "px,9999px," + (k + a) + "px,0)"
                  : "auto");
            },
            D = function (a) {
              b[a] = d
                .circle(0, 0, 1.3 * t)
                .translate(t / 2, t / 2)
                .add(z);
              c.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
              return b[a];
            };
          let P, J, u;
          g = c.spacingBox.height + (h ? -g : g) - k;
          let z = this.nav,
            w = this.clipRect;
          "horizontal" !== f.layout ||
            "middle" === f.verticalAlign ||
            f.floating ||
            (g /= 2);
          q && (g = Math.min(g, q));
          r.length = 0;
          a && 0 < g && a > g && !1 !== m.enabled
            ? ((this.clipHeight = P =
                Math.max(g - 20 - this.titleHeight - k, 0)),
              (this.currentPage = e(this.currentPage, 1)),
              (this.fullHeight = a),
              x.forEach((a, b) => {
                u = a.legendItem || {};
                a = u.y || 0;
                const c = Math.round(u.label.getBBox().height);
                let d = r.length;
                if (!d || (a - r[d - 1] > P && (J || a) !== r[d - 1]))
                  r.push(J || a), d++;
                u.pageIx = d - 1;
                J && ((x[b - 1].legendItem || {}).pageIx = d - 1);
                b === x.length - 1 &&
                  a + c - r[d - 1] > P &&
                  a > r[d - 1] &&
                  (r.push(a), (u.pageIx = d));
                a !== J && (J = a);
              }),
              w ||
                ((w = b.clipRect = d.clipRect(0, k - 2, 9999, 0)),
                b.contentGroup.clip(w)),
              v(P),
              z ||
                ((this.nav = z = d.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = d.symbol("triangle", 0, 0, t, t).add(z)),
                D("upTracker").on("click", function () {
                  b.scroll(-1, n);
                }),
                (this.pager = d
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                !c.styledMode && m.style && this.pager.css(m.style),
                this.pager.add(z),
                (this.down = d.symbol("triangle-down", 0, 0, t, t).add(z)),
                D("downTracker").on("click", function () {
                  b.scroll(1, n);
                })),
              b.scroll(0),
              (a = g))
            : z &&
              (v(),
              (this.nav = z.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return a;
        }
        scroll(a, b) {
          const c = this.chart,
            d = this.pages,
            f = d.length,
            g = this.clipHeight,
            h = this.options.navigation,
            k = this.pager,
            m = this.padding;
          let n = this.currentPage + a;
          n > f && (n = f);
          0 < n &&
            ("undefined" !== typeof b && A(b, c),
            this.nav.attr({
              translateX: m,
              translateY: g + this.padding + 7 + this.titleHeight,
              visibility: "inherit",
            }),
            [this.up, this.upTracker].forEach(function (a) {
              a.attr({
                class:
                  1 === n
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            k.attr({ text: n + "/" + f }),
            [this.down, this.downTracker].forEach(function (a) {
              a.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  n === f
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            c.styledMode ||
              (this.up.attr({
                fill: 1 === n ? h.inactiveColor : h.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === n ? "default" : "pointer" }),
              this.down.attr({
                fill: n === f ? h.inactiveColor : h.activeColor,
              }),
              this.downTracker.css({
                cursor: n === f ? "default" : "pointer",
              })),
            (this.scrollOffset = -d[n - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = n),
            this.positionCheckboxes(),
            (a = w(e(b, c.renderer.globalAnimation, !0))),
            q(() => {
              I(this, "afterScroll", { currentPage: n });
            }, a.duration));
        }
        setItemEvents(a, b, d) {
          const c = this,
            e = a.legendItem || {},
            f = c.chart.renderer.boxWrapper,
            g = a instanceof K,
            h = "highcharts-legend-" + (g ? "point" : "series") + "-active",
            k = c.chart.styledMode;
          d = d ? [b, e.symbol] : [e.group];
          const p = (b) => {
            c.allItems.forEach((c) => {
              a !== c &&
                [c].concat(c.linkedSeries || []).forEach((a) => {
                  a.setState(b, !g);
                });
            });
          };
          for (const e of d)
            if (e)
              e.on("mouseover", function () {
                a.visible && p("inactive");
                a.setState("hover");
                a.visible && f.addClass(h);
                k || b.css(c.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  c.chart.styledMode ||
                    b.css(z(a.visible ? c.itemStyle : c.itemHiddenStyle));
                  p("");
                  f.removeClass(h);
                  a.setState();
                })
                .on("click", function (b) {
                  const c = function () {
                    a.setVisible && a.setVisible();
                    p(a.visible ? "inactive" : "");
                  };
                  f.removeClass(h);
                  b = { browserEvent: b };
                  a.firePointEvent
                    ? a.firePointEvent("legendItemClick", b, c)
                    : I(a, "legendItemClick", b, c);
                });
        }
        createCheckboxForItem(a) {
          a.checkbox = r(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: a.selected,
              defaultChecked: a.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          h(a.checkbox, "click", function (b) {
            I(
              a.series || a,
              "checkboxClick",
              { checked: b.target.checked, item: a },
              function () {
                a.select();
              }
            );
          });
        }
      }
      (function (a) {
        const b = [];
        a.compose = function (c) {
          E.pushUnique(b, c) &&
            h(c, "beforeMargins", function () {
              this.legend = new a(this, this.options.legend);
            });
        };
      })(x || (x = {}));
      ("");
      return x;
    }
  );
  M(
    a,
    "Core/Series/SeriesRegistry.js",
    [
      a["Core/Globals.js"],
      a["Core/Defaults.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K) {
      const { defaultOptions: w } = y,
        { extendClass: E, merge: C } = K;
      var A;
      (function (u) {
        function v(a, h) {
          const f = w.plotOptions || {},
            m = h.defaultOptions,
            n = h.prototype;
          n.type = a;
          n.pointClass || (n.pointClass = H);
          m && (f[a] = m);
          u.seriesTypes[a] = h;
        }
        u.seriesTypes = a.seriesTypes;
        u.registerSeriesType = v;
        u.seriesType = function (a, h, r, m, n) {
          const f = w.plotOptions || {};
          h = h || "";
          f[a] = C(f[h], r);
          v(a, E(u.seriesTypes[h] || function () {}, m));
          u.seriesTypes[a].prototype.type = a;
          n && (u.seriesTypes[a].prototype.pointClass = E(H, n));
          return u.seriesTypes[a];
        };
      })(A || (A = {}));
      return A;
    }
  );
  M(
    a,
    "Core/Chart/Chart.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Defaults.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Time.js"],
      a["Core/Utilities.js"],
      a["Core/Renderer/HTML/AST.js"],
    ],
    function (a, y, H, K, B, E, C, A, u, v, f, h) {
      const { animate: r, animObject: m, setAnimation: n } = a,
        { defaultOptions: k, defaultTime: g } = H,
        { numberFormat: w } = K,
        { registerEventOptions: F } = B,
        { charts: z, doc: e, marginNames: t, svg: d, win: q } = E,
        { seriesTypes: x } = A,
        {
          addEvent: c,
          attr: b,
          cleanRecursively: p,
          createElement: l,
          css: L,
          defined: N,
          discardElement: O,
          erase: Z,
          error: S,
          extend: U,
          find: G,
          fireEvent: Q,
          getStyle: M,
          isArray: fa,
          isNumber: Y,
          isObject: D,
          isString: P,
          merge: J,
          objectEach: X,
          pick: R,
          pInt: V,
          relativeLength: ha,
          removeEvent: aa,
          splat: ca,
          syncTimeout: ia,
          uniqueKey: ja,
        } = f;
      class da {
        static chart(a, b, c) {
          return new da(a, b, c);
        }
        constructor(a, b, c) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(a, b, c);
        }
        getArgs(a, b, c) {
          P(a) || a.nodeName
            ? ((this.renderTo = a), this.init(b, c))
            : this.init(a, b);
        }
        init(a, b) {
          const c = a.plotOptions || {};
          Q(this, "init", { args: arguments }, function () {
            const d = J(k, a),
              e = d.chart;
            X(d.plotOptions, function (a, b) {
              D(a) && (a.tooltip = (c[b] && J(c[b].tooltip)) || void 0);
            });
            d.tooltip.userOptions =
              (a.chart && a.chart.forExport && a.tooltip.userOptions) ||
              a.tooltip;
            this.userOptions = a;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = b;
            this.isResizing = 0;
            const f = (e.zooming = e.zooming || {});
            a.chart && !a.chart.zooming && (f.resetButton = e.resetZoomButton);
            f.key = R(f.key, e.zoomKey);
            f.pinchType = R(f.pinchType, e.pinchType);
            f.singleTouch = R(f.singleTouch, e.zoomBySingleTouch);
            f.type = R(f.type, e.zoomType);
            this.options = d;
            this.axes = [];
            this.series = [];
            this.time =
              a.time && Object.keys(a.time).length ? new v(a.time) : E.time;
            this.numberFormatter = e.numberFormatter || w;
            this.styledMode = e.styledMode;
            this.hasCartesianSeries = e.showAxes;
            this.index = z.length;
            z.push(this);
            E.chartCount++;
            F(this, e);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            Q(this, "afterInit");
            this.firstRender();
          });
        }
        initSeries(a) {
          var b = this.options.chart;
          b = a.type || b.type;
          const c = x[b];
          c || S(17, !0, this, { missingModuleFor: b });
          b = new c();
          "function" === typeof b.init && b.init(this, a);
          return b;
        }
        setSeriesData() {
          this.getSeriesOrderByLinks().forEach(function (a) {
            a.points ||
              a.data ||
              !a.enabledDataSorting ||
              a.setData(a.options.data, !1);
          });
        }
        getSeriesOrderByLinks() {
          return this.series.concat().sort(function (a, b) {
            return a.linkedSeries.length || b.linkedSeries.length
              ? b.linkedSeries.length - a.linkedSeries.length
              : 0;
          });
        }
        orderSeries(a) {
          const b = this.series;
          for (let c = a || 0, d = b.length; c < d; ++c)
            b[c] && ((b[c].index = c), (b[c].name = b[c].getName()));
        }
        isInsidePlot(a, b, c = {}) {
          const {
            inverted: d,
            plotBox: e,
            plotLeft: f,
            plotTop: g,
            scrollablePlotBox: l,
          } = this;
          var h = 0;
          let k = 0;
          c.visiblePlotOnly &&
            this.scrollingContainer &&
            ({ scrollLeft: h, scrollTop: k } = this.scrollingContainer);
          const p = c.series,
            q = (c.visiblePlotOnly && l) || e;
          var m = c.inverted ? b : a;
          b = c.inverted ? a : b;
          a = { x: m, y: b, isInsidePlot: !0, options: c };
          if (!c.ignoreX) {
            const b = (p && (d && !this.polar ? p.yAxis : p.xAxis)) || {
              pos: f,
              len: Infinity,
            };
            m = c.paneCoordinates ? b.pos + m : f + m;
            (m >= Math.max(h + f, b.pos) &&
              m <= Math.min(h + f + q.width, b.pos + b.len)) ||
              (a.isInsidePlot = !1);
          }
          !c.ignoreY &&
            a.isInsidePlot &&
            ((h = (!d && c.axis && !c.axis.isXAxis && c.axis) ||
              (p && (d ? p.xAxis : p.yAxis)) || { pos: g, len: Infinity }),
            (c = c.paneCoordinates ? h.pos + b : g + b),
            (c >= Math.max(k + g, h.pos) &&
              c <= Math.min(k + g + q.height, h.pos + h.len)) ||
              (a.isInsidePlot = !1));
          Q(this, "afterIsInsidePlot", a);
          return a.isInsidePlot;
        }
        redraw(a) {
          Q(this, "beforeRedraw");
          const b = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            c = this.series,
            d = this.pointer,
            e = this.legend,
            f = this.userOptions.legend,
            g = this.renderer,
            l = g.isHidden(),
            h = [];
          let k,
            p,
            q = this.isDirtyBox,
            m = this.isDirtyLegend,
            D;
          g.rootFontSize = g.boxWrapper.getStyle("font-size");
          this.setResponsive && this.setResponsive(!1);
          n(this.hasRendered ? a : !1, this);
          l && this.temporaryDisplay();
          this.layOutTitles();
          for (a = c.length; a--; )
            if (((D = c[a]), D.options.stacking || D.options.centerInCategory))
              if (((p = !0), D.isDirty)) {
                k = !0;
                break;
              }
          if (k)
            for (a = c.length; a--; )
              (D = c[a]), D.options.stacking && (D.isDirty = !0);
          c.forEach(function (a) {
            a.isDirty &&
              ("point" === a.options.legendType
                ? ("function" === typeof a.updateTotals && a.updateTotals(),
                  (m = !0))
                : f && (f.labelFormatter || f.labelFormat) && (m = !0));
            a.isDirtyData && Q(a, "updatedData");
          });
          m &&
            e &&
            e.options.enabled &&
            (e.render(), (this.isDirtyLegend = !1));
          p && this.getStacks();
          b.forEach(function (a) {
            a.updateNames();
            a.setScale();
          });
          this.getMargins();
          b.forEach(function (a) {
            a.isDirty && (q = !0);
          });
          b.forEach(function (a) {
            const b = a.min + "," + a.max;
            a.extKey !== b &&
              ((a.extKey = b),
              h.push(function () {
                Q(a, "afterSetExtremes", U(a.eventArgs, a.getExtremes()));
                delete a.eventArgs;
              }));
            (q || p) && a.redraw();
          });
          q && this.drawChartBox();
          Q(this, "predraw");
          c.forEach(function (a) {
            (q || a.isDirty) && a.visible && a.redraw();
            a.isDirtyData = !1;
          });
          d && d.reset(!0);
          g.draw();
          Q(this, "redraw");
          Q(this, "render");
          l && this.temporaryDisplay(!0);
          h.forEach(function (a) {
            a.call();
          });
        }
        get(a) {
          function b(b) {
            return b.id === a || (b.options && b.options.id === a);
          }
          const c = this.series;
          let d = G(this.axes, b) || G(this.series, b);
          for (let a = 0; !d && a < c.length; a++) d = G(c[a].points || [], b);
          return d;
        }
        getAxes() {
          const a = this;
          var b = this.options;
          const c = (b.xAxis = ca(b.xAxis || {}));
          b = b.yAxis = ca(b.yAxis || {});
          Q(this, "getAxes");
          c.forEach(function (a, b) {
            a.index = b;
            a.isX = !0;
          });
          b.forEach(function (a, b) {
            a.index = b;
          });
          c.concat(b).forEach(function (b) {
            new y(a, b);
          });
          Q(this, "afterGetAxes");
        }
        getSelectedPoints() {
          return this.series.reduce((a, b) => {
            b.getPointsCollection().forEach((b) => {
              R(b.selectedStaging, b.selected) && a.push(b);
            });
            return a;
          }, []);
        }
        getSelectedSeries() {
          return this.series.filter(function (a) {
            return a.selected;
          });
        }
        setTitle(a, b, c) {
          this.applyDescription("title", a);
          this.applyDescription("subtitle", b);
          this.applyDescription("caption", void 0);
          this.layOutTitles(c);
        }
        applyDescription(a, b) {
          const c = this;
          var d =
            "title" === a
              ? {
                  color: "#333333",
                  fontSize: this.options.isStock ? "1em" : "1.2em",
                  fontWeight: "bold",
                }
              : { color: "#666666", fontSize: "0.8em" };
          d = this.options[a] = J(
            !this.styledMode && { style: d },
            this.options[a],
            b
          );
          let e = this[a];
          e && b && (this[a] = e = e.destroy());
          d &&
            !e &&
            ((e = this.renderer
              .text(d.text, 0, 0, d.useHTML)
              .attr({
                align: d.align,
                class: "highcharts-" + a,
                zIndex: d.zIndex || 4,
              })
              .add()),
            (e.update = function (b) {
              c[
                {
                  title: "setTitle",
                  subtitle: "setSubtitle",
                  caption: "setCaption",
                }[a]
              ](b);
            }),
            this.styledMode || e.css(d.style),
            (this[a] = e));
        }
        layOutTitles(a) {
          const b = [0, 0, 0],
            c = this.renderer,
            d = this.spacingBox;
          ["title", "subtitle", "caption"].forEach(function (a) {
            const e = this[a],
              f = this.options[a],
              g = f.verticalAlign || "top";
            a =
              "title" === a
                ? "top" === g
                  ? -3
                  : 0
                : "top" === g
                ? b[0] + 2
                : 0;
            if (e) {
              e.css({
                width: (f.width || d.width + (f.widthAdjust || 0)) + "px",
              });
              const l = c.fontMetrics(e).b,
                h = Math.round(e.getBBox(f.useHTML).height);
              e.align(
                U({ y: "bottom" === g ? l : a + l, height: h }, f),
                !1,
                "spacingBox"
              );
              f.floating ||
                ("top" === g
                  ? (b[0] = Math.ceil(b[0] + h))
                  : "bottom" === g && (b[2] = Math.ceil(b[2] + h)));
            }
          }, this);
          b[0] &&
            "top" === (this.options.title.verticalAlign || "top") &&
            (b[0] += this.options.title.margin);
          b[2] &&
            "bottom" === this.options.caption.verticalAlign &&
            (b[2] += this.options.caption.margin);
          const e =
            !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
          this.titleOffset = b;
          Q(this, "afterLayOutTitles");
          !this.isDirtyBox &&
            e &&
            ((this.isDirtyBox = this.isDirtyLegend = e),
            this.hasRendered && R(a, !0) && this.isDirtyBox && this.redraw());
        }
        getContainerBox() {
          return {
            width: M(this.renderTo, "width", !0) || 0,
            height: M(this.renderTo, "height", !0) || 0,
          };
        }
        getChartSize() {
          var a = this.options.chart;
          const b = a.width;
          a = a.height;
          const c = this.getContainerBox();
          this.chartWidth = Math.max(0, b || c.width || 600);
          this.chartHeight = Math.max(
            0,
            ha(a, this.chartWidth) || (1 < c.height ? c.height : 400)
          );
          this.containerBox = c;
        }
        temporaryDisplay(a) {
          let b = this.renderTo;
          if (a)
            for (; b && b.style; )
              b.hcOrigStyle && (L(b, b.hcOrigStyle), delete b.hcOrigStyle),
                b.hcOrigDetached &&
                  (e.body.removeChild(b), (b.hcOrigDetached = !1)),
                (b = b.parentNode);
          else
            for (; b && b.style; ) {
              e.body.contains(b) ||
                b.parentNode ||
                ((b.hcOrigDetached = !0), e.body.appendChild(b));
              if ("none" === M(b, "display", !1) || b.hcOricDetached)
                (b.hcOrigStyle = {
                  display: b.style.display,
                  height: b.style.height,
                  overflow: b.style.overflow,
                }),
                  (a = { display: "block", overflow: "hidden" }),
                  b !== this.renderTo && (a.height = 0),
                  L(b, a),
                  b.offsetWidth ||
                    b.style.setProperty("display", "block", "important");
              b = b.parentNode;
              if (b === e.body) break;
            }
        }
        setClassName(a) {
          this.container.className = "highcharts-container " + (a || "");
        }
        getContainer() {
          const a = this.options,
            c = a.chart;
          var f = ja();
          let g,
            k = this.renderTo;
          k || (this.renderTo = k = c.renderTo);
          P(k) && (this.renderTo = k = e.getElementById(k));
          k || S(13, !0, this);
          var p = V(b(k, "data-highcharts-chart"));
          Y(p) && z[p] && z[p].hasRendered && z[p].destroy();
          b(k, "data-highcharts-chart", this.index);
          k.innerHTML = h.emptyHTML;
          c.skipClone || k.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          p = this.chartWidth;
          const q = this.chartHeight;
          L(k, { overflow: "hidden" });
          this.styledMode ||
            (g = U(
              {
                position: "relative",
                overflow: "hidden",
                width: p + "px",
                height: q + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                userSelect: "none",
                "touch-action": "manipulation",
                outline: "none",
              },
              c.style || {}
            ));
          this.container = f = l("div", { id: f }, g, k);
          this._cursor = f.style.cursor;
          this.renderer = new (
            c.renderer || !d ? C.getRendererType(c.renderer) : u
          )(
            f,
            p,
            q,
            void 0,
            c.forExport,
            a.exporting && a.exporting.allowHTML,
            this.styledMode
          );
          this.containerBox = this.getContainerBox();
          n(void 0, this);
          this.setClassName(c.className);
          if (this.styledMode)
            for (const b in a.defs) this.renderer.definition(a.defs[b]);
          else this.renderer.setStyle(c.style);
          this.renderer.chartIndex = this.index;
          Q(this, "afterGetContainer");
        }
        getMargins(a) {
          const { spacing: b, margin: c, titleOffset: d } = this;
          this.resetMargins();
          d[0] &&
            !N(c[0]) &&
            (this.plotTop = Math.max(this.plotTop, d[0] + b[0]));
          d[2] &&
            !N(c[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, d[2] + b[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(c, b);
          Q(this, "getMargins");
          a || this.getAxisMargins();
        }
        getAxisMargins() {
          const a = this,
            b = (a.axisOffset = [0, 0, 0, 0]),
            c = a.colorAxis,
            d = a.margin,
            e = function (a) {
              a.forEach(function (a) {
                a.visible && a.getOffset();
              });
            };
          a.hasCartesianSeries ? e(a.axes) : c && c.length && e(c);
          t.forEach(function (c, e) {
            N(d[e]) || (a[c] += b[e]);
          });
          a.setChartSize();
        }
        reflow(a) {
          const b = this;
          var c = b.options.chart;
          c = N(c.width) && N(c.height);
          const d = b.containerBox,
            e = b.getContainerBox();
          delete b.pointer.chartPosition;
          if (!c && !b.isPrinting && d && e.width) {
            if (e.width !== d.width || e.height !== d.height)
              f.clearTimeout(b.reflowTimeout),
                (b.reflowTimeout = ia(
                  function () {
                    b.container && b.setSize(void 0, void 0, !1);
                  },
                  a ? 100 : 0
                ));
            b.containerBox = e;
          }
        }
        setReflow() {
          const a = this;
          var b = (b) => {
            var c;
            (null === (c = a.options) || void 0 === c ? 0 : c.chart.reflow) &&
              a.hasLoaded &&
              a.reflow(b);
          };
          "function" === typeof ResizeObserver
            ? new ResizeObserver(b).observe(a.renderTo)
            : ((b = c(q, "resize", b)), c(this, "destroy", b));
        }
        setSize(a, b, c) {
          const d = this,
            e = d.renderer;
          d.isResizing += 1;
          n(c, d);
          c = e.globalAnimation;
          d.oldChartHeight = d.chartHeight;
          d.oldChartWidth = d.chartWidth;
          "undefined" !== typeof a && (d.options.chart.width = a);
          "undefined" !== typeof b && (d.options.chart.height = b);
          d.getChartSize();
          d.styledMode ||
            (c ? r : L)(
              d.container,
              { width: d.chartWidth + "px", height: d.chartHeight + "px" },
              c
            );
          d.setChartSize(!0);
          e.setSize(d.chartWidth, d.chartHeight, c);
          d.axes.forEach(function (a) {
            a.isDirty = !0;
            a.setScale();
          });
          d.isDirtyLegend = !0;
          d.isDirtyBox = !0;
          d.layOutTitles();
          d.getMargins();
          d.redraw(c);
          d.oldChartHeight = null;
          Q(d, "resize");
          ia(function () {
            d &&
              Q(d, "endResize", null, function () {
                --d.isResizing;
              });
          }, m(c).duration);
        }
        setChartSize(a) {
          var b = this.inverted;
          const c = this.renderer;
          var d = this.chartWidth,
            e = this.chartHeight;
          const f = this.options.chart,
            g = this.spacing,
            l = this.clipOffset;
          let h, k, p, q;
          this.plotLeft = h = Math.round(this.plotLeft);
          this.plotTop = k = Math.round(this.plotTop);
          this.plotWidth = p = Math.max(
            0,
            Math.round(d - h - this.marginRight)
          );
          this.plotHeight = q = Math.max(
            0,
            Math.round(e - k - this.marginBottom)
          );
          this.plotSizeX = b ? q : p;
          this.plotSizeY = b ? p : q;
          this.plotBorderWidth = f.plotBorderWidth || 0;
          this.spacingBox = c.spacingBox = {
            x: g[3],
            y: g[0],
            width: d - g[3] - g[1],
            height: e - g[0] - g[2],
          };
          this.plotBox = c.plotBox = { x: h, y: k, width: p, height: q };
          b = 2 * Math.floor(this.plotBorderWidth / 2);
          d = Math.ceil(Math.max(b, l[3]) / 2);
          e = Math.ceil(Math.max(b, l[0]) / 2);
          this.clipBox = {
            x: d,
            y: e,
            width: Math.floor(this.plotSizeX - Math.max(b, l[1]) / 2 - d),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(b, l[2]) / 2 - e)
            ),
          };
          a ||
            (this.axes.forEach(function (a) {
              a.setAxisSize();
              a.setAxisTranslation();
            }),
            c.alignElements());
          Q(this, "afterSetChartSize", { skipAxes: a });
        }
        resetMargins() {
          Q(this, "resetMargins");
          const a = this,
            b = a.options.chart;
          ["margin", "spacing"].forEach(function (c) {
            const d = b[c],
              e = D(d) ? d : [d, d, d, d];
            ["Top", "Right", "Bottom", "Left"].forEach(function (d, f) {
              a[c][f] = R(b[c + d], e[f]);
            });
          });
          t.forEach(function (b, c) {
            a[b] = R(a.margin[c], a.spacing[c]);
          });
          a.axisOffset = [0, 0, 0, 0];
          a.clipOffset = [0, 0, 0, 0];
        }
        drawChartBox() {
          const a = this.options.chart,
            b = this.renderer,
            c = this.chartWidth,
            d = this.chartHeight,
            e = this.styledMode,
            f = this.plotBGImage;
          var g = a.backgroundColor;
          const l = a.plotBackgroundColor,
            h = a.plotBackgroundImage,
            k = this.plotLeft,
            p = this.plotTop,
            q = this.plotWidth,
            m = this.plotHeight,
            n = this.plotBox,
            D = this.clipRect,
            t = this.clipBox;
          let r = this.chartBackground,
            J = this.plotBackground,
            x = this.plotBorder,
            v,
            P,
            u = "animate";
          r ||
            ((this.chartBackground = r =
              b.rect().addClass("highcharts-background").add()),
            (u = "attr"));
          if (e) v = P = r.strokeWidth();
          else {
            v = a.borderWidth || 0;
            P = v + (a.shadow ? 8 : 0);
            g = { fill: g || "none" };
            if (v || r["stroke-width"])
              (g.stroke = a.borderColor), (g["stroke-width"] = v);
            r.attr(g).shadow(a.shadow);
          }
          r[u]({
            x: P / 2,
            y: P / 2,
            width: c - P - (v % 2),
            height: d - P - (v % 2),
            r: a.borderRadius,
          });
          u = "animate";
          J ||
            ((u = "attr"),
            (this.plotBackground = J =
              b.rect().addClass("highcharts-plot-background").add()));
          J[u](n);
          e ||
            (J.attr({ fill: l || "none" }).shadow(a.plotShadow),
            h &&
              (f
                ? (h !== f.attr("href") && f.attr("href", h), f.animate(n))
                : (this.plotBGImage = b.image(h, k, p, q, m).add())));
          D
            ? D.animate({ width: t.width, height: t.height })
            : (this.clipRect = b.clipRect(t));
          u = "animate";
          x ||
            ((u = "attr"),
            (this.plotBorder = x =
              b
                .rect()
                .addClass("highcharts-plot-border")
                .attr({ zIndex: 1 })
                .add()));
          e ||
            x.attr({
              stroke: a.plotBorderColor,
              "stroke-width": a.plotBorderWidth || 0,
              fill: "none",
            });
          x[u](x.crisp({ x: k, y: p, width: q, height: m }, -x.strokeWidth()));
          this.isDirtyBox = !1;
          Q(this, "afterDrawChartBox");
        }
        propFromSeries() {
          const a = this,
            b = a.options.chart,
            c = a.options.series;
          let d, e, f;
          ["inverted", "angular", "polar"].forEach(function (g) {
            e = x[b.type];
            f = b[g] || (e && e.prototype[g]);
            for (d = c && c.length; !f && d--; )
              (e = x[c[d].type]) && e.prototype[g] && (f = !0);
            a[g] = f;
          });
        }
        linkSeries(a) {
          const b = this,
            c = b.series;
          c.forEach(function (a) {
            a.linkedSeries.length = 0;
          });
          c.forEach(function (a) {
            let c = a.options.linkedTo;
            P(c) &&
              (c = ":previous" === c ? b.series[a.index - 1] : b.get(c)) &&
              c.linkedParent !== a &&
              (c.linkedSeries.push(a),
              (a.linkedParent = c),
              c.enabledDataSorting && a.setDataSortingOptions(),
              (a.visible = R(a.options.visible, c.options.visible, a.visible)));
          });
          Q(this, "afterLinkSeries", { isUpdating: a });
        }
        renderSeries() {
          this.series.forEach(function (a) {
            a.translate();
            a.render();
          });
        }
        render() {
          const a = this.axes,
            b = this.colorAxis,
            c = this.renderer,
            d = function (a) {
              a.forEach(function (a) {
                a.visible && a.render();
              });
            };
          let e = 0;
          this.setTitle();
          Q(this, "beforeMargins");
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          const f = this.plotWidth;
          a.some(function (a) {
            if (
              a.horiz &&
              a.visible &&
              a.options.labels.enabled &&
              a.series.length
            )
              return (e = 21), !0;
          });
          const g = (this.plotHeight = Math.max(this.plotHeight - e, 0));
          a.forEach(function (a) {
            a.setScale();
          });
          this.getAxisMargins();
          const l = 1.1 < f / this.plotWidth,
            h = 1.05 < g / this.plotHeight;
          if (l || h)
            a.forEach(function (a) {
              ((a.horiz && l) || (!a.horiz && h)) && a.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? d(a) : b && b.length && d(b);
          this.seriesGroup ||
            (this.seriesGroup = c
              .g("series-group")
              .attr({ zIndex: 3 })
              .shadow(this.options.chart.seriesGroupShadow)
              .add());
          this.renderSeries();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        }
        addCredits(a) {
          const b = this,
            c = J(!0, this.options.credits, a);
          c.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(c.text + (this.mapCredits || ""), 0, 0)
              .addClass("highcharts-credits")
              .on("click", function () {
                c.href && (q.location.href = c.href);
              })
              .attr({ align: c.position.align, zIndex: 8 })),
            b.styledMode || this.credits.css(c.style),
            this.credits.add().align(c.position),
            (this.credits.update = function (a) {
              b.credits = b.credits.destroy();
              b.addCredits(a);
            }));
        }
        destroy() {
          const a = this,
            b = a.axes,
            c = a.series,
            d = a.container,
            e = d && d.parentNode;
          let f;
          Q(a, "destroy");
          a.renderer.forExport ? Z(z, a) : (z[a.index] = void 0);
          E.chartCount--;
          a.renderTo.removeAttribute("data-highcharts-chart");
          aa(a);
          for (f = b.length; f--; ) b[f] = b[f].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (f = c.length; f--; ) c[f] = c[f].destroy();
          "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
            .split(" ")
            .forEach(function (b) {
              const c = a[b];
              c && c.destroy && (a[b] = c.destroy());
            });
          d && ((d.innerHTML = h.emptyHTML), aa(d), e && O(d));
          X(a, function (b, c) {
            delete a[c];
          });
        }
        firstRender() {
          const a = this,
            b = a.options;
          a.getContainer();
          a.resetMargins();
          a.setChartSize();
          a.propFromSeries();
          a.getAxes();
          (fa(b.series) ? b.series : []).forEach(function (b) {
            a.initSeries(b);
          });
          a.linkSeries();
          a.setSeriesData();
          Q(a, "beforeRender");
          a.render();
          a.pointer.getChartPosition();
          if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
          a.temporaryDisplay(!0);
        }
        onload() {
          this.callbacks.concat([this.callback]).forEach(function (a) {
            a && "undefined" !== typeof this.index && a.apply(this, [this]);
          }, this);
          Q(this, "load");
          Q(this, "render");
          N(this.index) && this.setReflow();
          this.warnIfA11yModuleNotLoaded();
          this.hasLoaded = !0;
        }
        warnIfA11yModuleNotLoaded() {
          const { options: a, title: b } = this;
          a &&
            !this.accessibility &&
            (this.renderer.boxWrapper.attr({
              role: "img",
              "aria-label": ((b && b.element.textContent) || "").replace(
                /</g,
                "&lt;"
              ),
            }),
            (a.accessibility && !1 === a.accessibility.enabled) ||
              S(
                'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                !1,
                this
              ));
        }
        addSeries(a, b, c) {
          const d = this;
          let e;
          a &&
            ((b = R(b, !0)),
            Q(d, "addSeries", { options: a }, function () {
              e = d.initSeries(a);
              d.isDirtyLegend = !0;
              d.linkSeries();
              e.enabledDataSorting && e.setData(a.data, !1);
              Q(d, "afterAddSeries", { series: e });
              b && d.redraw(c);
            }));
          return e;
        }
        addAxis(a, b, c, d) {
          return this.createAxis(b ? "xAxis" : "yAxis", {
            axis: a,
            redraw: c,
            animation: d,
          });
        }
        addColorAxis(a, b, c) {
          return this.createAxis("colorAxis", {
            axis: a,
            redraw: b,
            animation: c,
          });
        }
        createAxis(a, b) {
          a = new y(
            this,
            J(b.axis, { index: this[a].length, isX: "xAxis" === a })
          );
          R(b.redraw, !0) && this.redraw(b.animation);
          return a;
        }
        showLoading(a) {
          const b = this,
            d = b.options,
            e = d.loading,
            f = function () {
              g &&
                L(g, {
                  left: b.plotLeft + "px",
                  top: b.plotTop + "px",
                  width: b.plotWidth + "px",
                  height: b.plotHeight + "px",
                });
            };
          let g = b.loadingDiv,
            k = b.loadingSpan;
          g ||
            (b.loadingDiv = g =
              l(
                "div",
                { className: "highcharts-loading highcharts-loading-hidden" },
                null,
                b.container
              ));
          k ||
            ((b.loadingSpan = k =
              l("span", { className: "highcharts-loading-inner" }, null, g)),
            c(b, "redraw", f));
          g.className = "highcharts-loading";
          h.setElementHTML(k, R(a, d.lang.loading, ""));
          b.styledMode ||
            (L(g, U(e.style, { zIndex: 10 })),
            L(k, e.labelStyle),
            b.loadingShown ||
              (L(g, { opacity: 0, display: "" }),
              r(
                g,
                { opacity: e.style.opacity || 0.5 },
                { duration: e.showDuration || 0 }
              )));
          b.loadingShown = !0;
          f();
        }
        hideLoading() {
          const a = this.options,
            b = this.loadingDiv;
          b &&
            ((b.className = "highcharts-loading highcharts-loading-hidden"),
            this.styledMode ||
              r(
                b,
                { opacity: 0 },
                {
                  duration: a.loading.hideDuration || 100,
                  complete: function () {
                    L(b, { display: "none" });
                  },
                }
              ));
          this.loadingShown = !1;
        }
        update(a, b, c, d) {
          const e = this,
            f = {
              credits: "addCredits",
              title: "setTitle",
              subtitle: "setSubtitle",
              caption: "setCaption",
            },
            l = a.isResponsiveOptions,
            h = [];
          let k, q;
          Q(e, "update", { options: a });
          l || e.setResponsive(!1, !0);
          a = p(a, e.options);
          e.userOptions = J(e.userOptions, a);
          var m = a.chart;
          if (m) {
            J(!0, e.options.chart, m);
            "className" in m && e.setClassName(m.className);
            if ("inverted" in m || "polar" in m || "type" in m) {
              e.propFromSeries();
              var n = !0;
            }
            "alignTicks" in m && (n = !0);
            "events" in m && F(this, m);
            X(m, function (a, b) {
              -1 !== e.propsRequireUpdateSeries.indexOf("chart." + b) &&
                (k = !0);
              -1 !== e.propsRequireDirtyBox.indexOf(b) && (e.isDirtyBox = !0);
              -1 !== e.propsRequireReflow.indexOf(b) &&
                (l ? (e.isDirtyBox = !0) : (q = !0));
            });
            !e.styledMode &&
              m.style &&
              e.renderer.setStyle(e.options.chart.style || {});
          }
          !e.styledMode && a.colors && (this.options.colors = a.colors);
          a.time &&
            (this.time === g && (this.time = new v(a.time)),
            J(!0, e.options.time, a.time));
          X(a, function (b, c) {
            if (e[c] && "function" === typeof e[c].update) e[c].update(b, !1);
            else if ("function" === typeof e[f[c]]) e[f[c]](b);
            else
              "colors" !== c &&
                -1 === e.collectionsWithUpdate.indexOf(c) &&
                J(!0, e.options[c], a[c]);
            "chart" !== c &&
              -1 !== e.propsRequireUpdateSeries.indexOf(c) &&
              (k = !0);
          });
          this.collectionsWithUpdate.forEach(function (b) {
            let d;
            a[b] &&
              ((d = []),
              e[b].forEach(function (a, b) {
                a.options.isInternal || d.push(R(a.options.index, b));
              }),
              ca(a[b]).forEach(function (a, f) {
                const g = N(a.id);
                let l;
                g && (l = e.get(a.id));
                !l &&
                  e[b] &&
                  (l = e[b][d ? d[f] : f]) &&
                  g &&
                  N(l.options.id) &&
                  (l = void 0);
                l && l.coll === b && (l.update(a, !1), c && (l.touched = !0));
                !l &&
                  c &&
                  e.collectionsWithInit[b] &&
                  (e.collectionsWithInit[b][0].apply(
                    e,
                    [a].concat(e.collectionsWithInit[b][1] || []).concat([!1])
                  ).touched = !0);
              }),
              c &&
                e[b].forEach(function (a) {
                  a.touched || a.options.isInternal
                    ? delete a.touched
                    : h.push(a);
                }));
          });
          h.forEach(function (a) {
            a.chart && a.remove && a.remove(!1);
          });
          n &&
            e.axes.forEach(function (a) {
              a.update({}, !1);
            });
          k &&
            e.getSeriesOrderByLinks().forEach(function (a) {
              a.chart && a.update({}, !1);
            }, this);
          n = m && m.width;
          m = m && (P(m.height) ? ha(m.height, n || e.chartWidth) : m.height);
          q || (Y(n) && n !== e.chartWidth) || (Y(m) && m !== e.chartHeight)
            ? e.setSize(n, m, d)
            : R(b, !0) && e.redraw(d);
          Q(e, "afterUpdate", { options: a, redraw: b, animation: d });
        }
        setSubtitle(a, b) {
          this.applyDescription("subtitle", a);
          this.layOutTitles(b);
        }
        setCaption(a, b) {
          this.applyDescription("caption", a);
          this.layOutTitles(b);
        }
        showResetZoom() {
          function a() {
            b.zoomOut();
          }
          const b = this,
            c = k.lang,
            d = b.options.chart.zooming.resetButton,
            e = d.theme,
            f =
              "chart" === d.relativeTo || "spacingBox" === d.relativeTo
                ? null
                : "scrollablePlotBox";
          Q(this, "beforeShowResetZoom", null, function () {
            b.resetZoomButton = b.renderer
              .button(c.resetZoom, null, null, a, e)
              .attr({ align: d.position.align, title: c.resetZoomTitle })
              .addClass("highcharts-reset-zoom")
              .add()
              .align(d.position, !1, f);
          });
          Q(this, "afterShowResetZoom");
        }
        zoomOut() {
          Q(this, "selection", { resetSelection: !0 }, this.zoom);
        }
        zoom(a) {
          const b = this,
            c = b.pointer;
          let d = !1,
            e;
          !a || a.resetSelection
            ? (b.axes.forEach(function (a) {
                e = a.zoom();
              }),
              (c.initiated = !1))
            : a.xAxis.concat(a.yAxis).forEach(function (a) {
                const f = a.axis;
                if (
                  (c[f.isXAxis ? "zoomX" : "zoomY"] &&
                    N(c.mouseDownX) &&
                    N(c.mouseDownY) &&
                    b.isInsidePlot(
                      c.mouseDownX - b.plotLeft,
                      c.mouseDownY - b.plotTop,
                      { axis: f }
                    )) ||
                  !N(b.inverted ? c.mouseDownX : c.mouseDownY)
                )
                  (e = f.zoom(a.min, a.max)), f.displayBtn && (d = !0);
              });
          const f = b.resetZoomButton;
          d && !f
            ? b.showResetZoom()
            : !d && D(f) && (b.resetZoomButton = f.destroy());
          e &&
            b.redraw(
              R(b.options.chart.animation, a && a.animation, 100 > b.pointCount)
            );
        }
        pan(a, b) {
          const c = this,
            d = c.hoverPoints;
          b = "object" === typeof b ? b : { enabled: b, type: "x" };
          const e = c.options.chart;
          e && e.panning && (e.panning = b);
          const f = b.type;
          let g;
          Q(this, "pan", { originalEvent: a }, function () {
            d &&
              d.forEach(function (a) {
                a.setState();
              });
            let b = c.xAxis;
            "xy" === f ? (b = b.concat(c.yAxis)) : "y" === f && (b = c.yAxis);
            const e = {};
            b.forEach(function (b) {
              if (b.options.panningEnabled && !b.options.isInternal) {
                var d = b.horiz,
                  l = a[d ? "chartX" : "chartY"];
                d = d ? "mouseDownX" : "mouseDownY";
                var h = c[d],
                  k = b.minPointOffset || 0,
                  p =
                    (b.reversed && !c.inverted) || (!b.reversed && c.inverted)
                      ? -1
                      : 1,
                  m = b.getExtremes(),
                  q = b.toValue(h - l, !0) + k * p,
                  n =
                    b.toValue(h + b.len - l, !0) -
                    (k * p || (b.isXAxis && b.pointRangePadding) || 0),
                  D = n < q;
                p = b.hasVerticalPanning();
                h = D ? n : q;
                q = D ? q : n;
                var r = b.panningState;
                !p ||
                  b.isXAxis ||
                  (r && !r.isDirty) ||
                  b.series.forEach(function (a) {
                    var b = a.getProcessedData(!0);
                    b = a.getExtremes(b.yData, !0);
                    r ||
                      (r = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    Y(b.dataMin) &&
                      Y(b.dataMax) &&
                      ((r.startMin = Math.min(
                        R(a.options.threshold, Infinity),
                        b.dataMin,
                        r.startMin
                      )),
                      (r.startMax = Math.max(
                        R(a.options.threshold, -Infinity),
                        b.dataMax,
                        r.startMax
                      )));
                  });
                p = Math.min(
                  R(r && r.startMin, m.dataMin),
                  k ? m.min : b.toValue(b.toPixels(m.min) - b.minPixelPadding)
                );
                n = Math.max(
                  R(r && r.startMax, m.dataMax),
                  k ? m.max : b.toValue(b.toPixels(m.max) + b.minPixelPadding)
                );
                b.panningState = r;
                b.isOrdinal ||
                  ((k = p - h),
                  0 < k && ((q += k), (h = p)),
                  (k = q - n),
                  0 < k && ((q = n), (h -= k)),
                  b.series.length &&
                    h !== m.min &&
                    q !== m.max &&
                    h >= p &&
                    q <= n &&
                    (b.setExtremes(h, q, !1, !1, { trigger: "pan" }),
                    !c.resetZoomButton &&
                      h !== p &&
                      q !== n &&
                      f.match("y") &&
                      (c.showResetZoom(), (b.displayBtn = !1)),
                    (g = !0)),
                  (e[d] = l));
              }
            });
            X(e, (a, b) => {
              c[b] = a;
            });
            g && c.redraw(!1);
            L(c.container, { cursor: "move" });
          });
        }
      }
      U(da.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [da.prototype.addAxis, [!0]],
          yAxis: [da.prototype.addAxis, [!1]],
          series: [da.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " "
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " "
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " "
          ),
      });
      ("");
      return da;
    }
  );
  M(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function (a) {
    const { extend: w, merge: H, pick: K } = a;
    var B;
    (function (a) {
      a.drawLineMarker = function (a) {
        var A = (this.legendItem = this.legendItem || {}),
          u = this.options;
        const v = a.symbolWidth,
          f = a.symbolHeight,
          h = f / 2,
          r = this.chart.renderer,
          m = A.group;
        a = a.baseline - Math.round(0.3 * a.fontMetrics.b);
        let n = {},
          k = u.marker,
          g = 0;
        this.chart.styledMode ||
          ((n = { "stroke-width": Math.min(u.lineWidth || 0, 24) }),
          u.dashStyle
            ? (n.dashstyle = u.dashStyle)
            : "square" !== u.linecap && (n["stroke-linecap"] = "round"));
        A.line = r.path().addClass("highcharts-graph").attr(n).add(m);
        n["stroke-linecap"] && (g = Math.min(A.line.strokeWidth(), v) / 2);
        v &&
          A.line.attr({
            d: [
              ["M", g, a],
              ["L", v - g, a],
            ],
          });
        k &&
          !1 !== k.enabled &&
          v &&
          ((u = Math.min(K(k.radius, h), h)),
          0 === this.symbol.indexOf("url") &&
            ((k = H(k, { width: f, height: f })), (u = 0)),
          (A.symbol = A =
            r
              .symbol(
                this.symbol,
                v / 2 - u,
                a - u,
                2 * u,
                2 * u,
                w({ context: "legend" }, k)
              )
              .addClass("highcharts-point")
              .add(m)),
          (A.isMarker = !0));
      };
      a.drawRectangle = function (a, w) {
        w = w.legendItem || {};
        const u = a.symbolHeight,
          v = a.options.squareSymbol;
        w.symbol = this.chart.renderer
          .rect(
            v ? (a.symbolWidth - u) / 2 : 0,
            a.baseline - u + 1,
            v ? u : a.symbolWidth,
            u,
            K(a.options.symbolRadius, u / 2)
          )
          .addClass("highcharts-point")
          .attr({ zIndex: 3 })
          .add(w.group);
      };
    })(B || (B = {}));
    return B;
  });
  M(a, "Core/Series/SeriesDefaults.js", [], function () {
    return {
      lineWidth: 1,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: "#ffffff",
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 150 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: "center",
        borderWidth: 0,
        defer: !0,
        formatter: function () {
          const { numberFormatter: a } = this.series.chart;
          return "number" !== typeof this.y ? "" : a(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: "0.7em",
          fontWeight: "bold",
          color: "contrast",
          textOutline: "1px contrast",
        },
        verticalAlign: "bottom",
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 150 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 150 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: "x",
    };
  });
  M(
    a,
    "Core/Series/Series.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Defaults.js"],
      a["Core/Foundation.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/SeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E, C, A, u, v) {
      const { animObject: f, setAnimation: h } = a,
        { defaultOptions: r } = y,
        { registerEventOptions: m } = H,
        { hasTouch: n, svg: k, win: g } = K,
        { seriesTypes: w } = A,
        {
          arrayMax: F,
          arrayMin: z,
          clamp: e,
          cleanRecursively: t,
          correctFloat: d,
          defined: q,
          erase: x,
          error: c,
          extend: b,
          find: p,
          fireEvent: l,
          getNestedProperty: L,
          isArray: N,
          isNumber: O,
          isString: Z,
          merge: S,
          objectEach: U,
          pick: G,
          removeEvent: Q,
          splat: M,
          syncTimeout: fa,
        } = v;
      class Y {
        constructor() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        init(a, c) {
          l(this, "init", { options: c });
          const d = this,
            e = a.series;
          this.eventsToUnbind = [];
          d.chart = a;
          d.options = d.setOptions(c);
          c = d.options;
          d.linkedSeries = [];
          d.bindAxes();
          b(d, {
            name: c.name,
            state: "",
            visible: !1 !== c.visible,
            selected: !0 === c.selected,
          });
          m(this, c);
          const f = c.events;
          if (
            (f && f.click) ||
            (c.point && c.point.events && c.point.events.click) ||
            c.allowPointSelect
          )
            a.runTrackerClick = !0;
          d.getColor();
          d.getSymbol();
          d.parallelArrays.forEach(function (a) {
            d[a + "Data"] || (d[a + "Data"] = []);
          });
          d.isCartesian && (a.hasCartesianSeries = !0);
          let g;
          e.length && (g = e[e.length - 1]);
          d._i = G(g && g._i, -1) + 1;
          d.opacity = d.options.opacity;
          a.orderSeries(this.insert(e));
          c.dataSorting && c.dataSorting.enabled
            ? d.setDataSortingOptions()
            : d.points || d.data || d.setData(c.data, !1);
          l(this, "afterInit");
        }
        is(a) {
          return w[a] && this instanceof w[a];
        }
        insert(a) {
          const b = this.options.index;
          let c;
          if (O(b)) {
            for (c = a.length; c--; )
              if (b >= G(a[c].options.index, a[c]._i)) {
                a.splice(c + 1, 0, this);
                break;
              }
            -1 === c && a.unshift(this);
            c += 1;
          } else a.push(this);
          return G(c, a.length - 1);
        }
        bindAxes() {
          const a = this,
            b = a.options,
            d = a.chart;
          let e;
          l(this, "bindAxes", null, function () {
            (a.axisTypes || []).forEach(function (f) {
              let g = 0;
              d[f].forEach(function (c) {
                e = c.options;
                if (
                  (b[f] === g && !e.isInternal) ||
                  ("undefined" !== typeof b[f] && b[f] === e.id) ||
                  ("undefined" === typeof b[f] && 0 === e.index)
                )
                  a.insert(c.series), (a[f] = c), (c.isDirty = !0);
                e.isInternal || g++;
              });
              a[f] || a.optionalAxis === f || c(18, !0, d);
            });
          });
          l(this, "afterBindAxes");
        }
        updateParallelArrays(a, b, c) {
          const d = a.series,
            e = O(b)
              ? function (c) {
                  const e = "y" === c && d.toYData ? d.toYData(a) : a[c];
                  d[c + "Data"][b] = e;
                }
              : function (a) {
                  Array.prototype[b].apply(d[a + "Data"], c);
                };
          d.parallelArrays.forEach(e);
        }
        hasData() {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        }
        autoIncrement(a) {
          var b = this.options;
          const c = b.pointIntervalUnit,
            d = b.relativeXValue,
            e = this.chart.time;
          let f = this.xIncrement,
            g;
          f = G(f, b.pointStart, 0);
          this.pointInterval = g = G(this.pointInterval, b.pointInterval, 1);
          d && O(a) && (g *= a);
          c &&
            ((b = new e.Date(f)),
            "day" === c
              ? e.set("Date", b, e.get("Date", b) + g)
              : "month" === c
              ? e.set("Month", b, e.get("Month", b) + g)
              : "year" === c && e.set("FullYear", b, e.get("FullYear", b) + g),
            (g = b.getTime() - f));
          if (d && O(a)) return f + g;
          this.xIncrement = f + g;
          return f;
        }
        setDataSortingOptions() {
          const a = this.options;
          b(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          q(a.pointRange) || (a.pointRange = 1);
        }
        setOptions(a) {
          var b = this.chart,
            c = b.options,
            d = c.plotOptions,
            e = b.userOptions || {};
          a = S(a);
          b = b.styledMode;
          const f = { plotOptions: d, userOptions: a };
          l(this, "setOptions", f);
          const g = f.plotOptions[this.type],
            h = e.plotOptions || {};
          this.userOptions = f.userOptions;
          e = S(g, d.series, e.plotOptions && e.plotOptions[this.type], a);
          this.tooltipOptions = S(
            r.tooltip,
            r.plotOptions.series && r.plotOptions.series.tooltip,
            r.plotOptions[this.type].tooltip,
            c.tooltip.userOptions,
            d.series && d.series.tooltip,
            d[this.type].tooltip,
            a.tooltip
          );
          this.stickyTracking = G(
            a.stickyTracking,
            h[this.type] && h[this.type].stickyTracking,
            h.series && h.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : e.stickyTracking
          );
          null === g.marker && delete e.marker;
          this.zoneAxis = e.zoneAxis;
          d = this.zones = (e.zones || []).slice();
          (!e.negativeColor && !e.negativeFillColor) ||
            e.zones ||
            ((c = {
              value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
              className: "highcharts-negative",
            }),
            b ||
              ((c.color = e.negativeColor),
              (c.fillColor = e.negativeFillColor)),
            d.push(c));
          d.length &&
            q(d[d.length - 1].value) &&
            d.push(b ? {} : { color: this.color, fillColor: this.fillColor });
          l(this, "afterSetOptions", { options: e });
          return e;
        }
        getName() {
          return G(this.options.name, "Series " + (this.index + 1));
        }
        getCyclic(a, b, c) {
          const d = this.chart,
            e = this.userOptions,
            f = a + "Index",
            g = a + "Counter",
            l = c ? c.length : G(d.options.chart[a + "Count"], d[a + "Count"]);
          if (!b) {
            var h = G(e[f], e["_" + f]);
            q(h) ||
              (d.series.length || (d[g] = 0),
              (e["_" + f] = h = d[g] % l),
              (d[g] += 1));
            c && (b = c[h]);
          }
          "undefined" !== typeof h && (this[f] = h);
          this[a] = b;
        }
        getColor() {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = "#cccccc")
            : this.getCyclic(
                "color",
                this.options.color || r.plotOptions[this.type].color,
                this.chart.options.colors
              );
        }
        getPointsCollection() {
          return (this.hasGroupedData ? this.points : this.data) || [];
        }
        getSymbol() {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        }
        findPointIndex(a, b) {
          const c = a.id,
            d = a.x,
            e = this.points;
          var f = this.options.dataSorting,
            g;
          let l, h;
          if (c) (f = this.chart.get(c)), f instanceof E && (g = f);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((g = (b) => !b.touched && b.index === a.index),
              f && f.matchByName
                ? (g = (b) => !b.touched && b.name === a.name)
                : this.options.relativeXValue &&
                  (g = (b) => !b.touched && b.options.x === a.x),
              (g = p(e, g)),
              !g)
            )
              return;
          g && ((h = g && g.index), "undefined" !== typeof h && (l = !0));
          "undefined" === typeof h && O(d) && (h = this.xData.indexOf(d, b));
          -1 !== h &&
            "undefined" !== typeof h &&
            this.cropped &&
            (h = h >= this.cropStart ? h - this.cropStart : h);
          !l && O(h) && e[h] && e[h].touched && (h = void 0);
          return h;
        }
        updateData(a, b) {
          const c = this.options,
            d = c.dataSorting,
            e = this.points,
            f = [],
            g = this.requireSorting,
            l = a.length === e.length;
          let h,
            k,
            p,
            m = !0;
          this.xIncrement = null;
          a.forEach(function (a, b) {
            var k =
              (q(a) &&
                this.pointClass.prototype.optionsToObject.call(
                  { series: this },
                  a
                )) ||
              {};
            const m = k.x;
            if (k.id || O(m)) {
              if (
                ((k = this.findPointIndex(k, p)),
                -1 === k || "undefined" === typeof k
                  ? f.push(a)
                  : e[k] && a !== c.data[k]
                  ? (e[k].update(a, !1, null, !1),
                    (e[k].touched = !0),
                    g && (p = k + 1))
                  : e[k] && (e[k].touched = !0),
                !l || b !== k || (d && d.enabled) || this.hasDerivedData)
              )
                h = !0;
            } else f.push(a);
          }, this);
          if (h)
            for (a = e.length; a--; )
              (k = e[a]) && !k.touched && k.remove && k.remove(!1, b);
          else
            !l || (d && d.enabled)
              ? (m = !1)
              : (a.forEach(function (a, b) {
                  a === e[b].y ||
                    e[b].destroyed ||
                    e[b].update(a, !1, null, !1);
                }),
                (f.length = 0));
          e.forEach(function (a) {
            a && (a.touched = !1);
          });
          if (!m) return !1;
          f.forEach(function (a) {
            this.addPoint(a, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = F(this.xData)), this.autoIncrement());
          return !0;
        }
        setData(a, b = !0, d, e) {
          var f;
          const g = this,
            l = g.points,
            h = (l && l.length) || 0,
            k = g.options,
            p = g.chart,
            m = k.dataSorting,
            q = g.xAxis,
            n = k.turboThreshold,
            r = this.xData,
            t = this.yData;
          var D = g.pointArrayMap;
          D = D && D.length;
          const x = k.keys;
          let v,
            u = 0,
            J = 1,
            z = null;
          if (!p.options.chart.allowMutatingData) {
            k.data && delete g.options.data;
            g.userOptions.data && delete g.userOptions.data;
            var w = S(!0, a);
          }
          a = w || a || [];
          w = a.length;
          m && m.enabled && (a = this.sortData(a));
          p.options.chart.allowMutatingData &&
            !1 !== e &&
            w &&
            h &&
            !g.cropped &&
            !g.hasGroupedData &&
            g.visible &&
            !g.boosted &&
            (v = this.updateData(a, d));
          if (!v) {
            g.xIncrement = null;
            g.colorCounter = 0;
            this.parallelArrays.forEach(function (a) {
              g[a + "Data"].length = 0;
            });
            if (n && w > n)
              if (((z = g.getFirstValidPoint(a)), O(z)))
                for (d = 0; d < w; d++)
                  (r[d] = this.autoIncrement()), (t[d] = a[d]);
              else if (N(z))
                if (D)
                  if (z.length === D)
                    for (d = 0; d < w; d++)
                      (r[d] = this.autoIncrement()), (t[d] = a[d]);
                  else
                    for (d = 0; d < w; d++)
                      (e = a[d]), (r[d] = e[0]), (t[d] = e.slice(1, D + 1));
                else if (
                  (x &&
                    ((u = x.indexOf("x")),
                    (J = x.indexOf("y")),
                    (u = 0 <= u ? u : 0),
                    (J = 0 <= J ? J : 1)),
                  1 === z.length && (J = 0),
                  u === J)
                )
                  for (d = 0; d < w; d++)
                    (r[d] = this.autoIncrement()), (t[d] = a[d][J]);
                else
                  for (d = 0; d < w; d++)
                    (e = a[d]), (r[d] = e[u]), (t[d] = e[J]);
              else c(12, !1, p);
            else
              for (d = 0; d < w; d++)
                (e = { series: g }),
                  g.pointClass.prototype.applyOptions.apply(e, [a[d]]),
                  g.updateParallelArrays(e, d);
            t && Z(t[0]) && c(14, !0, p);
            g.data = [];
            g.options.data = g.userOptions.data = a;
            for (d = h; d--; )
              null === (f = l[d]) || void 0 === f ? void 0 : f.destroy();
            q && (q.minRange = q.userMinRange);
            g.isDirty = p.isDirtyBox = !0;
            g.isDirtyData = !!l;
            d = !1;
          }
          "point" === k.legendType &&
            (this.processData(), this.generatePoints());
          b && p.redraw(d);
        }
        sortData(a) {
          const b = this,
            c = b.options.dataSorting.sortKey || "y",
            d = function (a, b) {
              return (
                (q(b) &&
                  a.pointClass.prototype.optionsToObject.call(
                    { series: a },
                    b
                  )) ||
                {}
              );
            };
          a.forEach(function (c, e) {
            a[e] = d(b, c);
            a[e].index = e;
          }, this);
          a.concat()
            .sort((a, b) => {
              a = L(c, a);
              b = L(c, b);
              return b < a ? -1 : b > a ? 1 : 0;
            })
            .forEach(function (a, b) {
              a.x = b;
            }, this);
          b.linkedSeries &&
            b.linkedSeries.forEach(function (b) {
              const c = b.options,
                e = c.data;
              (c.dataSorting && c.dataSorting.enabled) ||
                !e ||
                (e.forEach(function (c, f) {
                  e[f] = d(b, c);
                  a[f] && ((e[f].x = a[f].x), (e[f].index = f));
                }),
                b.setData(e, !1));
            });
          return a;
        }
        getProcessedData(a) {
          var b = this.xAxis,
            d = this.options,
            e = d.cropThreshold;
          const f = a || this.getExtremesFromAll || d.getExtremesFromAll,
            g = this.isCartesian;
          a = b && b.val2lin;
          d = !(!b || !b.logarithmic);
          let l = 0,
            h;
          let k,
            p,
            m = this.xData,
            q = this.yData,
            n = this.requireSorting;
          var r = !1;
          const t = m.length;
          b &&
            ((r = b.getExtremes()),
            (k = r.min),
            (p = r.max),
            (r = !(!b.categories || b.names.length)));
          if (g && this.sorted && !f && (!e || t > e || this.forceCrop))
            if (m[t - 1] < k || m[0] > p) (m = []), (q = []);
            else if (this.yData && (m[0] < k || m[t - 1] > p)) {
              var D = this.cropData(this.xData, this.yData, k, p);
              m = D.xData;
              q = D.yData;
              l = D.start;
              D = !0;
            }
          for (e = m.length || 1; --e; )
            (b = d ? a(m[e]) - a(m[e - 1]) : m[e] - m[e - 1]),
              0 < b && ("undefined" === typeof h || b < h)
                ? (h = b)
                : 0 > b && n && !r && (c(15, !1, this.chart), (n = !1));
          return {
            xData: m,
            yData: q,
            cropped: D,
            cropStart: l,
            closestPointRange: h,
          };
        }
        processData(a) {
          const b = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !b.isDirty &&
            !this.yAxis.isDirty &&
            !a
          )
            return !1;
          a = this.getProcessedData();
          this.cropped = a.cropped;
          this.cropStart = a.cropStart;
          this.processedXData = a.xData;
          this.processedYData = a.yData;
          this.closestPointRange = this.basePointRange = a.closestPointRange;
          l(this, "afterProcessData");
        }
        cropData(a, b, c, d, e) {
          const f = a.length;
          let g,
            l = 0,
            h = f;
          e = G(e, this.cropShoulder);
          for (g = 0; g < f; g++)
            if (a[g] >= c) {
              l = Math.max(0, g - e);
              break;
            }
          for (c = g; c < f; c++)
            if (a[c] > d) {
              h = c + e;
              break;
            }
          return {
            xData: a.slice(l, h),
            yData: b.slice(l, h),
            start: l,
            end: h,
          };
        }
        generatePoints() {
          var a = this.options;
          const c = this.processedData || a.data,
            d = this.processedXData,
            e = this.processedYData,
            f = this.pointClass,
            g = d.length,
            h = this.cropStart || 0,
            k = this.hasGroupedData,
            p = a.keys,
            m = [];
          a = a.dataGrouping && a.dataGrouping.groupAll ? h : 0;
          let q;
          let n,
            r,
            t = this.data;
          if (!t && !k) {
            var x = [];
            x.length = c.length;
            t = this.data = x;
          }
          p && k && (this.options.keys = !1);
          for (r = 0; r < g; r++)
            (x = h + r),
              k
                ? ((n = new f().init(this, [d[r]].concat(M(e[r])))),
                  (n.dataGroup = this.groupMap[a + r]),
                  n.dataGroup.options &&
                    ((n.options = n.dataGroup.options),
                    b(n, n.dataGroup.options),
                    delete n.dataLabels))
                : (n = t[x]) ||
                  "undefined" === typeof c[x] ||
                  (t[x] = n = new f().init(this, c[x], d[r])),
              n && ((n.index = k ? a + r : x), (m[r] = n));
          this.options.keys = p;
          if (t && (g !== (q = t.length) || k))
            for (r = 0; r < q; r++)
              r !== h || k || (r += g),
                t[r] && (t[r].destroyElements(), (t[r].plotX = void 0));
          this.data = t;
          this.points = m;
          l(this, "afterGeneratePoints");
        }
        getXExtremes(a) {
          return { min: z(a), max: F(a) };
        }
        getExtremes(a, b) {
          const c = this.xAxis;
          var d = this.yAxis;
          const e = this.processedXData || this.xData,
            f = [],
            g = this.requireSorting ? this.cropShoulder : 0;
          d = d ? d.positiveValuesOnly : !1;
          let h,
            k = 0,
            p = 0,
            m = 0;
          a = a || this.stackedYData || this.processedYData || [];
          const q = a.length;
          if (c) {
            var n = c.getExtremes();
            k = n.min;
            p = n.max;
          }
          for (h = 0; h < q; h++) {
            var r = e[h];
            n = a[h];
            var t = (O(n) || N(n)) && (n.length || 0 < n || !d);
            r =
              b ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !c ||
              ((e[h + g] || r) >= k && (e[h - g] || r) <= p);
            if (t && r)
              if ((t = n.length)) for (; t--; ) O(n[t]) && (f[m++] = n[t]);
              else f[m++] = n;
          }
          a = { activeYData: f, dataMin: z(f), dataMax: F(f) };
          l(this, "afterGetExtremes", { dataExtremes: a });
          return a;
        }
        applyExtremes() {
          const a = this.getExtremes();
          this.dataMin = a.dataMin;
          this.dataMax = a.dataMax;
          return a;
        }
        getFirstValidPoint(a) {
          const b = a.length;
          let c = 0,
            d = null;
          for (; null === d && c < b; ) (d = a[c]), c++;
          return d;
        }
        translate() {
          var a;
          this.processedXData || this.processData();
          this.generatePoints();
          const b = this.options,
            c = b.stacking,
            f = this.xAxis,
            g = f.categories,
            h = this.enabledDataSorting,
            k = this.yAxis,
            p = this.points,
            m = p.length,
            n = this.pointPlacementToXValue(),
            r = !!n,
            t = b.threshold,
            x = b.startFromThreshold ? t : 0,
            v = this.zoneAxis || "y";
          let u,
            z,
            w,
            F,
            L = Number.MAX_VALUE;
          for (u = 0; u < m; u++) {
            const l = p[u],
              m = l.x;
            let D,
              J,
              P = l.y,
              I = l.low;
            const A =
              c &&
              (null === (a = k.stacking) || void 0 === a
                ? void 0
                : a.stacks[
                    (this.negStacks && P < (x ? 0 : t) ? "-" : "") +
                      this.stackKey
                  ]);
            z = f.translate(m, !1, !1, !1, !0, n);
            l.plotX = O(z) ? d(e(z, -1e5, 1e5)) : void 0;
            c &&
              this.visible &&
              A &&
              A[m] &&
              ((F = this.getStackIndicator(F, m, this.index)),
              !l.isNull && F.key && ((D = A[m]), (J = D.points[F.key])),
              D &&
                N(J) &&
                ((I = J[0]),
                (P = J[1]),
                I === x && F.key === A[m].base && (I = G(O(t) ? t : k.min)),
                k.positiveValuesOnly && q(I) && 0 >= I && (I = void 0),
                (l.total = l.stackTotal = G(D.total)),
                (l.percentage =
                  q(l.y) && D.total ? (l.y / D.total) * 100 : void 0),
                (l.stackY = P),
                this.irregularWidths ||
                  D.setOffset(
                    this.pointXOffset || 0,
                    this.barW || 0,
                    void 0,
                    void 0,
                    void 0,
                    this.xAxis
                  )));
            l.yBottom = q(I)
              ? e(k.translate(I, !1, !0, !1, !0), -1e5, 1e5)
              : void 0;
            this.dataModify && (P = this.dataModify.modifyValue(P, u));
            let y;
            O(P) &&
              void 0 !== l.plotX &&
              ((y = k.translate(P, !1, !0, !1, !0)),
              (y = O(y) ? e(y, -1e5, 1e5) : void 0));
            l.plotY = y;
            l.isInside = this.isPointInside(l);
            l.clientX = r ? d(f.translate(m, !1, !1, !1, !0, n)) : z;
            l.negative = l[v] < (b[v + "Threshold"] || t || 0);
            l.category = G(g && g[l.x], l.x);
            l.isNull ||
              !1 === l.visible ||
              ("undefined" !== typeof w && (L = Math.min(L, Math.abs(z - w))),
              (w = z));
            l.zone = this.zones.length ? l.getZone() : void 0;
            !l.graphic && this.group && h && (l.isNew = !0);
          }
          this.closestPointRangePx = L;
          l(this, "afterTranslate");
        }
        getValidPoints(a, b, c) {
          const d = this.chart;
          return (a || this.points || []).filter(function (a) {
            const { plotX: e, plotY: f } = a;
            return (!c && (a.isNull || !O(f))) ||
              (b && !d.isInsidePlot(e, f, { inverted: d.inverted }))
              ? !1
              : !1 !== a.visible;
          });
        }
        getClipBox() {
          const { chart: a, xAxis: b, yAxis: c } = this,
            d = S(a.clipBox);
          b && b.len !== a.plotSizeX && (d.width = b.len);
          c && c.len !== a.plotSizeY && (d.height = c.len);
          return d;
        }
        getSharedClipKey() {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + "," + (this.options.yAxis || 0));
        }
        setClip() {
          const { chart: a, group: b, markerGroup: c } = this,
            d = a.sharedClips,
            e = a.renderer,
            f = this.getClipBox(),
            g = this.getSharedClipKey();
          let l = d[g];
          l ? l.animate(f) : (d[g] = l = e.clipRect(f));
          b && b.clip(!1 === this.options.clip ? void 0 : l);
          c && c.clip();
        }
        animate(a) {
          const { chart: b, group: c, markerGroup: d } = this,
            e = b.inverted;
          var g = f(this.options.animation),
            l = [this.getSharedClipKey(), g.duration, g.easing, g.defer].join();
          let h = b.sharedClips[l],
            k = b.sharedClips[l + "m"];
          if (a && c)
            (g = this.getClipBox()),
              h
                ? h.attr("height", g.height)
                : ((g.width = 0),
                  e && (g.x = b.plotHeight),
                  (h = b.renderer.clipRect(g)),
                  (b.sharedClips[l] = h),
                  (k = b.renderer.clipRect({
                    x: -99,
                    y: -99,
                    width: e ? b.plotWidth + 199 : 99,
                    height: e ? 99 : b.plotHeight + 199,
                  })),
                  (b.sharedClips[l + "m"] = k)),
              c.clip(h),
              d && d.clip(k);
          else if (h && !h.hasClass("highcharts-animating")) {
            l = this.getClipBox();
            const a = g.step;
            d &&
              d.element.childNodes.length &&
              (g.step = function (b, c) {
                a && a.apply(c, arguments);
                "width" === c.prop &&
                  k &&
                  k.element &&
                  k.attr(e ? "height" : "width", b + 99);
              });
            h.addClass("highcharts-animating").animate(l, g);
          }
        }
        afterAnimate() {
          this.setClip();
          U(this.chart.sharedClips, (a, b, c) => {
            a &&
              !this.chart.container.querySelector(
                `[clip-path="url(#${a.id})"]`
              ) &&
              (a.destroy(), delete c[b]);
          });
          this.finishedAnimating = !0;
          l(this, "afterAnimate");
        }
        drawPoints(a = this.points) {
          const b = this.chart,
            c = b.styledMode,
            { colorAxis: d, options: e } = this,
            f = e.marker,
            g = this[this.specialGroup || "markerGroup"],
            l = this.xAxis,
            h = G(
              f.enabled,
              !l || l.isRadial ? !0 : null,
              this.closestPointRangePx >= f.enabledThreshold * f.radius
            );
          let k, p, m, q;
          let n, r;
          if (!1 !== f.enabled || this._hasPointMarkers)
            for (k = 0; k < a.length; k++) {
              p = a[k];
              q = (m = p.graphic) ? "animate" : "attr";
              var t = p.marker || {};
              n = !!p.marker;
              if (
                ((h && "undefined" === typeof t.enabled) || t.enabled) &&
                !p.isNull &&
                !1 !== p.visible
              ) {
                const a = G(t.symbol, this.symbol, "rect");
                r = this.markerAttribs(p, p.selected && "select");
                this.enabledDataSorting &&
                  (p.startXPos = l.reversed ? -(r.width || 0) : l.width);
                const e = !1 !== p.isInside;
                !m &&
                  e &&
                  (0 < (r.width || 0) || p.hasImage) &&
                  ((p.graphic = m =
                    b.renderer
                      .symbol(a, r.x, r.y, r.width, r.height, n ? t : f)
                      .add(g)),
                  this.enabledDataSorting &&
                    b.hasRendered &&
                    (m.attr({ x: p.startXPos }), (q = "animate")));
                m && "animate" === q && m[e ? "show" : "hide"](e).animate(r);
                if (m)
                  if (
                    ((t = this.pointAttribs(
                      p,
                      c || !p.selected ? void 0 : "select"
                    )),
                    c)
                  )
                    d && m.css({ fill: t.fill });
                  else m[q](t);
                m && m.addClass(p.getClassName(), !0);
              } else m && (p.graphic = m.destroy());
            }
        }
        markerAttribs(a, b) {
          const c = this.options;
          var d = c.marker;
          const e = a.marker || {},
            f = e.symbol || d.symbol,
            g = {};
          let l = G(e.radius, d && d.radius);
          b &&
            ((d = d.states[b]),
            (b = e.states && e.states[b]),
            (l = G(
              b && b.radius,
              d && d.radius,
              l && l + ((d && d.radiusPlus) || 0)
            )));
          a.hasImage = f && 0 === f.indexOf("url");
          a.hasImage && (l = 0);
          a = a.pos();
          O(l) &&
            a &&
            ((g.x = a[0] - l),
            (g.y = a[1] - l),
            c.crisp && (g.x = Math.floor(g.x)));
          l && (g.width = g.height = 2 * l);
          return g;
        }
        pointAttribs(a, b) {
          var c = this.options.marker,
            d = a && a.options;
          const e = (d && d.marker) || {};
          var f = d && d.color,
            g = a && a.color;
          const l = a && a.zone && a.zone.color;
          let h = this.color;
          a = G(e.lineWidth, c.lineWidth);
          d = 1;
          h = f || l || g || h;
          f = e.fillColor || c.fillColor || h;
          g = e.lineColor || c.lineColor || h;
          b = b || "normal";
          c = c.states[b] || {};
          b = (e.states && e.states[b]) || {};
          a = G(
            b.lineWidth,
            c.lineWidth,
            a + G(b.lineWidthPlus, c.lineWidthPlus, 0)
          );
          f = b.fillColor || c.fillColor || f;
          g = b.lineColor || c.lineColor || g;
          d = G(b.opacity, c.opacity, d);
          return { stroke: g, "stroke-width": a, fill: f, opacity: d };
        }
        destroy(a) {
          const b = this,
            c = b.chart,
            d = /AppleWebKit\/533/.test(g.navigator.userAgent),
            e = b.data || [];
          let f, h, k, p;
          l(b, "destroy", { keepEventsForUpdate: a });
          this.removeEvents(a);
          (b.axisTypes || []).forEach(function (a) {
            (p = b[a]) &&
              p.series &&
              (x(p.series, b), (p.isDirty = p.forceRedraw = !0));
          });
          b.legendItem && b.chart.legend.destroyItem(b);
          for (h = e.length; h--; ) (k = e[h]) && k.destroy && k.destroy();
          b.clips && b.clips.forEach((a) => a.destroy());
          v.clearTimeout(b.animationTimeout);
          U(b, function (a, b) {
            a instanceof u &&
              !a.survive &&
              ((f = d && "group" === b ? "hide" : "destroy"), a[f]());
          });
          c.hoverSeries === b && (c.hoverSeries = void 0);
          x(c.series, b);
          c.orderSeries();
          U(b, function (c, d) {
            (a && "hcEvents" === d) || delete b[d];
          });
        }
        applyZones() {
          const a = this,
            b = this.chart,
            c = b.renderer,
            d = this.zones,
            f = this.clips || [],
            g = this.graph,
            l = this.area,
            h = Math.max(b.plotWidth, b.plotHeight),
            k = this[(this.zoneAxis || "y") + "Axis"],
            p = b.inverted;
          let m,
            q,
            n,
            r,
            t,
            x,
            v,
            u,
            z,
            w,
            F,
            L = !1;
          d.length && (g || l) && k && "undefined" !== typeof k.min
            ? ((t = k.reversed),
              (x = k.horiz),
              g && !this.showLine && g.hide(),
              l && l.hide(),
              (r = k.getExtremes()),
              d.forEach(function (d, D) {
                m = t ? (x ? b.plotWidth : 0) : x ? 0 : k.toPixels(r.min) || 0;
                m = e(G(q, m), 0, h);
                q = e(Math.round(k.toPixels(G(d.value, r.max), !0) || 0), 0, h);
                L && (m = q = k.toPixels(r.max));
                v = Math.abs(m - q);
                u = Math.min(m, q);
                z = Math.max(m, q);
                k.isXAxis
                  ? ((n = { x: p ? z : u, y: 0, width: v, height: h }),
                    x || (n.x = b.plotHeight - n.x))
                  : ((n = { x: 0, y: p ? z : u, width: h, height: v }),
                    x && (n.y = b.plotWidth - n.y));
                f[D] ? f[D].animate(n) : (f[D] = c.clipRect(n));
                w = a["zone-area-" + D];
                F = a["zone-graph-" + D];
                g && F && F.clip(f[D]);
                l && w && w.clip(f[D]);
                L = d.value > r.max;
                a.resetZones && 0 === q && (q = void 0);
              }),
              (this.clips = f))
            : a.visible && (g && g.show(), l && l.show());
        }
        plotGroup(a, b, c, d, e) {
          let f = this[a];
          const g = !f;
          c = { visibility: c, zIndex: d || 0.1 };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (c.opacity = this.opacity);
          g && (this[a] = f = this.chart.renderer.g().add(e));
          f.addClass(
            "highcharts-" +
              b +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (q(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          f.attr(c)[g ? "attr" : "animate"](this.getPlotBox(b));
          return f;
        }
        getPlotBox(a) {
          let b = this.xAxis,
            c = this.yAxis;
          const d = this.chart;
          a =
            d.inverted &&
            !d.polar &&
            b &&
            !1 !== this.invertible &&
            "series" === a;
          d.inverted && ((b = c), (c = this.xAxis));
          return {
            translateX: b ? b.left : d.plotLeft,
            translateY: c ? c.top : d.plotTop,
            rotation: a ? 90 : 0,
            rotationOriginX: a ? (b.len - c.len) / 2 : 0,
            rotationOriginY: a ? (b.len + c.len) / 2 : 0,
            scaleX: a ? -1 : 1,
            scaleY: 1,
          };
        }
        removeEvents(a) {
          a || Q(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind.length = 0));
        }
        render() {
          const a = this;
          var b = a.chart;
          const c = a.options,
            d = f(c.animation),
            e = a.visible ? "inherit" : "hidden",
            g = c.zIndex,
            h = a.hasRendered;
          b = b.seriesGroup;
          let k = a.finishedAnimating ? 0 : d.duration;
          l(this, "render");
          a.plotGroup("group", "series", e, g, b);
          a.markerGroup = a.plotGroup("markerGroup", "markers", e, g, b);
          !1 !== c.clip && a.setClip();
          a.animate && k && a.animate(!0);
          a.drawGraph && (a.drawGraph(), a.applyZones());
          a.visible && a.drawPoints();
          a.drawDataLabels && a.drawDataLabels();
          a.redrawPoints && a.redrawPoints();
          a.drawTracker &&
            !1 !== a.options.enableMouseTracking &&
            a.drawTracker();
          a.animate && k && a.animate();
          h ||
            (k && d.defer && (k += d.defer),
            (a.animationTimeout = fa(function () {
              a.afterAnimate();
            }, k || 0)));
          a.isDirty = !1;
          a.hasRendered = !0;
          l(a, "afterRender");
        }
        redraw() {
          const a = this.isDirty || this.isDirtyData;
          this.translate();
          this.render();
          a && delete this.kdTree;
        }
        searchPoint(a, b) {
          const c = this.xAxis,
            d = this.yAxis,
            e = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
              plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos,
            },
            b,
            a
          );
        }
        buildKDTree(a) {
          function b(a, d, e) {
            var f = a && a.length;
            let g;
            if (f)
              return (
                (g = c.kdAxisArray[d % e]),
                a.sort(function (a, b) {
                  return a[g] - b[g];
                }),
                (f = Math.floor(f / 2)),
                {
                  point: a[f],
                  left: b(a.slice(0, f), d + 1, e),
                  right: b(a.slice(f + 1), d + 1, e),
                }
              );
          }
          this.buildingKdTree = !0;
          const c = this,
            d = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete c.kdTree;
          fa(
            function () {
              c.kdTree = b(c.getValidPoints(null, !c.directTouch), d, d);
              c.buildingKdTree = !1;
            },
            c.options.kdNow || (a && "touchstart" === a.type) ? 0 : 1
          );
        }
        searchKDTree(a, b, c) {
          function d(a, b, c, h) {
            const k = b.point;
            var p = e.kdAxisArray[c % h];
            let m = k;
            var n = q(a[f]) && q(k[f]) ? Math.pow(a[f] - k[f], 2) : null;
            var r = q(a[g]) && q(k[g]) ? Math.pow(a[g] - k[g], 2) : null;
            r = (n || 0) + (r || 0);
            k.dist = q(r) ? Math.sqrt(r) : Number.MAX_VALUE;
            k.distX = q(n) ? Math.sqrt(n) : Number.MAX_VALUE;
            p = a[p] - k[p];
            r = 0 > p ? "left" : "right";
            n = 0 > p ? "right" : "left";
            b[r] && ((r = d(a, b[r], c + 1, h)), (m = r[l] < m[l] ? r : k));
            b[n] &&
              Math.sqrt(p * p) < m[l] &&
              ((a = d(a, b[n], c + 1, h)), (m = a[l] < m[l] ? a : m));
            return m;
          }
          const e = this,
            f = this.kdAxisArray[0],
            g = this.kdAxisArray[1],
            l = b ? "distX" : "dist";
          b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(c);
          if (this.kdTree) return d(a, this.kdTree, b, b);
        }
        pointPlacementToXValue() {
          const {
            options: { pointPlacement: a, pointRange: b },
            xAxis: c,
          } = this;
          let d = a;
          "between" === d && (d = c.reversed ? -0.5 : 0.5);
          return O(d) ? d * (b || c.pointRange) : 0;
        }
        isPointInside(a) {
          const { chart: b, xAxis: c, yAxis: d } = this;
          return (
            "undefined" !== typeof a.plotY &&
            "undefined" !== typeof a.plotX &&
            0 <= a.plotY &&
            a.plotY <= (d ? d.len : b.plotHeight) &&
            0 <= a.plotX &&
            a.plotX <= (c ? c.len : b.plotWidth)
          );
        }
        drawTracker() {
          const a = this,
            b = a.options,
            c = b.trackByArea,
            d = [].concat(c ? a.areaPath : a.graphPath),
            e = a.chart,
            f = e.pointer,
            g = e.renderer,
            h = e.options.tooltip.snap,
            p = a.tracker,
            m = function (b) {
              if (e.hoverSeries !== a) a.onMouseOver();
            },
            q = "rgba(192,192,192," + (k ? 0.0001 : 0.002) + ")";
          p
            ? p.attr({ d })
            : a.graph &&
              ((a.tracker = g
                .path(d)
                .attr({
                  visibility: a.visible ? "inherit" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  c ? "highcharts-tracker-area" : "highcharts-tracker-line"
                )
                .add(a.group)),
              e.styledMode ||
                a.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: q,
                  fill: c ? q : "none",
                  "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * h),
                }),
              [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function (
                a
              ) {
                if (
                  a &&
                  (a
                    .addClass("highcharts-tracker")
                    .on("mouseover", m)
                    .on("mouseout", function (a) {
                      f.onTrackerMouseOut(a);
                    }),
                  b.cursor && !e.styledMode && a.css({ cursor: b.cursor }),
                  n)
                )
                  a.on("touchstart", m);
              }));
          l(this, "afterDrawTracker");
        }
        addPoint(a, b, c, d, e) {
          const f = this.options,
            g = this.data,
            h = this.chart;
          var k = this.xAxis;
          k = k && k.hasNames && k.names;
          const p = f.data,
            m = this.xData;
          let q, n;
          b = G(b, !0);
          const r = { series: this };
          this.pointClass.prototype.applyOptions.apply(r, [a]);
          const t = r.x;
          n = m.length;
          if (this.requireSorting && t < m[n - 1])
            for (q = !0; n && m[n - 1] > t; ) n--;
          this.updateParallelArrays(r, "splice", [n, 0, 0]);
          this.updateParallelArrays(r, n);
          k && r.name && (k[t] = r.name);
          p.splice(n, 0, a);
          if (q || this.processedData)
            this.data.splice(n, 0, null), this.processData();
          "point" === f.legendType && this.generatePoints();
          c &&
            (g[0] && g[0].remove
              ? g[0].remove(!1)
              : (g.shift(), this.updateParallelArrays(r, "shift"), p.shift()));
          !1 !== e && l(this, "addPoint", { point: r });
          this.isDirtyData = this.isDirty = !0;
          b && h.redraw(d);
        }
        removePoint(a, b, c) {
          const d = this,
            e = d.data,
            f = e[a],
            g = d.points,
            l = d.chart,
            k = function () {
              g && g.length === e.length && g.splice(a, 1);
              e.splice(a, 1);
              d.options.data.splice(a, 1);
              d.updateParallelArrays(f || { series: d }, "splice", [a, 1]);
              f && f.destroy();
              d.isDirty = !0;
              d.isDirtyData = !0;
              b && l.redraw();
            };
          h(c, l);
          b = G(b, !0);
          f ? f.firePointEvent("remove", null, k) : k();
        }
        remove(a, b, c, d) {
          function e() {
            f.destroy(d);
            g.isDirtyLegend = g.isDirtyBox = !0;
            g.linkSeries(d);
            G(a, !0) && g.redraw(b);
          }
          const f = this,
            g = f.chart;
          !1 !== c ? l(f, "remove", null, e) : e();
        }
        update(a, d) {
          a = t(a, this.userOptions);
          l(this, "update", { options: a });
          const e = this,
            f = e.chart;
          var g = e.userOptions;
          const h = e.initialType || e.type;
          var k = f.options.plotOptions;
          const p = w[h].prototype;
          var m = e.finishedAnimating && { animation: !1 };
          const q = {};
          let n,
            r = ["eventOptions", "navigatorSeries", "baseSeries"],
            x = a.type || g.type || f.options.chart.type;
          const v = !(
            this.hasDerivedData ||
            (x && x !== this.type) ||
            "undefined" !== typeof a.pointStart ||
            "undefined" !== typeof a.pointInterval ||
            "undefined" !== typeof a.relativeXValue ||
            a.joinBy ||
            a.mapData ||
            e.hasOptionChanged("dataGrouping") ||
            e.hasOptionChanged("pointStart") ||
            e.hasOptionChanged("pointInterval") ||
            e.hasOptionChanged("pointIntervalUnit") ||
            e.hasOptionChanged("keys")
          );
          x = x || h;
          v &&
            (r.push(
              "data",
              "isDirtyData",
              "points",
              "processedData",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "level",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== a.visible && r.push("area", "graph"),
            e.parallelArrays.forEach(function (a) {
              r.push(a + "Data");
            }),
            a.data &&
              (a.dataSorting && b(e.options.dataSorting, a.dataSorting),
              this.setData(a.data, !1)));
          a = S(
            g,
            m,
            {
              index: "undefined" === typeof g.index ? e.index : g.index,
              pointStart: G(
                k && k.series && k.series.pointStart,
                g.pointStart,
                e.xData[0]
              ),
            },
            !v && { data: e.options.data },
            a
          );
          v && a.data && (a.data = e.options.data);
          r = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
          ].concat(r);
          r.forEach(function (a) {
            r[a] = e[a];
            delete e[a];
          });
          k = !1;
          if (w[x]) {
            if (((k = x !== e.type), e.remove(!1, !1, !1, !0), k))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(e, w[x].prototype);
              else {
                m = Object.hasOwnProperty.call(e, "hcEvents") && e.hcEvents;
                for (n in p) e[n] = void 0;
                b(e, w[x].prototype);
                m ? (e.hcEvents = m) : delete e.hcEvents;
              }
          } else c(17, !0, f, { missingModuleFor: x });
          r.forEach(function (a) {
            e[a] = r[a];
          });
          e.init(f, a);
          if (v && this.points) {
            a = e.options;
            if (!1 === a.visible) (q.graphic = 1), (q.dataLabel = 1);
            else if (!e._hasPointLabels) {
              const { marker: b, dataLabels: c } = a;
              g = g.marker || {};
              !b ||
                (!1 !== b.enabled &&
                  g.symbol === b.symbol &&
                  g.height === b.height &&
                  g.width === b.width) ||
                (q.graphic = 1);
              c && !1 === c.enabled && (q.dataLabel = 1);
            }
            for (const b of this.points)
              b &&
                b.series &&
                (b.resolveColor(),
                Object.keys(q).length && b.destroyElements(q),
                !1 === a.showInLegend &&
                  b.legendItem &&
                  f.legend.destroyItem(b));
          }
          e.initialType = h;
          f.linkSeries();
          k && e.linkedSeries.length && (e.isDirtyData = !0);
          l(this, "afterUpdate");
          G(d, !0) && f.redraw(v ? void 0 : !1);
        }
        setName(a) {
          this.name = this.options.name = this.userOptions.name = a;
          this.chart.isDirtyLegend = !0;
        }
        hasOptionChanged(a) {
          const b = this.options[a],
            c = this.chart.options.plotOptions,
            d = this.userOptions[a];
          return d
            ? b !== d
            : b !==
                G(
                  c && c[this.type] && c[this.type][a],
                  c && c.series && c.series[a],
                  b
                );
        }
        onMouseOver() {
          const a = this.chart,
            b = a.hoverSeries;
          a.pointer.setHoverChartIndex();
          if (b && b !== this) b.onMouseOut();
          this.options.events.mouseOver && l(this, "mouseOver");
          this.setState("hover");
          a.hoverSeries = this;
        }
        onMouseOut() {
          const a = this.options,
            b = this.chart,
            c = b.tooltip,
            d = b.hoverPoint;
          b.hoverSeries = null;
          if (d) d.onMouseOut();
          this && a.events.mouseOut && l(this, "mouseOut");
          !c ||
            this.stickyTracking ||
            (c.shared && !this.noSharedTooltip) ||
            c.hide();
          b.series.forEach(function (a) {
            a.setState("", !0);
          });
        }
        setState(a, b) {
          const c = this;
          var d = c.options;
          const e = c.graph,
            f = d.inactiveOtherPoints,
            g = d.states,
            l = G(
              g[a || "normal"] && g[a || "normal"].animation,
              c.chart.options.chart.animation
            );
          let h = d.lineWidth,
            k = 0,
            p = d.opacity;
          a = a || "";
          if (
            c.state !== a &&
            ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (b) {
              b &&
                (c.state && b.removeClass("highcharts-series-" + c.state),
                a && b.addClass("highcharts-series-" + a));
            }),
            (c.state = a),
            !c.chart.styledMode)
          ) {
            if (g[a] && !1 === g[a].enabled) return;
            a &&
              ((h = g[a].lineWidth || h + (g[a].lineWidthPlus || 0)),
              (p = G(g[a].opacity, p)));
            if (e && !e.dashstyle && O(h))
              for (
                d = { "stroke-width": h }, e.animate(d, l);
                c["zone-graph-" + k];

              )
                c["zone-graph-" + k].animate(d, l), (k += 1);
            f ||
              [
                c.group,
                c.markerGroup,
                c.dataLabelsGroup,
                c.labelBySeries,
              ].forEach(function (a) {
                a && a.animate({ opacity: p }, l);
              });
          }
          b && f && c.points && c.setAllPointsToState(a || void 0);
        }
        setAllPointsToState(a) {
          this.points.forEach(function (b) {
            b.setState && b.setState(a);
          });
        }
        setVisible(a, b) {
          const c = this,
            d = c.chart,
            e = d.options.chart.ignoreHiddenSeries,
            f = c.visible,
            g = (c.visible =
              a =
              c.options.visible =
              c.userOptions.visible =
                "undefined" === typeof a ? !f : a)
              ? "show"
              : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (a) {
              if (c[a]) c[a][g]();
            }
          );
          if (
            d.hoverSeries === c ||
            (d.hoverPoint && d.hoverPoint.series) === c
          )
            c.onMouseOut();
          c.legendItem && d.legend.colorizeItem(c, a);
          c.isDirty = !0;
          c.options.stacking &&
            d.series.forEach(function (a) {
              a.options.stacking && a.visible && (a.isDirty = !0);
            });
          c.linkedSeries.forEach(function (b) {
            b.setVisible(a, !1);
          });
          e && (d.isDirtyBox = !0);
          l(c, g);
          !1 !== b && d.redraw();
        }
        show() {
          this.setVisible(!0);
        }
        hide() {
          this.setVisible(!1);
        }
        select(a) {
          this.selected =
            a =
            this.options.selected =
              "undefined" === typeof a ? !this.selected : a;
          this.checkbox && (this.checkbox.checked = a);
          l(this, a ? "select" : "unselect");
        }
        shouldShowTooltip(a, b, c = {}) {
          c.series = this;
          c.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(a, b, c);
        }
      }
      Y.defaultOptions = C;
      Y.types = A.seriesTypes;
      Y.registerType = A.registerSeriesType;
      b(Y.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: B.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: E,
        requireSorting: !0,
        sorted: !0,
      });
      A.series = Y;
      ("");
      ("");
      return Y;
    }
  );
  M(
    a,
    "Extensions/ScrollablePlotArea.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Series/Series.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E) {
      const { stop: w } = a,
        { addEvent: A, createElement: u, defined: v, merge: f, pick: h } = E;
      A(H, "afterSetChartSize", function (a) {
        var h = this.options.chart.scrollablePlotArea,
          n = h && h.minWidth;
        h = h && h.minHeight;
        let k;
        if (!this.renderer.forExport) {
          if (n) {
            if ((this.scrollablePixelsX = n = Math.max(0, n - this.chartWidth)))
              (this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                f(this.plotBox)),
                (this.plotBox.width = this.plotWidth += n),
                this.inverted
                  ? (this.clipBox.height += n)
                  : (this.clipBox.width += n),
                (k = { 1: { name: "right", value: n } });
          } else
            h &&
              ((this.scrollablePixelsY = n = Math.max(0, h - this.chartHeight)),
              v(n) &&
                ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                  f(this.plotBox)),
                (this.plotBox.height = this.plotHeight += n),
                this.inverted
                  ? (this.clipBox.width += n)
                  : (this.clipBox.height += n),
                (k = { 2: { name: "bottom", value: n } })));
          k &&
            !a.skipAxes &&
            this.axes.forEach(function (a) {
              k[a.side]
                ? (a.getPlotLinePath = function () {
                    let f = k[a.side].name,
                      g = this[f],
                      h;
                    this[f] = g - k[a.side].value;
                    h = y.prototype.getPlotLinePath.apply(this, arguments);
                    this[f] = g;
                    return h;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      A(H, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      H.prototype.setUpScrolling = function () {
        const a = {
          WebkitOverflowScrolling: "touch",
          overflowX: "hidden",
          overflowY: "hidden",
        };
        this.scrollablePixelsX && (a.overflowX = "auto");
        this.scrollablePixelsY && (a.overflowY = "auto");
        this.scrollingParent = u(
          "div",
          { className: "highcharts-scrolling-parent" },
          { position: "relative" },
          this.renderTo
        );
        this.scrollingContainer = u(
          "div",
          { className: "highcharts-scrolling" },
          a,
          this.scrollingParent
        );
        let f;
        A(this.scrollingContainer, "scroll", () => {
          this.pointer &&
            (delete this.pointer.chartPosition,
            this.hoverPoint && (f = this.hoverPoint),
            this.pointer.runPointActions(void 0, f, !0));
        });
        this.innerContainer = u(
          "div",
          { className: "highcharts-inner-container" },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      H.prototype.moveFixedElements = function () {
        let a = this.container,
          f = this.fixedRenderer,
          h =
            ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " "
            ),
          k;
        this.scrollablePixelsX && !this.inverted
          ? (k = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (k = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (k = ".highcharts-xaxis")
          : this.scrollablePixelsY &&
            this.inverted &&
            (k = ".highcharts-yaxis");
        k &&
          h.push(
            `${k}:not(.highcharts-radial-axis)`,
            `${k}-labels:not(.highcharts-radial-axis-labels)`
          );
        h.forEach(function (g) {
          [].forEach.call(a.querySelectorAll(g), function (a) {
            (a.namespaceURI === f.SVG_NS
              ? f.box
              : f.box.parentNode
            ).appendChild(a);
            a.style.pointerEvents = "auto";
          });
        });
      };
      H.prototype.applyFixed = function () {
        var a = !this.fixedDiv,
          f = this.options.chart,
          n = f.scrollablePlotArea,
          k = B.getRendererType();
        a
          ? ((this.fixedDiv = u(
              "div",
              { className: "highcharts-fixed" },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((f.style && f.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = f =
              new k(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = f
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": h(n.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            A(this, "afterShowResetZoom", this.moveFixedElements),
            A(this, "afterApplyDrilldown", this.moveFixedElements),
            A(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || a)
          (this.scrollableDirty = !1), this.moveFixedElements();
        f = this.chartWidth + (this.scrollablePixelsX || 0);
        k = this.chartHeight + (this.scrollablePixelsY || 0);
        w(this.container);
        this.container.style.width = f + "px";
        this.container.style.height = k + "px";
        this.renderer.boxWrapper.attr({
          width: f,
          height: k,
          viewBox: [0, 0, f, k].join(" "),
        });
        this.chartBackground.attr({ width: f, height: k });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        a &&
          (n.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * n.scrollPositionX),
          n.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * n.scrollPositionY));
        k = this.axisOffset;
        a = this.plotTop - k[0] - 1;
        n = this.plotLeft - k[3] - 1;
        f = this.plotTop + this.plotHeight + k[2] + 1;
        k = this.plotLeft + this.plotWidth + k[1] + 1;
        let g = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          v = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        a = this.scrollablePixelsX
          ? [
              ["M", 0, a],
              ["L", this.plotLeft - 1, a],
              ["L", this.plotLeft - 1, f],
              ["L", 0, f],
              ["Z"],
              ["M", g, a],
              ["L", this.chartWidth, a],
              ["L", this.chartWidth, f],
              ["L", g, f],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", n, 0],
              ["L", n, this.plotTop - 1],
              ["L", k, this.plotTop - 1],
              ["L", k, 0],
              ["Z"],
              ["M", n, v],
              ["L", n, this.chartHeight],
              ["L", k, this.chartHeight],
              ["L", k, v],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: a });
      };
      A(y, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      A(K, "show", function () {
        this.chart.scrollableDirty = !0;
      });
      ("");
    }
  );
  M(
    a,
    "Core/Axis/Stacking/StackItem.js",
    [
      a["Core/FormatUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { format: w } = a,
        { series: B } = y,
        { destroyObjectProperties: E, fireEvent: C, isNumber: A, pick: u } = H;
      class v {
        constructor(a, h, r, m, n) {
          const f = a.chart.inverted,
            g = a.reversed;
          this.axis = a;
          a = this.isNegative = !!r !== !!g;
          this.options = h = h || {};
          this.x = m;
          this.cumulative = this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = n;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: h.align || (f ? (a ? "left" : "right") : "center"),
            verticalAlign:
              h.verticalAlign || (f ? "middle" : a ? "bottom" : "top"),
            y: h.y,
            x: h.x,
          };
          this.textAlign =
            h.textAlign || (f ? (a ? "right" : "left") : "center");
        }
        destroy() {
          E(this, this.axis);
        }
        render(a) {
          const f = this.axis.chart,
            r = this.options;
          var m = r.format;
          m = m ? w(m, this, f) : r.formatter.call(this);
          this.label
            ? this.label.attr({ text: m, visibility: "hidden" })
            : ((this.label = f.renderer.label(
                m,
                null,
                void 0,
                r.shape,
                void 0,
                void 0,
                r.useHTML,
                !1,
                "stack-labels"
              )),
              (m = {
                r: r.borderRadius || 0,
                text: m,
                padding: u(r.padding, 5),
                visibility: "hidden",
              }),
              f.styledMode ||
                ((m.fill = r.backgroundColor),
                (m.stroke = r.borderColor),
                (m["stroke-width"] = r.borderWidth),
                this.label.css(r.style || {})),
              this.label.attr(m),
              this.label.added || this.label.add(a));
          this.label.labelrank = f.plotSizeY;
          C(this, "afterRender");
        }
        setOffset(a, h, r, m, n, k) {
          const {
              alignOptions: f,
              axis: v,
              label: w,
              options: z,
              textAlign: e,
            } = this,
            t = v.chart;
          r = this.getStackBox({
            xOffset: a,
            width: h,
            boxBottom: r,
            boxTop: m,
            defaultX: n,
            xAxis: k,
          });
          var { verticalAlign: d } = f;
          if (w && r) {
            m = w.getBBox();
            n = w.padding;
            k = "justify" === u(z.overflow, "justify");
            f.x = z.x || 0;
            f.y = z.y || 0;
            const { x: a, y: g } = this.adjustStackPosition({
              labelBox: m,
              verticalAlign: d,
              textAlign: e,
            });
            r.x -= a;
            r.y -= g;
            w.align(f, !1, r);
            (d = t.isInsidePlot(
              w.alignAttr.x + f.x + a,
              w.alignAttr.y + f.y + g
            )) || (k = !1);
            k && B.prototype.justifyDataLabel.call(v, w, f, w.alignAttr, m, r);
            w.attr({
              x: w.alignAttr.x,
              y: w.alignAttr.y,
              rotation: z.rotation,
              rotationOriginX: m.width / 2,
              rotationOriginY: m.height / 2,
            });
            u(!k && z.crop, !0) &&
              (d =
                A(w.x) &&
                A(w.y) &&
                t.isInsidePlot(w.x - n + w.width, w.y) &&
                t.isInsidePlot(w.x + n, w.y));
            w[d ? "show" : "hide"]();
          }
          C(this, "afterSetOffset", { xOffset: a, width: h });
        }
        adjustStackPosition({ labelBox: a, verticalAlign: h, textAlign: r }) {
          const f = {
            bottom: 0,
            middle: 1,
            top: 2,
            right: 1,
            center: 0,
            left: -1,
          };
          return {
            x: a.width / 2 + (a.width / 2) * f[r],
            y: (a.height / 2) * f[h],
          };
        }
        getStackBox(a) {
          var f = this.axis;
          const r = f.chart,
            { boxTop: m, defaultX: n, xOffset: k, width: g, boxBottom: v } = a;
          var w = f.stacking.usePercentage ? 100 : u(m, this.total, 0);
          w = f.toPixels(w);
          a = a.xAxis || r.xAxis[0];
          const z = u(n, a.translate(this.x)) + k;
          f = f.toPixels(
            v ||
              (A(f.min) && f.logarithmic && f.logarithmic.lin2log(f.min)) ||
              0
          );
          f = Math.abs(w - f);
          const e = this.isNegative;
          return r.inverted
            ? {
                x: (e ? w : w - f) - r.plotLeft,
                y: a.height - z - g,
                width: f,
                height: g,
              }
            : {
                x: z + a.transB - r.plotLeft,
                y: (e ? w - f : w) - r.plotTop,
                width: g,
                height: f,
              };
        }
      }
      ("");
      return v;
    }
  );
  M(
    a,
    "Core/Axis/Stacking/StackingAxis.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B) {
      function w() {
        const a = this,
          c = a.inverted;
        a.yAxis.forEach((a) => {
          a.stacking &&
            a.stacking.stacks &&
            a.hasVisibleSeries &&
            (a.stacking.oldStacks = a.stacking.stacks);
        });
        a.series.forEach((b) => {
          const d = (b.xAxis && b.xAxis.options) || {};
          !b.options.stacking ||
            (!0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
            (b.stackKey = [
              b.type,
              q(b.options.stack, ""),
              c ? d.top : d.left,
              c ? d.height : d.width,
            ].join());
        });
      }
      function C() {
        const a = this.stacking;
        if (a) {
          var c = a.stacks;
          d(c, function (a, b) {
            F(a);
            c[b] = null;
          });
          a && a.stackTotalGroup && a.stackTotalGroup.destroy();
        }
      }
      function A() {
        "yAxis" !== this.coll || this.stacking || (this.stacking = new x(this));
      }
      function u(a, c, d, e) {
        !I(a) || a.x !== c || (e && a.stackKey !== e)
          ? (a = { x: c, index: 0, key: e, stackKey: e })
          : a.index++;
        a.key = [d, c, a.index].join();
        return a;
      }
      function v() {
        const a = this,
          c = a.stackKey,
          d = a.yAxis.stacking.stacks,
          e = a.processedXData,
          f = a[a.options.stacking + "Stacker"];
        let g;
        f &&
          [c, "-" + c].forEach((b) => {
            let c = e.length;
            let l;
            for (; c--; ) {
              var h = e[c];
              g = a.getStackIndicator(g, h, a.index, b);
              (l = (h = d[b] && d[b][h]) && h.points[g.key]) &&
                f.call(a, l, h, c);
            }
          });
      }
      function f(a, c, d) {
        c = c.total ? 100 / c.total : 0;
        a[0] = g(a[0] * c);
        a[1] = g(a[1] * c);
        this.stackedYData[d] = a[1];
      }
      function h() {
        const a = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? n.setStackedPoints.call(this, "group")
          : a &&
            d(a.stacks, (b, c) => {
              "group" === c.slice(-5) &&
                (d(b, (a) => a.destroy()), delete a.stacks[c]);
            });
      }
      function r(a) {
        var b = this.chart;
        const c = a || this.options.stacking;
        if (
          c &&
          (!0 === this.visible || !1 === b.options.chart.ignoreHiddenSeries)
        ) {
          var d = this.processedXData,
            f = this.processedYData,
            h = [],
            k = f.length,
            m = this.options,
            n = m.threshold,
            r = q(m.startFromThreshold && n, 0);
          m = m.stack;
          a = a ? `${this.type},${c}` : this.stackKey;
          var t = "-" + a,
            x = this.negStacks;
          b = "group" === c ? b.yAxis[0] : this.yAxis;
          var v = b.stacking.stacks,
            u = b.stacking.oldStacks,
            w,
            z;
          b.stacking.stacksTouched += 1;
          for (z = 0; z < k; z++) {
            var F = d[z];
            var A = f[z];
            var y = this.getStackIndicator(y, F, this.index);
            var B = y.key;
            var C = (w = x && A < (r ? 0 : n)) ? t : a;
            v[C] || (v[C] = {});
            v[C][F] ||
              (u[C] && u[C][F]
                ? ((v[C][F] = u[C][F]), (v[C][F].total = null))
                : (v[C][F] = new K(b, b.options.stackLabels, !!w, F, m)));
            C = v[C][F];
            null !== A
              ? ((C.points[B] = C.points[this.index] = [q(C.cumulative, r)]),
                I(C.cumulative) || (C.base = B),
                (C.touched = b.stacking.stacksTouched),
                0 < y.index &&
                  !1 === this.singleStacks &&
                  (C.points[B][0] = C.points[this.index + "," + F + ",0"][0]))
              : (C.points[B] = C.points[this.index] = null);
            "percent" === c
              ? ((w = w ? a : t),
                x && v[w] && v[w][F]
                  ? ((w = v[w][F]),
                    (C.total = w.total =
                      Math.max(w.total, C.total) + Math.abs(A) || 0))
                  : (C.total = g(C.total + (Math.abs(A) || 0))))
              : "group" === c
              ? (e(A) && (A = A[0]),
                null !== A && (C.total = (C.total || 0) + 1))
              : (C.total = g(C.total + (A || 0)));
            C.cumulative =
              "group" === c
                ? (C.total || 1) - 1
                : g(q(C.cumulative, r) + (A || 0));
            null !== A &&
              (C.points[B].push(C.cumulative),
              (h[z] = C.cumulative),
              (C.hasValidPoints = !0));
          }
          "percent" === c && (b.stacking.usePercentage = !0);
          "group" !== c && (this.stackedYData = h);
          b.stacking.oldStacks = {};
        }
      }
      const { getDeferredAnimation: m } = a,
        {
          series: { prototype: n },
        } = H,
        {
          addEvent: k,
          correctFloat: g,
          defined: I,
          destroyObjectProperties: F,
          fireEvent: z,
          isArray: e,
          isNumber: t,
          objectEach: d,
          pick: q,
        } = B;
      class x {
        constructor(a) {
          this.oldStacks = {};
          this.stacks = {};
          this.stacksTouched = 0;
          this.axis = a;
        }
        buildStacks() {
          const a = this.axis,
            c = a.series,
            d = a.options.reversedStacks,
            e = c.length;
          let f, g;
          this.usePercentage = !1;
          for (g = e; g--; )
            (f = c[d ? g : e - g - 1]),
              f.setStackedPoints(),
              f.setGroupedPoints();
          for (g = 0; g < e; g++) c[g].modifyStacks();
          z(a, "afterBuildStacks");
        }
        cleanStacks() {
          let a;
          this.oldStacks && (a = this.stacks = this.oldStacks);
          d(a, function (a) {
            d(a, function (a) {
              a.cumulative = a.total;
            });
          });
        }
        resetStacks() {
          d(this.stacks, (a) => {
            d(a, (b, c) => {
              t(b.touched) && b.touched < this.stacksTouched
                ? (b.destroy(), delete a[c])
                : ((b.total = null), (b.cumulative = null));
            });
          });
        }
        renderStackTotals() {
          var a = this.axis;
          const c = a.chart,
            e = c.renderer,
            f = this.stacks;
          a = m(
            c,
            (a.options.stackLabels && a.options.stackLabels.animation) || !1
          );
          const g = (this.stackTotalGroup =
            this.stackTotalGroup ||
            e.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add());
          g.translate(c.plotLeft, c.plotTop);
          d(f, function (a) {
            d(a, function (a) {
              a.render(g);
            });
          });
          g.animate({ opacity: 1 }, a);
        }
      }
      var c;
      (function (a) {
        const b = [];
        a.compose = function (a, c, d) {
          B.pushUnique(b, a) && (k(a, "init", A), k(a, "destroy", C));
          B.pushUnique(b, c) && (c.prototype.getStacks = w);
          B.pushUnique(b, d) &&
            ((a = d.prototype),
            (a.getStackIndicator = u),
            (a.modifyStacks = v),
            (a.percentStacker = f),
            (a.setGroupedPoints = h),
            (a.setStackedPoints = r));
        };
      })(c || (c = {}));
      return c;
    }
  );
  M(
    a,
    "Series/Line/LineSeries.js",
    [
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { defined: w, merge: B } = H;
      class E extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawGraph() {
          const a = this,
            w = this.options,
            u = (this.gappedPath || this.getGraphPath).call(this),
            v = this.chart.styledMode;
          let f = [["graph", "highcharts-graph"]];
          v || f[0].push(w.lineColor || this.color || "#cccccc", w.dashStyle);
          f = a.getZonesGraphs(f);
          f.forEach(function (f, r) {
            var h = f[0];
            let n = a[h];
            const k = n ? "animate" : "attr";
            n
              ? ((n.endX = a.preventGraphAnimation ? null : u.xMap),
                n.animate({ d: u }))
              : u.length &&
                (a[h] = n =
                  a.chart.renderer
                    .path(u)
                    .addClass(f[1])
                    .attr({ zIndex: 1 })
                    .add(a.group));
            n &&
              !v &&
              ((h = {
                stroke: f[2],
                "stroke-width": w.lineWidth || 0,
                fill: (a.fillGraph && a.color) || "none",
              }),
              f[3]
                ? (h.dashstyle = f[3])
                : "square" !== w.linecap &&
                  (h["stroke-linecap"] = h["stroke-linejoin"] = "round"),
              n[k](h).shadow(2 > r && w.shadow));
            n && ((n.startX = u.xMap), (n.isArea = u.isArea));
          });
        }
        getGraphPath(a, A, u) {
          const v = this,
            f = v.options,
            h = [],
            r = [];
          let m,
            n = f.step;
          a = a || v.points;
          const k = a.reversed;
          k && a.reverse();
          (n = { right: 1, center: 2 }[n] || (n && 3)) && k && (n = 4 - n);
          a = this.getValidPoints(a, !1, !(f.connectNulls && !A && !u));
          a.forEach(function (g, k) {
            const F = g.plotX,
              z = g.plotY,
              e = a[k - 1],
              t = g.isNull || "number" !== typeof z;
            (g.leftCliff || (e && e.rightCliff)) && !u && (m = !0);
            t && !w(A) && 0 < k
              ? (m = !f.connectNulls)
              : t && !A
              ? (m = !0)
              : (0 === k || m
                  ? (k = [["M", g.plotX, g.plotY]])
                  : v.getPointSpline
                  ? (k = [v.getPointSpline(a, g, k)])
                  : n
                  ? ((k =
                      1 === n
                        ? [["L", e.plotX, z]]
                        : 2 === n
                        ? [
                            ["L", (e.plotX + F) / 2, e.plotY],
                            ["L", (e.plotX + F) / 2, z],
                          ]
                        : [["L", F, e.plotY]]),
                    k.push(["L", F, z]))
                  : (k = [["L", F, z]]),
                r.push(g.x),
                n && (r.push(g.x), 2 === n && r.push(g.x)),
                h.push.apply(h, k),
                (m = !1));
          });
          h.xMap = r;
          return (v.graphPath = h);
        }
        getZonesGraphs(a) {
          this.zones.forEach(function (w, u) {
            u = [
              "zone-graph-" + u,
              "highcharts-graph highcharts-zone-graph-" +
                u +
                " " +
                (w.className || ""),
            ];
            this.chart.styledMode ||
              u.push(
                w.color || this.color,
                w.dashStyle || this.options.dashStyle
              );
            a.push(u);
          }, this);
          return a;
        }
      }
      E.defaultOptions = B(a.defaultOptions, {});
      y.registerSeriesType("line", E);
      ("");
      return E;
    }
  );
  M(
    a,
    "Series/Area/AreaSeries.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K) {
      const { parse: w } = a,
        {
          seriesTypes: { line: E },
        } = H,
        { extend: C, merge: A, objectEach: u, pick: v } = K;
      class f extends E {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawGraph() {
          this.areaPath = [];
          super.drawGraph.apply(this);
          const a = this,
            f = this.areaPath,
            m = this.options,
            n = [["area", "highcharts-area", this.color, m.fillColor]];
          this.zones.forEach(function (f, g) {
            n.push([
              "zone-area-" + g,
              "highcharts-area highcharts-zone-area-" + g + " " + f.className,
              f.color || a.color,
              f.fillColor || m.fillColor,
            ]);
          });
          n.forEach(function (h) {
            const g = h[0],
              k = {};
            let n = a[g];
            const r = n ? "animate" : "attr";
            n
              ? ((n.endX = a.preventGraphAnimation ? null : f.xMap),
                n.animate({ d: f }))
              : ((k.zIndex = 0),
                (n = a[g] =
                  a.chart.renderer.path(f).addClass(h[1]).add(a.group)),
                (n.isArea = !0));
            a.chart.styledMode ||
              (k.fill = v(
                h[3],
                w(h[2]).setOpacity(v(m.fillOpacity, 0.75)).get()
              ));
            n[r](k);
            n.startX = f.xMap;
            n.shiftUnit = m.step ? 2 : 1;
          });
        }
        getGraphPath(a) {
          var f = E.prototype.getGraphPath,
            h = this.options;
          const n = h.stacking,
            k = this.yAxis,
            g = [],
            w = [],
            u = this.index,
            z = k.stacking.stacks[this.stackKey],
            e = h.threshold,
            t = Math.round(k.getThreshold(h.threshold));
          h = v(h.connectNulls, "percent" === n);
          var d = function (b, c, d) {
            var f = a[b];
            b = n && z[f.x].points[u];
            const l = f[d + "Null"] || 0;
            d = f[d + "Cliff"] || 0;
            let h, p;
            f = !0;
            d || l
              ? ((h = (l ? b[0] : b[1]) + d), (p = b[0] + d), (f = !!l))
              : !n && a[c] && a[c].isNull && (h = p = e);
            "undefined" !== typeof h &&
              (w.push({
                plotX: q,
                plotY: null === h ? t : k.getThreshold(h),
                isNull: f,
                isCliff: !0,
              }),
              g.push({
                plotX: q,
                plotY: null === p ? t : k.getThreshold(p),
                doCurve: !1,
              }));
          };
          let q;
          a = a || this.points;
          n && (a = this.getStackPoints(a));
          for (let b = 0, e = a.length; b < e; ++b) {
            n ||
              (a[b].leftCliff =
                a[b].rightCliff =
                a[b].leftNull =
                a[b].rightNull =
                  void 0);
            var x = a[b].isNull;
            q = v(a[b].rectPlotX, a[b].plotX);
            var c = n ? v(a[b].yBottom, t) : t;
            if (!x || h)
              h || d(b, b - 1, "left"),
                (x && !n && h) ||
                  (w.push(a[b]), g.push({ x: b, plotX: q, plotY: c })),
                h || d(b, b + 1, "right");
          }
          d = f.call(this, w, !0, !0);
          g.reversed = !0;
          x = f.call(this, g, !0, !0);
          (c = x[0]) && "M" === c[0] && (x[0] = ["L", c[1], c[2]]);
          x = d.concat(x);
          x.length && x.push(["Z"]);
          f = f.call(this, w, !1, h);
          x.xMap = d.xMap;
          this.areaPath = x;
          return f;
        }
        getStackPoints(a) {
          const f = this,
            h = [],
            n = [],
            k = this.xAxis,
            g = this.yAxis,
            w = g.stacking.stacks[this.stackKey],
            F = {},
            z = g.series,
            e = z.length,
            t = g.options.reversedStacks ? 1 : -1,
            d = z.indexOf(f);
          a = a || this.points;
          if (this.options.stacking) {
            for (let d = 0; d < a.length; d++)
              (a[d].leftNull = a[d].rightNull = void 0), (F[a[d].x] = a[d]);
            u(w, function (a, c) {
              null !== a.total && n.push(c);
            });
            n.sort(function (a, c) {
              return a - c;
            });
            const q = z.map((a) => a.visible);
            n.forEach(function (a, c) {
              let b = 0,
                p,
                l;
              if (F[a] && !F[a].isNull)
                h.push(F[a]),
                  [-1, 1].forEach(function (b) {
                    const g = 1 === b ? "rightNull" : "leftNull",
                      h = w[n[c + b]];
                    let k = 0;
                    if (h) {
                      let b = d;
                      for (; 0 <= b && b < e; ) {
                        const c = z[b].index;
                        p = h.points[c];
                        p ||
                          (c === f.index
                            ? (F[a][g] = !0)
                            : q[b] &&
                              (l = w[a].points[c]) &&
                              (k -= l[1] - l[0]));
                        b += t;
                      }
                    }
                    F[a][1 === b ? "rightCliff" : "leftCliff"] = k;
                  });
              else {
                let c = d;
                for (; 0 <= c && c < e; ) {
                  if ((p = w[a].points[z[c].index])) {
                    b = p[1];
                    break;
                  }
                  c += t;
                }
                b = v(b, 0);
                b = g.translate(b, 0, 1, 0, 1);
                h.push({
                  isNull: !0,
                  plotX: k.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: b,
                  yBottom: b,
                });
              }
            });
          }
          return h;
        }
      }
      f.defaultOptions = A(E.defaultOptions, { threshold: 0 });
      C(f.prototype, { singleStacks: !1, drawLegendSymbol: y.drawRectangle });
      H.registerSeriesType("area", f);
      ("");
      return f;
    }
  );
  M(
    a,
    "Series/Spline/SplineSeries.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, y) {
      const { line: w } = a.seriesTypes,
        { merge: K, pick: B } = y;
      class E extends w {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        getPointSpline(a, w, u) {
          const v = w.plotX || 0,
            f = w.plotY || 0,
            h = a[u - 1];
          u = a[u + 1];
          let r, m;
          let n;
          if (
            h &&
            !h.isNull &&
            !1 !== h.doCurve &&
            !w.isCliff &&
            u &&
            !u.isNull &&
            !1 !== u.doCurve &&
            !w.isCliff
          ) {
            a = h.plotY || 0;
            var k = u.plotX || 0;
            u = u.plotY || 0;
            let g = 0;
            r = (1.5 * v + (h.plotX || 0)) / 2.5;
            m = (1.5 * f + a) / 2.5;
            k = (1.5 * v + k) / 2.5;
            n = (1.5 * f + u) / 2.5;
            k !== r && (g = ((n - m) * (k - v)) / (k - r) + f - n);
            m += g;
            n += g;
            m > a && m > f
              ? ((m = Math.max(a, f)), (n = 2 * f - m))
              : m < a && m < f && ((m = Math.min(a, f)), (n = 2 * f - m));
            n > u && n > f
              ? ((n = Math.max(u, f)), (m = 2 * f - n))
              : n < u && n < f && ((n = Math.min(u, f)), (m = 2 * f - n));
            w.rightContX = k;
            w.rightContY = n;
          }
          w = [
            "C",
            B(h.rightContX, h.plotX, 0),
            B(h.rightContY, h.plotY, 0),
            B(r, v, 0),
            B(m, f, 0),
            v,
            f,
          ];
          h.rightContX = h.rightContY = void 0;
          return w;
        }
      }
      E.defaultOptions = K(w.defaultOptions);
      a.registerSeriesType("spline", E);
      ("");
      return E;
    }
  );
  M(
    a,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      a["Series/Spline/SplineSeries.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K) {
      const {
          area: w,
          area: { prototype: E },
        } = H.seriesTypes,
        { extend: C, merge: A } = K;
      class u extends a {
        constructor() {
          super(...arguments);
          this.options = this.points = this.data = void 0;
        }
      }
      u.defaultOptions = A(a.defaultOptions, w.defaultOptions);
      C(u.prototype, {
        getGraphPath: E.getGraphPath,
        getStackPoints: E.getStackPoints,
        drawGraph: E.drawGraph,
        drawLegendSymbol: y.drawRectangle,
      });
      H.registerSeriesType("areaspline", u);
      ("");
      return u;
    }
  );
  M(a, "Series/Column/ColumnSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 3,
      centerInCategory: !1,
      groupPadding: 0.2,
      marker: null,
      pointPadding: 0.1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {
        hover: { halo: !1, brightness: 0.1 },
        select: { color: "#cccccc", borderColor: "#000000" },
      },
      dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: { distance: 6 },
      threshold: 0,
      borderColor: "#ffffff",
    };
  });
  M(
    a,
    "Series/Column/ColumnSeries.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Color/Color.js"],
      a["Series/Column/ColumnSeriesDefaults.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E, C, A) {
      const { animObject: w } = a,
        { parse: v } = y,
        { hasTouch: f, noop: h } = K,
        {
          clamp: r,
          defined: m,
          extend: n,
          fireEvent: k,
          isArray: g,
          isNumber: I,
          merge: F,
          pick: z,
          objectEach: e,
        } = A;
      class t extends E {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.group =
            this.data =
            this.borderWidth =
              void 0;
        }
        animate(a) {
          const d = this,
            e = this.yAxis,
            c = e.pos,
            b = d.options,
            f = this.chart.inverted,
            g = {},
            h = f ? "translateX" : "translateY";
          let k;
          a
            ? ((g.scaleY = 0.001),
              (a = r(e.toPixels(b.threshold), c, c + e.len)),
              f ? (g.translateX = a - e.len) : (g.translateY = a),
              d.clipBox && d.setClip(),
              d.group.attr(g))
            : ((k = Number(d.group.attr(h))),
              d.group.animate(
                { scaleY: 1 },
                n(w(d.options.animation), {
                  step: function (a, b) {
                    d.group && ((g[h] = k + b.pos * (c - k)), d.group.attr(g));
                  },
                })
              ));
        }
        init(a, e) {
          super.init.apply(this, arguments);
          const d = this;
          a = d.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === d.type && (a.isDirty = !0);
            });
        }
        getColumnMetrics() {
          const a = this;
          var e = a.options;
          const f = a.xAxis,
            c = a.yAxis;
          var b = f.options.reversedStacks;
          b = (f.reversed && !b) || (!f.reversed && b);
          const g = {};
          let l,
            h = 0;
          !1 === e.grouping
            ? (h = 1)
            : a.chart.series.forEach(function (b) {
                const d = b.yAxis,
                  e = b.options;
                let f;
                b.type !== a.type ||
                  (!b.visible && a.chart.options.chart.ignoreHiddenSeries) ||
                  c.len !== d.len ||
                  c.pos !== d.pos ||
                  (e.stacking && "group" !== e.stacking
                    ? ((l = b.stackKey),
                      "undefined" === typeof g[l] && (g[l] = h++),
                      (f = g[l]))
                    : !1 !== e.grouping && (f = h++),
                  (b.columnIndex = f));
              });
          const k = Math.min(
              Math.abs(f.transA) *
                ((f.ordinal && f.ordinal.slope) ||
                  e.pointRange ||
                  f.closestPointRange ||
                  f.tickInterval ||
                  1),
              f.len
            ),
            m = k * e.groupPadding,
            n = (k - 2 * m) / (h || 1);
          e = Math.min(
            e.maxPointWidth || f.len,
            z(e.pointWidth, n * (1 - 2 * e.pointPadding))
          );
          a.columnMetrics = {
            width: e,
            offset:
              (n - e) / 2 +
              (m + ((a.columnIndex || 0) + (b ? 1 : 0)) * n - k / 2) *
                (b ? -1 : 1),
            paddedWidth: n,
            columnCount: h,
          };
          return a.columnMetrics;
        }
        crispCol(a, e, f, c) {
          var b = this.borderWidth,
            d = -(b % 2 ? 0.5 : 0);
          b = b % 2 ? 0.5 : 1;
          this.options.crisp &&
            ((f = Math.round(a + f) + d), (a = Math.round(a) + d), (f -= a));
          c = Math.round(e + c) + b;
          d = 0.5 >= Math.abs(e) && 0.5 < c;
          e = Math.round(e) + b;
          c -= e;
          d && c && (--e, (c += 1));
          return { x: a, y: e, width: f, height: c };
        }
        adjustForMissingColumns(a, f, h, c) {
          const b = this.options.stacking;
          if (!h.isNull && 1 < c.columnCount) {
            const d = this.yAxis.options.reversedStacks;
            let l = 0,
              k = d ? 0 : -c.columnCount;
            e(this.yAxis.stacking && this.yAxis.stacking.stacks, (a) => {
              if ("number" === typeof h.x) {
                const c = a[h.x.toString()];
                c &&
                  ((a = c.points[this.index]),
                  b
                    ? (a && (l = k), c.hasValidPoints && (d ? k++ : k--))
                    : g(a) &&
                      ((a = Object.keys(c.points)
                        .filter(
                          (a) =>
                            !a.match(",") &&
                            c.points[a] &&
                            1 < c.points[a].length
                        )
                        .map(parseFloat)
                        .sort((a, b) => b - a)),
                      (l = a.indexOf(this.index)),
                      (k = a.length)));
              }
            });
            a =
              (h.plotX || 0) +
              ((k - 1) * c.paddedWidth + f) / 2 -
              f -
              l * c.paddedWidth;
          }
          return a;
        }
        translate() {
          const a = this,
            e = a.chart,
            f = a.options;
          var c = (a.dense = 2 > a.closestPointRange * a.xAxis.transA);
          c = a.borderWidth = z(f.borderWidth, c ? 0 : 1);
          const b = a.xAxis,
            g = a.yAxis,
            l = f.threshold,
            h = z(f.minPointLength, 5),
            n = a.getColumnMetrics(),
            t = n.width,
            v = (a.pointXOffset = n.offset),
            w = a.dataMin,
            u = a.dataMax;
          let F = (a.barW = Math.max(t, 1 + 2 * c)),
            y = (a.translatedThreshold = g.getThreshold(l));
          e.inverted && (y -= 0.5);
          f.pointPadding && (F = Math.ceil(F));
          E.prototype.translate.apply(a);
          a.points.forEach(function (c) {
            const d = z(c.yBottom, y);
            var k = 999 + Math.abs(d),
              p = c.plotX || 0;
            k = r(c.plotY, -k, g.len + k);
            let q = Math.min(k, d),
              x = Math.max(k, d) - q,
              L = t,
              A = p + v,
              C = F;
            h &&
              Math.abs(x) < h &&
              ((x = h),
              (p = (!g.reversed && !c.negative) || (g.reversed && c.negative)),
              I(l) &&
                I(u) &&
                c.y === l &&
                u <= l &&
                (g.min || 0) < l &&
                (w !== u || (g.max || 0) <= l) &&
                (p = !p),
              (q = Math.abs(q - y) > h ? d - h : y - (p ? h : 0)));
            m(c.options.pointWidth) &&
              ((L = C = Math.ceil(c.options.pointWidth)),
              (A -= Math.round((L - t) / 2)));
            f.centerInCategory && (A = a.adjustForMissingColumns(A, L, c, n));
            c.barX = A;
            c.pointWidth = L;
            c.tooltipPos = e.inverted
              ? [
                  r(
                    g.len + g.pos - e.plotLeft - k,
                    g.pos - e.plotLeft,
                    g.len + g.pos - e.plotLeft
                  ),
                  b.len + b.pos - e.plotTop - A - C / 2,
                  x,
                ]
              : [
                  b.left - e.plotLeft + A + C / 2,
                  r(
                    k + g.pos - e.plotTop,
                    g.pos - e.plotTop,
                    g.len + g.pos - e.plotTop
                  ),
                  x,
                ];
            c.shapeType = a.pointClass.prototype.shapeType || "roundedRect";
            c.shapeArgs = a.crispCol(A, c.isNull ? y : q, C, c.isNull ? 0 : x);
          });
          k(this, "afterColumnTranslate");
        }
        drawGraph() {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        }
        pointAttribs(a, e) {
          const d = this.options;
          var c = this.pointAttrToOptions || {},
            b = c.stroke || "borderColor";
          const f = c["stroke-width"] || "borderWidth";
          let g,
            h = (a && a.color) || this.color,
            k = (a && a[b]) || d[b] || h;
          c = (a && a.options.dashStyle) || d.dashStyle;
          let n = (a && a[f]) || d[f] || this[f] || 0,
            m = z(a && a.opacity, d.opacity, 1);
          a &&
            this.zones.length &&
            ((g = a.getZone()),
            (h =
              a.options.color ||
              (g && (g.color || a.nonZonedColor)) ||
              this.color),
            g &&
              ((k = g.borderColor || k),
              (c = g.dashStyle || c),
              (n = g.borderWidth || n)));
          e &&
            a &&
            ((a = F(
              d.states[e],
              (a.options.states && a.options.states[e]) || {}
            )),
            (e = a.brightness),
            (h =
              a.color ||
              ("undefined" !== typeof e && v(h).brighten(a.brightness).get()) ||
              h),
            (k = a[b] || k),
            (n = a[f] || n),
            (c = a.dashStyle || c),
            (m = z(a.opacity, m)));
          b = { fill: h, stroke: k, "stroke-width": n, opacity: m };
          c && (b.dashstyle = c);
          return b;
        }
        drawPoints(a = this.points) {
          const d = this,
            e = this.chart,
            c = d.options,
            b = e.renderer,
            f = c.animationLimit || 250;
          let g;
          a.forEach(function (a) {
            let l = a.graphic,
              h = !!l,
              k = l && e.pointCount < f ? "animate" : "attr";
            if (I(a.plotY) && null !== a.y) {
              g = a.shapeArgs;
              l && a.hasNewShapeType() && (l = l.destroy());
              d.enabledDataSorting &&
                (a.startXPos = d.xAxis.reversed
                  ? -(g ? g.width || 0 : 0)
                  : d.xAxis.width);
              l ||
                ((a.graphic = l = b[a.shapeType](g).add(a.group || d.group)) &&
                  d.enabledDataSorting &&
                  e.hasRendered &&
                  e.pointCount < f &&
                  (l.attr({ x: a.startXPos }), (h = !0), (k = "animate")));
              if (l && h) l[k](F(g));
              e.styledMode ||
                l[k](d.pointAttribs(a, a.selected && "select")).shadow(
                  !1 !== a.allowShadow && c.shadow
                );
              l &&
                (l.addClass(a.getClassName(), !0),
                l.attr({ visibility: a.visible ? "inherit" : "hidden" }));
            } else l && (a.graphic = l.destroy());
          });
        }
        drawTracker(a = this.points) {
          const d = this,
            e = d.chart,
            c = e.pointer,
            b = function (a) {
              const b = c.getPointFromEvent(a);
              "undefined" !== typeof b &&
                ((c.isDirectTouch = !0), b.onMouseOver(a));
            };
          let h;
          a.forEach(function (a) {
            h = g(a.dataLabels)
              ? a.dataLabels
              : a.dataLabel
              ? [a.dataLabel]
              : [];
            a.graphic && (a.graphic.element.point = a);
            h.forEach(function (b) {
              b.div ? (b.div.point = a) : (b.element.point = a);
            });
          });
          d._hasTracking ||
            (d.trackerGroups.forEach(function (a) {
              if (d[a]) {
                d[a]
                  .addClass("highcharts-tracker")
                  .on("mouseover", b)
                  .on("mouseout", function (a) {
                    c.onTrackerMouseOut(a);
                  });
                if (f) d[a].on("touchstart", b);
                !e.styledMode &&
                  d.options.cursor &&
                  d[a].css({ cursor: d.options.cursor });
              }
            }),
            (d._hasTracking = !0));
          k(this, "afterDrawTracker");
        }
        remove() {
          const a = this,
            e = a.chart;
          e.hasRendered &&
            e.series.forEach(function (d) {
              d.type === a.type && (d.isDirty = !0);
            });
          E.prototype.remove.apply(a, arguments);
        }
      }
      t.defaultOptions = F(E.defaultOptions, H);
      n(t.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: B.drawRectangle,
        getSymbol: h,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      C.registerSeriesType("column", t);
      ("");
      return t;
    }
  );
  M(
    a,
    "Core/Series/DataLabel.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { getDeferredAnimation: w } = a,
        { format: B } = y,
        {
          defined: E,
          extend: C,
          fireEvent: A,
          isArray: u,
          isString: v,
          merge: f,
          objectEach: h,
          pick: r,
          splat: m,
        } = H;
      var n;
      (function (a) {
        function g(a, b, d, e, f) {
          const c = this.chart;
          var g = this.isCartesian && c.inverted;
          const h = this.enabledDataSorting;
          var k = a.plotX,
            l = a.plotY;
          const n = d.rotation;
          var m = d.align;
          l =
            E(k) &&
            E(l) &&
            c.isInsidePlot(k, Math.round(l), {
              inverted: g,
              paneCoordinates: !0,
              series: this,
            });
          let p = "justify" === r(d.overflow, h ? "none" : "justify");
          g =
            this.visible &&
            !1 !== a.visible &&
            E(k) &&
            (a.series.forceDL ||
              (h && !p) ||
              l ||
              (r(d.inside, !!this.options.stacking) &&
                e &&
                c.isInsidePlot(k, g ? e.x + 1 : e.y + e.height - 1, {
                  inverted: g,
                  paneCoordinates: !0,
                  series: this,
                })));
          k = a.pos();
          if (g && k) {
            n && b.attr({ align: m });
            m = b.getBBox(!0);
            var q = [0, 0];
            var t = c.renderer.fontMetrics(b).b;
            e = C({ x: k[0], y: Math.round(k[1]), width: 0, height: 0 }, e);
            C(d, { width: m.width, height: m.height });
            n
              ? ((p = !1),
                (q = c.renderer.rotCorr(t, n)),
                (t = {
                  x: e.x + (d.x || 0) + e.width / 2 + q.x,
                  y:
                    e.y +
                    (d.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[d.verticalAlign] *
                      e.height,
                }),
                (q = [m.x - Number(b.attr("x")), m.y - Number(b.attr("y"))]),
                h &&
                  this.xAxis &&
                  !p &&
                  this.setDataLabelStartPos(a, b, f, l, t),
                b[f ? "attr" : "animate"](t))
              : (h &&
                  this.xAxis &&
                  !p &&
                  this.setDataLabelStartPos(a, b, f, l, e),
                b.align(d, void 0, e),
                (t = b.alignAttr));
            if (p && 0 <= e.height) this.justifyDataLabel(b, d, t, m, e, f);
            else if (r(d.crop, !0)) {
              let { x: a, y: b } = t;
              a += q[0];
              b += q[1];
              g =
                c.isInsidePlot(a, b, { paneCoordinates: !0, series: this }) &&
                c.isInsidePlot(a + m.width, b + m.height, {
                  paneCoordinates: !0,
                  series: this,
                });
            }
            if (d.shape && !n)
              b[f ? "attr" : "animate"]({ anchorX: k[0], anchorY: k[1] });
          }
          f && h && (b.placed = !1);
          g || (h && !p) ? b.show() : (b.hide(), (b.placed = !1));
        }
        function k(a, b) {
          var c = b.filter;
          return c
            ? ((b = c.operator),
              (a = a[c.property]),
              (c = c.value),
              (">" === b && a > c) ||
              ("<" === b && a < c) ||
              (">=" === b && a >= c) ||
              ("<=" === b && a <= c) ||
              ("==" === b && a == c) ||
              ("===" === b && a === c)
                ? !0
                : !1)
            : !0;
        }
        function n() {
          return this.plotGroup(
            "dataLabelsGroup",
            "data-labels",
            this.hasRendered ? "inherit" : "hidden",
            this.options.dataLabels.zIndex || 6
          );
        }
        function z(a) {
          const b = this.hasRendered || 0,
            c = this.initDataLabelsGroup().attr({ opacity: +b });
          !b &&
            c &&
            (this.visible && c.show(),
            this.options.animation
              ? c.animate({ opacity: 1 }, a)
              : c.attr({ opacity: 1 }));
          return c;
        }
        function e(a = this.points) {
          const b = this,
            c = b.chart,
            e = b.options,
            f = c.renderer,
            { backgroundColor: g, plotBackgroundColor: n } = c.options.chart,
            q = f.getContrast((v(n) && n) || (v(g) && g) || "#000000");
          let t = e.dataLabels,
            x,
            z;
          var F = m(t)[0];
          const y = F.animation;
          F = F.defer ? w(c, y, b) : { defer: 0, duration: 0 };
          t = d(
            d(
              c.options.plotOptions &&
                c.options.plotOptions.series &&
                c.options.plotOptions.series.dataLabels,
              c.options.plotOptions &&
                c.options.plotOptions[b.type] &&
                c.options.plotOptions[b.type].dataLabels
            ),
            t
          );
          A(this, "drawDataLabels");
          if (u(t) || t.enabled || b._hasPointLabels)
            (z = this.initDataLabels(F)),
              a.forEach((a) => {
                x = m(d(t, a.dlOptions || (a.options && a.options.dataLabels)));
                x.forEach((d, g) => {
                  const l =
                      d.enabled && (!a.isNull || a.dataLabelOnNull) && k(a, d),
                    n = a.connectors ? a.connectors[g] : a.connector;
                  let m,
                    p,
                    t = a.dataLabels ? a.dataLabels[g] : a.dataLabel,
                    v = !t;
                  const w = r(d.distance, a.labelDistance);
                  if (l) {
                    var x = a.getLabelConfig();
                    var u = r(d[a.formatPrefix + "Format"], d.format);
                    x = E(u)
                      ? B(u, x, c)
                      : (d[a.formatPrefix + "Formatter"] || d.formatter).call(
                          x,
                          d
                        );
                    u = d.style;
                    m = d.rotation;
                    c.styledMode ||
                      ((u.color = r(d.color, u.color, b.color, "#000000")),
                      "contrast" === u.color
                        ? ((a.contrastColor = f.getContrast(
                            a.color || b.color
                          )),
                          (u.color =
                            (!E(w) && d.inside) || 0 > w || e.stacking
                              ? a.contrastColor
                              : q))
                        : delete a.contrastColor,
                      e.cursor && (u.cursor = e.cursor));
                    p = {
                      r: d.borderRadius || 0,
                      rotation: m,
                      padding: d.padding,
                      zIndex: 1,
                    };
                    if (!c.styledMode) {
                      const { backgroundColor: b, borderColor: c } = d;
                      p.fill = "auto" === b ? a.color : b;
                      p.stroke = "auto" === c ? a.color : c;
                      p["stroke-width"] = d.borderWidth;
                    }
                    h(p, function (a, b) {
                      "undefined" === typeof a && delete p[b];
                    });
                  }
                  !t ||
                    (l &&
                      E(x) &&
                      !!t.div === !!d.useHTML &&
                      ((t.rotation && d.rotation) ||
                        t.rotation === d.rotation)) ||
                    ((v = !0),
                    (a.dataLabel = t = a.dataLabel && a.dataLabel.destroy()),
                    a.dataLabels &&
                      (1 === a.dataLabels.length
                        ? delete a.dataLabels
                        : delete a.dataLabels[g]),
                    g || delete a.dataLabel,
                    n &&
                      ((a.connector = a.connector.destroy()),
                      a.connectors &&
                        (1 === a.connectors.length
                          ? delete a.connectors
                          : delete a.connectors[g])));
                  l && E(x)
                    ? (t
                        ? (p.text = x)
                        : ((a.dataLabels = a.dataLabels || []),
                          (t = a.dataLabels[g] =
                            m
                              ? f
                                  .text(x, 0, 0, d.useHTML)
                                  .addClass("highcharts-data-label")
                              : f.label(
                                  x,
                                  0,
                                  0,
                                  d.shape,
                                  null,
                                  null,
                                  d.useHTML,
                                  null,
                                  "data-label"
                                )),
                          g || (a.dataLabel = t),
                          t.addClass(
                            " highcharts-data-label-color-" +
                              a.colorIndex +
                              " " +
                              (d.className || "") +
                              (d.useHTML ? " highcharts-tracker" : "")
                          )),
                      (t.options = d),
                      t.attr(p),
                      c.styledMode || t.css(u).shadow(d.shadow),
                      (g = d[a.formatPrefix + "TextPath"] || d.textPath) &&
                        !d.useHTML &&
                        (t.setTextPath(
                          (a.getDataLabelPath && a.getDataLabelPath(t)) ||
                            a.graphic,
                          g
                        ),
                        a.dataLabelPath &&
                          !g.enabled &&
                          (a.dataLabelPath = a.dataLabelPath.destroy())),
                      t.added || t.add(z),
                      b.alignDataLabel(a, t, d, null, v))
                    : t && t.hide();
                });
              });
          A(this, "afterDrawDataLabels");
        }
        function t(a, b, d, e, f, g) {
          const c = this.chart,
            h = b.align,
            k = b.verticalAlign,
            l = a.box ? 0 : a.padding || 0;
          let { x: n = 0, y: m = 0 } = b,
            p,
            q;
          p = (d.x || 0) + l;
          0 > p &&
            ("right" === h && 0 <= n
              ? ((b.align = "left"), (b.inside = !0))
              : (n -= p),
            (q = !0));
          p = (d.x || 0) + e.width - l;
          p > c.plotWidth &&
            ("left" === h && 0 >= n
              ? ((b.align = "right"), (b.inside = !0))
              : (n += c.plotWidth - p),
            (q = !0));
          p = d.y + l;
          0 > p &&
            ("bottom" === k && 0 <= m
              ? ((b.verticalAlign = "top"), (b.inside = !0))
              : (m -= p),
            (q = !0));
          p = (d.y || 0) + e.height - l;
          p > c.plotHeight &&
            ("top" === k && 0 >= m
              ? ((b.verticalAlign = "bottom"), (b.inside = !0))
              : (m += c.plotHeight - p),
            (q = !0));
          q && ((b.x = n), (b.y = m), (a.placed = !g), a.align(b, void 0, f));
          return q;
        }
        function d(a, b) {
          let c = [],
            d;
          if (u(a) && !u(b))
            c = a.map(function (a) {
              return f(a, b);
            });
          else if (u(b) && !u(a))
            c = b.map(function (b) {
              return f(a, b);
            });
          else if (u(a) || u(b))
            for (d = Math.max(a.length, b.length); d--; ) c[d] = f(a[d], b[d]);
          else c = f(a, b);
          return c;
        }
        function q(a, b, d, e, f) {
          const c = this.chart,
            g = c.inverted,
            h = this.xAxis,
            k = h.reversed,
            l = g ? b.height / 2 : b.width / 2;
          a = (a = a.pointWidth) ? a / 2 : 0;
          b.startXPos = g ? f.x : k ? -l - a : h.width - l + a;
          b.startYPos = g ? (k ? this.yAxis.height - l + a : -l - a) : f.y;
          e
            ? "hidden" === b.visibility &&
              (b.show(), b.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : b.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, b.hide);
          c.hasRendered &&
            (d && b.attr({ x: b.startXPos, y: b.startYPos }), (b.placed = !0));
        }
        const x = [];
        a.compose = function (a) {
          H.pushUnique(x, a) &&
            ((a = a.prototype),
            (a.initDataLabelsGroup = n),
            (a.initDataLabels = z),
            (a.alignDataLabel = g),
            (a.drawDataLabels = e),
            (a.justifyDataLabel = t),
            (a.setDataLabelStartPos = q));
        };
      })(n || (n = {}));
      ("");
      return n;
    }
  );
  M(
    a,
    "Series/Column/ColumnDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { series: w } = y,
        { merge: B, pick: E } = H;
      var C;
      (function (y) {
        function u(a, h, r, m, n) {
          let f = this.chart.inverted;
          var g = a.series;
          let v = (g.xAxis ? g.xAxis.len : this.chart.plotSizeX) || 0;
          g = (g.yAxis ? g.yAxis.len : this.chart.plotSizeY) || 0;
          var u = a.dlBox || a.shapeArgs;
          let z = E(a.below, a.plotY > E(this.translatedThreshold, g)),
            e = E(r.inside, !!this.options.stacking);
          u &&
            ((m = B(u)),
            0 > m.y && ((m.height += m.y), (m.y = 0)),
            (u = m.y + m.height - g),
            0 < u && u < m.height && (m.height -= u),
            f &&
              (m = {
                x: g - m.y - m.height,
                y: v - m.x - m.width,
                width: m.height,
                height: m.width,
              }),
            e ||
              (f
                ? ((m.x += z ? 0 : m.width), (m.width = 0))
                : ((m.y += z ? m.height : 0), (m.height = 0))));
          r.align = E(r.align, !f || e ? "center" : z ? "right" : "left");
          r.verticalAlign = E(
            r.verticalAlign,
            f || e ? "middle" : z ? "top" : "bottom"
          );
          w.prototype.alignDataLabel.call(this, a, h, r, m, n);
          r.inside && a.contrastColor && h.css({ color: a.contrastColor });
        }
        const v = [];
        y.compose = function (f) {
          a.compose(w);
          H.pushUnique(v, f) && (f.prototype.alignDataLabel = u);
        };
      })(C || (C = {}));
      return C;
    }
  );
  M(
    a,
    "Series/Bar/BarSeries.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { extend: w, merge: B } = H;
      class E extends a {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
      }
      E.defaultOptions = B(a.defaultOptions, {});
      w(E.prototype, { inverted: !0 });
      y.registerSeriesType("bar", E);
      ("");
      return E;
    }
  );
  M(a, "Series/Scatter/ScatterSeriesDefaults.js", [], function () {
    "";
    return {
      lineWidth: 0,
      findNearestPointBy: "xy",
      jitter: { x: 0, y: 0 },
      marker: { enabled: !0 },
      tooltip: {
        headerFormat:
          '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.8em"> {series.name}</span><br/>',
        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
      },
    };
  });
  M(
    a,
    "Series/Scatter/ScatterSeries.js",
    [
      a["Series/Scatter/ScatterSeriesDefaults.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { column: w, line: B } = y.seriesTypes,
        { addEvent: E, extend: C, merge: A } = H;
      class u extends B {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        applyJitter() {
          const a = this,
            f = this.options.jitter,
            h = this.points.length;
          f &&
            this.points.forEach(function (r, m) {
              ["x", "y"].forEach(function (n, k) {
                let g = "plot" + n.toUpperCase(),
                  v,
                  w;
                if (f[n] && !r.isNull) {
                  var u = a[n + "Axis"];
                  w = f[n] * u.transA;
                  u &&
                    !u.isLog &&
                    ((v = Math.max(0, r[g] - w)),
                    (u = Math.min(u.len, r[g] + w)),
                    (k = 1e4 * Math.sin(m + k * h)),
                    (k -= Math.floor(k)),
                    (r[g] = v + (u - v) * k),
                    "x" === n && (r.clientX = r.plotX));
                }
              });
            });
        }
        drawGraph() {
          this.options.lineWidth
            ? super.drawGraph()
            : this.graph && (this.graph = this.graph.destroy());
        }
      }
      u.defaultOptions = A(B.defaultOptions, a);
      C(u.prototype, {
        drawTracker: w.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      E(u, "afterTranslate", function () {
        this.applyJitter();
      });
      y.registerSeriesType("scatter", u);
      return u;
    }
  );
  M(
    a,
    "Series/CenteredUtilities.js",
    [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]],
    function (a, y, H) {
      const { deg2rad: w } = a,
        { fireEvent: B, isNumber: E, pick: C, relativeLength: A } = H;
      var u;
      (function (a) {
        a.getCenter = function () {
          var a = this.options,
            h = this.chart;
          const r = 2 * (a.slicedOffset || 0),
            m = h.plotWidth - 2 * r,
            n = h.plotHeight - 2 * r;
          var k = a.center;
          const g = Math.min(m, n),
            v = a.thickness;
          var w = a.size;
          let u = a.innerSize || 0;
          "string" === typeof w && (w = parseFloat(w));
          "string" === typeof u && (u = parseFloat(u));
          a = [
            C(k[0], "50%"),
            C(k[1], "50%"),
            C(w && 0 > w ? void 0 : a.size, "100%"),
            C(u && 0 > u ? void 0 : a.innerSize || 0, "0%"),
          ];
          !h.angular || this instanceof y || (a[3] = 0);
          for (k = 0; 4 > k; ++k)
            (w = a[k]),
              (h = 2 > k || (2 === k && /%$/.test(w))),
              (a[k] = A(w, [m, n, g, a[2]][k]) + (h ? r : 0));
          a[3] > a[2] && (a[3] = a[2]);
          E(v) && 2 * v < a[2] && 0 < v && (a[3] = a[2] - 2 * v);
          B(this, "afterGetCenter", { positions: a });
          return a;
        };
        a.getStartAndEndRadians = function (a, h) {
          a = E(a) ? a : 0;
          h = E(h) && h > a && 360 > h - a ? h : a + 360;
          return { start: w * (a + -90), end: w * (h + -90) };
        };
      })(u || (u = {}));
      ("");
      return u;
    }
  );
  M(
    a,
    "Series/Pie/PiePoint.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Series/Point.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H) {
      const { setAnimation: w } = a,
        {
          addEvent: B,
          defined: E,
          extend: C,
          isNumber: A,
          pick: u,
          relativeLength: v,
        } = H;
      class f extends y {
        constructor() {
          super(...arguments);
          this.series = this.options = this.labelDistance = void 0;
        }
        getConnectorPath() {
          const a = this.labelPosition,
            f = this.series.options.dataLabels,
            m = this.connectorShapes;
          let n = f.connectorShape;
          m[n] && (n = m[n]);
          return n.call(
            this,
            { x: a.computed.x, y: a.computed.y, alignment: a.alignment },
            a.connectorPosition,
            f
          );
        }
        getTranslate() {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        }
        haloPath(a) {
          const f = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                f.x,
                f.y,
                f.r + a,
                f.r + a,
                {
                  innerR: f.r - 1,
                  start: f.start,
                  end: f.end,
                  borderRadius: f.borderRadius,
                }
              );
        }
        init() {
          super.init.apply(this, arguments);
          this.name = u(this.name, "Slice");
          const a = (a) => {
            this.slice("select" === a.type);
          };
          B(this, "select", a);
          B(this, "unselect", a);
          return this;
        }
        isValid() {
          return A(this.y) && 0 <= this.y;
        }
        setVisible(a, f) {
          const h = this.series,
            n = h.chart,
            k = h.options.ignoreHiddenPoint;
          f = u(f, k);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                "undefined" === typeof a ? !this.visible : a),
            (h.options.data[h.data.indexOf(this)] = this.options),
            ["graphic", "dataLabel", "connector"].forEach((f) => {
              if (this[f]) this[f][a ? "show" : "hide"](a);
            }),
            this.legendItem && n.legend.colorizeItem(this, a),
            a || "hover" !== this.state || this.setState(""),
            k && (h.isDirty = !0),
            f && n.redraw());
        }
        slice(a, f, m) {
          const h = this.series;
          w(m, h.chart);
          u(f, !0);
          this.sliced = this.options.sliced = E(a) ? a : !this.sliced;
          h.options.data[h.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
        }
      }
      C(f.prototype, {
        connectorShapes: {
          fixedOffset: function (a, f, m) {
            const h = f.breakAt;
            f = f.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              m.softConnector
                ? [
                    "C",
                    a.x + ("left" === a.alignment ? -5 : 5),
                    a.y,
                    2 * h.x - f.x,
                    2 * h.y - f.y,
                    h.x,
                    h.y,
                  ]
                : ["L", h.x, h.y],
              ["L", f.x, f.y],
            ];
          },
          straight: function (a, f) {
            f = f.touchingSliceAt;
            return [
              ["M", a.x, a.y],
              ["L", f.x, f.y],
            ];
          },
          crookedLine: function (a, f, m) {
            const { breakAt: h, touchingSliceAt: k } = f;
            ({ series: f } = this);
            const [g, r, w] = f.center,
              u = w / 2,
              e = f.chart.plotWidth,
              t = f.chart.plotLeft;
            f = "left" === a.alignment;
            const { x: d, y: q } = a;
            m.crookDistance
              ? ((a = v(m.crookDistance, 1)),
                (a = f ? g + u + (e + t - g - u) * (1 - a) : t + (g - u) * a))
              : (a = g + (r - q) * Math.tan((this.angle || 0) - Math.PI / 2));
            m = [["M", d, q]];
            (f ? a <= d && a >= h.x : a >= d && a <= h.x) &&
              m.push(["L", a, q]);
            m.push(["L", h.x, h.y], ["L", k.x, k.y]);
            return m;
          },
        },
      });
      return f;
    }
  );
  M(a, "Series/Pie/PieSeriesDefaults.js", [], function () {
    "";
    return {
      borderRadius: 3,
      center: [null, null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0,
        connectorPadding: 5,
        connectorShape: "crookedLine",
        crookDistance: void 0,
        distance: 30,
        enabled: !0,
        formatter: function () {
          return this.point.isNull ? void 0 : this.point.name;
        },
        softConnector: !0,
        x: 0,
      },
      fillColor: void 0,
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: { followPointer: !0 },
      borderColor: "#ffffff",
      borderWidth: 1,
      lineWidth: void 0,
      states: { hover: { brightness: 0.1 } },
    };
  });
  M(
    a,
    "Series/Pie/PieSeries.js",
    [
      a["Series/CenteredUtilities.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Series/Pie/PiePoint.js"],
      a["Series/Pie/PieSeriesDefaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/Symbols.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E, C, A, u, v) {
      const { getStartAndEndRadians: f } = a;
      ({ noop: H } = H);
      const {
        clamp: h,
        extend: r,
        fireEvent: m,
        merge: n,
        pick: k,
        relativeLength: g,
      } = v;
      class w extends C {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.maxLabelDistance =
            this.data =
            this.center =
              void 0;
        }
        animate(a) {
          const f = this,
            e = f.points,
            g = f.startAngleRad;
          a ||
            e.forEach(function (a) {
              const d = a.graphic,
                e = a.shapeArgs;
              d &&
                e &&
                (d.attr({
                  r: k(a.startR, f.center && f.center[3] / 2),
                  start: g,
                  end: g,
                }),
                d.animate(
                  { r: e.r, start: e.start, end: e.end },
                  f.options.animation
                ));
            });
        }
        drawEmpty() {
          const a = this.startAngleRad,
            f = this.endAngleRad,
            e = this.options;
          let g, d;
          0 === this.total && this.center
            ? ((g = this.center[0]),
              (d = this.center[1]),
              this.graph ||
                (this.graph = this.chart.renderer
                  .arc(g, d, this.center[1] / 2, 0, a, f)
                  .addClass("highcharts-empty-series")
                  .add(this.group)),
              this.graph.attr({
                d: u.arc(g, d, this.center[2] / 2, 0, {
                  start: a,
                  end: f,
                  innerR: this.center[3] / 2,
                }),
              }),
              this.chart.styledMode ||
                this.graph.attr({
                  "stroke-width": e.borderWidth,
                  fill: e.fillColor || "none",
                  stroke: e.color || "#cccccc",
                }))
            : this.graph && (this.graph = this.graph.destroy());
        }
        drawPoints() {
          const a = this.chart.renderer;
          this.points.forEach(function (f) {
            f.graphic &&
              f.hasNewShapeType() &&
              (f.graphic = f.graphic.destroy());
            f.graphic ||
              ((f.graphic = a[f.shapeType](f.shapeArgs).add(f.series.group)),
              (f.delayedRendering = !0));
          });
        }
        generatePoints() {
          super.generatePoints();
          this.updateTotals();
        }
        getX(a, f, e) {
          const g = this.center,
            d = this.radii ? this.radii[e.index] || 0 : g[2] / 2;
          a = Math.asin(h((a - g[1]) / (d + e.labelDistance), -1, 1));
          return (
            g[0] +
            (f ? -1 : 1) * Math.cos(a) * (d + e.labelDistance) +
            (0 < e.labelDistance
              ? (f ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        }
        hasData() {
          return !!this.processedXData.length;
        }
        redrawPoints() {
          const a = this,
            f = a.chart;
          let e, g, d, k;
          this.drawEmpty();
          a.group && !f.styledMode && a.group.shadow(a.options.shadow);
          a.points.forEach(function (h) {
            const c = {};
            g = h.graphic;
            !h.isNull && g
              ? ((k = h.shapeArgs),
                (e = h.getTranslate()),
                f.styledMode || (d = a.pointAttribs(h, h.selected && "select")),
                h.delayedRendering
                  ? (g.setRadialReference(a.center).attr(k).attr(e),
                    f.styledMode ||
                      g.attr(d).attr({ "stroke-linejoin": "round" }),
                    (h.delayedRendering = !1))
                  : (g.setRadialReference(a.center),
                    f.styledMode || n(!0, c, d),
                    n(!0, c, k, e),
                    g.animate(c)),
                g.attr({ visibility: h.visible ? "inherit" : "hidden" }),
                g.addClass(h.getClassName(), !0))
              : g && (h.graphic = g.destroy());
          });
        }
        sortByAngle(a, f) {
          a.sort(function (a, g) {
            return "undefined" !== typeof a.angle && (g.angle - a.angle) * f;
          });
        }
        translate(a) {
          m(this, "translate");
          this.generatePoints();
          var h = this.options;
          const e = h.slicedOffset,
            n = e + (h.borderWidth || 0);
          var d = f(h.startAngle, h.endAngle);
          const q = (this.startAngleRad = d.start);
          d = (this.endAngleRad = d.end) - q;
          const r = this.points,
            c = h.dataLabels.distance;
          h = h.ignoreHiddenPoint;
          const b = r.length;
          let p,
            l,
            w,
            v = 0;
          a || (this.center = a = this.getCenter());
          for (l = 0; l < b; l++) {
            w = r[l];
            var u = q + v * d;
            !w.isValid() || (h && !w.visible) || (v += w.percentage / 100);
            var y = q + v * d;
            var A = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * u) / 1e3,
              end: Math.round(1e3 * y) / 1e3,
            };
            w.shapeType = "arc";
            w.shapeArgs = A;
            w.labelDistance = k(
              w.options.dataLabels && w.options.dataLabels.distance,
              c
            );
            w.labelDistance = g(w.labelDistance, A.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              w.labelDistance
            );
            y = (y + u) / 2;
            y > 1.5 * Math.PI
              ? (y -= 2 * Math.PI)
              : y < -Math.PI / 2 && (y += 2 * Math.PI);
            w.slicedTranslation = {
              translateX: Math.round(Math.cos(y) * e),
              translateY: Math.round(Math.sin(y) * e),
            };
            A = (Math.cos(y) * a[2]) / 2;
            p = (Math.sin(y) * a[2]) / 2;
            w.tooltipPos = [a[0] + 0.7 * A, a[1] + 0.7 * p];
            w.half = y < -Math.PI / 2 || y > Math.PI / 2 ? 1 : 0;
            w.angle = y;
            u = Math.min(n, w.labelDistance / 5);
            w.labelPosition = {
              natural: {
                x: a[0] + A + Math.cos(y) * w.labelDistance,
                y: a[1] + p + Math.sin(y) * w.labelDistance,
              },
              computed: {},
              alignment:
                0 > w.labelDistance ? "center" : w.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + A + Math.cos(y) * u,
                  y: a[1] + p + Math.sin(y) * u,
                },
                touchingSliceAt: { x: a[0] + A, y: a[1] + p },
              },
            };
          }
          m(this, "afterTranslate");
        }
        updateTotals() {
          const a = this.points,
            f = a.length,
            e = this.options.ignoreHiddenPoint;
          let g,
            d,
            h = 0;
          for (g = 0; g < f; g++)
            (d = a[g]), !d.isValid() || (e && !d.visible) || (h += d.y);
          this.total = h;
          for (g = 0; g < f; g++)
            (d = a[g]),
              (d.percentage = 0 < h && (d.visible || !e) ? (d.y / h) * 100 : 0),
              (d.total = h);
        }
      }
      w.defaultOptions = n(C.defaultOptions, E);
      r(w.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: K.drawRectangle,
        drawTracker: y.prototype.drawTracker,
        getCenter: a.getCenter,
        getSymbol: H,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: y.prototype.pointAttribs,
        pointClass: B,
        requireSorting: !1,
        searchPoint: H,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      A.registerSeriesType("pie", w);
      return w;
    }
  );
  M(
    a,
    "Series/Pie/PieDataLabel.js",
    [
      a["Core/Series/DataLabel.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B) {
      const { noop: w } = y,
        { distribute: C } = H,
        { series: A } = K,
        {
          arrayMax: u,
          clamp: v,
          defined: f,
          merge: h,
          pick: r,
          relativeLength: m,
        } = B;
      var n;
      (function (k) {
        function g() {
          const a = this,
            d = a.data,
            e = a.chart,
            g = a.options.dataLabels || {},
            c = g.connectorPadding,
            b = e.plotWidth,
            k = e.plotHeight,
            l = e.plotLeft,
            m = Math.round(e.chartWidth / 3),
            n = a.center,
            w = n[2] / 2,
            v = n[1],
            z = [[], []],
            y = [0, 0, 0, 0],
            F = a.dataLabelPositioners;
          let B, E, I, H, D, K, J, M, R, V, T, aa;
          a.visible &&
            (g.enabled || a._hasPointLabels) &&
            (d.forEach(function (a) {
              a.dataLabel &&
                a.visible &&
                a.dataLabel.shortened &&
                (a.dataLabel
                  .attr({ width: "auto" })
                  .css({ width: "auto", textOverflow: "clip" }),
                (a.dataLabel.shortened = !1));
            }),
            A.prototype.drawDataLabels.apply(a),
            d.forEach(function (a) {
              a.dataLabel &&
                (a.visible
                  ? (z[a.half].push(a),
                    (a.dataLabel._pos = null),
                    !f(g.style.width) &&
                      !f(
                        a.options.dataLabels &&
                          a.options.dataLabels.style &&
                          a.options.dataLabels.style.width
                      ) &&
                      a.dataLabel.getBBox().width > m &&
                      (a.dataLabel.css({ width: Math.round(0.7 * m) + "px" }),
                      (a.dataLabel.shortened = !0)))
                  : ((a.dataLabel = a.dataLabel.destroy()),
                    a.dataLabels &&
                      1 === a.dataLabels.length &&
                      delete a.dataLabels));
            }),
            z.forEach((d, h) => {
              const m = d.length,
                p = [];
              let q,
                t = 0;
              if (m) {
                a.sortByAngle(d, h - 0.5);
                if (0 < a.maxLabelDistance) {
                  var u = Math.max(0, v - w - a.maxLabelDistance);
                  q = Math.min(v + w + a.maxLabelDistance, e.plotHeight);
                  d.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, v - w - a.labelDistance)),
                      (a.bottom = Math.min(
                        v + w + a.labelDistance,
                        e.plotHeight
                      )),
                      (t = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + t / 2,
                        size: t,
                        rank: a.y,
                      }),
                      p.push(a.distributeBox));
                  });
                  u = q + t - u;
                  C(p, u, u / 5);
                }
                for (T = 0; T < m; T++) {
                  B = d[T];
                  K = B.labelPosition;
                  H = B.dataLabel;
                  V = !1 === B.visible ? "hidden" : "inherit";
                  R = u = K.natural.y;
                  p &&
                    f(B.distributeBox) &&
                    ("undefined" === typeof B.distributeBox.pos
                      ? (V = "hidden")
                      : ((J = B.distributeBox.size),
                        (R = F.radialDistributionY(B))));
                  delete B.positionIndex;
                  if (g.justify) M = F.justify(B, w, n);
                  else
                    switch (g.alignTo) {
                      case "connectors":
                        M = F.alignToConnectors(d, h, b, l);
                        break;
                      case "plotEdges":
                        M = F.alignToPlotEdges(H, h, b, l);
                        break;
                      default:
                        M = F.radialDistributionX(a, B, R, u);
                    }
                  H._attr = { visibility: V, align: K.alignment };
                  aa = B.options.dataLabels || {};
                  H._pos = {
                    x:
                      M +
                      r(aa.x, g.x) +
                      ({ left: c, right: -c }[K.alignment] || 0),
                    y: R + r(aa.y, g.y) - H.getBBox().height / 2,
                  };
                  K && ((K.computed.x = M), (K.computed.y = R));
                  r(g.crop, !0) &&
                    ((D = H.getBBox().width),
                    (u = null),
                    M - D < c && 1 === h
                      ? ((u = Math.round(D - M + c)),
                        (y[3] = Math.max(u, y[3])))
                      : M + D > b - c &&
                        0 === h &&
                        ((u = Math.round(M + D - b + c)),
                        (y[1] = Math.max(u, y[1]))),
                    0 > R - J / 2
                      ? (y[0] = Math.max(Math.round(-R + J / 2), y[0]))
                      : R + J / 2 > k &&
                        (y[2] = Math.max(Math.round(R + J / 2 - k), y[2])),
                    (H.sideOverflow = u));
                }
              }
            }),
            0 === u(y) || this.verifyDataLabelOverflow(y)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (b) {
              aa = h(g, b.options.dataLabels);
              if ((E = r(aa.connectorWidth, 1))) {
                let c;
                I = b.connector;
                if (
                  (H = b.dataLabel) &&
                  H._pos &&
                  b.visible &&
                  0 < b.labelDistance
                ) {
                  V = H._attr.visibility;
                  if ((c = !I))
                    (b.connector = I =
                      e.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            b.colorIndex +
                            (b.className ? " " + b.className : "")
                        )
                        .add(a.dataLabelsGroup)),
                      e.styledMode ||
                        I.attr({
                          "stroke-width": E,
                          stroke: aa.connectorColor || b.color || "#666666",
                        });
                  I[c ? "attr" : "animate"]({ d: b.getConnectorPath() });
                  I.attr("visibility", V);
                } else I && (b.connector = I.destroy());
              }
            }));
        }
        function n() {
          this.points.forEach(function (a) {
            let d = a.dataLabel,
              e;
            d &&
              a.visible &&
              ((e = d._pos)
                ? (d.sideOverflow &&
                    ((d._attr.width = Math.max(
                      d.getBBox().width - d.sideOverflow,
                      0
                    )),
                    d.css({
                      width: d._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (d.shortened = !0)),
                  d.attr(d._attr),
                  d[d.moved ? "animate" : "attr"](e),
                  (d.moved = !0))
                : d && d.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function y(a) {
          let d = this.center,
            e = this.options,
            f = e.center,
            c = e.minSize || 80,
            b,
            g = null !== e.size;
          g ||
            (null !== f[0]
              ? (b = Math.max(d[2] - Math.max(a[1], a[3]), c))
              : ((b = Math.max(d[2] - a[1] - a[3], c)),
                (d[0] += (a[3] - a[1]) / 2)),
            null !== f[1]
              ? (b = v(b, c, d[2] - Math.max(a[0], a[2])))
              : ((b = v(b, c, d[2] - a[0] - a[2])),
                (d[1] += (a[0] - a[2]) / 2)),
            b < d[2]
              ? ((d[2] = b),
                (d[3] = Math.min(
                  e.thickness
                    ? Math.max(0, b - 2 * e.thickness)
                    : Math.max(0, m(e.innerSize || 0, b)),
                  b
                )),
                this.translate(d),
                this.drawDataLabels && this.drawDataLabels())
              : (g = !0));
          return g;
        }
        const z = [],
          e = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, d, e, f) {
              return a.getX(
                e < d.top + 2 || e > d.bottom - 2 ? f : e,
                d.half,
                d
              );
            },
            justify: function (a, d, e) {
              return e[0] + (a.half ? -1 : 1) * (d + a.labelDistance);
            },
            alignToPlotEdges: function (a, d, e, f) {
              a = a.getBBox().width;
              return d ? a + f : e - a - f;
            },
            alignToConnectors: function (a, d, e, f) {
              let c = 0,
                b;
              a.forEach(function (a) {
                b = a.dataLabel.getBBox().width;
                b > c && (c = b);
              });
              return d ? c + f : e - c - f;
            },
          };
        k.compose = function (f) {
          a.compose(A);
          B.pushUnique(z, f) &&
            ((f = f.prototype),
            (f.dataLabelPositioners = e),
            (f.alignDataLabel = w),
            (f.drawDataLabels = g),
            (f.placeDataLabels = n),
            (f.verifyDataLabelOverflow = y));
        };
      })(n || (n = {}));
      return n;
    }
  );
  M(
    a,
    "Extensions/OverlappingDataLabels.js",
    [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]],
    function (a, y) {
      function w(a, f) {
        let h,
          r = !1;
        a &&
          ((h = a.newOpacity),
          a.oldOpacity !== h &&
            (a.alignAttr && a.placed
              ? (a[h ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden"
                ),
                (r = !0),
                (a.alignAttr.opacity = h),
                a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function () {
                  f.styledMode || a.css({ pointerEvents: h ? "auto" : "none" });
                }),
                B(f, "afterHideOverlappingLabel"))
              : a.attr({ opacity: h })),
          (a.isOld = !0));
        return r;
      }
      const {
        addEvent: K,
        fireEvent: B,
        isArray: E,
        isNumber: C,
        objectEach: A,
        pick: u,
      } = y;
      K(a, "render", function () {
        let a = this,
          f = [];
        (this.labelCollectors || []).forEach(function (a) {
          f = f.concat(a());
        });
        (this.yAxis || []).forEach(function (a) {
          a.stacking &&
            a.options.stackLabels &&
            !a.options.stackLabels.allowOverlap &&
            A(a.stacking.stacks, function (a) {
              A(a, function (a) {
                a.label && f.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (h) {
          var r = h.options.dataLabels;
          h.visible &&
            (!1 !== r.enabled || h._hasPointLabels) &&
            ((r = (h) =>
              h.forEach((h) => {
                h.visible &&
                  (E(h.dataLabels)
                    ? h.dataLabels
                    : h.dataLabel
                    ? [h.dataLabel]
                    : []
                  ).forEach(function (k) {
                    const g = k.options;
                    k.labelrank = u(
                      g.labelrank,
                      h.labelrank,
                      h.shapeArgs && h.shapeArgs.height
                    );
                    g.allowOverlap
                      ? ((k.oldOpacity = k.opacity),
                        (k.newOpacity = 1),
                        w(k, a))
                      : f.push(k);
                  });
              })),
            r(h.nodes || []),
            r(h.points));
        });
        this.hideOverlappingLabels(f);
      });
      a.prototype.hideOverlappingLabels = function (a) {
        let f = this,
          h = a.length,
          r = f.renderer;
        var m;
        let n;
        let k,
          g,
          u,
          v = !1;
        var z = function (a) {
          let e, d;
          var f;
          let g = a.box ? 0 : a.padding || 0,
            c = (f = 0),
            b,
            h;
          if (a && (!a.alignAttr || a.placed))
            return (
              (e = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }),
              (d = a.parentGroup),
              a.width ||
                ((f = a.getBBox()),
                (a.width = f.width),
                (a.height = f.height),
                (f = r.fontMetrics(a.element).h)),
              (b = a.width - 2 * g),
              (h = { left: "0", center: "0.5", right: "1" }[a.alignValue])
                ? (c = +h * b)
                : C(a.x) &&
                  Math.round(a.x) !== a.translateX &&
                  (c = a.x - a.translateX),
              {
                x: e.x + (d.translateX || 0) + g - (c || 0),
                y: e.y + (d.translateY || 0) + g - f,
                width: a.width - 2 * g,
                height: a.height - 2 * g,
              }
            );
        };
        for (n = 0; n < h; n++)
          if ((m = a[n]))
            (m.oldOpacity = m.opacity),
              (m.newOpacity = 1),
              (m.absoluteBox = z(m));
        a.sort(function (a, f) {
          return (f.labelrank || 0) - (a.labelrank || 0);
        });
        for (n = 0; n < h; n++)
          for (g = (z = a[n]) && z.absoluteBox, m = n + 1; m < h; ++m)
            (u = (k = a[m]) && k.absoluteBox),
              !g ||
                !u ||
                z === k ||
                0 === z.newOpacity ||
                0 === k.newOpacity ||
                "hidden" === z.visibility ||
                "hidden" === k.visibility ||
                u.x >= g.x + g.width ||
                u.x + u.width <= g.x ||
                u.y >= g.y + g.height ||
                u.y + u.height <= g.y ||
                ((z.labelrank < k.labelrank ? z : k).newOpacity = 0);
        a.forEach(function (a) {
          w(a, f) && (v = !0);
        });
        v && B(f, "afterHideAllOverlappingLabels");
      };
    }
  );
  M(
    a,
    "Extensions/BorderRadius.js",
    [
      a["Core/Defaults.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, y, H, K, B, E) {
      const { defaultOptions: w } = a;
      ({ seriesTypes: a } = H);
      const {
          addEvent: A,
          extend: u,
          isObject: v,
          merge: f,
          relativeLength: h,
        } = E,
        r = { radius: 0, scope: "stack", where: void 0 },
        m = (a, h) => {
          v(a) || (a = { radius: a || 0 });
          return f(r, h, a);
        };
      if (-1 === K.symbolCustomAttribs.indexOf("borderRadius")) {
        K.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY");
        const f = B.prototype.symbols.arc;
        B.prototype.symbols.arc = function (a, k, m, n, e = {}) {
          a = f(a, k, m, n, e);
          const { innerR: g = 0, r: d = m, start: q = 0, end: r = 0 } = e;
          if (e.open || !e.borderRadius) return a;
          m = r - q;
          k = Math.sin(m / 2);
          e = Math.max(
            Math.min(
              h(e.borderRadius || 0, d - g),
              (d - g) / 2,
              (d * k) / (1 + k)
            ),
            0
          );
          m = Math.min(e, (m / Math.PI) * 2 * g);
          for (k = a.length - 1; k--; ) {
            {
              let d = void 0,
                f = void 0,
                g = void 0;
              n = a;
              var c = k,
                b = 1 < k ? m : e,
                p = n[c],
                l = n[c + 1];
              "Z" === l[0] && (l = n[0]);
              ("M" !== p[0] && "L" !== p[0]) || "A" !== l[0]
                ? "A" !== p[0] ||
                  ("M" !== l[0] && "L" !== l[0]) ||
                  ((g = l), (f = p))
                : ((g = p), (f = l), (d = !0));
              if (g && f && f.params) {
                p = f[1];
                var w = f[5];
                l = f.params;
                const { start: a, end: e, cx: h, cy: k } = l;
                var u = w ? p - b : p + b;
                const m = u ? Math.asin(b / u) : 0;
                w = w ? m : -m;
                u *= Math.cos(m);
                d
                  ? ((l.start = a + w),
                    (g[1] = h + u * Math.cos(a)),
                    (g[2] = k + u * Math.sin(a)),
                    n.splice(c + 1, 0, [
                      "A",
                      b,
                      b,
                      0,
                      0,
                      1,
                      h + p * Math.cos(l.start),
                      k + p * Math.sin(l.start),
                    ]))
                  : ((l.end = e - w),
                    (f[6] = h + p * Math.cos(l.end)),
                    (f[7] = k + p * Math.sin(l.end)),
                    n.splice(c + 1, 0, [
                      "A",
                      b,
                      b,
                      0,
                      0,
                      1,
                      h + u * Math.cos(e),
                      k + u * Math.sin(e),
                    ]));
                f[4] = Math.abs(l.end - l.start) < Math.PI ? 0 : 1;
              }
            }
          }
          return a;
        };
        const k = B.prototype.symbols.roundedRect;
        B.prototype.symbols.roundedRect = function (a, f, h, m, e = {}) {
          const g = k(a, f, h, m, e),
            { r: d = 0, brBoxHeight: n = m, brBoxY: r = f } = e;
          var c = f - r,
            b = r + n - (f + m);
          e = -0.1 < c - d ? 0 : d;
          const p = -0.1 < b - d ? 0 : d;
          var l = Math.max(e && c, 0);
          const w = Math.max(p && b, 0);
          b = [a + e, f];
          c = [a + h - e, f];
          const u = [a + h, f + e],
            v = [a + h, f + m - p],
            z = [a + h - p, f + m],
            y = [a + p, f + m],
            A = [a, f + m - p],
            B = [a, f + e];
          if (l) {
            const a = Math.sqrt(Math.pow(e, 2) - Math.pow(e - l, 2));
            b[0] -= a;
            c[0] += a;
            u[1] = B[1] = f + e - l;
          }
          m < e - l &&
            ((l = Math.sqrt(Math.pow(e, 2) - Math.pow(e - l - m, 2))),
            (u[0] = v[0] = a + h - e + l),
            (z[0] = Math.min(u[0], z[0])),
            (y[0] = Math.max(v[0], y[0])),
            (A[0] = B[0] = a + e - l),
            (u[1] = B[1] = f + m));
          w &&
            ((l = Math.sqrt(Math.pow(p, 2) - Math.pow(p - w, 2))),
            (z[0] += l),
            (y[0] -= l),
            (v[1] = A[1] = f + m - p + w));
          m < p - w &&
            ((m = Math.sqrt(Math.pow(p, 2) - Math.pow(p - w - m, 2))),
            (u[0] = v[0] = a + h - p + m),
            (c[0] = Math.min(u[0], c[0])),
            (b[0] = Math.max(v[0], b[0])),
            (A[0] = B[0] = a + p - m),
            (v[1] = A[1] = f));
          g.length = 0;
          g.push(
            ["M", ...b],
            ["L", ...c],
            ["A", e, e, 0, 0, 1, ...u],
            ["L", ...v],
            ["A", p, p, 0, 0, 1, ...z],
            ["L", ...y],
            ["A", p, p, 0, 0, 1, ...A],
            ["L", ...B],
            ["A", e, e, 0, 0, 1, ...b],
            ["Z"]
          );
          return g;
        };
        A(a.pie, "afterTranslate", function () {
          const a = m(this.options.borderRadius);
          for (const f of this.points) {
            const g = f.shapeArgs;
            g && (g.borderRadius = h(a.radius, (g.r || 0) - (g.innerR || 0)));
          }
        });
        A(
          y,
          "afterColumnTranslate",
          function () {
            var a, f;
            if (
              this.options.borderRadius &&
              (!this.chart.is3d || !this.chart.is3d())
            ) {
              const { options: g, yAxis: d } = this,
                q = "percent" === g.stacking;
              var k =
                null ===
                  (f =
                    null === (a = w.plotOptions) || void 0 === a
                      ? void 0
                      : a[this.type]) || void 0 === f
                  ? void 0
                  : f.borderRadius;
              a = m(g.borderRadius, v(k) ? k : {});
              f = d.options.reversed;
              for (const m of this.points)
                if (
                  (({ shapeArgs: k } = m), "roundedRect" === m.shapeType && k)
                ) {
                  const { width: c = 0, height: b = 0, y: p = 0 } = k;
                  var n = p,
                    e = b;
                  "stack" === a.scope &&
                    m.stackTotal &&
                    ((n = d.translate(q ? 100 : m.stackTotal, !1, !0, !1, !0)),
                    (e = d.translate(g.threshold || 0, !1, !0, !1, !0)),
                    (e = this.crispCol(0, Math.min(n, e), 0, Math.abs(n - e))),
                    (n = e.y),
                    (e = e.height));
                  const l = -1 === (m.negative ? -1 : 1) * (f ? -1 : 1);
                  let r = a.where;
                  !r &&
                    this.is("waterfall") &&
                    Math.abs(
                      (m.yBottom || 0) - (this.translatedThreshold || 0)
                    ) > this.borderWidth &&
                    (r = "all");
                  r || (r = "end");
                  const t =
                    Math.min(
                      h(a.radius, c),
                      c / 2,
                      "all" === r ? b / 2 : Infinity
                    ) || 0;
                  "end" === r && (l && (n -= t), (e += t));
                  u(k, { brBoxHeight: e, brBoxY: n, r: t });
                }
            }
          },
          { order: 9 }
        );
      }
      y = { optionsToObject: m };
      ("");
      return y;
    }
  );
  M(a, "Core/Responsive.js", [a["Core/Utilities.js"]], function (a) {
    const {
      extend: w,
      find: H,
      isArray: K,
      isObject: B,
      merge: E,
      objectEach: C,
      pick: A,
      splat: u,
      uniqueKey: v,
    } = a;
    var f;
    (function (f) {
      function h(a) {
        function f(a, h, d, k) {
          let e;
          C(a, function (a, b) {
            if (!k && -1 < g.collectionsWithUpdate.indexOf(b) && h[b])
              for (
                a = u(a), d[b] = [], e = 0;
                e < Math.max(a.length, h[b].length);
                e++
              )
                h[b][e] &&
                  (void 0 === a[e]
                    ? (d[b][e] = h[b][e])
                    : ((d[b][e] = {}), f(a[e], h[b][e], d[b][e], k + 1)));
            else
              B(a)
                ? ((d[b] = K(a) ? [] : {}), f(a, h[b] || {}, d[b], k + 1))
                : (d[b] = "undefined" === typeof h[b] ? null : h[b]);
          });
        }
        const g = this,
          h = {};
        f(a, this.options, h, 0);
        return h;
      }
      function m(a, f) {
        const g = a.condition;
        (
          g.callback ||
          function () {
            return (
              this.chartWidth <= A(g.maxWidth, Number.MAX_VALUE) &&
              this.chartHeight <= A(g.maxHeight, Number.MAX_VALUE) &&
              this.chartWidth >= A(g.minWidth, 0) &&
              this.chartHeight >= A(g.minHeight, 0)
            );
          }
        ).call(this) && f.push(a._id);
      }
      function n(a, f) {
        const g = this.options.responsive;
        var h = this.currentResponsive;
        let e = [];
        !f &&
          g &&
          g.rules &&
          g.rules.forEach((a) => {
            "undefined" === typeof a._id && (a._id = v());
            this.matchResponsiveRule(a, e);
          }, this);
        f = E(
          ...e
            .map((a) => H((g || {}).rules || [], (d) => d._id === a))
            .map((a) => a && a.chartOptions)
        );
        f.isResponsiveOptions = !0;
        e = e.toString() || void 0;
        e !== (h && h.ruleIds) &&
          (h && this.update(h.undoOptions, a, !0),
          e
            ? ((h = this.currentOptions(f)),
              (h.isResponsiveOptions = !0),
              (this.currentResponsive = {
                ruleIds: e,
                mergedOptions: f,
                undoOptions: h,
              }),
              this.update(f, a, !0))
            : (this.currentResponsive = void 0));
      }
      const k = [];
      f.compose = function (f) {
        a.pushUnique(k, f) &&
          w(f.prototype, {
            currentOptions: h,
            matchResponsiveRule: m,
            setResponsive: n,
          });
        return f;
      };
    })(f || (f = {}));
    ("");
    ("");
    return f;
  });
  M(
    a,
    "masters/highcharts.src.js",
    [
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
      a["Core/Defaults.js"],
      a["Core/Animation/Fx.js"],
      a["Core/Animation/AnimationUtilities.js"],
      a["Core/Renderer/HTML/AST.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Renderer/RendererUtilities.js"],
      a["Core/Renderer/SVG/SVGElement.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Renderer/HTML/HTMLElement.js"],
      a["Core/Renderer/HTML/HTMLRenderer.js"],
      a["Core/Axis/Axis.js"],
      a["Core/Axis/DateTimeAxis.js"],
      a["Core/Axis/LogarithmicAxis.js"],
      a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
      a["Core/Axis/Tick.js"],
      a["Core/Tooltip.js"],
      a["Core/Series/Point.js"],
      a["Core/Pointer.js"],
      a["Core/Legend/Legend.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Axis/Stacking/StackingAxis.js"],
      a["Core/Axis/Stacking/StackItem.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Series/Column/ColumnSeries.js"],
      a["Series/Column/ColumnDataLabel.js"],
      a["Series/Pie/PieSeries.js"],
      a["Series/Pie/PieDataLabel.js"],
      a["Core/Series/DataLabel.js"],
      a["Core/Responsive.js"],
      a["Core/Color/Color.js"],
      a["Core/Time.js"],
    ],
    function (
      a,
      y,
      H,
      K,
      B,
      E,
      C,
      A,
      u,
      v,
      f,
      h,
      r,
      m,
      n,
      k,
      g,
      I,
      F,
      z,
      e,
      t,
      d,
      q,
      x,
      c,
      b,
      p,
      l,
      L,
      M,
      O,
      T,
      S
    ) {
      a.animate = B.animate;
      a.animObject = B.animObject;
      a.getDeferredAnimation = B.getDeferredAnimation;
      a.setAnimation = B.setAnimation;
      a.stop = B.stop;
      a.timers = K.timers;
      a.AST = E;
      a.Axis = r;
      a.Chart = t;
      a.chart = t.chart;
      a.Fx = K;
      a.Legend = e;
      a.PlotLineOrBand = k;
      a.Point = F;
      a.Pointer = z;
      a.Series = x;
      a.StackItem = q;
      a.SVGElement = u;
      a.SVGRenderer = v;
      a.Tick = g;
      a.Time = S;
      a.Tooltip = I;
      a.Color = T;
      a.color = T.parse;
      h.compose(v);
      f.compose(u);
      z.compose(t);
      e.compose(t);
      a.defaultOptions = H.defaultOptions;
      a.getOptions = H.getOptions;
      a.time = H.defaultTime;
      a.setOptions = H.setOptions;
      a.dateFormat = C.dateFormat;
      a.format = C.format;
      a.numberFormat = C.numberFormat;
      a.addEvent = y.addEvent;
      a.arrayMax = y.arrayMax;
      a.arrayMin = y.arrayMin;
      a.attr = y.attr;
      a.clearTimeout = y.clearTimeout;
      a.correctFloat = y.correctFloat;
      a.createElement = y.createElement;
      a.css = y.css;
      a.defined = y.defined;
      a.destroyObjectProperties = y.destroyObjectProperties;
      a.discardElement = y.discardElement;
      a.distribute = A.distribute;
      a.erase = y.erase;
      a.error = y.error;
      a.extend = y.extend;
      a.extendClass = y.extendClass;
      a.find = y.find;
      a.fireEvent = y.fireEvent;
      a.getMagnitude = y.getMagnitude;
      a.getStyle = y.getStyle;
      a.inArray = y.inArray;
      a.isArray = y.isArray;
      a.isClass = y.isClass;
      a.isDOMElement = y.isDOMElement;
      a.isFunction = y.isFunction;
      a.isNumber = y.isNumber;
      a.isObject = y.isObject;
      a.isString = y.isString;
      a.keys = y.keys;
      a.merge = y.merge;
      a.normalizeTickInterval = y.normalizeTickInterval;
      a.objectEach = y.objectEach;
      a.offset = y.offset;
      a.pad = y.pad;
      a.pick = y.pick;
      a.pInt = y.pInt;
      a.relativeLength = y.relativeLength;
      a.removeEvent = y.removeEvent;
      a.seriesType = c.seriesType;
      a.splat = y.splat;
      a.stableSort = y.stableSort;
      a.syncTimeout = y.syncTimeout;
      a.timeUnits = y.timeUnits;
      a.uniqueKey = y.uniqueKey;
      a.useSerialIds = y.useSerialIds;
      a.wrap = y.wrap;
      p.compose(b);
      M.compose(x);
      m.compose(r);
      n.compose(r);
      L.compose(l);
      k.compose(r);
      O.compose(t);
      d.compose(r, t, x);
      I.compose(z);
      return a;
    }
  );
  a["masters/highcharts.src.js"]._modules = a;
  return a["masters/highcharts.src.js"];
});
//# sourceMappingURL=highcharts.js.map
