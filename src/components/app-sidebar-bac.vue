<template>
    <div class="sidebar">
        <!-- logo -->
        <div class="logo">
            <img src="../assets/images/logo.png" alt="logo" width="150">
        </div>
        <!-- 一级菜单 -->
        <ul class="menu menu-container" :class="expand ? 'fat' : 'thin'">
            <!-- 一级菜单项 -->
            <li v-for="(item, index) in permissionMenu" @click.stop="activeItem(item)" class="menu-item menu-first-item" :class="{active: item.active}" v-if="item.show">
                <i class="icon iconfont" :class="item.icon"></i>
                <span class="item-text">{{item.name}}</span>
                <!-- 没有子菜单, 隐藏小图标 -->
                <i v-if="isChildren(item)" class="el-icon-caret-right"></i>

                <!-- 二级菜单 -->
                <ul v-if="isChildren(item)" class="menu sub-menu">
                    <!-- 二级菜单项 -->
                    <li v-for="(secondItem, index) in item.children" @click.stop="activeItem(secondItem)" class="menu-item" :class="{active: secondItem.active}" v-if="secondItem.show">
                        <span class="item-text">{{secondItem.name}}</span>
                        <!-- 没有子菜单, 隐藏小图标 -->
                        <i v-if="isChildren(secondItem)" class="el-icon-caret-right"></i>

                        <!-- 三级菜单 -->
                        <ul v-if="isChildren(secondItem)" class="menu sub-menu">
                            <!-- 三级菜单项 -->
                            <li v-for="(thirdItem, index) in secondItem.children" @click.stop="activeItem(thirdItem)" class="menu-item" :class="{active: thirdItem.active}" v-if="thirdItem.show">
                                <span class="item-text">{{thirdItem.name}}</span>
                                <!-- 没有子菜单, 隐藏小图标 -->
                                <i v-if="isChildren(thirdItem)" class="el-icon-caret-right"></i>

                                <!-- 四级菜单 -->
                                <ul v-if="isChildren(thirdItem)" class="menu sub-menu">
                                    <!-- 四级菜单项 -->
                                    <li v-for="(fourthItem, index) in thirdItem.children" @click.stop="activeItem(fourthItem)" class="menu-item" :class="{active: fourthItem.active}" v-if="fourthItem.show">
                                        <span class="item-text">{{fourthItem.name}}</span>
                                        <!-- 没有子菜单, 隐藏小图标 -->
                                        <!--<i v-if="isChildren(thirdItem)" class="el-icon-caret-right"></i>-->
                                    </li>
                                </ul>

                            </li>
                        </ul>

                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'app-sidebar',
    props: ['expand'],
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'activeMenu'
    },
    computed: {
        permission () {
            return this.$store.getters.permission
        }
    },
    data () {
        return {
            // 被权限过滤后当前菜单
            permissionMenu: [],
            // 所有的菜单模板
            menu: {
                main: [
                    //财务报表
                    {
                        icon: "icon-shujuyuanguanli",
                        name: "财务报表",
                        routerName: "financial_statements",
                        children: [
                            {
                                name: "实时查看",
                                routerName: "financial_real_viewing"
                            }, {
                                name: "损益表",
                                routerName: "financial_income_statement"
                                // children: [
                                //     {
                                //         name: "报表状态",
                                //         routerName: "financial_report_status"
                                //     },
                                //     {
                                //         name: "数据报表",
                                //         routerName: "financial_data_report",
                                //         chilren: [
                                //             {
                                //                 name: "CFAA报表",
                                //                 routerName: "financial_cfaa_report"
                                //             }, {
                                //                 name: "事业部报表",
                                //                 routerName: "financial_department_report"
                                //             }, {
                                //                 name: "分子公司报表",
                                //                 routerName: "financial_constituent_company",
                                //                 children: [
                                //                     {
                                //                         name: "报表生成",
                                //                         routerName: "financial_report_generation"
                                //                     }, {
                                //                         name: "调整剔除",
                                //                         routerName: "financial_adjustment_del"
                                //                     }, {
                                //                         name: "报表查询",
                                //                         routerName: "financial_report_query"
                                //                     }
                                //                 ]
                                //             }
                                //         ]
                                //     }
                                // ]
                            }, {
                                name: "资产负债表",
                                routerName: "financial_balance_sheet"
                            }
                        ]
                    },
                    //数据同步
                    {
                        icon: 'icon-xitongguanli',
                        name: '数据同步',
                        routerName: 'data_sync',
                        children: [
                            {
                                name: "数据源管理",
                                routerName: "data_admin"
                            }, {
                                name: "同步状态",
                                routerName: "data_sync_status"
                            }, {
                                name: "EE数据源",
                                routerName: "data_ee_data",
                                children: [
                                    {
                                        name: "成本中心",
                                        routerName: "data_cost_center"
                                    }, {
                                        name: "科目",
                                        routerName: "data_subject"
                                    }, {
                                        name: "会计单位",
                                        routerName: "data_accountant"
                                    }, {
                                        name: "科目明细账",
                                        routerName: "data_subject_balance"
                                    },
                                ]
                            }, {
                                name: "OA数据源",
                                routerName: "data_oa_data"
                            },

                        ]

                    },
                    //分析报表
                    {
                        icon: 'icon-xitongguanli',
                        name: '分析报表',
                        routerName: 'analysis_report',
                    },
                    //富维报表
                    {
                        icon: 'icon-xitongguanli',
                        name: '富维报表',
                        routerName: 'fw_report',
                    },
                    //预算填报
                    {
                        icon: 'icon-xitongguanli',
                        name: '预算填报',
                        routerName: 'budget_report',
                    },
                    //自定义报表
                    {
                        icon: 'icon-xitongguanli',
                        name: '自定义报表',
                        routerName: 'custom_report',
                        children: [
                            {
                                name: '费用分析',
                                routerName: 'custom_cost_analysis',
                            }, {
                                name: 'BOD财务摘要',
                                routerName: 'custom_bod_finance',
                            }, {
                                name: '损益概览',
                                routerName: 'custom_profit_loss',
                            }, {
                                name: '自定义报表模板',
                                routerName: 'custom_cost_report',
                            }, {
                                name: '报表数据',
                                routerName: 'custom_cost_data',
                                children: [
                                    {
                                        name: '历史报表',
                                        routerName: 'custom_history_report',
                                    }, {
                                        name: '历史报表-CFAA',
                                        routerName: 'custom_history_report_cfaa',
                                    },
                                ]
                            },
                        ]
                    },
                    //系统管理
                    {
                        icon: 'icon-xitongguanli',
                        name: '系统管理',
                        routerName: 'sys_manage',
                        children: [
                            {
                                name: '用户管理',
                                routerName: 'sys_user'
                            },
                            {
                                name: '角色管理',
                                routerName: 'sys_role'
                            },
                            {
                                name: '权限管理',
                                routerName: 'sys_organization_power'
                            },
                            {
                                name: '组织机构管理',
                                routerName: 'sys_organization_manage'
                            },
                        ]
                    },
                    {
                        icon: 'icon-shujuyuanguanli',
                        name: '数据源管理',
                        routerName: 'data_source',
                        children: [
                            {
                                name: '数据源管理',
                                routerName: 'data_source_manage'
                            },
                            {
                                name: '数据源同步列表',
                                routerName: 'data_source_sync'
                            },
                        ]
                    },
                    {
                        icon: 'icon-shujubiao',
                        name: '基础数据表',
                        routerName: 'basic_data',
                        children: [
                            {
                                name: '科目明细账',
                                routerName: 'basic_data_subject_balance'
                            },
                            {
                                name: '成本中心',
                                routerName: 'basic_data_cost_center'
                            },
                            {
                                name: '科目表',
                                routerName: 'basic_data_subject'
                            },
                            {
                                name: '会计单位表',
                                routerName: 'basic_data_company'
                            },
                        ]
                    },
                    {
                        icon: 'icon-Relationshipmainten',
                        name: '数据关系维护',
                        routerName: 'data_mapping',
                        children: [
                            {
                                name: '科目类别',
                                routerName: 'mapping_subject_category'
                            },
                            {
                                name: "科目类别映射管理",
                                routerName: 'mapping_subject_management'
                            },
                            {
                                name: '成本中心',
                                routerName: 'mapping_cost_center'
                            },
                            {
                                name: '分子公司',
                                routerName: 'mapping_constituent_company'
                            },
                        ]
                    },
                    {
                        icon: 'icon-lishibaobiao',
                        name: '核算报表',
                        routerName: 'accounting',
                        children: [
                            {
                                name: '实时查看',
                                routerName: 'accounting_real_query'
                            },
                            {
                                name: '损益表',
                                routerName: 'income_statement',
                                children: [
                                    {
                                        name: '报表状态',
                                        routerName: 'accounting_income_statement_state'
                                    },
                                    {
                                        name: 'CFAA报表',
                                        routerName: 'accounting_income_statement_cfaa'
                                    },
                                    {
                                        name: '事业部报表',
                                        routerName: 'accounting_income_statement_department'
                                    },
                                    {
                                        name: '分子公司报表',
                                        routerName: 'constituent_company',
                                        children: [
                                            {
                                                name: '报表生成',
                                                routerName: 'accounting_income_statement_constituent_company_generate',
                                            },
                                            {
                                                name: '调整剔除',
                                                routerName: 'accounting_income_statement_constituent_company_edit',
                                            },
                                            {
                                                name: '报表查询',
                                                routerName: 'accounting_income_statement_constituent_company_query',
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                name: '资产负债表',
                                routerName: 'balance_sheet',
                                children: [
                                    {
                                        name: '报表状态',
                                        routerName: 'accounting_report_balance_sheet_state'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        icon: 'icon-chakan',
                        name: '分析报表',
                        routerName: 'analysis'
                    },
                ]
            }
        }
    },
    methods: {
        // 是否有子菜单
        isChildren (item) {
            return item.children && item.children.length > 0
        },
        // 设置菜单选中
        activeMenu () {
            let menu = JSON.parse(JSON.stringify(this.menu[this.$store.state.navName]));
            this.eachActive(menu);
            // @特殊处理, 如果子页面有访问权限, 那么文件夹的也有访问权限
            let arr = this.getPermissionRoute(this.$router.options.routes, this.permission, []);
            this.permissionMenu = this.getPermissionMenu(menu, this.permission, arr);
            // @特殊处理, 如果所有菜单都没有配置权限, 则侧边栏消失
            if (Array.isArray(this.permissionMenu) && this.permissionMenu.length > 0 && !this.permissionMenu.some(v => v.show)) {
                this.$store.commit('sidebarShow', { sidebarShow: false });
            }
        },
        // 取得有访问权限的父路由
        getPermissionRoute (router, permission, arr) {
            router.forEach(item => {
                // 如果是组, 开始递归
                if (Array.isArray(item.children)) {
                    arr.concat(this.getPermissionRoute(item.children, permission, arr));
                    // @特殊处理, 如果子菜单有个别有访问权限, 则组也可见
                    let show = item.children.some(v => v.meta.show);
                    !item.meta && (item.meta = {});
                    show && arr.push(item.name);
                    item.meta.show = show
                } else {
                    // 判断单个路由是否有访问权限
                    let per = permission[item.name];
                    let show = (per && per.query) ? true : false;
                    !item.meta && (item.meta = {});
                    item.meta.show = show;
                    show && arr.push(item.name);
                }
            });
            // console.log(arr);
            return arr;
        },
        // 权限控制
        getPermissionMenu (menu, permission, arr) {
            menu.forEach(item => {
                let show = true;
                // 如果是组, 开始递归
                if (Array.isArray(item.children)) {
                    if (item.children.length > 0) {
                        this.getPermissionMenu(item.children, permission, arr);
                        // @特殊处理, 如果子菜单都不可见, 则组也不可见
                        show = item.children.some(v => v.show);
                    }
                } else {
                    // console.log(item.routerName);
                    // 判断是否拥有权限
                    let per = permission[item.routerName];
                    show = (per && per.query) ? true : false;
                }
                // @特殊处理, 如果子页面有访问权限, 那么文件夹的也有访问权限
                if (arr.includes(item.routerName)) {
                    show = true;
                }
                this.$set(item, 'show', show);
            });
            return menu;
        },
        // 递归遍历菜单
        eachActive (arr) {
            arr.forEach(item => {
                // @特殊处理, 递归执行eachActive会清空active的赋值, 所以当 active = undefined | false 赋值
                if (!item.active) {
                    this.$set(item, 'active', this.matchMenuWithRoute(item))
                }
                if (Array.isArray(item.children)) {
                    this.eachActive(item.children)
                }
            });
        },
        // 将路由和菜单项匹配
        matchMenuWithRoute (item) {
            // 子路由会继承父路由的params参数
            const routeParams = this.$route.params;
            return !!this.$route.matched.find(match => {
                // 路由名 & 参数
                let sameRouter = (match.name === item.routerName);
                let sameParams = true;
                // 过滤没有配置参数的情况
                if (item.params) {
                    sameParams = JSON.stringify(item.params) + '' === JSON.stringify(routeParams) + ''
                }
                return sameRouter && sameParams;
            });
        },
        // 点击菜单事件
        activeItem: function (item) {
            if (item.children && item.children.length > 0) {
                // @特殊处理, 选中有子菜单的父菜单时, 默认选中第一个可显示的子菜单
                this.activeItem(item.children.find(v => v.show));
            } else {
                let path = { name: item.routerName };
                item.params && (path.params = item.params);
                item.routerName && this.$router.push(path);
            }
        }
    },
    mounted () {
        this.activeMenu();
    }
}
</script>

<style>
.sidebar {
    height: 100%;
}

.sidebar .logo {
    height: 79px;
    border-bottom: 1px solid #0b4d60;
    text-align: center;
    line-height: 79px;
}

.sidebar .menu-container {
    height: calc(100% - 80px);
}

.sidebar .menu {
    border-radius: 0;
    text-align: left;
    box-sizing: border-box;
    font-weight: 500;
}

.sidebar .menu-item {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #fff;
    padding-left: 17px;
    font-size: 14px;
    position: relative;
}

.sidebar .menu-item .item-text {
    padding-left: 10px;
}

.sidebar .menu-item .el-icon-caret-right {
    position: absolute;
    right: 15px;
    top: 20px;
}

.sidebar .sub-menu > .menu-item .el-icon-caret-right {
    position: absolute;
    right: 15px;
    top: 15px;
}

.sidebar .menu-item .icon {
    position: relative;
    top: 1px;
}

.sidebar .menu-item:hover {
    color: #fff;
    background: rgba(182, 205, 51, 0.85);
}

.sidebar .menu-item.active {
    color: #fff;
    background: rgba(182, 205, 51, 1);
}

.sidebar .menu-item:hover > .sub-menu {
    display: block;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

.sidebar .menu-item > .sub-menu {
    display: none;
    position: absolute;
    width: 180px;
    right: -180px;
    top: 5px;
    background-color: #0b4d60;
    box-shadow: 4px 4px 9px RGBA(0, 0, 0, 0.28);
    transition: all 0.25s;
    transform-origin: top;
    padding: 0.5rem 0;
    border-bottom: 1px solid #252525;
}

.sidebar .sub-menu > .menu-item {
    height: 40px;
    line-height: 40px;
}

/* 收起情况 */

.sidebar .menu.thin {
}

.sidebar .menu.thin .menu-first-item > .item-text {
    display: none;
}

.sidebar .menu.thin .menu-first-item:hover > .item-text {
    position: absolute;
    bottom: -12px;
    left: 5px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    display: block;
    border-radius: 3px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    white-space: nowrap;
    padding: 0 5px;
}

.sidebar .menu.thin .menu-first-item > .el-icon-caret-right {
    display: none;
}
</style>
