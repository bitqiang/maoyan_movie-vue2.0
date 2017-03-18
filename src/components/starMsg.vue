<template>
  <div>
  <transition v-if='maoyan'></transition>  
    <div v-if="!maoyan">
      <!--   标题部分 -->
    <div class="header-title">
      <div class="back" @click='backLastPage'>
        <div></div>
      </div>
      <div class="title"> {{starMsg.name}}</div>
      <div class="back"></div>
    </div>

<!-- 明星资料 -->
    <div class="star-data">
      <img :src="starMsg.avatars.medium">
      <div class="data">
        <h3>影星资料</h3>
        <p>{{starMsg.name}}</p>
        <p>{{starMsg.name_en}}</p>
        <p>{{ starMsg.born_place}}</p>
        <p>{{ starMsg.gender}}</p>
      </div>
    </div>

<!-- 代表作品 -->
    <div class="production">
      <h2 v-if='starMsg.gender == "男" '>他的代表作品</h2>
      <h2 v-if='starMsg.gender == "女" '>她的代表作品</h2>
      <div class="production-data" v-for='item in starMsg.works' @click='movieMsg(item.subject.id)'>
          <img  :src='item.subject.images.small'>
          <div class="data">
            <p>{{item.subject.original_title}}</p>
            <p v-for='it in item.roles'>{{it}}</p>
            <p>{{item.subject.year}}</p>
            <star :score="item.subject.rating.average"></star>
            {{item.subject.rating.average}}分
              {{item.subject.collect_count}}人评价
          </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import transition from './transition'
import star from './star/star'
  export default {
    data () {
      return {
        maoyan:true,
        starMsg: {
          name: '',
          name_en: '',
          works: [
            {
              roles: [],
              subject: {
                rating: {
                  max: '',
                  average: ''
                },
                collect_count: '',
                original_title: '',
                title: '',
                images: {
                  small: '',
                  large: '',
                  medium: ''
                },
                alt: '',
                year: '',
                id: ''
              }
            }
          ],
          avatars: {
            small: '',
            large: '',
            medium: ''
          },
          alt: '',
          gender: '',
          id: '',
          born_place: ''
        }
      }
    },
    components:{
      star,
      transition
    },
        mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/celebrity/' + this.$route.params.id)
          .then(function (response) {
            this.maoyan = false
            this.starMsg = response.body
             console.log(response)
          })
          .catch(function (response) {
            console.log(response)
          })
    },
    methods: {
      movieMsg: function (str) {
        const path = '/movie/' + str
        this.$router.push({path: path})
      },
      backLastPage: function () {
        window.history.go(-1)
      }
    },

  }
</script>

<style scoped>
 p{
  margin:0;
  padding: 0;
}
.header-title{
  display: flex;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  background-color: red;
  color: #fff;
  font-size: 30px;
}
.header-title .back{
  width: 50px;
  position: relative;
  cursor: pointer;
}
.header-title .back div{
  position: absolute;
    top: 18px;
    left: 18px;
    height: 13px;
    width: 13px;
    border: 2px solid #fff;
    border-width: 0 0 2px 2px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.header-title .title{
  -webkit-box-flex: 1;
  flex:1;
  text-align: center;
}
.star-data{
  display: flex;
}
.star-data img{
  margin:15px;
}
.star-data .data{
  padding-top: 15px;
}
.star-data h3{
  font-size: 30px;
}
.star-data p{
  font-size: 18px;
}
.production{
}
.production h2{
  font-size: 20px;
}
.production-data{
  display: flex;
  margin:10px;
  padding-left: 10px;
}
.production-data .data{
  padding-left: 10px;
}

</style>
