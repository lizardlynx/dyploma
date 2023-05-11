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
    ? define("highcharts/modules/boost-canvas", ["highcharts"], function (z) {
        a(z);
        a.Highcharts = z;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function z(a, d, g, y) {
    a.hasOwnProperty(d) ||
      ((a[d] = y.apply(null, g)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: d, module: a[d] },
          })
        ));
  }
  a = a ? a._modules : {};
  z(a, "Extensions/Boost/Boostables.js", [], function () {
    return "area areaspline arearange column columnrange bar line scatter heatmap bubble treemap".split(
      " "
    );
  });
  z(
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
  z(
    a,
    "Extensions/Boost/BoostChart.js",
    [a["Extensions/Boost/BoostableMap.js"], a["Core/Utilities.js"]],
    function (a, d) {
      function g(e) {
        const c = e.series,
          d = (e.boost = e.boost || {});
        var B = e.options.boost || {},
          C = v(B.seriesThreshold, 50);
        if (c.length >= C) return !0;
        if (1 === c.length) return !1;
        B = B.allowForce;
        if ("undefined" === typeof B) {
          B = !0;
          for (var g of e.xAxis)
            if (
              v(g.min, -Infinity) > v(g.dataMin, -Infinity) ||
              v(g.max, Infinity) < v(g.dataMax, Infinity)
            ) {
              B = !1;
              break;
            }
        }
        if ("undefined" !== typeof d.forceChartBoost) {
          if (B) return d.forceChartBoost;
          d.forceChartBoost = void 0;
        }
        g = e = 0;
        for (const d of c)
          (C = d.options),
            0 !== C.boostThreshold &&
              !1 !== d.visible &&
              "heatmap" !== d.type &&
              (a[d.type] && ++e,
              u(d.processedXData, C.data, d.points) >=
                (C.boostThreshold || Number.MAX_VALUE) && ++g);
        d.forceChartBoost = B && ((e === c.length && 0 < g) || 5 < g);
        return d.forceChartBoost;
      }
      function y(e) {
        c(e, "predraw", function () {
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
        c(e, "render", function () {
          e.boost && e.boost.wgl && g(e) && e.boost.wgl.render(e);
        });
        let a = -1,
          d = -1;
        c(e.pointer, "afterGetHoverData", () => {
          var c = e.hoverSeries;
          e.boost = e.boost || {};
          if (e.boost.markerGroup && c) {
            const g = e.inverted ? c.yAxis : c.xAxis;
            c = e.inverted ? c.xAxis : c.yAxis;
            if ((g && g.pos !== a) || (c && c.pos !== d))
              e.boost.markerGroup.translate(g.pos, c.pos),
                (a = g.pos),
                (d = c.pos);
          }
        });
      }
      function u(...e) {
        let c = -Number.MAX_VALUE;
        e.forEach(function (e) {
          if (
            "undefined" !== typeof e &&
            null !== e &&
            "undefined" !== typeof e.length &&
            0 < e.length
          )
            return (c = e.length), !0;
        });
        return c;
      }
      const { addEvent: c, pick: v } = d,
        C = [];
      return {
        compose: function (e, c) {
          c && d.pushUnique(C, e) && e.prototype.callbacks.push(y);
          return e;
        },
        getBoostClipRect: function (e, c) {
          const a = {
            x: e.plotLeft,
            y: e.plotTop,
            width: e.plotWidth,
            height: e.plotHeight,
          };
          c === e &&
            ((c = e.inverted ? e.xAxis : e.yAxis),
            1 >= c.length
              ? ((a.y = Math.min(c[0].pos, a.y)),
                (a.height = c[0].pos - e.plotTop + c[0].len))
              : (a.height = e.plotHeight));
          return a;
        },
        isChartSeriesBoosting: g,
      };
    }
  );
  z(a, "Extensions/Boost/WGLDrawMode.js", [], function () {
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
  z(a, "Extensions/Boost/WGLShader.js", [a["Core/Utilities.js"]], function (a) {
    const { clamp: d, error: g, pick: y } = a;
    class u {
      constructor(c) {
        this.errors = [];
        this.uLocations = {};
        (this.gl = c) && this.createShader();
      }
      bind() {
        this.gl && this.shaderProgram && this.gl.useProgram(this.shaderProgram);
      }
      createShader() {
        const c = this.stringToProgram(
            "#version 100\n#define LN10 2.302585092994046\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform bool  xAxisIsLog;\nuniform bool  xAxisReversed;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  yAxisIsLog;\nuniform bool  yAxisReversed;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value = aVertexPosition.w;\nfloat zMax = bubbleZMax;\nfloat zMin = bubbleZMin;\nfloat radius = 0.0;\nfloat pos = 0.0;\nfloat zRange = zMax - zMin;\nif (bubbleSizeAbs){\nvalue = value - bubbleZThreshold;\nzMax = max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin = 0.0;\n}\nif (value < zMin){\nradius = bubbleZMin / 2.0 - 1.0;\n} else {\npos = zRange > 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea && pos > 0.0){\npos = sqrt(pos);\n}\nradius = ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord,\nbool  isLog,\nbool  reversed\n){\nfloat sign = 1.0;\nfloat cvsOffset = 0.0;\nif (cvsCoord) {\nsign *= -1.0;\ncvsOffset = len;\n}\nif (isLog) {\nval = log(val) / LN10;\n}\nif (reversed) {\nsign *= -1.0;\ncvsOffset -= sign * len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value) {\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord, xAxisIsLog, xAxisReversed);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold) {\nfloat v;\nif (skipTranslation){\nv = value;// + yAxisPos;\n} else {\nv = translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord, yAxisIsLog, yAxisReversed);// + yAxisPos;\nif (v > yAxisLen) {\nv = yAxisLen;\n}\n}\nif (checkTreshold > 0.0 && hasThreshold) {\nv = min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize = bubbleRadius();\n} else {\ngl_PointSize = pSize;\n}\nvColor = aColor;\nif (skipTranslation && isInverted) {\ngl_Position = uPMatrix * vec4(aVertexPosition.y + yAxisPos, aVertexPosition.x + xAxisPos, 0.0, 1.0);\n} else if (isInverted) {\ngl_Position = uPMatrix * vec4(yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, xToPixels(aVertexPosition.x) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position = uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
            "vertex"
          ),
          a = this.stringToProgram(
            "precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col = fillColor;\nvec4 tcol = texture2D(uSampler, gl_PointCoord.st);\nif (hasColor) {\ncol = vColor;\n}\nif (isCircle) {\ncol *= tcol;\nif (tcol.r < 0.0) {\ndiscard;\n} else {\ngl_FragColor = col;\n}\n} else {\ngl_FragColor = col;\n}\n}",
            "fragment"
          ),
          d = (c) => this.gl.getUniformLocation(this.shaderProgram, c);
        if (!c || !a) return (this.shaderProgram = !1), this.handleErrors(), !1;
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, c);
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
      stringToProgram(c, a) {
        const d = this.gl.createShader(
          "vertex" === a ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER
        );
        this.gl.shaderSource(d, c);
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
      setBubbleUniforms(c, a, g, e = 1) {
        const u = c.options;
        let v = Number.MAX_VALUE,
          B = -Number.MAX_VALUE;
        if (this.gl && this.shaderProgram && c.is("bubble")) {
          const C = c.getPxExtremes();
          v = y(
            u.zMin,
            d(a, !1 === u.displayNegative ? u.zThreshold : -Number.MAX_VALUE, v)
          );
          B = y(u.zMax, Math.max(B, g));
          this.gl.uniform1i(this.isBubbleUniform, 1);
          this.gl.uniform1i(this.isCircleUniform, 1);
          this.gl.uniform1i(
            this.bubbleSizeAreaUniform,
            "width" !== c.options.sizeBy
          );
          this.gl.uniform1i(
            this.bubbleSizeAbsUniform,
            c.options.sizeByAbsoluteValue
          );
          this.setUniform("bubbleMinSize", C.minPxSize * e);
          this.setUniform("bubbleMaxSize", C.maxPxSize * e);
          this.setUniform("bubbleZMin", v);
          this.setUniform("bubbleZMax", B);
          this.setUniform("bubbleZThreshold", c.options.zThreshold);
        }
      }
      setColor(c) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform4f(
            this.fcUniform,
            c[0] / 255,
            c[1] / 255,
            c[2] / 255,
            c[3]
          );
      }
      setDrawAsCircle(c) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform1i(this.isCircleUniform, c ? 1 : 0);
      }
      setInverted(c) {
        this.gl && this.shaderProgram && this.gl.uniform1i(this.isInverted, c);
      }
      setPMatrix(c) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniformMatrix4fv(this.pUniform, !1, c);
      }
      setPointSize(c) {
        this.gl && this.shaderProgram && this.gl.uniform1f(this.psUniform, c);
      }
      setSkipTranslation(c) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform1i(this.skipTranslationUniform, !0 === c ? 1 : 0);
      }
      setTexture(c) {
        this.gl &&
          this.shaderProgram &&
          this.gl.uniform1i(this.uSamplerUniform, c);
      }
      setUniform(c, a) {
        this.gl &&
          this.shaderProgram &&
          ((c = this.uLocations[c] =
            this.uLocations[c] ||
            this.gl.getUniformLocation(this.shaderProgram, c)),
          this.gl.uniform1f(c, a));
      }
    }
    return u;
  });
  z(a, "Extensions/Boost/WGLVertexBuffer.js", [], function () {
    class a {
      constructor(a, g, y) {
        this.buffer = !1;
        this.iterator = 0;
        this.vertAttribute = this.preAllocated = !1;
        this.components = y || 2;
        this.dataComponents = y;
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
      build(a, g, y) {
        let d;
        this.data = a || [];
        if (!((this.data && 0 !== this.data.length) || this.preAllocated))
          return this.destroy(), !1;
        this.components = y || this.components;
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
      push(a, g, y, u) {
        this.preAllocated &&
          ((this.preAllocated[++this.iterator] = a),
          (this.preAllocated[++this.iterator] = g),
          (this.preAllocated[++this.iterator] = y),
          (this.preAllocated[++this.iterator] = u));
      }
      render(a, g, y) {
        const d = this.preAllocated
          ? this.preAllocated.length
          : this.data.length;
        if (!this.buffer || !d) return !1;
        if (!a || a > d || 0 > a) a = 0;
        if (!g || g > d) g = d;
        if (a >= g) return !1;
        this.gl.drawArrays(
          this.gl[y || "POINTS"],
          a / this.components,
          (g - a) / this.components
        );
        return !0;
      }
    }
    return a;
  });
  z(
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
    function (a, d, g, y, u, c) {
      const { parse: v } = a,
        { doc: C, win: e } = d,
        { isNumber: z, isObject: la, merge: B, objectEach: X, pick: ba } = g,
        E = {
          column: !0,
          columnrange: !0,
          bar: !0,
          area: !0,
          areaspline: !0,
          arearange: !0,
        },
        ia = { scatter: !0, bubble: !0 },
        J = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
      class O {
        static orthoMatrix(b, m) {
          return [2 / b, 0, 0, 0, 0, -(2 / m), 0, 0, 0, 0, -2, 0, -1, 1, -1, 1];
        }
        static seriesPointCount(b) {
          let m;
          if (b.boosted) {
            var a = !!b.options.stacking;
            m = b.xData || b.options.xData || b.processedXData;
            a = (a ? b.data : m || b.options.data).length;
            "treemap" === b.type
              ? (a *= 12)
              : "heatmap" === b.type
              ? (a *= 6)
              : E[b.type] && (a *= 2);
            return a;
          }
          return 0;
        }
        constructor(b) {
          this.data = [];
          this.height = 0;
          this.isInited = !1;
          this.markerData = [];
          this.series = [];
          this.textureHandles = {};
          this.width = 0;
          this.postRenderCallback = b;
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
        setOptions(b) {
          "pixelRatio" in b || (b.pixelRatio = 1);
          B(!0, this.settings, b);
        }
        allocateBuffer(b) {
          const m = this.vbuffer;
          let a = 0;
          this.settings.usePreallocated &&
            (b.series.forEach((b) => {
              b.boosted && (a += O.seriesPointCount(b));
            }),
            m && m.allocate(a));
        }
        allocateBufferForSingleSeries(b) {
          const m = this.vbuffer;
          let a = 0;
          this.settings.usePreallocated &&
            (b.boosted && (a = O.seriesPointCount(b)), m && m.allocate(a));
        }
        clear() {
          const b = this.gl;
          b && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
        }
        pushSeriesData(b, a) {
          const c = this.data,
            m = this.settings,
            e = this.vbuffer;
          var r = b.pointArrayMap && "low,high" === b.pointArrayMap.join(",");
          const f = b.chart,
            q = b.options,
            h = !!q.stacking,
            d = q.data;
          var P = b.xAxis.getExtremes();
          const Y = P.min;
          P = P.max;
          var l = b.yAxis.getExtremes();
          const g = l.min,
            y = l.max;
          var F = b.xData || q.xData || b.processedXData;
          const B = b.yData || q.yData || b.processedYData,
            u = b.zData || q.zData || b.processedZData,
            C = b.yAxis,
            z = b.xAxis,
            D = !F || 0 === F.length;
          l = q.connectNulls;
          var t = b.points || !1;
          const H = h ? b.data : F || d;
          F = { x: Number.MAX_VALUE, y: 0 };
          const R = { x: -Number.MAX_VALUE, y: 0 },
            n = "undefined" === typeof f.index,
            p = E[b.type],
            na = q.zoneAxis || "y",
            Z = q.zones || !1,
            sa = q.threshold,
            ja = this.getPixelRatio();
          let va = b.chart.plotWidth,
            ca = !1,
            T = !1;
          let U,
            ta = 0;
          var V = !1;
          let A,
            w,
            O,
            G = -1,
            W = !1,
            da = !1,
            ea,
            J = !1,
            ka = !1,
            x = !1,
            fa = !1,
            oa = !0,
            L = !0,
            ha,
            I = !1,
            pa = !1,
            qa = 0;
          if (!(q.boostData && 0 < q.boostData.length)) {
            q.gapSize &&
              (pa =
                "value" !== q.gapUnit
                  ? q.gapSize * b.closestPointRange
                  : q.gapSize);
            if (
              Z &&
              ((ha = []),
              Z.forEach((a, b) => {
                if (a.color) {
                  const n = v(a.color).rgba;
                  n[0] /= 255;
                  n[1] /= 255;
                  n[2] /= 255;
                  ha[b] = n;
                  I || "undefined" !== typeof a.value || (I = n);
                }
              }),
              !I)
            ) {
              var aa = (b.pointAttribs && b.pointAttribs().fill) || b.color;
              I = v(aa).rgba;
              I[0] /= 255;
              I[1] /= 255;
              I[2] /= 255;
            }
            f.inverted && (va = b.chart.plotHeight);
            b.closestPointRangePx = Number.MAX_VALUE;
            var N = (b) => {
                b &&
                  (a.colorData.push(b[0]),
                  a.colorData.push(b[1]),
                  a.colorData.push(b[2]),
                  a.colorData.push(b[3]));
              },
              S = (b, n, p, r = 1, na) => {
                N(na);
                1 === ja ||
                  (m.useGPUTranslations && !a.skipTranslation) ||
                  ((b *= ja), (n *= ja), (r *= ja));
                m.usePreallocated && e
                  ? (e.push(b, n, p ? 1 : 0, r), (qa += 4))
                  : (c.push(b), c.push(n), c.push(p ? ja : 0), c.push(r));
              },
              Aa = () => {
                a.segments.length &&
                  (a.segments[a.segments.length - 1].to = c.length || qa);
              };
            aa = () => {
              (a.segments.length &&
                a.segments[a.segments.length - 1].from === (c.length || qa)) ||
                (Aa(), a.segments.push({ from: c.length || qa }));
            };
            var Ba = (b, a, n, p, c) => {
              N(c);
              S(b + n, a);
              N(c);
              S(b, a);
              N(c);
              S(b, a + p);
              N(c);
              S(b, a + p);
              N(c);
              S(b + n, a + p);
              N(c);
              S(b + n, a);
            };
            aa();
            if (t && 0 < t.length)
              (a.skipTranslation = !0),
                (a.drawMode = "TRIANGLES"),
                t[0].node &&
                  t[0].node.levelDynamic &&
                  t.sort((b, a) => {
                    if (b.node) {
                      if (b.node.levelDynamic > a.node.levelDynamic) return 1;
                      if (b.node.levelDynamic < a.node.levelDynamic) return -1;
                    }
                    return 0;
                  }),
                t.forEach((a) => {
                  var n = a.plotY;
                  if (
                    "undefined" !== typeof n &&
                    !isNaN(n) &&
                    null !== a.y &&
                    a.shapeArgs
                  ) {
                    let {
                      x: p = 0,
                      y: c = 0,
                      width: m = 0,
                      height: r = 0,
                    } = a.shapeArgs;
                    n = f.styledMode
                      ? a.series.colorAttribs(a)
                      : (n = a.series.pointAttribs(a));
                    a = n["stroke-width"] || 0;
                    x = v(n.fill).rgba;
                    x[0] /= 255;
                    x[1] /= 255;
                    x[2] /= 255;
                    b.is("treemap") &&
                      ((a = a || 1),
                      (U = v(n.stroke).rgba),
                      (U[0] /= 255),
                      (U[1] /= 255),
                      (U[2] /= 255),
                      Ba(p, c, m, r, U),
                      (a /= 2));
                    b.is("heatmap") &&
                      f.inverted &&
                      ((p = z.len - p), (c = C.len - c), (m = -m), (r = -r));
                    Ba(p + a, c + a, m - 2 * a, r - 2 * a, x);
                  }
                });
            else {
              for (; G < H.length - 1; ) {
                t = H[++G];
                if ("undefined" === typeof t) continue;
                if (n) break;
                const c = d && d[G];
                !D &&
                  la(c, !0) &&
                  c.color &&
                  ((x = v(c.color).rgba),
                  (x[0] /= 255),
                  (x[1] /= 255),
                  (x[2] /= 255));
                D
                  ? ((A = t[0]),
                    (w = t[1]),
                    H[G + 1] && (da = H[G + 1][0]),
                    H[G - 1] && (W = H[G - 1][0]),
                    3 <= t.length &&
                      ((O = t[2]),
                      t[2] > a.zMax && (a.zMax = t[2]),
                      t[2] < a.zMin && (a.zMin = t[2])))
                  : ((A = t),
                    (w = B[G]),
                    H[G + 1] && (da = H[G + 1]),
                    H[G - 1] && (W = H[G - 1]),
                    u &&
                      u.length &&
                      ((O = u[G]),
                      u[G] > a.zMax && (a.zMax = u[G]),
                      u[G] < a.zMin && (a.zMin = u[G])));
                if (l || (null !== A && null !== w)) {
                  if (
                    (da && da >= Y && da <= P && (J = !0),
                    W && W >= Y && W <= P && (ka = !0),
                    r
                      ? (D && (w = t.slice(1, 3)), (ea = w[0]), (w = w[1]))
                      : h && ((A = t.x), (w = t.stackY), (ea = w - t.y)),
                    null !== g &&
                      "undefined" !== typeof g &&
                      null !== y &&
                      "undefined" !== typeof y &&
                      (oa = w >= g && w <= y),
                    A > P && R.x < P && ((R.x = A), (R.y = w)),
                    A < Y && F.x > Y && ((F.x = A), (F.y = w)),
                    null !== w || !l)
                  )
                    if (null !== w && (oa || J || ka)) {
                      if (
                        ((da >= Y || A >= Y) && (W <= P || A <= P) && (fa = !0),
                        fa || J || ka)
                      ) {
                        pa && A - W > pa && aa();
                        if (Z) {
                          let a;
                          Z.some((b, n) => {
                            const c = Z[n - 1];
                            return "x" === na
                              ? "undefined" !== typeof b.value && A <= b.value
                                ? (ha[n] && (!c || A >= c.value) && (a = ha[n]),
                                  !0)
                                : !1
                              : "undefined" !== typeof b.value && w <= b.value
                              ? (ha[n] && (!c || w >= c.value) && (a = ha[n]),
                                !0)
                              : !1;
                          });
                          x = a || I || x;
                        }
                        if (
                          !m.useGPUTranslations &&
                          ((a.skipTranslation = !0),
                          (A = z.toPixels(A, !0)),
                          (w = C.toPixels(w, !0)),
                          A > va && "POINTS" === a.drawMode)
                        )
                          continue;
                        a.hasMarkers &&
                          fa &&
                          !1 !== ca &&
                          (b.closestPointRangePx = Math.min(
                            b.closestPointRangePx,
                            Math.abs(A - ca)
                          ));
                        if (
                          !m.useGPUTranslations &&
                          !m.usePreallocated &&
                          ca &&
                          1 > Math.abs(A - ca) &&
                          T &&
                          1 > Math.abs(w - T)
                        )
                          m.debug.showSkipSummary && ++ta;
                        else {
                          if (p) {
                            V = ea;
                            if (!1 === ea || "undefined" === typeof ea)
                              V = 0 > w ? w : 0;
                            r || h || (V = Math.max(null === sa ? g : sa, g));
                            m.useGPUTranslations || (V = C.toPixels(V, !0));
                            S(A, V, 0, 0, x);
                          }
                          q.step && !L && S(A, T, 0, 2, x);
                          S(A, w, 0, "bubble" === b.type ? O || 1 : 2, x);
                          ca = A;
                          T = w;
                          V = !0;
                          L = !1;
                        }
                      }
                    } else aa();
                } else aa();
              }
              m.debug.showSkipSummary && console.log("skipped points:", ta);
              r = (b, n) => {
                m.useGPUTranslations ||
                  ((a.skipTranslation = !0),
                  (b.x = z.toPixels(b.x, !0)),
                  (b.y = C.toPixels(b.y, !0)));
                n
                  ? (this.data = [b.x, b.y, 0, 2].concat(this.data))
                  : S(b.x, b.y, 0, 2);
              };
              V ||
                !1 === l ||
                "line_strip" !== b.drawMode ||
                (F.x < Number.MAX_VALUE && r(F, !0),
                R.x > -Number.MAX_VALUE && r(R));
            }
            Aa();
          }
        }
        pushSeries(a) {
          var b = this.markerData;
          const c = this.series,
            e = this.settings;
          0 < c.length &&
            c[c.length - 1].hasMarkers &&
            (c[c.length - 1].markerTo = b.length);
          e.debug.timeSeriesProcessing &&
            console.time("building " + a.type + " series");
          b = {
            segments: [],
            markerFrom: b.length,
            colorData: [],
            series: a,
            zMin: Number.MAX_VALUE,
            zMax: -Number.MAX_VALUE,
            hasMarkers: a.options.marker ? !1 !== a.options.marker.enabled : !1,
            showMarkers: !0,
            drawMode: y[a.type] || "LINE_STRIP",
          };
          a.index >= c.length ? c.push(b) : (c[a.index] = b);
          this.pushSeriesData(a, b);
          e.debug.timeSeriesProcessing &&
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
          const b = this.shader;
          if (b) {
            var c = this.getPixelRatio();
            b.setUniform("xAxisTrans", a.transA * c);
            b.setUniform("xAxisMin", a.min);
            b.setUniform("xAxisMinPad", a.minPixelPadding * c);
            b.setUniform("xAxisPointRange", a.pointRange);
            b.setUniform("xAxisLen", a.len * c);
            b.setUniform("xAxisPos", a.pos * c);
            b.setUniform("xAxisCVSCoord", !a.horiz);
            b.setUniform("xAxisIsLog", !!a.logarithmic);
            b.setUniform("xAxisReversed", !!a.reversed);
          }
        }
        setYAxis(a) {
          const b = this.shader;
          if (b) {
            var c = this.getPixelRatio();
            b.setUniform("yAxisTrans", a.transA * c);
            b.setUniform("yAxisMin", a.min);
            b.setUniform("yAxisMinPad", a.minPixelPadding * c);
            b.setUniform("yAxisPointRange", a.pointRange);
            b.setUniform("yAxisLen", a.len * c);
            b.setUniform("yAxisPos", a.pos * c);
            b.setUniform("yAxisCVSCoord", !a.horiz);
            b.setUniform("yAxisIsLog", !!a.logarithmic);
            b.setUniform("yAxisReversed", !!a.reversed);
          }
        }
        setThreshold(a, c) {
          const b = this.shader;
          b &&
            (b.setUniform("hasThreshold", a),
            b.setUniform("translatedThreshold", c));
        }
        renderChart(b) {
          const e = this.gl,
            g = this.settings,
            k = this.shader,
            K = this.vbuffer,
            r = this.getPixelRatio();
          if (b)
            (this.width = b.chartWidth * r), (this.height = b.chartHeight * r);
          else return !1;
          const f = this.height,
            q = this.width;
          if (!(e && k && q && f)) return !1;
          g.debug.timeRendering && console.time("gl rendering");
          e.canvas.width = q;
          e.canvas.height = f;
          k.bind();
          e.viewport(0, 0, q, f);
          k.setPMatrix(O.orthoMatrix(q, f));
          1 < g.lineWidth && !d.isMS && e.lineWidth(g.lineWidth);
          K && (K.build(this.data, "aVertexPosition", 4), K.bind());
          k.setInverted(b.inverted);
          this.series.forEach((h, q) => {
            const f = h.series.options;
            var d = f.marker,
              l = "undefined" !== typeof f.lineWidth ? f.lineWidth : 1,
              m = f.threshold;
            const u = z(m),
              ma = h.series.yAxis.getThreshold(m);
            m = ba(
              f.marker ? f.marker.enabled : null,
              h.series.xAxis.isRadial ? !0 : null,
              h.series.closestPointRangePx >
                2 * ((f.marker ? f.marker.radius : 10) || 10)
            );
            d =
              this.textureHandles[(d && d.symbol) || h.series.symbol] ||
              this.textureHandles.circle;
            if (
              0 !== h.segments.length &&
              h.segments[0].from !== h.segments[0].to &&
              (d.isReady &&
                (e.bindTexture(e.TEXTURE_2D, d.handle), k.setTexture(d.handle)),
              b.styledMode
                ? (d =
                    h.series.markerGroup &&
                    h.series.markerGroup.getStyle("fill"))
                : ((d =
                    ("POINTS" === h.drawMode &&
                      h.series.pointAttribs &&
                      h.series.pointAttribs().fill) ||
                    h.series.color),
                  f.colorByPoint && (d = h.series.chart.options.colors[q])),
              h.series.fillOpacity &&
                f.fillOpacity &&
                (d = new a(d).setOpacity(ba(f.fillOpacity, 1)).get()),
              (d = v(d).rgba),
              g.useAlpha || (d[3] = 1),
              "LINES" === h.drawMode && g.useAlpha && 1 > d[3] && (d[3] /= 10),
              "add" === f.boostBlending
                ? (e.blendFunc(e.SRC_ALPHA, e.ONE), e.blendEquation(e.FUNC_ADD))
                : "mult" === f.boostBlending || "multiply" === f.boostBlending
                ? e.blendFunc(e.DST_COLOR, e.ZERO)
                : "darken" === f.boostBlending
                ? (e.blendFunc(e.ONE, e.ONE), e.blendEquation(e.FUNC_MIN))
                : e.blendFuncSeparate(
                    e.SRC_ALPHA,
                    e.ONE_MINUS_SRC_ALPHA,
                    e.ONE,
                    e.ONE_MINUS_SRC_ALPHA
                  ),
              k.reset(),
              0 < h.colorData.length
                ? (k.setUniform("hasColor", 1),
                  (q = new c(e, k)),
                  q.build(h.colorData, "aColor", 4),
                  q.bind())
                : e.disableVertexAttribArray(
                    e.getAttribLocation(k.getProgram(), "aColor")
                  ),
              k.setColor(d),
              this.setXAxis(h.series.xAxis),
              this.setYAxis(h.series.yAxis),
              this.setThreshold(u, ma),
              "POINTS" === h.drawMode &&
                k.setPointSize(2 * ba(f.marker && f.marker.radius, 0.5) * r),
              k.setSkipTranslation(h.skipTranslation),
              "bubble" === h.series.type &&
                k.setBubbleUniforms(h.series, h.zMin, h.zMax, r),
              k.setDrawAsCircle(ia[h.series.type] || !1),
              K)
            ) {
              if (0 < l || "LINE_STRIP" !== h.drawMode)
                for (l = 0; l < h.segments.length; l++)
                  K.render(h.segments[l].from, h.segments[l].to, h.drawMode);
              if (h.hasMarkers && m)
                for (
                  k.setPointSize(2 * ba(f.marker && f.marker.radius, 5) * r),
                    k.setDrawAsCircle(!0),
                    l = 0;
                  l < h.segments.length;
                  l++
                )
                  K.render(h.segments[l].from, h.segments[l].to, "POINTS");
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
        setSize(a, c) {
          const b = this.shader;
          !b ||
            (this.width === a && this.height === c) ||
            ((this.width = a),
            (this.height = c),
            b.bind(),
            b.setPMatrix(O.orthoMatrix(a, c)));
        }
        init(a, e) {
          const b = this.settings;
          this.isInited = !1;
          if (!a) return !1;
          b.debug.timeSetup && console.time("gl setup");
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
          a = this.shader = new u(d);
          if (!a) return !1;
          this.vbuffer = new c(d, a);
          a = (a, b) => {
            const c = {
                isReady: !1,
                texture: C.createElement("canvas"),
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
          b.debug.timeSetup && console.timeEnd("gl setup");
          return !0;
        }
        destroy() {
          const a = this.gl,
            c = this.shader,
            d = this.vbuffer;
          this.flush();
          d && d.destroy();
          c && c.destroy();
          a &&
            (X(this.textureHandles, (b) => {
              b.handle && a.deleteTexture(b.handle);
            }),
            (a.canvas.width = 1),
            (a.canvas.height = 1));
        }
      }
      return O;
    }
  );
  z(
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
    function (a, d, g, y, u, c, v) {
      function C(a, b) {
        const n = b.boost;
        a &&
          n &&
          n.target &&
          n.canvas &&
          !h(b.chart) &&
          a.allocateBufferForSingleSeries(b);
      }
      function e(a) {
        return ua(
          a && a.options && a.options.boost && a.options.boost.enabled,
          !0
        );
      }
      function z(a, b) {
        const c = a.constructor,
          n = a.seriesGroup || b.group;
        let d = a.chartWidth,
          e = a.chartHeight,
          p = a,
          r = "undefined" !== typeof SVGForeignObjectElement;
        p = h(a) ? a : b;
        const f = (p.boost = p.boost || {});
        r = !1;
        R || (R = P.createElement("canvas"));
        f.target ||
          ((f.canvas = R),
          a.renderer.forExport || !r
            ? ((p.renderTarget = f.target =
                a.renderer
                  .image("", 0, 0, d, e)
                  .addClass("highcharts-boost-canvas")
                  .add(n)),
              (f.clear = function () {
                f.target.attr({
                  href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                });
              }),
              (f.copy = function () {
                f.resize();
                f.target.attr({ href: f.canvas.toDataURL("image/png") });
              }))
            : ((f.targetFo = a.renderer.createElement("foreignObject").add(n)),
              (p.renderTarget = f.target = P.createElement("canvas")),
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
            d = a.chartWidth;
            e = a.chartHeight;
            (f.targetFo || f.target)
              .attr({ x: 0, y: 0, width: d, height: e })
              .css({
                pointerEvents: "none",
                mixedBlendMode: "normal",
                opacity: 1,
              });
            p instanceof c &&
              p.boost.markerGroup.translate(a.plotLeft, a.plotTop);
          }),
          (f.clipRect = a.renderer.clipRect()),
          (f.targetFo || f.target).clip(f.clipRect),
          p instanceof c &&
            (p.boost.markerGroup = p.renderer
              .g()
              .add(n)
              .translate(b.xAxis.pos, b.yAxis.pos)));
        f.canvas.width = d;
        f.canvas.height = e;
        f.clipRect && f.clipRect.attr(q(a, p));
        f.resize();
        f.clear();
        f.wgl ||
          ((f.wgl = new v((a) => {
            a.settings.debug.timeBufferCopy && console.time("buffer copy");
            f.copy();
            a.settings.debug.timeBufferCopy && console.timeEnd("buffer copy");
          })),
          f.wgl.init(f.canvas) ||
            ya("[highcharts boost] - unable to init WebGL renderer"),
          f.wgl.setOptions(a.options.boost || {}),
          p instanceof c && f.wgl.allocateBuffer(a));
        f.wgl.setSize(d, e);
        return f.wgl;
      }
      function la(a) {
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
      function B(a, b, c, d, f, e) {
        f = f || 0;
        d = d || 3e3;
        const n = f + d;
        let p = !0;
        for (; p && f < n && f < a.length; ) (p = b(a[f], f)), ++f;
        p &&
          (f < a.length
            ? e
              ? B(a, b, c, d, f, e)
              : l.requestAnimationFrame
              ? l.requestAnimationFrame(function () {
                  B(a, b, c, d, f);
                })
              : setTimeout(B, 0, a, b, c, d, f)
            : c && c());
      }
      function X(a) {
        a.boost = a.boost || { getPoint: (c) => b(a, c) };
        const c = (a.boost.altered = []);
        ["allowDG", "directTouch", "stickyTracking"].forEach((b) => {
          c.push({ prop: b, val: a[b], own: Object.hasOwnProperty.call(a, b) });
        });
        a.allowDG = !1;
        a.directTouch = !1;
        a.stickyTracking = !0;
        a.finishedAnimating = !0;
        a.labelBySeries && (a.labelBySeries = a.labelBySeries.destroy());
      }
      function ba(a) {
        const b = a.boost;
        b &&
          ((b.altered || []).forEach((b) => {
            b.own ? (a[b.prop] = b.val) : delete a[b.prop];
          }),
          b.clear && b.clear());
      }
      function E(a, b) {
        const c = a.options,
          f = a.xAxis && a.xAxis.options,
          d = a.yAxis && a.yAxis.options;
        a = a.colorAxis && a.colorAxis.options;
        return (
          c.data.length > (c.boostThreshold || Number.MAX_VALUE) &&
          M(d.min) &&
          M(d.max) &&
          (!b || (M(f.min) && M(f.max))) &&
          (!a || (M(a.min) && M(a.max)))
        );
      }
      function ia() {
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
      function O(a) {
        const b = a.boost;
        b &&
          b.canvas &&
          b.target &&
          b.wgl &&
          !h(a.chart) &&
          b.wgl.render(a.chart);
      }
      function b(a, b) {
        var c = a.options;
        const f = a.xAxis;
        var d = a.pointClass;
        if (b instanceof d) return b;
        c = a.xData || c.xData || a.processedXData || !1;
        d = new d().init(a, a.options.data[b.i], c ? c[b.i] : void 0);
        d.category = ua(f.categories ? f.categories[d.x] : d.x, d.x);
        d.dist = b.dist;
        d.distX = b.distX;
        d.plotX = b.plotX;
        d.plotY = b.plotY;
        d.index = b.i;
        d.percentage = b.percentage;
        d.isInside = a.isPointInside(d);
        return d;
      }
      function m() {
        function a(a, b) {
          const e = "undefined" === typeof c.index;
          let h;
          let q,
            n = !1,
            g = !0;
          if ("undefined" === typeof a) return !0;
          if (!e) {
            if (ra) {
              h = a[0];
              var p = a[1];
            } else (h = a), (p = r[b]);
            y
              ? (ra && (p = a.slice(1, 3)), (n = p[0]), (p = p[1]))
              : k &&
                ((h = a.x), (p = a.stackY), (n = p - a.y), (q = a.percentage));
            v || (g = (p || 0) >= t && p <= P);
            if (h >= l && h <= m && g)
              if (((a = d.toPixels(h, !0)), u)) {
                if ("undefined" === typeof D || a === J) {
                  y || (n = p);
                  if ("undefined" === typeof K || p > I) (I = p), (K = b);
                  if ("undefined" === typeof D || n < M) (M = n), (D = b);
                }
                (x && a === J) ||
                  ("undefined" !== typeof D &&
                    ((p = f.toPixels(I, !0)),
                    (L = f.toPixels(M, !0)),
                    N(a, p, K, q),
                    L !== p && N(a, L, D, q)),
                  (D = K = void 0),
                  (J = a));
              } else (p = Math.ceil(f.toPixels(p, !0))), N(a, p, b, q);
          }
          return !e;
        }
        var b = this.options || {};
        const c = this.chart,
          d = this.xAxis,
          f = this.yAxis,
          e = b.xData || this.processedXData,
          r = b.yData || this.processedYData,
          q = b.data;
        var g = d.getExtremes();
        const l = g.min,
          m = g.max;
        g = f.getExtremes();
        const t = g.min,
          P = g.max,
          w = {},
          u = !!this.sampling,
          ma = !1 !== b.enableMouseTracking;
        g = b.threshold;
        const y =
            this.pointArrayMap && "low,high" === this.pointArrayMap.join(","),
          k = !!b.stacking,
          F = this.cropStart || 0,
          v = this.requireSorting,
          ra = !e,
          x = "x" === b.findNearestPointBy,
          E = this.xData || this.options.xData || this.processedXData || !1;
        b = !1;
        let J,
          L = f.getThreshold(g),
          M,
          I,
          D,
          K;
        b = z(c, this);
        c.boosted = !0;
        if (this.visible) {
          (this.points || this.graph) && la(this);
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
          var R = (this.points = []),
            N = (a, b, e, r) => {
              a = Math.ceil(a);
              H = x ? a : a + "," + b;
              ma &&
                !w[H] &&
                ((w[H] = !0),
                c.inverted && ((a = d.len - a), (b = f.len - b)),
                R.push({
                  destroy: Y,
                  x: E ? E[F + e] : !1,
                  clientX: a,
                  plotX: a,
                  plotY: b,
                  i: F + e,
                  percentage: r,
                }));
            };
          this.buildKDTree = Y;
          b && (C(b, this), b.pushSeries(this), O(this));
          var S = b.settings;
          b = () => {
            Q(this, "renderedCanvas");
            delete this.buildKDTree;
            this.buildKDTree();
            S.debug.timeKDTree && console.timeEnd("kd tree building");
          };
          c.renderer.forExport ||
            (S.debug.timeKDTree && console.time("kd tree building"),
            B(k ? this.data : e || q, a, b));
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
        if ((a = z(this.chart, this))) C(a, this), a.pushSeries(this);
        O(this);
      }
      function k(b, c, d) {
        function f(b) {
          const c =
            this.options.stacking &&
            ("translate" === d || "generatePoints" === d);
          this.boosted &&
          !c &&
          e(this.chart) &&
          "heatmap" !== this.type &&
          "treemap" !== this.type &&
          a[this.type] &&
          0 !== this.options.boostThreshold
            ? "render" === d && this.renderCanvas && this.renderCanvas()
            : b.call(this);
        }
        D(b, d, f);
        "translate" === d &&
          ["column", "arearange", "columnrange", "heatmap", "treemap"].forEach(
            function (a) {
              c[a] && D(c[a].prototype, d, f);
            }
          );
      }
      function K(a) {
        return this.boosted && E(this)
          ? {}
          : a.apply(this, [].slice.call(arguments, 1));
      }
      function r(b) {
        var c = this.options.data;
        const d = (a) =>
          this.forceCrop
            ? !1
            : h(this.chart) ||
              (a ? a.length : 0) >=
                (this.options.boostThreshold || Number.MAX_VALUE);
        e(this.chart) && a[this.type]
          ? ((d(c) &&
              "heatmap" !== this.type &&
              "treemap" !== this.type &&
              !this.options.stacking &&
              E(this, !0)) ||
              (b.apply(this, [].slice.call(arguments, 1)),
              (c = this.processedXData)),
            (this.boosted = d(c))
              ? (this.options.data &&
                  this.options.data.length &&
                  ((c = this.getFirstValidPoint(this.options.data)),
                  M(c) || Ca(c) || ya(12, !1, this.chart)),
                X(this))
              : ba(this))
          : b.apply(this, [].slice.call(arguments, 1));
      }
      function f(a) {
        const b = a.apply(this, [].slice.call(arguments, 1));
        return this.boost && b ? this.boost.getPoint(b) : b;
      }
      const { getBoostClipRect: q, isChartSeriesBoosting: h } = g,
        { getOptions: ma } = y,
        { doc: P, noop: Y, win: l } = u,
        {
          addEvent: ra,
          error: ya,
          extend: F,
          fireEvent: Q,
          isArray: Ca,
          isNumber: M,
          pick: ua,
          wrap: D,
        } = c,
        t = [];
      let H, R;
      return {
        compose: function (a, b, e) {
          if (c.pushUnique(t, a)) {
            ra(a, "destroy", ia);
            ra(a, "hide", J);
            const c = a.prototype;
            e && (c.renderCanvas = m);
            D(c, "getExtremes", K);
            D(c, "processData", r);
            D(c, "searchPoint", f);
            [
              "translate",
              "generatePoints",
              "drawTracker",
              "drawPoints",
              "render",
            ].forEach((a) => k(c, b, a));
          }
          if (c.pushUnique(t, ma)) {
            const a = ma().plotOptions;
            d.forEach((c) => {
              const d = a[c];
              d &&
                ((d.boostThreshold = 5e3),
                (d.boostData = []),
                (b[c].prototype.fillOpacity = !0));
            });
          }
          if (e) {
            const {
              area: a,
              areaspline: d,
              bubble: f,
              column: r,
              heatmap: h,
              scatter: q,
              treemap: g,
            } = b;
            a &&
              c.pushUnique(t, a) &&
              F(a.prototype, { fill: !0, fillOpacity: !0, sampling: !0 });
            d &&
              c.pushUnique(t, d) &&
              F(d.prototype, { fill: !0, fillOpacity: !0, sampling: !0 });
            f &&
              c.pushUnique(t, f) &&
              ((e = f.prototype),
              delete e.buildKDTree,
              D(e, "markerAttribs", function (a) {
                return this.boosted
                  ? !1
                  : a.apply(this, [].slice.call(arguments, 1));
              }));
            r &&
              c.pushUnique(t, r) &&
              F(r.prototype, { fill: !0, sampling: !0 });
            q && c.pushUnique(t, q) && (q.prototype.fill = !0);
            [h, g].forEach((a) => {
              a && c.pushUnique(t, a) && D(a.prototype, "drawPoints", wa);
            });
          }
          return a;
        },
        destroyGraphics: la,
        getPoint: b,
      };
    }
  );
  z(
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
    function (a, d, g, y, u, c, z, C) {
      const { getBoostClipRect: e, isChartSeriesBoosting: v } = a,
        { destroyGraphics: la } = d,
        { parse: B } = y,
        { doc: X, noop: ba } = u,
        { seriesTypes: E } = z,
        {
          addEvent: ia,
          extend: J,
          fireEvent: O,
          isNumber: b,
          merge: m,
          pick: wa,
          wrap: k,
        } = C;
      let K;
      return function () {
        u.seriesTypes.heatmap &&
          k(u.seriesTypes.heatmap.prototype, "drawPoints", function () {
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
        J(c.prototype, {
          getContext: function () {
            const a = this.chart,
              b = v(a) ? a : this,
              c = b === a ? a.seriesGroup : a.seriesGroup || this.group;
            let d = a.chartWidth,
              g = a.chartHeight,
              m,
              u = function (a, b, c, d, f, e, r) {
                a.call(this, c, b, d, f, e, r);
              };
            const l = (b.boost = b.boost || {});
            m = l.targetCtx;
            l.canvas ||
              ((l.canvas = X.createElement("canvas")),
              (l.target = a.renderer
                .image("", 0, 0, d, g)
                .addClass("highcharts-boost-canvas")
                .add(c)),
              (m = l.targetCtx = l.canvas.getContext("2d")),
              a.inverted &&
                ["moveTo", "lineTo", "rect", "arc"].forEach((a) => {
                  k(m, a, u);
                }),
              (l.copy = function () {
                l.target.attr({ href: l.canvas.toDataURL("image/png") });
              }),
              (l.clear = function () {
                m.clearRect(0, 0, l.canvas.width, l.canvas.height);
                b === l.target &&
                  l.target.attr({
                    href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                  });
              }),
              (l.clipRect = a.renderer.clipRect()),
              l.target.clip(l.clipRect));
            l.canvas.width !== d && (l.canvas.width = d);
            l.canvas.height !== g && (l.canvas.height = g);
            l.target.attr({
              x: 0,
              y: 0,
              width: d,
              height: g,
              style: "pointer-events: none",
              href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
            });
            l.clipRect && l.clipRect.attr(e(a, b));
            return m;
          },
          canvasToSVG: function () {
            v(this.chart)
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
              c = a.options,
              d = a.chart,
              e = this.xAxis,
              g = this.yAxis;
            var z = (d.options.boost || {}).timeRendering || !1;
            let k,
              l = 0;
            var v = a.processedXData;
            let E = a.processedYData,
              F = c.data;
            var Q = e.getExtremes();
            let X = Q.min,
              M = Q.max;
            Q = g.getExtremes();
            let ua = Q.min,
              D = Q.max,
              t = {},
              H,
              R = !!a.sampling,
              n,
              p = c.marker && c.marker.radius,
              na = this.cvsDrawPoint,
              Z = c.lineWidth ? this.cvsLineTo : void 0,
              sa = p && 1 >= p ? this.cvsMarkerSquare : this.cvsMarkerCircle,
              ja = this.cvsStrokeBatch || 1e3,
              va = !1 !== c.enableMouseTracking,
              ca;
            Q = c.threshold;
            let T = g.getThreshold(Q),
              U = b(Q),
              ta = T,
              V = this.fill,
              A = a.pointArrayMap && "low,high" === a.pointArrayMap.join(","),
              w = !!c.stacking,
              za = a.cropStart || 0;
            Q = d.options.loading;
            let G = a.requireSorting,
              W,
              da = c.connectNulls,
              ea = !v,
              xa,
              ka,
              x,
              fa,
              oa,
              L = w ? a.data : v || F,
              ha = a.fillOpacity
                ? y.parse(a.color).setOpacity(wa(c.fillOpacity, 0.75)).get()
                : a.color,
              I = function () {
                V
                  ? ((k.fillStyle = ha), k.fill())
                  : ((k.strokeStyle = a.color),
                    (k.lineWidth = c.lineWidth),
                    k.stroke());
              },
              pa = function (b, c, e, f) {
                0 === l && (k.beginPath(), Z && (k.lineJoin = "round"));
                d.scroller &&
                "highcharts-navigator-series" === a.options.className
                  ? ((c += d.scroller.top), e && (e += d.scroller.top))
                  : (c += d.plotTop);
                b += d.plotLeft;
                W
                  ? k.moveTo(b, c)
                  : na
                  ? na(k, b, c, e, ca)
                  : Z
                  ? Z(k, b, c)
                  : sa && sa.call(a, k, b, c, p, f);
                l += 1;
                l === ja && (I(), (l = 0));
                ca = { clientX: b, plotY: c, yBottom: e };
              },
              qa = "x" === c.findNearestPointBy,
              aa =
                this.xData || this.options.xData || this.processedXData || !1,
              N = function (a, b, c) {
                oa = qa ? a : a + "," + b;
                va &&
                  !t[oa] &&
                  ((t[oa] = !0),
                  d.inverted && ((a = e.len - a), (b = g.len - b)),
                  n.push({
                    x: aa ? aa[za + c] : !1,
                    clientX: a,
                    plotX: a,
                    plotY: b,
                    i: za + c,
                  }));
              };
            v = this.boost || {};
            v.target &&
              v.target.attr({
                href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
              });
            (this.points || this.graph) && la(this);
            a.plotGroup(
              "group",
              "series",
              a.visible ? "visible" : "hidden",
              c.zIndex,
              d.seriesGroup
            );
            a.markerGroup = a.group;
            ia(a, "destroy", function () {
              a.markerGroup = null;
            });
            n = this.points = [];
            k = this.getContext();
            a.buildKDTree = ba;
            v.clear && v.clear();
            this.visible &&
              (99999 < F.length &&
                ((d.options.loading = m(Q, {
                  labelStyle: {
                    backgroundColor: B("#ffffff").setOpacity(0.75).get(),
                    padding: "1em",
                    borderRadius: "0.5em",
                  },
                  style: { backgroundColor: "none", opacity: 1 },
                })),
                C.clearTimeout(K),
                d.showLoading("Drawing..."),
                (d.options.loading = Q)),
              z && console.time("canvas rendering"),
              u.eachAsync(
                L,
                function (b, c) {
                  let f,
                    h = !1,
                    r = !1,
                    q = !1,
                    l = !1,
                    n = "undefined" === typeof d.index,
                    p = !0;
                  if (!n) {
                    if (ea) {
                      var m = b[0];
                      var k = b[1];
                      L[c + 1] && (q = L[c + 1][0]);
                      L[c - 1] && (l = L[c - 1][0]);
                    } else
                      (m = b),
                        (k = E[c]),
                        L[c + 1] && (q = L[c + 1]),
                        L[c - 1] && (l = L[c - 1]);
                    q && q >= X && q <= M && (h = !0);
                    l && l >= X && l <= M && (r = !0);
                    A
                      ? (ea && (k = b.slice(1, 3)), (f = k[0]), (k = k[1]))
                      : w && ((m = b.x), (k = b.stackY), (f = k - b.y));
                    b = null === k;
                    G || (p = k >= ua && k <= D);
                    if (!b && ((m >= X && m <= M && p) || h || r))
                      if (((m = Math.round(e.toPixels(m, !0))), R)) {
                        if ("undefined" === typeof x || m === H) {
                          A || (f = k);
                          if ("undefined" === typeof fa || k > ka)
                            (ka = k), (fa = c);
                          if ("undefined" === typeof x || f < xa)
                            (xa = f), (x = c);
                        }
                        m !== H &&
                          ("undefined" !== typeof x &&
                            ((k = g.toPixels(ka, !0)),
                            (T = g.toPixels(xa, !0)),
                            pa(
                              m,
                              U ? Math.min(k, ta) : k,
                              U ? Math.max(T, ta) : T,
                              c
                            ),
                            N(m, k, fa),
                            T !== k && N(m, T, x)),
                          (x = fa = void 0),
                          (H = m));
                      } else
                        (k = Math.round(g.toPixels(k, !0))),
                          pa(m, k, T, c),
                          N(m, k, c);
                    W = b && !da;
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
                  I();
                  a.canvasToSVG();
                  z && console.timeEnd("canvas rendering");
                  O(a, "renderedCanvas");
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
        E.scatter.prototype.cvsMarkerCircle = function (a, b, c, d) {
          a.moveTo(b, c);
          a.arc(b, c, d, 0, 2 * Math.PI, !1);
        };
        E.scatter.prototype.cvsMarkerSquare = function (a, b, c, d) {
          a.rect(b - d, c - d, 2 * d, 2 * d);
        };
        E.scatter.prototype.fill = !0;
        E.bubble &&
          ((E.bubble.prototype.cvsMarkerCircle = function (a, b, c, d, e) {
            a.moveTo(b, c);
            a.arc(b, c, this.radii && this.radii[e], 0, 2 * Math.PI, !1);
          }),
          (E.bubble.prototype.cvsStrokeBatch = 1));
        J(E.area.prototype, {
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
        J(E.column.prototype, {
          cvsDrawPoint: function (a, b, c, d) {
            a.rect(b - 1, c, 1, d - c);
          },
          fill: !0,
          sampling: !0,
        });
        g.prototype.callbacks.push(function (a) {
          ia(a, "predraw", function () {
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
          ia(a, "render", function () {
            a.boost && a.boost.copy && a.boost.copy();
          });
        });
      };
    }
  );
  z(a, "masters/modules/boost-canvas.src.js", [], function () {});
});
//# sourceMappingURL=boost-canvas.js.map
