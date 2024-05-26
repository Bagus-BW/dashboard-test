import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/App.vue"
import router from "@/router"
import * as storeList from "@/store/list.js"

const vueInit = createApp(App)

// Connect Vue Router
vueInit.use(router)

// Connect Pinia Router
vueInit.use(createPinia())

// initiate global store data
let stored = {}
// loop through available store
for (const key of Object.keys(storeList)) {
  // register available store
  stored = {
    ...stored,
    [key.replace(/use/, "").toLowerCase()]: storeList[key]()
  }
}
// set global store variable
vueInit.config.globalProperties.$store = stored;

export default vueInit
