import Vue from 'vue';
import 'element-ui/lib/theme-chalk/base.css';

import {
  Form,
  FormItem,
  Select,
  Switch,
  Popover,
  Option,
  Button,
  Tag,
  Link,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Card,
} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Popover);
Vue.use(Option);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Link);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(CheckboxButton);
Vue.use(Card);
Vue.component(CollapseTransition.name, CollapseTransition)
