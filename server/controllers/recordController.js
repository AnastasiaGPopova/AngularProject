const router = require("express").Router();

const recordManager = require("../managers/recordManager");
const parser = require('../utils/parser')

router.get("/", async (req, res) => {
  try {
    const records = await recordManager.getAll().populate('_ownerId');
    res.json(records);
  } catch (error) {
    res.json(parser.parseError(error))
  }
});




router.get("/:recordId", async (req, res) => {

  if(req.params.recordId === "myRecords"){
    const records = await recordManager.getAllRecordsByOwner(req.user._id)
    return res.json(records);
  } else if (req.params.recordId === "wishList") {
    const records = await recordManager.getWishList(req.user._id)
    return res.json(records);
  } else {
    try {
      const record = await recordManager.getOne(req.params.recordId).populate('_ownerId');
      res.json(record);
    } catch (error) {
      return res.json(parser.parseError(error));
    }

  }
});



router.post("/", async (req, res) => {


  const {movieName, artist, director, year, imageUrl, description, genre} = req.body;
  const existingRecord = await recordManager.getExisting(movieName)


  try {

    if(!movieName || !artist || !year || !imageUrl || !description || !genre || !director){
      throw new Error (`All fields are requiered!`)
    }

    if(existingRecord){
      throw new Error (`This record already exist in our catalog!`)
    }

    // _ownerId: req.user._id
    const record = await recordManager.create({movieName, artist, director, year, imageUrl, description, genre, _ownerId: req.user._id});
    console.log(`-------BY CREATE---------`)
    console.log(record)

    res.json(record);
  } catch (error) {
    return res.json(parser.parseError(error))
  }
});


router.put("/:recordId", async (req, res) => {
  //to DO validations for empty fields
  //const {........} = req.body
  let isOwner = true;
  let currentRecord = await recordManager.getOne(req.params.recordId);
  const {movieName, artist, director, year, imageUrl, description, genre, likes, wishingList, likedBy, raiting} = req.body;
  console.log(likes)
  console.log(wishingList)

  try {

    if(!movieName || !artist || !year || !imageUrl || !description || !genre || !director){
        throw new Error (`All fields are requiered!`)
      }

    const updatredRecord =  await recordManager.update(req.params.recordId, {movieName, artist, director, year, imageUrl, description, genre, likes, wishingList, likedBy, raiting});
    res.json(updatredRecord);
    console.log(updatredRecord)
    } catch (error) {
      console.log(error)
      return res.json(parser.parseError(error))
    }
});

router.delete("/:recordId", async (req, res) => {

  let isOwner = true;
  let currentRecord = await recordManager.getOne(req.params.recordId);
  if(currentRecord._ownerId !== req.user._id){
    isOwner = false
  }
    try {
      // if(!isOwner){
      //   throw new Error(`You are not authotized!`)
      // }
      const res = await recordManager.delete(req.params.recordId);
      console.log(`--------------------------DELETED RECORD-----------------------`)
      console.log(res)
      res.json({ ok: true });
    } catch (error) {
          return res.json(parser.parseError(error))
    }
});

module.exports = router;
