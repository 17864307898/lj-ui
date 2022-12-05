// 响应式方式
import Vue from 'vue';
import { deepAssign } from '../utils/deep-assign.js'
import defaultMessages from './lang/zh-CN'

const proto = Vue.prototype;
const { defineReactive } = Vue.util;

defineReactive(proto, '$ljLang', 'zh-CN')
defineReactive(proto, '$ljMessages', {
  'zh-CN': defaultMessages,
});

export default {
  messages() {
    return proto.$ljMessages[proto.$ljLang]
  },

  use(lang, messages) {
    proto.$ljLang = lang;
    this.add({ [lang]: messages })
  },

  add(messages = {}) {
    deepAssign(proto.$ljMessages, messages)
  },
};
