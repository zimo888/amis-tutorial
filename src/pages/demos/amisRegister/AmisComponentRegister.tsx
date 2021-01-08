
import * as React from 'react';

import { Schema} from 'amis/lib/types';
import {render as AmisRender} from 'amis';
import { registerRenderer, RendererProps, unRegisterRenderer } from 'amis/lib/factory'
import styled, { CSSObject } from 'styled-components';
import { FormControlProps, registerFormItem } from 'amis/lib/renderers/Form/Item';


interface  ComponentSetting{
    view: Schema,
    controller?:{
        [propName: string]: any;
    },
    styles?:CSSObject,

}

/**
 *  使用Amis JSON来构建View
 *  使用Controller 编写控制器
 *  可以通过网络传输自定义组件定义，运行时进行动态注册。
 */
class AmisComponentRegister{

    private static instance:AmisComponentRegister;
    private constructor() {}
    static getInstance() {
        if (!this.instance) {
          this.instance = new AmisComponentRegister();
        }
        return this.instance;
    }

    unregisterComponent(name:string){
        unRegisterRenderer(name);
    }
    /**
     * 组件注册
     * @param name 组件名称
     * @param isForm  是否是表单
     * @param component  组件设置
     */
    registerComponent(name:string,component:ComponentSetting,isForm:boolean=false){
        let view:Schema = component.view;
        if(component.controller){
            view = this.convertStringToFunc(view,component.controller);
        }
        const Container =component.styles?styled.div`` : styled.div`${component.styles}`
        
        if(!isForm){
            class HOCComponent extends React.Component<RendererProps>{
                render(){
                    return <Container>{AmisRender(view)}</Container>
                }
            }
            //注册成普通组件
            registerRenderer({
                name: name,
                //  /(?:^|\/)name$/i  ，普通正则换成RegExp规则：去掉两头的 /, \变成\\
                test:new RegExp(`(?:^|\\/)${name}$`, 'i'),
                component:HOCComponent
            });
        }else{
            //注册成FormItem
            class HOCComponent extends React.Component<FormControlProps>{
                render(){
                    return <Container>{AmisRender(view)}</Container>
                }
            }
            registerFormItem({
                type: name,
                component:HOCComponent
            });
        }
    }
    /**
     * 替换字符串为controller函数
     * @param obj  schema
     * @param controller  controller对象
     */
    convertStringToFunc(obj,controller) {
        obj = {...obj};
        Object.keys(obj).forEach((key) => {
            if (key.startsWith('on')) {//key里面有on的,替换controller
                if(typeof obj[key] === 'string' &&  obj[key].indexOf('controller.') > -1){
                    //controller.getName 取getName
                    let eventName = obj[key].split('.');
                    if(controller.hasOwnProperty(eventName[1])){
                        obj[key] = controller[eventName[1]];
                    }
                }
            } else if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
                obj[key] = this.convertStringToFunc(obj[key], controller);
            } else if(Array.isArray(obj[key])){
                obj[key] = obj[key].map((children)=>{
                    return this.convertStringToFunc(children, controller);
                })
            }
        });
        return obj;
    }
}


export default AmisComponentRegister;