import * as React from 'react';
import {
    render as renderSchema
} from 'amis';
import '../scss/default.scss'
export default class AmisRenderer extends React.Component {
    env: any = null;

    props: { schema: any; };

    constructor(props) {
        super(props);
        this.env = {
            session: 'global',
            updateLocation: props.updateLocation || ((location: string, replace: boolean) => {
               
            }),
            isCancel:false,
            jumpTo: props.jumpTo || ((to: string, action?: any) => {
            }),
            fetcher:(api)=>{
               return new Promise((resolve,reject)=>{
                   console.log('api==',api)
                    resolve(api)
                })
            }
        };
    }

    render() {
        const {
            schema
        } = this.props;
        return (
            <>
                {
                    renderSchema(schema, {
                        theme:'default',
                    }, this.env)
                }
            </>
        )
    }
}