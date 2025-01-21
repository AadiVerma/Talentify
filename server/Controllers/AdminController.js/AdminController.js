import JobSeeker from "../../Models/JobSeeker.js";

import User from "../../Models/UserModel.js";

const getCountsData = async (req, res) => {
  try {
    const hiredCount = await User.countDocuments({
      role: "hirer",
      status: "hired",
    });

    const talentReqCount = await User.countDocuments({
      role: "job-seeker",
      status: "pending",
    });

    const orgReqCount = await User.countDocuments({
      role: "hirer",
      status: "pending",
    });

    const pendingCount = await User.countDocuments({
      role: "hirer",
      status: "pending",
    });

    const rejectedCount = await User.countDocuments({
      role: "hirer",
      status: "rejected",
    });

    res.json({
      totalHired: hiredCount,
      totalTalentReq: talentReqCount,
      totalOrgReq: orgReqCount,
      totalPending: pendingCount,
      totalRejected: rejectedCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch status counts" });
  }
};


export  {getCountsData};
