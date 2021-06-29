<template>
    <div class="payment">
        <p class="choose">选择付款方式：</p>
        <div class="weixin" @click="wxPayMethod">微信支付</div>
        <div class="zhifubao" @click="zfbPayMethod">支付宝支付</div>
        <div class="qrcode" :class="[{zfbPay: zfbPay},{wxPay: wxPay}]"></div>
        <div class="desc">
            拿出手机，打开
            <span class="wx-method" v-show="isWxPay">微信</span>
            <span class="zfb-method" v-show="isZfbPay">支付宝</span>
            扫一扫
        </div>
        <div class="test">
            <p>输入 {{totalPrice}}回车 即可付款成功</p>
            <input type="text" @keydown.enter="isSuccess($event)">
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            isWxPay: false,
            isZfbPay: true,
            wxPay: false,
            zfbPay: true
        }
    },
    computed:{
        addList(){
            return this.$store.state.car.addList
        },
        totalPrice(){
            return this.addList.reduce((result,item)=>{
                return result + item.count * item.price
            },0)
        }
    },
    methods:{
        wxPayMethod(){
            this.isWxPay = true;
            this.isZfbPay = false;
            this.wxPay = true;
            this.zfbPay = false;
        },
        zfbPayMethod(){
            this.isWxPay = false;
            this.isZfbPay = true;
            this.wxPay = false;
            this.zfbPay = true;
        },
        isSuccess(e){
            if(Number(e.target.value) === this.totalPrice){
                this.$store.commit("car/isSuccess");
                this.$router.push("/car/success");
                this.$store.commit("car/clearAddList");
            }else{
                e.target.value = ""
            }
        }
    }
}
</script>

<style>

</style>
