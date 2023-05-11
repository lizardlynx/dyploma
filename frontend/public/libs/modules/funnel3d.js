/*
 Highcharts JS v11.0.0 (2023-04-26)

 Highcharts funnel module

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define(
        "highcharts/modules/funnel3d",
        [
          "highcharts",
          "highcharts/highcharts-3d",
          "highcharts/modules/cylinder",
        ],
        function (d) {
          a(d);
          a.Highcharts = d;
          return a;
        }
      )
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function d(a, k, m, d) {
    a.hasOwnProperty(k) ||
      ((a[k] = d.apply(null, m)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: k, module: a[k] },
          })
        ));
  }
  a = a ? a._modules : {};
  d(
    a,
    "Series/Funnel3D/Funnel3DComposition.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Renderer/SVG/SVGRenderer3D.js"],
      a["Core/Utilities.js"],
    ],
    function (a, k, m, d) {
      const { parse: p } = a,
        { charts: D } = k,
        { error: N, extend: O, merge: h } = d;
      var x;
      (function (a) {
        function d(a) {
          a.funnel3d = h(a.cuboid, {
            parts:
              "top bottom frontUpper backUpper frontLower backLower rightUpper rightLower".split(
                " "
              ),
            mainParts: ["top", "bottom"],
            sideGroups: ["upperGroup", "lowerGroup"],
            sideParts: {
              upperGroup: ["frontUpper", "backUpper", "rightUpper"],
              lowerGroup: ["frontLower", "backLower", "rightLower"],
            },
            pathType: "funnel3d",
            opacitySetter: function (a) {
              const c = this,
                b = c.parts,
                e = k.charts[c.renderer.chartIndex],
                f = "group-opacity-" + a + "-" + e.index;
              c.parts = c.mainParts;
              c.singleSetterForParts("opacity", a);
              c.parts = b;
              e.renderer.filterId ||
                (e.renderer.definition({
                  tagName: "filter",
                  attributes: { id: f },
                  children: [
                    {
                      tagName: "feComponentTransfer",
                      children: [
                        {
                          tagName: "feFuncA",
                          attributes: { type: "table", tableValues: "0 " + a },
                        },
                      ],
                    },
                  ],
                }),
                c.sideGroups.forEach(function (b) {
                  c[b].attr({ filter: "url(#" + f + ")" });
                }),
                c.renderer.styledMode &&
                  (e.renderer.definition({
                    tagName: "style",
                    textContent:
                      ".highcharts-" + f + " {filter:url(#" + f + ")}",
                  }),
                  c.sideGroups.forEach(function (c) {
                    c.addClass("highcharts-" + f);
                  })));
              return c;
            },
            fillSetter: function (a) {
              let c = this,
                b = p(a),
                e = b.rgba[3],
                f = {
                  top: p(a).brighten(0.1).get(),
                  bottom: p(a).brighten(-0.2).get(),
                };
              1 > e
                ? ((b.rgba[3] = 1), (b = b.get("rgb")), c.attr({ opacity: e }))
                : (b = a);
              b.linearGradient ||
                b.radialGradient ||
                !c.gradientForSides ||
                (b = {
                  linearGradient: { x1: 0, x2: 1, y1: 1, y2: 1 },
                  stops: [
                    [0, p(a).brighten(-0.2).get()],
                    [0.5, a],
                    [1, p(a).brighten(-0.2).get()],
                  ],
                });
              b.linearGradient
                ? c.sideGroups.forEach(function (a) {
                    const e = c[a].gradientBox,
                      g = b.linearGradient,
                      A = h(b, {
                        linearGradient: {
                          x1: e.x + g.x1 * e.width,
                          y1: e.y + g.y1 * e.height,
                          x2: e.x + g.x2 * e.width,
                          y2: e.y + g.y2 * e.height,
                        },
                      });
                    c.sideParts[a].forEach(function (c) {
                      f[c] = A;
                    });
                  })
                : (h(!0, f, {
                    frontUpper: b,
                    backUpper: b,
                    rightUpper: b,
                    frontLower: b,
                    backLower: b,
                    rightLower: b,
                  }),
                  b.radialGradient &&
                    c.sideGroups.forEach(function (b) {
                      const a = c[b].gradientBox,
                        e = a.x + a.width / 2,
                        f = a.y + a.height / 2,
                        A = Math.min(a.width, a.height);
                      c.sideParts[b].forEach(function (b) {
                        c[b].setRadialReference([e, f, A]);
                      });
                    }));
              c.singleSetterForParts("fill", null, f);
              c.color = c.fill = a;
              b.linearGradient &&
                [c.frontLower, c.frontUpper].forEach(function (b) {
                  (b = (b = b.element) && c.renderer.gradients[b.gradient]) &&
                    "userSpaceOnUse" !== b.attr("gradientUnits") &&
                    b.attr({ gradientUnits: "userSpaceOnUse" });
                });
              return c;
            },
            adjustForGradient: function () {
              let a = this,
                c;
              a.sideGroups.forEach(function (b) {
                let e = { x: Number.MAX_VALUE, y: Number.MAX_VALUE },
                  f = { x: -Number.MAX_VALUE, y: -Number.MAX_VALUE };
                a.sideParts[b].forEach(function (b) {
                  c = a[b].getBBox(!0);
                  e = { x: Math.min(e.x, c.x), y: Math.min(e.y, c.y) };
                  f = {
                    x: Math.max(f.x, c.x + c.width),
                    y: Math.max(f.y, c.y + c.height),
                  };
                });
                a[b].gradientBox = {
                  x: e.x,
                  width: f.x - e.x,
                  y: e.y,
                  height: f.y - e.y,
                };
              });
            },
            zIndexSetter: function () {
              this.finishedOnAdd && this.adjustForGradient();
              return this.renderer.Element.prototype.zIndexSetter.apply(
                this,
                arguments
              );
            },
            onAdd: function () {
              this.adjustForGradient();
              this.finishedOnAdd = !0;
            },
          });
        }
        function w(a) {
          const k = a.prototype;
          O(k, {
            funnel3d: function (c) {
              const b = this.element3d("funnel3d", c),
                a = this.styledMode,
                f = { "stroke-width": 1, stroke: "none" };
              b.upperGroup = this.g("funnel3d-upper-group")
                .attr({ zIndex: b.frontUpper.zIndex })
                .add(b);
              [b.frontUpper, b.backUpper, b.rightUpper].forEach(function (c) {
                a || c.attr(f);
                c.add(b.upperGroup);
              });
              b.lowerGroup = this.g("funnel3d-lower-group")
                .attr({ zIndex: b.frontLower.zIndex })
                .add(b);
              [b.frontLower, b.backLower, b.rightLower].forEach(function (c) {
                a || c.attr(f);
                c.add(b.lowerGroup);
              });
              b.gradientForSides = c.gradientForSides;
              return b;
            },
            funnel3dPath: function (c) {
              this.getCylinderEnd ||
                N(
                  "A required Highcharts module is missing: cylinder.js",
                  !0,
                  D[this.chartIndex]
                );
              let b = D[this.chartIndex],
                a = (c.alphaCorrection =
                  90 - Math.abs((b.options.chart.options3d.alpha % 180) - 90));
              var f = k.cuboidPath.call(
                this,
                h(c, { depth: c.width, width: (c.width + c.bottom.width) / 2 })
              );
              let A = f.isTop,
                B = !f.isFront,
                g = !!c.middle;
              var d = this.getCylinderEnd(
                b,
                h(c, {
                  x: c.x - c.width / 2,
                  z: c.z - c.width / 2,
                  alphaCorrection: a,
                })
              );
              let t = c.bottom.width,
                m = h(c, {
                  width: t,
                  x: c.x - t / 2,
                  z: c.z - t / 2,
                  alphaCorrection: a,
                }),
                q = this.getCylinderEnd(b, m, !0),
                l = t,
                u = m,
                n = q,
                p = q;
              g &&
                ((l = c.middle.width),
                (u = h(c, {
                  y: c.y + c.middle.fraction * c.height,
                  width: l,
                  x: c.x - l / 2,
                  z: c.z - l / 2,
                })),
                (n = this.getCylinderEnd(b, u, !1)),
                (p = this.getCylinderEnd(b, u, !1)));
              f = {
                top: d,
                bottom: q,
                frontUpper: this.getCylinderFront(d, n),
                zIndexes: {
                  group: f.zIndexes.group,
                  top: 0 !== A ? 0 : 3,
                  bottom: 1 !== A ? 0 : 3,
                  frontUpper: B ? 2 : 1,
                  backUpper: B ? 1 : 2,
                  rightUpper: B ? 2 : 1,
                },
              };
              f.backUpper = this.getCylinderBack(d, n);
              d = 1 !== Math.min(l, c.width) / Math.max(l, c.width);
              f.rightUpper = this.getCylinderFront(
                this.getCylinderEnd(
                  b,
                  h(c, {
                    x: c.x - c.width / 2,
                    z: c.z - c.width / 2,
                    alphaCorrection: d ? -a : 0,
                  }),
                  !1
                ),
                this.getCylinderEnd(
                  b,
                  h(u, { alphaCorrection: d ? -a : 0 }),
                  !g
                )
              );
              g &&
                ((d = 1 !== Math.min(l, t) / Math.max(l, t)),
                h(!0, f, {
                  frontLower: this.getCylinderFront(p, q),
                  backLower: this.getCylinderBack(p, q),
                  rightLower: this.getCylinderFront(
                    this.getCylinderEnd(
                      b,
                      h(m, { alphaCorrection: d ? -a : 0 }),
                      !0
                    ),
                    this.getCylinderEnd(
                      b,
                      h(u, { alphaCorrection: d ? -a : 0 }),
                      !1
                    )
                  ),
                  zIndexes: {
                    frontLower: B ? 2 : 1,
                    backLower: B ? 1 : 2,
                    rightLower: B ? 1 : 2,
                  },
                }));
              return f;
            },
          });
        }
        a.compose = function (a) {
          m.compose(a);
          d(a.prototype.elements3d);
          w(a);
        };
      })(x || (x = {}));
      return x;
    }
  );
  d(
    a,
    "Series/Funnel3D/Funnel3DPoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, d) {
      ({
        seriesTypes: { column: a },
      } = a);
      ({ extend: d } = d);
      class k extends a.prototype.pointClass {
        constructor() {
          super(...arguments);
          this.y = this.series = this.options = this.dlBoxRaw = void 0;
        }
      }
      d(k.prototype, { shapeType: "funnel3d" });
      return k;
    }
  );
  d(
    a,
    "Series/Funnel3D/Funnel3DSeries.js",
    [
      a["Series/Funnel3D/Funnel3DComposition.js"],
      a["Series/Funnel3D/Funnel3DPoint.js"],
      a["Core/Globals.js"],
      a["Core/Math3D.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, d, m, L, p, M) {
      ({ noop: m } = m);
      const { perspective: k } = L,
        {
          series: D,
          seriesTypes: { column: h },
        } = p,
        { extend: x, merge: K, pick: E, relativeLength: w } = M;
      class q extends h {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = this.center = void 0;
        }
        alignDataLabel(a, c, b) {
          const e = a.dlBoxRaw,
            f = this.chart.inverted,
            d = a.plotY > E(this.translatedThreshold, this.yAxis.len),
            k = E(b.inside, !!this.options.stacking),
            g = { x: e.x, y: e.y, height: 0 };
          b.align = E(b.align, !f || k ? "center" : d ? "right" : "left");
          b.verticalAlign = E(
            b.verticalAlign,
            f || k ? "middle" : d ? "top" : "bottom"
          );
          "top" !== b.verticalAlign &&
            (g.y += e.bottom / ("bottom" === b.verticalAlign ? 1 : 2));
          g.width = this.getWidthAt(g.y);
          this.options.reversed && (g.width = e.fullWidth - g.width);
          k
            ? (g.x -= g.width / 2)
            : "left" === b.align
            ? ((b.align = "right"), (g.x -= 1.5 * g.width))
            : "right" === b.align
            ? ((b.align = "left"), (g.x += g.width / 2))
            : (g.x -= g.width / 2);
          a.dlBox = g;
          h.prototype.alignDataLabel.apply(this, arguments);
        }
        bindAxes() {
          D.prototype.bindAxes.apply(this, arguments);
          x(this.xAxis.options, {
            gridLineWidth: 0,
            lineWidth: 0,
            title: void 0,
            tickPositions: [],
          });
          K(!0, this.yAxis.options, {
            gridLineWidth: 0,
            title: void 0,
            labels: { enabled: !1 },
          });
        }
        translate() {
          D.prototype.translate.apply(this, arguments);
          let a = 0,
            c = this.chart,
            b = this.options,
            e = b.reversed,
            f = b.ignoreHiddenPoint;
          var d = c.plotWidth;
          let h = c.plotHeight,
            g = 0,
            p = b.center,
            t = w(p[0], d),
            m = w(p[1], h),
            q = w(b.width, d),
            l,
            u,
            n = w(b.height, h),
            G = w(b.neckWidth, d),
            H = w(b.neckHeight, h),
            C = m - n / 2 + n - H;
          d = this.data;
          let y, I, v, z, J, F, r;
          this.getWidthAt = u = function (a) {
            const b = m - n / 2;
            return a > C || n === H ? G : G + (q - G) * (1 - (a - b) / (n - H));
          };
          this.center = [t, m, n];
          this.centerX = t;
          d.forEach(function (b) {
            (f && !1 === b.visible) || (a += b.y);
          });
          d.forEach(function (d) {
            J = null;
            y = a ? d.y / a : 0;
            v = m - n / 2 + g * n;
            z = v + y * n;
            l = u(v);
            F = z - v;
            r = {
              gradientForSides: E(
                d.options.gradientForSides,
                b.gradientForSides
              ),
              x: t,
              y: v,
              height: F,
              width: l,
              z: 1,
              top: { width: l },
            };
            l = u(z);
            r.bottom = { fraction: y, width: l };
            v >= C
              ? (r.isCylinder = !0)
              : z > C &&
                ((J = z),
                (l = u(C)),
                (z = C),
                (r.bottom.width = l),
                (r.middle = { fraction: F ? (C - v) / F : 0, width: l }));
            e &&
              ((r.y = v = m + n / 2 - (g + y) * n),
              r.middle && (r.middle.fraction = 1 - (F ? r.middle.fraction : 0)),
              (l = r.width),
              (r.width = r.bottom.width),
              (r.bottom.width = l));
            d.shapeArgs = x(d.shapeArgs, r);
            d.percentage = 100 * y;
            d.plotX = t;
            d.plotY = e ? m + n / 2 - (g + y / 2) * n : (v + (J || z)) / 2;
            I = k(
              [
                {
                  x: t,
                  y: d.plotY,
                  z: e ? -(q - u(d.plotY)) / 2 : -u(d.plotY) / 2,
                },
              ],
              c,
              !0
            )[0];
            d.tooltipPos = [I.x, I.y];
            d.dlBoxRaw = {
              x: t,
              width: u(d.plotY),
              y: v,
              bottom: r.height || 0,
              fullWidth: q,
            };
            (f && !1 === d.visible) || (g += y);
          });
        }
      }
      q.compose = a.compose;
      q.defaultOptions = K(h.defaultOptions, {
        center: ["50%", "50%"],
        width: "90%",
        neckWidth: "30%",
        height: "100%",
        neckHeight: "25%",
        reversed: !1,
        gradientForSides: !0,
        animation: !1,
        edgeWidth: 0,
        colorByPoint: !0,
        showInLegend: !1,
        dataLabels: { align: "right", crop: !1, inside: !1, overflow: "allow" },
      });
      x(q.prototype, { pointClass: d, translate3dShapes: m });
      p.registerSeriesType("funnel3d", q);
      ("");
      return q;
    }
  );
  d(
    a,
    "masters/modules/funnel3d.src.js",
    [
      a["Core/Renderer/RendererRegistry.js"],
      a["Series/Funnel3D/Funnel3DSeries.js"],
    ],
    function (a, d) {
      d.compose(a.getRendererType());
      return d;
    }
  );
});
//# sourceMappingURL=funnel3d.js.map
