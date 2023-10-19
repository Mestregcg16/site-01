import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const numeroSchema = new Schema({
    numero: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('numeros', numeroSchema)
