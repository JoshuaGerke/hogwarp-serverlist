<template>
    <div class="max-w-7xl mx-auto h-screen">
        <div class="mb-10 mt-[6rem]">
            <div class="text-[#eed385] font-[Tongari] text-3xl font-bold text-center">Unofficial HogWarp Server List</div>
        </div>
        <div class="flex-wrap h-[76%] md:h-auto md:flex">
            <div class="mx-auto w-11/12 md:w-9/12 mb-auto h-[75%]">
                <div class="w-full flex flex-wrap items-center h-full content-start">
                    <div class="flex w-full h-12 bg-btn mb-2 items-center text-[#eed385] font-[Tongari] font-semibold" style="background-size: 100% 100%;">
                        <div class="w-1/12"></div>
                        <div class="w-6/12 mb-2">Name</div>
                        <div class="w-2/12 mb-2">Players</div>
                        <div class="w-2/12 mb-2">Version</div>
                        <div class="w-2/12 mb-2">Language</div>
                    </div>
                    <div class="w-full flex flex-wrap items-center overflow-auto h-[80%] md:h-[40rem] content-start">
                        <div v-for="server in sortArr(servers)" class="flex w-full h-14 bg-btn mb-2 items-center " style="background-size: 100% 100%">
                            <div class="w-1/12"><img v-if="server.icon_url" @error="imageUrlAlt" class="mx-auto w-8 h-8" :src="server.icon_url"/>
                                <div class="text-[#eed385] font-[Tongari] text-3xl text-center">{{!server.icon_url ? '?' : ''}}</div></div>
                            <div class="w-6/12 text-[#eed385] font-[Tongari] mb-2 flex flex-wrap">
                                <div class="block md:hidden w-full -mb-1">{{server.name.length >= 30 ? server.name.substring(0, 27) + '...' : server.name.substring(0, 29)}}</div>
                                <div class="hidden md:block w-full -mb-1">{{server.name.length >= 45 ? server.name.substring(0, 43) + '...' : server.name.substring(0, 45)}}</div><div @click="copyURL(server.ip + ':' + server.port)" class="cursor-pointer w-max text-sm">{{server.ip}}:{{server.port}}</div>
                            </div>
                            <div class="w-2/12 text-[#eed385] font-[Tongari] mb-2">{{server.player_count}}/{{server.max_player_count}}</div>
                            <div class="w-2/12 text-[#eed385] font-[Tongari] mb-2">{{server.version}}</div>
                            <div class="w-2/12 text-[#eed385] font-[Tongari] mb-2 flex gap-2"><div :class="`fi fi-${server.tags.toLowerCase()}`"></div><div class="">{{getCountryName(server.tags)}}</div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-11/12 mx-auto md:w-3/12">
                <div class="max-w-[20rem] md:max-w-none mx-auto w-full md:ml-20 flex md:flex-wrap items-center">
                    <div class="mx-auto w-1/2 md:w-full"><img class="w-[8rem] md:w-full" :src="'img/bird.png'"></div>
                    <div class="w-1/2 md:w-full flex flex-wrap">
                        <div class="uppercase md:text-center text-2xl text-[#eed385] font-[Tongari] w-auto md:w-full">Servers: <b class="text-3xl">{{servers.length}}</b></div>
                        <div class="uppercase md:text-center text-2xl text-[#eed385] font-[Tongari] w-auto md:w-full">Online Players: <b class="text-3xl">{{getAllPlayers()}}</b></div>
                    </div>

                </div>
            </div>
        </div>
        <div class="fixed left-0 right-0 bottom-8 text-[#eed385] font-[Tongari] opacity-50 w-full">
            <a class="mx-auto w-full text-[#a06738] text-md font-normal text-center uppercase font-normal block" target="_blank" href="https://joshua-gerke.de/imprint">Imprint</a>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import "flag-icons/css/flag-icons.min.css";
import axios from "axios";
export default defineComponent({
    name: 'List',
    components: {},
    data () {
        return {
            servers: []
        }
    },
    setup() {
        return {}
    },
    methods: {
        async copyURL(mytext) {
            try {
                await navigator.clipboard.writeText(mytext);
            } catch($e) {
            }
        },
        getCountryName(countryCode) {
            if(!countryCode) return "";
            return new Intl.DisplayNames(['en'], {type: 'region'}).of(countryCode);
        },
        imageUrlAlt(img) {
            img.target.style.display = "none";
        },
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
        async getServers() {

            return axios.get('/json')
                .then((res) => {
                    if(res && res.data && res.data.servers);
                    this.servers = res.data.servers
                }).catch((error) => {
                    this.servers = [{"desc":"Test","icon_url":"","ip":"???.???.???.???","max_player_count":'?',"name":"?????????","pass":false,"player_count":'?',"port":'???',"public":true,"tags":"","tick":60,"version":"???"}];
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
    background: url("/img/bgmobile.png");
    background-size: 100% 100%;
}

@media screen and (min-width: 768px) {
    body::after {
        background: url("/img/bg.png");
        background-size: 100% 100%;
    }

}

/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #1a1212;
    border-radius: 2rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #ecd184;
    border-radius: 0rem;
    width: 0.2rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
