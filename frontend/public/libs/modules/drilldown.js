/*
 Highcharts JS v11.0.0 (2023-04-26)

 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
"use strict";
(function (b) {
  "object" === typeof module && module.exports
    ? ((b["default"] = b), (module.exports = b))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/drilldown", ["highcharts"], function (q) {
        b(q);
        b.Highcharts = q;
        return b;
      })
    : b("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (b) {
  function q(b, g, l, q) {
    b.hasOwnProperty(g) ||
      ((b[g] = q.apply(null, l)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: g, module: b[g] },
          })
        ));
  }
  b = b ? b._modules : {};
  q(b, "Extensions/Breadcrumbs/BreadcrumbsDefaults.js", [], function () {
    return {
      lang: { mainBreadcrumb: "Main" },
      options: {
        buttonTheme: {
          fill: "none",
          height: 18,
          padding: 2,
          "stroke-width": 0,
          zIndex: 7,
          states: { select: { fill: "none" } },
          style: { color: "#334eff" },
        },
        buttonSpacing: 5,
        floating: !1,
        format: void 0,
        relativeTo: "plotBox",
        rtl: !1,
        position: { align: "left", verticalAlign: "top", x: 0, y: void 0 },
        separator: {
          text: "/",
          style: { color: "#666666", fontSize: "0.8em" },
        },
        showFullPath: !0,
        style: {},
        useHTML: !1,
        zIndex: 7,
      },
    };
  });
  q(
    b,
    "Extensions/Breadcrumbs/Breadcrumbs.js",
    [
      b["Extensions/Breadcrumbs/BreadcrumbsDefaults.js"],
      b["Core/Chart/Chart.js"],
      b["Core/FormatUtilities.js"],
      b["Core/Utilities.js"],
    ],
    function (b, g, l, q) {
      function H() {
        if (this.breadcrumbs) {
          const f = this.resetZoomButton && this.resetZoomButton.getBBox(),
            d = this.breadcrumbs.options;
          f &&
            "right" === d.position.align &&
            "plotBox" === d.relativeTo &&
            this.breadcrumbs.alignBreadcrumbsGroup(-f.width - d.buttonSpacing);
        }
      }
      function I() {
        this.breadcrumbs &&
          (this.breadcrumbs.destroy(), (this.breadcrumbs = void 0));
      }
      function J() {
        const f = this.breadcrumbs;
        if (f && !f.options.floating && f.level) {
          var d = f.options,
            h = d.buttonTheme;
          h = (h.height || 0) + 2 * (h.padding || 0) + d.buttonSpacing;
          d = d.position.verticalAlign;
          "bottom" === d
            ? ((this.marginBottom = (this.marginBottom || 0) + h),
              (f.yOffset = h))
            : "middle" !== d
            ? ((this.plotTop += h), (f.yOffset = -h))
            : (f.yOffset = void 0);
        }
      }
      function z() {
        this.breadcrumbs && this.breadcrumbs.redraw();
      }
      function D(f) {
        !0 === f.resetSelection &&
          this.breadcrumbs &&
          this.breadcrumbs.alignBreadcrumbsGroup();
      }
      const { format: x } = l,
        {
          addEvent: A,
          defined: E,
          extend: B,
          fireEvent: F,
          isString: O,
          merge: y,
          objectEach: G,
          pick: k,
        } = q,
        v = [];
      class p {
        static compose(f, d) {
          q.pushUnique(v, f) &&
            (A(g, "destroy", I),
            A(g, "afterShowResetZoom", H),
            A(g, "getMargins", J),
            A(g, "redraw", z),
            A(g, "selection", D));
          q.pushUnique(v, d) && B(d.lang, b.lang);
        }
        constructor(f, d) {
          this.elementList = {};
          this.isDirty = !0;
          this.level = 0;
          this.list = [];
          d = y(
            f.options.drilldown && f.options.drilldown.drillUpButton,
            p.defaultOptions,
            f.options.navigation && f.options.navigation.breadcrumbs,
            d
          );
          this.chart = f;
          this.options = d || {};
        }
        updateProperties(f) {
          this.setList(f);
          this.setLevel();
          this.isDirty = !0;
        }
        setList(f) {
          this.list = f;
        }
        setLevel() {
          this.level = this.list.length && this.list.length - 1;
        }
        getLevel() {
          return this.level;
        }
        getButtonText(f) {
          const d = this.chart,
            h = this.options;
          var b = d.options.lang;
          const g = k(
            h.format,
            h.showFullPath ? "{level.name}" : "\u2190 {level.name}"
          );
          b = b && k(b.drillUpText, b.mainBreadcrumb);
          f =
            (h.formatter && h.formatter(f)) ||
            x(g, { level: f.levelOptions }, d) ||
            "";
          ((O(f) && !f.length) || "\u2190 " === f) &&
            E(b) &&
            (f = h.showFullPath ? b : "\u2190 " + b);
          return f;
        }
        redraw() {
          this.isDirty && this.render();
          this.group && this.group.align();
          this.isDirty = !1;
        }
        render() {
          const f = this.chart,
            d = this.options;
          !this.group &&
            d &&
            (this.group = f.renderer
              .g("breadcrumbs-group")
              .addClass("highcharts-no-tooltip highcharts-breadcrumbs")
              .attr({ zIndex: d.zIndex })
              .add());
          d.showFullPath
            ? this.renderFullPathButtons()
            : this.renderSingleButton();
          this.alignBreadcrumbsGroup();
        }
        renderFullPathButtons() {
          this.destroySingleButton();
          this.resetElementListState();
          this.updateListElements();
          this.destroyListElements();
        }
        renderSingleButton() {
          const f = this.chart;
          var d = this.list;
          const b = this.options.buttonSpacing;
          this.destroyListElements();
          const K = this.group ? this.group.getBBox().width : b;
          d = d[d.length - 2];
          !f.drillUpButton && 0 < this.level
            ? (f.drillUpButton = this.renderButton(d, K, b))
            : f.drillUpButton &&
              (0 < this.level
                ? this.updateSingleButton()
                : this.destroySingleButton());
        }
        alignBreadcrumbsGroup(f) {
          if (this.group) {
            var d = this.options;
            const h = d.buttonTheme,
              g = d.position,
              l =
                "chart" === d.relativeTo || "spacingBox" === d.relativeTo
                  ? void 0
                  : "scrollablePlotBox";
            var b = this.group.getBBox();
            d = 2 * (h.padding || 0) + d.buttonSpacing;
            g.width = b.width + d;
            g.height = b.height + d;
            b = y(g);
            f && (b.x += f);
            this.options.rtl && (b.x += g.width);
            b.y = k(b.y, this.yOffset, 0);
            this.group.align(b, !0, l);
          }
        }
        renderButton(f, d, b) {
          const h = this,
            g = this.chart,
            k = h.options,
            l = y(k.buttonTheme);
          d = g.renderer
            .button(
              h.getButtonText(f),
              d,
              b,
              function (d) {
                const b = k.events && k.events.click;
                let c;
                b && (c = b.call(h, d, f));
                !1 !== c &&
                  ((d.newLevel = k.showFullPath ? f.level : h.level - 1),
                  F(h, "up", d));
              },
              l
            )
            .addClass("highcharts-breadcrumbs-button")
            .add(h.group);
          g.styledMode || d.attr(k.style);
          return d;
        }
        renderSeparator(f, d) {
          const b = this.chart,
            g = this.options.separator;
          f = b.renderer
            .label(g.text, f, d, void 0, void 0, void 0, !1)
            .addClass("highcharts-breadcrumbs-separator")
            .add(this.group);
          b.styledMode || f.css(g.style);
          return f;
        }
        update(f) {
          y(!0, this.options, f);
          this.destroy();
          this.isDirty = !0;
        }
        updateSingleButton() {
          const f = this.chart,
            b = this.list[this.level - 1];
          f.drillUpButton &&
            f.drillUpButton.attr({ text: this.getButtonText(b) });
        }
        destroy() {
          this.destroySingleButton();
          this.destroyListElements(!0);
          this.group && this.group.destroy();
          this.group = void 0;
        }
        destroyListElements(b) {
          const f = this.elementList;
          G(f, (d, g) => {
            if (b || !f[g].updated)
              (d = f[g]),
                d.button && d.button.destroy(),
                d.separator && d.separator.destroy(),
                delete d.button,
                delete d.separator,
                delete f[g];
          });
          b && (this.elementList = {});
        }
        destroySingleButton() {
          this.chart.drillUpButton &&
            (this.chart.drillUpButton.destroy(),
            (this.chart.drillUpButton = void 0));
        }
        resetElementListState() {
          G(this.elementList, (b) => {
            b.updated = !1;
          });
        }
        updateListElements() {
          const b = this.elementList,
            d = this.options.buttonSpacing,
            g = this.list,
            k = this.options.rtl,
            l = k ? -1 : 1,
            p = function (a, c) {
              return l * a.getBBox().width + l * c;
            },
            q = function (a, c, m) {
              a.translate(c - a.getBBox().width, m);
            };
          let t = this.group ? p(this.group, d) : d,
            u,
            c;
          for (let a = 0, e = g.length; a < e; ++a) {
            const m = a === e - 1;
            let r, f;
            c = g[a];
            b[c.level]
              ? ((u = b[c.level]),
                (r = u.button),
                u.separator || m
                  ? u.separator &&
                    m &&
                    (u.separator.destroy(), delete u.separator)
                  : ((t += l * d),
                    (u.separator = this.renderSeparator(t, d)),
                    k && q(u.separator, t, d),
                    (t += p(u.separator, d))),
                (b[c.level].updated = !0))
              : ((r = this.renderButton(c, t, d)),
                k && q(r, t, d),
                (t += p(r, d)),
                m ||
                  ((f = this.renderSeparator(t, d)),
                  k && q(f, t, d),
                  (t += p(f, d))),
                (b[c.level] = { button: r, separator: f, updated: !0 }));
            r && r.setState(m ? 2 : 0);
          }
        }
      }
      p.defaultOptions = b.options;
      ("");
      return p;
    }
  );
  q(
    b,
    "Extensions/Drilldown.js",
    [
      b["Core/Animation/AnimationUtilities.js"],
      b["Core/Axis/Axis.js"],
      b["Core/Chart/Chart.js"],
      b["Core/Color/Color.js"],
      b["Series/Column/ColumnSeries.js"],
      b["Core/Globals.js"],
      b["Core/Defaults.js"],
      b["Core/Series/Point.js"],
      b["Core/Series/Series.js"],
      b["Core/Series/SeriesRegistry.js"],
      b["Core/Renderer/SVG/SVGRenderer.js"],
      b["Core/Axis/Tick.js"],
      b["Core/Utilities.js"],
      b["Extensions/Breadcrumbs/Breadcrumbs.js"],
    ],
    function (b, g, l, q, C, I, J, z, D, x, A, E, B, F) {
      function H(c) {
        const a = y(this.chart.options.drilldown.animation);
        c &&
          (c.hide(),
          L(function () {
            c && c.added && c.fadeIn();
          }, Math.max(a.duration - 50, 0)));
      }
      const { animObject: y } = b,
        { noop: G } = I;
      ({ defaultOptions: b } = J);
      ({ seriesTypes: x } = x);
      const {
        addEvent: k,
        extend: v,
        fireEvent: p,
        merge: f,
        objectEach: d,
        pick: h,
        removeEvent: K,
        syncTimeout: L,
      } = B;
      B = x.pie;
      x = x.map;
      let M = 1;
      v(b.lang, {});
      b.drilldown = {
        activeAxisLabelStyle: {
          cursor: "pointer",
          color: "#0022ff",
          fontWeight: "bold",
          textDecoration: "underline",
        },
        activeDataLabelStyle: {
          cursor: "pointer",
          color: "#0022ff",
          fontWeight: "bold",
          textDecoration: "underline",
        },
        animation: { duration: 500 },
        drillUpButton: { position: { align: "right", x: -10, y: 10 } },
        mapZooming: !0,
      };
      A.prototype.Element.prototype.fadeIn = function (c) {
        this.attr({ opacity: 0.1, visibility: "inherit" }).animate(
          { opacity: h(this.newOpacity, 1) },
          c || { duration: 250 }
        );
      };
      l.prototype.addSeriesAsDrilldown = function (c, a) {
        const e = this;
        if (e.mapView)
          if (
            ((c.series.isDrilling = !0),
            (c.series.options.inactiveOtherPoints = !0),
            e.options.drilldown &&
              e.options.drilldown.animation &&
              e.options.drilldown.mapZooming)
          ) {
            c.series.dataLabelsGroup &&
              (c.series.dataLabelsGroup.destroy(),
              delete c.series.dataLabelsGroup);
            e.mapView.allowTransformAnimation = !0;
            const m = y(e.options.drilldown.animation);
            if ("boolean" !== typeof m) {
              const b = m.complete,
                f = function (b) {
                  b &&
                    b.applyDrilldown &&
                    e.mapView &&
                    (e.addSingleSeriesAsDrilldown(c, a),
                    e.applyDrilldown(),
                    (e.mapView.allowTransformAnimation = !1));
                };
              m.complete = function () {
                b && b.apply(this, arguments);
                f.apply(this, arguments);
              };
            }
            c.zoomTo(m);
          } else e.addSingleSeriesAsDrilldown(c, a), e.applyDrilldown();
        else e.addSingleSeriesAsDrilldown(c, a), e.applyDrilldown();
      };
      l.prototype.addSingleSeriesAsDrilldown = function (c, a) {
        let e = c.series,
          b = e.xAxis,
          r = e.yAxis,
          d,
          g = [],
          k = [],
          w,
          n,
          l;
        l = this.styledMode
          ? { colorIndex: h(c.colorIndex, e.colorIndex) }
          : { color: c.color || e.color };
        this.drilldownLevels || (this.drilldownLevels = []);
        w = e.options._levelNumber || 0;
        (n = this.drilldownLevels[this.drilldownLevels.length - 1]) &&
          n.levelNumber !== w &&
          (n = void 0);
        a = v(v({ _ddSeriesId: M++ }, l), a);
        d = e.points.indexOf(c);
        e.chart.series.forEach(function (a) {
          a.xAxis === b &&
            ((a.options._ddSeriesId = a.options._ddSeriesId || M++),
            (a.options._colorIndex = a.userOptions._colorIndex),
            (a.options._levelNumber = a.options._levelNumber || w),
            n
              ? ((g = n.levelSeries), (k = n.levelSeriesOptions))
              : (g.push(a),
                (a.purgedOptions = f(
                  {
                    _ddSeriesId: a.options._ddSeriesId,
                    _levelNumber: a.options._levelNumber,
                    selected: a.options.selected,
                  },
                  a.userOptions
                )),
                k.push(a.purgedOptions)));
        });
        c = v(
          {
            levelNumber: w,
            seriesOptions: e.options,
            seriesPurgedOptions: e.purgedOptions,
            levelSeriesOptions: k,
            levelSeries: g,
            shapeArgs: c.shapeArgs,
            bBox: c.graphic ? c.graphic.getBBox() : {},
            color: c.isNull ? q.parse(l.color).setOpacity(0).get() : l.color,
            lowerSeriesOptions: a,
            pointOptions: e.options.data[d],
            pointIndex: d,
            oldExtremes: {
              xMin: b && b.userMin,
              xMax: b && b.userMax,
              yMin: r && r.userMin,
              yMax: r && r.userMax,
            },
            resetZoomButton:
              n && n.levelNumber === w ? void 0 : this.resetZoomButton,
          },
          l
        );
        this.drilldownLevels.push(c);
        b && b.names && (b.names.length = 0);
        a = c.lowerSeries = this.addSeries(a, !1);
        a.options._levelNumber = w + 1;
        b &&
          ((b.oldPos = b.pos),
          (b.userMin = b.userMax = null),
          (r.userMin = r.userMax = null));
        a.isDrilling = !0;
        e.type === a.type &&
          ((a.animate = a.animateDrilldown || G), (a.options.animation = !0));
      };
      l.prototype.applyDrilldown = function () {
        const c = this,
          a = this.drilldownLevels;
        let e;
        a &&
          0 < a.length &&
          ((e = a[a.length - 1].levelNumber),
          this.drilldownLevels.forEach(function (a) {
            c.mapView &&
              c.options.drilldown &&
              c.options.drilldown.mapZooming &&
              (c.redraw(),
              (a.lowerSeries.isDrilling = !1),
              c.mapView.fitToBounds(a.lowerSeries.bounds),
              (a.lowerSeries.isDrilling = !0));
            a.levelNumber === e &&
              a.levelSeries.forEach(function (a, b) {
                c.mapView
                  ? a.options &&
                    a.options._levelNumber === e &&
                    a.group &&
                    ((b = {}),
                    c.options.drilldown && (b = c.options.drilldown.animation),
                    a.group.animate({ opacity: 0 }, b, function () {
                      a.remove(!1);
                      c.resetZoomButton &&
                        (c.resetZoomButton.hide(), delete c.resetZoomButton);
                      c.pointer.reset();
                      p(c, "afterDrilldown");
                      c.mapView &&
                        (c.series.forEach((a) => {
                          a.isDirtyData = !0;
                        }),
                        c.mapView.setView(void 0, 1));
                      c.series.forEach((a) => {
                        a.isDrilling = !1;
                      });
                      p(c, "afterApplyDrilldown");
                    }))
                  : a.options && a.options._levelNumber === e && a.remove(!1);
              });
          }));
        c.mapView ||
          (this.resetZoomButton &&
            (this.resetZoomButton.hide(), delete this.resetZoomButton),
          this.pointer.reset(),
          p(this, "afterDrilldown"),
          this.redraw(),
          p(this, "afterApplyDrilldown"));
      };
      const N = function (c) {
        const a = [];
        (c = c.drilldownLevels) &&
          c.length &&
          (a[0] || a.push({ level: 0, levelOptions: c[0].seriesOptions }),
          c.forEach(function (c, b) {
            c.levelNumber + 1 > a[a.length - 1].level &&
              a.push({
                level: c.levelNumber + 1,
                levelOptions: f({ name: c.lowerSeries.name }, c.pointOptions),
              });
          }));
        return a;
      };
      l.prototype.drillUp = function (c) {
        if (this.drilldownLevels && 0 !== this.drilldownLevels.length) {
          p(this, "beforeDrillUp");
          for (
            var a = this,
              b = a.drilldownLevels,
              d = b[b.length - 1].levelNumber,
              f = a.series,
              g = a.drilldownLevels.length,
              k = function (c, b) {
                let e;
                f.forEach(function (a) {
                  a.options._ddSeriesId === c._ddSeriesId && (e = a);
                });
                e = e || a.addSeries(c, !1);
                e.type === b.type &&
                  e.animateDrillupTo &&
                  (e.animate = e.animateDrillupTo);
                if (c === h.seriesPurgedOptions) return e;
              },
              l = (c) => {
                c.remove(!1);
                a.series.forEach((a) => {
                  a.colorAxis && (a.isDirtyData = !0);
                  a.options.inactiveOtherPoints = !1;
                });
                a.redraw();
              },
              w = b.length,
              n,
              h;
            w--;

          ) {
            let e, m;
            h = b[w];
            if (h.levelNumber === d) {
              b.pop();
              e = h.lowerSeries;
              if (!e.chart)
                for (n = f.length; n--; )
                  if (
                    f[n].options.id === h.lowerSeriesOptions.id &&
                    f[n].options._levelNumber === d + 1
                  ) {
                    e = f[n];
                    break;
                  }
              e.xData = [];
              e.xAxis &&
                e.xAxis.names &&
                (0 === g || w === g) &&
                (e.xAxis.names.length = 0);
              h.levelSeriesOptions.forEach((a) => {
                m = k(a, e);
              });
              p(a, "drillup", {
                seriesOptions: h.seriesPurgedOptions || h.seriesOptions,
              });
              m &&
                (m.type === e.type &&
                  ((m.drilldownLevel = h),
                  (m.options.animation = a.options.drilldown.animation),
                  e.animateDrillupFrom && e.chart && e.animateDrillupFrom(h)),
                (m.options._levelNumber = d));
              n = e;
              a.mapView || n.remove(!1);
              m &&
                m.xAxis &&
                ((n = h.oldExtremes),
                m.xAxis.setExtremes(n.xMin, n.xMax, !1),
                m.yAxis.setExtremes(n.yMin, n.yMax, !1));
              h.resetZoomButton && (a.resetZoomButton = h.resetZoomButton);
              this.mapView
                ? ((n =
                    a.options.drilldown &&
                    a.options.drilldown.animation &&
                    a.options.drilldown.mapZooming),
                  h.levelNumber === d && c
                    ? e.remove(!1)
                    : (e.dataLabelsGroup &&
                        (e.dataLabelsGroup.destroy(), delete e.dataLabelsGroup),
                      a.mapView &&
                        m &&
                        (n &&
                          ((e.isDrilling = !0),
                          (m.isDrilling = !0),
                          a.redraw(!1),
                          a.mapView.fitToBounds(e.bounds, void 0, !0, !1)),
                        (a.mapView.allowTransformAnimation = !0),
                        p(a, "afterDrillUp", {
                          seriesOptions: m ? m.userOptions : void 0,
                        }),
                        n
                          ? a.mapView.setView(void 0, 1, !0, {
                              complete: function () {
                                Object.prototype.hasOwnProperty.call(
                                  this,
                                  "complete"
                                ) && l(e);
                              },
                            })
                          : ((a.mapView.allowTransformAnimation = !1),
                            e.group
                              ? e.group.animate(
                                  { opacity: 0 },
                                  a.options.drilldown.animation,
                                  function () {
                                    l(e);
                                    a.mapView &&
                                      (a.mapView.allowTransformAnimation = !0);
                                  }
                                )
                              : (l(e),
                                (a.mapView.allowTransformAnimation = !0))),
                        (m.isDrilling = !1),
                        a.ddDupes && (a.ddDupes.length = 0),
                        p(a, "drillupall"))))
                : (p(a, "afterDrillUp"),
                  this.redraw(),
                  this.ddDupes && (this.ddDupes.length = 0),
                  p(a, "drillupall"));
            }
          }
        }
      };
      k(l, "afterInit", function () {
        const c = this;
        c.drilldown = {
          chart: c,
          fadeInGroup: H,
          update: function (a, e) {
            f(!0, c.options.drilldown, a);
            h(e, !0) && c.redraw();
          },
        };
      });
      k(l, "render", function () {
        (this.xAxis || []).forEach(function (c) {
          c.ddPoints = {};
          c.series.forEach(function (a) {
            let e,
              b = a.xData || [],
              f = a.points;
            for (e = 0; e < b.length; e++) {
              var d = a.options.data[e];
              "number" !== typeof d &&
                ((d = a.pointClass.prototype.optionsToObject.call(
                  { series: a },
                  d
                )),
                d.drilldown &&
                  (c.ddPoints[b[e]] || (c.ddPoints[b[e]] = []),
                  (d = e - (a.cropStart || 0)),
                  c.ddPoints[b[e]].push(
                    f && 0 <= d && d < f.length ? f[d] : !0
                  )));
            }
          });
          d(c.ticks, E.prototype.drillable);
        });
      });
      k(F, "up", function (c) {
        const a = this.chart;
        c = this.getLevel() - c.newLevel;
        let e = 1 < c;
        for (let b = 0; b < c; b++) b === c - 1 && (e = !1), a.drillUp(e);
      });
      k(l, "afterDrilldown", function () {
        var c = this.options.drilldown;
        c = c && c.breadcrumbs;
        this.breadcrumbs || (this.breadcrumbs = new F(this, c));
        this.breadcrumbs.updateProperties(N(this));
      });
      k(l, "afterDrillUp", function () {
        this.breadcrumbs && this.breadcrumbs.updateProperties(N(this));
      });
      k(l, "update", function (c) {
        const a = this.breadcrumbs,
          e = c.options.drilldown && c.options.drilldown.breadcrumbs;
        a && e && a.update(c.options.drilldown.breadcrumbs);
      });
      C.prototype.animateDrillupTo = function (c) {
        if (!c) {
          const a = this,
            c = a.drilldownLevel;
          this.points.forEach(function (a) {
            const c = a.dataLabel;
            a.graphic && a.graphic.hide();
            c &&
              ((c.hidden = "hidden" === c.attr("visibility")),
              c.hidden || (c.hide(), a.connector && a.connector.hide()));
          });
          L(function () {
            if (a.points) {
              let b = [];
              a.data.forEach(function (a) {
                b.push(a);
              });
              a.nodes && (b = b.concat(a.nodes));
              b.forEach(function (a, b) {
                b = b === (c && c.pointIndex) ? "show" : "fadeIn";
                const e = "show" === b ? !0 : void 0,
                  d = a.dataLabel;
                if (a.graphic && a.visible) a.graphic[b](e);
                d &&
                  !d.hidden &&
                  (d.fadeIn(), a.connector && a.connector.fadeIn());
              });
            }
          }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0));
          delete this.animate;
        }
      };
      C.prototype.animateDrilldown = function (c) {
        let a = this,
          b = this.chart,
          d = b.drilldownLevels,
          f,
          g = y(b.options.drilldown.animation),
          k = this.xAxis,
          l = b.styledMode;
        c ||
          (d.forEach(function (c) {
            a.options._ddSeriesId === c.lowerSeriesOptions._ddSeriesId &&
              ((f = c.shapeArgs), l || (f.fill = c.color));
          }),
          (f.x += h(k.oldPos, k.pos) - k.pos),
          this.points.forEach(function (c) {
            const b = c.shapeArgs;
            l || (b.fill = c.color);
            c.graphic &&
              c.graphic
                .attr(f)
                .animate(v(c.shapeArgs, { fill: c.color || a.color }), g);
          }),
          b.drilldown && b.drilldown.fadeInGroup(this.dataLabelsGroup),
          delete this.animate);
      };
      C.prototype.animateDrillupFrom = function (c) {
        let a = y(this.chart.options.drilldown.animation),
          b = this.group,
          d = b !== this.chart.columnGroup,
          g = this;
        g.trackerGroups.forEach(function (a) {
          if (g[a]) g[a].on("mouseover");
        });
        d && delete this.group;
        this.points.forEach(function (e) {
          const m = e.graphic,
            h = c.shapeArgs,
            k = function () {
              m.destroy();
              b && d && (b = b.destroy());
            };
          m &&
            h &&
            (delete e.graphic,
            g.chart.styledMode || (h.fill = c.color),
            a.duration
              ? m.animate(h, f(a, { complete: k }))
              : (m.attr(h), k()));
        });
      };
      B &&
        v(B.prototype, {
          animateDrillupTo: C.prototype.animateDrillupTo,
          animateDrillupFrom: C.prototype.animateDrillupFrom,
          animateDrilldown: function (c) {
            const a =
                this.chart.drilldownLevels[
                  this.chart.drilldownLevels.length - 1
                ],
              b = this.chart.options.drilldown.animation;
            this.is("item") && (b.duration = 0);
            if (this.center) {
              const e = a.shapeArgs,
                d = e.start,
                g = (e.end - d) / this.points.length,
                h = this.chart.styledMode;
              c ||
                (this.points.forEach(function (c, m) {
                  const k = c.shapeArgs;
                  h || ((e.fill = a.color), (k.fill = c.color));
                  if (c.graphic)
                    c.graphic
                      .attr(f(e, { start: d + m * g, end: d + (m + 1) * g }))
                      [b ? "animate" : "attr"](k, b);
                }),
                this.chart.drilldown &&
                  this.chart.drilldown.fadeInGroup(this.dataLabelsGroup),
                delete this.animate);
            }
          },
        });
      x &&
        v(x.prototype, {
          animateDrilldown(c) {
            const a = this,
              b = this.chart,
              d = this.group;
            b &&
              d &&
              a.options &&
              (c && b.mapView
                ? (d.attr({ opacity: 0.01 }),
                  (b.mapView.allowTransformAnimation = !1),
                  (a.options.inactiveOtherPoints = !0),
                  (a.options.enableMouseTracking = !1))
                : (d.animate(
                    { opacity: 1 },
                    b.options.drilldown.animation,
                    function () {
                      a.options &&
                        ((a.options.inactiveOtherPoints = !1),
                        (a.options.enableMouseTracking = h(
                          a.userOptions && a.userOptions.enableMouseTracking,
                          !0
                        )));
                    }
                  ),
                  b.drilldown &&
                    b.drilldown.fadeInGroup(this.dataLabelsGroup)));
          },
          animateDrillupFrom() {
            const c = this.chart;
            c && c.mapView && (c.mapView.allowTransformAnimation = !1);
            this.options && (this.options.inactiveOtherPoints = !0);
          },
          animateDrillupTo(c) {
            const a = this.chart,
              b = this.group;
            a &&
              b &&
              (c
                ? (b.attr({ opacity: 0.01 }),
                  this.options && (this.options.inactiveOtherPoints = !0))
                : (b.animate({ opacity: 1 }, a.options.drilldown.animation),
                  a.drilldown &&
                    a.drilldown.fadeInGroup(this.dataLabelsGroup)));
          },
        });
      z.prototype.doDrilldown = function () {
        this.runDrilldown();
      };
      z.prototype.runDrilldown = function (c, a, b) {
        const e = this.series.chart,
          d = e.options.drilldown;
        let f = (d.series || []).length,
          g;
        e.ddDupes || (e.ddDupes = []);
        for (; f-- && !g; )
          d.series[f].id === this.drilldown &&
            -1 === e.ddDupes.indexOf(this.drilldown) &&
            ((g = d.series[f]), e.ddDupes.push(this.drilldown));
        p(
          e,
          "drilldown",
          {
            point: this,
            seriesOptions: g,
            category: a,
            originalEvent: b,
            points:
              "undefined" !== typeof a &&
              this.series.xAxis.getDDPoints(a).slice(0),
          },
          function (a) {
            const b = a.point.series && a.point.series.chart,
              e = a.seriesOptions;
            b &&
              e &&
              (c
                ? b.addSingleSeriesAsDrilldown(a.point, e)
                : b.addSeriesAsDrilldown(a.point, e));
          }
        );
      };
      g.prototype.drilldownCategory = function (c, a) {
        this.getDDPoints(c).forEach(function (b) {
          b &&
            b.series &&
            b.series.visible &&
            b.runDrilldown &&
            b.runDrilldown(!0, c, a);
        });
        this.chart.applyDrilldown();
      };
      g.prototype.getDDPoints = function (b) {
        return (this.ddPoints && this.ddPoints[b]) || [];
      };
      E.prototype.drillable = function () {
        const b = this.pos,
          a = this.label,
          e = this.axis,
          d = "xAxis" === e.coll && e.getDDPoints,
          g = d && e.getDDPoints(b),
          h = e.chart.styledMode;
        d &&
          (a && g && g.length
            ? ((a.drillable = !0),
              a.basicStyles || h || (a.basicStyles = f(a.styles)),
              a.addClass("highcharts-drilldown-axis-label"),
              a.removeOnDrillableClick && K(a.element, "click"),
              (a.removeOnDrillableClick = k(a.element, "click", function (a) {
                a.preventDefault();
                e.drilldownCategory(b, a);
              })),
              h || a.css(e.chart.options.drilldown.activeAxisLabelStyle))
            : a &&
              a.drillable &&
              a.removeOnDrillableClick &&
              (h ||
                ((a.styles = {}),
                a.element.removeAttribute("style"),
                a.css(a.basicStyles)),
              a.removeOnDrillableClick(),
              a.removeClass("highcharts-drilldown-axis-label")));
      };
      k(z, "afterInit", function () {
        this.drilldown &&
          !this.unbindDrilldownClick &&
          (this.unbindDrilldownClick = k(this, "click", t));
        return this;
      });
      k(z, "update", function (b) {
        b = b.options || {};
        b.drilldown && !this.unbindDrilldownClick
          ? (this.unbindDrilldownClick = k(this, "click", t))
          : !b.drilldown &&
            void 0 !== b.drilldown &&
            this.unbindDrilldownClick &&
            (this.unbindDrilldownClick = this.unbindDrilldownClick());
      });
      const t = function (b) {
        const a = this.series;
        a.xAxis && !1 === a.chart.options.drilldown.allowPointDrilldown
          ? a.xAxis.drilldownCategory(this.x, b)
          : this.runDrilldown(void 0, void 0, b);
      };
      k(D, "afterDrawDataLabels", function () {
        const b = this.chart.options.drilldown.activeDataLabelStyle,
          a = this.chart.renderer,
          e = this.chart.styledMode;
        this.points.forEach(function (c) {
          const d = c.options.dataLabels,
            f = h(c.dlOptions, d && d.style, {});
          c.drilldown &&
            c.dataLabel &&
            ("contrast" !== b.color ||
              e ||
              (f.color = a.getContrast(c.color || this.color)),
            d && d.color && (f.color = d.color),
            c.dataLabel.addClass("highcharts-drilldown-data-label"),
            e || c.dataLabel.css(b).css(f));
        }, this);
      });
      const u = function (b, a, d, f) {
        b[d ? "addClass" : "removeClass"]("highcharts-drilldown-point");
        f || b.css({ cursor: a });
      };
      k(D, "afterDrawTracker", function () {
        const b = this.chart.styledMode;
        this.points.forEach(function (a) {
          a.drilldown && a.graphic && u(a.graphic, "pointer", !0, b);
        });
      });
      k(z, "afterSetState", function () {
        const b = this.series.chart.styledMode;
        this.drilldown && this.series.halo && "hover" === this.state
          ? u(this.series.halo, "pointer", !0, b)
          : this.series.halo && u(this.series.halo, "auto", !1, b);
      });
      k(l, "drillup", function () {
        this.resetZoomButton &&
          (this.resetZoomButton = this.resetZoomButton.destroy());
      });
      k(l, "drillupall", function () {
        this.resetZoomButton && this.showResetZoom();
      });
    }
  );
  q(
    b,
    "masters/modules/drilldown.src.js",
    [b["Core/Globals.js"], b["Extensions/Breadcrumbs/Breadcrumbs.js"]],
    function (b, g) {
      b.Breadcrumbs = g;
      g.compose(b.Chart, b.defaultOptions);
    }
  );
});
//# sourceMappingURL=drilldown.js.map
