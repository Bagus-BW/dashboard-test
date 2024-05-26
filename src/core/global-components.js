import { upperFirst } from "lodash-es";
import vueInit from "@/core/initiate.js";

const components = import.meta.glob('@/components/**/*.vue', { eager: true })
Object.entries(components).forEach(([path, definition]) => {

  // Get name of component, based on filename and directory
  // "./components/Basket/Fruits.vue" will become "BasketFruits"
  const registeredName = definition.default.name !== undefined 
    ? definition.default.name.replace(/ /, '')
    : upperFirst(path.replace(/(\/src\/components\/)|(\/)|(\.vue)/g, ''))

  // Register component on this Vue instance
  vueInit.component(registeredName, definition.default)
})