# StationEncrypt

> 一个防止静态网页被审查和保存的插件,增加一些门槛而已，没办法完全阻挡;


# 开发原因

偶尔接点切图仔的私活（交付快，无后期维护）补贴家用，写完一个网站的静态网页后，需要放到线上给客户看界面效果，会遇到一些想白嫖苦逼切图仔劳动力的不良客户，所以写个工具阻止个人辛苦劳动成果打水漂；

# 特性

 ✅ 阻止控制台审查元素，关闭控制台即可正常展示页面；
  
 ✅ 阻止ctrl+s保存网页/阻止普通爬站工具爬取网页；

# 在线演示

[演示地址](https://laoxia7751.github.io/station-encrypt)


# 快速使用

1. 下载插件

[下载地址](https://unpkg.com/html-encrypt@0.0.1/dist/html-encrypt.js)

2. 初始化

在站点根目录下，新建一个index.html，将静态网页放在另一个目录下（放在一起也可以，搞个文件夹方便交付）

```js
// 目录结构
|-index.html          
|-/dist/ 
|-/dist/assets/        
|-/dist/home.html
|-/dist/details.html
```

在index.html中初始化插件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>使用示例</title>
  </head>
  <body>
        <!-- 下载的文件地址 -->
        <script src="./html-encrypt.js"></script>
        <!-- 也可以通过cdn方式引入使用，插件未加载成功的话，页面不会渲染👇 -->
        <!-- <script src="https://unpkg.com/html-encrypt@0.0.1/dist/html-encrypt.iife.js"></script> -->
        <script>
          new HtmlEncrypt({
              // 真实静态页面根目录
              publicUrl: '/dist/',
              // 首页文件名称
              homePage: 'home.html',
              // 是否禁止保存（default:true）
              disabledSave: true,
              // 是否禁止审查元素（default:true）
              disabledConsole: true,
          });
        </script>
  </body>
</html>

```

  