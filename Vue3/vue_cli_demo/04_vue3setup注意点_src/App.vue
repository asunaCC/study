<!--
 * @Author: Yran
 * @Date: 2021-11-20 15:34:45
 * @LastEditors: Yran
 * @LastEditTime: 2021-12-11 10:59:08
-->
<template>
  <Demo msg="test" value="value"></Demo>
</template>

<script>
import { ref, reactive } from "vue";
import Demo from "./components/Demo.vue";
// import { h } from "vue";
export default {
  name: "App",
  components: { Demo },
};
</script>

<style>
</style>