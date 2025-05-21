const fullName: string='Subhashree';
const age: number=23;
const isGraduated:boolean=true;
const skills:string[]=['javascript','typescript','html'];
const hobbies:string[]=['Reading','Hiking'];
const socialLink:SocialLink[]=[ { platform: "LinkedIn", url: "https://linkedin.com/in/alice" },
  { platform: "GitHub", url: "https://github.com/alice" }]

function printBio(
    fullName:string,
    age:number,
    isGraduated:boolean,
    skills:string[],
    hobbies:string[],
    socialLink:SocialLink[]
):void{
    console.log(` Hi,my name is ${fullName}`);
    console.log(`i am ${age} years old`);
    console.log(` Graduated status:${isGraduated}`);
    console.log(` My skills ${skills.join(", ")}`);
    console.log(`i like ${hobbies.join(", ")}`);


    let lyear= calculateYearsUntil30(age);
    console.log(`years left for being 30 is ${lyear}`);
    
   

    socialLink.forEach((index)=>{
        console.log(`${index.platform}:${index.url}`);
    });



}

function calculateYearsUntil30(age:number):number{
    let leftYear=30-age;
    return leftYear>0 ? leftYear :0;

}

type SocialLink = {
  platform: string;
  url: string;
}




printBio(fullName,age,isGraduated,skills,hobbies,socialLink);