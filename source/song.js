

new Vue({
	el: "#app",
	data() {
	  return {
		audio: null,
		circleLeft: null,
		barWidth: null,
		duration: null,
		currentTime: null,
		isTimerPlaying: false,
		tracks: [
		  {
			name: "You Never Know",
			artist: "Hồng Đen",
			cover: "https://i1.sndcdn.com/artworks-j0VodMU3CAkuXTwi-wSQycA-t500x500.jpg",
			source: "/YouNeverKnow-BLACKPINK-6720107.mp3",
			url: "https://www.youtube.com/watch?v=gRc8Lb9mqBQ",
			favorited: false
		  },
		  {
			name: "Interstellar",
			artist: "Hans Zimmer",
			cover: "https://image.tmdb.org/t/p/original//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
			source: "/y2mate.com - Hans Zimmer  Interstellar  Main Theme Piano Version  Sheet Music.mp3",
			url: "https://www.youtube.com/watch?v=4y33h81phKU",
			favorited: true
		  },
		  {
			name: "Now We Are Free",
			artist: "Hans Zimmer",
			cover: "/now_we_are_free.jpg",
			source: "/y2mate.com - 2CELLOS  Now We Are Free  Gladiator Live at Sydney Opera House.mp3",
			url: "https://www.youtube.com/watch?v=pL0bxewHbjo",
			favorited: false
		  },
		  {
			name: "2AM",
			artist: "JustaTee",
			cover: "https://i.ytimg.com/vi/XGrvLJG8tuM/maxresdefault.jpg",
			source: "/2AM - JustaTee_ Bigdaddy.mp3",
			url: "https://www.youtube.com/watch?v=XGrvLJG8tuM",
			favorited: true
		  },
		  {
			name: "Older",
			artist: "Sasha Sloan",
			cover: "https://images.genius.com/b7ace533f88d2e71b989a776a784b370.680x680x1.jpg",
			source: "/Older-SashaSloan-5770496.mp3",
			url: "https://www.youtube.com/watch?v=r1Fx0tqK5Z4",
			favorited: true
		  },
		  {
			name: "Flower",
			artist: "Jisoo",
			cover: "https://pbs.twimg.com/media/FsIomWeaQAAwGbU.jpg:large",
			source: "/y2mate.com - JISOO  꽃FLOWER MV.mp3",
			url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
			favorited: false
		  },
		  {
			name: "Mẹ ơi cho con về nhà",
			artist: "Trang",
			cover: "https://i.ytimg.com/vi/McbGldWEc8M/maxresdefault.jpg",
			source: "/Me-Oi-Cho-Con-Ve-Nha-Phung-Khanh-Linh-Trang.mp3",
			url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
			favorited: true
		  },
		  {
			name: "Just The Two Of Us",
			artist: "Bill Withers_Grove",
			cover: "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/b/8/f/b/b8fb691bbc0fb4e78f5ca9597645e536.jpg",
			source: "/Just The Two Of Us - Bill Withers_ Grove.mp3",
			url: "https://www.youtube.com/watch?v=ftst0mGzIv8",
			favorited: false
		  },
		  {
			name: "Rag'n'Bone Man",
			artist: "Human",
			cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
			source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
			url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
			favorited: false
		  }
		],
		currentTrack: null,
		currentTrackIndex: 0,
		transitionName: null
	  };
	},
	methods: {
	  play() {
		if (this.audio.paused) {
		  this.audio.play();
		  this.isTimerPlaying = true;
		} else {
		  this.audio.pause();
		  this.isTimerPlaying = false;
		}
	  },
	  generateTime() {
		let width = (100 / this.audio.duration) * this.audio.currentTime;
		this.barWidth = width + "%";
		this.circleLeft = width + "%";
		let durmin = Math.floor(this.audio.duration / 60);
		let dursec = Math.floor(this.audio.duration - durmin * 60);
		let curmin = Math.floor(this.audio.currentTime / 60);
		let cursec = Math.floor(this.audio.currentTime - curmin * 60);
		if (durmin < 10) {
		  durmin = "0" + durmin;
		}
		if (dursec < 10) {
		  dursec = "0" + dursec;
		}
		if (curmin < 10) {
		  curmin = "0" + curmin;
		}
		if (cursec < 10) {
		  cursec = "0" + cursec;
		}
		this.duration = durmin + ":" + dursec;
		this.currentTime = curmin + ":" + cursec;
	  },
	  updateBar(x) {
		let progress = this.$refs.progress;
		let maxduration = this.audio.duration;
		let position = x - progress.offsetLeft;
		let percentage = (100 * position) / progress.offsetWidth;
		if (percentage > 100) {
		  percentage = 100;
		}
		if (percentage < 0) {
		  percentage = 0;
		}
		this.barWidth = percentage + "%";
		this.circleLeft = percentage + "%";
		this.audio.currentTime = (maxduration * percentage) / 100;
		this.audio.play();
	  },
	  clickProgress(e) {
		this.isTimerPlaying = true;
		this.audio.pause();
		this.updateBar(e.pageX);
	  },
	  prevTrack() {
		this.transitionName = "scale-in";
		this.isShowCover = false;
		if (this.currentTrackIndex > 0) {
		  this.currentTrackIndex--;
		} else {
		  this.currentTrackIndex = this.tracks.length - 1;
		}
		this.currentTrack = this.tracks[this.currentTrackIndex];
		this.resetPlayer();
	  },
	  nextTrack() {
		this.transitionName = "scale-out";
		this.isShowCover = false;
		if (this.currentTrackIndex < this.tracks.length - 1) {
		  this.currentTrackIndex++;
		} else {
		  this.currentTrackIndex = 0;
		}
		this.currentTrack = this.tracks[this.currentTrackIndex];
		this.resetPlayer();
	  },
	  resetPlayer() {
		this.barWidth = 0;
		this.circleLeft = 0;
		this.audio.currentTime = 0;
		this.audio.src = this.currentTrack.source;
		setTimeout(() => {
		  if(this.isTimerPlaying) {
			this.audio.play();
		  } else {
			this.audio.pause();
		  }
		}, 300);
	  },
	  favorite() {
		this.tracks[this.currentTrackIndex].favorited = !this.tracks[
		  this.currentTrackIndex
		].favorited;
	  }
	},
	created() {
	  let vm = this;
	  this.currentTrack = this.tracks[0];
	  this.audio = new Audio();
	  this.audio.src = this.currentTrack.source;
	  this.audio.ontimeupdate = function() {
		vm.generateTime();
	  };
	  this.audio.onloadedmetadata = function() {
		vm.generateTime();
	  };
	  this.audio.onended = function() {
		vm.nextTrack();
		this.isTimerPlaying = true;
	  };
  
	  // this is optional (for preload covers)
	  for (let index = 0; index < this.tracks.length; index++) {
		const element = this.tracks[index];
		let link = document.createElement('link');
		link.rel = "prefetch";
		link.href = element.cover;
		link.as = "image"
		document.head.appendChild(link)
	  }
	}
  });
  
  