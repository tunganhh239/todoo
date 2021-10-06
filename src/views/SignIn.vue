<template>
    <div class="sign-in" v-loading="loading">
      <div class="header">
        <h2 class="header__title">SIGN IN</h2>
      </div>
      <div class="login">
        <el-form
        class="login__form"
        @submit.native.prevent="submit"
        :model="form"
        :rules="rules"
        ref="form"
        >
          <el-form-item label="Email" prop="email">
            <el-input class="login__input" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <div class="login__form__line"></div>
          <el-button
            class="login__form__SignIn"
            native-type="submit"
            block
          >Sign In</el-button>
          <el-button
            class="login__form__SignUp"
            block  @click.prevent="$router.push('/sign-up')"
          > Sign Up Now
          </el-button>
        </el-form>
      </div>

      <Footer></Footer>
    </div>

</template>

<script>
import { mapActions } from 'vuex';
import Footer from '@/components/Footer.vue';

export default {
  name: 'SignIn',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  components: {
    Footer,
  },
  methods: {
    ...mapActions(['signIn']),
    async submit() {
      const valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      const user = {
        email: this.form.email,
        password: this.form.password,
      };

      await this.signIn(user).then(() => {
        this.loading = false;
        this.signInSuccess();
        this.$router.push('/');
      }).catch(() => {
        this.loading = false;
        this.signInFail();
      });
    },
    signInFail() {
      this.$notify.error({
        title: 'Không thành công',
        message: 'Đăng nhập thất bại',
        duration: 2000,
      });
    },
    signInSuccess() {
      this.$notify({
        title: 'Thành công',
        message: 'Đăng nhập thành công',
        type: 'success',
        duration: 2000,
      });
    },
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/sign-in.css';
  /* @import './assets/stylesheets/sign-in.css'; Tại sao cái này lại ko đc ? */
</style>
