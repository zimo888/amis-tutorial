import * as React from 'react';
import AmisRender from '../../AmisRender'
import AmisComponentRegister from './AmisComponentRegister'
import {comp} from './ComponentMock'
export default class amisComponentRender extends React.Component{
    state = {
        schema:{
            "type":"page",
            "body":[
                "loading component from server..."
            ]
        }
    }

    componentWillUnmount(){
        AmisComponentRegister.getInstance().unregisterComponent("customComponent");
    }

    componentDidMount(){
        //模拟从服务器端获取到组件
       new Promise(function(resolve, reject){
            setTimeout(function(){
                //从服务器获取组件，注册成Amis组件
                AmisComponentRegister.getInstance().registerComponent("customComponent",comp)
                //从服务器获取布局
                const schema = {
                    "type": "page",
                    "body": [   
                        {
                            "type":"customComponent"
                        }
                    ]
                  }
                resolve(schema);
            }, 2000);
        }).then(schema=>{
            this.setState({
                schema
            })
        });
    }
    
    render(){
        return <AmisRender schema={this.state.schema}/>
    }
}