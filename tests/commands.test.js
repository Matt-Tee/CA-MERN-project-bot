require('dotenv').config();
const {commands} = require("../functions/commands");
jest.mock('../functions/axiosPost');
jest.mock('../functions/axiosPatch');
jest.mock('../functions/axiosGet');

test('Should be defined', () => {
    expect(commands).toBeDefined()
})

test('Should return default action of an unknown command', () => {
    expect((commands({ content: "!sunkenPIANO" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})

test('Should return help block on a help command', () => {
    expect((commands({ content: "!help" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})

test('Should return bot info block on a botinfo command', () => {
    expect((commands({ content: "!botinfo" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})

test('Should return a users points on a points command', () => {
    expect((commands({ author: {id: 1, username: 'bob'} ,content: "!points" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})

test('Should return an appology on a non-user using the points command', () => {
    expect((commands({ author: {id: false, username: 'tristana'} ,content: "!points" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})

test('Should return an already updated messgae on a update command if the users name is already up to date', () => {
    expect((commands({ author: {id: 1, username: 'bob'} ,content: "!update" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})

test('Should return the updated name on a update command', () => {
    expect((commands({ author: {id: 1, username: 'John'} ,content: "!update" , channel: {send: (thing)=>{console.log(thing)}}}))== false).toBe(false)
})
