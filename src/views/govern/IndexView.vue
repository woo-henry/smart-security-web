<template>
  <div class="govern-root">
    <v-data-table density="compact" :headers="headers" :items="items" :loading="loading" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ `套餐列表 ( ${items.length} )` }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2" @click="HandleItemAdd" dark>新增套餐</v-btn>
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
                      <v-combobox v-model="package_type_name" :items="packasge_type_names" label="类型" outlined dense></v-combobox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="item.package_name" label="名称"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="item.package_price" label="原价"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="item.package_discount" label="折扣"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="item.general_model" label="通用模型（天）"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="item.text_value" label="大白助理（算力）"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="item.text_time" label="大白助理（有效期）"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="item.image_value" label="MJ绘画（次）"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="item.image_time" label="MJ绘画（有效期）"></v-text-field>
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
              <v-card-title class="text-h5">是否删除套餐?</v-card-title>
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
          <td class="v-data-column-number">{{ item.package_index }}</td>
          <td class="v-data-column-text">{{ item.package_type === 1 ? "算力包" : "VIP套餐" }}</td>
          <td class="v-data-column-text" :title="item.package_name">{{ item.package_name }}</td>
          <td class="v-data-column-number">{{ item.package_price }}</td>
          <td class="v-data-column-number">{{ item.package_discount }}</td>
          <td class="v-data-column-number">{{ item.package_discount_price }}</td>
          <td class="v-data-column-number">{{ item.general_model }}天</td>
          <td class="v-data-column-number">{{ item.text_value }}算力</td>
          <td class="v-data-column-number">{{ item.text_time }}天</td>
          <td class="v-data-column-number">{{ item.image_value }}次</td>
          <td class="v-data-column-number">{{ item.image_time }}天</td>
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
  name: "govern-view",
  components: {
  }
})
export default class GovernView extends Vue {
  headers: Array<any> = [
    { text: '序号', value: 'package_index', align: 'start'},
    { text: '类型', value: 'package_type', sortable: true },
    { text: '名称', value: 'package_name', sortable: false },
    { text: '原价（元）', value: 'package_price', sortable: false },
    { text: '折扣', value: 'package_discount', sortable: false },
    { text: '折扣价（元）', value: 'package_discount_price', sortable: false },
    { text: '通用模型（天）', value: 'general_model', sortable: false },
    { text: '大白助理（算力）', value: 'text_value', sortable: false },
    { text: '大白助理（有效期）', value: 'text_time', sortable: false },
    { text: 'MJ绘画（次）', value: 'image_value', sortable: false },
    { text: 'MJ绘画（有效期）', value: 'image_time', sortable: false },
    { text: '操作', value: 'actions', sortable: false }
  ];
  items: Array<any> = [];
  item: any = {
    object_id: "",
    package_name: "",
    package_type: 1,
    package_price: 0,
    package_discount: 0,
    general_model: 0,
    text_type: 1,
    text_value: 0,
    text_time: 0,
    image_type: 1,
    image_value: 0,
    image_time: 0,
    video_type: 1,
    video_value: 0,
    video_time: 0,
  };
  package_type_name: string = "算力包";
  packasge_type_names: Array<string> = ["算力包", "VIP套餐"];
  loading: boolean = false;
  search: string = "";
  save_dialog_title: string = "新增套餐";
  save_dialog_visible: boolean = false;
  delete_dialog_visible: boolean = false;

  mounted() {
    this.QueryItems();
  }

  QueryItems() {
    this.loading = true;
  }

  HandleSaveCancel() {
    this.save_dialog_visible = false;
  }

  HandleSaveConfirm() {
    if(this.package_type_name === "算力包") {
      this.item.package_type = 1;
    } else {
      this.item.package_type = 2;
    }

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
      package_name: "",
      package_type: 1,
      package_price: 0,
      package_discount: 0,
      general_model: 0,
      text_type: 1,
      text_value: 0,
      text_time: 0,
      image_type: 1,
      image_value: 0,
      image_time: 0,
      video_type: 1,
      video_value: 0,
      video_time: 0,
    };
    this.package_type_name = "算力包";
    this.save_dialog_title = "新增套餐";
    this.save_dialog_visible = true;
  }

  HandleItemEdit(item: any) {
    this.item = item;
    if(this.item.package_type === 1) {
      this.package_type_name = "算力包";
    } else {
      this.package_type_name = "VIP套餐";
    }

    this.save_dialog_title = "编辑套餐";
    this.save_dialog_visible = true;
  }

  HandleItemDelete(item: any) {
    this.item = item;
    this.delete_dialog_visible = true;
  }
}
</script>

<style lang="scss" scoped>
.govern-root {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  .v-data-table {
    width: 100%;
    height: calc(100vh - 50px);
  }
  .v-data-column-number {
    width: 64px;
  }
  .v-data-column-text {
    padding: 8px;
    width: 64px;
  }
  .v-data-column-action {
    width: 100px;
  }
}
</style>
