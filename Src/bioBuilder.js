"use strict";
const fullName = 'Subhashree';
const age = 23;
const isGraduated = true;
const skills = ['javascript', 'typescript', 'html'];
const hobbies = ['Reading', 'Hiking'];
const socialLink = [{ platform: "LinkedIn", url: "https://linkedin.com/in/alice" },
    { platform: "GitHub", url: "https://github.com/alice" }];
function printBio(fullName, age, isGraduated, skills, hobbies, socialLink) {
    console.log(` Hi,my name is ${fullName}`);
    console.log(`i am ${age} years old`);
    console.log(` Graduated status:${isGraduated}`);
    console.log(` My skills ${skills.join(", ")}`);
    console.log(`i like ${hobbies.join(", ")}`);
    let lyear = calculateYearsUntil30(age);
    console.log(`years left for being 30 is ${lyear}`);
    socialLink.forEach((index) => {
        console.log(`${index.platform}:${index.url}`);
    });
}
function calculateYearsUntil30(age) {
    let leftYear = 30 - age;
    return leftYear > 0 ? leftYear : 0;
}
printBio(fullName, age, isGraduated, skills, hobbies, socialLink);
