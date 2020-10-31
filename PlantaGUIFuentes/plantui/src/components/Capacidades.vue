<template>
  <v-sheet rounded="lg" min-height="248">
    <v-row align-content-sm>
      <v-col>
        <v-text-field
          outlined
          color
          sm
          type="Number"
          label="Cap Termo"
          v-model="CapTermo"
          :rules="rules"
          @input="noNegative"
          min="0"
        />
      </v-col>
    </v-row>
    <v-row align-content-sm>
      <v-col>
        <v-text-field
          outlined
          color
          sm
          type="Number"
          label="Cap Hidro"
          v-model="CapHidro"
          :rules="rules"
          @input="noNegative"
          min="0"
        />
      </v-col>
    </v-row>
    <v-row align-content-sm>
      <v-col>
        <v-text-field
          outlined
          color
          sm
          type="Number"
          label="Cap Nuclear"
          v-model="CapNuclear"
          :rules="rules"
          @input="noNegative"
          min="0"
        />
      </v-col>

      <!-- -->
    </v-row>
    <!--  -->
  </v-sheet>
</template>

<script>
export default {
  name: "Capacidades",
  data: () => ({
    CapTermo: 0,
    CapHidro: 0,
    CapNuclear: 0,
    rules: [
      (value) => !!value || "Required.",
      (value) => (Number(value) > 0 ? true : false || "No ngative values")]
  }),
  methods: {
      noNegative() {
      if (Number(this.CapHidro) < 0) {
        this.CapHidro = 0;
      }
      if (Number(this.CapNuclear) < 0) {
        this.CapNuclear = 0;
      }
      if (Number(this.CapTermo) < 0) {
        this.CapTermo = 0;
      }
      this.saveData()
    },
    saveData(){
        this.$store.commit("set_CapTermo", this.CapTermo);
        this.$store.commit("set_CapHidro", this.CapHidro);
        this.$store.commit("set_CapNuclear", this.CapNuclear);
    }
  },
};
</script>

<style>
</style>