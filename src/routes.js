// import HomePage from './pages/home.vue'
import ProductDetails from './pages/product-details.vue'
import CategoryListPage from './pages/category-list.vue'
import CategoryProductsPage from './pages/category-products.vue'
import ProductFormPage from './pages/product-form-page.vue'
import LoginPage from './pages/login-page.vue'
import DashboardPage from './pages/dashboard.vue'
import HomePage from './pages/home.vue'


export const Routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true },
        children: [
            { path: '', redirect: 'all-products' },
            { path: 'all-products', component: HomePage, meta: { requiresAuth: true }},
            { path: 'all-products/:id', component: ProductDetails, meta: { requiresAuth: true } },
            { path: 'categories', component: CategoryListPage, meta: { requiresAuth: true }},       
            { path: 'categories/:category', component: CategoryProductsPage, meta: { requiresAuth: true }},
            { path: 'categories/:category/:id', component: ProductDetails, meta: { requiresAuth: true }},
            { path: 'add-product', component: ProductFormPage, meta: { requiresAuth: true } },
            { path: 'edit-product', component: ProductFormPage, meta: { requiresAuth: true } },
        ]
    },
]