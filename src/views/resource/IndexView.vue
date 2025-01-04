<template>
  <div class="resource-root">
    <div class="menu">
      <div class="menu-items">
        <div class="menu-item" :class="{ 'menu-item-active': item.selected }" :title="item.title"
          v-for="(item, index) in menu_items" :key="'menu-item-' + index" @click.stop="OnHandleMenuItem($el, item)">
          <v-icon>{{ item.icon }}</v-icon>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div class="content" v-if="current_menu_item">
      <camera-view v-if="current_menu_item.name ==='camera'"></camera-view>
      <platform-view v-else-if="current_menu_item.name ==='platform'"></platform-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CameraView from "./CameraView.vue";
import PlatformView from "./PlatformView.vue";

@Component({
  name: "resource-view",
  components: {
    CameraView,
    PlatformView
  }
})
export default class ResourceView extends Vue {

  menu_items: Array<any> = [];
  current_menu_item: any = null;

  created() {
    this.CreateMenuItems(window.location.href);
  }

  OnHandleMenuItem(e: any, item: any) {
    this.menu_items.forEach(item => {
      item.selected = false;
    });

    this.current_menu_item = item;
    this.current_menu_item.selected = true;
  }

  CreateMenuItems(href: string) {
    this.menu_items.push({
      name: "camera",
      title: "相机设备",
      icon: "mdi-camera",
      selected: href.indexOf("/camera") > 0,
    });

    this.menu_items.push({
      name: "platform",
      title: "系统平台",
      icon: "mdi-laptop",
      selected: href.indexOf("/platform") > 0,
    });

    const selected_menu_items = this.menu_items.filter((item: any) => item.selected);
    if (selected_menu_items.length > 0) {
      this.current_menu_item = selected_menu_items[0];
    } else {
      this.current_menu_item = this.menu_items[0];
      this.current_menu_item.selected = true;
    }
  }
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
    &-items {
      padding-top: 8px;
      display: flex;
      flex-direction: column;
      .menu-item {
        margin: 16px 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .v-icon {
          font-size: 2rem;
        }
        span {
          margin-top: 4px;
          font-size: 1rem;
        }
      }
      .menu-item-active {
        .v-icon {
          color: #2196f3;
        }
        span {
          color: #2196f3;
        }
      }
      .menu-item:first-child {
        margin-top: 1rem;
      }
      .menu-item:last-child {
        margin-bottom: 1rem;
      }
    }
  }
  .content {
    width: calc(100% - 200px);
  }
}
</style>
