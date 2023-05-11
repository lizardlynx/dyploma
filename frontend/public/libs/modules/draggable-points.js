/*
 Highcharts JS v11.0.0 (2023-04-26)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (e) {
  "object" === typeof module && module.exports
    ? ((e["default"] = e), (module.exports = e))
    : "function" === typeof define && define.amd
    ? define(
        "highcharts/modules/draggable-points",
        ["highcharts"],
        function (v) {
          e(v);
          e.Highcharts = v;
          return e;
        }
      )
    : e("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (e) {
  function v(e, w, v, z) {
    e.hasOwnProperty(w) ||
      ((e[w] = z.apply(null, v)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: w, module: e[w] },
          })
        ));
  }
  e = e ? e._modules : {};
  v(
    e,
    "Extensions/DraggablePoints.js",
    [
      e["Core/Animation/AnimationUtilities.js"],
      e["Core/Chart/Chart.js"],
      e["Core/Globals.js"],
      e["Core/Series/Point.js"],
      e["Core/Series/Series.js"],
      e["Core/Series/SeriesRegistry.js"],
      e["Core/Utilities.js"],
    ],
    function (e, w, v, z, G, A, E) {
      function H(a) {
        return { left: "right", right: "left", top: "bottom", bottom: "top" }[
          a
        ];
      }
      function P(a) {
        const b = ["draggableX", "draggableY"];
        x(a.dragDropProps, function (a) {
          a.optionName && b.push(a.optionName);
        });
        let c = b.length;
        for (; c--; ) if (a.options.dragDrop[b[c]]) return !0;
      }
      function Q(a) {
        let b = a.series ? a.series.length : 0;
        if ((a.hasCartesianSeries && !a.polar) || a.mapView)
          for (; b--; )
            if (a.series[b].options.dragDrop && P(a.series[b])) return !0;
      }
      function R(a) {
        const b = a.series,
          c = b.chart,
          d = b.options.dragDrop || {};
        a = a.options && a.options.dragDrop;
        let f, l;
        x(b.dragDropProps, function (a) {
          "x" === a.axis && a.move
            ? (f = !0)
            : "y" === a.axis && a.move && (l = !0);
        });
        return (
          ((d.draggableX && f) || (d.draggableY && l)) &&
          !(a && !1 === a.draggableX && !1 === a.draggableY) &&
          ((b.yAxis && b.xAxis) || c.mapView)
        );
      }
      function B(a, b) {
        return "undefined" === typeof a.chartX ||
          "undefined" === typeof a.chartY
          ? b.pointer.normalize(a)
          : a;
      }
      function C(a, b, c, d) {
        const f = b.map(function (b) {
          return y(a, b, c, d);
        });
        return function () {
          f.forEach(function (a) {
            a();
          });
        };
      }
      function S(a, b, c) {
        var d = b.dragDropData.origin;
        b = d.chartX;
        d = d.chartY;
        const f = a.chartX;
        a = a.chartY;
        return Math.sqrt((f - b) * (f - b) + (a - d) * (a - d)) > c;
      }
      function T(a, b, c) {
        const d = {
          chartX: a.chartX,
          chartY: a.chartY,
          guideBox: c && {
            x: c.attr("x"),
            y: c.attr("y"),
            width: c.attr("width"),
            height: c.attr("height"),
          },
          points: {},
        };
        b.forEach(function (b) {
          const c = {};
          x(b.series.dragDropProps, function (d, f) {
            d = b.series[d.axis + "Axis"];
            c[f] = b[f];
            c[f + "Offset"] =
              b.series.chart.mapView && b.plotX && b.plotY
                ? "x" === f
                  ? b.plotX
                  : b.plotY
                : d.toPixels(b[f]) - (d.horiz ? a.chartX : a.chartY);
          });
          c.point = b;
          d.points[b.id] = c;
        });
        return d;
      }
      function U(a) {
        const b = a.series,
          c = b.options.dragDrop.groupBy;
        let d = [];
        b.boosted
          ? b.options.data.forEach(function (a, c) {
              d.push(new b.pointClass().init(b, a));
              d[d.length - 1].index = c;
            })
          : (d = b.points);
        return a.options[c]
          ? d.filter(function (b) {
              return b.options[c] === a.options[c];
            })
          : [a];
      }
      function I(a, b) {
        const c = U(b),
          d = b.series,
          f = d.chart;
        let l;
        u(d.options.dragDrop && d.options.dragDrop.liveRedraw, !0) ||
          ((f.dragGuideBox = l = d.getGuideBox(c)),
          f
            .setGuideBoxState("default", d.options.dragDrop.guideBox)
            .add(d.group));
        f.dragDropData = {
          origin: T(a, c, l),
          point: b,
          groupedPoints: c,
          isDragging: !0,
        };
      }
      function V(a, b) {
        const c = a.point,
          d = c.series,
          f = d.chart,
          l = q(d.options.dragDrop, c.options.dragDrop),
          m = {},
          e = a.updateProp,
          D = {};
        x(c.series.dragDropProps, function (a, b) {
          if (
            !e ||
            (e === b && a.resize && (!a.optionName || !1 !== l[a.optionName]))
          )
            if (
              e ||
              (a.move &&
                (("x" === a.axis && l.draggableX) ||
                  ("y" === a.axis && l.draggableY)))
            )
              f.mapView ? (m["x" === b ? "lon" : "lat"] = a) : (m[b] = a);
        });
        (e ? [c] : a.groupedPoints).forEach(function (c) {
          D[c.id] = { point: c, newValues: c.getDropValues(a.origin, b, m) };
        });
        return D;
      }
      function J(a, b) {
        const c = a.dragDropData.newPoints;
        b = W(b);
        a.isDragDropAnimating = !0;
        x(c, function (a) {
          a.point.update(a.newValues, !1);
        });
        a.redraw(b);
        setTimeout(function () {
          delete a.isDragDropAnimating;
          a.hoverPoint && !a.dragHandles && a.hoverPoint.showDragHandles();
        }, b.duration);
      }
      function K(a) {
        const b = a.series && a.series.chart,
          c = b && b.dragDropData;
        !b ||
          !b.dragHandles ||
          (c &&
            ((c.isDragging && c.draggedPastSensitivity) ||
              c.isHoveringHandle === a.id)) ||
          b.hideDragHandles();
      }
      function L(a) {
        let b = 0;
        for (const c in a) Object.hasOwnProperty.call(a, c) && b++;
        return b;
      }
      function M(a) {
        for (const b in a) if (Object.hasOwnProperty.call(a, b)) return a[b];
      }
      function X(a, b) {
        if (!b.zoomOrPanKeyPressed(a)) {
          var c = b.dragDropData;
          var d = 0;
          if (c && c.isDragging && c.point.series) {
            var f = c.point;
            d = f.series.options.dragDrop;
            a.preventDefault();
            c.draggedPastSensitivity ||
              (c.draggedPastSensitivity = S(
                a,
                b,
                u(
                  f.options.dragDrop && f.options.dragDrop.dragSensitivity,
                  d && d.dragSensitivity,
                  2
                )
              ));
            c.draggedPastSensitivity &&
              ((c.newPoints = V(c, a)),
              (b = c.newPoints),
              (d = L(b)),
              (b = 1 === d ? M(b) : null),
              f.firePointEvent(
                "drag",
                {
                  origin: c.origin,
                  newPoints: c.newPoints,
                  newPoint: b && b.newValues,
                  newPointId: b && b.point.id,
                  numNewPoints: d,
                  chartX: a.chartX,
                  chartY: a.chartY,
                },
                function () {
                  {
                    var b = f.series,
                      c = b.chart,
                      d = c.dragDropData,
                      e = q(b.options.dragDrop, f.options.dragDrop),
                      p = e.draggableX,
                      g = e.draggableY;
                    b = d.origin;
                    var h = d.updateProp;
                    d = a.chartX - b.chartX;
                    let l = a.chartY - b.chartY;
                    var n = d;
                    c.inverted && ((d = -l), (l = -n));
                    if (u(e.liveRedraw, !0)) J(c, !1), f.showDragHandles();
                    else if (h) {
                      {
                        g = d;
                        c = l;
                        n = f.series;
                        h = n.chart;
                        e = h.dragDropData;
                        p = n.dragDropProps[e.updateProp];
                        const a = e.newPoints[f.id].newValues,
                          b =
                            "function" === typeof p.resizeSide
                              ? p.resizeSide(a, f)
                              : p.resizeSide;
                        p.beforeResize && p.beforeResize(h.dragGuideBox, a, f);
                        {
                          h = h.dragGuideBox;
                          n =
                            ("x" === p.axis && n.xAxis.reversed) ||
                            ("y" === p.axis && n.yAxis.reversed)
                              ? H(b)
                              : b;
                          g = "x" === p.axis ? g - (e.origin.prevdX || 0) : 0;
                          c = "y" === p.axis ? c - (e.origin.prevdY || 0) : 0;
                          let a;
                          switch (n) {
                            case "left":
                              a = {
                                x: h.attr("x") + g,
                                width: Math.max(1, h.attr("width") - g),
                              };
                              break;
                            case "right":
                              a = { width: Math.max(1, h.attr("width") + g) };
                              break;
                            case "top":
                              a = {
                                y: h.attr("y") + c,
                                height: Math.max(1, h.attr("height") - c),
                              };
                              break;
                            case "bottom":
                              a = { height: Math.max(1, h.attr("height") + c) };
                          }
                          h.attr(a);
                        }
                      }
                    } else c.dragGuideBox.translate(p ? d : 0, g ? l : 0);
                    b.prevdX = d;
                    b.prevdY = l;
                  }
                }
              ));
          }
        }
      }
      function F(a, b) {
        const c = b.dragDropData;
        if (c && c.isDragging && c.draggedPastSensitivity && c.point.series) {
          const d = c.point,
            f = c.newPoints,
            l = L(f),
            e = 1 === l ? M(f) : null;
          b.dragHandles && b.hideDragHandles();
          a.preventDefault();
          b.cancelClick = !0;
          d.firePointEvent(
            "drop",
            {
              origin: c.origin,
              chartX: a.chartX,
              chartY: a.chartY,
              newPoints: f,
              numNewPoints: l,
              newPoint: e && e.newValues,
              newPointId: e && e.point.id,
            },
            function () {
              J(b);
            }
          );
        }
        delete b.dragDropData;
        b.dragGuideBox && (b.dragGuideBox.destroy(), delete b.dragGuideBox);
      }
      function Y(a) {
        const b = a.container,
          c = v.doc;
        Q(a) &&
          (C(b, ["mousedown", "touchstart"], function (b) {
            {
              b = B(b, a);
              const d = a.hoverPoint;
              var c = q(
                d && d.series.options.dragDrop,
                d && d.options.dragDrop
              );
              const f = c.draggableX || !1;
              c = c.draggableY || !1;
              a.cancelClick = !1;
              (!f && !c) ||
                a.zoomOrPanKeyPressed(b) ||
                a.hasDraggedAnnotation ||
                (a.dragDropData && a.dragDropData.isDragging
                  ? F(b, a)
                  : d &&
                    R(d) &&
                    ((a.mouseIsDown = !1),
                    I(b, d),
                    d.firePointEvent("dragStart", b)));
            }
          }),
          C(
            b,
            ["mousemove", "touchmove"],
            function (b) {
              X(B(b, a), a);
            },
            { passive: !1 }
          ),
          y(b, "mouseleave", function (b) {
            F(B(b, a), a);
          }),
          (a.unbindDragDropMouseUp = C(
            c,
            ["mouseup", "touchend"],
            function (b) {
              F(B(b, a), a);
            },
            { passive: !1 }
          )),
          (a.hasAddedDragDropEvents = !0),
          y(a, "destroy", function () {
            a.unbindDragDropMouseUp && a.unbindDragDropMouseUp();
          }));
      }
      const { animObject: W } = e,
        { seriesTypes: g } = A,
        {
          addEvent: y,
          clamp: N,
          isNumber: O,
          merge: q,
          objectEach: x,
          pick: u,
        } = E;
      e = function (a) {
        a = a.shapeArgs || a.graphic.getBBox();
        const b = a.r || 0,
          c = a.height / 2;
        return [
          ["M", 0, b],
          ["L", 0, c - 5],
          ["A", 1, 1, 0, 0, 0, 0, c + 5],
          ["A", 1, 1, 0, 0, 0, 0, c - 5],
          ["M", 0, c + 5],
          ["L", 0, a.height - b],
        ];
      };
      A = G.prototype.dragDropProps = {
        x: { axis: "x", move: !0 },
        y: { axis: "y", move: !0 },
      };
      g.flags && (g.flags.prototype.dragDropProps = A);
      const k = (g.column.prototype.dragDropProps = {
        x: { axis: "x", move: !0 },
        y: {
          axis: "y",
          move: !1,
          resize: !0,
          beforeResize: function (a, b, c) {
            const d = u(c.yBottom, c.series.translatedThreshold),
              f = a.attr("y"),
              e = O(c.stackY)
                ? c.stackY - (c.y || 0)
                : c.series.options.threshold || 0;
            b = e + b.y;
            (c.series.yAxis.reversed ? b < e : b >= e)
              ? ((c = a.attr("height")),
                a.attr({
                  height: Math.max(0, Math.round(c + (d ? d - f - c : 0))),
                }))
              : a.attr({ y: Math.round(f + (d ? d - f : 0)) });
          },
          resizeSide: function (a, b) {
            const c = b.series.chart.dragHandles;
            a = a.y >= (b.series.options.threshold || 0) ? "top" : "bottom";
            b = H(a);
            c && c[b] && (c[b].destroy(), delete c[b]);
            return a;
          },
          handlePositioner: function (a) {
            const b = a.shapeArgs || (a.graphic && a.graphic.getBBox()) || {},
              c = a.series.yAxis.reversed,
              d = a.series.options.threshold || 0;
            a = a.y || 0;
            return {
              x: b.x || 0,
              y:
                (!c && a >= d) || (c && a < d)
                  ? b.y || 0
                  : (b.y || 0) + (b.height || 0),
            };
          },
          handleFormatter: function (a) {
            var b = a.shapeArgs || {};
            a = b.r || 0;
            b = b.width || 0;
            const c = b / 2;
            return [
              ["M", a, 0],
              ["L", c - 5, 0],
              ["A", 1, 1, 0, 0, 0, c + 5, 0],
              ["A", 1, 1, 0, 0, 0, c - 5, 0],
              ["M", c + 5, 0],
              ["L", b - a, 0],
            ];
          },
        },
      });
      g.bullet &&
        (g.bullet.prototype.dragDropProps = {
          x: k.x,
          y: k.y,
          target: {
            optionName: "draggableTarget",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "top",
            handlePositioner: function (a) {
              const b = a.targetGraphic.getBBox();
              return { x: a.barX, y: b.y + b.height / 2 };
            },
            handleFormatter: k.y.handleFormatter,
          },
        });
      g.columnrange &&
        (g.columnrange.prototype.dragDropProps = {
          x: { axis: "x", move: !0 },
          low: {
            optionName: "draggableLow",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "bottom",
            handlePositioner: function (a) {
              a = a.shapeArgs || a.graphic.getBBox();
              return { x: a.x || 0, y: (a.y || 0) + (a.height || 0) };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.high;
            },
          },
          high: {
            optionName: "draggableHigh",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "top",
            handlePositioner: function (a) {
              a = a.shapeArgs || a.graphic.getBBox();
              return { x: a.x || 0, y: a.y || 0 };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a >= b.low;
            },
          },
        });
      g.boxplot &&
        (g.boxplot.prototype.dragDropProps = {
          x: k.x,
          low: {
            optionName: "draggableLow",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "bottom",
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x || 0, y: a.lowPlot };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.q1;
            },
          },
          q1: {
            optionName: "draggableQ1",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "bottom",
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x || 0, y: a.q1Plot };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.median && a >= b.low;
            },
          },
          median: { axis: "y", move: !0 },
          q3: {
            optionName: "draggableQ3",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "top",
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x || 0, y: a.q3Plot };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.high && a >= b.median;
            },
          },
          high: {
            optionName: "draggableHigh",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "top",
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x || 0, y: a.highPlot };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a >= b.q3;
            },
          },
        });
      g.ohlc &&
        (g.ohlc.prototype.dragDropProps = {
          x: k.x,
          low: {
            optionName: "draggableLow",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "bottom",
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x, y: a.plotLow };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.open && a <= b.close;
            },
          },
          high: {
            optionName: "draggableHigh",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "top",
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x, y: a.plotHigh };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a >= b.open && a >= b.close;
            },
          },
          open: {
            optionName: "draggableOpen",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: function (a) {
              return a.open >= a.close ? "top" : "bottom";
            },
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x, y: a.plotOpen };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.high && a >= b.low;
            },
          },
          close: {
            optionName: "draggableClose",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: function (a) {
              return a.open >= a.close ? "bottom" : "top";
            },
            handlePositioner: function (a) {
              return { x: a.shapeArgs.x, y: a.plotClose };
            },
            handleFormatter: k.y.handleFormatter,
            propValidate: function (a, b) {
              return a <= b.high && a >= b.low;
            },
          },
        });
      g.arearange &&
        ((A = g.columnrange.prototype.dragDropProps),
        (E = function (a) {
          a = a.graphic ? a.graphic.getBBox().width / 2 + 1 : 4;
          return [
            ["M", 0 - a, 0],
            ["a", a, a, 0, 1, 0, 2 * a, 0],
            ["a", a, a, 0, 1, 0, -2 * a, 0],
          ];
        }),
        (g.arearange.prototype.dragDropProps = {
          x: A.x,
          low: {
            optionName: "draggableLow",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "bottom",
            handlePositioner: function (a) {
              return (a =
                a.graphics && a.graphics[0] && a.graphics[0].getBBox())
                ? { x: a.x + a.width / 2, y: a.y + a.height / 2 }
                : { x: -999, y: -999 };
            },
            handleFormatter: E,
            propValidate: A.low.propValidate,
          },
          high: {
            optionName: "draggableHigh",
            axis: "y",
            move: !0,
            resize: !0,
            resizeSide: "top",
            handlePositioner: function (a) {
              return (a =
                a.graphics && a.graphics[1] && a.graphics[1].getBBox())
                ? { x: a.x + a.width / 2, y: a.y + a.height / 2 }
                : { x: -999, y: -999 };
            },
            handleFormatter: E,
            propValidate: A.high.propValidate,
          },
        }));
      g.waterfall &&
        (g.waterfall.prototype.dragDropProps = {
          x: k.x,
          y: q(k.y, {
            handleFormatter: function (a) {
              return a.isSum || a.isIntermediateSum
                ? null
                : k.y.handleFormatter(a);
            },
          }),
        });
      if (g.xrange) {
        const a = function (a, c) {
          var b = a.series;
          const f = b.xAxis,
            e = b.yAxis,
            m = b.chart.inverted;
          b = b.columnMetrics
            ? b.columnMetrics.offset
            : -a.shapeArgs.height / 2;
          c = f.toPixels(a[c], !0);
          a = e.toPixels(a.y, !0);
          m && ((c = f.len - c), (a = e.len - a));
          return { x: Math.round(c), y: Math.round(a + b) };
        };
        e = g.xrange.prototype.dragDropProps = {
          y: { axis: "y", move: !0 },
          x: {
            optionName: "draggableX1",
            axis: "x",
            move: !0,
            resize: !0,
            resizeSide: "left",
            handlePositioner: function (b) {
              return a(b, "x");
            },
            handleFormatter: e,
            propValidate: function (a, c) {
              return a <= c.x2;
            },
          },
          x2: {
            optionName: "draggableX2",
            axis: "x",
            move: !0,
            resize: !0,
            resizeSide: "right",
            handlePositioner: function (b) {
              return a(b, "x2");
            },
            handleFormatter: e,
            propValidate: function (a, c) {
              return a >= c.x;
            },
          },
        };
        g.gantt &&
          (g.gantt.prototype.dragDropProps = {
            y: e.y,
            start: q(e.x, {
              optionName: "draggableStart",
              validateIndividualDrag: function (a) {
                return !a.milestone;
              },
            }),
            end: q(e.x2, {
              optionName: "draggableEnd",
              validateIndividualDrag: function (a) {
                return !a.milestone;
              },
            }),
          });
      }
      "gauge pie sunburst wordcloud sankey histogram pareto vector windbarb treemap bellcurve sma map mapline"
        .split(" ")
        .forEach(function (a) {
          g[a] && (g[a].prototype.dragDropProps = null);
        });
      const Z = {
          default: {
            className: "highcharts-drag-box-default",
            lineWidth: 1,
            lineColor: "#888",
            color: "rgba(0, 0, 0, 0.1)",
            cursor: "move",
            zIndex: 900,
          },
        },
        aa = {
          className: "highcharts-drag-handle",
          color: "#fff",
          lineColor: "rgba(0, 0, 0, 0.6)",
          lineWidth: 1,
          zIndex: 901,
        };
      w.prototype.setGuideBoxState = function (a, b) {
        const c = this.dragGuideBox;
        b = q(Z, b);
        a = q(b["default"], b[a]);
        return c
          .attr({
            class: a.className,
            stroke: a.lineColor,
            strokeWidth: a.lineWidth,
            fill: a.color,
            cursor: a.cursor,
            zIndex: a.zIndex,
          })
          .css({ pointerEvents: "none" });
      };
      z.prototype.getDropValues = function (a, b, c) {
        const d = this,
          e = d.series,
          l = e.chart,
          m = l.mapView,
          g = q(e.options.dragDrop, d.options.dragDrop),
          D = {},
          p = a.points[d.id];
        let k;
        for (const a in c)
          if (Object.hasOwnProperty.call(c, a)) {
            if ("undefined" !== typeof k) {
              k = !1;
              break;
            }
            k = !0;
          }
        x(c, function (a, c) {
          const f = p.point[c];
          var h = e[a.axis + "Axis"];
          if (m) {
            var n = a.axis.toUpperCase();
            if (m) {
              h = u(g["dragPrecision" + n], 0);
              var r = m.pixelsToLonLat({ x: 0, y: 0 }),
                t = m.pixelsToLonLat({
                  x: l.plotBox.width,
                  y: l.plotBox.height,
                });
              r = u(g["dragMin" + n], r && r[c], -Infinity);
              n = u(g["dragMax" + n], t && t[c], Infinity);
              t = b[c];
              if ("Orthographic" === m.projection.options.name) h = t;
              else {
                if ("lat" === c) {
                  if (isNaN(r) || r > m.projection.maxLatitude)
                    r = m.projection.maxLatitude;
                  if (isNaN(n) || n < -1 * m.projection.maxLatitude)
                    n = -1 * m.projection.maxLatitude;
                  var q = n;
                  n = r;
                  r = q;
                }
                m.projection.hasCoordinates ||
                  ((q = m.pixelsToLonLat({
                    x: b.chartX - l.plotLeft,
                    y: l.plotHeight - b.chartY + l.plotTop,
                  })) &&
                    (t = q[c]));
                h && (t = Math.round(t / h) * h);
                h = N(t, r, n);
              }
            } else h = void 0;
          } else (h = h.toValue((h.horiz ? b.chartX : b.chartY) + p[c + "Offset"])), (t = a.axis.toUpperCase()), (r = e[t.toLowerCase() + "Axis"].categories ? 1 : 0), (r = u(g["dragPrecision" + t], r)), (n = u(g["dragMin" + t], -Infinity)), (t = u(g["dragMax" + t], Infinity)), r && (h = Math.round(h / r) * r), (h = N(h, n, t));
          !h ||
            (k && a.propValidate && !a.propValidate(h, d)) ||
            "undefined" === typeof f ||
            (D[c] = h);
        });
        return D;
      };
      G.prototype.getGuideBox = function (a) {
        const b = this.chart;
        let c = Infinity,
          d = -Infinity,
          e = Infinity,
          g = -Infinity,
          m;
        a.forEach(function (a) {
          const b = (a.graphic && a.graphic.getBBox()) || a.shapeArgs;
          if (b) {
            let l;
            var f = a.x2;
            O(f) && (l = a.series.xAxis.translate(f, !1, !1, !1, !0));
            f = !(b.width || b.height || b.x || b.y);
            m = !0;
            c = Math.min(a.plotX || 0, l || 0, f ? Infinity : b.x || 0, c);
            d = Math.max(a.plotX || 0, l || 0, (b.x || 0) + (b.width || 0), d);
            e = Math.min(a.plotY || 0, f ? Infinity : b.y || 0, e);
            g = Math.max((b.y || 0) + (b.height || 0), g);
          }
        });
        return m ? b.renderer.rect(c, e, d - c, g - e) : b.renderer.g();
      };
      z.prototype.showDragHandles = function () {
        const a = this,
          b = a.series,
          c = b.chart,
          { inverted: d, renderer: e } = c,
          g = q(b.options.dragDrop, a.options.dragDrop);
        x(b.dragDropProps, function (f, l) {
          var k = q(aa, f.handleOptions, g.dragHandle);
          const p = {
            class: k.className,
            "stroke-width": k.lineWidth,
            fill: k.color,
            stroke: k.lineColor,
          };
          var m = k.pathFormatter || f.handleFormatter,
            h = f.handlePositioner,
            n = f.validateIndividualDrag ? f.validateIndividualDrag(a) : !0;
          f.resize &&
            n &&
            f.resizeSide &&
            m &&
            (g["draggable" + f.axis.toUpperCase()] || g[f.optionName]) &&
            !1 !== g[f.optionName] &&
            (c.dragHandles ||
              (c.dragHandles = {
                group: e.g("drag-drop-handles").add(b.markerGroup || b.group),
              }),
            (c.dragHandles.point = a.id),
            (h = h(a)),
            (p.d = m = m(a)),
            (n = a.series.xAxis.categories ? -0.5 : 0),
            !m ||
              h.x < n ||
              0 > h.y ||
              ((p.cursor =
                k.cursor ||
                (("x" === f.axis) !== !!d ? "ew-resize" : "ns-resize")),
              (k = c.dragHandles[f.optionName]) ||
                (k = c.dragHandles[f.optionName] =
                  e.path().add(c.dragHandles.group)),
              (p.translateX = d ? b.yAxis.len - h.y : h.x),
              (p.translateY = d ? b.xAxis.len - h.x : h.y),
              d && (p.rotation = -90),
              k.attr(p),
              C(
                k.element,
                ["touchstart", "mousedown"],
                function (b) {
                  {
                    b = B(b, c);
                    const d = a.series.chart;
                    d.zoomOrPanKeyPressed(b) ||
                      ((d.mouseIsDown = !1),
                      I(b, a),
                      (d.dragDropData.updateProp = b.updateProp = l),
                      a.firePointEvent("dragStart", b),
                      b.stopPropagation(),
                      b.preventDefault());
                  }
                },
                { passive: !1 }
              ),
              y(c.dragHandles.group.element, "mouseover", function () {
                c.dragDropData = c.dragDropData || {};
                c.dragDropData.isHoveringHandle = a.id;
              }),
              C(
                c.dragHandles.group.element,
                ["touchend", "mouseout"],
                function () {
                  {
                    const b = a.series.chart;
                    b.dragDropData &&
                      a.id === b.dragDropData.isHoveringHandle &&
                      delete b.dragDropData.isHoveringHandle;
                    b.hoverPoint || K(a);
                  }
                }
              )));
        });
      };
      w.prototype.hideDragHandles = function () {
        this.dragHandles &&
          (x(this.dragHandles, function (a, b) {
            "group" !== b && a.destroy && a.destroy();
          }),
          this.dragHandles.group &&
            this.dragHandles.group.destroy &&
            this.dragHandles.group.destroy(),
          delete this.dragHandles);
      };
      y(z, "mouseOver", function () {
        const a = this;
        setTimeout(function () {
          {
            const b = a.series,
              c = b && b.chart,
              d = c && c.dragDropData,
              e = c && c.is3d && c.is3d();
            !c ||
              (d && d.isDragging && d.draggedPastSensitivity) ||
              c.isDragDropAnimating ||
              !b.options.dragDrop ||
              e ||
              (c.dragHandles && c.hideDragHandles(), a.showDragHandles());
          }
        }, 12);
      });
      y(z, "mouseOut", function () {
        const a = this;
        setTimeout(function () {
          a.series && K(a);
        }, 10);
      });
      y(z, "remove", function () {
        const a = this.series.chart,
          b = a.dragHandles;
        b && b.point === this.id && a.hideDragHandles();
      });
      w.prototype.zoomOrPanKeyPressed = function (a) {
        const b = this.options.chart || {},
          c = b.panKey && b.panKey + "Key";
        return a[b.zooming.key && b.zooming.key + "Key"] || a[c];
      };
      y(w, "render", function () {
        this.hasAddedDragDropEvents || Y(this);
      });
      ("");
    }
  );
  v(e, "masters/modules/draggable-points.src.js", [], function () {});
});
//# sourceMappingURL=draggable-points.js.map
