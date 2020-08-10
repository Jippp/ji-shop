<template>
    <div>
        <div class="empty" v-show="!isEmpty">
            <h2>Your cart is EMPTY.</h2>
            <div class="back">
                <router-link to="/">add cart</router-link>
            </div>
        </div>
        <div class="show" v-show="isEmpty">
            <transition-group  name="fade" tag="ul">
                <li class="car-item clear-float" v-for="item in addList" :key="item.id">
                    <div class="preview left">
                        <img :src="item.imgSrc" alt="">
                    </div>
                    <div class="detail">
                        <div class="title-name">{{item.productName}}</div>
                        <div class="computed">{{item.count}} x ￥{{item.price}} = ￥{{item.count * item.price}}</div>
                        <div class="control">
                            <div class="delete" title="删除该商品" @click="deleteProduct($event,item.id)"></div>
                            <div class="add" @click="addProduct($event,item.id)"></div>
                            <div class="de" @click="deProduct($event,item.id)"></div>
                        </div>
                    </div>
                </li>
            </transition-group>
            <div class="total left">
                Total: ￥{{totalPrice}}
            </div>
            <router-link tag="div" to="/car/payment" @click.native="nextStep" class="right next">
                > Next
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        addList(){
            return this.$store.state.car.addList
        },
        isEmpty(){
            if(this.$store.state.car.addList.length === 0){
                return false;
            }else{
                return true;
            }
        },
        totalPrice(){
            return this.addList.reduce((result,item)=>{
                return result + item.count * item.price
            },0)
        }
    },
    methods:{
        deleteProduct(e,id){
            let index = undefined;
            this.addList.forEach((item,i)=>{
                if(item.id === id){
                    index = i
                    return;
                }
            });
            this.$store.commit("car/deleteAddList",{index})
        },
        addProduct(e,id){
            let index = undefined;
            this.addList.forEach((item,i)=>{
                if(item.id === id){
                    index = i
                    return;
                }
            });
            this.$store.commit("car/addProduct",{index})
        },
        deProduct(e,id){
            let index = undefined;
            this.addList.forEach((item,i)=>{
                if(item.id === id){
                    index = i
                    return;
                }
            });
            this.$store.commit("car/deProduct",{index})
        },
        nextStep(){
            this.$store.commit("car/nextStep");
        }
    }
}
</script>
<style>
.fade-leave{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
}
.fade-leave-active{
    transition: all 300ms;
}
</style>