<template>
  <div class="resource-root">
    <div class="menu">

    </div>
    <div class="content">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "resource-view",
  components: {
  }
})
export default class ResourceView extends Vue {

}
</script>

<style lang="scss" scoped>
.resource-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .menu {
    width: 200px;
    position: sticky;
    top: 64px;
    left: 0px;
    border-right: 2px solid rgba(135, 137, 143, 1);
  }
  .content {
    width: 100%;
  }
}
</style>
