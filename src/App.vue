<template>
  <div id="app">
    <div class="header clear-float">
      <div class="header-nav-left left">
        <a href="#">
          <img src="./assets/logo.png" alt="logo">
        </a>
      </div>
      <div class="header-nav-right right">
        <a href="#" class="user" >
          <img src="./assets/user.png" alt="">
          user
        </a>
        <router-link to="/car" class="shoppingcar">
          <span class="count" v-show=countIsShow>{{addProductsCount}}</span>
          <img src="./assets/shoppingcar.png" alt="">
          car
        </router-link>
      </div>
    </div>
    <router-view/>
    <div class="footer">
      <p>this is by Ji-ppp</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    addProductsCount(){
      return this.$store.state.car.addListCount.reduce((result,item)=>{
          return item + result;
      },0)
    },
    countIsShow(){
      if(this.addProductsCount === 0){
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>

<style>
/* footer样式 */

.footer {
  height: 30px;
  margin-top: 30px;
  font-weight: 300;
}
</style>
