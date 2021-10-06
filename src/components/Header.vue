<template>
  <div class="container">
    <h1>Logo</h1>
    <el-dropdown @command="signout">
      <span class="el-dropdown-link">
        <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        {{emailUser}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">
          Log out
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import user from '@/services/user.js';

export default {
  computed: {
    ...mapGetters(['emailUser']),
  },
  methods: {
    signout(command) {
      if (command === 'logout') {
        user.signOut();
        this.$router.push({ name: 'SignIn' });
      }
    },
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/components/header.css';
</style>
