/*
 * @Author: xiajitao xiajitao@genew.com
 * @Date: 2023-01-09 19:04:24
 * @LastEditors: xjt
 * @LastEditTime: 2023-01-15 16:50:20
 * @Description: 一个站点反爬工具
 */

class StationEncrypt {
  publicUrl: string;
  homePage: string;
  constructor({ publicUrl='', homePage = 'index.html', disabledSave = true, disabledConsole = true }) {
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
  async packingHtml() {
    const fetchUrl = this.publicUrl + this.homePage;
    window.onload = () => {
      fetch(fetchUrl, { cache: 'no-cache' })
        .then(res => res.text())
        .then(res => this.createFrame(res));
    };
  }

  /**
   * html包装
   * @param html html模板字符串
   */
  createFrame(html: string) {
    document.body.style.cssText = 'margin:0;padding:0;';
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: calc(100vh - 4px); overflow: hidden; border:none;'; 
    const newHtml = html.replace(/<head>/g, `<head><base href="${window.location.origin}${this.publicUrl}" />`);
    document.body.appendChild(iframe);
    iframe.contentWindow?.document?.open();
    iframe.contentWindow?.document?.write(newHtml);
    iframe.contentWindow?.document?.close();
  }

  /**
   * 禁止ctrl+s保存网页
   */
  disabledSave() {
      document.onkeydown = function () {
        var e = window.event || arguments[0];
        console.log(e)
        if (e.keyCode == 123) {
          return false;
        } else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
          return false;
        } else if (e.ctrlKey && e.keyCode == 85) {
          return false;
        } else if (e.ctrlKey && e.keyCode == 83) {
          return false;
        } else if (e.metaKey && e.keyCode == 83){
          return false;
        }
      };
  }

  /**
   * 禁止审查元素
   */
  disabledConsole() {
    setInterval(() => check(), 1000);
    const check = () => {
      const doCheck = (a: number) => {
        if (('' + a / a)['length'] !== 1 || a % 20 === 0) {
          (function () {})['constructor']('debugger')();
        } else {
          (function () {})['constructor']('debugger')();
        }
        doCheck(++a);
      };
      try {
        doCheck(0);
      } catch (err) {}
    };
    check();
  }
}
export default StationEncrypt;
