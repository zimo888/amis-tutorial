
import * as React from 'react';
import AmisRender from '../../AmisRender'
import {addRule} from 'amis';

/**
Amis 源码：
export function addRule(
  ruleName: string,
  fn: ValidateFn,
  message: string = ''
) {
  validations[ruleName] = fn;
  validateMessages[ruleName] = message;
}
 */
addRule("isCustomizeRules",(values)=>{
    //这里写自定义校验规则
    if(values.name === ''){
        return false;
    }
    return true;
    
},"这不是我要的类型")
/**
 * 工具方法
 * addRules
 */
export default class AddRules extends React.Component{
    schema = {
        "type": "page",
        "body": [
            "文件路径 /pages/demos/amisUtils/addRules",
            {
          "type": "form",
          "api": "",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label": "通信源",
              "validations": {
                "isCustomizeRules": true //使用自定义规则
              },
            },
            {
                "type": "text",
                "name": "age",
                "label": "第二个"
              }
          ]
        }
        ]
      }
    render(){
        return <AmisRender schema={this.schema}/>
    }
}