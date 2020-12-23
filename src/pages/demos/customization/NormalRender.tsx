
import * as React from 'react';
import AmisRender from '../../AmisRender'
import './Normal'
export default class NormalRender extends React.Component{
    schema = {
        "type": "page",
        "body": [   
        {
          "type": "form",
          "title":"Amis组件",
          "name":"form1",
          "target":"normal",
          "api": "https://houtai.baidu.com/api/mock2/form/saveForm",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label": "表单项",
            }
          ]
        },
        {
            "type":"Normal",
            "name":"normal",
            "tableData":[
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
              },
              {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
              },
              {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
              },
            ]
            
        }
        ]
      }
    render(){
        return <AmisRender schema={this.schema}/>
    }
}