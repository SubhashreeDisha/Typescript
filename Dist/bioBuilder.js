var fullName = 'Subhashree';
var age = 23;
var isGraduated = true;
var skills = ['javascript', 'typescript', 'html'];
var hobbies = ['Reading', 'Hiking'];
var socialLink = [{ platform: "LinkedIn", url: "https://linkedin.com/in/alice" },
    { platform: "GitHub", url: "https://github.com/alice" }];
function printBio(fullName, age, isGraduated, skills, hobbies, socialLink) {
    console.log(" Hi,my name is ".concat(fullName));
    console.log("i am  ".concat(age, " years old"));
    console.log(" Graduated status ".concat(isGraduated));
    console.log(" My skills ".concat(skills.join(", ")));
    console.log("i like ".concat(hobbies.join(", ")));
    var lyear = calculateYearsUntil30(age);
    console.log("years left for being 30 is ".concat(lyear));
    socialLink.forEach(function (index) {
        console.log("platform ".concat(index.platform, "and url ").concat(index.url));
    });
}
function calculateYearsUntil30(age) {
    var leftYear = 30 - age;
    return leftYear > 0 ? leftYear : 0;
}
printBio(fullName, age, isGraduated, skills, hobbies, socialLink);
