<!--
 * @Author: Yran
 * @Date: 2021-11-20 15:34:45
 * @LastEditors: Yran
 * @LastEditTime: 2021-12-11 10:47:48
-->
<template>
  <h1>this is a App component</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
</template>

<script>
import { ref, reactive } from "vue";
// import { h } from "vue";
export default {
  name: "Demo",
  beforeCreate() {
    console.log("---beforeCreate");
  },
  props: [msg, value],
  setup(props, context) {
    // console.log("---setup", this); // undefined
    console.log("---setup", props); // proxy{} 代理对象，必须声明props来进行接收,否则传递进来的值会放在$attrs上面
    console.log("---setup", context); // 里面包含attrs、emit以及slots
    let person = reactive({
      name: "yran",
      age: "22",
    });

    // 返回对象
    return { name, age, job, hobby, sayHello, changeInfo, deleteName, addSex };
    // 返回渲染函数
    // return () => {
    //   return h("h1", "测试渲染")
    // }
  },
};
</script>

<style>
</style>