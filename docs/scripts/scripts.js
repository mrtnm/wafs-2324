const personalSiteInfoMarten = {
    "name": "Marten",
    "avatar" : "https://github.com/utueytbuiewbty.webp",
    "dateOfBirth" : {
        "year" : 1999,
        "month" : 4,
        "day" : 1,

    },
    "favorietPets" : [
        "shrimp"
    ],
    "openForJobProposals" : false
}

const teamMembers = {
    "members": [
        {
            "name" : "Aap34",
            "personalPage" : "https://aap34nogeenkeer.github.io/WAFS/app.json",
            "testData" : personalSiteInfoMarten
        },
        {
            "name" : "Noot"
        },
        {
            "name" : "Mies"
        },
        {
            "name" : "Teun"
        }

    ]
}





showMember(teamMembers.members[0]);


function showMember(teamMember) {
    let url = teamMember.personalPage;
    const memberDataRequest = new Request(url);    

    fetch(memberDataRequest)
        .then((response) => {
            // if (!response.ok) {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            // }
        
         //return response.blob();
         console.log(response);
  })

  // console.log(memberInfo);
}
showMember();






