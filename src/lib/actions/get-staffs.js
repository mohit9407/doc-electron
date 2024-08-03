export async function getStaffs() {
  try {
    // const staffs = await prisma.staff.findMany({
    // 	where: {
    // 		isTrashed: false,
    // 	},
    // 	orderBy: [
    // 		{
    // 			name: 'asc',
    // 		},
    // 		{
    // 			createdAt: 'desc',
    // 		},
    // 	],
    // });
    // return staffs;
    const staffs = [
      {
        name: "test one",
        mobileNumber: "9898989898",
      },
      {
        name: "test two",
        mobileNumber: "9878787878",
      },
      {
        name: "test three",
        mobileNumber: "982323232323",
      },
    ];
    return staffs;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTrashedStaff() {
  try {
    // const staffs = await prisma.staff.findMany({
    // 	where: {
    // 		isTrashed: true,
    // 	},
    // 	orderBy: [
    // 		{
    // 			name: 'asc',
    // 		},
    // 		{
    // 			createdAt: 'desc',
    // 		},
    // 	],
    // });
    // return staffs;
    const staffs = [
      {
        name: "test one trash",
        mobileNumber: "9898989800",
      },
      {
        name: "test two trash",
        mobileNumber: "9878787800",
      },
      {
        name: "test three trash",
        mobileNumber: "982323232300",
      },
    ];
    return staffs;
  } catch (error) {
    throw new Error(error.message);
  }
}
