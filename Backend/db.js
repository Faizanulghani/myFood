let mongoose = require("mongoose");

let mongoURI =
  "mongodb+srv://foodapp:root@myfood.mapfhwx.mongodb.net/MyFoodApp?retryWrites=true&w=majority&appName=MyFood";

let mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });

    const fetchedData = await mongoose.connection.db
      .collection("food-items")
      .find({})
      .toArray();
    const fetchedCategory = await mongoose.connection.db
      .collection("food-category")
      .find({})
      .toArray();

    global.foodData = [fetchedData, fetchedCategory];
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDb;
