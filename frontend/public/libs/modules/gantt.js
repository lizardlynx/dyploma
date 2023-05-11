/*
 Highcharts Gantt JS v11.0.0 (2023-04-26)

 Gantt series

 (c) 2016-2021 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
"use strict";
(function (e) {
  "object" === typeof module && module.exports
    ? ((e["default"] = e), (module.exports = e))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/gantt", ["highcharts"], function (K) {
        e(K);
        e.Highcharts = K;
        return e;
      })
    : e("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (e) {
  function K(e, B, z, H) {
    e.hasOwnProperty(B) ||
      ((e[B] = H.apply(null, z)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: B, module: e[B] },
          })
        ));
  }
  e = e ? e._modules : {};
  K(
    e,
    "Core/Axis/NavigatorAxisComposition.js",
    [e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (e, B) {
      function F() {
        this.navigatorAxis || (this.navigatorAxis = new q(this));
      }
      function H(b) {
        var l = this.chart.options,
          v = l.navigator;
        const d = this.navigatorAxis,
          h = l.chart.zooming.pinchType,
          t = l.rangeSelector;
        l = l.chart.zooming.type;
        this.isXAxis &&
          ((v && v.enabled) || (t && t.enabled)) &&
          ("y" === l
            ? (b.zoomed = !1)
            : ((!E && "xy" === l) || (E && "xy" === h)) &&
              this.options.range &&
              ((v = d.previousZoom),
              x(b.newMin)
                ? (d.previousZoom = [this.min, this.max])
                : v &&
                  ((b.newMin = v[0]),
                  (b.newMax = v[1]),
                  (d.previousZoom = void 0))));
        "undefined" !== typeof b.zoomed && b.preventDefault();
      }
      const { isTouchDevice: E } = e,
        { addEvent: D, correctFloat: p, defined: x, isNumber: y, pick: b } = B,
        m = [];
      class q {
        static compose(b) {
          B.pushUnique(m, b) &&
            (b.keepProps.push("navigatorAxis"),
            D(b, "init", F),
            D(b, "zoom", H));
        }
        constructor(b) {
          this.axis = b;
        }
        destroy() {
          this.axis = void 0;
        }
        toFixedRange(m, l, v, d) {
          var h = this.axis,
            t = h.chart;
          m = b(v, h.translate(m, !0, !h.horiz));
          l = b(d, h.translate(l, !0, !h.horiz));
          t = t && t.fixedRange;
          h = (h.pointRange || 0) / 2;
          const q = t && (l - m) / t;
          x(v) || (m = p(m + h));
          x(d) || (l = p(l - h));
          0.7 < q && 1.3 > q && (d ? (m = l - t) : (l = m + t));
          (y(m) && y(l)) || (m = l = void 0);
          return { min: m, max: l };
        }
      }
      return q;
    }
  );
  K(
    e,
    "Stock/Navigator/NavigatorDefaults.js",
    [e["Core/Color/Color.js"], e["Core/Series/SeriesRegistry.js"]],
    function (e, B) {
      ({ parse: e } = e);
      ({ seriesTypes: B } = B);
      B = {
        height: 40,
        margin: 25,
        maskInside: !0,
        handles: {
          width: 7,
          height: 15,
          symbols: ["navigator-handle", "navigator-handle"],
          enabled: !0,
          lineWidth: 1,
          backgroundColor: "#f2f2f2",
          borderColor: "#999999",
        },
        maskFill: e("#667aff").setOpacity(0.3).get(),
        outlineColor: "#999999",
        outlineWidth: 1,
        series: {
          type: "undefined" === typeof B.areaspline ? "line" : "areaspline",
          fillOpacity: 0.05,
          lineWidth: 1,
          compare: null,
          sonification: { enabled: !1 },
          dataGrouping: {
            approximation: "average",
            enabled: !0,
            groupPixelWidth: 2,
            firstAnchor: "firstPoint",
            anchor: "middle",
            lastAnchor: "lastPoint",
            units: [
              ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
              ["second", [1, 2, 5, 10, 15, 30]],
              ["minute", [1, 2, 5, 10, 15, 30]],
              ["hour", [1, 2, 3, 4, 6, 8, 12]],
              ["day", [1, 2, 3, 4]],
              ["week", [1, 2, 3]],
              ["month", [1, 3, 6]],
              ["year", null],
            ],
          },
          dataLabels: { enabled: !1, zIndex: 2 },
          id: "highcharts-navigator-series",
          className: "highcharts-navigator-series",
          lineColor: null,
          marker: { enabled: !1 },
          threshold: null,
        },
        xAxis: {
          overscroll: 0,
          className: "highcharts-navigator-xaxis",
          tickLength: 0,
          lineWidth: 0,
          gridLineColor: "#e6e6e6",
          gridLineWidth: 1,
          tickPixelInterval: 200,
          labels: {
            align: "left",
            style: {
              color: "#000000",
              fontSize: "0.7em",
              opacity: 0.6,
              textOutline: "2px contrast",
            },
            x: 3,
            y: -4,
          },
          crosshair: !1,
        },
        yAxis: {
          className: "highcharts-navigator-yaxis",
          gridLineWidth: 0,
          startOnTick: !1,
          endOnTick: !1,
          minPadding: 0.1,
          maxPadding: 0.1,
          labels: { enabled: !1 },
          crosshair: !1,
          title: { text: null },
          tickLength: 0,
          tickWidth: 0,
        },
      };
      ("");
      return B;
    }
  );
  K(e, "Stock/Navigator/NavigatorSymbols.js", [], function () {
    return {
      "navigator-handle": function (e, B, z, H, E = {}) {
        e = E.width ? E.width / 2 : z;
        B = Math.round(e / 3) + 0.5;
        H = E.height || H;
        return [
          ["M", -e - 1, 0.5],
          ["L", e, 0.5],
          ["L", e, H + 0.5],
          ["L", -e - 1, H + 0.5],
          ["L", -e - 1, 0.5],
          ["M", -B, 4],
          ["L", -B, H - 3],
          ["M", B - 1, 4],
          ["L", B - 1, H - 3],
        ];
      },
    };
  });
  K(
    e,
    "Stock/Navigator/NavigatorComposition.js",
    [
      e["Core/Defaults.js"],
      e["Core/Globals.js"],
      e["Core/Axis/NavigatorAxisComposition.js"],
      e["Stock/Navigator/NavigatorDefaults.js"],
      e["Stock/Navigator/NavigatorSymbols.js"],
      e["Core/Renderer/RendererRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z, H, E, D, p) {
      function x() {
        this.navigator && this.navigator.setBaseSeries(null, !1);
      }
      function y() {
        var k;
        const c = this.legend,
          f = this.navigator;
        let w, g, a;
        if (f) {
          w = c && c.options;
          g = f.xAxis;
          a = f.yAxis;
          const { scrollbarHeight: C, scrollButtonSize: d } = f;
          this.inverted
            ? ((f.left = f.opposite
                ? this.chartWidth - C - f.height
                : this.spacing[3] + C),
              (f.top = this.plotTop + d))
            : ((f.left = u(g.left, this.plotLeft + d)),
              (f.top =
                f.navigatorOptions.top ||
                this.chartHeight -
                  f.height -
                  C -
                  ((null === (k = this.scrollbar) || void 0 === k
                    ? void 0
                    : k.options.margin) || 0) -
                  this.spacing[2] -
                  (this.rangeSelector && this.extraBottomMargin
                    ? this.rangeSelector.getHeight()
                    : 0) -
                  (w &&
                  "bottom" === w.verticalAlign &&
                  "proximate" !== w.layout &&
                  w.enabled &&
                  !w.floating
                    ? c.legendHeight + u(w.margin, 10)
                    : 0) -
                  (this.titleOffset ? this.titleOffset[2] : 0)));
          g &&
            a &&
            (this.inverted
              ? (g.options.left = a.options.left = f.left)
              : (g.options.top = a.options.top = f.top),
            g.setAxisSize(),
            a.setAxisSize());
        }
      }
      function b(k) {
        this.navigator ||
          this.scroller ||
          (!this.options.navigator.enabled &&
            !this.options.scrollbar.enabled) ||
          ((this.scroller = this.navigator = new g(this)),
          u(k.redraw, !0) && this.redraw(k.animation));
      }
      function m() {
        const k = this.options;
        if (k.navigator.enabled || k.scrollbar.enabled)
          this.scroller = this.navigator = new g(this);
      }
      function q() {
        const k = this.options,
          c = k.navigator,
          f = k.rangeSelector;
        if (
          ((c && c.enabled) || (f && f.enabled)) &&
          ((!t && "x" === k.chart.zooming.type) ||
            (t && "x" === k.chart.zooming.pinchType))
        )
          return !1;
      }
      function J(k) {
        const c = k.navigator;
        c &&
          k.xAxis[0] &&
          ((k = k.xAxis[0].getExtremes()), c.render(k.min, k.max));
      }
      function l(k) {
        const c = k.options.navigator || {},
          f = k.options.scrollbar || {};
        this.navigator ||
          this.scroller ||
          (!c.enabled && !f.enabled) ||
          (a(!0, this.options.navigator, c),
          a(!0, this.options.scrollbar, f),
          delete k.options.navigator,
          delete k.options.scrollbar);
      }
      function v() {
        this.chart.navigator &&
          !this.options.isInternal &&
          this.chart.navigator.setBaseSeries(null, !1);
      }
      const { defaultOptions: d, setOptions: h } = e,
        { isTouchDevice: t } = B,
        { getRendererType: M } = D,
        { addEvent: G, extend: n, merge: a, pick: u } = p,
        A = [];
      let g;
      return {
        compose: function (k, c, f, w) {
          z.compose(k);
          g = f;
          p.pushUnique(A, c) &&
            (c.prototype.callbacks.push(J),
            G(c, "afterAddSeries", x),
            G(c, "afterSetChartSize", y),
            G(c, "afterUpdate", b),
            G(c, "beforeRender", m),
            G(c, "beforeShowResetZoom", q),
            G(c, "update", l));
          p.pushUnique(A, w) && G(w, "afterUpdate", v);
          p.pushUnique(A, M) && n(M().prototype.symbols, E);
          p.pushUnique(A, h) && n(d, { navigator: H });
        },
      };
    }
  );
  K(e, "Core/Axis/ScrollbarAxis.js", [e["Core/Utilities.js"]], function (e) {
    const { addEvent: B, defined: z, pick: F } = e,
      E = [];
    class D {
      static compose(p, x) {
        if (!e.pushUnique(E, p)) return p;
        const y = (b) => {
          const m = F(b.options && b.options.min, b.min),
            q = F(b.options && b.options.max, b.max);
          return {
            axisMin: m,
            axisMax: q,
            scrollMin: z(b.dataMin)
              ? Math.min(m, b.min, b.dataMin, F(b.threshold, Infinity))
              : m,
            scrollMax: z(b.dataMax)
              ? Math.max(q, b.max, b.dataMax, F(b.threshold, -Infinity))
              : q,
          };
        };
        B(p, "afterInit", function () {
          const b = this;
          b.options &&
            b.options.scrollbar &&
            b.options.scrollbar.enabled &&
            ((b.options.scrollbar.vertical = !b.horiz),
            (b.options.startOnTick = b.options.endOnTick = !1),
            (b.scrollbar = new x(
              b.chart.renderer,
              b.options.scrollbar,
              b.chart
            )),
            B(b.scrollbar, "changed", function (m) {
              let { axisMin: q, axisMax: e, scrollMin: l, scrollMax: v } = y(b);
              var d = v - l;
              let h;
              z(q) &&
                z(e) &&
                ((b.horiz && !b.reversed) || (!b.horiz && b.reversed)
                  ? ((h = l + d * this.to), (d = l + d * this.from))
                  : ((h = l + d * (1 - this.from)),
                    (d = l + d * (1 - this.to))),
                this.shouldUpdateExtremes(m.DOMType)
                  ? b.setExtremes(
                      d,
                      h,
                      !0,
                      "mousemove" !== m.DOMType && "touchmove" !== m.DOMType,
                      m
                    )
                  : this.setRange(this.from, this.to));
            }));
        });
        B(p, "afterRender", function () {
          let { scrollMin: b, scrollMax: m } = y(this),
            q = this.scrollbar;
          var e = this.axisTitleMargin + (this.titleOffset || 0),
            l = this.chart.scrollbarsOffsets;
          let v = this.options.margin || 0;
          q &&
            (this.horiz
              ? (this.opposite || (l[1] += e),
                q.position(
                  this.left,
                  this.top + this.height + 2 + l[1] - (this.opposite ? v : 0),
                  this.width,
                  this.height
                ),
                this.opposite || (l[1] += v),
                (e = 1))
              : (this.opposite && (l[0] += e),
                q.position(
                  q.options.opposite
                    ? this.left +
                        this.width +
                        2 +
                        l[0] -
                        (this.opposite ? 0 : v)
                    : this.opposite
                    ? 0
                    : v,
                  this.top,
                  this.width,
                  this.height
                ),
                this.opposite && (l[0] += v),
                (e = 0)),
            (l[e] += q.size + (q.options.margin || 0)),
            isNaN(b) ||
            isNaN(m) ||
            !z(this.min) ||
            !z(this.max) ||
            this.min === this.max
              ? q.setRange(0, 1)
              : ((l = (this.min - b) / (m - b)),
                (e = (this.max - b) / (m - b)),
                (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
                  ? q.setRange(l, e)
                  : q.setRange(1 - e, 1 - l)));
        });
        B(p, "afterGetOffset", function () {
          const b = this.scrollbar;
          var m = b && !b.options.opposite;
          m = this.horiz ? 2 : m ? 3 : 1;
          b &&
            ((this.chart.scrollbarsOffsets = [0, 0]),
            (this.chart.axisOffset[m] += b.size + (b.options.margin || 0)));
        });
        return p;
      }
    }
    return D;
  });
  K(
    e,
    "Stock/Scrollbar/ScrollbarDefaults.js",
    [e["Core/Globals.js"]],
    function (e) {
      return {
        height: 10,
        barBorderRadius: 5,
        buttonBorderRadius: 0,
        buttonsEnabled: !1,
        liveRedraw: void 0,
        margin: void 0,
        minWidth: 6,
        opposite: !0,
        step: 0.2,
        zIndex: 3,
        barBackgroundColor: "#cccccc",
        barBorderWidth: 0,
        barBorderColor: "#cccccc",
        buttonArrowColor: "#333333",
        buttonBackgroundColor: "#e6e6e6",
        buttonBorderColor: "#cccccc",
        buttonBorderWidth: 1,
        rifleColor: "none",
        trackBackgroundColor: "none",
        trackBorderColor: "#cccccc",
        trackBorderRadius: 5,
        trackBorderWidth: 1,
      };
    }
  );
  K(
    e,
    "Stock/Scrollbar/Scrollbar.js",
    [
      e["Core/Defaults.js"],
      e["Core/Globals.js"],
      e["Core/Axis/ScrollbarAxis.js"],
      e["Stock/Scrollbar/ScrollbarDefaults.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z, H, E) {
      const { defaultOptions: D } = e,
        {
          addEvent: p,
          correctFloat: x,
          defined: y,
          destroyObjectProperties: b,
          fireEvent: m,
          merge: q,
          pick: J,
          removeEvent: l,
        } = E;
      class v {
        static compose(d) {
          z.compose(d, v);
        }
        static swapXY(d, h) {
          h &&
            d.forEach((d) => {
              const h = d.length;
              let t;
              for (let n = 0; n < h; n += 2)
                (t = d[n + 1]),
                  "number" === typeof t &&
                    ((d[n + 1] = d[n + 2]), (d[n + 2] = t));
            });
          return d;
        }
        constructor(d, h, t) {
          this._events = [];
          this.chart = void 0;
          this.from = this.chartY = this.chartX = 0;
          this.scrollbar = this.renderer = this.options = this.group = void 0;
          this.scrollbarButtons = [];
          this.scrollbarGroup = void 0;
          this.scrollbarLeft = 0;
          this.scrollbarRifles = void 0;
          this.scrollbarStrokeWidth = 1;
          this.to = this.size = this.scrollbarTop = 0;
          this.track = void 0;
          this.trackBorderWidth = 1;
          this.userOptions = void 0;
          this.y = this.x = 0;
          this.init(d, h, t);
        }
        addEvents() {
          var d = this.options.inverted ? [1, 0] : [0, 1];
          const h = this.scrollbarButtons,
            t = this.scrollbarGroup.element,
            b = this.track.element,
            l = this.mouseDownHandler.bind(this),
            n = this.mouseMoveHandler.bind(this),
            a = this.mouseUpHandler.bind(this);
          d = [
            [h[d[0]].element, "click", this.buttonToMinClick.bind(this)],
            [h[d[1]].element, "click", this.buttonToMaxClick.bind(this)],
            [b, "click", this.trackClick.bind(this)],
            [t, "mousedown", l],
            [t.ownerDocument, "mousemove", n],
            [t.ownerDocument, "mouseup", a],
          ];
          B.hasTouch &&
            d.push(
              [t, "touchstart", l],
              [t.ownerDocument, "touchmove", n],
              [t.ownerDocument, "touchend", a]
            );
          d.forEach(function (a) {
            p.apply(null, a);
          });
          this._events = d;
        }
        buttonToMaxClick(d) {
          const h = (this.to - this.from) * J(this.options.step, 0.2);
          this.updatePosition(this.from + h, this.to + h);
          m(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: d,
          });
        }
        buttonToMinClick(d) {
          const h = x(this.to - this.from) * J(this.options.step, 0.2);
          this.updatePosition(x(this.from - h), x(this.to - h));
          m(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: d,
          });
        }
        cursorToScrollbarPosition(d) {
          var h = this.options;
          h = h.minWidth > this.calculatedWidth ? h.minWidth : 0;
          return {
            chartX: (d.chartX - this.x - this.xOffset) / (this.barWidth - h),
            chartY: (d.chartY - this.y - this.yOffset) / (this.barWidth - h),
          };
        }
        destroy() {
          const d = this,
            h = d.chart.scroller;
          d.removeEvents();
          [
            "track",
            "scrollbarRifles",
            "scrollbar",
            "scrollbarGroup",
            "group",
          ].forEach(function (h) {
            d[h] && d[h].destroy && (d[h] = d[h].destroy());
          });
          h &&
            d === h.scrollbar &&
            ((h.scrollbar = null), b(h.scrollbarButtons));
        }
        drawScrollbarButton(d) {
          const h = this.renderer,
            t = this.scrollbarButtons,
            b = this.options,
            l = this.size;
          var n = h.g().add(this.group);
          t.push(n);
          b.buttonsEnabled &&
            ((n = h.rect().addClass("highcharts-scrollbar-button").add(n)),
            this.chart.styledMode ||
              n.attr({
                stroke: b.buttonBorderColor,
                "stroke-width": b.buttonBorderWidth,
                fill: b.buttonBackgroundColor,
              }),
            n.attr(
              n.crisp(
                {
                  x: -0.5,
                  y: -0.5,
                  width: l + 1,
                  height: l + 1,
                  r: b.buttonBorderRadius,
                },
                n.strokeWidth()
              )
            ),
            (d = h
              .path(
                v.swapXY(
                  [
                    ["M", l / 2 + (d ? -1 : 1), l / 2 - 3],
                    ["L", l / 2 + (d ? -1 : 1), l / 2 + 3],
                    ["L", l / 2 + (d ? 2 : -2), l / 2],
                  ],
                  b.vertical
                )
              )
              .addClass("highcharts-scrollbar-arrow")
              .add(t[d])),
            this.chart.styledMode || d.attr({ fill: b.buttonArrowColor }));
        }
        init(d, h, b) {
          this.scrollbarButtons = [];
          this.renderer = d;
          this.userOptions = h;
          this.options = q(H, D.scrollbar, h);
          this.options.margin = J(this.options.margin, 10);
          this.chart = b;
          this.size = J(this.options.size, this.options.height);
          h.enabled && (this.render(), this.addEvents());
        }
        mouseDownHandler(d) {
          d = this.chart.pointer.normalize(d);
          d = this.cursorToScrollbarPosition(d);
          this.chartX = d.chartX;
          this.chartY = d.chartY;
          this.initPositions = [this.from, this.to];
          this.grabbedCenter = !0;
        }
        mouseMoveHandler(d) {
          var h = this.chart.pointer.normalize(d),
            b = this.options.vertical ? "chartY" : "chartX";
          const l = this.initPositions || [];
          !this.grabbedCenter ||
            (d.touches && 0 === d.touches[0][b]) ||
            ((h = this.cursorToScrollbarPosition(h)[b]),
            (b = this[b]),
            (b = h - b),
            (this.hasDragged = !0),
            this.updatePosition(l[0] + b, l[1] + b),
            this.hasDragged &&
              m(this, "changed", {
                from: this.from,
                to: this.to,
                trigger: "scrollbar",
                DOMType: d.type,
                DOMEvent: d,
              }));
        }
        mouseUpHandler(d) {
          this.hasDragged &&
            m(this, "changed", {
              from: this.from,
              to: this.to,
              trigger: "scrollbar",
              DOMType: d.type,
              DOMEvent: d,
            });
          this.grabbedCenter =
            this.hasDragged =
            this.chartX =
            this.chartY =
              null;
        }
        position(d, h, b, l) {
          const {
              buttonsEnabled: t,
              margin: n = 0,
              vertical: a,
            } = this.options,
            u = this.rendered ? "animate" : "attr";
          let A = l,
            g = 0;
          this.group.show();
          this.x = d;
          this.y = h + this.trackBorderWidth;
          this.width = b;
          this.height = l;
          this.xOffset = A;
          this.yOffset = g;
          a
            ? ((this.width = this.yOffset = b = this.size),
              (this.xOffset = A = 0),
              (this.yOffset = g = t ? this.size : 0),
              (this.barWidth = l - (t ? 2 * b : 0)),
              (this.x = d += n))
            : ((this.height = l = this.size),
              (this.xOffset = A = t ? this.size : 0),
              (this.barWidth = b - (t ? 2 * l : 0)),
              (this.y += n));
          this.group[u]({ translateX: d, translateY: this.y });
          this.track[u]({ width: b, height: l });
          this.scrollbarButtons[1][u]({
            translateX: a ? 0 : b - A,
            translateY: a ? l - g : 0,
          });
        }
        removeEvents() {
          this._events.forEach(function (d) {
            l.apply(null, d);
          });
          this._events.length = 0;
        }
        render() {
          const d = this.renderer,
            h = this.options,
            b = this.size,
            l = this.chart.styledMode,
            m = d.g("scrollbar").attr({ zIndex: h.zIndex }).hide().add();
          this.group = m;
          this.track = d
            .rect()
            .addClass("highcharts-scrollbar-track")
            .attr({ r: h.trackBorderRadius || 0, height: b, width: b })
            .add(m);
          l ||
            this.track.attr({
              fill: h.trackBackgroundColor,
              stroke: h.trackBorderColor,
              "stroke-width": h.trackBorderWidth,
            });
          const n = (this.trackBorderWidth = this.track.strokeWidth());
          this.track.attr({ x: (-n % 2) / 2, y: (-n % 2) / 2 });
          this.scrollbarGroup = d.g().add(m);
          this.scrollbar = d
            .rect()
            .addClass("highcharts-scrollbar-thumb")
            .attr({ height: b - n, width: b - n, r: h.barBorderRadius || 0 })
            .add(this.scrollbarGroup);
          this.scrollbarRifles = d
            .path(
              v.swapXY(
                [
                  ["M", -3, b / 4],
                  ["L", -3, (2 * b) / 3],
                  ["M", 0, b / 4],
                  ["L", 0, (2 * b) / 3],
                  ["M", 3, b / 4],
                  ["L", 3, (2 * b) / 3],
                ],
                h.vertical
              )
            )
            .addClass("highcharts-scrollbar-rifles")
            .add(this.scrollbarGroup);
          l ||
            (this.scrollbar.attr({
              fill: h.barBackgroundColor,
              stroke: h.barBorderColor,
              "stroke-width": h.barBorderWidth,
            }),
            this.scrollbarRifles.attr({
              stroke: h.rifleColor,
              "stroke-width": 1,
            }));
          this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
          this.scrollbarGroup.translate(
            (-this.scrollbarStrokeWidth % 2) / 2,
            (-this.scrollbarStrokeWidth % 2) / 2
          );
          this.drawScrollbarButton(0);
          this.drawScrollbarButton(1);
        }
        setRange(d, h) {
          const b = this.options,
            l = b.vertical;
          var m = b.minWidth,
            n = this.barWidth;
          const a =
            !this.rendered ||
            this.hasDragged ||
            (this.chart.navigator && this.chart.navigator.hasDragged)
              ? "attr"
              : "animate";
          if (y(n)) {
            var u = n * Math.min(h, 1);
            d = Math.max(d, 0);
            var A = Math.ceil(n * d);
            this.calculatedWidth = u = x(u - A);
            u < m && ((A = (n - m + u) * d), (u = m));
            m = Math.floor(A + this.xOffset + this.yOffset);
            n = u / 2 - 0.5;
            this.from = d;
            this.to = h;
            l
              ? (this.scrollbarGroup[a]({ translateY: m }),
                this.scrollbar[a]({ height: u }),
                this.scrollbarRifles[a]({ translateY: n }),
                (this.scrollbarTop = m),
                (this.scrollbarLeft = 0))
              : (this.scrollbarGroup[a]({ translateX: m }),
                this.scrollbar[a]({ width: u }),
                this.scrollbarRifles[a]({ translateX: n }),
                (this.scrollbarLeft = m),
                (this.scrollbarTop = 0));
            12 >= u ? this.scrollbarRifles.hide() : this.scrollbarRifles.show();
            !1 === b.showFull &&
              (0 >= d && 1 <= h ? this.group.hide() : this.group.show());
            this.rendered = !0;
          }
        }
        shouldUpdateExtremes(d) {
          return (
            J(
              this.options.liveRedraw,
              B.svg && !B.isTouchDevice && !this.chart.boosted
            ) ||
            "mouseup" === d ||
            "touchend" === d ||
            !y(d)
          );
        }
        trackClick(d) {
          const h = this.chart.pointer.normalize(d),
            b = this.to - this.from,
            l = this.y + this.scrollbarTop,
            v = this.x + this.scrollbarLeft;
          (this.options.vertical && h.chartY > l) ||
          (!this.options.vertical && h.chartX > v)
            ? this.updatePosition(this.from + b, this.to + b)
            : this.updatePosition(this.from - b, this.to - b);
          m(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: d,
          });
        }
        update(d) {
          this.destroy();
          this.init(this.chart.renderer, q(!0, this.options, d), this.chart);
        }
        updatePosition(d, b) {
          1 < b && ((d = x(1 - x(b - d))), (b = 1));
          0 > d && ((b = x(b - d)), (d = 0));
          this.from = d;
          this.to = b;
        }
      }
      v.defaultOptions = H;
      D.scrollbar = q(!0, v.defaultOptions, D.scrollbar);
      return v;
    }
  );
  K(
    e,
    "Stock/Navigator/Navigator.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Defaults.js"],
      e["Core/Globals.js"],
      e["Core/Axis/NavigatorAxisComposition.js"],
      e["Stock/Navigator/NavigatorComposition.js"],
      e["Stock/Scrollbar/Scrollbar.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z, H, E, D, p) {
      function x(c, ...f) {
        f = [].filter.call(f, n);
        if (f.length) return Math[c].apply(0, f);
      }
      const { defaultOptions: y } = B,
        { hasTouch: b, isTouchDevice: m } = z,
        {
          addEvent: q,
          clamp: J,
          correctFloat: l,
          defined: v,
          destroyObjectProperties: d,
          erase: h,
          extend: t,
          find: M,
          isArray: G,
          isNumber: n,
          merge: a,
          pick: u,
          removeEvent: A,
          splat: g,
        } = p;
      class k {
        static compose(c, f, w) {
          E.compose(c, f, k, w);
        }
        constructor(c) {
          this.rendered =
            this.range =
            this.outline =
            this.opposite =
            this.navigatorSize =
            this.navigatorSeries =
            this.navigatorOptions =
            this.navigatorGroup =
            this.navigatorEnabled =
            this.left =
            this.height =
            this.handles =
            this.chart =
            this.baseSeries =
              void 0;
          this.scrollbarHeight = 0;
          this.zoomedMin =
            this.zoomedMax =
            this.yAxis =
            this.xAxis =
            this.top =
            this.size =
            this.shades =
            this.scrollButtonSize =
              void 0;
          this.init(c);
        }
        drawHandle(c, f, w, k) {
          const g = this.navigatorOptions.handles.height;
          this.handles[f][k](
            w
              ? {
                  translateX: Math.round(this.left + this.height / 2),
                  translateY: Math.round(this.top + parseInt(c, 10) + 0.5 - g),
                }
              : {
                  translateX: Math.round(this.left + parseInt(c, 10)),
                  translateY: Math.round(
                    this.top + this.height / 2 - g / 2 - 1
                  ),
                }
          );
        }
        drawOutline(c, f, w, k) {
          const g = this.navigatorOptions.maskInside;
          var C = this.outline.strokeWidth();
          const a = C / 2;
          var d = (C % 2) / 2;
          const r = this.scrollButtonSize,
            n = this.size,
            b = this.top;
          C = this.height;
          const A = b - a,
            h = b + C;
          let u = this.left;
          w
            ? ((w = b + f + d),
              (f = b + c + d),
              (d = [
                ["M", u + C, b - r - d],
                ["L", u + C, w],
                ["L", u, w],
                ["M", u, f],
                ["L", u + C, f],
                ["L", u + C, b + n + r],
              ]),
              g && d.push(["M", u + C, w - a], ["L", u + C, f + a]))
            : ((u -= r),
              (c += u + r - d),
              (f += u + r - d),
              (d = [
                ["M", u, A],
                ["L", c, A],
                ["L", c, h],
                ["M", f, h],
                ["L", f, A],
                ["L", u + n + 2 * r, b + a],
              ]),
              g && d.push(["M", c - a, A], ["L", f + a, A]));
          this.outline[k]({ d });
        }
        drawMasks(c, f, w, k) {
          const g = this.left,
            C = this.top,
            a = this.height;
          let d, r, b, n;
          w
            ? ((b = [g, g, g]),
              (n = [C, C + c, C + f]),
              (r = [a, a, a]),
              (d = [c, f - c, this.size - f]))
            : ((b = [g, g + c, g + f]),
              (n = [C, C, C]),
              (r = [c, f - c, this.size - f]),
              (d = [a, a, a]));
          this.shades.forEach((c, f) => {
            c[k]({ x: b[f], y: n[f], width: r[f], height: d[f] });
          });
        }
        renderElements() {
          const c = this,
            f = c.navigatorOptions,
            w = f.maskInside,
            g = c.chart,
            k = g.renderer,
            a = { cursor: g.inverted ? "ns-resize" : "ew-resize" },
            d = (c.navigatorGroup = k
              .g("navigator")
              .attr({ zIndex: 8, visibility: "hidden" })
              .add());
          [!w, w, !w].forEach((w, C) => {
            const r = k
              .rect()
              .addClass(
                "highcharts-navigator-mask" + (1 === C ? "-inside" : "-outside")
              )
              .add(d);
            g.styledMode ||
              (r.attr({ fill: w ? f.maskFill : "rgba(0,0,0,0)" }),
              1 === C && r.css(a));
            c.shades[C] = r;
          });
          c.outline = k.path().addClass("highcharts-navigator-outline").add(d);
          g.styledMode ||
            c.outline.attr({
              "stroke-width": f.outlineWidth,
              stroke: f.outlineColor,
            });
          if (f.handles && f.handles.enabled) {
            const w = f.handles,
              { height: C, width: b } = w;
            [0, 1].forEach((f) => {
              c.handles[f] = k.symbol(w.symbols[f], -b / 2 - 1, 0, b, C, w);
              g.inverted &&
                c.handles[f].attr({
                  rotation: 90,
                  rotationOriginX: Math.floor(-b / 2),
                  rotationOriginY: (C + b) / 2,
                });
              c.handles[f]
                .attr({ zIndex: 7 - f })
                .addClass(
                  "highcharts-navigator-handle highcharts-navigator-handle-" +
                    ["left", "right"][f]
                )
                .add(d);
              g.styledMode ||
                c.handles[f]
                  .attr({
                    fill: w.backgroundColor,
                    stroke: w.borderColor,
                    "stroke-width": w.lineWidth,
                  })
                  .css(a);
            });
          }
        }
        update(c) {
          (this.series || []).forEach((c) => {
            c.baseSeries && delete c.baseSeries.navigatorSeries;
          });
          this.destroy();
          a(!0, this.chart.options.navigator, c);
          this.init(this.chart);
        }
        render(c, f, w, g) {
          var k = this.chart;
          const C = this.xAxis,
            a = C.pointRange || 0;
          var d = C.navigatorAxis.fake ? k.xAxis[0] : C;
          const r = this.navigatorEnabled;
          var b = this.rendered,
            A = k.inverted;
          const h = k.xAxis[0].minRange,
            m = k.xAxis[0].options.maxRange,
            e = this.scrollButtonSize;
          let q = this.scrollbarHeight,
            t;
          if (!this.hasDragged || v(w)) {
            c = l(c - a / 2);
            f = l(f + a / 2);
            if (!n(c) || !n(f))
              if (b) (w = 0), (g = u(C.width, d.width));
              else return;
            this.left = u(C.left, k.plotLeft + e + (A ? k.plotWidth : 0));
            var p =
              (this.size =
              t =
                u(C.len, (A ? k.plotHeight : k.plotWidth) - 2 * e));
            k = A ? q : t + 2 * e;
            w = u(w, C.toPixels(c, !0));
            g = u(g, C.toPixels(f, !0));
            (n(w) && Infinity !== Math.abs(w)) || ((w = 0), (g = k));
            c = C.toValue(w, !0);
            f = C.toValue(g, !0);
            var y = Math.abs(l(f - c));
            y < h
              ? this.grabbedLeft
                ? (w = C.toPixels(f - h - a, !0))
                : this.grabbedRight && (g = C.toPixels(c + h + a, !0))
              : v(m) &&
                l(y - a) > m &&
                (this.grabbedLeft
                  ? (w = C.toPixels(f - m - a, !0))
                  : this.grabbedRight && (g = C.toPixels(c + m + a, !0)));
            this.zoomedMax = J(Math.max(w, g), 0, p);
            this.zoomedMin = J(
              this.fixedWidth
                ? this.zoomedMax - this.fixedWidth
                : Math.min(w, g),
              0,
              p
            );
            this.range = this.zoomedMax - this.zoomedMin;
            p = Math.round(this.zoomedMax);
            w = Math.round(this.zoomedMin);
            r &&
              (this.navigatorGroup.attr({ visibility: "inherit" }),
              (b = b && !this.hasDragged ? "animate" : "attr"),
              this.drawMasks(w, p, A, b),
              this.drawOutline(w, p, A, b),
              this.navigatorOptions.handles.enabled &&
                (this.drawHandle(w, 0, A, b), this.drawHandle(p, 1, A, b)));
            this.scrollbar &&
              (A
                ? ((A = this.top - e),
                  (d =
                    this.left -
                    q +
                    (r || !d.opposite
                      ? 0
                      : (d.titleOffset || 0) + d.axisTitleMargin)),
                  (q = t + 2 * e))
                : ((A = this.top + (r ? this.height : -q)),
                  (d = this.left - e)),
              this.scrollbar.position(d, A, k, q),
              this.scrollbar.setRange(
                this.zoomedMin / (t || 1),
                this.zoomedMax / (t || 1)
              ));
            this.rendered = !0;
          }
        }
        addMouseEvents() {
          const c = this,
            f = c.chart,
            w = f.container;
          let g = [],
            k,
            a;
          c.mouseMoveHandler = k = function (f) {
            c.onMouseMove(f);
          };
          c.mouseUpHandler = a = function (f) {
            c.onMouseUp(f);
          };
          g = c.getPartsEvents("mousedown");
          g.push(
            q(f.renderTo, "mousemove", k),
            q(w.ownerDocument, "mouseup", a)
          );
          b &&
            (g.push(
              q(f.renderTo, "touchmove", k),
              q(w.ownerDocument, "touchend", a)
            ),
            g.concat(c.getPartsEvents("touchstart")));
          c.eventsToUnbind = g;
          c.series &&
            c.series[0] &&
            g.push(
              q(c.series[0].xAxis, "foundExtremes", function () {
                f.navigator.modifyNavigatorAxisExtremes();
              })
            );
        }
        getPartsEvents(c) {
          const f = this,
            w = [];
          ["shades", "handles"].forEach(function (g) {
            f[g].forEach(function (k, C) {
              w.push(
                q(k.element, c, function (c) {
                  f[g + "Mousedown"](c, C);
                })
              );
            });
          });
          return w;
        }
        shadesMousedown(c, f) {
          c = this.chart.pointer.normalize(c);
          const w = this.chart,
            g = this.xAxis,
            k = this.zoomedMin,
            a = this.size,
            d = this.range;
          let b = this.left,
            r = c.chartX,
            A,
            n;
          w.inverted && ((r = c.chartY), (b = this.top));
          1 === f
            ? ((this.grabbedCenter = r),
              (this.fixedWidth = d),
              (this.dragOffset = r - k))
            : ((c = r - b - d / 2),
              0 === f
                ? (c = Math.max(0, c))
                : 2 === f &&
                  c + d >= a &&
                  ((c = a - d),
                  this.reversedExtremes
                    ? ((c -= d), (n = this.getUnionExtremes().dataMin))
                    : (A = this.getUnionExtremes().dataMax)),
              c !== k &&
                ((this.fixedWidth = d),
                (f = g.navigatorAxis.toFixedRange(c, c + d, n, A)),
                v(f.min) &&
                  w.xAxis[0].setExtremes(
                    Math.min(f.min, f.max),
                    Math.max(f.min, f.max),
                    !0,
                    null,
                    { trigger: "navigator" }
                  )));
        }
        handlesMousedown(c, f) {
          this.chart.pointer.normalize(c);
          c = this.chart;
          const w = c.xAxis[0],
            g = this.reversedExtremes;
          0 === f
            ? ((this.grabbedLeft = !0),
              (this.otherHandlePos = this.zoomedMax),
              (this.fixedExtreme = g ? w.min : w.max))
            : ((this.grabbedRight = !0),
              (this.otherHandlePos = this.zoomedMin),
              (this.fixedExtreme = g ? w.max : w.min));
          c.fixedRange = null;
        }
        onMouseMove(c) {
          const f = this;
          var w = f.chart;
          const g = f.navigatorSize,
            k = f.range,
            a = f.dragOffset,
            d = w.inverted;
          let b = f.left;
          (c.touches && 0 === c.touches[0].pageX) ||
            ((c = w.pointer.normalize(c)),
            (w = c.chartX),
            d && ((b = f.top), (w = c.chartY)),
            f.grabbedLeft
              ? ((f.hasDragged = !0), f.render(0, 0, w - b, f.otherHandlePos))
              : f.grabbedRight
              ? ((f.hasDragged = !0), f.render(0, 0, f.otherHandlePos, w - b))
              : f.grabbedCenter &&
                ((f.hasDragged = !0),
                w < a ? (w = a) : w > g + a - k && (w = g + a - k),
                f.render(0, 0, w - a, w - a + k)),
            f.hasDragged &&
              f.scrollbar &&
              u(f.scrollbar.options.liveRedraw, !m && !this.chart.boosted) &&
              ((c.DOMType = c.type),
              setTimeout(function () {
                f.onMouseUp(c);
              }, 0)));
        }
        onMouseUp(c) {
          var f = this.chart,
            w = this.xAxis,
            g = this.scrollbar;
          const k = c.DOMEvent || c,
            a = f.inverted,
            d = this.rendered && !this.hasDragged ? "animate" : "attr";
          let b, r;
          ((!this.hasDragged || (g && g.hasDragged)) &&
            "scrollbar" !== c.trigger) ||
            ((g = this.getUnionExtremes()),
            this.zoomedMin === this.otherHandlePos
              ? (b = this.fixedExtreme)
              : this.zoomedMax === this.otherHandlePos &&
                (r = this.fixedExtreme),
            this.zoomedMax === this.size &&
              (r = this.reversedExtremes ? g.dataMin : g.dataMax),
            0 === this.zoomedMin &&
              (b = this.reversedExtremes ? g.dataMax : g.dataMin),
            (w = w.navigatorAxis.toFixedRange(
              this.zoomedMin,
              this.zoomedMax,
              b,
              r
            )),
            v(w.min) &&
              f.xAxis[0].setExtremes(
                Math.min(w.min, w.max),
                Math.max(w.min, w.max),
                !0,
                this.hasDragged ? !1 : null,
                {
                  trigger: "navigator",
                  triggerOp: "navigator-drag",
                  DOMEvent: k,
                }
              ));
          "mousemove" !== c.DOMType &&
            "touchmove" !== c.DOMType &&
            (this.grabbedLeft =
              this.grabbedRight =
              this.grabbedCenter =
              this.fixedWidth =
              this.fixedExtreme =
              this.otherHandlePos =
              this.hasDragged =
              this.dragOffset =
                null);
          this.navigatorEnabled &&
            n(this.zoomedMin) &&
            n(this.zoomedMax) &&
            ((f = Math.round(this.zoomedMin)),
            (c = Math.round(this.zoomedMax)),
            this.shades && this.drawMasks(f, c, a, d),
            this.outline && this.drawOutline(f, c, a, d),
            this.navigatorOptions.handles.enabled &&
              Object.keys(this.handles).length === this.handles.length &&
              (this.drawHandle(f, 0, a, d), this.drawHandle(c, 1, a, d)));
        }
        removeEvents() {
          this.eventsToUnbind &&
            (this.eventsToUnbind.forEach(function (c) {
              c();
            }),
            (this.eventsToUnbind = void 0));
          this.removeBaseSeriesEvents();
        }
        removeBaseSeriesEvents() {
          const c = this.baseSeries || [];
          this.navigatorEnabled &&
            c[0] &&
            (!1 !== this.navigatorOptions.adaptToUpdatedData &&
              c.forEach(function (c) {
                A(c, "updatedData", this.updatedDataHandler);
              }, this),
            c[0].xAxis &&
              A(c[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
        }
        init(c) {
          var f = c.options,
            g = f.navigator || {},
            k = g.enabled,
            d = f.scrollbar || {},
            b = d.enabled;
          f = (k && g.height) || 0;
          var A = (b && d.height) || 0;
          const h = (d.buttonsEnabled && A) || 0;
          this.handles = [];
          this.shades = [];
          this.chart = c;
          this.setBaseSeries();
          this.height = f;
          this.scrollbarHeight = A;
          this.scrollButtonSize = h;
          this.scrollbarEnabled = b;
          this.navigatorEnabled = k;
          this.navigatorOptions = g;
          this.scrollbarOptions = d;
          this.opposite = u(g.opposite, !(k || !c.inverted));
          const r = this;
          k = r.baseSeries;
          d = c.xAxis.length;
          b = c.yAxis.length;
          A = (k && k[0] && k[0].xAxis) || c.xAxis[0] || { options: {} };
          c.isDirtyBox = !0;
          r.navigatorEnabled
            ? ((r.xAxis = new e(
                c,
                a(
                  { breaks: A.options.breaks, ordinal: A.options.ordinal },
                  g.xAxis,
                  {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: d,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1,
                  },
                  c.inverted
                    ? { offsets: [h, 0, -h, 0], width: f }
                    : { offsets: [0, -h, 0, h], height: f }
                )
              )),
              (r.yAxis = new e(
                c,
                a(
                  g.yAxis,
                  {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: b,
                    isInternal: !0,
                    reversed: u(
                      g.yAxis && g.yAxis.reversed,
                      c.yAxis[0] && c.yAxis[0].reversed,
                      !1
                    ),
                    zoomEnabled: !1,
                  },
                  c.inverted ? { width: f } : { height: f }
                )
              )),
              k || g.series.data
                ? r.updateNavigatorSeries(!1)
                : 0 === c.series.length &&
                  (r.unbindRedraw = q(c, "beforeRedraw", function () {
                    0 < c.series.length &&
                      !r.series &&
                      (r.setBaseSeries(), r.unbindRedraw());
                  })),
              (r.reversedExtremes =
                (c.inverted && !r.xAxis.reversed) ||
                (!c.inverted && r.xAxis.reversed)),
              r.renderElements(),
              r.addMouseEvents())
            : ((r.xAxis = {
                chart: c,
                navigatorAxis: { fake: !0 },
                translate: function (f, g) {
                  var k = c.xAxis[0];
                  const w = k.getExtremes(),
                    a = k.len - 2 * h,
                    r = x("min", k.options.min, w.dataMin);
                  k = x("max", k.options.max, w.dataMax) - r;
                  return g ? (f * k) / a + r : (a * (f - r)) / k;
                },
                toPixels: function (c) {
                  return this.translate(c);
                },
                toValue: function (c) {
                  return this.translate(c, !0);
                },
              }),
              (r.xAxis.navigatorAxis.axis = r.xAxis),
              (r.xAxis.navigatorAxis.toFixedRange =
                H.prototype.toFixedRange.bind(r.xAxis.navigatorAxis)));
          c.options.scrollbar.enabled &&
            ((g = a(c.options.scrollbar, { vertical: c.inverted })),
            !n(g.margin) &&
              r.navigatorEnabled &&
              (g.margin = c.inverted ? -3 : 3),
            (c.scrollbar = r.scrollbar = new D(c.renderer, g, c)),
            q(r.scrollbar, "changed", function (c) {
              var f = r.size;
              const g = f * this.to;
              f *= this.from;
              r.hasDragged = r.scrollbar.hasDragged;
              r.render(0, 0, f, g);
              this.shouldUpdateExtremes(c.DOMType) &&
                setTimeout(function () {
                  r.onMouseUp(c);
                });
            }));
          r.addBaseSeriesEvents();
          r.addChartEvents();
        }
        getUnionExtremes(c) {
          const f = this.chart.xAxis[0],
            g = this.xAxis,
            k = g.options,
            a = f.options;
          let d;
          (c && null === f.dataMin) ||
            (d = {
              dataMin: u(
                k && k.min,
                x("min", a.min, f.dataMin, g.dataMin, g.min)
              ),
              dataMax: u(
                k && k.max,
                x("max", a.max, f.dataMax, g.dataMax, g.max)
              ),
            });
          return d;
        }
        setBaseSeries(c, f) {
          const g = this.chart,
            k = (this.baseSeries = []);
          c =
            c ||
            (g.options && g.options.navigator.baseSeries) ||
            (g.series.length
              ? M(g.series, (c) => !c.options.isInternal).index
              : 0);
          (g.series || []).forEach((f, g) => {
            f.options.isInternal ||
              (!f.options.showInNavigator &&
                ((g !== c && f.options.id !== c) ||
                  !1 === f.options.showInNavigator)) ||
              k.push(f);
          });
          this.xAxis &&
            !this.xAxis.navigatorAxis.fake &&
            this.updateNavigatorSeries(!0, f);
        }
        updateNavigatorSeries(c, f) {
          const k = this,
            d = k.chart,
            b = k.baseSeries,
            n = {
              enableMouseTracking: !1,
              index: null,
              linkedTo: null,
              group: "nav",
              padXAxis: !1,
              xAxis: "navigator-x-axis",
              yAxis: "navigator-y-axis",
              showInLegend: !1,
              stacking: void 0,
              isInternal: !0,
              states: { inactive: { opacity: 1 } },
            },
            h = (k.series = (k.series || []).filter((c) => {
              const f = c.baseSeries;
              return 0 > b.indexOf(f)
                ? (f &&
                    (A(f, "updatedData", k.updatedDataHandler),
                    delete f.navigatorSeries),
                  c.chart && c.destroy(),
                  !1)
                : !0;
            }));
          let l,
            r,
            I = k.navigatorOptions.series,
            L;
          b &&
            b.length &&
            b.forEach((c) => {
              const w = c.navigatorSeries;
              var C = t(
                { color: c.color, visible: c.visible },
                G(I) ? y.navigator.series : I
              );
              (w && !1 === k.navigatorOptions.adaptToUpdatedData) ||
                ((n.name = "Navigator " + b.length),
                (l = c.options || {}),
                (L = l.navigatorOptions || {}),
                (C.dataLabels = g(C.dataLabels)),
                (r = a(l, n, C, L)),
                (r.pointRange = u(
                  C.pointRange,
                  L.pointRange,
                  y.plotOptions[r.type || "line"].pointRange
                )),
                (C = L.data || C.data),
                (k.hasNavigatorData = k.hasNavigatorData || !!C),
                (r.data = C || (l.data && l.data.slice(0))),
                w && w.options
                  ? w.update(r, f)
                  : ((c.navigatorSeries = d.initSeries(r)),
                    (c.navigatorSeries.baseSeries = c),
                    h.push(c.navigatorSeries)));
            });
          if ((I.data && (!b || !b.length)) || G(I))
            (k.hasNavigatorData = !1),
              (I = g(I)),
              I.forEach((c, f) => {
                n.name = "Navigator " + (h.length + 1);
                r = a(
                  y.navigator.series,
                  {
                    color:
                      (d.series[f] &&
                        !d.series[f].options.isInternal &&
                        d.series[f].color) ||
                      d.options.colors[f] ||
                      d.options.colors[0],
                  },
                  n,
                  c
                );
                r.data = c.data;
                r.data && ((k.hasNavigatorData = !0), h.push(d.initSeries(r)));
              });
          c && this.addBaseSeriesEvents();
        }
        addBaseSeriesEvents() {
          const c = this,
            f = c.baseSeries || [];
          f[0] &&
            f[0].xAxis &&
            f[0].eventsToUnbind.push(
              q(f[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)
            );
          f.forEach((f) => {
            f.eventsToUnbind.push(
              q(f, "show", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
              })
            );
            f.eventsToUnbind.push(
              q(f, "hide", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
              })
            );
            !1 !== this.navigatorOptions.adaptToUpdatedData &&
              f.xAxis &&
              f.eventsToUnbind.push(
                q(f, "updatedData", this.updatedDataHandler)
              );
            f.eventsToUnbind.push(
              q(f, "remove", function () {
                this.navigatorSeries &&
                  (h(c.series, this.navigatorSeries),
                  v(this.navigatorSeries.options) &&
                    this.navigatorSeries.remove(!1),
                  delete this.navigatorSeries);
              })
            );
          });
        }
        getBaseSeriesMin(c) {
          return this.baseSeries.reduce(function (c, g) {
            return Math.min(c, g.xData && g.xData.length ? g.xData[0] : c);
          }, c);
        }
        modifyNavigatorAxisExtremes() {
          const c = this.xAxis;
          if ("undefined" !== typeof c.getExtremes) {
            const f = this.getUnionExtremes(!0);
            !f ||
              (f.dataMin === c.min && f.dataMax === c.max) ||
              ((c.min = f.dataMin), (c.max = f.dataMax));
          }
        }
        modifyBaseAxisExtremes() {
          const c = this.chart.navigator;
          var f = this.getExtremes();
          const g = f.dataMin,
            k = f.dataMax;
          f = f.max - f.min;
          const a = c.stickToMin,
            d = c.stickToMax,
            b = u(this.options.overscroll, 0),
            A = c.series && c.series[0],
            r = !!this.setExtremes;
          let h, l;
          (this.eventArgs &&
            "rangeSelectorButton" === this.eventArgs.trigger) ||
            (a && ((l = g), (h = l + f)),
            d &&
              ((h = k + b),
              a ||
                (l = Math.max(
                  g,
                  h - f,
                  c.getBaseSeriesMin(
                    A && A.xData ? A.xData[0] : -Number.MAX_VALUE
                  )
                ))),
            r &&
              (a || d) &&
              n(l) &&
              ((this.min = this.userMin = l), (this.max = this.userMax = h)));
          c.stickToMin = c.stickToMax = null;
        }
        updatedDataHandler() {
          const c = this.chart.navigator,
            f = this.navigatorSeries;
          c.stickToMax = u(
            this.chart.options.navigator &&
              this.chart.options.navigator.stickToMax,
            c.reversedExtremes
              ? 0 === Math.round(c.zoomedMin)
              : Math.round(c.zoomedMax) >= Math.round(c.size)
          );
          c.stickToMin = c.shouldStickToMin(this, c);
          f &&
            !c.hasNavigatorData &&
            ((f.options.pointStart = this.xData[0]),
            f.setData(this.options.data, !1, null, !1));
        }
        shouldStickToMin(c, f) {
          f = f.getBaseSeriesMin(c.xData[0]);
          var g = c.xAxis;
          c = g.max;
          const k = g.min;
          g = g.options.range;
          return n(c) && n(k) ? (g && 0 < c - f ? c - f < g : k <= f) : !1;
        }
        addChartEvents() {
          this.eventsToUnbind || (this.eventsToUnbind = []);
          this.eventsToUnbind.push(
            q(this.chart, "redraw", function () {
              const c = this.navigator,
                f =
                  c &&
                  ((c.baseSeries && c.baseSeries[0] && c.baseSeries[0].xAxis) ||
                    this.xAxis[0]);
              f && c.render(f.min, f.max);
            }),
            q(this.chart, "getMargins", function () {
              let c = this.navigator,
                f = c.opposite ? "plotTop" : "marginBottom";
              this.inverted && (f = c.opposite ? "marginRight" : "plotLeft");
              this[f] =
                (this[f] || 0) +
                (c.navigatorEnabled || !this.inverted
                  ? c.height + c.scrollbarHeight
                  : 0) +
                c.navigatorOptions.margin;
            })
          );
        }
        destroy() {
          this.removeEvents();
          this.xAxis &&
            (h(this.chart.xAxis, this.xAxis), h(this.chart.axes, this.xAxis));
          this.yAxis &&
            (h(this.chart.yAxis, this.yAxis), h(this.chart.axes, this.yAxis));
          (this.series || []).forEach((c) => {
            c.destroy && c.destroy();
          });
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
            .split(" ")
            .forEach((c) => {
              this[c] && this[c].destroy && this[c].destroy();
              this[c] = null;
            });
          [this.handles].forEach((c) => {
            d(c);
          });
        }
      }
      return k;
    }
  );
  K(e, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function () {
    return {
      lang: {
        rangeSelectorZoom: "Zoom",
        rangeSelectorFrom: "",
        rangeSelectorTo: "\u2192",
      },
      rangeSelector: {
        allButtonsEnabled: !1,
        buttons: void 0,
        buttonSpacing: 5,
        dropdown: "responsive",
        enabled: void 0,
        verticalAlign: "top",
        buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
        floating: !1,
        x: 0,
        y: 0,
        height: void 0,
        inputBoxBorderColor: "none",
        inputBoxHeight: 17,
        inputBoxWidth: void 0,
        inputDateFormat: "%e %b %Y",
        inputDateParser: void 0,
        inputEditDateFormat: "%Y-%m-%d",
        inputEnabled: !0,
        inputPosition: { align: "right", x: 0, y: 0 },
        inputSpacing: 5,
        selected: void 0,
        buttonPosition: { align: "left", x: 0, y: 0 },
        inputStyle: { color: "#334eff", cursor: "pointer", fontSize: "0.8em" },
        labelStyle: { color: "#666666", fontSize: "0.8em" },
      },
    };
  });
  K(
    e,
    "Stock/RangeSelector/RangeSelectorComposition.js",
    [
      e["Core/Defaults.js"],
      e["Stock/RangeSelector/RangeSelectorDefaults.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z) {
      function F() {
        const a = this.range,
          g = a.type,
          k = this.max,
          c = this.chart.time,
          f = function (f, k) {
            const a = "year" === g ? "FullYear" : "Month",
              d = new c.Date(f),
              w = c.get(a, d);
            c.set(a, d, w + k);
            w === c.get(a, d) && c.set("Date", d, 0);
            return d.getTime() - f;
          };
        let d, b;
        t(a)
          ? ((d = k - a), (b = a))
          : a &&
            ((d = k + f(k, -(a.count || 1))),
            this.chart && (this.chart.fixedRange = k - d));
        const n = G(this.dataMin, Number.MIN_VALUE);
        t(d) || (d = n);
        d <= n &&
          ((d = n),
          "undefined" === typeof b && (b = f(d, a.count)),
          (this.newMax = Math.min(d + b, G(this.dataMax, Number.MAX_VALUE))));
        t(k) ? !t(a) && a && a._offsetMin && (d += a._offsetMin) : (d = void 0);
        return d;
      }
      function E() {
        this.options.rangeSelector &&
          this.options.rangeSelector.enabled &&
          (this.rangeSelector = new u(this));
      }
      function D() {
        var a = this.axes;
        const g = this.rangeSelector;
        g &&
          (t(g.deferredYTDClick) &&
            (g.clickButton(g.deferredYTDClick), delete g.deferredYTDClick),
          a.forEach((g) => {
            g.updateNames();
            g.setScale();
          }),
          this.getAxisMargins(),
          g.render(),
          (a = g.options.verticalAlign),
          g.options.floating ||
            ("bottom" === a
              ? (this.extraBottomMargin = !0)
              : "middle" !== a && (this.extraTopMargin = !0)));
      }
      function p(a) {
        let g, k, c, f;
        const d = a.rangeSelector,
          b = () => {
            d &&
              ((g = a.xAxis[0].getExtremes()),
              (k = a.legend),
              (f = d && d.options.verticalAlign),
              t(g.min) && d.render(g.min, g.max),
              k.display &&
                "top" === f &&
                f === k.options.verticalAlign &&
                ((c = M(a.spacingBox)),
                (c.y =
                  "vertical" === k.options.layout
                    ? a.plotTop
                    : c.y + d.getHeight()),
                (k.group.placed = !1),
                k.align(c)));
          };
        d &&
          (h(n, (c) => c[0] === a) ||
            n.push([
              a,
              [
                l(a.xAxis[0], "afterSetExtremes", function (c) {
                  d && d.render(c.min, c.max);
                }),
                l(a, "redraw", b),
              ],
            ]),
          b());
      }
      function x() {
        for (let a = 0, g = n.length; a < g; ++a) {
          const g = n[a];
          if (g[0] === this) {
            g[1].forEach((c) => c());
            n.splice(a, 1);
            break;
          }
        }
      }
      function y() {
        var a = this.rangeSelector;
        a &&
          ((a = a.getHeight()),
          this.extraTopMargin && (this.plotTop += a),
          this.extraBottomMargin && (this.marginBottom += a));
      }
      function b() {
        var a = this.rangeSelector;
        a &&
          !a.options.floating &&
          (a.render(),
          (a = a.options.verticalAlign),
          "bottom" === a
            ? (this.extraBottomMargin = !0)
            : "middle" !== a && (this.extraTopMargin = !0));
      }
      function m(a) {
        var g = a.options.rangeSelector;
        a = this.extraBottomMargin;
        const k = this.extraTopMargin;
        let c = this.rangeSelector;
        g &&
          g.enabled &&
          !v(c) &&
          this.options.rangeSelector &&
          ((this.options.rangeSelector.enabled = !0),
          (this.rangeSelector = c = new u(this)));
        this.extraTopMargin = this.extraBottomMargin = !1;
        c &&
          (p(this),
          (g =
            (g && g.verticalAlign) || (c.options && c.options.verticalAlign)),
          c.options.floating ||
            ("bottom" === g
              ? (this.extraBottomMargin = !0)
              : "middle" !== g && (this.extraTopMargin = !0)),
          this.extraBottomMargin !== a || this.extraTopMargin !== k) &&
          (this.isDirtyBox = !0);
      }
      const { defaultOptions: q, setOptions: J } = e,
        {
          addEvent: l,
          defined: v,
          extend: d,
          find: h,
          isNumber: t,
          merge: M,
          pick: G,
        } = z,
        n = [],
        a = [];
      let u;
      return {
        compose: function (n, g, k) {
          u = k;
          z.pushUnique(a, n) && (n.prototype.minFromRange = F);
          z.pushUnique(a, g) &&
            (l(g, "afterGetContainer", E),
            l(g, "beforeRender", D),
            l(g, "destroy", x),
            l(g, "getMargins", y),
            l(g, "render", b),
            l(g, "update", m),
            g.prototype.callbacks.push(p));
          z.pushUnique(a, J) &&
            (d(q, { rangeSelector: B.rangeSelector }), d(q.lang, B.lang));
        },
      };
    }
  );
  K(
    e,
    "Stock/RangeSelector/RangeSelector.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Defaults.js"],
      e["Core/Globals.js"],
      e["Stock/RangeSelector/RangeSelectorComposition.js"],
      e["Core/Renderer/SVG/SVGElement.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z, H, E, D) {
      function p(g) {
        if (-1 !== g.indexOf("%L")) return "text";
        const k = "aAdewbBmoyY"
            .split("")
            .some((c) => -1 !== g.indexOf("%" + c)),
          c = "HkIlMS".split("").some((c) => -1 !== g.indexOf("%" + c));
        return k && c ? "datetime-local" : k ? "date" : c ? "time" : "text";
      }
      const { defaultOptions: x } = B,
        {
          addEvent: y,
          createElement: b,
          css: m,
          defined: q,
          destroyObjectProperties: J,
          discardElement: l,
          extend: v,
          fireEvent: d,
          isNumber: h,
          merge: t,
          objectEach: M,
          pad: G,
          pick: n,
          pInt: a,
          splat: u,
        } = D;
      class A {
        static compose(g, k) {
          H.compose(g, k, A);
        }
        constructor(g) {
          this.buttons = void 0;
          this.buttonOptions = A.prototype.defaultButtons;
          this.initialButtonGroupWidth = 0;
          this.options = void 0;
          this.chart = g;
          this.init(g);
        }
        clickButton(g, k) {
          const c = this.chart,
            f = this.buttonOptions[g],
            a = c.xAxis[0];
          var b = (c.scroller && c.scroller.getUnionExtremes()) || a || {},
            l = f.type;
          const A = f.dataGrouping;
          let m = b.dataMin,
            v = b.dataMax,
            r,
            I = a && Math.round(Math.min(a.max, n(v, a.max))),
            L;
          b = f._range;
          let t,
            p,
            J,
            x = !0;
          if (null !== m && null !== v) {
            c.fixedRange = b;
            this.setSelected(g);
            A &&
              ((this.forcedDataGrouping = !0),
              e.prototype.setDataGrouping.call(
                a || { chart: this.chart },
                A,
                !1
              ),
              (this.frozenStates = f.preserveDataGrouping));
            if ("month" === l || "year" === l)
              a
                ? ((l = { range: f, max: I, chart: c, dataMin: m, dataMax: v }),
                  (r = a.minFromRange.call(l)),
                  h(l.newMax) && (I = l.newMax),
                  (x = !1))
                : (b = f);
            else if (b)
              (r = Math.max(I - b, m)), (I = Math.min(r + b, v)), (x = !1);
            else if ("ytd" === l)
              if (a) {
                if ("undefined" === typeof v || "undefined" === typeof m)
                  (m = Number.MAX_VALUE),
                    (v = Number.MIN_VALUE),
                    c.series.forEach((c) => {
                      if ((c = c.xData))
                        (m = Math.min(c[0], m)),
                          (v = Math.max(c[c.length - 1], v));
                    }),
                    (k = !1);
                l = this.getYTDExtremes(v, m, c.time.useUTC);
                r = t = l.min;
                I = l.max;
              } else {
                this.deferredYTDClick = g;
                return;
              }
            else
              "all" === l &&
                a &&
                (c.navigator &&
                  c.navigator.baseSeries[0] &&
                  (c.navigator.baseSeries[0].xAxis.options.range = void 0),
                (r = m),
                (I = v));
            x && f._offsetMin && q(r) && (r += f._offsetMin);
            f._offsetMax && q(I) && (I += f._offsetMax);
            this.dropdown && (this.dropdown.selectedIndex = g + 1);
            a
              ? a.setExtremes(r, I, n(k, !0), void 0, {
                  trigger: "rangeSelectorButton",
                  rangeSelectorButton: f,
                })
              : ((L = u(c.options.xAxis)[0]),
                (J = L.range),
                (L.range = b),
                (p = L.min),
                (L.min = t),
                y(c, "load", function () {
                  L.range = J;
                  L.min = p;
                }));
            d(this, "afterBtnClick");
          }
        }
        setSelected(g) {
          this.selected = this.options.selected = g;
        }
        init(g) {
          const a = this,
            c = g.options.rangeSelector,
            f = c.buttons || a.defaultButtons.slice(),
            b = c.selected,
            C = function () {
              const c = a.minInput,
                f = a.maxInput;
              c && c.blur && d(c, "blur");
              f && f.blur && d(f, "blur");
            };
          a.chart = g;
          a.options = c;
          a.buttons = [];
          a.buttonOptions = f;
          this.eventsToUnbind = [];
          this.eventsToUnbind.push(y(g.container, "mousedown", C));
          this.eventsToUnbind.push(y(g, "resize", C));
          f.forEach(a.computeButtonRange);
          "undefined" !== typeof b && f[b] && this.clickButton(b, !1);
          this.eventsToUnbind.push(
            y(g, "load", function () {
              g.xAxis &&
                g.xAxis[0] &&
                y(g.xAxis[0], "setExtremes", function (c) {
                  this.max - this.min !== g.fixedRange &&
                    "rangeSelectorButton" !== c.trigger &&
                    "updatedData" !== c.trigger &&
                    a.forcedDataGrouping &&
                    !a.frozenStates &&
                    this.setDataGrouping(!1, !1);
                });
            })
          );
        }
        updateButtonStates() {
          const g = this;
          var a = this.chart;
          const c = this.dropdown,
            f = a.xAxis[0],
            d = Math.round(f.max - f.min),
            b = !f.hasVisibleSeries,
            n = (a.scroller && a.scroller.getUnionExtremes()) || f,
            l = n.dataMin,
            u = n.dataMax;
          a = g.getYTDExtremes(u, l, a.time.useUTC);
          const A = a.min,
            r = a.max,
            m = g.selected,
            L = g.options.allButtonsEnabled,
            v = g.buttons;
          let e = h(m);
          g.buttonOptions.forEach((a, k) => {
            var w = a._range,
              n = a.type,
              C = a.count || 1;
            const h = v[k],
              I = a._offsetMax - a._offsetMin,
              t = k === m,
              q = w > u - l,
              R = w < f.minRange;
            a = 0;
            let O = !1,
              P = !1;
            w = w === d;
            ("month" === n || "year" === n) &&
            d + 36e5 >= 864e5 * { month: 28, year: 365 }[n] * C - I &&
            d - 36e5 <= 864e5 * { month: 31, year: 366 }[n] * C + I
              ? (w = !0)
              : "ytd" === n
              ? ((w = r - A + I === d), (O = !t))
              : "all" === n &&
                ((w = f.max - f.min >= u - l), (P = !t && e && w));
            n = !L && (q || R || P || b);
            C = (t && w) || (w && !e && !O) || (t && g.frozenStates);
            n ? (a = 3) : C && ((e = !0), (a = 2));
            h.state !== a &&
              (h.setState(a),
              c &&
                ((c.options[k + 1].disabled = n),
                2 === a && (c.selectedIndex = k + 1)),
              0 === a && m === k && g.setSelected());
          });
        }
        computeButtonRange(a) {
          const g = a.type,
            c = a.count || 1,
            f = {
              millisecond: 1,
              second: 1e3,
              minute: 6e4,
              hour: 36e5,
              day: 864e5,
              week: 6048e5,
            };
          if (f[g]) a._range = f[g] * c;
          else if ("month" === g || "year" === g)
            a._range = 864e5 * { month: 30, year: 365 }[g] * c;
          a._offsetMin = n(a.offsetMin, 0);
          a._offsetMax = n(a.offsetMax, 0);
          a._range += a._offsetMax - a._offsetMin;
        }
        getInputValue(a) {
          a = "min" === a ? this.minInput : this.maxInput;
          const g = this.chart.options.rangeSelector,
            c = this.chart.time;
          return a
            ? (
                ("text" === a.type && g.inputDateParser) ||
                this.defaultInputDateParser
              )(a.value, c.useUTC, c)
            : 0;
        }
        setInputValue(a, k) {
          const c = this.options,
            f = this.chart.time,
            g = "min" === a ? this.minInput : this.maxInput;
          a = "min" === a ? this.minDateBox : this.maxDateBox;
          if (g) {
            var d = g.getAttribute("data-hc-time");
            d = q(d) ? Number(d) : void 0;
            q(k) &&
              (q(d) && g.setAttribute("data-hc-time-previous", d),
              g.setAttribute("data-hc-time", k),
              (d = k));
            g.value = f.dateFormat(
              this.inputTypeFormats[g.type] || c.inputEditDateFormat,
              d
            );
            a && a.attr({ text: f.dateFormat(c.inputDateFormat, d) });
          }
        }
        setInputExtremes(a, k, c) {
          if ((a = "min" === a ? this.minInput : this.maxInput)) {
            const f = this.inputTypeFormats[a.type],
              g = this.chart.time;
            f &&
              ((k = g.dateFormat(f, k)),
              a.min !== k && (a.min = k),
              (c = g.dateFormat(f, c)),
              a.max !== c && (a.max = c));
          }
        }
        showInput(a) {
          const g = "min" === a ? this.minDateBox : this.maxDateBox;
          if (
            (a = "min" === a ? this.minInput : this.maxInput) &&
            g &&
            this.inputGroup
          ) {
            const c = "text" === a.type,
              { translateX: f, translateY: k } = this.inputGroup,
              { inputBoxWidth: d } = this.options;
            m(a, {
              width: c ? g.width + (d ? -2 : 20) + "px" : "auto",
              height: g.height - 2 + "px",
              border: "2px solid silver",
            });
            c && d
              ? m(a, { left: f + g.x + "px", top: k + "px" })
              : m(a, {
                  left:
                    Math.min(
                      Math.round(g.x + f - (a.offsetWidth - g.width) / 2),
                      this.chart.chartWidth - a.offsetWidth
                    ) + "px",
                  top: k - (a.offsetHeight - g.height) / 2 + "px",
                });
          }
        }
        hideInput(a) {
          (a = "min" === a ? this.minInput : this.maxInput) &&
            m(a, { top: "-9999em", border: 0, width: "1px", height: "1px" });
        }
        defaultInputDateParser(g, k, c) {
          var f = g.split("/").join("-").split(" ").join("T");
          -1 === f.indexOf("T") && (f += "T00:00");
          if (k) f += "Z";
          else {
            var d;
            if ((d = z.isSafari))
              (d = f),
                (d = !(
                  6 < d.length &&
                  (d.lastIndexOf("-") === d.length - 6 ||
                    d.lastIndexOf("+") === d.length - 6)
                ));
            d &&
              ((d = new Date(f).getTimezoneOffset() / 60),
              (f += 0 >= d ? `+${G(-d)}:00` : `-${G(d)}:00`));
          }
          f = Date.parse(f);
          h(f) ||
            ((g = g.split("-")), (f = Date.UTC(a(g[0]), a(g[1]) - 1, a(g[2]))));
          c && k && h(f) && (f += c.getTimezoneOffset(f));
          return f;
        }
        drawInput(a) {
          function g() {
            const { maxInput: f, minInput: g } = n,
              d = c.xAxis[0];
            var k = c.scroller && c.scroller.xAxis ? c.scroller.xAxis : d;
            const b = k.dataMin;
            k = k.dataMax;
            let r = n.getInputValue(a);
            r !== Number(I.getAttribute("data-hc-time-previous")) &&
              h(r) &&
              (I.setAttribute("data-hc-time-previous", r),
              e && f && h(b)
                ? r > Number(f.getAttribute("data-hc-time"))
                  ? (r = void 0)
                  : r < b && (r = b)
                : g &&
                  h(k) &&
                  (r < Number(g.getAttribute("data-hc-time"))
                    ? (r = void 0)
                    : r > k && (r = k)),
              "undefined" !== typeof r &&
                d.setExtremes(e ? r : d.min, e ? d.max : r, void 0, void 0, {
                  trigger: "rangeSelectorInput",
                }));
          }
          const { chart: c, div: f, inputGroup: d } = this,
            n = this,
            l = c.renderer.style || {};
          var u = c.renderer;
          const A = c.options.rangeSelector,
            e = "min" === a;
          var r = x.lang[e ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
          r = u
            .label(r, 0)
            .addClass("highcharts-range-label")
            .attr({ padding: r ? 2 : 0, height: r ? A.inputBoxHeight : 0 })
            .add(d);
          u = u
            .label("", 0)
            .addClass("highcharts-range-input")
            .attr({
              padding: 2,
              width: A.inputBoxWidth,
              height: A.inputBoxHeight,
              "text-align": "center",
            })
            .on("click", function () {
              n.showInput(a);
              n[a + "Input"].focus();
            });
          c.styledMode ||
            u.attr({ stroke: A.inputBoxBorderColor, "stroke-width": 1 });
          u.add(d);
          const I = b(
            "input",
            { name: a, className: "highcharts-range-selector" },
            void 0,
            f
          );
          I.setAttribute("type", p(A.inputDateFormat || "%e %b %Y"));
          c.styledMode ||
            (r.css(t(l, A.labelStyle)),
            u.css(t({ color: "#333333" }, l, A.inputStyle)),
            m(
              I,
              v(
                {
                  position: "absolute",
                  border: 0,
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  textAlign: "center",
                  fontSize: l.fontSize,
                  fontFamily: l.fontFamily,
                  top: "-9999em",
                },
                A.inputStyle
              )
            ));
          I.onfocus = () => {
            n.showInput(a);
          };
          I.onblur = () => {
            I === z.doc.activeElement && g();
            n.hideInput(a);
            n.setInputValue(a);
            I.blur();
          };
          let L = !1;
          I.onchange = () => {
            L || (g(), n.hideInput(a), I.blur());
          };
          I.onkeypress = (c) => {
            13 === c.keyCode && g();
          };
          I.onkeydown = (c) => {
            L = !0;
            (38 !== c.keyCode && 40 !== c.keyCode) || g();
          };
          I.onkeyup = () => {
            L = !1;
          };
          return { dateBox: u, input: I, label: r };
        }
        getPosition() {
          var a = this.chart;
          const d = a.options.rangeSelector;
          a = "top" === d.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
          return {
            buttonTop: a + d.buttonPosition.y,
            inputTop: a + d.inputPosition.y - 10,
          };
        }
        getYTDExtremes(a, d, c) {
          const f = this.chart.time;
          var g = new f.Date(a);
          const k = f.get("FullYear", g);
          c = c ? f.Date.UTC(k, 0, 1) : +new f.Date(k, 0, 1);
          d = Math.max(d, c);
          g = g.getTime();
          return { max: Math.min(a || g, g), min: d };
        }
        render(a, d) {
          var c = this.chart,
            f = c.renderer;
          const g = c.container;
          var k = c.options;
          const h = k.rangeSelector,
            l = n(k.chart.style && k.chart.style.zIndex, 0) + 1;
          k = h.inputEnabled;
          if (!1 !== h.enabled) {
            this.rendered ||
              ((this.group = f
                .g("range-selector-group")
                .attr({ zIndex: 7 })
                .add()),
              (this.div = b("div", void 0, {
                position: "relative",
                height: 0,
                zIndex: l,
              })),
              this.buttonOptions.length && this.renderButtons(),
              g.parentNode && g.parentNode.insertBefore(this.div, g),
              k &&
                ((this.inputGroup = f.g("input-group").add(this.group)),
                (f = this.drawInput("min")),
                (this.minDateBox = f.dateBox),
                (this.minLabel = f.label),
                (this.minInput = f.input),
                (f = this.drawInput("max")),
                (this.maxDateBox = f.dateBox),
                (this.maxLabel = f.label),
                (this.maxInput = f.input)));
            if (
              k &&
              (this.setInputValue("min", a),
              this.setInputValue("max", d),
              (a =
                (c.scroller && c.scroller.getUnionExtremes()) ||
                c.xAxis[0] ||
                {}),
              q(a.dataMin) &&
                q(a.dataMax) &&
                ((c = c.xAxis[0].minRange || 0),
                this.setInputExtremes(
                  "min",
                  a.dataMin,
                  Math.min(a.dataMax, this.getInputValue("max")) - c
                ),
                this.setInputExtremes(
                  "max",
                  Math.max(a.dataMin, this.getInputValue("min")) + c,
                  a.dataMax
                )),
              this.inputGroup)
            ) {
              let c = 0;
              [
                this.minLabel,
                this.minDateBox,
                this.maxLabel,
                this.maxDateBox,
              ].forEach((a) => {
                if (a) {
                  const { width: f } = a.getBBox();
                  f && (a.attr({ x: c }), (c += f + h.inputSpacing));
                }
              });
            }
            this.alignElements();
            this.rendered = !0;
          }
        }
        renderButtons() {
          const { buttons: a, chart: k, options: c } = this,
            f = x.lang,
            w = k.renderer,
            h = t(c.buttonTheme),
            l = h && h.states,
            u = h.width || 28;
          delete h.width;
          delete h.states;
          this.buttonGroup = w.g("range-selector-buttons").add(this.group);
          const A = (this.dropdown = b(
            "select",
            void 0,
            {
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              border: 0,
              top: "-9999em",
              cursor: "pointer",
              opacity: 0.0001,
            },
            this.div
          ));
          y(A, "touchstart", () => {
            A.style.fontSize = "16px";
          });
          [
            [z.isMS ? "mouseover" : "mouseenter"],
            [z.isMS ? "mouseout" : "mouseleave"],
            ["change", "click"],
          ].forEach(([c, f]) => {
            y(A, c, () => {
              const g = a[this.currentButtonIndex()];
              g && d(g.element, f || c);
            });
          });
          this.zoomText = w
            .label((f && f.rangeSelectorZoom) || "", 0)
            .attr({
              padding: c.buttonTheme.padding,
              height: c.buttonTheme.height,
              paddingLeft: 0,
              paddingRight: 0,
            })
            .add(this.buttonGroup);
          this.chart.styledMode ||
            (this.zoomText.css(c.labelStyle),
            (h["stroke-width"] = n(h["stroke-width"], 0)));
          b(
            "option",
            { textContent: this.zoomText.textStr, disabled: !0 },
            void 0,
            A
          );
          this.buttonOptions.forEach((c, f) => {
            b("option", { textContent: c.title || c.text }, void 0, A);
            a[f] = w
              .button(
                c.text,
                0,
                0,
                (a) => {
                  const d = c.events && c.events.click;
                  let g;
                  d && (g = d.call(c, a));
                  !1 !== g && this.clickButton(f);
                  this.isActive = !0;
                },
                h,
                l && l.hover,
                l && l.select,
                l && l.disabled
              )
              .attr({ "text-align": "center", width: u })
              .add(this.buttonGroup);
            c.title && a[f].attr("title", c.title);
          });
        }
        alignElements() {
          const {
            buttonGroup: a,
            buttons: d,
            chart: c,
            group: f,
            inputGroup: b,
            options: h,
            zoomText: l,
          } = this;
          var u = c.options;
          const A =
              u.exporting &&
              !1 !== u.exporting.enabled &&
              u.navigation &&
              u.navigation.buttonOptions,
            { buttonPosition: m, inputPosition: r, verticalAlign: v } = h;
          u = (a, f) =>
            A &&
            this.titleCollision(c) &&
            "top" === v &&
            "right" === f.align &&
            f.y - a.getBBox().height - 12 <
              (A.y || 0) + (A.height || 0) + c.spacing[0]
              ? -40
              : 0;
          var L = c.plotLeft;
          if (f && m && r) {
            var e = m.x - c.spacing[3];
            if (a) {
              this.positionButtons();
              if (!this.initialButtonGroupWidth) {
                let c = 0;
                l && (c += l.getBBox().width + 5);
                d.forEach((a, f) => {
                  c += a.width;
                  f !== d.length - 1 && (c += h.buttonSpacing);
                });
                this.initialButtonGroupWidth = c;
              }
              L -= c.spacing[3];
              this.updateButtonStates();
              var t = u(a, m);
              this.alignButtonGroup(t);
              f.placed = a.placed = c.hasLoaded;
            }
            t = 0;
            b &&
              ((t = u(b, r)),
              "left" === r.align
                ? (e = L)
                : "right" === r.align && (e = -Math.max(c.axisOffset[1], -t)),
              b.align(
                {
                  y: r.y,
                  width: b.getBBox().width,
                  align: r.align,
                  x: r.x + e - 2,
                },
                !0,
                c.spacingBox
              ),
              (b.placed = c.hasLoaded));
            this.handleCollision(t);
            f.align({ verticalAlign: v }, !0, c.spacingBox);
            u = f.alignAttr.translateY;
            L = f.getBBox().height + 20;
            e = 0;
            "bottom" === v &&
              ((e =
                (e = c.legend && c.legend.options) &&
                "bottom" === e.verticalAlign &&
                e.enabled &&
                !e.floating
                  ? c.legend.legendHeight + n(e.margin, 10)
                  : 0),
              (L = L + e - 20),
              (e =
                u -
                L -
                (h.floating ? 0 : h.y) -
                (c.titleOffset ? c.titleOffset[2] : 0) -
                10));
            if ("top" === v)
              h.floating && (e = 0),
                c.titleOffset && c.titleOffset[0] && (e = c.titleOffset[0]),
                (e += c.margin[0] - c.spacing[0] || 0);
            else if ("middle" === v)
              if (r.y === m.y) e = u;
              else if (r.y || m.y)
                e = 0 > r.y || 0 > m.y ? e - Math.min(r.y, m.y) : u - L;
            f.translate(h.x, h.y + Math.floor(e));
            const { minInput: g, maxInput: k, dropdown: w } = this;
            h.inputEnabled &&
              g &&
              k &&
              ((g.style.marginTop = f.translateY + "px"),
              (k.style.marginTop = f.translateY + "px"));
            w && (w.style.marginTop = f.translateY + "px");
          }
        }
        alignButtonGroup(a, d) {
          const { chart: c, options: f, buttonGroup: g } = this,
            { buttonPosition: k } = f,
            b = c.plotLeft - c.spacing[3];
          let h = k.x - c.spacing[3];
          "right" === k.align
            ? (h += a - b)
            : "center" === k.align && (h -= b / 2);
          g &&
            g.align(
              {
                y: k.y,
                width: n(d, this.initialButtonGroupWidth),
                align: k.align,
                x: h,
              },
              !0,
              c.spacingBox
            );
        }
        positionButtons() {
          const { buttons: a, chart: d, options: c, zoomText: f } = this,
            b = d.hasLoaded ? "animate" : "attr",
            { buttonPosition: h } = c,
            u = d.plotLeft;
          let l = u;
          f &&
            "hidden" !== f.visibility &&
            (f[b]({ x: n(u + h.x, u) }), (l += h.x + f.getBBox().width + 5));
          for (let f = 0, d = this.buttonOptions.length; f < d; ++f)
            if ("hidden" !== a[f].visibility)
              a[f][b]({ x: l }), (l += a[f].width + c.buttonSpacing);
            else a[f][b]({ x: u });
        }
        handleCollision(a) {
          const { chart: d, buttonGroup: c, inputGroup: f } = this,
            { buttonPosition: g, dropdown: b, inputPosition: n } = this.options,
            h = () => {
              let c = 0;
              this.buttons.forEach((a) => {
                a = a.getBBox();
                a.width > c && (c = a.width);
              });
              return c;
            },
            u = (d) => {
              if (f && c) {
                const k =
                    f.alignAttr.translateX +
                    f.alignOptions.x -
                    a +
                    f.getBBox().x +
                    2,
                  b = f.alignOptions.width,
                  r = c.alignAttr.translateX + c.getBBox().x;
                return r + d > k && k + b > r && g.y < n.y + f.getBBox().height;
              }
              return !1;
            },
            l = () => {
              f &&
                c &&
                f.attr({
                  translateX:
                    f.alignAttr.translateX + (d.axisOffset[1] >= -a ? 0 : -a),
                  translateY: f.alignAttr.translateY + c.getBBox().height + 10,
                });
            };
          if (c) {
            if ("always" === b) {
              this.collapseButtons(a);
              u(h()) && l();
              return;
            }
            "never" === b && this.expandButtons();
          }
          f && c
            ? n.align === g.align || u(this.initialButtonGroupWidth + 20)
              ? "responsive" === b
                ? (this.collapseButtons(a), u(h()) && l())
                : l()
              : "responsive" === b && this.expandButtons()
            : c &&
              "responsive" === b &&
              (this.initialButtonGroupWidth > d.plotWidth
                ? this.collapseButtons(a)
                : this.expandButtons());
        }
        collapseButtons(a) {
          const {
              buttons: d,
              buttonOptions: c,
              chart: f,
              dropdown: g,
              options: b,
              zoomText: h,
            } = this,
            u =
              (f.userOptions.rangeSelector &&
                f.userOptions.rangeSelector.buttonTheme) ||
              {},
            l = (c) => ({
              text: c ? `${c} \u25be` : "\u25be",
              width: "auto",
              paddingLeft: n(b.buttonTheme.paddingLeft, u.padding, 8),
              paddingRight: n(b.buttonTheme.paddingRight, u.padding, 8),
            });
          h && h.hide();
          let A = !1;
          c.forEach((c, a) => {
            a = d[a];
            2 !== a.state ? a.hide() : (a.show(), a.attr(l(c.text)), (A = !0));
          });
          A ||
            (g && (g.selectedIndex = 0),
            d[0].show(),
            d[0].attr(l(this.zoomText && this.zoomText.textStr)));
          const { align: r } = b.buttonPosition;
          this.positionButtons();
          ("right" !== r && "center" !== r) ||
            this.alignButtonGroup(
              a,
              d[this.currentButtonIndex()].getBBox().width
            );
          this.showDropdown();
        }
        expandButtons() {
          const {
            buttons: a,
            buttonOptions: d,
            options: c,
            zoomText: f,
          } = this;
          this.hideDropdown();
          f && f.show();
          d.forEach((f, d) => {
            d = a[d];
            d.show();
            d.attr({
              text: f.text,
              width: c.buttonTheme.width || 28,
              paddingLeft: n(c.buttonTheme.paddingLeft, "unset"),
              paddingRight: n(c.buttonTheme.paddingRight, "unset"),
            });
            2 > d.state && d.setState(0);
          });
          this.positionButtons();
        }
        currentButtonIndex() {
          const { dropdown: a } = this;
          return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0;
        }
        showDropdown() {
          const { buttonGroup: a, buttons: d, chart: c, dropdown: f } = this;
          if (a && f) {
            const { translateX: g, translateY: k } = a,
              b = d[this.currentButtonIndex()].getBBox();
            m(f, {
              left: c.plotLeft + g + "px",
              top: k + 0.5 + "px",
              width: b.width + "px",
              height: b.height + "px",
            });
            this.hasVisibleDropdown = !0;
          }
        }
        hideDropdown() {
          const { dropdown: a } = this;
          a &&
            (m(a, { top: "-9999em", width: "1px", height: "1px" }),
            (this.hasVisibleDropdown = !1));
        }
        getHeight() {
          var a = this.options,
            d = this.group;
          const c = a.y,
            f = a.buttonPosition.y,
            b = a.inputPosition.y;
          if (a.height) return a.height;
          this.alignElements();
          a = d ? d.getBBox(!0).height + 13 + c : 0;
          d = Math.min(b, f);
          if ((0 > b && 0 > f) || (0 < b && 0 < f)) a += Math.abs(d);
          return a;
        }
        titleCollision(a) {
          return !(a.options.title.text || a.options.subtitle.text);
        }
        update(a) {
          const d = this.chart;
          t(!0, d.options.rangeSelector, a);
          this.destroy();
          this.init(d);
          this.render();
        }
        destroy() {
          const a = this,
            d = a.minInput,
            c = a.maxInput;
          a.eventsToUnbind &&
            (a.eventsToUnbind.forEach((a) => a()), (a.eventsToUnbind = void 0));
          J(a.buttons);
          d && (d.onfocus = d.onblur = d.onchange = null);
          c && (c.onfocus = c.onblur = c.onchange = null);
          M(
            a,
            function (c, d) {
              c &&
                "chart" !== d &&
                (c instanceof E
                  ? c.destroy()
                  : c instanceof window.HTMLElement && l(c));
              c !== A.prototype[d] && (a[d] = null);
            },
            this
          );
        }
      }
      v(A.prototype, {
        defaultButtons: [
          { type: "month", count: 1, text: "1m", title: "View 1 month" },
          { type: "month", count: 3, text: "3m", title: "View 3 months" },
          { type: "month", count: 6, text: "6m", title: "View 6 months" },
          { type: "ytd", text: "YTD", title: "View year to date" },
          { type: "year", count: 1, text: "1y", title: "View 1 year" },
          { type: "all", text: "All", title: "View all" },
        ],
        inputTypeFormats: {
          "datetime-local": "%Y-%m-%dT%H:%M:%S",
          date: "%Y-%m-%d",
          time: "%H:%M:%S",
        },
      });
      ("");
      return A;
    }
  );
  K(
    e,
    "Series/XRange/XRangeSeriesDefaults.js",
    [e["Core/Utilities.js"]],
    function (e) {
      const { correctFloat: B, isNumber: z, isObject: F } = e;
      ("");
      return {
        colorByPoint: !0,
        dataLabels: {
          formatter: function () {
            let e = this.point.partialFill;
            F(e) && (e = e.amount);
            if (z(e) && 0 < e) return B(100 * e) + "%";
          },
          inside: !0,
          verticalAlign: "middle",
        },
        tooltip: {
          headerFormat:
            '<span style="font-size: 0.8em">{point.x} - {point.x2}</span><br/>',
          pointFormat:
            '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>',
        },
        borderRadius: 3,
        pointRange: 0,
      };
    }
  );
  K(
    e,
    "Series/XRange/XRangePoint.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (e, B) {
      const {
        series: {
          prototype: {
            pointClass: { prototype: z },
          },
        },
        seriesTypes: {
          column: {
            prototype: { pointClass: F },
          },
        },
      } = e;
      ({ extend: e } = B);
      class E extends F {
        constructor() {
          super(...arguments);
          this.series = this.options = void 0;
        }
        static getColorByCategory(e, p) {
          const x = e.options.colors || e.chart.options.colors;
          e = p.y % (x ? x.length : e.chart.options.chart.colorCount);
          return { colorIndex: e, color: x && x[e] };
        }
        resolveColor() {
          const e = this.series;
          if (e.options.colorByPoint && !this.options.color) {
            const p = E.getColorByCategory(e, this);
            e.chart.styledMode || (this.color = p.color);
            this.options.colorIndex || (this.colorIndex = p.colorIndex);
          } else this.color || (this.color = e.color);
        }
        init() {
          z.init.apply(this, arguments);
          this.y || (this.y = 0);
          return this;
        }
        setState() {
          z.setState.apply(this, arguments);
          this.series.drawPoint(this, this.series.getAnimationVerb());
        }
        getLabelConfig() {
          const e = z.getLabelConfig.call(this),
            p = this.series.yAxis.categories;
          e.x2 = this.x2;
          e.yCategory = this.yCategory = p && p[this.y];
          return e;
        }
        isValid() {
          return "number" === typeof this.x && "number" === typeof this.x2;
        }
      }
      e(E.prototype, { ttBelow: !1, tooltipDateKeys: ["x", "x2"] });
      ("");
      return E;
    }
  );
  K(
    e,
    "Series/XRange/XRangeSeries.js",
    [
      e["Core/Globals.js"],
      e["Core/Color/Color.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
      e["Series/XRange/XRangeSeriesDefaults.js"],
      e["Series/XRange/XRangePoint.js"],
    ],
    function (e, B, z, H, E, D) {
      function p() {
        let a, d;
        if (this.isXAxis) {
          a = M(this.dataMax, -Number.MAX_VALUE);
          for (const b of this.series)
            if (b.x2Data)
              for (const g of b.x2Data) g && g > a && ((a = g), (d = !0));
          d && (this.dataMax = a);
        }
      }
      ({ noop: e } = e);
      const { parse: x } = B,
        {
          series: { prototype: y },
          seriesTypes: { column: b },
        } = z,
        {
          addEvent: m,
          clamp: q,
          defined: J,
          extend: l,
          find: v,
          isNumber: d,
          isObject: h,
          merge: t,
          pick: M,
        } = H,
        G = [];
      class n extends b {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        static compose(a) {
          H.pushUnique(G, a) && m(a, "afterGetSeriesExtremes", p);
        }
        init() {
          super.init.apply(this, arguments);
          this.options.stacking = void 0;
        }
        getColumnMetrics() {
          const a = () => {
            for (const a of this.chart.series) {
              const d = a.xAxis;
              a.xAxis = a.yAxis;
              a.yAxis = d;
            }
          };
          a();
          const d = super.getColumnMetrics();
          a();
          return d;
        }
        cropData(a, d, b, g) {
          d = y.cropData.call(this, this.x2Data, d, b, g);
          d.xData = a.slice(d.start, d.end);
          return d;
        }
        findPointIndex(a) {
          const { cropStart: b, points: n } = this,
            { id: g } = a;
          if (g) var k = (k = v(n, (a) => a.id === g)) ? k.index : void 0;
          "undefined" === typeof k &&
            (k = (k = v(n, (c) => c.x === a.x && c.x2 === a.x2 && !c.touched))
              ? k.index
              : void 0);
          this.cropped && d(k) && d(b) && k >= b && (k -= b);
          return k;
        }
        alignDataLabel(a) {
          const d = a.plotX;
          a.plotX = M(a.dlBox && a.dlBox.centerX, a.plotX);
          super.alignDataLabel.apply(this, arguments);
          a.plotX = d;
        }
        translatePoint(a) {
          const b = this.xAxis;
          var n = this.yAxis,
            g = this.columnMetrics,
            k = this.options,
            { borderRadius: c } = k,
            f = k.minPointLength || 0,
            l = ((a.shapeArgs && a.shapeArgs.width) || 0) / 2,
            e = (this.pointXOffset = g.offset),
            m = M(a.x2, a.x + (a.len || 0));
          let v = a.plotX;
          var p = b.translate(m, 0, 0, 0, 1);
          m = Math.abs(p - v);
          const y = this.chart.inverted,
            r = (M(k.borderWidth, 1) % 2) / 2;
          let I = g.offset,
            L = Math.round(g.width);
          f && ((f -= m), 0 > f && (f = 0), (v -= f / 2), (p += f / 2));
          v = Math.max(v, -10);
          p = q(p, -10, b.len + 10);
          J(a.options.pointWidth) &&
            ((I -= (Math.ceil(a.options.pointWidth) - L) / 2),
            (L = Math.ceil(a.options.pointWidth)));
          k.pointPlacement &&
            d(a.plotY) &&
            n.categories &&
            (a.plotY = n.translate(a.y, 0, 1, 0, 1, k.pointPlacement));
          k = Math.floor(Math.min(v, p)) + r;
          k = {
            x: k,
            y: Math.floor(a.plotY + I) + r,
            width: Math.floor(Math.max(v, p)) + r - k,
            height: L,
          };
          a.shapeArgs = k;
          d(c) && (a.shapeArgs.r = c);
          y
            ? (a.tooltipPos[1] += e + l)
            : (a.tooltipPos[0] -= l + e - k.width / 2);
          l = k.x;
          e = l + k.width;
          0 > l || e > b.len
            ? ((l = q(l, 0, b.len)),
              (e = q(e, 0, b.len)),
              (p = e - l),
              (a.dlBox = t(k, {
                x: l,
                width: e - l,
                centerX: p ? p / 2 : null,
              })))
            : (a.dlBox = null);
          l = a.tooltipPos;
          e = y ? 1 : 0;
          p = y ? 0 : 1;
          g = this.columnMetrics ? this.columnMetrics.offset : -g.width / 2;
          l[e] = y
            ? l[e] + k.width / 2
            : q(l[e] + (b.reversed ? -1 : 0) * k.width, 0, b.len - 1);
          l[p] = q(l[p] + (y ? -1 : 1) * g, 0, n.len - 1);
          if ((n = a.partialFill))
            h(n) && (n = n.amount),
              d(n) || (n = 0),
              d(c) && (a.partShapeArgs = t(k, { r: c })),
              (c = Math.max(Math.round(m * n + a.plotX - v), 0)),
              (a.clipRectArgs = {
                x: b.reversed ? k.x + m - c : k.x,
                y: k.y,
                width: c,
                height: k.height,
              });
        }
        translate() {
          super.translate.apply(this, arguments);
          for (const a of this.points) this.translatePoint(a);
        }
        drawPoint(a, d) {
          const b = this.options,
            g = this.chart.renderer,
            k = a.shapeType,
            c = a.shapeArgs,
            f = a.partShapeArgs,
            n = a.clipRectArgs;
          var l = a.state,
            e = b.states[l || "normal"] || {};
          const u = "undefined" === typeof l ? "attr" : d;
          l = this.pointAttribs(a, l);
          e = M(this.chart.options.chart.animation, e.animation);
          let m = a.graphic,
            v = a.partialFill;
          if (a.isNull || !1 === a.visible) m && (a.graphic = m.destroy());
          else {
            if (m) m.rect[d](c);
            else
              (a.graphic = m =
                g
                  .g("point")
                  .addClass(a.getClassName())
                  .add(a.group || this.group)),
                (m.rect = g[k](t(c))
                  .addClass(a.getClassName())
                  .addClass("highcharts-partfill-original")
                  .add(m));
            f &&
              (m.partRect
                ? (m.partRect[d](t(f)), m.partialClipRect[d](t(n)))
                : ((m.partialClipRect = g.clipRect(
                    n.x,
                    n.y,
                    n.width,
                    n.height
                  )),
                  (m.partRect = g[k](f)
                    .addClass("highcharts-partfill-overlay")
                    .add(m)
                    .clip(m.partialClipRect))));
            this.chart.styledMode ||
              (m.rect[d](l, e).shadow(b.shadow),
              f &&
                (h(v) || (v = {}),
                h(b.partialFill) && (v = t(b.partialFill, v)),
                (a =
                  v.fill ||
                  x(l.fill).brighten(-0.3).get() ||
                  x(a.color || this.color)
                    .brighten(-0.3)
                    .get()),
                (l.fill = a),
                m.partRect[u](l, e).shadow(b.shadow)));
          }
        }
        drawPoints() {
          const a = this.getAnimationVerb();
          for (const d of this.points) this.drawPoint(d, a);
        }
        getAnimationVerb() {
          return this.chart.pointCount < (this.options.animationLimit || 250)
            ? "animate"
            : "attr";
        }
        isPointInside(a) {
          const d = a.shapeArgs,
            b = a.plotX,
            g = a.plotY;
          return d
            ? "undefined" !== typeof b &&
                "undefined" !== typeof g &&
                0 <= g &&
                g <= this.yAxis.len &&
                0 <= (d.x || 0) + (d.width || 0) &&
                b <= this.xAxis.len
            : super.isPointInside.apply(this, arguments);
        }
      }
      n.defaultOptions = t(b.defaultOptions, E);
      l(n.prototype, {
        pointClass: D,
        cropShoulder: 1,
        getExtremesFromAll: !0,
        parallelArrays: ["x", "x2", "y"],
        requireSorting: !1,
        type: "xrange",
        animate: y.animate,
        autoIncrement: e,
        buildKDTree: e,
      });
      z.registerSeriesType("xrange", n);
      return n;
    }
  );
  K(
    e,
    "Series/Gantt/GanttPoint.js",
    [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
    function (e, B) {
      ({
        seriesTypes: {
          xrange: {
            prototype: { pointClass: e },
          },
        },
      } = e);
      const { pick: z } = B;
      class F extends e {
        constructor() {
          super(...arguments);
          this.series = this.options = void 0;
        }
        static setGanttPointAliases(e) {
          function B(p, x) {
            "undefined" !== typeof x && (e[p] = x);
          }
          B("x", z(e.start, e.x));
          B("x2", z(e.end, e.x2));
          B("partialFill", z(e.completed, e.partialFill));
        }
        applyOptions(e, z) {
          e = super.applyOptions.call(this, e, z);
          F.setGanttPointAliases(e);
          return e;
        }
        isValid() {
          return (
            ("number" === typeof this.start || "number" === typeof this.x) &&
            ("number" === typeof this.end ||
              "number" === typeof this.x2 ||
              this.milestone)
          );
        }
      }
      return F;
    }
  );
  K(
    e,
    "Core/Axis/BrokenAxis.js",
    [e["Core/Axis/Stacking/StackItem.js"], e["Core/Utilities.js"]],
    function (e, B) {
      const {
        addEvent: z,
        find: F,
        fireEvent: E,
        isArray: D,
        isNumber: p,
        pick: x,
      } = B;
      var y;
      (function (b) {
        function m() {
          "undefined" !== typeof this.brokenAxis &&
            this.brokenAxis.setBreaks(this.options.breaks, !1);
        }
        function q() {
          this.brokenAxis &&
            this.brokenAxis.hasBreaks &&
            (this.options.ordinal = !1);
        }
        function J() {
          const d = this.brokenAxis;
          if (d && d.hasBreaks) {
            const a = this.tickPositions,
              b = this.tickPositions.info,
              n = [];
            for (let b = 0; b < a.length; b++)
              d.isInAnyBreak(a[b]) || n.push(a[b]);
            this.tickPositions = n;
            this.tickPositions.info = b;
          }
        }
        function l() {
          this.brokenAxis || (this.brokenAxis = new G(this));
        }
        function v() {
          const {
            isDirty: d,
            options: { connectNulls: a },
            points: b,
            xAxis: h,
            yAxis: g,
          } = this;
          if (d) {
            let d = b.length;
            for (; d--; ) {
              const c = b[d],
                f =
                  !(null === c.y && !1 === a) &&
                  ((h && h.brokenAxis && h.brokenAxis.isInAnyBreak(c.x, !0)) ||
                    (g && g.brokenAxis && g.brokenAxis.isInAnyBreak(c.y, !0)));
              c.visible = f ? !1 : !1 !== c.options.visible;
            }
          }
        }
        function d() {
          this.drawBreaks(this.xAxis, ["x"]);
          this.drawBreaks(this.yAxis, x(this.pointArrayMap, ["y"]));
        }
        function h(d, a) {
          const b = this,
            n = b.points;
          let g, k, c, f;
          if (d && d.brokenAxis && d.brokenAxis.hasBreaks) {
            const h = d.brokenAxis;
            a.forEach(function (a) {
              g = (h && h.breakArray) || [];
              k = d.isXAxis ? d.min : x(b.options.threshold, d.min);
              n.forEach(function (b) {
                f = x(b["stack" + a.toUpperCase()], b[a]);
                g.forEach(function (a) {
                  if (p(k) && p(f)) {
                    c = !1;
                    if ((k < a.from && f > a.to) || (k > a.from && f < a.from))
                      c = "pointBreak";
                    else if (
                      (k < a.from && f > a.from && f < a.to) ||
                      (k > a.from && f > a.to && f < a.from)
                    )
                      c = "pointInBreak";
                    c && E(d, c, { point: b, brk: a });
                  }
                });
              });
            });
          }
        }
        function t() {
          var d = this.currentDataGrouping,
            a = d && d.gapSize;
          d = this.points.slice();
          const b = this.yAxis;
          let h = this.options.gapSize,
            g = d.length - 1;
          var k;
          if (h && 0 < g)
            for (
              "value" !== this.options.gapUnit && (h *= this.basePointRange),
                a && a > h && a >= this.basePointRange && (h = a);
              g--;

            )
              (k && !1 !== k.visible) || (k = d[g + 1]),
                (a = d[g]),
                !1 !== k.visible &&
                  !1 !== a.visible &&
                  (k.x - a.x > h &&
                    ((k = (a.x + k.x) / 2),
                    d.splice(g + 1, 0, { isNull: !0, x: k }),
                    b.stacking &&
                      this.options.stacking &&
                      ((k = b.stacking.stacks[this.stackKey][k] =
                        new e(b, b.options.stackLabels, !1, k, this.stack)),
                      (k.total = 0))),
                  (k = a));
          return this.getGraphPath(d);
        }
        const y = [];
        b.compose = function (b, a) {
          B.pushUnique(y, b) &&
            (b.keepProps.push("brokenAxis"),
            z(b, "init", l),
            z(b, "afterInit", m),
            z(b, "afterSetTickPositions", J),
            z(b, "afterSetOptions", q));
          if (B.pushUnique(y, a)) {
            const b = a.prototype;
            b.drawBreaks = h;
            b.gappedPath = t;
            z(a, "afterGeneratePoints", v);
            z(a, "afterRender", d);
          }
          return b;
        };
        class G {
          static isInBreak(d, a) {
            const b = d.repeat || Infinity,
              h = d.from,
              g = d.to - d.from;
            a = a >= h ? (a - h) % b : b - ((h - a) % b);
            return d.inclusive ? a <= g : a < g && 0 !== a;
          }
          static lin2Val(d) {
            var a = this.brokenAxis;
            a = a && a.breakArray;
            if (!a || !p(d)) return d;
            let b, h;
            for (h = 0; h < a.length && !((b = a[h]), b.from >= d); h++)
              b.to < d ? (d += b.len) : G.isInBreak(b, d) && (d += b.len);
            return d;
          }
          static val2Lin(d) {
            var a = this.brokenAxis;
            a = a && a.breakArray;
            if (!a || !p(d)) return d;
            let b = d,
              h,
              g;
            for (g = 0; g < a.length; g++)
              if (((h = a[g]), h.to <= d)) b -= h.len;
              else if (h.from >= d) break;
              else if (G.isInBreak(h, d)) {
                b -= d - h.from;
                break;
              }
            return b;
          }
          constructor(d) {
            this.hasBreaks = !1;
            this.axis = d;
          }
          findBreakAt(d, a) {
            return F(a, function (a) {
              return a.from < d && d < a.to;
            });
          }
          isInAnyBreak(d, a) {
            const b = this.axis,
              h = b.options.breaks || [];
            let g = h.length,
              k,
              c,
              f;
            if (g && p(d)) {
              for (; g--; )
                G.isInBreak(h[g], d) &&
                  ((k = !0), c || (c = x(h[g].showPoints, !b.isXAxis)));
              f = k && a ? k && !c : k;
            }
            return f;
          }
          setBreaks(d, a) {
            const b = this,
              h = b.axis,
              g = D(d) && !!d.length;
            h.isDirty = b.hasBreaks !== g;
            b.hasBreaks = g;
            h.options.breaks = h.userOptions.breaks = d;
            h.forceRedraw = !0;
            h.series.forEach(function (a) {
              a.isDirty = !0;
            });
            g ||
              h.val2lin !== G.val2Lin ||
              (delete h.val2lin, delete h.lin2val);
            g &&
              ((h.userOptions.ordinal = !1),
              (h.lin2val = G.lin2Val),
              (h.val2lin = G.val2Lin),
              (h.setExtremes = function (a, c, d, g, l) {
                if (b.hasBreaks) {
                  const d = this.options.breaks || [];
                  let f;
                  for (; (f = b.findBreakAt(a, d)); ) a = f.to;
                  for (; (f = b.findBreakAt(c, d)); ) c = f.from;
                  c < a && (c = a);
                }
                h.constructor.prototype.setExtremes.call(this, a, c, d, g, l);
              }),
              (h.setAxisTranslation = function () {
                h.constructor.prototype.setAxisTranslation.call(this);
                b.unitLength = void 0;
                if (b.hasBreaks) {
                  const a = h.options.breaks || [],
                    c = [],
                    d = [],
                    g = x(h.pointRangePadding, 0);
                  let l = 0,
                    e,
                    n,
                    m = h.userMin || h.min,
                    v = h.userMax || h.max,
                    r,
                    t;
                  a.forEach(function (a) {
                    n = a.repeat || Infinity;
                    p(m) &&
                      p(v) &&
                      (G.isInBreak(a, m) && (m += (a.to % n) - (m % n)),
                      G.isInBreak(a, v) && (v -= (v % n) - (a.from % n)));
                  });
                  a.forEach(function (a) {
                    r = a.from;
                    n = a.repeat || Infinity;
                    if (p(m) && p(v)) {
                      for (; r - n > m; ) r -= n;
                      for (; r < m; ) r += n;
                      for (t = r; t < v; t += n)
                        c.push({ value: t, move: "in" }),
                          c.push({
                            value: t + a.to - a.from,
                            move: "out",
                            size: a.breakSize,
                          });
                    }
                  });
                  c.sort(function (a, c) {
                    return a.value === c.value
                      ? ("in" === a.move ? 0 : 1) - ("in" === c.move ? 0 : 1)
                      : a.value - c.value;
                  });
                  e = 0;
                  r = m;
                  c.forEach(function (a) {
                    e += "in" === a.move ? 1 : -1;
                    1 === e && "in" === a.move && (r = a.value);
                    0 === e &&
                      p(r) &&
                      (d.push({
                        from: r,
                        to: a.value,
                        len: a.value - r - (a.size || 0),
                      }),
                      (l += a.value - r - (a.size || 0)));
                  });
                  b.breakArray = d;
                  p(m) &&
                    p(v) &&
                    p(h.min) &&
                    ((b.unitLength = v - m - l + g),
                    E(h, "afterBreaks"),
                    h.staticScale
                      ? (h.transA = h.staticScale)
                      : b.unitLength &&
                        (h.transA *= (v - h.min + g) / b.unitLength),
                    g &&
                      (h.minPixelPadding = h.transA * (h.minPointOffset || 0)),
                    (h.min = m),
                    (h.max = v));
                }
              }));
            x(a, !0) && h.chart.redraw();
          }
        }
        b.Additions = G;
      })(y || (y = {}));
      return y;
    }
  );
  K(
    e,
    "Core/Axis/GridAxis.js",
    [e["Core/Axis/Axis.js"], e["Core/Globals.js"], e["Core/Utilities.js"]],
    function (e, B, z) {
      function F(a, d) {
        const f = { width: 0, height: 0 };
        d.forEach(function (d) {
          d = a[d];
          let b, g;
          z.isObject(d, !0) &&
            ((g = z.isObject(d.label, !0) ? d.label : {}),
            (d = g.getBBox ? g.getBBox().height : 0),
            g.textStr &&
              !c(g.textPxLength) &&
              (g.textPxLength = g.getBBox().width),
            (b = c(g.textPxLength) ? Math.round(g.textPxLength) : 0),
            g.textStr && (b = Math.round(g.getBBox().width)),
            (f.height = Math.max(d, f.height)),
            (f.width = Math.max(b, f.width)));
        });
        "treegrid" === this.options.type &&
          this.treeGrid &&
          this.treeGrid.mapOfPosToGridNode &&
          (f.width +=
            this.options.labels.indentation *
            ((this.treeGrid.mapOfPosToGridNode[-1].height || 0) - 1));
        return f;
      }
      function E() {
        const { grid: a } = this;
        ((a && a.columns) || []).forEach(function (a) {
          a.getOffset();
        });
      }
      function D(a) {
        if (!0 === (this.options.grid || {}).enabled) {
          const {
            axisTitle: d,
            height: f,
            horiz: b,
            left: g,
            offset: h,
            opposite: k,
            options: r,
            top: l,
            width: e,
          } = this;
          var c = this.tickSize();
          const n = d && d.getBBox().width,
            m = r.title.x,
            v = r.title.y,
            t = w(r.title.margin, b ? 5 : 10),
            u = d ? this.chart.renderer.fontMetrics(d).f : 0;
          c =
            (b ? l + f : g) +
            (b ? 1 : -1) * (k ? -1 : 1) * (c ? c[0] / 2 : 0) +
            (this.side === N.bottom ? u : 0);
          a.titlePosition.x = b
            ? g - (n || 0) / 2 - t + m
            : c + (k ? e : 0) + h + m;
          a.titlePosition.y = b
            ? c - (k ? f : 0) + (k ? u : -u) / 2 + h + v
            : l - t + v;
        }
      }
      function p() {
        const {
          chart: a,
          options: { grid: c = {} },
          userOptions: d,
        } = this;
        if (c.enabled) {
          var b = this.options;
          b.labels.align = w(b.labels.align, "center");
          this.categories || (b.showLastLabel = !1);
          this.labelRotation = 0;
          b.labels.rotation = 0;
        }
        if (c.columns) {
          b = this.grid.columns = [];
          let k = (this.grid.columnIndex = 0);
          for (; ++k < c.columns.length; ) {
            var g = f(d, c.columns[c.columns.length - k - 1], {
              linkedTo: 0,
              type: "category",
              scrollbar: { enabled: !1 },
            });
            delete g.grid.columns;
            g = new e(this.chart, g);
            g.grid.isColumn = !0;
            g.grid.columnIndex = k;
            A(a.axes, g);
            A(a[this.coll], g);
            b.push(g);
          }
        }
      }
      function x() {
        var a = this.grid,
          c = this.options;
        if (!0 === (c.grid || {}).enabled) {
          var d = this.min || 0;
          const h = this.max || 0;
          this.maxLabelDimensions = this.getMaxLabelDimensions(
            this.ticks,
            this.tickPositions
          );
          this.rightWall && this.rightWall.destroy();
          if (this.grid && this.grid.isOuterAxis() && this.axisLine) {
            var f = c.lineWidth;
            if (f) {
              f = this.getLinePath(f);
              var b = f[0],
                g = f[1],
                k =
                  ((this.tickSize("tick") || [1])[0] - 1) *
                  (this.side === N.top || this.side === N.left ? -1 : 1);
              "M" === b[0] &&
                "L" === g[0] &&
                (this.horiz
                  ? ((b[2] += k), (g[2] += k))
                  : ((b[1] += k), (g[1] += k)));
              !this.horiz &&
                this.chart.marginRight &&
                ((b = [b, ["L", this.left, b[2] || 0]]),
                (k = [
                  "L",
                  this.chart.chartWidth - this.chart.marginRight,
                  this.toPixels(h + this.tickmarkOffset),
                ]),
                (g = [
                  ["M", g[1] || 0, this.toPixels(h + this.tickmarkOffset)],
                  k,
                ]),
                this.grid.upperBorder ||
                  0 === d % 1 ||
                  (this.grid.upperBorder = this.grid.renderBorder(b)),
                this.grid.upperBorder &&
                  (this.grid.upperBorder.attr({
                    stroke: c.lineColor,
                    "stroke-width": c.lineWidth,
                  }),
                  this.grid.upperBorder.animate({ d: b })),
                this.grid.lowerBorder ||
                  0 === h % 1 ||
                  (this.grid.lowerBorder = this.grid.renderBorder(g)),
                this.grid.lowerBorder &&
                  (this.grid.lowerBorder.attr({
                    stroke: c.lineColor,
                    "stroke-width": c.lineWidth,
                  }),
                  this.grid.lowerBorder.animate({ d: g })));
              this.grid.axisLineExtra
                ? (this.grid.axisLineExtra.attr({
                    stroke: c.lineColor,
                    "stroke-width": c.lineWidth,
                  }),
                  this.grid.axisLineExtra.animate({ d: f }))
                : (this.grid.axisLineExtra = this.grid.renderBorder(f));
              this.axisLine[this.showAxis ? "show" : "hide"]();
            }
          }
          ((a && a.columns) || []).forEach((a) => a.render());
          if (
            !this.horiz &&
            this.chart.hasRendered &&
            (this.scrollbar ||
              (this.linkedParent && this.linkedParent.scrollbar))
          ) {
            a = this.tickmarkOffset;
            c = this.tickPositions[this.tickPositions.length - 1];
            f = this.tickPositions[0];
            let b, g;
            for (; (b = this.hiddenLabels.pop()) && b.element; ) b.show();
            for (; (g = this.hiddenMarks.pop()) && g.element; ) g.show();
            (b = this.ticks[f].label) &&
              (d - f > a ? this.hiddenLabels.push(b.hide()) : b.show());
            (b = this.ticks[c].label) &&
              (c - h > a ? this.hiddenLabels.push(b.hide()) : b.show());
            (d = this.ticks[c].mark) &&
              c - h < a &&
              0 < c - h &&
              this.ticks[c].isLast &&
              this.hiddenMarks.push(d.hide());
          }
        }
      }
      function y() {
        const a = this.tickPositions && this.tickPositions.info,
          c = this.options,
          d = this.userOptions.labels || {};
        (c.grid || {}).enabled &&
          (this.horiz
            ? (this.series.forEach((a) => {
                a.options.pointRange = 0;
              }),
              a &&
                c.dateTimeLabelFormats &&
                c.labels &&
                !u(d.align) &&
                (!1 === c.dateTimeLabelFormats[a.unitName].range ||
                  1 < a.count) &&
                ((c.labels.align = "left"), u(d.x) || (c.labels.x = 3)))
            : "treegrid" !== this.options.type &&
              this.grid &&
              this.grid.columns &&
              (this.minPointOffset = this.tickInterval));
      }
      function b(a) {
        const d = this.options;
        a = a.userOptions;
        const b = d && z.isObject(d.grid, !0) ? d.grid : {};
        let g;
        !0 === b.enabled &&
          ((g = f(
            !0,
            {
              className: "highcharts-grid-axis " + (a.className || ""),
              dateTimeLabelFormats: {
                hour: { list: ["%H:%M", "%H"] },
                day: { list: ["%A, %e. %B", "%a, %e. %b", "%E"] },
                week: { list: ["Week %W", "W%W"] },
                month: { list: ["%B", "%b", "%o"] },
              },
              grid: { borderWidth: 1 },
              labels: { padding: 2, style: { fontSize: "0.9em" } },
              margin: 0,
              title: { text: null, reserveSpace: !1, rotation: 0 },
              units: [
                ["millisecond", [1, 10, 100]],
                ["second", [1, 10]],
                ["minute", [1, 5, 15]],
                ["hour", [1, 6]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1]],
                ["year", null],
              ],
            },
            a
          )),
          "xAxis" === this.coll &&
            (u(a.linkedTo) &&
              !u(a.tickPixelInterval) &&
              (g.tickPixelInterval = 350),
            u(a.tickPixelInterval) ||
              !u(a.linkedTo) ||
              u(a.tickPositioner) ||
              u(a.tickInterval) ||
              (g.tickPositioner = function (a, d) {
                var f =
                  this.linkedParent &&
                  this.linkedParent.tickPositions &&
                  this.linkedParent.tickPositions.info;
                if (f) {
                  var b = g.units || [];
                  let h;
                  var k = 1;
                  let l = "year";
                  for (let a = 0; a < b.length; a++) {
                    const c = b[a];
                    if (c && c[0] === f.unitName) {
                      h = a;
                      break;
                    }
                  }
                  (b = c(h) && b[h + 1])
                    ? ((l = b[0] || "year"), (k = ((k = b[1]) && k[0]) || 1))
                    : "year" === f.unitName && (k = 10 * f.count);
                  f = C[l];
                  this.tickInterval = f * k;
                  return this.chart.time.getTimeTicks(
                    { unitRange: f, count: k, unitName: l },
                    a,
                    d,
                    this.options.startOfWeek
                  );
                }
              })),
          f(!0, this.options, g),
          this.horiz &&
            ((d.minPadding = w(a.minPadding, 0)),
            (d.maxPadding = w(a.maxPadding, 0))),
          c(d.grid.borderWidth) && (d.tickWidth = d.lineWidth = b.borderWidth));
      }
      function m(a) {
        a = ((a = a.userOptions) && a.grid) || {};
        const c = a.columns;
        a.enabled && c && f(!0, this.options, c[c.length - 1]);
      }
      function q() {
        (this.grid.columns || []).forEach((a) => a.setScale());
      }
      function J(a) {
        const {
          horiz: c,
          maxLabelDimensions: d,
          options: { grid: f = {} },
        } = this;
        if (f.enabled && d) {
          var b = 2 * this.options.labels.distance;
          b = c ? f.cellHeight || b + d.height : b + d.width;
          k(a.tickSize) ? (a.tickSize[0] = b) : (a.tickSize = [b, 0]);
        }
      }
      function l() {
        this.axes.forEach((a) => {
          ((a.grid && a.grid.columns) || []).forEach((a) => {
            a.setAxisSize();
            a.setAxisTranslation();
          });
        });
      }
      function v(a) {
        const { grid: c } = this;
        (c.columns || []).forEach((c) => c.destroy(a.keepEvents));
        c.columns = void 0;
      }
      function d(a) {
        a = a.userOptions || {};
        const c = a.grid || {};
        c.enabled &&
          u(c.borderColor) &&
          (a.tickColor = a.lineColor = c.borderColor);
        this.grid || (this.grid = new Q(this));
        this.hiddenLabels = [];
        this.hiddenMarks = [];
      }
      function h(a) {
        var d = this.label;
        const f = this.axis;
        var b = f.reversed,
          g = f.chart,
          k = f.options.grid || {};
        const h = f.options.labels,
          l = h.align;
        var e = N[f.side],
          n = a.tickmarkOffset,
          r = f.tickPositions;
        const m = this.pos - n;
        r = c(r[a.index + 1]) ? r[a.index + 1] - n : (f.max || 0) + n;
        var v = f.tickSize("tick");
        n = v ? v[0] : 0;
        v = v ? v[1] / 2 : 0;
        if (!0 === k.enabled) {
          let c;
          "top" === e
            ? ((k = f.top + f.offset), (c = k - n))
            : "bottom" === e
            ? ((c = g.chartHeight - f.bottom + f.offset), (k = c + n))
            : ((k = f.top + f.len - (f.translate(b ? r : m) || 0)),
              (c = f.top + f.len - (f.translate(b ? m : r) || 0)));
          "right" === e
            ? ((e = g.chartWidth - f.right + f.offset), (b = e + n))
            : "left" === e
            ? ((b = f.left + f.offset), (e = b - n))
            : ((e = Math.round(f.left + (f.translate(b ? r : m) || 0)) - v),
              (b = Math.min(
                Math.round(f.left + (f.translate(b ? m : r) || 0)) - v,
                f.left + f.len
              )));
          this.slotWidth = b - e;
          a.pos.x = "left" === l ? e : "right" === l ? b : e + (b - e) / 2;
          a.pos.y = c + (k - c) / 2;
          d &&
            ((g = g.renderer.fontMetrics(d)),
            (d = d.getBBox().height),
            (a.pos.y = h.useHTML
              ? a.pos.y + (g.b + -(d / 2))
              : a.pos.y +
                ((g.b - (g.h - g.f)) / 2 +
                  -(((Math.round(d / g.h) - 1) * g.h) / 2))));
          a.pos.x += (f.horiz && h.x) || 0;
        }
      }
      function t(a) {
        const { axis: c, value: d } = a;
        if (c.options.grid && c.options.grid.enabled) {
          var b = c.tickPositions;
          const k = (c.linkedParent || c).series[0],
            h = d === b[0];
          b = d === b[b.length - 1];
          const l =
            k &&
            g(k.options.data, function (a) {
              return a[c.isXAxis ? "x" : "y"] === d;
            });
          let e;
          l &&
            k.is("gantt") &&
            ((e = f(l)),
            B.seriesTypes.gantt.prototype.pointClass.setGanttPointAliases(e));
          a.isFirst = h;
          a.isLast = b;
          a.point = e;
        }
      }
      function M() {
        const a = this.options,
          c = this.categories,
          d = this.tickPositions,
          f = d[0],
          b = d[d.length - 1],
          g = (this.linkedParent && this.linkedParent.min) || this.min,
          k = (this.linkedParent && this.linkedParent.max) || this.max,
          h = this.tickInterval;
        !0 !== (a.grid || {}).enabled ||
          c ||
          (!this.horiz && !this.isLinked) ||
          (f < g && f + h > g && !a.startOnTick && (d[0] = g),
          b > k && b - h < k && !a.endOnTick && (d[d.length - 1] = k));
      }
      function G(a) {
        const {
          options: { grid: c = {} },
        } = this;
        return !0 === c.enabled && this.categories
          ? this.tickInterval
          : a.apply(this, Array.prototype.slice.call(arguments, 1));
      }
      const { dateFormats: n } = B,
        {
          addEvent: a,
          defined: u,
          erase: A,
          find: g,
          isArray: k,
          isNumber: c,
          merge: f,
          pick: w,
          timeUnits: C,
          wrap: P,
        } = z;
      var N;
      (function (a) {
        a[(a.top = 0)] = "top";
        a[(a.right = 1)] = "right";
        a[(a.bottom = 2)] = "bottom";
        a[(a.left = 3)] = "left";
      })(N || (N = {}));
      const O = [];
      class Q {
        constructor(a) {
          this.axis = a;
        }
        isOuterAxis() {
          const a = this.axis,
            d = a.grid.columnIndex,
            f =
              (a.linkedParent && a.linkedParent.grid.columns) || a.grid.columns,
            b = d ? a.linkedParent : a;
          let g = -1,
            k = 0;
          (a.chart[a.coll] || []).forEach((c, d) => {
            c.side !== a.side ||
              c.options.isInternal ||
              ((k = d), c === b && (g = d));
          });
          return k === g && (c(d) ? f.length === d : !0);
        }
        renderBorder(a) {
          const c = this.axis,
            d = c.chart.renderer,
            f = c.options;
          a = d.path(a).addClass("highcharts-axis-line").add(c.axisBorder);
          d.styledMode ||
            a.attr({
              stroke: f.lineColor,
              "stroke-width": f.lineWidth,
              zIndex: 7,
            });
          return a;
        }
      }
      n.E = function (a) {
        return this.dateFormat("%a", a, !0).charAt(0);
      };
      n.W = function (a) {
        const c = this,
          d = new this.Date(a);
        ["Hours", "Milliseconds", "Minutes", "Seconds"].forEach(function (a) {
          c.set(a, d, 0);
        });
        var f = (this.get("Day", d) + 6) % 7;
        a = new this.Date(d.valueOf());
        this.set("Date", a, this.get("Date", d) - f + 3);
        f = new this.Date(this.get("FullYear", a), 0, 1);
        4 !== this.get("Day", f) &&
          (this.set("Month", d, 0),
          this.set("Date", d, 1 + ((11 - this.get("Day", f)) % 7)));
        return (
          1 + Math.floor((a.valueOf() - f.valueOf()) / 6048e5)
        ).toString();
      };
      ("");
      return {
        compose: function (c, f, g) {
          z.pushUnique(O, c) &&
            (c.keepProps.push("grid"),
            (c.prototype.getMaxLabelDimensions = F),
            P(c.prototype, "unsquish", G),
            a(c, "init", d),
            a(c, "afterGetOffset", E),
            a(c, "afterGetTitlePosition", D),
            a(c, "afterInit", p),
            a(c, "afterRender", x),
            a(c, "afterSetAxisTranslation", y),
            a(c, "afterSetOptions", b),
            a(c, "afterSetOptions", m),
            a(c, "afterSetScale", q),
            a(c, "afterTickSize", J),
            a(c, "trimTicks", M),
            a(c, "destroy", v));
          z.pushUnique(O, f) && a(f, "afterSetChartSize", l);
          z.pushUnique(O, g) &&
            (a(g, "afterGetLabelPosition", h), a(g, "labelFormat", t));
          return c;
        },
      };
    }
  );
  K(e, "Gantt/Tree.js", [e["Core/Utilities.js"]], function (e) {
    const { extend: B, isNumber: z, pick: F } = e,
      E = function (e, x) {
        const p = e.reduce(function (b, e) {
          const m = F(e.parent, "");
          "undefined" === typeof b[m] && (b[m] = []);
          b[m].push(e);
          return b;
        }, {});
        Object.keys(p).forEach(function (b, e) {
          const m = p[b];
          "" !== b &&
            -1 === x.indexOf(b) &&
            (m.forEach(function (b) {
              e[""].push(b);
            }),
            delete e[b]);
        });
        return p;
      },
      D = function (e, x, y, b, m, q) {
        let p = 0,
          l = 0,
          v = q && q.after;
        var d = q && q.before;
        x = { data: b, depth: y - 1, id: e, level: y, parent: x };
        let h, t;
        "function" === typeof d && d(x, q);
        d = (m[e] || []).map(function (d) {
          const b = D(d.id, e, y + 1, d, m, q),
            n = d.start;
          d = !0 === d.milestone ? n : d.end;
          h = !z(h) || n < h ? n : h;
          t = !z(t) || d > t ? d : t;
          p = p + 1 + b.descendants;
          l = Math.max(b.height + 1, l);
          return b;
        });
        b && ((b.start = F(b.start, h)), (b.end = F(b.end, t)));
        B(x, { children: d, descendants: p, height: l });
        "function" === typeof v && v(x, q);
        return x;
      };
    return {
      getListOfParents: E,
      getNode: D,
      getTree: function (e, x) {
        const p = e.map(function (b) {
          return b.id;
        });
        e = E(e, p);
        return D("", null, 1, null, e, x);
      },
    };
  });
  K(
    e,
    "Core/Axis/TreeGrid/TreeGridTick.js",
    [e["Core/Utilities.js"]],
    function (e) {
      function B() {
        this.treeGrid || (this.treeGrid = new q(this));
      }
      function z(b, e) {
        b = b.treeGrid;
        const l = !b.labelIcon,
          d = e.renderer;
        var h = e.xy;
        const m = e.options,
          q = m.width || 0,
          p = m.height || 0;
        var n = h.x - q / 2 - (m.padding || 0);
        h = h.y - p / 2;
        const a = e.collapsed ? 90 : 180,
          u = e.show && x(h);
        let A = b.labelIcon;
        A ||
          (b.labelIcon = A =
            d
              .path(d.symbols[m.type](m.x || 0, m.y || 0, q, p))
              .addClass("highcharts-label-icon")
              .add(e.group));
        A[u ? "show" : "hide"]();
        d.styledMode ||
          A.attr({
            cursor: "pointer",
            fill: y(e.color, "#666666"),
            "stroke-width": 1,
            stroke: m.lineColor,
            strokeWidth: m.lineWidth || 0,
          });
        A[l ? "attr" : "animate"]({
          translateX: n,
          translateY: h,
          rotation: a,
        });
      }
      function F(b, e, m, d, h, t, q, G, n) {
        var a = y(this.options && this.options.labels, t);
        t = this.pos;
        var l = this.axis;
        const v = "treegrid" === l.options.type;
        b = b.apply(this, [e, m, d, h, a, q, G, n]);
        v &&
          ((e = a && p(a.symbol, !0) ? a.symbol : {}),
          (a = a && x(a.indentation) ? a.indentation : 0),
          (t =
            ((t = (l = l.treeGrid.mapOfPosToGridNode) && l[t]) && t.depth) ||
            1),
          (b.x += (e.width || 0) + 2 * (e.padding || 0) + (t - 1) * a));
        return b;
      }
      function E(b) {
        const e = this;
        var m = e.pos,
          d = e.axis;
        const h = e.label;
        var t = d.treeGrid.mapOfPosToGridNode,
          q = d.options;
        const x = y(e.options && e.options.labels, q && q.labels);
        var n = x && p(x.symbol, !0) ? x.symbol : {};
        const a = (t = t && t[m]) && t.depth;
        q = "treegrid" === q.type;
        const u = -1 < d.tickPositions.indexOf(m);
        m = d.chart.styledMode;
        q &&
          t &&
          h &&
          h.element &&
          h.addClass("highcharts-treegrid-node-level-" + a);
        b.apply(e, Array.prototype.slice.call(arguments, 1));
        q &&
          h &&
          h.element &&
          t &&
          t.descendants &&
          0 < t.descendants &&
          ((d = d.treeGrid.isCollapsed(t)),
          z(e, {
            color: (!m && h.styles && h.styles.color) || "",
            collapsed: d,
            group: h.parentGroup,
            options: n,
            renderer: h.renderer,
            show: u,
            xy: h.xy,
          }),
          (n = "highcharts-treegrid-node-" + (d ? "expanded" : "collapsed")),
          h
            .addClass(
              "highcharts-treegrid-node-" + (d ? "collapsed" : "expanded")
            )
            .removeClass(n),
          m || h.css({ cursor: "pointer" }),
          [h, e.treeGrid.labelIcon].forEach((a) => {
            a &&
              !a.attachedTreeGridEvents &&
              (D(a.element, "mouseover", function () {
                h.addClass("highcharts-treegrid-node-active");
                h.renderer.styledMode || h.css({ textDecoration: "underline" });
              }),
              D(a.element, "mouseout", function () {
                {
                  const a = p(x.style) ? x.style : {};
                  h.removeClass("highcharts-treegrid-node-active");
                  h.renderer.styledMode ||
                    h.css({ textDecoration: a.textDecoration });
                }
              }),
              D(a.element, "click", function () {
                e.treeGrid.toggleCollapse();
              }),
              (a.attachedTreeGridEvents = !0));
          }));
      }
      const { addEvent: D, isObject: p, isNumber: x, pick: y, wrap: b } = e,
        m = [];
      class q {
        static compose(q) {
          e.pushUnique(m, q) &&
            (D(q, "init", B),
            b(q.prototype, "getLabelPosition", F),
            b(q.prototype, "renderLabel", E),
            (q.prototype.collapse = function (b) {
              this.treeGrid.collapse(b);
            }),
            (q.prototype.expand = function (b) {
              this.treeGrid.expand(b);
            }),
            (q.prototype.toggleCollapse = function (b) {
              this.treeGrid.toggleCollapse(b);
            }));
        }
        constructor(b) {
          this.tick = b;
        }
        collapse(b) {
          var e = this.tick;
          const m = e.axis,
            d = m.brokenAxis;
          d &&
            m.treeGrid.mapOfPosToGridNode &&
            ((e = m.treeGrid.collapse(m.treeGrid.mapOfPosToGridNode[e.pos])),
            d.setBreaks(e, y(b, !0)));
        }
        destroy() {
          this.labelIcon && this.labelIcon.destroy();
        }
        expand(b) {
          var e = this.tick;
          const m = e.axis,
            d = m.brokenAxis;
          d &&
            m.treeGrid.mapOfPosToGridNode &&
            ((e = m.treeGrid.expand(m.treeGrid.mapOfPosToGridNode[e.pos])),
            d.setBreaks(e, y(b, !0)));
        }
        toggleCollapse(b) {
          var e = this.tick;
          const m = e.axis,
            d = m.brokenAxis;
          d &&
            m.treeGrid.mapOfPosToGridNode &&
            ((e = m.treeGrid.toggleCollapse(
              m.treeGrid.mapOfPosToGridNode[e.pos]
            )),
            d.setBreaks(e, y(b, !0)));
        }
      }
      return q;
    }
  );
  K(
    e,
    "Series/TreeUtilities.js",
    [e["Core/Color/Color.js"], e["Core/Utilities.js"]],
    function (e, B) {
      function z(b, e) {
        var m = e.before;
        const p = e.idRoot,
          l = e.mapIdToNode[p],
          v = e.points[b.i],
          d = (v && v.options) || {},
          h = [];
        let t = 0;
        b.levelDynamic = b.level - (!1 !== e.levelIsConstant ? 0 : l.level);
        b.name = y(v && v.name, "");
        b.visible = p === b.id || !0 === e.visible;
        "function" === typeof m && (b = m(b, e));
        b.children.forEach((d, m) => {
          const n = F({}, e);
          F(n, { index: m, siblings: b.children.length, visible: b.visible });
          d = z(d, n);
          h.push(d);
          d.visible && (t += d.val);
        });
        m = y(d.value, t);
        b.visible = 0 <= m && (0 < t || b.visible);
        b.children = h;
        b.childrenTotal = t;
        b.isLeaf = b.visible && !t;
        b.val = m;
        return b;
      }
      const {
        extend: F,
        isArray: E,
        isNumber: D,
        isObject: p,
        merge: x,
        pick: y,
      } = B;
      return {
        getColor: function (b, m) {
          const q = m.index;
          var p = m.mapOptionsToLevel;
          const l = m.parentColor,
            v = m.parentColorIndex,
            d = m.series;
          var h = m.colors;
          const t = m.siblings;
          var x = d.points,
            z = d.chart.options.chart;
          let n;
          var a;
          let u;
          if (b) {
            x = x[b.i];
            b = p[b.level] || {};
            if ((p = x && b.colorByPoint)) {
              n = x.index % (h ? h.length : z.colorCount);
              var A = h && h[n];
            }
            if (!d.chart.styledMode) {
              h = x && x.options.color;
              z = b && b.color;
              if ((a = l))
                a =
                  (a = b && b.colorVariation) &&
                  "brightness" === a.key &&
                  q &&
                  t
                    ? e
                        .parse(l)
                        .brighten((q / t) * a.to)
                        .get()
                    : l;
              a = y(h, z, A, a, d.color);
            }
            u = y(
              x && x.options.colorIndex,
              b && b.colorIndex,
              n,
              v,
              m.colorIndex
            );
          }
          return { color: a, colorIndex: u };
        },
        getLevelOptions: function (b) {
          let e = {},
            q,
            z,
            l;
          if (p(b)) {
            l = D(b.from) ? b.from : 1;
            var v = b.levels;
            z = {};
            q = p(b.defaults) ? b.defaults : {};
            E(v) &&
              (z = v.reduce((d, b) => {
                let e, h;
                p(b) &&
                  D(b.level) &&
                  ((h = x({}, b)),
                  (e = y(h.levelIsConstant, q.levelIsConstant)),
                  delete h.levelIsConstant,
                  delete h.level,
                  (b = b.level + (e ? 0 : l - 1)),
                  p(d[b]) ? x(!0, d[b], h) : (d[b] = h));
                return d;
              }, {}));
            v = D(b.to) ? b.to : 1;
            for (b = 0; b <= v; b++) e[b] = x({}, q, p(z[b]) ? z[b] : {});
          }
          return e;
        },
        setTreeValues: z,
        updateRootId: function (b) {
          if (p(b)) {
            var e = p(b.options) ? b.options : {};
            e = y(b.rootNode, e.rootId, "");
            p(b.userOptions) && (b.userOptions.rootId = e);
            b.rootNode = e;
          }
          return e;
        },
      };
    }
  );
  K(
    e,
    "Core/Axis/TreeGrid/TreeGridAxis.js",
    [
      e["Core/Axis/BrokenAxis.js"],
      e["Core/Axis/GridAxis.js"],
      e["Gantt/Tree.js"],
      e["Core/Axis/TreeGrid/TreeGridTick.js"],
      e["Series/TreeUtilities.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z, H, E, D) {
      function p(a, c) {
        const d = a.collapseEnd || 0;
        a = a.collapseStart || 0;
        d >= c && (a -= 0.5);
        return { from: a, to: d, showPoints: !1 };
      }
      function x(a, c, d) {
        const f = [],
          b = [],
          g = {},
          k = "boolean" === typeof c ? c : !1;
        let e = {},
          h = -1;
        a = z.getTree(a, {
          after: function (a) {
            a = e[a.pos];
            let c = 0,
              d = 0;
            a.children.forEach(function (a) {
              d += (a.descendants || 0) + 1;
              c = Math.max((a.height || 0) + 1, c);
            });
            a.descendants = d;
            a.height = c;
            a.collapsed && b.push(a);
          },
          before: function (a) {
            const c = t(a.data, !0) ? a.data : {},
              d = M(c.name) ? c.name : "";
            var b = g[a.parent];
            b = t(b, !0) ? e[b.pos] : null;
            var m = function (a) {
              return a.name === d;
            };
            let n;
            k && t(b, !0) && (n = v(b.children, m))
              ? ((m = n.pos), n.nodes.push(a))
              : (m = h++);
            e[m] ||
              ((e[m] = n =
                {
                  depth: b ? b.depth + 1 : 0,
                  name: d,
                  id: c.id,
                  nodes: [a],
                  children: [],
                  pos: m,
                }),
              -1 !== m && f.push(d),
              t(b, !0) && b.children.push(n));
            M(a.id) && (g[a.id] = a);
            n && !0 === c.collapsed && (n.collapsed = !0);
            a.pos = m;
          },
        });
        e = (function (a, c) {
          const d = function (a, f, b) {
            let g = f + (-1 === f ? 0 : c - 1);
            const e = (g - f) / 2,
              k = f + e;
            a.nodes.forEach(function (a) {
              const c = a.data;
              t(c, !0) &&
                ((c.y = f + (c.seriesIndex || 0)), delete c.seriesIndex);
              a.pos = k;
            });
            b[k] = a;
            a.pos = k;
            a.tickmarkOffset = e + 0.5;
            a.collapseStart = g + 0.5;
            a.children.forEach(function (a) {
              d(a, g + 1, b);
              g = (a.collapseEnd || 0) - 0.5;
            });
            a.collapseEnd = g + 0.5;
            return b;
          };
          return d(a["-1"], -1, {});
        })(e, d);
        return {
          categories: f,
          mapOfIdToNode: g,
          mapOfPosToGridNode: e,
          collapsedNodes: b,
          tree: a,
        };
      }
      function y(a) {
        a.target.axes
          .filter(function (a) {
            return "treegrid" === a.options.type;
          })
          .forEach(function (c) {
            var d = c.options || {};
            const b = d.labels,
              g = d.uniqueNames;
            d = d.max;
            let e = 0,
              k;
            if (
              !c.treeGrid.mapOfPosToGridNode ||
              c.series.some(function (a) {
                return !a.hasRendered || a.isDirtyData || a.isDirty;
              })
            ) {
              k = c.series.reduce(function (a, c) {
                c.visible &&
                  ((c.options.data || []).forEach(function (d) {
                    c.options.keys &&
                      c.options.keys.length &&
                      ((d = c.pointClass.prototype.optionsToObject.call(
                        { series: c },
                        d
                      )),
                      c.pointClass.setGanttPointAliases(d));
                    t(d, !0) && ((d.seriesIndex = e), a.push(d));
                  }),
                  !0 === g && e++);
                return a;
              }, []);
              if (d && k.length < d)
                for (let a = k.length; a <= d; a++)
                  k.push({ name: a + "\u200b" });
              d = x(k, g || !1, !0 === g ? e : 1);
              c.categories = d.categories;
              c.treeGrid.mapOfPosToGridNode = d.mapOfPosToGridNode;
              c.hasNames = !0;
              c.treeGrid.tree = d.tree;
              c.series.forEach(function (a) {
                const c = (a.options.data || []).map(function (c) {
                  h(c) &&
                    a.options.keys &&
                    a.options.keys.length &&
                    k.forEach(function (a) {
                      0 <= c.indexOf(a.x) && 0 <= c.indexOf(a.x2) && (c = a);
                    });
                  return t(c, !0) ? G(c) : c;
                });
                a.visible && a.setData(c, !1);
              });
              c.treeGrid.mapOptionsToLevel = J({
                defaults: b,
                from: 1,
                levels: b && b.levels,
                to: c.treeGrid.tree && c.treeGrid.tree.height,
              });
              "beforeRender" === a.type &&
                (c.treeGrid.collapsedNodes = d.collapsedNodes);
            }
          });
      }
      function b(a, c) {
        var d = this.treeGrid.mapOptionsToLevel || {};
        const b = this.ticks;
        let g = b[c],
          e,
          k;
        "treegrid" === this.options.type && this.treeGrid.mapOfPosToGridNode
          ? ((k = this.treeGrid.mapOfPosToGridNode[c]),
            (d = d[k.depth]) && (e = { labels: d }),
            !g && A
              ? (b[c] = new A(this, c, void 0, void 0, {
                  category: k.name,
                  tickmarkOffset: k.tickmarkOffset,
                  options: e,
                }))
              : ((g.parameters.category = k.name),
                (g.options = e),
                g.addLabel()))
          : a.apply(this, Array.prototype.slice.call(arguments, 1));
      }
      function m(a, c, d) {
        const b = this,
          f = "treegrid" === d.type;
        b.treeGrid || (b.treeGrid = new g(b));
        f &&
          (l(c, "beforeRender", y),
          l(c, "beforeRedraw", y),
          l(c, "addSeries", function (a) {
            a.options.data &&
              ((a = x(a.options.data, d.uniqueNames || !1, 1)),
              (b.treeGrid.collapsedNodes = (
                b.treeGrid.collapsedNodes || []
              ).concat(a.collapsedNodes)));
          }),
          l(b, "foundExtremes", function () {
            b.treeGrid.collapsedNodes &&
              b.treeGrid.collapsedNodes.forEach(function (a) {
                const c = b.treeGrid.collapse(a);
                b.brokenAxis &&
                  (b.brokenAxis.setBreaks(c, !1),
                  b.treeGrid.collapsedNodes &&
                    (b.treeGrid.collapsedNodes =
                      b.treeGrid.collapsedNodes.filter(
                        (c) =>
                          a.collapseStart !== c.collapseStart ||
                          a.collapseEnd !== c.collapseEnd
                      )));
              });
          }),
          l(b, "afterBreaks", function () {
            "yAxis" === b.coll &&
              !b.staticScale &&
              b.chart.options.chart.height &&
              (b.isDirty = !0);
          }),
          (d = G(
            {
              grid: { enabled: !0 },
              labels: {
                align: "left",
                levels: [
                  { level: void 0 },
                  { level: 1, style: { fontWeight: "bold" } },
                ],
                symbol: {
                  type: "triangle",
                  x: -5,
                  y: -5,
                  height: 10,
                  width: 10,
                  padding: 5,
                },
              },
              uniqueNames: !1,
            },
            d,
            { reversed: !0, grid: { columns: void 0 } }
          )));
        a.apply(b, [c, d]);
        f && ((b.hasNames = !0), (b.options.showLastLabel = !0));
      }
      function q(a) {
        const c = this.options;
        "treegrid" === c.type
          ? ((this.min = n(this.userMin, c.min, this.dataMin)),
            (this.max = n(this.userMax, c.max, this.dataMax)),
            d(this, "foundExtremes"),
            this.setAxisTranslation(),
            (this.tickmarkOffset = 0.5),
            (this.tickInterval = 1),
            (this.tickPositions = this.treeGrid.mapOfPosToGridNode
              ? this.treeGrid.getTickPositions()
              : []))
          : a.apply(this, Array.prototype.slice.call(arguments, 1));
      }
      const { getLevelOptions: J } = E,
        {
          addEvent: l,
          find: v,
          fireEvent: d,
          isArray: h,
          isObject: t,
          isString: M,
          merge: G,
          pick: n,
          wrap: a,
        } = D,
        u = [];
      let A;
      class g {
        static compose(d, c, f, g) {
          if (D.pushUnique(u, d)) {
            -1 === d.keepProps.indexOf("treeGrid") &&
              d.keepProps.push("treeGrid");
            const c = d.prototype;
            a(c, "generateTick", b);
            a(c, "init", m);
            a(c, "setTickInterval", q);
            c.utils = { getNode: z.getNode };
          }
          D.pushUnique(u, g) && (A || (A = g));
          B.compose(d, c, g);
          e.compose(d, f);
          H.compose(g);
          return d;
        }
        constructor(a) {
          this.axis = a;
        }
        setCollapsedStatus(a) {
          const c = this.axis,
            d = c.chart;
          c.series.forEach(function (c) {
            const b = c.options.data;
            if (a.id && b) {
              const f = d.get(a.id);
              c = b[c.data.indexOf(f)];
              f &&
                c &&
                ((f.collapsed = a.collapsed), (c.collapsed = a.collapsed));
            }
          });
        }
        collapse(a) {
          const c = this.axis,
            d = c.options.breaks || [],
            b = p(a, c.max);
          d.push(b);
          a.collapsed = !0;
          c.treeGrid.setCollapsedStatus(a);
          return d;
        }
        expand(a) {
          const c = this.axis,
            d = c.options.breaks || [],
            b = p(a, c.max);
          a.collapsed = !1;
          c.treeGrid.setCollapsedStatus(a);
          return d.reduce(function (a, c) {
            (c.to === b.to && c.from === b.from) || a.push(c);
            return a;
          }, []);
        }
        getTickPositions() {
          const a = this.axis,
            c = Math.floor(a.min / a.tickInterval) * a.tickInterval,
            d = Math.ceil(a.max / a.tickInterval) * a.tickInterval;
          return Object.keys(a.treeGrid.mapOfPosToGridNode || {}).reduce(
            function (b, f) {
              f = +f;
              !(f >= c && f <= d) ||
                (a.brokenAxis && a.brokenAxis.isInAnyBreak(f)) ||
                b.push(f);
              return b;
            },
            []
          );
        }
        isCollapsed(a) {
          const c = this.axis,
            d = c.options.breaks || [],
            b = p(a, c.max);
          return d.some(function (a) {
            return a.from === b.from && a.to === b.to;
          });
        }
        toggleCollapse(a) {
          return this.isCollapsed(a) ? this.expand(a) : this.collapse(a);
        }
      }
      return g;
    }
  );
  K(
    e,
    "Extensions/StaticScale.js",
    [e["Core/Axis/Axis.js"], e["Core/Chart/Chart.js"], e["Core/Utilities.js"]],
    function (e, B, z) {
      const { addEvent: F, defined: E, isNumber: D, pick: p } = z;
      F(e, "afterSetOptions", function () {
        const e = this.chart.options.chart;
        !this.horiz &&
          D(this.options.staticScale) &&
          (!e.height ||
            (e.scrollablePlotArea && e.scrollablePlotArea.minHeight)) &&
          (this.staticScale = this.options.staticScale);
      });
      B.prototype.adjustHeight = function () {
        "adjustHeight" !== this.redrawTrigger &&
          ((this.axes || []).forEach(function (e) {
            let y = e.chart,
              b = !!y.initiatedScale && y.options.animation;
            var m = e.options.staticScale;
            let q;
            e.staticScale &&
              E(e.min) &&
              ((q =
                p(
                  e.brokenAxis && e.brokenAxis.unitLength,
                  e.max + e.tickInterval - e.min
                ) * m),
              (q = Math.max(q, m)),
              (m = q - y.plotHeight),
              !y.scrollablePixelsY &&
                1 <= Math.abs(m) &&
                ((y.plotHeight = q),
                (y.redrawTrigger = "adjustHeight"),
                y.setSize(void 0, y.chartHeight + m, b)),
              e.series.forEach(function (b) {
                (b = b.sharedClipKey && y.sharedClips[b.sharedClipKey]) &&
                  b.attr(
                    y.inverted
                      ? { width: y.plotHeight }
                      : { height: y.plotHeight }
                  );
              }));
          }),
          (this.initiatedScale = !0));
        this.redrawTrigger = null;
      };
      F(B, "render", B.prototype.adjustHeight);
    }
  );
  K(
    e,
    "Gantt/Connection.js",
    [
      e["Core/Defaults.js"],
      e["Core/Globals.js"],
      e["Core/Series/Point.js"],
      e["Core/Utilities.js"],
    ],
    function (e, B, z, H) {
      function F(b) {
        var d = b.shapeArgs;
        return d
          ? {
              xMin: d.x || 0,
              xMax: (d.x || 0) + (d.width || 0),
              yMin: d.y || 0,
              yMax: (d.y || 0) + (d.height || 0),
            }
          : (d = b.graphic && b.graphic.getBBox())
          ? {
              xMin: b.plotX - d.width / 2,
              xMax: b.plotX + d.width / 2,
              yMin: b.plotY - d.height / 2,
              yMax: b.plotY + d.height / 2,
            }
          : null;
      }
      ({ defaultOptions: e } = e);
      const { defined: D, error: p, extend: x, merge: y, objectEach: b } = H;
      ("");
      const m = B.deg2rad,
        q = Math.max,
        J = Math.min;
      x(e, {
        connectors: {
          type: "straight",
          lineWidth: 1,
          marker: {
            enabled: !1,
            align: "center",
            verticalAlign: "middle",
            inside: !1,
            lineWidth: 1,
          },
          startMarker: { symbol: "diamond" },
          endMarker: { symbol: "arrow-filled" },
        },
      });
      class l {
        constructor(b, d, e) {
          this.toPoint =
            this.pathfinder =
            this.graphics =
            this.fromPoint =
            this.chart =
              void 0;
          this.init(b, d, e);
        }
        init(b, d, e) {
          this.fromPoint = b;
          this.toPoint = d;
          this.options = e;
          this.chart = b.series.chart;
          this.pathfinder = this.chart.pathfinder;
        }
        renderPath(b, d, e) {
          let h = this.chart,
            m = h.styledMode,
            l = h.pathfinder,
            n = !h.options.chart.forExport && !1 !== e,
            a = this.graphics && this.graphics.path;
          l.group ||
            (l.group = h.renderer
              .g()
              .addClass("highcharts-pathfinder-group")
              .attr({ zIndex: -1 })
              .add(h.seriesGroup));
          l.group.translate(h.plotLeft, h.plotTop);
          (a && a.renderer) ||
            ((a = h.renderer.path().add(l.group)), m || a.attr({ opacity: 0 }));
          a.attr(d);
          b = { d: b };
          m || (b.opacity = 1);
          a[n ? "animate" : "attr"](b, e);
          this.graphics = this.graphics || {};
          this.graphics.path = a;
        }
        addMarker(b, d, e) {
          var h = this.fromPoint.series.chart;
          let l = h.pathfinder;
          h = h.renderer;
          let v = "start" === b ? this.fromPoint : this.toPoint;
          var n = v.getPathfinderAnchorPoint(d);
          let a, q;
          d.enabled &&
            (((e = "start" === b ? e[1] : e[e.length - 2]) && "M" === e[0]) ||
              "L" === e[0]) &&
            ((e = { x: e[1], y: e[2] }),
            (e = v.getRadiansToVector(e, n)),
            (n = v.getMarkerVector(e, d.radius, n)),
            (e = -e / m),
            d.width && d.height
              ? ((a = d.width), (q = d.height))
              : (a = q = 2 * d.radius),
            (this.graphics = this.graphics || {}),
            (n = {
              x: n.x - a / 2,
              y: n.y - q / 2,
              width: a,
              height: q,
              rotation: e,
              rotationOriginX: n.x,
              rotationOriginY: n.y,
            }),
            this.graphics[b]
              ? this.graphics[b].animate(n)
              : ((this.graphics[b] = h
                  .symbol(d.symbol)
                  .addClass("highcharts-point-connecting-path-" + b + "-marker")
                  .attr(n)
                  .add(l.group)),
                h.styledMode ||
                  this.graphics[b]
                    .attr({
                      fill: d.color || this.fromPoint.color,
                      stroke: d.lineColor,
                      "stroke-width": d.lineWidth,
                      opacity: 0,
                    })
                    .animate({ opacity: 1 }, v.series.options.animation)));
        }
        getPath(b) {
          let d = this.pathfinder,
            e = this.chart,
            m = d.algorithms[b.type],
            l = d.chartObstacles;
          if ("function" !== typeof m)
            return (
              p('"' + b.type + '" is not a Pathfinder algorithm.'),
              { path: [], obstacles: [] }
            );
          m.requiresObstacles &&
            !l &&
            ((l = d.chartObstacles = d.getChartObstacles(b)),
            (e.options.connectors.algorithmMargin = b.algorithmMargin),
            (d.chartObstacleMetrics = d.getObstacleMetrics(l)));
          return m(
            this.fromPoint.getPathfinderAnchorPoint(b.startMarker),
            this.toPoint.getPathfinderAnchorPoint(b.endMarker),
            y(
              {
                chartObstacles: l,
                lineObstacles: d.lineObstacles || [],
                obstacleMetrics: d.chartObstacleMetrics,
                hardBounds: {
                  xMin: 0,
                  xMax: e.plotWidth,
                  yMin: 0,
                  yMax: e.plotHeight,
                },
                obstacleOptions: { margin: b.algorithmMargin },
                startDirectionX: d.getAlgorithmStartDirection(b.startMarker),
              },
              b
            )
          );
        }
        render() {
          var b = this.fromPoint;
          let d = b.series;
          var e = d.chart;
          let m = e.pathfinder,
            l = y(
              e.options.connectors,
              d.options.connectors,
              b.options.connectors,
              this.options
            ),
            p = {};
          e.styledMode ||
            ((p.stroke = l.lineColor || b.color),
            (p["stroke-width"] = l.lineWidth),
            l.dashStyle && (p.dashstyle = l.dashStyle));
          p["class"] =
            "highcharts-point-connecting-path highcharts-color-" + b.colorIndex;
          l = y(p, l);
          D(l.marker.radius) ||
            (l.marker.radius = J(
              q(Math.ceil((l.algorithmMargin || 8) / 2) - 1, 1),
              5
            ));
          b = this.getPath(l);
          e = b.path;
          b.obstacles &&
            ((m.lineObstacles = m.lineObstacles || []),
            (m.lineObstacles = m.lineObstacles.concat(b.obstacles)));
          this.renderPath(e, p, d.options.animation);
          this.addMarker("start", y(l.marker, l.startMarker), e);
          this.addMarker("end", y(l.marker, l.endMarker), e);
        }
        destroy() {
          this.graphics &&
            (b(this.graphics, function (b) {
              b.destroy();
            }),
            delete this.graphics);
        }
      }
      B.Connection = l;
      x(z.prototype, {
        getPathfinderAnchorPoint: function (b) {
          let d = F(this),
            e,
            m;
          switch (b.align) {
            case "right":
              e = "xMax";
              break;
            case "left":
              e = "xMin";
          }
          switch (b.verticalAlign) {
            case "top":
              m = "yMin";
              break;
            case "bottom":
              m = "yMax";
          }
          return {
            x: e ? d[e] : (d.xMin + d.xMax) / 2,
            y: m ? d[m] : (d.yMin + d.yMax) / 2,
          };
        },
        getRadiansToVector: function (b, d) {
          let e;
          D(d) ||
            ((e = F(this)) &&
              (d = { x: (e.xMin + e.xMax) / 2, y: (e.yMin + e.yMax) / 2 }));
          return Math.atan2(d.y - b.y, b.x - d.x);
        },
        getMarkerVector: function (b, d, e) {
          var h = 2 * Math.PI,
            m = F(this),
            l = m.xMax - m.xMin;
          let n = m.yMax - m.yMin,
            a = Math.atan2(n, l),
            q = !1;
          l /= 2;
          let p = n / 2,
            g = m.xMin + l;
          m = m.yMin + p;
          var k = g,
            c = m;
          let f = 1,
            v = 1;
          for (; b < -Math.PI; ) b += h;
          for (; b > Math.PI; ) b -= h;
          h = Math.tan(b);
          b > -a && b <= a
            ? ((v = -1), (q = !0))
            : b > a && b <= Math.PI - a
            ? (v = -1)
            : b > Math.PI - a || b <= -(Math.PI - a)
            ? ((f = -1), (q = !0))
            : (f = -1);
          q
            ? ((k += f * l), (c += v * l * h))
            : ((k += (n / (2 * h)) * f), (c += v * p));
          e.x !== g && (k = e.x);
          e.y !== m && (c = e.y);
          return { x: k + d * Math.cos(b), y: c - d * Math.sin(b) };
        },
      });
      return l;
    }
  );
  K(e, "Gantt/PathfinderAlgorithms.js", [e["Core/Utilities.js"]], function (e) {
    function B(b, e, p) {
      p = p || 0;
      let m = b.length - 1;
      e -= 1e-7;
      let q, d;
      for (; p <= m; )
        if (((q = (m + p) >> 1), (d = e - b[q].xMin), 0 < d)) p = q + 1;
        else if (0 > d) m = q - 1;
        else return q;
      return 0 < p ? p - 1 : 0;
    }
    function z(b, e) {
      let m = B(b, e.x + 1) + 1;
      for (; m--; ) {
        var l;
        if ((l = b[m].xMax >= e.x))
          (l = b[m]),
            (l =
              e.x <= l.xMax && e.x >= l.xMin && e.y <= l.yMax && e.y >= l.yMin);
        if (l) return m;
      }
      return -1;
    }
    function F(b) {
      const e = [];
      if (b.length) {
        e.push(["M", b[0].start.x, b[0].start.y]);
        for (let m = 0; m < b.length; ++m)
          e.push(["L", b[m].end.x, b[m].end.y]);
      }
      return e;
    }
    function E(b, e) {
      b.yMin = x(b.yMin, e.yMin);
      b.yMax = p(b.yMax, e.yMax);
      b.xMin = x(b.xMin, e.xMin);
      b.xMax = p(b.xMax, e.xMax);
    }
    const { pick: D } = e,
      { min: p, max: x, abs: y } = Math;
    e = function (b, e, p) {
      function l(a, b, d, e, k) {
        a = { x: a.x, y: a.y };
        a[b] = d[e || b] + (k || 0);
        return a;
      }
      function m(a, b, d) {
        const e = y(b[d] - a[d + "Min"]) > y(b[d] - a[d + "Max"]);
        return l(b, d, a, d + (e ? "Max" : "Min"), e ? 1 : -1);
      }
      let d = [];
      var h = D(p.startDirectionX, y(e.x - b.x) > y(e.y - b.y)) ? "x" : "y",
        q = p.chartObstacles;
      let x = z(q, b);
      p = z(q, e);
      let B;
      if (-1 < p) {
        var n = q[p];
        p = m(n, e, h);
        n = { start: p, end: e };
        B = p;
      } else B = e;
      -1 < x &&
        ((q = q[x]),
        (p = m(q, b, h)),
        d.push({ start: b, end: p }),
        p[h] >= b[h] === p[h] >= B[h] &&
          ((h = "y" === h ? "x" : "y"),
          (e = b[h] < e[h]),
          d.push({
            start: p,
            end: l(p, h, q, h + (e ? "Max" : "Min"), e ? 1 : -1),
          }),
          (h = "y" === h ? "x" : "y")));
      b = d.length ? d[d.length - 1].end : b;
      p = l(b, h, B);
      d.push({ start: b, end: p });
      h = l(p, "y" === h ? "x" : "y", B);
      d.push({ start: p, end: h });
      d.push(n);
      return { path: F(d), obstacles: d };
    };
    e.requiresObstacles = !0;
    const b = function (b, e, J) {
      function l(a, b, c) {
        let d,
          e,
          g,
          k,
          h,
          l = a.x < b.x ? 1 : -1;
        a.x < b.x ? ((d = a), (e = b)) : ((d = b), (e = a));
        a.y < b.y ? ((k = a), (g = b)) : ((k = b), (g = a));
        for (
          h = 0 > l ? p(B(f, e.x), f.length - 1) : 0;
          f[h] && ((0 < l && f[h].xMin <= e.x) || (0 > l && f[h].xMax >= d.x));

        ) {
          if (
            f[h].xMin <= e.x &&
            f[h].xMax >= d.x &&
            f[h].yMin <= g.y &&
            f[h].yMax >= k.y
          )
            return c
              ? {
                  y: a.y,
                  x: a.x < b.x ? f[h].xMin - 1 : f[h].xMax + 1,
                  obstacle: f[h],
                }
              : {
                  x: a.x,
                  y: a.y < b.y ? f[h].yMin - 1 : f[h].yMax + 1,
                  obstacle: f[h],
                };
          h += l;
        }
        return b;
      }
      function m(a, b, c, d, f) {
        var e = f.soft,
          g = f.hard;
        let h = d ? "x" : "y",
          k = { x: b.x, y: b.y },
          m = { x: b.x, y: b.y };
        f = a[h + "Max"] >= e[h + "Max"];
        e = a[h + "Min"] <= e[h + "Min"];
        let n = a[h + "Max"] >= g[h + "Max"];
        g = a[h + "Min"] <= g[h + "Min"];
        let p = y(a[h + "Min"] - b[h]),
          u = y(a[h + "Max"] - b[h]);
        c = 10 > y(p - u) ? b[h] < c[h] : u < p;
        m[h] = a[h + "Min"];
        k[h] = a[h + "Max"];
        a = l(b, m, d)[h] !== m[h];
        b = l(b, k, d)[h] !== k[h];
        c = a ? (b ? c : !0) : b ? !1 : c;
        c = e ? (f ? c : !0) : f ? !1 : c;
        return g ? (n ? c : !0) : n ? !1 : c;
      }
      function d(b, e, h) {
        if (b.x === e.x && b.y === e.y) return [];
        var n = h ? "x" : "y";
        let u,
          q,
          w,
          v = J.obstacleOptions.margin;
        var t = {
          soft: { xMin: A, xMax: g, yMin: k, yMax: c },
          hard: J.hardBounds,
        };
        u = z(f, b);
        -1 < u
          ? ((u = f[u]),
            (t = m(u, b, e, h, t)),
            E(u, J.hardBounds),
            (w = h
              ? { y: b.y, x: u[t ? "xMax" : "xMin"] + (t ? 1 : -1) }
              : { x: b.x, y: u[t ? "yMax" : "yMin"] + (t ? 1 : -1) }),
            (q = z(f, w)),
            -1 < q &&
              ((q = f[q]),
              E(q, J.hardBounds),
              (w[n] = t
                ? x(u[n + "Max"] - v + 1, (q[n + "Min"] + u[n + "Max"]) / 2)
                : p(u[n + "Min"] + v - 1, (q[n + "Max"] + u[n + "Min"]) / 2)),
              b.x === w.x && b.y === w.y
                ? (a &&
                    (w[n] = t
                      ? x(u[n + "Max"], q[n + "Max"]) + 1
                      : p(u[n + "Min"], q[n + "Min"]) - 1),
                  (a = !a))
                : (a = !1)),
            (b = [{ start: b, end: w }]))
          : ((n = l(b, { x: h ? e.x : b.x, y: h ? b.y : e.y }, h)),
            (b = [{ start: b, end: { x: n.x, y: n.y } }]),
            n[h ? "x" : "y"] !== e[h ? "x" : "y"] &&
              ((t = m(n.obstacle, n, e, !h, t)),
              E(n.obstacle, J.hardBounds),
              (t = {
                x: h ? n.x : n.obstacle[t ? "xMax" : "xMin"] + (t ? 1 : -1),
                y: h ? n.obstacle[t ? "yMax" : "yMin"] + (t ? 1 : -1) : n.y,
              }),
              (h = !h),
              (b = b.concat(d({ x: n.x, y: n.y }, t, h)))));
        return (b = b.concat(d(b[b.length - 1].end, e, !h)));
      }
      function h(a, b, c) {
        const d = p(a.xMax - b.x, b.x - a.xMin) < p(a.yMax - b.y, b.y - a.yMin);
        c = m(a, b, c, d, { soft: J.hardBounds, hard: J.hardBounds });
        return d
          ? { y: b.y, x: a[c ? "xMax" : "xMin"] + (c ? 1 : -1) }
          : { x: b.x, y: a[c ? "yMax" : "yMin"] + (c ? 1 : -1) };
      }
      let q = D(J.startDirectionX, y(e.x - b.x) > y(e.y - b.y)),
        H = q ? "x" : "y";
      let G,
        n = [],
        a = !1;
      var u = J.obstacleMetrics;
      let A = p(b.x, e.x) - u.maxWidth - 10,
        g = x(b.x, e.x) + u.maxWidth + 10,
        k = p(b.y, e.y) - u.maxHeight - 10,
        c = x(b.y, e.y) + u.maxHeight + 10,
        f = J.chartObstacles;
      var w = B(f, A);
      u = B(f, g);
      f = f.slice(w, u + 1);
      -1 < (u = z(f, e)) &&
        ((G = h(f[u], e, b)), n.push({ end: e, start: G }), (e = G));
      for (; -1 < (u = z(f, e)); )
        (w = 0 > e[H] - b[H]),
          (G = { x: e.x, y: e.y }),
          (G[H] = f[u][w ? H + "Max" : H + "Min"] + (w ? 1 : -1)),
          n.push({ end: e, start: G }),
          (e = G);
      b = d(b, e, q);
      b = b.concat(n.reverse());
      return { path: F(b), obstacles: b };
    };
    b.requiresObstacles = !0;
    return {
      fastAvoid: b,
      straight: function (b, e) {
        return {
          path: [
            ["M", b.x, b.y],
            ["L", e.x, e.y],
          ],
          obstacles: [{ start: b, end: e }],
        };
      },
      simpleConnect: e,
    };
  });
  K(
    e,
    "Gantt/Pathfinder.js",
    [
      e["Gantt/Connection.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Defaults.js"],
      e["Core/Globals.js"],
      e["Core/Series/Point.js"],
      e["Core/Utilities.js"],
      e["Gantt/PathfinderAlgorithms.js"],
    ],
    function (e, B, z, H, E, D, p) {
      function x(b) {
        var a = b.shapeArgs;
        return a
          ? {
              xMin: a.x || 0,
              xMax: (a.x || 0) + (a.width || 0),
              yMin: a.y || 0,
              yMax: (a.y || 0) + (a.height || 0),
            }
          : (a = b.graphic && b.graphic.getBBox())
          ? {
              xMin: b.plotX - a.width / 2,
              xMax: b.plotX + a.width / 2,
              yMin: b.plotY - a.height / 2,
              yMax: b.plotY + a.height / 2,
            }
          : null;
      }
      function y(b) {
        let a = b.length,
          e = 0,
          h,
          g,
          k = [],
          c = function (a, b, e) {
            e = d(e, 10);
            const f = a.yMax + e > b.yMin - e && a.yMin - e < b.yMax + e,
              g = a.xMax + e > b.xMin - e && a.xMin - e < b.xMax + e,
              h = f
                ? a.xMin > b.xMax
                  ? a.xMin - b.xMax
                  : b.xMin - a.xMax
                : Infinity,
              k = g
                ? a.yMin > b.yMax
                  ? a.yMin - b.yMax
                  : b.yMin - a.yMax
                : Infinity;
            return g && f
              ? e
                ? c(a, b, Math.floor(e / 2))
                : Infinity
              : K(h, k);
          };
        for (; e < a; ++e)
          for (h = e + 1; h < a; ++h) (g = c(b[e], b[h])), 80 > g && k.push(g);
        k.push(80);
        return t(
          Math.floor(
            k.sort(function (a, b) {
              return a - b;
            })[Math.floor(k.length / 10)] /
              2 -
              1
          ),
          1
        );
      }
      function b(b) {
        if (
          b.options.pathfinder ||
          b.series.reduce(function (a, b) {
            b.options &&
              v(
                !0,
                (b.options.connectors = b.options.connectors || {}),
                b.options.pathfinder
              );
            return a || (b.options && b.options.pathfinder);
          }, !1)
        )
          v(
            !0,
            (b.options.connectors = b.options.connectors || {}),
            b.options.pathfinder
          ),
            F(
              'WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.'
            );
      }
      ({ defaultOptions: z } = z);
      const {
        addEvent: m,
        defined: q,
        error: F,
        extend: l,
        merge: v,
        pick: d,
        splat: h,
      } = D;
      ("");
      const t = Math.max,
        K = Math.min;
      l(z, {
        connectors: {
          type: "straight",
          lineWidth: 1,
          marker: {
            enabled: !1,
            align: "center",
            verticalAlign: "middle",
            inside: !1,
            lineWidth: 1,
          },
          startMarker: { symbol: "diamond" },
          endMarker: { symbol: "arrow-filled" },
        },
      });
      class G {
        constructor(b) {
          this.lineObstacles =
            this.group =
            this.connections =
            this.chartObstacleMetrics =
            this.chartObstacles =
            this.chart =
              void 0;
          this.init(b);
        }
        init(b) {
          this.chart = b;
          this.connections = [];
          m(b, "redraw", function () {
            this.pathfinder.update();
          });
        }
        update(b) {
          const a = this.chart,
            d = this,
            l = d.connections;
          d.connections = [];
          a.series.forEach(function (b) {
            b.visible &&
              !b.options.isInternal &&
              b.points.forEach(function (b) {
                var c = b.options;
                c && c.dependency && (c.connect = c.dependency);
                let f;
                c = b.options && b.options.connect && h(b.options.connect);
                b.visible &&
                  !1 !== b.isInside &&
                  c &&
                  c.forEach(function (c) {
                    f = a.get("string" === typeof c ? c : c.to);
                    f instanceof E &&
                      f.series.visible &&
                      f.visible &&
                      !1 !== f.isInside &&
                      d.connections.push(
                        new e(b, f, "string" === typeof c ? {} : c)
                      );
                  });
              });
          });
          for (
            let a = 0, b, c, e = l.length, h = d.connections.length;
            a < e;
            ++a
          ) {
            c = !1;
            const e = l[a];
            for (b = 0; b < h; ++b) {
              const a = d.connections[b];
              if (
                (e.options && e.options.type) ===
                  (a.options && a.options.type) &&
                e.fromPoint === a.fromPoint &&
                e.toPoint === a.toPoint
              ) {
                a.graphics = e.graphics;
                c = !0;
                break;
              }
            }
            c || e.destroy();
          }
          delete this.chartObstacles;
          delete this.lineObstacles;
          d.renderConnections(b);
        }
        renderConnections(b) {
          b
            ? this.chart.series.forEach(function (a) {
                const b = function () {
                  const b = a.chart.pathfinder;
                  ((b && b.connections) || []).forEach(function (b) {
                    b.fromPoint && b.fromPoint.series === a && b.render();
                  });
                  a.pathfinderRemoveRenderEvent &&
                    (a.pathfinderRemoveRenderEvent(),
                    delete a.pathfinderRemoveRenderEvent);
                };
                !1 === a.options.animation
                  ? b()
                  : (a.pathfinderRemoveRenderEvent = m(a, "afterAnimate", b));
              })
            : this.connections.forEach(function (a) {
                a.render();
              });
        }
        getChartObstacles(b) {
          let a = [],
            e = this.chart.series,
            h = d(b.algorithmMargin, 0),
            g;
          for (let b = 0, c = e.length; b < c; ++b)
            if (e[b].visible && !e[b].options.isInternal)
              for (let c = 0, d = e[b].points.length, g, k; c < d; ++c)
                (k = e[b].points[c]),
                  k.visible &&
                    (g = x(k)) &&
                    a.push({
                      xMin: g.xMin - h,
                      xMax: g.xMax + h,
                      yMin: g.yMin - h,
                      yMax: g.yMax + h,
                    });
          a = a.sort(function (a, b) {
            return a.xMin - b.xMin;
          });
          q(b.algorithmMargin) ||
            ((g = b.algorithmMargin = y(a)),
            a.forEach(function (a) {
              a.xMin -= g;
              a.xMax += g;
              a.yMin -= g;
              a.yMax += g;
            }));
          return a;
        }
        getObstacleMetrics(b) {
          let a = 0,
            d = 0,
            e,
            g,
            h = b.length;
          for (; h--; )
            (e = b[h].xMax - b[h].xMin),
              (g = b[h].yMax - b[h].yMin),
              a < e && (a = e),
              d < g && (d = g);
          return { maxHeight: d, maxWidth: a };
        }
        getAlgorithmStartDirection(b) {
          let a = "top" !== b.verticalAlign && "bottom" !== b.verticalAlign;
          return "left" !== b.align && "right" !== b.align
            ? a
              ? void 0
              : !1
            : a
            ? !0
            : void 0;
        }
      }
      G.prototype.algorithms = p;
      H.Pathfinder = G;
      l(E.prototype, {
        getPathfinderAnchorPoint: function (b) {
          let a = x(this),
            d,
            e;
          switch (b.align) {
            case "right":
              d = "xMax";
              break;
            case "left":
              d = "xMin";
          }
          switch (b.verticalAlign) {
            case "top":
              e = "yMin";
              break;
            case "bottom":
              e = "yMax";
          }
          return {
            x: d ? a[d] : (a.xMin + a.xMax) / 2,
            y: e ? a[e] : (a.yMin + a.yMax) / 2,
          };
        },
        getRadiansToVector: function (b, a) {
          let d;
          q(a) ||
            ((d = x(this)) &&
              (a = { x: (d.xMin + d.xMax) / 2, y: (d.yMin + d.yMax) / 2 }));
          return Math.atan2(a.y - b.y, b.x - a.x);
        },
        getMarkerVector: function (b, a, d) {
          var e = 2 * Math.PI,
            g = x(this),
            h = g.xMax - g.xMin;
          let c = g.yMax - g.yMin,
            f = Math.atan2(c, h),
            l = !1;
          h /= 2;
          let m = c / 2,
            n = g.xMin + h;
          g = g.yMin + m;
          var p = n,
            q = g;
          let t = 1,
            r = 1;
          for (; b < -Math.PI; ) b += e;
          for (; b > Math.PI; ) b -= e;
          e = Math.tan(b);
          b > -f && b <= f
            ? ((r = -1), (l = !0))
            : b > f && b <= Math.PI - f
            ? (r = -1)
            : b > Math.PI - f || b <= -(Math.PI - f)
            ? ((t = -1), (l = !0))
            : (t = -1);
          l
            ? ((p += t * h), (q += r * h * e))
            : ((p += (c / (2 * e)) * t), (q += r * m));
          d.x !== n && (p = d.x);
          d.y !== g && (q = d.y);
          return { x: p + a * Math.cos(b), y: q - a * Math.sin(b) };
        },
      });
      B.prototype.callbacks.push(function (d) {
        !1 !== d.options.connectors.enabled &&
          (b(d), (this.pathfinder = new G(this)), this.pathfinder.update(!0));
      });
      return G;
    }
  );
  K(
    e,
    "Series/Gantt/GanttSeries.js",
    [
      e["Core/Axis/Axis.js"],
      e["Core/Chart/Chart.js"],
      e["Series/Gantt/GanttPoint.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Axis/Tick.js"],
      e["Core/Utilities.js"],
      e["Core/Axis/TreeGrid/TreeGridAxis.js"],
    ],
    function (e, B, z, H, E, D, p) {
      const {
          series: x,
          seriesTypes: { xrange: y },
        } = H,
        { extend: b, isNumber: m, merge: q } = D;
      p.compose(e, B, x, E);
      class F extends y {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
        drawPoint(b, e) {
          let d = this.options,
            h = this.chart.renderer;
          var l = b.shapeArgs;
          let p = b.plotY,
            q = b.graphic,
            n = b.selected && "select",
            a = d.stacking && !d.borderRadius;
          if (b.options.milestone)
            if (m(p) && null !== b.y && !1 !== b.visible) {
              l = h.symbols.diamond(
                l.x || 0,
                l.y || 0,
                l.width || 0,
                l.height || 0
              );
              if (q) q[e]({ d: l });
              else
                b.graphic = h
                  .path(l)
                  .addClass(b.getClassName(), !0)
                  .add(b.group || this.group);
              this.chart.styledMode ||
                b.graphic
                  .attr(this.pointAttribs(b, n))
                  .shadow(d.shadow, null, a);
            } else q && (b.graphic = q.destroy());
          else y.prototype.drawPoint.call(this, b, e);
        }
        translatePoint(b) {
          let e, d;
          y.prototype.translatePoint.call(this, b);
          b.options.milestone &&
            ((e = b.shapeArgs),
            (d = e.height || 0),
            (b.shapeArgs = {
              x: (e.x || 0) - d / 2,
              y: e.y,
              width: d,
              height: d,
            }));
        }
      }
      F.defaultOptions = q(y.defaultOptions, {
        grouping: !1,
        dataLabels: { enabled: !0 },
        tooltip: {
          headerFormat:
            '<span style="font-size: 0.8em">{series.name}</span><br/>',
          pointFormat: null,
          pointFormatter: function () {
            var b = this.series,
              e = b.xAxis;
            let d = b.tooltipOptions.dateTimeLabelFormats,
              h = e.options.startOfWeek,
              p = b.tooltipOptions,
              q = p.xDateFormat,
              y = this.options.milestone,
              n = "<b>" + (this.name || this.yCategory) + "</b>";
            if (p.pointFormat) return this.tooltipFormatter(p.pointFormat);
            !q &&
              m(this.start) &&
              (q = b.chart.time.getDateFormat(
                e.closestPointRange,
                this.start,
                h,
                d || {}
              ));
            e = b.chart.time.dateFormat(q, this.start);
            b = b.chart.time.dateFormat(q, this.end);
            n += "<br/>";
            return y
              ? n + (e + "<br/>")
              : n + ("Start: " + e + "<br/>End: ") + (b + "<br/>");
          },
        },
        connectors: {
          type: "simpleConnect",
          animation: { reversed: !0 },
          startMarker: {
            enabled: !0,
            symbol: "arrow-filled",
            radius: 4,
            fill: "#fa0",
            align: "left",
          },
          endMarker: { enabled: !1, align: "right" },
        },
      });
      b(F.prototype, {
        pointArrayMap: ["start", "end", "y"],
        pointClass: z,
        setData: x.prototype.setData,
      });
      H.registerSeriesType("gantt", F);
      ("");
      return F;
    }
  );
  K(
    e,
    "Core/Chart/GanttChart.js",
    [e["Core/Chart/Chart.js"], e["Core/Defaults.js"], e["Core/Utilities.js"]],
    function (e, B, z) {
      const { getOptions: F } = B,
        { isArray: E, merge: D, splat: p } = z;
      class x extends e {
        init(e, b) {
          const m = F(),
            q = e.xAxis,
            x = e.yAxis;
          let l;
          e.xAxis = e.yAxis = void 0;
          const v = D(
            !0,
            {
              chart: { type: "gantt" },
              title: { text: null },
              legend: { enabled: !1 },
              navigator: {
                series: { type: "gantt" },
                yAxis: { type: "category" },
              },
            },
            e,
            { isGantt: !0 }
          );
          e.xAxis = q;
          e.yAxis = x;
          v.xAxis = (E(e.xAxis) ? e.xAxis : [e.xAxis || {}, {}]).map(function (
            b,
            e
          ) {
            1 === e && (l = 0);
            return D(
              m.xAxis,
              { grid: { enabled: !0 }, opposite: !0, linkedTo: l },
              b,
              { type: "datetime" }
            );
          });
          v.yAxis = p(e.yAxis || {}).map(function (b) {
            return D(
              m.yAxis,
              {
                grid: { enabled: !0 },
                staticScale: 50,
                reversed: !0,
                type: b.categories ? b.type : "treegrid",
              },
              b
            );
          });
          super.init(v, b);
        }
      }
      (function (e) {
        e.ganttChart = function (b, m, p) {
          return new e(b, m, p);
        };
      })(x || (x = {}));
      return x;
    }
  );
  K(e, "Extensions/ArrowSymbols.js", [e["Core/Utilities.js"]], function (e) {
    function B(e, x, y, b) {
      return [
        ["M", e, x + b / 2],
        ["L", e + y, x],
        ["L", e, x + b / 2],
        ["L", e + y, x + b],
      ];
    }
    function z(e, x, y, b) {
      return B(e, x, y / 2, b);
    }
    function F(e, x, y, b) {
      return [["M", e + y, x], ["L", e, x + b / 2], ["L", e + y, x + b], ["Z"]];
    }
    function E(e, x, y, b) {
      return F(e, x, y / 2, b);
    }
    const D = [];
    return {
      compose: function (p) {
        e.pushUnique(D, p) &&
          ((p = p.prototype.symbols),
          (p.arrow = B),
          (p["arrow-filled"] = F),
          (p["arrow-filled-half"] = E),
          (p["arrow-half"] = z),
          (p["triangle-left"] = F),
          (p["triangle-left-half"] = E));
      },
    };
  });
  K(
    e,
    "Extensions/CurrentDateIndication.js",
    [e["Core/Utilities.js"]],
    function (e) {
      function B() {
        const b = this.options;
        var e = b.currentDateIndicator;
        e &&
          ((e = "object" === typeof e ? D(y, e) : D(y)),
          (e.value = Date.now()),
          (e.className = "highcharts-current-date-indicator"),
          b.plotLines || (b.plotLines = []),
          b.plotLines.push(e));
      }
      function z() {
        this.label &&
          this.label.attr({ text: this.getLabelText(this.options.label) });
      }
      function F(b, e) {
        const m = this.options;
        return m &&
          m.className &&
          -1 !== m.className.indexOf("highcharts-current-date-indicator") &&
          m.label &&
          "function" === typeof m.label.formatter
          ? ((m.value = Date.now()),
            m.label.formatter.call(this, m.value, m.label.format))
          : b.call(this, e);
      }
      const { addEvent: E, merge: D, wrap: p } = e,
        x = [],
        y = {
          color: "#ccd3ff",
          width: 2,
          label: {
            format: "%a, %b %d %Y, %H:%M",
            formatter: function (b, e) {
              return this.axis.chart.time.dateFormat(e || "", b);
            },
            rotation: 0,
            style: { fontSize: "0.7em" },
          },
        };
      return {
        compose: function (b, m) {
          e.pushUnique(x, b) && E(b, "afterSetOptions", B);
          e.pushUnique(x, m) &&
            (E(m, "render", z), p(m.prototype, "getLabelText", F));
        },
      };
    }
  );
  K(
    e,
    "masters/modules/gantt.src.js",
    [
      e["Core/Globals.js"],
      e["Stock/Navigator/Navigator.js"],
      e["Stock/Scrollbar/Scrollbar.js"],
      e["Stock/RangeSelector/RangeSelector.js"],
      e["Series/XRange/XRangeSeries.js"],
      e["Core/Chart/GanttChart.js"],
      e["Extensions/ArrowSymbols.js"],
      e["Extensions/CurrentDateIndication.js"],
    ],
    function (e, B, z, H, E, D, p, x) {
      e.GanttChart = D;
      e.ganttChart = D.ganttChart;
      e.Navigator = B;
      e.RangeSelector = H;
      e.Scrollbar = z;
      p.compose(e.SVGRenderer);
      x.compose(e.Axis, e.PlotLineOrBand);
      B.compose(e.Axis, e.Chart, e.Series);
      H.compose(e.Axis, e.Chart);
      z.compose(e.Axis);
      E.compose(e.Axis);
    }
  );
});
//# sourceMappingURL=gantt.js.map
