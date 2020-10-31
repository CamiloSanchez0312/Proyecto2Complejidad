<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ n }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-btn class="mx-2" fab dark small>
            <v-icon dark> mdi-refresh </v-icon>
          </v-btn>
          <v-divider class="mx-4" inset vertical />
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-for="n of Number(N_val)"
                      :key="n"
                    >
                      <v-text-field
                        v-model="editedItem['d' + (n - 1)]"
                        :label="'d' + (n - 1)"
                        :rules="rules"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <p>No data avaible</p>
      </template>
    </v-data-table>
    <v-btn @click="senData" outlined color block>RUN</v-btn>
  </div>
</template>
<script>
export default {
  name: "Dsi",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [],
    desserts: [],
    desserts_mzn_string: "[ | | ]",
    n: 0,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    rules: [
      (value) => !!value || "Required.",
      //value => (value && value.length >= 1) || 'Min 3 characters',
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    N_val() {
      return this.$store.getters.getN;
    },
    CapT(){
      return this.$store.getters.getCapTermo;
    },
    CapH(){
      return this.$store.getters.getCapHidro;
    },
    CapN(){
      return this.$store.getters.getCapNuclear;
    },
    Ct(){
      return this.$store.getters.getCostTermo;
    },
    Ch(){
      return this.$store.getters.getCostHidro;
    },
    Cn(){
      return this.$store.getters.getCostNuclear;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    N_val(val) {
      //console.log(val)
      this.n = val;
      this.recreateTableData(val);
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    senData(){
      this.$store.dispatch('sendModel', { CapT:this.Capt, CapH:this.CapH, CapN:this.CapN, Ct:this.Ct, Ch:this.Ch, Cn:this.Cn, n:this.N_val ,S:this.desserts.length, dsi:this.createDessertStrintg()})
    },
    createDessertStrintg() {
      var to_return = "[ |";
      var n = this.N_val;
      console.log("N_val",this.N_val,"this.Desserts", this.desserts)
      for (var i=0;this.desserts.length>i;i++) {
        for (var j = 0; n > j; j++) {
          to_return = to_return +" "+ this.desserts[i]['d'+j];
        }
        if(this.desserts.length-i == 1){
            to_return=to_return+" |"
        }else {
          to_return= to_return+ " |\n"
        }
      }
      to_return = to_return+ " ]"
      return to_return
    },
    recreateTableData(n) {
      var arr = [];
      var edtItm = {};
      for (var i = 0; i < n; i++) {
        arr.push({ text: "d" + i, value: "d" + i });
        edtItm["d" + i] = null;
      }
      arr.push({ text: "Actions", value: "actions" });
      //console.log(edtItm)
      this.headers = arr;
      this.editedItem = edtItm;
      this.defaultItem.edtItm;
      return arr;
    },
    initialize() {
      /* this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            varo: this.headers.length-1,
            
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ] */
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      //console.desserts()
      this.$store.commit("set_Dsi", this.desserts);
      this.close();
    },
  },
};
</script>