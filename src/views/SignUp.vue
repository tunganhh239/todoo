<template>
  <div class="sign-up" v-loading="loading">
    <div class="header">
        <h2 class="header__title">SIGN UP</h2>
      </div>
      <div class="register">
        <el-form
        class="register__form"
        @submit.native.prevent="submit"
        :model="form"
        :rules="rules"
        ref="form"
        >
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Re-enter Password" prop="password_confirmation">
            <el-input v-model="form.password_confirmation" show-password></el-input>
          </el-form-item>
          <div class="register__form__line"></div>
          <el-button
            class="register__form__btnSignUp"
            native-type="submit"
            block
          >Sign Up</el-button>
          <el-button
            class="register__form__btnSignIn"
            block @click.prevent="$router.push('/sign-in')"
          > Sign In
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
  name: 'SignUp',
  data() {
    return {
      form: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
        ],
        password_confirmation: [
          { required: true, message: 'Please input re-enter password', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  components: {
    Footer,
  },
  methods: {
    ...mapActions(['signUp']),
    async submit() {
      const valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      const user = {
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,

      };
      await this.signUp(user)
        .then(() => {
          this.loading = false;
          this.$router.push('/dashboard');
        }).catch((e) => {
          console.log('loi~');
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/sign-up.css';
</style>
