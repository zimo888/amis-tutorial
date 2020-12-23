
import * as React from 'react';
import AmisRender from '../AmisRender'
/**
 * https://baidu.gitee.io/amis/docs/components/form/index
 * 可以粘贴文档里的任意JSON进行查看。
 */
export default class HelloWorld extends React.Component{
    schema = {
        "type": "page",
        "body": [
          "文件路径 /pages/demos/Helloworld.tsx",
          {
          "type": "form",
          "api": "https://houtai.baidu.com/api/mock2/form/saveForm",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label": "姓名："
            },
            {
              "name": "email",
              "type": "email",
              "label": "邮箱："
            }
          ]
        }]
      }
    render(){
        return <AmisRender schema={this.schema}/>
    }
}