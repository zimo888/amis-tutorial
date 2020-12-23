import React from 'react'
import { Renderer, ScopedContext } from 'amis'
import {IScopedContext} from 'amis/lib/Scoped';
import { RendererProps } from 'amis/lib/factory'


/**
 * 桥接模式
 * Amis 组件传递有一定局限性，可以扩展“桥组件”进行更方便的通信
 */
@Renderer({
  isFormItem: false,
  name: 'amisBridge',
  test: /(?:^|\/)amisBridge$/i,
})
class AmisBridge extends React.Component<RendererProps> {
  static contextType = ScopedContext
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const scoped = this.context  as IScopedContext
    scoped.registerComponent(this)
  }

  componentWillUnmount() {
    const scoped = this.context  as IScopedContext
    scoped.unRegisterComponent(this)
  }

  /**
   * 通过scoped.getComponentByName 方式获取到target里面的组件实例
   */
  getComponentsFromTarget() {
    const { target } = this.props
    const scoped = this.context
    const instances: any[] = []
    target.split(',').forEach((name: any) => {
      const component = scoped.getComponentByName(name)
      instances.push(component)
    })
    return instances
  }

  /**
   * 获取到所有的组件
   */
  getComponents() {
    const scoped = this.context
    return scoped.getComponents()
  }
    /**
   * 通过scoped.getComponentByName 方式获取到target里面的组件实例
   */
  getComponentsByName(name:string) {
    const scoped = this.context
    return scoped.getComponentByName(name)
  }

  /**
   * Amis组件会调用组件的receive方法
   * @param {*} values
   * @param {*} name
   */
  receive(values: any, name: any) {
    const { onReceive } = this.props
    onReceive &&
    onReceive({
        name,
        values,
      })
  }

  /**
   * 发送到目标组件的receive
   */
  send(target: any, values: any) {
    const scoped = this.context
    const component = scoped.getComponentByName(target)
    component && component.receive && component.receive(values, target)
  }

  /**
   * 刷新目标组件
   */
  reloadTarget(target: string, data: any) {
    const scoped = this.context;
    scoped.reload(target, data);
  }

  render() {
    const { bridgeRef } = this.props
    bridgeRef && bridgeRef(this)
    return <></>
  }
}

export default AmisBridge
