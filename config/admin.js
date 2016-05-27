module.exports = {
    loginSaltPos: 7,
    Authority: {
        ROOTADMIN:  0, //超级管理员
        BOOK:       1, //订票服务员
        AUDITOR:    2, //审计员
        SYSTEM:     4  //系统管理员
    },
    adminLevel:{
        NONE:       1, //无权限管理员
        NORMAL:     2, //普通管理员
        ROOT:       3,  //根管理员
        SYSTEM:     4  //系统管理员
    },
    LEVELUP: 1,      //管理员等级增加
    LEVELDOWN: -1   //管理员等级降低
};
