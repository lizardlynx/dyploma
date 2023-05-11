/*
 Highcharts JS v11.0.0 (2023-04-26)

 Highcharts

 (c) 2010-2023 Highsoft AS

 License: www.highcharts.com/license
*/
"use strict";
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (b) {
  var k = 0;
  return function () {
    return k < b.length ? { done: !1, value: b[k++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (b) {
  return { next: $jscomp.arrayIteratorImpl(b) };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (b, k, l) {
        if (b == Array.prototype || b == Object.prototype) return b;
        b[k] = l.value;
        return b;
      };
$jscomp.getGlobal = function (b) {
  b = [
    "object" == typeof globalThis && globalThis,
    b,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var k = 0; k < b.length; ++k) {
    var l = b[k];
    if (l && l.Math == Math) return l;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function (b, k) {
  this.$jscomp$symbol$id_ = b;
  $jscomp.defineProperty(this, "description", {
    configurable: !0,
    writable: !0,
    value: k,
  });
};
$jscomp.SymbolClass.prototype.toString = function () {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = (function () {
  function b(l) {
    if (this instanceof b) throw new TypeError("Symbol is not a constructor");
    return new $jscomp.SymbolClass(
      $jscomp.SYMBOL_PREFIX + (l || "") + "_" + k++,
      l
    );
  }
  var k = 0;
  return b;
})();
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b ||
    (b = $jscomp.global.Symbol.iterator =
      $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[b] &&
    $jscomp.defineProperty(Array.prototype, b, {
      configurable: !0,
      writable: !0,
      value: function () {
        return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
      },
    });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.initSymbolAsyncIterator = function () {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.asyncIterator;
  b ||
    (b = $jscomp.global.Symbol.asyncIterator =
      $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function () {};
};
$jscomp.iteratorPrototype = function (b) {
  $jscomp.initSymbolIterator();
  b = { next: b };
  b[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return b;
};
$jscomp.iteratorFromArray = function (b, k) {
  $jscomp.initSymbolIterator();
  b instanceof String && (b += "");
  var l = 0,
    g = {
      next: function () {
        if (l < b.length) {
          var h = l++;
          return { value: k(h, b[h]), done: !1 };
        }
        g.next = function () {
          return { done: !0, value: void 0 };
        };
        return g.next();
      },
    };
  g[Symbol.iterator] = function () {
    return g;
  };
  return g;
};
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function (b, k) {
  var l = $jscomp.propertyToPolyfillSymbol[k];
  if (null == l) return b[k];
  l = b[l];
  return void 0 !== l ? l : b[k];
};
$jscomp.polyfill = function (b, k, l, g) {
  k &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(b, k, l, g)
      : $jscomp.polyfillUnisolated(b, k, l, g));
};
$jscomp.polyfillUnisolated = function (b, k, l, g) {
  l = $jscomp.global;
  b = b.split(".");
  for (g = 0; g < b.length - 1; g++) {
    var h = b[g];
    h in l || (l[h] = {});
    l = l[h];
  }
  b = b[b.length - 1];
  g = l[b];
  k = k(g);
  k != g &&
    null != k &&
    $jscomp.defineProperty(l, b, { configurable: !0, writable: !0, value: k });
};
$jscomp.polyfillIsolated = function (b, k, l, g) {
  var h = b.split(".");
  b = 1 === h.length;
  g = h[0];
  g = !b && g in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var f = 0; f < h.length - 1; f++) {
    var e = h[f];
    e in g || (g[e] = {});
    g = g[e];
  }
  h = h[h.length - 1];
  l = $jscomp.IS_SYMBOL_NATIVE && "es6" === l ? g[h] : null;
  k = k(l);
  null != k &&
    (b
      ? $jscomp.defineProperty($jscomp.polyfills, h, {
          configurable: !0,
          writable: !0,
          value: k,
        })
      : k !== l &&
        (($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(h)
          : $jscomp.POLYFILL_PREFIX + h),
        (h = $jscomp.propertyToPolyfillSymbol[h]),
        $jscomp.defineProperty(g, h, {
          configurable: !0,
          writable: !0,
          value: k,
        })));
};
$jscomp.polyfill(
  "Array.prototype.values",
  function (b) {
    return b
      ? b
      : function () {
          return $jscomp.iteratorFromArray(this, function (b, l) {
            return l;
          });
        };
  },
  "es8",
  "es3"
);
(function (b) {
  "object" === typeof module && module.exports
    ? ((b["default"] = b), (module.exports = b))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/data-tools", ["highcharts"], function (k) {
        b(k);
        b.Highcharts = k;
        return b;
      })
    : b("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (b) {
  function k(b, g, h, f) {
    b.hasOwnProperty(g) ||
      ((b[g] = f.apply(null, h)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: g, module: b[g] },
          })
        ));
  }
  b = b ? b._modules : {};
  k(b, "Data/DataTable.js", [b["Core/Utilities.js"]], function (b) {
    const { addEvent: g, fireEvent: l, uniqueKey: f } = b;
    class e {
      static isNull(a) {
        if (a === e.NULL) return !0;
        if (a instanceof Array) {
          if (!a.length) return !1;
          for (let c = 0, d = a.length; c < d; ++c)
            if (null !== a[c]) return !1;
        } else {
          const c = Object.keys(a);
          if (!c.length) return !1;
          for (let d = 0, m = c.length; d < m; ++d)
            if (null !== a[c[d]]) return !1;
        }
        return !0;
      }
      constructor(a = {}) {
        this.aliasMap = {};
        this.autoId = !a.id;
        this.columns = {};
        this.id = a.id || f();
        this.modified = this;
        this.rowCount = 0;
        this.versionTag = f();
        var c = a.columns || {},
          d = Object.keys(c);
        const m = this.columns;
        let e = 0;
        for (let a = 0, n = d.length, b, f; a < n; ++a)
          (f = d[a]),
            (b = c[f].slice()),
            (m[f] = b),
            (e = Math.max(e, b.length));
        for (let a = 0, c = d.length; a < c; ++a) m[d[a]].length = e;
        this.rowCount = e;
        a = a.aliasMap || {};
        c = Object.keys(a);
        d = this.aliasMap;
        for (let m = 0, e = c.length, n; m < e; ++m) (n = c[m]), (d[n] = a[n]);
      }
      clone(a, c) {
        var d = {};
        this.emit({ type: "cloneTable", detail: c });
        a || ((d.aliasMap = this.aliasMap), (d.columns = this.columns));
        this.autoId || (d.id = this.id);
        d = new e(d);
        a || (d.versionTag = this.versionTag);
        this.emit({ type: "afterCloneTable", detail: c, tableClone: d });
        return d;
      }
      deleteColumnAlias(a) {
        const c = this.aliasMap[a],
          d = this.modifier;
        c &&
          (delete this.aliasMap[a],
          d && d.modifyColumns(this, { [c]: Array(this.rowCount) }, 0));
        return c;
      }
      deleteColumns(a, c) {
        const d = this.columns,
          m = {},
          e = {},
          p = this.modifier,
          x = this.rowCount;
        a = a || Object.keys(d);
        if (a.length) {
          this.emit({ type: "deleteColumns", columnNames: a, detail: c });
          for (let c = 0, n = a.length, p, b; c < n; ++c) {
            b = a[c];
            if ((p = d[b])) (m[b] = p), (e[b] = Array(x));
            delete d[b];
          }
          Object.keys(d).length || (this.rowCount = 0);
          p && p.modifyColumns(this, e, 0, c);
          this.emit({
            type: "afterDeleteColumns",
            columns: m,
            columnNames: a,
            detail: c,
          });
          return m;
        }
      }
      deleteRows(a, c = 1, d) {
        const m = [],
          e = [],
          p = this.modifier;
        this.emit({
          type: "deleteRows",
          detail: d,
          rowCount: c,
          rowIndex: a || 0,
        });
        "undefined" === typeof a && ((a = 0), (c = this.rowCount));
        if (0 < c && a < this.rowCount) {
          const d = this.columns,
            n = Object.keys(d);
          for (let p = 0, b = n.length, x, f; p < b; ++p) {
            x = d[n[p]];
            f = x.splice(a, c);
            p || (this.rowCount = x.length);
            for (let a = 0, d = f.length; a < d; ++a)
              (m[a] = m[a] || []), (m[a][p] = f[a]);
            e.push(Array(b));
          }
        }
        p && p.modifyRows(this, e, a || 0, d);
        this.emit({
          type: "afterDeleteRows",
          detail: d,
          rowCount: c,
          rowIndex: a || 0,
          rows: m,
        });
        return m;
      }
      emit(a) {
        switch (a.type) {
          case "afterDeleteColumns":
          case "afterDeleteRows":
          case "afterSetCell":
          case "afterSetColumns":
          case "afterSetRows":
            this.versionTag = f();
        }
        l(this, a.type, a);
      }
      getCell(a, c) {
        a = this.aliasMap[a] || a;
        if ((a = this.columns[a])) return a[c];
      }
      getCellAsBoolean(a, c) {
        a = this.aliasMap[a] || a;
        a = this.columns[a];
        return !(!a || !a[c]);
      }
      getCellAsNumber(a, c, d) {
        a = this.aliasMap[a] || a;
        c = (a = this.columns[a]) && a[c];
        switch (typeof c) {
          case "boolean":
            return c ? 1 : 0;
          case "number":
            return isNaN(c) && !d ? null : c;
        }
        c = parseFloat(`${c}`);
        return isNaN(c) && !d ? null : c;
      }
      getCellAsString(a, c) {
        a = this.aliasMap[a] || a;
        a = this.columns[a];
        return `${a && a[c]}`;
      }
      getColumn(a, c) {
        return this.getColumns([a], c)[a];
      }
      getColumnAliases() {
        return Object.keys(this.aliasMap);
      }
      getColumnAsNumbers(a, c) {
        var d = this.columns;
        a = this.aliasMap[a] || a;
        const m = d[a];
        d = [];
        if (m) {
          const e = m.length;
          if (c) for (c = 0; c < e; ++c) d.push(this.getCellAsNumber(a, c, !0));
          else {
            for (let a = 0, d; a < e; ++a) {
              d = m[a];
              if ("number" === typeof d) return m.slice();
              if (null !== d && "undefined" !== typeof d) break;
            }
            for (c = 0; c < e; ++c) d.push(this.getCellAsNumber(a, c));
          }
        }
        return d;
      }
      getColumnNames() {
        return Object.keys(this.columns);
      }
      getColumns(a, c) {
        const d = this.aliasMap,
          m = this.columns,
          e = {};
        a = a || Object.keys(m);
        for (let n = 0, b = a.length, f, g; n < b; ++n)
          (g = a[n]), (f = m[d[g] || g]) && (e[g] = c ? f : f.slice());
        return e;
      }
      getModifier() {
        return this.modifier;
      }
      getRow(a, c) {
        return this.getRows(a, 1, c)[0];
      }
      getRowCount() {
        return this.rowCount;
      }
      getRowIndexBy(a, c, d) {
        a = this.aliasMap[a] || a;
        if ((a = this.columns[a]))
          if (((c = a.indexOf(c, d)), -1 !== c)) return c;
      }
      getRowObject(a, c) {
        return this.getRowObjects(a, 1, c)[0];
      }
      getRowObjects(a = 0, c = this.rowCount - a, d) {
        const m = this.aliasMap,
          e = this.columns,
          p = Array(c);
        d = d || Object.keys(e);
        for (
          let n = a, b = 0, f = Math.min(this.rowCount, a + c), g, r;
          n < f;
          ++n, ++b
        ) {
          r = p[b] = {};
          for (const a of d) (g = e[m[a] || a]), (r[a] = g ? g[n] : void 0);
        }
        return p;
      }
      getRows(a = 0, c = this.rowCount - a, d) {
        const m = this.aliasMap,
          e = this.columns,
          p = Array(c);
        d = d || Object.keys(e);
        for (
          let n = a, b = 0, f = Math.min(this.rowCount, a + c), g, r;
          n < f;
          ++n, ++b
        ) {
          r = p[b] = [];
          for (const a of d) (g = e[m[a] || a]), r.push(g ? g[n] : void 0);
        }
        return p;
      }
      getVersionTag() {
        return this.versionTag;
      }
      hasColumns(a) {
        const c = this.aliasMap,
          d = this.columns;
        for (let m = 0, e = a.length, p; m < e; ++m)
          if (((p = a[m]), !d[p] && !c[p])) return !1;
        return !0;
      }
      hasRowWith(a, c) {
        a = this.aliasMap[a] || a;
        return (a = this.columns[a]) ? -1 !== a.indexOf(c) : !1;
      }
      on(a, c) {
        return g(this, a, c);
      }
      renameColumn(a, c) {
        const d = this.columns;
        if (d[a]) {
          if (a !== c) {
            const m = this.aliasMap;
            m[c] && delete m[c];
            d[c] = d[a];
            delete d[a];
          }
          return !0;
        }
        return !1;
      }
      setCell(a, c, d, m) {
        const e = this.columns,
          p = this.modifier;
        a = this.aliasMap[a] || a;
        let b = e[a];
        (b && b[c] === d) ||
          (this.emit({
            type: "setCell",
            cellValue: d,
            columnName: a,
            detail: m,
            rowIndex: c,
          }),
          b || (b = e[a] = Array(this.rowCount)),
          c >= this.rowCount && (this.rowCount = c + 1),
          (b[c] = d),
          p && p.modifyCell(this, a, c, d),
          this.emit({
            type: "afterSetCell",
            cellValue: d,
            columnName: a,
            detail: m,
            rowIndex: c,
          }));
      }
      setColumn(a, c = [], d = 0, e) {
        this.setColumns({ [a]: c }, d, e);
      }
      setColumnAlias(a, c) {
        const d = this.aliasMap;
        return d[a] ? !1 : ((d[a] = c), !0);
      }
      setColumns(a, c, d) {
        const e = this.columns,
          n = this.modifier;
        var b = "undefined" === typeof c;
        const f = Object.keys(a);
        this.emit({
          type: "setColumns",
          columns: a,
          columnNames: f,
          detail: d,
          rowIndex: c,
        });
        for (let d = 0, m = f.length, n, p; d < m; ++d)
          if (((p = f[d]), (n = a[p]), (p = this.aliasMap[p] || p), b))
            (e[p] = n.slice()), (this.rowCount = n.length);
          else {
            const a = e[p] ? e[p] : (e[p] = Array(this.rowCount));
            for (let d = c || 0, e = n.length; d < e; ++d) a[d] = n[d];
            this.rowCount = Math.max(this.rowCount, a.length);
          }
        b = Object.keys(e);
        for (let a = 0, d = b.length; a < d; ++a)
          e[b[a]].length = this.rowCount;
        n && n.modifyColumns(this, a, c || 0);
        this.emit({
          type: "afterSetColumns",
          columns: a,
          columnNames: f,
          detail: d,
          rowIndex: c,
        });
      }
      setModifier(a, c) {
        const d = this;
        d.emit({
          type: "setModifier",
          detail: c,
          modifier: a,
          modified: d.modified,
        });
        d.modified = d;
        d.modifier = a;
        return (a ? a.modify(d) : Promise.resolve(d))
          .then((d) => {
            d.emit({
              type: "afterSetModifier",
              detail: c,
              modifier: a,
              modified: d.modified,
            });
            return d;
          })
          ["catch"]((c) => {
            d.emit({
              type: "setModifierError",
              error: c,
              modifier: a,
              modified: d.modified,
            });
            throw c;
          });
      }
      setRow(a, c, d) {
        this.setRows([a], c, d);
      }
      setRows(a, c = this.rowCount, d) {
        var m = this.aliasMap;
        const n = this.columns,
          b = Object.keys(n),
          f = this.modifier,
          g = a.length;
        this.emit({
          type: "setRows",
          detail: d,
          rowCount: g,
          rowIndex: c,
          rows: a,
        });
        for (let d = 0, p = c, f; d < g; ++d, ++p)
          if (((f = a[d]), f === e.NULL))
            for (let a = 0, d = b.length; a < d; ++a) n[b[a]][p] = null;
          else if (f instanceof Array)
            for (let a = 0, d = b.length; a < d; ++a) n[b[a]][p] = f[a];
          else {
            const a = Object.keys(f);
            for (let d = 0, c = a.length, e; d < c; ++d)
              (e = a[d]),
                (e = m[e] || e),
                n[e] || (n[e] = Array(p + 1)),
                (n[e][p] = f[e]);
          }
        m = c + g;
        if (m > this.rowCount) {
          this.rowCount = m;
          for (let a = 0, d = b.length; a < d; ++a) n[b[a]].length = m;
        }
        f && f.modifyRows(this, a, c);
        this.emit({
          type: "afterSetRows",
          detail: d,
          rowCount: g,
          rowIndex: c,
          rows: a,
        });
      }
    }
    e.NULL = {};
    ("");
    return e;
  });
  k(
    b,
    "Data/Connectors/DataConnector.js",
    [b["Data/DataTable.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { addEvent: l, fireEvent: f, merge: e, pick: a } = g;
      class c {
        constructor(a = {}) {
          this.table = new b(a.dataTable);
          this.metadata = a.metadata || { columns: {} };
        }
        describeColumn(a, c) {
          const d = this.metadata.columns;
          d[a] = e(d[a] || {}, c);
        }
        describeColumns(a) {
          const d = Object.keys(a);
          let c;
          for (; "string" === typeof (c = d.pop()); )
            this.describeColumn(c, a[c]);
        }
        emit(a) {
          f(this, a.type, a);
        }
        getColumnOrder(d) {
          const c = this.metadata.columns;
          d = Object.keys(c || {});
          if (d.length)
            return d.sort((d, e) => a(c[d].index, 0) - a(c[e].index, 0));
        }
        getSortedColumns(a) {
          return this.table.getColumns(this.getColumnOrder(a));
        }
        load() {
          f(this, "afterLoad", { table: this.table });
          return Promise.resolve(this);
        }
        on(a, c) {
          return l(this, a, c);
        }
        save() {
          f(this, "saveError", { table: this.table });
          return Promise.reject(Error("Not implemented"));
        }
        setColumnOrder(a) {
          for (let d = 0, c = a.length; d < c; ++d)
            this.describeColumn(a[d], { index: d });
        }
        startPolling(a = 1e3) {
          const d = this;
          window.clearTimeout(d.polling);
          d.polling = window.setTimeout(
            () =>
              d
                .load()
                ["catch"]((a) =>
                  d.emit({ type: "loadError", error: a, table: d.table })
                )
                .then(() => {
                  d.polling && d.startPolling(a);
                }),
            a
          );
        }
        stopPolling() {
          window.clearTimeout(this.polling);
          delete this.polling;
        }
        whatIs(a) {
          return this.metadata.columns[a];
        }
      }
      (function (a) {
        a.types = {};
        a.registerType = function (d, c) {
          return !!d && !a.types[d] && !!(a.types[d] = c);
        };
      })(c || (c = {}));
      return c;
    }
  );
  k(
    b,
    "Data/Converters/DataConverter.js",
    [b["Data/DataTable.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { addEvent: l, fireEvent: f, isNumber: e, merge: a } = g;
      class c {
        constructor(d) {
          this.dateFormats = {
            "YYYY/mm/dd": {
              regex: /^([0-9]{4})([\-\.\/])([0-9]{1,2})\2([0-9]{1,2})$/,
              parser: function (a) {
                return a ? Date.UTC(+a[1], a[3] - 1, +a[4]) : NaN;
              },
            },
            "dd/mm/YYYY": {
              regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
              parser: function (a) {
                return a ? Date.UTC(+a[4], a[3] - 1, +a[1]) : NaN;
              },
              alternative: "mm/dd/YYYY",
            },
            "mm/dd/YYYY": {
              regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
              parser: function (a) {
                return a ? Date.UTC(+a[4], a[1] - 1, +a[3]) : NaN;
              },
            },
            "dd/mm/YY": {
              regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
              parser: function (a) {
                if (!a) return NaN;
                let d = +a[4];
                d = d > new Date().getFullYear() - 2e3 ? d + 1900 : d + 2e3;
                return Date.UTC(d, a[3] - 1, +a[1]);
              },
              alternative: "mm/dd/YY",
            },
            "mm/dd/YY": {
              regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
              parser: function (a) {
                return a ? Date.UTC(+a[4] + 2e3, a[1] - 1, +a[3]) : NaN;
              },
            },
          };
          d = a(c.defaultOptions, d);
          let e = d.decimalPoint;
          if ("." === e || "," === e)
            this.decimalRegExp = new RegExp(
              "^(-?[0-9]+)" + ("." === e ? "\\." : ",") + "([0-9]+)$"
            );
          this.options = d;
        }
        asBoolean(a) {
          return "boolean" === typeof a
            ? a
            : "string" === typeof a
            ? "" !== a && "0" !== a && "false" !== a
            : !!this.asNumber(a);
        }
        asDate(a) {
          if ("string" === typeof a) a = this.parseDate(a);
          else if ("number" !== typeof a) {
            if (a instanceof Date) return a;
            a = this.parseDate(this.asString(a));
          }
          return new Date(a);
        }
        asGuessedType(a) {
          return {
            number: this.asNumber,
            Date: this.asDate,
            string: this.asString,
          }[this.guessType(a)].call(this, a);
        }
        asNumber(a) {
          if ("number" === typeof a) return a;
          if ("boolean" === typeof a) return a ? 1 : 0;
          if ("string" === typeof a) {
            const d = this.decimalRegExp;
            -1 < a.indexOf(" ") && (a = a.replace(/\s+/g, ""));
            if (d) {
              if (!d.test(a)) return NaN;
              a = a.replace(d, "$1.$2");
            }
            return parseFloat(a);
          }
          return a instanceof Date ? a.getDate() : a ? a.getRowCount() : NaN;
        }
        asString(a) {
          return "" + a;
        }
        deduceDateFormat(a, c, e) {
          const d = [],
            m = [];
          let n = "YYYY/mm/dd",
            b,
            f = [],
            g = 0,
            l = !1,
            h,
            q;
          if (!c || c > a.length) c = a.length;
          for (; g < c; g++)
            if ("undefined" !== typeof a[g] && a[g] && a[g].length)
              for (
                b = a[g]
                  .trim()
                  .replace(/[-\.\/]/g, " ")
                  .split(" "),
                  f = ["", "", ""],
                  q = 0;
                q < b.length;
                q++
              )
                q < f.length &&
                  (h = parseInt(b[q], 10)) &&
                  ((m[q] = !m[q] || m[q] < h ? h : m[q]),
                  "undefined" !== typeof d[q]
                    ? d[q] !== h && (d[q] = !1)
                    : (d[q] = h),
                  31 < h
                    ? (f[q] = 100 > h ? "YY" : "YYYY")
                    : 12 < h && 31 >= h
                    ? ((f[q] = "dd"), (l = !0))
                    : f[q].length || (f[q] = "mm"));
          if (l) {
            for (q = 0; q < d.length; q++)
              !1 !== d[q]
                ? 12 < m[q] && "YY" !== f[q] && "YYYY" !== f[q] && (f[q] = "YY")
                : 12 < m[q] && "mm" === f[q] && (f[q] = "dd");
            3 === f.length && "dd" === f[1] && "dd" === f[2] && (f[2] = "YY");
            n = f.join("/");
          }
          e && (this.options.dateFormat = n);
          return n;
        }
        emit(a) {
          f(this, a.type, a);
        }
        export(a, c) {
          this.emit({ type: "exportError", columns: [], headers: [] });
          throw Error("Not implemented");
        }
        getTable() {
          throw Error("Not implemented");
        }
        guessType(a) {
          var c = "string";
          if ("string" === typeof a) {
            var d = this.trim(`${a}`),
              b = this.decimalRegExp;
            d = this.trim(d, !0);
            b && (d = b.test(d) ? d.replace(b, "$1.$2") : "");
            b = parseFloat(d);
            +d === b
              ? (a = b)
              : ((c = this.parseDate(a)), (c = e(c) ? "Date" : "string"));
          }
          "number" === typeof a && (c = 31536e6 < a ? "Date" : "number");
          return c;
        }
        on(a, c) {
          return l(this, a, c);
        }
        parse(a) {
          this.emit({ type: "parseError", columns: [], headers: [] });
          throw Error("Not implemented");
        }
        parseDate(a, c) {
          var d = this.options;
          let m = c || d.dateFormat;
          c = NaN;
          let b, f;
          if (d.parseDate) c = d.parseDate(a);
          else {
            if (m)
              (d = this.dateFormats[m]) || (d = this.dateFormats["YYYY/mm/dd"]),
                (f = a.match(d.regex)) && (c = d.parser(f));
            else
              for (b in this.dateFormats)
                if (((d = this.dateFormats[b]), (f = a.match(d.regex)))) {
                  c = d.parser(f);
                  break;
                }
            f ||
              ((f = Date.parse(a)),
              "object" === typeof f && null !== f && f.getTime
                ? (c = f.getTime() - 6e4 * f.getTimezoneOffset())
                : e(f) &&
                  ((c = f - 6e4 * new Date(f).getTimezoneOffset()),
                  -1 === a.indexOf("2001") &&
                    2001 === new Date(c).getFullYear() &&
                    (c = NaN)));
          }
          return c;
        }
        trim(a, c) {
          "string" === typeof a &&
            ((a = a.replace(/^\s+|\s+$/g, "")),
            c && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")));
          return a;
        }
      }
      c.defaultOptions = {
        dateFormat: "",
        alternativeFormat: "",
        startColumn: 0,
        endColumn: Number.MAX_VALUE,
        startRow: 0,
        endRow: Number.MAX_VALUE,
        firstRowAsNames: !0,
        switchRowsAndColumns: !1,
      };
      (function (a) {
        a.getTableFromColumns = function (a = [], c = []) {
          const d = new b();
          for (let e = 0, m = Math.max(c.length, a.length); e < m; ++e)
            d.setColumn(c[e] || `${e}`, a[e]);
          return d;
        };
      })(c || (c = {}));
      return c;
    }
  );
  k(b, "Data/DataCursor.js", [], function () {
    class b {
      constructor(b = {}) {
        this.emittingRegister = [];
        this.listenerMap = {};
        this.stateMap = b;
      }
      addListener(b, h, f) {
        b = this.listenerMap[b] = this.listenerMap[b] || {};
        (b[h] = b[h] || []).push(f);
        return this;
      }
      buildEmittingTag(b) {
        return (
          "position" === b.cursor.type
            ? [
                b.table.id,
                b.cursor.column,
                b.cursor.row,
                b.cursor.state,
                b.cursor.type,
              ]
            : [
                b.table.id,
                b.cursor.columns,
                b.cursor.firstRow,
                b.cursor.lastRow,
                b.cursor.state,
                b.cursor.type,
              ]
        ).join("\x00");
      }
      emitCursor(g, h, f, e) {
        var a = g.id,
          c = h.state;
        if ((c = this.listenerMap[a] && this.listenerMap[a][c])) {
          a = this.stateMap[a] = this.stateMap[a] || {};
          let d = a[h.state];
          e &&
            (d || (d = a[h.state] = []), -1 === b.getIndex(h, d) && d.push(h));
          g = { cursor: h, cursors: d || [], table: g };
          f && (g.event = f);
          f = this.emittingRegister;
          h = this.buildEmittingTag(g);
          if (0 <= f.indexOf(h)) return this;
          try {
            this.emittingRegister.push(h);
            for (let a = 0, d = c.length; a < d; ++a) c[a].call(this, g);
          } finally {
            (c = this.emittingRegister.indexOf(h)),
              0 <= c && this.emittingRegister.splice(c, 1);
          }
        }
        return this;
      }
      remitCursor(g, h) {
        if ((g = this.stateMap[g] && this.stateMap[g][h.state]))
          (h = b.getIndex(h, g)), 0 <= h && g.splice(h, 1);
        return this;
      }
      removeListener(b, h, f) {
        (b = this.listenerMap[b] && this.listenerMap[b][h]) &&
          (f = b.indexOf(f)) &&
          b.splice(f, 1);
        return this;
      }
    }
    (function (b) {
      function g(b, e) {
        var a, c, d, m;
        if ("range" === b.type) return b;
        e = {
          type: "range",
          firstRow:
            null !==
              (c =
                null !== (a = b.row) && void 0 !== a ? a : e && e.firstRow) &&
            void 0 !== c
              ? c
              : 0,
          lastRow:
            null !==
              (m = null !== (d = b.row) && void 0 !== d ? d : e && e.lastRow) &&
            void 0 !== m
              ? m
              : Number.MAX_VALUE,
          state: b.state,
        };
        "undefined" !== typeof b.column && (e.columns = [b.column]);
        return e;
      }
      b.getIndex = function (b, e) {
        if ("position" === b.type)
          for (let a, c = 0, d = e.length; c < d; ++c) {
            if (
              ((a = e[c]),
              "position" === a.type &&
                a.state === b.state &&
                a.column === b.column &&
                a.row === b.row)
            )
              return c;
          }
        else {
          const a = JSON.stringify(b.columns);
          for (let c, d = 0, m = e.length; d < m; ++d)
            if (
              ((c = e[d]),
              "range" === c.type &&
                c.state === b.state &&
                c.firstRow === b.firstRow &&
                c.lastRow === b.lastRow &&
                JSON.stringify(c.columns) === a)
            )
              return d;
        }
        return -1;
      };
      b.isEqual = function (b, e) {
        return "position" === b.type && "position" === e.type
          ? b.column === e.column && b.row === e.row && b.state === e.state
          : "range" === b.type && "range" === e.type
          ? b.firstRow === e.firstRow &&
            b.lastRow === e.lastRow &&
            JSON.stringify(b.columns) === JSON.stringify(e.columns)
          : !1;
      };
      b.isInRange = function (b, e) {
        "position" === e.type && (e = g(e));
        "position" === b.type && (b = g(b, e));
        const a = b.columns,
          c = e.columns;
        return (
          b.firstRow >= e.firstRow &&
          b.lastRow <= e.lastRow &&
          (!a || !c || a.every((a) => 0 <= c.indexOf(a)))
        );
      };
      b.toPositions = function (b) {
        if ("position" === b.type) return [b];
        const e = b.columns || [],
          a = [],
          c = b.state;
        for (let d = b.firstRow, m = b.lastRow; d < m; ++d)
          if (e.length)
            for (let b = 0, m = e.length; b < m; ++b)
              a.push({ type: "position", column: e[b], row: d, state: c });
          else a.push({ type: "position", row: d, state: c });
        return a;
      };
      b.toRange = g;
    })(b || (b = {}));
    ("");
    return b;
  });
  k(
    b,
    "Data/Modifiers/DataModifier.js",
    [b["Core/Utilities.js"]],
    function (b) {
      const { addEvent: g, fireEvent: l, merge: f } = b;
      class e {
        benchmark(a, c) {
          const d = [],
            e = this,
            b = () => {
              e.modifyTable(a);
              e.emit({ type: "afterBenchmarkIteration" });
            },
            { iterations: p } = f({ iterations: 1 }, c);
          e.on("afterBenchmarkIteration", () => {
            d.length === p
              ? e.emit({ type: "afterBenchmark", results: d })
              : b();
          });
          var g = 0,
            l = 0;
          e.on("modify", () => {
            g = window.performance.now();
          });
          e.on("afterModify", () => {
            l = window.performance.now();
            d.push(l - g);
          });
          b();
          return d;
        }
        emit(a) {
          l(this, a.type, a);
        }
        modify(a, c) {
          const d = this;
          return new Promise((e, b) => {
            a.modified === a && (a.modified = a.clone(!1, c));
            try {
              e(d.modifyTable(a, c));
            } catch (p) {
              d.emit({ type: "error", detail: c, table: a }), b(p);
            }
          });
        }
        modifyCell(a, c, d, e, b) {
          return this.modifyTable(a);
        }
        modifyColumns(a, c, d, e) {
          return this.modifyTable(a);
        }
        modifyRows(a, c, d, e) {
          return this.modifyTable(a);
        }
        on(a, c) {
          return g(this, a, c);
        }
      }
      (function (a) {
        a.types = {};
        a.registerType = function (c, d) {
          return !!c && !a.types[c] && !!(a.types[c] = d);
        };
      })(e || (e = {}));
      return e;
    }
  );
  k(b, "Data/DataPoolDefaults.js", [], function () {
    return { connectors: [] };
  });
  k(
    b,
    "Data/DataPool.js",
    [b["Data/DataPoolDefaults.js"], b["Data/Connectors/DataConnector.js"]],
    function (b, g) {
      class l {
        constructor(f = b) {
          f.connectors = f.connectors || [];
          this.options = f;
          this.connectors = {};
        }
        getConnector(b) {
          var e = this.connectors[b];
          if (e) return Promise.resolve(e);
          if ((e = this.getConnectorOptions(b))) return this.loadConnector(e);
          throw Error(`Connector not found. (${b})`);
        }
        getConnectorOptions(b) {
          const e = this.options.connectors;
          for (let a = 0, c = e.length; a < c; ++a)
            if (e[a].name === b) return e[a];
        }
        getConnectorTable(b) {
          return this.getConnector(b).then((e) => e.table);
        }
        loadConnector(b) {
          return new Promise((e, a) => {
            var c = g.types[b.type];
            if (!c) throw Error(`Connector type not found. (${b.type})`);
            c = new c(b.options);
            this.connectors[b.name] = c;
            c.load().then(e)["catch"](a);
          });
        }
        setConnectorOptions(b) {
          const e = this.options.connectors;
          for (let a = 0, c = e.length; a < c; ++a)
            if (e[a].name === b.name) {
              e.splice(a, 1, b);
              return;
            }
          e.push(b);
        }
      }
      return l;
    }
  );
  k(
    b,
    "Data/Converters/CSVConverter.js",
    [b["Data/Converters/DataConverter.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { merge: l } = g;
      class f extends b {
        constructor(e) {
          e = l(f.defaultOptions, e);
          super(e);
          this.columns = [];
          this.headers = [];
          this.dataTypes = [];
          this.options = e;
        }
        export(e, a = this.options) {
          const { useLocalDecimalPoint: c, lineDelimiter: d } = a;
          var b = !1 !== this.options.firstRowAsNames;
          let { decimalPoint: n, itemDelimiter: p } = a;
          n || (n = "," !== p && c ? (1.1).toLocaleString()[1] : ".");
          p || (p = "," === n ? ";" : ",");
          a = e.getSortedColumns(a.usePresentationOrder);
          const f = Object.keys(a),
            g = [],
            l = f.length,
            h = [];
          b && g.push(f.map((a) => `"${a}"`).join(p));
          for (b = 0; b < l; b++) {
            var r = f[b];
            const c = a[r],
              d = c.length;
            r = e.whatIs(r);
            let m;
            r && (m = r.dataType);
            for (r = 0; r < d; r++) {
              var k = c[r];
              h[r] || (h[r] = []);
              "string" === m
                ? (k = '"' + k + '"')
                : "number" === typeof k
                ? (k = String(k).replace(".", n))
                : "string" === typeof k && (k = `"${k}"`);
              h[r][b] = k;
              if (b === l - 1) {
                for (k = b; 2 < h[r].length && void 0 === h[r][k]; )
                  h[r].pop(), k--;
                g.push(h[r].join(p));
              }
            }
          }
          return g.join(d);
        }
        parse(e, a) {
          var c = this.dataTypes;
          e = l(this.options, e);
          const {
            beforeParse: d,
            lineDelimiter: b,
            firstRowAsNames: n,
            itemDelimiter: p,
          } = e;
          let { csv: f, startRow: g, endRow: h } = e;
          this.columns = [];
          this.emit({
            type: "parse",
            columns: this.columns,
            detail: a,
            headers: this.headers,
          });
          f && d && (f = d(f));
          if (f) {
            e = f.replace(/\r\n|\r/g, "\n").split(b || "\n");
            if (!g || 0 > g) g = 0;
            if (!h || h >= e.length) h = e.length - 1;
            p || (this.guessedItemDelimiter = this.guessDelimiter(e));
            if (n) {
              var k = e[0].split(p || this.guessedItemDelimiter || ",");
              for (var r = 0; r < k.length; r++)
                k[r] = k[r].replace(/^["']|["']$/g, "");
              this.headers = k;
              g++;
            }
            r = 0;
            for (k = g; k <= h; k++)
              "#" === e[k][0] ? r++ : this.parseCSVRow(e[k], k - g - r);
            c.length &&
              c[0].length &&
              "date" === c[0][1] &&
              !this.options.dateFormat &&
              this.deduceDateFormat(this.columns[0], null, !0);
            for (let a = 0, d = this.columns.length; a < d; ++a) {
              c = this.columns[a];
              for (let d = 0, b = c.length; d < b; ++d)
                c[d] &&
                  "string" === typeof c[d] &&
                  ((e = this.asGuessedType(c[d])),
                  e instanceof Date && (e = e.getTime()),
                  (this.columns[a][d] = e));
            }
          }
          this.emit({
            type: "afterParse",
            columns: this.columns,
            detail: a,
            headers: this.headers,
          });
        }
        parseCSVRow(b, a) {
          const c = this,
            d = c.columns || [],
            e = c.dataTypes,
            { startColumn: n, endColumn: f } = c.options,
            g = c.options.itemDelimiter || c.guessedItemDelimiter;
          let { decimalPoint: l } = c.options;
          (l && l !== g) || (l = c.guessedDecimalPoint || ".");
          let h = 0,
            k = "",
            r = "",
            u = "",
            t = "",
            q = 0,
            w = 0;
          const A = (a) => {
              k = b[a];
              r = b[a - 1];
              u = b[a + 1];
            },
            z = (a) => {
              e.length < w + 1 && e.push([a]);
              e[w][e[w].length - 1] !== a && e[w].push(a);
            },
            B = () => {
              if (n > q || q > f) ++q, (t = "");
              else {
                "string" === typeof t
                  ? !isNaN(parseFloat(t)) && isFinite(t)
                    ? ((t = parseFloat(t)), z("number"))
                    : isNaN(Date.parse(t))
                    ? z("string")
                    : ((t = t.replace(/\//g, "-")), z("date"))
                  : z("number");
                d.length < w + 1 && d.push([]);
                if ("number" !== typeof t && "number" !== c.guessType(t) && l) {
                  const a = t;
                  t = t.replace(l, ".");
                  "number" !== c.guessType(t) && (t = a);
                }
                d[w][a] = t;
                t = "";
                ++w;
                ++q;
              }
            };
          if (b.trim().length && "#" !== b.trim()[0]) {
            for (; h < b.length; h++) {
              A(h);
              if (
                "#" === k &&
                !/^#[0-F]{3,3}|[0-F]{6,6}/i.test(b.substring(h))
              ) {
                B();
                return;
              }
              if ('"' === k)
                for (
                  A(++h);
                  h < b.length && ('"' !== k || '"' === r || '"' === u);

                ) {
                  if ('"' !== k || ('"' === k && '"' !== r)) t += k;
                  A(++h);
                }
              else k === g ? B() : (t += k);
            }
            B();
          }
        }
        guessDelimiter(b) {
          let a = 0,
            c = 0;
          const d = { ",": 0, ";": 0, "\t": 0 },
            e = b.length;
          for (let m = 0; m < e; m++) {
            let e = !1,
              n,
              f,
              g,
              l = "";
            if (13 < m) break;
            const h = b[m];
            for (let b = 0; b < h.length; b++) {
              n = h[b];
              f = h[b + 1];
              g = h[b - 1];
              if ("#" === n) break;
              if ('"' === n)
                if (e) {
                  if ('"' !== g && '"' !== f) {
                    for (; " " === f && b < h.length; ) f = h[++b];
                    "undefined" !== typeof d[f] && d[f]++;
                    e = !1;
                  }
                } else e = !0;
              else
                "undefined" !== typeof d[n]
                  ? ((l = l.trim()),
                    isNaN(Date.parse(l))
                      ? (!isNaN(Number(l)) && isFinite(Number(l))) || d[n]++
                      : d[n]++,
                    (l = ""))
                  : (l += n);
              "," === n && c++;
              "." === n && a++;
            }
          }
          b = d[";"] > d[","] ? ";" : ",";
          this.guessedDecimalPoint = a > c ? "." : ",";
          return b;
        }
        getTable() {
          return b.getTableFromColumns(this.columns, this.headers);
        }
      }
      f.defaultOptions = Object.assign(Object.assign({}, b.defaultOptions), {
        lineDelimiter: "\n",
      });
      return f;
    }
  );
  k(
    b,
    "Data/Connectors/CSVConnector.js",
    [
      b["Data/Converters/CSVConverter.js"],
      b["Data/Connectors/DataConnector.js"],
      b["Core/Utilities.js"],
    ],
    function (b, g, h) {
      const { merge: f } = h;
      class e extends g {
        constructor(a) {
          a = f(e.defaultOptions, a);
          super(a);
          this.converter = new b(a);
          this.options = a;
          a.enablePolling &&
            this.startPolling(1e3 * Math.max(a.dataRefreshRate || 0, 1));
        }
        load(a) {
          const c = this,
            d = c.converter,
            b = c.table,
            { csv: e, csvURL: f } = c.options;
          if (e)
            b.deleteRows(),
              c.emit({ type: "load", csv: e, detail: a, table: b }),
              d.parse({ csv: e }),
              b.setColumns(d.getTable().getColumns()),
              c.emit({ type: "afterLoad", csv: e, detail: a, table: b });
          else {
            if (f)
              return (
                c.table.deleteColumns(),
                c.emit({ type: "load", detail: a, table: c.table }),
                fetch(f || "")
                  .then((d) =>
                    d.text().then((d) => {
                      c.converter.parse({ csv: d });
                      c.table.setColumns(c.converter.getTable().getColumns());
                      c.emit({
                        type: "afterLoad",
                        csv: d,
                        detail: a,
                        table: c.table,
                      });
                    })
                  )
                  ["catch"]((d) => {
                    c.emit({
                      type: "loadError",
                      detail: a,
                      error: d,
                      table: c.table,
                    });
                    return Promise.reject(d);
                  })
                  .then(() => c)
              );
            c.emit({
              type: "loadError",
              detail: a,
              error: "Unable to load: no CSV string or URL was provided",
              table: b,
            });
          }
          return Promise.resolve(c);
        }
      }
      e.defaultOptions = {
        csv: "",
        csvURL: "",
        enablePolling: !1,
        dataRefreshRate: 1,
      };
      g.registerType("CSV", e);
      return e;
    }
  );
  k(
    b,
    "Data/Converters/GoogleSheetsConverter.js",
    [b["Data/Converters/DataConverter.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { merge: h, uniqueKey: f } = g;
      class e extends b {
        constructor(a) {
          a = h(e.defaultOptions, a);
          super(a);
          this.columns = [];
          this.header = [];
          this.options = a;
        }
        parse(a, c) {
          a = h(this.options, a);
          const d = ((a.json && a.json.values) || []).map((a) => a.slice());
          if (0 === d.length) return !1;
          this.header = [];
          this.columns = [];
          this.emit({
            type: "parse",
            columns: this.columns,
            detail: c,
            headers: this.header,
          });
          this.columns = d;
          let b;
          for (let c = 0, e = d.length; c < e; c++) {
            b = d[c];
            this.header[c] = a.firstRowAsNames ? `${b.shift()}` : f();
            for (let a = 0, d = b.length; a < d; ++a)
              if (b[a] && "string" === typeof b[a]) {
                let d = this.asGuessedType(b[a]);
                d instanceof Date && (d = d.getTime());
                this.columns[c][a] = d;
              }
          }
          this.emit({
            type: "afterParse",
            columns: this.columns,
            detail: c,
            headers: this.header,
          });
        }
        getTable() {
          return b.getTableFromColumns(this.columns, this.header);
        }
      }
      e.defaultOptions = Object.assign({}, b.defaultOptions);
      return e;
    }
  );
  k(
    b,
    "Data/Connectors/GoogleSheetsConnector.js",
    [
      b["Data/Connectors/DataConnector.js"],
      b["Data/Converters/GoogleSheetsConverter.js"],
      b["Core/Utilities.js"],
    ],
    function (b, g, h) {
      const { merge: f, pick: e } = h;
      class a extends b {
        constructor(c) {
          c = f(a.defaultOptions, c);
          super(c);
          this.converter = new g(c);
          this.options = c;
        }
        load(c) {
          const d = this,
            {
              dataRefreshRate: b,
              enablePolling: e,
              firstRowAsNames: f,
              googleAPIKey: g,
              googleSpreadsheetKey: h,
            } = d.options,
            l = a.buildFetchURL(g, h, d.options);
          d.table.deleteColumns();
          d.emit({ type: "load", detail: c, table: d.table, url: l });
          return fetch(l)
            .then((a) =>
              a.json().then((a) => {
                if (
                  "object" === typeof a &&
                  a &&
                  "object" === typeof a.error &&
                  a.error &&
                  "number" === typeof a.error.code &&
                  "string" === typeof a.error.message &&
                  "string" === typeof a.error.status
                )
                  throw Error(a.error.message);
                d.converter.parse({ firstRowAsNames: f, json: a });
                d.table.setColumns(d.converter.getTable().getColumns());
                d.emit({
                  type: "afterLoad",
                  detail: c,
                  table: d.table,
                  url: l,
                });
                e && setTimeout(() => d.load(), 1e3 * Math.max(b || 0, 1));
              })
            )
            ["catch"]((a) => {
              d.emit({
                type: "loadError",
                detail: c,
                error: a,
                table: d.table,
              });
              return Promise.reject(a);
            })
            .then(() => d);
        }
      }
      a.defaultOptions = {
        googleAPIKey: "",
        googleSpreadsheetKey: "",
        worksheet: 1,
        enablePolling: !1,
        dataRefreshRate: 2,
        firstRowAsNames: !0,
      };
      (function (a) {
        function c(a = {}) {
          const {
            endColumn: c,
            endRow: d,
            googleSpreadsheetRange: b,
            startColumn: m,
            startRow: f,
          } = a;
          return (
            b ||
            ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[m || 0] || "A") +
              (Math.max(f || 0, 0) + 1) +
              ":" +
              ("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[e(c, 25)] || "Z") +
              (d ? Math.max(d, 0) : "Z")
          );
        }
        a.buildFetchURL = function (a, d, b = {}) {
          return (
            `https://sheets.googleapis.com/v4/spreadsheets/${d}/values/` +
            (b.onlyColumnNames ? "A1:Z1" : c(b)) +
            "?alt=json" +
            (b.onlyColumnNames
              ? ""
              : "&dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&valueRenderOption=UNFORMATTED_VALUE") +
            "&prettyPrint=false" +
            `&key=${a}`
          );
        };
        a.buildQueryRange = c;
      })(a || (a = {}));
      b.registerType("GoogleSheets", a);
      return a;
    }
  );
  k(
    b,
    "Data/Converters/HTMLTableConverter.js",
    [b["Data/Converters/DataConverter.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { merge: h } = g;
      class f extends b {
        constructor(b) {
          b = h(f.defaultOptions, b);
          super(b);
          this.columns = [];
          this.headers = [];
          this.options = b;
          b.tableElement &&
            ((this.tableElement = b.tableElement),
            (this.tableElementID = b.tableElement.id));
        }
        export(b, a = this.options) {
          var c = !1 !== a.firstRowAsNames,
            d = a.useMultiLevelHeaders,
            e = b.getSortedColumns(a.usePresentationOrder);
          const f = Object.keys(e);
          b = [];
          const g = f.length,
            h = [];
          var l = "";
          if (c)
            if (((l = []), d)) {
              for (var k of f) (d = (e[k].shift() || "").toString()), l.push(d);
              l = this.getTableHeaderHTML(f, l, a);
            } else l = this.getTableHeaderHTML(void 0, f, a);
          for (k = 0; k < g; k++) {
            d = e[f[k]];
            c = d.length;
            for (let a = 0; a < c; a++) {
              let c = d[a];
              h[a] || (h[a] = []);
              "string" !== typeof c &&
                "number" !== typeof c &&
                "undefined" !== typeof c &&
                (c = (c || "").toString());
              h[a][k] = this.getCellHTMLFromValue(
                k ? "td" : "th",
                null,
                k ? "" : 'scope="row"',
                c
              );
              k === g - 1 && b.push("<tr>" + h[a].join("") + "</tr>");
            }
          }
          e = "";
          a.tableCaption &&
            (e =
              '<caption class="highcharts-table-caption">' +
              a.tableCaption +
              "</caption>");
          return (
            "<table>" + e + l + "<tbody>" + b.join("") + "</tbody></table>"
          );
        }
        getCellHTMLFromValue(b, a, c, d, f) {
          let e = d;
          a = "text" + (a ? " " + a : "");
          "number" === typeof e
            ? ((e = e.toString()),
              "," === f && (e = e.replace(".", f)),
              (a = "number"))
            : d || ((e = ""), (a = "empty"));
          return (
            "<" +
            b +
            (c ? " " + c : "") +
            ' class="' +
            a +
            '">' +
            e +
            "</" +
            b +
            ">"
          );
        }
        getTableHeaderHTML(b = [], a = [], c = this.options) {
          const { useMultiLevelHeaders: d, useRowspanHeaders: e } = c;
          c.useLocalDecimalPoint && (1.1).toLocaleString();
          c = "<thead>";
          let f = 0,
            g = a && a.length;
          var h;
          let l = 0;
          if ((h = d && b && a)) {
            a: if (((h = b.length), a.length === h)) {
              for (; --h; )
                if (b[h] !== a[h]) {
                  h = !1;
                  break a;
                }
              h = !0;
            } else h = !1;
            h = !h;
          }
          if (h) {
            for (c += "<tr>"; f < g; ++f) {
              h = b[f];
              var k = b[f + 1];
              h === k
                ? ++l
                : l
                ? ((c += this.getCellHTMLFromValue(
                    "th",
                    "highcharts-table-topheading",
                    'scope="col" colspan="' + (l + 1) + '"',
                    h
                  )),
                  (l = 0))
                : (h === a[f]
                    ? e
                      ? ((k = 2), delete a[f])
                      : ((k = 1), (a[f] = ""))
                    : (k = 1),
                  (c += this.getCellHTMLFromValue(
                    "th",
                    "highcharts-table-topheading",
                    'scope="col"' +
                      (1 < k ? ' valign="top" rowspan="' + k + '"' : ""),
                    h
                  )));
            }
            c += "</tr>";
          }
          if (a) {
            c += "<tr>";
            f = 0;
            for (g = a.length; f < g; ++f)
              "undefined" !== typeof a[f] &&
                (c += this.getCellHTMLFromValue(
                  "th",
                  null,
                  'scope="col"',
                  a[f]
                ));
            c += "</tr>";
          }
          return c + "</thead>";
        }
        parse(b, a) {
          const c = [],
            d = [];
          var e = h(this.options, b);
          const {
            endRow: f,
            startColumn: g,
            endColumn: l,
            firstRowAsNames: k,
          } = e;
          b = e.tableElement || this.tableElement;
          if (b instanceof HTMLElement) {
            this.tableElement = b;
            this.tableElementID = b.id;
            this.emit({
              type: "parse",
              columns: this.columns,
              detail: a,
              headers: this.headers,
            });
            b = b.getElementsByTagName("tr");
            var y = b.length,
              v = 0;
            ({ startRow: e } = e);
            if (k && y) {
              var r = b[0].children,
                u = r.length;
              for (var t = g; t < u && !(t > l); t++) {
                var q = r[t];
                ("TD" !== q.tagName && "TH" !== q.tagName) ||
                  d.push(q.innerHTML);
              }
              e++;
            }
            for (; v < y; ) {
              if (v >= e && v <= f)
                for (r = b[v].children, u = r.length, t = 0; t < u; ) {
                  const a = t - g,
                    b = c[a];
                  q = r[t];
                  if (
                    ("TD" === q.tagName || "TH" === q.tagName) &&
                    t >= g &&
                    t <= l
                  )
                    for (
                      c[a] || (c[a] = []),
                        q = this.asGuessedType(q.innerHTML),
                        q instanceof Date && (q = q.getTime()),
                        c[a][v - e] = q,
                        q = 1;
                      v - e >= q && void 0 === b[v - e - q];

                    )
                      (b[v - e - q] = null), q++;
                  t++;
                }
              v++;
            }
            this.columns = c;
            this.headers = d;
            this.emit({
              type: "afterParse",
              columns: c,
              detail: a,
              headers: d,
            });
          } else
            this.emit({
              type: "parseError",
              columns: c,
              detail: a,
              headers: d,
              error: "Not a valid HTML Table",
            });
        }
        getTable() {
          return b.getTableFromColumns(this.columns, this.headers);
        }
      }
      f.defaultOptions = Object.assign(Object.assign({}, b.defaultOptions), {
        useRowspanHeaders: !0,
        useMultiLevelHeaders: !0,
      });
      return f;
    }
  );
  k(
    b,
    "Data/Connectors/HTMLTableConnector.js",
    [
      b["Data/Connectors/DataConnector.js"],
      b["Core/Globals.js"],
      b["Data/Converters/HTMLTableConverter.js"],
      b["Core/Utilities.js"],
    ],
    function (b, g, h, f) {
      const { win: e } = g,
        { merge: a } = f;
      class c extends b {
        constructor(b) {
          b = a(c.defaultOptions, b);
          super(b);
          this.converter = new h(b);
          this.options = b;
        }
        load(b) {
          this.table.deleteColumns();
          this.emit({
            type: "load",
            detail: b,
            table: this.table,
            tableElement: this.tableElement,
          });
          var { table: c } = this.options;
          "string" === typeof c
            ? ((this.tableID = c), (c = e.document.getElementById(c)))
            : (this.tableID = c.id);
          this.tableElement = c || void 0;
          if (!this.tableElement)
            return (
              this.emit({
                type: "loadError",
                detail: b,
                error: "HTML table not provided, or element with ID not found",
                table: this.table,
              }),
              Promise.reject(
                Error("HTML table not provided, or element with ID not found")
              )
            );
          this.converter.parse(
            a({ tableElement: this.tableElement }, this.options),
            b
          );
          this.table.setColumns(this.converter.getTable().getColumns());
          this.emit({
            type: "afterLoad",
            detail: b,
            table: this.table,
            tableElement: this.tableElement,
          });
          return Promise.resolve(this);
        }
      }
      c.defaultOptions = { table: "" };
      b.registerType("HTMLTable", c);
      return c;
    }
  );
  k(
    b,
    "Data/Modifiers/ChainModifier.js",
    [b["Data/Modifiers/DataModifier.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { merge: h } = g;
      class f extends b {
        constructor(e, ...a) {
          super();
          this.chain = a;
          this.options = h(f.defaultOptions, e);
          e = this.options.chain || [];
          for (let c = 0, d = e.length, f; c < d; ++c)
            (f = b.types[e[c].modifier]) && a.unshift(new f(e[c]));
        }
        add(b, a) {
          this.emit({ type: "addModifier", detail: a, modifier: b });
          this.chain.push(b);
          this.emit({ type: "addModifier", detail: a, modifier: b });
        }
        clear(b) {
          this.emit({ type: "clearChain", detail: b });
          this.chain.length = 0;
          this.emit({ type: "afterClearChain", detail: b });
        }
        modify(b, a) {
          const c = this.options.reverse
            ? this.chain.slice().reverse()
            : this.chain.slice();
          let d = Promise.resolve(b);
          for (let b = 0, e = c.length; b < e; ++b) {
            const e = c[b];
            d = d.then((b) => e.modify(b.modified, a));
          }
          d = d.then((a) => {
            b.modified = a.modified;
            return b;
          });
          return (d = d["catch"]((c) => {
            this.emit({ type: "error", detail: a, table: b });
            throw c;
          }));
        }
        modifyCell(b, a, c, d, f) {
          const e = this.options.reverse ? this.chain.reverse() : this.chain;
          if (e.length) {
            let g = b.clone();
            for (let b = 0, h = e.length; b < h; ++b)
              e[b].modifyCell(g, a, c, d, f), (g = g.modified);
            b.modified = g;
          }
          return b;
        }
        modifyColumns(b, a, c, d) {
          const e = this.options.reverse
            ? this.chain.reverse()
            : this.chain.slice();
          if (e.length) {
            let f = b.clone();
            for (let b = 0, g = e.length; b < g; ++b)
              e[b].modifyColumns(f, a, c, d), (f = f.modified);
            b.modified = f;
          }
          return b;
        }
        modifyRows(b, a, c, d) {
          const e = this.options.reverse
            ? this.chain.reverse()
            : this.chain.slice();
          if (e.length) {
            let f = b.clone();
            for (let b = 0, g = e.length; b < g; ++b)
              e[b].modifyRows(f, a, c, d), (f = f.modified);
            b.modified = f;
          }
          return b;
        }
        modifyTable(b, a) {
          this.emit({ type: "modify", detail: a, table: b });
          const c = this.options.reverse
            ? this.chain.reverse()
            : this.chain.slice();
          let d = b.modified;
          for (let b = 0, e = c.length, f; b < e; ++b)
            (f = c[b]), (d = f.modifyTable(d, a).modified);
          b.modified = d;
          this.emit({ type: "afterModify", detail: a, table: b });
          return b;
        }
        remove(b, a) {
          const c = this.chain;
          this.emit({ type: "removeModifier", detail: a, modifier: b });
          c.splice(c.indexOf(b), 1);
          this.emit({ type: "afterRemoveModifier", detail: a, modifier: b });
        }
      }
      f.defaultOptions = { modifier: "Chain" };
      b.registerType("Chain", f);
      return f;
    }
  );
  k(
    b,
    "Data/Modifiers/InvertModifier.js",
    [b["Data/Modifiers/DataModifier.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { merge: h } = g;
      class f extends b {
        constructor(b) {
          super();
          this.options = h(f.defaultOptions, b);
        }
        modifyCell(b, a, c, d, f) {
          const e = b.modified;
          a = e.getRowIndexBy("columnNames", a);
          "undefined" === typeof a
            ? e.setColumns(this.modifyTable(b.clone()).getColumns(), void 0, f)
            : e.setCell(`${c}`, a, d, f);
          return b;
        }
        modifyColumns(b, a, c, d) {
          const e = b.modified,
            f = e.getColumn("columnNames") || [];
          let g = b.getColumnNames(),
            h = b.getRowCount() !== f.length;
          if (!h)
            for (let a = 0, b = g.length; a < b; ++a)
              if (g[a] !== f[a]) {
                h = !0;
                break;
              }
          if (h) return this.modifyTable(b, d);
          g = Object.keys(a);
          for (let b = 0, f = g.length, h, k, m; b < f; ++b) {
            k = g[b];
            h = a[k];
            m = e.getRowIndexBy("columnNames", k) || e.getRowCount();
            for (let a = 0, b = c, f = h.length; a < f; ++a, ++b)
              e.setCell(`${b}`, m, h[a], d);
          }
          return b;
        }
        modifyRows(b, a, c, d) {
          const e = b.getColumnNames(),
            f = b.modified,
            g = f.getColumn("columnNames") || [];
          let h = b.getRowCount() !== g.length;
          if (!h)
            for (let a = 0, b = e.length; a < b; ++a)
              if (e[a] !== g[a]) {
                h = !0;
                break;
              }
          if (h) return this.modifyTable(b, d);
          for (let b = 0, g = c, h = a.length, k; b < h; ++b, ++g)
            if (((k = a[b]), k instanceof Array)) f.setColumn(`${g}`, k);
            else
              for (let a = 0, b = e.length; a < b; ++a)
                f.setCell(`${g}`, a, k[e[a]], d);
          return b;
        }
        modifyTable(b, a) {
          this.emit({ type: "modify", detail: a, table: b });
          const c = b.modified;
          if (b.hasColumns(["columnNames"])) {
            var d = (
              (b.deleteColumns(["columnNames"]) || {}).columnNames || []
            ).map((a) => `${a}`);
            const a = {};
            for (let c = 0, e = b.getRowCount(), f; c < e; ++c)
              (f = b.getRow(c)) && (a[d[c]] = f);
            c.deleteColumns();
            c.setColumns(a);
          } else {
            d = {};
            for (let a = 0, c = b.getRowCount(), e; a < c; ++a)
              (e = b.getRow(a)) && (d[`${a}`] = e);
            d.columnNames = b.getColumnNames();
            c.deleteColumns();
            c.setColumns(d);
          }
          this.emit({ type: "afterModify", detail: a, table: b });
          return b;
        }
      }
      f.defaultOptions = { modifier: "Invert" };
      b.registerType("Invert", f);
      return f;
    }
  );
  k(
    b,
    "Data/Modifiers/RangeModifier.js",
    [b["Data/Modifiers/DataModifier.js"], b["Core/Utilities.js"]],
    function (b, g) {
      const { merge: h } = g;
      class f extends b {
        constructor(b) {
          super();
          this.options = h(f.defaultOptions, b);
        }
        modifyTable(b, a) {
          this.emit({ type: "modify", detail: a, table: b });
          const { ranges: c, strict: d } = this.options;
          if (c.length) {
            const a = b.getColumns(),
              e = [],
              f = b.modified;
            for (let f = 0, g = c.length, h, k; f < g; ++f)
              if (((h = c[f]), !d || typeof h.minValue === typeof h.maxValue)) {
                k = a[h.column] || [];
                for (let a = 0, c = k.length, f, g; a < c; ++a) {
                  f = k[a];
                  switch (typeof f) {
                    default:
                      continue;
                    case "boolean":
                    case "number":
                    case "string":
                  }
                  (!d || typeof f === typeof h.minValue) &&
                    f >= h.minValue &&
                    f <= h.maxValue &&
                    (g = b.getRow(a)) &&
                    e.push(g);
                }
              }
            f.deleteRows();
            f.setRows(e);
          }
          this.emit({ type: "afterModify", detail: a, table: b });
          return b;
        }
      }
      f.defaultOptions = { modifier: "Range", strict: !1, ranges: [] };
      b.registerType("Range", f);
      return f;
    }
  );
  k(
    b,
    "Data/Modifiers/SortModifier.js",
    [
      b["Data/Modifiers/DataModifier.js"],
      b["Data/DataTable.js"],
      b["Core/Utilities.js"],
    ],
    function (b, g, h) {
      const { merge: f } = h;
      class e extends b {
        static ascending(a, b) {
          return (a || 0) < (b || 0) ? -1 : (a || 0) > (b || 0) ? 1 : 0;
        }
        static descending(a, b) {
          return (b || 0) < (a || 0) ? -1 : (b || 0) > (a || 0) ? 1 : 0;
        }
        constructor(a) {
          super();
          this.options = f(e.defaultOptions, a);
        }
        modifyCell(a, b, d, e, f) {
          const { orderByColumn: c, orderInColumn: h } = this.options;
          b === c &&
            (h
              ? (a.modified.setCell(b, d, e),
                a.modified.setColumn(
                  h,
                  this.modifyTable(
                    new g({ columns: a.getColumns([c, h]) })
                  ).modified.getColumn(h)
                ))
              : this.modifyTable(a, f));
          return a;
        }
        modifyColumns(a, b, d, e) {
          const { orderByColumn: c, orderInColumn: f } = this.options,
            h = Object.keys(b);
          -1 < h.indexOf(c) &&
            (f && b[h[0]].length
              ? (a.modified.setColumns(b, d),
                a.modified.setColumn(
                  f,
                  this.modifyTable(
                    new g({ columns: a.getColumns([c, f]) })
                  ).modified.getColumn(f)
                ))
              : this.modifyTable(a, e));
          return a;
        }
        modifyRows(a, b, d, e) {
          const { orderByColumn: c, orderInColumn: f } = this.options;
          f && b.length
            ? (a.modified.setRows(b, d),
              a.modified.setColumn(
                f,
                this.modifyTable(
                  new g({ columns: a.getColumns([c, f]) })
                ).modified.getColumn(f)
              ))
            : this.modifyTable(a, e);
          return a;
        }
        modifyTable(a, b) {
          this.emit({ type: "modify", detail: b, table: a });
          var c = a.getColumnNames();
          const f = a.getRowCount(),
            g = a.getRows().map((a, b) => ({ index: b, row: a })),
            { direction: h, orderByColumn: k, orderInColumn: l } = this.options,
            y = "asc" === h ? e.ascending : e.descending,
            v = c.indexOf(k);
          c = a.modified;
          -1 !== v && g.sort((a, b) => y(a.row[v], b.row[v]));
          if (l) {
            var r = [];
            for (var u = 0; u < f; ++u) r[g[u].index] = u;
            c.setColumns({ [l]: r });
          } else {
            r = [];
            for (u = 0; u < f; ++u) r.push(g[u].row);
            c.setRows(r, 0);
          }
          this.emit({ type: "afterModify", detail: b, table: a });
          return a;
        }
      }
      e.defaultOptions = {
        modifier: "Sort",
        direction: "desc",
        orderByColumn: "y",
      };
      b.registerType("Sort", e);
      return e;
    }
  );
  k(
    b,
    "masters/modules/data-tools.src.js",
    [
      b["Core/Globals.js"],
      b["Data/Connectors/DataConnector.js"],
      b["Data/Converters/DataConverter.js"],
      b["Data/DataCursor.js"],
      b["Data/Modifiers/DataModifier.js"],
      b["Data/DataPool.js"],
      b["Data/DataTable.js"],
    ],
    function (b, g, h, f, e, a, c) {
      b.DataConnector = g;
      b.DataConverter = h;
      b.DataCursor = f;
      b.DataModifier = e;
      b.DataPool = a;
      b.DataTable = c;
    }
  );
});
//# sourceMappingURL=data-tools.js.map
