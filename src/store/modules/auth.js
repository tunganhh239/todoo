import axios from 'axios';
import user from '@/services/user.js';

const state = {
  authenticated: false,
  email: '',
};

const getters = {
  authenticated(state) {
    return state.authenticated;
  },
  emailUser(state) {
    return state.email;
  },
};

const actions = {
  // async SignUp({dispatch},form) {
  //   await axios.post('/auth/signup',form);
  //   let formData = new FormData();
  //   formData.append('email',form.email);
  //   formData.append('password',form.password);

  // },
  async signIn({ dispatch, commit }, form) {
    await axios.post('/auth/signin', {
      email: form.email,
      password: form.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        user.updateUserAuthToken(res.data.auth_token);
        console.log(res.data.auth_token);
        user.updateUserData(res.data.email);
      });
    await commit('UPDATE_AUTHENTICATE_EMAIL', user.userData());
    await dispatch('updateAuthenticateStatus', true);
  },
  async signUp({ dispatch, commit }, form) {
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
        user.updateUserData(res.data.email);
        user.updateUserAuthToken(res.data.auth_token);
      });
    await commit('UPDATE_AUTHENTICATE_EMAIL', user.userData());
    await dispatch('updateAuthenticateStatus', true);
    // await commit('UPDATE_AUTHENTICATE_EMAIL',res.data)
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
  UPDATE_AUTHENTICATE_EMAIL(state, email) {
    state.email = email;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
