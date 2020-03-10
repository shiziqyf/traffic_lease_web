<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">共享交通后台管理系统</div>
            <el-form   ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="password">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                username: '',
                password: ''

            };
        },
        methods: {
            login() {
                this.postRequest('/user/adminLogin', {
                    'username': this.username,
                    'password': this.password
                }).then(resp => {
                  
                    this.$store.commit('login', resp.data)
                    this.$router.push('/index')
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                })
            }
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>