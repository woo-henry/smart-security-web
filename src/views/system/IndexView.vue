<template>
  <div class="system-root">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IsSuccess } from "@/services";

@Component({
  name: "system-view",
  components: {
  }
})
export default class SystemView extends Vue {
  @Prop() current_user!: any;

  headers: Array<any> = [
    { text: '用户名', value: 'user_name', align: 'start'},
    { text: '手机号', value: 'phone_number', sortable: true },
    { text: '注册时间', value: 'created_time', sortable: true },
    { text: '操作', value: 'actions', sortable: false }
  ];
  items: Array<any> = [];
  item_id: string = "";
  loading: boolean = false;
  search: string = "";
  delete_dialog_visible: boolean = false;

  mounted() {
    this.QueryItems();
  }

  QueryItems() {
    this.loading = true;
  }

  HandleDeleteCancel() {
    this.item_id = "";
    this.delete_dialog_visible = false;
  }

  HandleDeleteConfirm() {
    if(this.item_id.length === 0) {
      this.delete_dialog_visible = false;
      return;
    }

    if(this.current_user.object_id === this.item_id) {
      alert("不允许删除自己！");
      this.delete_dialog_visible = false;
      return;
    }
  }

  HandleItemDelete(item: any) {
    this.item_id = item.object_id;
    this.delete_dialog_visible = true;
  }
}
</script>

<style lang="scss" scoped>
.system-root {
  width: 100%;
  height: 100%;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .v-data-table {
    width: 100%;
    height: 100%;
  }
}
</style>
