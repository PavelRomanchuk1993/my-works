async function getData() {
let res = await fetch('https://gorest.co.in/public/v1/posts')
return await res.json()
}

let list = await getData()

function createList(data){
    let ul = document.createElement('ul')
    for (const item of data) {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.textContent=item.title
        a.href = "post.html?post_id=" + item.id
        li.append(a)
        ul.append(li)
    }
    document.body.append(ul) 
}
createList(list.data)