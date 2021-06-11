import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
const store = new Vuex.Store({
  state: {
        items:'[ { "messid": 1, "message": "首页", "messurl": "elmui" }, { "messid": 2, "message": "接待", "messurl": "user/userlist" } ]',
         uname:'张三'
    
      },
    
      mutations: {
    
        //这里是set方法
    
        setitems(state,items){
    
                state.items = items
    
            },
    setname(state,name){
      state.uname=name;
    }
    
      },
    
        getters: {
    
        //get方法
    
            getitems: state => state.items
    
        },
    
      actions: {
    
        //这个部分我暂时用不上
    
      },
    
      modules: {
    
    //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
    
      }
    
})
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default store