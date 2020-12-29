
import * as React from 'react';
import AmisRender from '../../AmisRender'
import {localeTools} from '../../../i18n'
localeTools.setLang('en-UK');
export default class LocalePage extends React.Component{
    state = {
        currentLocale:"en-UK"
    }
    schema = {
        "type": "page",
        "body": {
          "type": "form",
          "api": "",
          "controls": [
            {
              "type": "text",
              "name": "name",
              "label":localeTools.get('label.user.name')
            },
            {
              "name": "email",
              "type": "email",
              "label": localeTools.get('label.user.email')
            }
          ]
        }
      }
    render(){
        
        return <AmisRender schema={this.schema}/>
    }
}