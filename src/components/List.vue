<template>
<div class="">
  <div class="">
    <div class=""></div>
  </div>
  <div class="h-[10rem] bg-btn flex flex-col items-center justify-center align-middle flex-wrap" style="background-size: 100% 100%">
    <div class="mx-auto w-full text-[#a06738] text-4xl font-normal text-center uppercase font-bold">Serverlist</div>
    <div class="mx-auto w-full text-[#a06738] text-4xl font-normal text-center uppercase font-semibold">Online Servers <b>{{servers.length}}</b> with <b>{{getAllPlayers()}}</b> Players</div>
  </div>
  <div class="flex">
    <div class="flex flex-wrap w-1/2 items-center justify-center content-center mx-auto">
      <div class="flex w-full bg-btn p-2 text-[#a06738] mb-4 uppercase font-semibold" style="background-size: 100% 100%">
        <div class="w-1/12"></div>
        <div class="w-6/12">Name</div>
        <div class="w-1/12">Players</div>
        <div class="w-2/12">Version</div>
        <div class="w-2/12">Tags</div>
      </div>
      <div class="overflow-auto w-full h-[45rem]">
      <div v-for="server in sortArr(servers)" style="background-size: 100% 100%" class="flex relative w-full bg-btn bg-contain bg-no-repeat p-2 py-4 mb-4 text-[#a06738] text-xl font-normal items-center">
        <div class="w-1/12"><img v-if="server.icon_url" class="w-10 mx-auto object-contain object-center h-10" :src="server.icon_url"/></div>
        <div class="w-6/12"><div class="">{{server.name}}</div><div class="text-sm">{{server.ip}}</div></div>
        <div class="w-1/12">{{server.player_count}}/{{server.max_player_count}}</div>
        <div class="w-2/12">{{server.version}}</div>
        <div class="w-2/12">{{server.tags}}</div>
      </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-4 w-full">
    <a class="mx-auto w-full text-[#a06738] text-md font-normal text-center uppercase font-normal block" target="_blank" href="https://joshua-gerke.de/imprint">Imprint</a>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'List',
  data () {
    return {
      servers: []
    }
  },
  setup() {
    return {}
  },
  methods: {
    getAllPlayers() {
      let players = 0;
      this.servers.forEach(server => {
        players += server.player_count;
      });
      return players;
    },
    sortArr(arr) {
      arr.sort(function(a, b) {
        var keyA = a.player_count,
            keyB = b.player_count;
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
      });
      return arr;
    },
    getServers() {
      return fetch('https://list.hogwarp.com/list')
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.servers = json.servers;
        }).catch((error) => {
          this.servers = [];
        });
    },
  },
  mounted() {
    this.getServers();
  },
})
</script>

<style>
body {
  overflow: hidden;
}

body::after {
  z-index: -10;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("img/bg.png");
  background-size: 100% 100%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #231524;
  border-radius: 2rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #a06738;
  border-radius: 2rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>