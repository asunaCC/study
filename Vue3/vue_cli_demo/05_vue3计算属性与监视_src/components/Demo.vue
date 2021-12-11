<!--
 * @Author: Yran
 * @Date: 2021-11-20 15:34:45
 * @LastEditors: Yran
 * @LastEditTime: 2021-12-11 12:03:30
-->
<template>
  <h1>this is a App component</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  {{ person.fullName }}
  <span>当前值为：{{ sum }}</span>
  <button @click="sum++">点我加一</button>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
// import { h } from "vue";
export default {
  name: "Demo",
  beforeCreate() {
    console.log("---beforeCreate");
  },
  props: [msg, value],
  setup(props, context) {
    let person = reactive({
      name: "yran",
      age: "22",
      job: {
        jk: {
          salary: 12,
        },
      },
    });
    let sum = ref(0);
    let msg = ref("ce");
    // 情况一：监视ref声明的单个基本类型响应式数据
    watch(
      sum,
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      },
      {
        immediate: true,
      }
    );
    // 情况二：监视ref声明的多个基本类型响应式数据
    watch(
      [sum, msg],
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      },
      {
        immediate: true,
      }
    );
    // 情况三：监视reactive声明的单个响应式数据,
    // 注意此处无法正确获取都oldVal,
    // 强制开启了深度监视，deep配置无效
    watch(
      person,
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      },
      {
        deep: false,
      }
    );
    // 情况四：监视reactive声明的单个响应式数据中的某个属性,
    // 强制开启了深度监视，deep配置无效
    watch(
      () => person.age,
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      }
    );
    // 情况五：监视reactive声明的单个响应式数据中的某些属性,
    // 强制开启了深度监视，deep配置无效
    watch([() => person.age, () => person.name], (newVal, oldVal) => {
      console.log("newVal:", newVal, "oldVal:", oldVal);
    });
    // 特殊情况：监视reactive声明的单个响应式数据中的某个引用类型属性,
    // 此时deep配置有效
    watch(
      () => person.job,
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      },
      { deep: true }
    );

    // 计算属性简写--没有考虑计算属性被修改的状况
    // person.fullName = computed(() => {
    //   return person.name + "-" + person.age;
    // });

    // 计算属性完整写法--考虑计算属性被修改的状况
    person.fullName = computed({
      get() {
        return person.name + "-" + person.age;
      },
      set(value) {
        const nameArr = value.split("-");
        person.name = nameArr[0];
        person.age = nameArr[1];
      },
    });
    // 返回对象
    return { person };
    // 返回渲染函数
    // return () => {
    //   return h("h1", "测试渲染")
    // }
  },
};
</script>

<style>
</style>