<template>
  <div class="platform-root">
    <div class="platform-toolbar">
      <v-toolbar color="white" light>
        <v-toolbar-title>
          <v-breadcrumbs :items="breadcrumbs" large>
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" @click="HandleItemAdd" dark>
          <v-icon>mdi-plus</v-icon>
          <span>创建系统</span>
        </v-btn>
      </v-toolbar>
    </div>
    <v-data-table density="compact" :headers="headers" :items="items" :loading="loading">
      <template v-slot:item="{ item }">
        <tr>
          <td :title="item.index" style="width: 80px">{{ item.index }}</td>
          <td :title="item.platform_name">{{ item.platform_name }}</td>
          <td :title="item.platform_address">{{ item.platform_address }}</td>
          <td :title="item.platform_port">{{ item.platform_port }}</td>
          <td :title="item.platform_account">{{ item.platform_account }}</td>
          <td>********</td>
          <td>
            <v-chip color="green" small outlined v-if="item.enabled">启用</v-chip>
            <v-chip color="red" small outlined v-else>禁用</v-chip>
          </td>
          <td :title="item.sort_key">{{ item.sort_key }}</td>
          <td class="v-data-column-action">
            <v-icon title="编辑" @click="HandleItemEdit(item)">mdi-pencil</v-icon>
            <v-icon title="删除" @click="HandleItemDelete(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="save_dialog_visible" max-width="500px">
      <v-toolbar color="primary" dark>
        <v-icon>mdi-plus</v-icon>
        <v-toolbar-title>{{ save_dialog_title }}</v-toolbar-title>
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
                <v-text-field v-model="item.platform_name" label="系统名称" :counter="64" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9">
                <v-text-field v-model="item.platform_address" label="服务地址" :counter="64" required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="item.platform_port" label="服务端口" type="number" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="item.platform_account" label="登录账号" :counter="32" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="item.platform_password" label="登录密码" type="password" :counter="32" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="item.sort_key" label="排序代码" type="number" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-checkbox v-model="item.enabled" label="是否启用" color="green" hide-details></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text outlined @click="HandleSaveCancel">取消</v-btn>
          <v-btn color="primary" text outlined @click="HandleSaveConfirm">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog_visible" max-width="500px">
      <v-card>
        <v-card-title>是否删除系统 ( {{ item.platform_name }} ) ?</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text outlined @click="HandleDeleteCancel">取消</v-btn>
          <v-btn color="primary" text outlined @click="HandleDeleteConfirm">确定</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IsSuccess, IsNullOrUndefined } from "@/services";
import { Platform, FindPlatforms, SavePlatforms, DeletePlatforms } from "@/services";

@Component({
  name: "camera-view",
  components: {
  }
})
export default class PlatformView extends Vue {

  breadcrumbs: Array<any> = [];
  headers: Array<any> = [
    { text: "行号", value: "index", sortable: false, align: "start"},
    { text: "系统名称", value: "platform_name", sortable: false},
    { text: "服务地址", value: "platform_address", sortable: false },
    { text: "服务端口", value: "platform_port", sortable: false },
    { text: "登录账号", value: "platform_account", sortable: false },
    { text: "登录密码", value: "platform_password", sortable: false },
    { text: "是否启用", value: "enabled", sortable: false },
    { text: "排序代码", value: "sort_key", sortable: true },
    { text: "操作", value: "actions", sortable: false }
  ];
  items: Array<Platform> = [];
  item: Platform = {
    object_id: "",
    platform_name: null,
    platform_address: null,
    platform_port: null,
    platform_account: null,
    platform_password: null,
    enabled: false,
    sort_key: null,
    index: null,
    selected: false
  };
  loading: boolean = false;
  save_dialog_title: string = "创建";
  save_dialog_visible: boolean = false;
  delete_dialog_visible: boolean = false;

  created() {
    this.CreateBreadcrumbs();
  }

  mounted() {
    this.QueryItems();
  }

  QueryItems() {
    this.loading = true;

    FindPlatforms().then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.loading = false;
        return;
      }

      this.items = response.data.data.map((item: Platform, index: number) => {
        return {
          ...item,
          index: index + 1,
        }
      });
      this.loading = false;
    });
  }

  HandleSaveCancel() {
    this.save_dialog_visible = false;
  }

  HandleSaveConfirm() {
    const newed: boolean = IsNullOrUndefined(this.item.object_id) || this.item.object_id.length === 0;
    SavePlatforms([this.item]).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.save_dialog_visible = false;
        return;
      }

      const items = response.data.data;
      if(newed && items && items.length > 0) {
        this.item = items[0];
        this.items = [this.item, ...this.items];
        this.items.forEach((item: Platform, index: number) => {
          item.index = index + 1;
        });
      }

      this.save_dialog_visible = false;
    });
  }

  HandleDeleteCancel() {
    this.delete_dialog_visible = false;
  }

  HandleDeleteConfirm() {
    if(this.item.object_id.length === 0) {
      this.delete_dialog_visible = false;
      return;
    }

    DeletePlatforms([this.item.object_id]).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.delete_dialog_visible = false;
        return;
      }

      this.items = this.items.filter((item: Platform) => item.object_id !== this.item.object_id);
      this.items.forEach((item: Platform, index: number) => {
        item.index = index + 1;
      });
      this.delete_dialog_visible = false;
    });
  }

  HandleItemAdd() {
    this.item = {
      object_id: "",
      platform_name: null,
      platform_address: null,
      platform_port: null,
      platform_account: null,
      platform_password: null,
      enabled: true,
      sort_key: null,
      index: 0,
      selected: false
    };
    this.save_dialog_title = "创建系统";
    this.save_dialog_visible = true;
  }

  HandleItemEdit(item: any) {
    this.item = item;
    this.save_dialog_title = "编辑系统";
    this.save_dialog_visible = true;
  }

  HandleItemDelete(item: any) {
    this.item = item;
    this.delete_dialog_visible = true;
  }

  private CreateBreadcrumbs() {
    this.breadcrumbs.push({
      text: "资源库",
      disabled: false,
      href: "/resource"
    });

    this.breadcrumbs.push({
      text: "系统平台",
      disabled: true
    });
  }
}
</script>

<style lang="scss" scoped>
.platform-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .platform-toolbar {
    height: 64px;
    .platform-toolbar-title {
      color: #2196f3;
    }
  }
  .v-data-table {
    width: 100%;
    .v-data-column-action {
      width: 100px;
    }
  }
}

.v-application ul, .v-application ol {
  padding-left: 0px;
}
</style>
