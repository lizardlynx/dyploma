/*
 Highcharts JS v11.0.0 (2023-04-26)

 Boost module

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license

*/
"use strict";
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/boost", ["highcharts"], function (t) {
        a(t);
        a.Highcharts = t;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function t(a, d, g, v) {
    a.hasOwnProperty(d) ||
      ((a[d] = v.apply(null, g)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: d, module: a[d] },
          })
        ));
  }
  a = a ? a._modules : {};
  t(a, "Extensions/Boost/Boostables.js", [], function () {
    return "area areaspline arearange column columnrange bar line scatter heatmap bubble treemap".split(
      " "
    );
  });
  t(
    a,
    "Extensions/Boost/BoostableMap.js",
    [a["Extensions/Boost/Boostables.js"]],
    function (a) {
      const d = {};
      a.forEach((a) => {
        d[a] = !0;
      });
      return d;
    }
  );
  t(
    a,
    "Extensions/Boost/BoostChart.js",
    [a["Extensions/Boost/BoostableMap.js"], a["Core/Utilities.js"]],
    function (a, d) {
      function g(e) {
        const b = e.series,
          d = (e.boost = e.boost || {});
        var k = e.options.boost || {},
          E = l(k.seriesThreshold, 50);
        if (b.length >= E) return !0;
        if (1 === b.length) return !1;
        k = k.allowForce;
        if ("undefined" === typeof k) {
          k = !0;
          for (var g of e.xAxis)
            if (
              l(g.min, -Infinity) > l(g.dataMin, -Infinity) ||
              l(g.max, Infinity) < l(g.dataMax, Infinity)
            ) {
              k = !1;
              break;
            }
        }
        if ("undefined" !== typeof d.forceChartBoost) {
          if (k) return d.forceChartBoost;
          d.forceChartBoost = void 0;
        }
        g = e = 0;
        for (const d of b)
          (E = d.options),
            0 !== E.boostThreshold &&
              !1 !== d.visible &&
              "heatmap" !== d.type &&
              (a[d.type] && ++e,
              B(d.processedXData, E.data, d.points) >=
                (E.boostThreshold || Number.MAX_VALUE) && ++g);
        d.forceChartBoost = k && ((e === b.length && 0 < g) || 5 < g);
        return d.forceChartBoost;
      }
      function v(e) {
        b(e, "predraw", function () {
          e.boost = e.boost || {};
          e.boost.forceChartBoost = void 0;
          e.boosted = !1;
          e.boost.clear && e.boost.clear();
          e.boost.canvas &&
            e.boost.wgl &&
            g(e) &&
            e.boost.wgl.allocateBuffer(e);
          e.boost.markerGroup &&
            e.xAxis &&
            0 < e.xAxis.length &&
            e.yAxis &&
            0 < e.yAxis.length &&
            e.boost.markerGroup.translate(e.xAxis[0].pos, e.yAxis[0].pos);
        });
        b(e, "render", function () {
          e.boost && e.boost.wgl && g(e) && e.boost.wgl.render(e);
        });
        let a = -1,
          d = -1;
        b(e.pointer, "afterGetHoverData", () => {
          var b = e.hoverSeries;
          e.boost = e.boost || {};
          if (e.boost.markerGroup && b) {
            const g = e.inverted ? b.yAxis : b.xAxis;
            b = e.inverted ? b.xAxis : b.yAxis;
            if ((g && g.pos !== a) || (b && b.pos !== d))
              e.boost.markerGroup.translate(g.pos, b.pos),
                (a = g.pos),
                (d = b.pos);
          }
        });
      }
      function B(...b) {
        let e = -Number.MAX_VALUE;
        b.forEach(function (b) {
          if (
            "undefined" !== typeof b &&
            null !== b &&
            "undefined" !== typeof b.length &&
            0 < b.length
          )
            return (e = b.length), !0;
        });
        return e;
      }
      const { addEvent: b, pick: l } = d,
        E = [];
      return {
        compose: function (b, a) {
          a && d.pushUnique(E, b) && b.prototype.callbacks.push(v);
          return b;
        },
        getBoostClipRect: function (b, a) {
          const e = {
            x: b.plotLeft,
            y: b.plotTop,
            width: b.plotWidth,
            height: b.plotHeight,
          };
          a === b &&
            ((a = b.inverted ? b.xAxis : b.yAxis),
            1 >= a.length
              ? ((e.y = Math.min(a[0].pos, e.y)),
                (e.height = a[0].pos - b.plotTop + a[0].len))
              : (e.height = b.plotHeight));
          return e;
        },
        isChartSeriesBoosting: g,
      };
    }
  );
  t(a, "Extensions/Boost/WGLDrawMode.js", [], function () {
    return {
      area: "LINES",
      arearange: "LINES",
      areaspline: "LINES",
      column: "LINES",
      columnrange: "LINES",
      bar: "LINES",
      line: "LINE_STRIP",
      scatter: "POINTS",
      heatmap: "TRIANGLES",
      treemap: "TRIANGLES",
      bubble: "POINTS",
    };
  });
  t(a, "Extensions/Boost/WGLShader.js", [a["Core/Utilities.js"]], function (a) {
    const { clamp: d, error: g, pick: v } = a;
    class B {
      constructor(b) {
        this.errors = [];
        this.uLocations = {};
        (this.gl = b) && this.createShader();
      }
      bind() {
        this.gl && this.shaderProgram && this.gl.useProgram(this.shaderProgram);
      }
      createShader() {
        const b = this.stringToProgram(
            "#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
            "vertex"
          ),
          a = this.stringToProgram(
            "precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}",
            "fragment"
          ),
          d = (b) => this.gl.getUniformLocation(this.shaderProgram, b);
        if (!b || !a) return (this.shaderProgram = !1), this.handleErrors(), !1;
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, b);
        this.gl.attachShader(this.shaderProgram, a);
        this.gl.linkProgram(this.shaderProgram);
        if (
          !this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)
        )
          return (
            this.errors.push(this.gl.getProgramInfoLog(this.shaderProgram)),
            this.handleErrors(),
            (this.shaderProgram = !1)
          );
        this.gl.useProgram(this.shaderProgram);
        this.gl.bindAttribLocation(this.shaderProgram, 0, "aVertexPosition");
        this.pUniform = d("uPMatrix");
        this.psUniform = d("pSize");
        this.fcUniform = d("fillColor");
        this.isBubbleUniform = d("isBubble");
        this.bubbleSizeAbsUniform = d("bubbleSizeAbs");
        this.bubbleSizeAreaUniform = d("bubbleSizeByArea");
        this.uSamplerUniform = d("uSampler");
        this.skipTranslationUniform = d("skipTranslation");
        this.isCircleUniform = d("isCircle");
        this.isInverted = d("isInverted");
        return !0;
      }
      handleErrors() {
        this.errors.length &&
          g("[highcharts boost] shader error - " + this.errors.join("\n"));
      }
      stringToProgram(b, a) {
        const d = this.gl.createShader(
          "vertex" === a ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER
        );
        this.gl.shaderSource(d, b);
        this.gl.compileShader(d);
        return this.gl.getShaderParameter(d, this.gl.COMPILE_STATUS)
          ? d
          : (this.errors.push(
              "when compiling " + a + " shader:\n" + this.gl.getShaderInfoLog(d)
            ),
            !1);
      }
      destroy() {
        this.gl &&
          this.shaderProgram &&
          (this.gl.deleteProgram(this.shaderProgram),
          (this.shaderProgram = !1));
      }
      fillColorUniform() {
        return this.fcUniform;
      }
      getProgram() {
        return this.shaderProgram;
      }
      pointSizeUniform() {
        return this.psUniform;
      }
      perspectiveUniform() {
        return this.pUniform;
      }
      reset() {
        this.gl &&
          this.shaderProgram &&
          (this.gl.uniform1i(this.isBubbleUniform, 0),
          this.gl.uniform1i(this.isCircleUniform, 0));
      }
      setBubbleUniforms(b, a, g, e = 1) {
        const B = b.options;
        let l = Number.MAX_VALUE,
          k = -Number.MAX_VALUE;
        if (this.gl && this.shaderProgram && b.is("bubble")) {
          const S = b.getPxExtremes();
          l = v(
            B.zMin,
            d(a, !1 === B.displayNegative ? B.zThreshold : -Number.MAX_VALUE, l)
          );
          k = v(B.zMax, Math.max(k, g));
          this.gl.uniform1i(this.isBubbleUniform, 1);
          this.gl.uniform1i(this.isCircleUniform, 1);
          this.gl.uniform1i(
            this.bubbleSizeAreaUniform,
            "width" !== b.options.sizeBy
          );
          this.gl.uniform1i(
            this.bubbleSizeAbsUniform,
            b.options.sizeByAbsoluteValue
          );
          this.setUniform("bubbleMinSize", S.minPxSize * e);
          this.setUniform("bubbleMaxSize", S.maxPxSize * e);
          this.setUniform("bubbleZMin", l);
          this.setUniform("bubbleZMax", k);
          this.setUniform("bubbleZThreshold", b.options.zThreshold);
        }
      }
      setColor(b) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform4f(
            this.fcUniform,
            b[0] / 255,
            b[1] / 255,
            b[2] / 255,
            b[3]
          );
      }
      setDrawAsCircle(b) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform1i(this.isCircleUniform, b ? 1 : 0);
      }
      setInverted(b) {
        this.gl && this.shaderProgram && this.gl.uniform1i(this.isInverted, b);
      }
      setPMatrix(b) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniformMatrix4fv(this.pUniform, !1, b);
      }
      setPointSize(b) {
        this.gl && this.shaderProgram && this.gl.uniform1f(this.psUniform, b);
      }
      setSkipTranslation(b) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform1i(this.skipTranslationUniform, !0 === b ? 1 : 0);
      }
      setTexture(b) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform1i(this.uSamplerUniform, b);
      }
      setUniform(b, a) {
        this.gl &&
          this.shaderProgram &&
          ((b = this.uLocations[b] =
            this.uLocations[b] ||
            this.gl.getUniformLocation(this.shaderProgram, b)),
          this.gl.uniform1f(b, a));
      }
    }
    return B;
  });
  t(a, "Extensions/Boost/WGLVertexBuffer.js", [], function () {
    class a {
      constructor(a, g, v) {
        this.buffer = !1;
        this.iterator = 0;
        this.vertAttribute = this.preAllocated = !1;
        this.components = v || 2;
        this.dataComponents = v;
        this.gl = a;
        this.shader = g;
      }
      allocate(a) {
        this.iterator = -1;
        this.preAllocated = new Float32Array(4 * a);
      }
      bind() {
        if (!this.buffer) return !1;
        this.gl.vertexAttribPointer(
          this.vertAttribute,
          this.components,
          this.gl.FLOAT,
          !1,
          0,
          0
        );
      }
      build(a, g, v) {
        let d;
        this.data = a || [];
        if (!((this.data && 0 !== this.data.length) || this.preAllocated))
          return this.destroy(), !1;
        this.components = v || this.components;
        this.buffer && this.gl.deleteBuffer(this.buffer);
        this.preAllocated || (d = new Float32Array(this.data));
        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          this.preAllocated || d,
          this.gl.STATIC_DRAW
        );
        this.vertAttribute = this.gl.getAttribLocation(
          this.shader.getProgram(),
          g
        );
        this.gl.enableVertexAttribArray(this.vertAttribute);
        return !0;
      }
      destroy() {
        this.buffer &&
          (this.gl.deleteBuffer(this.buffer),
          (this.vertAttribute = this.buffer = !1));
        this.iterator = 0;
        this.components = this.dataComponents || 2;
        this.data = [];
      }
      push(a, g, v, B) {
        this.preAllocated &&
          ((this.preAllocated[++this.iterator] = a),
          (this.preAllocated[++this.iterator] = g),
          (this.preAllocated[++this.iterator] = v),
          (this.preAllocated[++this.iterator] = B));
      }
      render(a, g, v) {
        const d = this.preAllocated
          ? this.preAllocated.length
          : this.data.length;
        if (!this.buffer || !d) return !1;
        if (!a || a > d || 0 > a) a = 0;
        if (!g || g > d) g = d;
        if (a >= g) return !1;
        this.gl.drawArrays(
          this.gl[v || "POINTS"],
          a / this.components,
          (g - a) / this.components
        );
        return !0;
      }
    }
    return a;
  });
  t(
    a,
    "Extensions/Boost/WGLRenderer.js",
    [
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
      a["Extensions/Boost/WGLDrawMode.js"],
      a["Extensions/Boost/WGLShader.js"],
      a["Extensions/Boost/WGLVertexBuffer.js"],
    ],
    function (a, d, g, v, B, b) {
      const { parse: l } = a,
        { doc: E, win: e } = d,
        { isNumber: t, isObject: S, merge: k, objectEach: D, pick: L } = g,
        z = {
          column: !0,
          columnrange: !0,
          bar: !0,
          area: !0,
          areaspline: !0,
          arearange: !0,
        },
        I = { scatter: !0, bubble: !0 },
        J = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
      class N {
        static orthoMatrix(c, a) {
          return [2 / c, 0, 0, 0, 0, -(2 / a), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1];
        }
        static seriesPointCount(c) {
          let a;
          if (c.boosted) {
            var b = !!c.options.stacking;
            a = c.xData || c.options.xData || c.processedXData;
            b = (b ? c.data : a || c.options.data).length;
            "treemap" === c.type
              ? (b *= 12)
              : "heatmap" === c.type
              ? (b *= 6)
              : z[c.type] && (b *= 2);
            return b;
          }
          return 0;
        }
        constructor(c) {
          this.data = [];
          this.height = 0;
          this.isInited = !1;
          this.markerData = [];
          this.series = [];
          this.textureHandles = {};
          this.width = 0;
          this.postRenderCallback = c;
          this.settings = {
            pointSize: 1,
            lineWidth: 1,
            fillColor: "#AA00AA",
            useAlpha: !0,
            usePreallocated: !1,
            useGPUTranslations: !1,
            debug: {
              timeRendering: !1,
              timeSeriesProcessing: !1,
              timeSetup: !1,
              timeBufferCopy: !1,
              timeKDTree: !1,
              showSkipSummary: !1,
            },
          };
        }
        getPixelRatio() {
          return this.settings.pixelRatio || e.devicePixelRatio || 1;
        }
        setOptions(c) {
          "pixelRatio" in c || (c.pixelRatio = 1);
          k(!0, this.settings, c);
        }
        allocateBuffer(c) {
          const a = this.vbuffer;
          let b = 0;
          this.settings.usePreallocated &&
            (c.series.forEach((c) => {
              c.boosted && (b += N.seriesPointCount(c));
            }),
            a && a.allocate(b));
        }
        allocateBufferForSingleSeries(c) {
          const a = this.vbuffer;
          let b = 0;
          this.settings.usePreallocated &&
            (c.boosted && (b = N.seriesPointCount(c)), a && a.allocate(b));
        }
        clear() {
          const c = this.gl;
          c && c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
        }
        pushSeriesData(c, a) {
          const b = this.data,
            u = this.settings,
            ka = this.vbuffer;
          var r = c.pointArrayMap && "low,high" === c.pointArrayMap.join(",");
          const f = c.chart,
            q = c.options,
            h = !!q.stacking,
            d = q.data;
          var e = c.xAxis.getExtremes();
          const X = e.min;
          e = e.max;
          var n = c.yAxis.getExtremes();
          const g = n.min,
            v = n.max;
          var k = c.xData || q.xData || c.processedXData;
          const B = c.yData || q.yData || c.processedYData,
            t = c.zData || q.zData || c.processedZData,
            C = c.yAxis,
            E = c.xAxis,
            L = !k || 0 === k.length;
          n = q.connectNulls;
          var w = c.points || !1;
          const G = h ? c.data : k || d;
          k = { x: Number.MAX_VALUE, y: 0 };
          const I = { x: -Number.MAX_VALUE, y: 0 },
            p = "undefined" === typeof f.index,
            m = z[c.type],
            T = q.zoneAxis || "y",
            Z = q.zones || !1,
            ua = q.threshold,
            ha = this.getPixelRatio();
          let va = c.chart.plotWidth,
            ba = !1,
            Q = !1;
          let U,
            J = 0;
          var V = !1;
          let A,
            x,
            D,
            F = -1,
            W = !1,
            ca = !1,
            da,
            N = !1,
            ia = !1,
            y = !1,
            ea = !1,
            na = !0,
            R = !0,
            fa,
            H = !1,
            oa = !1,
            pa = 0;
          if (!(q.boostData && 0 < q.boostData.length)) {
            q.gapSize &&
              (oa =
                "value" !== q.gapUnit
                  ? q.gapSize * c.closestPointRange
                  : q.gapSize);
            if (
              Z &&
              ((fa = []),
              Z.forEach((a, c) => {
                if (a.color) {
                  const p = l(a.color).rgba;
                  p[0] /= 255;
                  p[1] /= 255;
                  p[2] /= 255;
                  fa[c] = p;
                  H || "undefined" !== typeof a.value || (H = p);
                }
              }),
              !H)
            ) {
              var aa = (c.pointAttribs && c.pointAttribs().fill) || c.color;
              H = l(aa).rgba;
              H[0] /= 255;
              H[1] /= 255;
              H[2] /= 255;
            }
            f.inverted && (va = c.chart.plotHeight);
            c.closestPointRangePx = Number.MAX_VALUE;
            var M = (c) => {
                c &&
                  (a.colorData.push(c[0]),
                  a.colorData.push(c[1]),
                  a.colorData.push(c[2]),
                  a.colorData.push(c[3]));
              },
              P = (c, p, m, r = 1, T) => {
                M(T);
                1 === ha ||
                  (u.useGPUTranslations && !a.skipTranslation) ||
                  ((c *= ha), (p *= ha), (r *= ha));
                u.usePreallocated && ka
                  ? (ka.push(c, p, m ? 1 : 0, r), (pa += 4))
                  : (b.push(c), b.push(p), b.push(m ? ha : 0), b.push(r));
              },
              Ca = () => {
                a.segments.length &&
                  (a.segments[a.segments.length - 1].to = b.length || pa);
              };
            aa = () => {
              (a.segments.length &&
                a.segments[a.segments.length - 1].from === (b.length || pa)) ||
                (Ca(), a.segments.push({ from: b.length || pa }));
            };
            var Da = (a, c, p, b, m) => {
              M(m);
              P(a + p, c);
              M(m);
              P(a, c);
              M(m);
              P(a, c + b);
              M(m);
              P(a, c + b);
              M(m);
              P(a + p, c + b);
              M(m);
              P(a + p, c);
            };
            aa();
            if (w && 0 < w.length)
              (a.skipTranslation = !0),
                (a.drawMode = "TRIANGLES"),
                w[0].node &&
                  w[0].node.levelDynamic &&
                  w.sort((a, c) => {
                    if (a.node) {
                      if (a.node.levelDynamic > c.node.levelDynamic) return 1;
                      if (a.node.levelDynamic < c.node.levelDynamic) return -1;
                    }
                    return 0;
                  }),
                w.forEach((a) => {
                  var p = a.plotY;
                  if (
                    "undefined" !== typeof p &&
                    !isNaN(p) &&
                    null !== a.y &&
                    a.shapeArgs
                  ) {
                    let {
                      x: b = 0,
                      y: m = 0,
                      width: r = 0,
                      height: T = 0,
                    } = a.shapeArgs;
                    p = f.styledMode
                      ? a.series.colorAttribs(a)
                      : (p = a.series.pointAttribs(a));
                    a = p["stroke-width"] || 0;
                    y = l(p.fill).rgba;
                    y[0] /= 255;
                    y[1] /= 255;
                    y[2] /= 255;
                    c.is("treemap") &&
                      ((a = a || 1),
                      (U = l(p.stroke).rgba),
                      (U[0] /= 255),
                      (U[1] /= 255),
                      (U[2] /= 255),
                      Da(b, m, r, T, U),
                      (a /= 2));
                    c.is("heatmap") &&
                      f.inverted &&
                      ((b = E.len - b), (m = C.len - m), (r = -r), (T = -T));
                    Da(b + a, m + a, r - 2 * a, T - 2 * a, y);
                  }
                });
            else {
              for (; F < G.length - 1; ) {
                w = G[++F];
                if ("undefined" === typeof w) continue;
                if (p) break;
                const b = d && d[F];
                !L &&
                  S(b, !0) &&
                  b.color &&
                  ((y = l(b.color).rgba),
                  (y[0] /= 255),
                  (y[1] /= 255),
                  (y[2] /= 255));
                L
                  ? ((A = w[0]),
                    (x = w[1]),
                    G[F + 1] && (ca = G[F + 1][0]),
                    G[F - 1] && (W = G[F - 1][0]),
                    3 <= w.length &&
                      ((D = w[2]),
                      w[2] > a.zMax && (a.zMax = w[2]),
                      w[2] < a.zMin && (a.zMin = w[2])))
                  : ((A = w),
                    (x = B[F]),
                    G[F + 1] && (ca = G[F + 1]),
                    G[F - 1] && (W = G[F - 1]),
                    t &&
                      t.length &&
                      ((D = t[F]),
                      t[F] > a.zMax && (a.zMax = t[F]),
                      t[F] < a.zMin && (a.zMin = t[F])));
                if (n || (null !== A && null !== x)) {
                  if (
                    (ca && ca >= X && ca <= e && (N = !0),
                    W && W >= X && W <= e && (ia = !0),
                    r
                      ? (L && (x = w.slice(1, 3)), (da = x[0]), (x = x[1]))
                      : h && ((A = w.x), (x = w.stackY), (da = x - w.y)),
                    null !== g &&
                      "undefined" !== typeof g &&
                      null !== v &&
                      "undefined" !== typeof v &&
                      (na = x >= g && x <= v),
                    A > e && I.x < e && ((I.x = A), (I.y = x)),
                    A < X && k.x > X && ((k.x = A), (k.y = x)),
                    null !== x || !n)
                  )
                    if (null !== x && (na || N || ia)) {
                      if (
                        ((ca >= X || A >= X) && (W <= e || A <= e) && (ea = !0),
                        ea || N || ia)
                      ) {
                        oa && A - W > oa && aa();
                        if (Z) {
                          let a;
                          Z.some((c, p) => {
                            const b = Z[p - 1];
                            return "x" === T
                              ? "undefined" !== typeof c.value && A <= c.value
                                ? (fa[p] && (!b || A >= b.value) && (a = fa[p]),
                                  !0)
                                : !1
                              : "undefined" !== typeof c.value && x <= c.value
                              ? (fa[p] && (!b || x >= b.value) && (a = fa[p]),
                                !0)
                              : !1;
                          });
                          y = a || H || y;
                        }
                        if (
                          !u.useGPUTranslations &&
                          ((a.skipTranslation = !0),
                          (A = E.toPixels(A, !0)),
                          (x = C.toPixels(x, !0)),
                          A > va && "POINTS" === a.drawMode)
                        )
                          continue;
                        a.hasMarkers &&
                          ea &&
                          !1 !== ba &&
                          (c.closestPointRangePx = Math.min(
                            c.closestPointRangePx,
                            Math.abs(A - ba)
                          ));
                        if (
                          !u.useGPUTranslations &&
                          !u.usePreallocated &&
                          ba &&
                          1 > Math.abs(A - ba) &&
                          Q &&
                          1 > Math.abs(x - Q)
                        )
                          u.debug.showSkipSummary && ++J;
                        else {
                          if (m) {
                            V = da;
                            if (!1 === da || "undefined" === typeof da)
                              V = 0 > x ? x : 0;
                            r || h || (V = Math.max(null === ua ? g : ua, g));
                            u.useGPUTranslations || (V = C.toPixels(V, !0));
                            P(A, V, 0, 0, y);
                          }
                          q.step && !R && P(A, Q, 0, 2, y);
                          P(A, x, 0, "bubble" === c.type ? D || 1 : 2, y);
                          ba = A;
                          Q = x;
                          V = !0;
                          R = !1;
                        }
                      }
                    } else aa();
                } else aa();
              }
              u.debug.showSkipSummary && console.log("skipped points:", J);
              r = (c, p) => {
                u.useGPUTranslations ||
                  ((a.skipTranslation = !0),
                  (c.x = E.toPixels(c.x, !0)),
                  (c.y = C.toPixels(c.y, !0)));
                p
                  ? (this.data = [c.x, c.y, 0, 2].concat(this.data))
                  : P(c.x, c.y, 0, 2);
              };
              V ||
                !1 === n ||
                "line_strip" !== c.drawMode ||
                (k.x < Number.MAX_VALUE && r(k, !0),
                I.x > -Number.MAX_VALUE && r(I));
            }
            Ca();
          }
        }
        pushSeries(a) {
          var c = this.markerData;
          const b = this.series,
            u = this.settings;
          0 < b.length &&
            b[b.length - 1].hasMarkers &&
            (b[b.length - 1].markerTo = c.length);
          u.debug.timeSeriesProcessing &&
            console.time("building " + a.type + " series");
          c = {
            segments: [],
            markerFrom: c.length,
            colorData: [],
            series: a,
            zMin: Number.MAX_VALUE,
            zMax: -Number.MAX_VALUE,
            hasMarkers: a.options.marker ? !1 !== a.options.marker.enabled : !1,
            showMarkers: !0,
            drawMode: v[a.type] || "LINE_STRIP",
          };
          a.index >= b.length ? b.push(c) : (b[a.index] = c);
          this.pushSeriesData(a, c);
          u.debug.timeSeriesProcessing &&
            console.timeEnd("building " + a.type + " series");
        }
        flush() {
          const a = this.vbuffer;
          this.data = [];
          this.markerData = [];
          this.series = [];
          a && a.destroy();
        }
        setXAxis(a) {
          const c = this.shader;
          if (c) {
            var b = this.getPixelRatio();
            c.setUniform("xAxisTrans", a.transA * b);
            c.setUniform("xAxisMin", a.min);
            c.setUniform("xAxisMinPad", a.minPixelPadding * b);
            c.setUniform("xAxisPointRange", a.pointRange);
            c.setUniform("xAxisLen", a.len * b);
            c.setUniform("xAxisPos", a.pos * b);
            c.setUniform("xAxisCVSCoord", !a.horiz);
            c.setUniform("xAxisIsLog", !!a.logarithmic);
            c.setUniform("xAxisReversed", !!a.reversed);
          }
        }
        setYAxis(a) {
          const c = this.shader;
          if (c) {
            var b = this.getPixelRatio();
            c.setUniform("yAxisTrans", a.transA * b);
            c.setUniform("yAxisMin", a.min);
            c.setUniform("yAxisMinPad", a.minPixelPadding * b);
            c.setUniform("yAxisPointRange", a.pointRange);
            c.setUniform("yAxisLen", a.len * b);
            c.setUniform("yAxisPos", a.pos * b);
            c.setUniform("yAxisCVSCoord", !a.horiz);
            c.setUniform("yAxisIsLog", !!a.logarithmic);
            c.setUniform("yAxisReversed", !!a.reversed);
          }
        }
        setThreshold(a, b) {
          const c = this.shader;
          c &&
            (c.setUniform("hasThreshold", a),
            c.setUniform("translatedThreshold", b));
        }
        renderChart(c) {
          const e = this.gl,
            g = this.settings,
            u = this.shader,
            K = this.vbuffer,
            r = this.getPixelRatio();
          if (c)
            (this.width = c.chartWidth * r), (this.height = c.chartHeight * r);
          else return !1;
          const f = this.height,
            q = this.width;
          if (!(e && u && q && f)) return !1;
          g.debug.timeRendering && console.time("gl rendering");
          e.canvas.width = q;
          e.canvas.height = f;
          u.bind();
          e.viewport(0, 0, q, f);
          u.setPMatrix(N.orthoMatrix(q, f));
          1 < g.lineWidth && !d.isMS && e.lineWidth(g.lineWidth);
          K && (K.build(this.data, "aVertexPosition", 4), K.bind());
          u.setInverted(c.inverted);
          this.series.forEach((h, q) => {
            const d = h.series.options;
            var f = d.marker,
              n = "undefined" !== typeof d.lineWidth ? d.lineWidth : 1,
              k = d.threshold;
            const v = t(k),
              la = h.series.yAxis.getThreshold(k);
            k = L(
              d.marker ? d.marker.enabled : null,
              h.series.xAxis.isRadial ? !0 : null,
              h.series.closestPointRangePx >
                2 * ((d.marker ? d.marker.radius : 10) || 10)
            );
            f =
              this.textureHandles[(f && f.symbol) || h.series.symbol] ||
              this.textureHandles.circle;
            if (
              0 !== h.segments.length &&
              h.segments[0].from !== h.segments[0].to &&
              (f.isReady &&
                (e.bindTexture(e.TEXTURE_2D, f.handle), u.setTexture(f.handle)),
              c.styledMode
                ? (f =
                    h.series.markerGroup &&
                    h.series.markerGroup.getStyle("fill"))
                : ((f =
                    ("POINTS" === h.drawMode &&
                      h.series.pointAttribs &&
                      h.series.pointAttribs().fill) ||
                    h.series.color),
                  d.colorByPoint && (f = h.series.chart.options.colors[q])),
              h.series.fillOpacity &&
                d.fillOpacity &&
                (f = new a(f).setOpacity(L(d.fillOpacity, 1)).get()),
              (f = l(f).rgba),
              g.useAlpha || (f[3] = 1),
              "LINES" === h.drawMode && g.useAlpha && 1 > f[3] && (f[3] /= 10),
              "add" === d.boostBlending
                ? (e.blendFunc(e.SRC_ALPHA, e.ONE), e.blendEquation(e.FUNC_ADD))
                : "mult" === d.boostBlending || "multiply" === d.boostBlending
                ? e.blendFunc(e.DST_COLOR, e.ZERO)
                : "darken" === d.boostBlending
                ? (e.blendFunc(e.ONE, e.ONE), e.blendEquation(e.FUNC_MIN))
                : e.blendFuncSeparate(
                    e.SRC_ALPHA,
                    e.ONE_MINUS_SRC_ALPHA,
                    e.ONE,
                    e.ONE_MINUS_SRC_ALPHA
                  ),
              u.reset(),
              0 < h.colorData.length
                ? (u.setUniform("hasColor", 1),
                  (q = new b(e, u)),
                  q.build(h.colorData, "aColor", 4),
                  q.bind())
                : e.disableVertexAttribArray(
                    e.getAttribLocation(u.getProgram(), "aColor")
                  ),
              u.setColor(f),
              this.setXAxis(h.series.xAxis),
              this.setYAxis(h.series.yAxis),
              this.setThreshold(v, la),
              "POINTS" === h.drawMode &&
                u.setPointSize(2 * L(d.marker && d.marker.radius, 0.5) * r),
              u.setSkipTranslation(h.skipTranslation),
              "bubble" === h.series.type &&
                u.setBubbleUniforms(h.series, h.zMin, h.zMax, r),
              u.setDrawAsCircle(I[h.series.type] || !1),
              K)
            ) {
              if (0 < n || "LINE_STRIP" !== h.drawMode)
                for (n = 0; n < h.segments.length; n++)
                  K.render(h.segments[n].from, h.segments[n].to, h.drawMode);
              if (h.hasMarkers && k)
                for (
                  u.setPointSize(2 * L(d.marker && d.marker.radius, 5) * r),
                    u.setDrawAsCircle(!0),
                    n = 0;
                  n < h.segments.length;
                  n++
                )
                  K.render(h.segments[n].from, h.segments[n].to, "POINTS");
            }
          });
          g.debug.timeRendering && console.timeEnd("gl rendering");
          this.postRenderCallback && this.postRenderCallback(this);
          this.flush();
        }
        render(a) {
          this.clear();
          if (a.renderer.forExport) return this.renderChart(a);
          this.isInited
            ? this.renderChart(a)
            : setTimeout(() => {
                this.render(a);
              }, 1);
        }
        setSize(a, b) {
          const c = this.shader;
          !c ||
            (this.width === a && this.height === b) ||
            ((this.width = a),
            (this.height = b),
            c.bind(),
            c.setPMatrix(N.orthoMatrix(a, b)));
        }
        init(a, e) {
          const c = this.settings;
          this.isInited = !1;
          if (!a) return !1;
          c.debug.timeSetup && console.time("gl setup");
          for (
            let b = 0;
            b < J.length && !(this.gl = a.getContext(J[b], {}));
            ++b
          );
          const d = this.gl;
          if (d) e || this.flush();
          else return !1;
          d.enable(d.BLEND);
          d.blendFunc(d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA);
          d.disable(d.DEPTH_TEST);
          d.depthFunc(d.LESS);
          a = this.shader = new B(d);
          if (!a) return !1;
          this.vbuffer = new b(d, a);
          a = (a, b) => {
            const c = {
                isReady: !1,
                texture: E.createElement("canvas"),
                handle: d.createTexture(),
              },
              e = c.texture.getContext("2d");
            this.textureHandles[a] = c;
            c.texture.width = 512;
            c.texture.height = 512;
            e.mozImageSmoothingEnabled = !1;
            e.webkitImageSmoothingEnabled = !1;
            e.msImageSmoothingEnabled = !1;
            e.imageSmoothingEnabled = !1;
            e.strokeStyle = "rgba(255, 255, 255, 0)";
            e.fillStyle = "#FFF";
            b(e);
            try {
              d.activeTexture(d.TEXTURE0),
                d.bindTexture(d.TEXTURE_2D, c.handle),
                d.texImage2D(
                  d.TEXTURE_2D,
                  0,
                  d.RGBA,
                  d.RGBA,
                  d.UNSIGNED_BYTE,
                  c.texture
                ),
                d.texParameteri(
                  d.TEXTURE_2D,
                  d.TEXTURE_WRAP_S,
                  d.CLAMP_TO_EDGE
                ),
                d.texParameteri(
                  d.TEXTURE_2D,
                  d.TEXTURE_WRAP_T,
                  d.CLAMP_TO_EDGE
                ),
                d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR),
                d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR),
                d.bindTexture(d.TEXTURE_2D, null),
                (c.isReady = !0);
            } catch (h) {}
          };
          a("circle", (a) => {
            a.beginPath();
            a.arc(256, 256, 256, 0, 2 * Math.PI);
            a.stroke();
            a.fill();
          });
          a("square", (a) => {
            a.fillRect(0, 0, 512, 512);
          });
          a("diamond", (a) => {
            a.beginPath();
            a.moveTo(256, 0);
            a.lineTo(512, 256);
            a.lineTo(256, 512);
            a.lineTo(0, 256);
            a.lineTo(256, 0);
            a.fill();
          });
          a("triangle", (a) => {
            a.beginPath();
            a.moveTo(0, 512);
            a.lineTo(256, 0);
            a.lineTo(512, 512);
            a.lineTo(0, 512);
            a.fill();
          });
          a("triangle-down", (a) => {
            a.beginPath();
            a.moveTo(0, 0);
            a.lineTo(256, 512);
            a.lineTo(512, 0);
            a.lineTo(0, 0);
            a.fill();
          });
          this.isInited = !0;
          c.debug.timeSetup && console.timeEnd("gl setup");
          return !0;
        }
        destroy() {
          const a = this.gl,
            b = this.shader,
            d = this.vbuffer;
          this.flush();
          d && d.destroy();
          b && b.destroy();
          a &&
            (D(this.textureHandles, (b) => {
              b.handle && a.deleteTexture(b.handle);
            }),
            (a.canvas.width = 1),
            (a.canvas.height = 1));
        }
      }
      return N;
    }
  );
  t(
    a,
    "Extensions/Boost/BoostSeries.js",
    [
      a["Extensions/Boost/BoostableMap.js"],
      a["Extensions/Boost/Boostables.js"],
      a["Extensions/Boost/BoostChart.js"],
      a["Core/Defaults.js"],
      a["Core/Globals.js"],
      a["Core/Utilities.js"],
      a["Extensions/Boost/WGLRenderer.js"],
    ],
    function (a, d, g, v, t, b, l) {
      function B(a, b) {
        const c = b.boost;
        a &&
          c &&
          c.target &&
          c.canvas &&
          !h(b.chart) &&
          a.allocateBufferForSingleSeries(b);
      }
      function e(a) {
        return za(
          a && a.options && a.options.boost && a.options.boost.enabled,
          !0
        );
      }
      function S(a, b) {
        const c = a.constructor,
          d = a.seriesGroup || b.group;
        let p = a.chartWidth,
          e = a.chartHeight,
          m = a,
          r = "undefined" !== typeof SVGForeignObjectElement;
        m = h(a) ? a : b;
        const f = (m.boost = m.boost || {});
        r = !1;
        ta || (ta = qa.createElement("canvas"));
        f.target ||
          ((f.canvas = ta),
          a.renderer.forExport || !r
            ? ((m.renderTarget = f.target =
                a.renderer
                  .image("", 0, 0, p, e)
                  .addClass("highcharts-boost-canvas")
                  .add(d)),
              (f.clear = function () {
                f.target.attr({
                  href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                });
              }),
              (f.copy = function () {
                f.resize();
                f.target.attr({ href: f.canvas.toDataURL("image/png") });
              }))
            : ((f.targetFo = a.renderer.createElement("foreignObject").add(d)),
              (m.renderTarget = f.target = qa.createElement("canvas")),
              (f.targetCtx = f.target.getContext("2d")),
              f.targetFo.element.appendChild(f.target),
              (f.clear = function () {
                f.target.width = f.canvas.width;
                f.target.height = f.canvas.height;
              }),
              (f.copy = function () {
                f.target.width = f.canvas.width;
                f.target.height = f.canvas.height;
                f.targetCtx.drawImage(f.canvas, 0, 0);
              })),
          (f.resize = function () {
            p = a.chartWidth;
            e = a.chartHeight;
            (f.targetFo || f.target)
              .attr({ x: 0, y: 0, width: p, height: e })
              .css({
                pointerEvents: "none",
                mixedBlendMode: "normal",
                opacity: 1,
              });
            m instanceof c &&
              m.boost.markerGroup.translate(a.plotLeft, a.plotTop);
          }),
          (f.clipRect = a.renderer.clipRect()),
          (f.targetFo || f.target).clip(f.clipRect),
          m instanceof c &&
            (m.boost.markerGroup = m.renderer
              .g()
              .add(d)
              .translate(b.xAxis.pos, b.yAxis.pos)));
        f.canvas.width = p;
        f.canvas.height = e;
        f.clipRect && f.clipRect.attr(q(a, m));
        f.resize();
        f.clear();
        f.wgl ||
          ((f.wgl = new l((a) => {
            a.settings.debug.timeBufferCopy && console.time("buffer copy");
            f.copy();
            a.settings.debug.timeBufferCopy && console.timeEnd("buffer copy");
          })),
          f.wgl.init(f.canvas) ||
            ya("[highcharts boost] - unable to init WebGL renderer"),
          f.wgl.setOptions(a.options.boost || {}),
          m instanceof c && f.wgl.allocateBuffer(a));
        f.wgl.setSize(p, e);
        return f.wgl;
      }
      function ja(a) {
        const b = a.points;
        if (b) {
          let a, c;
          for (c = 0; c < b.length; c += 1)
            (a = b[c]) && a.destroyElements && a.destroyElements();
        }
        ["graph", "area", "tracker"].forEach((b) => {
          const c = a[b];
          c && (a[b] = c.destroy());
        });
        a.getZonesGraphs &&
          a.getZonesGraphs([["graph", "highcharts-graph"]]).forEach((b) => {
            const c = a[b[0]];
            c && (a[b[0]] = c.destroy());
          });
      }
      function k(a, b, c, d, f, e) {
        f = f || 0;
        d = d || 3e3;
        const p = f + d;
        let m = !0;
        for (; m && f < p && f < a.length; ) (m = b(a[f], f)), ++f;
        m &&
          (f < a.length
            ? e
              ? k(a, b, c, d, f, e)
              : n.requestAnimationFrame
              ? n.requestAnimationFrame(function () {
                  k(a, b, c, d, f);
                })
              : setTimeout(k, 0, a, b, c, d, f)
            : c && c());
      }
      function D(a) {
        a.boost = a.boost || { getPoint: (b) => c(a, b) };
        const b = (a.boost.altered = []);
        ["allowDG", "directTouch", "stickyTracking"].forEach((c) => {
          b.push({ prop: c, val: a[c], own: Object.hasOwnProperty.call(a, c) });
        });
        a.allowDG = !1;
        a.directTouch = !1;
        a.stickyTracking = !0;
        a.finishedAnimating = !0;
        a.labelBySeries && (a.labelBySeries = a.labelBySeries.destroy());
      }
      function L(a) {
        const b = a.boost;
        b &&
          ((b.altered || []).forEach((b) => {
            b.own ? (a[b.prop] = b.val) : delete a[b.prop];
          }),
          b.clear && b.clear());
      }
      function z(a, b) {
        const c = a.options,
          d = a.xAxis && a.xAxis.options,
          f = a.yAxis && a.yAxis.options;
        a = a.colorAxis && a.colorAxis.options;
        return (
          c.data.length > (c.boostThreshold || Number.MAX_VALUE) &&
          C(f.min) &&
          C(f.max) &&
          (!b || (C(d.min) && C(d.max))) &&
          (!a || (C(a.min) && C(a.max)))
        );
      }
      function I() {
        const a = this,
          b = a.chart;
        b.boost &&
          b.boost.markerGroup === a.markerGroup &&
          (a.markerGroup = null);
        b.hoverPoints &&
          (b.hoverPoints = b.hoverPoints.filter(function (b) {
            return b.series === a;
          }));
        b.hoverPoint && b.hoverPoint.series === a && (b.hoverPoint = null);
      }
      function J() {
        const a = this.boost;
        a &&
          a.canvas &&
          a.target &&
          (a.wgl && a.wgl.clear(), a.clear && a.clear());
      }
      function N(a) {
        const b = a.boost;
        b &&
          b.canvas &&
          b.target &&
          b.wgl &&
          !h(a.chart) &&
          b.wgl.render(a.chart);
      }
      function c(a, b) {
        var c = a.options;
        const d = a.xAxis;
        var f = a.pointClass;
        if (b instanceof f) return b;
        c = a.xData || c.xData || a.processedXData || !1;
        f = new f().init(a, a.options.data[b.i], c ? c[b.i] : void 0);
        f.category = za(d.categories ? d.categories[f.x] : f.x, f.x);
        f.dist = b.dist;
        f.distX = b.distX;
        f.plotX = b.plotX;
        f.plotY = b.plotY;
        f.index = b.i;
        f.percentage = b.percentage;
        f.isInside = a.isPointInside(f);
        return f;
      }
      function ka() {
        function a(a, b) {
          const e = "undefined" === typeof c.index;
          let h;
          let q,
            g = !1,
            p = !0;
          if ("undefined" === typeof a) return !0;
          if (!e) {
            if (L) {
              h = a[0];
              var m = a[1];
            } else (h = a), (m = r[b]);
            l
              ? (L && (m = a.slice(1, 3)), (g = m[0]), (m = m[1]))
              : qa &&
                ((h = a.x), (m = a.stackY), (g = m - a.y), (q = a.percentage));
            I || (p = (m || 0) >= w && m <= v);
            if (h >= n && h <= u && p)
              if (((a = f.toPixels(h, !0)), la)) {
                if ("undefined" === typeof D || a === C) {
                  l || (g = m);
                  if ("undefined" === typeof K || m > H) (H = m), (K = b);
                  if ("undefined" === typeof D || g < J) (J = g), (D = b);
                }
                (y && a === C) ||
                  ("undefined" !== typeof D &&
                    ((m = d.toPixels(H, !0)),
                    (ma = d.toPixels(J, !0)),
                    M(a, m, K, q),
                    ma !== m && M(a, ma, D, q)),
                  (D = K = void 0),
                  (C = a));
              } else (m = Math.ceil(d.toPixels(m, !0))), M(a, m, b, q);
          }
          return !e;
        }
        var b = this.options || {};
        const c = this.chart,
          f = this.xAxis,
          d = this.yAxis,
          e = b.xData || this.processedXData,
          r = b.yData || this.processedYData,
          q = b.data;
        var g = f.getExtremes();
        const n = g.min,
          u = g.max;
        g = d.getExtremes();
        const w = g.min,
          v = g.max,
          x = {},
          la = !!this.sampling,
          t = !1 !== b.enableMouseTracking;
        g = b.threshold;
        const l =
            this.pointArrayMap && "low,high" === this.pointArrayMap.join(","),
          qa = !!b.stacking,
          z = this.cropStart || 0,
          I = this.requireSorting,
          L = !e,
          y = "x" === b.findNearestPointBy,
          E = this.xData || this.options.xData || this.processedXData || !1;
        b = !1;
        let C,
          ma = d.getThreshold(g),
          J,
          H,
          D,
          K;
        b = S(c, this);
        c.boosted = !0;
        if (this.visible) {
          (this.points || this.graph) && ja(this);
          h(c)
            ? (this.markerGroup &&
                this.markerGroup !== c.boost.markerGroup &&
                this.markerGroup.destroy(),
              (this.markerGroup = c.boost.markerGroup),
              this.boost &&
                this.boost.target &&
                (this.renderTarget = this.boost.target =
                  this.boost.target.destroy()))
            : (c.boost &&
                this.markerGroup === c.boost.markerGroup &&
                (this.markerGroup = void 0),
              (this.markerGroup = this.plotGroup(
                "markerGroup",
                "markers",
                !0,
                1,
                c.seriesGroup
              )));
          var ra = (this.points = []),
            M = (a, b, e, r) => {
              a = Math.ceil(a);
              G = y ? a : a + "," + b;
              t &&
                !x[G] &&
                ((x[G] = !0),
                c.inverted && ((a = f.len - a), (b = d.len - b)),
                ra.push({
                  destroy: X,
                  x: E ? E[z + e] : !1,
                  clientX: a,
                  plotX: a,
                  plotY: b,
                  i: z + e,
                  percentage: r,
                }));
            };
          this.buildKDTree = X;
          b && (B(b, this), b.pushSeries(this), N(this));
          var P = b.settings;
          b = () => {
            O(this, "renderedCanvas");
            delete this.buildKDTree;
            this.buildKDTree();
            P.debug.timeKDTree && console.timeEnd("kd tree building");
          };
          c.renderer.forExport ||
            (P.debug.timeKDTree && console.time("kd tree building"),
            k(qa ? this.data : e || q, a, b));
        }
      }
      function wa(a) {
        let b = !0;
        this.chart.options &&
          this.chart.options.boost &&
          (b =
            "undefined" === typeof this.chart.options.boost.enabled
              ? !0
              : this.chart.options.boost.enabled);
        if (!b || !this.boosted) return a.call(this);
        this.chart.boosted = !0;
        if ((a = S(this.chart, this))) B(a, this), a.pushSeries(this);
        N(this);
      }
      function u(b, c, f) {
        function d(b) {
          const c =
            this.options.stacking &&
            ("translate" === f || "generatePoints" === f);
          this.boosted &&
          !c &&
          e(this.chart) &&
          "heatmap" !== this.type &&
          "treemap" !== this.type &&
          a[this.type] &&
          0 !== this.options.boostThreshold
            ? "render" === f && this.renderCanvas && this.renderCanvas()
            : b.call(this);
        }
        Y(b, f, d);
        "translate" === f &&
          ["column", "arearange", "columnrange", "heatmap", "treemap"].forEach(
            function (a) {
              c[a] && Y(c[a].prototype, f, d);
            }
          );
      }
      function K(a) {
        return this.boosted && z(this)
          ? {}
          : a.apply(this, [].slice.call(arguments, 1));
      }
      function r(b) {
        var c = this.options.data;
        const f = (a) =>
          this.forceCrop
            ? !1
            : h(this.chart) ||
              (a ? a.length : 0) >=
                (this.options.boostThreshold || Number.MAX_VALUE);
        e(this.chart) && a[this.type]
          ? ((f(c) &&
              "heatmap" !== this.type &&
              "treemap" !== this.type &&
              !this.options.stacking &&
              z(this, !0)) ||
              (b.apply(this, [].slice.call(arguments, 1)),
              (c = this.processedXData)),
            (this.boosted = f(c))
              ? (this.options.data &&
                  this.options.data.length &&
                  ((c = this.getFirstValidPoint(this.options.data)),
                  C(c) || sa(c) || ya(12, !1, this.chart)),
                D(this))
              : L(this))
          : b.apply(this, [].slice.call(arguments, 1));
      }
      function f(a) {
        const b = a.apply(this, [].slice.call(arguments, 1));
        return this.boost && b ? this.boost.getPoint(b) : b;
      }
      const { getBoostClipRect: q, isChartSeriesBoosting: h } = g,
        { getOptions: la } = v,
        { doc: qa, noop: X, win: n } = t,
        {
          addEvent: ma,
          error: ya,
          extend: ra,
          fireEvent: O,
          isArray: sa,
          isNumber: C,
          pick: za,
          wrap: Y,
        } = b,
        w = [];
      let G, ta;
      return {
        compose: function (a, c, e) {
          if (b.pushUnique(w, a)) {
            ma(a, "destroy", I);
            ma(a, "hide", J);
            const b = a.prototype;
            e && (b.renderCanvas = ka);
            Y(b, "getExtremes", K);
            Y(b, "processData", r);
            Y(b, "searchPoint", f);
            [
              "translate",
              "generatePoints",
              "drawTracker",
              "drawPoints",
              "render",
            ].forEach((a) => u(b, c, a));
          }
          if (b.pushUnique(w, la)) {
            const a = la().plotOptions;
            d.forEach((b) => {
              const f = a[b];
              f &&
                ((f.boostThreshold = 5e3),
                (f.boostData = []),
                (c[b].prototype.fillOpacity = !0));
            });
          }
          if (e) {
            const {
              area: a,
              areaspline: f,
              bubble: d,
              column: r,
              heatmap: h,
              scatter: q,
              treemap: g,
            } = c;
            a &&
              b.pushUnique(w, a) &&
              ra(a.prototype, { fill: !0, fillOpacity: !0, sampling: !0 });
            f &&
              b.pushUnique(w, f) &&
              ra(f.prototype, { fill: !0, fillOpacity: !0, sampling: !0 });
            d &&
              b.pushUnique(w, d) &&
              ((e = d.prototype),
              delete e.buildKDTree,
              Y(e, "markerAttribs", function (a) {
                return this.boosted
                  ? !1
                  : a.apply(this, [].slice.call(arguments, 1));
              }));
            r &&
              b.pushUnique(w, r) &&
              ra(r.prototype, { fill: !0, sampling: !0 });
            q && b.pushUnique(w, q) && (q.prototype.fill = !0);
            [h, g].forEach((a) => {
              a && b.pushUnique(w, a) && Y(a.prototype, "drawPoints", wa);
            });
          }
          return a;
        },
        destroyGraphics: ja,
        getPoint: c,
      };
    }
  );
  t(
    a,
    "Extensions/BoostCanvas.js",
    [
      a["Extensions/Boost/BoostChart.js"],
      a["Extensions/Boost/BoostSeries.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Color/Color.js"],
      a["Core/Globals.js"],
      a["Core/Series/Series.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, d, g, v, t, b, l, E) {
      const { getBoostClipRect: e, isChartSeriesBoosting: B } = a,
        { destroyGraphics: S } = d,
        { parse: k } = v,
        { doc: D, noop: L } = t,
        { seriesTypes: z } = l,
        {
          addEvent: I,
          extend: J,
          fireEvent: N,
          isNumber: c,
          merge: ka,
          pick: wa,
          wrap: u,
        } = E;
      let K;
      return function () {
        t.seriesTypes.heatmap &&
          u(t.seriesTypes.heatmap.prototype, "drawPoints", function () {
            const a = this.chart,
              b = this.getContext(),
              c = this.chart.inverted,
              d = this.xAxis,
              e = this.yAxis;
            b
              ? (this.points.forEach(function (f) {
                  let r = f.plotY;
                  if (
                    "undefined" !== typeof r &&
                    !isNaN(r) &&
                    null !== f.y &&
                    b
                  ) {
                    const {
                      x: r = 0,
                      y: h = 0,
                      width: q = 0,
                      height: g = 0,
                    } = f.shapeArgs || {};
                    f = a.styledMode
                      ? f.series.colorAttribs(f)
                      : f.series.pointAttribs(f);
                    b.fillStyle = f.fill;
                    c
                      ? b.fillRect(
                          e.len - h + d.left,
                          d.len - r + e.top,
                          -g,
                          -q
                        )
                      : b.fillRect(r + d.left, h + e.top, q, g);
                  }
                }),
                this.canvasToSVG())
              : this.chart.showLoading(
                  "Your browser doesn't support HTML5 canvas, <br>please use a modern browser"
                );
          });
        J(b.prototype, {
          getContext: function () {
            const a = this.chart,
              b = B(a) ? a : this,
              c = b === a ? a.seriesGroup : a.seriesGroup || this.group;
            let d = a.chartWidth,
              g = a.chartHeight,
              k,
              t = function (a, b, c, f, d, e, r) {
                a.call(this, c, b, f, d, e, r);
              };
            const n = (b.boost = b.boost || {});
            k = n.targetCtx;
            n.canvas ||
              ((n.canvas = D.createElement("canvas")),
              (n.target = a.renderer
                .image("", 0, 0, d, g)
                .addClass("highcharts-boost-canvas")
                .add(c)),
              (k = n.targetCtx = n.canvas.getContext("2d")),
              a.inverted &&
                ["moveTo", "lineTo", "rect", "arc"].forEach((a) => {
                  u(k, a, t);
                }),
              (n.copy = function () {
                n.target.attr({ href: n.canvas.toDataURL("image/png") });
              }),
              (n.clear = function () {
                k.clearRect(0, 0, n.canvas.width, n.canvas.height);
                b === n.target &&
                  n.target.attr({
                    href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                  });
              }),
              (n.clipRect = a.renderer.clipRect()),
              n.target.clip(n.clipRect));
            n.canvas.width !== d && (n.canvas.width = d);
            n.canvas.height !== g && (n.canvas.height = g);
            n.target.attr({
              x: 0,
              y: 0,
              width: d,
              height: g,
              style: "pointer-events: none",
              href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
            });
            n.clipRect && n.clipRect.attr(e(a, b));
            return k;
          },
          canvasToSVG: function () {
            B(this.chart)
              ? this.boost && this.boost.clear && this.boost.clear()
              : this.boost && this.boost.copy
              ? this.boost.copy()
              : this.chart.boost &&
                this.chart.boost.copy &&
                this.chart.boost.copy();
          },
          cvsLineTo: function (a, b, c) {
            a.lineTo(b, c);
          },
          renderCanvas: function () {
            let a = this,
              b = a.options,
              d = a.chart,
              e = this.xAxis,
              g = this.yAxis;
            var u = (d.options.boost || {}).timeRendering || !1;
            let l,
              n = 0;
            var z = a.processedXData;
            let B = a.processedYData,
              D = b.data;
            var O = e.getExtremes();
            let sa = O.min,
              C = O.max;
            O = g.getExtremes();
            let ja = O.min,
              Y = O.max,
              w = {},
              G,
              ta = !!a.sampling,
              p,
              m = b.marker && b.marker.radius,
              T = this.cvsDrawPoint,
              Z = b.lineWidth ? this.cvsLineTo : void 0,
              ua = m && 1 >= m ? this.cvsMarkerSquare : this.cvsMarkerCircle,
              ha = this.cvsStrokeBatch || 1e3,
              va = !1 !== b.enableMouseTracking,
              ba;
            O = b.threshold;
            let Q = g.getThreshold(O),
              U = c(O),
              Aa = Q,
              V = this.fill,
              A = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","),
              x = !!b.stacking,
              Ba = a.cropStart || 0;
            O = d.options.loading;
            let F = a.requireSorting,
              W,
              ca = b.connectNulls,
              da = !z,
              xa,
              ia,
              y,
              ea,
              na,
              R = x ? a.data : z || D,
              fa = a.fillOpacity
                ? v.parse(a.color).setOpacity(wa(b.fillOpacity, 0.75)).get()
                : a.color,
              H = function () {
                V
                  ? ((l.fillStyle = fa), l.fill())
                  : ((l.strokeStyle = a.color),
                    (l.lineWidth = b.lineWidth),
                    l.stroke());
              },
              oa = function (b, c, f, e) {
                0 === n && (l.beginPath(), Z && (l.lineJoin = "round"));
                d.scroller &&
                "highcharts-navigator-series" === a.options.className
                  ? ((c += d.scroller.top), f && (f += d.scroller.top))
                  : (c += d.plotTop);
                b += d.plotLeft;
                W
                  ? l.moveTo(b, c)
                  : T
                  ? T(l, b, c, f, ba)
                  : Z
                  ? Z(l, b, c)
                  : ua && ua.call(a, l, b, c, m, e);
                n += 1;
                n === ha && (H(), (n = 0));
                ba = { clientX: b, plotY: c, yBottom: f };
              },
              pa = "x" === b.findNearestPointBy,
              aa =
                this.xData || this.options.xData || this.processedXData || !1,
              M = function (a, b, c) {
                na = pa ? a : a + "," + b;
                va &&
                  !w[na] &&
                  ((w[na] = !0),
                  d.inverted && ((a = e.len - a), (b = g.len - b)),
                  p.push({
                    x: aa ? aa[Ba + c] : !1,
                    clientX: a,
                    plotX: a,
                    plotY: b,
                    i: Ba + c,
                  }));
              };
            z = this.boost || {};
            z.target &&
              z.target.attr({
                href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
              });
            (this.points || this.graph) && S(this);
            a.plotGroup(
              "group",
              "series",
              a.visible ? "visible" : "hidden",
              b.zIndex,
              d.seriesGroup
            );
            a.markerGroup = a.group;
            I(a, "destroy", function () {
              a.markerGroup = null;
            });
            p = this.points = [];
            l = this.getContext();
            a.buildKDTree = L;
            z.clear && z.clear();
            this.visible &&
              (99999 < D.length &&
                ((d.options.loading = ka(O, {
                  labelStyle: {
                    backgroundColor: k("#ffffff").setOpacity(0.75).get(),
                    padding: "1em",
                    borderRadius: "0.5em",
                  },
                  style: { backgroundColor: "none", opacity: 1 },
                })),
                E.clearTimeout(K),
                d.showLoading("Drawing..."),
                (d.options.loading = O)),
              u && console.time("canvas rendering"),
              t.eachAsync(
                R,
                function (b, c) {
                  let f,
                    h = !1,
                    r = !1,
                    m = !1,
                    q = !1,
                    n = "undefined" === typeof d.index,
                    p = !0;
                  if (!n) {
                    if (da) {
                      var k = b[0];
                      var l = b[1];
                      R[c + 1] && (m = R[c + 1][0]);
                      R[c - 1] && (q = R[c - 1][0]);
                    } else
                      (k = b),
                        (l = B[c]),
                        R[c + 1] && (m = R[c + 1]),
                        R[c - 1] && (q = R[c - 1]);
                    m && m >= sa && m <= C && (h = !0);
                    q && q >= sa && q <= C && (r = !0);
                    A
                      ? (da && (l = b.slice(1, 3)), (f = l[0]), (l = l[1]))
                      : x && ((k = b.x), (l = b.stackY), (f = l - b.y));
                    b = null === l;
                    F || (p = l >= ja && l <= Y);
                    if (!b && ((k >= sa && k <= C && p) || h || r))
                      if (((k = Math.round(e.toPixels(k, !0))), ta)) {
                        if ("undefined" === typeof y || k === G) {
                          A || (f = l);
                          if ("undefined" === typeof ea || l > ia)
                            (ia = l), (ea = c);
                          if ("undefined" === typeof y || f < xa)
                            (xa = f), (y = c);
                        }
                        k !== G &&
                          ("undefined" !== typeof y &&
                            ((l = g.toPixels(ia, !0)),
                            (Q = g.toPixels(xa, !0)),
                            oa(
                              k,
                              U ? Math.min(l, Aa) : l,
                              U ? Math.max(Q, Aa) : Q,
                              c
                            ),
                            M(k, l, ea),
                            Q !== l && M(k, Q, y)),
                          (y = ea = void 0),
                          (G = k));
                      } else
                        (l = Math.round(g.toPixels(l, !0))),
                          oa(k, l, Q, c),
                          M(k, l, c);
                    W = b && !ca;
                    0 === c % 5e4 &&
                      (a.boost && a.boost.copy
                        ? a.boost.copy()
                        : a.chart.boost &&
                          a.chart.boost.copy &&
                          a.chart.boost.copy());
                  }
                  return !n;
                },
                function () {
                  const b = d.loadingDiv,
                    c = d.loadingShown;
                  H();
                  a.canvasToSVG();
                  u && console.timeEnd("canvas rendering");
                  N(a, "renderedCanvas");
                  c &&
                    (J(b.style, { transition: "opacity 250ms", opacity: 0 }),
                    (d.loadingShown = !1),
                    (K = setTimeout(function () {
                      b.parentNode && b.parentNode.removeChild(b);
                      d.loadingDiv = d.loadingSpan = null;
                    }, 250)));
                  delete a.buildKDTree;
                  a.buildKDTree();
                },
                d.renderer.forExport ? Number.MAX_VALUE : void 0
              ));
          },
        });
        z.scatter.prototype.cvsMarkerCircle = function (a, b, c, d) {
          a.moveTo(b, c);
          a.arc(b, c, d, 0, 2 * Math.PI, !1);
        };
        z.scatter.prototype.cvsMarkerSquare = function (a, b, c, d) {
          a.rect(b - d, c - d, 2 * d, 2 * d);
        };
        z.scatter.prototype.fill = !0;
        z.bubble &&
          ((z.bubble.prototype.cvsMarkerCircle = function (a, b, c, d, e) {
            a.moveTo(b, c);
            a.arc(b, c, this.radii && this.radii[e], 0, 2 * Math.PI, !1);
          }),
          (z.bubble.prototype.cvsStrokeBatch = 1));
        J(z.area.prototype, {
          cvsDrawPoint: function (a, b, c, d, e) {
            e &&
              b !== e.clientX &&
              (a.moveTo(e.clientX, e.yBottom),
              a.lineTo(e.clientX, e.plotY),
              a.lineTo(b, c),
              a.lineTo(b, d));
          },
          fill: !0,
          fillOpacity: !0,
          sampling: !0,
        });
        J(z.column.prototype, {
          cvsDrawPoint: function (a, b, c, d) {
            a.rect(b - 1, c, 1, d - c);
          },
          fill: !0,
          sampling: !0,
        });
        g.prototype.callbacks.push(function (a) {
          I(a, "predraw", function () {
            const a = this.boost || {};
            a.target &&
              a.target.attr({
                href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
              });
            a.canvas &&
              a.canvas
                .getContext("2d")
                .clearRect(0, 0, a.canvas.width, a.canvas.height);
          });
          I(a, "render", function () {
            a.boost && a.boost.copy && a.boost.copy();
          });
        });
      };
    }
  );
  t(a, "Extensions/Boost/NamedColors.js", [], function () {
    return {
      defaultHTMLColorMap: {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        feldspar: "#d19275",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslateblue: "#8470ff",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        violetred: "#d02090",
        wheat: "#f5deb3",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
      },
    };
  });
  t(
    a,
    "Extensions/Boost/Boost.js",
    [
      a["Extensions/Boost/BoostChart.js"],
      a["Extensions/Boost/BoostSeries.js"],
      a["Core/Globals.js"],
      a["Extensions/BoostCanvas.js"],
      a["Extensions/Boost/NamedColors.js"],
      a["Core/Utilities.js"],
    ],
    function (a, d, g, t, B, b) {
      function l() {
        let a,
          b = !1;
        if ("undefined" !== typeof v.WebGLRenderingContext) {
          a = e.createElement("canvas");
          for (let d = 0; d < k.length; ++d)
            try {
              if (
                ((b = a.getContext(k[d])),
                "undefined" !== typeof b && null !== b)
              )
                return !0;
            } catch (I) {}
        }
        return !1;
      }
      const { win: v, doc: e } = g,
        { error: S } = b,
        ja = [],
        k = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
      g = {
        compose: function (e, g, k, v) {
          const z = l();
          z || ("undefined" !== typeof t ? t() : S(26));
          v &&
            b.pushUnique(ja, v) &&
            (v.names = Object.assign(
              Object.assign({}, v.names),
              B.defaultHTMLColorMap
            ));
          a.compose(e, z);
          d.compose(g, k, z);
        },
        hasWebGLSupport: l,
      };
      ("");
      return g;
    }
  );
  t(
    a,
    "masters/modules/boost.src.js",
    [a["Core/Globals.js"], a["Extensions/Boost/Boost.js"]],
    function (a, d) {
      a.hasWebGLSupport = d.hasWebGLSupport;
      d.compose(a.Chart, a.Series, a.seriesTypes, a.Color);
    }
  );
});
//# sourceMappingURL=boost.js.map
