import axios from 'axios';
import user from '@/services/user.js';

const state = {
  authenticated: false,
};

const getters = {
  authenticated(state) {
    return state.authenticated;
  },
};

const actions = {
  // async SignUp({dispatch},form) {
  //   await axios.post('/auth/signup',form);
  //   let formData = new FormData();
  //   formData.append('email',form.email);
  //   formData.append('password',form.password);

  // },
  async signIn({ dispatch }, form) {
    await axios.post('/auth/signin', {
      email: form.email,
      password: form.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        user.updateUserData(res.data);
        console.log(res.data);
      });
    await dispatch('updateAuthenticateStatus', true);
  },
  async signUp({ dispatch }, form) {
    await axios.post('/auth/signup', {
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        user.updateUserData(res.data);
        console.log(res.data);
      });
    await dispatch('updateAuthenticateStatus', true);
  },
  updateAuthenticateStatus({ commit }, status) {
    console.log(status);
    commit('UPDATE_AUTHENTICATE_STATUS', status);
  },
};

const mutations = {
  UPDATE_AUTHENTICATE_STATUS(state, status) {
    state.authenticated = status;
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
