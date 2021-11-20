<!--
 * @Author: Yran
 * @Date: 2021-11-20 15:34:45
 * @LastEditors: Yran
 * @LastEditTime: 2021-11-20 16:06:22
-->
<template>
  <h1>this is a App component</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="sayHello(name, age)">说话</button>
</template>

<script>
// import { h } from "vue";
export default {
  name: "App",
  // vue3向下兼容，可以使用vue2的语法，但不建议混合编写
  data() {
    return {
      sex: "男",
      a: "100",
    };
  },
  methods: {
    sayWelcom() {
      alert(`我叫${this.name}, 我${this.age}岁了,是一个${this.sex}性，你好！`);
    },
    // vue2中可以读取vue3的内容
    getDataFunc() {
      console.log(this.sex);
      console.log(this.name);
      console.log(this.age);
      console.log(this.sayHello);
      console.log(this.sayWelcom);
    },
  },
  setup() {
    // 此处未考虑响应式问题
    // data
    let name = "yran";
    let age = "22";
    // vue2和vue3冲突时以vue3优先
    let a = "200";

    // methods
    function sayHello() {
      alert(`我叫${name}, 我${age}岁了，你好！`);
    }

    // vue3中读取vue2的内容，无法读取
    function getDataFunc2() {
      console.log(this.sex);
      console.log(name);
      console.log(age);
      console.log(sayHello);
      console.log(this.sayWelcom);
    }
    // 返回对象
    return { name, age, a, sayHello, getDataFunc2 };
    // 返回渲染函数
    // return () => {
    //   return h("h1", "测试渲染")
    // }
  },
};
</script>

<style>
</style>