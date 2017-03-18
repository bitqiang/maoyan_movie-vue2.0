<template>
  <div>
  <transition v-if='maoyan'></transition>  
  <div v-if='!maoyan'>
    <!--   标题部分 -->
    <div class="header-title">
      <div class="back" @click='backLastPage'>
        <div></div>
      </div>
      <div class="title"> {{movieMsg.title}}</div>
      <div class="back"></div>
    </div>

<!--     内容区块 -->
    <div class="movie">
      <div class="img"><img :src="movieMsg.images.medium" :alt="movieMsg.alt"></div>
      <div class="movie-msg">
        <h3 class="movie.title">{{movieMsg.title}}</h3>
      <star></star>
        <p class="movie-count-pingfen">{{ movieMsg.rating.average }}({{movieMsg.collect_count}}人评分)</p>
        <p>{{movieMsg.year}}年</p>
        <p>{{movieMsg.genres.join(',')}}</p>
        <p v-for="item in movieMsg.countries">{{item}}</p>
        <p v-for="item in movieMsg.durations" v-if="item.indexOf('中国')>0">{{item}}</p>
        <p v-for="item in movieMsg.pubdates" v-if="item.indexOf('中国')>0">{{item}}</p>
      </div>
    </div>

<!-- 影片观看人数分析 -->
    <div class="movie-count">
      <div class="count">{{movieMsg.wish_count}}人想看</div>
      <div class="count">{{movieMsg.reviews_count}}人看过</div>
    </div>

<!-- 影片内容简介 -->
    <div class="summary"> {{movieMsg.summary}} 
    </div>

<!-- 演员介绍 -->
    <div class="scoll-hidden">
      <h3>演职人员</h3>
      <div class="scoll">
        <div class="star" v-for="item of movieMsg.directors" @click="starMsg(item.id)">
          <div class="star-msg">
            <img :src="item.avatars.small" :alt="item.alt">
            <div class="star-name">{{ item.name }}导演</div>
          </div>
        </div>
        <div class="star"  v-for="item of movieMsg.casts" @click="starMsg(item.id)">
          <div class="star-msg">
            <img :src="item.avatars.small" :alt="item.alt">
            <div class="star-name">{{item.name}}</div>
          </div>
        </div>
      </div>

    </div>

<!-- 评论部分 -->
    <div class="discuss">
      <h3>热门评论</h3>
      <div v-for="item in movieMsg.popular_comments">
         <div class="rating">
            <star :score="item.rating.value*2"></star>
           <span>{{item.created_at}}</span>
         </div>
          <p class="author-content"> {{item.content}} </p>
          <div class="img"> 
            <img :src='item.author.avatar' :alt="item.author.alt">
            <span>{{item.author.name}}</span>
          </div>
      </div>
    </div>
  
    <p @click="smallComment(movieMsg.id)" class="msg-all-Comment">查看全部短论</p>
    <p @click="comment(movieMsg.id)" class="msg-all-Comment">查看全部影评</p>
  </div>

  </div>
</template>

<script>
import transition from './transition'
import star from './star/star'
export default {
      data () {
      return {
        maoyan: true,
        movieMsg: {
          'rating': {
            'max': '',
            'average': '',
            'details': {
              '1': '',
              '3': '',
              '2': '',
              '5': '',
              '4': ''
            },
            'stars': '',
            'min': 0
          },
          trailer_urls: [], //获取小段视频
          collect_count: '',
          'wish_count': '',
          'reviews_count': '',
          'images': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'alt': '',
          'year': '',
          'pubdates': [],
          'id': '',
          'pubdate': '',
          'title': '',
          'languages': [],
          'countries': [],
          'writers': [{
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            },
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'casts': [
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'summary': '',
          'directors': [
            {
              'avatars': {
                'small': '',
                'large': '',
                'medium': ''
              },
              'name_en': '',
              'name': '',
              'alt': '',
              'id': ''
            }
          ],
          'durations': [],
          'genres': [],
          popular_comments: [{
            rating: {
              max: '',
              min: '',
              value: ''
            },
            author: {
              uid: '',
              avatar: '',
              name: ''
            },
            content: '',
            create_at: ''
          }],
          comments_count: '',
          popular_reviews: ''
        }
      }
    },
    mounted: function (argument) {
      // body...
      this.$nextTick(function(){
        const _this = this
        const id = 'https://api.douban.com/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd'
        this.$http.jsonp(id)
        .then(function(res){
          console.log(res)
          _this.movieMsg = res.body
          this.maoyan = false
        })
        .catch(function(res){
          console.log(res)
        })
      })
    },
    components : {
      star:star,
      transition
    },
    methods:{
      starMsg : function(str){
        const path = '/starMsg/' + str
        this.$router.push({path: path})
      },
      comment: function(str){
        const path = '/comment/' + str
        this.$router.push({path: path})
      },
      smallComment: function(str){
        const path = '/smallComment/' + str
        this.$router.push({path: path})
      },
      backLastPage : function(){
        window.history.go(-1)
      }
    }
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
  background-color: #f2f2f2;
  color: #7c7070;
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
  border: 2px solid #7c7070;
  border-width: 0 0 2px 2px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);

}
.header-title .title{
  -webkit-box-flex: 1;
  flex:1;
  text-align: center;
}
.movie{
  display: flex;
  background-color: #e6e6e6;
  font-family: "Microsoft YaHei",Arial, Helvetica, sans-serif;
}
.movie img{
  padding: 15px;
}
.movie .movie-msg{
  margin-top: 16px;
  padding-left: 0px;
  padding: -5px;
}
.movie h3{
  font-size: 20px;
}
.movie-count{
  display: flex;
  justify-content: center;
}
.count {
  margin: 10px 30px;
  width: 100px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  background-color: #cccccc;
  color: #fff;
}
.summary{
  font-size: 14px;
  padding: 10px;
}
.scoll-hidden h3{
  color: #666;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
}
.scoll{
  overflow-x:scroll; 
  white-space:nowrap;
}
.discuss{
  margin: 15px;
}
.discuss h3{
  margin-top: 15px;
  color: #666;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 5px;
}
.rating{
  margin-top: 10px;
}
 .star{
  display:inline-block;
  padding-left: 10px;
}
.star .star-msg{
  padding-bottom: 20px;
}
.author-content{
  color: #333;
  margin-bottom: 10px;
}
.discuss .img{
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}
.img img{
  border-radius: 50%;
  overflow: hidden;
}
.msg-all-Comment{
    font-weight: lighter;
    text-align: center;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #d6d3d3;
}
</style>
