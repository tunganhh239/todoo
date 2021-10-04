<template>
    <div class="dashboard">
      <el-container>
         <el-header>
          <Header/>
        </el-header>
        <el-main>
          <MainContent/>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import MainContent from '@/components/MainContent.vue';

export default {
  components: {
    Header,
    MainContent,
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/dashboard.css';
</style>
