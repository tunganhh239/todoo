<template>
  <div class="deleteDialog"  @click="$emit('close')" >
    <div class="deleteDialog__container" @click.stop >
      <div>
        <div class="dialog__title"><h2>Are you sure?</h2></div>
        <div class="dialog__content">Are you sure you want to delete this record?</div>
      </div>
      <div class="dialog__btn">
        <el-button class="btn__cancel" @click="$emit('close')">Cancel</el-button>
        <el-button class="btn__accept" @click="submitDeleteTodo(todoId)">Accept</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: {
    todoId: Number,
  },
  methods: {
    ...mapActions(['deleteTodo']),
    async submitDeleteTodo(id) {
      await this.deleteTodo(id);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
   @import '../assets/stylesheets/components/deleteDialog.css';
</style>
