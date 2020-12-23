
import styled from 'styled-components';
export const Container = styled.div`

.title{
  text-align:center;
}

overflow-x: hidden;
height:100vh;

.ant-layout-sider{
   overflow-y:auto;
   height:100vh;
}

.rightContainer{
   height: calc(100vh - 80px);
   overflow-y:auto;
}

.header-toolbar{
   width:100%;
   padding:10px;
   display:flex;
   align-items:center;
   justify-content:flex-end;
}

.ant-layout-header{
  background:#fff;
  margin-left:1px;
}

.ant-pro-sider-logo img{
  margin-bottom:8px;
}
.ant-pro-sider-logo h1{
  font-size: 14px;
  color: #182437;
  letter-spacing: 0;
  line-height: 22px;
}



a:link, 
a:visited,
.ant-dropdown-menu-item>a:hover, 
.ant-menu-item a,
.ant-dropdown-menu-submenu-title>a:hover{
  color: #182437 !important;
}

.ant-menu-item-group-title{
  font-size: 12px;
  color: #6A7280;
  padding: 8px 0 0 24px;
  margin-top: 10px;
}

.ant-btn>.anticon+span, 
.ant-btn>span+.anticon{
  font-size: 12px;
  color: #444D5C;
}

.ant-menu-inline-collapsed .ant-menu-item-group-title{
  text-align: center;
}

.ant-menu-inline .ant-menu-item:not(:last-child), 
.ant-menu-vertical-left .ant-menu-item:not(:last-child), 
.ant-menu-vertical-right .ant-menu-item:not(:last-child), 
.ant-menu-vertical .ant-menu-item:not(:last-child){
  margin-bottom: 0;
  height:40px
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item:hover,
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
  background-color: #f0f7ff;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item .anticon+span{
  font-size: 12px!important;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected a:link, 
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected a:visited{
  color: #4E80F5;
}

.ant-menu-inline .ant-menu-item-selected:after{
  display: none;
}

.ant-menu-inline .ant-menu-submenu-title,
.ant-menu-sub.ant-menu-inline>.ant-menu-submenu>.ant-menu-submenu-title{
  height: 32px;
  line-height: 32px;
  margin: 0;
}



.ant-layout-header .ant-btn{
  padding: 0 12px 0 14px;
}

.ant-layout-header .ant-btn>.anticon+span{
  margin-left: 6px;
}

.ant-layout-header .ant-btn>.anticon{
  vertical-align: middle;
  margin-top: -3px;
}

.ant-layout-header .ant-avatar{
  border-radius: 4px;
}

.ant-btn:hover{
  border-color: #4E80F5;
}

.ant-btn:hover,
.ant-btn:hover>.anticon+span{
  color: #4E80F5;
}

.user_drop_menu{
  padding: 5px 16px;
}

.user_drop_menu .ant-dropdown-menu-item{
  height: 32px;
}

.user_drop_menu .ant-dropdown-menu-item .anticon{
  display: inline-block;
  margin-right: 10px;
}

.ant-input-affix-wrapper .ant-input{
  border-color: #DADEE6;
}

.ant-input-affix-wrapper .ant-input-suffix{
  left: 10px;
}

.ant-input-affix-wrapper .ant-input:not(:last-child){
  padding-left: 28px;
  padding-right: 0;
}

.search_entity_header{
  text-indent: 20px;
}

`