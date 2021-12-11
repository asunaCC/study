<!--
 * @Author: Yran
 * @Date: 2021-11-20 15:34:45
 * @LastEditors: Yran
 * @LastEditTime: 2021-11-27 11:40:35
-->
<template>
  <h1>this is a App component</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2 v-show="person.sex">性别：{{ person.sex }}</h2>
  <h2>职业：{{ job.type }}</h2>
  <h2>薪资：{{ job.salary }}</h2>
  <h2>爱好：{{ hobby }}</h2>
  <h2>c：{{ job.a.b.c }}</h2>
  <button @click="sayHello(name, age)">说话</button>
  <button @click="changeInfo">修改人的信息</button>
  <button @click="addSex">添加一个sex属性</button>
  <button @click="deleteName">删除一个name属性</button>
</template>

<script>
import { ref, reactive } from "vue";
// import { h } from "vue";
export default {
  name: "App",
  // vue3向下兼容，可以使用vue2的语法，但不建议混合编写
  // data() {
  //   return {
  //     sex: "男",
  //     a: "100",
  //   };
  // },
  // methods: {
  //   sayWelcom() {
  //     alert(`我叫${this.name}, 我${this.age}岁了,是一个${this.sex}性，你好！`);
  //   },
  //   // vue2中可以读取vue3的内容
  //   getDataFunc() {
  //     console.log(this.sex);
  //     console.log(this.name);
  //     console.log(this.age);
  //     console.log(this.sayHello);
  //     console.log(this.sayWelcom);
  //   },
  // },
  setup() {
    // 此处未考虑响应式问题
    // data
    // let name = "yran";
    // let age = "22";
    // vue2和vue3冲突时以vue3优先
    // let a = "200";
    // 使用ref处理响应式
    let name = ref("yran");
    let age = ref("22");
    // let job = ref({
    //   type: "web工程师",
    //   salary: "2000",
    // });
    // let job = reactive(66) //不能给reactive传递基本类型数据
    let job = reactive({
      type: "web工程师",
      salary: "2000",
      a: { b: { c: 666 } },
    });
    let hobby = reactive(["抽烟", "喝酒", "烫头"]);

    let person = reactive({
      name: "yran",
      age: "22",
      job: {
        type: "web工程师",
        salart: "2000",
      },
      hobby: ["抽烟", "喝酒", "烫头"],
    });

    // methods
    function sayHello() {
      alert(`我叫${name}, 我${age}岁了，你好！`);
    }

    function changeInfo() {
      // name = "AsunaCC";
      // age = "100";
      name.value = "AsunaCC";
      age.value = "100";
      // job.value.type = "前端开发工程师"; // 使用ref
      job.type = "前端开发工程师"; // 使用reactive
      job.a.b.c = 999;
      hobby[0] = "睡觉";
      console.log({ name });
      console.log({ age });
    }

    function addSex() {
      person.sex = "男";
    }

    function deleteName() {
      delete person.name;
    }

    // vue3中读取vue2的内容，无法读取
    // function getDataFunc2() {
    //   console.log(this.sex);
    //   console.log(name);
    //   console.log(age);
    //   console.log(sayHello);
    //   console.log(this.sayWelcom);
    // }
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