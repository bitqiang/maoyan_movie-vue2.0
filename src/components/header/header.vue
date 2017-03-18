<template>
<div>
  <div class="v-header">
    <div class="v-logo">
      <img src="../../assets/logo.png" alt="logo">
      <div class="v-title"> 
        <h3>猫眼电影</h3>
        <p>查影讯上bitqiang</p>
      </div>
    </div>
    <div class="search" @click="search">
      <input type="text" placeholder="请输入搜索的电影" v-model.trim="msg">
    </div>
  </div>
  <div class="v-nav">
    <router-link to='/showNow' class="v-nav-title">正在上映</router-link>
    <router-link to='/showFuture' class="v-nav-title">即将上映</router-link>
  </div>
</div>

</template>

<script>
  export default {
    data(){
      return{
        msg: ''
      }
    },
    methods: {
      search:function () {
        // body...
        this.$router.push({path:'/search'})
      }
    }
}
</script>

 
<style scoped>
.v-header {
  display: flex;
  justify-content: space-between;
  background: #f2f2f2;
}
.v-header .v-logo{
    display: flex;
}
.v-logo img{
    margin-top: 10px;
    margin-left: 10px; 
    width: 40px;
    height: 40px;
}
.v-logo h3{
    margin-top: 5px;
    margin-left: 3px;
    font-size: 18px;
    font-weight: bold;
}
.v-logo p{
    margin-top: -5px;
    margin-left: 5px;
}
.search input{
    margin-top: 9px;
    margin-right: 42px;
    padding:3px;
    width: 105px;
    height: 25px;
    border:0;
    border-radius: 10px;
    background: #e6e6e6;
    text-align: center;
}
.v-nav{
  display: flex;
  justify-content: space-around;
  height: 30px;
  background: #000;
}
.v-nav-title{
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}




</style>