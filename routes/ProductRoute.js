import { getProduct, 
    getProductById, 
    requestForProduct, 
    getProductWithinOneDay, 
    getProductWithinSevenDays, 
    getProductWithinOneMonth, 
    getApprovedProduct, getRejectedProduct, 
    deleteProduct } from '../controllers/ProductController.js'
import { verifyUser, adminOnly } from '../middleware/AuthorisedUser.js'
import express from 'express'

const router = express.Router()

router.get('/ProductWithinOneMonth', verifyUser, getProductWithinOneMonth)
router.get('/ProductWithinSevenDays', verifyUser, getProductWithinSevenDays)
router.get('/ProductWithinOneDay', verifyUser, getProductWithinOneDay)
router.get('/rejectedProduct', verifyUser, getRejectedProduct)
router.get('/approvedProduct', verifyUser, getApprovedProduct)
router.get('/product', verifyUser, getProduct)
router.post('/Product', verifyUser, requestForProduct)
router.get('/Product/:uid', verifyUser, getProductById)
// router.patch('/Product/:uid', updateProduct)
router.delete('/Product/:uid', verifyUser, deleteProduct)

export default router