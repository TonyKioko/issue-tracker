<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain width="40" />
      </div>

      <v-spacer></v-spacer>

      <v-btn>
        <span class="mr-2" v-if="loggedIn">
          <v-btn small @click="logout">Log out</v-btn>
        </span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar v-model="snackbar.show" v-for="(snackbar,index) in notifications" :key="index">
      {{ snackbar.text }}
      <v-btn color="pink" text @click="removeNotification(index)">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data() {
    return {
      // loggedIn:false
    };
  },
  created() {
    this.checkUserState();
    // if(localStorage.getItem('token')){
    //   this.loggedIn = true
    // }
  },
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
      notifications: "application/notifications"
    })
    // loggedIn(){
    //   return this.$store.getters['user/loggedIn']
    // }
  },
  methods: {
    ...mapActions({
      logoutUser: "user/logoutUser",
      checkUserState: "user/setLoggedInState",
      removeNotification: "application/removeNotification",
      addNotification: "application/addNotification"
    }),
    logout() {
      // localStorage.removeItem('token');
      // this.$store.dispatch('user/logoutUser')
      this.logoutUser().then(() => {
        this.addNotification({
          show: true,
          text: "Logged out!"
        });
        this.$router.push({
          name: "login"
        });
      });
    }
  }
};
</script>
