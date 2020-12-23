# Amis 组件库使用技巧

总结了 Amis一些使用技巧，帮助初学者入门

当前版本 Amis 1.0.19

整理的内容包括：

1. HelloWorld (基于 Create React App)
2. Amis 基本使用
3. Amis 组件通信

    target-Name 方式

    桥接方式

4. Amis 自定义组件

    FormItem 类

    非Form类

## JSSDK自定义组件方式

   写在这里，不在项目里写了

   1.引入注册类

   2.使用React包其他技术栈的组件

```js
   var amisEmbed = amisRequire('amis/embed');
   var amisFunc = amisRequire('amis');
    //声明自定义组件,不能写JSX，只能以React.createElement的方式
    为了写起来方便，可以在babel-repl 网站上转换 https://www.babeljs.cn/repl
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

   amisEmbed.embed('#root',{} //AmisJSONSchema, {}, {}//amisEnv);      


```

5. Amis 其他

    国际化方案

    主题方案

6. Amis 结合Antd

7. Amis工具方法使用

   addRules 自定义校验规则

   registerIcon 自定义图标(按钮暂时不能用)

8. 增加开发时跨域请求接口配置 (config-overrides.js)
    
demo预览：

yarn && yarn start
