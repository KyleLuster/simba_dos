<template>
  <div class="page-container unselectable">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary tool-bar">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title unselectable car">Child Support Payment</span>
          </div>
        <md-button class="md-raised" @click="logout()">Logout</md-button>
          <div class="md-toolbar-section-end">
            <span>
              <md-button class="md-icon-button" @click="showWallet(true)">
                <span v-if="hasWallet">
                  <md-icon style="color: #00c853;">account_balance_wallet</md-icon>
                </span>
                <span v-else>
                  <md-icon>account_balance_wallet</md-icon>
                </span>
              </md-button>
              <md-tooltip md-delay="500" md-direction="left">Wallet</md-tooltip>
            </span>
          </div>

          <md-dialog class="wallet" :md-click-outside-to-close=false :md-active.sync="isWallet">
            <md-toolbar class="md-accent md-dense">
              <h3 class="md-title" style="flex: 1">Ethereum Wallet</h3>
                <md-button class="md-icon-button" @click="setWalletStatus('close')">
                  <md-icon>close</md-icon>
                </md-button>
            </md-toolbar>

            <div v-if="isCreate">
              <div class="wallet-content">
                <div class="md-subheading">
                  Create a new Ethereum Account
                </div>
                <br>
                <br>
                <br>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button class="md-accent" @click="setWalletStatus('restore')">Restore</md-button>
                <md-button class="md-accent md-raised" @click="createWallet()">Create</md-button>
              </md-dialog-actions>
            </div>

            <div v-if="isRestore">
              <div class="wallet-content">
                <div class="md-subheading">
                  Restore your Ethereum Account with Seed
                </div>
                <br>
                <div class="md-caption">
                  Please type your seed (12 mnemonic words) to restore
                </div>
                <div class="md-layout-item md-size-70">
                  <md-field>
                    <label>Wallet Seed</label>
                    <md-textarea md-autogrow v-model="restoreSeed"></md-textarea>
                  </md-field>
                </div>
                <br>
                <br>
                <br>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button class="md-accent" @click="setWalletStatus('create')">Create</md-button>
                <md-button class="md-accent md-raised" @click="restoreWallet()">Restore</md-button>
              </md-dialog-actions>
              <md-snackbar :md-active.sync="invalidSeed">The seed is invalid, please check again!!!</md-snackbar>
            </div>

            <div v-if="isUnlock">
              <div class="wallet-content">
                <div class="md-subheading">
                  Unlock Your Account
                </div>
                <br>
                <br>
                <br>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button @click="logoutWallet">Logout</md-button>
                <md-button class="md-accent md-raised" @click="unlockWallet">Unlock</md-button>
              </md-dialog-actions>
            </div>

            <div v-if="isCheck">
              <div class="wallet-content">
                <div class="md-subheading">
                  Ethereum Account Information
                </div>
                <br>
                <div class="md-layout-item md-size-90">
                  <md-field>
                    <label>Account Address</label>
                    <md-textarea md-autogrow v-model="accountAddress" readonly></md-textarea>
                  </md-field>
                </div>
                <!--div class="md-layout-item md-size-90">
                  <md-field>
                    <label>Account Balance in Rinkeby TestNet</label>
                    <md-input v-model="accountBalance" readonly></md-input>
                  </md-field>
                </div-->
                <div v-if="isRevealed">
                  <div class="md-layout-item md-size-90">
                    <md-field>
                      <label>Private Key</label>
                      <md-textarea md-autogrow v-model="accountPk" readonly></md-textarea>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-90">
                    <md-field>
                      <label>Seed</label>
                      <md-textarea md-autogrow v-model="accountSeed" readonly></md-textarea>
                    </md-field>
                  </div>
                </div>
              </div>
              <md-dialog-actions class="md-layout md-alignment-center-space-between">
                <md-button @click="logoutWallet">Logout</md-button>
                <md-button class="md-accent md-raised" @click="isRevealed = true">Reveal</md-button>
              </md-dialog-actions>
            </div>
          </md-dialog>
        </div>
        <!-- This portion controls the visibility of the tool bar -->
        <!-- <div class="md-toolbar-row">
          <md-tabs class="md-primary">    
            <md-tab id="Login" md-label="Login" to="Login"></md-tab>
            <md-tab id="Home" md-label="Home" to="Home"></md-tab>
            <md-tab id="Get" md-label="Payment History" to="Get"></md-tab>
          </md-tabs>
        </div> -->
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent avatar" md-elevation="0">
          <md-icon class="md-size-3x">track_changes</md-icon>
        </md-toolbar>
        <div class="md-subheading title">Child Support</div>
        <br>
        <md-list>
          <md-list-item href="https://app.simbachain.com/" target="_blank" @click="menuVisible = false">
            <md-icon>apps</md-icon>
            <span class="md-list-item-text">SIMBA&#8482; Dashboard</span>
          </md-list-item>

          <md-list-item href="https://simbachain.com/contact/" target="_blank" @click="menuVisible = false">
            <md-icon>contact_support</md-icon>
            <span class="md-list-item-text">Contact Us</span>
          </md-list-item>

        </md-list>
        <div class="md-layout love">
          <div>Made with</div>
          <div class="zoom"> &hearts; </div>
          <div>in South Bend</div>
        </div>
      </md-app-drawer>

      <md-app-content class="bg-color">
        <router-view class="conent">
        </router-view>
      </md-app-content>

    </md-app>
     <md-snackbar :md-active.sync="createdWallet">We just created a wallet for you, check it out at the right-top corner : )</md-snackbar>
     <md-snackbar :md-active.sync="depositedWallet">We deposited enough Ethers on this private network for you, just wait a while</md-snackbar>
  </div>
</template>

<style lang="scss" scoped>
  .bg-color {
    background-color: black;
  }
  .title {
    margin-left: 18px;
  }
  .zoom {
    color: #e25555;
    transition: transform .2s;
    margin-left:2px;
    margin-right:2px;
  }
  .zoom:hover {
    transform: scale(1.3);
  }
  .love {
    position: fixed;
    bottom: 20px;
    margin-left: 20px;
  }
  .avatar {
    margin-top:20px;
    margin-left:-60px;
  }
  .tool-bar {
    z-index: 100;
  }
  .md-app {
    height: 100vh;
  }
  .unselectable {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .wallet {
    min-width: 320px;
  }
  .wallet-content {
    margin: 20px;
  }
  small {
    display: block;
  }

</style>

<script>
import { localstorage } from './components/mixins/localstorage'
import manageApi from './components/gateways/manage-api'
import ethers from 'ethers'

export default {
  name: 'App',
  mixins: [localstorage],
  data: () => ({
    restoreSeed: null,
    invalidSeed: null,
    accountAddress: null,
    accountPk: null,
    accountSeed: null,
    // accountBalance: null,
    menuVisible: false,
    isRevealed: false,
    isWallet: false,
    isCreate: false,
    isRestore: false,
    isUnlock: false,
    isCheck: false,
    hasWallet: false,
    createdWallet: false,
    depositedWallet: false
  }),
  methods: {
    logout() {
      this.$router.push('Login')
    },
    setWalletStatus (status) {
      switch (status) {
        case 'create':
          this.isCreate = true
          this.isRestore = false
          this.isUnlock = false
          this.isCheck = false
          break
        case 'restore':
          this.isCreate = false
          this.isRestore = true
          this.isUnlock = false
          this.isCheck = false
          break
        case 'unlock':
          this.isCreate = false
          this.isRestore = false
          this.isUnlock = true
          this.isCheck = false
          break
        case 'check':
          this.isCreate = false
          this.isRestore = false
          this.isUnlock = false
          this.isCheck = true
          break
        case 'close':
          this.isCreate = false
          this.isRestore = false
          this.isUnlock = false
          this.isCheck = false
          this.isWallet = false
          this.cleanUp()
          break
      }
    },
    showWallet (status) {
      this.setWalletStatus('close')
      if (status) {
        this.isWallet = true
        this.getCurrentWallet()
      }
    },
    getCurrentWallet () {
      if (localStorage.getItem('keystore')) {
        this.isUnlock = true
        this.hasWallet = true
      } else {
        this.isCreate = true
        this.hasWallet = false
      }
    },
    createWallet () {
      const mnemonic = ethers.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16))
      this.setWallet(mnemonic)
      this.checkWallet(mnemonic)
      this.setWalletStatus('check')
      this.hasWallet = true
      this.cleanUp()
      this.depositAccount(mnemonic)
    },
    depositAccount (mnemonic) {
      let wallet = ethers.Wallet.fromMnemonic(mnemonic)
      let address = wallet.address
      let payload = {
        account: address,
        value: '100',
        currency: 'ether'
      }
      let self = this
      try {
        manageApi.requestFund('requestFunds/', payload).then(function () {
          self.depositedWallet = true
        })
      } catch (e) {
        console.log(e)
      }
    },
    restoreWallet () {
      const mnemonic = this.restoreSeed
      if (!ethers.HDNode.isValidMnemonic(mnemonic)) {
        this.invalidSeed = true
        this.cleanUp()
        return
      }
      this.invalidSeed = false
      this.setWallet(mnemonic)
      this.checkWallet(mnemonic)
      this.depositAccount(mnemonic)
      this.setWalletStatus('check')
      this.hasWallet = true
      this.cleanUp()
    },
    cleanUp () {
      this.restoreSeed = null
      this.isRevealed = false
    },
    unlockWallet () {
      if (this.getWallet()) {
        this.setWalletStatus('check')
        this.checkWallet(this.getWallet())
      } else {
        this.cleanUp()
      }
    },
    checkWallet (mnemonic) {
      let wallet = ethers.Wallet.fromMnemonic(mnemonic)
      this.setAddress(wallet.address)
      this.accountAddress = wallet.address
      this.accountPk = wallet.privateKey
      this.accountSeed = mnemonic
      // this.getBalance(wallet.address)
    },
    // getBalance (address) {
    //   let self = this
    //   let providers = ethers.providers
    //   let provider = providers.getDefaultProvider('rinkeby')
    //   provider.getBalance(address).then(function (balance) {
    //     let etherString = ethers.utils.formatEther(balance)
    //     self.accountBalance = etherString + ' ETH'
    //   })
    // },
    logoutWallet () {
      this.clean()
      this.setWalletStatus('create')
      this.hasWallet = false
    }
  },
  mounted () {
    if (!localStorage.getItem('keystore')) {
      this.createWallet()
      this.createdWallet = true
    }
    this.getCurrentWallet()
  }
}


</script>
