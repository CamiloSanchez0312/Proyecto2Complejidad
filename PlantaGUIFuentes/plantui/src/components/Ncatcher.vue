<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          label="N input"
          :rules="rules"
          hide-details="auto"
          v-model="n"
          type="number"
          @input="saveDays"
          min="0"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          outlined
          label="Cost Termo"
          v-model="CostTermo"
          :rules="rules"
          @input="noNegative"
          min="0"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          outlined
          label="Cost Hidro"
          v-model="CostHidro"
          :rules="rules"
          @input="noNegative"
          min="0"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          label="Cost Nuclear"
          outlined
          v-model="CostNuclear"
          :rules="rules"
          @input="noNegative"
          min="0"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Ncatcher",
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (Number(value) > 0 ? true : false || "No ngative values"),
      //value => (value && value.length >= 1) || 'Min 3 characters',
    ],
    enable: true,
    n: 0,
    CostTermo: 0,
    CostHidro: 0,
    CostNuclear: 0,
  }),
  computed: {
    N_val() {
      return this.$store.getters.getN;
    },
  },
  methods: {
    saveDays() {
      //console.log(this.n)
      this.noNegative();
      this.$store.commit("set_N", this.n);
      this.$store.commit("set_CostTermo", this.CostTermo);
      this.$store.commit("set_CostHidro", this.CostHidro);
      this.$store.commit("set_CostNuclear", this.CostNuclear);
      //this.n<=0? this.enable = !this.enable : console.log(this.n)
    },
    noNegative() {
      if (Number(this.n) < 0) {
        this.n = 0;
      }
      if (Number(this.CostHidro) < 0) {
        this.CostHidro = 0;
      }
      if (Number(this.CostNuclear) < 0) {
        this.CostNuclear = 0;
      }
      if (Number(this.CostTermo) < 0) {
        this.CostTermo = 0;
      }
    },
  },
};
</script>

<style>
</style>