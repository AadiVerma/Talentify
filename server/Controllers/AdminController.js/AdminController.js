import JobSeeker from "../../Models/JobSeeker.js";


const getCountsData = async (req, res) => {
  try {
    const hiredCount = await JobSeeker.countDocuments({
    
      approve: true,
    });

    const pendingCount = await JobSeeker.countDocuments({
    
      approve: false,
    });

    res.json({
      totalHired: hiredCount,
      totalPending: pendingCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch status counts" });
  }
};

const SkillData= async (req,res)=>{
  try {
   
    const topSkills = await JobSeeker.aggregate([
      { $unwind: "$skills" }, 
      {
        $group: {
          _id: "$skills", 
          count: { $sum: 1 }, 
        },
      },
      { $sort: { count: -1 } }, 
      { $limit: 5 },
      {
        $project: {
          skill: "$_id",
          count: 1, 
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: topSkills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching top skills.",
      error: error.message,
    });
}
}



export  {getCountsData,SkillData};
