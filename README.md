# Amis 组件库使用技巧

总结了 Amis一些使用技巧，帮助初学者入门

当前版本 Amis 1.0.19

demo预览：

```
yarn && yarn start
```

整理的内容包括：

## 1. HelloWorld (基于 Create React App)
## 2. Amis 基本使用
## 3. Amis 组件通信

 3.1 target-Name 方式

 3.2 桥接方式(非官方方式)

JSSDK 使用方式会返回scope,并且可以scope.getComponentByName("form1") 方式获取组件实例，

```js

    let scope = amisEmbed.embed('#root',{
       "type":"page",
       "body":[
           {
               "type":"form",
               "name":"form1"
           }
       ]
    },{},{})
    scope.getComponentByName("form1")
```

NPM方式的使用，需要做一个桥来返回实例

原理是制造一个空的自定义组件，负责amis 实例的获取和外部组件通信。

可以根据需要暴露相应的属性、方法对外通信。使用方式可以查看 src/pages/demos/communication/bridge/index.tsx



## 4. Amis 自定义组件

4.1 FormItem类 src/pages/demos/customization/AntdSelect.tsx

4.2 非Form类： src/pages/demos/customization/NormalRender.tsx

4.3 远程获取Amis 组件，运行时注册方案。 src/pages/demos/amisRegister/index.tsx

## JSSDK自定义组件方式

   写在这里，不在项目里写了

   1.引入注册类

   2.使用React包其他技术栈的组件

```js
   var amisEmbed = amisRequire('amis/embed');
   var amisFunc = amisRequire('amis');
    //声明自定义组件,不能写JSX，只能以React.createElement的方式
    //s为了写起来方便，可以在babel-repl 网站上转换 https://www.babeljs.cn/repl
    amis.define("customComponent", function (require, exports, module) {
        const React = amisRequire('react');
        class CustomComponent extends React.Component {
            componentDidMount(){
                //在这个方法里挂载其他技术栈的dom
                //比如：
                $("#custom").append("<div/>")
            }
            render(){
                return React.createElement("div", { id: "custom"}, "自定义");
            }
        }

        module.exports = function(props) {
           return React.createElement(CustomComponent, props);
        }
    }
    }

   //注册自定义组件
   amisFunc.Renderer({
            test: /(^|\/)customComponent$/
        })(customComponent);

   //amis挂载

   amisEmbed.embed('#root',{
       "type":"page",
       "body":[
           {
               "type":"customComponent"
           }
       ]
   }, {}, { fetcher:function()=>{},...}//amisEnv);      


```

## 5. Amis 其他

   
 5.1 国际化方案 src/i18n/amisLocaleRegister.ts
   
     一般公司使用 功能名称.子功能名称.消息名称=消息 方式命名
     
     如: "login.validateAccount.accountError":"account is invalidate";

     
     Amis 使用的是 {"确定":"confirm"} 以中文字符串为key,
     
     目前就一个资源文件，项目和Amis的格式不一致的，需要自定义国际化文本来替换内部的资源串。

 5.2 主题方案  src/scss/default.scss

    Amis使用Sass 作为样式主题，项目开发中需要对Amis默认的样式进行覆盖的，也通用需要Sass进行主题管理，导入amis之后，进行覆盖即可。
    
    实现方式在src/scss 文件夹中，导入自己的default.scss 即可。

 5.3 Amis 结合Antd

    提供了一些Antd 的自定义组件样例。
    
 5.4 增加开发时跨域请求接口配置 (config-overrides.js)

## 6. Amis工具方法使用 src/pages/demos/amisUtils

   addRules 自定义校验规则

   registerIcon 自定义图标(按钮暂时不能用)


