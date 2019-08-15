<template>
  <div>
    <md-card class="md-alignment-center-center my-card" md-with-hover>
        <md-card-header>
          <div class="md-title">Payments</div>
          <div class="md-subhead">Select a payment option</div>
        </md-card-header>

        <md-card-content>
          <br>
          
          <div>
            <!-- <md-radio v-model="role" value="sc" v-on:change="changeRole"><strong>Service Center</strong></md-radio> -->
            <md-button class="md-raised md-primary" :to="{name: 'Post', params: {overdue: false}}"><strong>Current Payment</strong></md-button>
            <br>
            <br>
            <md-button class="md-raised md-primary" :to="{name: 'Post', params: {overdue: true}}"><strong>Overdue Payments</strong></md-button>
            <br>
            <br>
            <md-button class="md-raised md-primary" :to="{name: 'Get'}"><strong>View Payment History</strong></md-button>
          </div>
          
          <br>
        </md-card-content>
    </md-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    role: null
  }),
  mounted () {
    if (localStorage.getItem('role')) {
      this.role = localStorage.getItem('role')
    }
  },
  methods: {
    changeRole () {
      localStorage.setItem('role', this.role)
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-card {
    margin-top: 40px;
    width: 250px;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 20px;
  }
</style>