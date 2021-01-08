import * as React from "react";
import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { mapTree } from "amis/lib/utils/helper";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { naviagtions } from "./MenuConfig";
import "antd/dist/antd.css";
import styled from 'styled-components'
interface Props {
  [key: string]: any;
}

interface StateProps {
  currentLocale: string;
  keyWord?: string;
  openKeys?: Array<string>;
  isMenuOpen: boolean;
  navigations: Array<any>;
}

//@ts-ignore
@withRouter
export default class HomePage extends React.Component<Props, StateProps> {
  state: {
    currentLocale: string;
    isMenuOpen: boolean;
    navigations: {
      name: string;
      path: string;
      icon: string;
      component?: any;
      children?: Array<any>;
    }[];
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLocale: "zh-CN",
      isMenuOpen: false,
      navigations: naviagtions,
    };
  }

  navigations2route = () => {
    let routes: Array<JSX.Element> = [];

    this.state.navigations.forEach((root) => {
      if (root.path) {
        let item = root;
        routes.push(
          <Route
            key={routes.length + 1}
            path={item.path}
            component={item.component}
            exact
          />
        );
      }
      root.children &&
        mapTree(root.children, (item: any) => {
          if (item.path && item.component) {
            routes.push(
              <Route
                key={routes.length + 1}
                path={item.path}
                component={item.component}
                exact
              />
            );
          } else if (item.path && item.getComponent) {
            routes.push(
              <Route
                key={routes.length + 1}
                path={item.path}
                getComponent={item.getComponent}
                exact
              />
            );
          }
        });
    });

    return routes;
  };

  navigation2Menu = (rootMenu) => {
    let menus: Array<JSX.Element> = [];
    if (!rootMenu) {
      rootMenu = this.state.navigations;
    }
    rootMenu.forEach((nav) => {
      if (!nav.hideInMenu) {
        if (nav.children && nav.children.length) {
          menus.push(
            <SubMenu key={nav.name} title={nav.name}>
              {nav.children && this.navigation2Menu(nav.children)}
            </SubMenu>
          );
        } else {
          menus.push(
            <MenuItem key={nav.name}>
              <Link to={nav.path ? nav.path : "/home"}>{nav.name}</Link>
            </MenuItem>
          );
        }
      }
    });
    return menus;
  };

  render() {
    return (
      <Container>
          <ProSidebar>
            <Menu iconShape="square">{this.navigation2Menu(null)}</Menu>
          </ProSidebar>
          <main>
            <div className="block">
              {this.navigations2route()}
            </div>
          </main>
      </Container>
    );
  }
}

const Container = styled.div`
  display:flex;
  height:100vh;
  main{
    width: 100%;
  }
`