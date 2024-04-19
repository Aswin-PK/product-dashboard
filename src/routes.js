// import HomePage from './pages/home.vue'
import ProductDetails from './pages/product-details.vue'
import CategoryListPage from './pages/category-list.vue'
import CategoryProductsPage from './pages/category-products.vue'
import ProductFormPage from './pages/product-form-page.vue'
import DashboardPage from './pages/dashboard.vue'
import HomePage from './pages/home.vue'


export const Routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: DashboardPage,
        children: [
            { path: '', redirect: 'all-products' },
            { path: 'all-products', component: HomePage },
            { path: 'all-products/:id', component: ProductDetails },
            { path: 'categories', component: CategoryListPage },       
            { path: 'categories/:category', component: CategoryProductsPage},
            { path: 'categories/:category/:id', component: ProductDetails},
            { path: 'add-product', component: ProductFormPage },
            { path: 'edit-product', component: ProductFormPage },
        ]
    },
]