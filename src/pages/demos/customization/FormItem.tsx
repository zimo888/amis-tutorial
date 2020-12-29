import React from 'react'
import { FormItem, ScopedContext } from 'amis'
import { Input } from 'antd';
import { FormControlProps } from "amis/lib/renderers/Form/Item";
const { TextArea } = Input;
/**
 * 
 * 这里用Antd 的表单项
 */
@FormItem({
  type: 'antdTextarea',//注意这里，和Render的区别是这里写type，而不是name
 
})
class Normal extends React.Component<FormControlProps> {
  static contextType = ScopedContext

  onChange = (e) => {
      const {onChange} = this.props;
      onChange(e.target.value   )
  };
  render() {
      const {value} = this.props;
    return   <TextArea placeholder="Antd 的文本域" value={value} allowClear onChange={this.onChange } />
  }
}

export default Normal

