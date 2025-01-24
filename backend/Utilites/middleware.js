import jwt from 'jsonwebtoken';
import { body,validationResult } from "express-validator";
import { jwtKey } from './utilKeys.js'

export const userValidator = [
    body('password','Пароль должен содержать минимум 5 символов').isLength({min:5}),
    body('login','Логин должен содержать минимум 5 символов').isLength({min:5}),
]

export const handleValidationErrors = (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({type: 'array', message: errors.array()})
    }
    next()
}

export const checkAuth = (req,res,next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    if (!token) {
        return res.status(403).json({message:'Отказано в доступе'})
    }
    try {
        const decoded = jwt.verify(token,jwtKey)
        req.userId = decoded._id
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({message:'Отказано в доступе'})
    }
}

export const checkSession = (req,res,next) => {
    const token = req.session.user
    if (!token) {
        req.session.visited = true
        return res.status(401).json({message:'Не авторизован'})
    }
    try {
        const decoded = jwt.verify(token,jwtKey)
        req.userId = decoded._id
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Ошибка авторизации'})
    }
}