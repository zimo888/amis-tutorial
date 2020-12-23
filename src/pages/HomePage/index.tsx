import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { mapTree } from 'amis/lib/utils/helper';
import ProLayout from '@ant-design/pro-layout';
import { naviagtions } from './MenuConfig'
import 'antd/dist/antd.css'
import {Container} from './antdStyle'
interface Props {
  [key: string]: any;
}

interface StateProps {
  currentLocale: string,
  keyWord?: string,
  openKeys?: Array<string>,
  isMenuOpen: boolean,
  navigations: Array<any>
}

@withRouter
export default class HomePage extends React.Component<Props, StateProps> {
  state: { 
      currentLocale: string; 
      isMenuOpen: boolean; 
      navigations: { name: string; path: string; icon: string; component?: any;children?:Array<any> }[]; };
  constructor(props) {
    super(props);

    this.state = {
      currentLocale: 'zh-CN',
      isMenuOpen: false,
      navigations: naviagtions,
    };
  }

  navigations2route = () => {
    let routes: Array<JSX.Element> = [];

    this.state.navigations.forEach(root => {
        if (root.path) {
            let item = root;
            routes.push(
                <Route
                    key={routes.length + 1}
                    path={item.path}
                    component={item.component}
                    exact
                />
            )
        }
        root.children && mapTree(root.children, (item: any) => {
            if (item.path && item.component) {
                routes.push(
                    <Route
                        key={routes.length + 1}
                        path={item.path}
                        component={item.component}
                        exact
                    />
                )
            } else if (item.path && item.getComponent) {
                routes.push(
                    <Route
                        key={routes.length + 1}
                        path={item.path}
                        getComponent={item.getComponent}
                        exact
                    />
                )
            }
        });
    });

    return routes;
}



  render() {
    return (
        <Container
          id="test"
        >
          <ProLayout
            navTheme="light"
            siderWidth={248}
            title={"Amis 样例"}
            logo={null}
            menu={{ defaultOpenAll: true }}
            menuDataRender={()=>this.state.navigations}
            menuItemRender={(item, dom) => (
              <div>
                 <Link to={item.path?item.path:'/'}>
                  {item.name}
                </Link>
              </div>
            )}
            menuHeaderRender={(logo,title)=>{
            return <div className="title">{title}</div>
            }}
            subMenuItemRender={(item, dom) => (
              <div>
                {item.name}
              </div>
            )}
          >
            <div className="rightContainer">
              {this.navigations2route()}
            </div>
          </ProLayout>
        </Container>
    )
  }
}
