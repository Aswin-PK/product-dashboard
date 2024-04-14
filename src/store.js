import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        products: [],
        categories: [],
        tableColumnHeaders: [],
        selectedCategory: '',
        totalItems: null,
        limit: 10,
    },
    mutations: {
        SET_PRODUCTS(state, productItems) {
            state.products = productItems
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },
        SET_TABLE_COLUMN_HEADERS(state) {
            const headers = Object.keys(state.products[0])
            state.tableColumnHeaders = headers
        },
        SET_TOTAL(state, total) {
            state.totalItems = total
        },
    },
    actions: {
        async setProducts({commit, state}, {category=state.selectedCategory, skip=0}) {
            state.selectedCategory = category
            const skipCount = (state.selectedCategory == '') ? ( (skip == 0) ? 0 : (skip-1)*state.limit ) : 0

            try {
                const response = await axios.get(`https://dummyjson.com/products${state.selectedCategory ? '/category/' + state.selectedCategory : ''}?limit=${state.limit}&skip=${skipCount}`);
                commit('SET_TOTAL', response.data.total)
                commit('SET_PRODUCTS', response.data.products)
                this.dispatch('setTableColumnHeaders')
            }
            catch(error) {
                console.log("Something went wrong...", error)
            }
        },
        async setCategories({commit}) {
            try {
                const response = await axios.get('https://dummyjson.com/products/categories');
                commit('SET_CATEGORIES', response.data)
            }
            catch(error) {
                console.log("Something went wrong...", error)
            }
        },

        setTableColumnHeaders({commit}) {
            commit('SET_TABLE_COLUMN_HEADERS')
        },

        async searchProducts({commit, state}, searchInput) {
            if(state.selectedCategory === ''){
                try {
                    const response = await axios.get(`https://dummyjson.com/products/search?q=${searchInput}&limit=${state.limit}`)
                    commit('SET_PRODUCTS', response.data.products)
                }
                catch(error) {
                    console.log("Error while searching...")
                }
            }
            else {
                let filteredProducts = state.products.filter(product => {
                    return product.title.toLowerCase().includes(searchInput.toLowerCase())
                })
                commit('SET_PRODUCTS', filteredProducts)
            }
        }
    },
    getters: {
        getAllProducts(state) {
            return state.products;
        },
        getAllCategories(state) {
            return state.categories;
        },
        getTableColumnHeaders(state) {
            return state.tableColumnHeaders;
        },
        getDisplayLimit(state) {
            return {limit: state.limit, total: state.totalItems};
        },
    }
})