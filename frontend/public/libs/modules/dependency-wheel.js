/*
 Highcharts JS v11.0.0 (2023-04-26)

 Dependency wheel module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define(
        "highcharts/modules/dependency-wheel",
        ["highcharts", "highcharts/modules/sankey"],
        function (b) {
          a(b);
          a.Highcharts = b;
          return a;
        }
      )
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function b(a, c, b, f) {
    a.hasOwnProperty(c) ||
      ((a[c] = f.apply(null, b)),
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
    "Series/DependencyWheel/DependencyWheelPoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, b) {
      ({
        seriesTypes: {
          sankey: {
            prototype: { pointClass: a },
          },
        },
      } = a);
      const { wrap: c } = b;
      class f extends a {
        constructor() {
          super(...arguments);
          this.toNode =
            this.shapeArgs =
            this.series =
            this.options =
            this.linksTo =
            this.linksFrom =
            this.index =
            this.fromNode =
            this.angle =
              void 0;
        }
        getDataLabelPath(a) {
          const b = this.series.chart.renderer,
            l = this.shapeArgs,
            f = 0 > this.angle || this.angle > Math.PI,
            p = l.start || 0,
            h = l.end || 0;
          this.dataLabelPath
            ? ((this.dataLabelPath = this.dataLabelPath.destroy()),
              delete this.dataLabelPath)
            : c(a, "destroy", (b) => {
                this.dataLabelPath &&
                  (this.dataLabelPath = this.dataLabelPath.destroy());
                return b.call(a);
              });
          return (this.dataLabelPath = b
            .arc({
              open: !0,
              longArc: Math.abs(Math.abs(p) - Math.abs(h)) < Math.PI ? 0 : 1,
            })
            .attr({
              x: l.x,
              y: l.y,
              r: l.r + (this.dataLabel.options.distance || 0),
              start: f ? p : h,
              end: f ? h : p,
              clockwise: +f,
            })
            .add(b.defs));
        }
        isValid() {
          return !0;
        }
      }
      return f;
    }
  );
  b(
    a,
    "Series/DependencyWheel/DependencyWheelSeriesDefaults.js",
    [],
    function () {
      "";
      return {
        center: [null, null],
        curveFactor: 0.6,
        startAngle: 0,
        dataLabels: { textPath: { enabled: !1, attributes: { dy: 5 } } },
      };
    }
  );
  b(
    a,
    "Series/DependencyWheel/DependencyWheelSeries.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Series/DependencyWheel/DependencyWheelPoint.js"],
      a["Series/DependencyWheel/DependencyWheelSeriesDefaults.js"],
      a["Core/Globals.js"],
      a["Series/Sankey/SankeyColumnComposition.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, b, u, f, v, r, l) {
      const { animObject: c } = a,
        { deg2rad: p } = f,
        {
          seriesTypes: { pie: h, sankey: q },
        } = r,
        { extend: w, merge: x } = l;
      class k extends q {
        constructor() {
          super(...arguments);
          this.points =
            this.nodes =
            this.nodeColumns =
            this.options =
            this.data =
              void 0;
        }
        animate(a) {
          if (!a) {
            const a =
              c(this.options.animation).duration / 2 / this.nodes.length;
            this.nodes.forEach(function (b, y) {
              const n = b.graphic;
              n &&
                (n.attr({ opacity: 0 }),
                setTimeout(function () {
                  b.graphic &&
                    b.graphic.animate({ opacity: 1 }, { duration: a });
                }, a * y));
            }, this);
            this.points.forEach(function (a) {
              const b = a.graphic;
              !a.isNode &&
                b &&
                b
                  .attr({ opacity: 0 })
                  .animate({ opacity: 1 }, this.options.animation);
            }, this);
          }
        }
        createNode(a) {
          const b = q.prototype.createNode.call(this, a);
          b.getSum = function () {
            return b.linksFrom.concat(b.linksTo).reduce(function (a, b) {
              return a + b.weight;
            }, 0);
          };
          b.offset = function (a) {
            function n(a) {
              return a.fromNode === b ? a.toNode : a.fromNode;
            }
            let f = 0,
              g,
              d = b.linksFrom.concat(b.linksTo),
              t;
            d.sort(function (a, b) {
              return n(a).index - n(b).index;
            });
            for (g = 0; g < d.length; g++)
              if (n(d[g]).index > b.index) {
                d = d.slice(0, g).reverse().concat(d.slice(g).reverse());
                t = !0;
                break;
              }
            t || d.reverse();
            for (g = 0; g < d.length; g++) {
              if (d[g] === a) return f;
              f += d[g].weight;
            }
          };
          return b;
        }
        createNodeColumns() {
          const a = [v.compose([], this)];
          this.nodes.forEach(function (b) {
            b.column = 0;
            a[0].push(b);
          });
          return a;
        }
        getNodePadding() {
          return this.options.nodePadding / Math.PI;
        }
        translate() {
          const a = this.options,
            b = (2 * Math.PI) / (this.chart.plotHeight + this.getNodePadding()),
            f = this.getCenter(),
            n = (a.startAngle - 90) * p,
            c = a.borderRadius,
            g = "object" === typeof c ? c.radius : c;
          q.prototype.translate.call(this);
          this.nodeColumns[0].forEach(function (d) {
            if (d.sum) {
              var c = d.shapeArgs;
              const l = f[0],
                p = f[1],
                h = f[2] / 2,
                m = h - a.nodeWidth,
                k = n + b * (c.y || 0);
              c = n + b * ((c.y || 0) + (c.height || 0));
              d.angle = k + (c - k) / 2;
              d.shapeType = "arc";
              d.shapeArgs = {
                x: l,
                y: p,
                r: h,
                innerR: m,
                start: k,
                end: c,
                borderRadius: g,
              };
              d.dlBox = {
                x: l + (Math.cos((k + c) / 2) * (h + m)) / 2,
                y: p + (Math.sin((k + c) / 2) * (h + m)) / 2,
                width: 1,
                height: 1,
              };
              d.linksFrom.forEach(function (c) {
                if (c.linkBase) {
                  let d;
                  const e = c.linkBase.map(function (e, f) {
                    e *= b;
                    let g = Math.cos(n + e) * (m + 1),
                      k = Math.sin(n + e) * (m + 1),
                      h = a.curveFactor || 0;
                    d = Math.abs(c.linkBase[3 - f] * b - e);
                    d > Math.PI && (d = 2 * Math.PI - d);
                    d *= m;
                    d < m && (h *= d / m);
                    return {
                      x: l + g,
                      y: p + k,
                      cpX: l + (1 - h) * g,
                      cpY: p + (1 - h) * k,
                    };
                  });
                  c.shapeArgs = {
                    d: [
                      ["M", e[0].x, e[0].y],
                      ["A", m, m, 0, 0, 1, e[1].x, e[1].y],
                      [
                        "C",
                        e[1].cpX,
                        e[1].cpY,
                        e[2].cpX,
                        e[2].cpY,
                        e[2].x,
                        e[2].y,
                      ],
                      ["A", m, m, 0, 0, 1, e[3].x, e[3].y],
                      [
                        "C",
                        e[3].cpX,
                        e[3].cpY,
                        e[0].cpX,
                        e[0].cpY,
                        e[0].x,
                        e[0].y,
                      ],
                    ],
                  };
                }
              });
            }
          });
        }
      }
      k.defaultOptions = x(q.defaultOptions, u);
      w(k.prototype, { orderNodes: !1, getCenter: h.prototype.getCenter });
      k.prototype.pointClass = b;
      r.registerSeriesType("dependencywheel", k);
      return k;
    }
  );
  b(a, "masters/modules/dependency-wheel.src.js", [], function () {});
});
//# sourceMappingURL=dependency-wheel.js.map
