<template>
    <div class="max-w-7xl mx-auto h-screen">
        <div class="mb-2 xl:mb-10 mt-[6rem]">
            <div class="text-[#eed385] font-[Tongari] text-3xl font-bold text-center">Unofficial HogWarp Server List</div>
        </div>
        <div class="flex-wrap h-[76%] xl:h-auto xl:flex">
            <div class="mx-auto w-11/12 xl:w-9/12 mb-auto h-[75%]">
                <div class="w-full flex flex-wrap items-center h-full content-start">
                    <div class="flex w-full h-12 bg-btn mb-2 items-center text-[#eed385] font-[Tongari] font-semibold" style="background-size: 100% 100%;">
                        <div class="w-1/12"></div>
                        <div class="w-6/12 mb-2">Name</div>
                        <div class="w-2/12 mb-2">Players</div>
                        <div class="w-2/12 mb-2">Version</div>
                        <div class="w-2/12 mb-2">Lang</div>
                    </div>
                    <div class="w-full flex flex-wrap items-center overflow-auto h-[80%] xl:h-[40rem] content-start">
                        <div v-for="server in sortArr(servers)" class="flex w-full h-14 bg-btn mb-2 items-center " style="background-size: 100% 100%">
                            <div class="w-2/12 xl:w-1/12"><img v-if="server.icon_url" @error="imageUrlAlt" class="mx-auto w-8 h-8" :src="server.icon_url"/>
                                <div class="text-[#eed385] font-[Tongari] text-3xl text-center">{{!server.icon_url ? '?' : ''}}</div></div>
                            <div class="w-6/12 text-[#eed385] font-[Tongari] mb-2 flex flex-wrap">
                                <div class="block xl:hidden w-full -mb-1">{{server.name.length >= 20 ? server.name.substring(0, 17) + '...' : server.name.substring(0, 29)}}</div>
                                <div class="hidden xl:block w-full -mb-1">{{server.name.length >= 45 ? server.name.substring(0, 43) + '...' : server.name.substring(0, 45)}}</div><div @click="copyURL(server.ip + ':' + server.port)" class="hidden xl:block cursor-pointer w-max text-sm">{{server.ip}}:{{server.port}}</div>
                            </div>
                            <div class="w-2/12 text-[#eed385] font-[Tongari] mb-2">{{server.player_count}}/{{server.max_player_count}}</div>
                            <div class="w-2/12 text-[#eed385] font-[Tongari] mb-2">{{server.version}}</div>
                            <div class="w-2/12 text-[#eed385] font-[Tongari] mb-2 flex gap-2"><div :class="`ml-4 xl:ml-0 fi fi-${server.tags.toLowerCase()}`"></div><div class="hidden xl:block">{{getCountryName(server.tags)}}</div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-11/12 mx-auto xl:w-3/12">
                <div class="max-w-[20rem] xl:max-w-none mx-auto w-full xl:ml-20 flex xl:flex-wrap items-center">
                    <div class="mx-auto w-1/2 xl:w-full"><img class="w-[8rem] xl:w-full" :src="'img/bird.png'"></div>
                    <div class="w-1/2 xl:w-full flex flex-wrap">
                        <div class="uppercase xl:text-center text-2xl text-[#eed385] font-[Tongari] w-auto xl:w-full">Servers: <b class="text-3xl">{{servers.length}}</b></div>
                        <div class="uppercase xl:text-center text-2xl text-[#eed385] font-[Tongari] w-auto xl:w-full">Online Players: <b class="text-3xl">{{getAllPlayers()}}</b></div>
                    </div>

                </div>
            </div>
        </div>
        <div class="fixed left-0 right-0 bottom-8 text-[#eed385] font-[Tongari] opacity-50 w-full">
            <a class="mx-auto w-full text-[#a06738] text-md font-normal text-center uppercase font-normal block" target="_blank" href="https://joshua-gerke.de/imprint">Imprint</a>
        </div>
    </div>
    <img :src="'img/freddie.png'" class="fixed bottom-0 left-1/2 -translate-x-1/2" v-if="easteregg">
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
            servers: [],
            easteregg: false,
        }
    },
    setup() {
        return {}
    },
    methods: {
        myEventHandler(e) {
            // your code for handling resize...
            if(window.innerHeight > 1800) {
                this.easteregg = true;
            } else {
                this.easteregg = false;
            }
        },
        async copyURL(mytext) {
            try {
                await navigator.clipboard.writeText(mytext);
            } catch($e) {
            }
        },
        getCountryName(countryCode) {
            if(!countryCode) return "";
            const intl = new Intl.DisplayNames(['en'], {type: 'region', fallback:'none'});
            try {
                return intl.of(countryCode);
            } catch(e) {
                return "";
            }

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
                    //this.servers = [{"desc":"Test","icon_url":"","ip":"???.???.???.???","max_player_count":'?',"name":"?????????","pass":false,"player_count":'?',"port":'???',"public":true,"tags":"","tick":60,"version":"???"}];
                    this.servers = [{"desc":"hogwarp.moonded.com","icon_url":"https://files.moonded.com/static/logo.png","ip":"2001:4ba0:cafe:12d9::1","max_player_count":64,"name":"hogwarp.moonded.com | HogWarp Test Server","pass":false,"player_count":0,"port":11778,"public":true,"tags":"","tick":60,"version":"385f9dd"},{"desc":"legacy.downtownrp.com.br - Hosted in South America - Brazil","icon_url":"https://i.imgur.com/Kxh9IrU.png","ip":"2804:7110:4000:10b:8122:c6c2:9d04:c821","max_player_count":2023,"name":"Downtown Legacy - DEV","pass":false,"player_count":0,"port":11778,"public":true,"tags":"","tick":60,"version":"385f9dd"},{"desc":"PDRP","icon_url":"https://cdn.discordapp.com/attachments/472534281944563745/1076621727100063754/hogwartsrp.png","ip":"147.135.136.227","max_player_count":900,"name":"PDRP - DEV","pass":false,"player_count":0,"port":11778,"public":true,"tags":"","tick":60,"version":"385f9dd"},{"desc":"???? En contrucci??n ????","icon_url":"https://imgur.com/G0D1ihj.png","ip":"20.111.14.151","max_player_count":6174,"name":"[ES] LumosRP.com | ??? Lumos RP ???","pass":false,"player_count":0,"port":11778,"public":true,"tags":"ES","tick":60,"version":"385f9dd"},{"desc":"mygaming.network","icon_url":"","ip":"85.214.158.14","max_player_count":256,"name":"MyGaming Network | Test Server","pass":false,"player_count":0,"port":11778,"public":true,"tags":"GER","tick":60,"version":"385f9dd"},{"desc":"Serveur roleplay FR en creation","icon_url":"https://cdn.discordapp.com/attachments/951602312030351400/1076826684893970542/loup2-logo-discord-sans-ecriture.png","ip":"198.251.88.195","max_player_count":4000,"name":"[FR] Mystery Community - Le monde du roleplay","pass":false,"player_count":0,"port":11778,"public":true,"tags":"FR","tick":60,"version":"385f9dd"},{"desc":"","icon_url":"","ip":"141.145.196.133","max_player_count":64,"name":"HogWarp Official Server","pass":false,"player_count":1,"port":11778,"public":true,"tags":"","tick":60,"version":"385f9dd"},{"desc":"Co-op Server","icon_url":"https://i.imgur.com/Gj4lsQb.png","ip":"2a01:7e00::f03c:93ff:fe0d:7f4d","max_player_count":69,"name":"cryptic.live","pass":false,"player_count":2,"port":42069,"public":true,"tags":"","tick":60,"version":"385f9dd"}];
                });
        },
    },
    mounted() {
        this.getServers();
        window.addEventListener("resize", this.myEventHandler);
    },
    unmounted() {
        window.removeEventListener("resize", this.myEventHandler);
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
