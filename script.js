const access_key= 'nW0lCYpNPJD2uilvsOc-_20qDh44X2707H5Fld313YA';
const formEl= document.querySelector('form');
const searchInput= document.getElementById('search-input');
const searchResultsEl= document.getElementById('results');
const showMore= document.getElementById('show-more'); 


let inputData=''; 
let page=1; 
const searchImg= async()=>{
  inputData= searchInput.value;
  const url= `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`;
  console.log(url);
  const response= await fetch(url);
  const data= await response.json();
  if (page===1) {
    searchResultsEl.innerHTML='';  
  }

  const results= data.results;

  results.map((result)=>{
    const imageWrapper= document.createElement('div');
    imageWrapper.classList.add("search-item"); 
    const image= document.createElement('img');
    image.classList.add('regular-image')
    image.src= result.urls.small;
    image.alt= result.alt_description;
    const description= document.createElement('a');
    description.href=result.links.html;
    description.target='_blank';
    description.textContent= result.alt_description;

    const icons= document.createElement('div');
    icons.classList.add("icons");
    const heart=document.createElement('i');
    heart.classList.add("fa-heart", "fa-solid");
    const plus=document.createElement('i');
    plus.classList.add("fa-plus", "fa-solid");
    const expand=document.createElement('i');
    expand.classList.add("fa-expand", "fa-solid");

    expand.addEventListener('click',()=>{
      const expanded=document.createElement('div');
      expanded.classList.add("expanded");
      const expanded_image=document.createElement('img');
      expanded_image.classList.add('expanded-img');
      expanded_image.src=result.urls.full;
      const cross=document.createElement('i');
      cross.classList.add("fa-xmark", "fa-solid", "expand");
      
      expanded.appendChild(expanded_image);
      expanded.appendChild(cross);
      imageWrapper.appendChild(expanded); 


      const cancle= document.querySelector('.expand');
      cancle.addEventListener('click', ()=>{
        expanded.remove('div');
        console.log('as')
      })
      
    })
    
    icons.appendChild(heart);
    icons.appendChild(plus);
    icons.appendChild(expand);
    imageWrapper.appendChild(image); 
    imageWrapper.appendChild(description); 
    imageWrapper.appendChild(icons); 
    searchResultsEl.appendChild(imageWrapper);

    heart.addEventListener('click',()=>{
      if (heart.style.color!=="red") {
        heart.style.color="red";
      }
      else if(heart.style.color==="red"){
        heart.style.color="#666" ;
        heart.addEventListener('mouseenter',()=>{
          heart.style.color="#000" ;
        }) 
        heart.addEventListener('mouseleave',()=>{
          heart.style.color="#666" ;
        }) 
      }
    })

    imageWrapper.addEventListener('dblclick',()=>{
      const like_div= document.createElement('div');
      like_div.classList.add("heart-on-click");
      const like=document.createElement('i');
      like.classList.add("fa-heart", "fa-solid");

      heart.style.color="red";

      like_div.appendChild(like);
      imageWrapper.appendChild(like_div);
    })  
  });
  page++;
  console.log('page no: '+page);

  if (page>1) {
    showMore.style.visibility="visible"
  }  
}

formEl.addEventListener('submit', (event)=>{
  event.preventDefault();
  page=1;
  searchImg();
})

showMore.addEventListener('click', ()=>{
  searchImg();
})

const clear_form=document.querySelector('.clear');
clear_form.addEventListener('click',()=>{
  searchInput.value='';
});



// bootstrap tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
