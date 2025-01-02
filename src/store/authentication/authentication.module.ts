// action types
export const VERIFY = "Authentication/Verify";

// mutation types
const state  = {
};

const getters = {
};

const actions = {
  Verify(context: any, payload: any) {
    const user = localStorage.getItem("user");
    if(user === null)
      return false;
    return true;
  }
};

const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
