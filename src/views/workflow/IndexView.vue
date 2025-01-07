<template>
  <div class="card-root">

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
