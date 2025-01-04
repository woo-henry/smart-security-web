<template>
  <div class="platform-root">
    Platform
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "camera-view",
  components: {
  }
})
export default class PlatformView extends Vue {

  created() {

  }
}
</script>

<style lang="scss" scoped>
.platform-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
