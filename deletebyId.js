import mongoose from "mongoose";
import express from "express";

const app = express();
const port = 3000;
//connecting to a database and creating
mongoose
  .connect("mongodb://localhost:27017/Newdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Your Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Defining a schema using the given operation
const Student = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 18, max: 30 },
  fees: {
    type: mongoose.Decimal128,
    reuired: true,
    validate: (v) => v >= 5500.5,
  },
  hobbies: { type: Array },
  isactive: { type: Boolean },
  comments: [
    { value: { type: String }, publish: { type: Date, default: Date.now } },
  ],
  join: { type: Date, default: Date.now },
});
//Definig a model in for this schema in which it will create a collection with name "Students"
const stu = new mongoose.model("Student", Student);
//Creating a function
const stufunc = async (nm, ag, fe, hob, isact, cmt) => {
  try {
    const newdoc = new stu({
      name: nm,
      age: ag,
      fees: fe,

      hobbies: hob,
      isactive: isact,
      comments: cmt,
    });
    const s = await newdoc.save();
    console.log(s);
  } catch (eroor) {
    console.log(error);
  }
};
//Updating the given set of data

const updateByID = async (id) => {
  try {
    const result = await stu.findByIdAndUpdate(
      id,
      { name: "Arjun" },
      { reutrnDocument: "after" }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const deletedocfile = async (id) => {
  try {
    const result = await stu.findByIdAndDelete(id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
deletedocfile();
updateByID("647d714e420243b0b8bdcfdb");
updateByID("647d77f6d37df6bda4424c8b");
deletedocfile("647d77f6d37df6bda4424c8b");
app.listen(port, () => {
  console.log(`Your server is running at the port http://localhost:${port}`);
});
