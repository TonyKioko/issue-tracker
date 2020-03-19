import axios from '../../axios';

export default {
    loginUser(ctx,payload){
        return new Promise((resolve,reject)=>{
            axios
          .post("login", payload)
          .then((response) => {
              if(response.data.access_token){

                  localStorage.setItem("token", response.data);
                  ctx.commit('setLoggedIn',true);
                  resolve(response)
                  console.log(response.data);
              } else {
                reject(response)
              }
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
    },
    forgotPassword(ctx,payload){
        return new Promise((resolve,reject)=>{
            axios
          .post("forgot-password", payload)
          .then(response => {
              resolve(response)
          })
          .catch((error)=>{
            reject(error)
          });
        })
        .catch((error) => { 
            console.log(error)
            // reject (error)
        })
    },
    resetPassword(ctx,payload){
        return new Promise((resolve,reject)=>{
            axios
          .post("reset-password", payload)
          .then(response => {
              resolve(response)
          })
          .catch((error)=>{
            reject(error)
          });
        })
        .catch((error) => { 
            console.log(error)
            // reject (error)
        })
    }
}