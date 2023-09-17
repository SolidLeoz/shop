const { User } = require("../models/user");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");

const router = require("express").Router();

// GET user stats

router.get("/stats", isAdmin, async (req, res) => {
    const previusMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

    try {
        const users = await User.aggregate([
            {
                $match: { createdAt: { $gte: new Date(previusMonth)}},
            },
            {
                $project:{
                    month: {$month: "$createdAt"}
                }
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).send(users)
    } catch (err) {
        console.log(err);
        res.status(500).sendStatus(err);
    }

    // res.send(previusMonth);
});

module.exports = router;