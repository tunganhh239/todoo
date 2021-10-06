<template>
    <div class="editDialog" @click="$emit('close')">
        <div class="dialog-container" @click.stop v-loading="loading">
            <div class="dialog-title"><h2>edit</h2></div>
            <div class="dialog-content">
                <!-- ref="ruleForm" :rules="rules" :model="ruleForm" -->
                <el-form ref="ruleForm" :rules="rules" :model="ruleForm" class="edit-form">
                  <div class="edit-form-content">
                    <el-form-item label="Title" prop="inputTitle">
                      <el-input
                          v-model="ruleForm.inputTitle"
                          class="edit__inputTitle"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item
                      class="el-form-item--noMargin"
                      label="Todo"
                    >
                      <div class="list-items">
                        <div class="items" v-for="item in todoList.items" :key="item.id">
                          <div class="items_display" v-if="!item.editItemStatus">
                            <el-tooltip class="item"
                                        effect="dark"
                                        :content="item.content"
                                        placement="top-start">
                              <div class="item__content text-limit">{{item.content}}</div>
                              </el-tooltip>
                              <div class="item__menu">
                                  <i class="el-icon-edit
                                            el-icon--margin--short
                                            el-icon--medSize"
                                      @click="editItem(item.id)"></i>
                                  <i class="el-icon-delete el-icon--medSize"
                                      @click="deleteItem(item.id)">
                                  </i>
                              </div>
                          </div>
                          <div v-else class="items_edit">
                              <el-form-item class="el-form-item--noMargin">
                                  <el-input
                                      type="textarea"
                                      v-model="itemContent"
                                      maxlength="500"
                                  >
                                  </el-input>
                              </el-form-item>
                              <el-form-item>
                                  <div class="items__add__menu">
                                      <div class="items__add__btn">
                                          <i class="el-icon-check" v-if="itemContent !== ''"
                                            @click="saveEditItem(item.id, todoList.id)"
                                          ></i>
                                          <i class="el-icon-close"
                                            @click="item.editItemStatus =
                                                    !item.editItemStatus">
                                          </i>
                                      </div>
                                      <div class="items__add__length">
                                          {{itemContent.length}}/
                                          <span class="span--highlight">500</span>
                                      </div>
                                  </div>
                              </el-form-item>
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                    <div v-if="addItemStatus" @click=" addItemStatus = !addItemStatus">
                      <div class="items__add">Add item</div>
                    </div>
                    <div v-else>
                      <el-form-item class="el-form-item--noMargin">
                          <el-input
                              type="textarea"
                              placeholder="Please input"
                              v-model="itemContentAdd"
                              maxlength="500"
                          >
                          </el-input>
                      </el-form-item>
                      <el-form-item class="el-form-item--noMargin">
                          <div class="items__add__menu">
                              <div class="items__add__btn">
                                <i class="el-icon-check"
                                   v-if="itemContentAdd !== ''"
                                   @click="saveAddItem"></i>
                                <i class="el-icon-close"
                                    @click="addItemStatus = !addItemStatus"></i>
                              </div>
                              <div class="items__add__length">
                                {{itemContentAdd.length}}/500
                              </div>
                          </div>
                      </el-form-item>
                    </div>
                  </div>
                  <el-form-item class="edit-form-bottom ">
                    <el-button class="btnSaveEdit" @click="saveSubmit">Save</el-button>
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
      addItemStatus: true,
      todoData: {},
      deleteItemData: [],
      ruleForm: {
        // inputTitle: this.todoData.title,
        inputTitle: '',
      },
      rules: {
        inputTitle: [
          {
            required: true,
            message: 'Title cannot be blank',
            trigger: 'blur',
          },
        ],
      },
      itemContent: '',
      itemContentAdd: '',
      loading: '',
    };
  },
  computed: {
    todoList() {
      return this.todoData;
    },
  },
  props: {
    todoId: Number,
  },
  created() {
    this.loading = true;
    axios.get(`/api/v1/todos/${this.todoId}`, {
      headers: {
        Authorization: `${user.userAuthToken()}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.data.items.forEach((item) => {
        item.editItemStatus = false;
      });
      this.todoData = res.data;
      this.ruleForm.inputTitle = res.data.title;
      this.loading = false;
    }).catch(() => {
      user.signOut();
      this.$router.push({ name: 'SignIn' });
    });
  },
  methods: {
    editItem(id) {
      this.todoData.items.forEach((item) => {
        if (item.id === id) {
          item.editItemStatus = true;
          this.itemContent = item.content;
        } else {
          item.editItemStatus = false;
        }
      });
    },
    deleteItem(id) {
      this.todoData.items = this.todoData.items.filter((item) => {
        if (item.id === id) {
          if (!item.added) {
            this.deleteItemData.push(id);
          }
        }
        return item.id !== id;
      });
    },
    saveEditItem(itemId, todoId) {
      const data = { itemContent: this.itemContent, itemId, todoId };
      this.todoData.items.forEach((item) => {
        item.editItemStatus = false;
        if (item.id === data.itemId) {
          item.content = data.itemContent;
          item.edited = true;
        }
      });
    },
    saveAddItem() {
      const id = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      const item = {
        content: this.itemContentAdd,
        added: true,
        editItemStatus: false,
        id,
      };
      this.todoData.items.push(item);
      this.itemContentAdd = '';
      this.addItemStatus = !this.addItemStatus;
    },
    async saveSubmit() {
      const valid = await this.$refs.ruleForm.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await axios.put(`api/v1/todos/${this.todoId}`, {
        title: this.ruleForm.inputTitle,
      }, {
        headers: {
          Authorization: `${user.userAuthToken()}`,
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.loading = false;
      }).catch(() => {
        user.signOut();
      });
      this.todoData.items.forEach((item) => {
        if (item.added) {
          item.edited = false;
          axios.post(`/api/v1/todos/${this.todoId}/items`, {
            content: item.content,
          }, {
            headers: {
              Authorization: `${user.userAuthToken()}`,
              'Content-Type': 'application/json',
            },
          }).then(() => {
            this.loading = false;
          });
        } else if (item.edited) {
          axios.put(`/api/v1/todos/${this.todoId}/items/${item.id}`, {
            content: item.content,
          }, {
            headers: {
              Authorization: `${user.userAuthToken()}`,
              'Content-Type': 'application/json',
            },
          }).then(() => {
            this.loading = false;
          }).catch(() => {
            user.signOut();
          });
        }
      });
      this.deleteItemData.forEach((id) => {
        axios.delete(`/api/v1/todos/${this.todoId}/items/${id}`, {
          headers: {
            Authorization: `${user.userAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }).then(() => {
          this.loading = false;
        }).catch(() => {
          user.signOut();
          this.$router.push({ name: 'SignIn' });
        });
      });
      this.$emit('editStatus', false);
    },
  },
};

</script>

<style scoped>
   @import '../assets/stylesheets/components/editDialog.css';
</style>
