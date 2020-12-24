
import * as React from 'react';
import AmisRender from '../../AmisRender'
import './FormItem'
import './AntdSelect'
export default class NormalRender extends React.Component{
    schema = {
        "type": "page",
        "body": [   
        {
          "type": "form",
          "debug":true,
          "title":"Amis组件",
          "name":"form1",
          "target":"normal",
          "api": "https://houtai.baidu.com/api/mock2/form/saveForm",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label": "表单项",
            },{
              "type": "antdTextarea",
              "name": "textarea",
              "label": "antd文本域",
            },
            {
              "type": "antdSelect",
              "name": "select",
              "label": "antd单选",
            }
          ]
        }
        ]
      }
    render(){
        return <AmisRender schema={this.schema}/>
    }
}