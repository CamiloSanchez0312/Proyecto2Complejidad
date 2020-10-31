<template>
  <v-app id="inspire">
  

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="248"
            >
            <Ncatcher  />
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <Dsi :n="N"/>
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
           <Capacidades />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
//import HelloWorld from './components/HelloWorld';
import Dsi from './components/Dsi'
//import datatest from './components/datatest'
import Capacidades from './components/Capacidades'

import Ncatcher from './components/Ncatcher'

export default {
  name: 'App',

  components: {
  //  HelloWorld,
    Ncatcher,
    Dsi,
    Capacidades
  },

  data: () => ({
    enable: true,
    //N: this.$store.state.,
  }),
  computed:{
    N(){
      return this.$store.getters.getN
    }
  },
  methods:{
    log(val){
      console.log(val)
      alert(val)
    }
  }
};
</script>
