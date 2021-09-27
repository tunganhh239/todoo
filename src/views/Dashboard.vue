<template>
    <div class="dashboard">
      <el-container>
         <el-header>
          <Header/>
        </el-header>
        <el-main>
          Main
          <div>Dashboard</div>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/dashboard.css';
</style>
