!function () {
    function t(t, e) {
        var n;
        for (n in e)
            e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }
    function e() {
        var t;
        do {
            t = Math.floor(999 * Math.random()) + 1
        } while (void 0 !== this.queue["request" + t]);
        return "request" + t
    }
    function n() {
        this.timeout = null;
        for (var t = Object.keys(this.queue), e = [], n = 0, a = t.length; n < a; n++) {
            var i = t[n];
            "done" !== this.queue[i].status ? "new" === this.queue[i].status && (this.queue[i].status = "wait",
                e.push(i + ":" + this.queue[i].query)) : delete this.queue[i]
        }
        r.call(this, e.join(","), !1)
    }
    function r(t, e) {
        e || (e = !1);
        var n = function () {
            return new (this.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0")
        }()
            , r = ["\r\n"]
            , a = {
                query: "{" + t + "}",
                operationName: "",
                variables: ""
            };
        n.open("POST", "https://api.mt5.com/graphql?_format=json&_lang=" + lang + (e ? "&multithreading" : ""), !0),
            n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            n.setRequestHeader("Authorization", "Bearer " + this.token);
        for (var i = String(Math.random()).slice(2), o = "--" + i + "\r\n", s = "--" + i + "--\r\n", l = Object.keys(a), c = 0, d = l.length; c < d; c++)
            r.push('Content-Disposition: form-data; name="' + l[c] + '"\r\n\r\n' + a[l[c]] + "\r\n");
        r = r.join(o) + s,
            n.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + i),
            n.withCredentials = !0,
            n.onreadystatechange = function () {
                if (n.readyState === n.DONE && 200 === n.status) {
                    var t = JSON.parse(n.responseText);
                    if ("object" != typeof t.data)
                        return;
                    t = t.data;
                    for (var e = Object.keys(t), r = 0, a = e.length; r < a; r++) {
                        var i = e[r];
                        if (void 0 !== this.queue[i]) {
                            var o = [];
                            "object" == typeof t[i] && null !== t[i] && t[i].length && (o = t[i]),
                                this.queue[i].callback(o),
                                this.queue[i].status = "done"
                        }
                    }
                }
            }
                .bind(this),
            n.send(r)
    }
    function a() {
        for (var t = Math.floor((new Date).getTime() / 1e3), e = Object.keys(this.queue), n = 0, r = e.length; n < r; n++) {
            var a = e[n];
            "done" !== this.queue[a].status ? this.queue[a].start + 120 < t && (this.queue[a].callback([]),
                delete this.queue[a]) : delete this.queue[a]
        }
    }
    this.GraphQl = function () {
        this.queue = null,
            this.timeout = null,
            this.token = null;
        var e = {
            queue: {}
        };
        for (var n in arguments[0] && "object" == typeof arguments[0] ? this.options = t(e, arguments[0]) : this.options = e,
            this.options)
            this.options.hasOwnProperty(n) && (this[n] = this.options[n]);
        if (!this.token)
            throw "Token param required!";
        setInterval(a.bind(this), 6e4)
    }
        ,
        GraphQl.prototype.getData = function (t, a, i, o, s) {
            s || (s = !1),
                "object" == typeof a && null !== a || (a = {});
            var l = e.call(this);
            if (t) {
                if ("object" == typeof i && i.length) {
                    var c = t
                        , d = Object.keys(a);
                    if (d.length) {
                        c += "(";
                        for (var u = [], p = 0, h = d.length; p < h; p++)
                            u.push(d[p] + ":" + (parseFloat(a[d[p]]).toString() === a[d[p]].toString() ? a[d[p]].toString() : '"' + a[d[p]].toString() + '"'));
                        c += u.join(","),
                            c += ")"
                    }
                    c += "{" + i.join(",") + "}";
                    var g = Math.floor((new Date).getTime() / 1e3);
                    if (s) {
                        this.queue[l] = {
                            query: c,
                            callback: o,
                            status: "wait",
                            start: g
                        };
                        var f = [];
                        f.push(l + ":" + this.queue[l].query),
                            r.call(this, f.join(","), !1)
                    } else
                        this.queue[l] = {
                            query: c,
                            callback: o,
                            status: "new",
                            start: g
                        },
                            null !== this.timeout && clearTimeout(this.timeout),
                            this.timeout = setTimeout(n.bind(this), 50);
                    return l
                }
                console.error("GraphQl parameter cols is empty")
            } else
                console.error("GraphQl parameter method is empty")
        }
}(),
    function (t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.io = e() : t.io = e()
    }(this, (function () {
        return function (t) {
            function e(r) {
                if (n[r])
                    return n[r].exports;
                var a = n[r] = {
                    exports: {},
                    id: r,
                    loaded: !1
                };
                return t[r].call(a.exports, a, a.exports, e),
                    a.loaded = !0,
                    a.exports
            }
            var n = {};
            return e.m = t,
                e.c = n,
                e.p = "",
                e(0)
        }([function (t, e, n) {
            "use strict";
            function r(t, e) {
                "object" === (void 0 === t ? "undefined" : a(t)) && (e = t,
                    t = void 0),
                    e = e || {};
                var n, r = i(t), o = r.source, c = r.id, d = r.path, u = l[c] && d in l[c].nsps;
                return e.forceNew || e["force new connection"] || !1 === e.multiplex || u ? n = s(o, e) : (l[c] || (l[c] = s(o, e)),
                    n = l[c]),
                    r.query && !e.query && (e.query = r.query),
                    n.socket(r.path, e)
            }
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            }
                : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
                , i = n(1)
                , o = n(4)
                , s = n(10);
            n(3)("socket.io-client"),
                t.exports = e = r;
            var l = e.managers = {};
            e.protocol = o.protocol,
                e.connect = r,
                e.Manager = n(10),
                e.Socket = n(36)
        }
            , function (t, e, n) {
                (function (e) {
                    "use strict";
                    var r = n(2);
                    n(3)("socket.io-client:url"),
                        t.exports = function (t, n) {
                            var a = t;
                            n = n || e.location,
                                null == t && (t = n.protocol + "//" + n.host),
                                "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t),
                                    /^(https?|wss?):\/\//.test(t) || (t = void 0 !== n ? n.protocol + "//" + t : "https://" + t),
                                    a = r(t)),
                                a.port || (/^(http|ws)$/.test(a.protocol) ? a.port = "80" : /^(http|ws)s$/.test(a.protocol) && (a.port = "443")),
                                a.path = a.path || "/";
                            var i = -1 !== a.host.indexOf(":") ? "[" + a.host + "]" : a.host;
                            return a.id = a.protocol + "://" + i + ":" + a.port,
                                a.href = a.protocol + "://" + i + (n && n.port === a.port ? "" : ":" + a.port),
                                a
                        }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) {
                var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                    , r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                t.exports = function (t) {
                    var e = t
                        , a = t.indexOf("[")
                        , i = t.indexOf("]");
                    -1 != a && -1 != i && (t = t.substring(0, a) + t.substring(a, i).replace(/:/g, ";") + t.substring(i, t.length));
                    for (var o = n.exec(t || ""), s = {}, l = 14; l--;)
                        s[r[l]] = o[l] || "";
                    return -1 != a && -1 != i && (s.source = e,
                        s.host = s.host.substring(1, s.host.length - 1).replace(/;/g, ":"),
                        s.authority = s.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
                        s.ipv6uri = !0),
                        s
                }
            }
            , function (t, e) {
                "use strict";
                t.exports = function () {
                    return function () { }
                }
            }
            , function (t, e, n) {
                function r() { }
                function a(t) {
                    var n = "" + t.type;
                    return e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (n += t.attachments + "-"),
                        t.nsp && "/" !== t.nsp && (n += t.nsp + ","),
                        null != t.id && (n += t.id),
                        null != t.data && (n += JSON.stringify(t.data)),
                        n
                }
                function i() {
                    this.reconstructor = null
                }
                function o(t) {
                    var n = 0
                        , r = {
                            type: Number(t.charAt(0))
                        };
                    if (null == e.types[r.type])
                        return l();
                    if (e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type) {
                        for (var a = ""; "-" !== t.charAt(++n) && (a += t.charAt(n),
                            n != t.length);)
                            ;
                        if (a != Number(a) || "-" !== t.charAt(n))
                            throw new Error("Illegal attachments");
                        r.attachments = Number(a)
                    }
                    if ("/" === t.charAt(n + 1))
                        for (r.nsp = ""; ++n;) {
                            if ("," === (o = t.charAt(n)))
                                break;
                            if (r.nsp += o,
                                n === t.length)
                                break
                        }
                    else
                        r.nsp = "/";
                    var i = t.charAt(n + 1);
                    if ("" !== i && Number(i) == i) {
                        for (r.id = ""; ++n;) {
                            var o;
                            if (null == (o = t.charAt(n)) || Number(o) != o) {
                                --n;
                                break
                            }
                            if (r.id += t.charAt(n),
                                n === t.length)
                                break
                        }
                        r.id = Number(r.id)
                    }
                    return t.charAt(++n) && (r = function (t, e) {
                        try {
                            t.data = JSON.parse(e)
                        } catch (t) {
                            return l()
                        }
                        return t
                    }(r, t.substr(n))),
                        r
                }
                function s(t) {
                    this.reconPack = t,
                        this.buffers = []
                }
                function l() {
                    return {
                        type: e.ERROR,
                        data: "parser error"
                    }
                }
                var c = (n(3)("socket.io-parser"),
                    n(5))
                    , d = n(6)
                    , u = n(8)
                    , p = n(9);
                e.protocol = 4,
                    e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
                    e.CONNECT = 0,
                    e.DISCONNECT = 1,
                    e.EVENT = 2,
                    e.ACK = 3,
                    e.ERROR = 4,
                    e.BINARY_EVENT = 5,
                    e.BINARY_ACK = 6,
                    e.Encoder = r,
                    e.Decoder = i,
                    r.prototype.encode = function (t, n) {
                        (t.type !== e.EVENT && t.type !== e.ACK || !d(t.data) || (t.type = t.type === e.EVENT ? e.BINARY_EVENT : e.BINARY_ACK),
                            e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type) ? function (t, e) {
                                u.removeBlobs(t, (function (t) {
                                    var n = u.deconstructPacket(t)
                                        , r = a(n.packet)
                                        , i = n.buffers;
                                    i.unshift(r),
                                        e(i)
                                }
                                ))
                            }(t, n) : n([a(t)])
                    }
                    ,
                    c(i.prototype),
                    i.prototype.add = function (t) {
                        var n;
                        if ("string" == typeof t)
                            n = o(t),
                                e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type ? (this.reconstructor = new s(n),
                                    0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
                        else {
                            if (!p(t) && !t.base64)
                                throw new Error("Unknown type: " + t);
                            if (!this.reconstructor)
                                throw new Error("got binary data when not reconstructing a packet");
                            (n = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null,
                                this.emit("decoded", n))
                        }
                    }
                    ,
                    i.prototype.destroy = function () {
                        this.reconstructor && this.reconstructor.finishedReconstruction()
                    }
                    ,
                    s.prototype.takeBinaryData = function (t) {
                        if (this.buffers.push(t),
                            this.buffers.length === this.reconPack.attachments) {
                            var e = u.reconstructPacket(this.reconPack, this.buffers);
                            return this.finishedReconstruction(),
                                e
                        }
                        return null
                    }
                    ,
                    s.prototype.finishedReconstruction = function () {
                        this.reconPack = null,
                            this.buffers = []
                    }
            }
            , function (t, e, n) {
                function r(t) {
                    if (t)
                        return function (t) {
                            for (var e in r.prototype)
                                t[e] = r.prototype[e];
                            return t
                        }(t)
                }
                t.exports = r,
                    r.prototype.on = r.prototype.addEventListener = function (t, e) {
                        return this._callbacks = this._callbacks || {},
                            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
                            this
                    }
                    ,
                    r.prototype.once = function (t, e) {
                        function n() {
                            this.off(t, n),
                                e.apply(this, arguments)
                        }
                        return n.fn = e,
                            this.on(t, n),
                            this
                    }
                    ,
                    r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
                        if (this._callbacks = this._callbacks || {},
                            0 == arguments.length)
                            return this._callbacks = {},
                                this;
                        var n = this._callbacks["$" + t];
                        if (!n)
                            return this;
                        if (1 == arguments.length)
                            return delete this._callbacks["$" + t],
                                this;
                        for (var r, a = 0; a < n.length; a++)
                            if ((r = n[a]) === e || r.fn === e) {
                                n.splice(a, 1);
                                break
                            }
                        return this
                    }
                    ,
                    r.prototype.emit = function (t) {
                        this._callbacks = this._callbacks || {};
                        var e = [].slice.call(arguments, 1)
                            , n = this._callbacks["$" + t];
                        if (n)
                            for (var r = 0, a = (n = n.slice(0)).length; r < a; ++r)
                                n[r].apply(this, e);
                        return this
                    }
                    ,
                    r.prototype.listeners = function (t) {
                        return this._callbacks = this._callbacks || {},
                            this._callbacks["$" + t] || []
                    }
                    ,
                    r.prototype.hasListeners = function (t) {
                        return !!this.listeners(t).length
                    }
            }
            , function (t, e, n) {
                (function (e) {
                    var r = n(7)
                        , a = Object.prototype.toString
                        , i = "function" == typeof e.Blob || "[object BlobConstructor]" === a.call(e.Blob)
                        , o = "function" == typeof e.File || "[object FileConstructor]" === a.call(e.File);
                    t.exports = function t(n) {
                        if (!n || "object" != typeof n)
                            return !1;
                        if (r(n)) {
                            for (var a = 0, s = n.length; a < s; a++)
                                if (t(n[a]))
                                    return !0;
                            return !1
                        }
                        if ("function" == typeof e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(n) || "function" == typeof e.ArrayBuffer && n instanceof ArrayBuffer || i && n instanceof Blob || o && n instanceof File)
                            return !0;
                        if (n.toJSON && "function" == typeof n.toJSON && 1 === arguments.length)
                            return t(n.toJSON(), !0);
                        for (var l in n)
                            if (Object.prototype.hasOwnProperty.call(n, l) && t(n[l]))
                                return !0;
                        return !1
                    }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) {
                var n = {}.toString;
                t.exports = Array.isArray || function (t) {
                    return "[object Array]" == n.call(t)
                }
            }
            , function (t, e, n) {
                (function (t) {
                    var r = n(7)
                        , a = n(9)
                        , i = Object.prototype.toString
                        , o = "function" == typeof t.Blob || "[object BlobConstructor]" === i.call(t.Blob)
                        , s = "function" == typeof t.File || "[object FileConstructor]" === i.call(t.File);
                    e.deconstructPacket = function (t) {
                        var e = []
                            , n = t.data
                            , i = t;
                        return i.data = function t(e, n) {
                            if (!e)
                                return e;
                            if (a(e)) {
                                var i = {
                                    _placeholder: !0,
                                    num: n.length
                                };
                                return n.push(e),
                                    i
                            }
                            if (r(e)) {
                                for (var o = new Array(e.length), s = 0; s < e.length; s++)
                                    o[s] = t(e[s], n);
                                return o
                            }
                            if ("object" == typeof e && !(e instanceof Date)) {
                                o = {};
                                for (var l in e)
                                    o[l] = t(e[l], n);
                                return o
                            }
                            return e
                        }(n, e),
                            i.attachments = e.length,
                        {
                            packet: i,
                            buffers: e
                        }
                    }
                        ,
                        e.reconstructPacket = function (t, e) {
                            return t.data = function t(e, n) {
                                if (!e)
                                    return e;
                                if (e && e._placeholder)
                                    return n[e.num];
                                if (r(e))
                                    for (var a = 0; a < e.length; a++)
                                        e[a] = t(e[a], n);
                                else if ("object" == typeof e)
                                    for (var i in e)
                                        e[i] = t(e[i], n);
                                return e
                            }(t.data, e),
                                t.attachments = void 0,
                                t
                        }
                        ,
                        e.removeBlobs = function (t, e) {
                            var n = 0
                                , i = t;
                            (function t(l, c, d) {
                                if (!l)
                                    return l;
                                if (o && l instanceof Blob || s && l instanceof File) {
                                    n++;
                                    var u = new FileReader;
                                    u.onload = function () {
                                        d ? d[c] = this.result : i = this.result,
                                            --n || e(i)
                                    }
                                        ,
                                        u.readAsArrayBuffer(l)
                                } else if (r(l))
                                    for (var p = 0; p < l.length; p++)
                                        t(l[p], p, l);
                                else if ("object" == typeof l && !a(l))
                                    for (var h in l)
                                        t(l[h], h, l)
                            }
                            )(i),
                                n || e(i)
                        }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) {
                (function (e) {
                    t.exports = function (t) {
                        return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer
                    }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e, n) {
                "use strict";
                function r(t, e) {
                    if (!(this instanceof r))
                        return new r(t, e);
                    t && "object" === (void 0 === t ? "undefined" : a(t)) && (e = t,
                        t = void 0),
                        (e = e || {}).path = e.path || "/socket.io",
                        this.nsps = {},
                        this.subs = [],
                        this.opts = e,
                        this.reconnection(!1 !== e.reconnection),
                        this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
                        this.reconnectionDelay(e.reconnectionDelay || 1e3),
                        this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
                        this.randomizationFactor(e.randomizationFactor || .5),
                        this.backoff = new p({
                            min: this.reconnectionDelay(),
                            max: this.reconnectionDelayMax(),
                            jitter: this.randomizationFactor()
                        }),
                        this.timeout(null == e.timeout ? 2e4 : e.timeout),
                        this.readyState = "closed",
                        this.uri = t,
                        this.connecting = [],
                        this.lastPing = null,
                        this.encoding = !1,
                        this.packetBuffer = [];
                    var n = e.parser || l;
                    this.encoder = new n.Encoder,
                        this.decoder = new n.Decoder,
                        this.autoConnect = !1 !== e.autoConnect,
                        this.autoConnect && this.open()
                }
                var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                }
                    : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }
                    , i = n(11)
                    , o = n(36)
                    , s = n(5)
                    , l = n(4)
                    , c = n(38)
                    , d = n(39)
                    , u = (n(3)("socket.io-client:manager"),
                        n(34))
                    , p = n(40)
                    , h = Object.prototype.hasOwnProperty;
                t.exports = r,
                    r.prototype.emitAll = function () {
                        for (var t in this.emit.apply(this, arguments),
                            this.nsps)
                            h.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
                    }
                    ,
                    r.prototype.updateSocketIds = function () {
                        for (var t in this.nsps)
                            h.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t))
                    }
                    ,
                    r.prototype.generateId = function (t) {
                        return ("/" === t ? "" : t + "#") + this.engine.id
                    }
                    ,
                    s(r.prototype),
                    r.prototype.reconnection = function (t) {
                        return arguments.length ? (this._reconnection = !!t,
                            this) : this._reconnection
                    }
                    ,
                    r.prototype.reconnectionAttempts = function (t) {
                        return arguments.length ? (this._reconnectionAttempts = t,
                            this) : this._reconnectionAttempts
                    }
                    ,
                    r.prototype.reconnectionDelay = function (t) {
                        return arguments.length ? (this._reconnectionDelay = t,
                            this.backoff && this.backoff.setMin(t),
                            this) : this._reconnectionDelay
                    }
                    ,
                    r.prototype.randomizationFactor = function (t) {
                        return arguments.length ? (this._randomizationFactor = t,
                            this.backoff && this.backoff.setJitter(t),
                            this) : this._randomizationFactor
                    }
                    ,
                    r.prototype.reconnectionDelayMax = function (t) {
                        return arguments.length ? (this._reconnectionDelayMax = t,
                            this.backoff && this.backoff.setMax(t),
                            this) : this._reconnectionDelayMax
                    }
                    ,
                    r.prototype.timeout = function (t) {
                        return arguments.length ? (this._timeout = t,
                            this) : this._timeout
                    }
                    ,
                    r.prototype.maybeReconnectOnOpen = function () {
                        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
                    }
                    ,
                    r.prototype.open = r.prototype.connect = function (t, e) {
                        if (~this.readyState.indexOf("open"))
                            return this;
                        this.engine = i(this.uri, this.opts);
                        var n = this.engine
                            , r = this;
                        this.readyState = "opening",
                            this.skipReconnect = !1;
                        var a = c(n, "open", (function () {
                            r.onopen(),
                                t && t()
                        }
                        ))
                            , o = c(n, "error", (function (e) {
                                if (r.cleanup(),
                                    r.readyState = "closed",
                                    r.emitAll("connect_error", e),
                                    t) {
                                    var n = new Error("Connection error");
                                    n.data = e,
                                        t(n)
                                } else
                                    r.maybeReconnectOnOpen()
                            }
                            ));
                        if (!1 !== this._timeout) {
                            var s = this._timeout
                                , l = setTimeout((function () {
                                    a.destroy(),
                                        n.close(),
                                        n.emit("error", "timeout"),
                                        r.emitAll("connect_timeout", s)
                                }
                                ), s);
                            this.subs.push({
                                destroy: function () {
                                    clearTimeout(l)
                                }
                            })
                        }
                        return this.subs.push(a),
                            this.subs.push(o),
                            this
                    }
                    ,
                    r.prototype.onopen = function () {
                        this.cleanup(),
                            this.readyState = "open",
                            this.emit("open");
                        var t = this.engine;
                        this.subs.push(c(t, "data", d(this, "ondata"))),
                            this.subs.push(c(t, "ping", d(this, "onping"))),
                            this.subs.push(c(t, "pong", d(this, "onpong"))),
                            this.subs.push(c(t, "error", d(this, "onerror"))),
                            this.subs.push(c(t, "close", d(this, "onclose"))),
                            this.subs.push(c(this.decoder, "decoded", d(this, "ondecoded")))
                    }
                    ,
                    r.prototype.onping = function () {
                        this.lastPing = new Date,
                            this.emitAll("ping")
                    }
                    ,
                    r.prototype.onpong = function () {
                        this.emitAll("pong", new Date - this.lastPing)
                    }
                    ,
                    r.prototype.ondata = function (t) {
                        this.decoder.add(t)
                    }
                    ,
                    r.prototype.ondecoded = function (t) {
                        this.emit("packet", t)
                    }
                    ,
                    r.prototype.onerror = function (t) {
                        this.emitAll("error", t)
                    }
                    ,
                    r.prototype.socket = function (t, e) {
                        function n() {
                            ~u(a.connecting, r) || a.connecting.push(r)
                        }
                        var r = this.nsps[t];
                        if (!r) {
                            r = new o(this, t, e),
                                this.nsps[t] = r;
                            var a = this;
                            r.on("connecting", n),
                                r.on("connect", (function () {
                                    r.id = a.generateId(t)
                                }
                                )),
                                this.autoConnect && n()
                        }
                        return r
                    }
                    ,
                    r.prototype.destroy = function (t) {
                        var e = u(this.connecting, t);
                        ~e && this.connecting.splice(e, 1),
                            this.connecting.length || this.close()
                    }
                    ,
                    r.prototype.packet = function (t) {
                        var e = this;
                        t.query && 0 === t.type && (t.nsp += "?" + t.query),
                            e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0,
                                this.encoder.encode(t, (function (n) {
                                    for (var r = 0; r < n.length; r++)
                                        e.engine.write(n[r], t.options);
                                    e.encoding = !1,
                                        e.processPacketQueue()
                                }
                                )))
                    }
                    ,
                    r.prototype.processPacketQueue = function () {
                        if (this.packetBuffer.length > 0 && !this.encoding) {
                            var t = this.packetBuffer.shift();
                            this.packet(t)
                        }
                    }
                    ,
                    r.prototype.cleanup = function () {
                        for (var t = this.subs.length, e = 0; e < t; e++) {
                            this.subs.shift().destroy()
                        }
                        this.packetBuffer = [],
                            this.encoding = !1,
                            this.lastPing = null,
                            this.decoder.destroy()
                    }
                    ,
                    r.prototype.close = r.prototype.disconnect = function () {
                        this.skipReconnect = !0,
                            this.reconnecting = !1,
                            "opening" === this.readyState && this.cleanup(),
                            this.backoff.reset(),
                            this.readyState = "closed",
                            this.engine && this.engine.close()
                    }
                    ,
                    r.prototype.onclose = function (t) {
                        this.cleanup(),
                            this.backoff.reset(),
                            this.readyState = "closed",
                            this.emit("close", t),
                            this._reconnection && !this.skipReconnect && this.reconnect()
                    }
                    ,
                    r.prototype.reconnect = function () {
                        if (this.reconnecting || this.skipReconnect)
                            return this;
                        var t = this;
                        if (this.backoff.attempts >= this._reconnectionAttempts)
                            this.backoff.reset(),
                                this.emitAll("reconnect_failed"),
                                this.reconnecting = !1;
                        else {
                            var e = this.backoff.duration();
                            this.reconnecting = !0;
                            var n = setTimeout((function () {
                                t.skipReconnect || (t.emitAll("reconnect_attempt", t.backoff.attempts),
                                    t.emitAll("reconnecting", t.backoff.attempts),
                                    t.skipReconnect || t.open((function (e) {
                                        e ? (t.reconnecting = !1,
                                            t.reconnect(),
                                            t.emitAll("reconnect_error", e.data)) : t.onreconnect()
                                    }
                                    )))
                            }
                            ), e);
                            this.subs.push({
                                destroy: function () {
                                    clearTimeout(n)
                                }
                            })
                        }
                    }
                    ,
                    r.prototype.onreconnect = function () {
                        var t = this.backoff.attempts;
                        this.reconnecting = !1,
                            this.backoff.reset(),
                            this.updateSocketIds(),
                            this.emitAll("reconnect", t)
                    }
            }
            , function (t, e, n) {
                t.exports = n(12)
            }
            , function (t, e, n) {
                t.exports = n(13),
                    t.exports.parser = n(20)
            }
            , function (t, e, n) {
                (function (e) {
                    function r(t, n) {
                        if (!(this instanceof r))
                            return new r(t, n);
                        n = n || {},
                            t && "object" == typeof t && (n = t,
                                t = null),
                            t ? (t = l(t),
                                n.hostname = t.host,
                                n.secure = "https" === t.protocol || "wss" === t.protocol,
                                n.port = t.port,
                                t.query && (n.query = t.query)) : n.host && (n.hostname = l(n.host).host),
                            this.secure = null != n.secure ? n.secure : e.location && "https:" === location.protocol,
                            n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
                            this.agent = n.agent || !1,
                            this.hostname = n.hostname || (e.location ? location.hostname : "localhost"),
                            this.port = n.port || (e.location && location.port ? location.port : this.secure ? 443 : 80),
                            this.query = n.query || {},
                            "string" == typeof this.query && (this.query = d.decode(this.query)),
                            this.upgrade = !1 !== n.upgrade,
                            this.path = (n.path || "/engine.io").replace(/\/$/, "") + "/",
                            this.forceJSONP = !!n.forceJSONP,
                            this.jsonp = !1 !== n.jsonp,
                            this.forceBase64 = !!n.forceBase64,
                            this.enablesXDR = !!n.enablesXDR,
                            this.timestampParam = n.timestampParam || "t",
                            this.timestampRequests = n.timestampRequests,
                            this.transports = n.transports || ["polling", "websocket"],
                            this.transportOptions = n.transportOptions || {},
                            this.readyState = "",
                            this.writeBuffer = [],
                            this.prevBufferLen = 0,
                            this.policyPort = n.policyPort || 843,
                            this.rememberUpgrade = n.rememberUpgrade || !1,
                            this.binaryType = null,
                            this.onlyBinaryUpgrades = n.onlyBinaryUpgrades,
                            this.perMessageDeflate = !1 !== n.perMessageDeflate && (n.perMessageDeflate || {}),
                            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
                            this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
                            this.pfx = n.pfx || null,
                            this.key = n.key || null,
                            this.passphrase = n.passphrase || null,
                            this.cert = n.cert || null,
                            this.ca = n.ca || null,
                            this.ciphers = n.ciphers || null,
                            this.rejectUnauthorized = void 0 === n.rejectUnauthorized || n.rejectUnauthorized,
                            this.forceNode = !!n.forceNode;
                        var a = "object" == typeof e && e;
                        a.global === a && (n.extraHeaders && Object.keys(n.extraHeaders).length > 0 && (this.extraHeaders = n.extraHeaders),
                            n.localAddress && (this.localAddress = n.localAddress)),
                            this.id = null,
                            this.upgrades = null,
                            this.pingInterval = null,
                            this.pingTimeout = null,
                            this.pingIntervalTimer = null,
                            this.pingTimeoutTimer = null,
                            this.open()
                    }
                    var a = n(14)
                        , i = n(5)
                        , o = (n(3)("engine.io-client:socket"),
                            n(34))
                        , s = n(20)
                        , l = n(2)
                        , c = n(35)
                        , d = n(28);
                    t.exports = r,
                        r.priorWebsocketSuccess = !1,
                        i(r.prototype),
                        r.protocol = s.protocol,
                        r.Socket = r,
                        r.Transport = n(19),
                        r.transports = n(14),
                        r.parser = n(20),
                        r.prototype.createTransport = function (t) {
                            var e = function (t) {
                                var e = {};
                                for (var n in t)
                                    t.hasOwnProperty(n) && (e[n] = t[n]);
                                return e
                            }(this.query);
                            e.EIO = s.protocol,
                                e.transport = t;
                            var n = this.transportOptions[t] || {};
                            return this.id && (e.sid = this.id),
                                new a[t]({
                                    query: e,
                                    socket: this,
                                    agent: n.agent || this.agent,
                                    hostname: n.hostname || this.hostname,
                                    port: n.port || this.port,
                                    secure: n.secure || this.secure,
                                    path: n.path || this.path,
                                    forceJSONP: n.forceJSONP || this.forceJSONP,
                                    jsonp: n.jsonp || this.jsonp,
                                    forceBase64: n.forceBase64 || this.forceBase64,
                                    enablesXDR: n.enablesXDR || this.enablesXDR,
                                    timestampRequests: n.timestampRequests || this.timestampRequests,
                                    timestampParam: n.timestampParam || this.timestampParam,
                                    policyPort: n.policyPort || this.policyPort,
                                    pfx: n.pfx || this.pfx,
                                    key: n.key || this.key,
                                    passphrase: n.passphrase || this.passphrase,
                                    cert: n.cert || this.cert,
                                    ca: n.ca || this.ca,
                                    ciphers: n.ciphers || this.ciphers,
                                    rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                                    perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                                    extraHeaders: n.extraHeaders || this.extraHeaders,
                                    forceNode: n.forceNode || this.forceNode,
                                    localAddress: n.localAddress || this.localAddress,
                                    requestTimeout: n.requestTimeout || this.requestTimeout,
                                    protocols: n.protocols || void 0
                                })
                        }
                        ,
                        r.prototype.open = function () {
                            var t;
                            if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket"))
                                t = "websocket";
                            else {
                                if (0 === this.transports.length) {
                                    var e = this;
                                    return void setTimeout((function () {
                                        e.emit("error", "No transports available")
                                    }
                                    ), 0)
                                }
                                t = this.transports[0]
                            }
                            this.readyState = "opening";
                            try {
                                t = this.createTransport(t)
                            } catch (t) {
                                return this.transports.shift(),
                                    void this.open()
                            }
                            t.open(),
                                this.setTransport(t)
                        }
                        ,
                        r.prototype.setTransport = function (t) {
                            var e = this;
                            this.transport && this.transport.removeAllListeners(),
                                this.transport = t,
                                t.on("drain", (function () {
                                    e.onDrain()
                                }
                                )).on("packet", (function (t) {
                                    e.onPacket(t)
                                }
                                )).on("error", (function (t) {
                                    e.onError(t)
                                }
                                )).on("close", (function () {
                                    e.onClose("transport close")
                                }
                                ))
                        }
                        ,
                        r.prototype.probe = function (t) {
                            function e() {
                                if (u.onlyBinaryUpgrades) {
                                    var t = !this.supportsBinary && u.transport.supportsBinary;
                                    d = d || t
                                }
                                d || (c.send([{
                                    type: "ping",
                                    data: "probe"
                                }]),
                                    c.once("packet", (function (t) {
                                        if (!d)
                                            if ("pong" === t.type && "probe" === t.data) {
                                                if (u.upgrading = !0,
                                                    u.emit("upgrading", c),
                                                    !c)
                                                    return;
                                                r.priorWebsocketSuccess = "websocket" === c.name,
                                                    u.transport.pause((function () {
                                                        d || "closed" !== u.readyState && (l(),
                                                            u.setTransport(c),
                                                            c.send([{
                                                                type: "upgrade"
                                                            }]),
                                                            u.emit("upgrade", c),
                                                            c = null,
                                                            u.upgrading = !1,
                                                            u.flush())
                                                    }
                                                    ))
                                            } else {
                                                var e = new Error("probe error");
                                                e.transport = c.name,
                                                    u.emit("upgradeError", e)
                                            }
                                    }
                                    )))
                            }
                            function n() {
                                d || (d = !0,
                                    l(),
                                    c.close(),
                                    c = null)
                            }
                            function a(t) {
                                var e = new Error("probe error: " + t);
                                e.transport = c.name,
                                    n(),
                                    u.emit("upgradeError", e)
                            }
                            function i() {
                                a("transport closed")
                            }
                            function o() {
                                a("socket closed")
                            }
                            function s(t) {
                                c && t.name !== c.name && n()
                            }
                            function l() {
                                c.removeListener("open", e),
                                    c.removeListener("error", a),
                                    c.removeListener("close", i),
                                    u.removeListener("close", o),
                                    u.removeListener("upgrading", s)
                            }
                            var c = this.createTransport(t, {
                                probe: 1
                            })
                                , d = !1
                                , u = this;
                            r.priorWebsocketSuccess = !1,
                                c.once("open", e),
                                c.once("error", a),
                                c.once("close", i),
                                this.once("close", o),
                                this.once("upgrading", s),
                                c.open()
                        }
                        ,
                        r.prototype.onOpen = function () {
                            if (this.readyState = "open",
                                r.priorWebsocketSuccess = "websocket" === this.transport.name,
                                this.emit("open"),
                                this.flush(),
                                "open" === this.readyState && this.upgrade && this.transport.pause)
                                for (var t = 0, e = this.upgrades.length; t < e; t++)
                                    this.probe(this.upgrades[t])
                        }
                        ,
                        r.prototype.onPacket = function (t) {
                            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                                switch (this.emit("packet", t),
                                this.emit("heartbeat"),
                                t.type) {
                                    case "open":
                                        this.onHandshake(c(t.data));
                                        break;
                                    case "pong":
                                        this.setPing(),
                                            this.emit("pong");
                                        break;
                                    case "error":
                                        var e = new Error("server error");
                                        e.code = t.data,
                                            this.onError(e);
                                        break;
                                    case "message":
                                        this.emit("data", t.data),
                                            this.emit("message", t.data)
                                }
                        }
                        ,
                        r.prototype.onHandshake = function (t) {
                            this.emit("handshake", t),
                                this.id = t.sid,
                                this.transport.query.sid = t.sid,
                                this.upgrades = this.filterUpgrades(t.upgrades),
                                this.pingInterval = t.pingInterval,
                                this.pingTimeout = t.pingTimeout,
                                this.onOpen(),
                                "closed" !== this.readyState && (this.setPing(),
                                    this.removeListener("heartbeat", this.onHeartbeat),
                                    this.on("heartbeat", this.onHeartbeat))
                        }
                        ,
                        r.prototype.onHeartbeat = function (t) {
                            clearTimeout(this.pingTimeoutTimer);
                            var e = this;
                            e.pingTimeoutTimer = setTimeout((function () {
                                "closed" !== e.readyState && e.onClose("ping timeout")
                            }
                            ), t || e.pingInterval + e.pingTimeout)
                        }
                        ,
                        r.prototype.setPing = function () {
                            var t = this;
                            clearTimeout(t.pingIntervalTimer),
                                t.pingIntervalTimer = setTimeout((function () {
                                    t.ping(),
                                        t.onHeartbeat(t.pingTimeout)
                                }
                                ), t.pingInterval)
                        }
                        ,
                        r.prototype.ping = function () {
                            var t = this;
                            this.sendPacket("ping", (function () {
                                t.emit("ping")
                            }
                            ))
                        }
                        ,
                        r.prototype.onDrain = function () {
                            this.writeBuffer.splice(0, this.prevBufferLen),
                                this.prevBufferLen = 0,
                                0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                        }
                        ,
                        r.prototype.flush = function () {
                            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.transport.send(this.writeBuffer),
                                this.prevBufferLen = this.writeBuffer.length,
                                this.emit("flush"))
                        }
                        ,
                        r.prototype.write = r.prototype.send = function (t, e, n) {
                            return this.sendPacket("message", t, e, n),
                                this
                        }
                        ,
                        r.prototype.sendPacket = function (t, e, n, r) {
                            if ("function" == typeof e && (r = e,
                                e = void 0),
                                "function" == typeof n && (r = n,
                                    n = null),
                                "closing" !== this.readyState && "closed" !== this.readyState) {
                                (n = n || {}).compress = !1 !== n.compress;
                                var a = {
                                    type: t,
                                    data: e,
                                    options: n
                                };
                                this.emit("packetCreate", a),
                                    this.writeBuffer.push(a),
                                    r && this.once("flush", r),
                                    this.flush()
                            }
                        }
                        ,
                        r.prototype.close = function () {
                            function t() {
                                r.onClose("forced close"),
                                    r.transport.close()
                            }
                            function e() {
                                r.removeListener("upgrade", e),
                                    r.removeListener("upgradeError", e),
                                    t()
                            }
                            function n() {
                                r.once("upgrade", e),
                                    r.once("upgradeError", e)
                            }
                            if ("opening" === this.readyState || "open" === this.readyState) {
                                this.readyState = "closing";
                                var r = this;
                                this.writeBuffer.length ? this.once("drain", (function () {
                                    this.upgrading ? n() : t()
                                }
                                )) : this.upgrading ? n() : t()
                            }
                            return this
                        }
                        ,
                        r.prototype.onError = function (t) {
                            r.priorWebsocketSuccess = !1,
                                this.emit("error", t),
                                this.onClose("transport error", t)
                        }
                        ,
                        r.prototype.onClose = function (t, e) {
                            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                                clearTimeout(this.pingIntervalTimer),
                                    clearTimeout(this.pingTimeoutTimer),
                                    this.transport.removeAllListeners("close"),
                                    this.transport.close(),
                                    this.transport.removeAllListeners(),
                                    this.readyState = "closed",
                                    this.id = null,
                                    this.emit("close", t, e),
                                    this.writeBuffer = [],
                                    this.prevBufferLen = 0
                            }
                        }
                        ,
                        r.prototype.filterUpgrades = function (t) {
                            for (var e = [], n = 0, r = t.length; n < r; n++)
                                ~o(this.transports, t[n]) && e.push(t[n]);
                            return e
                        }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e, n) {
                (function (t) {
                    var r = n(15)
                        , a = n(17)
                        , i = n(31)
                        , o = n(32);
                    e.polling = function (e) {
                        var n = !1
                            , o = !1
                            , s = !1 !== e.jsonp;
                        if (t.location) {
                            var l = "https:" === location.protocol
                                , c = location.port;
                            c || (c = l ? 443 : 80),
                                n = e.hostname !== location.hostname || c !== e.port,
                                o = e.secure !== l
                        }
                        if (e.xdomain = n,
                            e.xscheme = o,
                            "open" in new r(e) && !e.forceJSONP)
                            return new a(e);
                        if (!s)
                            throw new Error("JSONP disabled");
                        return new i(e)
                    }
                        ,
                        e.websocket = o
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e, n) {
                (function (e) {
                    var r = n(16);
                    t.exports = function (t) {
                        var n = t.xdomain
                            , a = t.xscheme
                            , i = t.enablesXDR;
                        try {
                            if ("undefined" != typeof XMLHttpRequest && (!n || r))
                                return new XMLHttpRequest
                        } catch (t) { }
                        try {
                            if ("undefined" != typeof XDomainRequest && !a && i)
                                return new XDomainRequest
                        } catch (t) { }
                        if (!n)
                            try {
                                return new (e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                            } catch (t) { }
                    }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) {
                try {
                    t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                } catch (e) {
                    t.exports = !1
                }
            }
            , function (t, e, n) {
                (function (e) {
                    function r() { }
                    function a(t) {
                        if (l.call(this, t),
                            this.requestTimeout = t.requestTimeout,
                            this.extraHeaders = t.extraHeaders,
                            e.location) {
                            var n = "https:" === location.protocol
                                , r = location.port;
                            r || (r = n ? 443 : 80),
                                this.xd = t.hostname !== e.location.hostname || r !== t.port,
                                this.xs = t.secure !== n
                        }
                    }
                    function i(t) {
                        this.method = t.method || "GET",
                            this.uri = t.uri,
                            this.xd = !!t.xd,
                            this.xs = !!t.xs,
                            this.async = !1 !== t.async,
                            this.data = void 0 !== t.data ? t.data : null,
                            this.agent = t.agent,
                            this.isBinary = t.isBinary,
                            this.supportsBinary = t.supportsBinary,
                            this.enablesXDR = t.enablesXDR,
                            this.requestTimeout = t.requestTimeout,
                            this.pfx = t.pfx,
                            this.key = t.key,
                            this.passphrase = t.passphrase,
                            this.cert = t.cert,
                            this.ca = t.ca,
                            this.ciphers = t.ciphers,
                            this.rejectUnauthorized = t.rejectUnauthorized,
                            this.extraHeaders = t.extraHeaders,
                            this.create()
                    }
                    function o() {
                        for (var t in i.requests)
                            i.requests.hasOwnProperty(t) && i.requests[t].abort()
                    }
                    var s = n(15)
                        , l = n(18)
                        , c = n(5)
                        , d = n(29);
                    n(3)("engine.io-client:polling-xhr"),
                        t.exports = a,
                        t.exports.Request = i,
                        d(a, l),
                        a.prototype.supportsBinary = !0,
                        a.prototype.request = function (t) {
                            return (t = t || {}).uri = this.uri(),
                                t.xd = this.xd,
                                t.xs = this.xs,
                                t.agent = this.agent || !1,
                                t.supportsBinary = this.supportsBinary,
                                t.enablesXDR = this.enablesXDR,
                                t.pfx = this.pfx,
                                t.key = this.key,
                                t.passphrase = this.passphrase,
                                t.cert = this.cert,
                                t.ca = this.ca,
                                t.ciphers = this.ciphers,
                                t.rejectUnauthorized = this.rejectUnauthorized,
                                t.requestTimeout = this.requestTimeout,
                                t.extraHeaders = this.extraHeaders,
                                new i(t)
                        }
                        ,
                        a.prototype.doWrite = function (t, e) {
                            var n = "string" != typeof t && void 0 !== t
                                , r = this.request({
                                    method: "POST",
                                    data: t,
                                    isBinary: n
                                })
                                , a = this;
                            r.on("success", e),
                                r.on("error", (function (t) {
                                    a.onError("xhr post error", t)
                                }
                                )),
                                this.sendXhr = r
                        }
                        ,
                        a.prototype.doPoll = function () {
                            var t = this.request()
                                , e = this;
                            t.on("data", (function (t) {
                                e.onData(t)
                            }
                            )),
                                t.on("error", (function (t) {
                                    e.onError("xhr poll error", t)
                                }
                                )),
                                this.pollXhr = t
                        }
                        ,
                        c(i.prototype),
                        i.prototype.create = function () {
                            var t = {
                                agent: this.agent,
                                xdomain: this.xd,
                                xscheme: this.xs,
                                enablesXDR: this.enablesXDR
                            };
                            t.pfx = this.pfx,
                                t.key = this.key,
                                t.passphrase = this.passphrase,
                                t.cert = this.cert,
                                t.ca = this.ca,
                                t.ciphers = this.ciphers,
                                t.rejectUnauthorized = this.rejectUnauthorized;
                            var n = this.xhr = new s(t)
                                , r = this;
                            try {
                                n.open(this.method, this.uri, this.async);
                                try {
                                    if (this.extraHeaders)
                                        for (var a in n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0),
                                            this.extraHeaders)
                                            this.extraHeaders.hasOwnProperty(a) && n.setRequestHeader(a, this.extraHeaders[a])
                                } catch (t) { }
                                if ("POST" === this.method)
                                    try {
                                        this.isBinary ? n.setRequestHeader("Content-type", "application/octet-stream") : n.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                    } catch (t) { }
                                try {
                                    n.setRequestHeader("Accept", "*/*")
                                } catch (t) { }
                                "withCredentials" in n && (n.withCredentials = !0),
                                    this.requestTimeout && (n.timeout = this.requestTimeout),
                                    this.hasXDR() ? (n.onload = function () {
                                        r.onLoad()
                                    }
                                        ,
                                        n.onerror = function () {
                                            r.onError(n.responseText)
                                        }
                                    ) : n.onreadystatechange = function () {
                                        if (2 === n.readyState) {
                                            var t;
                                            try {
                                                t = n.getResponseHeader("Content-Type")
                                            } catch (t) { }
                                            "application/octet-stream" === t && (n.responseType = "arraybuffer")
                                        }
                                        4 === n.readyState && (200 === n.status || 1223 === n.status ? r.onLoad() : setTimeout((function () {
                                            r.onError(n.status)
                                        }
                                        ), 0))
                                    }
                                    ,
                                    n.send(this.data)
                            } catch (t) {
                                return void setTimeout((function () {
                                    r.onError(t)
                                }
                                ), 0)
                            }
                            e.document && (this.index = i.requestsCount++,
                                i.requests[this.index] = this)
                        }
                        ,
                        i.prototype.onSuccess = function () {
                            this.emit("success"),
                                this.cleanup()
                        }
                        ,
                        i.prototype.onData = function (t) {
                            this.emit("data", t),
                                this.onSuccess()
                        }
                        ,
                        i.prototype.onError = function (t) {
                            this.emit("error", t),
                                this.cleanup(!0)
                        }
                        ,
                        i.prototype.cleanup = function (t) {
                            if (void 0 !== this.xhr && null !== this.xhr) {
                                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r,
                                    t)
                                    try {
                                        this.xhr.abort()
                                    } catch (t) { }
                                e.document && delete i.requests[this.index],
                                    this.xhr = null
                            }
                        }
                        ,
                        i.prototype.onLoad = function () {
                            var t;
                            try {
                                var e;
                                try {
                                    e = this.xhr.getResponseHeader("Content-Type")
                                } catch (t) { }
                                t = "application/octet-stream" === e && this.xhr.response || this.xhr.responseText
                            } catch (t) {
                                this.onError(t)
                            }
                            null != t && this.onData(t)
                        }
                        ,
                        i.prototype.hasXDR = function () {
                            return void 0 !== e.XDomainRequest && !this.xs && this.enablesXDR
                        }
                        ,
                        i.prototype.abort = function () {
                            this.cleanup()
                        }
                        ,
                        i.requestsCount = 0,
                        i.requests = {},
                        e.document && (e.attachEvent ? e.attachEvent("onunload", o) : e.addEventListener && e.addEventListener("beforeunload", o, !1))
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e, n) {
                function r(t) {
                    var e = t && t.forceBase64;
                    c && !e || (this.supportsBinary = !1),
                        a.call(this, t)
                }
                var a = n(19)
                    , i = n(28)
                    , o = n(20)
                    , s = n(29)
                    , l = n(30);
                n(3)("engine.io-client:polling"),
                    t.exports = r;
                var c = null != new (n(15))({
                    xdomain: !1
                }).responseType;
                s(r, a),
                    r.prototype.name = "polling",
                    r.prototype.doOpen = function () {
                        this.poll()
                    }
                    ,
                    r.prototype.pause = function (t) {
                        function e() {
                            n.readyState = "paused",
                                t()
                        }
                        var n = this;
                        if (this.readyState = "pausing",
                            this.polling || !this.writable) {
                            var r = 0;
                            this.polling && (r++,
                                this.once("pollComplete", (function () {
                                    --r || e()
                                }
                                ))),
                                this.writable || (r++,
                                    this.once("drain", (function () {
                                        --r || e()
                                    }
                                    )))
                        } else
                            e()
                    }
                    ,
                    r.prototype.poll = function () {
                        this.polling = !0,
                            this.doPoll(),
                            this.emit("poll")
                    }
                    ,
                    r.prototype.onData = function (t) {
                        var e = this;
                        o.decodePayload(t, this.socket.binaryType, (function (t, n, r) {
                            return "opening" === e.readyState && e.onOpen(),
                                "close" === t.type ? (e.onClose(),
                                    !1) : void e.onPacket(t)
                        }
                        )),
                            "closed" !== this.readyState && (this.polling = !1,
                                this.emit("pollComplete"),
                                "open" === this.readyState && this.poll())
                    }
                    ,
                    r.prototype.doClose = function () {
                        function t() {
                            e.write([{
                                type: "close"
                            }])
                        }
                        var e = this;
                        "open" === this.readyState ? t() : this.once("open", t)
                    }
                    ,
                    r.prototype.write = function (t) {
                        var e = this;
                        this.writable = !1;
                        var n = function () {
                            e.writable = !0,
                                e.emit("drain")
                        };
                        o.encodePayload(t, this.supportsBinary, (function (t) {
                            e.doWrite(t, n)
                        }
                        ))
                    }
                    ,
                    r.prototype.uri = function () {
                        var t = this.query || {}
                            , e = this.secure ? "https" : "http"
                            , n = "";
                        return !1 !== this.timestampRequests && (t[this.timestampParam] = l()),
                            this.supportsBinary || t.sid || (t.b64 = 1),
                            t = i.encode(t),
                            this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (n = ":" + this.port),
                            t.length && (t = "?" + t),
                            e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
                    }
            }
            , function (t, e, n) {
                function r(t) {
                    this.path = t.path,
                        this.hostname = t.hostname,
                        this.port = t.port,
                        this.secure = t.secure,
                        this.query = t.query,
                        this.timestampParam = t.timestampParam,
                        this.timestampRequests = t.timestampRequests,
                        this.readyState = "",
                        this.agent = t.agent || !1,
                        this.socket = t.socket,
                        this.enablesXDR = t.enablesXDR,
                        this.pfx = t.pfx,
                        this.key = t.key,
                        this.passphrase = t.passphrase,
                        this.cert = t.cert,
                        this.ca = t.ca,
                        this.ciphers = t.ciphers,
                        this.rejectUnauthorized = t.rejectUnauthorized,
                        this.forceNode = t.forceNode,
                        this.extraHeaders = t.extraHeaders,
                        this.localAddress = t.localAddress
                }
                var a = n(20)
                    , i = n(5);
                t.exports = r,
                    i(r.prototype),
                    r.prototype.onError = function (t, e) {
                        var n = new Error(t);
                        return n.type = "TransportError",
                            n.description = e,
                            this.emit("error", n),
                            this
                    }
                    ,
                    r.prototype.open = function () {
                        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
                            this.doOpen()),
                            this
                    }
                    ,
                    r.prototype.close = function () {
                        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
                            this.onClose()),
                            this
                    }
                    ,
                    r.prototype.send = function (t) {
                        if ("open" !== this.readyState)
                            throw new Error("Transport not open");
                        this.write(t)
                    }
                    ,
                    r.prototype.onOpen = function () {
                        this.readyState = "open",
                            this.writable = !0,
                            this.emit("open")
                    }
                    ,
                    r.prototype.onData = function (t) {
                        var e = a.decodePacket(t, this.socket.binaryType);
                        this.onPacket(e)
                    }
                    ,
                    r.prototype.onPacket = function (t) {
                        this.emit("packet", t)
                    }
                    ,
                    r.prototype.onClose = function () {
                        this.readyState = "closed",
                            this.emit("close")
                    }
            }
            , function (t, e, n) {
                (function (t) {
                    function r(t, n) {
                        return n("b" + e.packets[t.type] + t.data.data)
                    }
                    function a(t, n, r) {
                        if (!n)
                            return e.encodeBase64Packet(t, r);
                        var a = t.data
                            , i = new Uint8Array(a)
                            , o = new Uint8Array(1 + a.byteLength);
                        o[0] = y[t.type];
                        for (var s = 0; s < i.length; s++)
                            o[s + 1] = i[s];
                        return r(o.buffer)
                    }
                    function i(t, n, r) {
                        if (!n)
                            return e.encodeBase64Packet(t, r);
                        if (f)
                            return function (t, n, r) {
                                if (!n)
                                    return e.encodeBase64Packet(t, r);
                                var a = new FileReader;
                                return a.onload = function () {
                                    t.data = a.result,
                                        e.encodePacket(t, n, !0, r)
                                }
                                    ,
                                    a.readAsArrayBuffer(t.data)
                            }(t, n, r);
                        var a = new Uint8Array(1);
                        return a[0] = y[t.type],
                            r(new b([a.buffer, t.data]))
                    }
                    function o(t, e, n) {
                        for (var r = new Array(t.length), a = u(t.length, n), i = function (t, n, a) {
                            e(n, (function (e, n) {
                                r[t] = n,
                                    a(e, r)
                            }
                            ))
                        }, o = 0; o < t.length; o++)
                            i(o, t[o], a)
                    }
                    var s, l = n(21), c = n(6), d = n(22), u = n(23), p = n(24);
                    t && t.ArrayBuffer && (s = n(26));
                    var h = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent)
                        , g = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent)
                        , f = h || g;
                    e.protocol = 3;
                    var y = e.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    }
                        , m = l(y)
                        , v = {
                            type: "error",
                            data: "parser error"
                        }
                        , b = n(27);
                    e.encodePacket = function (e, n, o, s) {
                        "function" == typeof n && (s = n,
                            n = !1),
                            "function" == typeof o && (s = o,
                                o = null);
                        var l = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                        if (t.ArrayBuffer && l instanceof ArrayBuffer)
                            return a(e, n, s);
                        if (b && l instanceof t.Blob)
                            return i(e, n, s);
                        if (l && l.base64)
                            return r(e, s);
                        var c = y[e.type];
                        return void 0 !== e.data && (c += o ? p.encode(String(e.data), {
                            strict: !1
                        }) : String(e.data)),
                            s("" + c)
                    }
                        ,
                        e.encodeBase64Packet = function (n, r) {
                            var a, i = "b" + e.packets[n.type];
                            if (b && n.data instanceof t.Blob) {
                                var o = new FileReader;
                                return o.onload = function () {
                                    var t = o.result.split(",")[1];
                                    r(i + t)
                                }
                                    ,
                                    o.readAsDataURL(n.data)
                            }
                            try {
                                a = String.fromCharCode.apply(null, new Uint8Array(n.data))
                            } catch (t) {
                                for (var s = new Uint8Array(n.data), l = new Array(s.length), c = 0; c < s.length; c++)
                                    l[c] = s[c];
                                a = String.fromCharCode.apply(null, l)
                            }
                            return i += t.btoa(a),
                                r(i)
                        }
                        ,
                        e.decodePacket = function (t, n, r) {
                            if (void 0 === t)
                                return v;
                            if ("string" == typeof t) {
                                if ("b" === t.charAt(0))
                                    return e.decodeBase64Packet(t.substr(1), n);
                                if (r && !1 === (t = function (t) {
                                    try {
                                        t = p.decode(t, {
                                            strict: !1
                                        })
                                    } catch (t) {
                                        return !1
                                    }
                                    return t
                                }(t)))
                                    return v;
                                var a = t.charAt(0);
                                return Number(a) == a && m[a] ? t.length > 1 ? {
                                    type: m[a],
                                    data: t.substring(1)
                                } : {
                                    type: m[a]
                                } : v
                            }
                            a = new Uint8Array(t)[0];
                            var i = d(t, 1);
                            return b && "blob" === n && (i = new b([i])),
                            {
                                type: m[a],
                                data: i
                            }
                        }
                        ,
                        e.decodeBase64Packet = function (t, e) {
                            var n = m[t.charAt(0)];
                            if (!s)
                                return {
                                    type: n,
                                    data: {
                                        base64: !0,
                                        data: t.substr(1)
                                    }
                                };
                            var r = s.decode(t.substr(1));
                            return "blob" === e && b && (r = new b([r])),
                            {
                                type: n,
                                data: r
                            }
                        }
                        ,
                        e.encodePayload = function (t, n, r) {
                            "function" == typeof n && (r = n,
                                n = null);
                            var a = c(t);
                            return n && a ? b && !f ? e.encodePayloadAsBlob(t, r) : e.encodePayloadAsArrayBuffer(t, r) : t.length ? void o(t, (function (t, r) {
                                e.encodePacket(t, !!a && n, !1, (function (t) {
                                    r(null, function (t) {
                                        return t.length + ":" + t
                                    }(t))
                                }
                                ))
                            }
                            ), (function (t, e) {
                                return r(e.join(""))
                            }
                            )) : r("0:")
                        }
                        ,
                        e.decodePayload = function (t, n, r) {
                            if ("string" != typeof t)
                                return e.decodePayloadAsBinary(t, n, r);
                            var a;
                            if ("function" == typeof n && (r = n,
                                n = null),
                                "" === t)
                                return r(v, 0, 1);
                            for (var i, o, s = "", l = 0, c = t.length; l < c; l++) {
                                var d = t.charAt(l);
                                if (":" === d) {
                                    if ("" === s || s != (i = Number(s)))
                                        return r(v, 0, 1);
                                    if (s != (o = t.substr(l + 1, i)).length)
                                        return r(v, 0, 1);
                                    if (o.length) {
                                        if (a = e.decodePacket(o, n, !1),
                                            v.type === a.type && v.data === a.data)
                                            return r(v, 0, 1);
                                        if (!1 === r(a, l + i, c))
                                            return
                                    }
                                    l += i,
                                        s = ""
                                } else
                                    s += d
                            }
                            return "" !== s ? r(v, 0, 1) : void 0
                        }
                        ,
                        e.encodePayloadAsArrayBuffer = function (t, n) {
                            return t.length ? void o(t, (function (t, n) {
                                e.encodePacket(t, !0, !0, (function (t) {
                                    return n(null, t)
                                }
                                ))
                            }
                            ), (function (t, e) {
                                var r = e.reduce((function (t, e) {
                                    var n;
                                    return t + (n = "string" == typeof e ? e.length : e.byteLength).toString().length + n + 2
                                }
                                ), 0)
                                    , a = new Uint8Array(r)
                                    , i = 0;
                                return e.forEach((function (t) {
                                    var e = "string" == typeof t
                                        , n = t;
                                    if (e) {
                                        for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++)
                                            r[o] = t.charCodeAt(o);
                                        n = r.buffer
                                    }
                                    a[i++] = e ? 0 : 1;
                                    var s = n.byteLength.toString();
                                    for (o = 0; o < s.length; o++)
                                        a[i++] = parseInt(s[o]);
                                    a[i++] = 255;
                                    for (r = new Uint8Array(n),
                                        o = 0; o < r.length; o++)
                                        a[i++] = r[o]
                                }
                                )),
                                    n(a.buffer)
                            }
                            )) : n(new ArrayBuffer(0))
                        }
                        ,
                        e.encodePayloadAsBlob = function (t, n) {
                            o(t, (function (t, n) {
                                e.encodePacket(t, !0, !0, (function (t) {
                                    var e = new Uint8Array(1);
                                    if (e[0] = 1,
                                        "string" == typeof t) {
                                        for (var r = new Uint8Array(t.length), a = 0; a < t.length; a++)
                                            r[a] = t.charCodeAt(a);
                                        t = r.buffer,
                                            e[0] = 0
                                    }
                                    var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString()
                                        , o = new Uint8Array(i.length + 1);
                                    for (a = 0; a < i.length; a++)
                                        o[a] = parseInt(i[a]);
                                    if (o[i.length] = 255,
                                        b) {
                                        var s = new b([e.buffer, o.buffer, t]);
                                        n(null, s)
                                    }
                                }
                                ))
                            }
                            ), (function (t, e) {
                                return n(new b(e))
                            }
                            ))
                        }
                        ,
                        e.decodePayloadAsBinary = function (t, n, r) {
                            "function" == typeof n && (r = n,
                                n = null);
                            for (var a = t, i = []; a.byteLength > 0;) {
                                for (var o = new Uint8Array(a), s = 0 === o[0], l = "", c = 1; 255 !== o[c]; c++) {
                                    if (l.length > 310)
                                        return r(v, 0, 1);
                                    l += o[c]
                                }
                                a = d(a, 2 + l.length),
                                    l = parseInt(l);
                                var u = d(a, 0, l);
                                if (s)
                                    try {
                                        u = String.fromCharCode.apply(null, new Uint8Array(u))
                                    } catch (t) {
                                        var p = new Uint8Array(u);
                                        u = "";
                                        for (c = 0; c < p.length; c++)
                                            u += String.fromCharCode(p[c])
                                    }
                                i.push(u),
                                    a = d(a, l)
                            }
                            var h = i.length;
                            i.forEach((function (t, a) {
                                r(e.decodePacket(t, n, !0), a, h)
                            }
                            ))
                        }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) {
                t.exports = Object.keys || function (t) {
                    var e = []
                        , n = Object.prototype.hasOwnProperty;
                    for (var r in t)
                        n.call(t, r) && e.push(r);
                    return e
                }
            }
            , function (t, e) {
                t.exports = function (t, e, n) {
                    var r = t.byteLength;
                    if (e = e || 0,
                        n = n || r,
                        t.slice)
                        return t.slice(e, n);
                    if (e < 0 && (e += r),
                        n < 0 && (n += r),
                        n > r && (n = r),
                        e >= r || e >= n || 0 === r)
                        return new ArrayBuffer(0);
                    for (var a = new Uint8Array(t), i = new Uint8Array(n - e), o = e, s = 0; o < n; o++,
                        s++)
                        i[s] = a[o];
                    return i.buffer
                }
            }
            , function (t, e) {
                function n() { }
                t.exports = function (t, e, r) {
                    function a(t, n) {
                        if (a.count <= 0)
                            throw new Error("after called too many times");
                        --a.count,
                            t ? (i = !0,
                                e(t),
                                e = r) : 0 !== a.count || i || e(null, n)
                    }
                    var i = !1;
                    return r = r || n,
                        a.count = t,
                        0 === t ? e() : a
                }
            }
            , function (t, e, n) {
                var r;
                (function (t, a) {
                    !function (i) {
                        function o(t) {
                            for (var e, n, r = [], a = 0, i = t.length; a < i;)
                                (e = t.charCodeAt(a++)) >= 55296 && e <= 56319 && a < i ? 56320 == (64512 & (n = t.charCodeAt(a++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e),
                                    a--) : r.push(e);
                            return r
                        }
                        function s(t, e) {
                            if (t >= 55296 && t <= 57343) {
                                if (e)
                                    throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                                return !1
                            }
                            return !0
                        }
                        function l(t, e) {
                            return y(t >> e & 63 | 128)
                        }
                        function c(t, e) {
                            if (0 == (4294967168 & t))
                                return y(t);
                            var n = "";
                            return 0 == (4294965248 & t) ? n = y(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (s(t, e) || (t = 65533),
                                n = y(t >> 12 & 15 | 224),
                                n += l(t, 6)) : 0 == (4292870144 & t) && (n = y(t >> 18 & 7 | 240),
                                    n += l(t, 12),
                                    n += l(t, 6)),
                                n + y(63 & t | 128)
                        }
                        function d() {
                            if (f >= g)
                                throw Error("Invalid byte index");
                            var t = 255 & h[f];
                            if (f++,
                                128 == (192 & t))
                                return 63 & t;
                            throw Error("Invalid continuation byte")
                        }
                        function u(t) {
                            var e, n;
                            if (f > g)
                                throw Error("Invalid byte index");
                            if (f == g)
                                return !1;
                            if (e = 255 & h[f],
                                f++,
                                0 == (128 & e))
                                return e;
                            if (192 == (224 & e)) {
                                if ((n = (31 & e) << 6 | d()) >= 128)
                                    return n;
                                throw Error("Invalid continuation byte")
                            }
                            if (224 == (240 & e)) {
                                if ((n = (15 & e) << 12 | d() << 6 | d()) >= 2048)
                                    return s(n, t) ? n : 65533;
                                throw Error("Invalid continuation byte")
                            }
                            if (240 == (248 & e) && ((n = (7 & e) << 18 | d() << 12 | d() << 6 | d()) >= 65536 && n <= 1114111))
                                return n;
                            throw Error("Invalid UTF-8 detected")
                        }
                        var p = ("object" == typeof t && t && t.exports,
                            "object" == typeof a && a);
                        p.global !== p && p.window;
                        var h, g, f, y = String.fromCharCode, m = {
                            version: "2.1.2",
                            encode: function (t, e) {
                                for (var n = !1 !== (e = e || {}).strict, r = o(t), a = r.length, i = -1, s = ""; ++i < a;)
                                    s += c(r[i], n);
                                return s
                            },
                            decode: function (t, e) {
                                var n = !1 !== (e = e || {}).strict;
                                h = o(t),
                                    g = h.length,
                                    f = 0;
                                for (var r, a = []; !1 !== (r = u(n));)
                                    a.push(r);
                                return function (t) {
                                    for (var e, n = t.length, r = -1, a = ""; ++r < n;)
                                        (e = t[r]) > 65535 && (a += y((e -= 65536) >>> 10 & 1023 | 55296),
                                            e = 56320 | 1023 & e),
                                            a += y(e);
                                    return a
                                }(a)
                            }
                        };
                        void 0 === (r = function () {
                            return m
                        }
                            .call(e, n, e, t)) || (t.exports = r)
                    }()
                }
                ).call(e, n(25)(t), function () {
                    return this
                }())
            }
            , function (t, e) {
                t.exports = function (t) {
                    return t.webpackPolyfill || (t.deprecate = function () { }
                        ,
                        t.paths = [],
                        t.children = [],
                        t.webpackPolyfill = 1),
                        t
                }
            }
            , function (t, e) {
                !function () {
                    "use strict";
                    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = new Uint8Array(256), r = 0; r < t.length; r++)
                        n[t.charCodeAt(r)] = r;
                    e.encode = function (e) {
                        var n, r = new Uint8Array(e), a = r.length, i = "";
                        for (n = 0; n < a; n += 3)
                            i += t[r[n] >> 2],
                                i += t[(3 & r[n]) << 4 | r[n + 1] >> 4],
                                i += t[(15 & r[n + 1]) << 2 | r[n + 2] >> 6],
                                i += t[63 & r[n + 2]];
                        return a % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : a % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="),
                            i
                    }
                        ,
                        e.decode = function (t) {
                            var e, r, a, i, o, s = .75 * t.length, l = t.length, c = 0;
                            "=" === t[t.length - 1] && (s--,
                                "=" === t[t.length - 2] && s--);
                            var d = new ArrayBuffer(s)
                                , u = new Uint8Array(d);
                            for (e = 0; e < l; e += 4)
                                r = n[t.charCodeAt(e)],
                                    a = n[t.charCodeAt(e + 1)],
                                    i = n[t.charCodeAt(e + 2)],
                                    o = n[t.charCodeAt(e + 3)],
                                    u[c++] = r << 2 | a >> 4,
                                    u[c++] = (15 & a) << 4 | i >> 2,
                                    u[c++] = (3 & i) << 6 | 63 & o;
                            return d
                        }
                }()
            }
            , function (t, e) {
                (function (e) {
                    function n(t) {
                        for (var e = 0; e < t.length; e++) {
                            var n = t[e];
                            if (n.buffer instanceof ArrayBuffer) {
                                var r = n.buffer;
                                if (n.byteLength !== r.byteLength) {
                                    var a = new Uint8Array(n.byteLength);
                                    a.set(new Uint8Array(r, n.byteOffset, n.byteLength)),
                                        r = a.buffer
                                }
                                t[e] = r
                            }
                        }
                    }
                    function r(t, e) {
                        e = e || {};
                        var r = new i;
                        n(t);
                        for (var a = 0; a < t.length; a++)
                            r.append(t[a]);
                        return e.type ? r.getBlob(e.type) : r.getBlob()
                    }
                    function a(t, e) {
                        return n(t),
                            new Blob(t, e || {})
                    }
                    var i = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder
                        , o = function () {
                            try {
                                return 2 === new Blob(["hi"]).size
                            } catch (t) {
                                return !1
                            }
                        }()
                        , s = o && function () {
                            try {
                                return 2 === new Blob([new Uint8Array([1, 2])]).size
                            } catch (t) {
                                return !1
                            }
                        }()
                        , l = i && i.prototype.append && i.prototype.getBlob;
                    t.exports = o ? s ? e.Blob : a : l ? r : void 0
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) {
                e.encode = function (t) {
                    var e = "";
                    for (var n in t)
                        t.hasOwnProperty(n) && (e.length && (e += "&"),
                            e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                    return e
                }
                    ,
                    e.decode = function (t) {
                        for (var e = {}, n = t.split("&"), r = 0, a = n.length; r < a; r++) {
                            var i = n[r].split("=");
                            e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
                        }
                        return e
                    }
            }
            , function (t, e) {
                t.exports = function (t, e) {
                    var n = function () { };
                    n.prototype = e.prototype,
                        t.prototype = new n,
                        t.prototype.constructor = t
                }
            }
            , function (t, e) {
                "use strict";
                function n(t) {
                    var e = "";
                    do {
                        e = i[t % o] + e,
                            t = Math.floor(t / o)
                    } while (t > 0);
                    return e
                }
                function r() {
                    var t = n(+new Date);
                    return t !== a ? (l = 0,
                        a = t) : t + "." + n(l++)
                }
                for (var a, i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), o = 64, s = {}, l = 0, c = 0; c < o; c++)
                    s[i[c]] = c;
                r.encode = n,
                    r.decode = function (t) {
                        var e = 0;
                        for (c = 0; c < t.length; c++)
                            e = e * o + s[t.charAt(c)];
                        return e
                    }
                    ,
                    t.exports = r
            }
            , function (t, e, n) {
                (function (e) {
                    function r() { }
                    function a(t) {
                        i.call(this, t),
                            this.query = this.query || {},
                            s || (e.___eio || (e.___eio = []),
                                s = e.___eio),
                            this.index = s.length;
                        var n = this;
                        s.push((function (t) {
                            n.onData(t)
                        }
                        )),
                            this.query.j = this.index,
                            e.document && e.addEventListener && e.addEventListener("beforeunload", (function () {
                                n.script && (n.script.onerror = r)
                            }
                            ), !1)
                    }
                    var i = n(18)
                        , o = n(29);
                    t.exports = a;
                    var s, l = /\n/g, c = /\\n/g;
                    o(a, i),
                        a.prototype.supportsBinary = !1,
                        a.prototype.doClose = function () {
                            this.script && (this.script.parentNode.removeChild(this.script),
                                this.script = null),
                                this.form && (this.form.parentNode.removeChild(this.form),
                                    this.form = null,
                                    this.iframe = null),
                                i.prototype.doClose.call(this)
                        }
                        ,
                        a.prototype.doPoll = function () {
                            var t = this
                                , e = document.createElement("script");
                            this.script && (this.script.parentNode.removeChild(this.script),
                                this.script = null),
                                e.async = !0,
                                e.src = this.uri(),
                                e.onerror = function (e) {
                                    t.onError("jsonp poll error", e)
                                }
                                ;
                            var n = document.getElementsByTagName("script")[0];
                            n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e),
                                this.script = e,
                                "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function () {
                                    var t = document.createElement("iframe");
                                    document.body.appendChild(t),
                                        document.body.removeChild(t)
                                }
                                ), 100)
                        }
                        ,
                        a.prototype.doWrite = function (t, e) {
                            function n() {
                                r(),
                                    e()
                            }
                            function r() {
                                if (a.iframe)
                                    try {
                                        a.form.removeChild(a.iframe)
                                    } catch (t) {
                                        a.onError("jsonp polling iframe removal error", t)
                                    }
                                try {
                                    var t = '<iframe src="javascript:0" name="' + a.iframeId + '">';
                                    i = document.createElement(t)
                                } catch (t) {
                                    (i = document.createElement("iframe")).name = a.iframeId,
                                        i.src = "javascript:0"
                                }
                                i.id = a.iframeId,
                                    a.form.appendChild(i),
                                    a.iframe = i
                            }
                            var a = this;
                            if (!this.form) {
                                var i, o = document.createElement("form"), s = document.createElement("textarea"), d = this.iframeId = "eio_iframe_" + this.index;
                                o.className = "socketio",
                                    o.style.position = "absolute",
                                    o.style.top = "-1000px",
                                    o.style.left = "-1000px",
                                    o.target = d,
                                    o.method = "POST",
                                    o.setAttribute("accept-charset", "utf-8"),
                                    s.name = "d",
                                    o.appendChild(s),
                                    document.body.appendChild(o),
                                    this.form = o,
                                    this.area = s
                            }
                            this.form.action = this.uri(),
                                r(),
                                t = t.replace(c, "\\\n"),
                                this.area.value = t.replace(l, "\\n");
                            try {
                                this.form.submit()
                            } catch (t) { }
                            this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                                "complete" === a.iframe.readyState && n()
                            }
                                : this.iframe.onload = n
                        }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e, n) {
                (function (e) {
                    function r(t) {
                        t && t.forceBase64 && (this.supportsBinary = !1),
                            this.perMessageDeflate = t.perMessageDeflate,
                            this.usingBrowserWebSocket = d && !t.forceNode,
                            this.protocols = t.protocols,
                            this.usingBrowserWebSocket || (u = a),
                            i.call(this, t)
                    }
                    var a, i = n(19), o = n(20), s = n(28), l = n(29), c = n(30), d = (n(3)("engine.io-client:websocket"),
                        e.WebSocket || e.MozWebSocket);
                    if ("undefined" == typeof window)
                        try {
                            a = n(33)
                        } catch (t) { }
                    var u = d;
                    u || "undefined" != typeof window || (u = a),
                        t.exports = r,
                        l(r, i),
                        r.prototype.name = "websocket",
                        r.prototype.supportsBinary = !0,
                        r.prototype.doOpen = function () {
                            if (this.check()) {
                                var t = this.uri()
                                    , e = this.protocols
                                    , n = {
                                        agent: this.agent,
                                        perMessageDeflate: this.perMessageDeflate
                                    };
                                n.pfx = this.pfx,
                                    n.key = this.key,
                                    n.passphrase = this.passphrase,
                                    n.cert = this.cert,
                                    n.ca = this.ca,
                                    n.ciphers = this.ciphers,
                                    n.rejectUnauthorized = this.rejectUnauthorized,
                                    this.extraHeaders && (n.headers = this.extraHeaders),
                                    this.localAddress && (n.localAddress = this.localAddress);
                                try {
                                    this.ws = this.usingBrowserWebSocket ? e ? new u(t, e) : new u(t) : new u(t, e, n)
                                } catch (t) {
                                    return this.emit("error", t)
                                }
                                void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                                    this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                                        this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer",
                                    this.addEventListeners()
                            }
                        }
                        ,
                        r.prototype.addEventListeners = function () {
                            var t = this;
                            this.ws.onopen = function () {
                                t.onOpen()
                            }
                                ,
                                this.ws.onclose = function () {
                                    t.onClose()
                                }
                                ,
                                this.ws.onmessage = function (e) {
                                    t.onData(e.data)
                                }
                                ,
                                this.ws.onerror = function (e) {
                                    t.onError("websocket error", e)
                                }
                        }
                        ,
                        r.prototype.write = function (t) {
                            var n = this;
                            this.writable = !1;
                            for (var r = t.length, a = 0, i = r; a < i; a++)
                                !function (t) {
                                    o.encodePacket(t, n.supportsBinary, (function (a) {
                                        if (!n.usingBrowserWebSocket) {
                                            var i = {};
                                            if (t.options && (i.compress = t.options.compress),
                                                n.perMessageDeflate)
                                                ("string" == typeof a ? e.Buffer.byteLength(a) : a.length) < n.perMessageDeflate.threshold && (i.compress = !1)
                                        }
                                        try {
                                            n.usingBrowserWebSocket ? n.ws.send(a) : n.ws.send(a, i)
                                        } catch (t) { }
                                        --r || (n.emit("flush"),
                                            setTimeout((function () {
                                                n.writable = !0,
                                                    n.emit("drain")
                                            }
                                            ), 0))
                                    }
                                    ))
                                }(t[a])
                        }
                        ,
                        r.prototype.onClose = function () {
                            i.prototype.onClose.call(this)
                        }
                        ,
                        r.prototype.doClose = function () {
                            void 0 !== this.ws && this.ws.close()
                        }
                        ,
                        r.prototype.uri = function () {
                            var t = this.query || {}
                                , e = this.secure ? "wss" : "ws"
                                , n = "";
                            return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port),
                                this.timestampRequests && (t[this.timestampParam] = c()),
                                this.supportsBinary || (t.b64 = 1),
                                (t = s.encode(t)).length && (t = "?" + t),
                                e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
                        }
                        ,
                        r.prototype.check = function () {
                            return !(!u || "__initialize" in u && this.name === r.prototype.name)
                        }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e) { }
            , function (t, e) {
                var n = [].indexOf;
                t.exports = function (t, e) {
                    if (n)
                        return t.indexOf(e);
                    for (var r = 0; r < t.length; ++r)
                        if (t[r] === e)
                            return r;
                    return -1
                }
            }
            , function (t, e) {
                (function (e) {
                    var n = /^[\],:{}\s]*$/
                        , r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g
                        , a = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
                        , i = /(?:^|:|,)(?:\s*\[)+/g
                        , o = /^\s+/
                        , s = /\s+$/;
                    t.exports = function (t) {
                        return "string" == typeof t && t ? (t = t.replace(o, "").replace(s, ""),
                            e.JSON && JSON.parse ? JSON.parse(t) : n.test(t.replace(r, "@").replace(a, "]").replace(i, "")) ? new Function("return " + t)() : void 0) : null
                    }
                }
                ).call(e, function () {
                    return this
                }())
            }
            , function (t, e, n) {
                "use strict";
                function r(t, e, n) {
                    this.io = t,
                        this.nsp = e,
                        this.json = this,
                        this.ids = 0,
                        this.acks = {},
                        this.receiveBuffer = [],
                        this.sendBuffer = [],
                        this.connected = !1,
                        this.disconnected = !0,
                        n && n.query && (this.query = n.query),
                        this.io.autoConnect && this.open()
                }
                var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                }
                    : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }
                    , i = n(4)
                    , o = n(5)
                    , s = n(37)
                    , l = n(38)
                    , c = n(39)
                    , d = (n(3)("socket.io-client:socket"),
                        n(28));
                t.exports = r;
                var u = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    connecting: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1,
                    ping: 1,
                    pong: 1
                }
                    , p = o.prototype.emit;
                o(r.prototype),
                    r.prototype.subEvents = function () {
                        if (!this.subs) {
                            var t = this.io;
                            this.subs = [l(t, "open", c(this, "onopen")), l(t, "packet", c(this, "onpacket")), l(t, "close", c(this, "onclose"))]
                        }
                    }
                    ,
                    r.prototype.open = r.prototype.connect = function () {
                        return this.connected || (this.subEvents(),
                            this.io.open(),
                            "open" === this.io.readyState && this.onopen(),
                            this.emit("connecting")),
                            this
                    }
                    ,
                    r.prototype.send = function () {
                        var t = s(arguments);
                        return t.unshift("message"),
                            this.emit.apply(this, t),
                            this
                    }
                    ,
                    r.prototype.emit = function (t) {
                        if (u.hasOwnProperty(t))
                            return p.apply(this, arguments),
                                this;
                        var e = s(arguments)
                            , n = {
                                type: i.EVENT,
                                data: e,
                                options: {}
                            };
                        return n.options.compress = !this.flags || !1 !== this.flags.compress,
                            "function" == typeof e[e.length - 1] && (this.acks[this.ids] = e.pop(),
                                n.id = this.ids++),
                            this.connected ? this.packet(n) : this.sendBuffer.push(n),
                            delete this.flags,
                            this
                    }
                    ,
                    r.prototype.packet = function (t) {
                        t.nsp = this.nsp,
                            this.io.packet(t)
                    }
                    ,
                    r.prototype.onopen = function () {
                        if ("/" !== this.nsp)
                            if (this.query) {
                                var t = "object" === a(this.query) ? d.encode(this.query) : this.query;
                                this.packet({
                                    type: i.CONNECT,
                                    query: t
                                })
                            } else
                                this.packet({
                                    type: i.CONNECT
                                })
                    }
                    ,
                    r.prototype.onclose = function (t) {
                        this.connected = !1,
                            this.disconnected = !0,
                            delete this.id,
                            this.emit("disconnect", t)
                    }
                    ,
                    r.prototype.onpacket = function (t) {
                        if (t.nsp === this.nsp)
                            switch (t.type) {
                                case i.CONNECT:
                                    this.onconnect();
                                    break;
                                case i.EVENT:
                                case i.BINARY_EVENT:
                                    this.onevent(t);
                                    break;
                                case i.ACK:
                                case i.BINARY_ACK:
                                    this.onack(t);
                                    break;
                                case i.DISCONNECT:
                                    this.ondisconnect();
                                    break;
                                case i.ERROR:
                                    this.emit("error", t.data)
                            }
                    }
                    ,
                    r.prototype.onevent = function (t) {
                        var e = t.data || [];
                        null != t.id && e.push(this.ack(t.id)),
                            this.connected ? p.apply(this, e) : this.receiveBuffer.push(e)
                    }
                    ,
                    r.prototype.ack = function (t) {
                        var e = this
                            , n = !1;
                        return function () {
                            if (!n) {
                                n = !0;
                                var r = s(arguments);
                                e.packet({
                                    type: i.ACK,
                                    id: t,
                                    data: r
                                })
                            }
                        }
                    }
                    ,
                    r.prototype.onack = function (t) {
                        var e = this.acks[t.id];
                        "function" == typeof e && (e.apply(this, t.data),
                            delete this.acks[t.id])
                    }
                    ,
                    r.prototype.onconnect = function () {
                        this.connected = !0,
                            this.disconnected = !1,
                            this.emit("connect"),
                            this.emitBuffered()
                    }
                    ,
                    r.prototype.emitBuffered = function () {
                        var t;
                        for (t = 0; t < this.receiveBuffer.length; t++)
                            p.apply(this, this.receiveBuffer[t]);
                        for (this.receiveBuffer = [],
                            t = 0; t < this.sendBuffer.length; t++)
                            this.packet(this.sendBuffer[t]);
                        this.sendBuffer = []
                    }
                    ,
                    r.prototype.ondisconnect = function () {
                        this.destroy(),
                            this.onclose("io server disconnect")
                    }
                    ,
                    r.prototype.destroy = function () {
                        if (this.subs) {
                            for (var t = 0; t < this.subs.length; t++)
                                this.subs[t].destroy();
                            this.subs = null
                        }
                        this.io.destroy(this)
                    }
                    ,
                    r.prototype.close = r.prototype.disconnect = function () {
                        return this.connected && this.packet({
                            type: i.DISCONNECT
                        }),
                            this.destroy(),
                            this.connected && this.onclose("io client disconnect"),
                            this
                    }
                    ,
                    r.prototype.compress = function (t) {
                        return this.flags = this.flags || {},
                            this.flags.compress = t,
                            this
                    }
            }
            , function (t, e) {
                t.exports = function (t, e) {
                    for (var n = [], r = (e = e || 0) || 0; r < t.length; r++)
                        n[r - e] = t[r];
                    return n
                }
            }
            , function (t, e) {
                "use strict";
                t.exports = function (t, e, n) {
                    return t.on(e, n),
                    {
                        destroy: function () {
                            t.removeListener(e, n)
                        }
                    }
                }
            }
            , function (t, e) {
                var n = [].slice;
                t.exports = function (t, e) {
                    if ("string" == typeof e && (e = t[e]),
                        "function" != typeof e)
                        throw new Error("bind() requires a function");
                    var r = n.call(arguments, 2);
                    return function () {
                        return e.apply(t, r.concat(n.call(arguments)))
                    }
                }
            }
            , function (t, e) {
                function n(t) {
                    t = t || {},
                        this.ms = t.min || 100,
                        this.max = t.max || 1e4,
                        this.factor = t.factor || 2,
                        this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0,
                        this.attempts = 0
                }
                t.exports = n,
                    n.prototype.duration = function () {
                        var t = this.ms * Math.pow(this.factor, this.attempts++);
                        if (this.jitter) {
                            var e = Math.random()
                                , n = Math.floor(e * this.jitter * t);
                            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
                        }
                        return 0 | Math.min(t, this.max)
                    }
                    ,
                    n.prototype.reset = function () {
                        this.attempts = 0
                    }
                    ,
                    n.prototype.setMin = function (t) {
                        this.ms = t
                    }
                    ,
                    n.prototype.setMax = function (t) {
                        this.max = t
                    }
                    ,
                    n.prototype.setJitter = function (t) {
                        this.jitter = t
                    }
            }
        ])
    }
    ));

function ready() {
    getQuotesSocket();
}
window.addEventListener("DOMContentLoaded", ready)

function getQuotesSocket() {
    (socket = io.connect("https://qrtm1.ifxdb.com:8443")).on("connect", (function () {
        socket.emit("subscribe", ['XAUUSD'], 'standard')
    }
    )),
        socket.on("quotes", (function (t) {
            changePageTitle(t)
        }
        ))
}

function changePageTitle(t) {
    console.log(t)
    document.title = t.msg.bid;
}