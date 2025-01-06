<template>
  <div class="tag-root">
    <div class="tag-toolbar">
      <v-toolbar color="white" dark>
        <v-toolbar-title class="tag-toolbar-title">标签库</v-toolbar-title>
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
    <v-data-table density="compact" :headers="headers" :items="items" :loading="loading" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ `标签列表 ( ${items.length} )` }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2" @click="HandleItemAdd" dark>新增标签</v-btn>
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
                      <v-text-field v-model="item.role_title" label="标题"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="item.role_icon" label="图标"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="item.role_remark" label="预设内容" rows="8"></v-textarea>
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
          <v-dialog v-model="delete_dialog_visible" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">是否删除标签?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="HandleDeleteCancel">取消</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="HandleDeleteConfirm">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field v-model="search" label="搜索" prepend-inner-icon="mdi-magnify" variant="outlined" single-line hide-details></v-text-field>
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td style="width: 200px">{{ item.role_title }}</td>
          <td class="v-data-column-icon">
            <v-img max-height="64" max-width="64" :src="item.role_icon" v-if="item.role_icon"></v-img>
          </td>
          <td class="v-data-column-text" :title="item.role_remark">{{ item.role_remark }}</td>
          <td class="v-data-column-action">
            <v-icon title="编辑" @click="HandleItemEdit(item)">mdi-pencil</v-icon>
            <v-icon title="删除" @click="HandleItemDelete(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IsSuccess, IsNullOrUndefined } from "@/services";

@Component({
  name: "tag-view",
  components: {
  }
})
export default class TagView extends Vue {
  headers: Array<any> = [
    { text: '标题', value: 'role_title', align: 'start'},
    { text: '图标', value: 'role_icon', sortable: false },
    { text: '预设内容', value: 'role_remark', sortable: false },
    { text: '操作', value: 'actions', sortable: false }
  ];
  items: Array<any> = [];
  item: any = {
    object_id: "",
    role_type: 1,
    role_title: "",
    role_icon: "",
    role_remark: "",
    index: 0,
    selected: false
  };
  loading: boolean = false;
  search: string = "";
  save_dialog_title: string = "新增标签";
  save_dialog_visible: boolean = false;
  delete_dialog_visible: boolean = false;

  mounted() {
    this.QueryItems();
  }

  QueryItems() {
    //this.loading = true;
  }

  HandleSaveCancel() {
    this.save_dialog_visible = false;
  }

  HandleSaveConfirm() {
    const newed: boolean = IsNullOrUndefined(this.item.object_id) || this.item.object_id.length === 0;

  }

  HandleDeleteCancel() {
    this.delete_dialog_visible = false;
  }

  HandleDeleteConfirm() {
    if(this.item.object_id.length === 0) {
      this.delete_dialog_visible = false;
      return;
    }
  }

  HandleItemAdd() {
    this.item = {
      object_id: "",
      role_type: 1,
      role_title: "",
      role_icon: "",
      role_remark: "",
      index: 0,
      selected: false
    };
    this.save_dialog_title = "新增标签";
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
    height: calc(100vh - 50px);
  }
  .v-data-column-text {
    height: 96px;
    padding: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .v-data-column-icon {
    width: 64px;
    max-height: 96px;
  }
  .v-data-column-action {
    width: 100px;
  }
}
</style>
