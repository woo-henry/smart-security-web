<template>
  <div class="camera-root">
    <div class="camera-toolbar">
      <v-toolbar color="white" dark>
        <v-toolbar-title>相机设备</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn-toggle>
          <v-btn>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "camera-view",
  components: {
  }
})
export default class CameraView extends Vue {

  created() {

  }
}
</script>

<style lang="scss" scoped>
.camera-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .camera-toolbar {
    height: 80px;
  }
}
</style>
