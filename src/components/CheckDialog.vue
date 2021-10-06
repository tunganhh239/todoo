<template>
  <div class="checkDialog" @click="$emit('close')">
    <div class="dialog-container" @click.stop v-loading="loading">
      <div class="dialog-title"><h2>{{todoData.title}}</h2></div>
      <div class="dialog-content">
        <el-form class="check-form">
          <div class="content-check">
            <el-form-item
              label="Todo">
              <div class="list-check-items">
                <div v-for="item in todoList" :key="item.id" class="check-item">
                  <el-checkbox @change="test(item.id)"
                               v-model="item.done">{{item.content}}
                  </el-checkbox>
                </div>
              </div>
            </el-form-item>
          </div>
          <el-form-item class="check-form-bottom ">
            <el-button class="btnCloseCheck" @click="submit">Close</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import user from '@/services/user.js';

export default {
  data() {
    return {
      done: true,
      todoData: {},
      loading: '',
    };
  },
  computed: {
    todoList() {
      return this.todoData.items;
    },
  },
  created() {
    this.loading = true;
    axios.get(`/api/v1/todos/${this.todoId}`, {
      headers: {
        Authorization: `${user.userAuthToken()}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      this.loading = false;
      this.todoData = res.data;
    });
  },
  methods: {
    submit() {
      this.todoData.items.forEach((item) => {
        if (item.changed) {
          axios.put(`/api/v1/todos/${this.todoId}/items/${item.id}`, {
            done: item.done,
          }, {
            headers: {
              Authorization: `${user.userAuthToken()}`,
              'Content-Type': 'application/json',
            },
          });
        }
      });
      this.$emit('checkStatus', false);
    },
    test(id) {
      this.todoData.items.find((x) => x.id === id).changed = true;
    },
  },
  props: {
    todoId: Number,
  },
};
</script>

<style scoped>
@import '../assets/stylesheets/components/checkDialog.css';
</style>
