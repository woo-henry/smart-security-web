<template>
  <div class="login-root">
    <v-app-bar app dark dense flat outlined elevation="14" color="primary">
      <v-avatar color="white" size="24">
        <img src="favicon-16x16.png" alt="数创视图库交换平台">
      </v-avatar>
      <v-toolbar-title>数创视图库交换平台</v-toolbar-title>
    </v-app-bar>
    <div class="login-title">
      <span>用户登录</span>
    </div>
    <div class="login-form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field label="用户名" v-model="user_name" :rules="user_name_rules" required></v-text-field>
        <v-text-field label="密码" type="password" v-model="user_password" :rules="user_password_rules" required></v-text-field>
        <v-btn color="success" :disabled="!valid" @click="OnHandleLogin">登录</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Md5 } from "ts-md5";
import { IsSuccess, FindUser } from "@/services";

@Component({
  name: "login-view",
  components: {
  }
})
export default class LoginView extends Vue {
  valid: boolean = true;
  user_name: string = "";
  user_name_rules:any =  [
    (v: any) => !!v || '用户名不能为空',
  ];

  user_password: string = "";
  user_password_rules:any =  [
    (v: any) => !!v || '密码不能为空',
  ];

  OnHandleLogin() {
    const user_name = this.user_name;
    if(user_name === "" || user_name.length === 0)
      return;

    const user_password = this.user_password;
    if(user_password === "" || user_password.length === 0)
      return;

    this.valid = false;
    const user_password_md5: any = new Md5();
    user_password_md5.appendAsciiStr(user_password);
    FindUser(user_name, user_password_md5.end()).then((response: Service.Response) => {
      if(!IsSuccess(response.data)) {
        alert("登录失败: " + response.data.message);
        this.valid = true;
        return;
      }

      const user: any = response.data.data;
      sessionStorage.setItem("user", JSON.stringify(user));

      this.$router.push( {name: 'index'} );
    });
  }
}
</script>

<style lang="scss" scoped>
.login-root {
  width: 100%;
  height: 100%;
  padding: 16px 16px;
  .v-toolbar__title {
    margin: 0px 8px;
  }
  .v-app-bar-title {
    padding-left: 4px;
  }
  .login-title {
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    padding: 48px 0px;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .v-btn {
      width: 100%;
    }
  }
}
</style>
