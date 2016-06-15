'use strict'

/** 用户表 */
const User = require('../models').User;
/** 特殊用户表 */
const Specialaccount = require('../models').Specialaccount;
/** 管理员表 */
const Admin =  require('../models').Admin;
/** 配置 */
const config = require('../config/admin');
/** 后端路由 */
const Router = require('express').Router;
/** 加密模块 */
const crypto = require('crypto');
const router = Router();
/** 实名认证表 */
const Identification = require('../models').Identification;
/** 仲裁表 */
const Arbitration = require('../models').Arbitration;
/** 记录表 */
const AdminLog = require('../models').AdminLog;

/** 订单仲裁处理回调接口 */
const handleRefund = require('../services/order').handleRefund

const cookPassword = (key, salt) => {
  var hash = crypto.createHash('sha512');
  const mid = key.length >> 1
  return hash.update(key.slice(0, mid))
    .update(salt)
    .update(key.slice(mid))
    .digest('base64');
};

/*管理员登录*/
router.post('/admin/login',Promise.coroutine(function* (req,res){
  console.log('in /admin/login', req.body);
  let admin = yield Admin.findOne({
    where:{ adminName: req.body.username, level: { $lt: 2 } }
  })
  if (!admin) {
    return res.fail({ type: 'USER_NOT_EXIST' });
  }
  if (admin.disabled) {
    return res.fail({ type: 'USER_DISABLED' })
  }
  if (cookPassword(req.body.password, admin.salt) === admin.loginPass) {
    req.session.adminId = admin.id
    return res.success({ admin });
  }
  else {
    return res.fail({ type: 'INVALID_USERNAME_OR_PASSWORD' });
  }
}));

router.get('/admin/info', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const admin = yield Admin.findById(req.session.adminId)
  return res.success({ admin })
}))

/*管理员注册账户*/ //仅仅调试使用
router.post('/admin/register', Promise.coroutine(function *(req,res) {
  console.log('in /admin/register');
  console.log(req.body);
    const salt = crypto.randomBytes(64).toString('base64');
    const newAdmin = {
      adminName: req.body.username,
      level: req.body.level,
      realName: req.body.realname,
      salt: salt,
      email: req.body.email,
      phone: req.body.phone,
      loginPass: cookPassword(req.body.password, salt)
    };
    yield Admin.create(newAdmin)
    return res.success({ code: 0 });
}));

/*管理员建立特殊账户*/
router.post(('/admin/create'),Promise.coroutine(function *(req,res) {
    console.log('in /admin/create');
    console.log(req.body);

    let specialaccount = yield Specialaccount.findOne({
        where:{
            name: req.body.name
        }
    });
        if(specialaccount){
            console.log('account already exist!\n');
            return res.fail({
                code: -1
            });
        }
        const salt = crypto.randomBytes(64).toString('base64');
        const newSpecialaccount = {
            name: req.body.name,
            //订票员，审计员和系统管理员有不同权限
            authority: req.body.authority,
            salt: salt,
            loginPass: cookPassword(req.body.loginPass,
                                    salt)
        };
        yield Specialaccount.create(newSpecialaccount)
        return res.success({
                code: 0
            });
}));

/*删除特殊账户*/
router.post('/admin/delete',Promise.coroutine(function *(req,res) {
    console.log('int /admin/delete');
    console.log(req.body);

    let deletecount = yield Specialaccout.destroy({
        where:{
            name: req.body.name
        }
    });
            if(deletecount==0){
                return res.fail({
                    code: -1
                });
            }
            return res.success({
                code:0
            });
}));

/*撤销特殊账户权限*/
router.post('/admin/withdrawal',Promise.coroutine(function *(req,res){
    console.log('in admin/withdrawal');
    console.log(req.body);

    let specialaccount = yield Specialaccount.findOne({
        where:{
            name: req.body.name
        }
    });
        if(!specialaccount){
            return res.fail({
                code: -1
            });
        }
        newAuthority=specialaccount.authority&(7^req.body.authority);
        let result = yield Specialaccount.update({
            authority: newAuthority
        },{
            where:{
                name: req.body.name
            }
        });
            if(result[0]==0){
                return res.fail({
                    code: -2
                });
            }
            return res.success({
                code: 0
            });
}));


/*自动实名认证*/
router.post('/admin/identification',Promise.coroutine(function *(req,res){
    console.log('in admin/identification');
    console.log(req.body);

    let user = yield User.findOne({
        where:{
            userName: req.body.userName
        }
    });
        if(!user){
            return res.fail({
                code: -1
            });
        }
        let identification = yield Identification.findOne({
            where:{
                realName: user.userName
            }
        });
            if(!identification){
                console.log('no id information has been recorded!\n');
                return res.fail({
                    code: -1
                });
            }
            if(identification.idNumber!=user.idNumber){
                return res.fail({
                    code: -3
                });
            }
            User.update({
                    status: 1,
                }, {
                where:{
                    userName: req.userName
                    }
                })
            return res.success({
                code: 0
            });
}));

/*身份数据库插入信息*/
router.post('/admin/updateidbase',Promise.coroutine(function *(req,res){
    console.log('in admin/identification');
    console.log(req.body);

    newId={
        realName: req.body.realName,
        idNumber: req.body.idNumber
    };

    let identification = yield Identification.findOne({
        where:{
            idNumber: newId.idNumber
        }
    });
        if(identification){
            return res.fail({
                code: -1
            });
        }
        yield Identification.create(newId)
                return res.success({
                    code: 0
                });
}));

/*审查仲裁内容*/
router.get('/admin/arbitration',Promise.coroutine(function *(req,res){
    let arbitration = Arbitration.findAll({
        where: {
            state: 'ing'
        }
    });
        return res.success({
            code: 0,
            arbitrationList: arbitration
        });
}));

/*用户信息删除*/
router.post('/admin/deleteuser',Promise.coroutine(function *(req,res) {
    let user = User.findOne({
        where:{
            userName: req.body.userName
        }
    });
        if(!user){
            return res.fail({
                code: -1
            });
        }
        yield User.destroy({
            where:{
                userName: user.userName
            }
        })
        yield AdminLog.create({
            date: new Date(),
            content: 'delete',
            adminName: req.body.adminName,
            userName: req.body.userName
        });
            res.success({
                code: 0
            });
}));

/*用户信息修改*/
router.post('/admin/modifyuser',Promise.coroutine(function *(req,res) {
    yield User.update({
        status: req.status,
    }, {
        where: {
            userName: req.body.userName
        }
    });
        return res.success({
            code: 0
        });
}));

/*用户信息查找*/
/*通过帐号查找*/
router.get('/admin/checkbyusername',Promise.coroutine(function *(req,res) {
    let u = yield User.findOne({
        where:{
            userName: req.body.userName
        }
    });
        if(!u){
            return res.fail({
                code: -1
            });
        }
        return res.success({
            user: u,
            code: 0
        });
}));

/*通过真实姓名查找*/
router.get('/admin/checkbyrealname',Promise.coroutine(function *(req,res) {
    let u = yield User.findOne({
        where:{
            realName: req.body.realName
        }
    });
        if(!u){
            return res.fail({
                code: -1
            });
        }
        return res.success({
            user: u,
            code: 0
        });
}));

/*通过status查找*/
router.get('/admin/checkbystatus',Promise.coroutine(function *(req,res){
    let u = yield User.findAll({
        where:{
            status: req.body.status
        }
    });
       return res.success({
            user: u,
            code: 0
       });
}));

/*返回管理员信息列表*/
router.get('/admin/admininfo',Promise.coroutine(function *(req,res){
    let r = yield Admin.findAll({
    });
    return res.success({
        adminInfo: r,
        code: 0
    });
}));

/*查找所有的管理员操作记录*/
router.get('/admin/log', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  let logs = yield AdminLog.findAll({
    include: Admin
  });
  return res.success({ logs })
}));

/*查看所有的未自动认证用户*/
router.get('/admin/verifyinglist',Promise.coroutine(function* (req,res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const verifyingUsers = yield User.findAll({
    where: { status: 1 }
  });
  return res.success({ verifyingUsers });
}));

/*获取仲裁信息*/
router.get('/admin/getarbitration',Promise.coroutine(function *(req,res){
  let abs = yield Arbitration.findAll({
    where: { state: 'ing' }
  });
  return res.success({
    code: 0,
    arbitrationList: abs
  });
}));

/*解决仲裁*/
router.post('/admin/dealarbitration',Promise.coroutine(function *(req,res){
  yield Arbitration.update({
    state: req.body.op
  }, {
    where: { id: req.body.id }
  });
  const arb = yield Arbitration.findOne({ where: { id: req.body.id } });
  yield handleRefund(arb.orderId, req.body.op == 'accept', '', '');
  return res.success({
    op: req.body.op,
    code :0
  });
}));

router.post('/admin/verify', Promise.coroutine(function* (req,res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail();
  }
  const user = yield User.findById(req.body.id, {
    attributes: ['id', 'status', 'userName']
  });
  user.status = req.body.status
  yield user.save()
  yield AdminLog.create({
    adminId: req.session.adminId,
    content: `${req.body.status == 2 ? '通过' : '拒绝'}了用户 #${user.id} - ${user.userName} 的实名验证`
  })
  res.success({ user })
}));

/*删除管理员*/
router.post('/admin/deleteadmin',Promise.coroutine(function *(req,res){
  yield Admin.destroy({
    where: { adminName: req.body.adminName }
  });
  return res.success({ code: 0 });
}));

router.post('/admin/addadmin',Promise.coroutine(function *(req,res){
  let admin = yield Admin.findOne({
    where:{
      adminName: req.body.name
    }
  });
  if (admin) {
    return res.fail({ type: 'ADMINNAME_EXIST' })
  }
  const salt = crypto.randomBytes(64).toString('base64');
  const paySalt = crypto.randomBytes(64).toString('base64');
  const newAdmin = {
    adminName: req.body.adminName,
    realName: req.body.realName,
    level: req.body.level == 2 ? 2 : 1,
    salt: salt,
    loginPass: cookPassword(req.body.password,
                            salt,
                            config.saltPos)
    };
    admin = yield Admin.create(newAdmin)
    yield AdminLog.create({
      adminId: req.session.adminId,
      content: `创建了管理员用户 #${admin.id} - ${admin.adminName}`
    })
    return res.success({ admin })
}));

/*删除管理员*/
router.post('/admin/deleteadmin',Promise.coroutine(function *(req,res){
  yield Admin.destroy({
    where: { adminName: req.body.adminName }
  });
  return res.success({ code :0 });
}));

/*更改管理员权限*/
router.post('/admin/changelevel',Promise.coroutine(function *(req,res){
  yield Admin.update({
    level: level + req.body.changelevel
  }, {
    where: {
      adminName: req.body.adminName
    }
  });
  return res.success({
    code: 0
  });
}));

router.get('/admin/users', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const users = yield User.findAll({
    where: { booker: req.query.booker ? 1 : 0 }
  })
  res.success({ users })
}))

router.post('/admin/user/disable', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const user = yield User.findById(req.body.id)
  user.disabled = 1
  yield user.save()
  yield AdminLog.create({
    adminId: req.session.adminId,
    content: `禁用了普通用户 #${user.id} - ${user.userName} 的账户`
  })
  return res.success({ user })
}))

router.post('/admin/user/enable', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const user = yield User.findById(req.body.id)
  user.disabled = 0
  yield user.save()
  yield AdminLog.create({
    adminId: req.session.adminId,
    content: `启用了普通用户 #${user.id} - ${user.userName} 的账户`
  })
  return res.success({ user })
}))

router.get('/admin/user/:userId', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const user = yield User.findById(req.params.userId)
  res.success({ user })
}))

router.get('/admin/admins', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  let admins
  if (req.query.level == 2) {
    // 审计员
    admins = yield Admin.findAll({
      where: { level: 2 }
    })
  } else {
    // 管理员
    admins = yield Admin.findAll({
      where: { level: { $lt: 2 } }
    })
  }
  res.success({ admins })
}))

router.post('/admin/admin/disable', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const admin = yield Admin.findById(req.body.id)
  const identity = admin.level === 2 ? '审计员' : '管理员'
  admin.disabled = 1
  yield admin.save()
  yield AdminLog.create({
    adminId: req.session.adminId,
    content: `禁用了${identity} #${admin.id} - ${admin.adminName} 的账户`
  })
  return res.success({ admin })
}))

router.post('/admin/admin/enable', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const admin = yield Admin.findById(req.body.id)
  const identity = admin.level === 2 ? '审计员' : '管理员'
  admin.disabled = 0
  yield admin.save()
  yield AdminLog.create({
    adminId: req.session.adminId,
    content: `启用了${identity} #${admin.id} - ${admin.adminName} 的账户`
  })
  return res.success({ admin })
}))

/*添加管理员*/
router.post('/admin/add',Promise.coroutine(function* (req,res) {
  let admin = yield Admin.findOne({
    where:{ adminName: req.body.adminName }
  });
  if (admin) {
    return res.fail({ type: 'USERNAME_EXIST' });
  }
  const salt = crypto.randomBytes(64).toString('base64');
  const newAdmin = {
      adminName: req.body.adminName,
      level: req.body.level, // 审计员/普通管理员
      salt: salt,
      loginPass: cookPassword(req.body.loginPass, salt)
  };
  admin = yield Admin.create(newAdmin)
  return res.success({ admin });
}));

router.get('/admin/admin/:adminId', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.adminId) {
    return res.status(403).fail()
  }
  const admin = yield Admin.findById(req.params.adminId)
  res.success({ admin })
}))

router.post('/admin/adduser',Promise.coroutine(function *(req,res){
  let user = yield User.findOne({
    where:{ userName: req.body.name }
  });
  if (user) {
    return res.fail({ type: 'USERNAME_EXIST' })
  }
  const salt = crypto.randomBytes(64).toString('base64');
  const paySalt = crypto.randomBytes(64).toString('base64');
  const newUser = {
    userName: req.body.userName,
    realName: req.body.realName,
    booker: req.body.booker ? 1 : 0,
    salt: salt,
    status: req.body.booker ? 2 : 0,
    loginPass: cookPassword(req.body.password,
                            salt,
                            config.saltPos),
    payPass: cookPassword(req.body.password,
                            salt,
                            config.saltPos),
    address: req.body.address
  };
  user = yield User.create(newUser)
  yield AdminLog.create({
    adminId: req.session.adminId,
    content: `创建了票务管理员 #${user.id} - ${user.userName}`
  })
  return res.success({ user })
}));

module.exports = router;
