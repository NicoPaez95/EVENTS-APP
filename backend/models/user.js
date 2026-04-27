import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String }, // Para el Profile
  savedEvents: [{ type: mongoose.Types.ObjectId, ref: 'Event' }] // Para /user/saved-events
});
export default mongoose.model('User', userSchema);