<!--
 * @Author: Yran
 * @Date: 2021-11-20 15:34:45
 * @LastEditors: Yran
 * @LastEditTime: 2022-01-10 10:54:34
-->
<template>
  <h1>this is a App component</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
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
  props: {
    msg: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  setup(props, context) {
    class EventEmitter {
      constructor() {
        // 用来存放注册的事件与回调
        this._events = {};
      }
      // 将事件回调函数存储到对应的事件上
      on(eventName, callback) {
        // 如果绑定的事件不是newListener 就触发该回调
        if (this._events[eventName]) {
          if (this.eventName !== "newListener") {
            this.emit("newListener", eventName);
          }
        }
        // 由于一个事件可能注册多个回调函数，所以使用数组来存储事件队列
        const callbacks = this._events[eventName] || [];
        callbacks.push(callback);
        this._events[eventName] = callbacks;
      }
      // 获取到事件对应的回调函数依次执行
      emit(eventName, ...args) {
        // args 用于收集发布事件时传递的参数
        const callbacks = this._events[eventName] || [];
        callbacks.forEach((func) => func(...args));
      }
      // 找到事件对应的回调函数，删除对应的回调函数
      off(eventName, callback) {
        const callbacks = this._events[eventName] || [];
        const newCallbacks = callbacks.filter(
          (func) => func != callback && func.initialCallback != callback
        );
        this._events[eventName] = newCallbacks;
      }
      // 1.先注册 2.事件执行后取消订阅
      once(eventName, callback) {
        // 由于需要在回调函数执行后，取消订阅当前事件，所以需要对传入的回调函数做一层包装,然后绑定包装后的函数
        const one = (...args) => {
          // 执行回调函数
          callback(...args);
          // 取消订阅当前事件
          this.off(eventName, one);
        };

        // 由于：我们订阅事件的时候，修改了原回调函数的引用，所以，用户触发 off 的时候不能找到对应的回调函数
        // 所以，我们需要在当前函数与用户传入的回调函数做一个绑定，我们通过自定义属性来实现
        one.initialCallback = callback;
        this.on(eventName, one);
      }
    }
    const events = new EventEmitter();

    events.on("newListener", function (eventName) {
      console.log(`eventName`, eventName);
    }); // 注册newListener事件

    events.on("hello", function () {
      console.log("hello");
    }); // 注册hello事件

    let cb = function () {
      console.log("cb");
    };
    events.on("hello", cb); // 绑定hello事件回调添加cb eventName hello

    events.off("hello", cb); // 删除hello事件对应的回调cb

    function once() {
      console.log("once");
    }
    events.once("hello", once); // 执行一次hello事件（会执行一次newListener事件）并添加once回调 eventName hello

    events.off("hello", once); // 删除hello事件的once回调
    events.emit("hello"); // hello 触发hello事件，执行hello事件上绑定的所有回调
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
    let msgs = ref("ce");
    // 情况一：监视ref声明的单个基本类型响应式数据
    watch(
      sum,
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      },
      {
        immediate: false,
      }
    );
    // 情况二：监视ref声明的多个基本类型响应式数据
    watch(
      [sum, msgs],
      (newVal, oldVal) => {
        console.log("newVal:", newVal, "oldVal:", oldVal);
      },
      {
        immediate: false,
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
    return { person, sum };
    // 返回渲染函数
    // return () => {
    //   return h("h1", "测试渲染")
    // }
  },
};
</script>

<style>
</style>