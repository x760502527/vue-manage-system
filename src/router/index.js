import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/ghgqsbjh'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                    path: '/sjcj',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/sjcj.vue'),
                    meta: { title: '数据采集' }
                },
                {
                    path: '/ghgqsb',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ghgqsb.vue'),
                    meta: { title: '高后果区识别' }
                },
                {
                    path: '/ghgqsbjh',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ghgqsbjh.vue'),
                    meta: { title: '高后果区识别计划' }
                },
                {
                    path: '/ghgqsbjhcl',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ghgqsbjhcl.vue'),
                    meta: { title: '高后果区识别计划处理' }
                },
                {
                    path: '/ghgqjhcl',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ghgqjhcl.vue'),
                    meta: { title: '高后果区工作计划' }
                },
                {
                    path: '/ghgqfztj',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/ghgqfztj.vue'),
                    meta: { title: '高后果区分值统计' }
                },
                {
                    path: '/fxpj',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/fxpj.vue'),
                    meta: { title: '风险评价' }
                },
                {
                    path: '/fxpjjh',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/fxpjjh.vue'),
                    meta: { title: '风险评价计价' }
                },
                {
                    path: '/fxpjdf',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/fxpjdf.vue'),
                    meta: { title: '风险评价打分' }
                },
                {
                    path: '/fxpjtj',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/fxpjtj.vue'),
                    meta: { title: '风险评价统计' }
                }
            ]
        },
        {
            path: '/login',
            redirect: '/ghgqsbjh'
            /*component: () => import(/!* webpackChunkName: "login" *!/ '../components/page/Login.vue'),
            meta: { title: '登录' }*/
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
