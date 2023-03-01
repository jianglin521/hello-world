import { createPinia } from 'pinia'
const pinia = createPinia()

export default function loadComponent(app: any) {
  app.use(pinia)
}
