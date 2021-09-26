<template>
  <div class="sign-up">
    <div class="header">
        <h2 class="header__title">SIGN UP</h2>
      </div>
      <div class="register">
        <el-form
        class="register__form"
        @submit.native.prevent="submit"
        >
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" >
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="Re-enter Password" >
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
    };
  },
  components: {
    Footer,
  },
  methods: {
    ...mapActions(['signUp']),
    async submit() {
      const user = {
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation,

      };
      try {
        await this.signUp(user);
        this.$router.push('/dashboard');
      } catch (e) {
        console.log('loi~');
      }
    },
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/sign-up.css';
</style>
