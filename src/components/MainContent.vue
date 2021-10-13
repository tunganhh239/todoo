<template>
    <div class="main__container" v-loading="loading">
        <div class="container__header">
            <div class="main__title"><h1>MY TO-DO LIST</h1></div>
            <div class="main__menu">
                <el-input class="menu__search"
                          placeholder="Enter to search"
                          @change="search" v-model="inputSearch">
                </el-input>
                <el-button class="menu__btn__add" @click=" addStatus = !addStatus">
                    Add new</el-button>
            </div>
        </div>
        <div class="main__todolist" >
          <div class="nothing" v-if="todos.length===0 && !addStatus">
              Không có dữ liệu.
          </div>
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
                    <i class="el-icon-delete" @click="deleteTodoConfirm(todo.id)"></i>
                </div>
            </div>
        </div>
        <div class="main-pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="setPage"
                :page-size="5"
                :total="totalPage*5">
            </el-pagination>
        </div>
        <div v-if="editStatus" >
          <EditDialog @close="closeEditTodo" :todoId="todoId" @editStatus="updateEditStatus"/>
        </div>
        <div v-if="checkStatus">
          <CheckDialog @close="checkStatus = !checkStatus" :todoId="todoId"
                       @checkStatus="updateCheckStatus"/>
        </div>
        <div v-if="deleleStatus">
          <DeleteDialog @close="deleleStatus = !deleleStatus" :todoId="todoId" :page="page" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditDialog from './EditDialog.vue';
import CheckDialog from './CheckDialog.vue';
import DeleteDialog from './ConfirmDeleteDialog.vue';

export default {
  components: {
    EditDialog,
    CheckDialog,
    DeleteDialog,
  },
  data() {
    return {
      inputSearch: '',
      ruleForm: {
        inputTitle: '',
      },
      addStatus: false,
      editStatus: false,
      deleleStatus: false,
      checkStatus: false,
      searchStatus: false,
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
      page: 1,
    };
  },
  created() {
    this.$store.dispatch('loadTodo', this.page);
  },
  mounted() {
    console.log(this.$el);
  },
  computed: {
    ...mapGetters(['todos', 'totalPage', 'loading']),
  },
  methods: {
    ...mapActions(['addTodo']),
    setPage(page) {
      if (this.searchStatus) {
        this.page = page;
        const data = { inputSearch: this.inputSearch, page: this.page };
        this.$store.dispatch('searchTodo', data);
      } else {
        this.page = page;
        this.$store.dispatch('loadTodo', this.page);
      }
    },
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
    deleteTodoConfirm(todoId) {
      this.deleleStatus = true;
      this.todoId = todoId;
    },
    editTodo(todoId) {
      this.editStatus = !this.editStatus;
      this.todoId = todoId;
    },
    checkTodo(todoId) {
      this.checkStatus = !this.checkStatus;
      this.todoId = todoId;
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
      await this.$store.dispatch('loadTodo', this.page);
      this.editStatus = status;
    },
    updateCheckStatus(status) {
      this.checkStatus = status;
    },
    search() {
      if (this.inputSearch !== '') {
        this.searchStatus = true;
        const data = { inputSearch: this.inputSearch, page: this.page };
        this.$store.dispatch('searchTodo', data);
      } else {
        this.searchStatus = false;
        this.$store.dispatch('loadTodo', this.page);
      }
    },
  },
};
</script>

<style scoped>
   @import '../assets/stylesheets/components/mainContent.css';
</style>
