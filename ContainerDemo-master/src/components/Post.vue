<template>
     <div class="container">
        <div class="col-6 offset-3">
            <br>
            <br>
            <div class="card bg-dark">
                <div class="card-header">Payment Information</div>
                <div class="card-body">
                    <div class="alert alert-success" v-if="nonce">
                        Payment was successful.
                    </div>
                    <div class="alert alert-danger" v-if="error">
                        {{ error }}
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="amount">Child Support Fee</label>
                            <div>
        <md-card-content>
                <div v-if="isOverDue">
                    Amount Due: $860
                </div>

                <div v-else>
                    Amount Due: $430
                </div>
            </md-card-content>
            <md-card-content>
                <div v-if="isOverDue">
                    Payment(s) overdue from: (7-5-2019), (6-5-2019)
                </div>
                
                <div v-else>
                    Payment due at 11:59 P.M. on 8-5-2019
                </div>
            </md-card-content>
                         </div>
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                                <input type="number" id="amount" v-model="amount" class="form-control" placeholder="Enter Amount">
                            </div>
                        </div>
                         <hr />
                        <div class="form-group">
                            <label>Card Number</label>
                            <div id="creditCardNumber" class="form-control"></div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-6">
                                    <label>Expire Date</label>
                                    <div id="expireDate" class="form-control"></div>
                                </div>
                                <div class="col-6">
                                    <label>CVV</label>
                                    <div id="cvv" class="form-control"></div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">Pay with Card</button>
                        <hr />
                        <div id="paypalButton"></div>
                    </form>
                </div>
            </div>

            <br>

            <md-card>
            
            <div>
          <md-button class="md-raised" @click="ledger()">View Payment History</md-button>
        </div>
            </md-card>
        </div>
    </div>
    
</template>

<script>
import braintree from 'braintree-web';
import paypal from 'paypal-checkout';
import { localstorage } from './mixins/localstorage'
import ethers from 'ethers'
import simbaApi from './gateways/simba-api'

export default {
    data() {
        return {
            isOverDue: false,
            hostedFieldInstance: false,
            nonce: "",
            error: "",
            amount: 100
        }
    },

    methods: {
        ledger() {
        this.$router.push('Get') 
      
    },
        payWithCreditCard() {
            if(this.hostedFieldInstance)
            {
                this.error = "";
                this.nonce = "";

                this.hostedFieldInstance.tokenize().then(payload => {
                    //console.log(payload);
                    this.convertData(payload);
                    this.nonce = payload.nonce;
                })
                .catch(err => {
                    console.error(err);
                    this.error = err.message;
                })
            }
        },
        convertData(payload) {
            let formData = new FormData()
            formData.append('payee', payload.details.lastFour)
            formData.append('amount', this.amount)
            formData.append('from', '0x7086f823b385bed4c677D72bFDAe412632adE1BD')
            formData.append('assetId', '123')

            let self = this
            try {
                simbaApi.postData('payCurrent/', formData).then(function (res) {
                    console.log(res)
                    self.sendTxn(res.data.payload.raw, res.data.id)
                })
            } catch (e) {
                console.log(e)
            }

            console.log(payload)
        },
        sendTxn(data, txnId) {
            let wallet = ethers.Wallet.fromMnemonic(restoreSeed)
            console.log(wallet)
            let signedTxn = wallet.sign(data)
            console.log(signedTxn)

            let payload = {
                'payload': signedTxn
            }
            try {
                simbaApi.signTxn('transaction/' + txnId + '/', payload).then(function () {
                    console.log('ok')
                })
            } catch (e) {
                console.log(e)
            }


        }
    },

    mounted() {
        if (this.$route.params.overdue) {
            this.isOverDue = true
        } else {
            this.isOverDue = false
        }
        braintree.client.create({
            authorization: "sandbox_93smtrz3_bbgx4xf7h8bx24xg"
        })
        .then(clientInstance => {
            let options = {
                client: clientInstance,
                styles: {
                    input: {
                        'font-size': '14px',
                        'font-family': 'Open Sans'
                    }
                },
                fields: {
                    number: {
                        selector: '#creditCardNumber',
                        placeholder: 'Enter Card'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: 'Enter CVV'
                    },
                    expirationDate: {
                        selector: '#expireDate',
                        placeholder: '00 / 0000'
                    }
                }
            }

            return Promise.all([
                braintree.hostedFields.create(options),
                braintree.paypalCheckout.create({ client: clientInstance })
            ])

        })
        .then(instances => {

            const hostedFieldInstance    = instances[0];
            const paypalCheckoutInstance = instances[1];

            this.hostedFieldInstance = hostedFieldInstance;

                return paypal.Button.render({
                    env: 'sandbox',
                    style: {
                        label: 'paypal',
                        size: 'responsive',
                        shape: 'rect'
                    },
                    payment: () => {
                        return paypalCheckoutInstance.createPayment({
                                flow: 'checkout',
                                intent: 'sale',
                                amount: parseFloat(this.amount) > 0 ? this.amount : 10,
                                displayName: 'Braintree Testing',
                                currency: 'USD'
                        })
                    },
                    onAuthorize: (data, options) => {
                        return paypalCheckoutInstance.tokenizePayment(data).then(payload => {
                            console.log(payload);
                            this.error = "";
                            this.nonce = payload.nonce;
                        })
                    },
                    onCancel: (data) => {
                        console.log(data);
                        console.log("Payment Cancelled");
                    },
                    onError: (err) => {
                        console.error(err);
                        this.error = "An error occurred while processing the paypal payment.";
                    }
                }, '#paypalButton')
        })

        .catch(err => {

        });

    }
}

</script>

<style>
    body {
        padding: 20px;
    }
</style>