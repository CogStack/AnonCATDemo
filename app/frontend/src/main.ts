import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'


import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi'
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    components,
    directives,
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(VueCookies, { expires: '4h'});

app.mount('#app')

