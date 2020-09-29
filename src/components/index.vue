<template>
  <div class="wrap">
    <div class="main">
      <div class="main-title">
        <span class="initials">Welcome</span>
        <span class="title">to my market!</span>
        <p>this is my first market html</p>
      </div>
      <div class="main-content clear-float">
        <div class="main-content-sidebar left">
          <div class="price-bar silder-item clear-float">
            <p>Highest Price: ￥{{filterPrice}}</p>
            <filter-price></filter-price>
            <p class="min left">0</p>
            <p class="max right">{{maxPrice}}</p>
          </div>
          <div class="control-show silder-item">
            <label class="ifSale" :class="{active: isActive}" @click="saleActive($event)">Only Sale</label>
            <input type="checkbox"> 
          </div>
          <div class="categories silder-item">
            <label>Categories</label>
            <div class="select">
              <select name="" id="" @change="selectList($event)">
                <option value="all" >all</option>
                <option value="shoe">shoe</option>
                <option value="jacket">jacket</option>
                <option value="sweater">sweater</option>
                <option value="hats">hats</option>
                <option value="sock">sock</option>
                <option value="overcoat">overcoat</option>
                <option value="shirt">shirt</option>
              </select>
            </div>
          </div>
          <div class="special silder-item">
            <h3>Special Sale!</h3>
            <p>Shop now because half our items are greatly reduced</p>
          </div>
          <div class="contact silder-item">
            <h3>Contact Us</h3>
            <p>
              Call me at 1xx-xxxx-xxx, i'm happy to be of service.
            </p>
          </div>
        </div>
        <div class="main-content-show">
          <transition-group name="waterfall" tag="ul" duration="800ms">
            <li class="product-item" v-for="item in filteredProductsList" :key="item.id">
              <img :src="item.imgSrc" alt="" class="product-preview">
              <div class="product-des clear-float">
                <div class="left">
                  {{item.productName}}
                  <p>￥{{item.price}}</p>
                </div>
                <div :id="item.id" class="right shopping-car" @click="addCar($event)">
                </div>
              </div>
            </li> 
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import filterPrice from "@/components/filterPrice"

export default {
  data(){
    return{
      productsList: [],
      activeList: [],
      maxPrice: 0,
      isActive: false
    }
  },
  computed:{
    filterRatio(){
      return this.$store.state.filter.filterRatio
    },
    filterPrice(){
      return parseInt(this.filterRatio * this.maxPrice);
    },
    filteredProductsList(){
      return this.activeList.filter((item,index) => {
        if(Number(item.price) <= this.filterPrice){
          return item;
        }
      })
    }
  },
  methods:{
    saleActive(){
      this.isActive = !this.isActive;
      if(this.isActive){
        this.activeList = this.filteredProductsList.filter((item) => {
          if(item.isSale) {
            return item
          }
        })
      }else{
        this.activeList = this.productsList;
      }
    },
    selectList(e){
      let type = e.target.value;
      if(type === "all"){
        this.activeList = this.productsList;
      }else{
        this.activeList = this.productsList.filter((item)=>{
          if(item.type === type){
            return item
          }
        })
      }
    },
    addCar(e){
      let productId = e.target.id;
      let addList = this.productsList.filter((item)=>{
        return item.id === productId;
      })
      console.log(addList);
      this.$store.dispatch("car/getAddListAction",{addList: addList[0]})
    }
  },
  created(){
    axios.get("https://easy-mock.com/mock/5f21721574a4ec373ea6b039/").then((data) => {
      this.activeList = this.productsList = data.data.data;
      let priceList = this.productsList.map((item) => {
        return Number(item.price);
      });
      this.maxPrice = Math.max(...priceList);
      this.$store.dispatch("getMaxPriceAction",{maxPrice: this.maxPrice});
    },function(err){
      console.error(err);
    });
  },
  components:{
    filterPrice
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.waterfall-enter {
    opacity: 0;
}

.waterfall-enter-to {
    opacity: 1;
}

.waterfall-enter-active {
    transition: all 300ms;
}

.waterfall-leave {
    opacity: 1;
}

.waterfall-leave-to {
    opacity: 0;
}

.waterfall-leave-active {
    transition: all 300ms;
}
</style>
