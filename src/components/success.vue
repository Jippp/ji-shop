<template>
    <div class="success">
        <div class="notice">
            <p>付款成功!我们将尽快发货，请耐心等待</p>
            <div class="icon"></div>
        </div>
        <router-link to="/" @click.native="clearStep">返回首页</router-link>
    </div>
</template>

<script>
export default {
    methods:{
        clearStep(){
            this.$store.commit("car/clearStep")
        }
    }
}
</script>

<style>

</style>
