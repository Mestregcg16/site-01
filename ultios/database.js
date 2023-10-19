import mongoose from "mongoose"

const uri = "mongodb://localhost/test"


const conexao = async () => {
    mongoose.set('strictQuery', falsa)
    global.mongoose = await mongoose.connect(uri)
}

export default conexao