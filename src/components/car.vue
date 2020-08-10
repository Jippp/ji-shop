<template>
    <div class="settle clear-float">
        <div class="process">
            <div class="first process-item processitemActive">
                <div class="line"></div>
                <div class="icon"></div>
                <div class="desc">Shopping Cart</div>
            </div>
            <div class="second process-item" :class="{processitemActive: paymentActive}">
                <div class="line"></div>
                <div class="icon"></div>
                <div class="desc">Payment</div>
            </div>
            <div class="third process-item" :class="{processitemActive: paymented}">
                <div class="icon"></div>
                <div class="desc">Confirmation</div>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    computed:{
        paymentActive(){
            return this.$store.state.car.paymentActive;
        },
        paymented(){
            return this.$store.state.car.paymented;
        }
    }
}
</script>

<style>

</style>
