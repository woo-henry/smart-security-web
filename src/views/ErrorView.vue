<template>
  <div class="error-root">
    <span class="error-text" v-if="message">{{ message }}</span>
    <span class="error-text" v-else>未知错误</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "error-view",
  components: {
  }
})
export default class ErrorView extends Vue {
  message: string | null = null;

  mounted() {
    this.message = this.$route.params.message;
  }
}
</script>

<style lang="scss" scoped>
.error-root {
  width: 100%;
  height: 100%;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .error-text {
    font-size: 18px;
    color: red;
  }
}
</style>
