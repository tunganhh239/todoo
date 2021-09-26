<template>
    <div class="sign-in">
      <div class="header">
        <h2 class="header__title">SIGN IN</h2>
      </div>
      <div class="login">
        <el-form
        class="login__form"
        @submit.native.prevent="submit"
        >
          <el-form-item label="Email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" >
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
    };
  },
  components: {
    Footer,
  },
  methods: {
    ...mapActions(['signIn']),
    async submit() {
      const user = {
        email: this.form.email,
        password: this.form.password,
      };
      try {
        await this.signIn(user);
        this.$router.push('/dashboard');
        // await this.signIn({
        //   email: user.email,
        //   password: user.password,
        // });
      } catch (e) {
        console.log('loi~');
      }
    },
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/sign-in.css';
  /* @import './assets/stylesheets/sign-in.css'; Tại sao cái này lại ko đc ? */
</style>
