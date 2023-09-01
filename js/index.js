
const handleCategory =async () => {
    const response =await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
   
    const tabContainer = document.getElementById("tab-container");
    data.data.slice(0, 4).forEach((category) =>{
        const div = document.createElement("div");
        div.innerHTML=`
        <a onclick="handleVideoCategory(${category.category_id})" class="tab">${category.category}</a>  
        `;
        tabContainer.appendChild(div);
    });

    console.log(data.data);
}

const handleVideoCategory =async (categoryId) => {
console.log(categoryId);
    const response =await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data =await response.json();
    console.log(data.data)

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';
    data.data.forEach((videos) => {
        const div =document.createElement('div');
        div.innerHTML = `
        <div class="card w-65 h-[370px] bg-base-100 shadow-xl">
        <figure>
          <img
            src="${videos.thumbnail}"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            ${videos.title}
          </h2>
          <div class="card-footer flex justify-between mt-8">
            <div class="flex">
              <div>
                <div class="avatar online">
                  <div class="w-14 rounded-full">
                    <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    />
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6>${videos.authors[0].profile_name}</h6>
                <h6>${videos.others.views}</h6>
                
                <small>2022-08-24 17:27:34</small>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
        cardContainer.appendChild(div);
    })
}



handleCategory()
handleVideoCategory('1000')

