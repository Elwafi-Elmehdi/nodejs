const add = (x, y) => x + y;

test("Testing add function",()=>{
    expect(add(1,1)).toBe(2)
})


// test("should throw error async ",(done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         done()
//     },2000)
// })

