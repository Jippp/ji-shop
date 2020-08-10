import Vuex from "Vuex"


let filterModule = {
    namespaced: true,
    state: {
        filterRatio: 1
    },
    mutations: {
        getFilterRatio(state, payload) {
            state.filterRatio = payload.filterRatio;
        }
    },
    actions: {
        getFilterRatioAction(context, payload) {
            context.commit("getFilterRatio", payload);
        }
    }
}
let carModule = {
    namespaced: true,
    state: {
        addList: [],
        addListCount: [],
        paymentActive: false,
        paymented: false
    },
    mutations: {
        getAddList(state, payload) {
            let len = state.addList.length;
            if (len) {
                // 判断是否已经存在的循环
                // 已存在就count+1
                for (let i = 0; i < len; i++) {
                    if (state.addList[i].id === payload.addList.id) {
                        state.addList[i].count++;
                        return;
                    }
                }
                // 可以执行到这就说明不存在
                state.addList.push(payload.addList);
                state.addList[len].count = 1;
            } else {
                state.addList.push(payload.addList);
                state.addList[len].count = 1;
            }
        },
        getAddListCount(state) {
            state.addListCount = state.addList.map((item) => {
                return item.count
            });
        },
        deleteAddList(state, payload) {
            state.addList.splice(payload.index, 1);
            state.addListCount.splice(payload.index, 1);
        },
        addProduct(state, payload) {
            state.addList.splice(0, 0);
            state.addListCount.splice(0, 0);
            state.addList[payload.index].count++;
            state.addListCount[payload.index]++;
        },
        deProduct(state, payload) {
            state.addList.splice(0, 0);
            state.addListCount.splice(0, 0);
            state.addList[payload.index].count--;
            state.addListCount[payload.index]--;

            if (state.addList[payload.index].count <= 0) {
                state.addList.splice(payload.index, 1);
            }
            if (state.addListCount[payload.index] <= 0) {
                state.addListCount.splice(payload.index, 1);
            }
        },
        nextStep(state) {
            state.paymentActive = true;
        },
        isSuccess(state) {
            state.paymented = true;
        },
        clearAddList(state) {
            state.addList = [];
            state.addListCount = [];
        },
        clearStep(state) {
            state.paymentActive = false;
            state.paymented = false;
        }
    },
    actions: {
        getAddListAction(context, payload) {
            context.commit("getAddList", payload);
            context.commit("getAddListCount");
        }
    }
}

let store = new Vuex.Store({
    stata: {
        maxPrice: 0
    },
    mutations: {
        getMaxPrice(state, payload) {
            state.maxPrice = payload.maxPrice;
        }
    },
    actions: {
        getMaxPriceAction(context, payload) {
            context.commit("getMaxPrice", payload);
        }
    },
    modules: {
        filter: filterModule,
        car: carModule
    }
})

export default store;