import mongoose from "mongoose";

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false, 
  },
});

const Talent = mongoose.model("Talent", talentSchema);

export default Talent;
