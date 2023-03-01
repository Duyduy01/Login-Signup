<template>
  <div id="app">
    <div class="row1">
      <div class="col-md-6 offset-md-3">
        <div id="login-signup">
          <div class="form-heading">
            <h3>Signup</h3>
            <hr />
          </div>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form @submit.prevent="onSignup()">
            <div class="form-group">
              <input 
                placeholder="Email"
                type="text" 
                class="form-control"
                v-model.trim="email"
              />
              <div class="error" v-if="errors.email">
                {{ errors.email }}
              </div>
            </div>
            <div class="form-group">
              <input
                placeholder="Password"
                type="password"
                class="form-control"
                v-model.trim="password"
              />
              <div class="error" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>

            <div class="my-3">
              <button type="submit" class="btn btn-primary">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupValidations from '../services/SignupValidations';
import { mapActions, mapMutations } from 'vuex';
import { SIGNUP_ACTION, LOADING_SPINNER_SHOW_MUTATION } from '../store/storeconstants';

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

    ...mapActions('auth', {
      signup: SIGNUP_ACTION,
    }),

    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onSignup() {
      let validations = new SignupValidations(
        this.email,
        this.password,
      );

      this.errors = validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false;
      }
      //make spinner true
      this.showLoading(true);
      //signup registration
      await this.signup({ 
        email: this.email, 
        password: this.password 
      }).catch((error) => {
        this.error = error;
        this.showLoading(false);
      });
      //make spinner false
      this.showLoading(false);
    },
  },
};
</script>

<style lang="css" scoped>
#app {
  background: url('../assets/bgr.jpg');
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