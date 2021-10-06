import axios from 'axios';
import user from '@/services/user.js';

const state = {
  todos: [],
  token: '',
  totalPage: '',
  loading: false,
  // token: '' || user.userAuthToken(),
};

const getters = {
  todos(state) {
    return state.todos;
  },
  totalPage(state) {
    return state.totalPage;
  },
  loading(state) {
    return state.loading;
  },
};

const actions = {
  async loadTodo({ commit, state }, page) {
    commit('UPDATE_LOADING', true);
    await axios.get(`/api/v1/todos?limit=5&page=${page}`, {
      headers: {
        Authorization: `${state.token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.data.forEach((element) => {
        element.items.forEach((item) => {
          item.editItemStatus = false;
        });
      });
      commit('UPDATE_TODO', res.data);
      commit('UPDATE_PAGE', res.headers['x-total-pages']);
      commit('UPDATE_LOADING', false);
    }).catch(() => {
      user.signOut();
    });
  },
  async searchTodo({ commit, state }, { inputSearch, page }) {
    commit('UPDATE_LOADING', true);
    try {
      await axios.get(`/api/v1/todos/search?q=${inputSearch}&limit=5&page=${page}`, {
        headers: {
          Authorization: `${state.token}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        res.data.forEach((element) => {
          element.items.forEach((item) => {
            item.editItemStatus = false;
          });
        });
        commit('UPDATE_TODO', res.data);
        commit('UPDATE_PAGE', res.headers['x-total-pages']);
        commit('UPDATE_LOADING', false);
      });
    } catch (error) {
      user.signOut();
    }
  },
  async addTodo({ commit, dispatch }, titleToDo) {
    commit('UPDATE_LOADING', true);
    try {
      await axios.post('/api/v1/todos', {
        title: titleToDo,
      }, {
        headers: {
          Authorization: `${state.token}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log(res.data);
        dispatch('loadTodo', 1);
        commit('UPDATE_LOADING', false);
      });
    } catch (error) {
      user.signOut();
    }
  },
  async deleteTodo({ commit, dispatch }, data) {
    commit('UPDATE_LOADING', true);
    await axios.delete(`/api/v1/todos/${data.id}`,
      {
        headers: {
          Authorization: `${state.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch('loadTodo', data.page);
        commit('UPDATE_LOADING', false);
      })
      .catch(() => {
        user.signOut();
      });
  },
  async updateItem({ commit, dispatch }, data) {
    commit('UPDATE_LOADING', true);
    await axios.put(`/api/v1/todos/${data.todoId}/items/${data.itemId}`, {
      content: data.itemContent,
    }, {
      headers: {
        Authorization: `${state.token}`,
        'Content-Type': 'application/json',
      },
    }).then(() => {
      console.log('load khi save');
      dispatch('loadTodo', 1);
      commit('UPDATE_LOADING', false);
    }).catch(() => {
      user.signOut();
    });
  },
};

const mutations = {
  UPDATE_TODO(state, todos) {
    state.todos = todos;
  },
  UPDATE_PAGE(state, totalPage) {
    state.totalPage = totalPage;
  },
  UPDATE_TOKEN(state, token) {
    state.token = token;
  },
  UPDATE_LOADING(state, status) {
    state.loading = status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
