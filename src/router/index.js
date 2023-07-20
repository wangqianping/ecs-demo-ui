import Router from "vue-router";
import LoginForm from "@/components/LoginForm";
import IndexForm from "@/components/IndexForm";
import UserList from "@/components/UserList.vue"
import UserInformation from "@/components/UserInformation";
// import store from "@/store";

const router = new Router({

        routes: [
            {
                path: '/',
                component: LoginForm
            },
            {
                path: '/index',
                component: IndexForm
            },
            {
                path:'/userList',
                component: UserList
            },
            {
                path:'/userInformation',
                component: UserInformation
            }
        ]
    }
)

// router.beforeEach((to,from,next) =>{

//     console.log(123)
//     if(store.getters.TOKEN === null){
//         next("/")
//         return;
//     }
// })

export default router