import axios from 'axios';

const state = {
    isLoggedIn:false,
    userDetails:{

    }
}

const mutations = {
    setLoggedIn(state,payload){
        state.isLoggedIn = payload;
    }
}

const getters = {
    loggedIn(state){
        return state.isLoggedIn
    }
}

const actions = {
    loginUser(ctx,payload){
        return new Promise((resolve)=>{
            axios
          .post("http://localhost:8000/api/login", payload)
          .then(response => {
            localStorage.setItem("token", response.data);
            ctx.commit('setLoggedIn',true);
            resolve(response)
            console.log(response.data);
          });
        })
        .catch((error) => {
            console.log(error)
            // reject (error)
        })
    },
    logoutUser(ctx){
        return new Promise((resolve)=>{
            localStorage.removeItem('token');
            ctx.commit('loginUser',false);
            resolve(true);
        })
    },
    setLoggedInState(ctx){
        return new Promise((resolve)=> {
            if(localStorage.getItem('token')){
                ctx.commit('setLoggedIn',true);
                resolve(true);
            }else {
                ctx.commit('setLoggedIn',false);
                resolve(true);
            }
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}