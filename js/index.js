
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
    const drawingContainer = document.getElementById('drawing-container');
    const drawingContent =document.getElementById('drawing-content');
    drawingContainer.innerHTML = '';

    const drawingData = data.data;

    if(drawingData.length === 0){
      const div = document.createElement('div');
      div.innerHTML= `
      <div class="flex justify-center items-center mt-12">
            <div class="card w-96 bg-[#fff]">
              <figure class="px-20 pt-8"><img src="/images/Icon.png" alt="icon" /></figure>
              <div class="card-body items-start text-center">
                <h2 class="card-title text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
              </div>
            </div>
          </div>
      `;
      drawingContainer.appendChild(div);

    }

    const timeZone = (second) => {

      const timeHours = Math.floor(second/3600);
      const secondTime = Math.floor(second%3600);
      const minTime = Math.floor(secondTime/60);
      let resultTime = '';
      if(timeHours > 0){
        resultTime +=`${timeHours} hr ${timeHours > 1 ? 's' : ''}`;
      };

      if(minTime > 0){
        resultTime +=`${minTime} hr ${minTime > 1 ? 's' : ''}`};
        resultTime += ' ago';
        return resultTime;
    }




    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';
    const videoCategory = data.data.forEach((videos) => {
        const div =document.createElement('div');
        div.innerHTML = `
        <div class="card w-65 h-[370px] bg-base-100 shadow-xl">
        <figure>
          <div class="relative">
          <img
          src="${videos.thumbnail}"
          alt="Shoes"/>
          </div>
          <div class="absolute top-[145px] right-5">
          <p>${videos?.others?.posted_date? `<div class="bg-black text-white">${timeZone(videos.others.posted_date)}</div>`:''}</p>
          </div>
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
                    src=${videos.authors[0].profile_picture
                    }"
                    />
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6>${videos.authors[0].profile_name}</h6>
                <span>${videos.authors[0].verified ? '<img src="images/Group 3.png" alt="">' :' '}</span>
                <h6>${videos.others.views}</h6>
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

