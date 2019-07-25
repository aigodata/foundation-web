## 前后端分离之前端工程

### 项目介绍

#### 浏览器兼容性

    Edge 12+   Firefox 55+    Chrome 60+    Safari 10+
    
#### 框架构成

    vue-cli3 + vue2 + vue-router3 + vuex3 + element-ui2
    
#### 图标字体

    iconfont 

### 环境安装

 本项目依赖 node.js， 使用前先安装 node.js 和 cnpm（显著提升依赖包的下载速度）。

 1. 自行下载并安装 node.js: 
 
        https://nodejs.org/en/download/

 2. 然后安装 cnpm 命令(安装 cnpm 提高安装速度):

        npm install -g cnpm --registry=https://registry.npm.taobao.org
        
        或者:
        
        npm install --registry=http://registry.npm.taobao.org

 3. 安装依赖

        npm install 或者 cnpm install
        

 4. 执行构建并启动服务

        npm start   |  npm run serve
        
### 默认登录的用户名密码

    admin  aigo@2019

### 数据库信息

    222.169.219.186:30032
    数据库：foundation
    用户名：root
    密码：aigo@2019

### 项目介绍


#### 页面权限控制

    重新设计了权限控制, 简化书写, 支持配置如下:
                       
     select  查询
     insert  添加
     update  修改
     delete  删除
     import  导入
     export  导出
    
    v-if="permissions('模块名.update')"  // 模块是否有更新权限
    
    v-if="permissions('模块名.update.delete')"   // 模块是否有更新或者删除权限
    
    示例一
      <el-button v-show="permission('模块名.update')">修改</el-button>
    
    示例二  
      <el-table-column v-if="permissions('模块名.update.delete')">
        <template slot-scope="scope">
          <el-button v-if="permission('update')">修改</el-button>
          <el-button v-if="permission('delete')">删除</el-button>
        </template>
      </el-table-column>

    ps:
       permission 方法, 由/mixin/permission.vue进行封装

### 启动项目流程

    1.   
    
    2.    
    
    3.  
    
    4.  
