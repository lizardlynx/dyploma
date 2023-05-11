/*
 Highcharts JS v11.0.0 (2023-04-26)

 Highcharts cylinder module

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define(
        "highcharts/modules/cylinder",
        ["highcharts", "highcharts/highcharts-3d"],
        function (f) {
          a(f);
          a.Highcharts = f;
          return a;
        }
      )
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function f(a, e, m, f) {
    a.hasOwnProperty(e) ||
      ((a[e] = f.apply(null, m)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: e, module: a[e] },
          })
        ));
  }
  a = a ? a._modules : {};
  f(
    a,
    "Series/Cylinder/CylinderPoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, e) {
      ({
        seriesTypes: {
          column: {
            prototype: { pointClass: a },
          },
        },
      } = a);
      ({ extend: e } = e);
      class h extends a {
        constructor() {
          super(...arguments);
          this.series = this.options = void 0;
        }
      }
      e(h.prototype, { shapeType: "cylinder" });
      return h;
    }
  );
  f(
    a,
    "Series/Cylinder/CylinderComposition.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Math3D.js"],
      a["Core/Renderer/RendererRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, f, q, n) {
      const { parse: h } = a,
        { charts: k, deg2rad: m } = e,
        { perspective: x } = f,
        { merge: y, pick: z } = n;
      a = q.getRendererType().prototype;
      const A = a.cuboidPath,
        p = (b) => !b.some((b) => "C" === b[0]);
      e = y(a.elements3d.cuboid, {
        parts: ["top", "bottom", "front", "back"],
        pathType: "cylinder",
        fillSetter: function (b) {
          this.singleSetterForParts("fill", null, {
            front: b,
            back: b,
            top: h(b).brighten(0.1).get(),
            bottom: h(b).brighten(-0.1).get(),
          });
          this.color = this.fill = b;
          return this;
        },
      });
      a.elements3d.cylinder = e;
      a.cylinder = function (b) {
        return this.element3d("cylinder", b);
      };
      a.cylinderPath = function (b) {
        const a = k[this.chartIndex],
          c = A.call(this, b),
          d = !c.isTop,
          e = !c.isFront,
          f = this.getCylinderEnd(a, b);
        b = this.getCylinderEnd(a, b, !0);
        return {
          front: this.getCylinderFront(f, b),
          back: this.getCylinderBack(f, b),
          top: f,
          bottom: b,
          zIndexes: {
            top: d ? 3 : 0,
            bottom: d ? 0 : 3,
            front: e ? 2 : 1,
            back: e ? 1 : 2,
            group: c.zIndexes.group,
          },
        };
      };
      a.getCylinderFront = function (b, a) {
        b = b.slice(0, 3);
        if (p(a)) {
          var c = a[0];
          "M" === c[0] &&
            (b.push(a[2]), b.push(a[1]), b.push(["L", c[1], c[2]]));
        } else {
          c = a[0];
          const d = a[1];
          a = a[2];
          "M" === c[0] &&
            "C" === d[0] &&
            "C" === a[0] &&
            (b.push(["L", a[5], a[6]]),
            b.push(["C", a[3], a[4], a[1], a[2], d[5], d[6]]),
            b.push(["C", d[3], d[4], d[1], d[2], c[1], c[2]]));
        }
        b.push(["Z"]);
        return b;
      };
      a.getCylinderBack = function (b, a) {
        const c = [];
        if (p(b)) {
          var d = b[0];
          const a = b[2];
          "M" === d[0] &&
            "L" === a[0] &&
            (c.push(["M", a[1], a[2]]),
            c.push(b[3]),
            c.push(["L", d[1], d[2]]));
        } else
          "C" === b[2][0] && c.push(["M", b[2][5], b[2][6]]),
            c.push(b[3], b[4]);
        p(a)
          ? ((b = a[0]),
            "M" === b[0] &&
              (c.push(["L", b[1], b[2]]), c.push(a[3]), c.push(a[2])))
          : ((b = a[2]),
            (d = a[3]),
            (a = a[4]),
            "C" === b[0] &&
              "C" === d[0] &&
              "C" === a[0] &&
              (c.push(["L", a[5], a[6]]),
              c.push(["C", a[3], a[4], a[1], a[2], d[5], d[6]]),
              c.push(["C", d[3], d[4], d[1], d[2], b[5], b[6]])));
        c.push(["Z"]);
        return c;
      };
      a.getCylinderEnd = function (a, e, c) {
        const { width: b = 0, height: f = 0, alphaCorrection: h = 0 } = e;
        let k = z(e.depth, b, 0),
          g = Math.min(b, k) / 2,
          q = m * (a.options.chart.options3d.beta - 90 + h);
        c = (e.y || 0) + (c ? f : 0);
        let l = 0.5519 * g,
          n = b / 2 + (e.x || 0),
          p = k / 2 + (e.z || 0),
          r = [
            { x: 0, y: c, z: g },
            { x: l, y: c, z: g },
            { x: g, y: c, z: l },
            { x: g, y: c, z: 0 },
            { x: g, y: c, z: -l },
            { x: l, y: c, z: -g },
            { x: 0, y: c, z: -g },
            { x: -l, y: c, z: -g },
            { x: -g, y: c, z: -l },
            { x: -g, y: c, z: 0 },
            { x: -g, y: c, z: l },
            { x: -l, y: c, z: g },
            { x: 0, y: c, z: g },
          ],
          v = Math.cos(q),
          w = Math.sin(q),
          t,
          u;
        r.forEach(function (a, b) {
          t = a.x;
          u = a.z;
          r[b].x = t * v - u * w + n;
          r[b].z = u * v + t * w + p;
        });
        a = x(r, a, !0);
        return 2.5 > Math.abs(a[3].y - a[9].y) &&
          2.5 > Math.abs(a[0].y - a[6].y)
          ? this.toLinePath([a[0], a[3], a[6], a[9]], !0)
          : this.getCurvedPath(a);
      };
      a.getCurvedPath = function (a) {
        let b = [["M", a[0].x, a[0].y]],
          c = a.length - 2,
          d;
        for (d = 1; d < c; d += 3)
          b.push([
            "C",
            a[d].x,
            a[d].y,
            a[d + 1].x,
            a[d + 1].y,
            a[d + 2].x,
            a[d + 2].y,
          ]);
        return b;
      };
    }
  );
  f(
    a,
    "Series/Cylinder/CylinderSeries.js",
    [
      a["Series/Cylinder/CylinderPoint.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, f) {
      const {
          seriesTypes: { column: h },
        } = e,
        { extend: n, merge: m } = f;
      class k extends h {
        constructor() {
          super(...arguments);
          this.points = this.options = this.data = void 0;
        }
      }
      k.defaultOptions = m(h.defaultOptions);
      n(k.prototype, { pointClass: a });
      e.registerSeriesType("cylinder", k);
      ("");
      return k;
    }
  );
  f(a, "masters/modules/cylinder.src.js", [], function () {});
});
//# sourceMappingURL=cylinder.js.map
