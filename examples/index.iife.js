/*
 * @Author: xiajitao xiajitao@genew.com
 * @Date: 2023-01-10 20:37:40
 * @LastEditors: xiajitao xiajitao@genew.com
 * @LastEditTime: 2023-01-10 20:37:41
 * @FilePath: falsehtml-encryptfalseexamplesfalseindex.iife.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var HtmlEncrypt = (function () {
  'use strict';
  function e(e, n, o, t) {
    return new (o || (o = Promise))(function (i, d) {
      function c(e) {
        try {
          a(t.next(e));
        } catch (e) {
          d(e);
        }
      }
      function l(e) {
        try {
          a(t.throw(e));
        } catch (e) {
          d(e);
        }
      }
      function a(e) {
        var n;
        e.done
          ? i(e.value)
          : ((n = e.value),
            n instanceof o
              ? n
              : new o(function (e) {
                  e(n);
                })).then(c, l);
      }
      a((t = t.apply(e, n || [])).next());
    });
  }
  return class {
    constructor({ publicUrl: e = './', homePage: n = 'index.html', disabledSave: o = !0, disabledConsole: t = !0 }) {
      (this.publicUrl = e),
        (this.homePage = n),
        o && this.disabledSave(),
        t && this.disabledConsole(),
        this.packingHtml();
    }
    packingHtml() {
      return e(this, void 0, void 0, function* () {
        const e = this.publicUrl + this.homePage;
        window.onload = () => {
          fetch(e, { cache: 'no-cache' })
            .then(e => e.text())
            .then(e => this.createFrame(e));
        };
      });
    }
    createFrame(e) {
      var n, o, t, i, d, c;
      document.body.style.cssText = 'margin:0;padding:0;';
      const l = document.createElement('iframe');
      l.style.cssText = 'width: 100%; height: calc(100vh - 4px); overflow: hidden; border:none;';
      const a = e.replace(/<head>/g, `<head><base href="${window.location.origin}/dist/" />`);
      document.body.appendChild(l),
        null === (o = null === (n = l.contentWindow) || void 0 === n ? void 0 : n.document) || void 0 === o || o.open(),
        null === (i = null === (t = l.contentWindow) || void 0 === t ? void 0 : t.document) ||
          void 0 === i ||
          i.write(a),
        null === (c = null === (d = l.contentWindow) || void 0 === d ? void 0 : d.document) ||
          void 0 === c ||
          c.close();
    }
    disabledSave() {
      document.onkeydown = function () {
        var e = window.event || arguments[0];
        return (
          123 != e.keyCode &&
          (!e.ctrlKey || !e.shiftKey || 73 != e.keyCode) &&
          (!e.ctrlKey || 85 != e.keyCode) &&
          (!e.ctrlKey || 83 != e.keyCode) &&
          void 0
        );
      };
    }
    disabledConsole() {
      window.onresize = function () {
        window.outerHeight - window.innerHeight > 200 && window.close();
      };
    }
  };
})();
