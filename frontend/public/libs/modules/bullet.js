/*
 Highcharts JS v11.0.0 (2023-04-26)

 Bullet graph series type for Highcharts

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/bullet", ["highcharts"], function (b) {
        a(b);
        a.Highcharts = b;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function b(a, d, b, g) {
    a.hasOwnProperty(d) ||
      ((a[d] = g.apply(null, b)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: d, module: a[d] },
          })
        ));
  }
  a = a ? a._modules : {};
  b(
    a,
    "Series/Bullet/BulletPoint.js",
    [a["Series/Column/ColumnSeries.js"]],
    function (a) {
      class d extends a.prototype.pointClass {
        constructor() {
          super(...arguments);
          this.series = this.options = void 0;
        }
        destroy() {
          this.targetGraphic &&
            (this.targetGraphic = this.targetGraphic.destroy());
          super.destroy.apply(this, arguments);
        }
      }
      return d;
    }
  );
  b(
    a,
    "Series/Bullet/BulletSeries.js",
    [
      a["Series/Bullet/BulletPoint.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, d, b) {
      const {
          seriesTypes: { column: g },
        } = d,
        { extend: v, isNumber: k, merge: q, pick: n, relativeLength: w } = b;
      class e extends g {
        constructor() {
          super(...arguments);
          this.targetData = this.points = this.options = this.data = void 0;
        }
        drawPoints() {
          const a = this,
            p = a.chart,
            b = a.options,
            d = b.animationLimit || 250;
          super.drawPoints.apply(this, arguments);
          a.points.forEach(function (c) {
            const r = c.options,
              e = c.target,
              g = c.y;
            let f = c.targetGraphic,
              t,
              h,
              u;
            if (k(e) && null !== e) {
              h = q(b.targetOptions, r.targetOptions);
              t = h.height;
              let l = c.shapeArgs;
              c.dlBox && l && !k(l.width) && (l = c.dlBox);
              var m = w(h.width, l.width);
              u = a.yAxis.translate(e, !1, !0, !1, !0) - h.height / 2 - 0.5;
              m = a.crispCol.apply(
                {
                  chart: p,
                  borderWidth: h.borderWidth,
                  options: { crisp: b.crisp },
                },
                [l.x + l.width / 2 - m / 2, u, m, t]
              );
              f
                ? (f[p.pointCount < d ? "animate" : "attr"](m),
                  k(g) && null !== g
                    ? (f.element.point = c)
                    : (f.element.point = void 0))
                : (c.targetGraphic = f =
                    p.renderer.rect().attr(m).add(a.group));
              p.styledMode ||
                f.attr({
                  fill: n(
                    h.color,
                    r.color,
                    (a.zones.length &&
                      (c.getZone.call({ series: a, x: c.x, y: e, options: {} })
                        .color ||
                        a.color)) ||
                      void 0,
                    c.color,
                    a.color
                  ),
                  stroke: n(
                    h.borderColor,
                    c.borderColor,
                    a.options.borderColor
                  ),
                  "stroke-width": h.borderWidth,
                  r: h.borderRadius,
                });
              k(g) && null !== g && (f.element.point = c);
              f.addClass(c.getClassName() + " highcharts-bullet-target", !0);
            } else f && (c.targetGraphic = f.destroy());
          });
        }
        getExtremes(a) {
          a = super.getExtremes.call(this, a);
          var b = this.targetData;
          b &&
            b.length &&
            ((b = super.getExtremes.call(this, b)),
            k(b.dataMin) &&
              (a.dataMin = Math.min(n(a.dataMin, Infinity), b.dataMin)),
            k(b.dataMax) &&
              (a.dataMax = Math.max(n(a.dataMax, -Infinity), b.dataMax)));
          return a;
        }
      }
      e.defaultOptions = q(g.defaultOptions, {
        targetOptions: {
          width: "140%",
          height: 3,
          borderWidth: 0,
          borderRadius: 0,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b>. Target: <b>{point.target}</b><br/>',
        },
      });
      v(e.prototype, {
        parallelArrays: ["x", "y", "target"],
        pointArrayMap: ["y", "target"],
      });
      e.prototype.pointClass = a;
      d.registerSeriesType("bullet", e);
      ("");
      return e;
    }
  );
  b(a, "masters/modules/bullet.src.js", [], function () {});
});
//# sourceMappingURL=bullet.js.map
