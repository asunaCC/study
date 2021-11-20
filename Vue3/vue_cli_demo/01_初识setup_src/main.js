/*
 * @Author: Yran
 * @Date: 2021-11-20 15:01:31
 * @LastEditors: Yran
 * @LastEditTime: 2021-11-20 15:23:05
 */
//引入的不再是Vue构造函数，而是createApp这个工厂函数，用于创建应用实例对象
import { createApp } from "vue";
import App from "./App.vue";

// 创建应用实例对象——app（类似于Vue2中的vm，但是app比vm更'轻量'，没有vm那么多的属性和方法）
let app = createApp(App);
// 挂载
app.mount("#app");
// createApp(App).mount("#app");

// setTimeout(() => {
// 取消挂载
//   app.unmount("#app");
// }, 1000);

// const vm = new Vue({
//   render: (h) => h(app),
// });
// vm.$mount("#app");
