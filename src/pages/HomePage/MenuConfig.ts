
import Helloworld from '../demos/Helloworld'
import Communication from '../demos/communication/target-name'
import Bridge from '../demos/communication/bridge'
const namespace = "/home";
export const naviagtions = [
    {
        name: 'Helloworld',
        path: namespace + '/helloworld',
        icon: '',
        component: Helloworld
    },
    {
        name: '组件间通信',
        path: namespace + '/communication',
        icon: '',
        children:[
            {
                name: 'Target-Name方式',
                path: namespace + '/communication/normal',
                icon: '',
                component: Communication
            },{
                name: '自定义Bridge组件',
                path: namespace + '/communication/bridge',
                icon: '',
                component: Bridge
            },
        ]
    },
    {
        name: '表单使用',
        path: namespace + '/helloworld',
        icon: '',
        component: Helloworld
    },
    {
        name: '列表使用',
        path: namespace + '/helloworld',
        icon: '',
        component: Helloworld
    }
]
