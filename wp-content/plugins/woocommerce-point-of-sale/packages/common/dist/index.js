var we = /* @__PURE__ */ ((s) => (s.WITH_TAX = "with_tax", s.WITHOUT_TAX = "without_tax", s.WITH_TAX_BREAKDOWN = "with_tax_breakdown", s.AS_NUMBER = "as_number", s))(we || {});
let An;
function Cy(s) {
  if (typeof s != "string" || s.indexOf("&") === -1)
    return s;
  An === void 0 && (document.implementation && document.implementation.createHTMLDocument ? An = document.implementation.createHTMLDocument("").createElement("textarea") : An = document.createElement("textarea")), An.innerHTML = s;
  const n = An.textContent;
  return An.innerHTML = "", /** @type {string} */
  n;
}
const du = {
  symbol: "$",
  // default currency symbol is '$'
  format: "%s%v",
  // controls output: %s = symbol, %v = value (can be object, see docs)
  decimal: ".",
  // decimal point separator
  thousand: ",",
  // thousands separator
  precision: 2,
  // decimal places
  grouping: 3,
  // digit grouping (not implemented yet)
  stripZeros: !1,
  // strip insignificant zeros from decimal part
  fallback: 0
  // value returned on unformat() failure
};
function Ly(s, n) {
  return s = Math.round(Math.abs(s)), isNaN(s) ? n : s;
}
function nl(s, n) {
  n = Ly(n, du.precision);
  const i = Math.pow(10, n);
  return (Math.round((s + 1e-8) * i) / i).toFixed(n);
}
var ar = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Wl(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var rl = Object.getOwnPropertySymbols, Wy = Object.prototype.hasOwnProperty, Fy = Object.prototype.propertyIsEnumerable;
function Ry(s) {
  if (s == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(s);
}
function Uy() {
  try {
    if (!Object.assign)
      return !1;
    var s = new String("abc");
    if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
      return !1;
    for (var n = {}, i = 0; i < 10; i++)
      n["_" + String.fromCharCode(i)] = i;
    var a = Object.getOwnPropertyNames(n).map(function(h) {
      return n[h];
    });
    if (a.join("") !== "0123456789")
      return !1;
    var l = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(h) {
      l[h] = h;
    }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var $y = Uy() ? Object.assign : function(s, n) {
  for (var i, a = Ry(s), l, h = 1; h < arguments.length; h++) {
    i = Object(arguments[h]);
    for (var d in i)
      Wy.call(i, d) && (a[d] = i[d]);
    if (rl) {
      l = rl(i);
      for (var y = 0; y < l.length; y++)
        Fy.call(i, l[y]) && (a[l[y]] = i[l[y]]);
    }
  }
  return a;
};
const Fl = /* @__PURE__ */ Wl($y);
function Py(s, n) {
  const i = s.split(n), a = i[0], l = i[1].replace(/0+$/, "");
  return l.length > 0 ? a + n + l : a;
}
function Rl(s, n = {}) {
  if (Array.isArray(s))
    return s.map((d) => Rl(d, n));
  n = Fl(
    {},
    du,
    n
  );
  const i = s < 0 ? "-" : "", a = parseInt(nl(Math.abs(s), n.precision), 10) + "", l = a.length > 3 ? a.length % 3 : 0, h = i + (l ? a.substr(0, l) + n.thousand : "") + a.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + n.thousand) + (n.precision > 0 ? n.decimal + nl(Math.abs(s), n.precision).split(".")[1] : "");
  return n.stripZeros ? Py(h, n.decimal) : h;
}
var Zy = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var n = {}, i = Symbol("test"), a = Object(i);
  if (typeof i == "string" || Object.prototype.toString.call(i) !== "[object Symbol]" || Object.prototype.toString.call(a) !== "[object Symbol]")
    return !1;
  var l = 42;
  n[i] = l;
  for (i in n)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(n).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(n).length !== 0)
    return !1;
  var h = Object.getOwnPropertySymbols(n);
  if (h.length !== 1 || h[0] !== i || !Object.prototype.propertyIsEnumerable.call(n, i))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var d = Object.getOwnPropertyDescriptor(n, i);
    if (d.value !== l || d.enumerable !== !0)
      return !1;
  }
  return !0;
}, Vy = Zy, Hy = function() {
  return Vy() && !!Symbol.toStringTag;
}, By = String.prototype.valueOf, zy = function(n) {
  try {
    return By.call(n), !0;
  } catch {
    return !1;
  }
}, qy = Object.prototype.toString, Gy = "[object String]", Yy = Hy(), Jy = function(n) {
  return typeof n == "string" ? !0 : typeof n != "object" ? !1 : Yy ? zy(n) : qy.call(n) === Gy;
};
const Ky = /* @__PURE__ */ Wl(Jy);
function Xy(s) {
  return Ky(s) && s.match("%v") ? {
    pos: s,
    neg: s.replace("-", "").replace("%v", "-%v"),
    zero: s
  } : s;
}
function Ul(s, n = {}) {
  if (Array.isArray(s))
    return s.map((l) => Ul(l, n));
  n = Fl(
    {},
    du,
    n
  );
  const i = Xy(n.format);
  let a;
  return s > 0 ? a = i.pos : s < 0 ? a = i.neg : a = i.zero, a.replace("%s", n.symbol).replace("%v", Rl(Math.abs(s), n));
}
var Si = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Si.exports;
(function(s, n) {
  (function() {
    var i, a = "4.17.21", l = 200, h = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", d = "Expected a function", y = "Invalid `variable` option passed into `_.template`", v = "__lodash_hash_undefined__", x = 500, M = "__lodash_placeholder__", C = 1, Q = 2, N = 4, ee = 1, Ce = 2, re = 1, Te = 2, st = 4, Ee = 8, pt = 16, be = 32, yt = 64, Ae = 128, St = 256, $e = 512, q = 30, Pe = "...", wr = 800, Zf = 16, Ou = 1, Vf = 2, Hf = 3, Jt = 1 / 0, Lt = 9007199254740991, Bf = 17976931348623157e292, Tr = NaN, _t = 4294967295, zf = _t - 1, qf = _t >>> 1, Gf = [
      ["ary", Ae],
      ["bind", re],
      ["bindKey", Te],
      ["curry", Ee],
      ["curryRight", pt],
      ["flip", $e],
      ["partial", be],
      ["partialRight", yt],
      ["rearg", St]
    ], hn = "[object Arguments]", Sr = "[object Array]", Yf = "[object AsyncFunction]", $n = "[object Boolean]", Pn = "[object Date]", Jf = "[object DOMException]", Or = "[object Error]", xr = "[object Function]", xu = "[object GeneratorFunction]", ut = "[object Map]", Zn = "[object Number]", Kf = "[object Null]", Ot = "[object Object]", Iu = "[object Promise]", Xf = "[object Proxy]", Vn = "[object RegExp]", at = "[object Set]", Hn = "[object String]", Ir = "[object Symbol]", Qf = "[object Undefined]", Bn = "[object WeakMap]", jf = "[object WeakSet]", zn = "[object ArrayBuffer]", dn = "[object DataView]", Di = "[object Float32Array]", Ci = "[object Float64Array]", Li = "[object Int8Array]", Wi = "[object Int16Array]", Fi = "[object Int32Array]", Ri = "[object Uint8Array]", Ui = "[object Uint8ClampedArray]", $i = "[object Uint16Array]", Pi = "[object Uint32Array]", ec = /\b__p \+= '';/g, tc = /\b(__p \+=) '' \+/g, nc = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Eu = /&(?:amp|lt|gt|quot|#39);/g, bu = /[&<>"']/g, rc = RegExp(Eu.source), ic = RegExp(bu.source), sc = /<%-([\s\S]+?)%>/g, uc = /<%([\s\S]+?)%>/g, Au = /<%=([\s\S]+?)%>/g, ac = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, oc = /^\w*$/, lc = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zi = /[\\^$.*+?()[\]{}|]/g, fc = RegExp(Zi.source), Vi = /^\s+/, cc = /\s/, hc = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, dc = /\{\n\/\* \[wrapped with (.+)\] \*/, mc = /,? & /, gc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, pc = /[()=,{}\[\]\/\s]/, yc = /\\(\\)?/g, _c = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Mu = /\w*$/, vc = /^[-+]0x[0-9a-f]+$/i, wc = /^0b[01]+$/i, Tc = /^\[object .+?Constructor\]$/, Sc = /^0o[0-7]+$/i, Oc = /^(?:0|[1-9]\d*)$/, xc = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Er = /($^)/, Ic = /['\n\r\u2028\u2029\\]/g, br = "\\ud800-\\udfff", Ec = "\\u0300-\\u036f", bc = "\\ufe20-\\ufe2f", Ac = "\\u20d0-\\u20ff", ku = Ec + bc + Ac, Nu = "\\u2700-\\u27bf", Du = "a-z\\xdf-\\xf6\\xf8-\\xff", Mc = "\\xac\\xb1\\xd7\\xf7", kc = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Nc = "\\u2000-\\u206f", Dc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Cu = "A-Z\\xc0-\\xd6\\xd8-\\xde", Lu = "\\ufe0e\\ufe0f", Wu = Mc + kc + Nc + Dc, Hi = "['’]", Cc = "[" + br + "]", Fu = "[" + Wu + "]", Ar = "[" + ku + "]", Ru = "\\d+", Lc = "[" + Nu + "]", Uu = "[" + Du + "]", $u = "[^" + br + Wu + Ru + Nu + Du + Cu + "]", Bi = "\\ud83c[\\udffb-\\udfff]", Wc = "(?:" + Ar + "|" + Bi + ")", Pu = "[^" + br + "]", zi = "(?:\\ud83c[\\udde6-\\uddff]){2}", qi = "[\\ud800-\\udbff][\\udc00-\\udfff]", mn = "[" + Cu + "]", Zu = "\\u200d", Vu = "(?:" + Uu + "|" + $u + ")", Fc = "(?:" + mn + "|" + $u + ")", Hu = "(?:" + Hi + "(?:d|ll|m|re|s|t|ve))?", Bu = "(?:" + Hi + "(?:D|LL|M|RE|S|T|VE))?", zu = Wc + "?", qu = "[" + Lu + "]?", Rc = "(?:" + Zu + "(?:" + [Pu, zi, qi].join("|") + ")" + qu + zu + ")*", Uc = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", $c = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Gu = qu + zu + Rc, Pc = "(?:" + [Lc, zi, qi].join("|") + ")" + Gu, Zc = "(?:" + [Pu + Ar + "?", Ar, zi, qi, Cc].join("|") + ")", Vc = RegExp(Hi, "g"), Hc = RegExp(Ar, "g"), Gi = RegExp(Bi + "(?=" + Bi + ")|" + Zc + Gu, "g"), Bc = RegExp([
      mn + "?" + Uu + "+" + Hu + "(?=" + [Fu, mn, "$"].join("|") + ")",
      Fc + "+" + Bu + "(?=" + [Fu, mn + Vu, "$"].join("|") + ")",
      mn + "?" + Vu + "+" + Hu,
      mn + "+" + Bu,
      $c,
      Uc,
      Ru,
      Pc
    ].join("|"), "g"), zc = RegExp("[" + Zu + br + ku + Lu + "]"), qc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Gc = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], Yc = -1, ie = {};
    ie[Di] = ie[Ci] = ie[Li] = ie[Wi] = ie[Fi] = ie[Ri] = ie[Ui] = ie[$i] = ie[Pi] = !0, ie[hn] = ie[Sr] = ie[zn] = ie[$n] = ie[dn] = ie[Pn] = ie[Or] = ie[xr] = ie[ut] = ie[Zn] = ie[Ot] = ie[Vn] = ie[at] = ie[Hn] = ie[Bn] = !1;
    var ne = {};
    ne[hn] = ne[Sr] = ne[zn] = ne[dn] = ne[$n] = ne[Pn] = ne[Di] = ne[Ci] = ne[Li] = ne[Wi] = ne[Fi] = ne[ut] = ne[Zn] = ne[Ot] = ne[Vn] = ne[at] = ne[Hn] = ne[Ir] = ne[Ri] = ne[Ui] = ne[$i] = ne[Pi] = !0, ne[Or] = ne[xr] = ne[Bn] = !1;
    var Jc = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Kc = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, Xc = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Qc = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, jc = parseFloat, eh = parseInt, Yu = typeof ar == "object" && ar && ar.Object === Object && ar, th = typeof self == "object" && self && self.Object === Object && self, _e = Yu || th || Function("return this")(), Yi = n && !n.nodeType && n, Kt = Yi && !0 && s && !s.nodeType && s, Ju = Kt && Kt.exports === Yi, Ji = Ju && Yu.process, Ye = function() {
      try {
        var p = Kt && Kt.require && Kt.require("util").types;
        return p || Ji && Ji.binding && Ji.binding("util");
      } catch {
      }
    }(), Ku = Ye && Ye.isArrayBuffer, Xu = Ye && Ye.isDate, Qu = Ye && Ye.isMap, ju = Ye && Ye.isRegExp, ea = Ye && Ye.isSet, ta = Ye && Ye.isTypedArray;
    function Ze(p, T, w) {
      switch (w.length) {
        case 0:
          return p.call(T);
        case 1:
          return p.call(T, w[0]);
        case 2:
          return p.call(T, w[0], w[1]);
        case 3:
          return p.call(T, w[0], w[1], w[2]);
      }
      return p.apply(T, w);
    }
    function nh(p, T, w, A) {
      for (var R = -1, Y = p == null ? 0 : p.length; ++R < Y; ) {
        var ge = p[R];
        T(A, ge, w(ge), p);
      }
      return A;
    }
    function Je(p, T) {
      for (var w = -1, A = p == null ? 0 : p.length; ++w < A && T(p[w], w, p) !== !1; )
        ;
      return p;
    }
    function rh(p, T) {
      for (var w = p == null ? 0 : p.length; w-- && T(p[w], w, p) !== !1; )
        ;
      return p;
    }
    function na(p, T) {
      for (var w = -1, A = p == null ? 0 : p.length; ++w < A; )
        if (!T(p[w], w, p))
          return !1;
      return !0;
    }
    function Wt(p, T) {
      for (var w = -1, A = p == null ? 0 : p.length, R = 0, Y = []; ++w < A; ) {
        var ge = p[w];
        T(ge, w, p) && (Y[R++] = ge);
      }
      return Y;
    }
    function Mr(p, T) {
      var w = p == null ? 0 : p.length;
      return !!w && gn(p, T, 0) > -1;
    }
    function Ki(p, T, w) {
      for (var A = -1, R = p == null ? 0 : p.length; ++A < R; )
        if (w(T, p[A]))
          return !0;
      return !1;
    }
    function se(p, T) {
      for (var w = -1, A = p == null ? 0 : p.length, R = Array(A); ++w < A; )
        R[w] = T(p[w], w, p);
      return R;
    }
    function Ft(p, T) {
      for (var w = -1, A = T.length, R = p.length; ++w < A; )
        p[R + w] = T[w];
      return p;
    }
    function Xi(p, T, w, A) {
      var R = -1, Y = p == null ? 0 : p.length;
      for (A && Y && (w = p[++R]); ++R < Y; )
        w = T(w, p[R], R, p);
      return w;
    }
    function ih(p, T, w, A) {
      var R = p == null ? 0 : p.length;
      for (A && R && (w = p[--R]); R--; )
        w = T(w, p[R], R, p);
      return w;
    }
    function Qi(p, T) {
      for (var w = -1, A = p == null ? 0 : p.length; ++w < A; )
        if (T(p[w], w, p))
          return !0;
      return !1;
    }
    var sh = ji("length");
    function uh(p) {
      return p.split("");
    }
    function ah(p) {
      return p.match(gc) || [];
    }
    function ra(p, T, w) {
      var A;
      return w(p, function(R, Y, ge) {
        if (T(R, Y, ge))
          return A = Y, !1;
      }), A;
    }
    function kr(p, T, w, A) {
      for (var R = p.length, Y = w + (A ? 1 : -1); A ? Y-- : ++Y < R; )
        if (T(p[Y], Y, p))
          return Y;
      return -1;
    }
    function gn(p, T, w) {
      return T === T ? vh(p, T, w) : kr(p, ia, w);
    }
    function oh(p, T, w, A) {
      for (var R = w - 1, Y = p.length; ++R < Y; )
        if (A(p[R], T))
          return R;
      return -1;
    }
    function ia(p) {
      return p !== p;
    }
    function sa(p, T) {
      var w = p == null ? 0 : p.length;
      return w ? ts(p, T) / w : Tr;
    }
    function ji(p) {
      return function(T) {
        return T == null ? i : T[p];
      };
    }
    function es(p) {
      return function(T) {
        return p == null ? i : p[T];
      };
    }
    function ua(p, T, w, A, R) {
      return R(p, function(Y, ge, te) {
        w = A ? (A = !1, Y) : T(w, Y, ge, te);
      }), w;
    }
    function lh(p, T) {
      var w = p.length;
      for (p.sort(T); w--; )
        p[w] = p[w].value;
      return p;
    }
    function ts(p, T) {
      for (var w, A = -1, R = p.length; ++A < R; ) {
        var Y = T(p[A]);
        Y !== i && (w = w === i ? Y : w + Y);
      }
      return w;
    }
    function ns(p, T) {
      for (var w = -1, A = Array(p); ++w < p; )
        A[w] = T(w);
      return A;
    }
    function fh(p, T) {
      return se(T, function(w) {
        return [w, p[w]];
      });
    }
    function aa(p) {
      return p && p.slice(0, ca(p) + 1).replace(Vi, "");
    }
    function Ve(p) {
      return function(T) {
        return p(T);
      };
    }
    function rs(p, T) {
      return se(T, function(w) {
        return p[w];
      });
    }
    function qn(p, T) {
      return p.has(T);
    }
    function oa(p, T) {
      for (var w = -1, A = p.length; ++w < A && gn(T, p[w], 0) > -1; )
        ;
      return w;
    }
    function la(p, T) {
      for (var w = p.length; w-- && gn(T, p[w], 0) > -1; )
        ;
      return w;
    }
    function ch(p, T) {
      for (var w = p.length, A = 0; w--; )
        p[w] === T && ++A;
      return A;
    }
    var hh = es(Jc), dh = es(Kc);
    function mh(p) {
      return "\\" + Qc[p];
    }
    function gh(p, T) {
      return p == null ? i : p[T];
    }
    function pn(p) {
      return zc.test(p);
    }
    function ph(p) {
      return qc.test(p);
    }
    function yh(p) {
      for (var T, w = []; !(T = p.next()).done; )
        w.push(T.value);
      return w;
    }
    function is(p) {
      var T = -1, w = Array(p.size);
      return p.forEach(function(A, R) {
        w[++T] = [R, A];
      }), w;
    }
    function fa(p, T) {
      return function(w) {
        return p(T(w));
      };
    }
    function Rt(p, T) {
      for (var w = -1, A = p.length, R = 0, Y = []; ++w < A; ) {
        var ge = p[w];
        (ge === T || ge === M) && (p[w] = M, Y[R++] = w);
      }
      return Y;
    }
    function Nr(p) {
      var T = -1, w = Array(p.size);
      return p.forEach(function(A) {
        w[++T] = A;
      }), w;
    }
    function _h(p) {
      var T = -1, w = Array(p.size);
      return p.forEach(function(A) {
        w[++T] = [A, A];
      }), w;
    }
    function vh(p, T, w) {
      for (var A = w - 1, R = p.length; ++A < R; )
        if (p[A] === T)
          return A;
      return -1;
    }
    function wh(p, T, w) {
      for (var A = w + 1; A--; )
        if (p[A] === T)
          return A;
      return A;
    }
    function yn(p) {
      return pn(p) ? Sh(p) : sh(p);
    }
    function ot(p) {
      return pn(p) ? Oh(p) : uh(p);
    }
    function ca(p) {
      for (var T = p.length; T-- && cc.test(p.charAt(T)); )
        ;
      return T;
    }
    var Th = es(Xc);
    function Sh(p) {
      for (var T = Gi.lastIndex = 0; Gi.test(p); )
        ++T;
      return T;
    }
    function Oh(p) {
      return p.match(Gi) || [];
    }
    function xh(p) {
      return p.match(Bc) || [];
    }
    var Ih = function p(T) {
      T = T == null ? _e : _n.defaults(_e.Object(), T, _n.pick(_e, Gc));
      var w = T.Array, A = T.Date, R = T.Error, Y = T.Function, ge = T.Math, te = T.Object, ss = T.RegExp, Eh = T.String, Ke = T.TypeError, Dr = w.prototype, bh = Y.prototype, vn = te.prototype, Cr = T["__core-js_shared__"], Lr = bh.toString, X = vn.hasOwnProperty, Ah = 0, ha = function() {
        var e = /[^.]+$/.exec(Cr && Cr.keys && Cr.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), Wr = vn.toString, Mh = Lr.call(te), kh = _e._, Nh = ss(
        "^" + Lr.call(X).replace(Zi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Fr = Ju ? T.Buffer : i, Ut = T.Symbol, Rr = T.Uint8Array, da = Fr ? Fr.allocUnsafe : i, Ur = fa(te.getPrototypeOf, te), ma = te.create, ga = vn.propertyIsEnumerable, $r = Dr.splice, pa = Ut ? Ut.isConcatSpreadable : i, Gn = Ut ? Ut.iterator : i, Xt = Ut ? Ut.toStringTag : i, Pr = function() {
        try {
          var e = nn(te, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), Dh = T.clearTimeout !== _e.clearTimeout && T.clearTimeout, Ch = A && A.now !== _e.Date.now && A.now, Lh = T.setTimeout !== _e.setTimeout && T.setTimeout, Zr = ge.ceil, Vr = ge.floor, us = te.getOwnPropertySymbols, Wh = Fr ? Fr.isBuffer : i, ya = T.isFinite, Fh = Dr.join, Rh = fa(te.keys, te), pe = ge.max, Se = ge.min, Uh = A.now, $h = T.parseInt, _a = ge.random, Ph = Dr.reverse, as = nn(T, "DataView"), Yn = nn(T, "Map"), os = nn(T, "Promise"), wn = nn(T, "Set"), Jn = nn(T, "WeakMap"), Kn = nn(te, "create"), Hr = Jn && new Jn(), Tn = {}, Zh = rn(as), Vh = rn(Yn), Hh = rn(os), Bh = rn(wn), zh = rn(Jn), Br = Ut ? Ut.prototype : i, Xn = Br ? Br.valueOf : i, va = Br ? Br.toString : i;
      function f(e) {
        if (le(e) && !$(e) && !(e instanceof B)) {
          if (e instanceof Xe)
            return e;
          if (X.call(e, "__wrapped__"))
            return To(e);
        }
        return new Xe(e);
      }
      var Sn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(t) {
          if (!ue(t))
            return {};
          if (ma)
            return ma(t);
          e.prototype = t;
          var r = new e();
          return e.prototype = i, r;
        };
      }();
      function zr() {
      }
      function Xe(e, t) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
      }
      f.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: sc,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: uc,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Au,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: f
        }
      }, f.prototype = zr.prototype, f.prototype.constructor = f, Xe.prototype = Sn(zr.prototype), Xe.prototype.constructor = Xe;
      function B(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = _t, this.__views__ = [];
      }
      function qh() {
        var e = new B(this.__wrapped__);
        return e.__actions__ = Le(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = Le(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = Le(this.__views__), e;
      }
      function Gh() {
        if (this.__filtered__) {
          var e = new B(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function Yh() {
        var e = this.__wrapped__.value(), t = this.__dir__, r = $(e), u = t < 0, o = r ? e.length : 0, c = um(0, o, this.__views__), m = c.start, g = c.end, _ = g - m, S = u ? g : m - 1, O = this.__iteratees__, I = O.length, E = 0, k = Se(_, this.__takeCount__);
        if (!r || !u && o == _ && k == _)
          return Ha(e, this.__actions__);
        var L = [];
        e:
          for (; _-- && E < k; ) {
            S += t;
            for (var Z = -1, W = e[S]; ++Z < I; ) {
              var H = O[Z], z = H.iteratee, ze = H.type, Ne = z(W);
              if (ze == Vf)
                W = Ne;
              else if (!Ne) {
                if (ze == Ou)
                  continue e;
                break e;
              }
            }
            L[E++] = W;
          }
        return L;
      }
      B.prototype = Sn(zr.prototype), B.prototype.constructor = B;
      function Qt(e) {
        var t = -1, r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function Jh() {
        this.__data__ = Kn ? Kn(null) : {}, this.size = 0;
      }
      function Kh(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t;
      }
      function Xh(e) {
        var t = this.__data__;
        if (Kn) {
          var r = t[e];
          return r === v ? i : r;
        }
        return X.call(t, e) ? t[e] : i;
      }
      function Qh(e) {
        var t = this.__data__;
        return Kn ? t[e] !== i : X.call(t, e);
      }
      function jh(e, t) {
        var r = this.__data__;
        return this.size += this.has(e) ? 0 : 1, r[e] = Kn && t === i ? v : t, this;
      }
      Qt.prototype.clear = Jh, Qt.prototype.delete = Kh, Qt.prototype.get = Xh, Qt.prototype.has = Qh, Qt.prototype.set = jh;
      function xt(e) {
        var t = -1, r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function ed() {
        this.__data__ = [], this.size = 0;
      }
      function td(e) {
        var t = this.__data__, r = qr(t, e);
        if (r < 0)
          return !1;
        var u = t.length - 1;
        return r == u ? t.pop() : $r.call(t, r, 1), --this.size, !0;
      }
      function nd(e) {
        var t = this.__data__, r = qr(t, e);
        return r < 0 ? i : t[r][1];
      }
      function rd(e) {
        return qr(this.__data__, e) > -1;
      }
      function id(e, t) {
        var r = this.__data__, u = qr(r, e);
        return u < 0 ? (++this.size, r.push([e, t])) : r[u][1] = t, this;
      }
      xt.prototype.clear = ed, xt.prototype.delete = td, xt.prototype.get = nd, xt.prototype.has = rd, xt.prototype.set = id;
      function It(e) {
        var t = -1, r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var u = e[t];
          this.set(u[0], u[1]);
        }
      }
      function sd() {
        this.size = 0, this.__data__ = {
          hash: new Qt(),
          map: new (Yn || xt)(),
          string: new Qt()
        };
      }
      function ud(e) {
        var t = ii(this, e).delete(e);
        return this.size -= t ? 1 : 0, t;
      }
      function ad(e) {
        return ii(this, e).get(e);
      }
      function od(e) {
        return ii(this, e).has(e);
      }
      function ld(e, t) {
        var r = ii(this, e), u = r.size;
        return r.set(e, t), this.size += r.size == u ? 0 : 1, this;
      }
      It.prototype.clear = sd, It.prototype.delete = ud, It.prototype.get = ad, It.prototype.has = od, It.prototype.set = ld;
      function jt(e) {
        var t = -1, r = e == null ? 0 : e.length;
        for (this.__data__ = new It(); ++t < r; )
          this.add(e[t]);
      }
      function fd(e) {
        return this.__data__.set(e, v), this;
      }
      function cd(e) {
        return this.__data__.has(e);
      }
      jt.prototype.add = jt.prototype.push = fd, jt.prototype.has = cd;
      function lt(e) {
        var t = this.__data__ = new xt(e);
        this.size = t.size;
      }
      function hd() {
        this.__data__ = new xt(), this.size = 0;
      }
      function dd(e) {
        var t = this.__data__, r = t.delete(e);
        return this.size = t.size, r;
      }
      function md(e) {
        return this.__data__.get(e);
      }
      function gd(e) {
        return this.__data__.has(e);
      }
      function pd(e, t) {
        var r = this.__data__;
        if (r instanceof xt) {
          var u = r.__data__;
          if (!Yn || u.length < l - 1)
            return u.push([e, t]), this.size = ++r.size, this;
          r = this.__data__ = new It(u);
        }
        return r.set(e, t), this.size = r.size, this;
      }
      lt.prototype.clear = hd, lt.prototype.delete = dd, lt.prototype.get = md, lt.prototype.has = gd, lt.prototype.set = pd;
      function wa(e, t) {
        var r = $(e), u = !r && sn(e), o = !r && !u && Ht(e), c = !r && !u && !o && En(e), m = r || u || o || c, g = m ? ns(e.length, Eh) : [], _ = g.length;
        for (var S in e)
          (t || X.call(e, S)) && !(m && // Safari 9 has enumerable `arguments.length` in strict mode.
          (S == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          o && (S == "offset" || S == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          c && (S == "buffer" || S == "byteLength" || S == "byteOffset") || // Skip index properties.
          Mt(S, _))) && g.push(S);
        return g;
      }
      function Ta(e) {
        var t = e.length;
        return t ? e[vs(0, t - 1)] : i;
      }
      function yd(e, t) {
        return si(Le(e), en(t, 0, e.length));
      }
      function _d(e) {
        return si(Le(e));
      }
      function ls(e, t, r) {
        (r !== i && !ft(e[t], r) || r === i && !(t in e)) && Et(e, t, r);
      }
      function Qn(e, t, r) {
        var u = e[t];
        (!(X.call(e, t) && ft(u, r)) || r === i && !(t in e)) && Et(e, t, r);
      }
      function qr(e, t) {
        for (var r = e.length; r--; )
          if (ft(e[r][0], t))
            return r;
        return -1;
      }
      function vd(e, t, r, u) {
        return $t(e, function(o, c, m) {
          t(u, o, r(o), m);
        }), u;
      }
      function Sa(e, t) {
        return e && wt(t, ye(t), e);
      }
      function wd(e, t) {
        return e && wt(t, Fe(t), e);
      }
      function Et(e, t, r) {
        t == "__proto__" && Pr ? Pr(e, t, {
          configurable: !0,
          enumerable: !0,
          value: r,
          writable: !0
        }) : e[t] = r;
      }
      function fs(e, t) {
        for (var r = -1, u = t.length, o = w(u), c = e == null; ++r < u; )
          o[r] = c ? i : Bs(e, t[r]);
        return o;
      }
      function en(e, t, r) {
        return e === e && (r !== i && (e = e <= r ? e : r), t !== i && (e = e >= t ? e : t)), e;
      }
      function Qe(e, t, r, u, o, c) {
        var m, g = t & C, _ = t & Q, S = t & N;
        if (r && (m = o ? r(e, u, o, c) : r(e)), m !== i)
          return m;
        if (!ue(e))
          return e;
        var O = $(e);
        if (O) {
          if (m = om(e), !g)
            return Le(e, m);
        } else {
          var I = Oe(e), E = I == xr || I == xu;
          if (Ht(e))
            return qa(e, g);
          if (I == Ot || I == hn || E && !o) {
            if (m = _ || E ? {} : co(e), !g)
              return _ ? Xd(e, wd(m, e)) : Kd(e, Sa(m, e));
          } else {
            if (!ne[I])
              return o ? e : {};
            m = lm(e, I, g);
          }
        }
        c || (c = new lt());
        var k = c.get(e);
        if (k)
          return k;
        c.set(e, m), Zo(e) ? e.forEach(function(W) {
          m.add(Qe(W, t, r, W, e, c));
        }) : $o(e) && e.forEach(function(W, H) {
          m.set(H, Qe(W, t, r, H, e, c));
        });
        var L = S ? _ ? ks : Ms : _ ? Fe : ye, Z = O ? i : L(e);
        return Je(Z || e, function(W, H) {
          Z && (H = W, W = e[H]), Qn(m, H, Qe(W, t, r, H, e, c));
        }), m;
      }
      function Td(e) {
        var t = ye(e);
        return function(r) {
          return Oa(r, e, t);
        };
      }
      function Oa(e, t, r) {
        var u = r.length;
        if (e == null)
          return !u;
        for (e = te(e); u--; ) {
          var o = r[u], c = t[o], m = e[o];
          if (m === i && !(o in e) || !c(m))
            return !1;
        }
        return !0;
      }
      function xa(e, t, r) {
        if (typeof e != "function")
          throw new Ke(d);
        return sr(function() {
          e.apply(i, r);
        }, t);
      }
      function jn(e, t, r, u) {
        var o = -1, c = Mr, m = !0, g = e.length, _ = [], S = t.length;
        if (!g)
          return _;
        r && (t = se(t, Ve(r))), u ? (c = Ki, m = !1) : t.length >= l && (c = qn, m = !1, t = new jt(t));
        e:
          for (; ++o < g; ) {
            var O = e[o], I = r == null ? O : r(O);
            if (O = u || O !== 0 ? O : 0, m && I === I) {
              for (var E = S; E--; )
                if (t[E] === I)
                  continue e;
              _.push(O);
            } else
              c(t, I, u) || _.push(O);
          }
        return _;
      }
      var $t = Xa(vt), Ia = Xa(hs, !0);
      function Sd(e, t) {
        var r = !0;
        return $t(e, function(u, o, c) {
          return r = !!t(u, o, c), r;
        }), r;
      }
      function Gr(e, t, r) {
        for (var u = -1, o = e.length; ++u < o; ) {
          var c = e[u], m = t(c);
          if (m != null && (g === i ? m === m && !Be(m) : r(m, g)))
            var g = m, _ = c;
        }
        return _;
      }
      function Od(e, t, r, u) {
        var o = e.length;
        for (r = P(r), r < 0 && (r = -r > o ? 0 : o + r), u = u === i || u > o ? o : P(u), u < 0 && (u += o), u = r > u ? 0 : Ho(u); r < u; )
          e[r++] = t;
        return e;
      }
      function Ea(e, t) {
        var r = [];
        return $t(e, function(u, o, c) {
          t(u, o, c) && r.push(u);
        }), r;
      }
      function ve(e, t, r, u, o) {
        var c = -1, m = e.length;
        for (r || (r = cm), o || (o = []); ++c < m; ) {
          var g = e[c];
          t > 0 && r(g) ? t > 1 ? ve(g, t - 1, r, u, o) : Ft(o, g) : u || (o[o.length] = g);
        }
        return o;
      }
      var cs = Qa(), ba = Qa(!0);
      function vt(e, t) {
        return e && cs(e, t, ye);
      }
      function hs(e, t) {
        return e && ba(e, t, ye);
      }
      function Yr(e, t) {
        return Wt(t, function(r) {
          return kt(e[r]);
        });
      }
      function tn(e, t) {
        t = Zt(t, e);
        for (var r = 0, u = t.length; e != null && r < u; )
          e = e[Tt(t[r++])];
        return r && r == u ? e : i;
      }
      function Aa(e, t, r) {
        var u = t(e);
        return $(e) ? u : Ft(u, r(e));
      }
      function Me(e) {
        return e == null ? e === i ? Qf : Kf : Xt && Xt in te(e) ? sm(e) : _m(e);
      }
      function ds(e, t) {
        return e > t;
      }
      function xd(e, t) {
        return e != null && X.call(e, t);
      }
      function Id(e, t) {
        return e != null && t in te(e);
      }
      function Ed(e, t, r) {
        return e >= Se(t, r) && e < pe(t, r);
      }
      function ms(e, t, r) {
        for (var u = r ? Ki : Mr, o = e[0].length, c = e.length, m = c, g = w(c), _ = 1 / 0, S = []; m--; ) {
          var O = e[m];
          m && t && (O = se(O, Ve(t))), _ = Se(O.length, _), g[m] = !r && (t || o >= 120 && O.length >= 120) ? new jt(m && O) : i;
        }
        O = e[0];
        var I = -1, E = g[0];
        e:
          for (; ++I < o && S.length < _; ) {
            var k = O[I], L = t ? t(k) : k;
            if (k = r || k !== 0 ? k : 0, !(E ? qn(E, L) : u(S, L, r))) {
              for (m = c; --m; ) {
                var Z = g[m];
                if (!(Z ? qn(Z, L) : u(e[m], L, r)))
                  continue e;
              }
              E && E.push(L), S.push(k);
            }
          }
        return S;
      }
      function bd(e, t, r, u) {
        return vt(e, function(o, c, m) {
          t(u, r(o), c, m);
        }), u;
      }
      function er(e, t, r) {
        t = Zt(t, e), e = po(e, t);
        var u = e == null ? e : e[Tt(et(t))];
        return u == null ? i : Ze(u, e, r);
      }
      function Ma(e) {
        return le(e) && Me(e) == hn;
      }
      function Ad(e) {
        return le(e) && Me(e) == zn;
      }
      function Md(e) {
        return le(e) && Me(e) == Pn;
      }
      function tr(e, t, r, u, o) {
        return e === t ? !0 : e == null || t == null || !le(e) && !le(t) ? e !== e && t !== t : kd(e, t, r, u, tr, o);
      }
      function kd(e, t, r, u, o, c) {
        var m = $(e), g = $(t), _ = m ? Sr : Oe(e), S = g ? Sr : Oe(t);
        _ = _ == hn ? Ot : _, S = S == hn ? Ot : S;
        var O = _ == Ot, I = S == Ot, E = _ == S;
        if (E && Ht(e)) {
          if (!Ht(t))
            return !1;
          m = !0, O = !1;
        }
        if (E && !O)
          return c || (c = new lt()), m || En(e) ? oo(e, t, r, u, o, c) : rm(e, t, _, r, u, o, c);
        if (!(r & ee)) {
          var k = O && X.call(e, "__wrapped__"), L = I && X.call(t, "__wrapped__");
          if (k || L) {
            var Z = k ? e.value() : e, W = L ? t.value() : t;
            return c || (c = new lt()), o(Z, W, r, u, c);
          }
        }
        return E ? (c || (c = new lt()), im(e, t, r, u, o, c)) : !1;
      }
      function Nd(e) {
        return le(e) && Oe(e) == ut;
      }
      function gs(e, t, r, u) {
        var o = r.length, c = o, m = !u;
        if (e == null)
          return !c;
        for (e = te(e); o--; ) {
          var g = r[o];
          if (m && g[2] ? g[1] !== e[g[0]] : !(g[0] in e))
            return !1;
        }
        for (; ++o < c; ) {
          g = r[o];
          var _ = g[0], S = e[_], O = g[1];
          if (m && g[2]) {
            if (S === i && !(_ in e))
              return !1;
          } else {
            var I = new lt();
            if (u)
              var E = u(S, O, _, e, t, I);
            if (!(E === i ? tr(O, S, ee | Ce, u, I) : E))
              return !1;
          }
        }
        return !0;
      }
      function ka(e) {
        if (!ue(e) || dm(e))
          return !1;
        var t = kt(e) ? Nh : Tc;
        return t.test(rn(e));
      }
      function Dd(e) {
        return le(e) && Me(e) == Vn;
      }
      function Cd(e) {
        return le(e) && Oe(e) == at;
      }
      function Ld(e) {
        return le(e) && ci(e.length) && !!ie[Me(e)];
      }
      function Na(e) {
        return typeof e == "function" ? e : e == null ? Re : typeof e == "object" ? $(e) ? La(e[0], e[1]) : Ca(e) : el(e);
      }
      function ps(e) {
        if (!ir(e))
          return Rh(e);
        var t = [];
        for (var r in te(e))
          X.call(e, r) && r != "constructor" && t.push(r);
        return t;
      }
      function Wd(e) {
        if (!ue(e))
          return ym(e);
        var t = ir(e), r = [];
        for (var u in e)
          u == "constructor" && (t || !X.call(e, u)) || r.push(u);
        return r;
      }
      function ys(e, t) {
        return e < t;
      }
      function Da(e, t) {
        var r = -1, u = We(e) ? w(e.length) : [];
        return $t(e, function(o, c, m) {
          u[++r] = t(o, c, m);
        }), u;
      }
      function Ca(e) {
        var t = Ds(e);
        return t.length == 1 && t[0][2] ? mo(t[0][0], t[0][1]) : function(r) {
          return r === e || gs(r, e, t);
        };
      }
      function La(e, t) {
        return Ls(e) && ho(t) ? mo(Tt(e), t) : function(r) {
          var u = Bs(r, e);
          return u === i && u === t ? zs(r, e) : tr(t, u, ee | Ce);
        };
      }
      function Jr(e, t, r, u, o) {
        e !== t && cs(t, function(c, m) {
          if (o || (o = new lt()), ue(c))
            Fd(e, t, m, r, Jr, u, o);
          else {
            var g = u ? u(Fs(e, m), c, m + "", e, t, o) : i;
            g === i && (g = c), ls(e, m, g);
          }
        }, Fe);
      }
      function Fd(e, t, r, u, o, c, m) {
        var g = Fs(e, r), _ = Fs(t, r), S = m.get(_);
        if (S) {
          ls(e, r, S);
          return;
        }
        var O = c ? c(g, _, r + "", e, t, m) : i, I = O === i;
        if (I) {
          var E = $(_), k = !E && Ht(_), L = !E && !k && En(_);
          O = _, E || k || L ? $(g) ? O = g : he(g) ? O = Le(g) : k ? (I = !1, O = qa(_, !0)) : L ? (I = !1, O = Ga(_, !0)) : O = [] : ur(_) || sn(_) ? (O = g, sn(g) ? O = Bo(g) : (!ue(g) || kt(g)) && (O = co(_))) : I = !1;
        }
        I && (m.set(_, O), o(O, _, u, c, m), m.delete(_)), ls(e, r, O);
      }
      function Wa(e, t) {
        var r = e.length;
        if (r)
          return t += t < 0 ? r : 0, Mt(t, r) ? e[t] : i;
      }
      function Fa(e, t, r) {
        t.length ? t = se(t, function(c) {
          return $(c) ? function(m) {
            return tn(m, c.length === 1 ? c[0] : c);
          } : c;
        }) : t = [Re];
        var u = -1;
        t = se(t, Ve(D()));
        var o = Da(e, function(c, m, g) {
          var _ = se(t, function(S) {
            return S(c);
          });
          return { criteria: _, index: ++u, value: c };
        });
        return lh(o, function(c, m) {
          return Jd(c, m, r);
        });
      }
      function Rd(e, t) {
        return Ra(e, t, function(r, u) {
          return zs(e, u);
        });
      }
      function Ra(e, t, r) {
        for (var u = -1, o = t.length, c = {}; ++u < o; ) {
          var m = t[u], g = tn(e, m);
          r(g, m) && nr(c, Zt(m, e), g);
        }
        return c;
      }
      function Ud(e) {
        return function(t) {
          return tn(t, e);
        };
      }
      function _s(e, t, r, u) {
        var o = u ? oh : gn, c = -1, m = t.length, g = e;
        for (e === t && (t = Le(t)), r && (g = se(e, Ve(r))); ++c < m; )
          for (var _ = 0, S = t[c], O = r ? r(S) : S; (_ = o(g, O, _, u)) > -1; )
            g !== e && $r.call(g, _, 1), $r.call(e, _, 1);
        return e;
      }
      function Ua(e, t) {
        for (var r = e ? t.length : 0, u = r - 1; r--; ) {
          var o = t[r];
          if (r == u || o !== c) {
            var c = o;
            Mt(o) ? $r.call(e, o, 1) : Ss(e, o);
          }
        }
        return e;
      }
      function vs(e, t) {
        return e + Vr(_a() * (t - e + 1));
      }
      function $d(e, t, r, u) {
        for (var o = -1, c = pe(Zr((t - e) / (r || 1)), 0), m = w(c); c--; )
          m[u ? c : ++o] = e, e += r;
        return m;
      }
      function ws(e, t) {
        var r = "";
        if (!e || t < 1 || t > Lt)
          return r;
        do
          t % 2 && (r += e), t = Vr(t / 2), t && (e += e);
        while (t);
        return r;
      }
      function V(e, t) {
        return Rs(go(e, t, Re), e + "");
      }
      function Pd(e) {
        return Ta(bn(e));
      }
      function Zd(e, t) {
        var r = bn(e);
        return si(r, en(t, 0, r.length));
      }
      function nr(e, t, r, u) {
        if (!ue(e))
          return e;
        t = Zt(t, e);
        for (var o = -1, c = t.length, m = c - 1, g = e; g != null && ++o < c; ) {
          var _ = Tt(t[o]), S = r;
          if (_ === "__proto__" || _ === "constructor" || _ === "prototype")
            return e;
          if (o != m) {
            var O = g[_];
            S = u ? u(O, _, g) : i, S === i && (S = ue(O) ? O : Mt(t[o + 1]) ? [] : {});
          }
          Qn(g, _, S), g = g[_];
        }
        return e;
      }
      var $a = Hr ? function(e, t) {
        return Hr.set(e, t), e;
      } : Re, Vd = Pr ? function(e, t) {
        return Pr(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Gs(t),
          writable: !0
        });
      } : Re;
      function Hd(e) {
        return si(bn(e));
      }
      function je(e, t, r) {
        var u = -1, o = e.length;
        t < 0 && (t = -t > o ? 0 : o + t), r = r > o ? o : r, r < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
        for (var c = w(o); ++u < o; )
          c[u] = e[u + t];
        return c;
      }
      function Bd(e, t) {
        var r;
        return $t(e, function(u, o, c) {
          return r = t(u, o, c), !r;
        }), !!r;
      }
      function Kr(e, t, r) {
        var u = 0, o = e == null ? u : e.length;
        if (typeof t == "number" && t === t && o <= qf) {
          for (; u < o; ) {
            var c = u + o >>> 1, m = e[c];
            m !== null && !Be(m) && (r ? m <= t : m < t) ? u = c + 1 : o = c;
          }
          return o;
        }
        return Ts(e, t, Re, r);
      }
      function Ts(e, t, r, u) {
        var o = 0, c = e == null ? 0 : e.length;
        if (c === 0)
          return 0;
        t = r(t);
        for (var m = t !== t, g = t === null, _ = Be(t), S = t === i; o < c; ) {
          var O = Vr((o + c) / 2), I = r(e[O]), E = I !== i, k = I === null, L = I === I, Z = Be(I);
          if (m)
            var W = u || L;
          else
            S ? W = L && (u || E) : g ? W = L && E && (u || !k) : _ ? W = L && E && !k && (u || !Z) : k || Z ? W = !1 : W = u ? I <= t : I < t;
          W ? o = O + 1 : c = O;
        }
        return Se(c, zf);
      }
      function Pa(e, t) {
        for (var r = -1, u = e.length, o = 0, c = []; ++r < u; ) {
          var m = e[r], g = t ? t(m) : m;
          if (!r || !ft(g, _)) {
            var _ = g;
            c[o++] = m === 0 ? 0 : m;
          }
        }
        return c;
      }
      function Za(e) {
        return typeof e == "number" ? e : Be(e) ? Tr : +e;
      }
      function He(e) {
        if (typeof e == "string")
          return e;
        if ($(e))
          return se(e, He) + "";
        if (Be(e))
          return va ? va.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -Jt ? "-0" : t;
      }
      function Pt(e, t, r) {
        var u = -1, o = Mr, c = e.length, m = !0, g = [], _ = g;
        if (r)
          m = !1, o = Ki;
        else if (c >= l) {
          var S = t ? null : tm(e);
          if (S)
            return Nr(S);
          m = !1, o = qn, _ = new jt();
        } else
          _ = t ? [] : g;
        e:
          for (; ++u < c; ) {
            var O = e[u], I = t ? t(O) : O;
            if (O = r || O !== 0 ? O : 0, m && I === I) {
              for (var E = _.length; E--; )
                if (_[E] === I)
                  continue e;
              t && _.push(I), g.push(O);
            } else
              o(_, I, r) || (_ !== g && _.push(I), g.push(O));
          }
        return g;
      }
      function Ss(e, t) {
        return t = Zt(t, e), e = po(e, t), e == null || delete e[Tt(et(t))];
      }
      function Va(e, t, r, u) {
        return nr(e, t, r(tn(e, t)), u);
      }
      function Xr(e, t, r, u) {
        for (var o = e.length, c = u ? o : -1; (u ? c-- : ++c < o) && t(e[c], c, e); )
          ;
        return r ? je(e, u ? 0 : c, u ? c + 1 : o) : je(e, u ? c + 1 : 0, u ? o : c);
      }
      function Ha(e, t) {
        var r = e;
        return r instanceof B && (r = r.value()), Xi(t, function(u, o) {
          return o.func.apply(o.thisArg, Ft([u], o.args));
        }, r);
      }
      function Os(e, t, r) {
        var u = e.length;
        if (u < 2)
          return u ? Pt(e[0]) : [];
        for (var o = -1, c = w(u); ++o < u; )
          for (var m = e[o], g = -1; ++g < u; )
            g != o && (c[o] = jn(c[o] || m, e[g], t, r));
        return Pt(ve(c, 1), t, r);
      }
      function Ba(e, t, r) {
        for (var u = -1, o = e.length, c = t.length, m = {}; ++u < o; ) {
          var g = u < c ? t[u] : i;
          r(m, e[u], g);
        }
        return m;
      }
      function xs(e) {
        return he(e) ? e : [];
      }
      function Is(e) {
        return typeof e == "function" ? e : Re;
      }
      function Zt(e, t) {
        return $(e) ? e : Ls(e, t) ? [e] : wo(K(e));
      }
      var zd = V;
      function Vt(e, t, r) {
        var u = e.length;
        return r = r === i ? u : r, !t && r >= u ? e : je(e, t, r);
      }
      var za = Dh || function(e) {
        return _e.clearTimeout(e);
      };
      function qa(e, t) {
        if (t)
          return e.slice();
        var r = e.length, u = da ? da(r) : new e.constructor(r);
        return e.copy(u), u;
      }
      function Es(e) {
        var t = new e.constructor(e.byteLength);
        return new Rr(t).set(new Rr(e)), t;
      }
      function qd(e, t) {
        var r = t ? Es(e.buffer) : e.buffer;
        return new e.constructor(r, e.byteOffset, e.byteLength);
      }
      function Gd(e) {
        var t = new e.constructor(e.source, Mu.exec(e));
        return t.lastIndex = e.lastIndex, t;
      }
      function Yd(e) {
        return Xn ? te(Xn.call(e)) : {};
      }
      function Ga(e, t) {
        var r = t ? Es(e.buffer) : e.buffer;
        return new e.constructor(r, e.byteOffset, e.length);
      }
      function Ya(e, t) {
        if (e !== t) {
          var r = e !== i, u = e === null, o = e === e, c = Be(e), m = t !== i, g = t === null, _ = t === t, S = Be(t);
          if (!g && !S && !c && e > t || c && m && _ && !g && !S || u && m && _ || !r && _ || !o)
            return 1;
          if (!u && !c && !S && e < t || S && r && o && !u && !c || g && r && o || !m && o || !_)
            return -1;
        }
        return 0;
      }
      function Jd(e, t, r) {
        for (var u = -1, o = e.criteria, c = t.criteria, m = o.length, g = r.length; ++u < m; ) {
          var _ = Ya(o[u], c[u]);
          if (_) {
            if (u >= g)
              return _;
            var S = r[u];
            return _ * (S == "desc" ? -1 : 1);
          }
        }
        return e.index - t.index;
      }
      function Ja(e, t, r, u) {
        for (var o = -1, c = e.length, m = r.length, g = -1, _ = t.length, S = pe(c - m, 0), O = w(_ + S), I = !u; ++g < _; )
          O[g] = t[g];
        for (; ++o < m; )
          (I || o < c) && (O[r[o]] = e[o]);
        for (; S--; )
          O[g++] = e[o++];
        return O;
      }
      function Ka(e, t, r, u) {
        for (var o = -1, c = e.length, m = -1, g = r.length, _ = -1, S = t.length, O = pe(c - g, 0), I = w(O + S), E = !u; ++o < O; )
          I[o] = e[o];
        for (var k = o; ++_ < S; )
          I[k + _] = t[_];
        for (; ++m < g; )
          (E || o < c) && (I[k + r[m]] = e[o++]);
        return I;
      }
      function Le(e, t) {
        var r = -1, u = e.length;
        for (t || (t = w(u)); ++r < u; )
          t[r] = e[r];
        return t;
      }
      function wt(e, t, r, u) {
        var o = !r;
        r || (r = {});
        for (var c = -1, m = t.length; ++c < m; ) {
          var g = t[c], _ = u ? u(r[g], e[g], g, r, e) : i;
          _ === i && (_ = e[g]), o ? Et(r, g, _) : Qn(r, g, _);
        }
        return r;
      }
      function Kd(e, t) {
        return wt(e, Cs(e), t);
      }
      function Xd(e, t) {
        return wt(e, lo(e), t);
      }
      function Qr(e, t) {
        return function(r, u) {
          var o = $(r) ? nh : vd, c = t ? t() : {};
          return o(r, e, D(u, 2), c);
        };
      }
      function On(e) {
        return V(function(t, r) {
          var u = -1, o = r.length, c = o > 1 ? r[o - 1] : i, m = o > 2 ? r[2] : i;
          for (c = e.length > 3 && typeof c == "function" ? (o--, c) : i, m && ke(r[0], r[1], m) && (c = o < 3 ? i : c, o = 1), t = te(t); ++u < o; ) {
            var g = r[u];
            g && e(t, g, u, c);
          }
          return t;
        });
      }
      function Xa(e, t) {
        return function(r, u) {
          if (r == null)
            return r;
          if (!We(r))
            return e(r, u);
          for (var o = r.length, c = t ? o : -1, m = te(r); (t ? c-- : ++c < o) && u(m[c], c, m) !== !1; )
            ;
          return r;
        };
      }
      function Qa(e) {
        return function(t, r, u) {
          for (var o = -1, c = te(t), m = u(t), g = m.length; g--; ) {
            var _ = m[e ? g : ++o];
            if (r(c[_], _, c) === !1)
              break;
          }
          return t;
        };
      }
      function Qd(e, t, r) {
        var u = t & re, o = rr(e);
        function c() {
          var m = this && this !== _e && this instanceof c ? o : e;
          return m.apply(u ? r : this, arguments);
        }
        return c;
      }
      function ja(e) {
        return function(t) {
          t = K(t);
          var r = pn(t) ? ot(t) : i, u = r ? r[0] : t.charAt(0), o = r ? Vt(r, 1).join("") : t.slice(1);
          return u[e]() + o;
        };
      }
      function xn(e) {
        return function(t) {
          return Xi(Qo(Xo(t).replace(Vc, "")), e, "");
        };
      }
      function rr(e) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var r = Sn(e.prototype), u = e.apply(r, t);
          return ue(u) ? u : r;
        };
      }
      function jd(e, t, r) {
        var u = rr(e);
        function o() {
          for (var c = arguments.length, m = w(c), g = c, _ = In(o); g--; )
            m[g] = arguments[g];
          var S = c < 3 && m[0] !== _ && m[c - 1] !== _ ? [] : Rt(m, _);
          if (c -= S.length, c < r)
            return io(
              e,
              t,
              jr,
              o.placeholder,
              i,
              m,
              S,
              i,
              i,
              r - c
            );
          var O = this && this !== _e && this instanceof o ? u : e;
          return Ze(O, this, m);
        }
        return o;
      }
      function eo(e) {
        return function(t, r, u) {
          var o = te(t);
          if (!We(t)) {
            var c = D(r, 3);
            t = ye(t), r = function(g) {
              return c(o[g], g, o);
            };
          }
          var m = e(t, r, u);
          return m > -1 ? o[c ? t[m] : m] : i;
        };
      }
      function to(e) {
        return At(function(t) {
          var r = t.length, u = r, o = Xe.prototype.thru;
          for (e && t.reverse(); u--; ) {
            var c = t[u];
            if (typeof c != "function")
              throw new Ke(d);
            if (o && !m && ri(c) == "wrapper")
              var m = new Xe([], !0);
          }
          for (u = m ? u : r; ++u < r; ) {
            c = t[u];
            var g = ri(c), _ = g == "wrapper" ? Ns(c) : i;
            _ && Ws(_[0]) && _[1] == (Ae | Ee | be | St) && !_[4].length && _[9] == 1 ? m = m[ri(_[0])].apply(m, _[3]) : m = c.length == 1 && Ws(c) ? m[g]() : m.thru(c);
          }
          return function() {
            var S = arguments, O = S[0];
            if (m && S.length == 1 && $(O))
              return m.plant(O).value();
            for (var I = 0, E = r ? t[I].apply(this, S) : O; ++I < r; )
              E = t[I].call(this, E);
            return E;
          };
        });
      }
      function jr(e, t, r, u, o, c, m, g, _, S) {
        var O = t & Ae, I = t & re, E = t & Te, k = t & (Ee | pt), L = t & $e, Z = E ? i : rr(e);
        function W() {
          for (var H = arguments.length, z = w(H), ze = H; ze--; )
            z[ze] = arguments[ze];
          if (k)
            var Ne = In(W), qe = ch(z, Ne);
          if (u && (z = Ja(z, u, o, k)), c && (z = Ka(z, c, m, k)), H -= qe, k && H < S) {
            var de = Rt(z, Ne);
            return io(
              e,
              t,
              jr,
              W.placeholder,
              r,
              z,
              de,
              g,
              _,
              S - H
            );
          }
          var ct = I ? r : this, Dt = E ? ct[e] : e;
          return H = z.length, g ? z = vm(z, g) : L && H > 1 && z.reverse(), O && _ < H && (z.length = _), this && this !== _e && this instanceof W && (Dt = Z || rr(Dt)), Dt.apply(ct, z);
        }
        return W;
      }
      function no(e, t) {
        return function(r, u) {
          return bd(r, e, t(u), {});
        };
      }
      function ei(e, t) {
        return function(r, u) {
          var o;
          if (r === i && u === i)
            return t;
          if (r !== i && (o = r), u !== i) {
            if (o === i)
              return u;
            typeof r == "string" || typeof u == "string" ? (r = He(r), u = He(u)) : (r = Za(r), u = Za(u)), o = e(r, u);
          }
          return o;
        };
      }
      function bs(e) {
        return At(function(t) {
          return t = se(t, Ve(D())), V(function(r) {
            var u = this;
            return e(t, function(o) {
              return Ze(o, u, r);
            });
          });
        });
      }
      function ti(e, t) {
        t = t === i ? " " : He(t);
        var r = t.length;
        if (r < 2)
          return r ? ws(t, e) : t;
        var u = ws(t, Zr(e / yn(t)));
        return pn(t) ? Vt(ot(u), 0, e).join("") : u.slice(0, e);
      }
      function em(e, t, r, u) {
        var o = t & re, c = rr(e);
        function m() {
          for (var g = -1, _ = arguments.length, S = -1, O = u.length, I = w(O + _), E = this && this !== _e && this instanceof m ? c : e; ++S < O; )
            I[S] = u[S];
          for (; _--; )
            I[S++] = arguments[++g];
          return Ze(E, o ? r : this, I);
        }
        return m;
      }
      function ro(e) {
        return function(t, r, u) {
          return u && typeof u != "number" && ke(t, r, u) && (r = u = i), t = Nt(t), r === i ? (r = t, t = 0) : r = Nt(r), u = u === i ? t < r ? 1 : -1 : Nt(u), $d(t, r, u, e);
        };
      }
      function ni(e) {
        return function(t, r) {
          return typeof t == "string" && typeof r == "string" || (t = tt(t), r = tt(r)), e(t, r);
        };
      }
      function io(e, t, r, u, o, c, m, g, _, S) {
        var O = t & Ee, I = O ? m : i, E = O ? i : m, k = O ? c : i, L = O ? i : c;
        t |= O ? be : yt, t &= ~(O ? yt : be), t & st || (t &= ~(re | Te));
        var Z = [
          e,
          t,
          o,
          k,
          I,
          L,
          E,
          g,
          _,
          S
        ], W = r.apply(i, Z);
        return Ws(e) && yo(W, Z), W.placeholder = u, _o(W, e, t);
      }
      function As(e) {
        var t = ge[e];
        return function(r, u) {
          if (r = tt(r), u = u == null ? 0 : Se(P(u), 292), u && ya(r)) {
            var o = (K(r) + "e").split("e"), c = t(o[0] + "e" + (+o[1] + u));
            return o = (K(c) + "e").split("e"), +(o[0] + "e" + (+o[1] - u));
          }
          return t(r);
        };
      }
      var tm = wn && 1 / Nr(new wn([, -0]))[1] == Jt ? function(e) {
        return new wn(e);
      } : Ks;
      function so(e) {
        return function(t) {
          var r = Oe(t);
          return r == ut ? is(t) : r == at ? _h(t) : fh(t, e(t));
        };
      }
      function bt(e, t, r, u, o, c, m, g) {
        var _ = t & Te;
        if (!_ && typeof e != "function")
          throw new Ke(d);
        var S = u ? u.length : 0;
        if (S || (t &= ~(be | yt), u = o = i), m = m === i ? m : pe(P(m), 0), g = g === i ? g : P(g), S -= o ? o.length : 0, t & yt) {
          var O = u, I = o;
          u = o = i;
        }
        var E = _ ? i : Ns(e), k = [
          e,
          t,
          r,
          u,
          o,
          O,
          I,
          c,
          m,
          g
        ];
        if (E && pm(k, E), e = k[0], t = k[1], r = k[2], u = k[3], o = k[4], g = k[9] = k[9] === i ? _ ? 0 : e.length : pe(k[9] - S, 0), !g && t & (Ee | pt) && (t &= ~(Ee | pt)), !t || t == re)
          var L = Qd(e, t, r);
        else
          t == Ee || t == pt ? L = jd(e, t, g) : (t == be || t == (re | be)) && !o.length ? L = em(e, t, r, u) : L = jr.apply(i, k);
        var Z = E ? $a : yo;
        return _o(Z(L, k), e, t);
      }
      function uo(e, t, r, u) {
        return e === i || ft(e, vn[r]) && !X.call(u, r) ? t : e;
      }
      function ao(e, t, r, u, o, c) {
        return ue(e) && ue(t) && (c.set(t, e), Jr(e, t, i, ao, c), c.delete(t)), e;
      }
      function nm(e) {
        return ur(e) ? i : e;
      }
      function oo(e, t, r, u, o, c) {
        var m = r & ee, g = e.length, _ = t.length;
        if (g != _ && !(m && _ > g))
          return !1;
        var S = c.get(e), O = c.get(t);
        if (S && O)
          return S == t && O == e;
        var I = -1, E = !0, k = r & Ce ? new jt() : i;
        for (c.set(e, t), c.set(t, e); ++I < g; ) {
          var L = e[I], Z = t[I];
          if (u)
            var W = m ? u(Z, L, I, t, e, c) : u(L, Z, I, e, t, c);
          if (W !== i) {
            if (W)
              continue;
            E = !1;
            break;
          }
          if (k) {
            if (!Qi(t, function(H, z) {
              if (!qn(k, z) && (L === H || o(L, H, r, u, c)))
                return k.push(z);
            })) {
              E = !1;
              break;
            }
          } else if (!(L === Z || o(L, Z, r, u, c))) {
            E = !1;
            break;
          }
        }
        return c.delete(e), c.delete(t), E;
      }
      function rm(e, t, r, u, o, c, m) {
        switch (r) {
          case dn:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            e = e.buffer, t = t.buffer;
          case zn:
            return !(e.byteLength != t.byteLength || !c(new Rr(e), new Rr(t)));
          case $n:
          case Pn:
          case Zn:
            return ft(+e, +t);
          case Or:
            return e.name == t.name && e.message == t.message;
          case Vn:
          case Hn:
            return e == t + "";
          case ut:
            var g = is;
          case at:
            var _ = u & ee;
            if (g || (g = Nr), e.size != t.size && !_)
              return !1;
            var S = m.get(e);
            if (S)
              return S == t;
            u |= Ce, m.set(e, t);
            var O = oo(g(e), g(t), u, o, c, m);
            return m.delete(e), O;
          case Ir:
            if (Xn)
              return Xn.call(e) == Xn.call(t);
        }
        return !1;
      }
      function im(e, t, r, u, o, c) {
        var m = r & ee, g = Ms(e), _ = g.length, S = Ms(t), O = S.length;
        if (_ != O && !m)
          return !1;
        for (var I = _; I--; ) {
          var E = g[I];
          if (!(m ? E in t : X.call(t, E)))
            return !1;
        }
        var k = c.get(e), L = c.get(t);
        if (k && L)
          return k == t && L == e;
        var Z = !0;
        c.set(e, t), c.set(t, e);
        for (var W = m; ++I < _; ) {
          E = g[I];
          var H = e[E], z = t[E];
          if (u)
            var ze = m ? u(z, H, E, t, e, c) : u(H, z, E, e, t, c);
          if (!(ze === i ? H === z || o(H, z, r, u, c) : ze)) {
            Z = !1;
            break;
          }
          W || (W = E == "constructor");
        }
        if (Z && !W) {
          var Ne = e.constructor, qe = t.constructor;
          Ne != qe && "constructor" in e && "constructor" in t && !(typeof Ne == "function" && Ne instanceof Ne && typeof qe == "function" && qe instanceof qe) && (Z = !1);
        }
        return c.delete(e), c.delete(t), Z;
      }
      function At(e) {
        return Rs(go(e, i, xo), e + "");
      }
      function Ms(e) {
        return Aa(e, ye, Cs);
      }
      function ks(e) {
        return Aa(e, Fe, lo);
      }
      var Ns = Hr ? function(e) {
        return Hr.get(e);
      } : Ks;
      function ri(e) {
        for (var t = e.name + "", r = Tn[t], u = X.call(Tn, t) ? r.length : 0; u--; ) {
          var o = r[u], c = o.func;
          if (c == null || c == e)
            return o.name;
        }
        return t;
      }
      function In(e) {
        var t = X.call(f, "placeholder") ? f : e;
        return t.placeholder;
      }
      function D() {
        var e = f.iteratee || Ys;
        return e = e === Ys ? Na : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function ii(e, t) {
        var r = e.__data__;
        return hm(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
      }
      function Ds(e) {
        for (var t = ye(e), r = t.length; r--; ) {
          var u = t[r], o = e[u];
          t[r] = [u, o, ho(o)];
        }
        return t;
      }
      function nn(e, t) {
        var r = gh(e, t);
        return ka(r) ? r : i;
      }
      function sm(e) {
        var t = X.call(e, Xt), r = e[Xt];
        try {
          e[Xt] = i;
          var u = !0;
        } catch {
        }
        var o = Wr.call(e);
        return u && (t ? e[Xt] = r : delete e[Xt]), o;
      }
      var Cs = us ? function(e) {
        return e == null ? [] : (e = te(e), Wt(us(e), function(t) {
          return ga.call(e, t);
        }));
      } : Xs, lo = us ? function(e) {
        for (var t = []; e; )
          Ft(t, Cs(e)), e = Ur(e);
        return t;
      } : Xs, Oe = Me;
      (as && Oe(new as(new ArrayBuffer(1))) != dn || Yn && Oe(new Yn()) != ut || os && Oe(os.resolve()) != Iu || wn && Oe(new wn()) != at || Jn && Oe(new Jn()) != Bn) && (Oe = function(e) {
        var t = Me(e), r = t == Ot ? e.constructor : i, u = r ? rn(r) : "";
        if (u)
          switch (u) {
            case Zh:
              return dn;
            case Vh:
              return ut;
            case Hh:
              return Iu;
            case Bh:
              return at;
            case zh:
              return Bn;
          }
        return t;
      });
      function um(e, t, r) {
        for (var u = -1, o = r.length; ++u < o; ) {
          var c = r[u], m = c.size;
          switch (c.type) {
            case "drop":
              e += m;
              break;
            case "dropRight":
              t -= m;
              break;
            case "take":
              t = Se(t, e + m);
              break;
            case "takeRight":
              e = pe(e, t - m);
              break;
          }
        }
        return { start: e, end: t };
      }
      function am(e) {
        var t = e.match(dc);
        return t ? t[1].split(mc) : [];
      }
      function fo(e, t, r) {
        t = Zt(t, e);
        for (var u = -1, o = t.length, c = !1; ++u < o; ) {
          var m = Tt(t[u]);
          if (!(c = e != null && r(e, m)))
            break;
          e = e[m];
        }
        return c || ++u != o ? c : (o = e == null ? 0 : e.length, !!o && ci(o) && Mt(m, o) && ($(e) || sn(e)));
      }
      function om(e) {
        var t = e.length, r = new e.constructor(t);
        return t && typeof e[0] == "string" && X.call(e, "index") && (r.index = e.index, r.input = e.input), r;
      }
      function co(e) {
        return typeof e.constructor == "function" && !ir(e) ? Sn(Ur(e)) : {};
      }
      function lm(e, t, r) {
        var u = e.constructor;
        switch (t) {
          case zn:
            return Es(e);
          case $n:
          case Pn:
            return new u(+e);
          case dn:
            return qd(e, r);
          case Di:
          case Ci:
          case Li:
          case Wi:
          case Fi:
          case Ri:
          case Ui:
          case $i:
          case Pi:
            return Ga(e, r);
          case ut:
            return new u();
          case Zn:
          case Hn:
            return new u(e);
          case Vn:
            return Gd(e);
          case at:
            return new u();
          case Ir:
            return Yd(e);
        }
      }
      function fm(e, t) {
        var r = t.length;
        if (!r)
          return e;
        var u = r - 1;
        return t[u] = (r > 1 ? "& " : "") + t[u], t = t.join(r > 2 ? ", " : " "), e.replace(hc, `{
/* [wrapped with ` + t + `] */
`);
      }
      function cm(e) {
        return $(e) || sn(e) || !!(pa && e && e[pa]);
      }
      function Mt(e, t) {
        var r = typeof e;
        return t = t ?? Lt, !!t && (r == "number" || r != "symbol" && Oc.test(e)) && e > -1 && e % 1 == 0 && e < t;
      }
      function ke(e, t, r) {
        if (!ue(r))
          return !1;
        var u = typeof t;
        return (u == "number" ? We(r) && Mt(t, r.length) : u == "string" && t in r) ? ft(r[t], e) : !1;
      }
      function Ls(e, t) {
        if ($(e))
          return !1;
        var r = typeof e;
        return r == "number" || r == "symbol" || r == "boolean" || e == null || Be(e) ? !0 : oc.test(e) || !ac.test(e) || t != null && e in te(t);
      }
      function hm(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
      }
      function Ws(e) {
        var t = ri(e), r = f[t];
        if (typeof r != "function" || !(t in B.prototype))
          return !1;
        if (e === r)
          return !0;
        var u = Ns(r);
        return !!u && e === u[0];
      }
      function dm(e) {
        return !!ha && ha in e;
      }
      var mm = Cr ? kt : Qs;
      function ir(e) {
        var t = e && e.constructor, r = typeof t == "function" && t.prototype || vn;
        return e === r;
      }
      function ho(e) {
        return e === e && !ue(e);
      }
      function mo(e, t) {
        return function(r) {
          return r == null ? !1 : r[e] === t && (t !== i || e in te(r));
        };
      }
      function gm(e) {
        var t = li(e, function(u) {
          return r.size === x && r.clear(), u;
        }), r = t.cache;
        return t;
      }
      function pm(e, t) {
        var r = e[1], u = t[1], o = r | u, c = o < (re | Te | Ae), m = u == Ae && r == Ee || u == Ae && r == St && e[7].length <= t[8] || u == (Ae | St) && t[7].length <= t[8] && r == Ee;
        if (!(c || m))
          return e;
        u & re && (e[2] = t[2], o |= r & re ? 0 : st);
        var g = t[3];
        if (g) {
          var _ = e[3];
          e[3] = _ ? Ja(_, g, t[4]) : g, e[4] = _ ? Rt(e[3], M) : t[4];
        }
        return g = t[5], g && (_ = e[5], e[5] = _ ? Ka(_, g, t[6]) : g, e[6] = _ ? Rt(e[5], M) : t[6]), g = t[7], g && (e[7] = g), u & Ae && (e[8] = e[8] == null ? t[8] : Se(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = o, e;
      }
      function ym(e) {
        var t = [];
        if (e != null)
          for (var r in te(e))
            t.push(r);
        return t;
      }
      function _m(e) {
        return Wr.call(e);
      }
      function go(e, t, r) {
        return t = pe(t === i ? e.length - 1 : t, 0), function() {
          for (var u = arguments, o = -1, c = pe(u.length - t, 0), m = w(c); ++o < c; )
            m[o] = u[t + o];
          o = -1;
          for (var g = w(t + 1); ++o < t; )
            g[o] = u[o];
          return g[t] = r(m), Ze(e, this, g);
        };
      }
      function po(e, t) {
        return t.length < 2 ? e : tn(e, je(t, 0, -1));
      }
      function vm(e, t) {
        for (var r = e.length, u = Se(t.length, r), o = Le(e); u--; ) {
          var c = t[u];
          e[u] = Mt(c, r) ? o[c] : i;
        }
        return e;
      }
      function Fs(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
          return e[t];
      }
      var yo = vo($a), sr = Lh || function(e, t) {
        return _e.setTimeout(e, t);
      }, Rs = vo(Vd);
      function _o(e, t, r) {
        var u = t + "";
        return Rs(e, fm(u, wm(am(u), r)));
      }
      function vo(e) {
        var t = 0, r = 0;
        return function() {
          var u = Uh(), o = Zf - (u - r);
          if (r = u, o > 0) {
            if (++t >= wr)
              return arguments[0];
          } else
            t = 0;
          return e.apply(i, arguments);
        };
      }
      function si(e, t) {
        var r = -1, u = e.length, o = u - 1;
        for (t = t === i ? u : t; ++r < t; ) {
          var c = vs(r, o), m = e[c];
          e[c] = e[r], e[r] = m;
        }
        return e.length = t, e;
      }
      var wo = gm(function(e) {
        var t = [];
        return e.charCodeAt(0) === 46 && t.push(""), e.replace(lc, function(r, u, o, c) {
          t.push(o ? c.replace(yc, "$1") : u || r);
        }), t;
      });
      function Tt(e) {
        if (typeof e == "string" || Be(e))
          return e;
        var t = e + "";
        return t == "0" && 1 / e == -Jt ? "-0" : t;
      }
      function rn(e) {
        if (e != null) {
          try {
            return Lr.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function wm(e, t) {
        return Je(Gf, function(r) {
          var u = "_." + r[0];
          t & r[1] && !Mr(e, u) && e.push(u);
        }), e.sort();
      }
      function To(e) {
        if (e instanceof B)
          return e.clone();
        var t = new Xe(e.__wrapped__, e.__chain__);
        return t.__actions__ = Le(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
      }
      function Tm(e, t, r) {
        (r ? ke(e, t, r) : t === i) ? t = 1 : t = pe(P(t), 0);
        var u = e == null ? 0 : e.length;
        if (!u || t < 1)
          return [];
        for (var o = 0, c = 0, m = w(Zr(u / t)); o < u; )
          m[c++] = je(e, o, o += t);
        return m;
      }
      function Sm(e) {
        for (var t = -1, r = e == null ? 0 : e.length, u = 0, o = []; ++t < r; ) {
          var c = e[t];
          c && (o[u++] = c);
        }
        return o;
      }
      function Om() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var t = w(e - 1), r = arguments[0], u = e; u--; )
          t[u - 1] = arguments[u];
        return Ft($(r) ? Le(r) : [r], ve(t, 1));
      }
      var xm = V(function(e, t) {
        return he(e) ? jn(e, ve(t, 1, he, !0)) : [];
      }), Im = V(function(e, t) {
        var r = et(t);
        return he(r) && (r = i), he(e) ? jn(e, ve(t, 1, he, !0), D(r, 2)) : [];
      }), Em = V(function(e, t) {
        var r = et(t);
        return he(r) && (r = i), he(e) ? jn(e, ve(t, 1, he, !0), i, r) : [];
      });
      function bm(e, t, r) {
        var u = e == null ? 0 : e.length;
        return u ? (t = r || t === i ? 1 : P(t), je(e, t < 0 ? 0 : t, u)) : [];
      }
      function Am(e, t, r) {
        var u = e == null ? 0 : e.length;
        return u ? (t = r || t === i ? 1 : P(t), t = u - t, je(e, 0, t < 0 ? 0 : t)) : [];
      }
      function Mm(e, t) {
        return e && e.length ? Xr(e, D(t, 3), !0, !0) : [];
      }
      function km(e, t) {
        return e && e.length ? Xr(e, D(t, 3), !0) : [];
      }
      function Nm(e, t, r, u) {
        var o = e == null ? 0 : e.length;
        return o ? (r && typeof r != "number" && ke(e, t, r) && (r = 0, u = o), Od(e, t, r, u)) : [];
      }
      function So(e, t, r) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var o = r == null ? 0 : P(r);
        return o < 0 && (o = pe(u + o, 0)), kr(e, D(t, 3), o);
      }
      function Oo(e, t, r) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var o = u - 1;
        return r !== i && (o = P(r), o = r < 0 ? pe(u + o, 0) : Se(o, u - 1)), kr(e, D(t, 3), o, !0);
      }
      function xo(e) {
        var t = e == null ? 0 : e.length;
        return t ? ve(e, 1) : [];
      }
      function Dm(e) {
        var t = e == null ? 0 : e.length;
        return t ? ve(e, Jt) : [];
      }
      function Cm(e, t) {
        var r = e == null ? 0 : e.length;
        return r ? (t = t === i ? 1 : P(t), ve(e, t)) : [];
      }
      function Lm(e) {
        for (var t = -1, r = e == null ? 0 : e.length, u = {}; ++t < r; ) {
          var o = e[t];
          u[o[0]] = o[1];
        }
        return u;
      }
      function Io(e) {
        return e && e.length ? e[0] : i;
      }
      function Wm(e, t, r) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var o = r == null ? 0 : P(r);
        return o < 0 && (o = pe(u + o, 0)), gn(e, t, o);
      }
      function Fm(e) {
        var t = e == null ? 0 : e.length;
        return t ? je(e, 0, -1) : [];
      }
      var Rm = V(function(e) {
        var t = se(e, xs);
        return t.length && t[0] === e[0] ? ms(t) : [];
      }), Um = V(function(e) {
        var t = et(e), r = se(e, xs);
        return t === et(r) ? t = i : r.pop(), r.length && r[0] === e[0] ? ms(r, D(t, 2)) : [];
      }), $m = V(function(e) {
        var t = et(e), r = se(e, xs);
        return t = typeof t == "function" ? t : i, t && r.pop(), r.length && r[0] === e[0] ? ms(r, i, t) : [];
      });
      function Pm(e, t) {
        return e == null ? "" : Fh.call(e, t);
      }
      function et(e) {
        var t = e == null ? 0 : e.length;
        return t ? e[t - 1] : i;
      }
      function Zm(e, t, r) {
        var u = e == null ? 0 : e.length;
        if (!u)
          return -1;
        var o = u;
        return r !== i && (o = P(r), o = o < 0 ? pe(u + o, 0) : Se(o, u - 1)), t === t ? wh(e, t, o) : kr(e, ia, o, !0);
      }
      function Vm(e, t) {
        return e && e.length ? Wa(e, P(t)) : i;
      }
      var Hm = V(Eo);
      function Eo(e, t) {
        return e && e.length && t && t.length ? _s(e, t) : e;
      }
      function Bm(e, t, r) {
        return e && e.length && t && t.length ? _s(e, t, D(r, 2)) : e;
      }
      function zm(e, t, r) {
        return e && e.length && t && t.length ? _s(e, t, i, r) : e;
      }
      var qm = At(function(e, t) {
        var r = e == null ? 0 : e.length, u = fs(e, t);
        return Ua(e, se(t, function(o) {
          return Mt(o, r) ? +o : o;
        }).sort(Ya)), u;
      });
      function Gm(e, t) {
        var r = [];
        if (!(e && e.length))
          return r;
        var u = -1, o = [], c = e.length;
        for (t = D(t, 3); ++u < c; ) {
          var m = e[u];
          t(m, u, e) && (r.push(m), o.push(u));
        }
        return Ua(e, o), r;
      }
      function Us(e) {
        return e == null ? e : Ph.call(e);
      }
      function Ym(e, t, r) {
        var u = e == null ? 0 : e.length;
        return u ? (r && typeof r != "number" && ke(e, t, r) ? (t = 0, r = u) : (t = t == null ? 0 : P(t), r = r === i ? u : P(r)), je(e, t, r)) : [];
      }
      function Jm(e, t) {
        return Kr(e, t);
      }
      function Km(e, t, r) {
        return Ts(e, t, D(r, 2));
      }
      function Xm(e, t) {
        var r = e == null ? 0 : e.length;
        if (r) {
          var u = Kr(e, t);
          if (u < r && ft(e[u], t))
            return u;
        }
        return -1;
      }
      function Qm(e, t) {
        return Kr(e, t, !0);
      }
      function jm(e, t, r) {
        return Ts(e, t, D(r, 2), !0);
      }
      function eg(e, t) {
        var r = e == null ? 0 : e.length;
        if (r) {
          var u = Kr(e, t, !0) - 1;
          if (ft(e[u], t))
            return u;
        }
        return -1;
      }
      function tg(e) {
        return e && e.length ? Pa(e) : [];
      }
      function ng(e, t) {
        return e && e.length ? Pa(e, D(t, 2)) : [];
      }
      function rg(e) {
        var t = e == null ? 0 : e.length;
        return t ? je(e, 1, t) : [];
      }
      function ig(e, t, r) {
        return e && e.length ? (t = r || t === i ? 1 : P(t), je(e, 0, t < 0 ? 0 : t)) : [];
      }
      function sg(e, t, r) {
        var u = e == null ? 0 : e.length;
        return u ? (t = r || t === i ? 1 : P(t), t = u - t, je(e, t < 0 ? 0 : t, u)) : [];
      }
      function ug(e, t) {
        return e && e.length ? Xr(e, D(t, 3), !1, !0) : [];
      }
      function ag(e, t) {
        return e && e.length ? Xr(e, D(t, 3)) : [];
      }
      var og = V(function(e) {
        return Pt(ve(e, 1, he, !0));
      }), lg = V(function(e) {
        var t = et(e);
        return he(t) && (t = i), Pt(ve(e, 1, he, !0), D(t, 2));
      }), fg = V(function(e) {
        var t = et(e);
        return t = typeof t == "function" ? t : i, Pt(ve(e, 1, he, !0), i, t);
      });
      function cg(e) {
        return e && e.length ? Pt(e) : [];
      }
      function hg(e, t) {
        return e && e.length ? Pt(e, D(t, 2)) : [];
      }
      function dg(e, t) {
        return t = typeof t == "function" ? t : i, e && e.length ? Pt(e, i, t) : [];
      }
      function $s(e) {
        if (!(e && e.length))
          return [];
        var t = 0;
        return e = Wt(e, function(r) {
          if (he(r))
            return t = pe(r.length, t), !0;
        }), ns(t, function(r) {
          return se(e, ji(r));
        });
      }
      function bo(e, t) {
        if (!(e && e.length))
          return [];
        var r = $s(e);
        return t == null ? r : se(r, function(u) {
          return Ze(t, i, u);
        });
      }
      var mg = V(function(e, t) {
        return he(e) ? jn(e, t) : [];
      }), gg = V(function(e) {
        return Os(Wt(e, he));
      }), pg = V(function(e) {
        var t = et(e);
        return he(t) && (t = i), Os(Wt(e, he), D(t, 2));
      }), yg = V(function(e) {
        var t = et(e);
        return t = typeof t == "function" ? t : i, Os(Wt(e, he), i, t);
      }), _g = V($s);
      function vg(e, t) {
        return Ba(e || [], t || [], Qn);
      }
      function wg(e, t) {
        return Ba(e || [], t || [], nr);
      }
      var Tg = V(function(e) {
        var t = e.length, r = t > 1 ? e[t - 1] : i;
        return r = typeof r == "function" ? (e.pop(), r) : i, bo(e, r);
      });
      function Ao(e) {
        var t = f(e);
        return t.__chain__ = !0, t;
      }
      function Sg(e, t) {
        return t(e), e;
      }
      function ui(e, t) {
        return t(e);
      }
      var Og = At(function(e) {
        var t = e.length, r = t ? e[0] : 0, u = this.__wrapped__, o = function(c) {
          return fs(c, e);
        };
        return t > 1 || this.__actions__.length || !(u instanceof B) || !Mt(r) ? this.thru(o) : (u = u.slice(r, +r + (t ? 1 : 0)), u.__actions__.push({
          func: ui,
          args: [o],
          thisArg: i
        }), new Xe(u, this.__chain__).thru(function(c) {
          return t && !c.length && c.push(i), c;
        }));
      });
      function xg() {
        return Ao(this);
      }
      function Ig() {
        return new Xe(this.value(), this.__chain__);
      }
      function Eg() {
        this.__values__ === i && (this.__values__ = Vo(this.value()));
        var e = this.__index__ >= this.__values__.length, t = e ? i : this.__values__[this.__index__++];
        return { done: e, value: t };
      }
      function bg() {
        return this;
      }
      function Ag(e) {
        for (var t, r = this; r instanceof zr; ) {
          var u = To(r);
          u.__index__ = 0, u.__values__ = i, t ? o.__wrapped__ = u : t = u;
          var o = u;
          r = r.__wrapped__;
        }
        return o.__wrapped__ = e, t;
      }
      function Mg() {
        var e = this.__wrapped__;
        if (e instanceof B) {
          var t = e;
          return this.__actions__.length && (t = new B(this)), t = t.reverse(), t.__actions__.push({
            func: ui,
            args: [Us],
            thisArg: i
          }), new Xe(t, this.__chain__);
        }
        return this.thru(Us);
      }
      function kg() {
        return Ha(this.__wrapped__, this.__actions__);
      }
      var Ng = Qr(function(e, t, r) {
        X.call(e, r) ? ++e[r] : Et(e, r, 1);
      });
      function Dg(e, t, r) {
        var u = $(e) ? na : Sd;
        return r && ke(e, t, r) && (t = i), u(e, D(t, 3));
      }
      function Cg(e, t) {
        var r = $(e) ? Wt : Ea;
        return r(e, D(t, 3));
      }
      var Lg = eo(So), Wg = eo(Oo);
      function Fg(e, t) {
        return ve(ai(e, t), 1);
      }
      function Rg(e, t) {
        return ve(ai(e, t), Jt);
      }
      function Ug(e, t, r) {
        return r = r === i ? 1 : P(r), ve(ai(e, t), r);
      }
      function Mo(e, t) {
        var r = $(e) ? Je : $t;
        return r(e, D(t, 3));
      }
      function ko(e, t) {
        var r = $(e) ? rh : Ia;
        return r(e, D(t, 3));
      }
      var $g = Qr(function(e, t, r) {
        X.call(e, r) ? e[r].push(t) : Et(e, r, [t]);
      });
      function Pg(e, t, r, u) {
        e = We(e) ? e : bn(e), r = r && !u ? P(r) : 0;
        var o = e.length;
        return r < 0 && (r = pe(o + r, 0)), hi(e) ? r <= o && e.indexOf(t, r) > -1 : !!o && gn(e, t, r) > -1;
      }
      var Zg = V(function(e, t, r) {
        var u = -1, o = typeof t == "function", c = We(e) ? w(e.length) : [];
        return $t(e, function(m) {
          c[++u] = o ? Ze(t, m, r) : er(m, t, r);
        }), c;
      }), Vg = Qr(function(e, t, r) {
        Et(e, r, t);
      });
      function ai(e, t) {
        var r = $(e) ? se : Da;
        return r(e, D(t, 3));
      }
      function Hg(e, t, r, u) {
        return e == null ? [] : ($(t) || (t = t == null ? [] : [t]), r = u ? i : r, $(r) || (r = r == null ? [] : [r]), Fa(e, t, r));
      }
      var Bg = Qr(function(e, t, r) {
        e[r ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function zg(e, t, r) {
        var u = $(e) ? Xi : ua, o = arguments.length < 3;
        return u(e, D(t, 4), r, o, $t);
      }
      function qg(e, t, r) {
        var u = $(e) ? ih : ua, o = arguments.length < 3;
        return u(e, D(t, 4), r, o, Ia);
      }
      function Gg(e, t) {
        var r = $(e) ? Wt : Ea;
        return r(e, fi(D(t, 3)));
      }
      function Yg(e) {
        var t = $(e) ? Ta : Pd;
        return t(e);
      }
      function Jg(e, t, r) {
        (r ? ke(e, t, r) : t === i) ? t = 1 : t = P(t);
        var u = $(e) ? yd : Zd;
        return u(e, t);
      }
      function Kg(e) {
        var t = $(e) ? _d : Hd;
        return t(e);
      }
      function Xg(e) {
        if (e == null)
          return 0;
        if (We(e))
          return hi(e) ? yn(e) : e.length;
        var t = Oe(e);
        return t == ut || t == at ? e.size : ps(e).length;
      }
      function Qg(e, t, r) {
        var u = $(e) ? Qi : Bd;
        return r && ke(e, t, r) && (t = i), u(e, D(t, 3));
      }
      var jg = V(function(e, t) {
        if (e == null)
          return [];
        var r = t.length;
        return r > 1 && ke(e, t[0], t[1]) ? t = [] : r > 2 && ke(t[0], t[1], t[2]) && (t = [t[0]]), Fa(e, ve(t, 1), []);
      }), oi = Ch || function() {
        return _e.Date.now();
      };
      function e0(e, t) {
        if (typeof t != "function")
          throw new Ke(d);
        return e = P(e), function() {
          if (--e < 1)
            return t.apply(this, arguments);
        };
      }
      function No(e, t, r) {
        return t = r ? i : t, t = e && t == null ? e.length : t, bt(e, Ae, i, i, i, i, t);
      }
      function Do(e, t) {
        var r;
        if (typeof t != "function")
          throw new Ke(d);
        return e = P(e), function() {
          return --e > 0 && (r = t.apply(this, arguments)), e <= 1 && (t = i), r;
        };
      }
      var Ps = V(function(e, t, r) {
        var u = re;
        if (r.length) {
          var o = Rt(r, In(Ps));
          u |= be;
        }
        return bt(e, u, t, r, o);
      }), Co = V(function(e, t, r) {
        var u = re | Te;
        if (r.length) {
          var o = Rt(r, In(Co));
          u |= be;
        }
        return bt(t, u, e, r, o);
      });
      function Lo(e, t, r) {
        t = r ? i : t;
        var u = bt(e, Ee, i, i, i, i, i, t);
        return u.placeholder = Lo.placeholder, u;
      }
      function Wo(e, t, r) {
        t = r ? i : t;
        var u = bt(e, pt, i, i, i, i, i, t);
        return u.placeholder = Wo.placeholder, u;
      }
      function Fo(e, t, r) {
        var u, o, c, m, g, _, S = 0, O = !1, I = !1, E = !0;
        if (typeof e != "function")
          throw new Ke(d);
        t = tt(t) || 0, ue(r) && (O = !!r.leading, I = "maxWait" in r, c = I ? pe(tt(r.maxWait) || 0, t) : c, E = "trailing" in r ? !!r.trailing : E);
        function k(de) {
          var ct = u, Dt = o;
          return u = o = i, S = de, m = e.apply(Dt, ct), m;
        }
        function L(de) {
          return S = de, g = sr(H, t), O ? k(de) : m;
        }
        function Z(de) {
          var ct = de - _, Dt = de - S, tl = t - ct;
          return I ? Se(tl, c - Dt) : tl;
        }
        function W(de) {
          var ct = de - _, Dt = de - S;
          return _ === i || ct >= t || ct < 0 || I && Dt >= c;
        }
        function H() {
          var de = oi();
          if (W(de))
            return z(de);
          g = sr(H, Z(de));
        }
        function z(de) {
          return g = i, E && u ? k(de) : (u = o = i, m);
        }
        function ze() {
          g !== i && za(g), S = 0, u = _ = o = g = i;
        }
        function Ne() {
          return g === i ? m : z(oi());
        }
        function qe() {
          var de = oi(), ct = W(de);
          if (u = arguments, o = this, _ = de, ct) {
            if (g === i)
              return L(_);
            if (I)
              return za(g), g = sr(H, t), k(_);
          }
          return g === i && (g = sr(H, t)), m;
        }
        return qe.cancel = ze, qe.flush = Ne, qe;
      }
      var t0 = V(function(e, t) {
        return xa(e, 1, t);
      }), n0 = V(function(e, t, r) {
        return xa(e, tt(t) || 0, r);
      });
      function r0(e) {
        return bt(e, $e);
      }
      function li(e, t) {
        if (typeof e != "function" || t != null && typeof t != "function")
          throw new Ke(d);
        var r = function() {
          var u = arguments, o = t ? t.apply(this, u) : u[0], c = r.cache;
          if (c.has(o))
            return c.get(o);
          var m = e.apply(this, u);
          return r.cache = c.set(o, m) || c, m;
        };
        return r.cache = new (li.Cache || It)(), r;
      }
      li.Cache = It;
      function fi(e) {
        if (typeof e != "function")
          throw new Ke(d);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      function i0(e) {
        return Do(2, e);
      }
      var s0 = zd(function(e, t) {
        t = t.length == 1 && $(t[0]) ? se(t[0], Ve(D())) : se(ve(t, 1), Ve(D()));
        var r = t.length;
        return V(function(u) {
          for (var o = -1, c = Se(u.length, r); ++o < c; )
            u[o] = t[o].call(this, u[o]);
          return Ze(e, this, u);
        });
      }), Zs = V(function(e, t) {
        var r = Rt(t, In(Zs));
        return bt(e, be, i, t, r);
      }), Ro = V(function(e, t) {
        var r = Rt(t, In(Ro));
        return bt(e, yt, i, t, r);
      }), u0 = At(function(e, t) {
        return bt(e, St, i, i, i, t);
      });
      function a0(e, t) {
        if (typeof e != "function")
          throw new Ke(d);
        return t = t === i ? t : P(t), V(e, t);
      }
      function o0(e, t) {
        if (typeof e != "function")
          throw new Ke(d);
        return t = t == null ? 0 : pe(P(t), 0), V(function(r) {
          var u = r[t], o = Vt(r, 0, t);
          return u && Ft(o, u), Ze(e, this, o);
        });
      }
      function l0(e, t, r) {
        var u = !0, o = !0;
        if (typeof e != "function")
          throw new Ke(d);
        return ue(r) && (u = "leading" in r ? !!r.leading : u, o = "trailing" in r ? !!r.trailing : o), Fo(e, t, {
          leading: u,
          maxWait: t,
          trailing: o
        });
      }
      function f0(e) {
        return No(e, 1);
      }
      function c0(e, t) {
        return Zs(Is(t), e);
      }
      function h0() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return $(e) ? e : [e];
      }
      function d0(e) {
        return Qe(e, N);
      }
      function m0(e, t) {
        return t = typeof t == "function" ? t : i, Qe(e, N, t);
      }
      function g0(e) {
        return Qe(e, C | N);
      }
      function p0(e, t) {
        return t = typeof t == "function" ? t : i, Qe(e, C | N, t);
      }
      function y0(e, t) {
        return t == null || Oa(e, t, ye(t));
      }
      function ft(e, t) {
        return e === t || e !== e && t !== t;
      }
      var _0 = ni(ds), v0 = ni(function(e, t) {
        return e >= t;
      }), sn = Ma(/* @__PURE__ */ function() {
        return arguments;
      }()) ? Ma : function(e) {
        return le(e) && X.call(e, "callee") && !ga.call(e, "callee");
      }, $ = w.isArray, w0 = Ku ? Ve(Ku) : Ad;
      function We(e) {
        return e != null && ci(e.length) && !kt(e);
      }
      function he(e) {
        return le(e) && We(e);
      }
      function T0(e) {
        return e === !0 || e === !1 || le(e) && Me(e) == $n;
      }
      var Ht = Wh || Qs, S0 = Xu ? Ve(Xu) : Md;
      function O0(e) {
        return le(e) && e.nodeType === 1 && !ur(e);
      }
      function x0(e) {
        if (e == null)
          return !0;
        if (We(e) && ($(e) || typeof e == "string" || typeof e.splice == "function" || Ht(e) || En(e) || sn(e)))
          return !e.length;
        var t = Oe(e);
        if (t == ut || t == at)
          return !e.size;
        if (ir(e))
          return !ps(e).length;
        for (var r in e)
          if (X.call(e, r))
            return !1;
        return !0;
      }
      function I0(e, t) {
        return tr(e, t);
      }
      function E0(e, t, r) {
        r = typeof r == "function" ? r : i;
        var u = r ? r(e, t) : i;
        return u === i ? tr(e, t, i, r) : !!u;
      }
      function Vs(e) {
        if (!le(e))
          return !1;
        var t = Me(e);
        return t == Or || t == Jf || typeof e.message == "string" && typeof e.name == "string" && !ur(e);
      }
      function b0(e) {
        return typeof e == "number" && ya(e);
      }
      function kt(e) {
        if (!ue(e))
          return !1;
        var t = Me(e);
        return t == xr || t == xu || t == Yf || t == Xf;
      }
      function Uo(e) {
        return typeof e == "number" && e == P(e);
      }
      function ci(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Lt;
      }
      function ue(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      function le(e) {
        return e != null && typeof e == "object";
      }
      var $o = Qu ? Ve(Qu) : Nd;
      function A0(e, t) {
        return e === t || gs(e, t, Ds(t));
      }
      function M0(e, t, r) {
        return r = typeof r == "function" ? r : i, gs(e, t, Ds(t), r);
      }
      function k0(e) {
        return Po(e) && e != +e;
      }
      function N0(e) {
        if (mm(e))
          throw new R(h);
        return ka(e);
      }
      function D0(e) {
        return e === null;
      }
      function C0(e) {
        return e == null;
      }
      function Po(e) {
        return typeof e == "number" || le(e) && Me(e) == Zn;
      }
      function ur(e) {
        if (!le(e) || Me(e) != Ot)
          return !1;
        var t = Ur(e);
        if (t === null)
          return !0;
        var r = X.call(t, "constructor") && t.constructor;
        return typeof r == "function" && r instanceof r && Lr.call(r) == Mh;
      }
      var Hs = ju ? Ve(ju) : Dd;
      function L0(e) {
        return Uo(e) && e >= -Lt && e <= Lt;
      }
      var Zo = ea ? Ve(ea) : Cd;
      function hi(e) {
        return typeof e == "string" || !$(e) && le(e) && Me(e) == Hn;
      }
      function Be(e) {
        return typeof e == "symbol" || le(e) && Me(e) == Ir;
      }
      var En = ta ? Ve(ta) : Ld;
      function W0(e) {
        return e === i;
      }
      function F0(e) {
        return le(e) && Oe(e) == Bn;
      }
      function R0(e) {
        return le(e) && Me(e) == jf;
      }
      var U0 = ni(ys), $0 = ni(function(e, t) {
        return e <= t;
      });
      function Vo(e) {
        if (!e)
          return [];
        if (We(e))
          return hi(e) ? ot(e) : Le(e);
        if (Gn && e[Gn])
          return yh(e[Gn]());
        var t = Oe(e), r = t == ut ? is : t == at ? Nr : bn;
        return r(e);
      }
      function Nt(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = tt(e), e === Jt || e === -Jt) {
          var t = e < 0 ? -1 : 1;
          return t * Bf;
        }
        return e === e ? e : 0;
      }
      function P(e) {
        var t = Nt(e), r = t % 1;
        return t === t ? r ? t - r : t : 0;
      }
      function Ho(e) {
        return e ? en(P(e), 0, _t) : 0;
      }
      function tt(e) {
        if (typeof e == "number")
          return e;
        if (Be(e))
          return Tr;
        if (ue(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = ue(t) ? t + "" : t;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = aa(e);
        var r = wc.test(e);
        return r || Sc.test(e) ? eh(e.slice(2), r ? 2 : 8) : vc.test(e) ? Tr : +e;
      }
      function Bo(e) {
        return wt(e, Fe(e));
      }
      function P0(e) {
        return e ? en(P(e), -Lt, Lt) : e === 0 ? e : 0;
      }
      function K(e) {
        return e == null ? "" : He(e);
      }
      var Z0 = On(function(e, t) {
        if (ir(t) || We(t)) {
          wt(t, ye(t), e);
          return;
        }
        for (var r in t)
          X.call(t, r) && Qn(e, r, t[r]);
      }), zo = On(function(e, t) {
        wt(t, Fe(t), e);
      }), di = On(function(e, t, r, u) {
        wt(t, Fe(t), e, u);
      }), V0 = On(function(e, t, r, u) {
        wt(t, ye(t), e, u);
      }), H0 = At(fs);
      function B0(e, t) {
        var r = Sn(e);
        return t == null ? r : Sa(r, t);
      }
      var z0 = V(function(e, t) {
        e = te(e);
        var r = -1, u = t.length, o = u > 2 ? t[2] : i;
        for (o && ke(t[0], t[1], o) && (u = 1); ++r < u; )
          for (var c = t[r], m = Fe(c), g = -1, _ = m.length; ++g < _; ) {
            var S = m[g], O = e[S];
            (O === i || ft(O, vn[S]) && !X.call(e, S)) && (e[S] = c[S]);
          }
        return e;
      }), q0 = V(function(e) {
        return e.push(i, ao), Ze(qo, i, e);
      });
      function G0(e, t) {
        return ra(e, D(t, 3), vt);
      }
      function Y0(e, t) {
        return ra(e, D(t, 3), hs);
      }
      function J0(e, t) {
        return e == null ? e : cs(e, D(t, 3), Fe);
      }
      function K0(e, t) {
        return e == null ? e : ba(e, D(t, 3), Fe);
      }
      function X0(e, t) {
        return e && vt(e, D(t, 3));
      }
      function Q0(e, t) {
        return e && hs(e, D(t, 3));
      }
      function j0(e) {
        return e == null ? [] : Yr(e, ye(e));
      }
      function ep(e) {
        return e == null ? [] : Yr(e, Fe(e));
      }
      function Bs(e, t, r) {
        var u = e == null ? i : tn(e, t);
        return u === i ? r : u;
      }
      function tp(e, t) {
        return e != null && fo(e, t, xd);
      }
      function zs(e, t) {
        return e != null && fo(e, t, Id);
      }
      var np = no(function(e, t, r) {
        t != null && typeof t.toString != "function" && (t = Wr.call(t)), e[t] = r;
      }, Gs(Re)), rp = no(function(e, t, r) {
        t != null && typeof t.toString != "function" && (t = Wr.call(t)), X.call(e, t) ? e[t].push(r) : e[t] = [r];
      }, D), ip = V(er);
      function ye(e) {
        return We(e) ? wa(e) : ps(e);
      }
      function Fe(e) {
        return We(e) ? wa(e, !0) : Wd(e);
      }
      function sp(e, t) {
        var r = {};
        return t = D(t, 3), vt(e, function(u, o, c) {
          Et(r, t(u, o, c), u);
        }), r;
      }
      function up(e, t) {
        var r = {};
        return t = D(t, 3), vt(e, function(u, o, c) {
          Et(r, o, t(u, o, c));
        }), r;
      }
      var ap = On(function(e, t, r) {
        Jr(e, t, r);
      }), qo = On(function(e, t, r, u) {
        Jr(e, t, r, u);
      }), op = At(function(e, t) {
        var r = {};
        if (e == null)
          return r;
        var u = !1;
        t = se(t, function(c) {
          return c = Zt(c, e), u || (u = c.length > 1), c;
        }), wt(e, ks(e), r), u && (r = Qe(r, C | Q | N, nm));
        for (var o = t.length; o--; )
          Ss(r, t[o]);
        return r;
      });
      function lp(e, t) {
        return Go(e, fi(D(t)));
      }
      var fp = At(function(e, t) {
        return e == null ? {} : Rd(e, t);
      });
      function Go(e, t) {
        if (e == null)
          return {};
        var r = se(ks(e), function(u) {
          return [u];
        });
        return t = D(t), Ra(e, r, function(u, o) {
          return t(u, o[0]);
        });
      }
      function cp(e, t, r) {
        t = Zt(t, e);
        var u = -1, o = t.length;
        for (o || (o = 1, e = i); ++u < o; ) {
          var c = e == null ? i : e[Tt(t[u])];
          c === i && (u = o, c = r), e = kt(c) ? c.call(e) : c;
        }
        return e;
      }
      function hp(e, t, r) {
        return e == null ? e : nr(e, t, r);
      }
      function dp(e, t, r, u) {
        return u = typeof u == "function" ? u : i, e == null ? e : nr(e, t, r, u);
      }
      var Yo = so(ye), Jo = so(Fe);
      function mp(e, t, r) {
        var u = $(e), o = u || Ht(e) || En(e);
        if (t = D(t, 4), r == null) {
          var c = e && e.constructor;
          o ? r = u ? new c() : [] : ue(e) ? r = kt(c) ? Sn(Ur(e)) : {} : r = {};
        }
        return (o ? Je : vt)(e, function(m, g, _) {
          return t(r, m, g, _);
        }), r;
      }
      function gp(e, t) {
        return e == null ? !0 : Ss(e, t);
      }
      function pp(e, t, r) {
        return e == null ? e : Va(e, t, Is(r));
      }
      function yp(e, t, r, u) {
        return u = typeof u == "function" ? u : i, e == null ? e : Va(e, t, Is(r), u);
      }
      function bn(e) {
        return e == null ? [] : rs(e, ye(e));
      }
      function _p(e) {
        return e == null ? [] : rs(e, Fe(e));
      }
      function vp(e, t, r) {
        return r === i && (r = t, t = i), r !== i && (r = tt(r), r = r === r ? r : 0), t !== i && (t = tt(t), t = t === t ? t : 0), en(tt(e), t, r);
      }
      function wp(e, t, r) {
        return t = Nt(t), r === i ? (r = t, t = 0) : r = Nt(r), e = tt(e), Ed(e, t, r);
      }
      function Tp(e, t, r) {
        if (r && typeof r != "boolean" && ke(e, t, r) && (t = r = i), r === i && (typeof t == "boolean" ? (r = t, t = i) : typeof e == "boolean" && (r = e, e = i)), e === i && t === i ? (e = 0, t = 1) : (e = Nt(e), t === i ? (t = e, e = 0) : t = Nt(t)), e > t) {
          var u = e;
          e = t, t = u;
        }
        if (r || e % 1 || t % 1) {
          var o = _a();
          return Se(e + o * (t - e + jc("1e-" + ((o + "").length - 1))), t);
        }
        return vs(e, t);
      }
      var Sp = xn(function(e, t, r) {
        return t = t.toLowerCase(), e + (r ? Ko(t) : t);
      });
      function Ko(e) {
        return qs(K(e).toLowerCase());
      }
      function Xo(e) {
        return e = K(e), e && e.replace(xc, hh).replace(Hc, "");
      }
      function Op(e, t, r) {
        e = K(e), t = He(t);
        var u = e.length;
        r = r === i ? u : en(P(r), 0, u);
        var o = r;
        return r -= t.length, r >= 0 && e.slice(r, o) == t;
      }
      function xp(e) {
        return e = K(e), e && ic.test(e) ? e.replace(bu, dh) : e;
      }
      function Ip(e) {
        return e = K(e), e && fc.test(e) ? e.replace(Zi, "\\$&") : e;
      }
      var Ep = xn(function(e, t, r) {
        return e + (r ? "-" : "") + t.toLowerCase();
      }), bp = xn(function(e, t, r) {
        return e + (r ? " " : "") + t.toLowerCase();
      }), Ap = ja("toLowerCase");
      function Mp(e, t, r) {
        e = K(e), t = P(t);
        var u = t ? yn(e) : 0;
        if (!t || u >= t)
          return e;
        var o = (t - u) / 2;
        return ti(Vr(o), r) + e + ti(Zr(o), r);
      }
      function kp(e, t, r) {
        e = K(e), t = P(t);
        var u = t ? yn(e) : 0;
        return t && u < t ? e + ti(t - u, r) : e;
      }
      function Np(e, t, r) {
        e = K(e), t = P(t);
        var u = t ? yn(e) : 0;
        return t && u < t ? ti(t - u, r) + e : e;
      }
      function Dp(e, t, r) {
        return r || t == null ? t = 0 : t && (t = +t), $h(K(e).replace(Vi, ""), t || 0);
      }
      function Cp(e, t, r) {
        return (r ? ke(e, t, r) : t === i) ? t = 1 : t = P(t), ws(K(e), t);
      }
      function Lp() {
        var e = arguments, t = K(e[0]);
        return e.length < 3 ? t : t.replace(e[1], e[2]);
      }
      var Wp = xn(function(e, t, r) {
        return e + (r ? "_" : "") + t.toLowerCase();
      });
      function Fp(e, t, r) {
        return r && typeof r != "number" && ke(e, t, r) && (t = r = i), r = r === i ? _t : r >>> 0, r ? (e = K(e), e && (typeof t == "string" || t != null && !Hs(t)) && (t = He(t), !t && pn(e)) ? Vt(ot(e), 0, r) : e.split(t, r)) : [];
      }
      var Rp = xn(function(e, t, r) {
        return e + (r ? " " : "") + qs(t);
      });
      function Up(e, t, r) {
        return e = K(e), r = r == null ? 0 : en(P(r), 0, e.length), t = He(t), e.slice(r, r + t.length) == t;
      }
      function $p(e, t, r) {
        var u = f.templateSettings;
        r && ke(e, t, r) && (t = i), e = K(e), t = di({}, t, u, uo);
        var o = di({}, t.imports, u.imports, uo), c = ye(o), m = rs(o, c), g, _, S = 0, O = t.interpolate || Er, I = "__p += '", E = ss(
          (t.escape || Er).source + "|" + O.source + "|" + (O === Au ? _c : Er).source + "|" + (t.evaluate || Er).source + "|$",
          "g"
        ), k = "//# sourceURL=" + (X.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Yc + "]") + `
`;
        e.replace(E, function(W, H, z, ze, Ne, qe) {
          return z || (z = ze), I += e.slice(S, qe).replace(Ic, mh), H && (g = !0, I += `' +
__e(` + H + `) +
'`), Ne && (_ = !0, I += `';
` + Ne + `;
__p += '`), z && (I += `' +
((__t = (` + z + `)) == null ? '' : __t) +
'`), S = qe + W.length, W;
        }), I += `';
`;
        var L = X.call(t, "variable") && t.variable;
        if (!L)
          I = `with (obj) {
` + I + `
}
`;
        else if (pc.test(L))
          throw new R(y);
        I = (_ ? I.replace(ec, "") : I).replace(tc, "$1").replace(nc, "$1;"), I = "function(" + (L || "obj") + `) {
` + (L ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (g ? ", __e = _.escape" : "") + (_ ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + I + `return __p
}`;
        var Z = jo(function() {
          return Y(c, k + "return " + I).apply(i, m);
        });
        if (Z.source = I, Vs(Z))
          throw Z;
        return Z;
      }
      function Pp(e) {
        return K(e).toLowerCase();
      }
      function Zp(e) {
        return K(e).toUpperCase();
      }
      function Vp(e, t, r) {
        if (e = K(e), e && (r || t === i))
          return aa(e);
        if (!e || !(t = He(t)))
          return e;
        var u = ot(e), o = ot(t), c = oa(u, o), m = la(u, o) + 1;
        return Vt(u, c, m).join("");
      }
      function Hp(e, t, r) {
        if (e = K(e), e && (r || t === i))
          return e.slice(0, ca(e) + 1);
        if (!e || !(t = He(t)))
          return e;
        var u = ot(e), o = la(u, ot(t)) + 1;
        return Vt(u, 0, o).join("");
      }
      function Bp(e, t, r) {
        if (e = K(e), e && (r || t === i))
          return e.replace(Vi, "");
        if (!e || !(t = He(t)))
          return e;
        var u = ot(e), o = oa(u, ot(t));
        return Vt(u, o).join("");
      }
      function zp(e, t) {
        var r = q, u = Pe;
        if (ue(t)) {
          var o = "separator" in t ? t.separator : o;
          r = "length" in t ? P(t.length) : r, u = "omission" in t ? He(t.omission) : u;
        }
        e = K(e);
        var c = e.length;
        if (pn(e)) {
          var m = ot(e);
          c = m.length;
        }
        if (r >= c)
          return e;
        var g = r - yn(u);
        if (g < 1)
          return u;
        var _ = m ? Vt(m, 0, g).join("") : e.slice(0, g);
        if (o === i)
          return _ + u;
        if (m && (g += _.length - g), Hs(o)) {
          if (e.slice(g).search(o)) {
            var S, O = _;
            for (o.global || (o = ss(o.source, K(Mu.exec(o)) + "g")), o.lastIndex = 0; S = o.exec(O); )
              var I = S.index;
            _ = _.slice(0, I === i ? g : I);
          }
        } else if (e.indexOf(He(o), g) != g) {
          var E = _.lastIndexOf(o);
          E > -1 && (_ = _.slice(0, E));
        }
        return _ + u;
      }
      function qp(e) {
        return e = K(e), e && rc.test(e) ? e.replace(Eu, Th) : e;
      }
      var Gp = xn(function(e, t, r) {
        return e + (r ? " " : "") + t.toUpperCase();
      }), qs = ja("toUpperCase");
      function Qo(e, t, r) {
        return e = K(e), t = r ? i : t, t === i ? ph(e) ? xh(e) : ah(e) : e.match(t) || [];
      }
      var jo = V(function(e, t) {
        try {
          return Ze(e, i, t);
        } catch (r) {
          return Vs(r) ? r : new R(r);
        }
      }), Yp = At(function(e, t) {
        return Je(t, function(r) {
          r = Tt(r), Et(e, r, Ps(e[r], e));
        }), e;
      });
      function Jp(e) {
        var t = e == null ? 0 : e.length, r = D();
        return e = t ? se(e, function(u) {
          if (typeof u[1] != "function")
            throw new Ke(d);
          return [r(u[0]), u[1]];
        }) : [], V(function(u) {
          for (var o = -1; ++o < t; ) {
            var c = e[o];
            if (Ze(c[0], this, u))
              return Ze(c[1], this, u);
          }
        });
      }
      function Kp(e) {
        return Td(Qe(e, C));
      }
      function Gs(e) {
        return function() {
          return e;
        };
      }
      function Xp(e, t) {
        return e == null || e !== e ? t : e;
      }
      var Qp = to(), jp = to(!0);
      function Re(e) {
        return e;
      }
      function Ys(e) {
        return Na(typeof e == "function" ? e : Qe(e, C));
      }
      function ey(e) {
        return Ca(Qe(e, C));
      }
      function ty(e, t) {
        return La(e, Qe(t, C));
      }
      var ny = V(function(e, t) {
        return function(r) {
          return er(r, e, t);
        };
      }), ry = V(function(e, t) {
        return function(r) {
          return er(e, r, t);
        };
      });
      function Js(e, t, r) {
        var u = ye(t), o = Yr(t, u);
        r == null && !(ue(t) && (o.length || !u.length)) && (r = t, t = e, e = this, o = Yr(t, ye(t)));
        var c = !(ue(r) && "chain" in r) || !!r.chain, m = kt(e);
        return Je(o, function(g) {
          var _ = t[g];
          e[g] = _, m && (e.prototype[g] = function() {
            var S = this.__chain__;
            if (c || S) {
              var O = e(this.__wrapped__), I = O.__actions__ = Le(this.__actions__);
              return I.push({ func: _, args: arguments, thisArg: e }), O.__chain__ = S, O;
            }
            return _.apply(e, Ft([this.value()], arguments));
          });
        }), e;
      }
      function iy() {
        return _e._ === this && (_e._ = kh), this;
      }
      function Ks() {
      }
      function sy(e) {
        return e = P(e), V(function(t) {
          return Wa(t, e);
        });
      }
      var uy = bs(se), ay = bs(na), oy = bs(Qi);
      function el(e) {
        return Ls(e) ? ji(Tt(e)) : Ud(e);
      }
      function ly(e) {
        return function(t) {
          return e == null ? i : tn(e, t);
        };
      }
      var fy = ro(), cy = ro(!0);
      function Xs() {
        return [];
      }
      function Qs() {
        return !1;
      }
      function hy() {
        return {};
      }
      function dy() {
        return "";
      }
      function my() {
        return !0;
      }
      function gy(e, t) {
        if (e = P(e), e < 1 || e > Lt)
          return [];
        var r = _t, u = Se(e, _t);
        t = D(t), e -= _t;
        for (var o = ns(u, t); ++r < e; )
          t(r);
        return o;
      }
      function py(e) {
        return $(e) ? se(e, Tt) : Be(e) ? [e] : Le(wo(K(e)));
      }
      function yy(e) {
        var t = ++Ah;
        return K(e) + t;
      }
      var _y = ei(function(e, t) {
        return e + t;
      }, 0), vy = As("ceil"), wy = ei(function(e, t) {
        return e / t;
      }, 1), Ty = As("floor");
      function Sy(e) {
        return e && e.length ? Gr(e, Re, ds) : i;
      }
      function Oy(e, t) {
        return e && e.length ? Gr(e, D(t, 2), ds) : i;
      }
      function xy(e) {
        return sa(e, Re);
      }
      function Iy(e, t) {
        return sa(e, D(t, 2));
      }
      function Ey(e) {
        return e && e.length ? Gr(e, Re, ys) : i;
      }
      function by(e, t) {
        return e && e.length ? Gr(e, D(t, 2), ys) : i;
      }
      var Ay = ei(function(e, t) {
        return e * t;
      }, 1), My = As("round"), ky = ei(function(e, t) {
        return e - t;
      }, 0);
      function Ny(e) {
        return e && e.length ? ts(e, Re) : 0;
      }
      function Dy(e, t) {
        return e && e.length ? ts(e, D(t, 2)) : 0;
      }
      return f.after = e0, f.ary = No, f.assign = Z0, f.assignIn = zo, f.assignInWith = di, f.assignWith = V0, f.at = H0, f.before = Do, f.bind = Ps, f.bindAll = Yp, f.bindKey = Co, f.castArray = h0, f.chain = Ao, f.chunk = Tm, f.compact = Sm, f.concat = Om, f.cond = Jp, f.conforms = Kp, f.constant = Gs, f.countBy = Ng, f.create = B0, f.curry = Lo, f.curryRight = Wo, f.debounce = Fo, f.defaults = z0, f.defaultsDeep = q0, f.defer = t0, f.delay = n0, f.difference = xm, f.differenceBy = Im, f.differenceWith = Em, f.drop = bm, f.dropRight = Am, f.dropRightWhile = Mm, f.dropWhile = km, f.fill = Nm, f.filter = Cg, f.flatMap = Fg, f.flatMapDeep = Rg, f.flatMapDepth = Ug, f.flatten = xo, f.flattenDeep = Dm, f.flattenDepth = Cm, f.flip = r0, f.flow = Qp, f.flowRight = jp, f.fromPairs = Lm, f.functions = j0, f.functionsIn = ep, f.groupBy = $g, f.initial = Fm, f.intersection = Rm, f.intersectionBy = Um, f.intersectionWith = $m, f.invert = np, f.invertBy = rp, f.invokeMap = Zg, f.iteratee = Ys, f.keyBy = Vg, f.keys = ye, f.keysIn = Fe, f.map = ai, f.mapKeys = sp, f.mapValues = up, f.matches = ey, f.matchesProperty = ty, f.memoize = li, f.merge = ap, f.mergeWith = qo, f.method = ny, f.methodOf = ry, f.mixin = Js, f.negate = fi, f.nthArg = sy, f.omit = op, f.omitBy = lp, f.once = i0, f.orderBy = Hg, f.over = uy, f.overArgs = s0, f.overEvery = ay, f.overSome = oy, f.partial = Zs, f.partialRight = Ro, f.partition = Bg, f.pick = fp, f.pickBy = Go, f.property = el, f.propertyOf = ly, f.pull = Hm, f.pullAll = Eo, f.pullAllBy = Bm, f.pullAllWith = zm, f.pullAt = qm, f.range = fy, f.rangeRight = cy, f.rearg = u0, f.reject = Gg, f.remove = Gm, f.rest = a0, f.reverse = Us, f.sampleSize = Jg, f.set = hp, f.setWith = dp, f.shuffle = Kg, f.slice = Ym, f.sortBy = jg, f.sortedUniq = tg, f.sortedUniqBy = ng, f.split = Fp, f.spread = o0, f.tail = rg, f.take = ig, f.takeRight = sg, f.takeRightWhile = ug, f.takeWhile = ag, f.tap = Sg, f.throttle = l0, f.thru = ui, f.toArray = Vo, f.toPairs = Yo, f.toPairsIn = Jo, f.toPath = py, f.toPlainObject = Bo, f.transform = mp, f.unary = f0, f.union = og, f.unionBy = lg, f.unionWith = fg, f.uniq = cg, f.uniqBy = hg, f.uniqWith = dg, f.unset = gp, f.unzip = $s, f.unzipWith = bo, f.update = pp, f.updateWith = yp, f.values = bn, f.valuesIn = _p, f.without = mg, f.words = Qo, f.wrap = c0, f.xor = gg, f.xorBy = pg, f.xorWith = yg, f.zip = _g, f.zipObject = vg, f.zipObjectDeep = wg, f.zipWith = Tg, f.entries = Yo, f.entriesIn = Jo, f.extend = zo, f.extendWith = di, Js(f, f), f.add = _y, f.attempt = jo, f.camelCase = Sp, f.capitalize = Ko, f.ceil = vy, f.clamp = vp, f.clone = d0, f.cloneDeep = g0, f.cloneDeepWith = p0, f.cloneWith = m0, f.conformsTo = y0, f.deburr = Xo, f.defaultTo = Xp, f.divide = wy, f.endsWith = Op, f.eq = ft, f.escape = xp, f.escapeRegExp = Ip, f.every = Dg, f.find = Lg, f.findIndex = So, f.findKey = G0, f.findLast = Wg, f.findLastIndex = Oo, f.findLastKey = Y0, f.floor = Ty, f.forEach = Mo, f.forEachRight = ko, f.forIn = J0, f.forInRight = K0, f.forOwn = X0, f.forOwnRight = Q0, f.get = Bs, f.gt = _0, f.gte = v0, f.has = tp, f.hasIn = zs, f.head = Io, f.identity = Re, f.includes = Pg, f.indexOf = Wm, f.inRange = wp, f.invoke = ip, f.isArguments = sn, f.isArray = $, f.isArrayBuffer = w0, f.isArrayLike = We, f.isArrayLikeObject = he, f.isBoolean = T0, f.isBuffer = Ht, f.isDate = S0, f.isElement = O0, f.isEmpty = x0, f.isEqual = I0, f.isEqualWith = E0, f.isError = Vs, f.isFinite = b0, f.isFunction = kt, f.isInteger = Uo, f.isLength = ci, f.isMap = $o, f.isMatch = A0, f.isMatchWith = M0, f.isNaN = k0, f.isNative = N0, f.isNil = C0, f.isNull = D0, f.isNumber = Po, f.isObject = ue, f.isObjectLike = le, f.isPlainObject = ur, f.isRegExp = Hs, f.isSafeInteger = L0, f.isSet = Zo, f.isString = hi, f.isSymbol = Be, f.isTypedArray = En, f.isUndefined = W0, f.isWeakMap = F0, f.isWeakSet = R0, f.join = Pm, f.kebabCase = Ep, f.last = et, f.lastIndexOf = Zm, f.lowerCase = bp, f.lowerFirst = Ap, f.lt = U0, f.lte = $0, f.max = Sy, f.maxBy = Oy, f.mean = xy, f.meanBy = Iy, f.min = Ey, f.minBy = by, f.stubArray = Xs, f.stubFalse = Qs, f.stubObject = hy, f.stubString = dy, f.stubTrue = my, f.multiply = Ay, f.nth = Vm, f.noConflict = iy, f.noop = Ks, f.now = oi, f.pad = Mp, f.padEnd = kp, f.padStart = Np, f.parseInt = Dp, f.random = Tp, f.reduce = zg, f.reduceRight = qg, f.repeat = Cp, f.replace = Lp, f.result = cp, f.round = My, f.runInContext = p, f.sample = Yg, f.size = Xg, f.snakeCase = Wp, f.some = Qg, f.sortedIndex = Jm, f.sortedIndexBy = Km, f.sortedIndexOf = Xm, f.sortedLastIndex = Qm, f.sortedLastIndexBy = jm, f.sortedLastIndexOf = eg, f.startCase = Rp, f.startsWith = Up, f.subtract = ky, f.sum = Ny, f.sumBy = Dy, f.template = $p, f.times = gy, f.toFinite = Nt, f.toInteger = P, f.toLength = Ho, f.toLower = Pp, f.toNumber = tt, f.toSafeInteger = P0, f.toString = K, f.toUpper = Zp, f.trim = Vp, f.trimEnd = Hp, f.trimStart = Bp, f.truncate = zp, f.unescape = qp, f.uniqueId = yy, f.upperCase = Gp, f.upperFirst = qs, f.each = Mo, f.eachRight = ko, f.first = Io, Js(f, function() {
        var e = {};
        return vt(f, function(t, r) {
          X.call(f.prototype, r) || (e[r] = t);
        }), e;
      }(), { chain: !1 }), f.VERSION = a, Je(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        f[e].placeholder = f;
      }), Je(["drop", "take"], function(e, t) {
        B.prototype[e] = function(r) {
          r = r === i ? 1 : pe(P(r), 0);
          var u = this.__filtered__ && !t ? new B(this) : this.clone();
          return u.__filtered__ ? u.__takeCount__ = Se(r, u.__takeCount__) : u.__views__.push({
            size: Se(r, _t),
            type: e + (u.__dir__ < 0 ? "Right" : "")
          }), u;
        }, B.prototype[e + "Right"] = function(r) {
          return this.reverse()[e](r).reverse();
        };
      }), Je(["filter", "map", "takeWhile"], function(e, t) {
        var r = t + 1, u = r == Ou || r == Hf;
        B.prototype[e] = function(o) {
          var c = this.clone();
          return c.__iteratees__.push({
            iteratee: D(o, 3),
            type: r
          }), c.__filtered__ = c.__filtered__ || u, c;
        };
      }), Je(["head", "last"], function(e, t) {
        var r = "take" + (t ? "Right" : "");
        B.prototype[e] = function() {
          return this[r](1).value()[0];
        };
      }), Je(["initial", "tail"], function(e, t) {
        var r = "drop" + (t ? "" : "Right");
        B.prototype[e] = function() {
          return this.__filtered__ ? new B(this) : this[r](1);
        };
      }), B.prototype.compact = function() {
        return this.filter(Re);
      }, B.prototype.find = function(e) {
        return this.filter(e).head();
      }, B.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, B.prototype.invokeMap = V(function(e, t) {
        return typeof e == "function" ? new B(this) : this.map(function(r) {
          return er(r, e, t);
        });
      }), B.prototype.reject = function(e) {
        return this.filter(fi(D(e)));
      }, B.prototype.slice = function(e, t) {
        e = P(e);
        var r = this;
        return r.__filtered__ && (e > 0 || t < 0) ? new B(r) : (e < 0 ? r = r.takeRight(-e) : e && (r = r.drop(e)), t !== i && (t = P(t), r = t < 0 ? r.dropRight(-t) : r.take(t - e)), r);
      }, B.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, B.prototype.toArray = function() {
        return this.take(_t);
      }, vt(B.prototype, function(e, t) {
        var r = /^(?:filter|find|map|reject)|While$/.test(t), u = /^(?:head|last)$/.test(t), o = f[u ? "take" + (t == "last" ? "Right" : "") : t], c = u || /^find/.test(t);
        o && (f.prototype[t] = function() {
          var m = this.__wrapped__, g = u ? [1] : arguments, _ = m instanceof B, S = g[0], O = _ || $(m), I = function(H) {
            var z = o.apply(f, Ft([H], g));
            return u && E ? z[0] : z;
          };
          O && r && typeof S == "function" && S.length != 1 && (_ = O = !1);
          var E = this.__chain__, k = !!this.__actions__.length, L = c && !E, Z = _ && !k;
          if (!c && O) {
            m = Z ? m : new B(this);
            var W = e.apply(m, g);
            return W.__actions__.push({ func: ui, args: [I], thisArg: i }), new Xe(W, E);
          }
          return L && Z ? e.apply(this, g) : (W = this.thru(I), L ? u ? W.value()[0] : W.value() : W);
        });
      }), Je(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var t = Dr[e], r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", u = /^(?:pop|shift)$/.test(e);
        f.prototype[e] = function() {
          var o = arguments;
          if (u && !this.__chain__) {
            var c = this.value();
            return t.apply($(c) ? c : [], o);
          }
          return this[r](function(m) {
            return t.apply($(m) ? m : [], o);
          });
        };
      }), vt(B.prototype, function(e, t) {
        var r = f[t];
        if (r) {
          var u = r.name + "";
          X.call(Tn, u) || (Tn[u] = []), Tn[u].push({ name: t, func: r });
        }
      }), Tn[jr(i, Te).name] = [{
        name: "wrapper",
        func: i
      }], B.prototype.clone = qh, B.prototype.reverse = Gh, B.prototype.value = Yh, f.prototype.at = Og, f.prototype.chain = xg, f.prototype.commit = Ig, f.prototype.next = Eg, f.prototype.plant = Ag, f.prototype.reverse = Mg, f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = kg, f.prototype.first = f.prototype.head, Gn && (f.prototype[Gn] = bg), f;
    }, _n = Ih();
    Kt ? ((Kt.exports = _n)._ = _n, Yi._ = _n) : _e._ = _n;
  }).call(ar);
})(Si, Si.exports);
var Yt = Si.exports;
const ce = (s, n, i = void 0) => Yt.get(window.AppConfig[s], n, i), av = (s = "") => ce("wc", "currency_symbols")[s || ce("wc", "currency")] || "", xe = (s, n = "") => Yt.get(window.AppConfig.i18n, s, n) || `i18n[${s}]`, mu = (s = "shop") => s === "order" ? ce("pos", "tax_display_order") : s === "receipt" ? ce("pos", "tax_display_receipt") : s === "cart" ? ce("wc", "tax_display_cart") : ce("wc", "tax_display_shop"), or = (s) => s.reduce((n, i) => n + Yt.toNumber(i), 0), lr = (s, n) => {
  let i = [];
  return Yt.isMap(s) && (i = [...s.values()]), Yt.isPlainObject(s) && (i = Object.values(s)), Yt.isArray(s) && (i = s), i.map(
    (a) => typeof a[n] < "u" ? a[n] : null
  );
}, Qy = () => {
  const s = ce("wp", "gmt_offset");
  return `UTC${s >= 0 ? "+" : ""}${s}`;
}, il = (s, n) => {
  const i = s.find((a) => a.key === n);
  return i == null ? void 0 : i.value;
};
function jy(s, n = !1) {
  const i = {
    // Day
    d: "dd",
    D: n ? "ccc" : "EEE",
    j: "d",
    l: n ? "cccc" : "EEEE",
    N: n ? "s" : "E",
    S: "",
    // no equivalent
    w: "",
    // no equivalent, use N
    z: "o",
    // Week
    W: "W",
    // Month
    F: n ? "LLLL" : "MMMM",
    m: n ? "LL" : "MM",
    M: n ? "LLL" : "MMM",
    n: n ? "L" : "M",
    t: "",
    // no equivalent
    // Year
    L: "",
    // no equivalent
    o: "kkkk",
    X: "",
    // no equivalent
    x: "",
    // no equivalent
    Y: "yyyy",
    y: "yy",
    // Time
    a: "a",
    A: "a",
    // close enough
    B: "",
    // no equivalent
    g: "h",
    G: "H",
    h: "hh",
    H: "HH",
    i: "mm",
    s: "ss",
    u: "",
    // no equivalent, use v
    v: "SSS",
    // Timezone
    e: "z",
    I: "",
    // no equivalent
    O: "ZZZ",
    P: "ZZ",
    // no equivalent
    p: "",
    // no equivalent, use P
    T: "ZZZZ",
    Z: "",
    // no equivalent
    // Full Date/Time
    c: "yyyy-LL-dd'T'HH:mm:ssZZ",
    r: "EEE, dd LLL yyyy HH:mm:ss ZZZ",
    U: "X"
  };
  return s.split("").map((a) => a in i ? i[a] : a).join("");
}
class cn extends Error {
}
class e1 extends cn {
  constructor(n) {
    super(`Invalid DateTime: ${n.toMessage()}`);
  }
}
class t1 extends cn {
  constructor(n) {
    super(`Invalid Interval: ${n.toMessage()}`);
  }
}
class n1 extends cn {
  constructor(n) {
    super(`Invalid Duration: ${n.toMessage()}`);
  }
}
class Nn extends cn {
}
class $l extends cn {
  constructor(n) {
    super(`Invalid unit ${n}`);
  }
}
class Ue extends cn {
}
class Bt extends cn {
  constructor() {
    super("Zone is an abstract class");
  }
}
const b = "numeric", gt = "short", Ge = "long", Oi = {
  year: b,
  month: b,
  day: b
}, Pl = {
  year: b,
  month: gt,
  day: b
}, r1 = {
  year: b,
  month: gt,
  day: b,
  weekday: gt
}, Zl = {
  year: b,
  month: Ge,
  day: b
}, Vl = {
  year: b,
  month: Ge,
  day: b,
  weekday: Ge
}, Hl = {
  hour: b,
  minute: b
}, Bl = {
  hour: b,
  minute: b,
  second: b
}, zl = {
  hour: b,
  minute: b,
  second: b,
  timeZoneName: gt
}, ql = {
  hour: b,
  minute: b,
  second: b,
  timeZoneName: Ge
}, Gl = {
  hour: b,
  minute: b,
  hourCycle: "h23"
}, Yl = {
  hour: b,
  minute: b,
  second: b,
  hourCycle: "h23"
}, Jl = {
  hour: b,
  minute: b,
  second: b,
  hourCycle: "h23",
  timeZoneName: gt
}, Kl = {
  hour: b,
  minute: b,
  second: b,
  hourCycle: "h23",
  timeZoneName: Ge
}, Xl = {
  year: b,
  month: b,
  day: b,
  hour: b,
  minute: b
}, Ql = {
  year: b,
  month: b,
  day: b,
  hour: b,
  minute: b,
  second: b
}, jl = {
  year: b,
  month: gt,
  day: b,
  hour: b,
  minute: b
}, ef = {
  year: b,
  month: gt,
  day: b,
  hour: b,
  minute: b,
  second: b
}, i1 = {
  year: b,
  month: gt,
  day: b,
  weekday: gt,
  hour: b,
  minute: b
}, tf = {
  year: b,
  month: Ge,
  day: b,
  hour: b,
  minute: b,
  timeZoneName: gt
}, nf = {
  year: b,
  month: Ge,
  day: b,
  hour: b,
  minute: b,
  second: b,
  timeZoneName: gt
}, rf = {
  year: b,
  month: Ge,
  day: b,
  weekday: Ge,
  hour: b,
  minute: b,
  timeZoneName: Ge
}, sf = {
  year: b,
  month: Ge,
  day: b,
  weekday: Ge,
  hour: b,
  minute: b,
  second: b,
  timeZoneName: Ge
};
class pr {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new Bt();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new Bt();
  }
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new Bt();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(n, i) {
    throw new Bt();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(n, i) {
    throw new Bt();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(n) {
    throw new Bt();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(n) {
    throw new Bt();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new Bt();
  }
}
let js = null;
class bi extends pr {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return js === null && (js = new bi()), js;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(n, { format: i, locale: a }) {
    return mf(n, i, a);
  }
  /** @override **/
  formatOffset(n, i) {
    return mr(this.offset(n), i);
  }
  /** @override **/
  offset(n) {
    return -new Date(n).getTimezoneOffset();
  }
  /** @override **/
  equals(n) {
    return n.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
let wi = {};
function s1(s) {
  return wi[s] || (wi[s] = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: s,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  })), wi[s];
}
const u1 = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function a1(s, n) {
  const i = s.format(n).replace(/\u200E/g, ""), a = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(i), [, l, h, d, y, v, x, M] = a;
  return [d, l, h, y, v, x, M];
}
function o1(s, n) {
  const i = s.formatToParts(n), a = [];
  for (let l = 0; l < i.length; l++) {
    const { type: h, value: d } = i[l], y = u1[h];
    h === "era" ? a[y] = d : U(y) || (a[y] = parseInt(d, 10));
  }
  return a;
}
let mi = {};
class Ct extends pr {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(n) {
    return mi[n] || (mi[n] = new Ct(n)), mi[n];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    mi = {}, wi = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(n) {
    return this.isValidZone(n);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(n) {
    if (!n)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: n }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(n) {
    super(), this.zoneName = n, this.valid = Ct.isValidZone(n);
  }
  /** @override **/
  get type() {
    return "iana";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(n, { format: i, locale: a }) {
    return mf(n, i, a, this.name);
  }
  /** @override **/
  formatOffset(n, i) {
    return mr(this.offset(n), i);
  }
  /** @override **/
  offset(n) {
    const i = new Date(n);
    if (isNaN(i))
      return NaN;
    const a = s1(this.name);
    let [l, h, d, y, v, x, M] = a.formatToParts ? o1(a, i) : a1(a, i);
    y === "BC" && (l = -Math.abs(l) + 1);
    const Q = Mi({
      year: l,
      month: h,
      day: d,
      hour: v === 24 ? 0 : v,
      minute: x,
      second: M,
      millisecond: 0
    });
    let N = +i;
    const ee = N % 1e3;
    return N -= ee >= 0 ? ee : 1e3 + ee, (Q - N) / (60 * 1e3);
  }
  /** @override **/
  equals(n) {
    return n.type === "iana" && n.name === this.name;
  }
  /** @override **/
  get isValid() {
    return this.valid;
  }
}
let sl = {};
function l1(s, n = {}) {
  const i = JSON.stringify([s, n]);
  let a = sl[i];
  return a || (a = new Intl.ListFormat(s, n), sl[i] = a), a;
}
let au = {};
function ou(s, n = {}) {
  const i = JSON.stringify([s, n]);
  let a = au[i];
  return a || (a = new Intl.DateTimeFormat(s, n), au[i] = a), a;
}
let lu = {};
function f1(s, n = {}) {
  const i = JSON.stringify([s, n]);
  let a = lu[i];
  return a || (a = new Intl.NumberFormat(s, n), lu[i] = a), a;
}
let fu = {};
function c1(s, n = {}) {
  const { base: i, ...a } = n, l = JSON.stringify([s, a]);
  let h = fu[l];
  return h || (h = new Intl.RelativeTimeFormat(s, n), fu[l] = h), h;
}
let hr = null;
function h1() {
  return hr || (hr = new Intl.DateTimeFormat().resolvedOptions().locale, hr);
}
let ul = {};
function d1(s) {
  let n = ul[s];
  if (!n) {
    const i = new Intl.Locale(s);
    n = "getWeekInfo" in i ? i.getWeekInfo() : i.weekInfo, ul[s] = n;
  }
  return n;
}
function m1(s) {
  const n = s.indexOf("-x-");
  n !== -1 && (s = s.substring(0, n));
  const i = s.indexOf("-u-");
  if (i === -1)
    return [s];
  {
    let a, l;
    try {
      a = ou(s).resolvedOptions(), l = s;
    } catch {
      const v = s.substring(0, i);
      a = ou(v).resolvedOptions(), l = v;
    }
    const { numberingSystem: h, calendar: d } = a;
    return [l, h, d];
  }
}
function g1(s, n, i) {
  return (i || n) && (s.includes("-u-") || (s += "-u"), i && (s += `-ca-${i}`), n && (s += `-nu-${n}`)), s;
}
function p1(s) {
  const n = [];
  for (let i = 1; i <= 12; i++) {
    const a = F.utc(2009, i, 1);
    n.push(s(a));
  }
  return n;
}
function y1(s) {
  const n = [];
  for (let i = 1; i <= 7; i++) {
    const a = F.utc(2016, 11, 13 + i);
    n.push(s(a));
  }
  return n;
}
function gi(s, n, i, a) {
  const l = s.listingMode();
  return l === "error" ? null : l === "en" ? i(n) : a(n);
}
function _1(s) {
  return s.numberingSystem && s.numberingSystem !== "latn" ? !1 : s.numberingSystem === "latn" || !s.locale || s.locale.startsWith("en") || new Intl.DateTimeFormat(s.intl).resolvedOptions().numberingSystem === "latn";
}
class v1 {
  constructor(n, i, a) {
    this.padTo = a.padTo || 0, this.floor = a.floor || !1;
    const { padTo: l, floor: h, ...d } = a;
    if (!i || Object.keys(d).length > 0) {
      const y = { useGrouping: !1, ...a };
      a.padTo > 0 && (y.minimumIntegerDigits = a.padTo), this.inf = f1(n, y);
    }
  }
  format(n) {
    if (this.inf) {
      const i = this.floor ? Math.floor(n) : n;
      return this.inf.format(i);
    } else {
      const i = this.floor ? Math.floor(n) : _u(n, 3);
      return me(i, this.padTo);
    }
  }
}
class w1 {
  constructor(n, i, a) {
    this.opts = a, this.originalZone = void 0;
    let l;
    if (this.opts.timeZone)
      this.dt = n;
    else if (n.zone.type === "fixed") {
      const d = -1 * (n.offset / 60), y = d >= 0 ? `Etc/GMT+${d}` : `Etc/GMT${d}`;
      n.offset !== 0 && Ct.create(y).valid ? (l = y, this.dt = n) : (l = "UTC", this.dt = n.offset === 0 ? n : n.setZone("UTC").plus({ minutes: n.offset }), this.originalZone = n.zone);
    } else
      n.zone.type === "system" ? this.dt = n : n.zone.type === "iana" ? (this.dt = n, l = n.zone.name) : (l = "UTC", this.dt = n.setZone("UTC").plus({ minutes: n.offset }), this.originalZone = n.zone);
    const h = { ...this.opts };
    h.timeZone = h.timeZone || l, this.dtf = ou(i, h);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: n }) => n).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const n = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? n.map((i) => {
      if (i.type === "timeZoneName") {
        const a = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...i,
          value: a
        };
      } else
        return i;
    }) : n;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class T1 {
  constructor(n, i, a) {
    this.opts = { style: "long", ...a }, !i && hf() && (this.rtf = c1(n, a));
  }
  format(n, i) {
    return this.rtf ? this.rtf.format(n, i) : Z1(i, n, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(n, i) {
    return this.rtf ? this.rtf.formatToParts(n, i) : [];
  }
}
const S1 = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class j {
  static fromOpts(n) {
    return j.create(
      n.locale,
      n.numberingSystem,
      n.outputCalendar,
      n.weekSettings,
      n.defaultToEN
    );
  }
  static create(n, i, a, l, h = !1) {
    const d = n || oe.defaultLocale, y = d || (h ? "en-US" : h1()), v = i || oe.defaultNumberingSystem, x = a || oe.defaultOutputCalendar, M = cu(l) || oe.defaultWeekSettings;
    return new j(y, v, x, M, d);
  }
  static resetCache() {
    hr = null, au = {}, lu = {}, fu = {};
  }
  static fromObject({ locale: n, numberingSystem: i, outputCalendar: a, weekSettings: l } = {}) {
    return j.create(n, i, a, l);
  }
  constructor(n, i, a, l, h) {
    const [d, y, v] = m1(n);
    this.locale = d, this.numberingSystem = i || y || null, this.outputCalendar = a || v || null, this.weekSettings = l, this.intl = g1(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = h, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = _1(this)), this.fastNumbersCached;
  }
  listingMode() {
    const n = this.isEnglish(), i = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return n && i ? "en" : "intl";
  }
  clone(n) {
    return !n || Object.getOwnPropertyNames(n).length === 0 ? this : j.create(
      n.locale || this.specifiedLocale,
      n.numberingSystem || this.numberingSystem,
      n.outputCalendar || this.outputCalendar,
      cu(n.weekSettings) || this.weekSettings,
      n.defaultToEN || !1
    );
  }
  redefaultToEN(n = {}) {
    return this.clone({ ...n, defaultToEN: !0 });
  }
  redefaultToSystem(n = {}) {
    return this.clone({ ...n, defaultToEN: !1 });
  }
  months(n, i = !1) {
    return gi(this, n, yf, () => {
      const a = i ? { month: n, day: "numeric" } : { month: n }, l = i ? "format" : "standalone";
      return this.monthsCache[l][n] || (this.monthsCache[l][n] = p1((h) => this.extract(h, a, "month"))), this.monthsCache[l][n];
    });
  }
  weekdays(n, i = !1) {
    return gi(this, n, wf, () => {
      const a = i ? { weekday: n, year: "numeric", month: "long", day: "numeric" } : { weekday: n }, l = i ? "format" : "standalone";
      return this.weekdaysCache[l][n] || (this.weekdaysCache[l][n] = y1(
        (h) => this.extract(h, a, "weekday")
      )), this.weekdaysCache[l][n];
    });
  }
  meridiems() {
    return gi(
      this,
      void 0,
      () => Tf,
      () => {
        if (!this.meridiemCache) {
          const n = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [F.utc(2016, 11, 13, 9), F.utc(2016, 11, 13, 19)].map(
            (i) => this.extract(i, n, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(n) {
    return gi(this, n, Sf, () => {
      const i = { era: n };
      return this.eraCache[n] || (this.eraCache[n] = [F.utc(-40, 1, 1), F.utc(2017, 1, 1)].map(
        (a) => this.extract(a, i, "era")
      )), this.eraCache[n];
    });
  }
  extract(n, i, a) {
    const l = this.dtFormatter(n, i), h = l.formatToParts(), d = h.find((y) => y.type.toLowerCase() === a);
    return d ? d.value : null;
  }
  numberFormatter(n = {}) {
    return new v1(this.intl, n.forceSimple || this.fastNumbers, n);
  }
  dtFormatter(n, i = {}) {
    return new w1(n, this.intl, i);
  }
  relFormatter(n = {}) {
    return new T1(this.intl, this.isEnglish(), n);
  }
  listFormatter(n = {}) {
    return l1(this.intl, n);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : df() ? d1(this.locale) : S1;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(n) {
    return this.locale === n.locale && this.numberingSystem === n.numberingSystem && this.outputCalendar === n.outputCalendar;
  }
}
let eu = null;
class De extends pr {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return eu === null && (eu = new De(0)), eu;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(n) {
    return n === 0 ? De.utcInstance : new De(n);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(n) {
    if (n) {
      const i = n.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (i)
        return new De(ki(i[1], i[2]));
    }
    return null;
  }
  constructor(n) {
    super(), this.fixed = n;
  }
  /** @override **/
  get type() {
    return "fixed";
  }
  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${mr(this.fixed, "narrow")}`;
  }
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${mr(-this.fixed, "narrow")}`;
  }
  /** @override **/
  offsetName() {
    return this.name;
  }
  /** @override **/
  formatOffset(n, i) {
    return mr(this.fixed, i);
  }
  /** @override **/
  get isUniversal() {
    return !0;
  }
  /** @override **/
  offset() {
    return this.fixed;
  }
  /** @override **/
  equals(n) {
    return n.type === "fixed" && n.fixed === this.fixed;
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
class O1 extends pr {
  constructor(n) {
    super(), this.zoneName = n;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function Gt(s, n) {
  if (U(s) || s === null)
    return n;
  if (s instanceof pr)
    return s;
  if (E1(s)) {
    const i = s.toLowerCase();
    return i === "default" ? n : i === "local" || i === "system" ? bi.instance : i === "utc" || i === "gmt" ? De.utcInstance : De.parseSpecifier(i) || Ct.create(s);
  } else
    return ln(s) ? De.instance(s) : typeof s == "object" && "offset" in s && typeof s.offset == "function" ? s : new O1(s);
}
let al = () => Date.now(), ol = "system", ll = null, fl = null, cl = null, hl = 60, dl, ml = null;
class oe {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return al;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(n) {
    al = n;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(n) {
    ol = n;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return Gt(ol, bi.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return ll;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(n) {
    ll = n;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return fl;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(n) {
    fl = n;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return cl;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(n) {
    cl = n;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return ml;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(n) {
    ml = cu(n);
  }
  /**
   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return hl;
  }
  /**
   * Set the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // cut-off year is 0, so all 'yy' are interpreted as current century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 1949; '50' -> 2050
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(n) {
    hl = n % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return dl;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(n) {
    dl = n;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    j.resetCache(), Ct.resetCache();
  }
}
class mt {
  constructor(n, i) {
    this.reason = n, this.explanation = i;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const uf = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], af = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function rt(s, n) {
  return new mt(
    "unit out of range",
    `you specified ${n} (of type ${typeof n}) as a ${s}, which is invalid`
  );
}
function gu(s, n, i) {
  const a = new Date(Date.UTC(s, n - 1, i));
  s < 100 && s >= 0 && a.setUTCFullYear(a.getUTCFullYear() - 1900);
  const l = a.getUTCDay();
  return l === 0 ? 7 : l;
}
function of(s, n, i) {
  return i + (yr(s) ? af : uf)[n - 1];
}
function lf(s, n) {
  const i = yr(s) ? af : uf, a = i.findIndex((h) => h < n), l = n - i[a];
  return { month: a + 1, day: l };
}
function pu(s, n) {
  return (s - n + 7) % 7 + 1;
}
function xi(s, n = 4, i = 1) {
  const { year: a, month: l, day: h } = s, d = of(a, l, h), y = pu(gu(a, l, h), i);
  let v = Math.floor((d - y + 14 - n) / 7), x;
  return v < 1 ? (x = a - 1, v = gr(x, n, i)) : v > gr(a, n, i) ? (x = a + 1, v = 1) : x = a, { weekYear: x, weekNumber: v, weekday: y, ...Ni(s) };
}
function gl(s, n = 4, i = 1) {
  const { weekYear: a, weekNumber: l, weekday: h } = s, d = pu(gu(a, 1, n), i), y = Dn(a);
  let v = l * 7 + h - d - 7 + n, x;
  v < 1 ? (x = a - 1, v += Dn(x)) : v > y ? (x = a + 1, v -= Dn(a)) : x = a;
  const { month: M, day: C } = lf(x, v);
  return { year: x, month: M, day: C, ...Ni(s) };
}
function tu(s) {
  const { year: n, month: i, day: a } = s, l = of(n, i, a);
  return { year: n, ordinal: l, ...Ni(s) };
}
function pl(s) {
  const { year: n, ordinal: i } = s, { month: a, day: l } = lf(n, i);
  return { year: n, month: a, day: l, ...Ni(s) };
}
function yl(s, n) {
  if (!U(s.localWeekday) || !U(s.localWeekNumber) || !U(s.localWeekYear)) {
    if (!U(s.weekday) || !U(s.weekNumber) || !U(s.weekYear))
      throw new Nn(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return U(s.localWeekday) || (s.weekday = s.localWeekday), U(s.localWeekNumber) || (s.weekNumber = s.localWeekNumber), U(s.localWeekYear) || (s.weekYear = s.localWeekYear), delete s.localWeekday, delete s.localWeekNumber, delete s.localWeekYear, {
      minDaysInFirstWeek: n.getMinDaysInFirstWeek(),
      startOfWeek: n.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function x1(s, n = 4, i = 1) {
  const a = Ai(s.weekYear), l = it(
    s.weekNumber,
    1,
    gr(s.weekYear, n, i)
  ), h = it(s.weekday, 1, 7);
  return a ? l ? h ? !1 : rt("weekday", s.weekday) : rt("week", s.weekNumber) : rt("weekYear", s.weekYear);
}
function I1(s) {
  const n = Ai(s.year), i = it(s.ordinal, 1, Dn(s.year));
  return n ? i ? !1 : rt("ordinal", s.ordinal) : rt("year", s.year);
}
function ff(s) {
  const n = Ai(s.year), i = it(s.month, 1, 12), a = it(s.day, 1, Ii(s.year, s.month));
  return n ? i ? a ? !1 : rt("day", s.day) : rt("month", s.month) : rt("year", s.year);
}
function cf(s) {
  const { hour: n, minute: i, second: a, millisecond: l } = s, h = it(n, 0, 23) || n === 24 && i === 0 && a === 0 && l === 0, d = it(i, 0, 59), y = it(a, 0, 59), v = it(l, 0, 999);
  return h ? d ? y ? v ? !1 : rt("millisecond", l) : rt("second", a) : rt("minute", i) : rt("hour", n);
}
function U(s) {
  return typeof s > "u";
}
function ln(s) {
  return typeof s == "number";
}
function Ai(s) {
  return typeof s == "number" && s % 1 === 0;
}
function E1(s) {
  return typeof s == "string";
}
function b1(s) {
  return Object.prototype.toString.call(s) === "[object Date]";
}
function hf() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function df() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function A1(s) {
  return Array.isArray(s) ? s : [s];
}
function _l(s, n, i) {
  if (s.length !== 0)
    return s.reduce((a, l) => {
      const h = [n(l), l];
      return a && i(a[0], h[0]) === a[0] ? a : h;
    }, null)[1];
}
function M1(s, n) {
  return n.reduce((i, a) => (i[a] = s[a], i), {});
}
function Ln(s, n) {
  return Object.prototype.hasOwnProperty.call(s, n);
}
function cu(s) {
  if (s == null)
    return null;
  if (typeof s != "object")
    throw new Ue("Week settings must be an object");
  if (!it(s.firstDay, 1, 7) || !it(s.minimalDays, 1, 7) || !Array.isArray(s.weekend) || s.weekend.some((n) => !it(n, 1, 7)))
    throw new Ue("Invalid week settings");
  return {
    firstDay: s.firstDay,
    minimalDays: s.minimalDays,
    weekend: Array.from(s.weekend)
  };
}
function it(s, n, i) {
  return Ai(s) && s >= n && s <= i;
}
function k1(s, n) {
  return s - n * Math.floor(s / n);
}
function me(s, n = 2) {
  const i = s < 0;
  let a;
  return i ? a = "-" + ("" + -s).padStart(n, "0") : a = ("" + s).padStart(n, "0"), a;
}
function qt(s) {
  if (!(U(s) || s === null || s === ""))
    return parseInt(s, 10);
}
function un(s) {
  if (!(U(s) || s === null || s === ""))
    return parseFloat(s);
}
function yu(s) {
  if (!(U(s) || s === null || s === "")) {
    const n = parseFloat("0." + s) * 1e3;
    return Math.floor(n);
  }
}
function _u(s, n, i = !1) {
  const a = 10 ** n;
  return (i ? Math.trunc : Math.round)(s * a) / a;
}
function yr(s) {
  return s % 4 === 0 && (s % 100 !== 0 || s % 400 === 0);
}
function Dn(s) {
  return yr(s) ? 366 : 365;
}
function Ii(s, n) {
  const i = k1(n - 1, 12) + 1, a = s + (n - i) / 12;
  return i === 2 ? yr(a) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i - 1];
}
function Mi(s) {
  let n = Date.UTC(
    s.year,
    s.month - 1,
    s.day,
    s.hour,
    s.minute,
    s.second,
    s.millisecond
  );
  return s.year < 100 && s.year >= 0 && (n = new Date(n), n.setUTCFullYear(s.year, s.month - 1, s.day)), +n;
}
function vl(s, n, i) {
  return -pu(gu(s, 1, n), i) + n - 1;
}
function gr(s, n = 4, i = 1) {
  const a = vl(s, n, i), l = vl(s + 1, n, i);
  return (Dn(s) - a + l) / 7;
}
function hu(s) {
  return s > 99 ? s : s > oe.twoDigitCutoffYear ? 1900 + s : 2e3 + s;
}
function mf(s, n, i, a = null) {
  const l = new Date(s), h = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  a && (h.timeZone = a);
  const d = { timeZoneName: n, ...h }, y = new Intl.DateTimeFormat(i, d).formatToParts(l).find((v) => v.type.toLowerCase() === "timezonename");
  return y ? y.value : null;
}
function ki(s, n) {
  let i = parseInt(s, 10);
  Number.isNaN(i) && (i = 0);
  const a = parseInt(n, 10) || 0, l = i < 0 || Object.is(i, -0) ? -a : a;
  return i * 60 + l;
}
function gf(s) {
  const n = Number(s);
  if (typeof s == "boolean" || s === "" || Number.isNaN(n))
    throw new Ue(`Invalid unit value ${s}`);
  return n;
}
function Ei(s, n) {
  const i = {};
  for (const a in s)
    if (Ln(s, a)) {
      const l = s[a];
      if (l == null)
        continue;
      i[n(a)] = gf(l);
    }
  return i;
}
function mr(s, n) {
  const i = Math.trunc(Math.abs(s / 60)), a = Math.trunc(Math.abs(s % 60)), l = s >= 0 ? "+" : "-";
  switch (n) {
    case "short":
      return `${l}${me(i, 2)}:${me(a, 2)}`;
    case "narrow":
      return `${l}${i}${a > 0 ? `:${a}` : ""}`;
    case "techie":
      return `${l}${me(i, 2)}${me(a, 2)}`;
    default:
      throw new RangeError(`Value format ${n} is out of range for property format`);
  }
}
function Ni(s) {
  return M1(s, ["hour", "minute", "second", "millisecond"]);
}
const N1 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], pf = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], D1 = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function yf(s) {
  switch (s) {
    case "narrow":
      return [...D1];
    case "short":
      return [...pf];
    case "long":
      return [...N1];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const _f = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], vf = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], C1 = ["M", "T", "W", "T", "F", "S", "S"];
function wf(s) {
  switch (s) {
    case "narrow":
      return [...C1];
    case "short":
      return [...vf];
    case "long":
      return [..._f];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Tf = ["AM", "PM"], L1 = ["Before Christ", "Anno Domini"], W1 = ["BC", "AD"], F1 = ["B", "A"];
function Sf(s) {
  switch (s) {
    case "narrow":
      return [...F1];
    case "short":
      return [...W1];
    case "long":
      return [...L1];
    default:
      return null;
  }
}
function R1(s) {
  return Tf[s.hour < 12 ? 0 : 1];
}
function U1(s, n) {
  return wf(n)[s.weekday - 1];
}
function $1(s, n) {
  return yf(n)[s.month - 1];
}
function P1(s, n) {
  return Sf(n)[s.year < 0 ? 0 : 1];
}
function Z1(s, n, i = "always", a = !1) {
  const l = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, h = ["hours", "minutes", "seconds"].indexOf(s) === -1;
  if (i === "auto" && h) {
    const C = s === "days";
    switch (n) {
      case 1:
        return C ? "tomorrow" : `next ${l[s][0]}`;
      case -1:
        return C ? "yesterday" : `last ${l[s][0]}`;
      case 0:
        return C ? "today" : `this ${l[s][0]}`;
    }
  }
  const d = Object.is(n, -0) || n < 0, y = Math.abs(n), v = y === 1, x = l[s], M = a ? v ? x[1] : x[2] || x[1] : v ? l[s][0] : s;
  return d ? `${y} ${M} ago` : `in ${y} ${M}`;
}
function wl(s, n) {
  let i = "";
  for (const a of s)
    a.literal ? i += a.val : i += n(a.val);
  return i;
}
const V1 = {
  D: Oi,
  DD: Pl,
  DDD: Zl,
  DDDD: Vl,
  t: Hl,
  tt: Bl,
  ttt: zl,
  tttt: ql,
  T: Gl,
  TT: Yl,
  TTT: Jl,
  TTTT: Kl,
  f: Xl,
  ff: jl,
  fff: tf,
  ffff: rf,
  F: Ql,
  FF: ef,
  FFF: nf,
  FFFF: sf
};
class Ie {
  static create(n, i = {}) {
    return new Ie(n, i);
  }
  static parseFormat(n) {
    let i = null, a = "", l = !1;
    const h = [];
    for (let d = 0; d < n.length; d++) {
      const y = n.charAt(d);
      y === "'" ? (a.length > 0 && h.push({ literal: l || /^\s+$/.test(a), val: a }), i = null, a = "", l = !l) : l || y === i ? a += y : (a.length > 0 && h.push({ literal: /^\s+$/.test(a), val: a }), a = y, i = y);
    }
    return a.length > 0 && h.push({ literal: l || /^\s+$/.test(a), val: a }), h;
  }
  static macroTokenToFormatOpts(n) {
    return V1[n];
  }
  constructor(n, i) {
    this.opts = i, this.loc = n, this.systemLoc = null;
  }
  formatWithSystemDefault(n, i) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(n, { ...this.opts, ...i }).format();
  }
  dtFormatter(n, i = {}) {
    return this.loc.dtFormatter(n, { ...this.opts, ...i });
  }
  formatDateTime(n, i) {
    return this.dtFormatter(n, i).format();
  }
  formatDateTimeParts(n, i) {
    return this.dtFormatter(n, i).formatToParts();
  }
  formatInterval(n, i) {
    return this.dtFormatter(n.start, i).dtf.formatRange(n.start.toJSDate(), n.end.toJSDate());
  }
  resolvedOptions(n, i) {
    return this.dtFormatter(n, i).resolvedOptions();
  }
  num(n, i = 0) {
    if (this.opts.forceSimple)
      return me(n, i);
    const a = { ...this.opts };
    return i > 0 && (a.padTo = i), this.loc.numberFormatter(a).format(n);
  }
  formatDateTimeFromString(n, i) {
    const a = this.loc.listingMode() === "en", l = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", h = (N, ee) => this.loc.extract(n, N, ee), d = (N) => n.isOffsetFixed && n.offset === 0 && N.allowZ ? "Z" : n.isValid ? n.zone.formatOffset(n.ts, N.format) : "", y = () => a ? R1(n) : h({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), v = (N, ee) => a ? $1(n, N) : h(ee ? { month: N } : { month: N, day: "numeric" }, "month"), x = (N, ee) => a ? U1(n, N) : h(
      ee ? { weekday: N } : { weekday: N, month: "long", day: "numeric" },
      "weekday"
    ), M = (N) => {
      const ee = Ie.macroTokenToFormatOpts(N);
      return ee ? this.formatWithSystemDefault(n, ee) : N;
    }, C = (N) => a ? P1(n, N) : h({ era: N }, "era"), Q = (N) => {
      switch (N) {
        case "S":
          return this.num(n.millisecond);
        case "u":
        case "SSS":
          return this.num(n.millisecond, 3);
        case "s":
          return this.num(n.second);
        case "ss":
          return this.num(n.second, 2);
        case "uu":
          return this.num(Math.floor(n.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(n.millisecond / 100));
        case "m":
          return this.num(n.minute);
        case "mm":
          return this.num(n.minute, 2);
        case "h":
          return this.num(n.hour % 12 === 0 ? 12 : n.hour % 12);
        case "hh":
          return this.num(n.hour % 12 === 0 ? 12 : n.hour % 12, 2);
        case "H":
          return this.num(n.hour);
        case "HH":
          return this.num(n.hour, 2);
        case "Z":
          return d({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return d({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return d({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return n.zone.offsetName(n.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return n.zone.offsetName(n.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return n.zoneName;
        case "a":
          return y();
        case "d":
          return l ? h({ day: "numeric" }, "day") : this.num(n.day);
        case "dd":
          return l ? h({ day: "2-digit" }, "day") : this.num(n.day, 2);
        case "c":
          return this.num(n.weekday);
        case "ccc":
          return x("short", !0);
        case "cccc":
          return x("long", !0);
        case "ccccc":
          return x("narrow", !0);
        case "E":
          return this.num(n.weekday);
        case "EEE":
          return x("short", !1);
        case "EEEE":
          return x("long", !1);
        case "EEEEE":
          return x("narrow", !1);
        case "L":
          return l ? h({ month: "numeric", day: "numeric" }, "month") : this.num(n.month);
        case "LL":
          return l ? h({ month: "2-digit", day: "numeric" }, "month") : this.num(n.month, 2);
        case "LLL":
          return v("short", !0);
        case "LLLL":
          return v("long", !0);
        case "LLLLL":
          return v("narrow", !0);
        case "M":
          return l ? h({ month: "numeric" }, "month") : this.num(n.month);
        case "MM":
          return l ? h({ month: "2-digit" }, "month") : this.num(n.month, 2);
        case "MMM":
          return v("short", !1);
        case "MMMM":
          return v("long", !1);
        case "MMMMM":
          return v("narrow", !1);
        case "y":
          return l ? h({ year: "numeric" }, "year") : this.num(n.year);
        case "yy":
          return l ? h({ year: "2-digit" }, "year") : this.num(n.year.toString().slice(-2), 2);
        case "yyyy":
          return l ? h({ year: "numeric" }, "year") : this.num(n.year, 4);
        case "yyyyyy":
          return l ? h({ year: "numeric" }, "year") : this.num(n.year, 6);
        case "G":
          return C("short");
        case "GG":
          return C("long");
        case "GGGGG":
          return C("narrow");
        case "kk":
          return this.num(n.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(n.weekYear, 4);
        case "W":
          return this.num(n.weekNumber);
        case "WW":
          return this.num(n.weekNumber, 2);
        case "n":
          return this.num(n.localWeekNumber);
        case "nn":
          return this.num(n.localWeekNumber, 2);
        case "ii":
          return this.num(n.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(n.localWeekYear, 4);
        case "o":
          return this.num(n.ordinal);
        case "ooo":
          return this.num(n.ordinal, 3);
        case "q":
          return this.num(n.quarter);
        case "qq":
          return this.num(n.quarter, 2);
        case "X":
          return this.num(Math.floor(n.ts / 1e3));
        case "x":
          return this.num(n.ts);
        default:
          return M(N);
      }
    };
    return wl(Ie.parseFormat(i), Q);
  }
  formatDurationFromString(n, i) {
    const a = (v) => {
      switch (v[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, l = (v) => (x) => {
      const M = a(x);
      return M ? this.num(v.get(M), x.length) : x;
    }, h = Ie.parseFormat(i), d = h.reduce(
      (v, { literal: x, val: M }) => x ? v : v.concat(M),
      []
    ), y = n.shiftTo(...d.map(a).filter((v) => v));
    return wl(h, l(y));
  }
}
const Of = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Wn(...s) {
  const n = s.reduce((i, a) => i + a.source, "");
  return RegExp(`^${n}$`);
}
function Fn(...s) {
  return (n) => s.reduce(
    ([i, a, l], h) => {
      const [d, y, v] = h(n, l);
      return [{ ...i, ...d }, y || a, v];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function Rn(s, ...n) {
  if (s == null)
    return [null, null];
  for (const [i, a] of n) {
    const l = i.exec(s);
    if (l)
      return a(l);
  }
  return [null, null];
}
function xf(...s) {
  return (n, i) => {
    const a = {};
    let l;
    for (l = 0; l < s.length; l++)
      a[s[l]] = qt(n[i + l]);
    return [a, null, i + l];
  };
}
const If = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, H1 = `(?:${If.source}?(?:\\[(${Of.source})\\])?)?`, vu = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, Ef = RegExp(`${vu.source}${H1}`), wu = RegExp(`(?:T${Ef.source})?`), B1 = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, z1 = /(\d{4})-?W(\d\d)(?:-?(\d))?/, q1 = /(\d{4})-?(\d{3})/, G1 = xf("weekYear", "weekNumber", "weekDay"), Y1 = xf("year", "ordinal"), J1 = /(\d{4})-(\d\d)-(\d\d)/, bf = RegExp(
  `${vu.source} ?(?:${If.source}|(${Of.source}))?`
), K1 = RegExp(`(?: ${bf.source})?`);
function Cn(s, n, i) {
  const a = s[n];
  return U(a) ? i : qt(a);
}
function X1(s, n) {
  return [{
    year: Cn(s, n),
    month: Cn(s, n + 1, 1),
    day: Cn(s, n + 2, 1)
  }, null, n + 3];
}
function Un(s, n) {
  return [{
    hours: Cn(s, n, 0),
    minutes: Cn(s, n + 1, 0),
    seconds: Cn(s, n + 2, 0),
    milliseconds: yu(s[n + 3])
  }, null, n + 4];
}
function _r(s, n) {
  const i = !s[n] && !s[n + 1], a = ki(s[n + 1], s[n + 2]), l = i ? null : De.instance(a);
  return [{}, l, n + 3];
}
function vr(s, n) {
  const i = s[n] ? Ct.create(s[n]) : null;
  return [{}, i, n + 1];
}
const Q1 = RegExp(`^T?${vu.source}$`), j1 = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function e_(s) {
  const [n, i, a, l, h, d, y, v, x] = s, M = n[0] === "-", C = v && v[0] === "-", Q = (N, ee = !1) => N !== void 0 && (ee || N && M) ? -N : N;
  return [
    {
      years: Q(un(i)),
      months: Q(un(a)),
      weeks: Q(un(l)),
      days: Q(un(h)),
      hours: Q(un(d)),
      minutes: Q(un(y)),
      seconds: Q(un(v), v === "-0"),
      milliseconds: Q(yu(x), C)
    }
  ];
}
const t_ = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function Tu(s, n, i, a, l, h, d) {
  const y = {
    year: n.length === 2 ? hu(qt(n)) : qt(n),
    month: pf.indexOf(i) + 1,
    day: qt(a),
    hour: qt(l),
    minute: qt(h)
  };
  return d && (y.second = qt(d)), s && (y.weekday = s.length > 3 ? _f.indexOf(s) + 1 : vf.indexOf(s) + 1), y;
}
const n_ = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function r_(s) {
  const [
    ,
    n,
    i,
    a,
    l,
    h,
    d,
    y,
    v,
    x,
    M,
    C
  ] = s, Q = Tu(n, l, a, i, h, d, y);
  let N;
  return v ? N = t_[v] : x ? N = 0 : N = ki(M, C), [Q, new De(N)];
}
function i_(s) {
  return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const s_ = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, u_ = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, a_ = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Tl(s) {
  const [, n, i, a, l, h, d, y] = s;
  return [Tu(n, l, a, i, h, d, y), De.utcInstance];
}
function o_(s) {
  const [, n, i, a, l, h, d, y] = s;
  return [Tu(n, y, i, a, l, h, d), De.utcInstance];
}
const l_ = Wn(B1, wu), f_ = Wn(z1, wu), c_ = Wn(q1, wu), h_ = Wn(Ef), Af = Fn(
  X1,
  Un,
  _r,
  vr
), d_ = Fn(
  G1,
  Un,
  _r,
  vr
), m_ = Fn(
  Y1,
  Un,
  _r,
  vr
), g_ = Fn(
  Un,
  _r,
  vr
);
function p_(s) {
  return Rn(
    s,
    [l_, Af],
    [f_, d_],
    [c_, m_],
    [h_, g_]
  );
}
function y_(s) {
  return Rn(i_(s), [n_, r_]);
}
function __(s) {
  return Rn(
    s,
    [s_, Tl],
    [u_, Tl],
    [a_, o_]
  );
}
function v_(s) {
  return Rn(s, [j1, e_]);
}
const w_ = Fn(Un);
function T_(s) {
  return Rn(s, [Q1, w_]);
}
const S_ = Wn(J1, K1), O_ = Wn(bf), x_ = Fn(
  Un,
  _r,
  vr
);
function I_(s) {
  return Rn(
    s,
    [S_, Af],
    [O_, x_]
  );
}
const Sl = "Invalid Duration", Mf = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, E_ = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...Mf
}, nt = 146097 / 400, Mn = 146097 / 4800, b_ = {
  years: {
    quarters: 4,
    months: 12,
    weeks: nt / 7,
    days: nt,
    hours: nt * 24,
    minutes: nt * 24 * 60,
    seconds: nt * 24 * 60 * 60,
    milliseconds: nt * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: nt / 28,
    days: nt / 4,
    hours: nt * 24 / 4,
    minutes: nt * 24 * 60 / 4,
    seconds: nt * 24 * 60 * 60 / 4,
    milliseconds: nt * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: Mn / 7,
    days: Mn,
    hours: Mn * 24,
    minutes: Mn * 24 * 60,
    seconds: Mn * 24 * 60 * 60,
    milliseconds: Mn * 24 * 60 * 60 * 1e3
  },
  ...Mf
}, on = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], A_ = on.slice(0).reverse();
function zt(s, n, i = !1) {
  const a = {
    values: i ? n.values : { ...s.values, ...n.values || {} },
    loc: s.loc.clone(n.loc),
    conversionAccuracy: n.conversionAccuracy || s.conversionAccuracy,
    matrix: n.matrix || s.matrix
  };
  return new G(a);
}
function kf(s, n) {
  let i = n.milliseconds ?? 0;
  for (const a of A_.slice(1))
    n[a] && (i += n[a] * s[a].milliseconds);
  return i;
}
function Ol(s, n) {
  const i = kf(s, n) < 0 ? -1 : 1;
  on.reduceRight((a, l) => {
    if (U(n[l]))
      return a;
    if (a) {
      const h = n[a] * i, d = s[l][a], y = Math.floor(h / d);
      n[l] += y * i, n[a] -= y * d * i;
    }
    return l;
  }, null), on.reduce((a, l) => {
    if (U(n[l]))
      return a;
    if (a) {
      const h = n[a] % 1;
      n[a] -= h, n[l] += h * s[a][l];
    }
    return l;
  }, null);
}
function M_(s) {
  const n = {};
  for (const [i, a] of Object.entries(s))
    a !== 0 && (n[i] = a);
  return n;
}
class G {
  /**
   * @private
   */
  constructor(n) {
    const i = n.conversionAccuracy === "longterm" || !1;
    let a = i ? b_ : E_;
    n.matrix && (a = n.matrix), this.values = n.values, this.loc = n.loc || j.create(), this.conversionAccuracy = i ? "longterm" : "casual", this.invalid = n.invalid || null, this.matrix = a, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(n, i) {
    return G.fromObject({ milliseconds: n }, i);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(n, i = {}) {
    if (n == null || typeof n != "object")
      throw new Ue(
        `Duration.fromObject: argument expected to be an object, got ${n === null ? "null" : typeof n}`
      );
    return new G({
      values: Ei(n, G.normalizeUnit),
      loc: j.fromObject(i),
      conversionAccuracy: i.conversionAccuracy,
      matrix: i.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(n) {
    if (ln(n))
      return G.fromMillis(n);
    if (G.isDuration(n))
      return n;
    if (typeof n == "object")
      return G.fromObject(n);
    throw new Ue(
      `Unknown duration argument ${n} of type ${typeof n}`
    );
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(n, i) {
    const [a] = v_(n);
    return a ? G.fromObject(a, i) : G.invalid("unparsable", `the input "${n}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(n, i) {
    const [a] = T_(n);
    return a ? G.fromObject(a, i) : G.invalid("unparsable", `the input "${n}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(n, i = null) {
    if (!n)
      throw new Ue("need to specify a reason the Duration is invalid");
    const a = n instanceof mt ? n : new mt(n, i);
    if (oe.throwOnInvalid)
      throw new n1(a);
    return new G({ invalid: a });
  }
  /**
   * @private
   */
  static normalizeUnit(n) {
    const i = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[n && n.toLowerCase()];
    if (!i)
      throw new $l(n);
    return i;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(n) {
    return n && n.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(n, i = {}) {
    const a = {
      ...i,
      floor: i.round !== !1 && i.floor !== !1
    };
    return this.isValid ? Ie.create(this.loc, a).formatDurationFromString(this, n) : Sl;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(n = {}) {
    if (!this.isValid)
      return Sl;
    const i = on.map((a) => {
      const l = this.values[a];
      return U(l) ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...n, unit: a.slice(0, -1) }).format(l);
    }).filter((a) => a);
    return this.loc.listFormatter({ type: "conjunction", style: n.listStyle || "narrow", ...n }).format(i);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid)
      return null;
    let n = "P";
    return this.years !== 0 && (n += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (n += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (n += this.weeks + "W"), this.days !== 0 && (n += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (n += "T"), this.hours !== 0 && (n += this.hours + "H"), this.minutes !== 0 && (n += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (n += _u(this.seconds + this.milliseconds / 1e3, 3) + "S"), n === "P" && (n += "T0S"), n;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(n = {}) {
    if (!this.isValid)
      return null;
    const i = this.toMillis();
    return i < 0 || i >= 864e5 ? null : (n = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...n,
      includeOffset: !1
    }, F.fromMillis(i, { zone: "UTC" }).toISOTime(n));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? kf(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(n) {
    if (!this.isValid)
      return this;
    const i = G.fromDurationLike(n), a = {};
    for (const l of on)
      (Ln(i.values, l) || Ln(this.values, l)) && (a[l] = i.get(l) + this.get(l));
    return zt(this, { values: a }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(n) {
    if (!this.isValid)
      return this;
    const i = G.fromDurationLike(n);
    return this.plus(i.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(n) {
    if (!this.isValid)
      return this;
    const i = {};
    for (const a of Object.keys(this.values))
      i[a] = gf(n(this.values[a], a));
    return zt(this, { values: i }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(n) {
    return this[G.normalizeUnit(n)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(n) {
    if (!this.isValid)
      return this;
    const i = { ...this.values, ...Ei(n, G.normalizeUnit) };
    return zt(this, { values: i });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: n, numberingSystem: i, conversionAccuracy: a, matrix: l } = {}) {
    const d = { loc: this.loc.clone({ locale: n, numberingSystem: i }), matrix: l, conversionAccuracy: a };
    return zt(this, d);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(n) {
    return this.isValid ? this.shiftTo(n).get(n) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid)
      return this;
    const n = this.toObject();
    return Ol(this.matrix, n), zt(this, { values: n }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid)
      return this;
    const n = M_(this.normalize().shiftToAll().toObject());
    return zt(this, { values: n }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...n) {
    if (!this.isValid)
      return this;
    if (n.length === 0)
      return this;
    n = n.map((d) => G.normalizeUnit(d));
    const i = {}, a = {}, l = this.toObject();
    let h;
    for (const d of on)
      if (n.indexOf(d) >= 0) {
        h = d;
        let y = 0;
        for (const x in a)
          y += this.matrix[x][d] * a[x], a[x] = 0;
        ln(l[d]) && (y += l[d]);
        const v = Math.trunc(y);
        i[d] = v, a[d] = (y * 1e3 - v * 1e3) / 1e3;
      } else
        ln(l[d]) && (a[d] = l[d]);
    for (const d in a)
      a[d] !== 0 && (i[h] += d === h ? a[d] : a[d] / this.matrix[h][d]);
    return Ol(this.matrix, i), zt(this, { values: i }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ) : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid)
      return this;
    const n = {};
    for (const i of Object.keys(this.values))
      n[i] = this.values[i] === 0 ? 0 : -this.values[i];
    return zt(this, { values: n }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(n) {
    if (!this.isValid || !n.isValid || !this.loc.equals(n.loc))
      return !1;
    function i(a, l) {
      return a === void 0 || a === 0 ? l === void 0 || l === 0 : a === l;
    }
    for (const a of on)
      if (!i(this.values[a], n.values[a]))
        return !1;
    return !0;
  }
}
const kn = "Invalid Interval";
function k_(s, n) {
  return !s || !s.isValid ? fe.invalid("missing or invalid start") : !n || !n.isValid ? fe.invalid("missing or invalid end") : n < s ? fe.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${s.toISO()} and end=${n.toISO()}`
  ) : null;
}
class fe {
  /**
   * @private
   */
  constructor(n) {
    this.s = n.start, this.e = n.end, this.invalid = n.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(n, i = null) {
    if (!n)
      throw new Ue("need to specify a reason the Interval is invalid");
    const a = n instanceof mt ? n : new mt(n, i);
    if (oe.throwOnInvalid)
      throw new t1(a);
    return new fe({ invalid: a });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(n, i) {
    const a = cr(n), l = cr(i), h = k_(a, l);
    return h ?? new fe({
      start: a,
      end: l
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(n, i) {
    const a = G.fromDurationLike(i), l = cr(n);
    return fe.fromDateTimes(l, l.plus(a));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(n, i) {
    const a = G.fromDurationLike(i), l = cr(n);
    return fe.fromDateTimes(l.minus(a), l);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(n, i) {
    const [a, l] = (n || "").split("/", 2);
    if (a && l) {
      let h, d;
      try {
        h = F.fromISO(a, i), d = h.isValid;
      } catch {
        d = !1;
      }
      let y, v;
      try {
        y = F.fromISO(l, i), v = y.isValid;
      } catch {
        v = !1;
      }
      if (d && v)
        return fe.fromDateTimes(h, y);
      if (d) {
        const x = G.fromISO(l, i);
        if (x.isValid)
          return fe.after(h, x);
      } else if (v) {
        const x = G.fromISO(a, i);
        if (x.isValid)
          return fe.before(y, x);
      }
    }
    return fe.invalid("unparsable", `the input "${n}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(n) {
    return n && n.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(n = "milliseconds") {
    return this.isValid ? this.toDuration(n).get(n) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(n = "milliseconds", i) {
    if (!this.isValid)
      return NaN;
    const a = this.start.startOf(n, i);
    let l;
    return i != null && i.useLocaleWeeks ? l = this.end.reconfigure({ locale: a.locale }) : l = this.end, l = l.startOf(n, i), Math.floor(l.diff(a, n).get(n)) + (l.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(n) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, n) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(n) {
    return this.isValid ? this.s > n : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(n) {
    return this.isValid ? this.e <= n : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(n) {
    return this.isValid ? this.s <= n && this.e > n : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start: n, end: i } = {}) {
    return this.isValid ? fe.fromDateTimes(n || this.s, i || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...n) {
    if (!this.isValid)
      return [];
    const i = n.map(cr).filter((d) => this.contains(d)).sort((d, y) => d.toMillis() - y.toMillis()), a = [];
    let { s: l } = this, h = 0;
    for (; l < this.e; ) {
      const d = i[h] || this.e, y = +d > +this.e ? this.e : d;
      a.push(fe.fromDateTimes(l, y)), l = y, h += 1;
    }
    return a;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(n) {
    const i = G.fromDurationLike(n);
    if (!this.isValid || !i.isValid || i.as("milliseconds") === 0)
      return [];
    let { s: a } = this, l = 1, h;
    const d = [];
    for (; a < this.e; ) {
      const y = this.start.plus(i.mapUnits((v) => v * l));
      h = +y > +this.e ? this.e : y, d.push(fe.fromDateTimes(a, h)), a = h, l += 1;
    }
    return d;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(n) {
    return this.isValid ? this.splitBy(this.length() / n).slice(0, n) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(n) {
    return this.e > n.s && this.s < n.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(n) {
    return this.isValid ? +this.e == +n.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(n) {
    return this.isValid ? +n.e == +this.s : !1;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(n) {
    return this.isValid ? this.s <= n.s && this.e >= n.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(n) {
    return !this.isValid || !n.isValid ? !1 : this.s.equals(n.s) && this.e.equals(n.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(n) {
    if (!this.isValid)
      return this;
    const i = this.s > n.s ? this.s : n.s, a = this.e < n.e ? this.e : n.e;
    return i >= a ? null : fe.fromDateTimes(i, a);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(n) {
    if (!this.isValid)
      return this;
    const i = this.s < n.s ? this.s : n.s, a = this.e > n.e ? this.e : n.e;
    return fe.fromDateTimes(i, a);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(n) {
    const [i, a] = n.sort((l, h) => l.s - h.s).reduce(
      ([l, h], d) => h ? h.overlaps(d) || h.abutsStart(d) ? [l, h.union(d)] : [l.concat([h]), d] : [l, d],
      [[], null]
    );
    return a && i.push(a), i;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(n) {
    let i = null, a = 0;
    const l = [], h = n.map((v) => [
      { time: v.s, type: "s" },
      { time: v.e, type: "e" }
    ]), d = Array.prototype.concat(...h), y = d.sort((v, x) => v.time - x.time);
    for (const v of y)
      a += v.type === "s" ? 1 : -1, a === 1 ? i = v.time : (i && +i != +v.time && l.push(fe.fromDateTimes(i, v.time)), i = null);
    return fe.merge(l);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...n) {
    return fe.xor([this].concat(n)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : kn;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(n = Oi, i = {}) {
    return this.isValid ? Ie.create(this.s.loc.clone(i), n).formatInterval(this) : kn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(n) {
    return this.isValid ? `${this.s.toISO(n)}/${this.e.toISO(n)}` : kn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : kn;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(n) {
    return this.isValid ? `${this.s.toISOTime(n)}/${this.e.toISOTime(n)}` : kn;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(n, { separator: i = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(n)}${i}${this.e.toFormat(n)}` : kn;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(n, i) {
    return this.isValid ? this.e.diff(this.s, n, i) : G.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(n) {
    return fe.fromDateTimes(n(this.s), n(this.e));
  }
}
class pi {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(n = oe.defaultZone) {
    const i = F.now().setZone(n).set({ month: 12 });
    return !n.isUniversal && i.offset !== i.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(n) {
    return Ct.isValidZone(n);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(n) {
    return Gt(n, oe.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: n = null, locObj: i = null } = {}) {
    return (i || j.create(n)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: n = null, locObj: i = null } = {}) {
    return (i || j.create(n)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: n = null, locObj: i = null } = {}) {
    return (i || j.create(n)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(n = "long", { locale: i = null, numberingSystem: a = null, locObj: l = null, outputCalendar: h = "gregory" } = {}) {
    return (l || j.create(i, a, h)).months(n);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(n = "long", { locale: i = null, numberingSystem: a = null, locObj: l = null, outputCalendar: h = "gregory" } = {}) {
    return (l || j.create(i, a, h)).months(n, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(n = "long", { locale: i = null, numberingSystem: a = null, locObj: l = null } = {}) {
    return (l || j.create(i, a, null)).weekdays(n);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(n = "long", { locale: i = null, numberingSystem: a = null, locObj: l = null } = {}) {
    return (l || j.create(i, a, null)).weekdays(n, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale: n = null } = {}) {
    return j.create(n).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(n = "short", { locale: i = null } = {}) {
    return j.create(i, null, "gregory").eras(n);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: hf(), localeWeek: df() };
  }
}
function xl(s, n) {
  const i = (l) => l.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), a = i(n) - i(s);
  return Math.floor(G.fromMillis(a).as("days"));
}
function N_(s, n, i) {
  const a = [
    ["years", (v, x) => x.year - v.year],
    ["quarters", (v, x) => x.quarter - v.quarter + (x.year - v.year) * 4],
    ["months", (v, x) => x.month - v.month + (x.year - v.year) * 12],
    [
      "weeks",
      (v, x) => {
        const M = xl(v, x);
        return (M - M % 7) / 7;
      }
    ],
    ["days", xl]
  ], l = {}, h = s;
  let d, y;
  for (const [v, x] of a)
    i.indexOf(v) >= 0 && (d = v, l[v] = x(s, n), y = h.plus(l), y > n ? (l[v]--, s = h.plus(l), s > n && (y = s, l[v]--, s = h.plus(l))) : s = y);
  return [s, l, y, d];
}
function D_(s, n, i, a) {
  let [l, h, d, y] = N_(s, n, i);
  const v = n - l, x = i.filter(
    (C) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(C) >= 0
  );
  x.length === 0 && (d < n && (d = l.plus({ [y]: 1 })), d !== l && (h[y] = (h[y] || 0) + v / (d - l)));
  const M = G.fromObject(h, a);
  return x.length > 0 ? G.fromMillis(v, a).shiftTo(...x).plus(M) : M;
}
const Su = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, Il = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, C_ = Su.hanidec.replace(/[\[|\]]/g, "").split("");
function L_(s) {
  let n = parseInt(s, 10);
  if (isNaN(n)) {
    n = "";
    for (let i = 0; i < s.length; i++) {
      const a = s.charCodeAt(i);
      if (s[i].search(Su.hanidec) !== -1)
        n += C_.indexOf(s[i]);
      else
        for (const l in Il) {
          const [h, d] = Il[l];
          a >= h && a <= d && (n += a - h);
        }
    }
    return parseInt(n, 10);
  } else
    return n;
}
function ht({ numberingSystem: s }, n = "") {
  return new RegExp(`${Su[s || "latn"]}${n}`);
}
const W_ = "missing Intl.DateTimeFormat.formatToParts support";
function J(s, n = (i) => i) {
  return { regex: s, deser: ([i]) => n(L_(i)) };
}
const F_ = " ", Nf = `[ ${F_}]`, Df = new RegExp(Nf, "g");
function R_(s) {
  return s.replace(/\./g, "\\.?").replace(Df, Nf);
}
function El(s) {
  return s.replace(/\./g, "").replace(Df, " ").toLowerCase();
}
function dt(s, n) {
  return s === null ? null : {
    regex: RegExp(s.map(R_).join("|")),
    deser: ([i]) => s.findIndex((a) => El(i) === El(a)) + n
  };
}
function bl(s, n) {
  return { regex: s, deser: ([, i, a]) => ki(i, a), groups: n };
}
function yi(s) {
  return { regex: s, deser: ([n]) => n };
}
function U_(s) {
  return s.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function $_(s, n) {
  const i = ht(n), a = ht(n, "{2}"), l = ht(n, "{3}"), h = ht(n, "{4}"), d = ht(n, "{6}"), y = ht(n, "{1,2}"), v = ht(n, "{1,3}"), x = ht(n, "{1,6}"), M = ht(n, "{1,9}"), C = ht(n, "{2,4}"), Q = ht(n, "{4,6}"), N = (re) => ({ regex: RegExp(U_(re.val)), deser: ([Te]) => Te, literal: !0 }), Ce = ((re) => {
    if (s.literal)
      return N(re);
    switch (re.val) {
      case "G":
        return dt(n.eras("short"), 0);
      case "GG":
        return dt(n.eras("long"), 0);
      case "y":
        return J(x);
      case "yy":
        return J(C, hu);
      case "yyyy":
        return J(h);
      case "yyyyy":
        return J(Q);
      case "yyyyyy":
        return J(d);
      case "M":
        return J(y);
      case "MM":
        return J(a);
      case "MMM":
        return dt(n.months("short", !0), 1);
      case "MMMM":
        return dt(n.months("long", !0), 1);
      case "L":
        return J(y);
      case "LL":
        return J(a);
      case "LLL":
        return dt(n.months("short", !1), 1);
      case "LLLL":
        return dt(n.months("long", !1), 1);
      case "d":
        return J(y);
      case "dd":
        return J(a);
      case "o":
        return J(v);
      case "ooo":
        return J(l);
      case "HH":
        return J(a);
      case "H":
        return J(y);
      case "hh":
        return J(a);
      case "h":
        return J(y);
      case "mm":
        return J(a);
      case "m":
        return J(y);
      case "q":
        return J(y);
      case "qq":
        return J(a);
      case "s":
        return J(y);
      case "ss":
        return J(a);
      case "S":
        return J(v);
      case "SSS":
        return J(l);
      case "u":
        return yi(M);
      case "uu":
        return yi(y);
      case "uuu":
        return J(i);
      case "a":
        return dt(n.meridiems(), 0);
      case "kkkk":
        return J(h);
      case "kk":
        return J(C, hu);
      case "W":
        return J(y);
      case "WW":
        return J(a);
      case "E":
      case "c":
        return J(i);
      case "EEE":
        return dt(n.weekdays("short", !1), 1);
      case "EEEE":
        return dt(n.weekdays("long", !1), 1);
      case "ccc":
        return dt(n.weekdays("short", !0), 1);
      case "cccc":
        return dt(n.weekdays("long", !0), 1);
      case "Z":
      case "ZZ":
        return bl(new RegExp(`([+-]${y.source})(?::(${a.source}))?`), 2);
      case "ZZZ":
        return bl(new RegExp(`([+-]${y.source})(${a.source})?`), 2);
      case "z":
        return yi(/[a-z_+-/]{1,256}?/i);
      case " ":
        return yi(/[^\S\n\r]/);
      default:
        return N(re);
    }
  })(s) || {
    invalidReason: W_
  };
  return Ce.token = s, Ce;
}
const P_ = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function Z_(s, n, i) {
  const { type: a, value: l } = s;
  if (a === "literal") {
    const v = /^\s+$/.test(l);
    return {
      literal: !v,
      val: v ? " " : l
    };
  }
  const h = n[a];
  let d = a;
  a === "hour" && (n.hour12 != null ? d = n.hour12 ? "hour12" : "hour24" : n.hourCycle != null ? n.hourCycle === "h11" || n.hourCycle === "h12" ? d = "hour12" : d = "hour24" : d = i.hour12 ? "hour12" : "hour24");
  let y = P_[d];
  if (typeof y == "object" && (y = y[h]), y)
    return {
      literal: !1,
      val: y
    };
}
function V_(s) {
  return [`^${s.map((i) => i.regex).reduce((i, a) => `${i}(${a.source})`, "")}$`, s];
}
function H_(s, n, i) {
  const a = s.match(n);
  if (a) {
    const l = {};
    let h = 1;
    for (const d in i)
      if (Ln(i, d)) {
        const y = i[d], v = y.groups ? y.groups + 1 : 1;
        !y.literal && y.token && (l[y.token.val[0]] = y.deser(a.slice(h, h + v))), h += v;
      }
    return [a, l];
  } else
    return [a, {}];
}
function B_(s) {
  const n = (h) => {
    switch (h) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let i = null, a;
  return U(s.z) || (i = Ct.create(s.z)), U(s.Z) || (i || (i = new De(s.Z)), a = s.Z), U(s.q) || (s.M = (s.q - 1) * 3 + 1), U(s.h) || (s.h < 12 && s.a === 1 ? s.h += 12 : s.h === 12 && s.a === 0 && (s.h = 0)), s.G === 0 && s.y && (s.y = -s.y), U(s.u) || (s.S = yu(s.u)), [Object.keys(s).reduce((h, d) => {
    const y = n(d);
    return y && (h[y] = s[d]), h;
  }, {}), i, a];
}
let nu = null;
function z_() {
  return nu || (nu = F.fromMillis(1555555555555)), nu;
}
function q_(s, n) {
  if (s.literal)
    return s;
  const i = Ie.macroTokenToFormatOpts(s.val), a = Wf(i, n);
  return a == null || a.includes(void 0) ? s : a;
}
function Cf(s, n) {
  return Array.prototype.concat(...s.map((i) => q_(i, n)));
}
function Lf(s, n, i) {
  const a = Cf(Ie.parseFormat(i), s), l = a.map((d) => $_(d, s)), h = l.find((d) => d.invalidReason);
  if (h)
    return { input: n, tokens: a, invalidReason: h.invalidReason };
  {
    const [d, y] = V_(l), v = RegExp(d, "i"), [x, M] = H_(n, v, y), [C, Q, N] = M ? B_(M) : [null, null, void 0];
    if (Ln(M, "a") && Ln(M, "H"))
      throw new Nn(
        "Can't include meridiem when specifying 24-hour format"
      );
    return { input: n, tokens: a, regex: v, rawMatches: x, matches: M, result: C, zone: Q, specificOffset: N };
  }
}
function G_(s, n, i) {
  const { result: a, zone: l, specificOffset: h, invalidReason: d } = Lf(s, n, i);
  return [a, l, h, d];
}
function Wf(s, n) {
  if (!s)
    return null;
  const a = Ie.create(n, s).dtFormatter(z_()), l = a.formatToParts(), h = a.resolvedOptions();
  return l.map((d) => Z_(d, s, h));
}
const ru = "Invalid DateTime", Al = 864e13;
function dr(s) {
  return new mt("unsupported zone", `the zone "${s.name}" is not supported`);
}
function iu(s) {
  return s.weekData === null && (s.weekData = xi(s.c)), s.weekData;
}
function su(s) {
  return s.localWeekData === null && (s.localWeekData = xi(
    s.c,
    s.loc.getMinDaysInFirstWeek(),
    s.loc.getStartOfWeek()
  )), s.localWeekData;
}
function an(s, n) {
  const i = {
    ts: s.ts,
    zone: s.zone,
    c: s.c,
    o: s.o,
    loc: s.loc,
    invalid: s.invalid
  };
  return new F({ ...i, ...n, old: i });
}
function Ff(s, n, i) {
  let a = s - n * 60 * 1e3;
  const l = i.offset(a);
  if (n === l)
    return [a, n];
  a -= (l - n) * 60 * 1e3;
  const h = i.offset(a);
  return l === h ? [a, l] : [s - Math.min(l, h) * 60 * 1e3, Math.max(l, h)];
}
function _i(s, n) {
  s += n * 60 * 1e3;
  const i = new Date(s);
  return {
    year: i.getUTCFullYear(),
    month: i.getUTCMonth() + 1,
    day: i.getUTCDate(),
    hour: i.getUTCHours(),
    minute: i.getUTCMinutes(),
    second: i.getUTCSeconds(),
    millisecond: i.getUTCMilliseconds()
  };
}
function Ti(s, n, i) {
  return Ff(Mi(s), n, i);
}
function Ml(s, n) {
  const i = s.o, a = s.c.year + Math.trunc(n.years), l = s.c.month + Math.trunc(n.months) + Math.trunc(n.quarters) * 3, h = {
    ...s.c,
    year: a,
    month: l,
    day: Math.min(s.c.day, Ii(a, l)) + Math.trunc(n.days) + Math.trunc(n.weeks) * 7
  }, d = G.fromObject({
    years: n.years - Math.trunc(n.years),
    quarters: n.quarters - Math.trunc(n.quarters),
    months: n.months - Math.trunc(n.months),
    weeks: n.weeks - Math.trunc(n.weeks),
    days: n.days - Math.trunc(n.days),
    hours: n.hours,
    minutes: n.minutes,
    seconds: n.seconds,
    milliseconds: n.milliseconds
  }).as("milliseconds"), y = Mi(h);
  let [v, x] = Ff(y, i, s.zone);
  return d !== 0 && (v += d, x = s.zone.offset(v)), { ts: v, o: x };
}
function fr(s, n, i, a, l, h) {
  const { setZone: d, zone: y } = i;
  if (s && Object.keys(s).length !== 0 || n) {
    const v = n || y, x = F.fromObject(s, {
      ...i,
      zone: v,
      specificOffset: h
    });
    return d ? x : x.setZone(y);
  } else
    return F.invalid(
      new mt("unparsable", `the input "${l}" can't be parsed as ${a}`)
    );
}
function vi(s, n, i = !0) {
  return s.isValid ? Ie.create(j.create("en-US"), {
    allowZ: i,
    forceSimple: !0
  }).formatDateTimeFromString(s, n) : null;
}
function uu(s, n) {
  const i = s.c.year > 9999 || s.c.year < 0;
  let a = "";
  return i && s.c.year >= 0 && (a += "+"), a += me(s.c.year, i ? 6 : 4), n ? (a += "-", a += me(s.c.month), a += "-", a += me(s.c.day)) : (a += me(s.c.month), a += me(s.c.day)), a;
}
function kl(s, n, i, a, l, h) {
  let d = me(s.c.hour);
  return n ? (d += ":", d += me(s.c.minute), (s.c.millisecond !== 0 || s.c.second !== 0 || !i) && (d += ":")) : d += me(s.c.minute), (s.c.millisecond !== 0 || s.c.second !== 0 || !i) && (d += me(s.c.second), (s.c.millisecond !== 0 || !a) && (d += ".", d += me(s.c.millisecond, 3))), l && (s.isOffsetFixed && s.offset === 0 && !h ? d += "Z" : s.o < 0 ? (d += "-", d += me(Math.trunc(-s.o / 60)), d += ":", d += me(Math.trunc(-s.o % 60))) : (d += "+", d += me(Math.trunc(s.o / 60)), d += ":", d += me(Math.trunc(s.o % 60)))), h && (d += "[" + s.zone.ianaName + "]"), d;
}
const Rf = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Y_ = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, J_ = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Uf = ["year", "month", "day", "hour", "minute", "second", "millisecond"], K_ = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], X_ = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Q_(s) {
  const n = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[s.toLowerCase()];
  if (!n)
    throw new $l(s);
  return n;
}
function Nl(s) {
  switch (s.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return Q_(s);
  }
}
function Dl(s, n) {
  const i = Gt(n.zone, oe.defaultZone);
  if (!i.isValid)
    return F.invalid(dr(i));
  const a = j.fromObject(n), l = oe.now();
  let h, d;
  if (U(s.year))
    h = l;
  else {
    for (const x of Uf)
      U(s[x]) && (s[x] = Rf[x]);
    const y = ff(s) || cf(s);
    if (y)
      return F.invalid(y);
    const v = i.offset(l);
    [h, d] = Ti(s, v, i);
  }
  return new F({ ts: h, zone: i, loc: a, o: d });
}
function Cl(s, n, i) {
  const a = U(i.round) ? !0 : i.round, l = (d, y) => (d = _u(d, a || i.calendary ? 0 : 2, !0), n.loc.clone(i).relFormatter(i).format(d, y)), h = (d) => i.calendary ? n.hasSame(s, d) ? 0 : n.startOf(d).diff(s.startOf(d), d).get(d) : n.diff(s, d).get(d);
  if (i.unit)
    return l(h(i.unit), i.unit);
  for (const d of i.units) {
    const y = h(d);
    if (Math.abs(y) >= 1)
      return l(y, d);
  }
  return l(s > n ? -0 : 0, i.units[i.units.length - 1]);
}
function Ll(s) {
  let n = {}, i;
  return s.length > 0 && typeof s[s.length - 1] == "object" ? (n = s[s.length - 1], i = Array.from(s).slice(0, s.length - 1)) : i = Array.from(s), [n, i];
}
class F {
  /**
   * @access private
   */
  constructor(n) {
    const i = n.zone || oe.defaultZone;
    let a = n.invalid || (Number.isNaN(n.ts) ? new mt("invalid input") : null) || (i.isValid ? null : dr(i));
    this.ts = U(n.ts) ? oe.now() : n.ts;
    let l = null, h = null;
    if (!a)
      if (n.old && n.old.ts === this.ts && n.old.zone.equals(i))
        [l, h] = [n.old.c, n.old.o];
      else {
        const y = i.offset(this.ts);
        l = _i(this.ts, y), a = Number.isNaN(l.year) ? new mt("invalid input") : null, l = a ? null : l, h = a ? null : y;
      }
    this._zone = i, this.loc = n.loc || j.create(), this.invalid = a, this.weekData = null, this.localWeekData = null, this.c = l, this.o = h, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new F({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [n, i] = Ll(arguments), [a, l, h, d, y, v, x] = i;
    return Dl({ year: a, month: l, day: h, hour: d, minute: y, second: v, millisecond: x }, n);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [n, i] = Ll(arguments), [a, l, h, d, y, v, x] = i;
    return n.zone = De.utcInstance, Dl({ year: a, month: l, day: h, hour: d, minute: y, second: v, millisecond: x }, n);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(n, i = {}) {
    const a = b1(n) ? n.valueOf() : NaN;
    if (Number.isNaN(a))
      return F.invalid("invalid input");
    const l = Gt(i.zone, oe.defaultZone);
    return l.isValid ? new F({
      ts: a,
      zone: l,
      loc: j.fromObject(i)
    }) : F.invalid(dr(l));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(n, i = {}) {
    if (ln(n))
      return n < -Al || n > Al ? F.invalid("Timestamp out of range") : new F({
        ts: n,
        zone: Gt(i.zone, oe.defaultZone),
        loc: j.fromObject(i)
      });
    throw new Ue(
      `fromMillis requires a numerical input, but received a ${typeof n} with value ${n}`
    );
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(n, i = {}) {
    if (ln(n))
      return new F({
        ts: n * 1e3,
        zone: Gt(i.zone, oe.defaultZone),
        loc: j.fromObject(i)
      });
    throw new Ue("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(n, i = {}) {
    n = n || {};
    const a = Gt(i.zone, oe.defaultZone);
    if (!a.isValid)
      return F.invalid(dr(a));
    const l = j.fromObject(i), h = Ei(n, Nl), { minDaysInFirstWeek: d, startOfWeek: y } = yl(h, l), v = oe.now(), x = U(i.specificOffset) ? a.offset(v) : i.specificOffset, M = !U(h.ordinal), C = !U(h.year), Q = !U(h.month) || !U(h.day), N = C || Q, ee = h.weekYear || h.weekNumber;
    if ((N || M) && ee)
      throw new Nn(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (Q && M)
      throw new Nn("Can't mix ordinal dates with month/day");
    const Ce = ee || h.weekday && !N;
    let re, Te, st = _i(v, x);
    Ce ? (re = K_, Te = Y_, st = xi(st, d, y)) : M ? (re = X_, Te = J_, st = tu(st)) : (re = Uf, Te = Rf);
    let Ee = !1;
    for (const q of re) {
      const Pe = h[q];
      U(Pe) ? Ee ? h[q] = Te[q] : h[q] = st[q] : Ee = !0;
    }
    const pt = Ce ? x1(h, d, y) : M ? I1(h) : ff(h), be = pt || cf(h);
    if (be)
      return F.invalid(be);
    const yt = Ce ? gl(h, d, y) : M ? pl(h) : h, [Ae, St] = Ti(yt, x, a), $e = new F({
      ts: Ae,
      zone: a,
      o: St,
      loc: l
    });
    return h.weekday && N && n.weekday !== $e.weekday ? F.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${h.weekday} and a date of ${$e.toISO()}`
    ) : $e.isValid ? $e : F.invalid($e.invalid);
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(n, i = {}) {
    const [a, l] = p_(n);
    return fr(a, l, i, "ISO 8601", n);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(n, i = {}) {
    const [a, l] = y_(n);
    return fr(a, l, i, "RFC 2822", n);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(n, i = {}) {
    const [a, l] = __(n);
    return fr(a, l, i, "HTTP", i);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(n, i, a = {}) {
    if (U(n) || U(i))
      throw new Ue("fromFormat requires an input string and a format");
    const { locale: l = null, numberingSystem: h = null } = a, d = j.fromOpts({
      locale: l,
      numberingSystem: h,
      defaultToEN: !0
    }), [y, v, x, M] = G_(d, n, i);
    return M ? F.invalid(M) : fr(y, v, a, `format ${i}`, n, x);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(n, i, a = {}) {
    return F.fromFormat(n, i, a);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(n, i = {}) {
    const [a, l] = I_(n);
    return fr(a, l, i, "SQL", n);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(n, i = null) {
    if (!n)
      throw new Ue("need to specify a reason the DateTime is invalid");
    const a = n instanceof mt ? n : new mt(n, i);
    if (oe.throwOnInvalid)
      throw new e1(a);
    return new F({ invalid: a });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(n) {
    return n && n.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(n, i = {}) {
    const a = Wf(n, j.fromObject(i));
    return a ? a.map((l) => l ? l.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(n, i = {}) {
    return Cf(Ie.parseFormat(n), j.fromObject(i)).map((l) => l.val).join("");
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(n) {
    return this[n];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? iu(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? iu(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? iu(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? su(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? su(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? su(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? tu(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? pi.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? pi.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? pi.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? pi.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const n = 864e5, i = 6e4, a = Mi(this.c), l = this.zone.offset(a - n), h = this.zone.offset(a + n), d = this.zone.offset(a - l * i), y = this.zone.offset(a - h * i);
    if (d === y)
      return [this];
    const v = a - d * i, x = a - y * i, M = _i(v, d), C = _i(x, y);
    return M.hour === C.hour && M.minute === C.minute && M.second === C.second && M.millisecond === C.millisecond ? [an(this, { ts: v }), an(this, { ts: x })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return yr(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Ii(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? Dn(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? gr(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? gr(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(n = {}) {
    const { locale: i, numberingSystem: a, calendar: l } = Ie.create(
      this.loc.clone(n),
      n
    ).resolvedOptions(this);
    return { locale: i, numberingSystem: a, outputCalendar: l };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(n = 0, i = {}) {
    return this.setZone(De.instance(n), i);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(oe.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(n, { keepLocalTime: i = !1, keepCalendarTime: a = !1 } = {}) {
    if (n = Gt(n, oe.defaultZone), n.equals(this.zone))
      return this;
    if (n.isValid) {
      let l = this.ts;
      if (i || a) {
        const h = n.offset(this.ts), d = this.toObject();
        [l] = Ti(d, h, n);
      }
      return an(this, { ts: l, zone: n });
    } else
      return F.invalid(dr(n));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: n, numberingSystem: i, outputCalendar: a } = {}) {
    const l = this.loc.clone({ locale: n, numberingSystem: i, outputCalendar: a });
    return an(this, { loc: l });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(n) {
    return this.reconfigure({ locale: n });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(n) {
    if (!this.isValid)
      return this;
    const i = Ei(n, Nl), { minDaysInFirstWeek: a, startOfWeek: l } = yl(i, this.loc), h = !U(i.weekYear) || !U(i.weekNumber) || !U(i.weekday), d = !U(i.ordinal), y = !U(i.year), v = !U(i.month) || !U(i.day), x = y || v, M = i.weekYear || i.weekNumber;
    if ((x || d) && M)
      throw new Nn(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (v && d)
      throw new Nn("Can't mix ordinal dates with month/day");
    let C;
    h ? C = gl(
      { ...xi(this.c, a, l), ...i },
      a,
      l
    ) : U(i.ordinal) ? (C = { ...this.toObject(), ...i }, U(i.day) && (C.day = Math.min(Ii(C.year, C.month), C.day))) : C = pl({ ...tu(this.c), ...i });
    const [Q, N] = Ti(C, this.o, this.zone);
    return an(this, { ts: Q, o: N });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(n) {
    if (!this.isValid)
      return this;
    const i = G.fromDurationLike(n);
    return an(this, Ml(this, i));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(n) {
    if (!this.isValid)
      return this;
    const i = G.fromDurationLike(n).negate();
    return an(this, Ml(this, i));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(n, { useLocaleWeeks: i = !1 } = {}) {
    if (!this.isValid)
      return this;
    const a = {}, l = G.normalizeUnit(n);
    switch (l) {
      case "years":
        a.month = 1;
      case "quarters":
      case "months":
        a.day = 1;
      case "weeks":
      case "days":
        a.hour = 0;
      case "hours":
        a.minute = 0;
      case "minutes":
        a.second = 0;
      case "seconds":
        a.millisecond = 0;
        break;
    }
    if (l === "weeks")
      if (i) {
        const h = this.loc.getStartOfWeek(), { weekday: d } = this;
        d < h && (a.weekNumber = this.weekNumber - 1), a.weekday = h;
      } else
        a.weekday = 1;
    if (l === "quarters") {
      const h = Math.ceil(this.month / 3);
      a.month = (h - 1) * 3 + 1;
    }
    return this.set(a);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(n, i) {
    return this.isValid ? this.plus({ [n]: 1 }).startOf(n, i).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(n, i = {}) {
    return this.isValid ? Ie.create(this.loc.redefaultToEN(i)).formatDateTimeFromString(this, n) : ru;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(n = Oi, i = {}) {
    return this.isValid ? Ie.create(this.loc.clone(i), n).formatDateTime(this) : ru;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(n = {}) {
    return this.isValid ? Ie.create(this.loc.clone(n), n).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({
    format: n = "extended",
    suppressSeconds: i = !1,
    suppressMilliseconds: a = !1,
    includeOffset: l = !0,
    extendedZone: h = !1
  } = {}) {
    if (!this.isValid)
      return null;
    const d = n === "extended";
    let y = uu(this, d);
    return y += "T", y += kl(this, d, i, a, l, h), y;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format: n = "extended" } = {}) {
    return this.isValid ? uu(this, n === "extended") : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return vi(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: n = !1,
    suppressSeconds: i = !1,
    includeOffset: a = !0,
    includePrefix: l = !1,
    extendedZone: h = !1,
    format: d = "extended"
  } = {}) {
    return this.isValid ? (l ? "T" : "") + kl(
      this,
      d === "extended",
      i,
      n,
      a,
      h
    ) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return vi(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return vi(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return this.isValid ? uu(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset: n = !0, includeZone: i = !1, includeOffsetSpace: a = !0 } = {}) {
    let l = "HH:mm:ss.SSS";
    return (i || n) && (a && (l += " "), i ? l += "z" : n && (l += "ZZ")), vi(this, l, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(n = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(n)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : ru;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(n = {}) {
    if (!this.isValid)
      return {};
    const i = { ...this.c };
    return n.includeConfig && (i.outputCalendar = this.outputCalendar, i.numberingSystem = this.loc.numberingSystem, i.locale = this.loc.locale), i;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(n, i = "milliseconds", a = {}) {
    if (!this.isValid || !n.isValid)
      return G.invalid("created by diffing an invalid DateTime");
    const l = { locale: this.locale, numberingSystem: this.numberingSystem, ...a }, h = A1(i).map(G.normalizeUnit), d = n.valueOf() > this.valueOf(), y = d ? this : n, v = d ? n : this, x = D_(y, v, h, l);
    return d ? x.negate() : x;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(n = "milliseconds", i = {}) {
    return this.diff(F.now(), n, i);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(n) {
    return this.isValid ? fe.fromDateTimes(this, n) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(n, i, a) {
    if (!this.isValid)
      return !1;
    const l = n.valueOf(), h = this.setZone(n.zone, { keepLocalTime: !0 });
    return h.startOf(i, a) <= l && l <= h.endOf(i, a);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(n) {
    return this.isValid && n.isValid && this.valueOf() === n.valueOf() && this.zone.equals(n.zone) && this.loc.equals(n.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(n = {}) {
    if (!this.isValid)
      return null;
    const i = n.base || F.fromObject({}, { zone: this.zone }), a = n.padding ? this < i ? -n.padding : n.padding : 0;
    let l = ["years", "months", "days", "hours", "minutes", "seconds"], h = n.unit;
    return Array.isArray(n.unit) && (l = n.unit, h = void 0), Cl(i, this.plus(a), {
      ...n,
      numeric: "always",
      units: l,
      unit: h
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(n = {}) {
    return this.isValid ? Cl(n.base || F.fromObject({}, { zone: this.zone }), this, {
      ...n,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...n) {
    if (!n.every(F.isDateTime))
      throw new Ue("min requires all arguments be DateTimes");
    return _l(n, (i) => i.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...n) {
    if (!n.every(F.isDateTime))
      throw new Ue("max requires all arguments be DateTimes");
    return _l(n, (i) => i.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(n, i, a = {}) {
    const { locale: l = null, numberingSystem: h = null } = a, d = j.fromOpts({
      locale: l,
      numberingSystem: h,
      defaultToEN: !0
    });
    return Lf(d, n, i);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(n, i, a = {}) {
    return F.fromFormatExplain(n, i, a);
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return Oi;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return Pl;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return r1;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return Zl;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return Vl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Hl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Bl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return zl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return ql;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Gl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Yl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Jl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Kl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return Xl;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Ql;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return jl;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return ef;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return i1;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return tf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return nf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return rf;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return sf;
  }
}
function cr(s) {
  if (F.isDateTime(s))
    return s;
  if (s && s.valueOf && ln(s.valueOf()))
    return F.fromJSDate(s);
  if (s && typeof s == "object")
    return F.fromObject(s);
  throw new Ue(
    `Unknown datetime argument: ${s}, of type ${typeof s}`
  );
}
oe.defaultZone = "utc";
oe.defaultLocale = "en";
const j_ = () => "(incl. tax)", ev = () => "(ex. tax)", tv = () => "tax";
function ae(s) {
  return Number.isNaN(Yt.toNumber(s)) ? 0 : Yt.toNumber(s);
}
function fn(s, n = {}) {
  const i = ae(s), a = i < 0, l = Math.abs(i), h = (n == null ? void 0 : n.currencySymbol) || ce("wc", "currency_format_symbol"), d = Cy(ce("wc", "currency_format")), y = ce("wc", "price_decimals"), v = ce("wc", "price_decimal_separator"), x = ce("wc", "price_thousand_separator"), M = a ? "-" : "", C = (n == null ? void 0 : n.hideCurrencySymbol) ?? !1;
  return M + Ul(l, {
    symbol: C ? "" : h,
    format: d,
    precision: y,
    decimal: v,
    thousand: x
  });
}
function ov(s, n, i = {}) {
  return s.format === we.WITHOUT_TAX ? nv(s.total, i) : s.format === we.WITH_TAX ? rv(
    s.total,
    s.totalTax,
    n,
    i
  ) : s.format === we.WITH_TAX_BREAKDOWN ? iv(
    s.total,
    s.totalTax,
    s.taxBreakdown,
    n,
    i
  ) : sv(s.total);
}
function lv(s, n, i, a = !0) {
  if (i)
    return `${s} ${i}`;
  const l = n ? il(n, "uom_unit") || il(n, "_uom_unit") : void 0;
  if (l)
    return `${s} ${l}`;
  const h = ae(s) <= 1 ? xe(558) : xe(253);
  return a ? `${s} ${h}` : `${s}`;
}
function nv(s, n) {
  const i = ae(s);
  return fn(i, n == null ? void 0 : n.formatMoneyConfig);
}
function rv(s, n = 0, i, a = {}) {
  const l = ae(s), h = n ? ae(n) : 0;
  if (h === 0)
    return fn(l, a == null ? void 0 : a.formatMoneyConfig);
  let d = "";
  return mu(i) === "incl" ? (d = fn(l + h, a == null ? void 0 : a.formatMoneyConfig), ce("wc", "prices_include_tax") || (d += ` <small class="tax_label">${j_()}</small>`)) : (d = fn(l, a == null ? void 0 : a.formatMoneyConfig), ce("wc", "prices_include_tax") && (d += ` <small class="tax_label">${ev()}</small>`)), d;
}
function iv(s, n, i, a, l = {}) {
  const h = ae(s), d = n ? ae(n) : 0, y = fn(h, l == null ? void 0 : l.formatMoneyConfig);
  if (mu(a) !== "incl")
    return y;
  const v = ce("wc", "tax_total_display") === "itemized" ? [
    ...i.map(
      (x) => `${fn(x.amount, l == null ? void 0 : l.formatMoneyConfig)} ${x.label}`
    )
  ] : [`${fn(d, l == null ? void 0 : l.formatMoneyConfig)} ${tv()}`];
  return v.length ? `${y} <br /><small class="includes_tax">(incl. ${v.join(", ")})</small>` : y;
}
function sv(s) {
  return s.toString();
}
const fv = (s, n = "iso") => $f(
  s,
  ce("wp", "date_format"),
  n
), cv = (s, n = "iso") => $f(
  s,
  ce("wp", "time_format"),
  n
), $f = (s, n, i = "iso") => {
  const a = ce("wp", "date_format"), l = ce("wp", "time_format"), h = `${a} ${xe(480)} ${l}`, d = jy(n || h);
  return Pf(s, i).toFormat(d).replace("hh", "h");
}, hv = (s, n = "iso") => Pf(s, n).toRelative() || "", Pf = (s, n = "iso") => {
  const i = ce("wp", "locale").replaceAll("_", "-"), a = Qy();
  if (s) {
    if (n === "iso")
      return F.fromISO(s).setZone(a).setLocale(i);
    if (n === "sql")
      return F.fromSQL(s).setZone(a).setLocale(i);
    if (n === "millis")
      return F.fromMillis(s).setZone(a).setLocale(i);
    if (n === "seconds")
      return F.fromSeconds(s).setZone(a).setLocale(i);
  }
  return F.now().setZone(a).setLocale(i);
};
function uv(s) {
  return ce("wc", "tax_total_display") === "itemized" ? s.tax_lines.map((n) => ({
    label: n.label,
    amount: ae(n.tax_total) + ae(n.shipping_tax_total)
  })) : [
    {
      label: xe(178),
      amount: ae(s.total_tax)
    }
  ];
}
function dv(s, n = [], i) {
  const a = mu(i) === "incl", l = {}, h = ae(s.total), d = ae(s.total_tax), y = uv(s);
  l.total = [
    {
      label: xe(333),
      key: "total",
      taxBreakdown: y,
      total: h,
      totalTax: d,
      format: we.WITH_TAX_BREAKDOWN
    }
  ];
  const v = s.meta_data.find(
    (q) => q.key === "wc_pos_amount_pay"
  ), x = v ? ae(v.value) : 0;
  l.tendered_amount = [
    {
      label: xe(134),
      key: "tendered_amount",
      total: x,
      format: we.WITHOUT_TAX
    }
  ];
  const M = s.meta_data.find(
    (q) => q.key === "wc_pos_amount_change"
  ), C = M ? ae(M.value) : 0;
  l.change_amount = [
    {
      label: xe(138),
      key: "change_amount",
      total: C,
      format: we.WITHOUT_TAX
    }
  ];
  const Q = s.line_items.reduce(
    (q, Pe) => q + Pe.quantity,
    0
  );
  l.items_count = [
    {
      label: xe(464),
      key: "items_count",
      total: Q,
      format: we.AS_NUMBER
    }
  ];
  const N = or(lr(s.line_items, "subtotal")), ee = or(
    lr(s.line_items, "subtotal_tax")
  );
  l.subtotal = [
    {
      label: xe(331),
      key: "subtotal",
      total: N,
      totalTax: ee,
      format: we.WITH_TAX
    }
  ];
  const Ce = ae(s.discount_total) * -1, re = ae(s.discount_tax) * -1, Te = a ? Ce + re : Ce;
  l.discounts = [
    {
      label: xe(332),
      key: "discounts",
      total: Te,
      format: we.WITHOUT_TAX
    }
  ];
  const st = s.fee_lines.filter((q) => !q.meta_data.some(
    (Pe) => Pe.key === "wc_pos_round_total" && Pe.value === "yes"
  )), Ee = or(lr(st, "total")), pt = or(lr(st, "total_tax"));
  l.fees = [
    {
      label: xe(91),
      key: "fees",
      total: Ee,
      totalTax: pt,
      format: we.WITH_TAX
    }
  ];
  const be = ae(s.shipping_total), yt = ae(s.shipping_tax);
  l.shipping = [
    {
      label: xe(93),
      key: "shipping",
      total: be,
      totalTax: yt,
      format: we.WITH_TAX
    }
  ];
  const Ae = s.fee_lines.find(
    (q) => q.meta_data.some(
      (Pe) => Pe.key === "wc_pos_round_total" && Pe.value === "yes"
    )
  ), St = ae((Ae == null ? void 0 : Ae.total) || 0);
  if (l.rounding = [
    {
      label: xe(450),
      key: "rounding",
      total: St,
      format: we.WITHOUT_TAX
    }
  ], ce("wc", "tax_total_display") === "itemized")
    l.tax = [], s.tax_lines.forEach((q) => {
      var wr;
      const Pe = ae(q.tax_total) + ae(q.shipping_tax_total);
      (wr = l.tax) == null || wr.push({
        label: q.label,
        key: `tax_${q.rate_id}`,
        total: Pe,
        format: we.WITHOUT_TAX
      });
    });
  else {
    const q = ae(s.total_tax);
    l.tax = [
      {
        label: xe(178),
        key: "total_tax",
        total: q,
        format: we.WITHOUT_TAX
      }
    ];
  }
  const $e = or(lr(s.refunds, "amount"));
  if (l.refunds = [
    {
      label: xe(295),
      key: "refunds",
      total: $e * -1,
      format: we.WITHOUT_TAX
    }
  ], $e) {
    const q = ae(s.total) - $e;
    l.net_payment = [
      {
        label: xe(342),
        key: "net_payment",
        total: q,
        format: we.WITHOUT_TAX
      }
    ];
  }
  return n.filter((q) => !a || q !== "tax").map((q) => l == null ? void 0 : l[q]).filter(Boolean).flat().filter((q) => q == null ? void 0 : q.total);
}
export {
  fv as formatDate,
  $f as formatDateTime,
  ov as formatLineTotal,
  sv as formatLineTotalAsNumber,
  rv as formatLineTotalWithTax,
  iv as formatLineTotalWithTaxBreakdown,
  nv as formatLineTotalWithoutTax,
  fn as formatMoney,
  lv as formatQuantity,
  cv as formatTime,
  hv as fromDateTime,
  ce as getAppConfig,
  av as getCurrencySymbol,
  Pf as getDateTimeObject,
  xe as getI18n,
  il as getMetaData,
  dv as getOrderLineTotals,
  uv as getOrderTotalTaxBreakdown,
  mu as getTaxDisplay,
  Qy as getTimeZone,
  lr as listPluck,
  jy as phpToLuxonFormat,
  or as sumArrayValues,
  ae as toNumber
};
