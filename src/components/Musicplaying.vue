<template>
  <div class="playbar">
    <!-- bottom -->
    <div class="playbarbottom" @click="showFullscreen=true">
      <img class="thumb" :class="{active: playing}" :src="musicData.picUrl" alt />
      <div class="info">
        <h5>{{musicData.name}}</h5>
        <span>{{joinArtists(musicData.song.artists)}}</span>
      </div>
      <div class="progress" @click.stop="playing = !playing">
        <canvas width="36" height="36" id="canvas"></canvas>
        <i v-if="playing" class="fa fa-pause"></i>
        <i v-else class="fa fa-play"></i>
      </div>
      <div class="playlist" @click.stop="showPlayList=!showPlayList">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
    </div>

    <!-- 播放列表 -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <ul v-if="showPlayList" class="defaultPlayList">
        <MusicLis
          v-for="(item, index) in defaultPlayList"
          :key="index"
          :songItem="item"
          :options="{order: index, info: false}"
          @tanslate-song="$emit('tanslate-song', $event)"
          :musicData="musicData"
        ></MusicLis>
      </ul>
    </transition>

    <!-- fullscreen -->
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="showFullscreen" class="fullscreenplay">
        <div class="mask" :style="{backgroundImage: `url(${musicData.picUrl})`}"></div>
        <header>
          <i class="fa fa-arrow-left" @click="showFullscreen=false"></i>
        </header>

        <div
          v-show="showCircle"
          class="circle"
          :class="{active: playing}"
          @click="showCircle = false"
        >
          <div class="needle"></div>
          <div class="glue">
            <img :src="musicData.picUrl" alt />
          </div>
        </div>
        <div v-show="!showCircle" class="lyric-box" @click="showCircle = true">
          <ul class="scroll" :style="{transform: `translateY(${-currentLyricIndex * 28}px)`}">
            <li
              v-for="(item, index) in parsedLyric"
              :class="{active: index===currentLyricIndex}"
              :key="index"
            >{{item.text}}</li>
          </ul>
        </div>

        <footer>xxx</footer>
      </div>
    </transition>

    <audio :src="musicDataUrl" autoplay controls height="30"></audio>
  </div>
</template>

<script>
import MusicLis from "@/components/MusicLis";
export default {
  props: {
    musicData: Object
  },
  components: {
    MusicLis
  },
  data: function() {
    return {
      playing: false,
      showFullscreen: false,
      showCircle: false,
      currentLyric: null,
      currentLyricIndex: 0,
      showPlayList: false,
      defaultPlayList: [this.musicData]
    };
  },
  methods: {
    joinArtists: function(artists) {
      return artists.map(artist => artist.name).join(" / ");
    },
    drawProgress: function() {
      var canvas = this.$el.querySelector("#canvas");
      var audio = this.$el.querySelector("audio");
      var duration = this.musicData.song.duration;
      audio.ontimeupdate = () => {
        /** @type {HTMLCanvasElement} */
        // console.log(canvas);
        // 获取canvas元素
        var context = canvas.getContext("2d");
        // console.log(duration, this.currentTime * 1000);
        // console.log((this.currentTime * 100) / duration);
        context.clearRect(0, 0, 36, 36);
        context.beginPath();
        context.arc(18, 18, 17, 0, 2 * Math.PI);
        context.closePath();
        context.strokeStyle = "gray";
        // 描边样式
        context.lineWidth = "1";
        // 描边宽度
        context.stroke(); // 路径描边
        context.beginPath();
        context.arc(
          18,
          18,
          17,
          -0.5 * Math.PI,
          -0.5 * Math.PI + 2 * Math.PI * ((audio.currentTime * 1000) / duration)
        );
        // context.closePath();
        context.strokeStyle = "rgba(255,0,0,0.7)";
        // 描边样式
        context.lineWidth = "1";
        // 描边宽度
        context.stroke(); // 路径描边
        // 滚动歌词
        // this.currentTime
        // currentLyricIndex
        let index;
        for (let i = 0; i < this.parsedLyric.length; i++) {
          if (audio.currentTime + 0.15 < this.parsedLyric[i].time) {
            index = i - 1;
            break;
          }
        }
        if (index === undefined) {
          index = this.parsedLyric.length - 1;
        }
        this.currentLyricIndex = index;
      };
    },
    getLyric: function() {
      var cachedLyric = window.localStorage.getItem(
        "lyric" + this.musicData.id
      );
      if (cachedLyric) {
        this.currentLyric = cachedLyric;
      } else {
        window.axios
          .get("lyric", {
            params: {
              id: this.musicData.id
            }
          })
          .then(response => {
            this.currentLyric = response.data.lrc.lyric;
            window.localStorage.setItem(
              "lyric" + this.musicData.id,
              response.data.lrc.lyric
            );
          });
      }
    }
  },
  computed: {
    musicDataUrl: function() {
      if (this.musicData)
        return `https://music.163.com/song/media/outer/url?id=${this.musicData.id}.mp3`;
      else return "";
    },
    parsedLyric: function() {
      if (this.currentLyric) {
        return this.currentLyric.split("\n").map(item => {
          // console.log(item);
          var regex = /\d{2}:\d{2}\.\d+/i;
          if (item.search(regex) !== -1) {
            var time = item.match(regex)[0];
            var m = time.substr(0, 2);
            var s = time.substr(3, 2);
            var n = time.substr(5);
            return {
              time: Number(m) * 60 + Number(s) + Number(n),
              text: item.substr(11) || "---------"
            };
          } else {
            return {};
          }
        });
      } else {
        return null;
      }
    }
  },
  mounted() {
    var audio = this.$el.querySelector("audio");
    this.drawProgress();
    audio.onplay = () => {
      console.log("开始播放");
      this.playing = true;
    };
    audio.onpause = () => {
      console.log("暂停播放");
      this.playing = false;
    };
  },
  watch: {
    playing: function(value) {
      var audio = this.$el.querySelector("audio");
      if (value) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    musicData: function(value) {
      this.getLyric();
      // 加入列表 需要过滤重复
      // this.defaultPlayList.push(value);
      let isExist = this.defaultPlayList.some(item => {
        return item.id == value.id;
      });
      console.log(isExist);
      if (!isExist) this.defaultPlayList.push(value);
    }
  },
  created() {
    this.getLyric();
  }
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.playbarbottom {
  padding: 5px 0;
  background: white;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  .margin () {
    margin: 0 10px;
  }
  .thumb {
    .margin;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    animation: rotate 6s linear infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
  }
  .info {
    flex: 1;
    font-size: 12px;
    line-height: 18px;
    h5 {
    }
    span {
      color: gray;
    }
  }
  .progress {
    .margin;
    width: 28px;
    height: 28px;
    position: relative;
    #canvas {
      width: 100%;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      color: lightgray;
      font-size: 12px;
      display: block;
      margin-top: -6px;
      margin-left: -6px;
      line-height: 1em;
      width: 12px;
      height: 12px;
      text-align: center;
    }
  }
  .playlist {
    .margin;
    width: 28px;
    height: 28px;
    position: relative;
    border: 1px solid lightgray;
    border-radius: 50%;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      color: lightgray;
      font-size: 12px;
      display: block;
      margin-top: -6px;
      margin-left: -6px;
      line-height: 1em;
      width: 12px;
      height: 12px;
      text-align: center;
    }
  }
}
.defaultPlayList {
  position: fixed;
  bottom: 50px;
  left: 2.5%;
  width: 95%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
  z-index: 9;
}
.fullscreenplay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .mask {
    filter: blur(30px) brightness(0.5);
    transform: scale(2);
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: -1;
  }
  header {
    height: 50px;
  }
  .circle {
    flex: 1;
    text-align: center;
    position: relative;
    .glue {
      padding: 54px;
      // background-image: url("../assets/disc_light-ip6.png"),
      //   url("../assets/disc-ip6.png");
      background-size: 100%;
      border-radius: 50%;
      display: inline-block;
      margin-top: 84px;
      animation: rotate 6s linear infinite;
      animation-play-state: paused;
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .needle {
      width: 96px;
      height: 137px;
      // background-image: url("../assets/needle.png");
      background-size: 100%;
      position: absolute;
      top: 0;
      left: 50%;
      z-index: 1;
      margin-left: -16px;
      transform: rotate(-12deg);
      transform-origin: 16px 0;
      transition: all 0.3s;
    }
    &.active {
      .needle {
        transform: rotate(0deg);
      }
      .glue {
        animation-play-state: running;
      }
    }
  }
  .lyric-box {
    flex: 1;
    overflow: hidden;
    position: relative;
    .scroll {
      text-align: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      margin-top: -1em;
      transition: transform 0.3s;
      li {
        line-height: 2em;
        font-size: 14px;
        height: 2em;
        color: gray;
        &.active {
          color: white;
        }
      }
    }
  }
  footer {
    height: 100px;
  }
}
.fadeIn {
  animation-duration: 0.3s;
}
</style>