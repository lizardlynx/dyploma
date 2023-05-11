/*
 Highcharts JS v11.0.0 (2023-04-26)

 (c) 2009-2022

 License: www.highcharts.com/license
*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/flowmap", ["highcharts"], function (t) {
        a(t);
        a.Highcharts = t;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function t(a, e, d, k) {
    a.hasOwnProperty(e) ||
      ((a[e] = k.apply(null, d)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: e, module: a[e] },
          })
        ));
  }
  a = a ? a._modules : {};
  t(
    a,
    "Series/FlowMap/FlowMapPoint.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, e) {
      ({
        seriesTypes: {
          mapline: {
            prototype: { pointClass: a },
          },
        },
      } = a);
      const { pick: d, isString: k, isNumber: b } = e;
      class c extends a {
        constructor() {
          super(...arguments);
          this.series = this.options = void 0;
        }
        isValid() {
          let c = !(!this.options.to || !this.options.from);
          [this.options.to, this.options.from].forEach(function (f) {
            c = !!(
              c &&
              f &&
              (k(f) || (b(d(f[0], f.lat)) && b(d(f[1], f.lon))))
            );
          });
          return c;
        }
      }
      return c;
    }
  );
  t(
    a,
    "Series/ColorMapComposition.js",
    [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
    function (a, e) {
      const {
          column: { prototype: d },
        } = a.seriesTypes,
        { addEvent: k, defined: b } = e;
      var c;
      (function (c) {
        function f(b) {
          this.moveToTopOnHover &&
            this.graphic &&
            this.graphic.attr({ zIndex: b && "hover" === b.state ? 1 : 0 });
        }
        const a = [];
        c.pointMembers = {
          dataLabelOnNull: !0,
          moveToTopOnHover: !0,
          isValid: function () {
            return (
              null !== this.value &&
              Infinity !== this.value &&
              -Infinity !== this.value &&
              (void 0 === this.value || !isNaN(this.value))
            );
          },
        };
        c.seriesMembers = {
          colorKey: "value",
          axisTypes: ["xAxis", "yAxis", "colorAxis"],
          parallelArrays: ["x", "y", "value"],
          pointArrayMap: ["value"],
          trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
          colorAttribs: function (c) {
            const g = {};
            !b(c.color) ||
              (c.state && "normal" !== c.state) ||
              (g[this.colorProp || "fill"] = c.color);
            return g;
          },
          pointAttribs: d.pointAttribs,
        };
        c.compose = function (c) {
          const g = c.prototype.pointClass;
          e.pushUnique(a, g) && k(g, "afterSetState", f);
          return c;
        };
      })(c || (c = {}));
      return c;
    }
  );
  t(
    a,
    "Maps/MapSymbols.js",
    [a["Core/Renderer/SVG/SVGRenderer.js"]],
    function (a) {
      const {
        prototype: { symbols: e },
      } = a;
      e.bottombutton = function (a, k, b, c, f) {
        if (f) {
          const b = (null === f || void 0 === f ? void 0 : f.r) || 0;
          f.brBoxY = k - b;
          f.brBoxHeight = c + b;
        }
        return e.roundedRect(a, k, b, c, f);
      };
      e.topbutton = function (a, k, b, c, f) {
        f &&
          (f.brBoxHeight =
            c + ((null === f || void 0 === f ? void 0 : f.r) || 0));
        return e.roundedRect(a, k, b, c, f);
      };
      return e;
    }
  );
  t(
    a,
    "Core/Chart/MapChart.js",
    [
      a["Core/Chart/Chart.js"],
      a["Core/Defaults.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d, k) {
      const { getOptions: b } = e,
        { merge: c, pick: f } = k;
      class m extends a {
        init(a, F) {
          const g = b().credits;
          a = c(
            {
              chart: { panning: { enabled: !0, type: "xy" }, type: "map" },
              credits: {
                mapText: f(
                  g.mapText,
                  ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'
                ),
                mapTextFull: f(g.mapTextFull, "{geojson.copyright}"),
              },
              mapView: {},
              tooltip: { followTouchMove: !1 },
            },
            a
          );
          super.init(a, F);
        }
      }
      (function (c) {
        c.maps = {};
        c.mapChart = function (b, g, a) {
          return new c(b, g, a);
        };
        c.splitPath = function (c) {
          "string" === typeof c &&
            ((c = c
              .replace(/([A-Za-z])/g, " $1 ")
              .replace(/^\s*/, "")
              .replace(/\s*$/, "")),
            (c = c
              .split(/[ ,;]+/)
              .map((g) => (/[A-za-z]/.test(g) ? g : parseFloat(g)))));
          return d.prototype.pathToSegments(c);
        };
      })(m || (m = {}));
      return m;
    }
  );
  t(a, "Maps/MapUtilities.js", [], function () {
    return {
      boundsFromPath: function (a) {
        let e = -Number.MAX_VALUE,
          d = Number.MAX_VALUE,
          k = -Number.MAX_VALUE,
          b = Number.MAX_VALUE,
          c;
        a.forEach((a) => {
          const f = a[a.length - 2];
          a = a[a.length - 1];
          "number" === typeof f &&
            "number" === typeof a &&
            ((d = Math.min(d, f)),
            (e = Math.max(e, f)),
            (b = Math.min(b, a)),
            (k = Math.max(k, a)),
            (c = !0));
        });
        if (c) return { x1: d, y1: b, x2: e, y2: k };
      },
      pointInPolygon: function (a, e) {
        let d,
          k,
          b,
          c = !1,
          f = a.x,
          m = a.y;
        a = 0;
        for (d = e.length - 1; a < e.length; d = a++)
          (k = e[a][1] > m),
            (b = e[d][1] > m),
            k !== b &&
              f <
                ((e[d][0] - e[a][0]) * (m - e[a][1])) / (e[d][1] - e[a][1]) +
                  e[a][0] &&
              (c = !c);
        return c;
      },
    };
  });
  t(
    a,
    "Series/Map/MapPoint.js",
    [
      a["Series/ColorMapComposition.js"],
      a["Maps/MapUtilities.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d, k) {
      const { boundsFromPath: b } = e;
      ({
        seriesTypes: { scatter: e },
      } = d);
      const { extend: c, isNumber: f, pick: m } = k;
      class n extends e.prototype.pointClass {
        constructor() {
          super(...arguments);
          this.series = this.path = this.options = void 0;
        }
        static getProjectedPath(a, g) {
          a.projectedPath ||
            (g && a.geometry
              ? ((g.hasCoordinates = !0),
                (a.projectedPath = g.path(a.geometry)))
              : (a.projectedPath = a.path));
          return a.projectedPath || [];
        }
        applyOptions(a, g) {
          const b = this.series;
          a = super.applyOptions.call(this, a, g);
          g = b.joinBy;
          b.mapData &&
            b.mapMap &&
            ((g = super.getNestedProperty.call(a, g[1])),
            (g = "undefined" !== typeof g && b.mapMap[g])
              ? c(a, g)
              : -1 !== b.pointArrayMap.indexOf("value") &&
                (a.value = a.value || null));
          return a;
        }
        getProjectedBounds(a) {
          a = n.getProjectedPath(this, a);
          a = b(a);
          var g = this.properties,
            c = this.series.chart.mapView;
          if (a) {
            const b = g && g["hc-middle-lon"],
              z = g && g["hc-middle-lat"];
            if (c && f(b) && f(z)) {
              if ((g = c.lonLatToProjectedUnits({ lon: b, lat: z })))
                (a.midX = g.x), (a.midY = g.y);
            } else
              (c = g && g["hc-middle-x"]),
                (g = g && g["hc-middle-y"]),
                (a.midX =
                  a.x1 + (a.x2 - a.x1) * m(this.middleX, f(c) ? c : 0.5)),
                (g = m(this.middleY, f(g) ? g : 0.5)),
                this.geometry || (g = 1 - g),
                (a.midY = a.y2 - (a.y2 - a.y1) * g);
            return a;
          }
        }
        onMouseOver(a) {
          k.clearTimeout(this.colorInterval);
          if (
            (!this.isNull && this.visible) ||
            this.series.options.nullInteraction
          )
            super.onMouseOver.call(this, a);
          else this.series.onMouseOut(a);
        }
        setVisible(a) {
          const g = a ? "show" : "hide";
          this.visible = this.options.visible = !!a;
          if (this.dataLabel) this.dataLabel[g]();
          this.graphic && this.graphic.attr(this.series.pointAttribs(this));
        }
        zoomTo(a) {
          const g = this.series.chart,
            c = g.mapView;
          var b = this.bounds;
          if (c && b) {
            const v = f(this.insetIndex) && c.insets[this.insetIndex];
            if (v) {
              var z = v.projectedUnitsToPixels({ x: b.x1, y: b.y1 });
              b = v.projectedUnitsToPixels({ x: b.x2, y: b.y2 });
              z = c.pixelsToProjectedUnits({ x: z.x, y: z.y });
              b = c.pixelsToProjectedUnits({ x: b.x, y: b.y });
              b = { x1: z.x, y1: z.y, x2: b.x, y2: b.y };
            }
            c.fitToBounds(b, void 0, !1);
            this.series.isDirty = !0;
            g.redraw(a);
          }
        }
      }
      c(n.prototype, {
        dataLabelOnNull: a.pointMembers.dataLabelOnNull,
        moveToTopOnHover: a.pointMembers.moveToTopOnHover,
        isValid: a.pointMembers.isValid,
      });
      return n;
    }
  );
  t(a, "Maps/MapViewOptionsDefault.js", [], function () {
    return {
      center: [0, 0],
      fitToGeometry: void 0,
      maxZoom: void 0,
      padding: 0,
      projection: { name: void 0, parallels: void 0, rotation: void 0 },
      zoom: void 0,
    };
  });
  t(a, "Maps/MapViewInsetsOptionsDefault.js", [], function () {
    return {
      borderColor: "#cccccc",
      borderWidth: 1,
      center: [0, 0],
      padding: "10%",
      relativeTo: "mapBoundingBox",
      units: "percent",
    };
  });
  t(
    a,
    "Extensions/GeoJSON.js",
    [
      a["Core/Chart/Chart.js"],
      a["Core/FormatUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d, k) {
      function b(a, b) {
        b || (b = Object.keys(a.objects)[0]);
        b = a.objects[b];
        if (b["hc-decoded-geojson"]) return b["hc-decoded-geojson"];
        let c = a.arcs;
        if (a.transform) {
          const { scale: b, translate: g } = a.transform;
          c = a.arcs.map((a) => {
            let c = 0,
              h = 0;
            return a.map((a) => {
              a = a.slice();
              a[0] = (c += a[0]) * b[0] + g[0];
              a[1] = (h += a[1]) * b[1] + g[1];
              return a;
            });
          });
        }
        const g = (a) =>
            "number" === typeof a[0]
              ? a.reduce((a, b, g) => {
                  let h = 0 > b ? c[~b] : c[b];
                  0 > b
                    ? ((h = h.slice(0, 0 === g ? h.length : h.length - 1)),
                      h.reverse())
                    : g && (h = h.slice(1));
                  return a.concat(h);
                }, [])
              : a.map(g),
          v = b.geometries.map((a) => ({
            type: "Feature",
            properties: a.properties,
            geometry: { type: a.type, coordinates: a.coordinates || g(a.arcs) },
          }));
        a = {
          type: "FeatureCollection",
          copyright: a.copyright,
          copyrightShort: a.copyrightShort,
          copyrightUrl: a.copyrightUrl,
          features: v,
          "hc-recommended-mapview": b["hc-recommended-mapview"],
          bbox: a.bbox,
          title: a.title,
        };
        return (b["hc-decoded-geojson"] = a);
      }
      function c(a, g = "map", c) {
        const v = [];
        a = "Topology" === a.type ? b(a) : a;
        a.features.forEach(function (a) {
          var b = a.geometry || {},
            c = b.type;
          b = b.coordinates;
          a = a.properties;
          let f;
          ("map" !== g && "mapbubble" !== g) ||
          ("Polygon" !== c && "MultiPolygon" !== c)
            ? "mapline" !== g || ("LineString" !== c && "MultiLineString" !== c)
              ? "mappoint" === g &&
                "Point" === c &&
                b.length &&
                (f = { geometry: { coordinates: b, type: c } })
              : b.length && (f = { geometry: { coordinates: b, type: c } })
            : b.length && (f = { geometry: { coordinates: b, type: c } });
          if (f) {
            c = a && (a.name || a.NAME);
            b = a && a.lon;
            const g = a && a.lat;
            v.push(
              q(f, {
                lat: "number" === typeof g ? g : void 0,
                lon: "number" === typeof b ? b : void 0,
                name: "string" === typeof c ? c : void 0,
                properties: a,
              })
            );
          }
        });
        c &&
          a.copyrightShort &&
          ((c.chart.mapCredits = f(c.chart.options.credits.mapText, {
            geojson: a,
          })),
          (c.chart.mapCreditsFull = f(c.chart.options.credits.mapTextFull, {
            geojson: a,
          })));
        return v;
      }
      const { format: f } = e,
        { win: m } = d,
        { error: n, extend: q, merge: g, wrap: O } = k;
      ("");
      a.prototype.transformFromLatLon = function (a, b) {
        var c = this.options.chart.proj4 || m.proj4;
        if (c) {
          var {
            jsonmarginX: g = 0,
            jsonmarginY: f = 0,
            jsonres: h = 1,
            scale: p = 1,
            xoffset: d = 0,
            xpan: r = 0,
            yoffset: k = 0,
            ypan: w = 0,
          } = b;
          a = c(b.crs, [a.lon, a.lat]);
          c = b.cosAngle || (b.rotation && Math.cos(b.rotation));
          var v = b.sinAngle || (b.rotation && Math.sin(b.rotation));
          b = b.rotation ? [a[0] * c + a[1] * v, -a[0] * v + a[1] * c] : a;
          return {
            x: ((b[0] - d) * p + r) * h + g,
            y: -(((k - b[1]) * p + w) * h - f),
          };
        }
        n(21, !1, this);
      };
      a.prototype.transformToLatLon = function (a, b) {
        const c = this.options.chart.proj4 || m.proj4;
        if (!c) n(21, !1, this);
        else if (null !== a.y) {
          var {
            jsonmarginX: g = 0,
            jsonmarginY: f = 0,
            jsonres: h = 1,
            scale: p = 1,
            xoffset: d = 0,
            xpan: r = 0,
            yoffset: k = 0,
            ypan: w = 0,
          } = b;
          a = {
            x: ((a.x - g) / h - r) / p + d,
            y: ((a.y - f) / h + w) / p + k,
          };
          var e = b.cosAngle || (b.rotation && Math.cos(b.rotation)),
            l = b.sinAngle || (b.rotation && Math.sin(b.rotation));
          b = c(
            b.crs,
            "WGS84",
            b.rotation ? { x: a.x * e + a.y * -l, y: a.x * l + a.y * e } : a
          );
          return { lat: b.y, lon: b.x };
        }
      };
      a.prototype.fromPointToLatLon = function (a) {
        return this.mapView && this.mapView.projectedUnitsToLonLat(a);
      };
      a.prototype.fromLatLonToPoint = function (a) {
        return this.mapView && this.mapView.lonLatToProjectedUnits(a);
      };
      O(a.prototype, "addCredits", function (a, b) {
        b = g(!0, this.options.credits, b);
        this.mapCredits && (b.href = null);
        a.call(this, b);
        this.credits &&
          this.mapCreditsFull &&
          this.credits.attr({ title: this.mapCreditsFull });
      });
      d.geojson = c;
      d.topo2geo = b;
      return { geojson: c, topo2geo: b };
    }
  );
  t(a, "Core/Geometry/PolygonClip.js", [], function () {
    const a = (a, b, c) =>
        (b[0] - a[0]) * (c[1] - a[1]) > (b[1] - a[1]) * (c[0] - a[0]),
      e = (a, b, c, f) => {
        var d = [a[0] - b[0], a[1] - b[1]];
        const e = [c[0] - f[0], c[1] - f[1]];
        a = a[0] * b[1] - a[1] * b[0];
        c = c[0] * f[1] - c[1] * f[0];
        f = 1 / (d[0] * e[1] - d[1] * e[0]);
        d = [(a * e[0] - c * d[0]) * f, (a * e[1] - c * d[1]) * f];
        d.isIntersection = !0;
        return d;
      };
    var d;
    (function (d) {
      d.clipLineString = (a, c) => {
        const b = [];
        a = d.clipPolygon(a, c, !1);
        for (c = 1; c < a.length; c++)
          a[c].isIntersection &&
            a[c - 1].isIntersection &&
            (b.push(a.splice(0, c)), (c = 0)),
            c === a.length - 1 && b.push(a);
        return b;
      };
      d.clipPolygon = (b, c, d = !0) => {
        let f = c[c.length - 1],
          k,
          q,
          g = b;
        for (let m = 0; m < c.length; m++) {
          const v = g;
          b = c[m];
          g = [];
          k = d ? v[v.length - 1] : v[0];
          for (let c = 0; c < v.length; c++)
            (q = v[c]),
              a(f, b, q)
                ? (a(f, b, k) || g.push(e(f, b, k, q)), g.push(q))
                : a(f, b, k) && g.push(e(f, b, k, q)),
              (k = q);
          f = b;
        }
        return g;
      };
    })(d || (d = {}));
    return d;
  });
  t(a, "Maps/Projections/LambertConformalConic.js", [], function () {
    const a = Math.sign || ((a) => (0 === a ? 0 : 0 < a ? 1 : -1)),
      e = Math.PI / 180,
      d = Math.PI / 2;
    class k {
      constructor(b) {
        var c,
          f = (b.parallels || []).map((a) => a * e);
        const k = f[0] || 0;
        f = null !== (c = f[1]) && void 0 !== c ? c : k;
        c = Math.cos(k);
        "object" === typeof b.projectedBounds &&
          (this.projectedBounds = b.projectedBounds);
        b =
          k === f
            ? Math.sin(k)
            : Math.log(c / Math.cos(f)) /
              Math.log(Math.tan((d + f) / 2) / Math.tan((d + k) / 2));
        1e-10 > Math.abs(b) && (b = 1e-10 * (a(b) || 1));
        this.n = b;
        this.c = (c * Math.pow(Math.tan((d + k) / 2), b)) / b;
      }
      forward(a) {
        var b = a[0] * e;
        const { c: f, n: k, projectedBounds: n } = this;
        a = a[1] * e;
        0 < f
          ? a < -d + 0.000001 && (a = -d + 0.000001)
          : a > d - 0.000001 && (a = d - 0.000001);
        var q = f / Math.pow(Math.tan((d + a) / 2), k);
        a = q * Math.sin(k * b) * 63.78137;
        b = 63.78137 * (f - q * Math.cos(k * b));
        q = [a, b];
        n && (a < n.x1 || a > n.x2 || b < n.y1 || b > n.y2) && (q.outside = !0);
        return q;
      }
      inverse(b) {
        const c = b[0] / 63.78137;
        b = b[1] / 63.78137;
        const { c: f, n: k } = this;
        b = f - b;
        const q = a(k) * Math.sqrt(c * c + b * b);
        let F = Math.atan2(c, Math.abs(b)) * a(b);
        0 > b * k && (F -= Math.PI * a(c) * a(b));
        return [F / k / e, (2 * Math.atan(Math.pow(f / q, 1 / k)) - d) / e];
      }
    }
    return k;
  });
  t(a, "Maps/Projections/EqualEarth.js", [], function () {
    const a = Math.sqrt(3) / 2;
    class e {
      constructor() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -97.52595454902263,
          y2: 97.52595454902263,
        };
      }
      forward(d) {
        const k = Math.PI / 180,
          b = Math.asin(a * Math.sin(d[1] * k)),
          c = b * b,
          f = c * c * c;
        return [
          (d[0] * k * Math.cos(b) * 74.03120656864502) /
            (a *
              (1.340264 +
                3 * -0.081106 * c +
                f * (7 * 0.000893 + 0.034164 * c))),
          74.03120656864502 *
            b *
            (1.340264 + -0.081106 * c + f * (0.000893 + 0.003796 * c)),
        ];
      }
      inverse(d) {
        const k = d[0] / 74.03120656864502;
        d = d[1] / 74.03120656864502;
        const b = 180 / Math.PI;
        let c = d;
        let f;
        let e;
        for (e = 0; 12 > e; ++e) {
          var n = c * c;
          f = n * n * n;
          var q =
            c * (1.340264 + -0.081106 * n + f * (0.000893 + 0.003796 * n)) - d;
          n = 1.340264 + 3 * -0.081106 * n + f * (7 * 0.000893 + 0.034164 * n);
          c -= q /= n;
          if (1e-9 > Math.abs(q)) break;
        }
        n = c * c;
        return [
          (b *
            a *
            k *
            (1.340264 +
              3 * -0.081106 * n +
              n * n * n * (7 * 0.000893 + 0.034164 * n))) /
            Math.cos(c),
          b * Math.asin(Math.sin(c) / a),
        ];
      }
    }
    return e;
  });
  t(a, "Maps/Projections/Miller.js", [], function () {
    const a = Math.PI / 4,
      e = Math.PI / 180;
    class d {
      constructor() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -146.91480769173063,
          y2: 146.91480769173063,
        };
      }
      forward(d) {
        return [
          d[0] * e * 63.78137,
          79.7267125 * Math.log(Math.tan(a + 0.4 * d[1] * e)),
        ];
      }
      inverse(d) {
        return [
          d[0] / 63.78137 / e,
          (2.5 * (Math.atan(Math.exp((d[1] / 63.78137) * 0.8)) - a)) / e,
        ];
      }
    }
    return d;
  });
  t(a, "Maps/Projections/Orthographic.js", [], function () {
    const a = Math.PI / 180;
    class e {
      constructor() {
        this.antimeridianCutting = !1;
        this.bounds = {
          x1: -63.78460826781007,
          x2: 63.78460826781007,
          y1: -63.78460826781007,
          y2: 63.78460826781007,
        };
      }
      forward(d) {
        const e = d[0];
        d = d[1] * a;
        d = [
          Math.cos(d) * Math.sin(e * a) * 63.78460826781007,
          63.78460826781007 * Math.sin(d),
        ];
        if (-90 > e || 90 < e) d.outside = !0;
        return d;
      }
      inverse(d) {
        const e = d[0] / 63.78460826781007;
        d = d[1] / 63.78460826781007;
        const b = Math.sqrt(e * e + d * d),
          c = Math.asin(b),
          f = Math.sin(c);
        return [
          Math.atan2(e * f, b * Math.cos(c)) / a,
          Math.asin(b && (d * f) / b) / a,
        ];
      }
    }
    return e;
  });
  t(a, "Maps/Projections/WebMercator.js", [], function () {
    const a = Math.PI / 180;
    class e {
      constructor() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -200.3750834278071,
          y2: 200.3750834278071,
        };
        this.maxLatitude = 85.0511287798;
      }
      forward(d) {
        var e = Math.sin(d[1] * a);
        e = [63.78137 * d[0] * a, (63.78137 * Math.log((1 + e) / (1 - e))) / 2];
        85.0511287798 < Math.abs(d[1]) && (e.outside = !0);
        return e;
      }
      inverse(d) {
        return [
          d[0] / (63.78137 * a),
          (2 * Math.atan(Math.exp(d[1] / 63.78137)) - Math.PI / 2) / a,
        ];
      }
    }
    return e;
  });
  t(
    a,
    "Maps/Projections/ProjectionRegistry.js",
    [
      a["Maps/Projections/LambertConformalConic.js"],
      a["Maps/Projections/EqualEarth.js"],
      a["Maps/Projections/Miller.js"],
      a["Maps/Projections/Orthographic.js"],
      a["Maps/Projections/WebMercator.js"],
    ],
    function (a, e, d, k, b) {
      return {
        EqualEarth: e,
        LambertConformalConic: a,
        Miller: d,
        Orthographic: k,
        WebMercator: b,
      };
    }
  );
  t(
    a,
    "Maps/Projection.js",
    [
      a["Core/Geometry/PolygonClip.js"],
      a["Maps/Projections/ProjectionRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d) {
      const { clipLineString: k, clipPolygon: b } = a,
        { clamp: c, erase: f } = d,
        m = (2 * Math.PI) / 360,
        n = (a) => {
          -180 > a && (a += 360);
          180 < a && (a -= 360);
          return a;
        };
      class q {
        static add(a, b) {
          q.registry[a] = b;
        }
        static greatCircle(a, b, c) {
          const { atan2: g, cos: d, sin: f, sqrt: e } = Math,
            h = a[1] * m,
            p = a[0] * m,
            y = b[1] * m,
            r = b[0] * m;
          var x = y - h,
            w = r - p;
          x = f(x / 2) * f(x / 2) + d(h) * d(y) * f(w / 2) * f(w / 2);
          x = 2 * g(e(x), e(1 - x));
          var k = Math.round((6371e3 * x) / 5e5);
          w = [];
          c && w.push(a);
          if (1 < k)
            for (a = 1 / k, k = a; 0.999 > k; k += a) {
              var l = f((1 - k) * x) / f(x);
              const a = f(k * x) / f(x);
              var E = l * d(h) * d(p) + a * d(y) * d(r);
              const b = l * d(h) * f(p) + a * d(y) * f(r);
              l = l * f(h) + a * f(y);
              l = g(l, e(E * E + b * b));
              E = g(b, E);
              w.push([E / m, l / m]);
            }
          c && w.push(b);
          return w;
        }
        static insertGreatCircles(a) {
          let b = a.length - 1;
          for (; b--; )
            if (
              10 <
              Math.max(
                Math.abs(a[b][0] - a[b + 1][0]),
                Math.abs(a[b][1] - a[b + 1][1])
              )
            ) {
              const c = q.greatCircle(a[b], a[b + 1]);
              c.length && a.splice(b + 1, 0, ...c);
            }
        }
        static toString(a) {
          const { name: b, rotation: c } = a || {};
          return [b, c && c.join(",")].join(";");
        }
        constructor(a = {}) {
          this.hasGeoProjection = this.hasCoordinates = !1;
          this.maxLatitude = 90;
          this.options = a;
          const { name: b, projectedBounds: c, rotation: g } = a;
          this.rotator = g ? this.getRotator(g) : void 0;
          const d = b ? q.registry[b] : void 0;
          d && (this.def = new d(a));
          const { def: f, rotator: e } = this;
          f &&
            ((this.maxLatitude = f.maxLatitude || 90),
            (this.hasGeoProjection = !0));
          e && f
            ? ((this.forward = (a) => f.forward(e.forward(a))),
              (this.inverse = (a) => e.inverse(f.inverse(a))))
            : f
            ? ((this.forward = (a) => f.forward(a)),
              (this.inverse = (a) => f.inverse(a)))
            : e && ((this.forward = e.forward), (this.inverse = e.inverse));
          this.bounds = "world" === c ? f && f.bounds : c;
        }
        lineIntersectsBounds(a) {
          const { x1: b, x2: c, y1: g, y2: f } = this.bounds || {},
            d = (a, b, c) => {
              const [g, f] = a;
              a = b ? 0 : 1;
              if ("number" === typeof c && g[b] >= c !== f[b] >= c)
                return (
                  (a = g[a] + ((c - g[b]) / (f[b] - g[b])) * (f[a] - g[a])),
                  b ? [a, c] : [c, a]
                );
            };
          let e,
            h = a[0];
          if ((e = d(a, 0, b))) (h = e), (a[1] = e);
          else if ((e = d(a, 0, c))) (h = e), (a[1] = e);
          if ((e = d(a, 1, g))) h = e;
          else if ((e = d(a, 1, f))) h = e;
          return h;
        }
        getRotator(a) {
          const b = a[0] * m,
            c = (a[1] || 0) * m;
          a = (a[2] || 0) * m;
          const f = Math.cos(c),
            g = Math.sin(c),
            d = Math.cos(a),
            e = Math.sin(a);
          if (0 !== b || 0 !== c || 0 !== a)
            return {
              forward: (a) => {
                var c = a[0] * m + b,
                  h = a[1] * m,
                  r = Math.cos(h);
                a = Math.cos(c) * r;
                c = Math.sin(c) * r;
                h = Math.sin(h);
                r = h * f + a * g;
                return [
                  Math.atan2(c * d - r * e, a * f - h * g) / m,
                  Math.asin(r * d + c * e) / m,
                ];
              },
              inverse: (a) => {
                var c = a[0] * m,
                  h = a[1] * m,
                  r = Math.cos(h);
                a = Math.cos(c) * r;
                c = Math.sin(c) * r;
                h = Math.sin(h);
                r = h * d - c * e;
                return [
                  (Math.atan2(c * d + h * e, a * f + r * g) - b) / m,
                  Math.asin(r * f - a * g) / m,
                ];
              },
            };
        }
        forward(a) {
          return a;
        }
        inverse(a) {
          return a;
        }
        cutOnAntimeridian(a, b) {
          const d = [],
            e = [a];
          a.forEach((f, g) => {
            let e = a[g - 1];
            if (!g) {
              if (!b) return;
              e = a[a.length - 1];
            }
            const h = e[0];
            var l = f[0];
            (-90 > h || 90 < h) &&
              (-90 > l || 90 < l) &&
              0 < h !== 0 < l &&
              ((l = c(
                (180 - ((h + 360) % 360)) /
                  (((l + 360) % 360) - ((h + 360) % 360)),
                0,
                1
              )),
              d.push({
                i: g,
                lat: e[1] + l * (f[1] - e[1]),
                direction: 0 > h ? 1 : -1,
                previousLonLat: e,
                lonLat: f,
              }));
          });
          if (d.length)
            if (b) {
              if (1 === d.length % 2) {
                var g = d
                  .slice()
                  .sort((a, b) => Math.abs(b.lat) - Math.abs(a.lat))[0];
                f(d, g);
              }
              for (var k = d.length - 2; 0 <= k; ) {
                var m = d[k].i,
                  h = n(180 + 0.000001 * d[k].direction),
                  p = n(180 - 0.000001 * d[k].direction);
                m = a.splice(
                  m,
                  d[k + 1].i - m,
                  ...q.greatCircle([h, d[k].lat], [h, d[k + 1].lat], !0)
                );
                m.push(...q.greatCircle([p, d[k + 1].lat], [p, d[k].lat], !0));
                e.push(m);
                k -= 2;
              }
              if (g)
                for (m = 0; m < e.length; m++) {
                  const { direction: a, lat: b } = g;
                  k = e[m];
                  p = k.indexOf(g.lonLat);
                  if (-1 < p) {
                    m = (0 > b ? -1 : 1) * this.maxLatitude;
                    var y = n(180 + 0.000001 * a);
                    h = n(180 - 0.000001 * a);
                    const c = q.greatCircle([y, b], [y, m], !0);
                    for (y += 120 * a; -180 < y && 180 > y; y += 120 * a)
                      c.push([y, m]);
                    c.push(...q.greatCircle([h, m], [h, g.lat], !0));
                    k.splice(p, 0, ...c);
                    break;
                  }
                }
            } else
              for (g = d.length; g--; )
                (k = a.splice(d[g].i, a.length, [
                  n(180 + 0.000001 * d[g].direction),
                  d[g].lat,
                ])),
                  k.unshift([n(180 - 0.000001 * d[g].direction), d[g].lat]),
                  e.push(k);
          return e;
        }
        path(a) {
          const { bounds: c, def: d, rotator: f } = this,
            e = [],
            g = "Polygon" === a.type || "MultiPolygon" === a.type,
            m = this.hasGeoProjection,
            h = !d || !1 !== d.antimeridianCutting,
            p = h ? f : void 0,
            y = h ? d || this : this;
          let r;
          c &&
            (r = [
              [c.x1, c.y1],
              [c.x2, c.y1],
              [c.x2, c.y2],
              [c.x1, c.y2],
            ]);
          const x = (a) => {
            a = a.map((a) => {
              if (h) {
                p && (a = p.forward(a));
                let b = a[0];
                0.000001 > Math.abs(b - 180) &&
                  (b = 180 > b ? 179.999999 : 180.000001);
                a = [b, a[1]];
              }
              return a;
            });
            let d = [a];
            m &&
              (q.insertGreatCircles(a),
              h && (d = this.cutOnAntimeridian(a, g)));
            d.forEach((a) => {
              if (!(2 > a.length)) {
                var l = !1,
                  d = !1,
                  f = (a) => {
                    l
                      ? e.push(["L", a[0], a[1]])
                      : (e.push(["M", a[0], a[1]]), (l = !0));
                  },
                  G = !1,
                  B = !1,
                  u = a.map((a) => {
                    a = y.forward(a);
                    a.outside ? (G = !0) : (B = !0);
                    Infinity === a[1]
                      ? (a[1] = 1e10)
                      : -Infinity === a[1] && (a[1] = -1e10);
                    return a;
                  });
                if (h) {
                  g && u.push(u[0]);
                  if (G) {
                    if (!B) return;
                    if (r)
                      if (g) u = b(u, r);
                      else if (c) {
                        k(u, r).forEach((a) => {
                          l = !1;
                          a.forEach(f);
                        });
                        return;
                      }
                  }
                  u.forEach(f);
                } else
                  for (let b = 0; b < u.length; b++) {
                    const c = a[b],
                      E = u[b];
                    if (E.outside) d = !0;
                    else {
                      if (g && !R) {
                        var R = c;
                        a.push(c);
                        u.push(E);
                      }
                      d &&
                        H &&
                        (g && m
                          ? q.greatCircle(H, c).forEach((a) => f(y.forward(a)))
                          : (l = !1));
                      f(E);
                      var H = c;
                      d = !1;
                    }
                  }
              }
            });
          };
          "LineString" === a.type
            ? x(a.coordinates)
            : "MultiLineString" === a.type
            ? a.coordinates.forEach((a) => x(a))
            : "Polygon" === a.type
            ? (a.coordinates.forEach((a) => x(a)), e.length && e.push(["Z"]))
            : "MultiPolygon" === a.type &&
              (a.coordinates.forEach((a) => {
                a.forEach((a) => x(a));
              }),
              e.length && e.push(["Z"]));
          return e;
        }
      }
      q.registry = e;
      return q;
    }
  );
  t(
    a,
    "Maps/MapView.js",
    [
      a["Maps/MapViewOptionsDefault.js"],
      a["Maps/MapViewInsetsOptionsDefault.js"],
      a["Extensions/GeoJSON.js"],
      a["Core/Chart/MapChart.js"],
      a["Maps/MapUtilities.js"],
      a["Maps/Projection.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d, k, b, c, f) {
      const { topo2geo: m } = d,
        { maps: n } = k,
        { boundsFromPath: q, pointInPolygon: g } = b,
        {
          addEvent: t,
          clamp: v,
          fireEvent: z,
          isArray: C,
          isNumber: A,
          isObject: D,
          isString: h,
          merge: p,
          pick: y,
          relativeLength: r,
        } = f,
        x = (a, b) => {
          const { width: c, height: l } = b;
          return (
            Math.log(
              400.979322 /
                Math.max((a.x2 - a.x1) / (c / 256), (a.y2 - a.y1) / (l / 256))
            ) / Math.log(2)
          );
        };
      class w {
        static mergeInsets(a, b) {
          const c = (a) => {
              const b = {};
              a.forEach((a, c) => {
                b[(a && a.id) || `i${c}`] = a;
              });
              return b;
            },
            l = p(c(a), c(b));
          return Object.keys(l).map((a) => l[a]);
        }
        createInsets() {
          const a = this.options,
            b = a.insets;
          b &&
            b.forEach((b) => {
              b = new M(this, p(a.insetOptions, b));
              this.insets.push(b);
            });
        }
        constructor(b, d) {
          this.allowTransformAnimation = !0;
          this.insets = [];
          this.padding = [0, 0, 0, 0];
          this.eventsToUnbind = [];
          let l;
          if (!(this instanceof M)) {
            var e = [
              b.options.chart.map,
              ...(b.options.series || []).map((a) => a.mapData),
            ].map((a) => this.getGeoMap(a));
            const a = [];
            e.forEach((b) => {
              if (b && (l || (l = b["hc-recommended-mapview"]), b.bbox)) {
                const [c, l, d, f] = b.bbox;
                a.push({ x1: c, y1: l, x2: d, y2: f });
              }
            });
            const c = a.length && w.compositeBounds(a);
            if (c) {
              const { x1: a, y1: b, x2: l, y2: d } = c;
              var f =
                180 < l - a && 90 < d - b
                  ? { name: "EqualEarth" }
                  : {
                      name: "LambertConformalConic",
                      parallels: [b, d],
                      rotation: [-(a + l) / 2],
                    };
            }
            this.geoMap = e[0];
          }
          this.userOptions = d || {};
          f = p(a, { projection: f }, l, d);
          e = l && l.insets;
          d = d && d.insets;
          e && d && (f.insets = w.mergeInsets(e, d));
          this.chart = b;
          this.center = f.center;
          this.options = f;
          this.projection = new c(f.projection);
          this.playingField = b.plotBox;
          this.zoom = f.zoom || 0;
          this.createInsets();
          this.eventsToUnbind.push(
            t(b, "afterSetChartSize", () => {
              this.playingField = this.getField();
              if (void 0 === this.minZoom || this.minZoom === this.zoom)
                this.fitToBounds(void 0, void 0, !1),
                  !this.chart.hasRendered &&
                    A(this.userOptions.zoom) &&
                    (this.zoom = this.userOptions.zoom),
                  this.userOptions.center &&
                    p(!0, this.center, this.userOptions.center);
            })
          );
          this.setUpEvents();
        }
        fitToBounds(a, b, c = !0, d) {
          const l = a || this.getProjectedBounds();
          if (l) {
            var f = y(b, a ? 0 : this.options.padding);
            b = this.getField(!1);
            f = C(f) ? f : [f, f, f, f];
            this.padding = [
              r(f[0], b.height),
              r(f[1], b.width),
              r(f[2], b.height),
              r(f[3], b.width),
            ];
            this.playingField = this.getField();
            b = x(l, this.playingField);
            a || (this.minZoom = b);
            a = this.projection.inverse([(l.x2 + l.x1) / 2, (l.y2 + l.y1) / 2]);
            this.setView(a, b, c, d);
          }
        }
        getField(a = !0) {
          a = a ? this.padding : [0, 0, 0, 0];
          return {
            x: a[3],
            y: a[0],
            width: this.chart.plotWidth - a[1] - a[3],
            height: this.chart.plotHeight - a[0] - a[2],
          };
        }
        getGeoMap(a) {
          if (h(a)) return n[a] && "Topology" === n[a].type ? m(n[a]) : n[a];
          if (D(a, !0)) {
            if ("FeatureCollection" === a.type) return a;
            if ("Topology" === a.type) return m(a);
          }
        }
        getMapBBox() {
          const a = this.getProjectedBounds(),
            b = this.getScale();
          if (a) {
            const c = this.padding,
              l = this.projectedUnitsToPixels({ x: a.x1, y: a.y2 });
            return {
              width: (a.x2 - a.x1) * b + c[1] + c[3],
              height: (a.y2 - a.y1) * b + c[0] + c[2],
              x: l.x - c[3],
              y: l.y - c[0],
            };
          }
        }
        getProjectedBounds() {
          const a = this.projection;
          var b = this.chart.series.reduce((a, b) => {
              const c = b.getProjectedBounds && b.getProjectedBounds();
              c && !1 !== b.options.affectsMapView && a.push(c);
              return a;
            }, []),
            c = this.options.fitToGeometry;
          return c
            ? (this.fitToGeometryCache ||
                ("MultiPoint" === c.type
                  ? ((c = c.coordinates.map((b) => a.forward(b))),
                    (b = c.map((a) => a[0])),
                    (c = c.map((a) => a[1])),
                    (this.fitToGeometryCache = {
                      x1: Math.min.apply(0, b),
                      x2: Math.max.apply(0, b),
                      y1: Math.min.apply(0, c),
                      y2: Math.max.apply(0, c),
                    }))
                  : (this.fitToGeometryCache = q(a.path(c)))),
              this.fitToGeometryCache)
            : this.projection.bounds || w.compositeBounds(b);
        }
        getScale() {
          return (256 / 400.979322) * Math.pow(2, this.zoom);
        }
        getSVGTransform() {
          const { x: a, y: b, width: c, height: d } = this.playingField,
            f = this.projection.forward(this.center);
          var e = this.projection.hasCoordinates ? -1 : 1;
          const g = this.getScale();
          e *= g;
          return {
            scaleX: g,
            scaleY: e,
            translateX: a + c / 2 - f[0] * g,
            translateY: b + d / 2 - f[1] * e,
          };
        }
        lonLatToPixels(a) {
          if ((a = this.lonLatToProjectedUnits(a)))
            return this.projectedUnitsToPixels(a);
        }
        lonLatToProjectedUnits(a) {
          const b = this.chart,
            c = b.mapTransforms;
          if (c) {
            for (const l in c)
              if (Object.hasOwnProperty.call(c, l) && c[l].hitZone) {
                var d = b.transformFromLatLon(a, c[l]);
                if (d && g(d, c[l].hitZone.coordinates[0])) return d;
              }
            return b.transformFromLatLon(a, c["default"]);
          }
          for (d of this.insets)
            if (
              d.options.geoBounds &&
              g({ x: a.lon, y: a.lat }, d.options.geoBounds.coordinates[0])
            )
              return (
                (a = d.projection.forward([a.lon, a.lat])),
                (a = d.projectedUnitsToPixels({ x: a[0], y: a[1] })),
                this.pixelsToProjectedUnits(a)
              );
          a = this.projection.forward([a.lon, a.lat]);
          if (!a.outside) return { x: a[0], y: a[1] };
        }
        projectedUnitsToLonLat(a) {
          var b = this.chart;
          const c = b.mapTransforms;
          if (c) {
            for (const d in c)
              if (
                Object.hasOwnProperty.call(c, d) &&
                c[d].hitZone &&
                g(a, c[d].hitZone.coordinates[0])
              )
                return b.transformToLatLon(a, c[d]);
            return b.transformToLatLon(a, c["default"]);
          }
          b = this.projectedUnitsToPixels(a);
          for (var d of this.insets)
            if (d.hitZone && g(b, d.hitZone.coordinates[0]))
              return (
                (a = d.pixelsToProjectedUnits(b)),
                (d = d.projection.inverse([a.x, a.y])),
                { lon: d[0], lat: d[1] }
              );
          d = this.projection.inverse([a.x, a.y]);
          return { lon: d[0], lat: d[1] };
        }
        redraw(a) {
          this.chart.series.forEach((a) => {
            a.useMapGeometry && (a.isDirty = !0);
          });
          this.chart.redraw(a);
        }
        setView(a, b, c = !0, d) {
          a && (this.center = a);
          "number" === typeof b &&
            ("number" === typeof this.minZoom &&
              (b = Math.max(b, this.minZoom)),
            "number" === typeof this.options.maxZoom &&
              (b = Math.min(b, this.options.maxZoom)),
            A(b) && (this.zoom = b));
          var f = this.getProjectedBounds();
          if (f) {
            a = this.projection.forward(this.center);
            const { x: c, y: d, width: g, height: u } = this.playingField;
            b = this.getScale();
            var e = this.projectedUnitsToPixels({ x: f.x1, y: f.y1 }),
              l = this.projectedUnitsToPixels({ x: f.x2, y: f.y2 });
            f = [(f.x1 + f.x2) / 2, (f.y1 + f.y2) / 2];
            if (!this.chart.series.some((a) => a.isDrilling)) {
              const h = e.x,
                B = l.y;
              l = l.x;
              e = e.y;
              l - h < g
                ? (a[0] = f[0])
                : h < c && l < c + g
                ? (a[0] += Math.max(h - c, l - g - c) / b)
                : l > c + g &&
                  h > c &&
                  (a[0] += Math.min(l - g - c, h - c) / b);
              e - B < u
                ? (a[1] = f[1])
                : B < d && e < d + u
                ? (a[1] -= Math.max(B - d, e - u - d) / b)
                : e > d + u &&
                  B > d &&
                  (a[1] -= Math.min(e - u - d, B - d) / b);
              this.center = this.projection.inverse(a);
            }
            this.insets.forEach((a) => {
              a.options.field &&
                ((a.hitZone = a.getHitZone()), (a.playingField = a.getField()));
            });
            this.render();
          }
          z(this, "afterSetView");
          c && this.redraw(d);
        }
        projectedUnitsToPixels(a) {
          const b = this.getScale(),
            c = this.projection.forward(this.center),
            d = this.playingField;
          return {
            x: d.x + d.width / 2 - b * (c[0] - a.x),
            y: d.y + d.height / 2 + b * (c[1] - a.y),
          };
        }
        pixelsToLonLat(a) {
          return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(a));
        }
        pixelsToProjectedUnits(a) {
          const { x: b, y: c } = a;
          a = this.getScale();
          const d = this.projection.forward(this.center),
            f = this.playingField;
          return {
            x: d[0] + (b - (f.x + f.width / 2)) / a,
            y: d[1] - (c - (f.y + f.height / 2)) / a,
          };
        }
        setUpEvents() {
          const { chart: a } = this;
          let b, c, d;
          const f = (f) => {
            var e = a.pointer.pinchDown,
              g = this.projection;
            let { mouseDownX: l, mouseDownY: h } = a;
            1 === e.length && ((l = e[0].chartX), (h = e[0].chartY));
            if ("number" === typeof l && "number" === typeof h) {
              e = `${l},${h}`;
              const { chartX: B, chartY: u } = f.originalEvent;
              e !== c &&
                ((c = e),
                (b = this.projection.forward(this.center)),
                (d = (this.projection.options.rotation || [0, 0]).slice()));
              e =
                ((e = g.def && g.def.bounds) && x(e, this.playingField)) ||
                -Infinity;
              if (
                "Orthographic" === g.options.name &&
                (this.minZoom || Infinity) < 1.3 * e
              ) {
                if (
                  ((e =
                    440 /
                    (this.getScale() * Math.min(a.plotWidth, a.plotHeight))),
                  d)
                ) {
                  g = (l - B) * e - d[0];
                  e = v(-d[1] - (h - u) * e, -80, 80);
                  const b = this.zoom;
                  this.update({ projection: { rotation: [-g, -e] } }, !1);
                  this.fitToBounds(void 0, void 0, !1);
                  this.zoom = b;
                  a.redraw(!1);
                }
              } else
                A(B) &&
                  A(u) &&
                  ((g = this.getScale()),
                  (g = this.projection.inverse([
                    b[0] + (l - B) / g,
                    b[1] -
                      ((h - u) / g) * (this.projection.hasCoordinates ? 1 : -1),
                  ])),
                  this.setView(g, void 0, !0, !1));
              f.preventDefault();
            }
          };
          t(a, "pan", f);
          t(a, "touchpan", f);
          t(a, "selection", (b) => {
            if (b.resetSelection) this.zoomBy();
            else {
              const c = b.x - a.plotLeft,
                d = b.y - a.plotTop,
                { y: f, x: e } = this.pixelsToProjectedUnits({ x: c, y: d }),
                { y: g, x: l } = this.pixelsToProjectedUnits({
                  x: c + b.width,
                  y: d + b.height,
                });
              this.fitToBounds(
                { x1: e, y1: f, x2: l, y2: g },
                void 0,
                !0,
                b.originalEvent.touches ? !1 : void 0
              );
              /^touch/.test(b.originalEvent.type) || a.showResetZoom();
              b.preventDefault();
            }
          });
        }
        render() {
          this.group ||
            (this.group = this.chart.renderer
              .g("map-view")
              .attr({ zIndex: 4 })
              .add());
        }
        update(a, b = !0, d) {
          var f = a.projection;
          f = f && c.toString(f) !== c.toString(this.options.projection);
          let e = !1;
          p(!0, this.userOptions, a);
          p(!0, this.options, a);
          "insets" in a &&
            (this.insets.forEach((a) => a.destroy()),
            (this.insets.length = 0),
            (e = !0));
          (f || "fitToGeometry" in a) && delete this.fitToGeometryCache;
          if (f || e)
            this.chart.series.forEach((a) => {
              const b = a.transformGroups;
              a.clearBounds && a.clearBounds();
              a.isDirty = !0;
              a.isDirtyData = !0;
              if (e && b) for (; 1 < b.length; ) (a = b.pop()) && a.destroy();
            }),
              f && (this.projection = new c(this.options.projection)),
              e && this.createInsets(),
              a.center ||
                !Object.hasOwnProperty.call(a, "zoom") ||
                A(a.zoom) ||
                this.fitToBounds(void 0, void 0, !1);
          a.center || A(a.zoom)
            ? this.setView(this.options.center, a.zoom, !1)
            : "fitToGeometry" in a && this.fitToBounds(void 0, void 0, !1);
          b && this.chart.redraw(d);
        }
        zoomBy(a, b, c, d) {
          var f = this.chart;
          const e = this.projection.forward(this.center);
          let [g, l] = b ? this.projection.forward(b) : [];
          if ("number" === typeof a) {
            a = this.zoom + a;
            if (c) {
              const [a, d] = c;
              c = this.getScale();
              b = d - f.plotTop - f.plotHeight / 2;
              g = e[0] + (a - f.plotLeft - f.plotWidth / 2) / c;
              l = e[1] + b / c;
            }
            if ("number" === typeof g && "number" === typeof l) {
              f = 1 - Math.pow(2, this.zoom) / Math.pow(2, a);
              var h = e[1] - l;
              e[0] -= (e[0] - g) * f;
              e[1] += h * f;
              h = this.projection.inverse(e);
            }
            this.setView(h, a, void 0, d);
          } else this.fitToBounds(void 0, void 0, void 0, d);
        }
      }
      w.compositeBounds = (a) => {
        if (a.length)
          return a.slice(1).reduce((a, b) => {
            a.x1 = Math.min(a.x1, b.x1);
            a.y1 = Math.min(a.y1, b.y1);
            a.x2 = Math.max(a.x2, b.x2);
            a.y2 = Math.max(a.y2, b.y2);
            return a;
          }, p(a[0]));
      };
      class M extends w {
        constructor(a, b) {
          super(a.chart, b);
          this.id = b.id;
          this.mapView = a;
          this.options = p(e, b);
          this.allBounds = [];
          this.options.geoBounds &&
            ((a = a.projection.path(this.options.geoBounds)),
            (this.geoBoundsProjectedBox = q(a)),
            (this.geoBoundsProjectedPolygon = a.map((a) => [
              a[1] || 0,
              a[2] || 0,
            ])));
        }
        getField(a = !0) {
          var b = this.hitZone;
          if (b) {
            var c = a ? this.padding : [0, 0, 0, 0];
            b = b.coordinates[0];
            var d = b.map((a) => a[0]);
            const f = b.map((a) => a[1]);
            b = Math.min.apply(0, d) + c[3];
            d = Math.max.apply(0, d) - c[1];
            const e = Math.min.apply(0, f) + c[0];
            c = Math.max.apply(0, f) - c[2];
            if (A(b) && A(e))
              return { x: b, y: e, width: d - b, height: c - e };
          }
          return super.getField.call(this, a);
        }
        getHitZone() {
          const { chart: a, mapView: b, options: c } = this;
          var { coordinates: d } = c.field || {};
          if (d) {
            d = d[0];
            if ("percent" === c.units) {
              const f =
                ("mapBoundingBox" === c.relativeTo && b.getMapBBox()) ||
                p(a.plotBox, { x: 0, y: 0 });
              d = d.map((a) => [
                r(`${a[0]}%`, f.width, f.x),
                r(`${a[1]}%`, f.height, f.y),
              ]);
            }
            return { type: "Polygon", coordinates: [d] };
          }
        }
        getProjectedBounds() {
          return w.compositeBounds(this.allBounds);
        }
        isInside(a) {
          const { geoBoundsProjectedBox: b, geoBoundsProjectedPolygon: c } =
            this;
          return !!(
            b &&
            a.x >= b.x1 &&
            a.x <= b.x2 &&
            a.y >= b.y1 &&
            a.y <= b.y2 &&
            c &&
            g(a, c)
          );
        }
        render() {
          const { chart: a, mapView: b, options: c } = this;
          var d = c.borderPath || c.field;
          if (d && b.group) {
            let f = !0;
            this.border ||
              ((this.border = a.renderer
                .path()
                .addClass("highcharts-mapview-inset-border")
                .add(b.group)),
              (f = !1));
            a.styledMode ||
              this.border.attr({
                stroke: c.borderColor,
                "stroke-width": c.borderWidth,
              });
            const e = (Math.round(this.border.strokeWidth()) % 2) / 2,
              g =
                ("mapBoundingBox" === c.relativeTo && b.getMapBBox()) ||
                b.playingField;
            d = (d.coordinates || []).reduce(
              (b, d) =>
                d.reduce((b, d, f) => {
                  let [h, l] = d;
                  "percent" === c.units &&
                    ((h = a.plotLeft + r(`${h}%`, g.width, g.x)),
                    (l = a.plotTop + r(`${l}%`, g.height, g.y)));
                  h = Math.floor(h) + e;
                  l = Math.floor(l) + e;
                  b.push(0 === f ? ["M", h, l] : ["L", h, l]);
                  return b;
                }, b),
              []
            );
            this.border[f ? "animate" : "attr"]({ d });
          }
        }
        destroy() {
          this.border && (this.border = this.border.destroy());
          this.eventsToUnbind.forEach((a) => a());
        }
        setUpEvents() {}
      }
      t(k, "afterInit", function () {
        this.mapView = new w(this, this.options.mapView);
      });
      return w;
    }
  );
  t(
    a,
    "Series/Map/MapSeries.js",
    [
      a["Core/Animation/AnimationUtilities.js"],
      a["Series/ColorMapComposition.js"],
      a["Series/CenteredUtilities.js"],
      a["Core/Globals.js"],
      a["Core/Legend/LegendSymbol.js"],
      a["Core/Chart/MapChart.js"],
      a["Series/Map/MapPoint.js"],
      a["Maps/MapView.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d, k, b, c, f, m, n, t, g, O) {
      const { animObject: q } = a;
      ({ noop: a } = k);
      const { splitPath: z } = c,
        {
          seriesTypes: { column: C, scatter: A },
        } = t,
        {
          extend: D,
          find: h,
          fireEvent: p,
          getNestedProperty: y,
          isArray: r,
          defined: x,
          isNumber: w,
          isObject: M,
          merge: l,
          objectEach: E,
          pick: P,
          splat: Q,
        } = O;
      class G extends A {
        constructor() {
          super(...arguments);
          this.points =
            this.options =
            this.joinBy =
            this.group =
            this.data =
            this.chart =
              void 0;
          this.processedData = [];
        }
        animate(a) {
          const { chart: b, group: c } = this,
            d = q(this.options.animation);
          a
            ? c.attr({
                translateX: b.plotLeft + b.plotWidth / 2,
                translateY: b.plotTop + b.plotHeight / 2,
                scaleX: 0.001,
                scaleY: 0.001,
              })
            : c.animate(
                {
                  translateX: b.plotLeft,
                  translateY: b.plotTop,
                  scaleX: 1,
                  scaleY: 1,
                },
                d
              );
        }
        clearBounds() {
          this.points.forEach((a) => {
            delete a.bounds;
            delete a.insetIndex;
            delete a.projectedPath;
          });
          delete this.bounds;
        }
        doFullTranslate() {
          return !(
            !this.isDirtyData &&
            !this.chart.isResizing &&
            this.hasRendered
          );
        }
        drawMapDataLabels() {
          n.prototype.drawDataLabels.call(this);
          this.dataLabelsGroup &&
            this.dataLabelsGroup.clip(this.chart.clipRect);
        }
        drawPoints() {
          const a = this,
            { chart: b, group: c, transformGroups: d = [] } = this,
            { mapView: f, renderer: e } = b;
          f &&
            ((this.transformGroups = d),
            d[0] || (d[0] = e.g().add(c)),
            f.insets.forEach((a, b) => {
              d[b + 1] || d.push(e.g().add(c));
            }),
            this.doFullTranslate() &&
              (this.points.forEach((a) => {
                const { graphic: c, shapeArgs: f } = a;
                a.group =
                  d["number" === typeof a.insetIndex ? a.insetIndex + 1 : 0];
                c && c.parentGroup !== a.group && c.add(a.group);
                f &&
                  b.hasRendered &&
                  !b.styledMode &&
                  (f.fill = this.pointAttribs(a, a.state).fill);
              }),
              C.prototype.drawPoints.apply(this),
              this.points.forEach((c) => {
                const d = c.graphic;
                if (d) {
                  const f = d.animate;
                  let e = "";
                  c.name &&
                    (e +=
                      "highcharts-name-" +
                      c.name.replace(/ /g, "-").toLowerCase());
                  c.properties &&
                    c.properties["hc-key"] &&
                    (e +=
                      " highcharts-key-" +
                      c.properties["hc-key"].toString().toLowerCase());
                  e && d.addClass(e);
                  b.styledMode &&
                    d.css(
                      this.pointAttribs(c, (c.selected && "select") || void 0)
                    );
                  d.animate = function (c, e, g) {
                    const h = w(c["stroke-width"]) && !w(d["stroke-width"]),
                      l = w(d["stroke-width"]) && !w(c["stroke-width"]);
                    if (h || l) {
                      const f =
                        P(a.getStrokeWidth(a.options), 1) /
                        ((b.mapView && b.mapView.getScale()) || 1);
                      h && (d["stroke-width"] = f);
                      l && (c["stroke-width"] = f);
                    }
                    return f.call(
                      d,
                      c,
                      e,
                      l
                        ? function () {
                            d.element.removeAttribute("stroke-width");
                            delete d["stroke-width"];
                            g && g.apply(this, arguments);
                          }
                        : g
                    );
                  };
                }
              })),
            d.forEach((c, d) => {
              const g = (0 === d ? f : f.insets[d - 1]).getSVGTransform(),
                h = P(this.getStrokeWidth(this.options), 1),
                k = g.scaleX,
                r = 0 < g.scaleY ? 1 : -1,
                p = (b) => {
                  (a.points || []).forEach((a) => {
                    const c = a.graphic;
                    let d;
                    c &&
                      c["stroke-width"] &&
                      (d = this.getStrokeWidth(a.options)) &&
                      c.attr({ "stroke-width": d / b });
                  });
                };
              if (
                e.globalAnimation &&
                b.hasRendered &&
                f.allowTransformAnimation
              ) {
                const a = Number(c.attr("translateX")),
                  f = Number(c.attr("translateY")),
                  u = Number(c.attr("scaleX")),
                  B = (b, d) => {
                    b = u + (k - u) * d.pos;
                    c.attr({
                      translateX: a + (g.translateX - a) * d.pos,
                      translateY: f + (g.translateY - f) * d.pos,
                      scaleX: b,
                      scaleY: b * r,
                      "stroke-width": h / b,
                    });
                    p(b);
                  };
                d = {};
                b.options.chart && (d = l({}, b.options.chart.animation));
                if ("boolean" !== typeof d) {
                  const a = d.step;
                  d.step = function (b) {
                    a && a.apply(this, arguments);
                    B.apply(this, arguments);
                  };
                }
                c.attr({ animator: 0 }).animate(
                  { animator: 1 },
                  d,
                  function () {
                    "boolean" !== typeof e.globalAnimation &&
                      e.globalAnimation.complete &&
                      e.globalAnimation.complete({ applyDrilldown: !0 });
                  }
                );
              } else c.attr(l(g, { "stroke-width": h / k })), p(k);
            }),
            this.isDrilling || this.drawMapDataLabels());
        }
        getProjectedBounds() {
          if (!this.bounds && this.chart.mapView) {
            const { insets: a, projection: b } = this.chart.mapView,
              c = [];
            (this.points || []).forEach(function (d) {
              if (d.path || d.geometry) {
                "string" === typeof d.path
                  ? (d.path = z(d.path))
                  : r(d.path) &&
                    "M" === d.path[0] &&
                    (d.path = g.prototype.pathToSegments(d.path));
                if (!d.bounds) {
                  let c = d.getProjectedBounds(b);
                  if (c) {
                    d.labelrank = P(d.labelrank, (c.x2 - c.x1) * (c.y2 - c.y1));
                    const { midX: b, midY: f } = c;
                    if (a && w(b) && w(f)) {
                      const e = h(a, (a) => a.isInside({ x: b, y: f }));
                      e &&
                        (delete d.projectedPath,
                        (c = d.getProjectedBounds(e.projection)) &&
                          e.allBounds.push(c),
                        (d.insetIndex = a.indexOf(e)));
                    }
                    d.bounds = c;
                  }
                }
                d.bounds && void 0 === d.insetIndex && c.push(d.bounds);
              }
            });
            this.bounds = m.compositeBounds(c);
          }
          return this.bounds;
        }
        getStrokeWidth(a) {
          const b = this.pointAttrToOptions;
          return a[(b && b["stroke-width"]) || "borderWidth"];
        }
        hasData() {
          return !!this.processedXData.length;
        }
        pointAttribs(a, b) {
          var c;
          const { mapView: d, styledMode: f } = a.series.chart,
            e = f
              ? this.colorAttribs(a)
              : C.prototype.pointAttribs.call(this, a, b);
          let g = this.getStrokeWidth(a.options);
          if (b) {
            b = l(
              this.options.states[b],
              (a.options.states && a.options.states[b]) || {}
            );
            const d = this.getStrokeWidth(b);
            x(d) && (g = d);
            e.stroke =
              null !== (c = b.borderColor) && void 0 !== c ? c : a.color;
          }
          g && d && (g /= d.getScale());
          c = this.getStrokeWidth(this.options);
          e.dashstyle && d && w(c) && (g = c / d.getScale());
          a.visible || (e.fill = this.options.nullColor);
          x(g) ? (e["stroke-width"] = g) : delete e["stroke-width"];
          e["stroke-linecap"] = e["stroke-linejoin"] = this.options.linecap;
          return e;
        }
        updateData() {
          return this.processedData
            ? !1
            : super.updateData.apply(this, arguments);
        }
        setData(a, b = !0, c, d) {
          delete this.bounds;
          super.setData.call(this, a, !1, void 0, d);
          this.processData();
          this.generatePoints();
          b && this.chart.redraw(c);
        }
        processData() {
          const a = this.options,
            b = a.data;
          var c = this.chart.options.chart;
          const d = this.joinBy,
            e = a.keys || this.pointArrayMap,
            g = [],
            h = {};
          var p = this.chart.mapView;
          p = p && (M(a.mapData, !0) ? p.getGeoMap(a.mapData) : p.geoMap);
          var m = this.chart.mapTransforms;
          (this.chart.mapTransforms = m =
            c.mapTransforms || (p && p["hc-transform"]) || m) &&
            E(m, function (a) {
              a.rotation &&
                ((a.cosAngle = Math.cos(a.rotation)),
                (a.sinAngle = Math.sin(a.rotation)));
            });
          let x;
          r(a.mapData)
            ? (x = a.mapData)
            : p &&
              "FeatureCollection" === p.type &&
              ((this.mapTitle = p.title), (x = k.geojson(p, this.type, this)));
          const n = (this.processedData = []);
          b &&
            b.forEach(function (c, g) {
              let h = 0;
              if (w(c)) n[g] = { value: c };
              else if (r(c)) {
                n[g] = {};
                !a.keys &&
                  c.length > e.length &&
                  "string" === typeof c[0] &&
                  ((n[g]["hc-key"] = c[0]), ++h);
                for (let a = 0; a < e.length; ++a, ++h)
                  e[a] &&
                    "undefined" !== typeof c[h] &&
                    (0 < e[a].indexOf(".")
                      ? f.prototype.setNestedProperty(n[g], c[h], e[a])
                      : (n[g][e[a]] = c[h]));
              } else n[g] = b[g];
              d && "_i" === d[0] && (n[g]._i = g);
            });
          if (x) {
            this.mapData = x;
            this.mapMap = {};
            for (m = 0; m < x.length; m++)
              (c = x[m]),
                (p = c.properties),
                (c._i = m),
                d[0] && p && p[d[0]] && (c[d[0]] = p[d[0]]),
                (h[c[d[0]]] = c);
            this.mapMap = h;
            if (d[1]) {
              const a = d[1];
              n.forEach(function (b) {
                b = y(a, b);
                h[b] && g.push(h[b]);
              });
            }
            if (a.allAreas) {
              if (d[1]) {
                const a = d[1];
                n.forEach(function (b) {
                  g.push(y(a, b));
                });
              }
              const a =
                "|" +
                g
                  .map(function (a) {
                    return a && a[d[0]];
                  })
                  .join("|") +
                "|";
              x.forEach(function (b) {
                (d[0] && -1 !== a.indexOf("|" + b[d[0]] + "|")) ||
                  n.push(l(b, { value: null }));
              });
            }
          }
          this.processedXData = Array(n.length);
        }
        setOptions(a) {
          a = n.prototype.setOptions.call(this, a);
          let b = a.joinBy;
          null === b && (b = "_i");
          b = this.joinBy = Q(b);
          b[1] || (b[1] = b[0]);
          return a;
        }
        translate() {
          const a = this.doFullTranslate(),
            b = this.chart.mapView,
            c = b && b.projection;
          !this.chart.hasRendered ||
            (!this.isDirtyData && this.hasRendered) ||
            (this.processData(),
            this.generatePoints(),
            delete this.bounds,
            !b ||
            b.userOptions.center ||
            w(b.userOptions.zoom) ||
            b.zoom !== b.minZoom
              ? this.getProjectedBounds()
              : b.fitToBounds(void 0, void 0, !1));
          if (b) {
            const d = b.getSVGTransform();
            this.points.forEach(function (e) {
              const g =
                (w(e.insetIndex) && b.insets[e.insetIndex].getSVGTransform()) ||
                d;
              g &&
                e.bounds &&
                w(e.bounds.midX) &&
                w(e.bounds.midY) &&
                ((e.plotX = e.bounds.midX * g.scaleX + g.translateX),
                (e.plotY = e.bounds.midY * g.scaleY + g.translateY));
              a &&
                ((e.shapeType = "path"),
                (e.shapeArgs = { d: f.getProjectedPath(e, c) }));
              e.projectedPath && !e.projectedPath.length
                ? e.setVisible(!1)
                : e.setVisible(!0);
            });
          }
          p(this, "afterTranslate");
        }
      }
      G.defaultOptions = l(A.defaultOptions, {
        affectsMapView: !0,
        animation: !1,
        dataLabels: {
          crop: !1,
          formatter: function () {
            const { numberFormatter: a } = this.series.chart,
              { value: b } = this.point;
            return w(b) ? a(b, -1) : "";
          },
          inside: !0,
          overflow: !1,
          padding: 0,
          verticalAlign: "middle",
        },
        linecap: "round",
        marker: null,
        nullColor: "#f7f7f7",
        stickyTracking: !1,
        tooltip: {
          followPointer: !0,
          pointFormat: "{point.name}: {point.value}<br/>",
        },
        turboThreshold: 0,
        allAreas: !0,
        borderColor: "#e6e6e6",
        borderWidth: 1,
        joinBy: "hc-key",
        states: {
          hover: { halo: void 0, borderColor: "#666666", borderWidth: 2 },
          normal: { animation: !0 },
          select: { color: "#cccccc" },
        },
      });
      D(G.prototype, {
        type: "map",
        axisTypes: e.seriesMembers.axisTypes,
        colorAttribs: e.seriesMembers.colorAttribs,
        colorKey: e.seriesMembers.colorKey,
        directTouch: !0,
        drawDataLabels: a,
        drawGraph: a,
        drawLegendSymbol: b.drawRectangle,
        forceDL: !0,
        getCenter: d.getCenter,
        getExtremesFromAll: !0,
        getSymbol: a,
        isCartesian: !1,
        parallelArrays: e.seriesMembers.parallelArrays,
        pointArrayMap: e.seriesMembers.pointArrayMap,
        pointClass: f,
        preserveAspectRatio: !0,
        searchPoint: a,
        trackerGroups: e.seriesMembers.trackerGroups,
        useMapGeometry: !0,
      });
      e.compose(G);
      t.registerSeriesType("map", G);
      ("");
      return G;
    }
  );
  t(
    a,
    "Series/FlowMap/FlowMapSeries.js",
    [
      a["Series/FlowMap/FlowMapPoint.js"],
      a["Series/Map/MapSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, e, d, k) {
      const {
          series: {
            prototype: { pointClass: b },
          },
          seriesTypes: { column: c, mapline: f },
        } = d,
        {
          addEvent: m,
          arrayMax: n,
          arrayMin: q,
          defined: g,
          extend: t,
          isArray: v,
          merge: z,
          pick: C,
          relativeLength: A,
        } = k;
      class D extends f {
        constructor() {
          super(...arguments);
          this.centerOfPoints =
            this.greatestWeight =
            this.smallestWeight =
            this.points =
            this.options =
            this.data =
              void 0;
        }
        static getLength(a, b) {
          return Math.sqrt(a * a + b * b);
        }
        static normalize(a, b) {
          const c = this.getLength(a, b);
          return [a / c, b / c];
        }
        static markerEndPath(a, b, c, d) {
          const e = A(d.width || 0, this.getLength(b[0] - a[0], b[1] - a[1])),
            f = d.markerType || "arrow",
            [g, h] = this.normalize(b[0] - a[0], b[1] - a[1]);
          d = [];
          if ("arrow" === f) {
            let [f, l] = a;
            f -= g * e;
            l -= h * e;
            d.push(["L", f, l]);
            d.push(["L", c[0], c[1]]);
            [f, l] = b;
            f += g * e;
            l += h * e;
            d.push(["L", f, l]);
          }
          if ("mushroom" === f) {
            let [f, l] = a,
              [k, r] = b;
            const [p, m] = c;
            b = (k - f) / 2 + f;
            a = (r - l) / 2 + l;
            b = 2 * (p - b) + b;
            a = 2 * (m - a) + a;
            f -= g * e;
            l -= h * e;
            d.push(["L", f, l]);
            k += g * e;
            r += h * e;
            d.push(["Q", b, a, k, r]);
          }
          return d;
        }
        animate(a) {
          const b = this.points;
          a ||
            b.forEach((a) => {
              if (a.shapeArgs && v(a.shapeArgs.d) && a.shapeArgs.d.length) {
                const b = a.shapeArgs.d,
                  c = b[0][1],
                  d = b[0][2];
                if (c && d) {
                  const e = [];
                  for (let a = 0; a < b.length; a++) {
                    e.push([...b[a]]);
                    for (let f = 1; f < b[a].length; f++)
                      e[a][f] = f % 2 ? c : d;
                  }
                  a.graphic &&
                    (a.graphic.attr({ d: e }), a.graphic.animate({ d: b }));
                }
              }
            });
        }
        getLinkWidth(a) {
          var b = this.options.width;
          const c = a.options.weight || this.options.weight;
          a.options.weight = c;
          if (b && !c) return b;
          a = this.smallestWeight;
          b = this.greatestWeight;
          if (!g(c) || !a || !b) return 0;
          const d = this.options.minWidth;
          return ((c - a) * (this.options.maxWidth - d)) / (b - a || 1) + d;
        }
        autoCurve(a, b, c, d, e, f) {
          var g = c - a,
            h = d - b;
          a = (c - a) / 2 + a - e;
          b = (d - b) / 2 + b - f;
          g = Math.atan2(g * b - h * a, g * a + h * b);
          g = (180 * g) / Math.PI;
          0 > g && (g = 360 + g);
          g = (g * Math.PI) / 180;
          return 0.7 * -Math.sin(g);
        }
        pointAttribs(a, b) {
          b = e.prototype.pointAttribs.call(this, a, b);
          b.fill = C(
            a.options.fillColor,
            a.options.color,
            "none" === this.options.fillColor ? null : this.options.fillColor,
            this.color
          );
          b["fill-opacity"] = C(
            a.options.fillOpacity,
            this.options.fillOpacity
          );
          b["stroke-width"] = C(a.options.lineWidth, this.options.lineWidth, 1);
          a.options.opacity && (b.opacity = a.options.opacity);
          return b;
        }
        translate() {
          !this.chart.hasRendered ||
            (!this.isDirtyData && this.hasRendered) ||
            (this.processData(), this.generatePoints());
          const a = [];
          let c = 0,
            d = 0;
          this.points.forEach((e) => {
            const f = this.chart,
              g = f.mapView,
              h = e.options,
              l = () => {
                e.series.isDirty = !0;
              },
              k = (a) => {
                a = f.get(a);
                if (a instanceof b && a.plotX && a.plotY)
                  return m(a, "update", l), { x: a.plotX, y: a.plotY };
              },
              r = (a) => (v(a) ? { lon: a[0], lat: a[1] } : a);
            let n, p;
            "string" === typeof h.from
              ? (n = k(h.from))
              : "object" === typeof h.from &&
                g &&
                (n = g.lonLatToPixels(r(h.from)));
            "string" === typeof h.to
              ? (p = k(h.to))
              : "object" === typeof h.to &&
                g &&
                (p = g.lonLatToPixels(r(h.to)));
            e.fromPos = n;
            e.toPos = p;
            n && p && ((c += (n.x + p.x) / 2), (d += (n.y + p.y) / 2));
            C(e.options.weight, this.options.weight) &&
              a.push(C(e.options.weight, this.options.weight));
          });
          this.smallestWeight = q(a);
          this.greatestWeight = n(a);
          this.centerOfPoints = {
            x: c / this.points.length,
            y: d / this.points.length,
          };
          this.points.forEach((a) => {
            this.getLinkWidth(a)
              ? (a.fromPos &&
                  ((a.plotX = a.fromPos.x), (a.plotY = a.fromPos.y)),
                (a.shapeType = "path"),
                (a.shapeArgs = this.getPointShapeArgs(a)),
                (a.color = C(a.options.color, a.series.color)))
              : (a.shapeArgs = { d: [] });
          });
        }
        getPointShapeArgs(a) {
          const { fromPos: b, toPos: c } = a;
          if (!b || !c) return {};
          var d = this.getLinkWidth(a) / 2,
            e = a.options,
            f = z(this.options.markerEnd, e.markerEnd),
            h = C(e.growTowards, this.options.growTowards);
          const l = b.x || 0,
            k = b.y || 0;
          var m = c.x || 0,
            n = c.y || 0;
          e = C(e.curveFactor, this.options.curveFactor);
          var q = (f && f.enabled && f.height) || 0;
          g(e) ||
            (e = this.autoCurve(
              l,
              k,
              m,
              n,
              this.centerOfPoints.x,
              this.centerOfPoints.y
            ));
          if (q) {
            q = A(q, 4 * d);
            var t = 0.5 * (m - l);
            var u = 0.5 * (n - k);
            var v = l + t,
              H = k + u;
            const a = t;
            t = u;
            u = -a;
            let [b, c] = D.normalize(v + t * e - m, H + u * e - n);
            b *= q;
            c *= q;
            m += b;
            n += c;
          }
          v = 0.5 * (m - l);
          q = 0.5 * (n - k);
          H = l + v;
          t = k + q;
          u = v;
          v = q;
          q = -u;
          let [F, N] = D.normalize(v, q);
          u = 1 + 0.25 * Math.sqrt(e * e);
          F *= d * u;
          N *= d * u;
          v = H + v * e;
          e = t + q * e;
          let [K, L] = D.normalize(v - l, e - k);
          u = K;
          K = L * d;
          L = -u * d;
          let [I, J] = D.normalize(v - m, e - n);
          u = I;
          I = -J * d;
          J = u * d;
          h && ((K /= d), (L /= d), (F /= 4), (N /= 4));
          d = {
            d: [
              ["M", l - K, k - L],
              ["Q", v - F, e - N, m - I, n - J],
              ["L", m + I, n + J],
              ["Q", v + F, e + N, l + K, k + L],
              ["Z"],
            ],
          };
          f &&
            f.enabled &&
            d.d &&
            ((f = D.markerEndPath(
              [m - I, n - J],
              [m + I, n + J],
              [c.x, c.y],
              f
            )),
            d.d.splice(2, 0, ...f));
          n = a.options.from;
          m = a.options.to;
          f = n.lat;
          n = n.lon;
          h = m.lat;
          m = m.lon;
          f && n && (a.options.from = `${+f}, ${+n}`);
          h && m && (a.options.to = `${+h}, ${+m}`);
          return d;
        }
      }
      D.defaultOptions = z(f.defaultOptions, {
        animation: !0,
        dataLabels: { enabled: !1 },
        fillOpacity: 0.5,
        markerEnd: {
          enabled: !0,
          height: "40%",
          width: "40%",
          markerType: "arrow",
        },
        width: 1,
        maxWidth: 25,
        minWidth: 5,
        lineWidth: void 0,
        tooltip: {
          headerFormat:
            '<span style="font-size: 0.8em">{series.name}</span><br/>',
          pointFormat:
            "{point.options.from} \u2192 {point.options.to}: <b>{point.options.weight}</b>",
        },
      });
      t(D.prototype, {
        pointClass: a,
        pointArrayMap: ["from", "to", "weight"],
        drawPoints: c.prototype.drawPoints,
        useMapGeometry: !0,
      });
      d.registerSeriesType("flowmap", D);
      ("");
      return D;
    }
  );
  t(a, "masters/modules/flowmap.src.js", [], function () {});
});
//# sourceMappingURL=flowmap.js.map
