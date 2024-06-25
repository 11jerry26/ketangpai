import VueRouter from "vue-router"


//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
          path:'/',
            // 初始路由
          redirect:'/homePage'
        },
        {
            path:'/homePage',
            component:()=>import("@/page/HomePage.vue")
        },
        {
            path:'/aboutUs',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/productDynamic',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/clauseService',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/downloadBrowse',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/login',
            component:()=>import("@/page/Login.vue")
        },
        {
            path:'/register',
            component:()=>import("@/page/Register.vue")
        },
        {
            path:'/productFunction',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/mechanism',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/cooperation',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/vipPower',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/helpCenter',
            component:()=>import("@/page/AboutUs.vue")
        },
        {
            path:'/main',
            component:()=>import("@/page/MyClass.vue"),
            // children:[
            //     {
            //         path:'classDetail',
            //         component:()=>import("@/page/ClassDetail.vue")
            //     }
            // ]
        },
        {
            path:'/classDetail',
            component:()=>import("@/page/ClassDetail.vue"),
            children: [{
                path: '/',
                name: 'learning',
                component: ()=>import("@/page/CourseLearning.vue"),
                meta:{
                    title:'课程内容'
                },
            },
            {
                path: 'analyse',
                name: 'analyse',
                component: ()=>import("@/page/SemesterAnalysis.vue"),
                meta:{
                    title:'课程内容'
                },
            },
            {
                path: 'scores',
                name: 'scores',
                component: ()=>import("@/page/GradeManagement.vue"),
                meta:{
                    title:'课程内容'
                },
            },
            {
                path: 'introduction',
                name: 'introduction',
                component: ()=>import("@/page/CourseIntroduction.vue"),
                meta:{
                    title:'课程内容'
                },
            }]
        },
        {
            path: '/homeworkDetail',
            component: ()=>import("@/page/HomeworkDetail.vue"),
        }
    ]
})
