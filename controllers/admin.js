'use strict'
const User = require('../models').user;
const Specialaccount = require('../models').specialaccount;
const Admin =  require('../models').admin;
const config = require('../config/admin');
const Router = require('express').Router;
const crypto = require('crypto');
const router = Router();
const Identification = require('../models').identification;
const Arbitration = require('../models').arbitration;
const Log = require('../models').adminlog;

const cookPassword = (key,salt,saltPos) => {
    var hash = crypto.createHash('sha512');
    return hash.update(key.slice(0,saltPos))
        .update(salt)
        .update(key.slice(saltPos))
        .digest('base64')
};

/*管理员登录*/
router.post('/account/login',Promise.coroutine(function *(req,res){
    console.log('in /admin/login');
    console.log(req.body);
    
    let admin = yield Admin.findOne({
        where:{
            adminName: req.body.userName
        }
    })

        if(!admin){
            return res.fail({
                code: -1
            });
        }
        if(cookPassword(
        req.body.loginPass,
        admin.loginSalt,
        config.loginSaltPos) === admin.loginPass){
            return res.success({
                code:0,
                adminId: admin.id
            });
        }
        else{
            return res.fail({
               code: -3 
            });
        }
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
        const loginSalt=crypto.randomBytes(64).toString('base64');
        const paySalt=crypto.randomBytes(64).toString('base64');
        const newSpecialaccount = {
            name: req.body.name,
            //订票员，审计员和系统管理员有不同权限
            authority: req.body.authority,
            loginSalt: loginSalt,
            loginPass: cookPassword(req.body.loginPass,
                                    loginSalt,
                                    config.loginSaltPos)
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
            content: arbitration
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
        yield Log.create({
            date: 1,
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

/*查找所有的管理员操作记录*/
router.get('/admin/log',Promise.coroutine(function *(req,res){
    let r = yield Log.findAll({
    });
    return res.success({
        result: r,
        code: 0
    })
}));

/*查看所有的未自动认证用户*/
router.get('/admin/verifylist',Promise.coroutine(function *(req,res){
    let unVerifiedUser= yield User.findAll({
        where:{
            status : false
        }
    });

    return res.success({
        code:0,
        unverifieduser: unVerifiedUser
    });
}));

/*获取仲裁信息*/
router.get('/admin/getarbitration',Promise.coroutine(function *(req,res){
    let abs = yield Arbitration.findAll({
        where:{
            state: 'ing'
        }
    });
    return res.success({
        code: 0,
        arbitrations: abs
    });
}));

/*解决仲裁*/
router.post('/admin/dealarbitration',Promise.coroutine(function *(req,res){
    yield Arbitration.update({
        state: req.body.op
    },{
        where:{
            userName: req.body.userName
        }
    });
    return res.success({
        code :0
    });
}));

module.exports = router;
