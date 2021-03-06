import Vue from 'vue'
import { Button } from 'element-ui'
import { Input } from 'element-ui'
import {Form,FormItem} from 'element-ui'
import {Message} from 'element-ui'
import {Container,Header,Aside,Main,
  Menu,Submenu,MenuItemGroup,MenuItem,
  Breadcrumb,BreadcrumbItem,Card,
  Row,Col,TableColumn,Table,Switch,
  Tooltip,Pagination,Dialog,MessageBox ,
  Tag,Tree,Select,Option,Cascader,Alert,
  Tabs,TabPane
} from "element-ui";



Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)







Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
