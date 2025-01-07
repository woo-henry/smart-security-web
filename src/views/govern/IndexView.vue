<template>
  <div class="govern-root">

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
