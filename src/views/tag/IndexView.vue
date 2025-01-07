<template>
  <div class="tag-root">
    <div class="tag-toolbar">
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
          <span>创建标签</span>
        </v-btn>
      </v-toolbar>
    </div>
    <v-data-table density="compact" :headers="headers" :items="items" :loading="loading" v-if="view == 0">
      <template v-slot:top>
        <v-text-field v-model="search" label="搜索" prepend-inner-icon="mdi-magnify" variant="outlined" single-line hide-details></v-text-field>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td :title="item.index" style="width: 80px">{{ item.index }}</td>
          <td :title="item.tag_name">{{ item.tag_name }}</td>
          <td :title="item.tag_remark">{{ item.tag_remark }}</td>
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
                <v-text-field v-model="item.tag_name" label="名称" :counter="16"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea v-model="item.tag_remark" label="备注" rows="1" :counter="255"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="item.sort_key" label="排序代码" type="number"></v-text-field>
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
        <v-card-title class="text-h5">是否删除标签 ( {{ item.tag_name }} ) ?</v-card-title>
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
import { Tag, FindTags, SaveTags, DeleteTags } from "@/services";

@Component({
  name: "tag-view",
  components: {
  }
})
export default class TagView extends Vue {

  breadcrumbs: Array<any> = [];
  headers: Array<any> = [
    { text: "行号", value: "index", sortable: false, align: "start"},
    { text: "标题", value: "tag_name", sortable: false},
    { text: "内容", value: "tag_remark", sortable: false },
    { text: "排序", value: "sort_key", sortable: true },
    { text: "操作", value: "actions", sortable: false }
  ];
  items: Array<Tag> = [];
  item: Tag = {
    object_id: "",
    tag_name: null,
    tag_remark: null,
    sort_key: null,
    index: null,
    selected: false
  };
  loading: boolean = false;
  search: string = "";
  view: number = 0;
  save_dialog_title: string = "创建标签";
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

    FindTags().then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.loading = false;
        return;
      }

      this.items = response.data.data.map((item: Tag, index: number) => {
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
    SaveTags([this.item]).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.save_dialog_visible = false;
        return;
      }

      const items = response.data.data;
      if(newed && items && items.length > 0) {
        this.item = items[0];
        this.items = [this.item, ...this.items];
        this.items.forEach((item: Tag, index: number) => {
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

    DeleteTags([this.item.object_id]).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.delete_dialog_visible = false;
        return;
      }

      this.items = this.items.filter((item: Tag) => item.object_id !== this.item.object_id);
      this.items.forEach((item: Tag, index: number) => {
        item.index = index + 1;
      });
      this.delete_dialog_visible = false;
    });
  }

  HandleItemAdd() {
    this.item = {
      object_id: "",
      tag_name: null,
      tag_remark: null,
      sort_key: null,
      index: null,
      selected: false
    };
    this.save_dialog_title = "创建标签";
    this.save_dialog_visible = true;
  }

  HandleItemEdit(item: any) {
    this.item = item;
    this.save_dialog_title = "编辑标签";
    this.save_dialog_visible = true;
  }

  HandleItemDelete(item: any) {
    this.item = item;
    this.delete_dialog_visible = true;
  }

  private CreateBreadcrumbs() {
    this.breadcrumbs.push({
      text: "标签管理",
      disabled: false,
      href: "/tag"
    });

    this.breadcrumbs.push({
      text: "标签库",
      disabled: true
    });
  }
}
</script>

<style lang="scss" scoped>
.tag-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tag-toolbar {
    height: 80px;
    .tag-toolbar-title {
      color: #2196f3;
    }
  }
  .v-data-table {
    width: 100%;
  }
  .v-data-column-action {
    width: 100px;
  }
}

.v-application ul, .v-application ol {
  padding-left: 0px;
}
</style>
