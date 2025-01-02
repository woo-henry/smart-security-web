<template>
  <div class="card-root">
    <v-data-table density="compact" :headers="headers" :items="items" :loading="loading" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ `密卡列表 ( ${items.length} )` }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2" @click="HandleItemAdd" dark>新增密卡</v-btn>
          <v-btn color="pink" class="mb-2" @click="HandleItemExport" dark style="margin-left: 8px;">导出密卡</v-btn>
          <v-dialog v-model="save_dialog_visible" max-width="500px">
            <v-toolbar color="primary" dark>
              <v-icon>mdi-plus</v-icon>
              <v-toolbar-title>新增密卡</v-toolbar-title>
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
                      <v-text-field v-model="generate_general_model" label="通用模型不限次数（天）"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="generate_text_model" label="大白助理对话（算力）"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="generate_image_model" label="MJ绘画（次）"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="generate_effective_days" label="算力和MJ次数有效时（天）"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="generate_number" label="密卡生成（张）"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="HandleSaveCancel">取消</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="HandleSaveConfirm">生成</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="delete_dialog_visible" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">是否删除密卡?</v-card-title>
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
          <td class="v-data-column-number">{{ item.card_index }}</td>
          <td class="v-data-column-text">{{ item.card_id }}</td>
          <td class="v-data-column-number">{{ item.general_model }}</td>
          <td class="v-data-column-number">{{ item.text_model }}</td>
          <td class="v-data-column-number">{{ item.image_model }}</td>
          <td class="v-data-column-number">{{ item.effective_days }}</td>
          <td class="v-data-column-number">{{ item.card_used === 1 ? '已核销' : '未核销'}}</td>
          <td class="v-data-column-number">{{ item.card_status === 1 ? '生效中' : '已失效'}}</td>
          <td class="v-data-column-time">{{ item.created_time }}</td>
          <td class="v-data-column-action">
            <v-icon title="删除" @click="HandleItemDelete(item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Moment from "moment";
import Env from "@/env";
import { IsSuccess } from "@/services";

@Component({
  name: "workflow-view",
  components: {
  }
})
export default class WorkflowView extends Vue {
  headers: Array<any> = [
    { text: '编号', value: 'card_index', align: 'start'},
    { text: 'ID', value: 'card_id', sortable: false },
    { text: '通用模型（天）', value: 'general_model', sortable: false },
    { text: '大白助理（算力）', value: 'text_model', sortable: false },
    { text: 'MJ绘画（次）', value: 'image_model', sortable: false },
    { text: '有效期（天）', value: 'effective_days', sortable: false },
    { text: '是否核销', value: 'card_used', sortable: false },
    { text: '卡密状态', value: 'card_status', sortable: false },
    { text: '生成时间', value: 'created_time', sortable: true },
    { text: '操作', value: 'actions', sortable: false }
  ];
  items: Array<any> = [];
  item: any = {
    object_id: "",
    card_id: "",
    general_model: 0,
    text_model: 0,
    image_model: 0,
    effective_days: 0,
    card_used: 0,
    card_status: 0,
    created_time: ""
  };
  generate_general_model: number = 365;
  generate_text_model: number = 80;
  generate_image_model: number = 40;
  generate_effective_days: number = 90;
  generate_number: number = 192;
  loading: boolean = false;
  search: string = "";
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
    const generate_general_model: number = this.generate_general_model;
    const generate_text_model: number = this.generate_text_model;
    const generate_image_model: number = this.generate_image_model;
    const generate_effective_days: number = this.generate_effective_days;
    const generate_number: number = this.generate_number;
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
    this.generate_general_model = 365;
    this.generate_text_model = 80;
    this.generate_image_model = 40;
    this.generate_effective_days = 90;
    this.generate_number = 192;
    this.save_dialog_visible = true;
  }

  HandleItemExport() {
    const { api_host } = Env;
    var url = `${api_host}/api/card/export-cards`;
    window.open(url);
  }

  HandleItemDelete(item: any) {
    this.item = item;
    this.delete_dialog_visible = true;
  }
}
</script>

<style lang="scss" scoped>
.role-root {
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
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .v-data-column-time {
    width: 200px;
  }
  .v-data-column-action {
    width: 100px;
  }
}
</style>
