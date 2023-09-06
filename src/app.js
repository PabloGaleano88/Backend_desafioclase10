import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/productsRoutes.js'
import cartsRouter from './routes/cartsRoutes.js' 
import viewsRouter from './routes/viewsRouter.js'

const app = express()

const httpServer = app.listen(8080,()=>console.log("Servicio corriendo en el puerto 8080"))
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'))

app.use((req,res,next)=>{
    req.context = { socketServer }
    next()
})

socketServer.on('connection',()=>console.log("cliente conectado"))

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
