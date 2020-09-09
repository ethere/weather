import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        curCity:'北京',
        curProvince:''
    },
    mutations:{
        changeCity(state,city,province){
            state.curCity = city;
            state.curProvince = province;
        }
    }
})

