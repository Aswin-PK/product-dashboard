import HomePage from '@/pages/Home.vue'
import ProductDetails from '@/pages/ProductDetails.vue'

export const Routes = [
    { path: '/', component: HomePage },
    { path: '/product/:id', component: ProductDetails },
]