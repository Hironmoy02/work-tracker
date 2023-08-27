// Your JS File
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://hironmoychowdhuryuemkcsit2023:Hironmoy123@cluster0.wevgwta.mongodb.net/").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB Connection Error:", err);
})

const itemSchema = {
  name: String
}
const Item = mongoose.model("Item", itemSchema);

app.get("/", async (req, res) => {
// const defaultItems=[{name:"Buy food"},{name:"cook"},];


  try {
    const items = await Item.find();
 
      res.render("index", { newListItems: items });
    
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.post("/", (req, res) => {

  let newItemName = req.body.newItem;
  console.log(newItemName);
  const item = new Item({
    name: newItemName
  });

  item.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("An error occurred");
    });
});

app.post("/delete", async (req, res) => {
  const check = req.body.checkbox;

  try {
    await Item.findByIdAndDelete(check);
    console.log("Deleted item");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
