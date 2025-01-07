<template>
  <div id="device-root" class="device-root">
    <div class="device-toolbar">
      <v-toolbar color="white" light>
        <v-toolbar-title>
          <v-breadcrumbs :items="breadcrumbs" large>
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" icon title="所有设备" @click.stop="HandleQueryAllDevices()">
          <v-icon>mdi-camera-iris</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <div class="device-content">
      <div class="device-group">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list shaped>
            <v-subheader>
              <span class="device-list-header">相机分组</span>
              <div>
                <v-btn color="primary" title="创建分组" icon @click.stop="HandleGroupAdd()">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn color="primary" title="编辑分组" icon @click.stop="HandleGroupEdit()">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="primary" title="编辑分组" icon @click.stop="HandleGroupDelete()">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-subheader>
            <v-divider></v-divider>
            <v-responsive class="overflow-y-auto" :max-height="responsive_max_height">
              <v-responsive :height="responsive_height">
                <v-list-item-group v-model="group_selected" color="primary">
                  <v-list-item v-for="(item, i) in groups" :key="i">
                    <v-list-item-icon>
                      <v-icon v-if="group_selected == i">mdi-folder-open-outline</v-icon>
                      <v-icon v-else>mdi-folder-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.group_name }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-if="group_selected == i">
                      <v-icon>mdi-check</v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-responsive>
            </v-responsive>
          </v-list>
        </v-card>
      </div>
      <v-divider vertical></v-divider>
      <div id="device-list" class="device-list">
        <v-progress-circular indeterminate color="primary" v-if="devices_loading"></v-progress-circular>
        <div class="devices" v-if="Devices && Devices.length > 0">
          <div class="device-row" v-for="(row, i) in Devices" :key="'device-row-' + i">
            <div class="device-column" v-for="(device, j) in row" :key="'device-column-' + j">
              <v-card class="mx-auto" max-width="144">
                <v-icon color="indigo" large v-if="device && device.is_online">mdi-camera</v-icon>
                <v-icon color="default" large v-if="device && !device.is_online">mdi-camera</v-icon>
                <v-card-title v-if="device && device.device_name">
                  {{ device.device_name }}
                </v-card-title>
                <v-card-subtitle v-if="device && device.device_model">
                  {{ device.device_model }}
                </v-card-subtitle>
              </v-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="group_save_dialog_visible" max-width="500px">
      <v-toolbar color="primary" dark>
        <v-icon>mdi-plus</v-icon>
        <v-toolbar-title>{{ group_save_dialog_title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="group_save_dialog_visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="group.group_name" label="分组名称" :counter="64"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="group.sort_key" label="排序代码" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text outlined @click="HandleGroupSaveCancel">取消</v-btn>
          <v-btn color="primary" text outlined @click="HandleGroupSaveConfirm">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="group_delete_dialog_visible" max-width="500px">
      <v-card>
        <v-card-title>是否删除分组 ( {{ group.group_name }} ) ?</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text outlined @click="HandleGroupDeleteCancel">取消</v-btn>
          <v-btn color="primary" text outlined @click="HandleGroupDeleteConfirm">确定</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { IsSuccess, IsNullOrUndefined } from "@/services";
import { Group, GroupType, FindGroups, SaveGroups, DeleteGroups } from "@/services";
import { Device, FindAllDevices, FindDevices } from "@/services";

@Component({
  name: "device-view",
  components: {
  }
})
export default class DeviceView extends Vue {

  breadcrumbs: Array<any> = [];
  responsive_height = 0;
  responsive_max_height = 0;
  groups: Array<Group> = [];
  group: Group = {
    object_id: "",
    group_name: null,
    group_type: GroupType.TYPE_DEVICE,
    sort_key: null
  };
  group_selected: number = -1;
  group_save_dialog_visible: boolean = false;
  group_save_dialog_title: string = "创建分组";
  group_delete_dialog_visible: boolean = false;
  devices: Array<Device> = [];
  devices_loading: boolean = false;
  devices_width: number = 0;

  get Devices(): Array<Array<Device>> {
    const length: number = this.devices.length;
    const column: number = parseInt((this.devices_width / 144).toString(), 10) - 1;
    const divider: number = parseInt((length / column).toString(), 10);
    const remainder: number = length % column;
    const row: number = remainder > 0 ? divider + 1 : divider;

    const devices = [...this.devices].reverse();
    let result: Array<Array<Device>> = [];
    for(let i = 0; i < row; i++) {
      let devs: Array<Device> = [];
      for(let j = 0; j < column; j++) {
        const index: number = i * column + j;
        devs.push(devices[index]);
      }
      result.push(devs);
    }

    return result;
  }

  created() {
    this.CreateBreadcrumbs();
  }

  mounted() {
    this.QueryGroups();
    this.HandleQueryAllDevices();
  }

  HandleQueryAllDevices() {
    this.group_selected = -1;
    this.devices_loading = true;
    FindAllDevices().then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.devices_loading = false;
        return;
      }

      this.devices = response.data.data;
      this.devices_loading = false;
      this.CalculateDeviceListWidth();
    });
  }

  HandleGroupSaveCancel() {
    this.group_save_dialog_visible = false;
  }

  HandleGroupSaveConfirm() {
    const newed: boolean = IsNullOrUndefined(this.group.object_id) || this.group.object_id.length === 0;
    SaveGroups([this.group]).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.group_save_dialog_visible = false;
        return;
      }

      const groups = response.data.data;
      if(newed && groups && groups.length > 0) {
        this.group = groups[0];
        this.groups = [this.group, ...this.groups];
      }

      this.group_save_dialog_visible = false;
    });
  }

  HandleGroupDeleteCancel() {
    this.group_delete_dialog_visible = false;
  }

  HandleGroupDeleteConfirm() {
    if(this.group.object_id.length === 0) {
      this.group_delete_dialog_visible = false;
      return;
    }

    DeleteGroups([this.group.object_id]).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.group_delete_dialog_visible = false;
        return;
      }

      this.groups = this.groups.filter((group: Group) => group.object_id !== this.group.object_id);
      this.group_delete_dialog_visible = false;
    });
  }

  HandleGroupAdd() {
    this.group = {
      object_id: "",
      group_name: null,
      group_type: GroupType.TYPE_DEVICE,
      sort_key: null
    };

    this.group_save_dialog_title = "创建分组";
    this.group_save_dialog_visible = true;
  }

  HandleGroupEdit() {
    if(this.group_selected === -1)
      return;

    this.group = this.groups[this.group_selected];
    this.group_save_dialog_title = "编辑系分组";
    this.group_save_dialog_visible = true;
  }

  HandleGroupDelete() {
    if(this.group_selected === -1)
      return;

    this.group = this.groups[this.group_selected];
    this.group_delete_dialog_visible = true;
  }

  @Watch("group_selected")
  OnHandleGroupSelectedChanged(value: number) {
    if(value === -1)
      return;

    if(this.groups.length === 0)
      return;

    const group: Group = this.groups[value];
    if(IsNullOrUndefined(group))
      return;

    this.QueryGroupDevices(group.object_id as string);
  }

  private CalculateResponsiveHeight() {
    const root_element: HTMLElement = document.getElementById("device-root") as HTMLElement;
    if(IsNullOrUndefined(root_element))
      return;

    this.responsive_max_height = root_element.offsetHeight - 132;
    this.responsive_height = root_element.offsetHeight - 72;
  }

  private CalculateDeviceListWidth() {
    const device_element: HTMLElement = document.getElementById("device-list") as HTMLElement;
    if(IsNullOrUndefined(device_element))
      return;

    this.devices_width = device_element.offsetWidth;
  }

  private QueryGroups() {
    FindGroups(GroupType.TYPE_DEVICE).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        return;
      }

      this.groups = response.data.data;
      this.CalculateResponsiveHeight();
    });
  }

  private QueryGroupDevices(group_id: string) {
    this.devices_loading = true;

    FindDevices(group_id).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        this.devices_loading = false;
        return;
      }

      this.devices = response.data.data;
      setTimeout(()=> {
        this.devices_loading = false;
      }, 500);
    });
  }

  private CreateBreadcrumbs() {
    this.breadcrumbs.push({
      text: "资源库",
      disabled: false,
      href: "/resource"
    });

    this.breadcrumbs.push({
      text: "相机设备",
      disabled: true
    });
  }
}
</script>

<style lang="scss" scoped>
.device-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden !important;
  .device-toolbar {
    height: 64px;
    .device-toolbar-icon {
      color: #2196f3;
    }
    .device-toolbar-title {
      color: #2196f3;
    }
  }
  .device-content {
    height: calc(100% - 64px);
    margin: 4px 4px 4px 2px;
    display: flex;
    flex-direction: row;
    .device-group {
      width: 300px;
      height: 100%;
      .v-card {
        height: 100%;
        .v-list {
          .v-subheader {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
            .camera-list-header {
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }
    }
    .device-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .devices {
        width: 100%;
        height: 100%;
        padding: 32px 32px;
        overflow-y: auto;
        overflow-x: hidden;
        .device-row {
          width: 100%;
          max-height: 160px;
          margin: 8px 8px;
          display: flex;
          flex-direction: row;
          .device-column {
            width: 144px;
            height: 144px;
            margin: 8px 8px;
            display: flex;
            flex-direction: row;
          }
        }
      }
    }
  }
}

.v-application ul, .v-application ol {
  padding-left: 0px;
}
</style>
