import mongoose from "mongoose";

const ExcrcLogSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        stats: {
            type: Object,
            required: true,
        }
    },
    {
        timestamps:true,
    },
)

export default mongoose.model('Log',ExcrcLogSchema)