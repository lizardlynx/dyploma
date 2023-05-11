/*
 Highcharts JS v11.0.0 (2023-04-26)

 ColorAxis module

 (c) 2012-2021 Pawel Potaczek

 License: www.highcharts.com/license
*/
"use strict";
(function (c) {
  "object" === typeof module && module.exports
    ? ((c["default"] = c), (module.exports = c))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/color-axis", ["highcharts"], function (n) {
        c(n);
        c.Highcharts = n;
        return c;
      })
    : c("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (c) {
  function n(c, l, y, r) {
    c.hasOwnProperty(l) ||
      ((c[l] = r.apply(null, y)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: l, module: c[l] },
          })
        ));
  }
  c = c ? c._modules : {};
  n(
    c,
    "Core/Axis/Color/ColorAxisComposition.js",
    [c["Core/Color/Color.js"], c["Core/Utilities.js"]],
    function (c, l) {
      const { parse: h } = c,
        { addEvent: r, extend: n, merge: z, pick: A, splat: C } = l;
      var u;
      (function (c) {
        function u() {
          const a = this.options;
          this.colorAxis = [];
          a.colorAxis &&
            ((a.colorAxis = C(a.colorAxis)),
            a.colorAxis.forEach((a, b) => {
              a.index = b;
              new m(this, a);
            }));
        }
        function w(a) {
          const b = (b) => {
            b = a.allItems.indexOf(b);
            -1 !== b &&
              (this.destroyItem(a.allItems[b]), a.allItems.splice(b, 1));
          };
          let d = [],
            f,
            e;
          (this.chart.colorAxis || []).forEach(function (a) {
            (f = a.options) &&
              f.showInLegend &&
              (f.dataClasses && f.visible
                ? (d = d.concat(a.getDataClassLegendSymbols()))
                : f.visible && d.push(a),
              a.series.forEach(function (a) {
                if (!a.options.showInLegend || f.dataClasses)
                  "point" === a.options.legendType
                    ? a.points.forEach(function (a) {
                        b(a);
                      })
                    : b(a);
              }));
          });
          for (e = d.length; e--; ) a.allItems.unshift(d[e]);
        }
        function q(a) {
          a.visible &&
            a.item.legendColor &&
            a.item.legendItem.symbol.attr({ fill: a.item.legendColor });
        }
        function p() {
          const a = this.chart.colorAxis;
          a &&
            a.forEach(function (a, b, d) {
              a.update({}, d);
            });
        }
        function b() {
          ((this.chart.colorAxis && this.chart.colorAxis.length) ||
            this.colorAttribs) &&
            this.translateColors();
        }
        function a() {
          const a = this.axisTypes;
          a
            ? -1 === a.indexOf("colorAxis") && a.push("colorAxis")
            : (this.axisTypes = ["colorAxis"]);
        }
        function f(a) {
          const b = this,
            d = a ? "show" : "hide";
          b.visible = b.options.visible = !!a;
          ["graphic", "dataLabel"].forEach(function (a) {
            if (b[a]) b[a][d]();
          });
          this.series.buildKDTree();
        }
        function d() {
          const a = this,
            b = this.options.nullColor,
            d = this.colorAxis,
            f = this.colorKey;
          (this.data.length ? this.data : this.points).forEach((e) => {
            var c = e.getNestedProperty(f);
            (c =
              e.options.color ||
              (e.isNull || null === e.value
                ? b
                : d && "undefined" !== typeof c
                ? d.toColor(c, e)
                : e.color || a.color)) &&
              e.color !== c &&
              ((e.color = c),
              "point" === a.options.legendType &&
                e.legendItem &&
                e.legendItem.label &&
                a.chart.legend.colorizeItem(e, e.visible));
          });
        }
        function E(a) {
          const b = a.prototype.createAxis;
          a.prototype.createAxis = function (a, d) {
            if ("colorAxis" !== a) return b.apply(this, arguments);
            const e = new m(
              this,
              z(d.axis, { index: this[a].length, isX: !1 })
            );
            this.isDirtyLegend = !0;
            this.axes.forEach(function (a) {
              a.series = [];
            });
            this.series.forEach(function (a) {
              a.bindAxes();
              a.isDirtyData = !0;
            });
            A(d.redraw, !0) && this.redraw(d.animation);
            return e;
          };
        }
        function k() {
          this.elem.attr(
            "fill",
            h(this.start).tweenTo(h(this.end), this.pos),
            void 0,
            !0
          );
        }
        function g() {
          this.elem.attr(
            "stroke",
            h(this.start).tweenTo(h(this.end), this.pos),
            void 0,
            !0
          );
        }
        const e = [];
        let m;
        c.compose = function (c, t, h, x, v) {
          m || (m = c);
          l.pushUnique(e, t) &&
            ((c = t.prototype),
            c.collectionsWithUpdate.push("colorAxis"),
            (c.collectionsWithInit.colorAxis = [c.addColorAxis]),
            r(t, "afterGetAxes", u),
            E(t));
          l.pushUnique(e, h) &&
            ((t = h.prototype), (t.fillSetter = k), (t.strokeSetter = g));
          l.pushUnique(e, x) &&
            (r(x, "afterGetAllItems", w),
            r(x, "afterColorizeItem", q),
            r(x, "afterUpdate", p));
          l.pushUnique(e, v) &&
            (n(v.prototype, { optionalAxis: "colorAxis", translateColors: d }),
            n(v.prototype.pointClass.prototype, { setVisible: f }),
            r(v, "afterTranslate", b, { order: 1 }),
            r(v, "bindAxes", a));
        };
        c.pointSetVisible = f;
      })(u || (u = {}));
      return u;
    }
  );
  n(c, "Core/Axis/Color/ColorAxisDefaults.js", [], function () {
    return {
      lineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      gridLineColor: "#ffffff",
      gridLineWidth: 1,
      tickPixelInterval: 72,
      startOnTick: !0,
      endOnTick: !0,
      offset: 0,
      marker: { animation: { duration: 50 }, width: 0.01, color: "#999999" },
      labels: { distance: 8, overflow: "justify", rotation: 0 },
      minColor: "#e6e9ff",
      maxColor: "#0022ff",
      tickLength: 5,
      showInLegend: !0,
    };
  });
  n(
    c,
    "Core/Axis/Color/ColorAxis.js",
    [
      c["Core/Axis/Axis.js"],
      c["Core/Color/Color.js"],
      c["Core/Axis/Color/ColorAxisComposition.js"],
      c["Core/Axis/Color/ColorAxisDefaults.js"],
      c["Core/Legend/LegendSymbol.js"],
      c["Core/Series/SeriesRegistry.js"],
      c["Core/Utilities.js"],
    ],
    function (c, l, n, r, B, z, A) {
      const { parse: h } = l,
        { series: u } = z,
        { extend: y, isNumber: D, merge: w, pick: q } = A;
      class p extends c {
        static compose(b, a, f, d) {
          n.compose(p, b, a, f, d);
        }
        constructor(b, a) {
          super(b, a);
          this.beforePadding = !1;
          this.chart = void 0;
          this.coll = "colorAxis";
          this.stops = this.options = this.dataClasses = void 0;
          this.visible = !0;
          this.init(b, a);
        }
        init(b, a) {
          var f = b.options.legend || {};
          const d = a.layout
              ? "vertical" !== a.layout
              : "vertical" !== f.layout,
            c = a.visible;
          f = w(p.defaultColorAxisOptions, a, {
            showEmpty: !1,
            title: null,
            visible: f.enabled && !1 !== c,
          });
          this.coll = "colorAxis";
          this.side = a.side || d ? 2 : 1;
          this.reversed = a.reversed || !d;
          this.opposite = !d;
          super.init(b, f);
          this.userOptions.visible = c;
          a.dataClasses && this.initDataClasses(a);
          this.initStops();
          this.horiz = d;
          this.zoomEnabled = !1;
        }
        initDataClasses(b) {
          const a = this.chart,
            f = (this.legendItem = this.legendItem || {}),
            d = b.dataClasses.length,
            c = this.options;
          let k,
            g = 0,
            e = a.options.chart.colorCount;
          this.dataClasses = k = [];
          f.labels = [];
          (b.dataClasses || []).forEach(function (b, f) {
            b = w(b);
            k.push(b);
            if (a.styledMode || !b.color)
              "category" === c.dataClassColor
                ? (a.styledMode ||
                    ((f = a.options.colors), (e = f.length), (b.color = f[g])),
                  (b.colorIndex = g),
                  g++,
                  g === e && (g = 0))
                : (b.color = h(c.minColor).tweenTo(
                    h(c.maxColor),
                    2 > d ? 0.5 : f / (d - 1)
                  ));
          });
        }
        hasData() {
          return !!(this.tickPositions || []).length;
        }
        setTickPositions() {
          if (!this.dataClasses) return super.setTickPositions();
        }
        initStops() {
          this.stops = this.options.stops || [
            [0, this.options.minColor],
            [1, this.options.maxColor],
          ];
          this.stops.forEach(function (b) {
            b.color = h(b[1]);
          });
        }
        setOptions(b) {
          super.setOptions(b);
          this.options.crosshair = this.options.marker;
        }
        setAxisSize() {
          var b = this.legendItem && this.legendItem.symbol;
          const a = this.chart;
          var f = a.options.legend || {};
          let d, c;
          b
            ? ((this.left = f = b.attr("x")),
              (this.top = d = b.attr("y")),
              (this.width = c = b.attr("width")),
              (this.height = b = b.attr("height")),
              (this.right = a.chartWidth - f - c),
              (this.bottom = a.chartHeight - d - b),
              (this.len = this.horiz ? c : b),
              (this.pos = this.horiz ? f : d))
            : (this.len =
                (this.horiz ? f.symbolWidth : f.symbolHeight) ||
                p.defaultLegendLength);
        }
        normalizedValue(b) {
          this.logarithmic && (b = this.logarithmic.log2lin(b));
          return 1 - (this.max - b) / (this.max - this.min || 1);
        }
        toColor(b, a) {
          const f = this.dataClasses;
          var d = this.stops;
          let c, k, g, e;
          if (f)
            for (e = f.length; e--; ) {
              if (
                ((g = f[e]),
                (c = g.from),
                (d = g.to),
                ("undefined" === typeof c || b >= c) &&
                  ("undefined" === typeof d || b <= d))
              ) {
                k = g.color;
                a && ((a.dataClass = e), (a.colorIndex = g.colorIndex));
                break;
              }
            }
          else {
            b = this.normalizedValue(b);
            for (e = d.length; e-- && !(b > d[e][0]); );
            c = d[e] || d[e + 1];
            d = d[e + 1] || c;
            b = 1 - (d[0] - b) / (d[0] - c[0] || 1);
            k = c.color.tweenTo(d.color, b);
          }
          return k;
        }
        getOffset() {
          const b = this.legendItem && this.legendItem.group,
            a = this.chart.axisOffset[this.side];
          if (b) {
            this.axisParent = b;
            super.getOffset();
            const c = this.chart.legend;
            c.allItems.forEach(function (a) {
              a instanceof p && a.drawLegendSymbol(c, a);
            });
            c.render();
            this.chart.getMargins(!0);
            this.added ||
              ((this.added = !0),
              (this.labelLeft = 0),
              (this.labelRight = this.width));
            this.chart.axisOffset[this.side] = a;
          }
        }
        setLegendColor() {
          var b = this.reversed,
            a = b ? 1 : 0;
          b = b ? 0 : 1;
          a = this.horiz ? [a, 0, b, 0] : [0, b, 0, a];
          this.legendColor = {
            linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] },
            stops: this.stops,
          };
        }
        drawLegendSymbol(b, a) {
          var c;
          a = a.legendItem || {};
          const d = b.padding,
            h = b.options,
            k = this.options.labels,
            g = q(h.itemDistance, 10),
            e = this.horiz,
            m = q(h.symbolWidth, e ? p.defaultLegendLength : 12),
            l = q(h.symbolHeight, e ? 12 : p.defaultLegendLength),
            t = q(h.labelPadding, e ? 16 : 30);
          this.setLegendColor();
          a.symbol ||
            (a.symbol = this.chart.renderer
              .symbol("roundedRect", 0, b.baseline - 11, m, l, {
                r: null !== (c = h.symbolRadius) && void 0 !== c ? c : 3,
              })
              .attr({ zIndex: 1 })
              .add(a.group));
          a.labelWidth =
            m + d + (e ? g : q(k.x, k.distance) + this.maxLabelLength);
          a.labelHeight = l + d + (e ? t : 0);
        }
        setState(b) {
          this.series.forEach(function (a) {
            a.setState(b);
          });
        }
        setVisible() {}
        getSeriesExtremes() {
          const b = this.series;
          let a;
          let c,
            d,
            h = b.length,
            k,
            g;
          this.dataMin = Infinity;
          for (this.dataMax = -Infinity; h--; ) {
            d = b[h];
            a = d.colorKey = q(
              d.options.colorKey,
              d.colorKey,
              d.pointValKey,
              d.zoneAxis,
              "y"
            );
            var e = d.pointArrayMap;
            c = d[a + "Min"] && d[a + "Max"];
            if (d[a + "Data"]) var m = d[a + "Data"];
            else if (e) {
              if (((m = []), (e = e.indexOf(a)), (k = d.yData), 0 <= e && k))
                for (g = 0; g < k.length; g++) m.push(q(k[g][e], k[g]));
            } else m = d.yData;
            c
              ? ((d.minColorValue = d[a + "Min"]),
                (d.maxColorValue = d[a + "Max"]))
              : ((m = u.prototype.getExtremes.call(d, m)),
                (d.minColorValue = m.dataMin),
                (d.maxColorValue = m.dataMax));
            "undefined" !== typeof d.minColorValue &&
              ((this.dataMin = Math.min(this.dataMin, d.minColorValue)),
              (this.dataMax = Math.max(this.dataMax, d.maxColorValue)));
            c || u.prototype.applyExtremes.call(d);
          }
        }
        drawCrosshair(b, a) {
          const c = this.legendItem || {},
            d = a && a.plotX,
            h = a && a.plotY,
            k = this.pos,
            g = this.len;
          let e;
          a &&
            ((e = this.toPixels(a.getNestedProperty(a.series.colorKey))),
            e < k ? (e = k - 2) : e > k + g && (e = k + g + 2),
            (a.plotX = e),
            (a.plotY = this.len - e),
            super.drawCrosshair(b, a),
            (a.plotX = d),
            (a.plotY = h),
            this.cross &&
              !this.cross.addedToColorAxis &&
              c.group &&
              (this.cross.addClass("highcharts-coloraxis-marker").add(c.group),
              (this.cross.addedToColorAxis = !0),
              this.chart.styledMode ||
                "object" !== typeof this.crosshair ||
                this.cross.attr({ fill: this.crosshair.color })));
        }
        getPlotLinePath(b) {
          const a = this.left,
            c = b.translatedValue,
            d = this.top;
          return D(c)
            ? this.horiz
              ? [["M", c - 4, d - 6], ["L", c + 4, d - 6], ["L", c, d], ["Z"]]
              : [["M", a, c], ["L", a - 6, c + 6], ["L", a - 6, c - 6], ["Z"]]
            : super.getPlotLinePath(b);
        }
        update(b, a) {
          const c = this.chart.legend;
          this.series.forEach((a) => {
            a.isDirtyData = !0;
          });
          ((b.dataClasses && c.allItems) || this.dataClasses) &&
            this.destroyItems();
          super.update(b, a);
          this.legendItem &&
            this.legendItem.label &&
            (this.setLegendColor(), c.colorizeItem(this, !0));
        }
        destroyItems() {
          const b = this.chart,
            a = this.legendItem || {};
          if (a.label) b.legend.destroyItem(this);
          else if (a.labels) for (const c of a.labels) b.legend.destroyItem(c);
          b.isDirtyLegend = !0;
        }
        destroy() {
          this.chart.isDirtyLegend = !0;
          this.destroyItems();
          super.destroy(...[].slice.call(arguments));
        }
        remove(b) {
          this.destroyItems();
          super.remove(b);
        }
        getDataClassLegendSymbols() {
          const b = this,
            a = b.chart,
            c = (b.legendItem && b.legendItem.labels) || [],
            d = a.options.legend,
            h = q(d.valueDecimals, -1),
            k = q(d.valueSuffix, ""),
            g = (a) =>
              b.series.reduce((b, c) => {
                b.push(...c.points.filter((b) => b.dataClass === a));
                return b;
              }, []);
          let e;
          c.length ||
            b.dataClasses.forEach((d, f) => {
              const l = d.from,
                m = d.to,
                { numberFormatter: p } = a;
              let n = !0;
              e = "";
              "undefined" === typeof l
                ? (e = "< ")
                : "undefined" === typeof m && (e = "> ");
              "undefined" !== typeof l && (e += p(l, h) + k);
              "undefined" !== typeof l &&
                "undefined" !== typeof m &&
                (e += " - ");
              "undefined" !== typeof m && (e += p(m, h) + k);
              c.push(
                y(
                  {
                    chart: a,
                    name: e,
                    options: {},
                    drawLegendSymbol: B.drawRectangle,
                    visible: !0,
                    isDataClass: !0,
                    setState: (a) => {
                      for (const b of g(f)) b.setState(a);
                    },
                    setVisible: function () {
                      this.visible = n = b.visible = !n;
                      for (const a of g(f)) a.setVisible(n);
                      a.legend.colorizeItem(this, n);
                    },
                  },
                  d
                )
              );
            });
          return c;
        }
      }
      p.defaultColorAxisOptions = r;
      p.defaultLegendLength = 200;
      p.keepProps = ["legendItem"];
      Array.prototype.push.apply(c.keepProps, p.keepProps);
      ("");
      return p;
    }
  );
  n(
    c,
    "masters/modules/coloraxis.src.js",
    [c["Core/Globals.js"], c["Core/Axis/Color/ColorAxis.js"]],
    function (c, l) {
      c.ColorAxis = l;
      l.compose(c.Chart, c.Fx, c.Legend, c.Series);
    }
  );
});
//# sourceMappingURL=coloraxis.js.map
