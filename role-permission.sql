
-- 权限清单
-- 权限表

-- 仪表盘
INSERT INTO `sys_permission` VALUES (1, 'dashboard', '仪表盘', 'insert', '新增仪表盘');
INSERT INTO `sys_permission` VALUES (2, 'dashboard', '仪表盘', 'update', '更新仪表盘');
INSERT INTO `sys_permission` VALUES (3, 'dashboard', '仪表盘', 'delete', '删除仪表盘');
INSERT INTO `sys_permission` VALUES (4, 'dashboard', '仪表盘', 'select', '查询仪表盘');
INSERT INTO `sys_permission` VALUES (5, 'dashboard', '仪表盘', 'export', '导出仪表盘');
INSERT INTO `sys_permission` VALUES (6, 'dashboard', '仪表盘', 'import', '导入仪表盘');

-- 页面1_1
INSERT INTO `sys_permission` VALUES (7, 'page1_1', '页面1_1', 'insert', '新增页面1_1');
INSERT INTO `sys_permission` VALUES (8, 'page1_1', '页面1_1', 'update', '更新页面1_1');
INSERT INTO `sys_permission` VALUES (9, 'page1_1', '页面1_1', 'delete', '删除页面1_1');
INSERT INTO `sys_permission` VALUES (10, 'page1_1', '页面1_1', 'select', '查询页面1_1');
INSERT INTO `sys_permission` VALUES (11, 'page1_1', '页面1_1', 'export', '导出页面1_1');
INSERT INTO `sys_permission` VALUES (12, 'page1_1', '页面1_1', 'import', '导入页面1_1');

-- 页面1_2_1
INSERT INTO `sys_permission` VALUES (13, 'page1_2_1', '页面1_2_1', 'insert', '新增页面1_2_1');
INSERT INTO `sys_permission` VALUES (14, 'page1_2_1', '页面1_2_1', 'update', '更新页面1_2_1');
INSERT INTO `sys_permission` VALUES (15, 'page1_2_1', '页面1_2_1', 'delete', '删除页面1_2_1');
INSERT INTO `sys_permission` VALUES (16, 'page1_2_1', '页面1_2_1', 'select', '查询页面1_2_1');
INSERT INTO `sys_permission` VALUES (17, 'page1_2_1', '页面1_2_1', 'export', '导出页面1_2_1');
INSERT INTO `sys_permission` VALUES (18, 'page1_2_1', '页面1_2_1', 'import', '导入页面1_2_1');

-- 页面1_2_2_1
INSERT INTO `sys_permission` VALUES (19, 'page1_2_2_1', '页面1_2_2_1', 'insert', '新增页面1_2_2_1');
INSERT INTO `sys_permission` VALUES (20, 'page1_2_2_1', '页面1_2_2_1', 'update', '更新页面1_2_2_1');
INSERT INTO `sys_permission` VALUES (21, 'page1_2_2_1', '页面1_2_2_1', 'delete', '删除页面1_2_2_1');
INSERT INTO `sys_permission` VALUES (22, 'page1_2_2_1', '页面1_2_2_1', 'select', '查询页面1_2_2_1');
INSERT INTO `sys_permission` VALUES (23, 'page1_2_2_1', '页面1_2_2_1', 'export', '导出页面1_2_2_1');
INSERT INTO `sys_permission` VALUES (24, 'page1_2_2_1', '页面1_2_2_1', 'import', '导入页面1_2_2_1');

-- 页面1_2_2_2
INSERT INTO `sys_permission` VALUES (25, 'page1_2_2_2', '页面1_2_2_2', 'insert', '新增页面1_2_2_2');
INSERT INTO `sys_permission` VALUES (26, 'page1_2_2_2', '页面1_2_2_2', 'update', '更新页面1_2_2_2');
INSERT INTO `sys_permission` VALUES (27, 'page1_2_2_2', '页面1_2_2_2', 'delete', '删除页面1_2_2_2');
INSERT INTO `sys_permission` VALUES (28, 'page1_2_2_2', '页面1_2_2_2', 'select', '查询页面1_2_2_2');
INSERT INTO `sys_permission` VALUES (29, 'page1_2_2_2', '页面1_2_2_2', 'export', '导出页面1_2_2_2');
INSERT INTO `sys_permission` VALUES (30, 'page1_2_2_2', '页面1_2_2_2', 'import', '导入页面1_2_2_2');

-- 页面2
INSERT INTO `sys_permission` VALUES (31, 'page2', '页面2', 'insert', '新增页面2');
INSERT INTO `sys_permission` VALUES (32, 'page2', '页面2', 'update', '更新页面2');
INSERT INTO `sys_permission` VALUES (33, 'page2', '页面2', 'delete', '删除页面2');
INSERT INTO `sys_permission` VALUES (34, 'page2', '页面2', 'select', '查询页面2');
INSERT INTO `sys_permission` VALUES (35, 'page2', '页面2', 'export', '导出页面2');
INSERT INTO `sys_permission` VALUES (36, 'page2', '页面2', 'import', '导入页面2');

-- 角色权限关联表
INSERT INTO `sys_role_permission` VALUES (1, 1);
INSERT INTO `sys_role_permission` VALUES (1, 2);
INSERT INTO `sys_role_permission` VALUES (1, 3);
INSERT INTO `sys_role_permission` VALUES (1, 4);
INSERT INTO `sys_role_permission` VALUES (1, 5);
INSERT INTO `sys_role_permission` VALUES (1, 6);
INSERT INTO `sys_role_permission` VALUES (1, 7);
INSERT INTO `sys_role_permission` VALUES (1, 8);
INSERT INTO `sys_role_permission` VALUES (1, 9);
INSERT INTO `sys_role_permission` VALUES (1, 10);
INSERT INTO `sys_role_permission` VALUES (1, 11);
INSERT INTO `sys_role_permission` VALUES (1, 12);
INSERT INTO `sys_role_permission` VALUES (1, 13);
INSERT INTO `sys_role_permission` VALUES (1, 14);
INSERT INTO `sys_role_permission` VALUES (1, 15);
INSERT INTO `sys_role_permission` VALUES (1, 16);
INSERT INTO `sys_role_permission` VALUES (1, 17);
INSERT INTO `sys_role_permission` VALUES (1, 18);
INSERT INTO `sys_role_permission` VALUES (1, 19);
INSERT INTO `sys_role_permission` VALUES (1, 20);
INSERT INTO `sys_role_permission` VALUES (1, 21);
INSERT INTO `sys_role_permission` VALUES (1, 22);
INSERT INTO `sys_role_permission` VALUES (1, 23);
INSERT INTO `sys_role_permission` VALUES (1, 24);
INSERT INTO `sys_role_permission` VALUES (1, 25);
INSERT INTO `sys_role_permission` VALUES (1, 26);
INSERT INTO `sys_role_permission` VALUES (1, 27);
INSERT INTO `sys_role_permission` VALUES (1, 28);
INSERT INTO `sys_role_permission` VALUES (1, 29);
INSERT INTO `sys_role_permission` VALUES (1, 30);
INSERT INTO `sys_role_permission` VALUES (1, 31);
INSERT INTO `sys_role_permission` VALUES (1, 32);
INSERT INTO `sys_role_permission` VALUES (1, 33);
INSERT INTO `sys_role_permission` VALUES (1, 34);
INSERT INTO `sys_role_permission` VALUES (1, 35);
INSERT INTO `sys_role_permission` VALUES (1, 36);

	