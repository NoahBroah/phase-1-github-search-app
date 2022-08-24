document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => response.json())
    .then(data => {
        data.items.map(item => {
            const li = document.createElement('li');
            const h2 = document.createElement('h2');
            h2.innerText = item.login;

            h2.addEventListener('click', showUserRepos(item.login, e))
            const img = document.createElement('img');
            img.src = item.avatar_url;
            
            const userList = document.querySelector('#user-list');
            li.append(h2, img);
            userList.append(li);
        })
    })

    })


})

function showUserRepos(username, e) {
    const repoList = document.getElementById('repos-list')
    e.preventDefault();
    repoList.innerHtml = ""
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => response.map(product => {
            const li = document.createElement('li');
            const h1 = document.createElement('h1');
            h1.innerText = product.name;
            li.append(h1);
            repoList.append(li);


        }))
}