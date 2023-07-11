
const router = require("express").Router();

const recordManager = require("../managers/recordManager");

router.post("/", async (req, res) => {
    console.log(`----------TEST SEARCH-----------------`)

    const {searchItem, year, genres } = req.body
    console.log(`SearchItem == ${req.body.searchItem}`)
    console.log(`SearchYear == ${req.body.year}`)
    console.log(`SearchGenres == ${req.body.genres}`)

    if(year === "all" && genres ==="all" && searchItem === "all"){
        const result = await recordManager.getAll()
        console.log(`--------nothing----------`)
        console.log(result)
        return res.json(result)
    }


    if(year === "all" && genres ==="all" && searchItem !== "all"){
        const result = await recordManager.getSearchedbyArtistOrRecord(searchItem).clone()
        console.log(`--------Search By Name----------`)
        console.log(`Searh with name ${searchItem}`)
        console.log(result)
        return res.json(result)
    }

    if(year !== "all" && genres ==="all" && searchItem === "all"){
        if(year === "1980-2020"){
            const result = await recordManager.getSearchedbyYear1980to2020().clone()
            console.log(`--------1980-2020----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "2021 and newer"){
            const result = await recordManager.getSearchedbyYear2021andNewer().clone()
            console.log(`--------2021 and newer----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "1980 and older"){
            const result = await recordManager.getSearchedbyYear1980andOlder().clone()
            console.log(`--------1980 and older----------`)
            console.log(result)
            return res.json(result)

        }
        // const result = await recordManager.getSearchedbyArtistOrRecord(searchItem).clone()
    }

    if(year === "all" && genres !=="all" && searchItem === "all"){
        const result = await recordManager.getbyGenre(genres).clone()
        console.log(result)
        console.log(genres)
        return res.json(result)
    }


//------Combinations---------------------

    //------------ Combinations with SearchItem
    //----------SearchItem + YEAR
    if(year !== "all" && genres ==="all" && searchItem !== "all"){

        console.log(`-------Iteam and year-----------`)

        if(year === "1980-2020"){
            const result = await recordManager.itemandYear1980to2020(searchItem).clone()
            console.log(`--------1980-2020----------`)
            console.log(result)
            return res.json(result)

        }

        if(year === "2021 and newer"){
            const result = await recordManager.itemandYear2020andNewer(searchItem).clone()
            console.log(`--------2021 and newer----------`)
            console.log(result)
            return res.json(result)
        }

        if(year === "1980 and older"){
            const result = await recordManager.itemandYear1980andOlder(searchItem).clone()
            console.log(`--------1980 and older----------`)
            console.log(result)
            return res.json(result)
        }
    }

    //----------SearchItem + GENRE

    if(year === "all" && genres !=="all" && searchItem !== "all"){
        const result = await recordManager.itemandGenre(searchItem, genres).clone()
        console.log(`--------item + genre-------------`)
        console.log(result)
        console.log(genres)
        return res.json(result)
    }



        //SearchItem+ Genre + Year
        if(year !== "all" && genres !=="all" && searchItem !== "all"){

            console.log(`-------SearchItem+ Genre + Year-----------`)
    
            if(year === "1980-2020"){
                const result = await recordManager.itemGenreYear1980to2020(searchItem, genres).clone()
                console.log(`--------1980-2020----------`)
                console.log(result)
                return res.json(result)
    
            }
    
            if(year === "2021 and newer"){
                const result = await recordManager.itemGenreYear2020andNewer(searchItem, genres).clone()
                console.log(`--------2021 and newer----------`)
                console.log(result)
                return res.json(result)
            }
    
            if(year === "1980 and older"){
                const result = await recordManager.itemGenreYearear1980andOlder(searchItem, genres).clone()
                console.log(`--------1980 and older----------`)
                console.log(result)
                return res.json(result)
            }
        }



//------------ Combinations with Year


/// Year with genre
if(year !== "all"  && genres !=="all" && searchItem === "all"){

    console.log(`-------Iteam and year-----------`)

    if(year === "1980-2020"){
        const result = await recordManager.genre1980to2020(genres).clone()
        console.log(`--------1980-2020----------`)
        console.log(result)
        return res.json(result)

    }

    if(year === "2021 and newer"){
        const result = await recordManager.genre2020andNewer(genres).clone()
        console.log(`--------2021 and newer----------`)
        console.log(result)
        return res.json(result)
    }

    if(year === "1980 and older"){
        const result = await recordManager.genre1980andOlder(genres).clone()
        console.log(`--------1980 and older----------`)
        console.log(result)
        return res.json(result)
    }
}




  });

module.exports = router