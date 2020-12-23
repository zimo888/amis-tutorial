import * as React from 'react';
import {
    render as renderSchema
} from 'amis';
import 'amis/lib/themes/default.css'

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
            fetcher:()=>{

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