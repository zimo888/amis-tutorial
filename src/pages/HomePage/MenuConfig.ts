
import Helloworld from '../demos/Helloworld'
import Communication from '../demos/communication/target-name'
import Bridge from '../demos/communication/bridge'
import NormalRender from '../demos/customization/NormalRender'
import FormItemRender from '../demos/customization/FormItemRender'
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
        name: '自定义组件',
        path: namespace + '/customize',
        icon: '',
        children:[
            {
                name: '非表单',
                path: namespace + '/customize/normal',
                icon: '',
                component: NormalRender
            },{
                name: '表单项',
                path: namespace + '/customize/formItem',
                icon: '',
                component: FormItemRender
            },
        ]
    }
]
