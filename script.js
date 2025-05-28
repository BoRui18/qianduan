// 模拟用户数据
let users = [
    { id: 1, username: 'admin', email: 'admin@example.com', role: '管理员', status: 'active' },
    { id: 2, username: 'editor1', email: 'editor1@example.com', role: '编辑', status: 'active' },
    { id: 3, username: 'viewer1', email: 'viewer1@example.com', role: '查看者', status: 'active' },
    { id: 4, username: 'editor2', email: 'editor2@example.com', role: '编辑', status: 'inactive' },
    { id: 5, username: 'viewer2', email: 'viewer2@example.com', role: '查看者', status: 'active' },
    { id: 6, username: 'admin2', email: 'admin2@example.com', role: '管理员', status: 'active' }
];

// 模拟日志数据
const logs = [
    { id: 1, time: '2023-05-15 10:30:22', operator: 'admin', action: '登录系统', ip: '192.168.1.100', type: 'login' },
    { id: 2, time: '2023-05-15 11:15:45', operator: 'admin', action: '创建用户: editor2', ip: '192.168.1.100', type: 'edit' },
    { id: 3, time: '2023-05-15 14:20:18', operator: 'admin', action: '修改用户: viewer1 的信息', ip: '192.168.1.100', type: 'edit' },
    { id: 4, time: '2023-05-15 16:45:30', operator: 'editor1', action: '更新文章: 系统公告', ip: '192.168.1.101', type: 'edit' },
    { id: 5, time: '2023-05-15 17:30:05', operator: 'admin', action: '删除用户: old_user', ip: '192.168.1.100', type: 'delete' }
];

// DOM元素
const elements = {
    menuToggle: document.getElementById('menuToggle'),
    sidebar: document.getElementById('sidebar'),
    menuItems: document.querySelectorAll('.menu-item'),
    pages: document.querySelectorAll('.page'),
    userCount: document.getElementById('userCount'),
    userTableBody: document.getElementById('userTableBody'),
    addUserBtn: document.getElementById('addUserBtn'),
    addUserModal: document.getElementById('addUserModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelUserBtn: document.getElementById('cancelUserBtn'),
    userForm: document.getElementById('userForm'),
    settingsForm: document.getElementById('settingsForm'),
    searchUser: document.getElementById('searchUser'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    currentPage: document.getElementById('currentPage'),
    logTableBody: document.getElementById('logTableBody'),
    logDateFilter: document.getElementById('logDateFilter'),
    logTypeFilter: document.getElementById('logTypeFilter'),
    logoutBtn: document.getElementById('logoutBtn'),
    currentDate: document.getElementById('currentDate'),
    activityChart: document.getElementById('activityChart')
};

// 分页状态
const pagination = {
    currentPage: 1,
    itemsPerPage: 5
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initSystem();
    renderUserTable();
    renderLogTable();
    setupEventListeners();
});

function initSystem() {
    // 设置当前日期
    const now = new Date();
    elements.currentDate.textContent = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // 更新用户计数
    elements.userCount.textContent = users.length;
    
    // 初始化图表
    initChart();
}

function initChart() {
    const ctx = elements.activityChart.getContext('2d');
    
    // 创建渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)');
    gradient.addColorStop(
