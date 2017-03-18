<template>
  <div>
  <v-header></v-header>
    <div v-if='!maoyan' class="movies-show-area">
      <div class="movies-wrap">
        <div class="movie-area" v-for="(item,index) in in_theaters_data_body_subjects" @click="showMoreMsg(item.id)">
          <div class="movie-area-child">
            <div class="poster"><img :src="item.images.small" :alt="item.alt"></div>
            <div class="movie-msg">
              <h2>{{ item.title }}</h2>
                <star></star>
                <p>{{ item.rating.average }}分</p>
               <p>导演:{{ item.directors[0].name}}</p>
              <p>主演:{{ item.casts[0].name}}, {{ item.casts[1].name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition v-if='maoyan'></transition>
  
  </div>
</template>

<script> 
import transition from './transition'
import vHeader from './header/header'
import star from './star/star'
export default {
  name: 'shouNew',
  data(){
    return{
      maoyan: true,
      in_theaters_data: {},
      in_theaters_data_body: {},
      in_theaters_data_body_subjects: []
    }
  },
  components:{
    vHeader: vHeader,
    star,
    transition: transition,
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters')
        .then(function (response) {
          console.log(response)
          this.maoyan = false
          this.in_theaters_data = response
          this.in_theaters_data_body = response.body
          this.in_theaters_data_body_subjects = response.body.subjects
        })
        .catch(function (response) {
          console.log(response)
        })
  },
  methods: {
    showMoreMsg: function (str) {
      const path = '/movie/' + str
      this.$router.push({path: path})
    }
  }

}
</script>

<style scoped>
.movies-show-area{
  background-color: #fff000;

}
.movies-warp{
  background-color: #fff;
}
.movie-area{
  background-color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
}
.movie-area-child{
  display: flex;
}
.movie-msg{
  vertical-align: top;
  font-family: "Microsoft YaHei",Arial, Helvetica, sans-serif;
  padding-left: 20px;
}
h2{
  font-size: 18px;
}

</style>
