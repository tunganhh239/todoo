<template>
    <div class="main__container">
        <div class="container__header">
            <div class="main__title"><h1>MY TO-DO LIST</h1></div>
            <div class="main__menu">
                <el-input class="menu__search" placeholder="Enter to search" v-model="input">
                </el-input>
                <el-button class="menu__btn__add" @click=" addStatus = !addStatus">
                    Add new</el-button>
            </div>
            <!-- <el-row >
                <el-col class="main__title" :span="12"><h1>MY TO-DO LIST</h1></el-col>
                <el-col :span="10">
                    <el-input class="main__search" placeholder="Enter to search" v-model="input">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button class="menu__btn__add" @click=" addStatus = !addStatus">
                    Add new</el-button>
                </el-col>
            </el-row> -->
        </div>
        <div class="main__todolist" >
            <div class="main__todo" v-if="addStatus">
                <el-form class="addTitle__form" ref="ruleForm" :rules="rules" :model="ruleForm">
                    <div class="todo__title__add">
                        <el-form-item prop="inputTitle" class="el-form-item--noMargin">
                            <el-input v-model="ruleForm.inputTitle">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="todo__menu__add">
                        <el-form-item class="el-form-item--noMargin">
                            <i class="el-icon-check el-icon--margin el-icon--bigSize"
                              @click="submitAddTodo()"></i>
                            <i class="el-icon-close el-icon--bigSize"
                              @click="closeAddTodo()"></i>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="main__todo" v-for="todo in todos" :key="todo.id">
                <div class="todo__title" @click="checkTodo(todo.id)"><h1>{{todo.title}}</h1></div>
                <div class="todo__menu">
                    <i class="el-icon-edit el-icon--margin" @click="editTodo(todo.id)"></i>
                    <i class="el-icon-delete" @click="submitDeleteTodo(todo.id)"></i>
                </div>
            </div>
        </div>
        <div class="main-pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="100">
            </el-pagination>
        </div>
        <div v-if="editStatus" >
          <EditDialog @close="closeEditTodo" :todoId="todoId" @editStatus="updateEditStatus"/>
        </div>
        <div v-if="checkStatus">
          <CheckDialog @close="checkStatus = !checkStatus" :todoId="todoId"
                       @checkStatus="updateCheckStatus"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditDialog from './EditDialog.vue';
import CheckDialog from './CheckDialog.vue';

// import { mapGetters } from 'vuex';

export default {
  components: {
    EditDialog,
    CheckDialog,
  },
  data() {
    return {
      input: '',
      ruleForm: {
        inputTitle: '',
      },
      addStatus: false,
      editStatus: false,
      checkStatus: false,
      rules: {
        inputTitle: [
          {
            required: true,
            message: 'Title cannot be blank',
            trigger: 'blur',
          },
        ],
      },
      todoId: '',
    };
  },
  created() {
    this.$store.dispatch('loadTodo');
  },
  computed: {
    ...mapGetters(['todos']),
  },
  methods: {
    ...mapActions(['addTodo', 'deleteTodo']),
    async submitAddTodo() {
      const valid = await this.$refs.ruleForm.validate();
      if (!valid) {
        return;
      }
      await this.addTodo(this.ruleForm.inputTitle);
      this.ruleForm.inputTitle = '';
      this.addStatus = false;
    },
    closeAddTodo() {
      this.ruleForm.inputTitle = '';
      this.addStatus = false;
    },
    async submitDeleteTodo(id) {
      await this.deleteTodo(id);
    },
    editTodo(todoId) {
      this.editStatus = !this.editStatus;
      this.todoId = todoId;
      console.log(todoId);
    },
    checkTodo(todoId) {
      this.checkStatus = !this.checkStatus;
      this.todoId = todoId;
      console.log(todoId);
    },
    closeEditTodo() {
      this.editStatus = !this.editStatus;
      this.todos.forEach((element) => {
        element.items.forEach((item) => {
          item.editItemStatus = false;
        });
      });
    },
    async updateEditStatus(status) {
      await this.$store.dispatch('loadTodo');
      this.editStatus = status;
    },
    updateCheckStatus(status) {
      this.checkStatus = status;
      console.log(this.checkStatus);
    },
  },
};
</script>

<style scoped>
   @import '../assets/stylesheets/components/mainContent.css';
</style>
