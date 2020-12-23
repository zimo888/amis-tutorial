
import * as React from 'react';
import AmisRender from '../../../AmisRender'
import './bridge'
/**
 * 组件通信
 * Bridge方式
 * 更灵活的通信方式，
 * 原理是注册一个空组件，该组件能够获取到amis 的context，context是Amis提供的，可以获取到当前JSON上下文中的所有组件实例，
 * 获取到context后，就可以与调用任意组件的实例方法了。
 */
export default class Bridge extends React.Component{
    bridge = null;
    schema = {
        "type": "page",
        "body": [
            "文件路径 /pages/demos/communication/bridge/index.tsx",
        {
            "type": "amisBridge",
            "name":"bridge",
            "bridgeRef":(ref)=>{
                //通过bridgeRef获取到当前JSON Schema的实例
                this.bridge = ref;
            }
        },    
        {
          "type": "form",
          "title":"桥接组件",
          "name":"form1",
          "target":"form2,form3",//target 声明接收的组件
          "api": "https://houtai.baidu.com/api/mock2/form/saveForm",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label": "通信源",
              "onChange":(data)=>{
                  //通过bridge获取表单组件，并设置值。
                  //可以拿到当前JSON里，所有的组件
                  if(!this.bridge){
                    return;
                  }
                  let allComponents = this.bridge.getComponents();
                  console.log('allComponents:',allComponents);
                  let component = this.bridge.getComponentsByName("form1")
                  //Amis 的表单提供了设置值的方法setValues
                  component.setValues({
                      "age":data
                  });
              }
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