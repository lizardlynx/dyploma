/*
 Highcharts JS v11.0.0 (2023-04-26)

 (c) 2009-2021 Sebastian Bochan, Rafal Sebestjanski

 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/dumbbell", ["highcharts"], function (b) {
        a(b);
        a.Highcharts = b;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function b(a, c, g, e) {
    a.hasOwnProperty(c) ||
      ((a[c] = e.apply(null, g)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: c, module: a[c] },
          })
        ));
  }
  a = a ? a._modules : {};
  b(
    a,
    "Series/AreaRange/AreaRangePoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, c) {
      const {
          area: {
            prototype: {
              pointClass: g,
              pointClass: { prototype: e },
            },
          },
        } = a.seriesTypes,
        { defined: k, isNumber: h } = c;
      class b extends g {
        constructor() {
          super(...arguments);
          this.series =
            this.plotX =
            this.options =
            this.low =
            this.high =
              void 0;
        }
        setState() {
          const a = this.state,
            d = this.series,
            c = d.chart.polar;
          k(this.plotHigh) || (this.plotHigh = d.yAxis.toPixels(this.high, !0));
          k(this.plotLow) ||
            (this.plotLow = this.plotY = d.yAxis.toPixels(this.low, !0));
          d.stateMarkerGraphic &&
            ((d.lowerStateMarkerGraphic = d.stateMarkerGraphic),
            (d.stateMarkerGraphic = d.upperStateMarkerGraphic));
          this.graphic = this.graphics && this.graphics[1];
          this.plotY = this.plotHigh;
          c && h(this.plotHighX) && (this.plotX = this.plotHighX);
          e.setState.apply(this, arguments);
          this.state = a;
          this.plotY = this.plotLow;
          this.graphic = this.graphics && this.graphics[0];
          c && h(this.plotLowX) && (this.plotX = this.plotLowX);
          d.stateMarkerGraphic &&
            ((d.upperStateMarkerGraphic = d.stateMarkerGraphic),
            (d.stateMarkerGraphic = d.lowerStateMarkerGraphic),
            (d.lowerStateMarkerGraphic = void 0));
          e.setState.apply(this, arguments);
        }
        haloPath() {
          const a = this.series.chart.polar;
          let d = [];
          this.plotY = this.plotLow;
          a && h(this.plotLowX) && (this.plotX = this.plotLowX);
          this.isInside && (d = e.haloPath.apply(this, arguments));
          this.plotY = this.plotHigh;
          a && h(this.plotHighX) && (this.plotX = this.plotHighX);
          this.isTopInside && (d = d.concat(e.haloPath.apply(this, arguments)));
          return d;
        }
        isValid() {
          return h(this.low) && h(this.high);
        }
      }
      return b;
    }
  );
  b(
    a,
    "Series/Dumbbell/DumbbellPoint.js",
    [a["Series/AreaRange/AreaRangePoint.js"], a["Core/Utilities.js"]],
    function (a, c) {
      const { extend: g, pick: e } = c;
      class b extends a {
        constructor() {
          super(...arguments);
          this.pointWidth =
            this.connector =
            this.options =
            this.series =
              void 0;
        }
        setState() {
          let a = this.series;
          var c = a.chart,
            b = a.options.marker;
          let d = this.options,
            k = e(
              d.lowColor,
              a.options.lowColor,
              d.color,
              this.zone && this.zone.color,
              this.color,
              a.color
            ),
            n = "attr";
          this.pointSetState.apply(this, arguments);
          if (!this.state) {
            n = "animate";
            const [a, h] = this.graphics || [];
            a &&
              !c.styledMode &&
              (a.attr({ fill: k }),
              h &&
                ((c = { y: this.y, zone: this.zone }),
                (this.y = this.high),
                (this.zone = this.zone ? this.getZone() : void 0),
                (b = e(
                  this.marker ? this.marker.fillColor : void 0,
                  b ? b.fillColor : void 0,
                  d.color,
                  this.zone ? this.zone.color : void 0,
                  this.color
                )),
                h.attr({ fill: b }),
                g(this, c)));
          }
          this.connector[n](a.getConnectorAttribs(this));
        }
        destroy() {
          this.graphic ||
            ((this.graphic = this.connector), (this.connector = void 0));
          return super.destroy();
        }
      }
      g(b.prototype, { pointSetState: a.prototype.setState });
      return b;
    }
  );
  b(
    a,
    "Series/Dumbbell/DumbbellSeries.js",
    [
      a["Series/Column/ColumnSeries.js"],
      a["Series/Dumbbell/DumbbellPoint.js"],
      a["Core/Globals.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, b, g, e, k, h, w) {
      const { prototype: c } = a;
      ({ noop: g } = g);
      const { prototype: d } = e,
        {
          seriesTypes: {
            arearange: t,
            columnrange: { prototype: n },
          },
        } = k,
        { prototype: u } = t,
        { extend: v, merge: x, pick: l } = w;
      class r extends t {
        constructor() {
          super(...arguments);
          this.columnMetrics = this.points = this.options = this.data = void 0;
        }
        getConnectorAttribs(a) {
          let d = this.chart,
            p = a.options,
            b = this.options;
          var c = this.xAxis;
          let f = this.yAxis,
            e = l(p.connectorWidth, b.connectorWidth),
            g = l(
              p.connectorColor,
              b.connectorColor,
              p.color,
              a.zone ? a.zone.color : void 0,
              a.color
            ),
            k = l(
              b.states && b.states.hover && b.states.hover.connectorWidthPlus,
              1
            ),
            n = l(p.dashStyle, b.dashStyle),
            q = l(a.plotLow, a.plotY);
          var m = f.toPixels(b.threshold || 0, !0);
          m = l(a.plotHigh, d.inverted ? f.len - m : m);
          if ("number" !== typeof q) return {};
          a.state && (e += k);
          0 > q ? (q = 0) : q >= f.len && (q = f.len);
          0 > m ? (m = 0) : m >= f.len && (m = f.len);
          if (0 > a.plotX || a.plotX > c.len) e = 0;
          a.graphics &&
            a.graphics[1] &&
            ((c = { y: a.y, zone: a.zone }),
            (a.y = a.high),
            (a.zone = a.zone ? a.getZone() : void 0),
            (g = l(
              p.connectorColor,
              b.connectorColor,
              p.color,
              a.zone ? a.zone.color : void 0,
              a.color
            )),
            v(a, c));
          a = {
            d: h.prototype.crispLine(
              [
                ["M", a.plotX, q],
                ["L", a.plotX, m],
              ],
              e,
              "ceil"
            ),
          };
          d.styledMode ||
            ((a.stroke = g), (a["stroke-width"] = e), n && (a.dashstyle = n));
          return a;
        }
        drawConnector(a) {
          var b = l(this.options.animationLimit, 250);
          b = a.connector && this.chart.pointCount < b ? "animate" : "attr";
          a.connector ||
            (a.connector = this.chart.renderer
              .path()
              .addClass("highcharts-lollipop-stem")
              .attr({ zIndex: -1 })
              .add(this.group));
          a.connector[b](this.getConnectorAttribs(a));
        }
        getColumnMetrics() {
          const a = c.getColumnMetrics.apply(this, arguments);
          a.offset += a.width / 2;
          return a;
        }
        translate() {
          const a = this.chart.inverted;
          this.setShapeArgs.apply(this);
          this.translatePoint.apply(this, arguments);
          this.points.forEach((b) => {
            const { pointWidth: d, shapeArgs: c = {}, tooltipPos: e } = b;
            b.plotX = c.x || 0;
            c.x = b.plotX - d / 2;
            e && (a ? (e[1] = this.xAxis.len - b.plotX) : (e[0] = b.plotX));
          });
          this.columnMetrics.offset -= this.columnMetrics.width / 2;
        }
        drawPoints() {
          let a = this.chart,
            b = this.points.length,
            d = (this.lowColor = this.options.lowColor),
            c = 0;
          let e;
          for (this.seriesDrawPoints.apply(this, arguments); c < b; ) {
            var f = this.points[c];
            const [b, g] = f.graphics || [];
            this.drawConnector(f);
            g &&
              ((g.element.point = f), g.addClass("highcharts-lollipop-high"));
            f.connector.element.point = f;
            b &&
              ((e = f.zone && f.zone.color),
              (f = l(
                f.options.lowColor,
                d,
                f.options.color,
                e,
                f.color,
                this.color
              )),
              a.styledMode || b.attr({ fill: f }),
              b.addClass("highcharts-lollipop-low"));
            c++;
          }
        }
        markerAttribs() {
          const a = u.markerAttribs.apply(this, arguments);
          a.x = Math.floor(a.x || 0);
          a.y = Math.floor(a.y || 0);
          return a;
        }
        pointAttribs(a, b) {
          let c;
          c = d.pointAttribs.apply(this, arguments);
          "hover" === b && delete c.fill;
          return c;
        }
      }
      r.defaultOptions = x(t.defaultOptions, {
        trackByArea: !1,
        fillColor: "none",
        lineWidth: 0,
        pointRange: 1,
        connectorWidth: 1,
        stickyTracking: !1,
        groupPadding: 0.2,
        crisp: !1,
        pointPadding: 0.1,
        lowColor: "#333333",
        states: {
          hover: { lineWidthPlus: 0, connectorWidthPlus: 1, halo: !1 },
        },
      });
      v(r.prototype, {
        crispCol: c.crispCol,
        drawGraph: g,
        drawTracker: a.prototype.drawTracker,
        pointClass: b,
        setShapeArgs: n.translate,
        seriesDrawPoints: u.drawPoints,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        translatePoint: u.translate,
      });
      k.registerSeriesType("dumbbell", r);
      ("");
      return r;
    }
  );
  b(a, "masters/modules/dumbbell.src.js", [], function () {});
});
//# sourceMappingURL=dumbbell.js.map
