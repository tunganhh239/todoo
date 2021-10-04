import axios from 'axios';
// import user from '@/services/user.js';

const state = {
  todos: [],
  token: '',
  // token: '' || user.userAuthToken(),
};

const getters = {
  todos(state) {
    return state.todos;
  },
};

const actions = {
  async loadTodo({ commit, state }) {
    console.log(state);
    await axios.get('/api/v1/todos', {
      headers: {
        Authorization: `${state.token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data);
      res.data.forEach((element) => {
        element.items.forEach((item) => {
          item.editItemStatus = false;
        });
      });
      commit('UPDATE_TODO', res.data);
    });
  },
  async addTodo({ dispatch }, titleToDo) {
    await axios.post('/api/v1/todos', {
      title: titleToDo,
    }, {
      headers: {
        Authorization: `${state.token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data);
      dispatch('loadTodo');
    });
  },
  async deleteTodo({ dispatch }, id) {
    await axios.delete(`/api/v1/todos/${id}`,
      {
        headers: {
          Authorization: `${state.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch('loadTodo');
      });
  },
  async updateItem({ dispatch }, data) {
    await axios.put(`/api/v1/todos/${data.todoId}/items/${data.itemId}`, {
      content: data.itemContent,
    }, {
      headers: {
        Authorization: `${state.token}`,
        'Content-Type': 'application/json',
      },
    }).then(() => {
      console.log('load khi save');
      dispatch('loadTodo');
    });
  },
};

const mutations = {
  UPDATE_TODO(state, todos) {
    state.todos = todos;
  },
  UPDATE_TOKEN(state, token) {
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
