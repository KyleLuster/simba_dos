<template>
  <div>
    <div style="text-align: center;" class="md-layout md-gutter">
      <div class="md-layout-item md-large-size-25 md-medium-size-20 md-small-size-10 md-xsmall-size-0"></div>
      <md-card class="md-raised md-large-size-50 md-medium-size-60 md-small-size-80 md-xsmall-size-100 md-layout-item" id="card1">
        <div class="md-display-1">Log In</div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="username">Username</label>
              <md-input name="username" id="username" v-model="username"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="password">Password</label>
              <md-input type="password" name="password" id="password" v-model="password"/>
            </md-field>
          </div>
        </div>
        <div>
          <md-button class="md-accent md-raised" @click="submit()">Log In</md-button>
        </div>
      </md-card>
      <div class="md-layout-item md-large-size-25 md-medium-size-20 md-small-size-10 md-xsmall-size-0"></div>
    </div>
    <div class="errMessage" v-if="loggedIn">
      <div class="md-body-2">You are logged in!</div>
      
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import simbaApi from './gateways/simba-api'
import { localstorage } from './mixins/localstorage'

export default {
  name: 'Login',
  mixins: [localstorage],

  data () {
    return {
      username: null,
      password: null,
      loggedIn: false
    }
  },

  mounted () {
    
  },

  methods: {
    submit () {
      console.log(this.username)
      if (this.username == 'Kyle' && this.password == 'password') {
        console.log('submit')
        this.loggedIn = true
        this.$router.push('Home') 
      }
      
    }
  }
}
</script>

<style>
#card1 {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
  padding: 8px;
}

.errMessage {
  color: white;
  background-color: rgb(0, 255, 71);
  text-align: center;
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
  width: 50%;
  border-radius: 15px;
}
</style>
