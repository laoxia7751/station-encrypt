
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/*
 * @Author: xiajitao xiajitao@genew.com
 * @Date: 2023-01-09 19:04:24
 * @LastEditors: xiajitao xiajitao@genew.com
 * @LastEditTime: 2023-01-13 09:37:34
 * @Description: 一个站点反爬工具
 */
class StationEncrypt {
    constructor({ publicUrl = './', homePage = 'index.html', disabledSave = true, disabledConsole = true }) {
        this.publicUrl = publicUrl;
        this.homePage = homePage;
        // 禁止保存
        disabledSave && this.disabledSave();
        // 禁止打开调试器
        disabledConsole && this.disabledConsole();
        // 包装一层静态资源
        this.packingHtml();
    }
    /**
     * 包装代码，通过iframe多封装一层
     */
    packingHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchUrl = this.publicUrl + this.homePage;
            window.onload = () => {
                fetch(fetchUrl, { cache: 'no-cache' })
                    .then(res => res.text())
                    .then(res => this.createFrame(res));
            };
        });
    }
    /**
     * html包装
     * @param html html模板字符串
     */
    createFrame(html) {
        var _a, _b, _c, _d, _e, _f;
        document.body.style.cssText = 'margin:0;padding:0;';
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'width: 100%; height: calc(100vh - 4px); overflow: hidden; border:none;';
        const newHtml = html.replace(/<head>/g, `<head><base href="${window.location.origin}/${this.publicUrl}" />`);
        document.body.appendChild(iframe);
        (_b = (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.open();
        (_d = (_c = iframe.contentWindow) === null || _c === void 0 ? void 0 : _c.document) === null || _d === void 0 ? void 0 : _d.write(newHtml);
        (_f = (_e = iframe.contentWindow) === null || _e === void 0 ? void 0 : _e.document) === null || _f === void 0 ? void 0 : _f.close();
    }
    /**
     * 禁止ctrl+s保存网页
     */
    disabledSave() {
        window.onload = function () {
            document.onkeydown = function () {
                var e = window.event || arguments[0];
                console.log('StationEncrypt ~ disabledSave ~ e', e);
                if (e.keyCode == 123) {
                    return false;
                }
                else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                    return false;
                }
                else if (e.ctrlKey && e.keyCode == 85) {
                    return false;
                }
                else if (e.ctrlKey && e.keyCode == 83) {
                    return false;
                }
            };
        };
    }
    /**
     * 禁止审查元素
     */
    disabledConsole() {
        setInterval(() => check(), 1000);
        const check = () => {
            const doCheck = (a) => {
                if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
                    (function () { })['constructor']('debugger')();
                }
                else {
                    (function () { })['constructor']('debugger')();
                }
                doCheck(++a);
            };
            try {
                doCheck(0);
            }
            catch (err) { }
        };
        check();
    }
}

export { StationEncrypt as default };
//# sourceMappingURL=station-encrypt.esm.js.map
