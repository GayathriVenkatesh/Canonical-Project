function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString([], { month: 'long' });
  }
  
fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
  .then((response) => response.json())
  .then((data) => {
    let posts = "";
    data.map((post) => {
        let day = post.date.slice(8, 10)
        let month = getMonthName(post.date.slice(5, 7))
        let year = post.date.slice(0, 4)
        posts += `
        <div class="col-4">
            <div class="p-card--highlighted" style="border-top: 3px solid #a87ca0">
                <header class="blog-p-card__header" >
                    <h5 class="p-muted-heading u-no-margin--bottom">
                        ${post._embedded["wp:term"][2][0]?.name}
                    </h5>
                </header>
            
                <hr class="u-sv1">
        
                <img class="p-card__image" src="${post.featured_media}">
                <div class="p-card__inner" style="height: 200px;">
                    <h4>
                        <a href="${post.link}">${post.title.rendered} </a>
                    </h4>
                    <p>
                        <i>By <a href="${post._embedded.author[0]?.link}">${post._embedded.author[0]?.name}</a> on ${day} ${month} ${year}</i>
                    </p>
                </div>
                <hr class="u-no-margin--bottom">
                <div class="p-card__inner">
                    Article
                </div>
            </div>
        </div>`
    })
    document.getElementById("blogPosts").innerHTML = posts;
  });
