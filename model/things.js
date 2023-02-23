const mongoose = require("mongoose");

const thingsSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  userId: {type: String, required: true},
  price: {type: Number, required: true},
});

const Thing = mongoose.model("Thing", thingsSchema);
async function createThing() {
  const thing = new Thing({
    title: "Banana",
    description: "Eat everyday",
    imageUrl: "http://banana.com/",
    userId: "20",
    price: 2131,
  });
  const result = await thing.save();
  
}
createThing();

async function getThing(){
    const thing = await Thing.count()
    console.log(thing);
}
getThing()