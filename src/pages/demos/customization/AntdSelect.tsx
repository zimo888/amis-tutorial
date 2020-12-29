import React from 'react'
import { FormItem, ScopedContext } from 'amis'
import { Select } from 'antd';
import { FormControlProps } from "amis/lib/renderers/Form/Item";
const { Option } = Select;
/**
 * 
 * 这里用Antd 的表单项
 */
@FormItem({
  type: 'antdSelect',//注意这里，和Render的区别是这里写type，而不是name
 
})
class AntdSelect extends React.Component<FormControlProps> {
  static contextType = ScopedContext

  onChange = (e) => {
      const {onChange} = this.props;
      onChange(e.target.value   )
  };
  render() {
    return ( 
    <> 
     <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option) =>
             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
    >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
    </Select>
     </>
    )
  }
}

export default AntdSelect

