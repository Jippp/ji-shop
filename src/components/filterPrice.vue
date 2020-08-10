<template>
    <div class="input">
        <div class="point"
        @mousedown="mousedown($event)"
        @mousemove="moveFlag && mousemove($event)"
        @mouseup="mouseup"
        @mouseleave="mouseup"></div>
    </div>
</template>

<script >
export default {
    data(){
        return {
            curLeft: 0,
            moveFlag: false
        }
    },
    computed:{
        maxLen(){
            return this.len - this.pointSize;
        }
    },
    methods:{
        mousedown(e){
            this.moveFlag = true;
            this.lastX = e.clientX;
            this.curLeft = e.target.offsetLeft;
            let getLenFlag = true;
            if(getLenFlag){
                this.len = e.target.parentElement.offsetWidth;
                this.pointSize = e.target.offsetWidth;
                getLenFlag = false;
            }
        },
        mousemove(e){
            let disLeft = e.clientX - this.lastX;
            e.target.style.left = this.curLeft + disLeft + 'px';
            this.curLeft = e.target.offsetLeft;
            if(this.curLeft <= 0){
                e.target.style.left = 0;
                this.curLeft = 0;
            }else if(this.curLeft >= this.maxLen){
                e.target.style.left = this.maxLen + 'px';
                this.curLeft = this.len;
            }
            this.lastX = e.clientX;
        },
        mouseup(){
            this.moveFlag = false;
        }
    },
    watch:{
        curLeft: function(){
            let filterRatio = this.curLeft / this.len;
            this.$store.dispatch("filter/getFilterRatioAction",{filterRatio});
        }
    }
}
</script>

<style>
</style>