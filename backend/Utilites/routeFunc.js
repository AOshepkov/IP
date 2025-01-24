import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../Models/User.js'
import ExcrcLogSchema from '../Models/Logs.js'
import { jwtKey } from './utilKeys.js';

export const userReg = async (req,res) => {
    try {
        const pass = req.body.password
        const salt = await bcrypt.genSalt(10)
        const passHash = await bcrypt.hash(pass,salt)

        const doc = new UserModel({
            login: req.body.login,
            password: passHash,
        })

        const user = await doc.save()

        const token = jwt.sign(
            {_id: user._id},jwtKey
        )
        const {password,...userData} = user._doc
        res.json({
            ...userData,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: 'string',
            message: 'Не удалось зарегистрироваться'
        })
    }
}

export const userLog = async (req,res) => {
    try {
        const user = await UserModel.findOne({login:req.body.login})
        if (!user) {
            return res.status(404).json({
                type:'string',
                message:'Неверный логин или пароль'
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password,user._doc.password)
        if (!isValidPass) {
            return res.status(404).json({
                type: 'string',
                message:'Неверный логин или пароль'
            })
        }
        const token = jwt.sign(
            {_id: user._id},jwtKey
        )
        const {password,...userData} = user._doc
        res.json({
            ...userData,
            token,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: 'string',
            message: 'Не удалось войти в аккаунт'
        })
    }
}

export const userGetInfo = async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId)
        const { password, ...userData } = user._doc
        const token = jwt.sign({
            _id:req.userId
        },jwtKey)
        res.json(...userData,token)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message:'Пользователь не найден'
        })
    }
}

export const logAdd = async (req,res) => {
    try {
        const doc = new ExcrcLogSchema({
            id: req.body.id,
            stats: req.body.stats,
            user: req.userId,
        })
        const log = await doc.save()
        res.json(log)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Ошибка создания лога'
        })
    }
}