import React from 'react'
import { Renderer, ScopedContext } from 'amis'
import {IScopedContext} from 'amis/lib/Scoped';
import { RendererProps } from 'amis/lib/factory'
import {Icon} from 'amis';

/**
 * 自定义图标组件
 */
 
@Renderer({
  name: "customIcon",
  test: /(?:^|\/)customIcon$/i,
})
class CustomIcon extends React.Component<RendererProps> {
 
  render() {
    const {...rest} = this.props;
    return <Icon {...rest}/>
  }
}

export default CustomIcon
