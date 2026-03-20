import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'process';

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.green(`MongoDB connected at ${url}`))
    } catch (error) {
        console.error(colors.red('Error connecting to MongoDB:'), error)
        exit(1)
    }
}