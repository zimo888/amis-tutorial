import * as React from 'react'
import { Renderer, ScopedContext } from 'amis'
import {IScopedContext} from 'amis/lib/Scoped';
import { RendererProps } from 'amis/lib/factory'
import { Table, Space } from 'antd';

/**
 * 表单字段类和非表单类的区别是，表单字段类组件有value ,onChange 属性，放在form的controls属性下面。
 * 这里用Antd 的表格自定义
 */
@Renderer({
  name: 'Normal',
  test: /(?:^|\/)normal$/i,
})
class Normal extends React.Component<RendererProps> {
  static contextType = ScopedContext
  state = {
      receiveValue:""
  }
  //组件通信使用scope，可以通过getComponentByName进行通信
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
   * Amis组件会调用组件的receive方法
   * @param {*} values
   * @param {*} name
   */
  receive(values: any, name: any) {
      //可以暴露onReceive回调
    const { onReceive } = this.props
     this.setState({
            receiveValue:values.name
        })
    
    onReceive &&
    onReceive({
        name,
        values,
      })
  }

  render() {
      //JSON会传入tableData
    const {tableData} = this.props;
    return <>
            <div>自定义组件接收组件值：{this.state.receiveValue}</div>
            <Table columns={columns} dataSource={tableData} />
            </>
    }
}

export default Normal


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  