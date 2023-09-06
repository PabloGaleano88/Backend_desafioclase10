import { Router } from "express";
import ProductManager from '../ProductManager.js'
const productManager = new ProductManager('./src/products.json')

const rtRouter = Router()


rtRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    const product = products.content
    res.render('home',{product,style:'home.css'})
})

rtRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts()
    const product = products.content
    res.render('realTimeProducts',{product,style:'realTimeProducts.css'})
    req.context.socketServer.emit('actualizar_realtimeproducts',product)})

export default rtRouter