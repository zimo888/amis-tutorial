
import * as React from 'react';
import AmisRender from '../../../AmisRender'
/**
 * 组件通信
 * Target-Name方式
 */
export default class Communication extends React.Component{
    schema = {
        "type": "page",
        "body": [
            "文件路径 /pages/demos/communication/target-name/index.tsx",
            {
          "type": "form",
          "name":"form1",
          "target":"form2,form3",//target 声明接收的组件
          "api": "https://houtai.baidu.com/api/mock2/form/saveForm",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label": "通信源"
            },
            {
                "type": "text",
                "name": "age",
                "label": "第二个"
              }
          ]
        },{
            "type": "form",
            "name":"form2",//组件名称
            "title":"表单2定义了name",
            "controls": [
              "<div>两个$符号可以取所有值 $$</div>",
              {
                "type": "text",
                "name": "name",
                "label": "通信目的"
              }
            ]
          },
          {
            "type": "form",
            "name":"form3",//第二个组件的名称
            "title":"表单1的target,使用逗号分割可以发送到多个组件",
            "controls": [
              {
                "type": "text",
                "name": "name",
                "label": "发送多个表单"
              }
            ]
          }
        ]
      }
    render(){
        return <AmisRender schema={this.schema}/>
    }
}