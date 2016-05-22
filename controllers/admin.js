const Specialaccount = require('../models').specialaccount;
const Admin =  require('../models').admin;
const config = require('../config/admin');
const Router = require('express').Router;
const crypto = require('crypto');
const router = Router();
const Identification = require('../models').identification;
const Arbitration = require('../models').arbitration;

const cookPassword = (key,salt,saltPos) => {
    var hash = crypto.createHash('sha512');
    return hash.update(key.slice(0,saltPos))
        .update(salt)
        .update(key.slice(saltPos))
        .digest('base64')
};

/*管理员登录*/
router.post('/account/login',(req,res) =>{
    console.log('in /admin/login');
    console.log(req.body);
    
    Admin.findOne({
        where:{
            adminName: req.body.userName
        }
    })
    .then((admin) =>{
        if(!Admin){
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
            res.fail({
               code: -3 
            });
        }
    })
    .catch((err) =>{
        console.error('error in /admin/login:\n' +err.message);
        return res.fail({
            code: -2
        });
    });
});

/*管理员建立特殊账户*/
router.post(('/admin/create'),(req,res) => {
    console.log('in /admin/create');
    console.log(req.body);
     
    Specialaccount.findOne({
        where:{
            name: req.body.name
        }
    }).then((Specialaccount)=>{
        if(Specialaccount){
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
        Specialaccount.create(newSpecialaccount)
        .then(()=>{
            return res.success({
                code: 0
            });
        })
        .catch((err)=>{
            console.error('error in /admin/create:\n' + err.message);
            return res.fail({
                code: -2
            });
        });
    });
});

/*删除特殊账户*/
router.post('/admin/delete',(req,res) =>{
    console.log('int /admin/delete');
    console.log(req.body);
    
    Specialaccout.destroy({
        where:{
            name: req.body.name
        }
    }).then(
        (deletecount)=>{
            if(deletecount==0){
                return res.fail({
                    code: -1
                });
            }
            return res.success({
                code:0
            });
        }
    );
});

/*撤销特殊账户权限*/
router.post('/admin/withdrawal',(req,res)=>{
    console.log('in admin/withdrawal');
    console.log(req.body);

    Specialaccount.findOne({
        where:{
            name: req.body.name
        }
    }).then((specialaccount)=>{
        if(!specialaccount){
            return res.fail({
                code: -1
            });
        }
        newAuthority=specialaccount.authority&(7^req.body.authority);
        Specialaccount.update({
            authority: newAuthority
        },{
            where:{
                name: req.body.name
            }
        }).then((result)=>{
            if(result[0]==0){
                return res.fail({
                    code: -2
                });
            }
            return res.success({
                code: 0
            });
        }
        )
    }
    ).catch((err)=>{
        console.error('Error in admin/withdrawal:\n' +err.message);
        return res.fail({
            code: -2
        });
    });
});

/*自动实名认证*/
router.post('/admin/identification',(req,res)=>{
    console.log('in admin/identification');
    console.log(req.body);

    User.findOne({
        where:{
            userName: req.body.userName
        }
    }).then((user)=>{
        if(!user){
            return res.fail({
                code: -1
            });
        }
        Identification.findOne({
            where:{
                realName: user.userName
            }
        }).then((identification)=>{
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
        });
    });
});

/*身份数据库插入信息*/
router.post('/admin/updateidbase',(req,res)=>{
    console.log('in admin/identification');
    console.log(req.body);

    newId={
        realName: req.body.realName,
        idNumber: req.body.idNumber
    };
    
    Identification.findOne({
        where:{
            idNumber: newId.idNumber
        }
    }).then((identification)=>{
        if(identification){
            return res.fail({
                code: -1
            });
        }
        Identification.create(newId)
            .then(()=>{
                return res.success({
                    code: 0
                });
            });
    });
});

/*审查仲裁内容*/
router.get('/admin/arbitration',(req,res)=>{
    Arbitration.findAll({
        where: {
            state: 'ing'
        }
    }).then((arbitration) => {
        return res.success({
            code: 0,
            content: arbitration
        });
    });
});

/*用户信息删除*/
router.post('/admin/deleteuser',(req,res) => {
    User.findOne({
        where:{
            userName: req.body.userName
        }
    }).then((user) => {
        if(!user){
            return res.fail({
                code: -1
            });
        }
        User.destroy({
            where:{
                userName: user.userName
            }
        }).then(() => {
            res.success({
                code: 0
            });
        });
    });
});

/*用户信息修改*/
router.post('/admin/modifyuser',(req,res) => {
    User.update({
        status: req.status,
    }, {
        where: {
            userName: req.body.userName
        }
    }).then(() => {
        return res.success({
            code: 0
        });
    })
});

/*用户信息查找*/
/*通过帐号查找*/
router.get('/admin/checkbyusername',(req,res) => {
    User.findOne({
        where:{
            userName: req.body.userName
        }
    }).then((u) => {
        if(!u){
            return res.fail({
                code: -1
            });
        }
        return res.success({
            user: u,
            code: 0
        });
    });
});

/*通过真实姓名查找*/
router.get('/admin/checkbyrealname',(req,res) => {
    User.findOne({
        where:{
            realName: req.body.realName
        }
    }).then((u) => {
        if(!u){
            return res.fail({
                code: -1
            });
        }
        return res.success({
            user: u,
            code: 0
        });
    });
});

/*通过status查找*/
router.get('/admin/checkbystatus',(req,res) =>{
    User.findAll({
        where:{
            status: req.body.status
        }
    }).then((u) => {
       return res.success({
            user: u,
            code: 0
       });
    });
});

module.exports = router;
