<template>
  <div class="index-root">
    <v-app-bar app dark dense flat outlined elevation="14" color="primary">
      <v-icon>mdi-view-module</v-icon>
      <v-app-bar-title>数创视图库智慧平台</v-app-bar-title>
      <v-spacer></v-spacer>
      <div class="nav">
        <div class="nav-items">
          <div class="nav-item" v-for="(item, index) in nav_items" :key="'nav-item-' + index" @click.stop="OnHandleNavItem($el, item)">
            <span :class="{ 'active': item.selected }">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y bottom rounded="lg" origin="center center" transition="scale-transition" v-if="current_user">
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded text color="white" dark v-bind="attrs" v-on="on"><v-icon>mdi-account-circle</v-icon>{{ current_user.user_name }}</v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="" @click="HandleUpdateUser">修改密码</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog v-model="save_dialog_visible" max-width="500px">
        <v-toolbar color="primary" dark>
          <v-icon>mdi-plus</v-icon>
          <v-toolbar-title>修改密码</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="save_dialog_visible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="old_password" label="旧密码"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="new_password" label="新密码"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="HandleSaveCancel">取消</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="HandleSaveConfirm">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <div class="main">
      <resource-view :current_user="current_user" v-if="current_nav_item.name ==='resource'"></resource-view>
      <tag-view v-if="current_nav_item.name ==='tag'"></tag-view>
      <govern-view v-else-if="current_nav_item.name ==='govern'"></govern-view>
      <ledger-view v-else-if="current_nav_item.name ==='ledger'"></ledger-view>
      <workflow-view v-else-if="current_nav_item.name ==='workflow'"></workflow-view>
      <system-view v-else-if="current_nav_item.name ==='system'"></system-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Md5 } from "ts-md5";
import { IsSuccess, UpdateUser} from "@/services";
import ResourceView from "./resource/IndexView.vue";
import TagView from "./tag/IndexView.vue";
import GovernView from "./govern/IndexView.vue";
import LedgerView from "./ledger/IndexView.vue";
import WorkflowView from "./workflow/IndexView.vue";
import SystemView from "./system/IndexView.vue";

@Component({
  name: "index-view",
  components: {
    ResourceView,
    TagView,
    GovernView,
    LedgerView,
    WorkflowView,
    SystemView,
  }
})
export default class IndexView extends Vue {
  current_user: any = null;
  nav_items: Array<any> = [];
  current_nav_item: any = null;
  old_password: string = "";
  new_password: string = "";
  save_dialog_visible: boolean = false;

  created() {
    const user_cache = sessionStorage.getItem("user");
    if(user_cache === undefined || user_cache === null) {
      alert("登录信息已经失效，请重新登录！");
      this.$router.push( {name: 'login'} );
      return;
    }

    this.current_user = JSON.parse(user_cache);
    this.CreateNavItems(window.location.href);
  }

  OnHandleNavItem(e: any, item: any) {
    if (this.$route.name === item.name)
      return;

    this.nav_items.forEach(item => {
      item.selected = false;
    });

    this.current_nav_item = item;
    this.current_nav_item.selected = true;
  }

  private CreateNavItems(href: string) {
    this.nav_items.push({
      name: "resource",
      title: "资源库",
      selected: href.indexOf("/resource") > 0,
      children: []
    });

    this.nav_items.push({
      name: "tag",
      title: "标签管理",
      selected: href.indexOf("/tag") > 0,
      children: []
    });

    this.nav_items.push({
      name: "govern",
      title: "数据治理",
      selected: href.indexOf("/govern") > 0,
      children: []
    });

    this.nav_items.push({
      name: "ledger",
      title: "数据台账",
      selected: href.indexOf("/ledger") > 0,
      children: []
    });

    this.nav_items.push({
      name: "workflow",
      title: "流程管理",
      selected: href.indexOf("/workflow") > 0,
      children: []
    });

    this.nav_items.push({
      name: "system",
      title: "系统管理",
      selected: href.indexOf("/system") > 0,
      children: []
    });

    const selected_nav_items = this.nav_items.filter((item: any) => item.selected);
    if (selected_nav_items.length > 0) {
      this.current_nav_item = selected_nav_items[0];
    } else {
      this.current_nav_item = this.nav_items[0];
      this.current_nav_item.selected = true;
    }
  }

  HandleUpdateUser() {
    this.old_password = "";
    this.new_password = "";
    this.save_dialog_visible = true;
  }

  HandleSaveCancel() {
    this.save_dialog_visible = true;
  }

  HandleSaveConfirm() {
    if(this.old_password.length === 0) {
      alert("请输入旧密码");
      return;
    }

    if(this.new_password.length === 0) {
      alert("请输入新密码");
      return;
    }

    if(this.old_password === this.new_password) {
      alert("新密码不允许和旧密码相同");
      return;
    }

    const old_password_md5: any = new Md5();
    old_password_md5.appendAsciiStr(this.old_password);
    const new_password_md5: any = new Md5();
    new_password_md5.appendAsciiStr(this.new_password);
    UpdateUser(this.current_user.object_id, old_password_md5.end(), new_password_md5.end()).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        alert("修改密码失败：" + response.data.message);
        this.save_dialog_visible = false;
        return;
      }

      alert("密码修改成功");
      this.save_dialog_visible = false;
    });
  }
}
</script>

<style lang="scss" scoped>
.index-root {
  width: 100%;
  height: 100%;
  .nav {
    width: 60%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    &-items {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      .nav-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        span {
          color: #E0E0E0;
        }
        span.active {
          color: #FFFFFF;
        }
      }
    }
  }
  .main {
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: row;
    .content {
      width: calc(100vw - 80px);
      height: calc(100vh - 50px);
      overflow: hidden;
    }
  }
}
</style>
