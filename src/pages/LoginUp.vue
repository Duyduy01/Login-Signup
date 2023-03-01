<template>
  <div id="app">
    <div class="row1">
      <div class="col-md-6 offset-md-3">
        <div id="login-signup">
          <div class="form-heading">
            <h3>Login {{ firstname }}</h3>
            <hr />
          </div>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form @submit.prevent="onLogin()">
            <div class="form-group">
              <input
                placeholder="Email" 
                type="text"
                class="form-control"
                v-model.trim="email"
              />
              <!-- <div class="error" v-if="errors.email">
                {{ errors.email }}
              </div> -->
            </div>
            <div class="form-group">
              <input 
                placeholder="Password"
                type="password" 
                class="form-control"
                v-model.trim="password" 
              />
              <!-- <div class="error" v-if="errors.password">
                {{ errors.password }}
              </div> -->
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
// import {mapState} from 'vuex';
import SignupValidations from '../services/SignupValidations';
import { LOGIN_ACTION,LOADING_SPINNER_SHOW_MUTATION } from '../store/storeconstants';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      error: '',
    };
  },
  methods: {

    ...mapActions('auth',{
      login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onLogin() {
      // check the validations
      let validations = new SignupValidations(
        this.email, 
        this.password,
      );
      
      this.errors = validations.checkValidations();
      if(this.errors.length) {
        return false;
      }
      this.error ='';

      this.showLoading(true);
      //login check
      try {
        await this.login({
          email: this.email, 
          password: this.password,
        });
      } catch(e) {
        this.error = e;
        this.showLoading(false);
      }

      this.showLoading(false);
      this.$router.push('/posts');
    },
  },
};
</script>

<style lang="css" scoped>
#app {
  background-image: url('../assets/bgrlogin.jpg');
  filter: brightness(0.8);
  background-size: cover;
  z-index: -999;
  position: fixed;
  top: 0;
  left: 0;
}

.row1 {
  height: 100%;
    width: 100%;
    position: relative;
    display: grid;
    justify-items: center;
}

.col-md-6 {
  position: absolute;
  margin: 0;
  top: 25%;
  display: grid;
  justify-items: center;
}

</style>