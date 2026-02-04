// #Basic Console Usage
// let fullName = "Ayaan Ahmad";
// let hobby = "listening music";

// console.log(`My name is ${fullName} and my hobby is ${hobby}`)

// console.log(45*2-10);

// let now = new Date();
// let currentYear = now.getFullYear();
// console.log(currentYear);

// let firstName = "Ayaan";
// let lastName = "Ahmad"

// console.log(`${firstName} ${lastName}`)

// let a = 10;
// console.log(a);
// a = 20;
// console.log(a);

// console.error("you got a new error");

// let b = 4;
// console.log(b**2)

// let c = true;
// console.log(c);

// let age = 19;
// if(age>18){
//     console.log("age is greater than 18")
// }

// console.log(100/0);

// #Variables and Data types
// let a = 20;
// console.log(a);

// const PI = 3.14;
// console.log(PI)

// let b = 20;
// console.log(b);
// b = 30;
// console.log(b)

// let c = null;
// console.log(typeof(c));

// let num = "30";
// console.log(typeof(num));

// let bool = false;
// console.log(typeof(bool));

// let boolean = true;
// let number = 100;
// let string = "Ayaaaa"
// console.log(`the boolean is ${boolean} and the number is ${number} and the string is ${string}`)

// let h;
// console.log(typeof(h))

// let und = undefined;
// console.log(typeof(und))

// const arr = [10,20,30,40,50];
// console.log(arr);
// arr.push(60);
// console.log(arr)

// #loops
// let i = 1;
// for(i;i<=50;i++){
//     console.log(i);
// }

// let sum = 0;
// let i = 1;
// while(i<=10){
//     sum +=i;
//     i++
// }
// console.log(sum);

// let str = "JavaScript";
// for (const element of str) {
//     console.log(element)

// }

// let i = 1;
// for(i;i<=20;i++){
//     if(i%2==0){
//         continue;
//     }else{
//         console.log(i)
//     }
// }

// let i = 5;
// do{
//     console.log(i)
//     i--;
// }while(i>0);

// let fact = 1;
// for(let i = 1;i<=5;i++){
//     fact *= i;
// }
// console.log(fact)

// let num = 1;
// for(let i =1;i<=3;i++){
//     let row = "";
//     for(let j = 1;j<=3;j++){
//         row += `${num} `
//         num+=1;
//     }
//     console.log(row)
// }

// let arr = [10,20,30,40,50];
// let reverse = [];
// for(let i = arr.length-1;i>=0;i--){
//     reverse.push(arr[i]);
// }
// console.log(reverse);

// for(let i = 1;i<=100;i++){
//     if(i%5==0){
//         console.log(i)
//     }
// }

// let table = 7;
// for(let i = 1;i<=10;i++){
//     let result = table * i
//     console.log(`${table} * ${i} = ${result}`)
// }

// #Arrays
// let arr = ["Dhurandar","King","StrangerThings","Wednesday"]
// console.log(arr.join("-"));

// let num = [1,2,3,4,5,6,7,8,9];
// console.log(num[1]);

// let number = [10,20,30,40,50,60,70]
// number.unshift(2,5)
// console.log(number)

// let arr1 = [10,10,20,20,30,40,40,50,50];
// arr1.pop();
// arr1.pop();
// console.log(arr1)

// let numb = [10,20,30,40,50,60,70];
// let arr2 = numb.slice(0,3)
// console.log(arr2)
// console.log(numb);

// let arr5= [30,40,20,10,"auahs"]
// console.log(arr5.indexOf("auahs"))

// let n = [1,2,3,4,5,6,7,8,9];
// console.log(n.includes(3));

// let ar1 = [10,20,30,40]
// let ar2 = [50,60,70,10,20];
// let result = ar1.concat(ar2)
// console.log(result);

// let sort = [30,10,40,20,60,50,90,80,70]
// console.log(sort.sort());

// let arr4 = [10,10,20,20,30,40,40,50,50];
// let spread = [...arr4]
// console.log(spread == arr4)

// #Functions
// function number(num){
//     if(num%2==0){
//         console.log(`${num} is even number`)
//     }
//     else{
//         console.log(`${num} is odd number`);
//     }
// }
// number(2);

// function circleArea(r){
//     let PI = 3.14
//     let area = PI * r ** 2;
//     console.log(area)
// }
// circleArea(5);

// function arraySum(){
//     let sum = 0
//     let arr = [10,20,30,40,50,60,70,80,90];
//     arr.forEach(element => {
//         sum += element
//     });
//     console.log(sum)
// }
// arraySum();

// function stringChecker(str,char){
//     return str.startsWith(char)
// }
// console.log(stringChecker("hello", "H"));

// function greaterNumber(num1,num2){
//     if(num1>num2){
//         return num1;
//     }
//     else if(num1 == num2){
//         return num1;
//     }
//     else{
//         return num2;
//     }
// }

// console.log(greaterNumber(10,0));

// function factorial(fact){
//    if(fact === 1 || fact === 0) return 1;
//    return fact * factorial(fact-1);
// }
// console.log(factorial(5));

// function reverseString(){
//     let str = "hello"
//     let reverse = "";
//     for (const elem of str) {
//         reverse = elem + reverse;
//     }
//     console.log(reverse);
// }
// reverseString();

// function arrayLarge(){
//     let arr = [10.40,50,60,30,80,90,150,130,110,120];
//     let greater = arr[0];
//     arr.forEach(element => {
//         if(element>greater){
//             greater = element
//         }
//     });
//     return greater;
// }
// console.log(arrayLarge());

// function stringConvert(str){
//     str = str.toLowerCase();
//     let words = str.split(/[\s_]+/);
//     let kebabCase = words.join("-");
//     console.log(kebabCase);
// }
// stringConvert("Hello World Example");

// function helloWorld(){
//     console.log("Hello World")
// }
// helloWorld();

// #Conditionals
// function number(num){
//     if(num>0) return "positive";
//     else if(num<0) return "negative";
//     else return "zero";
// }
// console.log(number(0));

// function tempConverter(celsius){
//     let farenhite = celsius * ( 9 / 5 ) + 32;
//     console.log(farenhite);
// }
// tempConverter(10);

// let arr = [10,20,30,40,50,60,70,80];
// function findAverage(){
//     let sum = 0;
//     arr.forEach(element => {
//         sum += element;
//     });
//     let average = sum / arr.length;
//     console.log(average);
// }
// findAverage();

// function palindromeChecker(str){
//     let left = 0;
//     let right = str.length -1;
//     while(left<right){
//         if(str[left] !== str[right]){
//             return false;
//         }
//         left++;
//         right--;
//     }
//     return true;
// }

// console.log(palindromeChecker("madam"));

// function primeChecker(number){
//     if (number <= 1) return false;
//     for(let i = 2; i < number ; i++){
//         if(number % i === 0){
//             return false;
//         }
//     }
//     return true;
// }
// console.log(primeChecker(7));
// console.log(primeChecker(9));
// console.log(primeChecker(13));
// console.log(primeChecker(15));

// let sentence = "I love doing work on my computer";
// let newSentence = sentence.trim()
// let newWords = newSentence.split(/\s+/)
// console.log(newWords.length);

// let sentence = "I love doing work on my computer";
// let newWords = sentence.split(/\s+/)
// let reference = newWords[0]
// newWords.forEach(element => {
//     if(element.length>= reference.length){
//         reference = element;
//     }    
// });
// console.log(reference);

// let arr = [0, "hello", false, 42, "", null, "JS"];
// let filtered = arr.filter(Element => Element);
// console.log(filtered);

// let sentence = "I love doing work on my computer";
// let newWords = sentence.split(/\s+/)
// let camelCase = [];
// newWords.forEach((element,index) => {
//     if(index === 0){
//         camelCase.push(element.toLowerCase());
//     }
//     else{
//        let camelWorld = element[0].toUpperCase() + element.slice(1).toLowerCase();
//        camelCase.push(camelWorld);
//     }
// });
// console.log(camelCase.join(""));

// function randomNumberGenerator(min, max){
//     let number = Math.floor(Math.random()* (max - min +1) + min)
//     console.log(number)
// }
// randomNumberGenerator(5,10)

// #Objects

// let person = {
//     name: "Ayaan",
//     age: 21,
//     liveIn: "Lucknow"
// }
// console.log(person);

// let person = {
//   name: "Ayaan",
//   age: 21,
//   liveIn: "Lucknow"
// };
// person.hobby = "Coding";
// console.log(person);

//  let person = {
//   name: "Ayaan",
//   age: 21,
//   liveIn: "Lucknow"
// };
// console.log(person["name"])

// let person = {
//   name: "Ayaan",
//   age: 21,
//   liveIn: "Lucknow"
// };
// delete person.liveIn;
// console.log(person);

// let person = {
//   name: "Ayaan",
//   age: 21,
//   liveIn: "Lucknow"
// };

// console.log(Object.keys(person));

// let books = [
//     {
//         bookName: "Rich dad",
//         bookPrice: 600
//     },
//     {
//         bookName: "The power of your concious Mind",
//         bookPrice: 900
//     },
//     {
//         bookName: "the howl fay",
//         bookPrice: 800
//     }
// ]

// let books = [
//     {
//         bookName: "Rich dad",
//         bookPrice: 600,
//         author: "Richy rich"
//     },
//     {
//         bookName: "The power of your concious Mind",
//         bookPrice: 900,
//         author: "Richy chefard"
//     },
//     {
//         bookName: "the howl fay",
//         bookPrice: 800,
//         author: "Donadat john"
//     }
// ]
// console.log(books[1].author)

// let books = [
//     {
//         bookName: "Rich dad",
//         bookPrice: 600,
//         author: "Richy rich"
//     },
//     {
//         bookName: "The power of your concious Mind",
//         bookPrice: 900,
//         author: "Richy chefard"
//     },
//     {
//         bookName: "the howl fay",
//         bookPrice: 800,
//         author: "Donadat john"
//     }
// ]
// if("bookName" in books[1]){
//     console.log("exist");
// }
// else console.log("not exist");

// let books = [
//     {
//         bookName: "Rich dad",
//         bookPrice: 600,
//         author: "Richy rich"
//     },
//     {
//         bookName: "The power of your concious Mind",
//         bookPrice: 900,
//         author: "Richy chefard"
//     },
//     {
//         bookName: "the howl fay",
//         bookPrice: 800,
//         author: "Donadat john"
//     }
// ]
// console.log(Object.keys(books[0]).length);

// let obj1 = {
//     name: "Ayaan",
//     age: 21
// };
// let obj2 = {
//     city: "Lucknow",
//     profession: "Developer"
// };
// let obj3 = {
//     hobby: "Coding",
//     age: 22
// };
// let objectMajor = Object.assign(obj1,obj2,obj3)
// console.log(objectMajor);

// #Strings
// let str = "javaScript";
// console.log(str.length);

// let str = "javaScript";
// console.log(str.slice(-4));

// let str = "WORLD IS GOOD TO BE DONE"
// console.log(str.toLowerCase());

// let str = "WORLD IS GOOD TO BE DONE"
// console.log(str.split(" "));

// let str = "WORLD IS GOOD TO BE DONE";
// console.log(str.indexOf("T"))

// let str = "WORLD IS GOOD TO BE DONE"
// console.log(str.replace("DONE","Run"));

// let str = "javaScript";
// console.log(str.repeat(3));

// let str = "WORLD IS GOOD TO BE DONE"
// console.log(str.includes("WORLD"));

// let str = "WORLD IS GOOD TO BE DONE";
// let noSpaceStr = str.replace(/ /g, "");
// console.log(noSpaceStr);

// let str = "javaScript";
// let newStr = str.toLowerCase();
// let count = 0;
// for (const element of newStr) {
//     if(element === "a" || element === "e" || element === "i" || element === "o" || element === "u"){
//         count++;
//     }
// }
// console.log(count)

// #Mixed
// let numbers = [12, 7, 45, 22, 18, 9, 30, 41, 56, 63, 88, 97, 100, 5, 16];
// let even = []

// numbers.forEach(element => {
//     if(element%2==0){
//         even.push(element)
//     }
// });
// console.log(even)
// let numbers = [12, 7, 45, 22, 18, 9, 30, 41, 56, 63, 88, 97, 100, 5, 16];

// let even = numbers.filter(num => num % 2 === 0);

// console.log(even);

// let numbers = [5, 3, 7, 5, 9, 5, 2, 7, 5, 1];
// let count = 0;
// numbers.forEach(element => {
//     if(element == 5){
//         count++;
//     }
// });
// console.log(count);

// let str = "I love doing work"
// let words = str.split(" ");
// let reverseWord = []
// let alpha = ""
// words.forEach(element => {
//     for (const elem of element) {
//         alpha = elem + alpha
//     }
//     reverseWord.push(alpha)
//     alpha = ""
// });
// console.log(reverseWord);

// function patternPrinting(num){
//     let pattern = "";
//     for(let i = 1;i<=num;i++){
//         pattern += "*".repeat(i) + "\n";
//     }
//     console.log(pattern)
// }
// patternPrinting(5);
// let pattern = ""
// for(let i = 1;i<=5;i++){
//     for(let j = 1;j<=i;j++){
//         pattern += "*";
//     }
//     pattern += "\n";
// }
// console.log(pattern)

// let numbers = [5, 3, 7, 5, 9, 5, 2, 7, 5, 1];
// let squarred = []; 
// numbers.forEach(element => {
//     squarred.push(element**2);
// });
// console.log(squarred);
