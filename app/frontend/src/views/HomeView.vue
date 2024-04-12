<template>
  <v-container fluid class="viewport-container">
    <v-row no-gutters class="viewport">
      <v-col class="col" cols="5">
        <div class="col-container">
          <div class="border">
            <v-textarea class="texts-height" rows="32" label="Input Text" variant="solo-filled" v-model="inputText" clearable>
            </v-textarea>
          </div>
        </div>
      </v-col>
      <v-col class="col" col="2">
        <div class="col-container centered">
          <img src="../assets/logo.png" class="image-size" />
          <div>
            <v-btn @click="deidentify" color="light-blue">Deidentify</v-btn>
            <v-checkbox class="redact-check" label="Redact" v-model="redact"></v-checkbox>
            <v-btn @click="fillExampleText" color="purple">Use Example</v-btn>
          </div>
        </div>
      </v-col>
      <v-col class="col" cols="5">
        <div class="col-container">
          <div class="border">
            <div class="output-text">
              <span v-if="outputText === ''">Deidentification output</span>
              {{outputText}}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {EXAMPLE_TEXT} from "@/consts/texts";
import axios from "axios";

export default {
  name: 'HomeView',
  data () {
    return {
      inputText: '',
      redact: false,
      outputText: ''
    }
  },
  methods: {
    deidentify () {
      const payload = {text: this.inputText, redact: this.redact}
      const headers = {}
      axios.post('/api/deidentify/', payload).then(resp => {
        this.outputText = resp.data.output_text
      })
    },
    fillExampleText () {
      this.inputText = EXAMPLE_TEXT
    }
  }
}
</script>

<style scoped>
.viewport-container {
  padding: 0 3px;
}

.viewport {
  height: calc(100vh - 75px);
}

.col {
  height: 100%;
}

.image-size {
  width: 200px;
  height: auto;
}

.col-container {
  border: 30px solid var(--vt-c-text-dark-2);
  height: 100%;
}

.texts-height {
  height: calc(100%);
}

.centered {
  text-align: center;
  padding-top: 50px;

  div {
    padding: 20px;
  }
}

.border {
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  height: 100%;
}

.output-text {
  overflow-y: auto;
  white-space: pre-wrap;
  padding: 5px;
  font-size: 11pt;
  height: 100%;
}

.redact-check {
  margin-left: 30px;
}

</style>