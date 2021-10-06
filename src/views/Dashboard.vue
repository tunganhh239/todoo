<template>
    <div class="dashboard">
      <el-container>
         <el-header>
          <Header/>
        </el-header>
        <el-main>
          <MainContent/>
          <Footer/>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import MainContent from '@/components/MainContent.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    MainContent,
    Footer,
  },
};
</script>

<style scoped>
  @import '../assets/stylesheets/dashboard.css';
</style>
